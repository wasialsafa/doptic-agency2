import React from 'react';
import { useTheme } from '../../../context/ThemeContext';

const Project03 = () => {
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
              Modern Housing
            </h2>
            <h2 
              className="leading-[120%] tracking-[-0.02em] text-[#0e0e0e] dark:text-text-light mt-[-5px] lg:mt-[-10px] text-[32px] md:text-[48px] lg:text-[64px]"
              style={{ fontFamily: '"Italiana", serif' }}
            >
              Fashion
            </h2>
          </div>

          {/* 2. Number "03" 
              Mobile: Static, aligned left
              Desktop (lg): Absolute, Left 329px, Bottom 460px
          */}
          <div 
            className="relative lg:absolute flex items-center justify-start lg:justify-center font-bold text-black/[0.04] dark:text-white/[0.04] select-none z-0 leading-none lg:w-[161px] lg:h-[154px] lg:left-[329px] lg:bottom-[460px]"
          >
             <span className="text-[120px] lg:text-[200px]">03</span>
          </div>

          {/* 3. Image Wrapper & Text 
              Mobile: Fluid width, stacks vertically
              Desktop (lg): Absolute, Left 550px, Top 200px
          */}
          <div 
            className="relative z-10 flex flex-col items-start lg:items-end gap-6 lg:absolute lg:w-[740px] lg:left-[550px] lg:top-[200px]"
          >
            {/* Image: 
                Mobile: w-full, h-auto
                Desktop: w-[740px] h-[614px]
            */}
            <div className="w-full h-[300px] md:h-[500px] lg:w-[740px] lg:h-[614px] overflow-hidden">
              <img 
                src="/images/projectspage/projectimage3.svg" 
                alt="Redefining Urban Fashion"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 4. Text: 
                Mobile: Left align, normal wrap
                Desktop: Right align, nowrap
            */}
            <p 
              className="text-[#0e0e0e]/70 dark:text-text-light/60 text-[14px] md:text-[16px] leading-relaxed font-light whitespace-normal lg:whitespace-nowrap text-left lg:text-right w-full lg:w-auto"
              style={{
                fontFamily: '"Inter Variable", sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '18px',
                lineHeight: '160%',
                letterSpacing: '0%',
              }}
            >
              A property management app for Nesto that automates tenant requests and streamlines maintenance workflows.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Project03;