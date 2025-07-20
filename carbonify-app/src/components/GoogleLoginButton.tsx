'use client';

import { GoogleLogin, CredentialResponse } from '@react-oauth/google'; 
import { useRouter } from 'next/navigation';
import { useNotification } from '@/context/NotificationContext'; // <-- 1. Impor hook notifikasi

const GoogleLoginButton = () => {
  const router = useRouter();
  const { showNotification } = useNotification(); // <-- 2. Panggil hook notifikasi

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/auth/google/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Ganti 'access_token' menjadi 'token' agar sesuai dengan backend
          token: credentialResponse.credential, 
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Login dengan Google gagal di backend.');
      }
      
      localStorage.setItem('accessToken', data.token); 
      
      // ✅ 3. Ganti alert() dengan notifikasi toast
      showNotification('Anda berhasil login.', 'success');
      
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error(error);
      // Ganti alert() dengan notifikasi error
      showNotification('Login Gagal. Pastikan backend Anda berjalan.', 'error');
    }
  };

  const handleError = () => {
    console.error('Login dengan Google Gagal');
    // Ganti alert() dengan notifikasi error
    showNotification('Terjadi kesalahan saat mencoba login dengan Google.', 'error');
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      theme="filled_blue"
      size="large"
      shape="pill"
    />
  );
};

export default GoogleLoginButton;