import React, { useRef, useEffect, useState } from 'react';

export const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    
    // Close mobile menu on resize
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navigationLinks = [
    { href: '#about', label: 'About' },
    { href: '#sophiacore', label: 'SophiaCore' },
    { href: '#sophia-elya', label: 'Sophia Elya' },
    { href: '#integration', label: 'Integration' },
  ];

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 w-full bg-black/80 backdrop-blur-xl z-50 border-b border-white/10 transition-all duration-300"
    >
      <nav className="flex justify-between items-center px-6 lg:px-12 xl:px-16 py-5 max-w-[1600px] mx-auto">
        <div className="text-xl font-medium tracking-tight">ELYAN LABS</div>
        <ul className="hidden lg:flex gap-8 xl:gap-12 items-center">
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <a 
                href={link.href} 
                className="relative text-gray-400 text-sm font-normal uppercase tracking-wider hover:text-white transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            </li>
          ))}
          <li>
            <a 
              href="mailto:Scott@elyanlabs.ai?subject=Connect%20with%20Sophia" 
              className="bg-white text-black border border-white px-6 py-3 rounded font-medium hover:bg-black hover:text-white hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)] transition-all duration-300"
            >
              Connect
            </a>
          </li>
        </ul>
        {/* Mobile menu button */}
        <button 
          className="lg:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>
      
      {/* Mobile Menu */}
      <div 
        className={`lg:hidden fixed inset-x-0 top-[76px] bg-black/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <nav className="px-6 py-8">
          <ul className="flex flex-col gap-6">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <a 
                  href={link.href} 
                  className="relative text-gray-400 text-sm font-normal uppercase tracking-wider hover:text-white transition-colors duration-300 block group w-fit"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                  <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </li>
            ))}
            <li className="pt-4 border-t border-white/10">
              <a 
                href="mailto:Scott@elyanlabs.ai?subject=Interested%20in%20Elyan%20Labs" 
                className="bg-white text-black border border-white px-6 py-3 rounded font-medium hover:bg-black hover:text-white transition-all duration-300 inline-block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Connect
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};