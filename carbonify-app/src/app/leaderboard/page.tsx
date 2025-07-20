'use client';

import { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FaTrophy, FaSpinner } from 'react-icons/fa';

// Tipe data untuk setiap entri di leaderboard
interface LeaderboardEntry {
  username: string;
  score: number;
}

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setError(null);
        const response = await fetch('http://127.0.0.1:8000/api/v1/leaderboard/');
        if (!response.ok) {
          throw new Error('Gagal memuat data leaderboard.');
        }
        const data = await response.json();
        setLeaderboardData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    // Panggil pertama kali saat komponen dimuat
    fetchLeaderboard();

    // Set interval untuk mengambil data ulang setiap 15 detik (polling)
    const intervalId = setInterval(fetchLeaderboard, 15000);

    // Membersihkan interval saat komponen di-unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen w-full pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">Papan Peringkat</h1>
        <TypeAnimation
          sequence={['Lihat para pejuang iklim dengan skor tertinggi!', 2000]}
          wrapper="p"
          speed={50}
          className="text-center text-gray-400 mb-12 text-lg"
          repeat={0}
        />

        <div className="p-[1px] bg-gradient-to-r from-green-400/30 to-cyan-400/30 rounded-2xl">
          <div className="bg-gray-900/80 backdrop-blur-lg p-6 rounded-2xl space-y-4">
            {loading && (
              <div className="flex justify-center items-center py-8">
                <FaSpinner className="animate-spin text-4xl text-cyan-400" />
              </div>
            )}

            {error && <p className="text-red-400 text-center py-8">{error}</p>}

            {!loading && !error && (
              <ul className="divide-y divide-gray-700">
                {leaderboardData.map((user, index) => (
                  <li key={user.username} className="flex items-center justify-between py-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-xl font-bold w-8 text-center">
                        {index < 3 ? (
                          <FaTrophy className={`
                            ${index === 0 && 'text-yellow-400'}
                            ${index === 1 && 'text-gray-300'}
                            ${index === 2 && 'text-yellow-600'}
                          `} />
                        ) : (
                          index + 1
                        )}
                      </span>
                      <span className="text-lg font-medium">{user.username}</span>
                    </div>
                    <span className="text-lg font-bold text-green-400">{user.score} Poin</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}