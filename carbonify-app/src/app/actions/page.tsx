'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link'; // Impor Link

// Tipe data Action
interface Action {
  id: number;
  emoji: string;
  title: string;
  description: string;
  category: string;
}

// Komponen utama untuk logika halaman
function ActionsPageContent() {
  const searchParams = useSearchParams();
  const highlightParams = searchParams.get('highlight');
  
  const [highlightedActions, setHighlightedActions] = useState<Action[]>([]);
  const [otherActions, setOtherActions] = useState<Action[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllActions, setShowAllActions] = useState(false);

  useEffect(() => {
    async function fetchAndFilterActions() {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/actions/');
        const data: Action[] = await response.json();

        if (highlightParams) {
          const categoriesToHighlight = highlightParams.split(',');
          const highlighted = data.filter(action => categoriesToHighlight.includes(action.category));
          const others = data.filter(action => !categoriesToHighlight.includes(action.category));
          setHighlightedActions(highlighted);
          setOtherActions(others);
          setShowAllActions(false); // Sembunyikan aksi lain pada awalnya
        } else {
          setOtherActions(data);
          setHighlightedActions([]);
          setShowAllActions(true); // Langsung tampilkan semua jika tidak ada highlight
        }
      } catch (error) {
        console.error("Gagal mengambil data aksi:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAndFilterActions();
  }, [highlightParams]);

  // Komponen Kartu Aksi yang bisa digunakan ulang
  const ActionCard = ({ action, className }: { action: Action, className: string }) => (
    <Link href={`/actions/${action.id}`} key={action.id} className={className}>
      <div className="bg-gray-900/80 backdrop-blur-lg p-6 h-full rounded-2xl shadow-lg transition-all duration-300">
        <div className="text-4xl mb-4">{action.emoji}</div>
        <h3 className="text-2xl font-bold mb-2">{action.title}</h3>
        <p className="text-gray-400">{action.description}</p>
      </div>
    </Link>
  );

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
        <h1 className="text-4xl font-bold text-center mb-2">Aksi Nyata untuk Iklim</h1>
        <TypeAnimation
          sequence={['Langkah-langkah kecil dengan dampak besar yang bisa kamu mulai hari ini.', 2000]}
          wrapper="p" speed={50} className="text-center text-gray-400 mb-12 text-lg" repeat={0}
        />

        {highlightedActions.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-4 text-yellow-300">Rekomendasi Aksi Untukmu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {highlightedActions.map((action) => (
                <ActionCard key={action.id} action={action} className="p-[1px] bg-gradient-to-r from-yellow-400/30 to-red-400/30 rounded-2xl" />
              ))}
            </div>
          </div>
        )}
        
        {/* Tombol atau pemisah */}
        <div className="text-center my-12">
            {!showAllActions && highlightedActions.length > 0 ? (
                 <button 
                    onClick={() => setShowAllActions(true)}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-colors text-lg"
                 >
                    Lihat Semua Aksi Lainnya
                 </button>
            ) : highlightedActions.length > 0 ? (
                 <hr className="border-gray-700" />
            ) : null}
        </div>

        {/* Bagian Aksi Lainnya */}
        {showAllActions && (
            <div>
                <h2 className="text-2xl font-bold text-center mb-8">
                    {highlightedActions.length > 0 ? "Aksi Lainnya" : "Semua Aksi"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherActions.map((action) => (
                    <ActionCard key={action.id} action={action} className="p-[1px] bg-gradient-to-r from-green-400/30 to-cyan-400/30 rounded-2xl hover:from-green-400/50 hover:to-cyan-400/50 transition-all duration-300" />
                  ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
}

// Bungkus dengan Suspense
export default function ActionsPage() {
    return (
        <Suspense fallback={<p className="text-center pt-40 text-xl">Memuat Halaman...</p>}>
            <ActionsPageContent />
        </Suspense>
    )
}