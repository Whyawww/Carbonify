// src/context/NotificationContext.tsx

'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type NotificationType = 'success' | 'error';

interface NotificationState {
  message: string;
  type: NotificationType;
  isVisible: boolean;
  showNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationState | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<NotificationType>('success');
  const [isVisible, setIsVisible] = useState(false);

  const showNotification = (msg: string, notificationType: NotificationType) => {
    setMessage(msg);
    setType(notificationType);
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Notifikasi akan hilang setelah 3 detik
  };

  return (
    <NotificationContext.Provider value={{ message, type, isVisible, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};