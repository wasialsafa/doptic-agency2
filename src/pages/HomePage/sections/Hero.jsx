import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '../../../components/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const heroRef = useRef(null)
    const bottomRowRef = useRef(null)
    const topTextRef = useRef(null)
    const imageContainerRef = useRef(null)
    const innerImageRef = useRef(null)
    const bottomLeftRef = useRef(null)
    const badgeRef = useRef(null)
    const scrollIconRef = useRef(null)
    
    const [displayedText, setDisplayedText] = useState('')
    const fullText = 'An agency defining style and digital culture.'

    useEffect(() => {
        if (!heroRef.current) return

        let ctx = gsap.context(() => {
            setDisplayedText('')

            // =========================================
            // 1. Initial Load Animation
            // =========================================
            gsap.set([bottomLeftRef.current, imageContainerRef.current, badgeRef.current, scrollIconRef.current],
                { opacity: 0, x: 0 })

            let tlInitial = gsap.timeline()
            const textObj = { value: 0 }
            const firstPart = 'An agency defining style and '
            const secondPart = 'digital culture.'

            tlInitial.to(textObj, {
                value: firstPart.length, 
                duration: firstPart.length * 0.05,
                onUpdate: () => setDisplayedText(fullText.slice(0, Math.floor(textObj.value))),
                ease: 'none'
            })
            .to(textObj, {
                value: fullText.length, 
                duration: secondPart.length * 0.1,
                onUpdate: () => setDisplayedText(fullText.slice(0, Math.floor(textObj.value))),
                ease: 'power1.inOut',
            })
            .fromTo(bottomLeftRef.current,
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.5')
            .fromTo(imageContainerRef.current,
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '<0.2')
            .fromTo(badgeRef.current,
                { opacity: 0, scale: 0.5 },
                { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }, '>-1')
            .fromTo(scrollIconRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }, '<0.2')

            gsap.to(scrollIconRef.current, {
                rotation: 360,
                duration: 8,
                ease: 'none',
                repeat: -1
            })

            // =========================================
            // 2. Scroll Trigger Animation
            // =========================================
            let mm = gsap.matchMedia()

            // --- DESKTOP (Width >= 1024px) ---
            mm.add("(min-width: 1024px)", () => {
                if (!bottomRowRef.current || !topTextRef.current || !innerImageRef.current) return

                const innerRect = innerImageRef.current.getBoundingClientRect()
                // Target Width: 1290px container means 150px total margin (75px each side)
                const targetWidth = window.innerWidth - 150 
                const targetScale = targetWidth / innerRect.width

                const innerImageCenterY = innerRect.top + innerRect.height / 2
                // We want to center it 50px from top + half its new height
                const targetCenterY = 50 + (innerRect.height * targetScale / 2) 
                
                const moveUpDistance = -window.innerHeight * 1.2

                let tlDesktop = gsap.timeline({
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: `+=${window.innerHeight * 1.5}`,
                        pin: true, 
                        scrub: 1, 
                    }
                })

                tlDesktop
                    .to(topTextRef.current, { y: moveUpDistance, duration: 0.7, ease: 'power1.in' }, 0)
                    .to(bottomLeftRef.current, { y: moveUpDistance, duration: 0.7, ease: 'power1.in' }, 0)
                    .set(innerImageRef.current, { transformOrigin: 'center center' }, 0)
                    .to(innerImageRef.current, {
                        scale: targetScale,
                        // Move X to center of screen
                        x: (window.innerWidth / 2) - (innerRect.left + innerRect.width / 2),
                        y: targetCenterY - innerImageCenterY,
                        duration: 1,
                        ease: 'power1.inOut',
                    }, 0)
            })

            // --- MOBILE / TABLET (Width < 1024px) ---
            mm.add("(max-width: 1023px)", () => {
                if (!imageContainerRef.current) return

                let tlMobile = gsap.timeline({
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: `+=${window.innerHeight * 1.5}`, // Longer scroll distance
                        pin: true, 
                        scrub: 0.5 
                    }
                })
                
                // 1. Top Text moves UP and fades out
                tlMobile.to(topTextRef.current, { 
                    y: -window.innerHeight * 0.5, 
                    opacity: 0, 
                    duration: 1, 
                    ease: "power1.in" 
                }, 0)

                // 2. Image stays pinned (slightly scales)
                .to(imageContainerRef.current, {
                    scale: 1.05,
                    duration: 1
                }, 0)

                // 3. Bottom Text/Button moves UP past the image
                // FIX: We use 'fromTo' to force opacity: 1 at start, and delay the fade out
                .fromTo(bottomLeftRef.current, 
                    { y: 0, opacity: 1 },
                    { 
                        y: -window.innerHeight, 
                        opacity: 1, // Keep it visible longer
                        duration: 1.5, 
                        ease: "power1.in",
                        onComplete: () => gsap.to(bottomLeftRef.current, { opacity: 0, duration: 0.2 }) // Quick fade at very end
                    }, 
                    0.1 // Slight delay so it follows the top text
                )
            })

            ScrollTrigger.refresh(true)
        }, heroRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={heroRef}
            id="hero-section"
            /* Padding: Mobile 120px / Desktop 200px */
            className="w-full bg-bg-light dark:bg-bg-dark pt-[120px] lg:pt-[200px] pb-20 relative min-h-screen transition-colors duration-300 overflow-hidden"
        >
            <div className="w-full max-w-[1290px] mx-auto px-5 lg:px-0 relative">
                
                {/* Scroll Icon: Z-Index 50 to stay above everything */}
                <div 
                    ref={scrollIconRef} 
                    className="absolute top-0 right-0 pointer-events-none will-change-transform z-50" 
                >
                    <img src="/logos/award.svg" alt="Scroll down" className="w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28" />
                </div>

                {/* Top Row: Big Text - Z-Index 20 */}
                <div ref={topTextRef} className="mb-12 lg:mb-[200px] will-change-transform relative z-20">
                    <h1 className="text-[#0e0e0e] dark:text-[#e2e2e2] text-4xl md:text-6xl lg:text-[96px] xl:text-[96px]"
                        style={{ fontFamily: 'Inter Variable, sans-serif', fontWeight: 500, lineHeight: '120%', letterSpacing: '-0.04em' }}>
                        {displayedText.split(' ').map((word, index) => {
                            const isLastPart = word.includes('digital') || word.includes('culture')
                            const shouldBreak = word.includes('style')
                            return (
                                <span key={index}>
                                    {shouldBreak && <br className="hidden lg:block" />}
                                    <span className={isLastPart ? 'font-serif italic' : ''}
                                        style={isLastPart ? { fontFamily: 'Libre Caslon Text, serif', fontWeight: 400, fontSize: '0.86em', fontStyle: 'italic' } 
                                        : { fontFamily: 'Inter Variable, sans-serif', fontWeight: 500 }}>
                                        {word}{' '}
                                    </span>
                                </span>
                            )
                        })}
                    </h1>
                </div>

                {/* Bottom Row Wrapper 
                    Mobile: flex-col-reverse (Image on top, Text on bottom)
                    Desktop: flex-row (Text left, Image right)
                */}
                <div ref={bottomRowRef} className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-[140px] items-start relative">
                    
                    {/* Bottom Left: Text & Button */}
                    {/* Z-Index 30: Higher than image so it scrolls OVER it */}
                    <div ref={bottomLeftRef} className="w-full lg:w-[520px] lg:min-w-[520px] will-change-transform z-30 relative">
                        <p className="text-base md:text-xl text-gray-700 dark:text-[#e2e2e2b2] mb-8 lg:mb-[56px]" 
                           style={{ fontFamily: 'Inter Variable, sans-serif', fontWeight: 400, lineHeight: '150%' }}>
                            We create clean designs that turn visitors into paying clients. You
                            get a professional look that makes selling your services very easy.
                        </p>
                        <div>
                            <MagneticButton className="bg-primary-orange text-white px-8 py-4 text-lg font-medium hover:bg-opacity-90 transition-all">
                                View Our Work
                            </MagneticButton>
                        </div>
                    </div>

                    {/* Bottom Right: Image */}
                    {/* Z-Index 10: Lower than text so it stays behind when text overlaps */}
                    <div className="w-full lg:w-[630px] flex justify-end items-center z-10 relative">
                        <div ref={imageContainerRef} className="relative w-full aspect-video lg:w-[630px] lg:h-[352px] will-change-transform">
                            <div ref={innerImageRef} className="image-container  overflow-hidden shadow-2xl w-full h-full">
                                <img src="/images/homepageImage.svg" alt="Agency work showcase" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={badgeRef}></div>
            </div>
        </section>
    )
}

export default Hero