import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const FONT_INTER = 'Inter Variable, sans-serif';
const FONT_CASLON = 'Libre Caslon Text, serif';

// --- COLOR CLASSES ---
const textMain = "text-[#0e0e0e] dark:text-[#e2e2e2]";
const textSub = "text-[#0e0e0e]/70 dark:text-[#e2e2e2]/70";

// --- CONFIGURATION: ADD YOUR SOCIAL ICON LINKS HERE ---
const SOCIAL_ICONS = [
  { name: "Link",      src: "/logos/blogpostlogo1.svg" }, // Put image URL here, e.g. "/icons/link.svg"
  { name: "LinkedIn",  src: "/logos/blogpostlogo2.svg" }, // Put image URL here
  { name: "X",         src: "/logos/blogpostlogo3.svg" }, // Put image URL here
  { name: "Facebook",  src: "/logos/blogpostlogo4.svg" }, // Put image URL here
];

// --- HELPER: SPLIT TEXT FOR TYPEWRITER ---
const SplitText = ({ children, className, style }) => {
  return (
    <div className={className} style={style}>
      {children.split('').map((char, index) => (
        <span 
          key={index} 
          className="char inline-block" 
          style={{ opacity: 0 }} // Start hidden for animation
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

// --- HELPER: 3D TILT IMAGE COMPONENT ---
const TiltImage = ({ src, alt, className, containerClassName }) => {
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current || !imageRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    gsap.to(imageRef.current, {
      rotationY: x * 10,  // Subtle tilt
      rotationX: -y * 10, 
      transformPerspective: 1000,
      transformOrigin: "center",
      ease: "power1.out",
      duration: 0.4
    });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      rotationY: 0,
      rotationX: 0,
      ease: "power3.out",
      duration: 1
    });
  };

  return (
    <div 
      ref={containerRef}
      className={`perspective-[1000px] overflow-hidden bg-transparent ${containerClassName}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={imageRef} className="w-full h-full will-change-transform rounded-sm overflow-hidden">
        <img src={src} alt={alt} className={className} />
      </div>
    </div>
  );
};

const BlogPostHero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const metaRef = useRef(null);
  const imageContainerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Typewriter Animation (Targeting .char classes inside title)
      const chars = titleRef.current.querySelectorAll(".char");
      tl.to(chars, {
        opacity: 1,
        duration: 0.05,
        stagger: 0.03,
        ease: "none",
      });

      // 2. Meta Data Row
      tl.from(metaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
      }, "-=0.5");

      // 3. Image Reveal (Scaling up)
      tl.from(imageContainerRef.current, {
        scale: 0.98,
        opacity: 0,
        duration: 1.2,
        clearProps: "all" 
      }, "-=0.6");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-bg-light dark:bg-bg-dark min-h-screen w-full transition-colors duration-300">
      
      {/* MAIN CONTAINER */}
      <div 
        ref={containerRef} 
        className="max-w-[1440px] mx-auto pt-[120px] pb-[120px] px-5 md:px-[64px] flex flex-col"
      >
        
        {/* --- 1. TEXT SECTION --- */}
        <header className="mb-12 md:mb-[56px] max-w-[1312px]">
          <h1 
            ref={titleRef}
            className={`flex flex-wrap items-baseline gap-x-4 md:gap-x-6 leading-[1.2] tracking-[-0.04em] ${textMain}`}
          >
            {/* LINE 1: The psychology of (Inter) + color (Caslon) */}
            <div className="flex flex-wrap items-baseline gap-x-4 md:gap-x-6 w-full">
               <SplitText 
                className="font-medium text-[48px] md:text-[80px] lg:text-[128px]"
                style={{ fontFamily: FONT_INTER }}
              >
                The psychology of
              </SplitText>
              
              <SplitText 
                className="italic font-normal text-[40px] md:text-[64px] lg:text-[104px]"
                style={{ fontFamily: FONT_CASLON }}
              >
                color
              </SplitText>
            </div>

            {/* LINE 2: in 2026. (Caslon) */}
            <SplitText 
              className="italic font-normal text-[40px] md:text-[64px] lg:text-[104px] w-full block mt-[-10px] md:mt-[-20px]"
              style={{ fontFamily: FONT_CASLON }}
            >
              in 2026.
            </SplitText>
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
              <span className={`font-bold text-lg leading-none ${textMain}`} style={{ fontFamily: FONT_INTER }}>
                Bessie Cooper
              </span>
              <span className={`text-sm leading-none ${textSub}`} style={{ fontFamily: FONT_INTER }}>
                11 Jan 2022 • 5 min read
              </span>
            </div>
          </div>

          {/* Right: Social Icons (IMAGES) */}
          <div className="flex items-center justify-start md:justify-end gap-[3px] h-full">
            {SOCIAL_ICONS.map((icon, i) => (
              <button 
                key={i}
                className={`w-[32px] h-[32px] rounded-[64px] p-[6px] border border-[#0e0e0e1a] dark:border-[#e2e2e21a] flex items-center justify-center hover:bg-black hover:invert dark:hover:bg-white dark:hover:invert-0 transition-colors`}
                title={icon.name}
              >
                {/* logic: display image if src exists, otherwise empty box.
                   You can define specific widths/heights for your logos here.
                */}
                {icon.src && (
                  <img 
                    src={icon.src} 
                    alt={icon.name} 
                    className="w-full h-full object-contain filter dark:invert" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* --- 3. HERO IMAGE (3D TILT) --- */}
        <div ref={imageContainerRef} className="w-full max-w-[1312px]">
            <TiltImage 
                src="/images/blogpage/blogpostimage1.svg"
                alt="Interior design hero"
                containerClassName="w-full h-[300px] md:h-[600px] rounded-sm bg-gray-200"
                className="w-full h-full object-cover"
            />
        </div>

      </div>
    </div>
  );
};

export default BlogPostHero;