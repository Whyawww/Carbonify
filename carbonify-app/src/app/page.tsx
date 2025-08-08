'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TypeAnimation } from 'react-type-animation';
import StatCard from '@/components/StatCard';
import { weeklyChallenges } from '@/lib/gamificationData';
import { useGamification } from '@/context/GamificationContext';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import { useNotification } from '@/context/NotificationContext';
import { FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tim Carbonify',
  description: 'Inilah Tim Pahlwan Iklim Carbonify menuju bumi yang sehat.',
};

const ChallengeCard = ({
  challenge,
}: {
  challenge: (typeof weeklyChallenges)[0];
}) => {
  const { isLoggedIn, profile, fetchUserData } = useGamification();
  const { showNotification } = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const isCompleted = profile?.completed_challenges?.includes(challenge.id);

  const handleCompleteChallenge = async () => {
    if (!isLoggedIn) {
      showNotification('Silakan login terlebih dahulu!', 'error');
      router.push('/login');
      return;
    }

    const token = localStorage.getItem('accessToken');
    setIsSubmitting(true);

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/api/v1/complete-weekly-challenge/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            points: challenge.points,
            challenge_id: challenge.id,
          }),
        },
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Gagal menyelesaikan tantangan.');
      }

      showNotification('Selamat! Tantangan berhasil diselesaikan.', 'success');

      if (token) {
        fetchUserData(token);
      }
    } catch (err) {
      if (err instanceof Error) {
        showNotification('Error: ${err.message}', 'error');
      } else {
        showNotification(
          'Terjadi kesalahan saat menyelesaikan tantangan.',
          'error',
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-[1px] bg-gradient-to-r from-green-400/30 to-cyan-400/30 rounded-2xl h-full">
      <div className="bg-gray-900/80 backdrop-blur-lg p-6 rounded-2xl h-full flex flex-col justify-between text-center">
        <div>
          <p className="text-cyan-400 font-semibold text-lg">
            {challenge.title}
          </p>
          <p className="text-xl my-4">{challenge.description}</p>
        </div>
        <button
          onClick={handleCompleteChallenge}
          disabled={isCompleted || isSubmitting}
          className={`font-bold py-2 px-6 rounded-md text-white transition-all duration-300 mt-4 ${
            isCompleted
              ? 'bg-gray-600 cursor-not-allowed flex items-center justify-center gap-2'
              : 'bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600'
          }`}
        >
          {isCompleted ? (
            <>
              <FaCheckCircle /> Selesai
            </>
          ) : isSubmitting ? (
            'Memproses...'
          ) : (
            `Selesaikan (+${challenge.points} Poin)`
          )}
        </button>
      </div>
    </div>
  );
};

// -- KOMPONEN UTAMA HALAMAN BERANDA --
export default function Home() {
  const { isLoggedIn, logout } = useGamification();

  return (
    <div className="min-h-screen">
      <section className="relative flex h-screen items-center justify-center">
        {/* Bg Video */}
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 z-0 h-full w-full object-cover"
        >
          <source src="video/videobg.mp4" type="video/mp4" />
        </video>

        {/* Overlay  */}
        <div className="absolute top-0 left-0 z-10 h-full w-full bg-black/50"></div>

        {/* Tengah */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center text-white p-4">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent pb-2">
            Bergabunglah dengan Gerakan Kami
          </h2>
          <p className="text-lg max-w-4xl text-gray-200 leading-relaxed">
            Lacak jejak karbon Anda dan ambil aksi nyata untuk iklim. Jadilah
            bagian dari perubahan, dapatkan poin, dan puncaki papan peringkat
            pahlawan iklim.
          </p>

          {/* Login */}
          <div className="mt-8">
            {isLoggedIn ? (
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-white">
                  Selamat Datang Kembali!
                </h3>
                <p className="text-gray-300">
                  Lanjutkan perjalanan Anda untuk menjadi pahlawan iklim.
                </p>
                <div className="flex justify-center pt-2">
                  <button
                    onClick={logout}
                    className="font-bold py-3 px-8 rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-white">
                  Mulai Perjalanan Anda
                </h3>
                <p className="text-gray-300">
                  Login dengan akun Google untuk menyimpan progres Anda.
                </p>
                <div className="flex justify-center pt-2">
                  <GoogleLoginButton />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <main className="relative flex flex-col items-center justify-center min-h-screen pt-16 md:pt-20 lg:pt-24 overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Hero Content */}
          <div className="mb-8 md:mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent leading-tight">
              Aksi Nyata Untuk bumi yang lebih sehat.
            </h3>
            <div className="mb-8 md:mb-10">
              <TypeAnimation
                sequence={[
                  'Tingkatkan kesadaran tentang jejak karbon Anda melalui platform interaktif yang mudah digunakan.',
                  2000,
                  'Dapatkan insight mendalam tentang dampak aktivitas harian terhadap perubahan iklim.',
                  2000,
                  'Wujudkan aksi nyata untuk masa depan yang lebih berkelanjutan bersama komunitas peduli lingkungan.',
                  2000,
                ]}
                wrapper="p"
                speed={50}
                className="text-base sm:text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4"
                repeat={Infinity}
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6 mb-12 md:mb-16 px-4">
              <Link
                href="/calculate"
                className="group relative bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto text-center"
              >
                <span className="relative z-10 text-sm md:text-base">
                  Mulai Eksplorasi Jejak Karbon
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                href="/actions"
                className="group bg-transparent border-2 border-green-400 hover:bg-gradient-to-r hover:from-green-400 hover:to-cyan-400 text-green-400 hover:text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full transition-all duration-300 transform hover:scale-105 backdrop-blur-sm w-full sm:w-auto text-center text-sm md:text-base"
              >
                Jelajahi Platform
              </Link>
            </div>
          </div>

          {/* Hero Images Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
            <div className="group relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/Jejakkarbon.jpg"
                alt="Tingkatkan Kesadaran Jejak Karbon"
                width={400}
                height={300}
                className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4">
                <h3 className="text-white font-bold text-base md:text-lg mb-1 md:mb-2">
                  Tingkatkan Kesadaran Jejak Karbon
                </h3>
                <p className="text-gray-300 text-xs md:text-sm">
                  Pelajari dan hitung dampak karbon Anda melalui alat interaktif
                  yang informatif dan mudah digunakan.
                </p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/Kesadaran.jpg"
                alt="Dashboard Kesadaran Lingkungan"
                width={400}
                height={300}
                className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4">
                <h3 className="text-white font-bold text-base md:text-lg mb-1 md:mb-2">
                  Pahami Dampak Gaya Hidup Anda
                </h3>
                <p className="text-gray-300 text-xs md:text-sm">
                  Pahami gaya hidup anda untuk menyadarkan tentang konsekuensi
                  dari emisi karbon terhadap lingkungan dan iklim global.
                </p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-2xl sm:col-span-2 lg:col-span-1">
              <Image
                src="/images/Aksinyata.jpg"
                alt="Aksi Nyata Perubahan Iklim"
                width={400}
                height={300}
                className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4">
                <h3 className="text-white font-bold text-base md:text-lg mb-1 md:mb-2">
                  Mulailah Aksi Nyata
                </h3>
                <p className="text-gray-300 text-xs md:text-sm">
                  Mari lakukan langkah konkret yang dapat mengurangi emisi
                  karbon dan berperan aktif dalam mitigasi perubahan iklim.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Statistics Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
              Mengapa Kita Harus Bertindak?
            </h2>
            <p className="max-w-4xl mx-auto text-gray-400 text-base md:text-lg leading-relaxed px-4">
              Perubahan iklim adalah tantangan terbesar abad ini. Setiap
              aktivitas kita menghasilkan jejak karbon yang mempengaruhi masa
              depan planet. Saatnya meningkatkan kesadaran dan mengambil aksi
              nyata.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="group relative bg-gradient-to-br from-red-900/30 to-orange-900/30 p-6 md:p-8 rounded-xl backdrop-blur-sm border border-red-500/20 hover:border-red-400/50 transition-all duration-300">
              <StatCard
                prefix="+"
                end={1.1}
                decimals={1}
                suffix="°C"
                title="Kenaikan Suhu Global Sejak Era Pra-Industri"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="group relative bg-gradient-to-br from-yellow-900/30 to-orange-900/30 p-6 md:p-8 rounded-xl backdrop-blur-sm border border-yellow-500/20 hover:border-yellow-400/50 transition-all duration-300">
              <StatCard
                end={2.18}
                decimals={1}
                suffix=" Ton CO₂"
                title="Rata-rata Jejak Karbon Tahunan per Orang Indonesia"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="group relative bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-6 md:p-8 rounded-xl backdrop-blur-sm border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300">
              <StatCard
                end={31.9}
                decimals={1}
                suffix="%"
                title="Target Pengurangan Emisi Indonesia di 2030"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
              Dari Data ke Aksi Nyata!
            </h2>
            <p className="max-w-3xl mx-auto text-gray-400 text-base md:text-lg px-4">
              Platform interaktif yang menggabungkan teknologi, edukasi, dan
              komunitas untuk meningkatkan kesadaran tentang jejak karbon dan
              mendorong aksi nyata dalam menghadapi perubahan iklim.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="group relative bg-gradient-to-br from-green-900/40 to-emerald-900/40 p-6 md:p-8 rounded-xl backdrop-blur-sm border border-green-500/20 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg">
                1
              </div>
              <div className="text-center pt-6 md:pt-8">
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="4"
                      y="2"
                      width="16"
                      height="20"
                      rx="2"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="7"
                      y="4.5"
                      width="10"
                      height="2"
                      rx="0.5"
                      fill="currentColor"
                    />
                    <circle cx="8" cy="10" r="0.7" fill="currentColor" />
                    <circle cx="12" cy="10" r="0.7" fill="currentColor" />
                    <circle cx="16" cy="10" r="0.7" fill="currentColor" />
                    <circle cx="8" cy="14" r="0.7" fill="currentColor" />
                    <circle cx="12" cy="14" r="0.7" fill="currentColor" />
                    <circle cx="16" cy="14" r="0.7" fill="currentColor" />
                    <circle cx="8" cy="18" r="0.7" fill="currentColor" />
                    <circle cx="12" cy="18" r="0.7" fill="currentColor" />
                    <rect
                      x="15"
                      y="17"
                      width="2"
                      height="2"
                      fill="currentColor"
                      rx="0.5"
                    />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-green-300">
                  Kalkulator Interaktif
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  Kalkulator jejak karbon akan membantumu melihat seberapa besar
                  dampak aktivitas harianmu terhadap perubahan iklim.
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="group relative bg-gradient-to-br from-cyan-900/40 to-blue-900/40 p-6 md:p-8 rounded-xl backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg">
                2
              </div>
              <div className="text-center pt-6 md:pt-8">
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-cyan-300">
                  Kesadaran Melalui Data
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  Informasi yang dihasilkan dapat menambah pemahaman yang lebih
                  akurat terhadap jejak karbon dan dampak perubahan iklim.
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="group relative bg-gradient-to-br from-purple-900/40 to-indigo-900/40 p-6 md:p-8 rounded-xl backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg">
                3
              </div>
              <div className="text-center pt-6 md:pt-8">
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full flex items-center justify-center">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="7" r="3" fill="#ffffffff" />
                    <path
                      d="M12 11c-3.5 0-6.5 2-6.5 5v3h13v-3c0-3-3-5-6.5-5z"
                      fill="#ffffffff"
                    />
                    <circle cx="6" cy="8" r="2.5" fill="#ffffffff" />
                    <path
                      d="M6 11.5c-2.5 0-4.5 1.5-4.5 3.5v2.5h4v-1.5c0-1.5 0.5-3 2-4h-1.5z"
                      fill="#ffffffff"
                    />
                    <circle cx="18" cy="8" r="2.5" fill="#ffffffff" />
                    <path
                      d="M18 11.5c2.5 0 4.5 1.5 4.5 3.5v2.5h-4v-1.5c0-1.5-0.5-3-2-4h1.5z"
                      fill="#ffffffff"
                    />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-purple-300">
                  Aksi Nyata Bersama
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  Bergabunglah dengan komunitas kami dan lakukan aksi nyata
                  untuk menghadapi perubahan iklim dan membawa dampak positif
                  bagi bumi.
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Gamifikasi */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
              Tantangan yang Tersedia
            </h2>
            <p className="max-w-3xl mx-auto text-gray-400 text-base md:text-lg">
              Selesaikan tantangan untuk mendapatkan poin dan lencana, serta
              buktikan kontribusimu!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {weeklyChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </div>
      </section>

      {/* Reedem */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Kolom Kiri: Gambar Ilustrasi */}
            <div className="relative w-full h-64 lg:h-80">
              <Image
                src="/images/redeem.jpg"
                alt="Tukarkan Poin dengan Saldo"
                layout="fill"
                objectFit="contain"
                className="rounded-2xl"
              />
            </div>

            {/* Kolom Kanan: Penjelasan & Tombol */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Aksi Nyata, Imbalan Nyata
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed mb-6">
                Setiap poin yang Anda kumpulkan adalah bukti kontribusi Anda
                untuk bumi. Kami menghargai usaha Anda dengan imbalan yang bisa
                Anda nikmati.
              </p>
              <div className="inline-block bg-gray-800/50 p-4 rounded-xl mb-8">
                <p className="text-lg">
                  <span className="font-bold text-cyan-400">10.000 Poin</span> ={' '}
                  <span className="font-bold text-green-400">
                    Rp 5.000 Saldo
                  </span>
                </p>
              </div>
              <div>
                <Link
                  href="/redeem"
                  className="inline-block font-bold py-3 px-8 rounded-md text-white bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 transition-transform transform hover:scale-105"
                >
                  Tukarkan Poin Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-r from-green-900/50 via-emerald-800/50 to-cyan-900/50 backdrop-blur-sm border-t border-green-500/20">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-white">
            Saatnya Mengambil Aksi untuk Iklim
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto px-4">
            Bergabunglah dengan Carbonify dan jadilah bagian dari gerakan global
            untuk meningkatkan kesadaran tentang jejak karbon dan mengambil aksi
            nyata dalam menghadapi perubahan iklim.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6 px-4">
            <Link
              href="/calculate"
              className="group bg-white text-green-700 font-bold py-3 px-6 md:py-4 md:px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:bg-green-50 w-full sm:w-auto text-center text-sm md:text-base"
            >
              Mulai Eksplorasi Platform
            </Link>
            <Link
              href="/about"
              className="group border-2 border-white text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-white hover:text-green-700 w-full sm:w-auto text-center text-sm md:text-base"
            >
              Pelajari Misi Kami
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
