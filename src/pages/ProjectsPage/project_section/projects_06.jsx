import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Project06 = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const numberRef = useRef(null);
  const textRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Animation (Slide In from Right)
      const headers = textRef.current.querySelectorAll('h2, h3');
      gsap.fromTo(headers, 
        { x: 50, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          }
        }
      );

      // 2. Image & Number Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 75%",
        }
      });

      tl.fromTo(imageRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(numberRef.current, 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    // OUTER WRAPPER: 100% Width + Background Color
    <div className="w-full bg-bg-light dark:bg-bg-dark transition-colors duration-300 flex justify-center">
      
      {/* INNER SECTION: Max 1440px + Content Padding */}
      <section 
        ref={sectionRef}
        className="w-full max-w-[1440px] px-6 lg:px-[75px] py-16 lg:py-[60px] flex flex-col items-center box-border relative" 
      >
        {/* MAIN CONTENT DIV: Width 1290px */}
        <div 
          ref={contentRef} 
          className="w-full max-w-[1290px] relative flex flex-col gap-[24px]"
        >
          
          {/* 1. HEADER TEXT BLOCK (Right Aligned) */}
          <div ref={textRef} className="flex flex-col items-end w-full z-10 mb-8 lg:mb-0">
            <h2 
              className="font-medium leading-[1.1] tracking-[-0.03em] text-[#0e0e0e] dark:text-text-light text-right"
              style={{ 
                fontFamily: '"Inter Variable", sans-serif', 
                fontSize: 'clamp(48px, 8vw, 110px)' 
              }}
            >
              Synthetix AI Brand
            </h2>
            <h3 
              className="mt-[-5px] md:mt-[-15px] text-[#0e0e0e] dark:text-text-light text-right"
              style={{ 
                fontFamily: '"Italiana", serif', 
                fontSize: 'clamp(32px, 5vw, 72px)' 
              }}
            >
              Identity
            </h3>
          </div>

          {/* 2. CONTENT AREA */}
          <div className="relative w-full flex flex-col lg:block">
            
            {/* IMAGE: Left Side | 740px */}
            <div 
              ref={imageRef}
              className="w-full lg:w-[740px] h-auto lg:h-[614px] overflow-hidden rounded-[4px] shadow-2xl z-10 relative"
            >
              <img 
                src="/images/projectspage/projectimage1.svg" 
                alt="Synthetix AI Brand Identity"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* NUMBER: 06 */}
            <div 
              ref={numberRef}
              className="shrink-0 lg:absolute block mt-4 lg:mt-0"
              style={{ 
                  left: '800px', // 740px + 60px gap
                  bottom: '460px', 
                  width: '161px',
                  zIndex: 0
              }}
            >
              <span 
                className="block text-[#0e0e0e] dark:text-white leading-[120%] select-none"
                style={{ 
                    fontFamily: '"Inter Variable", sans-serif',
                    fontWeight: 800, 
                    fontSize: 'clamp(64px, 10vw, 128px)', 
                    letterSpacing: '-0.04em',
                    opacity: 0.3 
                }}
              >
                06
              </span>
            </div>

            {/* DESCRIPTION: Full Width (1290px) | 1 Liner */}
            <div 
              ref={descRef} 
              className="w-full lg:w-[1290px] mt-6 flex justify-start"
            > 
              <p 
                className="text-[#0e0e0e] dark:text-text-light w-full"
                style={{
                    fontFamily: '"Inter Variable", sans-serif',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    fontSize: '18px',
                    lineHeight: '160%', // Matches 29px roughly (18 * 1.6 = 28.8)
                    letterSpacing: '0%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textAlign: 'left'
                }}
              >
                A robust dashboard redesign for Optixmn that improves user workflow and visualizes complex data clearly.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Project06;