'use client';

import { TypeAnimation } from 'react-type-animation';
import { actionsData } from '@/lib/data'; // <-- Impor dari sini

// HAPUS array 'actionsData' yang ada di sini sebelumnya

export default function ActionsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-2">
          Aksi Nyata untuk Iklim
        </h1>

        <TypeAnimation
          sequence={[
            'Langkah-langkah kecil dengan dampak besar yang bisa kamu mulai hari ini.',
            2000,
          ]}
          wrapper="p"
          speed={50}
          className="text-center text-gray-400 mb-12 text-lg"
          repeat={0}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {actionsData.map((action) => (
            <div
              key={action.id}
              className="bg-gray-900/30 backdrop-blur-lg border border-gray-700 p-6 rounded-2xl shadow-lg hover:border-gray-500 hover:scale-105 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{action.emoji}</div>
              <h3 className="text-2xl font-bold mb-2">{action.title}</h3>
              <p className="text-gray-400">{action.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}