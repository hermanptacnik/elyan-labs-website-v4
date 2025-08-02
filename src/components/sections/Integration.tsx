import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface IntegrationCard {
  number: string;
  title: string;
  description: string;
  features: string[];
}

export const Integration: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const integrationCards: IntegrationCard[] = [
    {
      number: '01',
      title: 'API & Documentation',
      description:
        'Comprehensive guides and API references to integrate SophiaCore into your projects. Built for developers who value depth over surface.',
      features: [
        'REST & WebSocket Endpoints',
        'TypeScript & Python SDKs',
        'Interactive API Explorer',
      ],
    },
    {
      number: '02',
      title: 'Consultation & Support',
      description:
        'Work directly with our team to deploy SophiaCore in your specific use case. From medical innovation to educational platforms.',
      features: [
        'Custom Prompt Engineering',
        'Domain-Specific Workflows',
        'Dedicated Onboarding Sessions',
      ],
    },
    {
      number: '03',
      title: 'Enterprise Solutions',
      description:
        'Custom implementation and consultation for organizations seeking ethical, memory-persistent AI systems.',
      features: [
        'Scalable Memory Architecture',
        'Compliance & Audit Reporting',
        '24/7 Enterprise SLAs',
      ],
    },
  ];

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || !cardsContainerRef.current || window.innerWidth < 1024) return;

    const section = sectionRef.current;
    const container = containerRef.current;
    const cards = cardsRef.current.filter(Boolean);
    
    // Total cards
    const totalCards = integrationCards.length;
    const cardOffset = 80; // Vertical offset between stacked cards to show title - REDUCE THIS to make cards stack higher
    
    const ctx = gsap.context(() => {
      // Set initial states for all cards
      cards.forEach((card, i) => {
        gsap.set(card, {
          position: i === 0 ? 'relative' : 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          yPercent: i === 0 ? 0 : 100,
          y: i * cardOffset,
          zIndex: i + 1, // Reverse z-index so first card is on top
          visibility: i === 0 ? 'visible' : 'hidden',
        });
      });

      // Create main timeline
      const tl = gsap.timeline({
        defaults: {
          ease: 'power2.inOut',
          force3D: true,
        }
      });

      // Create ScrollTrigger
      ScrollTrigger.create({
        trigger: section,
        start: 'top+=300 top',
        end: () => `+=${window.innerHeight * totalCards * 1.5}`, // Increased multiplier for more scroll distance
        pin: container,
        pinSpacing: true,
        scrub: 2, // Increased from 1 for smoother scrubbing
        anticipatePin: 1,
        animation: tl,
      });

      // Build the timeline - simple y-axis animation only
      cards.forEach((card, i) => {
        if (i === 0) return; // Skip first card as it's already visible
        
        const label = `card${i}`;
        
        // Add a label for this card animation
        tl.addLabel(label);
        
        // Make the card visible just before animating
        tl.set(card, {
          visibility: 'visible'
        }, `${label}-=0.1`);
        
        // Simple animate card in from below
        tl.fromTo(card, 
          {
            yPercent: 150, // INCREASE THIS to make cards start from further below (was 100)
          },
          {
            yPercent: 0,
            duration: 1.5,
            ease: 'power3.out'
          }, 
          label
        );
        
        // Add breathing room between cards
        tl.set({}, { delay: 0.5 });
      });

    }, section);

    return () => {
      ctx.revert();
    };
  }, [integrationCards.length]);

  return (
    <section 
      ref={sectionRef}
      id="integration" 
      className="relative bg-black overflow-hidden"
    >
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div ref={containerRef} className="min-h-screen">
          {/* Header section */}
          <div className="px-12 xl:px-20 pt-24 xl:pt-32 pb-16">
            <div className="max-w-7xl mx-auto">
              <div className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-6 font-light">
                SERVICES
              </div>
              <h2 className="text-5xl lg:text-6xl xl:text-7xl font-extralight mb-6 tracking-tight text-white leading-[0.9]">
                What We Offer
              </h2>
              <p className="text-lg lg:text-xl text-gray-400 max-w-3xl leading-relaxed font-light">
                Partner with us to bring emotionally intelligent AI to your applications, research, or innovation labs.
              </p>
            </div>
          </div>

          {/* Cards container */}
          <div className="relative px-12 xl:px-20 pb-32">
            <div className="max-w-7xl mx-auto">
              <div ref={cardsContainerRef} className="relative" style={{ minHeight: '600px' }}>
                {integrationCards.map((card, index) => (
                  <div
                    key={card.number}
                    ref={(el) => {
                      cardsRef.current[index] = el;
                    }}
                    className="integration-card"
                  >
                    <div className="bg-black border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                      <div className="pt-4 pb-8 px-8 lg:pt-6 lg:pb-10 lg:px-10 xl:pt-8 xl:pb-12 xl:px-12 grid grid-cols-2 gap-8 lg:gap-12">
                        {/* Left side - Number only (takes 1/2) */}
                        <div className="col-span-1">
                          <span className="text-xl lg:text-2xl xl:text-3xl font-extralight text-white/30 tracking-tighter leading-none">
                            {card.number}
                          </span>
                        </div>
                        
                        {/* Right side - Title, description, and features (takes 1/2) */}
                        <div className="col-span-1">
                          <h3 className="text-xl lg:text-2xl xl:text-3xl font-extralight text-white tracking-tight leading-tight mb-8">
                            {card.title}
                          </h3>
                          
                          <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-10 font-light">
                            {card.description}
                          </p>
                          
                          {/* Features */}
                          <div className="grid grid-cols-1 gap-4">
                            {card.features.map((feature, idx) => (
                              <div 
                                key={idx} 
                                className="flex items-center gap-4"
                              >
                                <div className="w-1 h-1 rounded-full bg-white/20" />
                                <span className="text-sm lg:text-base text-gray-500 font-light">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="px-4 sm:px-6 py-12 sm:py-16">
          {/* Header */}
          <div className="mb-12">
            <div className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-6 font-light">
              SERVICES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extralight mb-4 tracking-tight text-white leading-[0.9]">
              What We Offer
            </h2>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-light">
              Bring AI with memory and emotional intelligence to your products, research, or innovation lab.
            </p>
          </div>

          {/* Cards */}
          <div className="space-y-6">
            {integrationCards.map((card) => (
              <div
                key={card.number}
                className="bg-black border border-white/10 rounded-xl p-6 sm:p-8"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-3xl sm:text-4xl font-extralight text-white/30 leading-none">
                    {card.number}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extralight text-white text-right max-w-[200px]">
                    {card.title}
                  </h3>
                </div>
                
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 font-light">
                  {card.description}
                </p>
                
                <div className="space-y-3">
                  {card.features.map((feature, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-3"
                    >
                      <div className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-xs sm:text-sm text-gray-500 font-light">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};