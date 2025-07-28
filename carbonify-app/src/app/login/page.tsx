import GoogleLoginButton from '@/components/GoogleLoginButton';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl shadow-2xl">
        {/* Kolom Kiri: Ilustrasi */}
        <div className="hidden md:block relative w-full h-full">
          <Image
            src="/images/login.png"
            alt="Ilustrasi Aksi Iklim"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
        </div>

        {/* Kolom Kanan: Konten Login */}
        <div className="bg-gray-900/80 backdrop-blur-lg p-8 md:p-12 flex flex-col items-center justify-center text-center">
          <Link href="/">
            <Image
              src="/icon.svg"
              alt="Logo"
              width={150}
              height={50}
              className="mb-6"
            />
          </Link>

          <h1 className="text-3xl font-bold mb-2">Selamat Datang Kembali</h1>
          <p className="text-gray-400 mb-8 max-w-sm">
            Masuk dengan akun Google Anda untuk melanjutkan perjalanan menjadi
            pahlawan iklim.
          </p>

          <div className="w-full flex justify-center">
            <GoogleLoginButton />
          </div>

          <p className="text-xs text-gray-500 mt-8 max-w-xs">
            Dengan melanjutkan, Anda berkontribusi pada gerakan kolektif untuk
            masa depan bumi yang lebih hijau.
          </p>
        </div>
      </div>
    </div>
  );
}
