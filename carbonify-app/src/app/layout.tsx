'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { GamificationProvider } from '@/context/GamificationContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorLight from '@/components/CursorLight';
import FallingLeaves from '@/components/FallingLeaves';
import 'leaflet/dist/leaflet.css';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider clientId={googleClientId}>
          <GamificationProvider>
            <FallingLeaves />
            <CursorLight />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </GamificationProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}