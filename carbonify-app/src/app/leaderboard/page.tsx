'use client';

import { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import Image from 'next/image';

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

    fetchLeaderboard();
    const intervalId = setInterval(fetchLeaderboard, 15000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen w-full pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">Pahlawan Iklim</h1>
        <p className="text-center text-gray-400 mb-16 text-lg">
          Individu Teratas dalam Meningkatkan Kesadaran dan Aksi terhadap Perubahan Iklim.
        </p>

        {/* Kartu Informasi Peringkat */}
        <div className="relative mb-10 bg-gray-900/50 border-2 border-green-500/30 rounded-2xl p-6 pt-8 md:pt-6 pl-8 md:pl-32">
          <div className="absolute -top-12 left-0 md:-left-8 w-32 h-32 md:w-60 md:h-60">
            <Image 
              src="/Piala.png"
              alt="Piala Leaderboard"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-white">Carbonify Winline</h2>
            <p className="text-gray-400 mt-1">
              Kumpulkan poin dari aksi nyata dan tingkatkan kesadaran tentang jejak karbon untuk masuk ke jajaran teratas leaderboard ini.
            </p>
          </div>
        </div>

        {/* Tabel Leaderboard */}
        <div className="bg-gray-900/30 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-lg">
          <div className="p-6">
            {loading && (
              <div className="flex justify-center items-center py-12">
                <FaSpinner className="animate-spin text-4xl text-cyan-400" />
              </div>
            )}
            {error && <p className="text-red-400 text-center py-12">{error}</p>}
            {!loading && !error && (
              <ul className="space-y-2">
                {leaderboardData.map((user, index) => (
                  <li key={user.username} className={`flex items-center justify-between p-4 rounded-lg transition-colors border-l-4 ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-500/30 to-gray-900/10 border-yellow-400' : 
                    index === 1 ? 'bg-gradient-to-r from-slate-400/30 to-gray-900/10 border-slate-300' : 
                    index === 2 ? 'bg-gradient-to-r from-amber-700/30 to-gray-900/10 border-amber-600' : 'bg-gray-800/30 border-transparent'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <span className={`font-bold w-8 h-8 flex items-center justify-center rounded-full ${
                          index === 0 ? 'bg-yellow-400 text-gray-900' : 
                          index === 1 ? 'bg-gray-300 text-gray-900' : 
                          index === 2 ? 'bg-yellow-600 text-gray-900' : 'bg-gray-700'
                      }`}>
                        {index + 1}
                      </span>
                      <span className="text-lg font-medium text-white">{user.username}</span>
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