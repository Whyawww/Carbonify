import AboutPage from '@/components/AboutPageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tentang Carbonify',
  description:
    'Carbonify adalah sebuah platform yang dapat menghitung jejak karbonmu dengan akurat, anda juga bisa mendapatkan saldo dan juga masuk leaderboard kamu.',
};

export default function About() {
  return <AboutPage />;
}
