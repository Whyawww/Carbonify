'use client';

import { useEffect, useState, useCallback } from 'react'; // Tambahkan useCallback
import { FaUser, FaMedal, FaTasks, FaChartBar, FaHistory, FaSync } from 'react-icons/fa'; // Tambahkan FaSync

// Impor komponen-komponen
import ProfileHeader from './ProfileHeader';
import StatsGrid from './StatsGrid';
import BadgesGallery from './BadgesGallery';
import ActivityChart from './ActivityChart';
import ActivityFeed from './ActivityFeed';

// Definisikan tipe data (tidak berubah)
interface ProfileData {
  user: { first_name: string; email: string; date_joined: string; };
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

  // Gunakan useCallback agar fungsi tidak dibuat ulang setiap render
  const fetchProfileData = useCallback(async () => {
    setLoading(true); // Tampilkan loading setiap kali refresh
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('Tidak terautentikasi');
      
      const response = await fetch('http://127.0.0.1:8000/api/v1/profile/', {
        headers: { 'Authorization': `Token ${token}` },
        cache: 'no-store', // Mencegah caching
      });

      if (!response.ok) throw new Error('Gagal mengambil data profil');
      
      const data: ProfileData = await response.json();
      setProfile(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data saat komponen pertama kali dimuat
  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  if (loading) {
    return <div className="text-center p-10">Memuat profil...</div>;
  }

  if (error || !profile) {
    return <div className="text-center p-10 text-red-500">Error: {error || 'Profil tidak ditemukan.'}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Tombol Refresh */}
        <div className="flex justify-end mb-4">
          <button
            onClick={fetchProfileData}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition"
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
          {/* ... sisa komponen (StatsGrid, BadgesGallery, etc.) tidak berubah ... */}
          <div>
             <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2"><FaChartBar /> Statistik Anda</h2>
             <StatsGrid
               totalActions={profile.total_actions}
               joinDate={profile.user.date_joined}
               activityBreakdown={profile.activity_breakdown}
             />
           </div>
           <div>
             <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2"><FaMedal /> Lencana Prestasi</h2>
             <BadgesGallery earnedBadges={profile.badges} />
           </div>
           <div>
             <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2"><FaTasks /> Rincian Aktivitas</h2>
             <ActivityChart breakdown={profile.activity_breakdown} />
           </div>
           <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2"><FaHistory /> Riwayat Aksi</h2>
              <ActivityFeed completedChallenges={profile.completed_challenges.map(String)} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;