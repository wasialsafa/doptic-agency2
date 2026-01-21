import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VisualStrategySection = () => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null); // Ref for the container (detects mouse)
  const imageRef = useRef(null);          // Ref for the image (animates)

  // --- 3D Tilt Logic (Matched to Project/Challenge Sections) ---
  const handleMouseMove = (e) => {
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to center (-0.5 to 0.5)
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    // Standardized settings:
    // - Duration 0.4
    // - Ease power1.out
    // - No scale/zoom
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
    // Reset settings
    gsap.to(imageRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 1,
      ease: "power3.out"
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
       // Optional: Add entrance animations here if needed
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Typography Object
  const bodyTextStyle = {
    fontFamily: '"Inter Variable", sans-serif',
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: '18px',
    lineHeight: '160%',
    letterSpacing: '0%',
  };

  return (
    <section ref={sectionRef} className="bg-bg-light dark:bg-bg-dark transition-colors duration-300 font-sans overflow-hidden">
      
      {/* Container Layout */}
      <div className="w-full max-w-[1290px] mx-auto pt-[30px] pb-[60px] px-5 lg:px-0 flex flex-col gap-[64px]">
        
        {/* Image Section with Tilt Animation */}
        <div 
          ref={imageContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full h-[300px] md:h-[500px] lg:h-[640px] overflow-hidden rounded-sm perspective-[1000px]" // Added perspective & rounded
        >
          <img
            ref={imageRef}
            src="/images/projectspage/projectdetails01/visualstrategy.svg"
            alt="Visual Strategy Board"
            // Added will-change-transform, removed scale-105 to match "Project" style
            className="w-full h-full object-cover will-change-transform" 
          />
        </div>

        {/* Text Section */}
        <div className="w-full flex flex-col gap-[14px]">
          
          {/* Title - Fixed Font */}
          <h2 
            className="text-[42px] md:text-[54px] lg:text-[64px] font-medium tracking-tight leading-none mb-4 text-[#0e0e0e] dark:text-[#e2e2e2]"
            style={{ fontFamily: '"Inter Variable", sans-serif' }}
          >
            Visual Strategy
          </h2>

          {/* Body Text Wrapper (No Animations) */}
          <div className="flex flex-col gap-[14px]">
            <p 
              className="text-[#0e0e0e] dark:text-[#e2e2e2] opacity-80" 
              style={bodyTextStyle}
            >
              We abandoned the generic white-background standard. Instead, we established 
              a moody "dark mode" aesthetic, utilizing high-contrast typography and 
              oversized imagery to create an immediate visual impact.
            </p>
            
            <p 
              className="text-[#0e0e0e] dark:text-[#e2e2e2] opacity-80" 
              style={bodyTextStyle}
            >
              To bridge the digital gap, we implemented WebGL micro-interactions. 
              These subtle animations react dynamically to the cursor, creating a 
              responsive environment that feels alive.
            </p>
            
            <p 
              className="text-[#0e0e0e] dark:text-[#e2e2e2] opacity-80" 
              style={bodyTextStyle}
            >
              The result is a tactile experience that mimics the weight of high-quality 
              fabric. Every scroll and hover feels heavy, deliberate, and undeniably premium.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default VisualStrategySection;