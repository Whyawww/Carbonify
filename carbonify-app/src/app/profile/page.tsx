import type { Metadata } from 'next';
import ProfileClient from '@/components/ProfileClient';

export const metadata: Metadata = {
  title: 'Profil Pengguna | Carbonify',
  description: 'Lihat statistik, lencana prestasi, dan riwayat aksi iklim Anda di Carbonify.',
};

export default function ProfilePage() {
  return (
    <ProfileClient />
  );
}