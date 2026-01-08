import { useEffect, useRef, useState } from "react";
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

  // --- TYPEWRITER STATES ---
  const [textPart1, setTextPart1] = useState("");
  const [textPart2, setTextPart2] = useState("");
  const [textPart3, setTextPart3] = useState("");
  
  // NEW: State to control cursor visibility
  const [showCursor, setShowCursor] = useState(true);

  const fullText1 = "Why top entrepreneurs";
  const fullText2 = "trust";
  const fullText3 = " our agency.";

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    let ctx = gsap.context(() => {
      // 1. HORIZONTAL SCROLL LOGIC (Desktop Only)
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function () {
          // CALCULATE STOP POINT (Center of Last Card)
          const getScrollAmount = () => {
            const lastCard = track.lastElementChild;
            if (!lastCard) return 0;
            const lastCardCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2;
            const windowCenter = window.innerWidth / 2;
            return -(lastCardCenter - windowCenter);
          };

          const tween = gsap.to(track, {
            x: getScrollAmount,
            ease: "none",
          });

          ScrollTrigger.create({
            trigger: section,
            start: "center center",
            end: () => `+=${track.scrollWidth * 0.6}`,
            pin: true,
            animation: tween,
            scrub: 0.5,
            invalidateOnRefresh: true,
          });
        },
      });

      // 2. TYPEWRITER ANIMATION (All Screens)
      // Reset states initially
      setTextPart1("");
      setTextPart2("");
      setTextPart3("");
      setShowCursor(true); // Show cursor at start

      const tlType = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 60%", // Start typing when section is 60% into view
        },
        // NEW: Hide cursor when timeline completes
        onComplete: () => setShowCursor(false),
      });

      // Part 1: "Why top entrepreneurs"
      tlType.to({ val: 0 }, {
        val: fullText1.length,
        duration: 0.4,
        ease: "none",
        onUpdate: function () {
          setTextPart1(fullText1.slice(0, Math.ceil(this.targets()[0].val)));
        },
      });

      // Part 2: "trust" (Italic part)
      tlType.to({ val: 0 }, {
        val: fullText2.length,
        duration: 0.2,
        ease: "none",
        onUpdate: function () {
          setTextPart2(fullText2.slice(0, Math.ceil(this.targets()[0].val)));
        },
      });

      // Part 3: " our agency."
      tlType.to({ val: 0 }, {
        val: fullText3.length,
        duration: 0.2,
        ease: "none",
        onUpdate: function () {
          setTextPart3(fullText3.slice(0, Math.ceil(this.targets()[0].val)));
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
                {/* Typewriter Part 1 */}
                {textPart1}
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
                {/* Typewriter Part 2 & 3 */}
                <em>{textPart2}</em>
                {textPart3}
              </span>
              
              {/* Blinking Cursor - Only renders if showCursor is true */}
              {showCursor && (
                <span className="animate-pulse text-text-dark dark:text-text-light">|</span>
              )}
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
        <div className="w-full overflow-x-auto lg:overflow-visible no-scrollbar">
          <div
            ref={trackRef}
            className="flex items-start justify-start gap-4 lg:gap-[30px] w-fit px-1 lg:px-0 snap-x snap-mandatory lg:snap-none"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                // UPDATED: bg-[#F0F0F0] for light mode, dark:bg-[#090909] for dark mode
                className="flex flex-col min-w-[85vw] md:min-w-[400px] lg:min-w-[445px] snap-center items-start p-6 lg:p-[30px] bg-[#F0F0F0] dark:bg-[#090909] rounded-lg select-none transition-colors duration-300 h-auto lg:h-[463.89px]"
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