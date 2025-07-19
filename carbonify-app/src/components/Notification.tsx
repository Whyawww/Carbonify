// src/components/Notification.tsx

'use client';

import { useNotification } from '@/context/NotificationContext';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Notification = () => {
  const { message, type, isVisible } = useNotification();

  if (!isVisible) return null;

  const isSuccess = type === 'success';
  const bgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';
  const icon = isSuccess ? <FaCheckCircle /> : <FaTimesCircle />;

  return (
    <div 
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 p-4 rounded-lg text-white font-semibold shadow-lg transition-opacity duration-300 ${bgColor} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {icon}
      {message}
    </div>
  );
};

export default Notification;