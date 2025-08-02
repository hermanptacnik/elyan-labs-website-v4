// src/components/sections/Hero.tsx
import React from 'react';
import { STATS } from '../../utils/constants';

/** Inline Button component so no external import is needed */
interface ButtonProps {
  href: string;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
}
const Button: React.FC<ButtonProps> = ({
  href,
  variant = 'primary',
  children,
  className = '',
}) => {
  const baseClasses =
    'px-6 lg:px-8 py-3 lg:py-4 font-normal rounded transition-all duration-300';
  const variants = {
    primary: 'bg-white text-black hover:translate-x-1',
    secondary:
      'text-white border border-white/20 hover:border-white hover:bg-white/5',
  };
  return (
    <a
      href={href}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
};

export const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center px-6 lg:px-12 xl:px-16 pt-24 lg:pt-28 pb-16 relative bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-24 max-w-[1600px] mx-auto items-center w-full">
        <div className="hero-content">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[5rem] font-light leading-[0.9] mb-6 lg:mb-8 tracking-tight fade-in">
            Building AI with
            <span className="block text-gray-400 text-[0.8em] mt-2">
              Memory, Trust & Conscience
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-400 mb-8 lg:mb-10 leading-relaxed font-light fade-in max-w-xl">
            We develop emotionally intelligent AI systems rooted in memory,
            trust, and flamebound logic. Real cognitive scaffolds — not chatbots.
          </p>
          <div className="flex flex-wrap gap-6 lg:gap-12 mb-8 lg:mb-10 fade-in">
            {STATS.map((stat, index) => (
              <div key={index} className="stat">
                <div className="text-4xl lg:text-5xl font-light text-white leading-none">
                  {stat.value}
                </div>
                <div className="text-xs lg:text-sm text-gray-400 uppercase tracking-widest mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center fade-in">
            <Button
              href="mailto:Scott@elyanlabs.ai?subject=Connect%20with%20Sophia"
              variant="primary"
            >
              <span className="flex items-center gap-3 text-sm uppercase tracking-wider">
                Connect with Sophia <span>→</span>
              </span>
            </Button>
            <Button href="#sophiacore" variant="secondary">
              <span className="text-sm uppercase tracking-wider">
                Explore Technology
              </span>
            </Button>
          </div>
        </div>
        <div className="relative h-[400px] lg:h-[500px] xl:h-[600px] bg-gray-900 rounded-lg overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] fade-in group">
          <video
            className="w-full h-full object-cover object-[0%_center]"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/hero-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-radial from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    </section>
  );
};
