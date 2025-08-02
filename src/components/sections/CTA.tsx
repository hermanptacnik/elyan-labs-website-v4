// src/components/sections/CTA.tsx
import React from 'react';

interface ButtonProps {
  href: string;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
}
/** Inline Button so no external import is needed */
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

interface CTALink {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export const CTA: React.FC = () => {
  // @ts-ignore: temporary stub
  const ctaLinks: CTALink[] = [
    { icon: '💬', title: 'Discord', description: 'Join our community', href: '#' },
    { icon: '📚', title: 'Documentation', description: 'Technical resources', href: '#' },
    { icon: '🔧', title: 'GitHub', description: 'Open source code', href: '#' },
  ];

  return (
    <section
      id="connect"
      className="bg-black text-center px-6 lg:px-12 xl:px-16 py-20 lg:py-32 xl:py-40 border-t border-white/10"
    >
      <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[5rem] mb-6 lg:mb-8 font-extralight tracking-tight fade-in">
        Experience Living AI
      </h2>
      <p className="text-lg lg:text-xl xl:text-2xl text-gray-400 mb-12 lg:mb-16 font-light fade-in">
        Built to think, remember, and grow
      </p>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center fade-in">
        <Button href="https://discord.gg/WTmxVbMK7S" variant="primary">
          <span className="flex items-center gap-3 text-sm uppercase tracking-wider">
            Join our Discord <span>→</span>
          </span>
        </Button>
        <Button href="#" variant="secondary">
          <span className="text-sm uppercase tracking-wider">View GitHub</span>
        </Button>
      </div>
    </section>
  );
};
