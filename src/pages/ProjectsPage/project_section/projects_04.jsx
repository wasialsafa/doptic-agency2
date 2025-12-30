import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Project04 = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([textRef.current, imageRef.current], {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-bg-light dark:bg-bg-dark min-h-screen transition-colors duration-300 font-sans overflow-x-hidden flex justify-center items-center">
      
      {/* SECTION: Fixed Dimensions (1440px x 998px) */}
      {/* Added 'relative' here so the absolute number positions relative to this box */}
      <section 
        ref={sectionRef}
        className="relative w-[1440px] h-[998px] px-[75px] py-[60px] flex-shrink-0 box-border" 
      >
        
        {/* NUMBER 04: "Out of bounds" element
            Positioned relative to the 1440px section, ignoring the 75px padding.
            Right: 40px from the edge.
            Size: 167px x 154px.
        */}
        <div 
          className="absolute flex items-center justify-center font-bold text-black/[0.08] dark:text-white/[0.08] select-none z-0 leading-none"
          style={{ 
            width: '167px',
            height: '154px',
            right: '40px', // 40px gap from the right side of the screen/container
            top: '280px',  // Aligned roughly with the top of the image
            fontSize: '200px' 
          }}
        >
          04
        </div>

        {/* Main Content Div: 1290px x 878px with 24px Gap */}
        <div className="relative w-[1290px] h-[878px] flex flex-col gap-[24px]">
          
          {/* 1. Header Text Block - Right Aligned */}
          <div ref={textRef} className="flex flex-col items-end z-20 w-full h-[150px] justify-end">
            <h2 
              className="font-medium leading-[1.1] tracking-[-0.03em] text-[#0e0e0e] dark:text-text-light text-right"
              style={{ 
                fontFamily: '"Inter Variable", sans-serif', 
                fontSize: '96px' 
              }}
            >
              Nova Banking Mobile
            </h2>
            <h3 
              className="mt-[-10px] text-[#0e0e0e] dark:text-text-light text-right"
              style={{ 
                fontFamily: '"Italiana", serif', 
                fontSize: '64px' 
              }}
            >
              App
            </h3>
          </div>

          {/* 2. Image Container */}
          <div className="relative w-full flex items-start">
            {/* Image: w-[1098px] h-[614px] */}
            <div 
              ref={imageRef}
              className="relative z-10 overflow-hidden shadow-2xl"
              style={{ width: '1098px', height: '614px' }}
            >
              <img 
                src="/images/projectspage/projectimage1.svg" 
                alt="Nova Banking App"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

          {/* 3. Footer Description - One Liner */}
          <div className="w-[1098px]">
            <p className="text-[#0e0e0e]/70 dark:text-text-light/60 text-[16px] leading-relaxed font-light whitespace-nowrap overflow-hidden text-ellipsis">
              A robust dashboard redesign for Optixmn that improves user workflow and visualizes complex data clearly.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Project04;