import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '../components/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const heroRef = useRef(null)
  const [displayedText, setDisplayedText] = useState('')
  const fullText = 'An agency defining style and digital culture.'

  useEffect(() => {
    let ctx = gsap.context(() => {
      setDisplayedText('')

      // --- Initial Load Animation ---
      gsap.set(['#hero-bottom-left', '#hero-image-container', '#hero-circular-badge'],
        { opacity: 0, x: 0 })

      let tlInitial = gsap.timeline();
      const textObj = { value: 0 }
      const firstPart = 'An agency defining style and '
      const secondPart = 'digital culture.'

      tlInitial.to(textObj, {
        value: firstPart.length, duration: firstPart.length * 0.05,
        onUpdate: function() { setDisplayedText(fullText.slice(0, Math.floor(textObj.value))) },
        ease: 'none'
      })
      .to(textObj, {
        value: fullText.length, duration: secondPart.length * 0.1,
        onUpdate: function() { setDisplayedText(fullText.slice(0, Math.floor(textObj.value))) },
        ease: 'power1.inOut',
      })
      .fromTo('#hero-bottom-left',
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 2, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo('#hero-image-container',
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 2, ease: 'power3.out' },
        '<0.5' 
      )
      .fromTo('#hero-circular-badge',
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
        '>-1'
      );

      // --- Scroll Trigger Animation ---
      let mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const imageContainer = document.querySelector('#hero-image-container');
        const bottomRow = document.querySelector('#hero-bottom');
        const topText = document.querySelector('#hero-top');
        const innerImageDiv = document.querySelector('#hero-image-container .image-container');
        
        if (!imageContainer || !bottomRow || !topText || !innerImageDiv) return;

        const bottomRect = bottomRow.getBoundingClientRect();
        const innerRect = innerImageDiv.getBoundingClientRect();

        const targetWidth = bottomRect.width;
        const targetHeight = bottomRect.height;
        const scaleX = targetWidth / innerRect.width;
        const scaleY = targetHeight / innerRect.height;
        const targetScale = Math.max(scaleX, scaleY);

        const moveUpDistanceTop = -topText.offsetHeight - 50;
        const moveLeftDistanceBottom = -window.innerWidth * 0.7;
        const SCROLL_DISTANCE = window.innerHeight * 1.5; 

        let tlDesktop = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: `+=${SCROLL_DISTANCE}`,
            pin: true, 
            scrub: 1,
          }
        });

        tlDesktop
          .to('#hero-top', { y: moveUpDistanceTop, duration: 1.0, ease: 'power2.inOut' }, 0) 
          .to('#hero-bottom-left', { x: moveLeftDistanceBottom, opacity: 0, duration: 1.0, ease: 'power2.inOut' }, 0) 
          .set(innerImageDiv, { transformOrigin: '100% 100%' }, 0) 
          .to(innerImageDiv, { scale: targetScale, duration: 1.0, ease: 'power2.inOut' }, 0)
          .to('#hero-circular-badge', { opacity: 0, scale: 0.5, duration: 0.5, ease: 'power1.out' }, 0); 
      });

      mm.add("(max-width: 1023px)", () => {
        const box = document.querySelector('#hero-image-container');
        if (!box) return;
        const rect = box.getBoundingClientRect();
        const targetCenterY = (window.innerHeight / 2);
        const centerX = (window.innerWidth / 2) - (rect.left + rect.width / 2);
        const centerY = targetCenterY - (rect.top + rect.height / 2);
        const SCROLL_DISTANCE = window.innerHeight * 1.2; 

        let tlMobile = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: `+=${SCROLL_DISTANCE}`,
            pin: true,
            scrub: 1,
            markers: false
          }
        });

        tlMobile.to('#hero-image-container', { x: centerX, y: centerY, duration: 0.5, ease: 'power1.in' }, 0)
          .to('#hero-top', { opacity: 0, y: -window.innerHeight * 0.3, duration: 0.5, ease: 'power1.in' }, 0.5)
          .to('#hero-bottom-left', { opacity: 0, y: -window.innerHeight * 0.3, duration: 0.5, ease: 'power1.in' }, 0.5)
          .to('#hero-image-container', { opacity: 0, scale: 0.8, duration: 0.5, ease: 'power1.out' }, 1.0);
      });

      ScrollTrigger.refresh(true);
    }, heroRef);

    return () => ctx.revert(); 
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero-section"
      /* pt-[200px]: 
         - The Navbar is fixed (80px height).
         - This padding pushes the content down 200px from the top of the viewport.
         - The visual gap between the Navbar bottom (80px) and content (200px) is exactly 120px.
      */
      className="w-full bg-bg-light dark:bg-bg-dark pt-[200px] pb-20 relative overflow-hidden min-h-screen transition-colors duration-300"
    >
      {/* PIXEL PERFECT CONTAINER:
         - max-w-[1290px]: This is the EXACT width of your content grid (1440 - 75 - 75).
         - mx-auto: This calculates the margins automatically. 
         - On a 1440px screen, the margins will naturally be 75px.
         - On a 26" screen, the margins will be larger, but the content stays 1290px.
      */}
      <div className="w-full max-w-[1290px] mx-auto">
        
        {/* Top Div: Big Text. 200px gap below to the next section */}
        <div id="hero-top" className="mb-[200px] will-change-transform">
          <h1 id="hero-headline"
            className="leading-[1.2] text-[#0e0e0e] dark:text-[#e2e2e2] text-4xl md:text-6xl lg:text-[96px]"
            style={{ letterSpacing: '-4%' }}>
            {displayedText.split(' ').map((word, index) => {
              const isLastPart = word.includes('digital') || word.includes('culture')
              return (
                <span key={index}>
                  {word.includes('digital') && <br className="hidden lg:block" />}
                  <span
                    className={isLastPart ? 'font-serif italic' : ''}
                    style={isLastPart ? {
                      fontFamily: 'Libre Caslon Text',
                      fontWeight: 400,
                      fontSize: '0.8em',
                      fontStyle: 'italic',
                    } : {
                      fontFamily: 'Inter Variable',
                      fontWeight: 500,
                    }}
                  >
                    {word}{' '}
                  </span>
                </span>
              )
            })}
          </h1>
        </div>

        {/* Bottom Row Grid:
           Left (520px) + Gap (140px) + Right (630px) = 1290px Total
           This matches the max-w-[1290px] container perfectly.
        */}
        <div id="hero-bottom" className="flex flex-col lg:flex-row gap-[140px] items-start">
          
          {/* Left Column: Exact width 520px */}
          <div id="hero-bottom-left" className="w-full lg:w-[520px] will-change-transform">
            <p id="hero-subtext"
              className="text-base md:text-xl text-gray-700 dark:text-[#e2e2e2b2] mb-[56px]">
             
            </p>
            <div id="hero-cta">
              <MagneticButton className="bg-primary-orange text-white px-8 py-4 text-lg font-medium hover:bg-opacity-90 transition-all">
                View Our Work
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Exact width 630px */}
          <div id="hero-bottom-right" className="w-full lg:w-[630px] flex justify-end">
            <div
              id="hero-image-container"
              /* Matches exactly the 630x352 box in your Figma screenshot */
              className="relative w-full lg:w-[630px] lg:h-[352px] will-change-transform"
            >
              <div className="image-container rounded-3xl overflow-hidden shadow-2xl w-full h-full">
                <img
                  src="/images/homepageImage.svg"
                  alt="Agency work showcase"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero