import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 1. Reusable Tilt Component
const TiltImage = ({ src, alt, className, direction }) => {
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
        rotationY: x * 10, 
        rotationX: -y * 10,
        transformPerspective: 1000,
        ease: "power2.out",
        duration: 0.5,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        rotationY: 0,
        rotationX: 0,
        ease: "power2.out",
        duration: 0.5,
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
    <div ref={containerRef} className={`overflow-hidden relative ${className}`}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-transform will-change-transform ${direction}`} 
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
      
      // Text Reveal Animations
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
    <section className="w-full bg-bg-light dark:bg-bg-dark flex justify-center">
      
      {/* Page Container:
        Width: 1440px
        Padding: Top 60px, Right 75px, Bottom 60px, Left 75px 
      */}
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
              className="text-[42px] md:text-[54px] lg:text-[64px] font-medium tracking-tight leading-none mb-4"
            >
              The Impact
            </h2>
            <p 
              ref={subTitleRef} 
              className="text-sm md:text-base text-gray-600 w-full leading-relaxed"
            >
              The new platform launched in time for their Fall Collection. The results were immediate.
            </p>
          </div>

          {/* Images Section Wrapper with 32px vertical gap */}
          <div className="flex flex-col gap-[32px]">
            
            {/* Top Image (Full Width: 1290px, Height: 640px) */}
            <div className="w-full h-[640px]">
              <TiltImage 
                src="/images/projectspage/projectdetails01/impactimage1.svg" 
                alt="Basketball Player"
                direction="anim-top"
                className="w-full h-full rounded-sm"
              />
            </div>

            {/* Bottom Row (Two Columns, Gap 32px) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] grid-container">
              
              {/* Left Image (Height: 640px) */}
              <div className="h-[640px]">
                <TiltImage 
                  src="/images/projectspage/projectdetails01/impactimage2.svg" 
                  alt="Fashion Model Pink Hair"
                  direction="anim-left"
                  className="w-full h-full rounded-sm"
                />
              </div>

              {/* Right Image (Height: 640px) */}
              <div className="h-[640px]">
                <TiltImage 
                  src="/images/projectspage/projectdetails01/impactimage3.svg" 
                  alt="Man in Coat"
                  direction="anim-right"
                  className="w-full h-full rounded-sm"
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