import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ChallengeSection = () => {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text Reveal Logic
      const textElements = textContainerRef.current.querySelectorAll('.reveal-text');

      textElements.forEach((element) => {
        const content = element.innerText;
        element.innerHTML = content
          .split("")
          // START STATE: opacity-30 (30%)
          // COLORS: #0e0e0e (Light) / #e2e2e2 (Dark)
          .map((char) => `<span class="reveal-char opacity-30 text-[#0e0e0e] dark:text-[#e2e2e2] transition-colors duration-300">${char}</span>`)
          .join("");
      });

      gsap.to(".reveal-char", {
        // END STATE: opacity: 0.7 (70%)
        opacity: 0.7, 
        stagger: 0.02,
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 80%",
          end: "bottom 50%",
          scrub: 1,
        },
      });

      // 2. Image Tilt Effect
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xRotation = (clientY / innerHeight - 0.5) * 15; 
        const yRotation = (clientX / innerWidth - 0.5) * -15;

        gsap.to(imageRef.current, {
          rotationX: xRotation,
          rotationY: yRotation,
          perspective: 1000,
          ease: "power2.out",
          duration: 0.5
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Typography Object
  const bodyTextStyle = {
    fontFamily: '"Inter Variable", sans-serif',
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: '18px',
    lineHeight: '160%',
    letterSpacing: '0%',
  };

  return (
    <section 
      ref={containerRef} 
      className="bg-bg-light dark:bg-bg-dark w-full flex justify-center transition-colors duration-300"
    >
      {/* Page Container */}
      <div className="w-full max-w-[1440px] px-[75px] pt-[60px] pb-[30px]">
        
        {/* Heading */}
        <h2 className="text-[42px] md:text-[54px] lg:text-[64px] font-medium tracking-tight leading-none mb-4 text-[#0e0e0e] dark:text-[#e2e2e2]">
            The Challenge
        </h2>

        {/* Main Content Div */}
        <div className="flex flex-col">
          
          {/* Text Div */}
          <div 
            ref={textContainerRef}
            className="w-full flex flex-col gap-[14px]"
            style={{ minHeight: '297px' }}
          >
            <p 
              className="reveal-text"
              style={bodyTextStyle}
            >
              Despite a massive social following, Apex's web presence was failing to convert. The existing site felt disconnected from the brand's energy, resulting in high bounce rates and missed sales opportunities.
            </p>

            <p 
              className="reveal-text"
              style={bodyTextStyle}
            >
              Technical performance was the biggest bottleneck. The mobile experience was clunky, and the checkout infrastructure repeatedly crashed during high-traffic product launches, frustrating their most loyal fans.
            </p>

            <p 
              className="reveal-text mt-4"
              style={bodyTextStyle}
            >
              They needed a total overhaul. The goal was to build a platform as aggressive as their aesthetic—one capable of handling viral surges and converting hype into revenue without friction.
            </p>
          </div>

          {/* Gap between Text and Image */}
          <div className="h-[64px]"></div>

          {/* Image Div */}
          <div className="perspective-1000 w-full">
            <div 
              ref={imageRef}
              className="w-full h-[640px] overflow-hidden rounded-sm "
            >
              <img
                src="/images/projectspage/projectdetails01/thechallenge.svg.svg"
                alt="Challenge Visual"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ChallengeSection;