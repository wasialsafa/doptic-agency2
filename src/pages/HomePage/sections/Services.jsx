import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Services = () => {
  const theme = 'light' 

  const sectionRef = useRef(null)
  const mainContentRef = useRef(null)
  const listWrapperRef = useRef(null)
  const slidesRef = useRef([])
  const itemsRef = useRef([])

  // MATH CONSTANTS
  const TOTAL_HEIGHT = 906;
  const ITEM_COUNT = 7;
  const ITEM_HEIGHT = TOTAL_HEIGHT / ITEM_COUNT; // ~129.428px
  const IMAGE_HEIGHT = ITEM_HEIGHT * 4; // ~517.71px

  const services = [
    { name: "UI/UX Design", image: "/images/servicesimage1.svg" },
    { name: "Custom Web Development", image: "/images/servicesimage2.svg" },
    { name: "Motion Graphic Design", image: "/images/servicesimage3.svg" },
    { name: "Mobile App Design", image: "/images/servicesimage4.svg" },
    { name: "Ecommerce Store Design", image: "/images/servicesimage1.svg" },
    { name: "Digital Growth Strategy", image: "/images/servicesimage2.svg" },
    { name: "Branding Design", image: "/images/servicesimage3.svg" }
  ]

  // Create a doubled array for the "Infinite" visual effect
  const displayServices = [...services, ...services]; 

  useEffect(() => {
    const ctx = gsap.context(() => {
      const activeColor = theme === 'dark' ? "#FFFFFF" : "#0E0E0E"
      const inactiveColor = "rgba(192, 192, 192, 0.6)" 
      const activeBarColor = "#FF6B35"
      
      const slides = slidesRef.current
      const items = itemsRef.current
      const listWrapper = listWrapperRef.current

      ScrollTrigger.matchMedia({
        // --------------------------------------------------------
        // DESKTOP LOGIC (>= 1024px) - Exact original code
        // --------------------------------------------------------
        "(min-width: 1024px)": function() {
            // 1. SETUP
            gsap.set(slides, { 
                zIndex: (i) => slides.length - i,
                height: "100%" 
            })

            // Set Initial States for ALL items
            items.forEach((item, i) => {
                if (!item) return;
                const text = item.querySelector('.service-text')
                const bar = item.querySelector('.orange-bar')

                if (i === 0) {
                    gsap.set(text, { color: activeColor, fontWeight: 500, opacity: 1 })
                    gsap.set(bar, { backgroundColor: activeBarColor, opacity: 1 })
                } else {
                    gsap.set(text, { color: inactiveColor, fontWeight: 400, opacity: 0.5 })
                    gsap.set(bar, { backgroundColor: inactiveColor, opacity: 0.5 })
                }
            })

            // 2. TIMELINE
            const tl = gsap.timeline({
                scrollTrigger: {
                trigger: mainContentRef.current, 
                start: "top top+=65", 
                end: () => "+=" + (window.innerHeight * 3),
                pin: sectionRef.current,
                scrub: 0.5, 
                invalidateOnRefresh: true,
                }
            })

            services.forEach((_, i) => {
                if (i === services.length - 1) return;

                const currentItem = items[i]
                const nextItem = items[i+1]
                
                const currentText = currentItem.querySelector('.service-text')
                const currentBar = currentItem.querySelector('.orange-bar')
                const nextText = nextItem.querySelector('.service-text')
                const nextBar = nextItem.querySelector('.orange-bar')
                const currentSlide = slides[i]

                tl.addLabel(`step-${i}`)
                // Move List Up
                .to(listWrapper, {
                    y: - (ITEM_HEIGHT * (i + 1)), 
                    duration: 1,
                    ease: "power2.inOut"
                }, `step-${i}`)
                // Current Item: Fade Out
                .to(currentText, { 
                    color: inactiveColor, fontWeight: 400, opacity: 0.5, duration: 1 
                }, `step-${i}`)
                .to(currentBar, { 
                    backgroundColor: inactiveColor, opacity: 0.5, duration: 1 
                }, `step-${i}`)
                // Next Item: Fade In
                .to(nextText, { 
                    color: activeColor, fontWeight: 500, opacity: 1, duration: 1 
                }, `step-${i}`)
                .to(nextBar, { 
                    backgroundColor: activeBarColor, opacity: 1, duration: 1 
                }, `step-${i}`)
                // Image Reveal
                .to(currentSlide, { 
                    height: 0, duration: 1, ease: "none" 
                }, `step-${i}`)
            })
        },

        // --------------------------------------------------------
        // MOBILE/TAB LOGIC (< 1024px) - Reset styles for static layout
        // --------------------------------------------------------
        "(max-width: 1023px)": function() {
            // Ensure all text is visible and black (active color)
            gsap.set(".service-text", { color: activeColor, fontWeight: 500, opacity: 1 });
            gsap.set(".orange-bar", { backgroundColor: inactiveColor, opacity: 0.5 });
            
            // Ensure images are reset
            gsap.set(slides, { clearProps: "all" });
            
            // Reset list position
            gsap.set(listWrapper, { y: 0, clearProps: "all" });
        }
      });

    }, sectionRef)

    return () => ctx.revert()
  }, [theme, services.length, ITEM_HEIGHT])

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen bg-[#e2e2e2] dark:bg-[#0e0e0e] transition-colors duration-300 relative overflow-hidden"
      id="services"
    >
      <div 
        // CHANGED: Added responsive padding (px-6 py-16) for mobile, kept lg:px-[75px] etc for desktop
        className="w-full lg:max-w-[1440px] mx-auto px-6 py-16 lg:px-[75px] lg:pt-[120px] lg:pb-[120px] flex flex-col box-border"
      >
        
        {/* HEADER */}
        {/* CHANGED: max-w full on mobile */}
        <div className="flex flex-col items-start gap-[12px] w-full lg:max-w-[1290px] shrink-0 mb-10 lg:mb-[64px] z-20 relative">
          <div className="font-medium text-[#0e0e0e] dark:text-gray-200 text-[14px] tracking-[2px] uppercase opacity-60">
            SERVICE
          </div>

          <h2
            className="text-[#0e0e0e] dark:text-white w-full lg:w-[1290px]"
            style={{
              // REMOVED fixed width from style, moved to class above ^
              minHeight: 'auto', // changed for mobile flexibility
              fontFamily: '"Inter Variable", "Inter", sans-serif',
              fontWeight: 500,
              // CHANGED: Responsive font size
              // fontSize: '72px', -> moved to inline style ternary or class below
            }}
          >
             {/* Using inline style for the exact desktop size, but CSS class overrides for mobile */}
             <span className="text-4xl md:text-5xl lg:text-[72px] leading-[120%] tracking-[-0.04em]">
                We make your{" "}
                <span
                  style={{
                    fontFamily: '"Libre Caslon Text", serif',
                    fontWeight: 400,
                    fontStyle: 'italic',
                  }}
                >
                  complex ideas
                </span>{" "}
                simple
                <br />
                and beautiful.
            </span>
          </h2>
        </div>

        {/* MAIN CONTENT DIV */}
        <div 
          ref={mainContentRef} 
          // CHANGED: flex-col for mobile, flex-row for desktop. h-auto for mobile.
          className="flex flex-col lg:flex-row items-start w-full lg:max-w-[1290px] gap-12 lg:gap-[80px] relative"
          // We apply the fixed height only on desktop via class, otherwise auto
          //className={`flex flex-col lg:flex-row items-start w-full lg:max-w-[1290px] gap-12 lg:gap-[80px] relative lg:h-[${TOTAL_HEIGHT}px] h-auto`}
          style={{ 
             // Apply fixed height ONLY on large screens to preserve animation logic
             height: typeof window !== 'undefined' && window.innerWidth >= 1024 ? `${TOTAL_HEIGHT}px` : 'auto' 
          }} 
        >
          {/* LEFT: Text List */}
          {/* CHANGED: w-full for mobile */}
          <div className="w-full lg:w-[690px] h-auto lg:h-full relative overflow-visible lg:overflow-hidden">
            <div 
              ref={listWrapperRef}
              className="flex flex-col w-full relative will-change-transform" 
            >
              {/* RENDER DOUBLED LIST for Infinite Loop Effect */}
              {displayServices.map((service, i) => (
                <div
                  key={i}
                  ref={(el) => (itemsRef.current[i] = el)}
                  className="flex flex-col w-full relative justify-center py-4 lg:py-0" 
                  // CHANGED: On mobile we let height be auto, on desktop we fix it
                  style={{ height: typeof window !== 'undefined' && window.innerWidth >= 1024 ? `${ITEM_HEIGHT}px` : 'auto' }} 
                >
                  <div 
                    className="service-text transition-all duration-300 whitespace-nowrap cursor-pointer text-[#0e0e0e] dark:text-white"
                    // CHANGED: Responsive font size
                    style={{ fontSize: '2.15em' }} 
                    //className="text-2xl lg:text-[2.15em]"
                  >
                    {service.name}
                  </div>
                  <div className="orange-bar w-full h-[2px] mt-[10px] origin-left bg-gray-300"></div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Images + Button */}
          {/* CHANGED: w-full for mobile, stacked at bottom */}
          <div 
            className="w-full lg:w-[520px] shrink-0 relative flex flex-col gap-10 lg:gap-[56px]"
            // On mobile height is auto, on desktop it's fixed
            style={{ height: typeof window !== 'undefined' && window.innerWidth >= 1024 ? `${IMAGE_HEIGHT + 56 + 54}px` : 'auto' }} 
          >
            <div 
              className="w-full lg:w-[520px] relative overflow-hidden shadow-2xl bg-white dark:bg-gray-800 shrink-0 h-[300px] lg:h-[517px]"
              // Replaced inline height with class ^ for responsiveness
            >
               {/* Original Images only (Stack) */}
               {services.map((service, i) => (
                <div
                  key={i}
                  ref={(el) => (slidesRef.current[i] = el)}
                  className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                >
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="w-full flex justify-start lg:justify-end">
              <button className="w-full lg:w-[210px] h-[54px] px-[24px] py-[12px] flex items-center justify-center gap-[8px] border border-[#0e0e0e66] dark:border-gray-500 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                  <span className="whitespace-nowrap font-medium text-[16px]">
                    View All Services
                  </span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Services