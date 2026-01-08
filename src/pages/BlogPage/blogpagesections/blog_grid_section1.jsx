import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// --- CONFIGURATION: CHANGE YOUR IMAGE SOURCES HERE ---
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

const BlogGridSection1 = () => {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('View all');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-in", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Typography for Nav Buttons
  const categoryTypography = {
    fontFamily: FONT_INTER,
    fontWeight: 500,      
    fontSize: '20px',
    lineHeight: '150%',
    letterSpacing: '0%',
  };

  const categories = ['View all', 'Category one', 'Category two', 'Category three', 'Category four'];

  return (
    <div 
      ref={containerRef}
      className="bg-bg-light dark:bg-bg-dark min-h-screen w-full flex justify-center transition-colors duration-300" 
      style={{ fontFamily: FONT_INTER }}
    >
      {/* Main Container */}
      <div className="w-full max-w-[1440px] pt-24 pb-16 px-5 lg:pt-[200px] lg:pb-[120px] lg:px-[75px]">
        
        {/* --- TOP DIV (HERO TEXT) --- */}
        <header className="w-full max-w-[1290px] h-auto lg:h-[347px] mb-16 lg:mb-[64px] flex flex-col items-end gap-6 lg:gap-[14px] animate-in">
          {/* Main Heading */}
          <h1 
            className={`text-right w-full ${textMain}`}
            style={{ 
              fontSize: 'clamp(48px, 10vw, 128px)',           
              lineHeight: '120%',          
              letterSpacing: '-0.04em',    
              fontFamily: FONT_INTER,
              fontWeight: 500       
            }}
          >
            Crafting Tomorrow's <br />
            <span 
              className="italic font-normal block"
              style={{ 
                fontFamily: FONT_CASLON,   
                fontSize: 'clamp(40px, 8vw, 104px)',         
                lineHeight: '120%',        
                letterSpacing: '-0.04em'   
              }}
            >
              Solutions, Today.
            </span>
          </h1>
          
          {/* Subtext */}
          <div className="w-full flex justify-end">
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

        {/* --- 2ND DIV (FEATURED POSTS) --- */}
        <section className="w-full max-w-[1290px] h-auto lg:h-[624px] mb-16 lg:mb-[64px] animate-in flex flex-col gap-10 lg:gap-[40px]">
          
          {/* Section Title */}
          <div className="w-full lg:w-[1290px] h-auto lg:h-[34px] flex items-center mb-4 lg:mb-0">
            <h2 
              className={textMain}
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 700,
                fontSize: '24px',
                lineHeight: '140%',
                letterSpacing: '0%'
              }}
            >
              Featured blog posts
            </h2>
          </div>

          {/* Content Area */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-[30px] w-full h-auto lg:h-[550px]">
            
            {/* Left Box (Main Feature) */}
            <div className="w-full lg:w-[630px] h-auto lg:h-[550px] flex flex-col gap-6 lg:gap-[24px] group cursor-pointer">
              <div className="w-full aspect-video lg:aspect-auto lg:h-[400px] bg-[#E5E5E5] overflow-hidden ">
                 <img 
                  src={IMAGES.heroMain} 
                  alt="Feature" 
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
                />
              </div>
              
              {/* Text Content */}
              <div className="flex flex-col gap-2">
                 <div className="flex justify-between items-center mb-2">
                    <span className="bg-[#FDE2E4] text-[#0e0e0e] text-[14px] font-bold px-3 py-1  uppercase tracking-wider">Design</span>
                    <span className={`text-[14px] font-medium uppercase tracking-widest ${textSub}`}>5 MIN READ</span>
                 </div>
                 
                 <h3 className={`text-2xl md:text-[36px] font-semibold leading-tight ${textMain} ${underlineAnim}`}>
                   The psychology of color in 2026
                 </h3>
                 <p className={`text-sm md:text-[16px] ${textSub}`}>Discover how palette choices influence user trust and decision-making.</p>
              </div>
            </div>

            {/* Right Box (Side Posts) */}
            <div className="w-full lg:w-[630px] h-auto lg:h-[530px] flex flex-col gap-8 lg:gap-[30px]">
              
              {/* Post 1 */}
              <div className="w-full lg:w-[630px] h-auto lg:h-[250px] flex flex-col md:flex-row gap-6 lg:gap-[24px] group cursor-pointer">
                 <div className="w-full md:w-[250px] aspect-video md:aspect-square lg:h-[250px] bg-[#E5E5E5] overflow-hidden shrink-0 ">
                    <img 
                      src={IMAGES.sidePost1} 
                      alt="Side 1" 
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
                    />
                 </div>
                 <div className="flex flex-col justify-center h-auto lg:h-full">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="bg-[#E6F6F4] text-[#0e0e0e] text-[14px] font-bold px-3 py-1  uppercase tracking-wider">Product</span>
                      <span className={`text-[14px] font-medium uppercase tracking-widest ${textSub}`}>3 MIN READ</span>
                    </div>
                    <h3 className={`text-xl md:text-[24px] font-semibold leading-snug mb-2 ${textMain} ${underlineAnim}`}>
                      Building scalable design systems
                    </h3>
                    <p className={`text-sm md:text-[15px] line-clamp-2 ${textSub}`}>Strategies for maintaining consistency across large engineering teams.</p>
                 </div>
              </div>

              {/* Post 2 */}
              <div className="w-full lg:w-[630px] h-auto lg:h-[250px] flex flex-col md:flex-row gap-6 lg:gap-[24px] group cursor-pointer">
                 <div className="w-full md:w-[250px] aspect-video md:aspect-square lg:h-[250px] bg-[#E5E5E5] overflow-hidden shrink-0 ">
                    <img 
                      src={IMAGES.sidePost2} 
                      alt="Side 2" 
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
                    />
                 </div>
                 <div className="flex flex-col justify-center h-auto lg:h-full">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="bg-[#FFF4E5] text-[#0e0e0e] text-[14px] font-bold px-3 py-1  uppercase tracking-wider">Tech</span>
                      <span className={`text-[14px] font-medium uppercase tracking-widest ${textSub}`}>7 MIN READ</span>
                    </div>
                    <h3 className={`text-xl md:text-[24px] font-semibold leading-snug mb-2 ${textMain} ${underlineAnim}`}>
                      The future of React Server Components
                    </h3>
                    <p className={`text-sm md:text-[15px] line-clamp-2 ${textSub}`}>How server-side rendering is changing the landscape of frontend development.</p>
                 </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- 3RD DIV (GRID SECTION) --- */}
        <section className="w-full max-w-[1290px] h-auto lg:h-[1082px] flex flex-col gap-10 lg:gap-[64px] animate-in">
          
          {/* Category Nav - UPDATED */}
          {/* REMOVED: border-b border-gray-200 to remove white line */}
          <div className="w-full lg:w-[1290px] h-auto lg:h-[46px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 pb-4 md:pb-0">
             
             {/* Navigation Container (Gap 0 to fit flush) */}
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
                        /* Logic: Only show border if Active. Transparent otherwise. */
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

          {/* Grid Area */}
          <div className="w-full lg:w-[1290px] flex flex-wrap gap-10 lg:gap-[30px]">
            {[IMAGES.gridPost1, IMAGES.gridPost2, IMAGES.gridPost3, IMAGES.gridPost4].map((imgSrc, idx) => (
              <div 
                key={idx} 
                className="w-full lg:w-[630px] h-auto lg:h-[456px] group cursor-pointer flex flex-col"
              >
                 {/* Image */}
                 <div className="w-full h-[240px] md:h-[320px] bg-[#E5E5E5] overflow-hidden mb-6 lg:mb-[24px] ">
                    <img 
                      src={imgSrc} 
                      alt="Grid Post" 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                    />
                 </div>
                 
                 <div className="flex justify-between items-center mb-3">
                    <span className={`text-[14px] font-bold px-3 py-1  uppercase tracking-wider text-[#0e0e0e] ${idx % 2 === 0 ? 'bg-blue-100' : 'bg-[#FDE2E4]'}`}>
                      {idx % 2 === 0 ? 'Tech' : 'Design'}
                    </span>
                    <span className={`text-[14px] font-medium uppercase tracking-widest ${textSub}`}>4 MIN READ</span>
                 </div>
                 
                 <h3 className={`text-2xl md:text-[32px] font-semibold leading-tight ${textMain} ${underlineAnim}`}>
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