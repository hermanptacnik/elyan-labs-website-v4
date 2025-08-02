import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export const LoadingBar: React.FC = () => {
  const loadingBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadingBarRef.current) {
      gsap.to(loadingBarRef.current, {
        x: '200%',
        duration: 2,
        repeat: -1,
        ease: 'none',
      });

      setTimeout(() => {
        if (loadingBarRef.current) {
          loadingBarRef.current.style.display = 'none';
        }
      }, 1000);
    }
  }, []);

  return (
    <div 
      ref={loadingBarRef}
      className="fixed top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full z-[60]"
    />
  );
};