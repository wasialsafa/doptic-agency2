import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VisualStrategySection = () => {
  const sectionRef = useRef(null);
  const textBodyRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ---------------------------------------------------------
      // 1. Text Reveal Logic (Updated to Match Challenge Section)
      // ---------------------------------------------------------
      const textElement = textBodyRef.current;
      const paragraphs = textElement.querySelectorAll("p");
      
      paragraphs.forEach((p) => {
        const content = p.innerText;
        p.innerHTML = content
          .split("")
          // START STATE: opacity-30 (30%)
          // COLORS: #0e0e0e (Light) / #e2e2e2 (Dark)
          .map((char) => `<span class="reveal-char opacity-30 text-[#0e0e0e] dark:text-[#e2e2e2] transition-colors duration-300">${char}</span>`)
          .join("");
      });

      // Animate the characters
      gsap.to(textElement.querySelectorAll(".reveal-char"), {
        // END STATE: opacity: 0.7 (70%)
        // Note: We removed the 'color' property here so CSS handles the theme switch
        opacity: 0.7,
        stagger: 0.005,   // Fast stagger for typing effect
        scrollTrigger: {
          trigger: textElement,
          start: "top 80%",
          end: "bottom 40%",
          scrub: true,    // Links animation progress to scroll
        },
      });

      // ---------------------------------------------------------
      // 2. Image Tilt Effect (Preserved)
      // ---------------------------------------------------------
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xRotation = (clientY / innerHeight - 0.5) * 10; 
        const yRotation = (clientX / innerWidth - 0.5) * -10;

        gsap.to(imageRef.current, {
          rotationX: xRotation,
          rotationY: yRotation,
          transformPerspective: 1000, 
          ease: "power2.out",
          duration: 0.6
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Typography Object (Matches Challenge Section)
  const bodyTextStyle = {
    fontFamily: '"Inter Variable", sans-serif',
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: '18px',
    lineHeight: '160%',
    letterSpacing: '0%',
  };

  return (
    <section ref={sectionRef} className="bg-bg-light dark:bg-bg-dark transition-colors duration-300 font-sans overflow-hidden">
      
      {/* Container Layout */}
      <div className="w-full max-w-[1290px] mx-auto pt-[30px] pb-[60px] px-5 lg:px-0 flex flex-col gap-[64px]">
        
        {/* Image Section */}
        <div 
          className="w-full h-[300px] md:h-[500px] lg:h-[640px] overflow-hidden"
          style={{ perspective: "1000px" }}
        >
          <img
            ref={imageRef}
            src="/images/projectspage/projectdetails01/visualstrategy.svg"
            alt="Visual Strategy Board"
            className="w-full h-full object-cover scale-105" 
          />
        </div>

        {/* Text Section */}
        <div className="w-full flex flex-col gap-[14px]">
          
          {/* Title - Updated Colors */}
          <h2 className="text-[42px] md:text-[54px] lg:text-[64px] font-medium tracking-tight leading-none mb-4 text-[#0e0e0e] dark:text-[#e2e2e2]">
            Visual Strategy
          </h2>

          {/* Body Text Wrapper */}
          <div 
            ref={textBodyRef}
            className="flex flex-col gap-[14px]"
          >
            <p className="reveal-text" style={bodyTextStyle}>
              We abandoned the generic white-background standard. Instead, we established 
              a moody "dark mode" aesthetic, utilizing high-contrast typography and 
              oversized imagery to create an immediate visual impact.
            </p>
            
            <p className="reveal-text" style={bodyTextStyle}>
              To bridge the digital gap, we implemented WebGL micro-interactions. 
              These subtle animations react dynamically to the cursor, creating a 
              responsive environment that feels alive.
            </p>
            
            <p className="reveal-text" style={bodyTextStyle}>
              The result is a tactile experience that mimics the weight of high-quality 
              fabric. Every scroll and hover feels heavy, deliberate, and undeniably premium.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default VisualStrategySection;