import React from 'react';

interface ButtonProps {
  href: string;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  href, 
  variant = 'primary', 
  children, 
  className = '' 
}) => {
  const baseClasses = 'px-6 lg:px-8 py-3 lg:py-4 font-normal rounded transition-all duration-300';
  
  const variants = {
    primary: 'bg-white text-black hover:translate-x-1',
    secondary: 'text-white border border-white/20 hover:border-white hover:bg-white/5',
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