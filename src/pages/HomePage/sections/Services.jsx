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

  // MATH CONSTANTS (Strictly preserved from your code)
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

  // Doubled array for visual continuity
  const displayServices = [...services, ...services]; 

  useEffect(() => {
    const ctx = gsap.context(() => {
      const activeColor = theme === 'dark' ? "#FFFFFF" : "#0E0E0E"
      const inactiveColor = "rgba(160, 160, 160, 0.3)" // Faded for distant items
      const activeBarColor = "#FF6B35"
      
      const slides = slidesRef.current
      const items = itemsRef.current
      const listWrapper = listWrapperRef.current

      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function() {
            // 1. SETUP
            gsap.set(slides, { 
                zIndex: (i) => slides.length - i,
                height: "100%" 
            })

            // 2. TIMELINE with Distance-Based Logic
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: mainContentRef.current, 
                    start: "top top+=65", 
                    end: () => "+=" + (window.innerHeight * 3),
                    pin: sectionRef.current,
                    scrub: 0.4, // Snappier response
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        // Calculate which index is currently in the "Focus Slot" (Slot 2)
                        const progress = self.progress * (services.length - 1);
                        
                        items.forEach((item, i) => {
                            if (!item) return;
                            const text = item.querySelector('.service-text');
                            const bar = item.querySelector('.orange-bar');
                            
                            // Distance from the active scroll point
                            const distance = Math.abs(i - progress);
                            
                            // Slot-based opacity: Focused item is 1, neighbors are lower
                            const opacity = Math.max(0.5, 1 - (distance * 0.2));
                            const scale = Math.max(0.9, 1 - (distance * 0.05));

                            gsap.to(text, { 
                                opacity: opacity, 
                                scale: scale,
                                color: distance < 0.5 ? activeColor : inactiveColor,
                                fontWeight: distance < 0.5 ? 500 : 400,
                                duration: 0.2,
                                overwrite: 'auto'
                            });
                            
                            gsap.to(bar, {
                                opacity: opacity,
                                height: distance < 0.5 ? "1.5px" : "0.5px", // Thinner lines
                                backgroundColor: distance < 0.5 ? activeBarColor : "rgba(192, 192, 192, 0.2)",
                                duration: 0.2,
                                overwrite: 'auto'
                            });
                        });
                    }
                }
            })

            // 3. Coordinate List and Image transitions
            services.forEach((_, i) => {
                if (i === services.length - 1) return;

                const currentSlide = slides[i]

                tl.to(listWrapper, {
                    y: -(ITEM_HEIGHT * (i + 1)), 
                    duration: 1,
                    ease: "none"
                }, i)
                .to(currentSlide, { 
                    height: 0, 
                    duration: 1, 
                    ease: "none" 
                }, i)
            })
        },

        "(max-width: 1023px)": function() {
            gsap.set(".service-text", { color: activeColor, fontWeight: 500, opacity: 1, scale: 1 });
            gsap.set(".orange-bar", { backgroundColor: inactiveColor, opacity: 0.5, height: "1px" });
            gsap.set(slides, { clearProps: "all" });
            gsap.set(listWrapper, { y: 0, clearProps: "all" });
        }
      });

    }, sectionRef)

    return () => ctx.revert()
  }, [theme, services.length, ITEM_HEIGHT])

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300 relative overflow-hidden flex flex-col justify-center"
      id="services"
    >
      <div className="w-full lg:max-w-[1440px] mx-auto px-6 py-12 md:py-16 lg:px-[75px] lg:pt-[200px] lg:pb-[120px] flex flex-col box-border">
        
        {/* HEADER */}
        <div className="flex flex-col items-start gap-[12px] w-full lg:max-w-[1290px] shrink-0 mb-8 md:mb-10 lg:mb-[64px] z-20 relative">
          <div className="font-medium text-[#0e0e0e] dark:text-gray-200 text-[12px] md:text-[14px] tracking-[2px] uppercase opacity-60">
            SERVICE
          </div>

          <h2 className="text-[#0e0e0e] dark:text-white w-full lg:w-[1290px] font-medium">
            <span 
              className="block text-[32px] md:text-5xl lg:text-[72px] leading-[120%] tracking-[-0.04em] font-medium"
              style={{ fontFamily: "'Inter Variable', sans-serif" }}
            >
              We make your{" "}
              <span 
                className="italic font-normal"
                style={{ fontFamily: "'Libre Caslon Text', serif" }}
              >
                complex ideas
              </span>{" "}
              simple <br className="hidden md:block" /> and beautiful.
            </span>
          </h2>
        </div>

        {/* MAIN CONTENT DIV */}
        <div 
          ref={mainContentRef} 
          className="flex flex-col-reverse lg:flex-row items-start w-full lg:max-w-[1290px] gap-8 md:gap-12 lg:gap-[80px] relative"
          style={{ 
             height: typeof window !== 'undefined' && window.innerWidth >= 1024 ? `${TOTAL_HEIGHT}px` : 'auto' 
          }} 
        >
          {/* LEFT: Text List */}
          <div className="w-full lg:w-[690px] h-auto lg:h-full relative overflow-visible lg:overflow-hidden">
            <div 
              ref={listWrapperRef}
              className="flex flex-col w-full relative will-change-transform" 
            >
              {displayServices.map((service, i) => (
                <div
                  key={i}
                  ref={(el) => (itemsRef.current[i] = el)}
                  // Added conditional classes: 
                  // 1. Hide the duplicate items (index >= 7) on mobile so the list isn't huge.
                  // 2. Adjust padding and sizing for mobile.
                  className={`flex-col w-full relative justify-center py-3 md:py-4 lg:py-0 ${i >= services.length ? 'hidden lg:flex' : 'flex'}`} 
                  style={{ height: typeof window !== 'undefined' && window.innerWidth >= 1024 ? `${ITEM_HEIGHT}px` : 'auto' }} 
                >
                  <div 
                    className="service-text transition-all duration-300 whitespace-nowrap cursor-pointer text-[#0e0e0e] dark:text-white origin-left text-2xl md:text-4xl lg:text-[2.5em]"
                  >
                    {service.name}
                  </div>
                  <div className="orange-bar w-full h-[0.5px] mt-[10px] origin-left bg-gray-300 opacity-20"></div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Images + Button */}
          <div 
            className="w-full lg:w-[520px] shrink-0 relative flex flex-col gap-6 md:gap-10 lg:gap-[56px]"
            style={{ height: typeof window !== 'undefined' && window.innerWidth >= 1024 ? `${IMAGE_HEIGHT + 56 + 54}px` : 'auto' }} 
          >
            {/* Image Container: Adjusted height for mobile to maintain aspect ratio */}
            <div className="w-full lg:w-[520px] relative overflow-hidden shadow-2xl bg-white dark:bg-gray-800 shrink-0 h-[220px] md:h-[350px] lg:h-[517px] rounded-lg lg:rounded-none">
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
              <button className="w-full lg:w-[210px] h-[48px] md:h-[54px] px-[24px] py-[12px] flex items-center justify-center gap-[8px] border border-[#0e0e0e66] dark:border-gray-500 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all rounded-md lg:rounded-none">
                  <span className="whitespace-nowrap font-medium text-[14px] md:text-[16px]">
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