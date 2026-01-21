import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 1. Reusable Tilt Component
// UPDATED: Changed background to 'bg-transparent' to ensure perfect match with parent section
const TiltImage = ({ src, alt, className }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    // Mouse Move Tilt Logic
    const handleMouseMove = (e) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      gsap.to(image, {
        rotationY: x * 20, 
        rotationX: -y * 20,
        transformPerspective: 1000,
        transformOrigin: "center",
        ease: "power1.out",
        duration: 0.4,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        rotationY: 0,
        rotationX: 0,
        ease: "power3.out",
        duration: 1,
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      // CHANGED: bg-transparent ensures the page background shows through the tilt gaps
      className={`overflow-hidden relative perspective-[1000px] bg-transparent ${className}`}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover will-change-transform" 
      />
    </div>
  );
};

// 2. Main Impact Section Component
const ImpactSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subTitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- ENTRANCE ANIMATIONS ---

      // Text Animations
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      gsap.from(subTitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // Image Animations
      gsap.from(".anim-top", {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".anim-top",
          start: "top 85%",
        }
      });

      gsap.from(".anim-left", {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".grid-container", 
          start: "top 75%",
        }
      });

      gsap.from(".anim-right", {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".grid-container",
          start: "top 75%",
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-bg-light dark:bg-bg-dark flex justify-center transition-colors duration-300">
      
      {/* Page Container */}
      <div 
        ref={sectionRef}
        className="w-full max-w-[1440px] px-[75px] py-[60px]"
      >
        
        {/* Main Content Wrapper */}
        <div className="flex flex-col gap-[64px]">

          {/* Header Text Section */}
          <div>
            <h2 
              ref={titleRef}
              className="text-[42px] md:text-[54px] lg:text-[64px] font-medium tracking-tight leading-none mb-4 text-[#0e0e0e] dark:text-[#e2e2e2]"
              style={{ fontFamily: '"Inter Variable", sans-serif' }}
            >
              The Impact
            </h2>
            <p 
              ref={subTitleRef}
              className="w-full text-[#0E0E0E]/70 dark:text-[#E2E2E2]/70"
              style={{
                fontFamily: '"Inter Variable", sans-serif',
                fontWeight: 400,
                fontSize: '18px',
                fontStyle: 'normal',
                lineHeight: '160%',
                letterSpacing: '0%'
              }}
            >
              The new platform launched in time for their Fall Collection. The results were immediate.
            </p>
          </div>

          {/* Images Section Wrapper */}
          <div className="flex flex-col gap-[32px]">
            
            {/* Top Image */}
            <div className="w-full h-[640px]">
              <TiltImage 
                src="/images/projectspage/projectdetails01/impactimage1.svg" 
                alt="Basketball Player"
                className="anim-top w-full h-full rounded-sm shadow-2xl"
              />
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] grid-container">
              
              {/* Left Image */}
              <div className="h-[640px]">
                <TiltImage 
                  src="/images/projectspage/projectdetails01/impactimage2.svg" 
                  alt="Fashion Model Pink Hair"
                  className="anim-left w-full h-full rounded-sm shadow-2xl"
                />
              </div>

              {/* Right Image */}
              <div className="h-[640px]">
                <TiltImage 
                  src="/images/projectspage/projectdetails01/impactimage3.svg" 
                  alt="Man in Coat"
                  className="anim-right w-full h-full rounded-sm shadow-2xl"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ImpactSection;