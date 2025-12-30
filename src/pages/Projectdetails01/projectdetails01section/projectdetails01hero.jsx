import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ProjectDetails01Hero = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([".reveal-text", ".reveal-meta"], { opacity: 0, y: 20 });
      gsap.set(imageRef.current, { scale: 1.1, clipPath: 'inset(100% 0% 0% 0%)' });

      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

      tl.to(imageRef.current, { 
        clipPath: 'inset(0% 0% 0% 0%)', 
        scale: 1, 
        duration: 1.5 
      })
      .to(".reveal-text", { 
        opacity: 1, 
        y: 0, 
        stagger: 0.1 
      }, "-=0.8")
      .to(".reveal-meta", { 
        opacity: 1, 
        y: 0, 
        stagger: 0.05 
      }, "-=1");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col items-center font-sans text-black">
      
      {/* Navbar Gap - Responsive height if needed, kept 80px for consistency */}
      <div className="h-[80px] w-full bg-bg-light dark:bg-bg-dark shrink-0" />

      {/* Main Image Section 
          - Mobile: h-[300px] (Standard height for phones)
          - Tablet: md:h-[400px]
          - Desktop: lg:h-[470px] (Your specific requirement) 
          - Width is always w-full */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[470px] overflow-hidden shrink-0">
        <img
          ref={imageRef}
          src="/images/projectspage/projectdetails01/projectdetails01hero.svg" 
          alt="Urban Fashion Hero"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section 
          - Width: max-w-[1290px] (Your spec)
          - Margins: Responsive (mt-10 mb-16 on mobile -> mt-[60px] mb-[120px] on desktop)
          - Padding: px-5 on mobile to prevent edge touching */}
      <div className="w-full max-w-[1290px] mx-auto mt-10 mb-16 lg:mt-[60px] lg:mb-[120px] px-5 lg:px-0 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-[80px]">
        
        {/* Left Column: Title & Description */}
        <div className="lg:col-span-7">
          <h1 className="text-[42px] md:text-[54px] lg:text-[64px] font-medium tracking-tight leading-none mb-4">
            <span className="reveal-text block">Redefining Urban <span 
                className="reveal-text block" 
                style={{
                    fontFamily: "'Italiana', serif",
                    fontWeight: 400,
                    // Responsive font size for the stylized text
                    fontSize: 'clamp(48px, 5vw, 64px)', 
                    lineHeight: '120%',
                    letterSpacing: '-0.02em',
                    fontStyle: 'normal'
                }}
                >
                Fashion
                </span></span>
          </h1>
          
          {/* Subtext */}
          <p className="reveal-text mt-6 lg:mt-8 text-gray-600"
             style={{
               maxWidth: '746px',
               fontSize: '18px',
               fontWeight: 400,
               lineHeight: '160%',
               fontFamily: '"Inter", sans-serif'
             }}
          >
            We transformed a local label into a global brand. Our strategic design 
            increased conversion rates and customer loyalty instantly.
          </p>

          <div className="reveal-text flex flex-wrap gap-3 mt-8 lg:mt-10">
            {['Production', 'London', 'Fashion'].map((tag) => (
              <span key={tag} className="px-4 py-1 text-xs uppercase tracking-widest bg-white border border-gray-100">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Meta Data */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-y-8 lg:gap-y-12 pt-4">
          <div className="reveal-meta">
            <h4 className="text-lg lg:text-xl font-semibold mb-1">Client</h4>
            <p className="text-gray-500 text-sm">Apex Apparel Co.</p>
          </div>
          <div className="reveal-meta">
            <h4 className="text-lg lg:text-xl font-semibold mb-1">Date</h4>
            <p className="text-gray-500 text-sm">March 2025</p>
          </div>
          <div className="reveal-meta">
            <h4 className="text-lg lg:text-xl font-semibold mb-1">Role</h4>
            <p className="text-gray-500 text-sm">End-to-End Product</p>
          </div>
          <div className="reveal-meta">
            <h4 className="text-lg lg:text-xl font-semibold mb-1">Website</h4>
            <p className="text-gray-500 text-sm underline cursor-pointer">apex-drop.shop</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetails01Hero;