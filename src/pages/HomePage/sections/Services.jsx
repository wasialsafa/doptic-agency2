import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Services = () => {
  // REMOVED: const theme = 'light' (No longer needed)

  const sectionRef = useRef(null)
  const mainContentRef = useRef(null)
  const listWrapperRef = useRef(null)
  const headerRef = useRef(null)
  const slidesRef = useRef([])
  const itemsRef = useRef([])

  // MATH CONSTANTS
  const TOTAL_HEIGHT = 906;
  const ITEM_COUNT = 7;
  const ITEM_HEIGHT = TOTAL_HEIGHT / ITEM_COUNT; 
  const IMAGE_HEIGHT = ITEM_HEIGHT * 4; 

  const services = [
    { name: "UI/UX Design", image: "/images/servicesimage1.svg" },
    { name: "Custom Web Development", image: "/images/servicesimage2.svg" },
    { name: "Motion Graphic Design", image: "/images/servicesimage3.svg" },
    { name: "Mobile App Design", image: "/images/servicesimage4.svg" },
    { name: "Ecommerce Store Design", image: "/images/servicesimage1.svg" },
    { name: "Digital Growth Strategy", image: "/images/servicesimage2.svg" },
    { name: "Branding Design", image: "/images/servicesimage3.svg" }
  ]

  const displayServices = services; 

  useEffect(() => {
    const ctx = gsap.context(() => {
      // CHANGED: Use CSS Variables instead of hardcoded Hex codes
      const activeColor = "var(--active-color)"
      const inactiveColor = "var(--inactive-color)"
      const activeBarColor = "#FF6B35"
      
      const slides = slidesRef.current
      const items = itemsRef.current
      const listWrapper = listWrapperRef.current

      // 1. HEADER ANIMATION
      gsap.from(headerRef.current.children, {
        y: 50, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none reverse" }
      });

      // 2. SCROLL LOGIC
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function() {
            gsap.set(slides, { zIndex: (i) => slides.length - i, height: "100%" })

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: mainContentRef.current, 
                    start: "top top+=65", 
                    end: () => "+=" + (window.innerHeight * 3),
                    pin: sectionRef.current,
                    scrub: 0.4, 
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const progress = self.progress * (services.length - 1);
                        
                        items.forEach((item, i) => {
                            if (!item) return;
                            const text = item.querySelector('.service-text');
                            const bar = item.querySelector('.orange-bar');
                            
                            const distance = Math.abs(i - progress);
                            const opacity = Math.max(0.5, 1 - (distance * 0.2));
                            const isActive = distance < 0.5;

                            // --- TYPOGRAPHY ANIMATION ---
                            gsap.to(text, { 
                                opacity: opacity, 
                                fontSize: isActive ? "48px" : "40px",
                                fontWeight: isActive ? 500 : 400,
                                // CHANGED: Now uses the CSS variable which auto-switches
                                color: isActive ? activeColor : inactiveColor,
                                duration: 0.2,
                                overwrite: 'auto'
                            });
                            
                            gsap.to(bar, {
                                opacity: opacity,
                                height: isActive ? "1.5px" : "0.5px",
                                backgroundColor: isActive ? activeBarColor : "rgba(192, 192, 192, 0.2)",
                                duration: 0.2,
                                overwrite: 'auto'
                            });
                        });
                    }
                }
            })

            services.forEach((_, i) => {
                if (i === services.length - 1) return;
                tl.to(listWrapper, { y: -(ITEM_HEIGHT * (i + 1)), duration: 1, ease: "none" }, i)
                  .to(slides[i], { height: 0, duration: 1, ease: "none" }, i)
            })
        },

        "(max-width: 1023px)": function() {
            // Mobile Fallbacks - utilizing the same variables
            gsap.set(".service-text", { color: activeColor, fontWeight: 500, opacity: 1, fontSize: "24px" });
            gsap.set(".orange-bar", { backgroundColor: inactiveColor, opacity: 0.5, height: "1px" });
            gsap.set(slides, { clearProps: "all" });
            gsap.set(listWrapper, { y: 0, clearProps: "all" });
        }
      });

    }, sectionRef)

    return () => ctx.revert()
  }, [services.length, ITEM_HEIGHT]) // Removed 'theme' from dependency array

  return (
    <section
      ref={sectionRef}
      id="services"
      // CHANGED: Added CSS Variable definitions in the className
      // [--active-color:#0E0E0E] defines black for light mode
      // dark:[--active-color:#FFFFFF] defines white for dark mode
      className="
        w-full min-h-screen relative overflow-hidden flex flex-col justify-center
        bg-bg-light dark:bg-bg-dark transition-colors duration-300
        [--active-color:#0E0E0E] dark:[--active-color:#FFFFFF]
        [--inactive-color:rgba(160,160,160,0.3)] dark:[--inactive-color:rgba(255,255,255,0.3)]
      "
    >
      <div className="w-full lg:max-w-[1440px] mx-auto px-6 py-12 md:py-16 lg:px-[75px] lg:pt-[200px] lg:pb-[120px] flex flex-col box-border">
        
        {/* HEADER */}
        <div ref={headerRef} className="flex flex-col items-start gap-[12px] w-full lg:max-w-[1290px] shrink-0 mb-8 md:mb-10 lg:mb-[64px] z-20 relative">
          <div className="font-medium text-[#0e0e0e] dark:text-gray-200 text-[12px] md:text-[14px] tracking-[2px] uppercase opacity-60">
            SERVICE
          </div>
          <h2 className="text-[#0e0e0e] dark:text-white w-full lg:w-[1290px] font-medium">
            <span className="block text-[32px] md:text-5xl lg:text-[72px] leading-[120%] tracking-[-0.04em] font-medium" style={{ fontFamily: "'Inter Variable', sans-serif" }}>
              We make your{" "}
              <span className="italic font-normal" style={{ fontFamily: "'Libre Caslon Text', serif" }}>complex ideas</span>{" "}
              simple <br className="hidden md:block" /> and beautiful.
            </span>
          </h2>
        </div>

        {/* MAIN CONTENT DIV */}
        <div ref={mainContentRef} className="flex flex-col-reverse lg:flex-row items-start w-full lg:max-w-[1290px] gap-8 md:gap-12 lg:gap-[80px] relative" style={{ height: typeof window !== 'undefined' && window.innerWidth >= 1024 ? `${TOTAL_HEIGHT}px` : 'auto' }}>
          
          {/* LEFT: Text List */}
          <div className="w-full lg:w-[690px] h-auto lg:h-full relative overflow-visible lg:overflow-hidden">
            <div ref={listWrapperRef} className="flex flex-col w-full relative will-change-transform">
              {displayServices.map((service, i) => (
                <div
                  key={i}
                  ref={(el) => (itemsRef.current[i] = el)}
                  className="flex flex-col w-full relative justify-center py-3 md:py-4 lg:py-0"
                  style={{ height: typeof window !== 'undefined' && window.innerWidth >= 1024 ? `${ITEM_HEIGHT}px` : 'auto' }} 
                >
                  <div 
                    className="service-text transition-all duration-300 whitespace-nowrap cursor-pointer origin-left text-2xl md:text-4xl lg:text-[40px]"
                    style={{ 
                        fontFamily: "'Inter Variable', sans-serif",
                        lineHeight: "120%",
                        letterSpacing: "-0.04em"
                    }}
                  >
                    {service.name}
                  </div>
                  <div className="orange-bar w-full h-[0.5px] mt-[10px] origin-left bg-gray-300 opacity-20"></div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Images + Button */}
          <div className="w-full lg:w-[520px] shrink-0 relative flex flex-col gap-6 md:gap-10 lg:gap-[56px]" style={{ height: typeof window !== 'undefined' && window.innerWidth >= 1024 ? `${IMAGE_HEIGHT + 56 + 54}px` : 'auto' }}>
            <div className="w-full lg:w-[520px] relative overflow-hidden shadow-2xl bg-white dark:bg-gray-800 shrink-0 h-[220px] md:h-[350px] lg:h-[517px] rounded-lg lg:rounded-none">
               {services.map((service, i) => (
                <div key={i} ref={(el) => (slidesRef.current[i] = el)} className="absolute top-0 left-0 w-full h-full bg-cover bg-center">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="w-full flex justify-start lg:justify-end">
              <button className="w-full lg:w-[210px] h-[48px] md:h-[54px] px-[24px] py-[12px] flex items-center justify-center gap-[8px] border border-[#0e0e0e66] dark:border-gray-500 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all rounded-md lg:rounded-none">
                  <span className="whitespace-nowrap font-medium text-[14px] md:text-[16px]">View All Services</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services