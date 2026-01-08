import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BlogPostIntroduction = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Select all elements with the 'reveal-on-scroll' class
      const revealElements = gsap.utils.toArray('.reveal-on-scroll');

      revealElements.forEach((element) => {
        gsap.fromTo(
          element,
          { 
            y: 40, 
            opacity: 0,
            filter: "blur(4px)" // Adds a subtle "bloom" blur effect
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%", // Animation starts when element hits bottom 15% of viewport
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // --- COLOR CLASSES ---
  const textMain = "text-[#0e0e0e] dark:text-[#e2e2e2]";
  const textSub = "text-[#0E0E0EB2] dark:text-[#E2E2E2]/70";
  const borderMain = "border-[#0e0e0e] dark:border-[#e2e2e2]";

  return (
    <div className="w-full min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col items-center font-['Inter'] transition-colors duration-300">
      
      {/* The Main Layout Container */}
      <div 
        ref={containerRef}
        className="w-full max-w-[1440px] px-[75px] pb-[111px] relative"
        style={{ minHeight: '2012px' }} 
      >
        
        {/* Inner Content Wrapper */}
        <div 
          ref={contentRef} 
          className="w-full max-w-[850px] mx-auto flex flex-col gap-[64px]"
        >
          
          {/* Section 1: Introduction */}
          <div className="flex flex-col pt-[80px]">
            <h1 className={`reveal-on-scroll font-medium text-[48px] leading-[120%] tracking-[-0.04em] mb-[64px] ${textMain}`}>
              Introduction
            </h1>

            <div className="flex flex-col gap-[30px]">
              <p className={`reveal-on-scroll font-normal text-[18px] leading-[160%] tracking-normal ${textSub}`}>
                Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.
              </p>
              <p className={`reveal-on-scroll font-normal text-[18px] leading-[160%] tracking-normal ${textSub}`}>
                Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.
              </p>
            </div>
          </div>

          {/* Section 2: Image Area with Caption */}
          <div className="reveal-on-scroll w-full h-[528px] py-[48px] flex flex-col gap-[8px]">
            {/* Image Placeholder */}
            <div className="flex-grow w-full bg-[#D9D9D9] dark:bg-[#333333] flex items-center justify-center relative overflow-hidden transition-colors duration-300">
                <div className={`opacity-20 ${textMain}`}>
                   <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
                </div>
            </div>
            
            {/* Image Caption with Left Bar */}
            <div className={`border-l-[3px] ${borderMain} pl-3 transition-colors duration-300`}>
              <span className={`text-[16px] font-medium leading-[150%] ${textMain} block`}>
                Image caption goes here
              </span>
            </div>
          </div>

          {/* Section 3: Middle Content */}
          <div className="flex flex-col">
            <h2 className={`reveal-on-scroll font-medium text-[24px] leading-[120%] tracking-[-0.04em] mb-[30px] ${textMain}`}>
              Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.
            </h2>

            <p className={`reveal-on-scroll font-normal text-[18px] leading-[160%] tracking-normal ${textSub}`}>
              Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat, urna. Viverra purus et erat auctor aliquam. Risus, volutpat vulputate posuere purus sit congue convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.
            </p>
          </div>

          {/* Section 4: Quote Block with Left Bar */}
          <div className="w-full py-[36px] flex items-center">
            <blockquote className={`reveal-on-scroll border-l-[3px] ${borderMain} pl-4 italic text-[18px] leading-[160%] tracking-normal font-normal text-left w-full transition-colors duration-300 ${textMain}`}>
              "Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus."
            </blockquote>
          </div>

          {/* Section 5: Pre-Conclusion Text */}
          <div>
              <p className={`reveal-on-scroll font-normal text-[18px] leading-[160%] tracking-normal ${textSub}`}>
              Tristique odio senectus nam posuere ornare leo metus, ultricies. Blandit duis ultricies vulputate morbi feugiat cras placerat elit. Aliquam tellus lorem sed ac. Montes, sed mattis pellentesque suscipit accumsan. Cursus viverra aenean magna risus elementum faucibus molestie pellentesque. Arcu ultricies sed mauris vestibulum.
            </p>
          </div>

          {/* Section 6: Conclusion */}
          <div className="flex flex-col">
             <h1 className={`reveal-on-scroll font-medium text-[48px] leading-[120%] tracking-[-0.04em] mb-[64px] ${textMain}`}>
              Conclusion
            </h1>

            <div className="flex flex-col gap-[14px]">
              <p className={`reveal-on-scroll font-normal text-[18px] leading-[160%] tracking-normal ${textSub}`}>
                Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies. Duis est sit sed leo nisl, blandit elit sagittis. Quisque tristique consequat quam sed. Nisl at scelerisque amet nulla purus habitasse.
              </p>
              <p className={`reveal-on-scroll font-normal text-[18px] leading-[160%] tracking-normal ${textSub}`}>
                Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas condimentum mi massa. In tincidunt pharetra consectetur sed duis facilisis metus. Etiam egestas in nec sed et. Quis lobortis at sit dictum eget nibh tortor commodo cursus.
              </p>
              <p className={`reveal-on-scroll font-normal text-[18px] leading-[160%] tracking-normal ${textSub}`}>
                Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare id morbi eget ipsum. Aliquam senectus neque ut id eget consectetur dictum. Donec posuere pharetra odio consequat scelerisque et, nunc tortor. Nulla adipiscing erat a erat. Condimentum lorem posuere gravida enim posuere cursus diam.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BlogPostIntroduction;