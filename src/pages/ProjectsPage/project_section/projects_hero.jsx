import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Helper Component to split text into characters for typewriter effect
const SplitText = ({ children, className, style }) => {
  return (
    <div className={className} style={style}>
      {children.split('').map((char, index) => (
        <span 
          key={index} 
          className="char inline-block" // "char" class used for GSAP targeting
          style={{ opacity: 0 }} // Start invisible
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

const LandingPage = () => {
  // Refs for animation
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const projectRef = useRef(null);
  const numberRef = useRef(null);
  const imageRef = useRef(null);
  const descRef = useRef(null);

  // Image Hover Logic (3D Tilt)
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    
    // Calculate mouse position relative to center (-1 to 1)
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    gsap.to(imageRef.current, {
      rotationY: x * 20, // Tilt vertically based on X axis
      rotationX: -y * 20, // Tilt horizontally based on Y axis (inverted to "push down")
      transformPerspective: 1000,
      transformOrigin: "center",
      ease: "power1.out",
      duration: 0.4
    });
  };

  const handleMouseLeave = () => {
    // Reset position
    gsap.to(imageRef.current, {
      rotationY: 0,
      rotationX: 0,
      ease: "power3.out",
      duration: 1
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Header Typewriter Animation
      // Target the specific .char classes inside the headerRef
      const headerChars = headerRef.current.querySelectorAll('.char');
      
      gsap.to(headerChars, {
        opacity: 1,
        duration: 0.1, // Short duration per character for "typing" feel
        stagger: 0.04, // Delay between each character
        ease: "none",
        delay: 0.2
      });

      // 2. Project Title Typewriter Animation
      // Target the specific .char classes inside the projectRef
      const projectChars = projectRef.current.querySelectorAll('.char');
      
      gsap.to(projectChars, {
        opacity: 1,
        duration: 0.05,
        stagger: 0.02,
        ease: "none",
        scrollTrigger: {
          trigger: projectRef.current,
          start: "top 80%",
        }
      });

      // 3. Number, Image & Description Animation (Entrance)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 85%",
        }
      });

      tl.fromTo(numberRef.current, 
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(imageRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.8"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-bg-light dark:bg-bg-dark min-h-screen transition-colors duration-300 font-sans overflow-x-hidden flex flex-col items-center">
      
      {/* SECTION 1: TOP HEADER */}
      <section className="w-full max-w-[1440px] px-6 lg:px-[75px] py-20 lg:py-[120px] flex justify-end box-border">
        <div 
          ref={headerRef}
          className="flex flex-col items-end w-full max-w-[1290px] gap-2 lg:gap-4"
        >
          <div className="overflow-hidden">
            <SplitText 
              className="font-medium leading-[120%] tracking-[-0.04em] text-right text-[#0e0e0e] dark:text-text-light"
              style={{ 
                fontFamily: '"Inter Variable", sans-serif', 
                fontSize: 'clamp(40px, 8.8vw, 128px)' 
              }}
            >
              Crafting Tomorrow's
            </SplitText>
          </div>
          
          <div className="overflow-hidden">
             <SplitText 
              className="italic leading-[120%] tracking-[-0.04em] text-right text-[#0e0e0e] dark:text-text-light"
              style={{ 
                fontFamily: '"Libre Caslon Text", serif', 
                fontSize: 'clamp(32px, 7.2vw, 104px)' 
              }}
            >
              Solutions, Today.
            </SplitText>
          </div>
        </div>
      </section>

      {/* SECTION 2: PROJECT SHOWCASE */}
      <section className="w-full max-w-[1440px] px-6 lg:px-[75px] py-16 lg:py-[60px] box-border">
        
        <div ref={projectRef} className="flex flex-col w-full max-w-[1290px] gap-[24px]">
          
          {/* TITLE GROUP */}
          <div className="flex flex-col w-full lg:max-w-[700px]">
             <SplitText 
              className="font-medium leading-[120%] tracking-[-0.04em] text-[#0e0e0e] dark:text-text-light"
              style={{ 
                fontFamily: '"Inter Variable", sans-serif', 
                fontSize: 'clamp(36px, 6.6vw, 96px)' 
              }}
            >
              Redefining Urban
            </SplitText>

            <SplitText 
              className="leading-[120%] tracking-[-0.02em] text-[#0e0e0e] dark:text-text-light mt-[-5px]"
              style={{ 
                fontFamily: '"Italiana", serif', 
                fontSize: 'clamp(28px, 4.4vw, 64px)' 
              }}
            >
              Fashion
            </SplitText>
          </div>

          {/* IMAGE & NUMBER ROW */}
          <div className="flex flex-col lg:flex-row items-start w-full gap-10 lg:gap-[60px] mt-6">
            
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
                01
              </span>
            </div>

            {/* Mobile Number */}
             <div className="lg:hidden block">
              <span className="text-[64px] font-bold opacity-30">01</span>
            </div>

            {/* RIGHT COLUMN: Image + Description */}
            <div className="flex flex-col w-full lg:max-w-[1098px]">
                
                {/* IMAGE CONTAINER WITH HOVER EVENT */}
                <div 
                    className="w-full h-auto lg:h-[614px] mb-6 perspective-[1000px]" // Added perspective class for 3D effect
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <div 
                       ref={imageRef}
                       className="w-full h-full overflow-hidden rounded-[4px] will-change-transform"
                    >
                        <img 
                            src="/images/projectspage/projectimage1.svg" 
                            alt="Redefining Urban Fashion"
                            className="w-full h-full object-cover pointer-events-none" // prevent img drag
                        />
                    </div>
                </div>

              
                {/* DESCRIPTION TEXT */}
                <div ref={descRef} className="w-full flex justify-end">
                    <p 
                        className="text-[#0E0E0E]/70 dark:text-[#e2e2e2]/70 text-[14px] md:text-[16px] leading-relaxed font-light"
                        style={{
                            fontFamily: '"Inter Variable", sans-serif',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            fontSize: '18px',
                            lineHeight: '160%',
                            letterSpacing: '0%',
                            textAlign: 'right',
                        }}
                    >
                        We transformed a local label into a global brand. Our strategic design increased conversion rates and customer loyalty instantly.
                    </p>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;