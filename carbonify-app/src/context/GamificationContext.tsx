'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface GamificationContextType {
  score: number;
  addScore: (points: number) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const GamificationProvider = ({ children }: { children: ReactNode }) => {
  const [score, setScore] = useState(0);

  const addScore = (points: number) => {
    setScore(prevScore => prevScore + points);
  };

  return (
    <GamificationContext.Provider value={{ score, addScore }}>
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};