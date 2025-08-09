import type { Metadata } from 'next';
import ReedemPage from '@/components/ReedemPage';

export const metadata: Metadata = {
  title: 'Koinmu jadi Uangmu',
  description: 'Tukarkan koinmu dan dapatkanlah saldo dari Carbonify',
};
export default function RedeemPage() {
  return <ReedemPage />;
}