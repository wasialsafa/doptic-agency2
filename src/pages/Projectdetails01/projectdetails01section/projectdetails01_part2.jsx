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
      // 1. Restore Letter-by-Letter Reveal (Like before)
      // ---------------------------------------------------------
      const textElement = textBodyRef.current;
      
      // We need to preserve the paragraph structure while splitting characters.
      // We will target all <p> tags inside the ref.
      const paragraphs = textElement.querySelectorAll("p");
      
      paragraphs.forEach((p) => {
        const chars = p.innerText.split("");
        p.innerHTML = chars
          .map((char) => `<span class="reveal-char opacity-20 transition-colors">${char}</span>`)
          .join("");
      });

      // Animate the characters
      gsap.to(textElement.querySelectorAll(".reveal-char"), {
        color: "#0e0e0e", // Dark text color
        opacity: 1,
        stagger: 0.005,   // Fast stagger for typing effect
        scrollTrigger: {
          trigger: textElement,
          start: "top 80%",
          end: "bottom 40%",
          scrub: true,    // Links animation progress to scroll
        },
      });

      // ---------------------------------------------------------
      // 2. Restore Image Tilt Effect (Mouse Move)
      // ---------------------------------------------------------
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        // Calculate rotation based on mouse position
        const xRotation = (clientY / innerHeight - 0.5) * 10; 
        const yRotation = (clientX / innerWidth - 0.5) * -10;

        gsap.to(imageRef.current, {
          rotationX: xRotation,
          rotationY: yRotation,
          transformPerspective: 1000, // Adds 3D depth
          ease: "power2.out",
          duration: 0.6
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-bg-light dark:bg-bg-dark font-sans text-black overflow-hidden">
      
      {/* Container Layout:
        - Width: 1290px (Desktop)
        - Top Padding: 30px
        - Bottom Padding: 60px 
        - Gap: 64px 
      */}
      <div className="w-full max-w-[1290px] mx-auto pt-[30px] pb-[60px] px-5 lg:px-0 flex flex-col gap-[64px]">
        
        {/* Image Section 
           - Height: 640px (Desktop), Responsive otherwise
           - Added 'perspective' container for the tilt effect
        */}
        <div 
          className="w-full h-[300px] md:h-[500px] lg:h-[640px] overflow-hidden"
          style={{ perspective: "1000px" }}
        >
          <img
            ref={imageRef}
            src="/images/projectspage/projectdetails01/visualstrategy.svg"
            alt="Visual Strategy Board"
            className="w-full h-full object-cover scale-105" // slight scale to prevent edges showing during tilt
          />
        </div>

        {/* Text Section */}
        <div className="w-full flex flex-col gap-[14px]">
          
          {/* Title */}
          <h2 className="text-[42px] md:text-[54px] lg:text-[64px] font-medium tracking-tight leading-none mb-4">
            Visual Strategy
          </h2>

          {/* Body Text 
             - Ref attached here for the letter-reveal effect
             - Typography: 18-20px (responsive), Regular weight
          */}
          <div 
            ref={textBodyRef}
            className="text-lg md:text-xl leading-[1.6] text-gray-400 font-normal"
          >
            <p className="mb-6">
              We abandoned the generic white-background standard. Instead, we established 
              a moody "dark mode" aesthetic, utilizing high-contrast typography and 
              oversized imagery to create an immediate visual impact.
            </p>
            
            <p className="mb-6">
              To bridge the digital gap, we implemented WebGL micro-interactions. 
              These subtle animations react dynamically to the cursor, creating a 
              responsive environment that feels alive.
            </p>
            
            <p>
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