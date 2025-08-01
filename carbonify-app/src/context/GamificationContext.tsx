'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/context/NotificationContext';

interface ProfileData {
  user: {
    first_name: string;
    email: string;
    date_joined: string;
  };
  score: number;
  badges: string[];
  avatar_url: string;
  completed_challenges: (string | number)[];
  rank: number;
  total_actions: number;
  activity_breakdown: { [key: string]: number };
}

interface GamificationContextType {
  isLoggedIn: boolean;
  profile: ProfileData | null;
  fetchUserData: (token: string) => Promise<void>;
  logout: () => void;
  reduceScore: (points: number) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(
  undefined,
);

export const GamificationProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { showNotification } = useNotification();

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    setProfile(null);
    setIsLoggedIn(false);
    router.push('/');
  }, [router]);

  const fetchUserData = useCallback(
    async (token: string) => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/profile/', {
          headers: { Authorization: `Token ${token}` },
          cache: 'no-store',
        });
        if (!response.ok) {
          throw new Error('Sesi tidak valid, harap login kembali.');
        }
        const data: ProfileData = await response.json();
        setProfile(data);
        setIsLoggedIn(true);
      } catch (error) {
        console.error(error);
        logout();
      }
    },
    [logout],
  );

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      fetchUserData(token);
    }
  }, [fetchUserData]);

  const handleLogoutConfirmation = () => {
    if (window.confirm('Apakah Anda yakin ingin keluar?')) {
      logout();
      showNotification('Anda berhasil keluar.', 'success');
    }
  };

  const reduceScore = (points: number) => {
    if (profile) {
      setProfile({
        ...profile,
        score: Math.max(0, profile.score - points),
      });
    }
  };

  return (
    <GamificationContext.Provider
      value={{
        isLoggedIn,
        profile,
        fetchUserData,
        reduceScore,
        logout: handleLogoutConfirmation,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error(
      'useGamification must be used within a GamificationProvider',
    );
  }
  return context;
};
