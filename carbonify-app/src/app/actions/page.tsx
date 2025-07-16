'use client';

import { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

// Tipe data untuk Aksi Nyata, sesuai dengan respons API
interface Action {
  id: number;
  emoji: string;
  title: string;
  description: string;
}

export default function ActionsPage() {
  // State untuk menyimpan data dari API
  const [actions, setActions] = useState<Action[]>([]);
  // State untuk menandakan proses pengambilan data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActions() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/actions/');
        if (!response.ok) {
          throw new Error('Gagal mengambil data dari server');
        }
        const data = await response.json();
        setActions(data);
      } catch (error) {
        console.error('Gagal mengambil data aksi:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchActions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl text-gray-400">Memuat Aksi Nyata...</p>
      </div>
    );
  }

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
          {actions.map((action) => (
            // Container dengan border gradasi
            <div
              key={action.id}
              className="p-[1px] bg-gradient-to-r from-green-400/30 to-cyan-400/30 rounded-2xl hover:from-green-400/50 hover:to-cyan-400/50 transition-all duration-300"
            >
              <div className="bg-gray-900/80 backdrop-blur-lg p-6 h-full rounded-2xl shadow-lg transition-all duration-300">
                <div className="text-4xl mb-4">{action.emoji}</div>
                <h3 className="text-2xl font-bold mb-2">{action.title}</h3>
                <p className="text-gray-400">{action.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
