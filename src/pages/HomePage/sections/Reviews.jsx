import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    stars: "https://c.animaapp.com/mj6xytezddxCqE/img/stars.svg",
    quote:
      'Working with this agency was seamless. They understood our vision instantly and delivered designs that elevated our entire brand."',
    avatar: "https://c.animaapp.com/mj6xytezddxCqE/img/avatar-image.png",
    name: "Darlene Robertson",
    title: "President of Sales",
  },
  {
    stars: "https://c.animaapp.com/mj6xytezddxCqE/img/stars.svg",
    quote:
      '"The team combines creativity with strategy. Their UI/UX work improved our user engagement and made our product feel truly premium."',
    avatar: "https://c.animaapp.com/mj6xytezddxCqE/img/avatar-image-1.png",
    name: "Bessie Cooper",
    title: "Marketing Coordinator",
  },
  {
    stars: "https://c.animaapp.com/mj6xytezddxCqE/img/stars.svg",
    quote:
      '"Professional, responsive, and highly skilled. Every deliverable exceeded our expectations — from wireframes to final visuals."',
    avatar: "https://c.animaapp.com/mj6xytezddxCqE/img/avatar-image-2.png",
    name: "Savannah Nguyen",
    title: "UI/UX Designer",
  },
  {
    stars: "https://c.animaapp.com/mj6xytezddxCqE/img/stars.svg",
    quote:
      '"They transformed our ideas into a modern, functional design system. The process was smooth, and the results were outstanding."',
    avatar: "https://c.animaapp.com/mj6xytezddxCqE/img/avatar-image-3.png",
    name: "Ronald Richards",
    title: "Web Designer",
  },
];

export const TestimonialSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    let ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function () {
          
          // 1. CALCULATE STOP POINT (Center of Last Card)
          const getScrollAmount = () => {
            const lastCard = track.lastElementChild;
            if (!lastCard) return 0;

            // Distance from left edge of track to center of last card
            const lastCardCenter = lastCard.offsetLeft + (lastCard.offsetWidth / 2);
            // Center of the screen
            const windowCenter = window.innerWidth / 2;
            
            // Move left (negative) by the difference
            return -(lastCardCenter - windowCenter);
          };

          const tween = gsap.to(track, {
            x: getScrollAmount,
            ease: "none",
          });

          ScrollTrigger.create({
            trigger: section,
            start: "center center",
            // 2. CONTROL VELOCITY
            // Lower multiplier = Faster Horizontal Scroll (High Velocity)
            // Higher multiplier = Slower Horizontal Scroll
            // 0.6 is a good balance for "Fast/Premium" feel
            end: () => `+=${track.scrollWidth * 0.6}`, 
            pin: true,
            animation: tween,
            scrub: 0.5, // Lower scrub = snappier/less floaty response
            invalidateOnRefresh: true,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full flex justify-center bg-bg-light dark:bg-bg-dark overflow-hidden"
    >
      {/* Main Container */}
      <div
        // CONVERTED INLINE STYLES TO RESPONSIVE CLASSES
        // Mobile: py-16 px-6 gap-12
        // Desktop: Matches original pixels
        className="w-full max-w-[1440px] flex flex-col items-start bg-bg-light dark:bg-bg-dark transition-colors duration-300 relative py-16 px-6 gap-12 lg:pt-[120px] lg:pb-[120px] lg:pl-[75px] lg:pr-[75px] lg:gap-[64px]"
      >
        {/* Header */}
        <header className="max-w-[850px] gap-6 lg:gap-8 flex flex-col items-start">
          <div className="flex flex-col items-start justify-center gap-4 lg:gap-3.5 w-full">
            <h2 className="font-normal text-4xl md:text-5xl lg:text-[72px] leading-tight lg:leading-[120%] tracking-tight lg:tracking-[-0.04em]">
              <span
                className="font-medium text-text-dark dark:text-text-light"
                style={{
                  fontFamily: "Inter Variable, Inter, sans-serif",
                  fontWeight: 500,
                }}
              >
                Why top entrepreneurs
                <br />
              </span>
              <span
                className="text-text-dark dark:text-text-light"
                style={{
                  fontFamily: "Libre Caslon Text, serif",
                  fontWeight: 400,
                  fontStyle: "italic",
                  fontVariant: "normal",
                }}
              >
                <em>trust</em> our agency.
              </span>
            </h2>
            <p
              className="w-fit text-gray-700 dark:text-text-secondary text-base md:text-lg leading-relaxed lg:leading-[28.8px]"
              style={{
                fontFamily: "Inter Variable, Inter, sans-serif",
                fontWeight: 400,
              }}
            >
              We don't just make things look good. We design solutions that
              scale businesses.
            </p>
          </div>
        </header>

        {/* Scrollable Track Wrapper */}
        {/* Mobile Behavior: overflow-x-auto (Native horizontal scroll)
            Desktop Behavior: overflow-visible (GSAP controlled)
        */}
        <div className="w-full overflow-x-auto lg:overflow-visible no-scrollbar">
          <div
            ref={trackRef}
            className="flex items-start justify-start gap-4 lg:gap-[30px] w-fit px-1 lg:px-0 snap-x snap-mandatory lg:snap-none"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                // RESPONSIVE CARD WIDTH:
                // Mobile: min-w-[85vw] (Shows 85% of card to encourage scroll)
                // Tablet: min-w-[400px]
                // Desktop: min-w-[445px] (Original size)
                className="flex flex-col min-w-[85vw] md:min-w-[400px] lg:min-w-[445px] snap-center items-start p-6 lg:p-[30px] bg-gray-100 dark:bg-gray-800 rounded-lg select-none transition-colors duration-300 h-auto lg:h-[463.89px]"
              >
                <div className="flex flex-col justify-between w-full h-full gap-8 lg:gap-0">
                  {/* Top: Stars & Quote */}
                  <div className="flex flex-col gap-6 lg:gap-[30px]">
                    <img
                      className="flex-[0_0_auto] w-[100px] lg:w-[120px]"
                      alt="Stars"
                      src={testimonial.stars}
                      draggable="false"
                    />
                    <p
                      className="text-text-dark dark:text-text-light text-lg lg:text-xl tracking-[0] leading-relaxed lg:leading-8"
                      style={{
                        fontFamily: "Inter Variable, Inter, sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {testimonial.quote}
                    </p>
                  </div>

                  {/* Bottom: Profile */}
                  <div className="flex items-center gap-4 lg:gap-5 w-full mt-auto">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden shrink-0">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="object-cover w-full h-full"
                        draggable="false"
                      />
                    </div>
                    <div className="inline-flex flex-col items-start gap-0.5">
                      <h3
                        className="text-text-dark dark:text-text-light text-xl lg:text-2xl tracking-tight lg:tracking-[-0.96px] leading-tight lg:leading-[28.8px]"
                        style={{
                          fontFamily: "Inter Variable, Inter, sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {testimonial.name}
                      </h3>
                      <p
                        className="text-gray-700 dark:text-text-secondary text-sm lg:text-base leading-snug lg:leading-[25.6px]"
                        style={{
                          fontFamily: "Inter Variable, Inter, sans-serif",
                          fontWeight: 400,
                        }}
                      >
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Extra spacer for mobile scroll buffer */}
            <div className="min-w-[20px] lg:min-w-[50px]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;