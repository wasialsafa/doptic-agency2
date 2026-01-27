import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// --- CONFIGURATION ---
const IMAGES = {
  heroMain: "/images/blogpage/noimage.svg", 
  sidePost1: "/images/blogpage/noimage.svg",
  sidePost2: "/images/blogpage/noimage.svg",
  gridPost1: "/images/blogpage/blogimage1.svg",
  gridPost2: "/images/blogpage/blogimage2.svg",
  gridPost3: "/images/blogpage/blogimage1.svg",
  gridPost4: "/images/blogpage/blogimage2.svg",
};

const FONT_INTER = 'Inter Variable, sans-serif';
const FONT_CASLON = 'Libre Caslon Text, serif';

// --- COLOR CLASSES ---
const textMain = "text-[#0e0e0e] dark:text-[#e2e2e2]";
const textSub = "text-[#0e0e0e]/70 dark:text-[#e2e2e2]/70";

// --- ANIMATION CLASS ---
const underlineAnim = "relative w-fit after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-500 after:ease-out group-hover:after:scale-x-100";

// --- HELPER: SPLIT TEXT FOR TYPEWRITER ---
const SplitText = ({ children, className, style }) => {
  return (
    <div className={className} style={style}>
      {children.split('').map((char, index) => (
        <span 
          key={index} 
          className="char inline-block" 
          style={{ opacity: 0 }} 
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
      rotationY: x * 20, 
      rotationX: -y * 20, 
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

const BlogGridSection1 = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('View all');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. General Entrance
      gsap.from(".animate-in", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.5 
      });

      // 2. Typewriter Effect
      const chars = headerRef.current.querySelectorAll('.char');
      gsap.to(chars, {
        opacity: 1,
        duration: 0.05,
        stagger: 0.03,
        ease: "none",
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const categoryTypography = {
    fontFamily: FONT_INTER,
    fontWeight: 500,      
    fontSize: '20px',
    lineHeight: '150%',
    letterSpacing: '0%',
  };

  const categories = ['View all', 'Category one', 'Category two', 'Category three', 'Category four'];

  // UPDATED: Removed dark:text-white. 
  // Text will stay #0e0e0e (black) in both light and dark modes to contrast with pastel backgrounds.
  const baseLabelClasses = "flex items-center justify-center h-[25px] px-[12px] py-[4px] border border-[#0e0e0e1a] dark:border-white/20 rounded-[99px] text-[12px] font-bold uppercase tracking-wider text-[#0e0e0e]";

  // Typography for Post Titles
  const postTitleStyle = {
    fontFamily: "'Inter Variable', sans-serif",
    fontWeight: 500,
    fontSize: '40px',
    lineHeight: '120%',
    letterSpacing: '-0.04em',
  };

  return (
    <div 
      ref={containerRef}
      className="bg-bg-light dark:bg-bg-dark min-h-screen w-full flex justify-center transition-colors duration-300" 
      style={{ fontFamily: FONT_INTER }}
    >
      <div className="w-full max-w-[1440px] pt-24 pb-16 px-5 lg:pt-[200px] lg:pb-[120px] lg:px-[75px]">
        
        {/* --- HERO TEXT (TYPEWRITER) --- */}
        <header ref={headerRef} className="w-full max-w-[1290px] h-auto lg:h-[347px] mb-16 lg:mb-[64px] flex flex-col items-end gap-6 lg:gap-[14px]">
          <div className="w-full flex flex-col items-end">
            <SplitText 
              className={`text-right w-full ${textMain}`}
              style={{ 
                fontSize: 'clamp(48px, 10vw, 128px)',           
                lineHeight: '120%',          
                letterSpacing: '-0.04em',    
                fontFamily: FONT_INTER,
                fontWeight: 500       
              }}
            >
              Crafting Tomorrow's
            </SplitText>
            
            <SplitText 
              className={`text-right w-full italic font-normal block ${textMain}`}
              style={{ 
                fontFamily: FONT_CASLON,   
                fontSize: 'clamp(40px, 8vw, 104px)',         
                lineHeight: '120%',        
                letterSpacing: '-0.04em'   
              }}
            >
              Solutions, Today.
            </SplitText>
          </div>
          
          <div className="w-full flex justify-end animate-in">
            <p 
              style={{ 
                fontFamily: FONT_INTER,
                fontWeight: 400,
                lineHeight: '160%',
                letterSpacing: '0%',
                textAlign: 'right'
              }}
              className={`w-full max-w-[740px] text-base lg:text-[18px] ${textSub}`}
            >
              We're a group of creative thinkers, developers, and designers dedicated to turning your vision into impactful.
            </p>
          </div>
        </header>

        {/* --- FEATURED POSTS --- */}
        <section className="w-full max-w-[1290px] h-auto lg:h-[664px] mb-16 lg:mb-[64px] animate-in flex flex-col gap-10 lg:gap-[40px]">
          
          {/* Section Title */}
          <div className="w-full lg:w-[1290px] h-auto flex items-center mb-4 lg:mb-0">
            <h2 className={`w-full ${textMain}`}>
              <span 
                  style={{
                    fontFamily: FONT_INTER,
                    fontWeight: 500,
                    fontSize: 'clamp(36px, 6vw, 72px)', 
                    lineHeight: '120%',
                    letterSpacing: '-0.04em'
                  }}
              >
                Featured blog{" "}
              </span>
              <span
                  style={{
                    fontFamily: FONT_CASLON,
                    fontWeight: 400,
                    fontStyle: 'italic',
                    fontSize: 'clamp(36px, 6vw, 72px)', 
                    lineHeight: '120%',
                    letterSpacing: '-0.04em'
                  }}
              >
                 posts
              </span>
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-[30px] w-full h-auto lg:h-[550px]">
            
            {/* Left Box */}
            <div className="w-full lg:w-[630px] h-auto lg:h-[550px] flex flex-col gap-6 lg:gap-[24px] group cursor-pointer">
              {/* TILT IMAGE 1 */}
              <TiltImage 
                src={IMAGES.heroMain} 
                alt="Feature" 
                containerClassName="w-full aspect-video lg:aspect-auto lg:h-[400px]"
                className="w-full h-full object-cover" 
              />
              
              <div className="flex flex-col gap-2">
                 <div className="flex justify-between items-center mb-2">
                    <span className={`${baseLabelClasses} bg-[#FDE2E4]`}>Design</span>
                    <span className={`text-[14px] font-medium uppercase tracking-widest ${textSub}`}>5 MIN READ</span>
                 </div>
                 
                 {/* TITLE */}
                 <h3 
                    className={`${underlineAnim} text-[#0e0e0e] dark:text-[#e2e2e2]`} 
                    style={postTitleStyle}
                 >
                   The psychology of color in 2026
                 </h3>
                 <p className={`text-sm md:text-[16px] ${textSub}`}>Discover how palette choices influence user trust and decision-making.</p>
              </div>
            </div>

            {/* Right Box (Side Posts) */}
            <div className="w-full lg:w-[630px] h-auto lg:h-[530px] flex flex-col gap-8 lg:gap-[30px]">
              
              {/* Post 1 */}
              <div className="w-full lg:w-[630px] h-auto lg:h-[250px] flex flex-col md:flex-row gap-6 lg:gap-[24px] group cursor-pointer">
                 {/* TILT IMAGE 2 */}
                 <TiltImage 
                    src={IMAGES.sidePost1} 
                    alt="Side 1" 
                    containerClassName="w-full md:w-[250px] aspect-video md:aspect-square lg:h-[250px] shrink-0"
                    className="w-full h-full object-cover" 
                 />
                 <div className="flex flex-col justify-center h-auto lg:h-full w-full">
                    {/* Justify Between -> Pushes Text to Right */}
                    <div className="flex items-center justify-between mb-3 w-full">
                      <span className={`${baseLabelClasses} bg-[#E6F6F4]`}>Product</span>
                      <span className={`text-[14px] font-medium uppercase tracking-widest ${textSub}`}>3 MIN READ</span>
                    </div>
                    {/* TITLE */}
                    <h3 
                        className={`mb-2 ${underlineAnim} text-[#0e0e0e] dark:text-[#e2e2e2]`}
                        style={postTitleStyle}
                    >
                      The psychology of color in 2026
                    </h3>
                    <p className={`text-sm md:text-[15px] line-clamp-2 ${textSub}`}>Strategies for maintaining consistency across large engineering teams.</p>
                 </div>
              </div>

              {/* Post 2 */}
              <div className="w-full lg:w-[630px] h-auto lg:h-[250px] flex flex-col md:flex-row gap-6 lg:gap-[24px] group cursor-pointer">
                 {/* TILT IMAGE 3 */}
                 <TiltImage 
                    src={IMAGES.sidePost2} 
                    alt="Side 2" 
                    containerClassName="w-full md:w-[250px] aspect-video md:aspect-square lg:h-[250px] shrink-0"
                    className="w-full h-full object-cover" 
                 />
                 <div className="flex flex-col justify-center h-auto lg:h-full w-full">
                    {/* Justify Between -> Pushes Text to Right */}
                    <div className="flex items-center justify-between mb-3 w-full">
                      <span className={`${baseLabelClasses} bg-[#FFF4E5]`}>Tech</span>
                      <span className={`text-[14px] font-medium uppercase tracking-widest ${textSub}`}>7 MIN READ</span>
                    </div>
                    {/* TITLE */}
                    <h3 
                        className={`mb-2 ${underlineAnim} text-[#0e0e0e] dark:text-[#e2e2e2]`}
                        style={postTitleStyle}
                    >
                      The psychology of color in 2026
                    </h3>
                    <p className={`text-sm md:text-[15px] line-clamp-2 ${textSub}`}>How server-side rendering is changing the landscape of frontend development.</p>
                 </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- GRID SECTION --- */}
        <section className="w-full max-w-[1290px] h-auto lg:h-[1082px] flex flex-col gap-10 lg:gap-[64px] animate-in">
          
          <div className="w-full lg:w-[1290px] h-auto lg:h-[46px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 pb-4 md:pb-0">
             <div className="w-full flex flex-wrap md:flex-nowrap items-center gap-0 overflow-x-auto no-scrollbar">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`
                        w-full md:w-[258px] h-[46px] 
                        px-[16px] py-[8px] 
                        flex shrink-0 items-center justify-center 
                        bg-transparent whitespace-nowrap transition-all duration-300
                        ${textMain}
                        border
                        ${isActive 
                          ? 'border-[#0E0E0E] dark:border-[#e2e2e2] opacity-100 z-10' 
                          : 'border-transparent opacity-70 hover:opacity-100'
                        }
                      `}
                      style={categoryTypography}
                    >
                      {cat}
                    </button>
                  );
                })}
             </div>
          </div>

          <div className="w-full lg:w-[1290px] flex flex-wrap gap-10 lg:gap-[30px]">
            {[IMAGES.gridPost1, IMAGES.gridPost2, IMAGES.gridPost3, IMAGES.gridPost4].map((imgSrc, idx) => (
              <div 
                key={idx} 
                className="w-full lg:w-[630px] h-auto lg:h-[456px] group cursor-pointer flex flex-col"
              >
                 {/* TILT IMAGE GRID */}
                 <TiltImage 
                    src={imgSrc} 
                    alt="Grid Post" 
                    containerClassName="w-full h-[240px] md:h-[320px] mb-6 lg:mb-[24px]"
                    className="w-full h-full object-cover" 
                 />
                 
                 <div className="flex justify-between items-center mb-3">
                    <span className={`${baseLabelClasses} ${idx % 2 === 0 ? 'bg-blue-100' : 'bg-[#FDE2E4]'}`}>
                      {idx % 2 === 0 ? 'Tech' : 'Design'}
                    </span>
                    <span className={`text-[14px] font-medium uppercase tracking-widest ${textSub}`}>4 MIN READ</span>
                 </div>
                 
                 {/* TITLE */}
                 <h3 
                    className={`${underlineAnim} text-[#0e0e0e] dark:text-[#e2e2e2]`}
                    style={postTitleStyle}
                 >
                    {idx % 2 === 0 ? 'Why minimalism is evolving fast' : 'The psychology of color in 2026'}
                 </h3>
                 <p className={`text-sm md:text-[16px] mt-2 ${textSub}`}>
                   Exploring the shift toward maximalism in modern interface design.
                 </p>
              </div>
            ))}
          </div>

        </section>

      </div>
    </div>
  );
};

export default BlogGridSection1;