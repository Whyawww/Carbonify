'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';

// Tipe data untuk Aksi
interface Action {
  id: number;
  emoji: string;
  title: string;
  description: string;
  category: string;
  image: string | null;
}

// Komponen Kartu Aksi yang bisa digunakan ulang
const ActionCard = ({
  action,
  isHighlighted,
}: {
  action: Action;
  isHighlighted: boolean;
}) => (
  <Link
    href={`/actions/${action.id}`}
    key={action.id}
    className={`block p-[1px] rounded-2xl transition-all duration-300 hover:scale-105 ${
      isHighlighted
        ? 'bg-gradient-to-r from-yellow-400/50 to-red-400/50'
        : 'bg-gradient-to-r from-green-400/30 to-cyan-400/30'
    }`}
  >
    <div className="bg-gray-900/80 backdrop-blur-lg p-6 h-full rounded-2xl shadow-lg">
      <div className="text-4xl mb-4">{action.emoji}</div>
      <h3 className="text-xl font-bold mb-2 text-white">{action.title}</h3>
      <p className="text-gray-400">{action.description}</p>
    </div>
  </Link>
);

// Komponen utama untuk logika halaman
function ActionsPageContent() {
  const searchParams = useSearchParams();
  const highlightParams = searchParams.get('highlight');

  const [highlightedActions, setHighlightedActions] = useState<Action[]>([]);
  const [otherActions, setOtherActions] = useState<Action[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAndFilterActions() {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/actions/');
        const data: Action[] = await response.json();

        if (highlightParams) {
          const categoriesToHighlight = highlightParams
            .toLowerCase()
            .split(',');
          const highlighted = data.filter((action) =>
            categoriesToHighlight.includes(action.category.toLowerCase()),
          );
          const others = data.filter(
            (action) =>
              !categoriesToHighlight.includes(action.category.toLowerCase()),
          );
          setHighlightedActions(highlighted);
          setOtherActions(others);
        } else {
          setOtherActions(data);
          setHighlightedActions([]);
        }
      } catch (error) {
        console.error('Gagal mengambil data aksi:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAndFilterActions();
  }, [highlightParams]);

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
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
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

        {/* Bagian Aksi yang Direkomendasikan */}
        {highlightedActions.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-yellow-300">
              Rekomendasi Aksi Untukmu
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {highlightedActions.map((action) => (
                <ActionCard
                  key={action.id}
                  action={action}
                  isHighlighted={true}
                />
              ))}
            </div>
            <hr className="my-12 border-gray-700" />
          </div>
        )}

        {/* Bagian Aksi Lainnya */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">
            {highlightedActions.length > 0 ? 'Aksi Lainnya' : 'Semua Aksi'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherActions.map((action) => (
              <ActionCard
                key={action.id}
                action={action}
                isHighlighted={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ActionsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Memuat halaman...
        </div>
      }
    >
      <ActionsPageContent />
    </Suspense>
  );
}
