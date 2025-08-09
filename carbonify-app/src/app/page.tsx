import type { Metadata } from 'next';
import HomePageClient from '@/components/HomePageClient';

export const metadata: Metadata = {
  title: 'Beranda | Carbonify',
  description:
    'Lacak jejak karbon Anda, ambil aksi nyata untuk iklim, dan bergabunglah dengan gerakan pahlawan iklim. Mulai perjalanan Anda menuju gaya hidup berkelanjutan.',
};

export default function Home() {
  return <HomePageClient />;
}
