'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  FaMedal,
  FaTasks,
  FaChartBar,
  FaHistory,
  FaSync,
} from 'react-icons/fa';
import ProfileHeader from './ProfileHeader';
import StatsGrid from './StatsGrid';
import BadgesGallery from './BadgesGallery';
import dynamic from 'next/dynamic';
import ActivityChart from './ActivityChart';
import ActivityFeed from './ActivityFeed';

interface ProfileData {
  user: { first_name: string; email: string; date_joined: string };
  score: number;
  badges: string[];
  avatar_url: string;
  completed_challenges: (string | number)[];
  rank: number;
  total_actions: number;
  activity_breakdown: { [key: string]: number };
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const LottieRobot = useMemo(() => dynamic(
    () => import('@/components/LottieRobot'),
    { ssr: false }
  ), []);

  const fetchProfileData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('accessToken');
      if (!token)
        throw new Error('Tidak terautentikasi. Silakan login kembali.');

      const response = await fetch('http://127.0.0.1:8000/api/v1/profile/', {
        headers: { Authorization: `Token ${token}` },
        cache: 'no-store',
      });

      if (!response.ok) throw new Error('Gagal mengambil data profil');

      const data: ProfileData = await response.json();
      setProfile(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  if (loading) {
    return <div className="text-center p-10 text-white">Memuat profil...</div>;
  }

  if (error || !profile) {
    return (
      <div className="text-center p-10 text-white">
        Error: {error || 'Profil tidak ditemukan.'}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text min-h-screen w-full pt-32 pb-20 relative overflow-hidden p-4 sm:p-6 lg:p-30 text-white">
      <div className="max-w-4xl mx-auto relative z-10 container">
        <div className="flex justify-end mb-4">
          <button
            onClick={fetchProfileData}
            className="flex items-center bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text py-4 gap-2 text-sm text-transparent hover:text-white transition"
            disabled={loading}
          >
            <FaSync className={loading ? 'animate-spin' : ''} />
            Perbarui Data
          </button>
        </div>

        <ProfileHeader
          name={profile.user.first_name}
          avatarUrl={profile.avatar_url}
          score={profile.score}
          rank={profile.rank}
        />

        <div className="mt-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <FaChartBar /> Statistik Anda
            </h2>
            <StatsGrid
              totalActions={profile.total_actions}
              joinDate={profile.user.date_joined}
              activityBreakdown={profile.activity_breakdown}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <FaMedal /> Lencana Prestasi
            </h2>
            <BadgesGallery earnedBadges={profile.badges} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <FaTasks /> Rincian Aktivitas
            </h2>
            <ActivityChart breakdown={profile.activity_breakdown} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <FaHistory /> Riwayat Aksi
            </h2>
            <ActivityFeed
              completedChallenges={profile.completed_challenges.map(String)}
            />
          </div>
        </div>
      </div>
      <LottieRobot />
    </div>
  );
};

export default ProfilePage;
