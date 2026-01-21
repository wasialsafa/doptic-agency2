import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ChallengeSection = () => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null); // Ref for the container (detects mouse)
  const imageRef = useRef(null);          // Ref for the image (animates)

  // --- 3D Tilt Logic (Matched to Project Sections) ---
  const handleMouseMove = (e) => {
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to center (-0.5 to 0.5)
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    // Project-style settings:
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
      // (Optional) You can add an entrance animation here if you want the image to fade in on scroll,
      // similar to the project pages. For now, it just handles the cleanup.
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
    <section 
      ref={sectionRef} 
      className="bg-bg-light dark:bg-bg-dark w-full flex justify-center transition-colors duration-300"
    >
      {/* Page Container */}
      <div className="w-full max-w-[1440px] px-[75px] pt-[60px] pb-[30px]">
        
        {/* Heading (Updated Font) */}
        <h2 
          className="text-[42px] md:text-[54px] lg:text-[64px] font-medium tracking-tight leading-none mb-4 text-[#0e0e0e] dark:text-[#e2e2e2]"
          style={{ fontFamily: '"Inter Variable", sans-serif' }}
        >
            The Challenge
        </h2>

        {/* Main Content Div */}
        <div className="flex flex-col">
          
          {/* Text Div (No Animations) */}
          <div 
            className="w-full flex flex-col gap-[14px]"
            style={{ minHeight: '297px' }}
          >
            <p 
              className="text-[#0e0e0e] dark:text-[#e2e2e2] opacity-80"
              style={bodyTextStyle}
            >
              Despite a massive social following, Apex's web presence was failing to convert. The existing site felt disconnected from the brand's energy, resulting in high bounce rates and missed sales opportunities.
            </p>

            <p 
              className="text-[#0e0e0e] dark:text-[#e2e2e2] opacity-80"
              style={bodyTextStyle}
            >
              Technical performance was the biggest bottleneck. The mobile experience was clunky, and the checkout infrastructure repeatedly crashed during high-traffic product launches, frustrating their most loyal fans.
            </p>

            <p 
              className="mt-4 text-[#0e0e0e] dark:text-[#e2e2e2] opacity-80"
              style={bodyTextStyle}
            >
              They needed a total overhaul. The goal was to build a platform as aggressive as their aesthetic—one capable of handling viral surges and converting hype into revenue without friction.
            </p>
          </div>

          {/* Gap between Text and Image */}
          <div className="h-[64px]"></div>

          {/* Image Div with Tilt Animation */}
          <div 
            ref={imageContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full h-[640px] overflow-hidden rounded-sm perspective-[1000px]" // Added perspective
          >
            <img
              ref={imageRef}
              src="/images/projectspage/projectdetails01/thechallenge.svg.svg"
              alt="Challenge Visual"
              // Added will-change-transform for smoother animation
              className="w-full h-full object-cover will-change-transform"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ChallengeSection;