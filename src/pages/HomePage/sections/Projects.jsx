import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '../../../components/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const componentRef = useRef(null) // The main section to pin
  const trackRef = useRef(null) // The sliding track
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

  useEffect(() => {
    const component = componentRef.current
    const track = trackRef.current

    if (!component || !track) return

    let ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        // DESKTOP ONLY: Horizontal Scroll logic
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
                  setCurrentSlide(currentIndex)
                },
              }
            })
        },
        // MOBILE/TABLET: Reset transforms
        "(max-width: 1023px)": function() {
            gsap.set(track, { x: 0, clearProps: "all" });
        }
      });
    }, componentRef)

    return () => ctx.revert()
  }, [projects.length])

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
              className="w-full lg:min-w-full h-auto lg:h-full flex justify-center border-b border-gray-200 dark:border-gray-800 lg:border-none last:border-none"
            >
              <div 
                // UPDATED: Removed lg:pt-[120px] to remove top gap on large screens
                className="w-full max-w-[1440px] h-full flex flex-col items-start justify-start py-16 px-6 lg:pt-0 lg:px-[75px]"
                style={{
                        paddingTop: '120px', // <--- This was the 120px gap
                        paddingLeft: '75px',
                        paddingRight: '75px',
  }}
              >
                <div className="w-full h-auto lg:h-[640px] flex flex-col-reverse lg:flex-row gap-10 lg:gap-[80px]">
                  
                  {/* Left Side (Text) */}
                  <div 
                    // UPDATED: Changed justify-center to lg:justify-start to align text to top
                    className="w-full lg:w-[605px] h-auto lg:h-[533px] flex flex-col justify-center lg:justify-start gap-8 lg:gap-[140px]"
                  >
                    <span
                      className="text-sm uppercase tracking-wider text-text-dark dark:text-text-light"
                      style={{ fontFamily: 'Inter Variable, Inter, sans-serif', fontWeight: 500 }}
                    >
                      {project.label}
                    </span>

                    <div className="flex flex-col gap-4 lg:gap-[32px]">
                      <h2
                        className="text-4xl md:text-6xl xl:text-7xl font-medium text-text-dark dark:text-text-light leading-tight"
                        style={{
                          fontFamily: 'Inter Variable, Inter, sans-serif',
                          fontWeight: 500,
                          letterSpacing: '-0.02em'
                        }}
                      >
                        {project.titleHighlight ? (
                          <>
                            {project.title}<br />
                            <span
                              className="text-5xl md:text-[96px]"
                              style={{
                                fontFamily: 'Italiana, serif',
                                fontWeight: 400,
                                lineHeight: '120%',
                                letterSpacing: '-0.02em'
                              }}
                            >
                              {project.titleHighlight}
                            </span>
                          </>
                        ) : (
                          project.title
                        )}
                      </h2>

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
                  <div className="w-full lg:w-[605px] h-[300px] md:h-[400px] lg:h-[533px] overflow-hidden rounded-lg lg:rounded-none">
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
          
          {/* Mobile "View All" Button */}
          <div className="flex lg:hidden w-full justify-center pb-16 px-6">
             <button className="w-full py-4 border border-gray-400 dark:border-gray-600 text-text-dark dark:text-text-light uppercase tracking-wider font-medium">
                View All Projects
             </button>
          </div>
        </div>

        {/* Bottom Bar (Desktop Only) */}
        <div 
          className="hidden lg:flex absolute left-1/2 -translate-x-1/2 bottom-[240px] w-full max-w-[1290px] h-[76px] flex-col justify-end gap-[20px] px-[20px] md:px-0"
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