import type { Metadata } from 'next';
import ActionsPageClient from '@/components/ActionsClient';

export const metadata: Metadata = {
  title: 'Aksi Nyata Iklim',
  description: 'Hitung estimasi jejak karbon bulanan Anda dari aktivitas listrik, transportasi, dan konsumsi makanan dengan kalkulator Carbonify yang akurat.',
};
export default function ActionsPage() {
  return (
    <ActionsPageClient />
  );
}