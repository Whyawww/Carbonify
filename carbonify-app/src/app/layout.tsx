'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { GamificationProvider } from '@/context/GamificationContext';
import { NotificationProvider } from '@/context/NotificationContext'; // <-- 1. Impor provider notifikasi
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorLight from '@/components/CursorLight';
import FallingLeaves from '@/components/FallingLeaves';
import Notification from '@/components/Notification'; // <-- 2. Impor komponen notifikasi
import 'leaflet/dist/leaflet.css';
import './globals.css';

// Impor font standar Next.js
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white overflow-x-hidden`}>
        <GoogleOAuthProvider clientId={googleClientId}>
          <GamificationProvider>
            {/* 3. Bungkus semua dengan NotificationProvider */}
            <NotificationProvider>
              <FallingLeaves />
              <CursorLight />
              <Navbar />
              <main>{children}</main>
              <Footer />
              <Notification /> {/* <-- 4. Tampilkan komponen notifikasi di sini */}
            </NotificationProvider>
          </GamificationProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}