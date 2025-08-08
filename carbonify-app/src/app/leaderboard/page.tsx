'use client';

import { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pahlawan Iklim',
  description: 'Jadilah Pahlawan Iklim di Carbonify agar Bumi Bisa Tersenyum',
};
interface LeaderboardEntry {
  username: string;
  score: number;
}

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setError(null);
        const response = await fetch(
          'http://127.0.0.1:8000/api/v1/leaderboard/',
        );
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

    fetchLeaderboard();
    const intervalId = setInterval(fetchLeaderboard, 15000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen w-full pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400">
          Pahlawan Iklim
        </h1>
        <p className="text-center text-gray-400 mb-16 text-lg">
          Individu Teratas dalam Meningkatkan Kesadaran dan Aksi terhadap
          Perubahan Iklim.
        </p>

        {/* Kartu Informasi Peringkat */}
        <div className="relative mt-16 mb-12 bg-gray-900/50 border border-green-500/30 rounded-2xl p-6 text-center md:text-left md:pl-44 shadow-lg shadow-green-500/20 hover:shadow-green-400/40 hover:scale-[1.02] transition-all duration-300">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 md:top-15 md:left-20 md:transform-none md:-translate-y-1/2 w-36 h-36 md:w-52 md:h-52">
            <Image
              src="/Piala.png"
              alt="Piala Leaderboard"
              width={240}
              height={240}
              className="object-contain animate-float"
            />
          </div>

          {/* Wrapper teks */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="text-green-400">Carbonify</span>{' '}
              <span className="text-white">Winline</span>
            </h2>
            <p className="text-gray-400 mt-2">
              Kumpulkan poin dari aksi nyata dan tingkatkan kesadaran tentang
              jejak karbon untuk masuk ke jajaran teratas leaderboard ini.
            </p>
          </div>
        </div>

        {/* Tabel Leaderboard */}
        <div className="bg-gray-900/30 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-lg shadow-cyan-500/10">
          <div className="p-4 md:p-6">
            {loading && (
              <div className="flex justify-center items-center py-12">
                <FaSpinner className="animate-spin text-4xl text-cyan-400" />
              </div>
            )}
            {error && <p className="text-red-400 text-center py-12">{error}</p>}
            {!loading && !error && (
              <ul className="space-y-3">
                {leaderboardData.map((user, index) => (
                  <li
                    key={user.username}
                    className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 transform hover:scale-[1.03] border-l-4 ${
                      index === 0
                        ? 'bg-gradient-to-r from-yellow-500/30 to-gray-900/10 border-yellow-400 shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40'
                        : index === 1
                          ? 'bg-gradient-to-r from-slate-400/30 to-gray-900/10 border-slate-300 shadow-lg shadow-slate-300/20 hover:shadow-slate-300/40'
                          : index === 2
                            ? 'bg-gradient-to-r from-amber-700/30 to-gray-900/10 border-amber-600 shadow-lg shadow-amber-600/20 hover:shadow-amber-600/40'
                            : 'bg-gray-800/40 border-transparent hover:bg-gray-700/60 hover:border-cyan-400'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <span
                        className={`font-bold text-lg w-10 h-10 flex items-center justify-center rounded-full ${
                          index === 0
                            ? 'bg-yellow-400 text-gray-900'
                            : index === 1
                              ? 'bg-gray-300 text-gray-900'
                              : index === 2
                                ? 'bg-amber-600 text-white'
                                : 'bg-gray-700'
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className="text-lg font-medium text-white">
                        {user.username}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-green-300">
                        {user.score}
                      </span>
                      <span className="text-green-400 font-semibold">Poin</span>
                    </div>
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
