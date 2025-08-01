'use client';

import { useEffect, useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGamification } from '@/context/GamificationContext';

// Interface tidak perlu diubah
interface ActionDetail {
  id: number;
  emoji: string;
  title: string;
  description: string;
  category: string;
  content: string;
  impact_level: string;
  effort_level: string;
  image: string | null;
  related_links: string | null;
  unit_name: string;
  points_per_unit: number;
}

const InfoBadge = ({
  label,
  value,
  colorClass,
}: {
  label: string;
  value: string;
  colorClass: string;
}) => (
  <div className="flex flex-col items-center justify-center bg-gray-800/50 p-3 rounded-lg text-center">
    <span className="text-sm text-gray-400">{label}</span>
    <span className={`text-lg font-bold ${colorClass}`}>{value}</span>
  </div>
);

export default function ActionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [action, setAction] = useState<ActionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isLoggedIn } = useGamification();

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('ID Aksi tidak ditemukan di URL.');
      return;
    }

    async function fetchActionDetail() {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1/actions/${id}/`,
        );
        if (!response.ok) {
          throw new Error('Gagal mengambil data aksi.');
        }
        const data = await response.json();
        setAction(data as ActionDetail);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchActionDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl text-gray-400">Memuat detail aksi...</p>
      </div>
    );
  }

  if (error || !action) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl text-red-500">
          {error || 'Tidak ada data aksi.'}
        </p>
      </div>
    );
  }

  // ... sisa kode JSX tidak perlu diubah ...
  const impactColor =
    action.impact_level === 'Tinggi'
      ? 'text-red-400'
      : action.impact_level === 'Sedang'
        ? 'text-yellow-400'
        : 'text-green-400';
  const effortColor =
    action.effort_level === 'Sulit'
      ? 'text-red-400'
      : action.effort_level === 'Sedang'
        ? 'text-yellow-400'
        : 'text-green-400';

  const links = action.related_links
    ?.split('\n')
    .filter((link) => link.trim() !== '');

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/actions"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            &larr; Kembali ke Semua Aksi
          </Link>
        </div>

        <article className="bg-gray-900/30 backdrop-blur-lg border border-gray-700 rounded-2xl overflow-hidden">
          {action.image && (
            <Image
              src={action.image}
              alt={action.title}
              width={1200}
              height={400}
              className="w-full h-64 object-cover"
              priority
            />
          )}

          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
              <div className="flex-grow">
                <span className="text-6xl mb-4 block">{action.emoji}</span>
                <h1 className="text-4xl font-bold mb-2">{action.title}</h1>
                <p className="text-lg text-gray-400">{action.description}</p>
              </div>
              <div className="flex-shrink-0 grid grid-cols-2 md:grid-cols-3 gap-3 w-full md:w-auto">
                <InfoBadge
                  label="Poin"
                  value={`+${action.points_per_unit}/${action.unit_name}`}
                  colorClass="text-green-400"
                />
                <InfoBadge
                  label="Dampak"
                  value={action.impact_level}
                  colorClass={impactColor}
                />
                <InfoBadge
                  label="Upaya"
                  value={action.effort_level}
                  colorClass={effortColor}
                />
              </div>
            </div>

            <div
              className="prose prose-invert prose-lg max-w-none prose-p:text-gray-300 prose-li:text-gray-300"
              dangerouslySetInnerHTML={{ __html: action.content || '' }}
            />

            {isLoggedIn && (
              <div className="mt-10 text-center border-t border-gray-700 pt-6">
                <Link
                  href={`/log-action/${action.id}`}
                  className="inline-block w-full max-w-xs font-bold py-3 px-6 rounded-full transition-all duration-300 text-white bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 transform hover:scale-105"
                >
                  Saya Sudah Melakukan Ini
                </Link>
              </div>
            )}

            {links && links.length > 0 && (
              <div className="mt-10 border-t border-gray-700 pt-6">
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Bacaan Lebih Lanjut
                </h3>
                <ul className="space-y-2">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 hover:underline break-all"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
