import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '../../../components/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

// === HELPER COMPONENT FOR TYPEWRITER EFFECT ===
const SplitText = ({ text, className, style }) => {
  if (!text) return null;
  return (
    <span className={className} style={style}>
      {text.split('').map((char, i) => (
        <span key={i} className="char inline-block opacity-0">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

const Projects = () => {
  const componentRef = useRef(null)
  const trackRef = useRef(null)
  const progressBarRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(1)

  const projects = [
    {
      id: 1,
      label: 'PROJECT 01',
      title: 'Redefining Urban',
      titleHighlight: 'Fashion',
      description: 'We transformed a local label into a global brand. Our strategic design increased conversion rates and customer loyalty instantly.',
      image: '/images/projectsimage1.svg',
    },
    {
      id: 2,
      label: 'PROJECT 02',
      title: 'Scaling Enterprise',
      titleHighlight: 'SaaS',
      description: 'A robust dashboard redesign for Optixmn that improves user workflow and visualizes complex data clearly.',
      image: '/images/projectsimage2.svg',
    },
    {
      id: 3,
      label: 'PROJECT 03',
      title: 'Modern Housing',
      titleHighlight: 'Solutions',
      description: 'A property management app for Nesto that automates tenant requests and streamlines maintenance workflows.',
      image: '/images/projectsimage3.svg',
    }
  ]

  // === HELPER: Split text into words for the specific animation ===
  const renderWords = (text, className = "") => {
    if (!text) return null;
    return text.split(" ").map((word, index) => (
      <span 
        key={index} 
        className={`word-anim inline-block will-change-transform ${className}`}
        style={{ marginRight: '0.25em' }} 
      >
        {word}
      </span>
    ));
  };

  useEffect(() => {
    const component = componentRef.current
    const track = trackRef.current

    if (!component || !track) return

    let ctx = gsap.context(() => {
        
      // 1. Initial Setup
      gsap.set(".word-anim", { 
          opacity: 0, 
          y: 20, 
          scale: 1.1, 
          filter: "blur(10px)", 
          rotationX: 45 
      });

      ScrollTrigger.matchMedia({
        // === DESKTOP ===
        "(min-width: 1024px)": function() {
            const slideWidth = component.offsetWidth
            const totalSlides = projects.length
            const totalMove = slideWidth * (totalSlides - 1)
      
            gsap.to(track, {
              x: -totalMove,
              ease: 'none',
              scrollTrigger: {
                trigger: component,
                start: 'top top-=65', 
                end: () => `+=${totalMove + window.innerHeight * 0.5}`,
                pin: true,
                scrub: 1,
                pinSpacing: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                  const prog = self.progress
                  setProgress(prog)
                  const slideProgress = prog * (totalSlides - 1)
                  const currentIndex = Math.min(Math.round(slideProgress) + 1, totalSlides)
                  setCurrentSlide(prev => prev !== currentIndex ? currentIndex : prev)
                },
              }
            })
        },

        // === MOBILE ===
        "(max-width: 1023px)": function() {
            gsap.set(track, { x: 0, clearProps: "all" });

            projects.forEach((project) => {
                const projectScope = `.slide-${project.id}`;
                const words = document.querySelectorAll(`${projectScope} .word-anim`);
                
                gsap.fromTo(words, 
                    { opacity: 0, y: 20, scale: 1.1, filter: "blur(10px)", rotationX: 45 },
                    {
                        opacity: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0,
                        duration: 0.8,
                        stagger: 0.04,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: projectScope,
                            start: "top 75%",
                            toggleActions: "play none none reverse",
                        }
                    }
                );
            });
        }
      });
      
    }, componentRef)

    return () => ctx.revert()
  }, [projects.length])


  // === EFFECT: TRIGGER ANIMATION FOR ACTIVE SLIDE (DESKTOP) ===
  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
        const words = document.querySelectorAll(`.slide-${currentSlide} .word-anim`);

        gsap.fromTo(words, 
            { opacity: 0, y: 20, scale: 1.1, filter: "blur(10px)", rotationX: 45 },
            {
                opacity: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0,
                duration: 0.8,
                stagger: 0.04,
                ease: "power4.out",
                overwrite: 'auto'
            }
        );
    }, componentRef);
    return () => ctx.revert();
  }, [currentSlide]);

  return (
    <section className="w-full flex justify-center bg-bg-light dark:bg-bg-dark overflow-hidden">
      <div 
        ref={componentRef}
        className="relative w-full h-auto lg:h-[1020px] bg-bg-light dark:bg-bg-dark z-10 overflow-hidden"
      >
        <div ref={trackRef} className="flex flex-col lg:flex-row h-auto lg:h-full w-full">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`slide-${project.id} w-full lg:min-w-full h-auto lg:h-full flex justify-center border-b border-gray-200 dark:border-gray-800 lg:border-none last:border-none`}
            >
              <div 
                className="w-full max-w-[1440px] h-full flex flex-col items-start justify-start py-16 px-6 lg:pt-0 lg:px-[75px]"
                style={{
                    paddingTop: '120px', 
                    paddingLeft: '75px',
                    paddingRight: '75px',
                }}
              >
                {/* UPDATED: Main Content Wrapper Height 
                   Was: lg:h-[640px] (which contained image height logic)
                   Now: Matches the new image height logic.
                */}
                <div className="w-full h-auto lg:h-[640px] flex flex-col-reverse lg:flex-row gap-10 lg:gap-[80px]">
                  
                  {/* Left Side (Text) */}
                  {/* UPDATED: Height to 640px to match image */}
                  <div 
                    className="w-full lg:w-[605px] h-auto lg:h-[640px] flex flex-col justify-center lg:justify-start gap-8 lg:gap-0 relative z-20 overflow-visible"
                  >
                    <span
                      className="text-sm uppercase tracking-wider text-text-dark dark:text-text-light block"
                      style={{ fontFamily: 'Inter Variable, Inter, sans-serif', fontWeight: 500 }}
                    >
                      {project.label}
                    </span>

                    {/* TITLE CONTAINER */}
                    <div 
                        className="flex items-center lg:mt-[240px]"
                        style={{ width: '700px', height: '187px' }}
                    >
                      <h2
                        className="text-[96px] md:text-[64px] xl:text-[96px] font-medium text-text-dark dark:text-text-light leading-[100%] whitespace-nowrap"
                        style={{
                          fontFamily: 'Inter Variable, sans-serif',
                          fontWeight: 500,
                          lineHeight: 1.2,
                          letterSpacing: '-0.04em'
                        }}
                      >
                        {renderWords(project.title)}
                        {project.titleHighlight && (
                            <>
                                <br />
                                <span
                                    className="text-[64px] md:text-[64px] inline-block"
                                    style={{
                                        fontFamily: 'Italiana, serif',
                                        fontWeight: 400,
                                        lineHeight: 1.2, 
                                        letterSpacing: '-0.02em'
                                    }}
                                >
                                    {renderWords(project.titleHighlight)}
                                </span>
                            </>
                        )}
                      </h2>
                    </div>

                    {/* DESCRIPTION CONTAINER */}
                    <div className="w-full lg:w-[605px] lg:mt-[50px]">
                      <p
                        className="text-base md:text-lg text-gray-700 dark:text-text-secondary w-full"
                        style={{
                          fontFamily: 'Inter Variable, Inter, sans-serif',
                          fontWeight: 400,
                          lineHeight: '160%'
                        }}
                      >
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Side (Image) */}
                  {/* UPDATED: Height increased from 533px to 640px */}
                  <div className="w-full lg:w-[605px] h-[300px] md:h-[400px] lg:h-[640px] overflow-hidden rounded-lg lg:rounded-none relative z-10">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Mobile Button */}
          <div className="flex lg:hidden w-full justify-center pb-16 px-6">
             <button className="w-full py-4 border border-gray-400 dark:border-gray-600 text-text-dark dark:text-text-light uppercase tracking-wider font-medium">
                View All Projects
             </button>
          </div>
        </div>

        {/* Bottom Bar (Desktop Only) */}
        {/* UPDATED: Changed bottom-[240px] to bottom-[120px] to adjust for taller image */}
        <div 
          className="hidden lg:flex absolute left-1/2 -translate-x-1/2 bottom-[120px] w-full max-w-[1290px] h-[76px] flex-col justify-end gap-[20px] px-[20px] md:px-0"
          style={{ zIndex: 20 }}
        >
          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full transition-all duration-100 ease-linear"
              style={{
                width: `${progress * 100}%`,
                backgroundColor: 'rgba(14, 14, 14, 0.4)'
              }}
            />
          </div>

          {/* Counter + Button */}
          <div className="flex items-center justify-between w-full">
            <div
              className="text-2xl font-medium text-text-dark dark:text-text-light"
              style={{ fontFamily: 'Inter Variable, Inter, sans-serif', fontWeight: 500 }}
            >
              {String(currentSlide).padStart(2, '0')}/{String(projects.length).padStart(2, '0')}
            </div>

            <MagneticButton
              className="bg-bg-light dark:bg-bg-dark text-text-dark dark:text-text-light px-8 py-3 text-base font-medium hover:opacity-80 transition-all"
              style={{
                fontFamily: 'Inter Variable, Inter, sans-serif',
                fontWeight: 500,
                border: '1px solid rgba(14, 14, 14, 0.4)'
              }}
            >
              View All Project
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects