import type { Metadata } from 'next';
import MapPageClient from '@/components/MapPageClient';

export const metadata: Metadata = {
  title: 'Temukan Lokasi Ramah',
  description: 'Temukan lokasi ramah lingkungan di sekitar Anda, termasuk tempat pengisian kendaraan listrik, pusat daur ulang, dan lebih banyak lagi. Bergabunglah dengan komunitas yang peduli lingkungan.',
};

export default function MapClient() {
  return (
    <MapPageClient />
  );
}