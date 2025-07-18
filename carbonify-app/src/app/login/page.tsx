// src/app/login/page.tsx
import GoogleLoginButton from '@/components/GoogleLoginButton';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 text-center">
      <h1 className="text-4xl font-bold">Login ke Carbonify</h1>
      <p className="text-gray-400 max-w-sm">
        Gunakan akun Google Anda untuk melanjutkan dan mulai melacak progres aksi iklim Anda.
      </p>
      <div className="pt-4">
        <GoogleLoginButton />
      </div>
    </div>
  );
}