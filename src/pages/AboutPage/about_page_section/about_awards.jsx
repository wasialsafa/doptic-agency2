import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';

const awards = [
  { date: "08 Mar 2024", title: "Web Excellence", subtitle: "Pitti Uomo & Greenpeace", desc: "For pushing the boundaries of user interface design in the Fintech sector.", image: "https://picsum.photos/400/300?random=1" },
  { date: "03 Feb 2025", title: "Awwwards Nominee", subtitle: "Site of the Day", desc: "Recognized for outstanding creativity and front-end development performance.", image: "https://picsum.photos/400/300?random=2" },
  { date: "10 May 2025", title: "Global Agency Awards", subtitle: "Top B2B Agency", desc: "Honored for driving measurable growth and lead generation for enterprise clients.", image: "https://picsum.photos/400/300?random=3" },
  { date: "22 Sep 2025", title: "The Drum Awards", subtitle: "Digital Innovation", desc: "Celebrated for our proprietary approach to headless CMS architecture.", image: "https://picsum.photos/400/300?random=4" }
];

const AwardsSection = () => {
  const [activeImage, setActiveImage] = useState(awards[0].image);
  const containerRef = useRef(null);
  
  const cursorLabelRef = useRef(null);
  const cursorLabelInnerRef = useRef(null);
  
  const xMoveCursor = useRef(null);
  const yMoveCursor = useRef(null);
  const xRotateCursor = useRef(null);

  useEffect(() => {
    // 1. Use gsap.matchMedia for responsive animation logic
    let mm = gsap.matchMedia();

    // Only run cursor setup on screens wider than 1024px (Desktop/Landscape Tablet)
    mm.add("(min-width: 1024px)", () => {
      xMoveCursor.current = gsap.quickTo(cursorLabelRef.current, "left", { duration: 0.5, ease: "power3" });
      yMoveCursor.current = gsap.quickTo(cursorLabelRef.current, "top", { duration: 0.5, ease: "power3" });
      xRotateCursor.current = gsap.quickTo(cursorLabelInnerRef.current, "rotation", { duration: 0.5, ease: "power3" });
    });

    return () => mm.revert();
  }, []);

  const handleMouseMove = (e) => {
    // Logic stays same, but only executes if refs are initialized (Desktop)
    if (xMoveCursor.current && yMoveCursor.current && xRotateCursor.current) {
      const { clientX, clientY } = e;
      const tiltAmount = gsap.utils.mapRange(0, window.innerWidth, -40, 40, clientX);
      
      xMoveCursor.current(clientX);
      yMoveCursor.current(clientY);
      xRotateCursor.current(tiltAmount);
    }
  };

  const handleMouseEnter = (img) => {
    // Only animate on desktop to prevent mobile glitches
    if (window.innerWidth < 1024) return; 

    const tl = gsap.timeline();
    tl.to(cursorLabelInnerRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.15,
      overwrite: 'auto',
      onComplete: () => setActiveImage(img)
    })
    .to(cursorLabelInnerRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "back.out(1.7)"
    });
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 1024) return;

    gsap.to(cursorLabelInnerRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    });
  };

  return (
    <section 
      ref={containerRef}
      className="w-full bg-bg-light dark:bg-bg-dark relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* FLOATING IMAGE CONTAINER - Hidden on Mobile via CSS */}
      <div 
        ref={cursorLabelRef}
        className="fixed top-0 left-0 pointer-events-none z-50 hidden lg:flex items-center justify-center" 
        style={{ transform: 'translate(-50%, -120%)' }}
      >
        <div 
          ref={cursorLabelInnerRef}
          className="relative overflow-hidden shadow-2xl origin-center scale-0 opacity-0"
          style={{ width: '200px', height: '200px' }} 
        >
          <img
            src={activeImage}
            alt="Award Preview"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main Container: Mobile px-6 -> Desktop px-[75px] */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[75px] py-16 md:py-[120px]">
        
        {/* Header Section */}
        <div className="mb-10 md:mb-[64px] relative z-10 w-full max-w-[1290px]">
          {/* Responsive H2 Font Size */}
          <h2 className="text-[#0e0e0e] dark:text-white text-4xl md:text-6xl lg:text-[72px]" style={{ 
            fontWeight: '500', 
            lineHeight: '120%', 
            letterSpacing: '-0.04em',
            fontFamily: '"Inter Variable", sans-serif'
            }}>
            Awards &{' '}
            <span className="italic" style={{ fontFamily: '"Libre Caslon Text", serif', fontWeight: '400', fontStyle: 'italic' }}>
                Accolades
            </span>
          </h2>
          <p className="mt-4 md:mt-6 text-[#0e0e0e] dark:text-white max-w-2xl opacity-80" style={{
            fontFamily: '"Inter Variable", sans-serif', fontWeight: '400', fontSize: '16px', lineHeight: '160%',
          }}>
            Our commitment to exceptional design has <br className="hidden md:block" /> earned global recognition and industry accolades.
          </p>
        </div>

        {/* Awards List */}
        <div className="w-full max-w-[1290px] border-t border-black/10 dark:border-white/10">
          {awards.map((award, index) => (
            <div
              key={index}
              onMouseEnter={() => handleMouseEnter(award.image)}
              onMouseLeave={handleMouseLeave}
              // Flex-Col on Mobile, Flex-Row on Desktop
              className="group relative flex flex-col md:flex-row items-start md:items-center py-8 md:py-12 border-b border-black/10 dark:border-white/10 cursor-default"
            >
              
              {/* 1. DATE SECTION */}
              <div className="flex flex-col items-start md:items-center justify-center text-[#0e0e0e] dark:text-white shrink-0 mb-4 md:mb-0 md:mr-[34px]" 
                   style={{ width: '85px' }}>
                
                <span 
                  className="transition-all duration-300 text-[32px] group-hover:text-[40px]" 
                  style={{ 
                    fontFamily: '"Inter Variable", sans-serif',
                    fontWeight: 700,
                    lineHeight: '130%',
                    textAlign: 'center'
                }}>
                  {award.date.split(' ')[0]}
                </span>
                
                <span className="whitespace-nowrap" style={{ 
                    fontFamily: '"Inter Variable", sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '150%',
                    textAlign: 'center'
                }}>
                  {award.date.split(' ').slice(1).join(' ')}
                </span>
              </div>

              {/* 2. TITLE SECTION */}
              {/* Width auto on mobile, fixed 488px on desktop */}
              <div className="shrink-0 flex flex-col justify-center w-full md:w-[488px] mb-4 md:mb-0 md:mr-[64px]" 
                   style={{ minHeight: '60px' }}>
                <h3 className="text-[#0e0e0e] dark:text-white text-2xl md:text-[32px]" style={{ 
                    fontFamily: '"Inter Variable", sans-serif', fontWeight: 500, lineHeight: '120%', letterSpacing: '-0.04em'
                }}>
                  {award.title}
                </h3>
                <p style={{ 
                    fontFamily: '"Inter Variable", sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '160%', color: '#0E0E0E', opacity: 0.7 
                }} className="dark:text-white dark:opacity-70">
                    {award.subtitle}
                </p>
              </div>

              {/* 3. DESCRIPTION SECTION */}
              <div className="flex-1 flex justify-start md:justify-end items-end w-full md:w-auto md:pb-[34px]">
                {/* Text Wrap on mobile, No-Wrap on desktop */}
                <p className="text-[#0e0e0e] dark:text-white opacity-70 whitespace-normal md:whitespace-nowrap text-left md:text-right" style={{ 
                    fontFamily: '"Inter Variable", sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '160%',
                }}>
                  {award.desc}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;