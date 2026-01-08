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
    <div ref={containerRef} className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col items-center font-sans text-black transition-colors duration-300">
      
      {/* Navbar Gap */}
      <div className="h-[80px] w-full bg-bg-light dark:bg-bg-dark shrink-0" />

      {/* Main Image Section */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[470px] overflow-hidden shrink-0">
        <img
          ref={imageRef}
          src="/images/projectspage/projectdetails01/projectdetails01hero.svg" 
          alt="Urban Fashion Hero"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="w-full max-w-[1290px] mx-auto mt-10 mb-16 lg:mt-[60px] lg:mb-[120px] px-5 lg:px-0 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-[80px]">
        
        {/* Left Column: Title & Description */}
        <div className="lg:col-span-7">
          {/* UPDATED: Added text color classes here */}
          <h1 className="mb-4 text-[#0e0e0e] dark:text-[#e2e2e2]">
            <span 
              className="reveal-text block"
              style={{
                fontFamily: '"Inter Variable", sans-serif',
                fontWeight: 500,
                fontStyle: 'normal', 
                fontSize: 'clamp(42px, 6vw, 96px)',
                lineHeight: '120%',
                letterSpacing: '-0.04em',
              }}
            >
              Redefining Urban{" "}
              <span 
                className="reveal-text block" 
                style={{
                  fontFamily: "'Italiana', serif",
                  fontWeight: 400,
                  fontSize: 'clamp(48px, 5vw, 64px)', 
                  lineHeight: '120%',
                  letterSpacing: '-0.02em',
                  fontStyle: 'normal',
                  marginTop: '-5px' 
                }}
              >
                Fashion
              </span>
            </span>
          </h1>
          
          {/* Subtext */}
          {/* UPDATED: Removed text-gray-600, added specific hex colors */}
          <p className="reveal-text mt-6 lg:mt-8 text-[#0E0E0EB2] dark:text-[#E2E2E2]/70"
             style={{
               maxWidth: '746px',
               fontSize: '18px',
               fontWeight: 400,
               lineHeight: '160%',
               fontFamily: '"Inter Variable", sans-serif'
             }}
          >
            We transformed a local label into a global brand. Our strategic design 
            increased conversion rates and customer loyalty instantly.
          </p>

          <div className="reveal-text flex flex-wrap gap-3 mt-8 lg:mt-10">
            {['Production', 'London', 'Fashion'].map((tag) => (
              <span 
                key={tag} 
                className="px-4 py-1 bg-white border border-gray-100 dark:bg-transparent dark:border-white/10 dark:text-[#e2e2e2]"
                style={{
                  fontFamily: '"Inter Variable", sans-serif',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '14px',
                  lineHeight: '120%',
                  letterSpacing: '0%'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Meta Data */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-y-8 lg:gap-y-12 pt-4">
          
          {/* Client */}
          <div className="reveal-meta">
            {/* UPDATED: Big Text Color */}
            <h4 
              className="mb-1 text-[#0e0e0e] dark:text-[#e2e2e2]"
              style={{
                fontFamily: '"Inter Variable", sans-serif',
                fontWeight: 500,
                fontSize: '32px',
                lineHeight: '120%',
                letterSpacing: '-0.04em'
              }}
            >
              Client
            </h4>
            <p 
              className="text-[#0E0E0EB2] dark:text-[#E2E2E2]/70"
              style={{
                fontFamily: '"Inter Variable", sans-serif',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '160%',
                letterSpacing: '0%'
              }}
            >
              Apex Apparel Co.
            </p>
          </div>

          {/* Date */}
          <div className="reveal-meta">
            {/* UPDATED: Big Text Color */}
            <h4 
              className="mb-1 text-[#0e0e0e] dark:text-[#e2e2e2]"
              style={{
                fontFamily: '"Inter Variable", sans-serif',
                fontWeight: 500,
                fontSize: '32px',
                lineHeight: '120%',
                letterSpacing: '-0.04em'
              }}
            >
              Date
            </h4>
            <p 
              className="text-[#0E0E0EB2] dark:text-[#E2E2E2]/70"
              style={{
                fontFamily: '"Inter Variable", sans-serif',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '160%',
                letterSpacing: '0%'
              }}
            >
              March 2025
            </p>
          </div>

          {/* Role */}
          <div className="reveal-meta">
            {/* UPDATED: Big Text Color */}
            <h4 
              className="mb-1 text-[#0e0e0e] dark:text-[#e2e2e2]"
              style={{
                fontFamily: '"Inter Variable", sans-serif',
                fontWeight: 500,
                fontSize: '32px',
                lineHeight: '120%',
                letterSpacing: '-0.04em'
              }}
            >
              Role
            </h4>
            <p 
              className="text-[#0E0E0EB2] dark:text-[#E2E2E2]/70"
              style={{
                fontFamily: '"Inter Variable", sans-serif',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '160%',
                letterSpacing: '0%'
              }}
            >
              End-to-End Product
            </p>
          </div>

          {/* Website */}
          <div className="reveal-meta">
            {/* UPDATED: Big Text Color */}
            <h4 
              className="mb-1 text-[#0e0e0e] dark:text-[#e2e2e2]"
              style={{
                fontFamily: '"Inter Variable", sans-serif',
                fontWeight: 500,
                fontSize: '32px',
                lineHeight: '120%',
                letterSpacing: '-0.04em'
              }}
            >
              Website
            </h4>
            <p 
              className="text-[#0E0E0EB2] dark:text-[#E2E2E2]/70 underline cursor-pointer hover:text-black dark:hover:text-white transition-colors"
              style={{
                fontFamily: '"Inter Variable", sans-serif',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '160%',
                letterSpacing: '0%'
              }}
            >
              apex-drop.shop
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProjectDetails01Hero;