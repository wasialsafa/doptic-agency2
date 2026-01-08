import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Project04 = () => {
  // Refs for animation
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const imageRef = useRef(null);
  const numberRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Animation (Slide In from Right)
      const headers = headerRef.current.querySelectorAll('h2, h3');
      gsap.fromTo(headers, 
        { x: 50, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          }
        }
      );

      // 2. Timeline for Image, Number, Desc
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
      )
      .fromTo(descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.8"
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    // OUTER WRAPPER: Full width + Background
    <div 
      ref={sectionRef}
      className="w-full bg-bg-light dark:bg-bg-dark transition-colors duration-300 font-sans overflow-x-hidden flex justify-center"
    >
      {/* INNER CONTAINER: Max Width 1440px, Responsive Padding */}
      <section className="w-full max-w-[1440px] px-6 lg:px-[75px] py-16 lg:py-[60px] flex flex-col items-center box-border">
        
        {/* CONTENT WRAPPER: Max Width 1290px */}
        <div className="w-full max-w-[1290px] flex flex-col gap-[24px]">
          
          {/* 1. HEADER TEXT BLOCK (Right Aligned) */}
          <div ref={headerRef} className="flex flex-col items-end w-full z-10">
            <h2 
              className="font-medium leading-[1.1] tracking-[-0.03em] text-[#0e0e0e] dark:text-text-light text-right"
              style={{ 
                fontFamily: '"Inter Variable", sans-serif', 
                fontSize: 'clamp(40px, 6vw, 96px)' 
              }}
            >
              Nova Banking Mobile
            </h2>
            <h3 
              className="mt-[-5px] md:mt-[-10px] text-[#0e0e0e] dark:text-text-light text-right"
              style={{ 
                fontFamily: '"Italiana", serif', 
                fontSize: 'clamp(32px, 5vw, 64px)' 
              }}
            >
              App
            </h3>
          </div>

          {/* 2. MAIN ROW: Image (Left) + Number (Right) */}
          <div className="flex flex-col lg:flex-row items-start w-full gap-10 lg:gap-[40px]">
            
            {/* LEFT COLUMN: Image + Description */}
            <div className="flex flex-col w-full lg:max-w-[1098px]">
              {/* IMAGE */}
              <div 
                ref={imageRef}
                className="w-full h-auto lg:h-[614px] overflow-hidden rounded-[4px] "
              >
                <img 
                  src="/images/projectspage/projectimage1.svg" 
                  alt="Nova Banking App"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* DESCRIPTION: Left Aligned under Image */}
              <div ref={descRef} className="mt-4 w-full flex justify-start">
                <p 
                  className="text-[#0E0E0E]/70 dark:text-[#e2e2e2]/70 text-[14px] md:text-[18px] leading-relaxed font-light"
                  style={{
                    fontFamily: '"Inter Variable", sans-serif',
                    fontWeight: 400,
                  }}
                >
                  A robust dashboard redesign for Optixmn that improves user workflow and visualizes complex data clearly.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: Number 04 */}
            <div 
              ref={numberRef}
              className="shrink-0 hidden lg:block"
              style={{ width: '167px' }}
            >
              <span 
                className="block text-[#0E0E0E1A] dark:text-[#E2E2E2]/10 select-none"
                style={{ 
                    fontFamily: '"Inter Variable", sans-serif',
                    fontWeight: 800,          
                    fontSize: '128px',        
                    lineHeight: '120%',       
                    letterSpacing: '-0.04em', 
                }}
              >
                04
              </span>
            </div>

            {/* Mobile Number (Visible only on small screens) */}
            <div className="lg:hidden block self-end">
              <span className="text-[64px] font-bold opacity-30">04</span>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};

export default Project04;