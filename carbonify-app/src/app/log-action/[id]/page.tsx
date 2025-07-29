// src/app/log-action/[id]/page.tsx
'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useGamification } from '@/context/GamificationContext';
import { useNotification } from '@/context/NotificationContext';

interface Action {
  id: number;
  title: string;
  unit_name: string;
  points_per_unit: number;
}

export default function LogActionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [action, setAction] = useState<Action | null>(null);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { fetchUserData } = useGamification();
  const { showNotification } = useNotification();

  useEffect(() => {
    if (id) {
      fetch(`http://127.0.0.1:8000/api/v1/actions/${id}/`)
        .then((res) => res.json())
        .then((data) => {
          setAction(data);
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value || parseFloat(value) <= 0 || !action) {
      showNotification('Harap masukkan jumlah yang valid.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://127.0.0.1:8000/api/v1/log-action/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ action_id: action.id, value: value }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Gagal mencatat aksi.');

      showNotification(result.success, 'success');
      fetchUserData(token!);
      setValue('');
    } catch (err) {
      if (err instanceof Error) {
      }
    }
  };

  if (loading) return <div className="text-center py-20">Memuat...</div>;
  if (!action)
    return <div className="text-center py-20">Aksi tidak ditemukan.</div>;

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-lg">
        <div className="mb-8">
          <Link
            href={`/actions/${id}`}
            className="text-cyan-400 hover:text-cyan-300"
          >
            &larr; Kembali ke Detail Aksi
          </Link>
        </div>
        <div className="bg-gray-900/30 backdrop-blur-lg border border-gray-700 p-8 rounded-2xl">
          <h1 className="text-3xl font-bold text-white mb-2">{action.title}</h1>
          <p className="text-gray-400 mb-6">
            Masukkan jumlah aktivitas yang telah Anda selesaikan.
          </p>
          <p className="text-sm text-green-400 mb-6">
            Anda akan mendapatkan +{action.points_per_unit} poin untuk setiap{' '}
            {action.unit_name}.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="value"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Jumlah ({action.unit_name})
              </label>
              <input
                id="value"
                type="number"
                step="any"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={`Contoh: 10`}
                className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-md transition-colors disabled:bg-gray-500"
            >
              {isSubmitting ? 'Mengirim...' : 'Catat & Dapatkan Poin'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
