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

  useEffect(() => {
    const statement = statementRef.current
    const image = imageRef.current
    const marquee = marqueeRef.current
    const marqueeInner = marqueeInnerRef.current

    ScrollTrigger.getAll().forEach(t => t.kill())

    const PIN_DURATION = 2000
    const images = ['#about-img-1', '#about-img-2', '#about-img-3']
    const fadeDuration = 0.1

    gsap.fromTo(
      statement,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: statement,
          start: 'top 80%',
          end: 'bottom 60%',
        },
      }
    )

    gsap.to(image, {
      y: -50,
      scrollTrigger: {
        trigger: aboutRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })

    const autoScroll = gsap.to(marqueeInner, {
      xPercent: -50,
      duration: 30,
      ease: 'none',
      repeat: -1,
    })

    ScrollTrigger.create({
      trigger: aboutRef.current,
      start: 'top top',
      end: `+=${PIN_DURATION}`,
      pin: true,
      scrub: 1,
      onUpdate: self => {
        const xPos = gsap.utils.interpolate(-100, 100, self.progress)
        gsap.set(marquee, { x: `${xPos}vw` })
      },
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: 'top top',
        end: `+=${PIN_DURATION}`,
        scrub: 1,
      },
    })

    tl.to(images[0], { opacity: 0, duration: fadeDuration }, 0.3)
      .to(images[1], { opacity: 1, duration: fadeDuration }, 0.3)
      .to(images[1], { opacity: 0, duration: fadeDuration }, 0.65)
      .to(images[2], { opacity: 1, duration: fadeDuration }, 0.65)

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      autoScroll.kill()
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={aboutRef}
      id="about"
      className="relative min-h-screen overflow-hidden bg-white px-6 py-20"
    >
      {/* Marquee */}
      <div className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 rotate-[5deg]">
        <div ref={marqueeRef} style={{ width: '200%' }}>
          <div
            ref={marqueeInnerRef}
            className="flex w-[200%] whitespace-nowrap bg-[#FF4920] py-6"
          >
            {[...Array(20)].map((_, i) => (
              <span
                key={i}
                className="mx-8 text-[48px] font-normal text-white"
                style={{ fontFamily: 'Italiana, serif' }}
              >
                About us •
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center">
        {/* Headline */}
        <div className="mb-14 max-w-[900px] text-center mix-blend-difference">
          <h2
            ref={statementRef}
            className="text-[48px] font-medium leading-[1.2] text-black"
            style={{ fontFamily: FONT_INTER }}
          >
            Turning ambitious ideas into high-impact digital reality{' '}
            <span
              className="font-normal italic"
              style={{ fontFamily: FONT_CASLON }}
            >
              through expert craft
            </span>
            , clarity, and collaboration.
          </h2>
        </div>

        {/* Image – MID SIZE APPLIED TO ALL SCREENS */}
        <div ref={imageRef} className="relative z-20">
          <div className="relative w-[260px] aspect-[410/520] overflow-hidden rounded-2xl shadow-2xl">
            <img
              id="about-img-1"
              src="/images/aboutusimage1.svg"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: 1 }}
            />
            <img
              id="about-img-2"
              src="/images/aboutusimage2.svg"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: 0 }}
            />
            <img
              id="about-img-3"
              src="/images/aboutusimage1.svg"
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
