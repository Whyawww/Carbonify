'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useNotification } from '@/context/NotificationContext';

interface GamificationContextType {
  score: number;
  isLoggedIn: boolean;
  avatarUrl: string | null;
  completedChallenges: string[];
  fetchUserData: (token: string) => Promise<void>;
  addScore: (points: number, challengeId: string) => void;
  logout: () => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(
  undefined,
);

export const GamificationProvider = ({ children }: { children: ReactNode }) => {
  const [score, setScore] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { showNotification } = useNotification();

  const resetState = () => {
    setScore(0);
    setAvatarUrl(null);
    setCompletedChallenges([]);
    setIsLoggedIn(false);
  };

  const fetchUserData = useCallback(async (token: string) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/profile/', {
        headers: { Authorization: `Token ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setScore(data.score);
        setCompletedChallenges(data.completed_challenges);
        setAvatarUrl(data.avatar_url);
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('accessToken');
        resetState();
      }
    } catch (error) {
      console.error('Gagal mengambil data pengguna:', error);
      resetState();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      fetchUserData(token);
    } else {
      resetState();
    }
  }, [pathname, fetchUserData]);

  const addScore = (points: number, challengeId: string) => {
    setScore((prevScore) => prevScore + points);
    setCompletedChallenges((prev) => [...prev, challengeId]);
  };

  const logout = useCallback(() => {
    if (window.confirm('Apakah Anda yakin ingin keluar?')) {
      localStorage.removeItem('accessToken');
      resetState();
      showNotification('Anda berhasil keluar.', 'success');
      router.push('/');
    }
  }, [router, showNotification]);

  return (
    <GamificationContext.Provider
      value={{
        score,
        isLoggedIn,
        avatarUrl,
        completedChallenges,
        fetchUserData,
        addScore,
        logout,
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
