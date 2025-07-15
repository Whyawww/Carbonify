'use client';

import { useEffect, useState } from 'react';

const CursorLight = () => {
  const [position, setPosition] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Hanya aktifkan di perangkat yang memiliki mouse (bukan layar sentuh)
    if (window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (window.matchMedia('(pointer: fine)').matches) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-all duration-300"
      style={{
        background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
      }}
    />
  );
};

export default CursorLight;
