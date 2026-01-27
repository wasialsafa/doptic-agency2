import React, { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const PricingSection = () => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  
  // --- TYPEWRITER STATE ---
  const cursorRef = useRef(null);
  const [displayedText, setDisplayedText] = useState('');
  const fullText = "Simple, Transparent Pricing Plan";

  // --- CHECKBOX STATE ---
  const [selectedItems, setSelectedItems] = useState({});

  const toggleItem = (index) => {
    setSelectedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const checklistItems = [
    "Dedicated Design Time",
    "Priority Support",
    "Weekly Strategy Calls",
    "UI, UX, and Branding",
    "Front-end Development"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // =========================================
      // 1. TYPEWRITER ANIMATION
      // =========================================
      setDisplayedText('');
      gsap.set(cursorRef.current, { opacity: 1 });

      const textObj = { value: 0 };
      const splitPoint = Math.floor(fullText.length * 0.7);

      const tlTypewriter = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      tlTypewriter
        .to(textObj, {
          value: splitPoint,
          duration: splitPoint * 0.04, 
          ease: 'none',
          onUpdate: () => setDisplayedText(fullText.slice(0, Math.floor(textObj.value))),
        })
        .to(textObj, {
          value: fullText.length,
          duration: (fullText.length - splitPoint) * 0.08, 
          ease: 'power1.inOut',
          onUpdate: () => setDisplayedText(fullText.slice(0, Math.floor(textObj.value))),
        })
        .to(cursorRef.current, { opacity: 0, duration: 0.5, ease: "power2.out" });

      // =========================================
      // 2. OTHER ANIMATIONS
      // =========================================
      
      gsap.from([".tw-label", ".tw-desc"], {
        y: 20, 
        opacity: 0, 
        duration: 0.8, 
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
      });

      gsap.from(".animate-card", {
        x: -50,
        opacity: 0,
        duration: 1,
        delay: 0.5, 
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" }
      });

      gsap.from(".animate-right-col", {
        x: 30,
        opacity: 0,
        duration: 1,
        delay: 0.5, 
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [theme]);

  return (
    <section
      ref={sectionRef}
      // UPDATED: -mt-[4px] creates a larger overlap to cover the line
      // UPDATED: z-10 ensures this section sits ON TOP of the previous section's bottom edge
      className="bg-[#e2e2e2] dark:bg-bg-dark transition-colors duration-300 overflow-hidden min-h-screen relative -mt-[4px] z-10"
      id="pricing"
    >
      <div className="max-w-[1440px] mx-auto pt-[120px] pb-[120px] px-5 md:px-[75px] flex flex-col items-center">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col items-start gap-4 w-full max-w-[1290px] shrink-0 mr-auto mb-[64px]">
          <div className="tw-label font-medium text-[#0e0e0e] dark:text-text-light text-[14px] tracking-[2px] leading-[20px] uppercase opacity-60">
            PRICING
          </div>

          <h2 className="tw-title text-[#0e0e0e] dark:text-white text-[36px] md:text-[52px] lg:text-[72px] font-medium leading-[120%] tracking-[-0.04em] min-h-[1.2em]">
             <span style={{ fontFamily: '"Inter Variable", sans-serif' }}>
              {displayedText.split(' ').map((word, index) => {
                 const cleanWord = word.replace(/,/g, '');
                 const isSerif = cleanWord === "Pricing" || cleanWord === "Plan";
                 const isPlan = cleanWord === "Plan";

                 return (
                   <span key={index}>
                     {isPlan && <br className="block" />}
                     <span 
                       className={isSerif ? "font-serif italic font-normal" : ""}
                       style={isSerif ? { 
                           fontFamily: '"Libre Caslon Text", serif',
                           fontWeight: 400,
                           fontStyle: 'italic'
                       } : {}}
                     >
                       {word}
                     </span>
                     {' '}
                   </span>
                 )
              })}
              <span ref={cursorRef} className="inline-block ml-1 text-[#FF6B35] font-light">|</span>
             </span>
          </h2>
          
          <p className="tw-desc text-gray-500 dark:text-gray-400 w-full max-w-[850px] mt-[14px] text-[18px] leading-[160%]">
            A pricing plan is a business strategy for setting product/service costs, 
            balancing profitability with <br className="hidden lg:block"/> market competitiveness by considering costs, 
            customer value, and competitor pricing.
          </p>
        </div>

        {/* --- MAIN CONTENT ROW --- */}
        <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-[80px] w-full relative max-w-[1290px]">
          
          {/* LEFT - Pricing Card */}
          <div className="animate-card flex flex-col justify-between w-full lg:w-[50%] bg-[#e2e2e2] dark:bg-[#1a1a1a] p-8 md:p-10 rounded-sm shadow-sm border border-[#0E0E0E1A] dark:border-white/10 transition-colors">
            
            <div>
                {/* Top Div: Title & Price */}
                <div className="flex flex-col gap-4 mb-[30px]">
                    <h3 className="text-[#0e0e0e] dark:text-white"
                        style={{
                            fontFamily: '"Inter Variable", sans-serif',
                            fontWeight: 500,
                            fontSize: '32px',
                            lineHeight: '120%',
                            letterSpacing: '-0.04em'
                        }}
                    >
                        Growth Retainer
                    </h3>
                    
                    <div className="flex items-baseline self-end text-[#0e0e0e] dark:text-white">
                        <span style={{
                            fontFamily: '"Inter Variable", sans-serif',
                            fontWeight: 500,
                            fontSize: '64px',
                            lineHeight: '120%',
                            letterSpacing: '-0.04em'
                        }}>$1199</span>
                        <span className="opacity-60 ml-1" style={{
                            fontFamily: '"Inter Variable", sans-serif',
                            fontWeight: 500,
                            fontSize: '32px',
                            lineHeight: '120%',
                            letterSpacing: '-0.04em'
                        }}>/mo</span>
                    </div>
                </div>

                <div className="w-full h-[1px] bg-[#000000] dark:bg-white/20 mb-[30px]"></div>

                {/* Checkboxes */}
                <div className="flex flex-col gap-[16px] mb-[30px]">
                    <h4 className="text-[#0e0e0e] dark:text-white mb-2"
                        style={{
                            fontFamily: '"Inter Variable", sans-serif',
                            fontWeight: 500,
                            fontSize: '24px',
                            letterSpacing: '-0.04em'
                        }}
                    >
                        Design That Drives Business.
                    </h4>

                    {checklistItems.map((item, i) => {
                        const isSelected = selectedItems[i];
                        return (
                            <div 
                                key={i} 
                                onClick={() => toggleItem(i)}
                                className={`
                                    flex items-center gap-3 p-3 rounded-md cursor-pointer transition-all duration-200
                                    bg-transparent hover:bg-gray-300/50 dark:hover:bg-white/5 
                                    text-[#0e0e0e] dark:text-gray-300
                                `}
                            >
                                <div className={`
                                    w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-200
                                    ${isSelected ? 'bg-[#0E0E0E] border-[#0E0E0E] text-white' : 'border-gray-400 dark:border-gray-600 text-transparent'}
                                `}>
                                    <Check size={12} strokeWidth={4} />
                                </div>
                                <span className="text-[16px] font-medium font-['Inter_Variable']">
                                    {item}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div>
                {/* Left Button */}
                <button className="w-full bg-[#ff4d29] hover:bg-[#e64525] text-white font-bold py-4 transition-colors rounded-sm mb-6">
                  Get Started Today
                </button>

                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 pl-3">
                    <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">✓</div>
                    <span className="text-sm font-medium">7-day money-back guarantee.</span>
                </div>
            </div>
          </div>

          {/* RIGHT - Detailed Features */}
          <div className="animate-right-col flex flex-col justify-between w-full lg:w-[50%] lg:pt-4">
            <div className="space-y-[48px]">
                {[
                  {
                    title: "Cheaper than a full-time hire",
                    desc: "A senior designer in the US costs $100k+ plus benefits. With us, you get senior-level talent for half the cost and zero HR headaches."
                  },
                  {
                    title: "Ultra-fast turnaround",
                    desc: "Don't wait weeks for a draft. We deliver design updates one by one every 24-48 hours, keeping your momentum high."
                  },
                  {
                    title: "Total flexibility",
                    desc: "Don't have enough work for a whole month? Pause your subscription and bank your remaining days for when you need them later."
                  }
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="mt-2 shrink-0 w-[26px] h-[26px] rounded-[6px] flex items-center justify-center bg-[#0E0E0E]/40 dark:bg-white/20">
                      <Check size={14} strokeWidth={3} className="text-[#0E0E0E] dark:text-white" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-[#0e0e0e] dark:text-white"
                          style={{
                              fontFamily: '"Inter Variable", sans-serif',
                              fontWeight: 500,
                              fontSize: '32px',
                              lineHeight: '120%',
                              letterSpacing: '-0.04em'
                          }}
                      >
                          {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400"
                         style={{
                             fontFamily: '"Inter Variable", sans-serif',
                             fontWeight: 400,
                             fontSize: '18px',
                             lineHeight: '160%',
                             letterSpacing: '0%'
                         }}
                      >
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Bottom Button Area */}
            <div className="mt-[72px] mb-8">
                 <button className="w-full border border-solid border-[#0e0e0e66] dark:border-gray-500 hover:bg-[#0e0e0e0d] dark:hover:bg-gray-800 transition-colors bg-transparent text-[#0e0e0e] dark:text-white py-4 font-semibold rounded-sm">
                  Contact us for Custom Scopes
                </button>
                <div className="h-[24px] mt-6"></div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default PricingSection;