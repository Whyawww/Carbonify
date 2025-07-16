'use client';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';
import StatCard from '@/components/StatCard';
import './globals.css';
<Head>
  <title>Carbonify</title>
  <meta name="description" content="Platform edukasi dan aksi jejak karbon" />
</Head>
export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Main Background */}
      <div 
        className="min-h-screen"
        style={{
          backgroundImage: `radial-gradient(
            circle at 50% 50%,
            rgba(3, 80, 90, 0.5) 0%,
            rgba(0, 0, 0, 0) 70%
          )`
        }}
      >
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
                  <span className="relative z-10 text-sm md:text-base">Mulai Eksplorasi Jejak Karbon</span>
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

            {/* Hero Images Grid - Responsive */}
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
                  <h3 className="text-white font-bold text-base md:text-lg mb-1 md:mb-2">Tingkatkan Kesadaran Jejak Karbon</h3>
                  <p className="text-gray-300 text-xs md:text-sm">Pelajari dan hitung dampak karbon Anda melalui alat interaktif yang informatif dan mudah digunakan.</p>
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
                  <h3 className="text-white font-bold text-base md:text-lg mb-1 md:mb-2">Pahami Dampak Gaya Hidup Anda</h3>
                  <p className="text-gray-300 text-xs md:text-sm">Pahami gaya hidup anda untuk menyadarkan tentang konsekuensi dari emisi karbon terhadap lingkungan dan iklim global.</p>
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
                  <h3 className="text-white font-bold text-base md:text-lg mb-1 md:mb-2">Mulailah Aksi Nyata</h3>
                  <p className="text-gray-300 text-xs md:text-sm">Mari lakukan langkah konkret yang dapat mengurangi emisi karbon dan berperan aktif dalam mitigasi perubahan iklim.</p>
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
                Perubahan iklim adalah tantangan terbesar abad ini. Setiap aktivitas kita menghasilkan jejak karbon yang 
                mempengaruhi masa depan planet. Saatnya meningkatkan kesadaran dan mengambil aksi nyata.
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

        {/* Platform Features Section */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
                Fitur Interaktif Carbonify
              </h2>
              <p className="max-w-3xl mx-auto text-gray-400 text-base md:text-lg px-4">
                Platform web interaktif yang menggabungkan edukasi, visualisasi data, dan aksi nyata untuk 
                meningkatkan kesadaran tentang jejak karbon dan perubahan iklim.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
              <div className="group relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/images/carbon-tracking.jpg"
                  alt="Pelacakan Jejak Karbon Interaktif"
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-2 md:mb-3">Monitoring Interaktif</h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    Pantau jejak karbon dengan kalkulator interaktif yang membantu memahami jejak karbon bulananmu.
                  </p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/images/personalized-recommendations.jpg"
                  alt="Rekomendasi Aksi Iklim Personal"
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-2 md:mb-3">Aksi Iklim Personal</h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    Rekomendasi yang dipersonalisasi untuk mengambil aksi nyata dalam menghadapi perubahan iklim.
                  </p>
                </div>
              </div>
            </div>

            {/* Small features grid - Responsive */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <div className="group relative overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/images/data-visualization.jpg"
                  alt="Visualisasi Data Iklim"
                  width={300}
                  height={200}
                  className="w-full h-24 md:h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute bottom-1 md:bottom-2 left-1 md:left-2 right-1 md:right-2">
                  <p className="text-white text-xs md:text-xs font-semibold">Visualisasi Data Iklim</p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/images/community-platform.jpg"
                  alt="Komunitas Aksi Iklim"
                  width={300}
                  height={200}
                  className="w-full h-24 md:h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute bottom-1 md:bottom-2 left-1 md:left-2 right-1 md:right-2">
                  <p className="text-white text-xs md:text-xs font-semibold">Komunitas Aksi Iklim</p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/images/local-mapping.jpg"
                  alt="Pemetaan Dampak Lokal"
                  width={300}
                  height={200}
                  className="w-full h-24 md:h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute bottom-1 md:bottom-2 left-1 md:left-2 right-1 md:right-2">
                  <p className="text-white text-xs md:text-xs font-semibold">Pemetaan Dampak Lokal</p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/images/progress-tracking.jpg"
                  alt="Tracking Aksi Iklim"
                  width={300}
                  height={200}
                  className="w-full h-24 md:h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute bottom-1 md:bottom-2 left-1 md:left-2 right-1 md:right-2">
                  <p className="text-white text-xs md:text-xs font-semibold">Tracking Aksi Iklim</p>
                </div>
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
                Platform interaktif yang menggabungkan teknologi, edukasi, dan komunitas untuk meningkatkan kesadaran 
                tentang jejak karbon dan mendorong aksi nyata dalam menghadapi perubahan iklim.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="group relative bg-gradient-to-br from-green-900/40 to-emerald-900/40 p-6 md:p-8 rounded-xl backdrop-blur-sm border border-green-500/20 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg">
                  1
                </div>
                <div className="text-center pt-6 md:pt-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                 <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="4" y="2" width="16" height="20" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />     
                    <rect x="7" y="4.5" width="10" height="2" rx="0.5" fill="currentColor" />
                    <circle cx="8" cy="10" r="0.7" fill="currentColor" />
                    <circle cx="12" cy="10" r="0.7" fill="currentColor" />
                    <circle cx="16" cy="10" r="0.7" fill="currentColor" />                  
                    <circle cx="8" cy="14" r="0.7" fill="currentColor" />
                    <circle cx="12" cy="14" r="0.7" fill="currentColor" />
                    <circle cx="16" cy="14" r="0.7" fill="currentColor" />
                    <circle cx="8" cy="18" r="0.7" fill="currentColor" />
                    <circle cx="12" cy="18" r="0.7" fill="currentColor" />
                    <rect x="15" y="17" width="2" height="2" fill="currentColor" rx="0.5" />
                  </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-green-300">Kalkulator Interaktif</h3>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    Kalkulator jejak karbon akan membantumu melihat seberapa besar dampak aktivitas harianmu terhadap perubahan iklim.
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
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-cyan-300">Kesadaran Melalui Data</h3>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    Informasi yang dihasilkan dapat menambah pemahaman yang lebih akurat terhadap jejak karbon dan dampak perubahan iklim.
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
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-purple-300">Aksi Nyata Bersama</h3>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    Bergabunglah dengan komunitas kami dan lakukan aksi nyata untuk menghadapi perubahan iklim dan membawa dampak positif bagi bumi.
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
              Bergabunglah dengan Carbonify dan jadilah bagian dari gerakan global untuk meningkatkan kesadaran 
              tentang jejak karbon dan mengambil aksi nyata dalam menghadapi perubahan iklim.
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
    </div>
  );
}