'use client';

import { useState, useEffect } from 'react';
import Lottie from 'react-lottie-player';
import robotAnimationData from '../../public/lottie/Robot.json';

const LottieRobot = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const rotationY = (mousePosition.x / window.innerWidth - 0.5) * 30;
  const rotationX = (0.5 - mousePosition.y / window.innerHeight) * 20;

  return (
    <div className="absolute bottom-305 left-1/2 -translate-x-2 w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] opacity-20 md:opacity-90 pointer-events-none">
      <Lottie
        loop
        animationData={robotAnimationData}
        play
        style={{
          width: '100%',
          height: '100%',
          transform: `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
          transition: 'transform 0.2s ease-out',
        }}
      />
    </div>
  );
};

export default LottieRobot;
