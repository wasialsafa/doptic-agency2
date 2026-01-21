import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- 1. Reusable Typewriter Component ---
const TypewriterText = ({ text, as: Tag = 'span', className, style, delay = 0 }) => {
  const elRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = elRef.current.querySelectorAll("span");
      gsap.fromTo(chars, 
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.1,    // Typing speed
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

const NextProjectPage = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  
  // Tilt Refs
  const imageContainerRef = useRef(null); // The wrapper (handles entrance)
  const imageRef = useRef(null);          // The image (handles tilt)

  // --- 2. 3D Tilt Logic ---
  const handleMouseMove = (e) => {
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    gsap.to(imageRef.current, {
      rotationY: x * 20, 
      rotationX: -y * 20,
      transformPerspective: 1000,
      transformOrigin: "center",
      duration: 0.4,
      ease: "power1.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 1,
      ease: "power3.out"
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Header Animation (Only fading in the subtext/button now, titles handle themselves)
      gsap.from(".header-fade", {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        }
      });

      // 2. Main Content Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 70%",
        }
      });

      // Note: Removed ".anim-title" from timeline as Typewriter handles it now.
      
      tl.from(imageContainerRef.current, {
        scale: 1.05,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      })
      .from(".anim-number", {
        x: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=1")
      .from(".anim-caption", { 
        opacity: 0,
        y: 10,
        duration: 0.8
      }, "-=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // OUTER WRAPPER
    <div className="w-full bg-bg-light dark:bg-bg-dark transition-colors duration-300 flex justify-center">
      
      {/* INNER CONTAINER */}
      <section 
        ref={containerRef}
        className="w-full max-w-[1440px] relative overflow-hidden font-sans text-[#0e0e0e] px-5 lg:px-0"
        style={{
          paddingTop: 'clamp(60px, 10vw, 120px)',
          paddingBottom: 'clamp(60px, 10vw, 120px)',
        }}
      >
        
        {/* --- TOP HEADER SECTION --- */}
        <div 
          ref={headerRef} 
          className="mx-auto flex flex-col md:flex-row justify-between items-start"
          style={{
            maxWidth: '1290px',
            width: '100%',
            marginBottom: '64px'
          }}
        >
          {/* Left: Title & Subtext Group */}
          <div className="flex flex-col gap-[20px] lg:gap-[32px]">
            
            {/* "Next Project" Title with Typewriter */}
            <h1 className="leading-[120%] tracking-[-0.04em] flex flex-wrap items-baseline gap-2 lg:gap-3 m-0 p-0">
              <TypewriterText 
                text="Next"
                className="font-medium text-[#0e0e0e] dark:text-[#e2e2e2]"
                style={{ 
                  fontFamily: '"Inter", sans-serif', 
                  fontWeight: 500,
                  fontSize: 'clamp(48px, 6vw, 72px)' 
                }}
              />
              <TypewriterText 
                text="Project"
                delay={0.4}
                className="italic font-normal text-[#0e0e0e] dark:text-[#e2e2e2]"
                style={{ 
                  fontFamily: '"Libre Caslon Text", serif', 
                  fontSize: 'clamp(48px, 6vw, 72px)' 
                }}
              />
            </h1>

            {/* Subtext */}
            <p 
              className="header-fade text-[#0E0E0EB2] dark:text-[#E2E2E2]/70 m-0 p-0"
              style={{
                maxWidth: '768px',
                fontFamily: '"Inter", sans-serif',
                fontSize: '18px',
                fontWeight: 400,
                lineHeight: '160%',
              }}
            >
              We share what we learn. Read our latest thoughts on the future of digital design.
            </p>
          </div>

          {/* Right: View All Button */}
          <div className="header-fade pt-6 md:pt-4 self-start md:self-auto">
             <button 
               className="px-6 py-3 border border-gray-400 dark:border-gray-600 dark:text-[#e2e2e2] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
               style={{ 
                 fontFamily: '"Inter Variable", sans-serif',
                 fontWeight: 500,
                 fontSize: '20px',
                 lineHeight: '150%',
                 letterSpacing: '0%'
               }}
             >
               View All
             </button>
          </div>
        </div>

        {/* --- MAIN CONTENT SECTION --- */}
        <div 
          ref={contentRef}
          className="mx-auto flex flex-col"
          style={{ 
             maxWidth: '1262px',
             width: '100%' 
          }}
        >
          
          {/* TITLES (Aligned Right) with Typewriter */}
          <div className="flex flex-col items-end mb-8 lg:mb-4">
            <TypewriterText 
              text="Scaling Enterprise"
              className="text-right text-[#0e0e0e] dark:text-[#e2e2e2]"
              style={{ 
                fontFamily: '"Inter", sans-serif', 
                fontWeight: 500,
                fontSize: 'clamp(48px, 8vw, 96px)',
                lineHeight: '120%',
                letterSpacing: '-0.04em'
              }}
            />
            
            <TypewriterText 
              text="SaaS"
              delay={0.5}
              className="text-right text-[#0e0e0e] dark:text-[#e2e2e2]"
              style={{ 
                fontFamily: '"Italiana", serif', 
                fontWeight: 400,
                fontSize: 'clamp(32px, 6vw, 64px)',
                lineHeight: '120%',
                letterSpacing: '-0.02em',
                marginTop: '-5px' 
              }}
            />
          </div>

          {/* IMAGE & NUMBER ROW */}
          <div className="w-full flex flex-col lg:flex-row items-start">
            
            {/* Left Column: Image + Caption */}
            <div className="flex flex-col gap-6 w-full lg:w-auto">
              
              {/* Image Container with Tilt & Entrance Animation */}
              <div 
                ref={imageContainerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="overflow-hidden w-full perspective-[1000px] bg-transparent" // bg-transparent fixes white flash
                style={{
                  maxWidth: '1043px', 
                  height: 'auto',
                  aspectRatio: '1043/640'
                }}
              >
                <img 
                  ref={imageRef}
                  src="/images/projectspage/projectimage2.svg" 
                  alt="Scaling Enterprise SaaS"
                  className="w-full h-full object-cover will-change-transform"
                />
              </div>

              {/* Bottom Caption */}
              <p 
                className="anim-caption text-[#0E0E0EB2] dark:text-[#E2E2E2]/70 lg:whitespace-nowrap"
                style={{
                  fontFamily: '"Inter Variable", sans-serif',
                  fontWeight: 400,
                  fontSize: '18px',
                  fontStyle: 'normal',
                  lineHeight: '160%',
                  letterSpacing: '0%',
                  maxWidth: '600px'
                }}
              >
                A robust dashboard redesign for Optixmn that improves user workflow and visualizes complex data clearly.
              </p>
            </div>

            {/* Spacer Gap */}
            <div className="hidden lg:block" style={{ width: '60px', flexShrink: 0 }} />

            {/* Right Column: Number 02 */}
            <div 
              className="anim-number flex items-start justify-start pt-8 lg:pt-0"
              style={{
                width: '159px',
                height: 'auto', 
                minHeight: '154px'
              }}
            >
              <span 
                className="font-bold leading-none text-[#0E0E0E1A] dark:text-[#E2E2E2]/10"
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 'clamp(80px, 10vw, 120px)',
                  letterSpacing: '-0.04em'
                }}
              >
                02
              </span>
            </div>

          </div>

        </div>

      </section>
    </div>
  );
};

export default NextProjectPage;