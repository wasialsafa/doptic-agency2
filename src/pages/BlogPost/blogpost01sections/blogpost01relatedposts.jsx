import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- CONFIGURATION ---
const FONT_INTER = 'Inter Variable, sans-serif';
const FONT_CASLON = 'Libre Caslon Text, serif';

const textMain = "text-[#0e0e0e] dark:text-[#e2e2e2]";
const textSub = "text-[#0E0E0EB2] dark:text-[#E2E2E2]/70";

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

const RelatedPosts = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  const posts = [
    {
      id: 1,
      category: 'Design',
      readTime: '5 MIN READ',
      title: 'The psychology of color in 2026',
      description: 'Discover how palette choices influence user trust and decision-making.',
      image: '/images/blogpage/blogimage1.svg', 
      tagBg: 'bg-[#FDE2E4]', 
    },
    {
      id: 2,
      category: 'Tech',
      readTime: '5 MIN READ',
      title: 'Why minimalism is evolving fast',
      description: 'Exploring the shift toward maximalism in modern interface design',
      image: '/images/blogpage/blogimage2.svg',
      tagBg: 'bg-blue-100', 
    }
  ];

  // Specific Typography for Post Titles
  const postTitleStyle = {
    fontFamily: "'Inter Variable', sans-serif",
    fontWeight: 500,
    fontSize: '40px',
    lineHeight: '120%',
    letterSpacing: '-0.04em',
  };

  // Circular Label Style
  const circularLabelStyle = "flex items-center justify-center h-[25px] px-[12px] border border-[#0e0e0e1a] dark:border-white/20 rounded-[99px] text-[12px] font-bold uppercase tracking-wider text-[#0e0e0e]";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      // 1. Typewriter Animation for Header
      const chars = headerRef.current.querySelectorAll('.char');
      tl.to(chars, {
        opacity: 1,
        duration: 0.05,
        stagger: 0.03,
        ease: "none",
      });

      // 2. Animate Subtext & Button (Fade Up)
      tl.from(".anim-fade-up", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.5");

      // 3. Animate Cards
      tl.from(cardsRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.4");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      className="min-h-screen bg-bg-light dark:bg-bg-dark flex justify-center w-full transition-colors duration-300"
      style={{ fontFamily: FONT_INTER }}
    >
      
      {/* Main Container */}
      <div 
        ref={containerRef}
        className="w-full max-w-[1440px] px-[75px] py-[120px] mx-auto"
      >
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-[64px] w-full">
          <div className="max-w-3xl">
            {/* Title Typography (Typewriter) */}
            <h2 ref={headerRef} className={`flex flex-wrap items-baseline gap-3 mb-4 ${textMain}`}>
              <SplitText 
                className="font-medium text-5xl md:text-[72px] leading-[120%] tracking-[-0.04em]"
                style={{ fontFamily: FONT_INTER }}
              >
                Related
              </SplitText>
              <SplitText 
                className="italic font-normal text-5xl md:text-[72px] leading-[120%] tracking-[-0.04em]"
                style={{ fontFamily: FONT_CASLON }}
              >
                posts
              </SplitText>
            </h2>
            
            {/* Subtitle */}
            <p 
              className={`anim-fade-up text-lg md:text-[18px] max-w-lg ${textSub}`}
              style={{
                fontFamily: FONT_INTER,
                fontWeight: 400,
                lineHeight: '160%',
              }}
            >
              We share what we learn. Read our latest thoughts on the future of digital design.
            </p>
          </div>

          {/* View All Button */}
          <div className="anim-fade-up mt-6 md:mt-0 md:pt-4">
            <button 
              className={`
                px-8 py-3 
                border border-[#0E0E0E1A] dark:border-[#e2e2e21A] 
                ${textMain} 
                hover:border-[#0E0E0E] dark:hover:border-[#e2e2e2] 
                transition-colors duration-300
                font-medium
              `}
              style={{ fontSize: '20px' }}
            >
              View All
            </button>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
          {posts.map((post, index) => (
            <div 
              key={post.id} 
              ref={el => cardsRef.current[index] = el}
              className="group cursor-pointer flex flex-col h-full"
            >
              {/* Image Wrapper with 3D TILT */}
              <TiltImage 
                src={post.image} 
                alt={post.title} 
                containerClassName="mb-6 h-[320px] w-full"
                className="w-full h-full object-cover" 
              />

              {/* Content Container */}
              <div className="flex flex-col flex-grow">
                {/* Meta Data with Circular Labels */}
                <div className="flex justify-between items-center mb-3 text-sm font-medium">
                  <span 
                    className={`${circularLabelStyle} ${post.tagBg}`}
                  >
                    {post.category}
                  </span>
                  <span className={`text-[14px] font-medium uppercase tracking-widest ${textSub}`}>
                    {post.readTime}
                  </span>
                </div>

                {/* Card Title (Updated Typography) */}
                <h3 
                  className={`mb-2 ${textMain} ${underlineAnim}`}
                  style={postTitleStyle}
                >
                  {post.title}
                </h3>

                {/* Card Description */}
                <p className={`text-sm md:text-[16px] leading-relaxed ${textSub}`}>
                  {post.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default RelatedPosts;