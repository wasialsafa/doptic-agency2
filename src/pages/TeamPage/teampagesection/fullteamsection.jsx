"use client"

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const topRowData = [
  { id: 1, name: "Bessie Cooper", role: "UI/UX Designer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" },
  { id: 2, name: "Arlene McCoy", role: "Frontend Developer", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop" },
  { id: 3, name: "Devon Lane", role: "Project Manager", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop" },
  { id: 4, name: "Courtney Henry", role: "Strategist", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop" },
];

const bottomRowData = [
  { id: 5, name: "Tom Cook", role: "Backend Developer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop" },
  { id: 6, name: "Whitney Hellings", role: "Product Designer", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop" },
  { id: 7, name: "Jane Cooper", role: "Marketing", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop" },
  { id: 8, name: "Robert Fox", role: "Director", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop" },
];

export default function TeamSection() {
  const containerRef = useRef(null);
  const [activeTopIndex, setActiveTopIndex] = useState(0); 
  const [activeBottomIndex, setActiveBottomIndex] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Header entrance
      gsap.fromTo(".header-content", 
        { y: 60, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1, // Ensures opacity is exactly 1
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".header-content",
            start: "top 90%",
          }
        }
      );

      // Rows entrance - FIXED: Uses fromTo to guarantee end opacity is 1
      gsap.fromTo(".team-row", 
        { y: 100, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1, // Forces full visibility
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
        
{/* Header Section */}
<header className="header-content w-full max-w-[1290px] mb-[64px] opacity-0 invisible">
  <h1 className="text-black dark:text-white mb-[24px] flex items-baseline flex-wrap gap-4">
    {/* "Our talented" - Inter Variable, 500, 128px */}
    <span 
      className="font-medium"
      style={{
        fontFamily: "'Inter Variable', sans-serif",
        fontWeight: 500,
        fontSize: '128px',
        lineHeight: '120%',
        letterSpacing: '-0.04em'
      }}
    >
      Our talented
    </span>
    
    {/* "team" - Libre Caslon Text, 400, Italic, 104px */}
    <span 
      style={{
        fontFamily: "'Libre Caslon Text', serif",
        fontWeight: 400,
        fontStyle: 'italic',
        fontSize: '104px',
        lineHeight: '120%',
        letterSpacing: '-0.04em'
      }}
    >
      team
    </span>
  </h1>

  {/* Subtext - 1 liner (Removed max-width constraint) */}
  <p 
    className="text-gray-500 dark:text-gray-400 text-base whitespace-nowrap"
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
                    // Added opacity-100 to force full visibility
                    className={`absolute inset-0 w-full h-full object-cover opacity-100 transition-transform duration-1000 
                    ${isActive ? 'scale-105' : 'scale-100'}`}
                  />
                  
                  <div 
                    className="absolute left-0 w-full bg-[#FF4D2A] text-white flex flex-col justify-center transition-all duration-500 ease-in-out z-10"
                    style={{ 
                      bottom: '30px', 
                      height: '89px',
                      padding: '30px 40px',
                      gap: '16px',
                      transform: isActive ? 'translateY(0)' : 'translateY(150%)',
                      opacity: isActive ? 1 : 0,
                      pointerEvents: 'none'
                    }}
                  >
                     <div className="flex flex-col">
                        <span className="text-white font-medium text-sm leading-none">{member.name}</span>
                        <span className="text-white/80 text-[10px] uppercase tracking-widest mt-2 opacity-90">{member.role}</span>
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
                    // Added opacity-100 here as well
                    className={`absolute inset-0 w-full h-full object-cover opacity-100 transition-transform duration-1000 
                    ${isActive ? 'scale-105' : 'scale-100'}`}
                  />
                  
                  <div 
                    className="absolute left-0 w-full bg-[#FF4D2A] text-white flex flex-col justify-center transition-all duration-500 ease-in-out z-10"
                    style={{ 
                      bottom: '30px', 
                      height: '89px',
                      padding: '30px 40px',
                      gap: '16px',
                      transform: isActive ? 'translateY(0)' : 'translateY(150%)',
                      opacity: isActive ? 1 : 0,
                      pointerEvents: 'none'
                    }}
                  >
                     <div className="flex flex-col">
                        <span className="text-white font-medium text-sm leading-none">{member.name}</span>
                        <span className="text-white/80 text-[10px] uppercase tracking-widest mt-2 opacity-90">{member.role}</span>
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
              {/* "Can't find the right" - Inter Variable, 500, 72px */}
              <span 
                style={{
                  fontFamily: "'Inter Variable', sans-serif",
                  fontWeight: 500,
                  fontSize: '72px',
                  lineHeight: '120%',
                  letterSpacing: '-0.04em',
                  display: 'block' // Ensures it sits on its own line like the <br> implied
                }}
              >
                Can't find the right
              </span>
              
              {/* "position?" - Libre Caslon Text (Matching the "team" style logic) */}
              <span 
                style={{
                  fontFamily: "'Libre Caslon Text', serif",
                  fontWeight: 400,
                  fontStyle: 'italic',
                  fontSize: '72px', // Inherits the large size
                  lineHeight: '120%',
                  letterSpacing: '-0.04em'
                }}
              >
                position?
              </span>
            </h2>

            <p className="text-gray-500 dark:text-gray-400 text-base mb-[40px] leading-relaxed">
              We are always looking for exceptional talent. If you live in Figma and dream in code, we want to hear from you.
            </p>
            
            {/* Apply Now Button - Updated to 20px, 0% spacing, No Uppercase */}
            <button 
              className="px-10 py-4 border border-gray-300 dark:border-gray-800 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
              style={{
                fontFamily: "'Inter Variable', sans-serif",
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: '150%',
                letterSpacing: '0%', // As requested
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