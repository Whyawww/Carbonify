'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { GamificationProvider } from '@/context/GamificationContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { ReactNode } from 'react';

export default function ClientProviders({ children }: { children: ReactNode }) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <NotificationProvider>
        <GamificationProvider>{children}</GamificationProvider>
      </NotificationProvider>
    </GoogleOAuthProvider>
  );
}
