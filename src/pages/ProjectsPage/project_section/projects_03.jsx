import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../../context/ThemeContext';
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

const Project03 = () => {
  const { theme } = useTheme();

  // Animation Refs
  const sectionRef = useRef(null);
  const numberRef = useRef(null);
  const imageContainerRef = useRef(null); // Outer wrapper (Entrance animation)
  const tiltImageRef = useRef(null);      // Inner image (Tilt animation)
  const descRef = useRef(null);

  // --- 3D Tilt Logic (Matched to Landing Page) ---
  const handleMouseMove = (e) => {
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to center (-0.5 to 0.5)
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    // Matches your Landing Page snippet:
    // - Uses rotationY/X
    // - Duration 0.4
    // - Ease power1.out
    // - No scale/zoom
    gsap.to(tiltImageRef.current, {
      rotationY: x * 20, 
      rotationX: -y * 20, 
      transformPerspective: 1000,
      transformOrigin: "center",
      ease: "power1.out",
      duration: 0.4
    });
  };

  const handleMouseLeave = () => {
    // Matches your Landing Page snippet:
    // - Duration 1
    // - Ease power3.out
    gsap.to(tiltImageRef.current, {
      rotationY: 0,
      rotationX: 0,
      ease: "power3.out",
      duration: 1
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 2. Timeline for Number, Image Container, and Description
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imageContainerRef.current, 
          start: "top 75%",
        }
      });

      tl.fromTo(numberRef.current, 
        { x: -50, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      // Animate the CONTAINER (Entrance)
      .fromTo(imageContainerRef.current,
        { scale: 0.95, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
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
    <div ref={sectionRef} className="bg-bg-light dark:bg-bg-dark min-h-screen transition-colors duration-300 font-sans overflow-x-hidden flex justify-center items-center">
      
      {/* SECTION */}
      <section className="w-full h-auto px-5 py-10 lg:w-[1440px] lg:h-[998px] lg:px-[75px] lg:py-[60px] flex-shrink-0 box-border transition-all">
        
        {/* Main Content Div */}
        <div className="relative w-full flex flex-col gap-8 lg:block lg:w-[1290px] lg:h-[878px]">
          
          {/* 1. Headings with Typewriter Animation */}
          <div className="relative z-20 lg:absolute lg:top-0 lg:left-0">
            <TypewriterText 
              as="h2"
              text="Modern Housing"
              className="font-medium leading-[120%] tracking-[-0.04em] text-[#0e0e0e] dark:text-text-light text-[48px] md:text-[72px] lg:text-[96px]"
              style={{ fontFamily: '"Inter Variable", sans-serif' }}
            />
            <TypewriterText 
              as="h2"
              text="Fashion"
              delay={0.6}
              className="leading-[120%] tracking-[-0.02em] text-[#0e0e0e] dark:text-text-light mt-[-5px] lg:mt-[-10px] text-[32px] md:text-[48px] lg:text-[64px]"
              style={{ fontFamily: '"Italiana", serif' }}
            />
          </div>
      
          {/* 2. Number "03" */}
          <div 
            ref={numberRef}
            className="relative lg:absolute flex items-center justify-start lg:justify-center z-0 lg:w-[161px] lg:h-[154px] lg:left-[329px] lg:bottom-[540px]"
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
              03
            </span>
          </div>

          {/* 3. Image Wrapper & Text */}
          <div 
            className="relative z-10 flex flex-col items-start lg:items-end gap-6 lg:absolute lg:w-[740px] lg:left-[550px] lg:top-[200px]"
          >
            {/* Image Container (Wrapper for Reveal + Tilt Event Listener) */}
            <div 
              ref={imageContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              // Added perspective class to container for 3D effect
              className="w-full h-[300px] md:h-[500px] lg:w-[740px] lg:h-[614px] overflow-hidden rounded-[4px] perspective-[1000px]" 
            >
              {/* Actual Image (Target for Tilt) */}
              <img 
                ref={tiltImageRef}
                src="/images/projectspage/projectimage3.svg" 
                alt="Redefining Urban Fashion"
                // Added will-change-transform for smoother animation
                className="w-full h-full object-cover will-change-transform" 
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