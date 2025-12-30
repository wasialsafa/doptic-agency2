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
  
  // References for the floating cursor container
  const cursorLabelRef = useRef(null);
  const cursorLabelInnerRef = useRef(null);
  
  // GSAP quickTo for high-performance mouse following
  const xMoveCursor = useRef(null);
  const yMoveCursor = useRef(null);
  const xRotateCursor = useRef(null);

  // Track previous mouse position to calculate velocity/direction
  const previousMouseX = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup quickTo for smooth following
      xMoveCursor.current = gsap.quickTo(cursorLabelRef.current, "left", { duration: 0.5, ease: "power3" });
      yMoveCursor.current = gsap.quickTo(cursorLabelRef.current, "top", { duration: 0.5, ease: "power3" });
      
      // Setup quickTo for rotation (tilt)
      xRotateCursor.current = gsap.quickTo(cursorLabelInnerRef.current, "rotation", { duration: 0.5, ease: "power3" });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;

    // 1. Calculate Tilt based on direction/velocity
    const deltaX = clientX - previousMouseX.current;
    previousMouseX.current = clientX;
    
    // Clamp the rotation between -20 and 20 degrees so it doesn't flip over
    const tiltAmount = gsap.utils.clamp(-20, 20, deltaX * 0.8);

    // 2. Move the floating container
    if (xMoveCursor.current && yMoveCursor.current && xRotateCursor.current) {
      xMoveCursor.current(clientX);
      yMoveCursor.current(clientY);
      xRotateCursor.current(tiltAmount);
    }
  };

  const handleMouseEnter = (img) => {
    // "Blooming" / Smooth Swap Animation
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
      // Note: We don't force rotation here anymore, let handleMouseMove control it
      opacity: 1,
      duration: 0.4,
      ease: "back.out(1.7)"
    });
  };

  const handleMouseLeave = () => {
    // Animate Image OUT
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
      {/* FLOATING IMAGE CONTAINER 
        - Removed mix-blend-difference so images look normal
      */}
      <div 
        ref={cursorLabelRef}
        className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center" 
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div 
          ref={cursorLabelInnerRef}
          className="relative overflow-hidden shadow-2xl  origin-center scale-0 opacity-0"
          style={{ 
            width: '200px', 
            height: '200px',
          }} 
        >
          <img
            src={activeImage}
            alt="Award Preview"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* MAIN CONTENT LAYOUT */}
      <div className="w-full max-w-[1440px] mx-auto px-[75px] py-[120px]">
        
        {/* HEADER SECTION */}
        <div className="mb-[64px] relative z-10 w-full max-w-[1290px]">
          <h2 className="text-[#0e0e0e] dark:text-white" style={{ 
            fontSize: '72px', 
            fontWeight: '500', 
            lineHeight: '120%', 
            letterSpacing: '-0.04em',
            fontFamily: '"Inter Variable", sans-serif'
            }}>
            Awards &{' '}
            <span 
                className="italic" 
                style={{ 
                fontFamily: '"Libre Caslon Text", serif',
                fontWeight: '400',
                fontStyle: 'italic'
                }}
            >
                Accolades
            </span>
          </h2>

          {/* SUBTEXT WITH NEWLINE AFTER "HAS" */}
          <p className="mt-6 text-[#0e0e0e] dark:text-white max-w-2xl opacity-80" style={{
            fontFamily: '"Inter Variable", sans-serif',
            fontWeight: '400',
            fontStyle: 'normal',
            fontSize: '16px',
            lineHeight: '160%',
            letterSpacing: '0%'
          }}>
            Our commitment to exceptional design has <br /> earned global recognition and industry accolades.
          </p>
        </div>

        {/* AWARDS LIST */}
        <div className="w-full max-w-[1290px] border-t border-black/10 dark:border-white/10">
          {awards.map((award, index) => (
            <div
              key={index}
              onMouseEnter={() => handleMouseEnter(award.image)}
              onMouseLeave={handleMouseLeave}
              className="group relative grid grid-cols-1 md:grid-cols-12 py-12 border-b border-black/10 dark:border-white/10 items-center cursor-default overflow-hidden"
            >
              {/* ORANGE BACKGROUND FILL EFFECT */}
              <div className="absolute inset-0 bg-[#FF6B35] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-0" />

              {/* DATE */}
              <div className="relative z-10 col-span-2 text-sm font-medium text-[#0e0e0e] dark:text-white group-hover:text-white transition-colors duration-300">
                <span className="block text-2xl" style={{ fontFamily: '"Inter Variable", sans-serif' }}>
                  {award.date.split(' ')[0]}
                </span>
                <span className="opacity-60 uppercase text-xs tracking-wider group-hover:opacity-100">
                  {award.date.split(' ').slice(1).join(' ')}
                </span>
              </div>

              {/* TITLE */}
              <div className="relative z-10 col-span-4 transition-colors duration-300 pl-0 md:pl-4 group-hover:text-white">
                <h3 className="text-3xl font-medium tracking-tight text-[#0e0e0e] dark:text-white uppercase group-hover:text-white" style={{ fontFamily: '"Inter Variable", sans-serif' }}>
                  {award.title}
                </h3>
                <p className="text-[#0e0e0e] dark:text-white opacity-60 text-sm mt-1 group-hover:text-white group-hover:opacity-90">{award.subtitle}</p>
              </div>

              {/* DESCRIPTION */}
              <div className="relative z-10 col-span-6 transition-colors duration-300 pl-0 md:pl-8 group-hover:text-white">
                <p className="text-lg leading-[140%] text-[#0e0e0e] dark:text-white opacity-70 max-w-xl group-hover:text-white group-hover:opacity-90" style={{ fontFamily: '"Inter Variable", sans-serif' }}>
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