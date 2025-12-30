import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Project02 = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const numberRef = useRef(null);
  const textRef = useRef(null);

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
        { x: 50, opacity: 0 }, // Slide in from right
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    // SECTION: 1440px Max Width | Padding: 60px Top/Bottom, 75px Left/Right
    <section 
      ref={sectionRef}
      className="w-full bg-bg-light dark:bg-bg-dark transition-colors duration-300 font-sans overflow-x-hiddenmax-w-[1440px] px-6 lg:px-[75px] py-16 lg:py-[60px] flex flex-col items-center box-border" 
    >
      {/* MAIN CONTENT DIV: Width 1290px | Gap 24px */}
      <div 
        ref={contentRef} 
        className="w-full max-w-[1290px] flex flex-col gap-[24px]"
      >
        
        {/* 1. HEADER TEXT BLOCK (Right Aligned) */}
        <div ref={textRef} className="flex flex-col items-end w-full z-10">
          <h2 
            className="font-medium leading-[1.1] tracking-[-0.03em] text-[#0e0e0e] dark:text-text-light text-right"
            style={{ 
              fontFamily: '"Inter Variable", sans-serif', 
              fontSize: 'clamp(48px, 8vw, 110px)' 
            }}
          >
            Scaling Enterprise
          </h2>
          <h3 
            className="mt-[-5px] md:mt-[-15px] text-[#0e0e0e] dark:text-text-light text-right"
            style={{ 
              fontFamily: '"Italiana", serif', 
              fontSize: 'clamp(32px, 5vw, 72px)' 
            }}
          >
            SaaS
          </h3>
        </div>

        {/* 2. IMAGE & NUMBER ROW (Flex Row) */}
        {/* Gap: 60px */}
        <div className="flex flex-col lg:flex-row items-start w-full gap-10 lg:gap-[60px]">
          
          {/* LEFT COLUMN: Image + Description */}
          <div className="flex flex-col w-full lg:max-w-[1043px]">
            {/* IMAGE: Width 1043px | Height 640px */}
            <div 
              ref={imageRef}
              className="w-full h-auto lg:h-[640px] overflow-hidden rounded-[4px] shadow-2xl"
            >
              <img 
                src="/images/projectspage/projectimage2.svg" 
                alt="Scaling Enterprise SaaS"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* DESCRIPTION: Right Aligned under Image */}
            <div className="mt-4 w-full flex justify-end">
              <p 
                className="text-[#0e0e0e]/70 dark:text-text-light/60 text-[14px] md:text-[16px] leading-relaxed font-light"
                style={{
                    fontFamily: '"Inter Variable", sans-serif',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    fontSize: '18px',
                    lineHeight: '160%',
                    letterSpacing: '0%',
                    whiteSpace: 'nowrap' // Enforce 1-liner
                }}
              >
                A robust dashboard redesign for Optixmn that improves user workflow and visualizes complex data clearly.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Number */}
          {/* Gap is handled by parent gap-[60px] */}
          <div 
            ref={numberRef}
            className="shrink-0 hidden lg:block"
          >
            <span 
              className="block font-bold text-[#0e0e0e] dark:text-white leading-none select-none"
              style={{ 
                  fontFamily: '"Inter Variable", sans-serif',
                  fontSize: '154px', // Consistent with Project 01
                  opacity: 0.3 
              }}
            >
              02
            </span>
          </div>

          {/* Mobile Number (Visible only on small screens) */}
          <div className="lg:hidden block self-end">
            <span className="text-[64px] font-bold opacity-30">02</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Project02;