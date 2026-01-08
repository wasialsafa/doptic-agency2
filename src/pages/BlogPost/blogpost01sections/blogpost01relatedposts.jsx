import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// --- CONSTANTS ---
const FONT_INTER = 'Inter Variable, sans-serif';
const FONT_CASLON = 'Libre Caslon Text, serif';

const textMain = "text-[#0e0e0e] dark:text-[#e2e2e2]";
const textSub = "text-[#0E0E0EB2] dark:text-[#E2E2E2]/70";

// Hover Animation for Title
const underlineAnim = "relative w-fit after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-500 after:ease-out group-hover:after:scale-x-100";

const RelatedPosts = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const posts = [
    {
      id: 1,
      category: 'Design',
      readTime: '5 MIN READ',
      title: 'The psychology of color in 2026',
      description: 'Discover how palette choices influence user trust and decision-making.',
      image: '/images/blogpage/blogimage1.svg', 
      tagBg: 'bg-[#FDE2E4]', // Pinkish for Design
    },
    {
      id: 2,
      category: 'Tech',
      readTime: '5 MIN READ',
      title: 'Why minimalism is evolving fast',
      description: 'Exploring the shift toward maximalism in modern interface design',
      image: '/images/blogpage/blogimage2.svg',
      tagBg: 'bg-blue-100', // Blueish for Tech
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      // 1. Animate Header Elements
      tl.from(".anim-header", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });

      // 2. Animate Cards
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
      
      {/* Main Container: 1440px width, 75px side padding, 120px vert padding */}
      <div 
        ref={containerRef}
        className="w-full max-w-[1440px] px-[75px] py-[120px] mx-auto"
      >
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-[64px] w-full">
          <div className="max-w-3xl">
            {/* Title Typography */}
            <h2 className={`anim-header flex flex-wrap items-baseline gap-3 mb-4 ${textMain}`}>
              <span 
                className="font-medium text-5xl md:text-[72px] leading-[120%] tracking-[-0.04em]"
                style={{ fontFamily: FONT_INTER }}
              >
                Related
              </span>
              <span 
                className="italic font-normal text-5xl md:text-[72px] leading-[120%] tracking-[-0.04em]"
                style={{ fontFamily: FONT_CASLON }}
              >
                posts
              </span>
            </h2>
            
            {/* Subtitle */}
            <p 
              className={`anim-header text-lg md:text-[18px] max-w-lg ${textSub}`}
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
          <div className="anim-header mt-6 md:mt-0 md:pt-4">
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
              {/* Image Wrapper */}
              <div className="overflow-hidden mb-6 h-[320px] w-full bg-gray-200 dark:bg-[#333]">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Content Container */}
              <div className="flex flex-col flex-grow">
                {/* Meta Data */}
                <div className="flex justify-between items-center mb-3 text-sm font-medium">
                  {/* Tag */}
                  <span 
                    className={`${post.tagBg} text-[#0e0e0e] px-3 py-1 text-[10px] md:text-[12px] font-bold uppercase tracking-wider`}
                  >
                    {post.category}
                  </span>
                  {/* Read Time */}
                  <span className={`text-[10px] md:text-[12px] font-medium uppercase tracking-widest ${textSub}`}>
                    {post.readTime}
                  </span>
                </div>

                {/* Card Title */}
                <h3 
                  className={`text-2xl md:text-[32px] font-semibold leading-tight mb-2 ${textMain} ${underlineAnim}`}
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