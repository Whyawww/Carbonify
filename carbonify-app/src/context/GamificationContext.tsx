'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';

interface GamificationContextType {
  score: number;
  completedChallenges: string[];
  fetchUserData: (token: string) => Promise<void>;
  addScore: (points: number, challengeId: string) => void;
  reduceScore: (points: number) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(
  undefined,
);

export const GamificationProvider = ({ children }: { children: ReactNode }) => {
  const [score, setScore] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);

  const fetchUserData = useCallback(async (token: string) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/profile/', {
        headers: { Authorization: `Token ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setScore(data.score);
        setCompletedChallenges(data.completed_challenges);
      }
    } catch (error) {
      console.error('Gagal mengambil data pengguna:', error);
    }
  }, []);

  const addScore = (points: number, challengeId: string) => {
    setScore((prevScore) => prevScore + points);
    setCompletedChallenges((prev) => [...prev, challengeId]);
  };

  const reduceScore = (points: number) => {
    setScore((prevScore) => Math.max(0, prevScore - points));
  };

  return (
    <GamificationContext.Provider
      value={{
        score,
        completedChallenges,
        fetchUserData,
        addScore,
        reduceScore,
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
