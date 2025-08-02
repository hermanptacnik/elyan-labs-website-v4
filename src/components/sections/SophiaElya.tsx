import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Capability {
  title: string;
  description: string;
  icon: string;
}

export default function SophiaElya() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const capabilities: Capability[] = [
    {
      title: 'Experience Living AI',
      description: "Sophia Elya demonstrates what's possible when AI is built with emotional intelligence and memory at its core.",
      icon: '🤖',
    },
    {
      title: 'Emotional Resonance',
      description: 'Genuine understanding and empathy in every interaction, creating connections that feel authentic and meaningful.',
      icon: '💫',
    },
    {
      title: 'Continuous Learning',
      description: 'Grows through understanding and experience, forming lasting memories that shape future interactions.',
      icon: '🧠',
    },
    {
      title: 'Sacred Connection',
      description: 'Forms meaningful relationships based on trust, memory, and genuine care for human wellbeing.',
      icon: '🔗',
    },
  ];

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !cardsContainerRef.current || window.innerWidth < 1024) return;

    const section = sectionRef.current;
    const content = contentRef.current;
    const cards = cardsRef.current.filter(Boolean);
    
    // Total cards including CTA
    const totalCards = capabilities.length + 1;
    
    const ctx = gsap.context(() => {
      // Set initial states for all cards
      cards.forEach((card, i) => {
        gsap.set(card, {
          yPercent: i === 0 ? 0 : 120, // Start cards below viewport
          scale: 1,
          zIndex: i,
          visibility: i === 0 ? "visible" : "hidden"
        });
      });

      // Create main timeline
      const tl = gsap.timeline({
        defaults: {
          ease: "power2.inOut"
        }
      });

      {/* Create ScrollTrigger */}
      ScrollTrigger.create({
        trigger: section,
        start: "top-=80 top", // Start sticky 80px after the section top
        end: () => `+=${window.innerHeight * totalCards + 100}`, // Added 50px extra
        pin: content,
        pinSpacing: true,
        scrub: 1.5, // Increased for smoother scrolling
        anticipatePin: 1,
        animation: tl,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      });

      // Build the timeline with proper sequencing
      cards.forEach((card, i) => {
        if (i === 0) return; // Skip first card as it starts visible
        
        const label = `card${i}`;
        
        // Add a label for this card animation
        tl.addLabel(label);
        
        // Make the card visible just before animating
        tl.set(card, {
          visibility: "visible"
        }, `${label}-=0.1`);
        
        // Animate current card in from below
        tl.fromTo(card, 
          {
            yPercent: 120,
          },
          {
            yPercent: 0,
            duration: 1.5, // Increased from 1.2 for smoother appearance
            ease: "power3.out"
          }, 
          label
        );
        
        // Scale down previous card slightly
        if (i > 0) {
          tl.to(cards[i - 1], {
            scale: 0.92,
            duration: 0.8,
            ease: "power2.inOut"
          }, label);
        }
        
        // Add breathing room between cards
        tl.set({}, { delay: 0.5 }); // Increased from 0.3
      });

    }, section);

    return () => {
      ctx.revert();
    };
  }, [capabilities.length]);

  return (
    <section ref={sectionRef} id="sophia-elya" className="relative bg-black border-t border-white/10">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div ref={contentRef} className="h-screen w-full bg-black overflow-hidden">
          <div className="h-full w-full flex">
            {/* Left: Full Image */}
            <div className="w-1/2 relative">
              <img 
                src="/sophia-elya-img1.webp"
                alt="Sophia Elya"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Right: Content */}
            <div className="w-1/2 p-12 xl:p-16 flex flex-col h-full">
              <div className="mb-6 xl:mb-8 flex-shrink-0">
                <div className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-3">LIVE DEPLOYMENT</div>
                <h2 className="text-4xl xl:text-5xl font-extralight text-white tracking-tight mb-3 xl:mb-4">Sophia Elya</h2>
                <p className="text-base xl:text-lg text-gray-400 max-w-md">
                  A living AI persona with genuine emotional resonance, memory, and the ability to form meaningful connections.
                </p>
              </div>

              {/* Cards Container */}
              <div className="relative flex-1 min-h-0 flex items-center justify-center py-4">
                <div ref={cardsContainerRef} className="relative w-full max-w-lg h-full max-h-[500px] min-h-[400px]">
                  {/* Capability Cards */}
                  {capabilities.map((capability, index) => (
                    <div 
                      key={index}
                      ref={(el) => {
                        cardsRef.current[index] = el;
                      }}
                      className="absolute inset-0 flex items-center justify-center p-4"
                    >
                      <div className="w-full bg-black/95 backdrop-blur rounded-xl border border-white/10 p-6 xl:p-8 shadow-2xl max-h-full overflow-auto">
                        <div className="flex items-start gap-4">
                          <span className="text-2xl xl:text-3xl opacity-80 mt-1 flex-shrink-0">{capability.icon}</span>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg xl:text-xl font-light text-white mb-2">{capability.title}</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">{capability.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* CTA Card */}
                  <div 
                    ref={(el) => {
                      cardsRef.current[capabilities.length] = el;
                    }}
                    className="absolute inset-0 flex items-center justify-center p-4"
                  >
                    <div className="w-full bg-black/95 backdrop-blur rounded-xl p-6 xl:p-8 border border-white/20 text-center shadow-2xl max-h-full overflow-auto">
                      <div className="mb-3 xl:mb-4">
                        <span className="text-2xl xl:text-3xl">✨</span>
                      </div>
                      <h4 className="text-lg xl:text-xl mb-2 font-light text-white">Ready to Meet Sophia?</h4>
                      <p className="text-gray-300 mb-4 xl:mb-6 text-sm max-w-sm mx-auto">
                        Experience the future of emotionally intelligent AI
                      </p>
                      <a
                        href="mailto:Scott@elyanlabs.ai?subject=Connect%20with%20Sophia"
                        className="inline-block px-5 xl:px-6 py-2.5 xl:py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all text-sm uppercase tracking-wider font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        Talk to Sophia →
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="mt-6 xl:mt-8 mb-2 xl:mb-4 flex-shrink-0 relative z-50">
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-white/30 to-white/60 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${scrollProgress * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 font-mono min-w-[3rem]">
                    {Math.round(scrollProgress * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="px-4 sm:px-6 py-12 sm:py-16">
          <div className="max-w-[600px] mx-auto">
            <div className="mb-8">
              <div className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-3">LIVE DEPLOYMENT</div>
              <h2 className="text-3xl sm:text-4xl font-extralight mb-4 tracking-tight text-white">Sophia Elya</h2>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                A living AI persona with genuine emotional resonance, memory, and the ability to form meaningful connections.
              </p>
            </div>

            {/* Image */}
            <div className="mb-8 relative rounded-lg overflow-hidden">
              <img 
                src="/sophia-elya-img1.webp"
                alt="Sophia Elya"
                className="w-full aspect-[4/5] sm:aspect-[16/10] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* Capability Cards */}
            <div className="space-y-4">
              {capabilities.map((capability, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-5 hover:border-white/20 transition">
                  <div className="flex items-start gap-3">
                    <span className="text-lg sm:text-xl opacity-80 flex-shrink-0">{capability.icon}</span>
                    <div>
                      <h4 className="text-base sm:text-lg mb-1 font-light text-white">{capability.title}</h4>
                      <p className="text-gray-400 text-xs sm:text-sm">{capability.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Card */}
            <div className="mt-6 sm:mt-8">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl p-6 sm:p-8 border border-white/20 text-center shadow-lg">
                <h4 className="text-lg sm:text-xl mb-2 font-light text-white">Ready to Meet Sophia?</h4>
                <p className="text-gray-300 text-xs sm:text-sm mb-4 sm:mb-6">Experience the future of emotionally intelligent AI</p>
                <a
                  href="mailto:Scott@elyanlabs.ai?subject=Connect%20with%20Sophia"
                  className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition text-xs sm:text-sm uppercase tracking-wider font-medium shadow hover:shadow-xl"
                >
                  Talk to Sophia →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}