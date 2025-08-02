import { useEffect } from 'react';
import { LoadingBar } from './components/layout/LoadingBar';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import {About} from './components/sections/About';
import {SophiaCore} from './components/sections/SophiaCore';
import SophiaElya from './components/sections/SophiaElya';
import {Integration} from './components/sections/Integration';
import {CTA} from './components/sections/CTA';
import {Footer} from './components/layout/Footer';
import { useScrollAnimation } from './hooks/useScrollAnimation';

export default function App() {
  useScrollAnimation();

  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId) {
        const target = document.querySelector(targetId);
        if (target) {
          const headerHeight = 80;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <div className="bg-black text-white overflow-x-hidden antialiased">
      <LoadingBar />
      <Header />
      <Hero />
      <About />
      <SophiaCore />
      <SophiaElya />
      <Integration />
      <CTA />
      <Footer />
    </div>
  );
}