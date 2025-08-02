import React from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ 
  id, 
  className = '', 
  children 
}) => {
  return (
    <section 
      id={id} 
      className={`px-6 lg:px-12 xl:px-16 py-16 lg:py-24 xl:py-32 ${className}`}
    >
      <div className="max-w-[1600px] mx-auto">
        {children}
      </div>
    </section>
  );
};