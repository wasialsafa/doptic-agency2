import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  // Refs for animation
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const projectRef = useRef(null);
  const numberRef = useRef(null);
  const imageRef = useRef(null);
  const descRef = useRef(null); // Added ref for description

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Text Animation
      const headerTexts = headerRef.current.querySelectorAll('h1');
      gsap.fromTo(headerTexts, 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.2, 
          ease: "power3.out",
          delay: 0.2
        }
      );

      // 2. Project Title Animation
      const projectTitle = projectRef.current.querySelectorAll('h2');
      gsap.fromTo(projectTitle,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: projectRef.current,
            start: "top 80%",
          }
        }
      );

      // 3. Number, Image & Description Animation
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
      <section 
        className="w-full max-w-[1440px] px-6 lg:px-[75px] py-20 lg:py-[120px] flex justify-end border-b border-black/5 dark:border-white/5 box-border"
      >
        <div 
          ref={headerRef}
          className="flex flex-col items-end w-full max-w-[1290px] gap-2 lg:gap-4"
        >
          <div className="overflow-hidden">
            <h1 
              className="font-medium leading-[120%] tracking-[-0.04em] text-right text-[#0e0e0e] dark:text-text-light"
              style={{ 
                fontFamily: '"Inter Variable", sans-serif', 
                fontSize: 'clamp(40px, 8.8vw, 128px)' 
              }}
            >
              Crafting Tomorrow's
            </h1>
          </div>
          
          <div className="overflow-hidden">
            <h1 
              className="italic leading-[120%] tracking-[-0.04em] text-right text-[#0e0e0e] dark:text-text-light"
              style={{ 
                fontFamily: '"Libre Caslon Text", serif', 
                fontSize: 'clamp(32px, 7.2vw, 104px)' 
              }}
            >
              Solutions, Today.
            </h1>
          </div>
        </div>
      </section>

      {/* SECTION 2: PROJECT SHOWCASE */}
      <section className="w-full max-w-[1440px] px-6 lg:px-[75px] py-16 lg:py-[60px] box-border">
        
        <div ref={projectRef} className="flex flex-col w-full max-w-[1290px] gap-[24px]">
          
          {/* TITLE GROUP */}
          <div className="flex flex-col w-full lg:max-w-[700px]">
             <h2 
              className="font-medium leading-[120%] tracking-[-0.04em] text-[#0e0e0e] dark:text-text-light"
              style={{ 
                fontFamily: '"Inter Variable", sans-serif', 
                fontSize: 'clamp(36px, 6.6vw, 96px)' 
              }}
            >
              Redefining Urban
            </h2>

            <h2 
              className="leading-[120%] tracking-[-0.02em] text-[#0e0e0e] dark:text-text-light mt-[-5px]"
              style={{ 
                fontFamily: '"Italiana", serif', 
                fontSize: 'clamp(28px, 4.4vw, 64px)' 
              }}
            >
              Fashion
            </h2>
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
                className="block font-bold text-[#0e0e0e] dark:text-white leading-none"
                style={{ 
                    fontFamily: '"Inter Variable", sans-serif',
                    fontSize: '154px',
                    opacity: 0.3 
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
                {/* IMAGE */}
                <div 
                    ref={imageRef}
                    className="w-full h-auto lg:h-[614px] overflow-hidden rounded-[4px] mb-6"
                >
                    <img 
                        src="/images/projectspage/projectimage1.svg" 
                        alt="Redefining Urban Fashion"
                        className="w-full h-full object-cover"
                    />
                </div>

              
                {/* DESCRIPTION TEXT */}
                <div ref={descRef} className="w-full flex justify-end">
                    <p 
                        className="text-[#0e0e0e]/70 dark:text-text-light/60 text-[14px] md:text-[16px] leading-relaxed font-light"
                        style={{
                            fontFamily: '"Inter Variable", sans-serif',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            fontSize: '18px',
                            lineHeight: '160%',
                            letterSpacing: '0%',
                            textAlign: 'right',
                            whiteSpace: 'nowrap' // Forces text to stay on one line
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