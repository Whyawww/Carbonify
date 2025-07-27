'use client';

import { useState } from 'react';
import { useGamification } from '@/context/GamificationContext';
import { useNotification } from '@/context/NotificationContext';
import { FaArrowRight, FaCoins } from 'react-icons/fa';

export default function RedeemPage() {
  const { score, reduceScore } = useGamification();
  const { showNotification } = useNotification();
  const [pointsToRedeem, setPointsToRedeem] = useState(10000);

  const conversionRate = 5000 / 10000;
  const rupiahValue = pointsToRedeem * conversionRate;

  const handleRedeem = () => {
    if (score < 10000) {
      showNotification(
        'Poin Anda tidak cukup untuk melakukan penukaran.',
        'error',
      );
      return;
    }
    if (pointsToRedeem > score) {
      showNotification(
        'Poin yang ingin Anda tukar melebihi poin yang Anda miliki.',
        'error',
      );
      return;
    }

    showNotification('Permintaan penukaran sedang diproses...', 'success');

    setTimeout(() => {
      if (score >= pointsToRedeem) {
        reduceScore(pointsToRedeem);
        showNotification(
          `Berhasil! Penukaran senilai Rp ${rupiahValue.toLocaleString('id-ID')} telah berhasil.`,
          'success',
        );
      } else {
        showNotification(
          'Terjadi kesalahan, poin Anda tidak lagi mencukupi.',
          'error',
        );
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-lg">
        <div className="p-[1px] bg-gradient-to-r from-green-400/30 to-cyan-400/30 rounded-2xl">
          <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl text-center space-y-6">
            <div>
              <FaCoins className="mx-auto text-5xl text-yellow-400 mb-4" />
              <h1 className="text-3xl font-bold">Tukarkan Poin Anda</h1>
              <p className="text-gray-400 mt-2">
                Tukarkan poin yang Anda kumpulkan dari aksi nyata menjadi saldo
                e-wallet.
              </p>
            </div>

            <div className="bg-gray-800/50 p-4 rounded-xl">
              <p className="text-sm text-gray-400">Total Poin Anda Saat Ini</p>
              <p className="text-4xl font-bold text-green-400">{score}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="points"
                  className="block text-left mb-2 font-medium"
                >
                  Jumlah Poin untuk Ditukar
                </label>
                <input
                  type="number"
                  id="points"
                  value={pointsToRedeem}
                  onChange={(e) =>
                    setPointsToRedeem(
                      Math.max(10000, parseInt(e.target.value) || 0),
                    )
                  }
                  min="10000"
                  step="1000"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 text-center text-xl font-bold focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="flex items-center justify-center space-x-4 text-xl">
                <span className="font-bold text-cyan-400">
                  {pointsToRedeem} Poin
                </span>
                <FaArrowRight className="text-gray-500" />
                <span className="font-bold text-green-400">
                  Rp {rupiahValue.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <button
              onClick={handleRedeem}
              disabled={score < 10000}
              className="w-full font-bold py-3 px-6 rounded-md transition-all duration-300 text-white text-lg disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600"
            >
              Tukarkan Sekarang
            </button>

            <p className="text-xs text-gray-500 pt-4 border-t border-gray-700">
              Penukaran minimal adalah 10.000 poin. Fitur ini adalah simulasi
              untuk keperluan demonstrasi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
