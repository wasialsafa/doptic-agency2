"use client"

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const topRowData = [
  { 
    id: 1, 
    name: "Bessie Cooper", 
    role: "UI/UX Designer", 
    image: "/images/aboutpage/teamimage1.svg" 
  },
  { 
    id: 2, 
    name: "Arlene McCoy", 
    role: "Frontend Developer", 
    image: "/images/aboutpage/teamimage2.svg" 
  },
  { 
    id: 3, 
    name: "Devon Lane", 
    role: "Project Manager", 
    image: "/images/aboutpage/teamimage3.svg" 
  },
  { 
    id: 4, 
    name: "Courtney Henry", 
    role: "Strategist", 
    image: "/images/aboutpage/teamimage4.svg" 
  },
];

const bottomRowData = [
  { 
    id: 5, 
    name: "Tom Cook", 
    role: "Backend Developer", 
    image: "/images/aboutpage/teamimage4.svg" 
  },
  { 
    id: 6, 
    name: "Whitney Hellings", 
    role: "Product Designer", 
    image: "/images/aboutpage/teamimage3.svg" 
  },
  { 
    id: 7, 
    name: "Jane Cooper", 
    role: "Marketing", 
    image: "/images/aboutpage/teamimage2.svg" 
  },
  { 
    id: 8, 
    name: "Robert Fox", 
    role: "Director", 
    image: "/images/aboutpage/teamimage1.svg" 
  },
];

export default function TeamSection() {
  const containerRef = useRef(null);
  const [activeTopIndex, setActiveTopIndex] = useState(0); 
  const [activeBottomIndex, setActiveBottomIndex] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- NEW HANDWRITING ANIMATION FOR HEADER ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".header-content",
          start: "top 90%",
        },
        defaults: { ease: "power2.out" }
      });

      // 1. Initial State: Hidden via clip-path
      tl.set([".tw-title-1", ".tw-title-2", ".tw-desc"], {
        clipPath: "polygon(0 0, 0% 0, 0% 100%, 0 100%)", // Masked to left
        y: 20,
        opacity: 0
      });

      // 2. Animate "Our talented"
      tl.to(".tw-title-1", {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", // Wipe reveal
        y: 0,
        opacity: 1,
        duration: 0.8,
      });

      // 3. Animate "team" (Italic)
      tl.to(".tw-title-2", {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        y: 0,
        opacity: 1,
        duration: 0.8,
      }, "-=0.4"); // Overlap

      // 4. Animate Subtext
      tl.to(".tw-desc", {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        y: 0,
        opacity: 1,
        duration: 0.8,
      }, "-=0.4");

      // --- EXISTING ANIMATIONS ---

      // Rows entrance
      gsap.fromTo(".team-row", 
        { y: 100, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".team-grid-container",
            start: "top 85%",
          }
        }
      );
      
      // Footer/Button entrance
      gsap.fromTo(".footer-content", 
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".footer-content",
            start: "top bottom-=50", 
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full bg-bg-light dark:bg-bg-dark min-h-screen transition-colors duration-300 flex justify-center overflow-hidden font-['Inter_Variable']"
    >
      <div className="w-full max-w-[1440px] px-[75px] py-[200px] flex flex-col items-start">
        
        {/* Header Section - Removed opacity-0 invisible class, let GSAP handle children */}
        <header className="header-content w-full max-w-[1290px] mb-[64px]">
          <h1 className="text-black dark:text-white mb-[24px] flex items-baseline flex-wrap gap-4">
            {/* Added class 'tw-title-1' */}
            <span 
              className="tw-title-1 font-medium"
              style={{
                fontFamily: "'Inter Variable', sans-serif",
                fontWeight: 500,
                fontSize: '128px',
                lineHeight: '120%',
                letterSpacing: '-0.04em',
                display: 'inline-block' // Needed for transform
              }}
            >
              Our talented
            </span>
            
            {/* Added class 'tw-title-2' */}
            <span 
              className="tw-title-2"
              style={{
                fontFamily: "'Libre Caslon Text', serif",
                fontWeight: 400,
                fontStyle: 'italic',
                fontSize: '104px',
                lineHeight: '120%',
                letterSpacing: '-0.04em',
                display: 'inline-block' // Needed for transform
              }}
            >
              team
            </span>
          </h1>

          {/* Added class 'tw-desc' */}
          <p 
            className="tw-desc whitespace-nowrap dark:text-white/70"
            style={{
                fontFamily: "'Inter Variable', sans-serif",
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '18px',
                lineHeight: '160%',
                letterSpacing: '0%',
                color: 'rgba(14, 14, 14, 0.7)'
            }}
          >
            A multidisciplinary team of strategists, designers, and developers obsessed with quality.
          </p>
        </header>

        {/* Team Grid Container */}
        <div className="team-grid-container flex flex-col gap-[30px] mb-[64px] w-full max-w-[1290px]">
          
          {/* Top Row */}
          <div className="team-row flex flex-col md:flex-row gap-[30px] w-full h-[520px] opacity-0 invisible">
            {topRowData.map((member, index) => {
              const isActive = activeTopIndex === index;
              return (
                <div 
                  key={member.id}
                  onMouseEnter={() => setActiveTopIndex(index)}
                  className="relative group overflow-hidden cursor-pointer h-[520px] transition-[width] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  style={{
                    width: isActive ? '520px' : '226.66px',
                    flex: 'none' 
                  }}
                >
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className={`absolute inset-0 w-full h-full object-cover opacity-100 transition-transform duration-1000 
                    ${isActive ? 'scale-105' : 'scale-100'}`}
                  />
                  
                  {/* Banner */}
                  <div 
                    className="absolute left-0 w-full bg-[#FF4D2A] text-white flex flex-col justify-center transition-all duration-500 ease-in-out z-10"
                    style={{ 
                      bottom: '30px', 
                      height: '89px',
                      padding: '30px 40px',
                      gap: '0',
                      transform: isActive ? 'translateY(0)' : 'translateY(150%)',
                      opacity: isActive ? 1 : 0,
                      pointerEvents: 'none'
                    }}
                  >
                     <div className="w-full flex flex-row justify-between items-center h-[29px]">
                        <p style={{
                          fontFamily: 'Inter Variable, sans-serif',
                          fontWeight: 500,
                          fontStyle: 'normal',
                          fontSize: '24px',
                          lineHeight: '120%',
                          letterSpacing: '-0.04em',
                          textAlign: 'left'
                        }}>
                          {member.name}
                        </p>
                        <p style={{
                          fontFamily: 'Inter Variable, sans-serif',
                          fontWeight: 400,
                          fontStyle: 'normal',
                          fontSize: '18px',
                          lineHeight: '160%',
                          letterSpacing: '0%',
                          textAlign: 'right'
                        }}>
                          {member.role}
                        </p>
                     </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Row */}
          <div className="team-row flex flex-col md:flex-row gap-[30px] w-full h-[520px] opacity-0 invisible">
            {bottomRowData.map((member, index) => {
              const isActive = activeBottomIndex === index;
              const isAnyActive = activeBottomIndex !== null;
              
              let widthValue = '300px'; 
              if (isAnyActive) {
                widthValue = isActive ? '520px' : '226.66px';
              }

              return (
                <div 
                  key={member.id}
                  onMouseEnter={() => setActiveBottomIndex(index)}
                  onMouseLeave={() => setActiveBottomIndex(null)}
                  className="relative group overflow-hidden cursor-pointer h-[520px] transition-[width] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  style={{
                    width: widthValue,
                    flex: 'none'
                  }}
                >
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className={`absolute inset-0 w-full h-full object-cover opacity-100 transition-transform duration-1000 
                    ${isActive ? 'scale-105' : 'scale-100'}`}
                  />
                  
                  {/* Banner */}
                  <div 
                    className="absolute left-0 w-full bg-[#FF4D2A] text-white flex flex-col justify-center transition-all duration-500 ease-in-out z-10"
                    style={{ 
                      bottom: '30px', 
                      height: '89px',
                      padding: '30px 40px',
                      gap: '0',
                      transform: isActive ? 'translateY(0)' : 'translateY(150%)',
                      opacity: isActive ? 1 : 0,
                      pointerEvents: 'none'
                    }}
                  >
                     <div className="w-full flex flex-row justify-between items-center h-[29px]">
                        <p style={{
                          fontFamily: 'Inter Variable, sans-serif',
                          fontWeight: 500,
                          fontStyle: 'normal',
                          fontSize: '24px',
                          lineHeight: '120%',
                          letterSpacing: '-0.04em',
                          textAlign: 'left'
                        }}>
                          {member.name}
                        </p>
                        <p style={{
                          fontFamily: 'Inter Variable, sans-serif',
                          fontWeight: 400,
                          fontStyle: 'normal',
                          fontSize: '18px',
                          lineHeight: '160%',
                          letterSpacing: '0%',
                          textAlign: 'right'
                        }}>
                          {member.role}
                        </p>
                     </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer CTA Section */}
        <div className="footer-content max-w-xl w-full opacity-0 invisible">
          <h2 className="text-black dark:text-white mb-[24px]">
            <span 
              style={{
                fontFamily: "'Inter Variable', sans-serif",
                fontWeight: 500,
                fontSize: '72px',
                lineHeight: '120%',
                letterSpacing: '-0.04em',
                display: 'block' 
              }}
            >
              Can't find the right
            </span>
            
            <span 
              style={{
                fontFamily: "'Libre Caslon Text', serif",
                fontWeight: 400,
                fontStyle: 'italic',
                fontSize: '72px', 
                lineHeight: '120%',
                letterSpacing: '-0.04em'
              }}
            >
              position?
            </span>
          </h2>

          <p 
            className="mb-[40px] dark:text-white/70"
            style={{
              fontFamily: "'Inter Variable', sans-serif",
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '18px',
              lineHeight: '160%',
              letterSpacing: '0%',
              color: 'rgba(14, 14, 14, 0.7)' 
            }}
          >
            We are always looking for exceptional talent. If you live in Figma and dream in code, we want to hear from you.
          </p>
          
          <button 
            className="px-10 py-4 border border-gray-300 dark:border-gray-800 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
            style={{
              fontFamily: "'Inter Variable', sans-serif",
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '150%',
              letterSpacing: '0%', 
            }}
          >
            Apply now
          </button>
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 1023px) {
          .team-row {
            height: auto !important;
            flex-direction: column !important;
            align-items: center !important;
          }
        }
      `}</style>
    </section>
  );
}