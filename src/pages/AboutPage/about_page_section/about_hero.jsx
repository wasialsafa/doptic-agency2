import React from 'react'

const AboutHero = () => {
  return (
    <section className="w-full bg-bg-light dark:bg-bg-dark relative transition-colors duration-300">
      {/* Responsive Container:
        - pt: 120px on mobile, scaling to 200px on desktop (120px gap + 80px navbar)
        - px: 20px on mobile, 30px on tablets, 75px on desktop
        - pb: 60px on mobile, 120px on desktop
      */}
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[30px] lg:px-[75px] pt-[120px] lg:pt-[200px] pb-[60px] lg:pb-[120px]">
        
        {/* Responsive Typography:
          - Size: 48px (mobile) -> 80px (tablet) -> 128px (desktop)
          - Margin Bottom: 32px (mobile) -> 64px (desktop)
        */}
        <h1 
          className="text-[#0e0e0e] dark:text-white font-medium mb-[32px] md:mb-[48px] lg:mb-[64px] w-full max-w-[1290px]"
          style={{
            fontFamily: '"Inter Variable", sans-serif',
            fontSize: 'clamp(48px, 8vw, 128px)', // Dynamically scales between 48px and 128px
            lineHeight: '1.1', // Tighter leading for large display text
            letterSpacing: '-0.04em',
          }}
        >
          About Us
        </h1>

        {/* Responsive Image:
          - Mobile: height auto to prevent squishing
          - Desktop: Fixed aspect ratio (1290/738) as requested
        */}
        <div className="w-full max-w-[1290px] overflow-hidden  shadow-sm">
          <img
            src="/images/aboutpage/AboutPageHeroImage.svg"
            alt="Team members collaborating"
            className="w-full h-auto lg:aspect-[1290/738] object-cover"
          />
        </div>

      </div>
    </section>
  )
}

export default AboutHero