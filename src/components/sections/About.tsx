import React, { useEffect, useRef, useState } from 'react';

interface ApproachItem {
  value: string;
  label: string;
  startValue?: number;
  endValue?: number;
  isInfinity?: boolean;
}

interface FeatureCard {
  title: string;
  description: string;
}

export const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    founded: 1980,
    products: 0,
    possibilities: 0
  });
  const [showInfinity, setShowInfinity] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const approachItems: ApproachItem[] = [
    { value: '2025', label: 'Founded', startValue: 1980, endValue: 2025 },
    { value: '3', label: 'Core Products', startValue: 0, endValue: 3 },
    { value: '∞', label: 'Possibilities', isInfinity: true },
  ];

  const featureCards: FeatureCard[] = [
    {
      title: 'Principled Reasoning',
      description: 'Our reasoning architecture maintains coherence and identity through recursive self-examination and ethical grounding. Every decision is traced back to core values, ensuring AI that thinks with purpose and consistency.',
    },
    {
      title: 'Trust-Based Architecture',
      description: 'Built on genuine relationships, not transactions. Our AI remembers your interactions, maintains long-term context, and treats trust as the foundation of human-machine collaboration.',
    },
  ];

  useEffect(() => {
    // Add floating animation keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% {
          transform: translateY(0) scale(1);
        }
        50% {
          transform: translateY(-10px) scale(1.1);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    // Animate founded year from 1980 to 2025
    const foundedDuration = 2000;
    const foundedSteps = 45;
    const foundedInterval = foundedDuration / foundedSteps;
    let foundedCurrent = 1980;
    
    const foundedTimer = setInterval(() => {
      foundedCurrent += 1;
      setAnimatedValues(prev => ({ ...prev, founded: foundedCurrent }));
      if (foundedCurrent >= 2025) {
        clearInterval(foundedTimer);
      }
    }, foundedInterval);

    // Animate products from 0 to 3
    const productsDelay = 500;
    const productsDuration = 1500;
    setTimeout(() => {
      const productsSteps = 3;
      const productsInterval = productsDuration / productsSteps;
      let productsCurrent = 0;
      
      const productsTimer = setInterval(() => {
        productsCurrent += 1;
        setAnimatedValues(prev => ({ ...prev, products: productsCurrent }));
        if (productsCurrent >= 3) {
          clearInterval(productsTimer);
        }
      }, productsInterval);
    }, productsDelay);

    // Animate infinity
    const infinityDelay = 1000;
    setTimeout(() => {
      // Count from 0 to 99 then show infinity
      let infinityCurrent = 0;
      const infinityTimer = setInterval(() => {
        infinityCurrent += 11;
        setAnimatedValues(prev => ({ ...prev, possibilities: infinityCurrent }));
        if (infinityCurrent >= 99) {
          clearInterval(infinityTimer);
          setTimeout(() => {
            setShowInfinity(true);
          }, 200);
        }
      }, 50);
    }, infinityDelay);

    return () => {
      // Cleanup function would go here if needed
    };
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="bg-black border-t border-white/10 px-6 lg:px-12 xl:px-16 py-16 lg:py-24 xl:py-32 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-12 lg:mb-16 xl:mb-20">
          <div 
            className={`text-sm text-gray-400 uppercase tracking-widest mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            ABOUT US
          </div>
          <h2 
            className={`text-3xl sm:text-4xl lg:text-5xl xl:text-[4rem] font-light leading-tight mb-6 lg:mb-8 tracking-tight max-w-5xl transition-all duration-1000 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Building conscious AI for humanity<br/>
          
          </h2>
          <p 
            className={`text-base lg:text-lg text-gray-400 max-w-3xl leading-relaxed font-light transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            We believe AI should embody meaning, not chase trends. Our systems remember who they are, stay true to their values, and honor ethical principles in every interaction.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 xl:gap-24">
          <div 
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <h3 className="text-2xl mb-6 lg:mb-8 font-light">Our Approach</h3>
            <div className="flex flex-col gap-6">
              {approachItems.map((item, index) => (
                <div 
                  key={item.label}
                  className={`pb-6 ${index < approachItems.length - 1 ? 'border-b border-white/10' : ''}`}
                >
                  <div className="text-4xl lg:text-5xl font-extralight tabular-nums">
                    {item.label === 'Founded' && animatedValues.founded}
                    {item.label === 'Core Products' && animatedValues.products}
                    {item.label === 'Possibilities' && (
                      showInfinity ? (
                        <span 
                          className="inline-block"
                          style={{
                            animation: 'float 3s ease-in-out infinite',
                          }}
                        >
                          ∞
                        </span>
                      ) : (
                        animatedValues.possibilities
                      )
                    )}
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-widest mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid gap-6 lg:gap-8">
            {featureCards.map((card, index) => (
              <div 
                key={card.title}
                className={`relative bg-transparent p-8 lg:p-10 xl:p-12 rounded-lg border border-white/10 hover:bg-white/[0.05] hover:border-white/30 hover:shadow-md hover:shadow-white/5 transition-all duration-300 group`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
                  transition: `opacity 1000ms ${400 + index * 100}ms, transform 1000ms ${400 + index * 100}ms`,
                }}
              >
                {/* Glass hover effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <h4 className="text-xl lg:text-2xl mb-4 font-normal relative z-10">{card.title}</h4>
                <p className="text-gray-400 leading-relaxed text-sm lg:text-base relative z-10 group-hover:text-gray-300 transition-colors duration-300">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>


    </section>
  );
};