import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import ClientProviders from '@/context/ClientProviders';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorLight from '@/components/CursorLight';
import FallingLeaves from '@/components/FallingLeaves';
import Notification from '@/components/Notification';
import Analytics from '@/components/Analytics';
import 'leaflet/dist/leaflet.css';
import './globals.css';

const inter = Sora({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Carbonify',
  description: 'Platform edukasi dan aksi untuk mengurangi jejak karbon.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-900 text-white overflow-x-hidden`}
      >
        <ClientProviders>
          <FallingLeaves />
          <CursorLight />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Notification />
        </ClientProviders>
        <Analytics />
      </body>
    </html>
  );
}
