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

  const integrationCards: IntegrationCard[] = [
    {
      number: '01',
      title: 'API & Documentation',
      description: 'Comprehensive guides and API references to integrate SophiaCore into your projects. Built for developers who value depth over surface.',
      features: ['CMS Integration', 'Motion & Animations', '3D Development'],
    },
    {
      number: '02',
      title: 'Consultation & Support',
      description: 'Work directly with our team to deploy SophiaCore in your specific use case. From medical innovation to educational platforms.',
      features: ['Responsive Design', 'Wireframing'],
    },
    {
      number: '03',
      title: 'Enterprise Solutions',
      description: 'Your website deserves to be seen. I optimize your online presence to elevate your visibility in search results, helping your business attract the right audience and stand out in the digital landscape.',
      features: ['Technical SEO'],
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = gsap.utils.toArray('.integration-card') as HTMLElement[];
    const cardHeight = cards[0].offsetHeight;
    const cardGap = 100; // Space between stacked cards showing title

    const ctx = gsap.context(() => {
      // Calculate total animation distance
      const totalDistance = (cards.length * 400) + 200; // Added buffer at the end

      // Create main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top+=100",
          end: `+=${totalDistance}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
        }
      });

      // Animate each card
      cards.forEach((card, i) => {
        if (i === 0) {
          // First card doesn't move
          return;
        }

        // Start position: below the viewport
        gsap.set(card, {
          yPercent: 150,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: i + 1, // Higher cards get higher z-index
        });

        // Animate to stacked position
        const startTime = ((i - 1) / cards.length) * 0.8; // Use 80% of timeline
        const endTime = (i / cards.length) * 0.8; // Last 20% is buffer
        
        tl.fromTo(card,
          {
            yPercent: 150,
          },
          {
            yPercent: 0,
            y: i * cardGap,
            duration: endTime - startTime,
            ease: "none",
          },
          startTime
        );
      });

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="integration" 
      className="bg-black"
    >
      {/* Header section */}
      <div className="px-6 lg:px-12 xl:px-20 pt-20 lg:pt-28 xl:pt-36 pb-20 lg:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-xs text-gray-600 uppercase tracking-[0.3em] mb-8 font-light">
            SERVICES
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extralight mb-6 tracking-tight text-white leading-[0.9]">
            What We Offer
          </h2>
          <p className="text-lg lg:text-xl text-gray-500 max-w-2xl leading-relaxed font-light">
            Partner with us to bring emotionally intelligent AI to your applications, research, or innovation labs.
          </p>
        </div>
      </div>

      {/* Cards container */}
      <div 
        ref={containerRef}
        className="relative px-6 lg:px-12 xl:px-20 pb-48"
      >
        <div className="max-w-[1400px] mx-auto relative">
          {integrationCards.map((card, index) => (
            <div
              key={card.number}
              className={`integration-card bg-black border-t border-white/10 ${
                index === 0 ? 'relative' : ''
              }`}
              style={{
                zIndex: index + 1, // Higher index cards get higher z-index
              }}
            >
              <div className="py-12 lg:py-16">
                <div className="grid grid-cols-2 gap-8">
                  {/* Number section - takes up half the width */}
                  <div className="flex justify-start items-start">
                    <span className="text-2xl lg:text-3xl xl:text-4xl font-extralight text-white/20 tracking-tight">
                      [{card.number}]
                    </span>
                  </div>
                  
                  {/* Content section - takes up the other half */}
                  <div className="flex flex-col pr-8 lg:pr-16">
                    <h3 className="text-2xl lg:text-3xl xl:text-4xl font-extralight text-white mb-6 tracking-tight">
                      {card.title}
                    </h3>
                    
                    <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-8 font-light">
                      {card.description}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-2 mt-auto">
                      {card.features.map((feature, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-center gap-3 text-gray-600"
                        >
                          <span className="text-xs font-mono">0{idx + 1}</span>
                          <span className="text-sm lg:text-base font-light">{feature}</span>
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
    </section>
  );
};