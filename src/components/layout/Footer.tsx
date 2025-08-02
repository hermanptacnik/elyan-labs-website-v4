import React from 'react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const Footer: React.FC = () => {
  const footerSections: FooterSection[] = [
    {
      title: 'Products',
      links: [
        { label: 'SophiaCore', href: '#sophiacore' },
        { label: 'Sophia Elya', href: '#sophia-elya' },
        { label: 'Documentation', href: 'https://github.com/Scottcjn/Rustchain' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#about' },
        { label: 'Research', href: '#' },
        { label: 'Blog', href: '#' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { label: 'Discord', href: 'https://discord.gg/WTmxVbMK7S' },
        { label: 'GitHub', href: 'https://github.com/Scottcjn/Rustchain' },
        { label: 'Contact', href: 'mailto:Scott@elyanlabs.ai?subject=Inquiry%20from%20Elyan%20Labs%20Website' },
      ],
    },
  ];

  return (
    <footer className="bg-black border-t border-white/10 px-6 lg:px-12 xl:px-16 pt-12 lg:pt-16 pb-6 lg:pb-8">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 lg:gap-12 xl:gap-16 mb-12">
        <div>
          <h3 className="text-xl lg:text-2xl mb-4 font-normal">Elyan Labs</h3>
          <p className="text-gray-400 leading-relaxed max-w-md text-sm lg:text-base">
            Building AI with memory, trust, and conscience. 
            We create real cognitive scaffolds that serve humanity 
            with genuine understanding.
          </p>
        </div>
        
        {footerSections.map((section) => (
          <div key={section.title}>
            <h4 className="text-xs lg:text-sm uppercase tracking-widest mb-4 lg:mb-6 text-gray-400">
              {section.title}
            </h4>
            <div className="flex flex-col gap-3">
              {section.links.map((link) => (
                <a 
                  key={link.label}
                  href={link.href} 
                  className="relative text-white hover:text-gray-300 transition-colors text-sm lg:text-base group inline-block w-fit"
                >
                  {link.label}
                  <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-gray-400 text-xs lg:text-sm gap-4">
        <div>&copy; 2025 Elyan Labs. All rights reserved.</div>
        <div>https://elyanlabs.ai/</div>
      </div>
    </footer>
  );
};