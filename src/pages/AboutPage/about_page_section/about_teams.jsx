"use client"

import React, { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const teamMembers = [
  { id: 1, name: "Bessie Cooper", role: "UI/UX Designer", image: "/images/aboutpage/teamimage1.svg" },
  { id: 2, name: "James Wilson", role: "Lead Developer", image: "/images/aboutpage/teamimage2.svg" },
  { id: 3, name: "Sarah Anderson", role: "Product Manager", image: "/images/aboutpage/teamimage3.svg" },
  { id: 4, name: "Michael Chen", role: "Creative Director", image: "/images/aboutpage/teamimage4.svg" },
]

const FONT_INTER = 'Inter Variable, sans-serif';

export default function AboutTeams() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(".header-content", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".header-content",
          start: "top 90%",
        }
      });

      // Cards entrance
      gsap.from(".team-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".team-grid",
          start: "top 85%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="w-full bg-bg-light dark:bg-bg-dark transition-colors duration-300"
      style={{ 
        paddingTop: '120px', 
        paddingBottom: '120px',
        fontFamily: FONT_INTER 
      }}
    >
      {/* 1290px content width */}
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[75px]">
        
        {/* Header Section */}
        <div className="header-content flex flex-col md:flex-row justify-between items-start mb-[64px] border-b border-zinc-300 dark:border-zinc-700 pb-12 w-full min-h-[243px]">
          <div className="max-w-[800px]">
            <h1 className="text-[#1A1A1A] dark:text-white" style={{
              fontFamily: FONT_INTER,
              fontWeight: 500,
              fontSize: 'clamp(36px, 5vw, 72px)',
              lineHeight: '120%',
              letterSpacing: '-0.04em'
            }}>
              The Creative Minds
            </h1>
            <h2 className="text-[#1A1A1A] dark:text-white" style={{
              fontFamily: FONT_INTER, 
              fontWeight: 400,
              fontStyle: 'italic',
              fontSize: 'clamp(36px, 5vw, 72px)',
              lineHeight: '120%',
              letterSpacing: '-0.04em'
            }}>
              Behind the Magic
            </h2>
            
            <p className="mt-8 text-zinc-600 dark:text-zinc-400" style={{
              fontFamily: FONT_INTER,
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '160%',
              maxWidth: '600px'
            }}>
              We are strategists, designers, and engineers who refuse to settle for "good enough." 
            </p>
          </div>

          <button 
            className="mt-8 md:mt-0 px-8 py-3 border border-zinc-400 dark:border-zinc-600 text-sm uppercase tracking-widest hover:bg-[#FF4D2A] hover:border-[#FF4D2A] hover:text-white transition-all duration-300 dark:text-white"
            style={{ fontFamily: FONT_INTER }}
          >
            View All
          </button>
        </div>

        {/* Team Grid */}
        <div 
          className="team-grid flex flex-row items-start" 
          style={{ gap: '30px', height: '520px', width: '100%' }}
        >
          {teamMembers.map((member, index) => {
            const isActive = activeIndex === index;
            
            return (
              <div
                key={member.id}
                onMouseEnter={() => setActiveIndex(index)}
                className="team-card relative overflow-hidden bg-zinc-200 dark:bg-zinc-800 cursor-pointer transition-[width] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{
                  width: isActive ? '520px' : '226.66px',
                  height: '520px',
                  flex: 'none', 
                }}
              >
                {/* UPDATED IMAGE LOGIC:
                   Removed scale-105. Now the div widens, and object-cover reveals more 
                   of the image without the image itself zooming in.
                */}
                <img
                  src={member.image}
                  alt={member.name}
                  className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-1000 
                    ${isActive ? 'grayscale-0' : 'grayscale'}`}
                />
                
                {/* Name Banner */}
                <div 
                    className={`absolute left-0 w-full transition-all duration-500 ease-in-out bg-[#FF4D2A] text-white flex flex-col justify-center`}
                    style={{ 
                        bottom: '30px', 
                        height: '89px',
                        padding: '30px 40px',
                        gap: '16px',
                        transform: isActive ? 'translateY(0)' : 'translateY(150%)',
                        opacity: isActive ? 1 : 0,
                        pointerEvents: 'none',
                        fontFamily: FONT_INTER
                    }}
                >
                  <div className="flex flex-col">
                    <p className="text-xl font-medium leading-none">{member.name}</p>
                    <p className="text-[10px] uppercase tracking-widest mt-2 opacity-90">{member.role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1023px) {
          .team-grid {
            height: auto !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 20px !important;
          }
          .team-card {
            width: 100% !important;
            max-width: 520px !important;
            height: 400px !important;
          }
        }
      `}</style>
    </section>
  )
}