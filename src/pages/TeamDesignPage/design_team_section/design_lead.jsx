import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Instagram, Linkedin, Youtube } from 'lucide-react';

const PortfolioPage = () => {
  const containerRef = useRef(null);

  // Helper to split text for typewriter effect
  const splitText = (text) => text.split("").map((char, index) => (
    <span key={index} className="typewriter-char inline-block min-w-[0.3em] whitespace-pre">
      {char}
    </span>
  ));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Typewriter Effect for Header
      tl.from(".typewriter-char", {
        opacity: 0,
        y: 10,
        display: "none", 
        stagger: 0.04,
        duration: 0.1,
        ease: "none",
      });

      // 2. Subtext Fade In
      tl.from(".header-subtext", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.2");

      // 3. Columns Content Animation
      gsap.from(".animate-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 1.2, 
        ease: "power3.out"
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="bg-bg-light dark:bg-bg-dark min-h-screen text-[#1A1A1A] dark:text-white w-full flex justify-center"
      style={{ fontFamily: "'Inter Variable', sans-serif" }}
    >
      {/* Main Container 
          Responsive Padding: px-5 on mobile -> px-[75px] on desktop
      */}
      <div className="w-full max-w-[1440px] px-5 md:px-10 lg:px-[75px] py-24 lg:py-[200px]">
        
        {/* Header Section */}
        <header className="mb-10 lg:mb-[64px] max-w-[1290px]">
          <h1 className="flex flex-wrap items-baseline gap-x-3 md:gap-x-6 mb-[12px] leading-[110%] md:leading-[120%] tracking-[-0.04em]">
            <span 
              className="text-black dark:text-white"
              style={{
                fontFamily: "'Inter Variable', sans-serif",
                fontWeight: 500,
                // Clamp font size: Minimum 48px, Preferred 10vw, Maximum 128px
                fontSize: 'clamp(48px, 10vw, 128px)', 
                lineHeight: '120%',
                letterSpacing: '-0.04em'
              }}
            >
              {splitText("Meet our")}
            </span>
            <span 
              className="text-black dark:text-white"
              style={{
                fontFamily: "'Libre Caslon Text', serif",
                fontWeight: 400,
                fontStyle: 'italic',
                // Clamp font size: Minimum 40px, Preferred 8vw, Maximum 104px
                fontSize: 'clamp(40px, 8vw, 104px)',
                lineHeight: '120%',
                letterSpacing: '-0.04em'
              }}
            >
              {splitText("Design Lead")}
            </span>
          </h1>
          
          <p 
            className="header-subtext text-[#1A1A1A] dark:text-gray-300 max-w-2xl text-base md:text-[18px]"
            style={{
              fontFamily: "'Inter Variable', sans-serif",
              fontWeight: 400,
              lineHeight: '160%',
              letterSpacing: '0%'
            }}
          >
            We're a group of creative thinkers, developers, and designers dedicated to turning your vision into impact.
          </p>
        </header>

        {/* Main Grid: Left & Right Columns 
            Responsive Layout: flex-col on mobile -> flex-row on large screens
        */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[64px] w-full max-w-[1290px]">
          
          {/* --- LEFT COLUMN --- */}
          <div className="w-full lg:w-[613px] flex flex-col shrink-0">
            
            {/* Image 
                Responsive Height: 400px on mobile -> 640px on desktop
            */}
            <div className="animate-item w-full h-[400px] md:h-[640px] bg-gray-200 overflow-hidden mb-10 lg:mb-[64px]">
              <img 
                src="/images/teamspage/design lead.svg" 
                alt="Liam Carter" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            
            {/* Follow Section (Fixed Size Desktop / Fluid Mobile) */}
            <div 
              className="animate-item mb-10 lg:mb-[64px] flex flex-col justify-center"
              style={{
                // Responsive width logic using max-width
                width: '100%', 
                maxWidth: '613px',
                // Allow height to auto-adjust on very small screens, fixed on desktop
                minHeight: '76px', 
                gap: '14px'
              }}
            >
              <h3 className="text-2xl md:text-[32px] font-medium leading-none" style={{ fontFamily: "'Inter Variable', sans-serif" }}>
                Follow
              </h3>
              <div className="flex gap-4 items-center">
                <a href="#" className="flex items-center justify-center w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-[#FF4D29] dark:hover:bg-[#FF4D29] hover:text-white transition-colors duration-300">
                  <Instagram size={18} />
                </a>
                <a href="#" className="flex items-center justify-center w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-[#FF4D29] dark:hover:bg-[#FF4D29] hover:text-white transition-colors duration-300">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="flex items-center justify-center w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-[#FF4D29] dark:hover:bg-[#FF4D29] hover:text-white transition-colors duration-300">
                  <Youtube size={18} />
                </a>
              </div>
            </div>

            {/* Portfolio Section (Fixed Size Desktop / Fluid Mobile) */}
            <div 
              className="animate-item flex flex-col justify-center mb-10 lg:mb-0"
              style={{
                width: '100%',
                maxWidth: '613px',
                minHeight: '76px',
                gap: '14px'
              }}
            >
              <h3 className="text-2xl md:text-[32px] font-medium leading-none" style={{ fontFamily: "'Inter Variable', sans-serif" }}>
                Portfolio
              </h3>
              <div className="flex flex-wrap gap-3 md:gap-4 items-center h-full">
                {['Dribbble', 'Behance', 'Artstation'].map(site => (
                  <button 
                    key={site} 
                    className="px-4 py-1.5 border border-gray-300 dark:border-gray-700 font-medium text-sm hover:border-black dark:hover:border-white transition-colors"
                    style={{ fontFamily: "'Inter Variable', sans-serif" }}
                  >
                    {site}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="w-full lg:w-[613px] flex flex-col shrink-0 space-y-8 lg:space-y-[40px]">
            
            {/* Name & Bio */}
            <section className="animate-item">
              <h2 className="text-4xl md:text-5xl font-medium mb-2" style={{ fontFamily: "'Inter Variable', sans-serif" }}>Liam Carter</h2>
              <p className="text-gray-500 text-lg mb-6 md:mb-8" style={{ fontFamily: "'Inter Variable', sans-serif" }}>Lead Product Designer</p>
              
              <div className="space-y-6 text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300" style={{ fontFamily: "'Inter Variable', sans-serif" }}>
                <p>
                  Liam believes that great design is invisible. With a background in cognitive psychology and visual arts, 
                  he approaches every project with a user-first mentality. He doesn't just make things look good; 
                  he ensures they work seamlessly, reducing friction between the user and their goals.
                </p>
                <p>
                  Before joining Doptic, Liam led design sprints for Series B startups in San Francisco and New York. 
                  He specializes in complex SaaS interfaces and scalable design systems.
                </p>
              </div>
            </section>

            {/* Skill & Experience */}
            <div className="animate-item flex flex-col gap-8 md:gap-10">
              <section>
                <h3 className="text-xl md:text-2xl font-medium mb-4" style={{ fontFamily: "'Inter Variable', sans-serif" }}>Skill</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg text-sm md:text-base" style={{ fontFamily: "'Inter Variable', sans-serif" }}>
                  User Interface (UI), User Experience (UX), Design Systems, Webflow Development.
                </p>
              </section>

              <section>
                <h3 className="text-xl md:text-2xl font-medium mb-4" style={{ fontFamily: "'Inter Variable', sans-serif" }}>Professional Experience</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg text-sm md:text-base" style={{ fontFamily: "'Inter Variable', sans-serif" }}>
                  Over 8 years of experience defining product strategies for high-growth tech companies.
                </p>
              </section>
            </div>

            {/* Responsibilities Section */}
            <section className="animate-item">
              <h3 className="text-xl md:text-2xl font-medium mb-6" style={{ fontFamily: "'Inter Variable', sans-serif" }}>Responsibilities</h3>
              <ul className="space-y-3 text-sm md:text-base">
                {['Leading high-level design strategy', 'Overseeing user research and testing', 'Mentoring the junior design team'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-400" style={{ fontFamily: "'Inter Variable', sans-serif" }}>
                    <span className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Contact Form */}
            <section className="animate-item pt-8 mt-4 md:mt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  className="bg-gray-100 dark:bg-zinc-800 border-none p-4 w-full outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all text-sm md:text-base" 
                  style={{ fontFamily: "'Inter Variable', sans-serif" }}
                />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-gray-100 dark:bg-zinc-800 border-none p-4 w-full outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all text-sm md:text-base" 
                  style={{ fontFamily: "'Inter Variable', sans-serif" }}
                />
              </div>
              <textarea 
                placeholder="Enter your message" 
                rows="6" 
                className="w-full bg-gray-100 dark:bg-zinc-800 border-none p-4 mb-6 outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all resize-none text-sm md:text-base"
                style={{ fontFamily: "'Inter Variable', sans-serif" }}
              ></textarea>
              <button 
                className="bg-[#FF4D29] text-white px-10 py-4 font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all duration-300 w-full md:w-auto"
                style={{ fontFamily: "'Inter Variable', sans-serif" }}
              >
                Let's Contact
              </button>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;