import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Project03 = () => {
  const { theme } = useTheme();

  // Animation Refs
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const numberRef = useRef(null);
  const imageRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Animation (Staggered Slide Up)
      const headers = headerRef.current.querySelectorAll('h2');
      gsap.fromTo(headers, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%", // Starts when headers are 80% down the viewport
          }
        }
      );

      // 2. Timeline for Number, Image, and Description
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imageRef.current, // Triggers based on image position
          start: "top 75%",
        }
      });

      tl.fromTo(numberRef.current, 
        { x: -50, opacity: 0 }, // Number slides from left
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(imageRef.current,
        { scale: 0.95, opacity: 0 }, // Image scales up
        { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=0.8" // Overlap slightly with number animation
      )
      .fromTo(descRef.current,
        { y: 20, opacity: 0 }, // Description slides up
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.8"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-bg-light dark:bg-bg-dark min-h-screen transition-colors duration-300 font-sans overflow-x-hidden flex justify-center items-center">
      
      {/* SECTION */}
      <section className="w-full h-auto px-5 py-10 lg:w-[1440px] lg:h-[998px] lg:px-[75px] lg:py-[60px] flex-shrink-0 box-border transition-all">
        
        {/* Main Content Div */}
        <div className="relative w-full flex flex-col gap-8 lg:block lg:w-[1290px] lg:h-[878px]">
          
          {/* 1. Headings */}
          <div ref={headerRef} className="relative z-20 lg:absolute lg:top-0 lg:left-0">
            <h2 
              className="font-medium leading-[120%] tracking-[-0.04em] text-[#0e0e0e] dark:text-text-light text-[48px] md:text-[72px] lg:text-[96px]"
              style={{ fontFamily: '"Inter Variable", sans-serif' }}
            >
              Modern Housing
            </h2>
            <h2 
              className="leading-[120%] tracking-[-0.02em] text-[#0e0e0e] dark:text-text-light mt-[-5px] lg:mt-[-10px] text-[32px] md:text-[48px] lg:text-[64px]"
              style={{ fontFamily: '"Italiana", serif' }}
            >
              Fashion
            </h2>
          </div>

      
          {/* 2. Number "03" */}
          <div 
            ref={numberRef}
            className="relative lg:absolute flex items-center justify-start lg:justify-center z-0 lg:w-[161px] lg:h-[154px] lg:left-[329px] lg:bottom-[460px]"
          >
            <span 
              className="block text-[#0E0E0E1A] dark:text-[#E2E2E2]/10 select-none"
              style={{ 
                  fontFamily: '"Inter Variable", sans-serif',
                  fontWeight: 800,          // ExtraBold
                  fontSize: '128px',        // Fixed size
                  lineHeight: '120%',       
                  letterSpacing: '-0.04em', // -4%
              }}
            >
              03
            </span>
          </div>

          {/* 3. Image Wrapper & Text */}
          <div 
            className="relative z-10 flex flex-col items-start lg:items-end gap-6 lg:absolute lg:w-[740px] lg:left-[550px] lg:top-[200px]"
          >
            {/* Image */}
            <div 
              ref={imageRef}
              className="w-full h-[300px] md:h-[500px] lg:w-[740px] lg:h-[614px] overflow-hidden rounded-[4px] "
            >
              <img 
                src="/images/projectspage/projectimage3.svg" 
                alt="Redefining Urban Fashion"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* 4. Text */}
            <p 
              ref={descRef}
              className="text-[#0E0E0E]/70 dark:text-[#e2e2e2]/70 text-[14px] md:text-[16px] leading-relaxed font-light whitespace-normal lg:whitespace-nowrap text-left lg:text-right w-full lg:w-auto"
              style={{
                fontFamily: '"Inter Variable", sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '18px',
                lineHeight: '160%',
                letterSpacing: '0%',
              }}
            >
              A property management app for Nesto that automates tenant requests and streamlines maintenance workflows.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Project03;