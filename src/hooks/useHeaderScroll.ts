import { useEffect, type RefObject } from 'react';

export const useHeaderScroll = (headerRef: RefObject<HTMLElement>) => {
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      const header = headerRef.current;
      
      if (header) {
        if (currentScroll > 100) {
          header.style.background = 'rgba(0, 0, 0, 0.95)';
          header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        } else {
          header.style.background = 'rgba(0, 0, 0, 0.8)';
          header.style.boxShadow = 'none';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headerRef]);
};