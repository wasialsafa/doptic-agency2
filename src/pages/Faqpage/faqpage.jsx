import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger as BaseAccordionTrigger,
} from "@/components/ui/accordion";
import React, { useEffect, useRef, useState } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FONT_INTER = 'Inter Variable, sans-serif';
const FONT_CASLON = 'Libre Caslon Text, serif';

// --- Color Constants ---
const textMain = "text-[#0e0e0e] dark:text-[#e2e2e2]";
const textSub = "text-[#0E0E0EB2] dark:text-[#E2E2E2]/70";
const borderFade = "border-[#0e0e0e1a] dark:border-[#e2e2e21a]"; // 10% Opacity

// --- Custom Trigger Component ---
const CustomAccordionTrigger = React.forwardRef(
  ({ children, className, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={`
        flex flex-1 items-center justify-between py-6 lg:py-[30px] font-medium transition-all hover:underline 
        [&[data-state=open]>svg]:-rotate-90 
        ${className}
      `}
        {...props}
      >
        {children}

        {/* Custom Curved Arrow Icon */}
        <svg
          width="12"
          height="21"
          viewBox="0 0 12 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform duration-300 ease-in-out shrink-0 rotate-90 ml-4 lg:ml-0 ${textMain}`}
          style={{
            transformOrigin: "center",
          }}
        >
          <path
            d="M1.3335 19.6676C5.5 16 10.6668 13.5 10.6668 10.3343C10.6668 7.16 5.5 4.6 1.3335 1.00098"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
);
CustomAccordionTrigger.displayName = "CustomAccordionTrigger";

// --- Data Definition ---
const faqItems = [
  {
    id: "item-1",
    question: "What services does your agency provide?",
    answer:
      "We offer full design solutions including UI/UX design, website design, branding, product design, and creative direction. Nunc ut sem vitae risus tristique posuere.",
  },
  {
    id: "item-2",
    question: "How long does a typical project take?",
    answer:
      "Project timelines typically range from 4 to 12 weeks, depending on the scope and complexity. We define detailed milestones in our initial planning phase.",
  },
  {
    id: "item-3",
    question: "Do you work with startups as well as established companies?",
    answer:
      "Absolutely. We tailor our process and pricing to fit the unique needs of both agile startups looking for rapid iteration and established enterprises seeking comprehensive solutions.",
  },
  {
    id: "item-4",
    question: "What is your design process like?",
    answer:
      "Our process includes Discovery & Strategy, Wireframing & Prototyping, Visual Design, Testing & Refinement, and Final Handoff. We maintain close communication throughout every stage.",
  },
  {
    id: "item-5",
    question: "Can you help with development after the design is complete?",
    answer:
      "While we specialize in design, we have strong partnerships with trusted development teams and can manage the handover or oversee the development phase to ensure pixel-perfect implementation.",
  },
];

// --- Component Definition ---
export const FaqSection = () => {
  const sectionRef = useRef(null);
  const [textPart1, setTextPart1] = useState("");
  const [textPart2, setTextPart2] = useState("");
  const [textPart3, setTextPart3] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const fullText1 = "Got Questions?";
  const fullText2 = "We've "; 
  const fullText3 = "Got Answers";

  useEffect(() => {
    const ctx = gsap.context(() => {
      setTextPart1("");
      setTextPart2("");
      setTextPart3("");
      setShowCursor(true); 
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%", 
        },
        onComplete: () => setShowCursor(false),
      });

      tl.to({ val: 0 }, {
        val: fullText1.length,
        duration: 0.4,
        ease: "none",
        onUpdate: function () {
          setTextPart1(fullText1.slice(0, Math.ceil(this.targets()[0].val)));
        },
      });

      tl.to({ val: 0 }, {
        val: fullText2.length,
        duration: 0.2,
        ease: "none",
        onUpdate: function () {
          setTextPart2(fullText2.slice(0, Math.ceil(this.targets()[0].val)));
        },
      });

      tl.to({ val: 0 }, {
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
    <section ref={sectionRef} className="w-full flex justify-center bg-bg-light dark:bg-bg-dark transition-colors duration-300">
      <div className="w-full max-w-[1440px] flex flex-col items-start py-16 px-6 gap-12 md:px-10 lg:pt-[120px] lg:pb-[120px] lg:pl-[75px] lg:pr-[75px] lg:gap-[64px]">
        <header className="w-full max-w-[768px] flex flex-col items-start gap-4 lg:gap-[12px]">
          <h2
            className="w-full font-normal text-transparent text-4xl md:text-5xl lg:text-7xl leading-tight lg:leading-[72px]"
            style={{ fontFamily: FONT_INTER }}
          >
            <span className={`font-medium tracking-[-1px] lg:tracking-[-2.07px] lg:leading-[86.4px] ${textMain}`}>
              {textPart1}
              <br />
              {textPart2}
            </span>
            <span
              className={`italic tracking-[-1px] lg:tracking-[-2.07px] lg:leading-[86.4px] ${textMain}`}
              style={{ fontFamily: FONT_CASLON }}
            >
              {textPart3}
            </span>
            {showCursor && (
              <span className={`animate-pulse ${textMain}`}>|</span>
            )}
          </h2>

          <p
            className={`w-full text-base md:text-lg leading-relaxed lg:leading-[28.8px] font-normal tracking-[0] ${textSub}`}
            style={{ fontFamily: FONT_INTER }}
          >
            Getting started is made simple and transparent right from day one. We
            guide you through every step with us.
          </p>
        </header>

        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          // REMOVED: Border from container to avoid double lines
          className="w-full max-w-[1170px]"
        >
          {faqItems.map((item, index) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              // UPDATED BORDER LOGIC:
              // 1. border-b-0: Removes default bottom border (prevents thickness)
              // 2. border-t-[1px]: Adds 1px top border to every item
              // 3. last:border-b-[1px]: Adds 1px bottom border ONLY to the last item
              className={`
                border-b-0 border-t-[1px] last:border-b-[1px] 
                ${borderFade}
                px-2 md:px-6 lg:px-[30px]
              `}
            >
              <CustomAccordionTrigger className="gap-4 lg:gap-6 hover:no-underline">
                <span
                  className={`flex-1 text-left font-medium text-xl md:text-2xl lg:text-[32px] tracking-[-0.5px] lg:tracking-[-1.28px] leading-snug lg:leading-[38.4px] ${textMain}`}
                  style={{ fontFamily: FONT_INTER }}
                >
                  {item.question}
                </span>
              </CustomAccordionTrigger>

              <AccordionContent className="pt-0 pb-6 lg:pb-[30px]">
                <p
                  className={`text-base md:text-lg lg:text-xl leading-relaxed lg:leading-8 font-normal tracking-[0] ${textSub}`}
                  style={{ fontFamily: FONT_INTER }}
                >
                  {item.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;