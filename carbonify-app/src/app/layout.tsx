import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import CursorLight from '@/components/CursorLight';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import 'leaflet/dist/leaflet.css';
import './globals.css';

const sora = Sora({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Carbonify',
  description: 'Take action for a better climate.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sora.className}>
        <CursorLight />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
