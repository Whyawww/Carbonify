import LeaderboardPageClient from '@/components/LeaderboardPageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pahlawan Iklim',
  description:
    'Jadilah Pahlawan Iklim di Carbonify agar Bumi Bisa Tersenyum Kembali. Lacak jejak karbon Anda, ambil aksi nyata untuk iklim, dan bergabunglah dengan gerakan pahlawan iklim. Mulai perjalanan Anda menuju gaya hidup berkelanjutan.',
};

export default function Leaderboard() {
  return <LeaderboardPageClient />;
}
