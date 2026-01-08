import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Linkedin, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PortfolioPage = () => {
  const containerRef = useRef(null);

  // Helper to split text for typewriter effect (Header only)
  const splitText = (text) => text.split("").map((char, index) => (
    <span key={index} className="typewriter-char inline-block min-w-[0.3em] whitespace-pre">
      {char}
    </span>
  ));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. HEADER: Typewriter Effect
      tl.from(".typewriter-char", {
        opacity: 0,
        y: 10,
        display: "none", 
        stagger: 0.04,
        duration: 0.1,
        ease: "none",
      });

      // 2. HEADER: Subtext Fade In
      tl.from(".header-subtext", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.2");

      // 3. LEFT COLUMN: Initial Load Animation (Image & Boxes)
      // These animate in automatically after the header
      gsap.from(".animate-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 1.2, 
        ease: "power3.out"
      });

      // 4. RIGHT COLUMN & SCROLL TEXTS: Reveal on Scroll
      // Any element with 'reveal-block' will animate when scrolled into view
      const revealElements = containerRef.current.querySelectorAll('.reveal-block');
      
      revealElements.forEach((el) => {
        gsap.fromTo(el, 
          { y: 30, opacity: 0 },
          {
            y: 0, 
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%", // Starts animation when element is near bottom of screen
            }
          }
        );
      });

      // 5. LIST ITEMS: Staggered Reveal
      // Specifically for the Responsibilities list
      const listItems = containerRef.current.querySelectorAll('.reveal-list li');
      if (listItems.length > 0) {
        gsap.fromTo(listItems,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".reveal-list",
              start: "top 85%",
            }
          }
        );
      }

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  // Typography Constants
  const titleStyle = {
    fontFamily: "'Inter Variable', sans-serif",
    fontWeight: 500,
    fontSize: '32px',
    lineHeight: '120%',
    letterSpacing: '-0.04em'
  };

  const bodyStyle = {
    fontFamily: "'Inter Variable', sans-serif",
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '160%',
    letterSpacing: '0%'
  };

  // Color classes
  const textColorMain = "text-[#0e0e0e] dark:text-[#e2e2e2]";
  const textColorSub = "text-[#0E0E0EB2] dark:text-[#E2E2E2]/70";
  const borderInput = "border border-[#0E0E0E1A] dark:border-[#E2E2E21A]";
  const bgInput = "bg-[#E2E2E2] dark:bg-[#0e0e0e]";

  return (
    <div 
      ref={containerRef} 
      className="bg-bg-light dark:bg-bg-dark min-h-screen w-full flex justify-center transition-colors duration-300"
      style={{ fontFamily: "'Inter Variable', sans-serif" }}
    >
      {/* Main Container */}
      <div className="w-full max-w-[1440px] px-5 md:px-10 lg:px-[75px] py-24 lg:py-[200px]">
        
        {/* Header Section */}
        <header className="mb-10 lg:mb-[64px] max-w-[1290px]">
          <h1 className="flex flex-wrap items-baseline gap-x-3 md:gap-x-6 mb-[12px] leading-[110%] md:leading-[120%] tracking-[-0.04em]">
            <span 
              className={textColorMain}
              style={{
                fontFamily: "'Inter Variable', sans-serif",
                fontWeight: 500,
                fontSize: 'clamp(48px, 10vw, 128px)', 
                lineHeight: '120%',
                letterSpacing: '-0.04em'
              }}
            >
              {splitText("Meet our")}
            </span>
            <span 
              className={textColorMain}
              style={{
                fontFamily: "'Libre Caslon Text', serif",
                fontWeight: 400,
                fontStyle: 'italic',
                fontSize: 'clamp(40px, 8vw, 104px)',
                lineHeight: '120%',
                letterSpacing: '-0.04em'
              }}
            >
              {splitText("Design Lead")}
            </span>
          </h1>
          
          <p 
            className={`header-subtext ${textColorSub} max-w-2xl`}
            style={bodyStyle}
          >
            We're a group of creative thinkers, developers, and designers dedicated to turning your vision into impact.
          </p>
        </header>

        {/* Main Grid */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[64px] w-full max-w-[1290px]">
          
          {/* --- LEFT COLUMN (Initial Animation) --- */}
          <div className="w-full lg:w-[613px] flex flex-col shrink-0">
            
            {/* Image */}
            <div className="animate-item w-full h-[400px] md:h-[640px] bg-gray-200 overflow-hidden mb-10 lg:mb-[64px]">
              <img 
                src="/images/teamspage/design lead.svg" 
                alt="Liam Carter" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            
            {/* Follow Section */}
            <div 
              className="animate-item mb-10 lg:mb-[64px] flex flex-col justify-center"
              style={{
                width: '100%', 
                maxWidth: '613px',
                minHeight: '76px', 
                gap: '14px'
              }}
            >
              <h3 className={textColorMain} style={titleStyle}>
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

            {/* Portfolio Section */}
            <div 
              className="animate-item flex flex-col justify-center mb-10 lg:mb-0"
              style={{
                width: '100%',
                maxWidth: '613px',
                minHeight: '76px',
                gap: '14px'
              }}
            >
              <h3 className={textColorMain} style={titleStyle}>
                Portfolio
              </h3>
              <div className="flex flex-wrap gap-3 md:gap-4 items-center h-full">
                {['Dribbble', 'Behance', 'Artstation'].map(site => (
                  <button 
                    key={site} 
                    className={`px-4 py-1.5 ${borderInput} ${textColorMain} font-medium text-sm hover:border-black dark:hover:border-white transition-colors`}
                    style={{ fontFamily: "'Inter Variable', sans-serif" }}
                  >
                    {site}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN (Scroll Reveal Animation) --- */}
          <div className="w-full lg:w-[613px] flex flex-col shrink-0 space-y-8 lg:space-y-[40px]">
            
            {/* Name & Bio */}
            <section>
              <h2 className={`reveal-block ${textColorMain} text-4xl md:text-5xl font-medium mb-2`} style={{ fontFamily: "'Inter Variable', sans-serif" }}>Liam Carter</h2>
              <p className={`reveal-block ${textColorSub} text-lg mb-6 md:mb-8`} style={{ fontFamily: "'Inter Variable', sans-serif" }}>Lead Product Designer</p>
              
              <div className={`space-y-6 ${textColorSub}`} style={bodyStyle}>
                <p className="reveal-block">
                  Liam believes that great design is invisible. With a background in cognitive psychology and visual arts, 
                  he approaches every project with a user-first mentality. He doesn't just make things look good; 
                  he ensures they work seamlessly, reducing friction between the user and their goals.
                </p>
                <p className="reveal-block">
                  Before joining Doptic, Liam led design sprints for Series B startups in San Francisco and New York. 
                  He specializes in complex SaaS interfaces and scalable design systems.
                </p>
              </div>
            </section>

            {/* Skill & Experience */}
            <div className="flex flex-col gap-8 md:gap-10">
              <section className="reveal-block">
                <h3 className={`${textColorMain} mb-4`} style={titleStyle}>Skill</h3>
                <p className={`${textColorSub}`} style={bodyStyle}>
                  User Interface (UI), User Experience (UX), Design Systems, Webflow Development.
                </p>
              </section>

              <section className="reveal-block">
                <h3 className={`${textColorMain} mb-4`} style={titleStyle}>Professional Experience</h3>
                <p className={`${textColorSub}`} style={bodyStyle}>
                  Over 8 years of experience defining product strategies for high-growth tech companies.
                </p>
              </section>
            </div>

            {/* Responsibilities Section */}
            <section>
              <h3 className={`reveal-block ${textColorMain} mb-6`} style={titleStyle}>Responsibilities</h3>
              <ul className="reveal-list space-y-3">
                {['Leading high-level design strategy', 'Overseeing user research and testing', 'Mentoring the junior design team'].map((item, i) => (
                  <li key={i} className={`flex items-center gap-3 ${textColorSub}`} style={bodyStyle}>
                    <span className={`w-1.5 h-1.5 bg-black dark:bg-white rounded-full`}></span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Contact Form */}
            <section className={`reveal-block pt-8 mt-4 md:mt-8 border-t border-gray-200 dark:border-gray-800`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  className={`${bgInput} ${borderInput} p-4 w-full outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all text-sm md:text-base ${textColorMain} placeholder:text-gray-500`}
                  style={{ fontFamily: "'Inter Variable', sans-serif" }}
                />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className={`${bgInput} ${borderInput} p-4 w-full outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all text-sm md:text-base ${textColorMain} placeholder:text-gray-500`}
                  style={{ fontFamily: "'Inter Variable', sans-serif" }}
                />
              </div>
              <textarea 
                placeholder="Enter your message" 
                rows="6" 
                className={`w-full ${bgInput} ${borderInput} p-4 mb-6 outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all resize-none text-sm md:text-base ${textColorMain} placeholder:text-gray-500`}
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