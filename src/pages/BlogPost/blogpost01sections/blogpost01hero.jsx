import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link, Linkedin, X, Facebook } from 'lucide-react';

const FONT_INTER = 'Inter Variable, sans-serif';
const FONT_CASLON = 'Libre Caslon Text, serif';

const BlogPostHero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const metaRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Title Animation (Targeting the spans inside h1)
      tl.from(titleRef.current.querySelectorAll("span"), {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
      });

      // 2. Meta Data Row
      tl.from(metaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
      }, "-=0.5");

      // 3. Image Reveal
      tl.from(imageRef.current, {
        scale: 0.98,
        opacity: 0,
        duration: 1.2,
        clearProps: "all" 
      }, "-=0.6");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-bg-light dark:bg-bg-dark min-h-screen w-full text-[#1A1A1A] dark:text-white">
      
      {/* MAIN CONTAINER 
        Width: 1440px (max), Padding: 120px top/bottom, 75px sides
      */}
      <div 
        ref={containerRef} 
        className="max-w-[1440px] mx-auto pt-[120px] pb-[120px] px-5 md:px-[64px] flex flex-col"
      >
        
        {/* --- 1. TEXT SECTION (FIXED) --- 
            Combined into one H1 to allow "color" to sit next to "psychology of"
        */}
        <header className="mb-12 md:mb-[56px] max-w-[1312px]">
          <h1 
            ref={titleRef}
            className="flex flex-wrap items-baseline gap-x-4 md:gap-x-6 leading-[1.2] tracking-[-0.04em]"
          >
            {/* LINE 1: The psychology of (Inter) + color (Caslon) */}
            <div className="flex flex-wrap items-baseline gap-x-4 md:gap-x-6 w-full">
               <span 
                className="font-medium text-[48px] md:text-[80px] lg:text-[128px]"
                style={{ fontFamily: FONT_INTER }}
              >
                The psychology of
              </span>
              
              <span 
                className="italic font-normal text-[40px] md:text-[64px] lg:text-[104px]"
                style={{ fontFamily: FONT_CASLON }}
              >
                color
              </span>
            </div>

            {/* LINE 2: in 2026. (Caslon) */}
            <span 
              className="italic font-normal text-[40px] md:text-[64px] lg:text-[104px] w-full block mt-[-10px] md:mt-[-20px]"
              style={{ fontFamily: FONT_CASLON }}
            >
              in 2026.
            </span>
          </h1>
        </header>

        {/* --- 2. META DATA ROW --- */}
        <div 
          ref={metaRef} 
          className="flex flex-col md:flex-row justify-between items-start md:items-center w-full max-w-[1312px] md:h-[68px] mb-12 md:mb-[64px] gap-6 md:gap-0"
        >
          {/* Left: Author */}
          <div className="flex items-center gap-4 h-full">
            <div className="w-[68px] h-[68px] rounded-full overflow-hidden shrink-0 bg-gray-200">
              <img 
                src="/images/blogpage/noimage.svg" 
                alt="Author" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-[3px]">
              <span className="font-bold text-lg leading-none" style={{ fontFamily: FONT_INTER }}>
                Bessie Cooper
              </span>
              <span className="text-sm opacity-60 leading-none" style={{ fontFamily: FONT_INTER }}>
                11 Jan 2022 • 5 min read
              </span>
            </div>
          </div>

          {/* Right: Social Icons */}
          <div className="flex items-center justify-start md:justify-end gap-[3px] h-full">
            {[Link, Linkedin, X, Facebook].map((Icon, i) => (
              <button 
                key={i}
                className="w-[32px] h-[32px] rounded-[64px] p-[4px] border border-black/10 dark:border-white/20 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                <Icon size={14} strokeWidth={2} />
              </button>
            ))}
          </div>
        </div>

        {/* --- 3. HERO IMAGE --- */}
        <div 
          ref={imageRef} 
          className="w-full max-w-[1312px] h-[300px] md:h-[600px] overflow-hidden rounded-sm bg-gray-200"
        >
          <img 
            src="/images/blogpage/blogpostimage1.svg" 
            alt="Interior design hero" 
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
};

export default BlogPostHero;