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

const EthosSection = () => {
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
      


      {/* --- VALUES SECTION --- */}
      {/* Width Calculation: 
          max-w-[1440px] - (75px padding-left + 75px padding-right) = 1290px Content Width 
          Top Gap: 120px (pt-[120px])
          Bottom Gap: 120px (pb-[120px])
      */}
      <div className="w-full max-w-[1440px] mx-auto px-[75px] pt-[120px] pb-[120px]">
        
        {/* Main Content Grid: Gap 30px between "Values" heading and Right Content */}
        <div className="flex flex-col lg:flex-row gap-[30px]">
          
          {/* Left: Heading */}
          <h2 className="text-[50px] md:text-[72px] font-medium leading-[120%] tracking-[-4%] text-[#0e0e0e] dark:text-white shrink-0"
          style={{ fontFamily: FONT_INTER }}>
            Our Ethos
          </h2>

          {/* Right: Content Wrapper */}
          <div ref={textContainerRef} className="flex flex-col w-full lg:items-end">
            
            {/* Text Block 1 */}
            <div 
              className="reveal-text w-full max-w-[850px] text-[24px] md:text-[32px] font-normal leading-[120%] tracking-[-4%] text-gray-300 dark:text-gray-700"
              style={{ fontFamily: FONT_INTER }}
            >Doptic is driven by a passion for clarity. We believe that great design shouldn't just look good—it should solve complex problems. We strip away the noise to build digital products that are intuitive, scalable, and impactful. </div>

            {/* Gap 40px */}
            <div className="h-[40px] w-full"></div>

            {/* Text Block 2 */}
            <div 
              className="reveal-text w-full max-w-[850px] text-[24px] md:text-[32px] font-normal leading-[120%] tracking-[-4%] text-gray-300 dark:text-gray-700"
              style={{ fontFamily: FONT_INTER }}
            >Our approach blends data-driven strategy with pixel-perfect execution. We don't just build for today; we build for the future of your brand.</div>

            {/* Gap 40px */}
            <div className="h-[40px] w-full"></div>

            {/* Stats Grid 
                Width: 850px (max-w-[850px])
                Height: 193px (min-h-[193px])
            */}
            <div className="w-full max-w-[850px] min-h-[193px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 border-t border-gray-200 pt-8">
              {[
                { label: "Active", value: 1, suffix: "0", unit: "Years" },
                { label: "Awards", value: 4, suffix: "5", unit: "Design" },
                { label: "Over", value: 6, suffix: "4", unit: "Projects" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col min-w-max">
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


export default EthosSection;