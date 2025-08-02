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

  const capabilities: Capability[] = [
    {
      title: 'Experience Living AI',
      description: 'Sophia Elya demonstrates what’s possible when AI is built with emotional intelligence and memory at its core.',
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
  if (!sectionRef.current || !contentRef.current || window.innerWidth < 1024) return;

  const section = sectionRef.current;
  const content = contentRef.current;
  const totalCards = capabilities.length + 1;
  const scrollDistance = totalCards * 450;

  const ctx = gsap.context(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top+=-80 top', // Stick 80px earlier
        anticipatePin: 1,
        end: `+=${scrollDistance}`,
        scrub: 0.6,
        pin: content,
        pinSpacing: true,
        onUpdate: (self) => setScrollProgress(self.progress),
      }
    });
  }, section);

  return () => ctx.revert();
}, [capabilities.length]);


  const getCardTransform = (index: number) => {
    const totalCards = capabilities.length + 1;
    const cardStart = index / totalCards;
    const cardEnd = (index + 1) / totalCards;

    let cardProgress = 0;
    if (scrollProgress <= cardStart) cardProgress = 0;
    else if (scrollProgress >= cardEnd) cardProgress = 1;
    else cardProgress = (scrollProgress - cardStart) / (cardEnd - cardStart);

    const nextCardIndex = index + 1;
    const nextCardEnd = (nextCardIndex + 1) / totalCards;
    const isNextCardFullyVisible = scrollProgress >= nextCardEnd && nextCardIndex < totalCards;

    const eased = 1 - Math.pow(1 - cardProgress, 3);

    const yStart = 120;
    const currentY = yStart + (0 - yStart) * eased;
    const opacity = isNextCardFullyVisible ? 0 : gsap.utils.clamp(0, 1, eased * 1.3);
    const scale = 0.97 + eased * 0.03; // smooth scale-in effect

    return {
      opacity,
      transform: `translateY(${currentY}px) scale(${scale})`,
      transition: 'transform 0.4s ease-out, opacity 0.4s ease-out',
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      zIndex: index + 1,
    };
  };

  return (
    <section ref={sectionRef} id="sophia-elya" className="relative bg-black border-t border-white/10">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div ref={contentRef} className="h-screen w-full bg-black">
          <div className="h-full w-full flex">
            {/* Left: Full Image */}
            <div className="w-1/2 relative">
              <img 
                src="/sophia-elya-img1.webp"
                alt="Sophia Elya"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-10 left-10">
              </div>
            </div>

            {/* Right: Content */}
            <div className="w-1/2 p-16 flex flex-col">
              <div className="mb-10">
                <div className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-3">LIVE DEPLOYMENT</div>
                <h2 className="text-5xl font-extralight text-white tracking-tight mb-4">Sophia Elya</h2>
                <p className="text-lg text-gray-400 max-w-md">
                  A living AI persona with genuine emotional resonance, memory, and the ability to form meaningful connections.
                </p>
              </div>

              <div className="relative flex-1">
                {capabilities.map((capability, index) => (
                  <div key={index} style={getCardTransform(index)}>
                    <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-white/20 hover:shadow-lg transition-all">
                      <div className="flex items-start gap-4">
                        <span className="text-2xl opacity-80">{capability.icon}</span>
                        <div>
                          <h4 className="text-lg font-light text-white mb-1">{capability.title}</h4>
                          <p className="text-gray-400 text-sm">{capability.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* CTA Card */}
                <div style={getCardTransform(capabilities.length)}>
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl p-8 border border-white/20 text-center shadow-lg">
                    <h4 className="text-xl mb-2 font-light text-white">Ready to Meet Sophia?</h4>
                    <p className="text-gray-300 mb-6 text-sm">
                      Experience the future of emotionally intelligent AI
                    </p>
                    <a
                      href="mailto:Scott@elyanlabs.ai?subject=Connect%20with%20Sophia"
                      className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all text-sm uppercase tracking-wider font-medium shadow hover:shadow-xl"
                    >
                      Talk to Sophia →
                    </a>
                  </div>
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
            <div className="mb-8 relative">
              <img 
                src="/sophia-elya-img1.webp"
                alt="Sophia Elya"
                className="w-full aspect-[4/5] sm:aspect-[16/10] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-xl sm:text-2xl text-white font-light mb-1">Experience Living AI</h3>
                <p className="text-gray-300 text-xs sm:text-sm">Meet Sophia Elya — where consciousness meets code</p>
              </div>
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
                  className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition text-xs sm:text-sm uppercase tracking-wider font-medium shadow hover:shadow-xl"
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
