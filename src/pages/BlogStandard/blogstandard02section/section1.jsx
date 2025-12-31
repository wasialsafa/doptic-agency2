import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- CONFIGURATION ---
const IMAGES = {
  post1: "/images/blogpage/blogimage1.svg",
  post2: "/images/blogpage/blogimage2.svg",
};

const FONT_INTER = 'Inter Variable, sans-serif';
const FONT_CASLON = 'Libre Caslon Text, serif';

const POSTS = [
  { id: 1, category: "Design", title: "The psychology of color in 2026", desc: "Discover how palette choices influence user trust and decision-making.", img: IMAGES.post1 },
  { id: 2, category: "Tech", title: "Why minimalism is evolving fast", desc: "Exploring the shift toward maximalism in modern interface design.", img: IMAGES.post2 },
  { id: 3, category: "Strategy", title: "Building resilient design systems", desc: "How to scale your UI without losing consistency.", img: IMAGES.post1 },
  { id: 4, category: "Culture", title: "Remote work culture in 2027", desc: "The tools and mindsets shaping the future workforce.", img: IMAGES.post2 },
  { id: 5, category: "UX", title: "Micro-interactions that matter", desc: "Small details that create delightful user experiences.", img: IMAGES.post1 },
  { id: 6, category: "Dev", title: "React server components deep dive", desc: "Understanding the next evolution of frontend architecture.", img: IMAGES.post2 },
];

const BlogPage = () => {
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Animation
      gsap.from(".hero-animate", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out"
      });

      // 2. Marquee Animation
      const marqueeContent = marqueeRef.current;
      if (marqueeContent) {
        gsap.to(marqueeContent, {
          xPercent: -50,
          ease: "none",
          duration: 20,
          repeat: -1
        });
      }

      // 3. Scroll Trigger for Posts
      const posts = gsap.utils.toArray('.blog-post');
      posts.forEach((post) => {
        gsap.from(post, {
          scrollTrigger: {
            trigger: post,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // --- STYLES ---
  
  // FIXED: Added dark:text-white to the wrapper so all text defaults to white in dark mode
  const layoutWrapper = "max-w-[1440px] mx-auto px-5 md:px-[75px] pt-[80px] md:pt-[120px] pb-[120px]";
  const contentWidth = "max-w-[1290px] mx-auto";

  // FIXED: Updated button styles for Dark Mode
  // - Border: dark:border-white/20
  // - Hover: dark:hover:bg-white dark:hover:text-black
  const navButtonStyle = `
    w-full md:w-[258px] 
    h-[46px] 
    px-[16px] py-[8px] 
    flex items-center justify-center 
    border border-black/20 dark:border-white/20 
    rounded-[4px] 
    bg-transparent 
    text-[12px] font-bold uppercase tracking-widest 
    hover:bg-black hover:text-white 
    dark:hover:bg-white dark:hover:text-black
    transition-all
    whitespace-nowrap
  `;

  return (
    <div 
      ref={containerRef}
      // FIXED: text-[#1A1A1A] switches to dark:text-white
      className="bg-bg-light dark:bg-bg-dark min-h-screen text-[#1A1A1A] dark:text-white w-full overflow-hidden transition-colors duration-300" 
      style={{ fontFamily: FONT_INTER }}
    >
      
      {/* --- HERO HEADER --- */}
      <header className={`${layoutWrapper} pb-0 mb-10 md:mb-[64px]`}>
        <div className="flex flex-col items-start md:items-end hero-animate">
          <h1 
            className="font-medium text-left md:text-right w-full"
            style={{ fontFamily: FONT_INTER }}
          >
            <span className="block text-5xl md:text-7xl lg:text-[128px] leading-[1.1] tracking-tighter">
              Crafting Tomorrow's
            </span>
            <span 
              className="italic font-normal block text-4xl md:text-6xl lg:text-[104px] leading-[1.2] mt-2 md:mt-0"
              style={{ fontFamily: FONT_CASLON }}
            >
              Solutions, Today.
            </span>
          </h1>
          
          <div className="w-full flex justify-start md:justify-end mt-6 md:mt-8">
            <p className="font-normal text-base md:text-[18px] leading-[160%] text-left md:text-right max-w-[740px] opacity-70">
              We're a group of creative thinkers, developers, and designers dedicated to turning your vision into impactful digital reality.
            </p>
          </div>
        </div>
      </header>

      {/* --- NAVIGATION BAR --- */}
      <nav className={`${layoutWrapper} !pt-0 !pb-10 hero-animate`}>
        <div className={`${contentWidth} flex flex-wrap md:flex-nowrap justify-between items-center gap-[8px]`}>
          
          {/* Button 1: View All (Active State) */}
          {/* FIXED: Inverts colors in dark mode (White bg, Black text) */}
          <button className={`${navButtonStyle} bg-black text-gray dark:bg-white dark:text-black`}>
            View all
          </button>
          
          {/* Category Buttons */}
          {['Category one', 'Category two', 'Category three', 'Category four'].map((cat) => (
            <button key={cat} className={`${navButtonStyle} opacity-40 hover:opacity-100`}>
              {cat}
            </button>
          ))}
          
        </div>
      </nav>

      {/* --- AWARDS ANIMATION --- */}
      {/* FIXED: Added dark:bg-white dark:text-black so the strip inverts in dark mode */}
      <div className="w-full overflow-hidden bg-black text-white dark:bg-white dark:text-black py-4 mb-[64px] hero-animate opacity-0">
        <div ref={marqueeRef} className="flex whitespace-nowrap w-fit">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              <span className="text-sm font-bold uppercase tracking-widest">★ Awwwards SOTD</span>
              <span className="text-sm font-bold uppercase tracking-widest opacity-50">Site of the Day</span>
              <span className="text-sm font-bold uppercase tracking-widest">★ FWA Choice</span>
              <span className="text-sm font-bold uppercase tracking-widest opacity-50">Mobile Excellence</span>
              <span className="text-sm font-bold uppercase tracking-widest">★ CSS Design Awards</span>
              <span className="text-sm font-bold uppercase tracking-widest opacity-50">UI/UX Innovation</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- MAIN CONTENT FEED --- */}
      <main className={`${layoutWrapper} !pt-0`}>
        <div className={`${contentWidth} flex flex-col gap-12 md:gap-[64px]`}>
          
          {POSTS.map((post) => (
            <article key={post.id} className="blog-post group cursor-pointer w-full">
              {/* Image */}
              <div className="aspect-[43/25] md:aspect-[43/10] w-full overflow-hidden bg-[#E5E5E5] dark:bg-[#333] mb-4 md:mb-6 rounded-sm">
                <img 
                  src={post.img} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                />
              </div>

              {/* Meta */}
              <div className="flex justify-between items-center mb-2 md:mb-4">
                {/* FIXED: Tag background changes in dark mode */}
                <span className="bg-[#FDE2E4] dark:bg-[#4A2025] dark:text-[#FDE2E4] text-[10px] md:text-[12px] font-bold px-3 py-1 rounded-sm uppercase tracking-wide">
                  {post.category}
                </span>
                <span className="text-[10px] md:text-[12px] font-medium opacity-40 uppercase tracking-widest">
                  5 min read
                </span>
              </div>

              {/* Title & Desc */}
              <h2 className="text-[28px] md:text-[48px] font-medium tracking-tight mb-2 leading-[1.1]">
                {post.title}
              </h2>
              {/* FIXED: Subtext opacity relies on parent text color (which is now white in dark mode) */}
              <p className="text-[16px] md:text-[18px] opacity-60 max-w-2xl">
                {post.desc}
              </p>
            </article>
          ))}

        </div>
      </main>

    </div>
  );
};

export default BlogPage;