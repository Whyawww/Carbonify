import type { Metadata } from 'next';
import CalculatorClient from '@/components/CalculatorClient';

export const metadata: Metadata = {
  title: 'Kalkulator Jejak Karbon',
  description:
    'Hitung estimasi jejak karbon bulanan Anda dari aktivitas listrik, transportasi, dan konsumsi makanan dengan kalkulator Carbonify yang akurat.',
};

export default function CalculatorPage() {
  return <CalculatorClient />;
}
