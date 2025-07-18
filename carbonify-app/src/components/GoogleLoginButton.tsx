'use client';

import { GoogleLogin, CredentialResponse } from '@react-oauth/google'; 
import { useRouter } from 'next/navigation';

const GoogleLoginButton = () => {
  const router = useRouter();

const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/auth/google/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Ganti 'access_token' menjadi 'token' agar sesuai dengan backend
          token: credentialResponse.credential, 
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Login dengan Google gagal di backend.');
      }
      
      // Simpan token dari backend kita, bukan token Google
      localStorage.setItem('accessToken', data.token); 
      
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Login Gagal. Pastikan backend Anda berjalan dan Client ID sudah benar.');
    }
};

  const handleError = () => {
    console.error('Login dengan Google Gagal');
    alert('Terjadi kesalahan saat mencoba login dengan Google.');
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