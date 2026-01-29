"use client"

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- HELPER: SPLIT TEXT FOR TYPEWRITER ---
const SplitText = ({ children, className, style }) => {
  return (
    <span className={className} style={style}>
      {children.split('').map((char, index) => (
        <span 
          key={index} 
          className="char inline-block" 
          style={{ opacity: 0 }} // Start hidden
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

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
    image: "/images/teamspage/teamimage5.svg" 
  },
  { 
    id: 6, 
    name: "Whitney Hellings", 
    role: "Product Designer", 
    image: "/images/teamspage/teamimage6.svg" 
  },
  { 
    id: 7, 
    name: "Jane Cooper", 
    role: "Marketing", 
    image: "/images/teamspage/teamimage7.svg" 
  },
  { 
    id: 8, 
    name: "Robert Fox", 
    role: "Director", 
    image: "/images/teamspage/teamimage8.svg" 
  },
];

export default function TeamSection() {
  const containerRef = useRef(null);
  const [activeTopIndex, setActiveTopIndex] = useState(0); 
  const [activeBottomIndex, setActiveBottomIndex] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- 1. HEADER ANIMATION (TYPEWRITER ONLY) ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".header-content",
          start: "top 90%",
        },
      });

      // Select characters
      const charsTitle1 = document.querySelectorAll(".tw-title-1 .char");
      const charsTitle2 = document.querySelectorAll(".tw-title-2 .char");

      // Typewriter sequence (ADJUSTED FOR VISIBILITY)
      tl.to(charsTitle1, {
        opacity: 1,
        duration: 0.1,  // Slower fade per char
        stagger: 0.05,  // Slower typing speed
        ease: "power1.inOut"
      })
      .to(charsTitle2, {
        opacity: 1,
        duration: 0.1,
        stagger: 0.05,
        ease: "power1.inOut"
      }, "-=0.2") // Slight overlap
      
      // Simple fade up for description
      .fromTo(".tw-desc", 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 
        "-=0.2"
      );

      // --- 2. EXISTING TEAM ROW ANIMATIONS ---
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
      
      // --- 3. FOOTER ANIMATION ---
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
      <div className="w-full max-w-[1440px] px-[75px] pt-[200px] pb-[120px] flex flex-col items-start">
        
        {/* Header Section */}
        <header className="header-content w-full max-w-[1290px] mb-[64px]">
          <h1 className="text-[#0e0e0e] dark:text-[#e2e2e2] mb-[24px] flex items-baseline flex-wrap gap-4">
            
            {/* TYPEWRITER TEXT 1 */}
            <SplitText 
              className="tw-title-1 font-medium"
              style={{
                fontFamily: "'Inter Variable', sans-serif",
                fontWeight: 500,
                fontSize: '128px',
                lineHeight: '120%',
                letterSpacing: '-0.04em',
                display: 'inline-block' 
              }}
            >
              Our talented
            </SplitText>
            
            {/* TYPEWRITER TEXT 2 */}
            <SplitText 
              className="tw-title-2"
              style={{
                fontFamily: "'Libre Caslon Text', serif",
                fontWeight: 400,
                fontStyle: 'italic',
                fontSize: '104px',
                lineHeight: '120%',
                letterSpacing: '-0.04em',
                display: 'inline-block' 
              }}
            >
              team
            </SplitText>
          </h1>

          <p 
            className="tw-desc whitespace-nowrap text-[#0E0E0EB2] dark:text-[#E2E2E2]/70"
            style={{
                fontFamily: "'Inter Variable', sans-serif",
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '18px',
                lineHeight: '160%',
                letterSpacing: '0%',
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
                  // --- REDIRECT LOGIC FOR FIRST IMAGE ---
                  onClick={() => {
                    if (member.id === 1) {
                      window.location.href = '/design_team'; // REPLACE WITH YOUR LINK
                    }
                  }}
                  className="relative group overflow-hidden cursor-pointer h-[520px] transition-[width] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  style={{
                    width: isActive ? '520px' : '226.66px',
                    flex: 'none' 
                  }}
                >
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className={`absolute inset-0 w-full h-full object-cover opacity-100 transition-all duration-1000 
                    ${isActive ? 'scale-105 grayscale-0' : 'scale-100 grayscale'}`}
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
                    className={`absolute inset-0 w-full h-full object-cover opacity-100 transition-all duration-1000 
                    ${isActive ? 'scale-105 grayscale-0' : 'scale-100 grayscale'}`}
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
          <h2 className="text-[#0e0e0e] dark:text-[#e2e2e2] mb-[24px]">
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
            className="mb-[40px] text-[#0E0E0EB2] dark:text-[#E2E2E2]/70"
            style={{
              fontFamily: "'Inter Variable', sans-serif",
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '18px',
              lineHeight: '160%',
              letterSpacing: '0%',
            }}
          >
            We are always looking for exceptional talent. If you live in Figma and dream in code, we want to hear from you.
          </p>
          
          <button 
            className="px-10 py-4 border border-[#0E0E0E]/40 dark:border-[#e2e2e2]/40 dark:border-gray-800 text-[#0e0e0e] dark:text-[#e2e2e2] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
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