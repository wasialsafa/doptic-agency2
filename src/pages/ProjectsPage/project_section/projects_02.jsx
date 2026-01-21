import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- 1. Typewriter Component ---
const TypewriterText = ({ text, as: Tag = 'h2', className, style, delay = 0 }) => {
  const elRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = elRef.current.querySelectorAll("span");
      gsap.fromTo(chars, 
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.1,    // Speed of typing
          stagger: 0.05,    // Delay between chars
          delay: delay,
          ease: "none",
          scrollTrigger: {
            trigger: elRef.current,
            start: "top 85%",
          }
        }
      );
    }, elRef);
    return () => ctx.revert();
  }, [delay]);

  return (
    <Tag ref={elRef} className={className} style={style} aria-label={text}>
      {text.split("").map((char, i) => (
        <span key={i} className="inline-block opacity-0">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
};

const Project02 = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageContainerRef = useRef(null); // Renamed for clarity (outer div)
  const tiltImageRef = useRef(null);      // New ref for the inner img (for tilt)
  const numberRef = useRef(null);
  
  // --- 3D Tilt Logic (Matched to Landing Page) ---
  const handleMouseMove = (e) => {
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to center (-0.5 to 0.5)
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    // Matches Landing Page settings exactly:
    // - Duration 0.4
    // - Ease power1.out
    // - No scale/zoom
    gsap.to(tiltImageRef.current, {
      rotationY: x * 20, 
      rotationX: -y * 20,
      transformPerspective: 1000,
      transformOrigin: "center",
      duration: 0.4,
      ease: "power1.out"
    });
  };

  const handleMouseLeave = () => {
    // Matches Landing Page reset settings
    gsap.to(tiltImageRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 1,
      ease: "power3.out"
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // NOTE: Header animation is now handled internally by TypewriterText component

      // 2. Image Reveal Animation (Scale & Opacity on Container)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top 75%",
        }
      });

      tl.fromTo(imageContainerRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(numberRef.current, 
        { x: 50, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full flex justify-center bg-bg-light dark:bg-bg-dark transition-colors duration-300 font-sans overflow-x-hidden" 
    >
      <div className="w-full max-w-[1440px] px-6 lg:px-[75px] py-16 lg:py-[60px] flex flex-col items-center box-border">
        
        <div 
          ref={contentRef} 
          className="w-full max-w-[1290px] flex flex-col gap-[24px]"
        >
          
          {/* 1. HEADER TEXT BLOCK */}
          <div className="flex flex-col items-end w-full z-10">
            <TypewriterText 
              as="h2"
              text="Scaling Enterprise"
              className="font-medium leading-[1.1] tracking-[-0.03em] text-[#0e0e0e] dark:text-text-light text-right"
              style={{ 
                fontFamily: '"Inter Variable", sans-serif', 
                fontSize: 'clamp(48px, 8vw, 110px)' 
              }}
            />
            <TypewriterText 
              as="h3"
              text="SaaS"
              delay={0.5} // Start slightly after the first line
              className="mt-[-5px] md:mt-[-15px] text-[#0e0e0e] dark:text-text-light text-right"
              style={{ 
                fontFamily: '"Italiana", serif', 
                fontSize: 'clamp(32px, 5vw, 72px)' 
              }}
            />
          </div>

          {/* 2. IMAGE & NUMBER ROW */}
          <div className="flex flex-col lg:flex-row items-start w-full gap-10 lg:gap-[60px]">
            
            <div className="flex flex-col w-full lg:max-w-[1043px]">
              {/* IMAGE CONTAINER */}
              <div 
                ref={imageContainerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                // Added perspective class for 3D context
                className="w-full h-auto lg:h-[640px] overflow-hidden rounded-[4px] perspective-[1000px]" 
              >
                {/* IMAGE ELEMENT (Target for Tilt) */}
                <img 
                  ref={tiltImageRef}
                  src="/images/projectspage/projectimage2.svg" 
                  alt="Scaling Enterprise SaaS"
                  // Added will-change-transform for performance
                  className="w-full h-full object-cover will-change-transform" 
                />
              </div>

              {/* DESCRIPTION */}
              <div className="mt-4 w-full flex justify-start">
                <p 
                  className="text-[#0E0E0E]/70 dark:text-[#e2e2e2]/70 text-[14px] md:text-[16px] leading-relaxed font-light"
                  style={{
                      fontFamily: '"Inter Variable", sans-serif',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontSize: '18px',
                      lineHeight: '160%',
                  }}
                >
                  A robust dashboard redesign for Optixmn that improves user workflow and visualizes complex data clearly.
                </p>
              </div>
            </div>

            {/* NUMBER */}
            <div 
              ref={numberRef}
              className="shrink-0 hidden lg:block"
              style={{ width: '132px' }}
            >
              <span 
                className="block text-[#0E0E0E1A] dark:text-[#E2E2E2]/10"
                style={{ 
                    fontFamily: '"Inter Variable", sans-serif',
                    fontWeight: 800,           
                    fontSize: '128px',        
                    lineHeight: '120%',       
                    letterSpacing: '-0.04em', 
                }}
              >
                02
              </span>
            </div>

            <div className="lg:hidden block self-end">
              <span className="text-[64px] font-bold opacity-30">02</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Project02;