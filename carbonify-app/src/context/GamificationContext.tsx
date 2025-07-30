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

// Definisikan tipe data profil yang lengkap untuk digunakan di seluruh aplikasi
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
  profile: ProfileData | null; // Simpan seluruh data profil dalam satu objek
  fetchUserData: (token: string) => Promise<void>;
  logout: () => void;
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
    // Redirect ke home setelah logout
    router.push('/');
  }, [router]);

  const fetchUserData = useCallback(async (token: string) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/profile/', {
        headers: { Authorization: `Token ${token}` },
        cache: 'no-store', // Selalu ambil data terbaru dari server
      });
      if (!response.ok) {
        throw new Error('Sesi tidak valid, harap login kembali.');
      }
      const data: ProfileData = await response.json();
      setProfile(data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      logout(); // Logout jika token tidak valid atau ada error
    }
  }, [logout]);

  // Efek ini hanya berjalan sekali saat aplikasi pertama kali dimuat
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
  }

  return (
    <GamificationContext.Provider
      value={{
        isLoggedIn,
        profile,
        fetchUserData,
        logout: handleLogoutConfirmation, // Gunakan fungsi konfirmasi
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