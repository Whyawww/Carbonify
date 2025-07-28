'use client';

import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/context/NotificationContext';
import { useGamification } from '@/context/GamificationContext';
import { FaGoogle } from 'react-icons/fa';

const GoogleLoginButton = () => {
  const router = useRouter();
  const { showNotification } = useNotification();
  const { fetchUserData } = useGamification();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch(
          'http://127.0.0.1:8000/api/v1/auth/google/',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              access_token: tokenResponse.access_token,
            }),
          },
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(
            data.error || 'Login dengan Google gagal di backend.',
          );
        }

        localStorage.setItem('accessToken', data.token);
        showNotification('Anda berhasil login.', 'success');

        await fetchUserData(data.token);

        router.push('/');
        router.refresh();
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          showNotification(error.message, 'error');
        }
      }
    },
    onError: () => {
      console.error('Login dengan Google Gagal');
      showNotification(
        'Terjadi kesalahan saat mencoba login dengan Google.',
        'error',
      );
    },
  });

  return (
    <button
      onClick={() => login()}
      className="flex items-center justify-center gap-3 w-full max-w-xs font-bold py-3 px-6 rounded-full transition-all duration-300 text-white bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 transform hover:scale-105"
    >
      <FaGoogle />
      <span>Masuk dengan Google</span>
    </button>
  );
};

export default GoogleLoginButton;
