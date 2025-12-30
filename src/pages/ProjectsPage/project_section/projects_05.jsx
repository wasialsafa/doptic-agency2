import React from 'react';
import { useTheme } from '../../../context/ThemeContext';

const Project05 = () => {
  const { theme } = useTheme();

  return (
    <div className="bg-[#e2e2e2] dark:bg-bg-dark min-h-screen transition-colors duration-300 font-sans overflow-x-hidden flex justify-center items-center">
      
      {/* SECTION: 
          Mobile: w-full, h-auto, padding 20px
          Desktop (lg): Fixed 1440px x 998px, padding 75px
      */}
      <section className="w-full h-auto px-5 py-10 lg:w-[1440px] lg:h-[998px] lg:px-[75px] lg:py-[60px] flex-shrink-0 box-border transition-all">
        
        {/* Main Content Div:
            Mobile: Flex column, fluid width
            Desktop (lg): Block, Fixed 1290px x 878px
        */}
        <div className="relative w-full flex flex-col gap-8 lg:block lg:w-[1290px] lg:h-[878px]">
          
          {/* 1. Headings */}
          <div className="relative z-20 lg:absolute lg:top-0 lg:left-0">
            <h2 
              className="font-medium leading-[120%] tracking-[-0.04em] text-[#0e0e0e] dark:text-text-light text-[48px] md:text-[72px] lg:text-[96px]"
              style={{ fontFamily: '"Inter Variable", sans-serif' }}
            >
              Vitality Telehealth
            </h2>
            <h2 
              className="leading-[120%] tracking-[-0.02em] text-[#0e0e0e] dark:text-text-light mt-[-5px] lg:mt-[-10px] text-[36px] md:text-[48px] lg:text-[64px]"
              style={{ fontFamily: '"Italiana", serif' }}
            >
              UI/UX
            </h2>
          </div>

          {/* 2. Number "05" 
              Mobile: Static, smaller font
              Desktop (lg): Absolute, Left 112px, Bottom 460px
          */}
          <div 
            className="relative lg:absolute flex items-center justify-start lg:justify-center font-bold text-black/[0.04] dark:text-white/[0.04] select-none z-0 leading-none lg:w-[158px] lg:h-[154px] lg:left-[112px] lg:bottom-[460px]"
          >
                           <span 
                className="block text-[#0e0e0e] dark:text-white leading-[120%] select-none"
                style={{ 
                    fontFamily: '"Inter Variable", sans-serif',
                    fontWeight: 800, 
                    fontSize: 'clamp(64px, 10vw, 128px)', 
                    letterSpacing: '-0.04em',
                    opacity: 0.3 
                }}
              >
                05
              </span>
          </div>

          {/* 3. Image 
              Mobile: W-full, H-auto, aspect-video
              Desktop (lg): Absolute, W-960px, Left-330px
          */}
          <div 
            className="relative z-10 overflow-hidden w-full h-[300px] md:h-[500px] lg:absolute lg:w-[960px] lg:h-[614px] lg:left-[330px] lg:top-[200px]"
          >
            <img 
              src="/images/projectspage/projectimage1.svg" 
              alt="Vitality Telehealth UI/UX"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 4. Description Text 
              Mobile: Text Left, fluid width
              Desktop (lg): Text Right, Width 1290px, Absolute Bottom
          */}
          <div 
            className="relative w-full lg:absolute lg:bottom-[20px] lg:left-0 lg:w-[1290px]"
          >
            <p 
              className="text-[#0e0e0e] dark:text-text-light text-left lg:text-right"
              style={{
                fontFamily: '"Inter Variable", sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '18px',
                lineHeight: '160%',
                letterSpacing: '0%',
              }}
            >
              We transformed a local label into a global brand. Our strategic design increased conversion rates and customer loyalty instantly.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Project05;