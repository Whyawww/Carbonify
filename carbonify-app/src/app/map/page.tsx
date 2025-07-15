'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { ecoPoints } from '@/lib/data'; // <-- Impor dari sini

// HAPUS array 'ecoPoints' yang ada di sini sebelumnya

export default function MapPage() {
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/Map'), {
        loading: () => (
          <p className="text-center text-gray-500">Memuat Peta...</p>
        ),
        ssr: false,
      }),
    [],
  );

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-2">Peta Aksi Lokal</h1>

        <TypeAnimation
          sequence={['Temukan lokasi ramah lingkungan di sekitarmu.', 2000]}
          wrapper="p"
          speed={50}
          className="text-center text-gray-400 mb-12 text-lg"
          repeat={0}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-gray-900/30 backdrop-blur-lg border border-gray-700 p-6 rounded-2xl shadow-lg h-[600px] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Titik Lestari Terdekat</h2>
            <div className="space-y-4">
              {ecoPoints.map((point) => (
                <div
                  key={point.id}
                  className="border-b border-gray-700 pb-4 last:border-b-0"
                >
                  <h3 className="text-lg font-bold text-green-400">
                    {point.name}
                  </h3>
                  <p className="text-sm text-gray-300">{point.category}</p>
                  <p className="text-xs text-gray-500 mt-1">{point.address}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-gray-900/30 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-lg h-[600px] overflow-hidden">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
}