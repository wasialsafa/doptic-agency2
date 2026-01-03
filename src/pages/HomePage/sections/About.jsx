import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
    const aboutRef = useRef(null)
    const statementRef = useRef(null)
    const imageRef = useRef(null)
    const marqueeRef = useRef(null)      
    const marqueeInnerRef = useRef(null) 

    const FONT_INTER = 'Inter Variable, sans-serif'
    const FONT_CASLON = 'Libre Caslon Text, serif'

    // =========================================
    // HELPER: Split text into words for animation
    // Fixed: Removes margin from the last word to save space
    // =========================================
    const renderWords = (text, className = "") => {
        const words = text.split(" ");
        return words.map((word, index) => (
            <span 
                key={index} 
                className={`word-anim inline-block will-change-transform ${className}`}
                style={{ 
                    opacity: 0,
                    // Only add right margin if it's NOT the last word in this segment
                    marginRight: index === words.length - 1 ? '0' : '0.2em' 
                }}
            >
                {word}
            </span>
        ));
    };

    useEffect(() => {
        const marqueeInner = marqueeInnerRef.current

        let ctx = gsap.context(() => {
            const images = ['#about-img-1', '#about-img-2', '#about-img-3']
            const fadeDuration = 1
            const holdDuration = 1

            // =========================================
            // 1. SCRAMBLE / DECODE TEXT ANIMATION
            // =========================================
            const words = statementRef.current.querySelectorAll('.word-anim');

            gsap.fromTo(words, 
                { 
                    opacity: 0, 
                    y: 20, 
                    scale: 1.1,     // Reduced scale slightly for cleaner start
                    filter: "blur(10px)", 
                    rotationX: 45   // Reduced rotation for smoother flip
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    rotationX: 0,
                    duration: 0.8,
                    stagger: 0.04,  // Slightly faster stagger
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: statementRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    }
                }
            );

            // =========================================
            // 2. Marquee Infinite Scroll
            // =========================================
            gsap.to(marqueeInner, {
                xPercent: -50, 
                duration: 20, 
                ease: 'none',
                repeat: -1,
            })

            // =========================================
            // 3. Image Cross-Fade Loop
            // =========================================
            const tl = gsap.timeline({ repeat: -1 })
            tl.to(images[1], { opacity: 1, duration: fadeDuration }, `+=${holdDuration}`)
              .to(images[0], { opacity: 0, duration: fadeDuration }, "<")
              .to(images[2], { opacity: 1, duration: fadeDuration }, `+=${holdDuration}`)
              .to(images[1], { opacity: 0, duration: fadeDuration }, "<")
              .to(images[0], { opacity: 1, duration: fadeDuration }, `+=${holdDuration}`)
              .to(images[2], { opacity: 0, duration: fadeDuration }, "<")

        }, aboutRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={aboutRef}
            id="about"
            className="relative min-h-screen overflow-hidden bg-bg-light dark:bg-bg-dark py-[80px] md:py-[120px] transition-colors duration-300 flex items-center justify-center"
        >
            {/* =========================================
                MARQUEE BANNER
               ========================================= */}
            <div 
                ref={marqueeRef}
                className="pointer-events-none absolute z-0 flex items-center overflow-hidden"
                style={{ 
                    width: '3314px', 
                    height: '100px',
                    left: '-50%', 
                    top: '65%', 
                    transform: 'translateY(-50%) rotate(-8deg)', 
                    backgroundColor: '#FF4920',
                    borderWidth: '1px', 
                }}
            >
                <div
                    ref={marqueeInnerRef}
                    className="flex whitespace-nowrap will-change-transform"
                >
                    {[...Array(30)].map((_, i) => (
                        <div key={i} className="flex items-center">
                            <span
                                className="mx-6 text-[32px] md:text-[40px] font-normal text-white"
                                style={{ fontFamily: 'Italiana, serif' }}
                            >
                                About us
                            </span>
                            <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* =========================================
                CONTENT CONTAINER
               ========================================= */}
            <div className="relative z-10 w-full max-w-[1290px] mx-auto px-5 lg:px-0 flex flex-col items-center">
                
                {/* HEADLINE CONTAINER
                   Fixed: w-full lg:max-w-[1070px] ensures strict width constraint
                */}
                <div className="w-full lg:max-w-[1200px] text-center mb-[30px] md:mb-[50px] px-4 mx-auto">
                    <h2
                        ref={statementRef}
                        className="text-[36px] md:text-[52px] lg:text-[71px] font-medium leading-[1.2] tracking-[-0.04em] text-text-dark dark:text-text-light"
                        style={{ fontFamily: FONT_INTER }}
                    >
                        {/* Part 1: Normal Text */}
                        {renderWords("Turning ambitious ideas into high-impact digital reality ")}
                        
                        {/* Part 2: Italic Text (Libre Caslon Text) */}
                        <span
                            className="italic font-normal inline-block"
                            style={{ 
                                fontFamily: FONT_CASLON,
                                letterSpacing: '-0.04em',
                                marginLeft: '0.2em'
                            }}
                        >
                            {renderWords("through expert craft,")}
                        </span>
                        
                        {/* Part 3: Normal Text */}
                        <span style={{ marginLeft: '0.2em' }}>
                            {renderWords("clarity, and collaboration.")}
                        </span>
                    </h2>
                </div>

                {/* IMAGE CONTAINER */}
                <div ref={imageRef} className="relative z-20 w-full flex justify-center">
                    <div className="
                        relative 
                        w-full 
                        max-w-[260px]      
                        sm:max-w-[320px]   
                        md:max-w-[380px]   
                        lg:max-w-[410px]   
                        aspect-[410/520] 
                        overflow-hidden 
                        shadow-2xl 
                        mx-auto 
                        bg-gray-200"
                    >
                        <img
                            id="about-img-1"
                            src="/images/aboutusimage1.svg"
                            alt="About us 1"
                            className="absolute inset-0 h-full w-full object-cover"
                            style={{ opacity: 1 }}
                        />
                        <img
                            id="about-img-2"
                            src="/images/aboutusimage2.svg"
                            alt="About us 2"
                            className="absolute inset-0 h-full w-full object-cover"
                            style={{ opacity: 0 }}
                        />
                        <img
                            id="about-img-3"
                            src="/images/aboutusimage1.svg" 
                            alt="About us 3"
                            className="absolute inset-0 h-full w-full object-cover"
                            style={{ opacity: 0 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-lime-500/20" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About