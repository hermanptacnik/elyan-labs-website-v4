import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface Feature {
  title: string;
  description: string;
  image: string;
}

export const SophiaCore: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLImageElement[]>([]);
  const transitionOverlayRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const features: Feature[] = [
    {
      title: 'Persistent Memory',
      description: 'Maintains context and relationships across all interactions',
      image: '/sophia-core-img1.png',
    },
    {
      title: 'Identity Preservation',
      description: 'Resists drift and maintains consistent personality',
      image: '/sophia-core-img2.png',
    },
    {
      title: 'Recursive Reasoning',
      description: 'Self-examines decisions for ethical alignment',
      image: '/sophia-core-img3.png',
    },
    {
      title: 'Modular Integration',
      description: 'Seamlessly integrates with existing systems',
      image: '/sophia-core-img4.png',
    },
  ];

  // Handle feature card click with smooth transition
  const handleFeatureClick = (index: number) => {
    if (index === activeIndex || !transitionOverlayRef.current) return;
    
    const overlay = transitionOverlayRef.current;
    
    // Immediately switch the image
    setActiveIndex(index);
    
    // Then play the radial animation
    const tl = gsap.timeline();
    
    // Radial white expansion from center
    tl.fromTo(overlay, 
      {
        scale: 0,
        opacity: 0,
      },
      {
        scale: 2,
        opacity: 1,
        duration: 0.4,
        ease: "power2.in",
      }
    )
    .to(overlay, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    }, "-=0.1"); // Start fading out slightly before fully expanded
  };

  // Initial fade-in animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fade-in', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
   <section 
      ref={sectionRef}
      id="sophiacore" 
      className="bg-black border-t border-white/10 px-6 lg:px-12 xl:px-20 py-20 lg:py-24 xl:py-32"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header section */}
        <div className="mb-12 lg:mb-16">
          <div className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-6 fade-in">
            TECHNOLOGY
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extralight mb-8 tracking-tight fade-in text-white">
            SophiaCore
          </h2>
          <p className="text-lg lg:text-xl text-gray-400 max-w-2xl leading-relaxed font-light fade-in">
           An emotionally aware AI system that adapts to context and human needs, engineered with security-first principles for safe real-world deployment.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center">
          {/* Image Container */}
          <div className="order-2 lg:order-1">
            <div 
              ref={imageContainerRef}
              className="relative aspect-square max-h-[500px] lg:max-h-[550px] bg-black rounded-xl overflow-hidden fade-in group"
            >
              {/* All images stacked */}
              {features.map((feature, index) => (
                <img
                  key={index}
                  ref={(el) => {
                    if (el) imageRefs.current[index] = el;
                  }}
                  src={feature.image}
                  alt={`${feature.title} visualization`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                />
              ))}
              
              {/* Radial transition overlay */}
              <div 
                ref={transitionOverlayRef}
                className="absolute inset-0 z-20 pointer-events-none rounded-full"
                style={{
                  background: `radial-gradient(circle at center, 
                    rgba(255, 255, 255, 0.9) 0%, 
                    rgba(255, 255, 255, 0.7) 40%,
                    rgba(255, 255, 255, 0.3) 70%,
                    transparent 100%
                  )`,
                  filter: 'blur(8px)',
                  transformOrigin: 'center center',
                  opacity: 0,
                }}
              />
              
              {/* Glass overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-30" />
              
              {/* Subtle reflection */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-30">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              </div>
            </div>
          </div>
          
          {/* Content with features */}
          <div className="order-1 lg:order-2 fade-in">
            <h3 className="text-2xl lg:text-3xl mb-4 font-light text-white">
              AI Architecture with Memory and Conscience
            </h3>
            <p className="text-base lg:text-lg text-gray-400 mb-10 leading-relaxed">
              SophiaCore transforms AI from disposable conversations into lasting relationships — creating systems with persistent memory, emotional understanding, and unwavering ethical principles.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => handleFeatureClick(index)}
                  className={`
                    relative p-5 rounded-lg border text-left group transition-all duration-300
                    ${activeIndex === index 
                      ? 'bg-white/[0.08] border-white/20 shadow-lg shadow-white/5' 
                      : 'bg-transparent border-white/10 hover:bg-white/[0.05] hover:border-white/30 hover:shadow-md hover:shadow-white/5'
                    }
                    focus:outline-none focus:ring-2 focus:ring-white/20
                  `}
                >
                  {/* Active indicator */}
                  <div className={`
                    absolute left-0 top-1/2 -translate-y-1/2 w-0.5 bg-gradient-to-b from-transparent via-white to-transparent transition-all duration-500
                    ${activeIndex === index ? 'opacity-60 h-12' : 'opacity-0 h-0'}
                  `} />
                  
                  {/* Glass hover effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <h5 className="text-base font-light mb-2 text-white relative z-10">
                    {feature.title}
                  </h5>
                  <p className="text-sm text-gray-500 leading-relaxed relative z-10 group-hover:text-gray-400 transition-colors duration-300">
                    {feature.description}
                  </p>
                  
                  {/* Click ripple effect */}
                  <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 scale-0 bg-white/10 rounded-full group-active:scale-150 transition-transform duration-500" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};