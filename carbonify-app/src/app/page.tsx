'use client';

import Image from 'next/image';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';
import StatCard from '@/components/StatCard';

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen pt-24 md:pt-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Aksi Nyata untuk Bumi yang Lebih Sehat
          </h1>
          <TypeAnimation
            sequence={[
              'Bergabunglah dengan gerakan untuk mengurangi jejak karbon dan menciptakan masa depan yang berkelanjutan.',
              2000,
            ]}
            wrapper="p"
            speed={50}
            className="text-lg md:text-xl text-gray-400 mb-10"
            repeat={0}
          />
          <div className="flex justify-center space-x-4">
            <Link
              href="/calculate"
              className="bg-gradient-to-r from-green-400 to-cyan-400 hover:from-cyan-400 hover:to-green-400 text-white font-bold py-3 px-6 rounded-full transition-colors"
            >
              Hitung Jejak Karbonmu
            </Link>
            <Link
              href="/actions"
              className="bg-transparent border border-gradient-to-r from-green-400 to-cyan-400 hover:bg-gradient-to-r hover:border-transparent text-green-500 hover:text-white font-bold py-3 px-6 rounded-full transition-colors"
            >
              Lihat Aksi
            </Link>
          </div>
          <div className="mt-12">
            <Image
              src="/images/earth-grid.png"
              alt="Ilustrasi Bumi dengan Jaringan"
              width={600}
              height={338}
              className="mx-auto rounded-lg shadow-lg"
              priority
            />
          </div>
        </div>
      </main>

      {/* Bagian Statistik dengan Animasi */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Mengapa Ini Penting?
        </h2>
        <p className="max-w-3xl mx-auto text-gray-400 mb-12">
          Perubahan iklim bukan lagi isu masa depan. Dampaknya sudah kita
          rasakan sekarang, dari kenaikan permukaan laut hingga cuaca ekstrem.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          <StatCard
            prefix="+"
            end={1.1}
            decimals={1}
            suffix="°C"
            title="Kenaikan Suhu Rata-rata Global"
          />
          <StatCard
            end={9.9}
            decimals={1}
            suffix=" Juta Ha"
            title="Hutan Hilang di Indonesia (1990-2020)"
          />
          <StatCard
            prefix="~"
            end={23}
            suffix=" Juta"
            title="Orang di Pesisir Indonesia Terancam"
          />
        </div>
      </section>

      {/* Bagian "Cara Kerja" */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Mulai Perubahan dalam 3 Langkah
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="border-t-2 border-green-500 pt-4">
            <p className="text-5xl font-bold text-cyan-700 mb-2">01</p>
            <h3 className="text-xl font-bold mb-2">Hitung Jejak Karbon</h3>
            <p className="text-gray-400">
              Gunakan kalkulator kami untuk mengetahui estimasi jejak karbon
              bulananmu.
            </p>
          </div>
          <div className="border-t-2 border-green-500 pt-4">
            <p className="text-5xl font-bold text-cyan-700 mb-2">02</p>
            <h3 className="text-xl font-bold mb-2">Pelajari Aksi Nyata</h3>
            <p className="text-gray-400">
              Temukan daftar langkah-langkah praktis yang bisa kamu terapkan
              sehari-hari.
            </p>
          </div>
          <div className="border-t-2 border-green-500 pt-4">
            <p className="text-5xl font-bold text-cyan-700 mb-2">03</p>
            <h3 className="text-xl font-bold mb-2">Temukan Peta Lokal</h3>
            <p className="text-gray-400">
              Cari lokasi ramah lingkungan seperti bank sampah atau thrift store
              di sekitarmu.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
