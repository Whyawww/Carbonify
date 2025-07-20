'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Action {
  id: number;
  emoji: string;
  title: string;
  description: string;
  category: string;
}

function RecommendationsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoriesParam = searchParams.get('categories');

  const [recommendedActions, setRecommendedActions] = useState<Action[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAndFilterActions(categories: string) {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/actions/');
        const allActions: Action[] = await response.json();

        const categoriesToHighlight = categories.toLowerCase().split(',');

        const filteredActions = allActions.filter((action) =>
          categoriesToHighlight.includes(action.category.toLowerCase()),
        );

        setRecommendedActions(filteredActions);
      } catch (error) {
        console.error('Gagal mengambil data aksi:', error);
      } finally {
        setLoading(false);
      }
    }

    if (categoriesParam) {
      fetchAndFilterActions(categoriesParam);
    } else {
      router.push('/calculate');
    }
  }, [categoriesParam, router]);

  const ActionCard = ({ action }: { action: Action }) => (
    <Link
      href={`/actions/${action.id}`}
      key={action.id}
      className="block p-[1px] rounded-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-r from-green-400/30 to-cyan-400/30"
    >
      <div className="bg-gray-900/80 backdrop-blur-lg p-6 h-full rounded-2xl shadow-lg">
        <div className="text-4xl mb-4">{action.emoji}</div>
        <h3 className="text-xl font-bold mb-2 text-white">{action.title}</h3>
        <p className="text-gray-400">{action.description}</p>
      </div>
    </Link>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl text-gray-400">Mencari Rekomendasi Aksi...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-2">
          Rekomendasi Aksi Untukmu
        </h1>
        <p className="text-center text-gray-400 mb-12 text-lg">
          Berikut adalah beberapa langkah yang bisa kamu ambil untuk mengurangi
          jejak karbon berdasarkan hasil kalkulasimu.
        </p>

        {recommendedActions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedActions.map((action) => (
              <ActionCard key={action.id} action={action} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-lg mt-16">
            Tidak ada rekomendasi aksi yang ditemukan.
          </p>
        )}
        <div className="text-center mt-16">
          <Link
            href="/actions"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full transition-colors text-lg"
          >
            Lihat Semua Aksi Lainnya
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RecommendationsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Memuat halaman...
        </div>
      }
    >
      <RecommendationsContent />
    </Suspense>
  );
}
