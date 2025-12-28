import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger as BaseAccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

// --- Custom Trigger Component ---
const CustomAccordionTrigger = React.forwardRef(
  ({ children, className, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={`
        flex flex-1 items-center justify-between py-6 lg:py-[30px] font-medium transition-all hover:underline 
        [&[data-state=open]>svg]:-rotate-90  /* OPEN STATE: Rotates to -90 deg (Up) */
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
          className="transition-transform duration-300 ease-in-out shrink-0 text-text-dark dark:text-text-light rotate-90 ml-4 lg:ml-0"
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
  return (
    <section className="w-full flex justify-center bg-bg-light dark:bg-bg-dark transition-colors duration-300">
      <div
        // CONVERTED INLINE STYLES TO RESPONSIVE CLASSES
        // Mobile: py-16 px-6 gap-12
        // Desktop: py-[120px] px-[75px] gap-[64px]
        className="w-full max-w-[1440px] flex flex-col items-start py-16 px-6 gap-12 md:px-10 lg:pt-[120px] lg:pb-[120px] lg:pl-[75px] lg:pr-[75px] lg:gap-[64px]"
      >
        <header className="w-full max-w-[768px] flex flex-col items-start gap-4 lg:gap-[12px]">
          {/* RESPONSIVE TEXT SIZES: text-4xl -> text-5xl -> text-7xl */}
          <h2 className="w-full [font-family:'Inter_Variable-Medium',Helvetica] font-normal text-transparent text-4xl md:text-5xl lg:text-7xl leading-tight lg:leading-[72px]">
            <span className="font-medium text-text-dark dark:text-text-light tracking-[-1px] lg:tracking-[-2.07px] lg:leading-[86.4px]">
              Got Questions?
              <br />
              We&apos;ve{" "}
            </span>
            <span className="[font-family:'Libre_Caslon_Text',Helvetica] italic text-text-dark dark:text-text-light tracking-[-1px] lg:tracking-[-2.07px] lg:leading-[86.4px]">
              Got Answers
            </span>
          </h2>
          <p className="w-full text-gray-700 dark:text-text-secondary text-base md:text-lg leading-relaxed lg:leading-[28.8px] [font-family:'Inter_Variable-Regular',Helvetica] font-normal tracking-[0]">
            Getting started is made simple and transparent right from day one. We
            guide you through every step with us.
          </p>
        </header>

        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="w-full max-w-[1290px] border-b border-gray-300 dark:border-gray-700"
        >
          {faqItems.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              // Reduced horizontal padding on mobile (px-2) to give text more room, restored to px-[30px] on desktop
              className="border-gray-300 dark:border-gray-700 px-2 md:px-6 lg:px-[30px] border-t"
            >
              <CustomAccordionTrigger className="gap-4 lg:gap-6 hover:no-underline">
                {/* RESPONSIVE QUESTION SIZE: text-xl -> text-2xl -> text-[32px] */}
                <span className="flex-1 text-left [font-family:'Inter_Variable-Medium',Helvetica] font-medium text-text-dark dark:text-text-light text-xl md:text-2xl lg:text-[32px] tracking-[-0.5px] lg:tracking-[-1.28px] leading-snug lg:leading-[38.4px]">
                  {item.question}
                </span>
              </CustomAccordionTrigger>

              <AccordionContent className="pt-0 pb-6 lg:pb-[30px]">
                {/* RESPONSIVE ANSWER SIZE: text-base -> text-lg -> text-xl */}
                <p className="text-gray-700 dark:text-text-secondary text-base md:text-lg lg:text-xl leading-relaxed lg:leading-8 [font-family:'Inter_Variable-Regular',Helvetica] font-normal tracking-[0]">
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