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
          duration: 0.1,    // Typing speed
          stagger: 0.05,    // Stagger between keys
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

const Project06 = () => {
  // Refs for animation
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  // header textRef is no longer needed (Typewriter handles itself)
  const imageContainerRef = useRef(null); // Outer wrapper (Entrance animation)
  const tiltImageRef = useRef(null);      // Inner image (Tilt animation)
  const numberRef = useRef(null);
  const descRef = useRef(null);

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
      // NOTE: Header animations are now inside TypewriterText components

      // 2. Image & Number Animation Timeline
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
          <div className="flex flex-col items-end w-full z-10 mb-8 lg:mb-0">
            <TypewriterText 
              as="h2"
              text="Synthetix AI Brand"
              className="font-medium leading-[1.1] tracking-[-0.03em] text-[#0e0e0e] dark:text-text-light text-right"
              style={{ 
                fontFamily: '"Inter Variable", sans-serif', 
                fontSize: 'clamp(48px, 8vw, 110px)' 
              }}
            />
            <TypewriterText 
              as="h3"
              text="Identity"
              delay={0.5}
              className="mt-[-5px] md:mt-[-15px] text-[#0e0e0e] dark:text-text-light text-right"
              style={{ 
                fontFamily: '"Italiana", serif', 
                fontSize: 'clamp(32px, 5vw, 72px)' 
              }}
            />
          </div>

          {/* 2. CONTENT AREA */}
          <div className="relative w-full flex flex-col lg:block">
            
            {/* IMAGE: Left Side | 740px */}
            <div 
              ref={imageContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              // Added perspective for 3D effect
              className="w-full lg:w-[740px] h-auto lg:h-[614px] overflow-hidden rounded-[4px] z-10 relative perspective-[1000px]"
            >
              {/* IMAGE ELEMENT (Target for Tilt) */}
              <img 
                ref={tiltImageRef}
                src="/images/projectspage/projectimage1.svg" 
                alt="Synthetix AI Brand Identity"
                // Removed CSS hover, added will-change-transform
                className="w-full h-full object-cover will-change-transform"
              />
            </div>

            {/* NUMBER: 06 - UPDATED POSITION & STYLE */}
            <div 
              ref={numberRef}
              className="hidden lg:flex absolute items-center justify-start z-0"
              style={{ 
                // 740px (Image width) + 60px (Gap) = 800px from Left
                left: '800px', 
                // 460px from Bottom
                bottom: '540px',
                width: 'auto' 
              }}
            >
              <span 
                className="block text-[#0E0E0E1A] dark:text-[#E2E2E2]/10 select-none"
                style={{ 
                    fontFamily: '"Inter Variable", sans-serif',
                    fontWeight: 800,           // ExtraBold
                    fontSize: '128px',         // Fixed Size
                    lineHeight: '100%',        // Line Height
                    letterSpacing: '-0.04em',  // -4%
                }}
              >
                06
              </span>
            </div>

            {/* DESCRIPTION: Full Width (1290px) | 1 Liner */}
            <div 
              className="w-full lg:w-[1290px] mt-6 flex justify-start"
            > 
              <p 
                ref={descRef} 
                className="text-[#0E0E0E]/70 dark:text-[#e2e2e2]/70 w-full"
                style={{
                    fontFamily: '"Inter Variable", sans-serif',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    fontSize: '18px',
                    lineHeight: '160%', 
                    letterSpacing: '0%',
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