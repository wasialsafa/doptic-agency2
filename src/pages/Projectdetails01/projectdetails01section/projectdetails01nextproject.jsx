import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NextProjectPage = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Header Animation
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      // 2. Main Content Stagger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 70%",
        }
      });

      tl.from(".anim-title", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      })
      .from(imageRef.current, {
        scale: 1.05,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.6")
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
          // Responsive padding: 60px on mobile, 120px on desktop
          paddingTop: 'clamp(60px, 10vw, 120px)',
          paddingBottom: 'clamp(60px, 10vw, 120px)',
        }}
      >
        
        {/* --- TOP HEADER SECTION --- */}
        <div 
          ref={headerRef} 
          className="mx-auto flex flex-col md:flex-row justify-between items-start"
          style={{
            // Max-width keeps desktop size, w-full allows shrinking
            maxWidth: '1290px',
            width: '100%',
            marginBottom: '64px'
          }}
        >
          {/* Left: Title & Subtext Group */}
          <div className="flex flex-col gap-[20px] lg:gap-[32px]">
            
            {/* "Next Project" Title */}
            <h1 className="leading-[120%] tracking-[-0.04em] flex flex-wrap items-baseline gap-2 lg:gap-3 m-0 p-0">
              <span 
                className="font-medium"
                style={{ 
                  fontFamily: '"Inter", sans-serif', 
                  fontWeight: 500,
                  // Responsive font size
                  fontSize: 'clamp(48px, 6vw, 72px)' 
                }}
              >
                Next
              </span>
              <span 
                className="italic font-normal"
                style={{ 
                  fontFamily: '"Libre Caslon Text", serif', 
                  fontSize: 'clamp(48px, 6vw, 72px)' 
                }}
              >
                Project
              </span>
            </h1>

            {/* Subtext */}
            <p 
              className="text-gray-600 m-0 p-0"
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
          <div className="pt-6 md:pt-4 self-start md:self-auto">
             <button 
               className="px-6 py-3 border border-gray-400 text-sm font-medium hover:bg-black hover:text-white transition-colors duration-300"
               style={{ fontFamily: '"Inter", sans-serif' }}
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
          
          {/* TITLES (Aligned Right) */}
          <div className="flex flex-col items-end mb-8 lg:mb-4">
            <h2 
              className="anim-title text-right text-[#0e0e0e]"
              style={{ 
                fontFamily: '"Inter", sans-serif', 
                fontWeight: 500,
                fontSize: 'clamp(48px, 8vw, 96px)', // Responsive scaling
                lineHeight: '120%',
                letterSpacing: '-0.04em'
              }}
            >
              Scaling Enterprise
            </h2>
            
            <h3 
              className="anim-title text-right text-[#0e0e0e]"
              style={{ 
                fontFamily: '"Italiana", serif', 
                fontWeight: 400,
                fontSize: 'clamp(32px, 6vw, 64px)', // Responsive scaling
                lineHeight: '120%',
                letterSpacing: '-0.02em',
                marginTop: '-5px' 
              }}
            >
              SaaS
            </h3>
          </div>

          {/* IMAGE & NUMBER ROW */}
          {/* Stacks vertically on small screens, row on Large */}
          <div className="w-full flex flex-col lg:flex-row items-start">
            
            {/* Left Column: Image + Caption */}
            <div className="flex flex-col gap-6 w-full lg:w-auto">
              {/* Image Container */}
              <div 
                className="overflow-hidden bg-black w-full"
                style={{
                  // Max width ensures it stops at 1043px on desktop
                  maxWidth: '1043px', 
                  // Aspect ratio keeps shape on mobile, fixed height on desktop
                  height: 'auto',
                  aspectRatio: '1043/640'
                }}
              >
                <img 
                  ref={imageRef}
                  src="/images/projectspage/projectimage2.svg" 
                  alt="Scaling Enterprise SaaS"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom Caption */}
              <p 
                className="anim-caption text-gray-600 lg:whitespace-nowrap"
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '16px',
                  maxWidth: '600px'
                }}
              >
                A robust dashboard redesign for Optixmn that improves user workflow and visualizes complex data clearly.
              </p>
            </div>

            {/* Spacer Gap (60px) - Hidden on mobile, visible on Large */}
            <div className="hidden lg:block" style={{ width: '60px', flexShrink: 0 }} />

            {/* Right Column: Number 02 */}
            <div 
              className="anim-number flex items-start justify-start pt-8 lg:pt-4"
              style={{
                width: '159px',
                // Height auto on mobile to avoid cutoff
                height: 'auto', 
                minHeight: '154px'
              }}
            >
              <span 
                className="font-bold leading-none text-[#D1D1D1]"
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