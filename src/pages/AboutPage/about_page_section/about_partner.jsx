import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const partners = [
  { name: 'Boltshift', logo: '/images/partners/boltshift.svg' },
  { name: 'Lightbox', logo: '/images/partners/lightbox.svg' },
  { name: 'FeatherDev', logo: '/images/partners/featherdev.svg' },
  { name: 'Spherule', logo: '/images/partners/spherule.svg' },
];

const FONT_INTER = 'Inter Variable, sans-serif';

const RollingNumber = ({ target }) => {
  const columnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(columnRef.current, {
        y: `-${target * 10}%`,
        duration: 2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: columnRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    });
    return () => ctx.revert();
  }, [target]);

  return (
    <div className="h-[128px] overflow-hidden leading-[120%] inline-block">
      <div ref={columnRef} className="flex flex-col items-center transition-all">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <span key={num} className="block h-[128px]">
            {num}
          </span>
        ))}
      </div>
    </div>
  );
};

const AboutPartners = () => {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  
  // We use a container ref for text to select all paragraphs inside
  const textContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Carousel Logic
      gsap.to(scrollRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "none",
      });

      // 2. Letter-by-Letter Reveal (Updated for multiple blocks)
      const textElements = textContainerRef.current.querySelectorAll('.reveal-text');
      
      textElements.forEach((textElement) => {
        // Split text
        const chars = textElement.innerText.split("");
        textElement.innerHTML = chars
          .map((char) => `<span class="reveal-char">${char}</span>`)
          .join("");
        
        // Animate chars inside this specific element
        gsap.to(textElement.querySelectorAll('.reveal-char'), {
          color: "#0e0e0e", // Target color (dark) - adjusted via CSS for dark mode usually, or set explicitly here
          opacity: 1,
          stagger: 0.02,
          scrollTrigger: {
            trigger: textElement,
            start: "top 80%",
            end: "bottom 60%",
            scrub: true,
          },
        });
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-bg-light dark:bg-bg-dark transition-colors duration-300 font-['Inter_Variable'] overflow-x-hidden">
      
      {/* --- CAROUSEL --- */}
      <div className="py-12 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-[1440px] mx-auto px-[20px] md:px-[75px]">
          <div className="flex flex-col md:flex-row items-center gap-8 overflow-hidden">
             <h3 className="text-[#0e0e0e] dark:text-white font-medium leading-[120%] tracking-[-4%] text-[32px] md:text-[40px] whitespace-nowrap"
             style={{ fontFamily: FONT_INTER }}>
               Creative Partners
             </h3>
             
             {/* UPDATED: Added Mask Image styles for fade effect on left/right edges 
                transparent -> black (visible) -> transparent 
             */}
             <div 
                className="relative flex-1 overflow-hidden"
                style={{ 
                    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
                }}
             >
                <div ref={scrollRef} className="flex items-center gap-12 w-max">
                  {[...partners, ...partners].map((p, i) => (
                    <div key={i} className="flex items-center gap-12">
                      <img src={p.logo} alt="" className="h-8 md:h-10 dark:invert grayscale opacity-50" />
                      <div className="h-8 w-[1px] bg-gray-300" />
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* --- VALUES SECTION --- */}
      <div className="w-full max-w-[1440px] mx-auto px-[75px] pt-[120px] pb-[120px]">
        
        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-[30px]">
          
          {/* Left: Heading */}
          <h2 className="text-[50px] md:text-[72px] font-medium leading-[120%] tracking-[-4%] text-[#0e0e0e] dark:text-white shrink-0"
          style={{ fontFamily: FONT_INTER }}>
            Values
          </h2>

          {/* Right: Content Wrapper */}
          <div ref={textContainerRef} className="flex flex-col w-full lg:items-end">
            
            {/* Text Block 1 */}
            <div 
              className="reveal-text w-full max-w-[850px] text-[24px] md:text-[32px] font-normal leading-[120%] tracking-[-4%] text-gray-300 dark:text-gray-700"
              style={{ fontFamily: FONT_INTER }}
            >
              We are a collective of strategists, designers, and engineers who refuse to settle for "good enough." We treat every project as an opportunity to push boundaries, delivering work that is visually striking and technically flawless.
            </div>

            {/* Gap 40px */}
            <div className="h-[40px] w-full"></div>

            {/* Text Block 2 */}
            <div 
              className="reveal-text w-full max-w-[850px] text-[24px] md:text-[32px] font-normal leading-[120%] tracking-[-4%] text-gray-300 dark:text-gray-700"
              style={{ fontFamily: FONT_INTER }}
            >
              From initial brainstorming to final code, our diverse perspectives converge to create singular, powerful solutions that turn ambitious concepts into reality.
            </div>

            {/* Gap 40px */}
            <div className="h-[40px] w-full"></div>

            {/* Stats Grid */}
            <div className="w-full max-w-[850px] min-h-[193px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 border-t border-gray-200 pt-8">
              {[
                { label: "Established for", value: 1, suffix: "0", unit: "Years" },
                { label: "Work across", value: 1, suffix: "6", unit: "Countries" },
                { label: "Over", value: 9, suffix: "0", unit: "Projects" }
              ].map((stat, i) => (
                /* UPDATED: Added fontFamily style to the stats container wrapper */
                <div key={i} className="flex flex-col min-w-max" style={{ fontFamily: FONT_INTER }}>
                  <span className="text-[12px] md:text-sm uppercase tracking-widest text-gray-500 mb-4">{stat.label}</span>
                  <div className="flex items-baseline text-[80px] md:text-[128px] font-medium leading-[1] tracking-[-4%] text-[#0e0e0e] dark:text-white">
                    <RollingNumber target={stat.value} />
                    <span>{stat.suffix}</span>
                    <span className="text-[18px] md:text-[24px] ml-2 md:ml-4 text-gray-500 font-normal tracking-normal">{stat.unit}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPartners;