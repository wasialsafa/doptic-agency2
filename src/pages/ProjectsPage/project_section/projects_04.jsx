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

const Project04 = () => {
  // Refs for animation
  const sectionRef = useRef(null);
  // headerRef not needed for animation anymore (Typewriter handles it)
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

      // 2. Timeline for Image, Number, Desc
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
          <div className="flex flex-col items-end w-full z-10">
            <TypewriterText 
              as="h2"
              text="Nova Banking Mobile"
              className="font-medium leading-[1.1] tracking-[-0.03em] text-[#0e0e0e] dark:text-text-light text-right"
              style={{ 
                fontFamily: '"Inter Variable", sans-serif', 
                fontSize: 'clamp(40px, 6vw, 96px)' 
              }}
            />
            <TypewriterText 
              as="h3"
              text="App"
              delay={0.5}
              className="mt-[-5px] md:mt-[-10px] text-[#0e0e0e] dark:text-text-light text-right"
              style={{ 
                fontFamily: '"Italiana", serif', 
                fontSize: 'clamp(32px, 5vw, 64px)' 
              }}
            />
          </div>

          {/* 2. MAIN ROW: Image (Left) + Number (Right) */}
          <div className="flex flex-col lg:flex-row items-start w-full gap-10 lg:gap-[40px]">
            
            {/* LEFT COLUMN: Image + Description */}
            <div className="flex flex-col w-full lg:max-w-[1098px]">
              {/* IMAGE CONTAINER */}
              <div 
                ref={imageContainerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                // Added perspective for 3D effect
                className="w-full h-auto lg:h-[614px] overflow-hidden rounded-[4px] perspective-[1000px]"
              >
                {/* IMAGE ELEMENT (Target for Tilt) */}
                <img 
                  ref={tiltImageRef}
                  src="/images/projectspage/projectimage1.svg" 
                  alt="Nova Banking App"
                  // Removed CSS hover, added will-change-transform
                  className="w-full h-full object-cover will-change-transform"
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
                    lineHeight: '100%',       
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