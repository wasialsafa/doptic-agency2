import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { gsap } from 'gsap';
import { useTheme } from '../../../context/ThemeContext';

const PricingSection = () => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".animate-header", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });

      // Pricing Card Animation
      gsap.from(".animate-card", {
        x: -50,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power3.out"
      });

      // Features Animation
      gsap.from(".animate-feature", {
        x: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.6,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [theme]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#e2e2e2] dark:bg-bg-dark transition-colors duration-300 overflow-hidden min-h-screen relative"
      id="pricing"
    >
      {/* Container with 120px top gap and 75px side gaps */}
      <div className="max-w-[1440px] mx-auto pt-[120px] pb-[120px] px-5 md:px-[75px] flex flex-col items-center">
        
        {/* Top Header Div: Width 850px, Height 244px, Gap 12px */}
        <div className="flex flex-col items-start gap-[12px] w-full max-w-[850px] lg:h-[244px] shrink-0 animate-header mr-auto">
          <div className="font-medium text-[#0e0e0e] dark:text-text-light text-[14px] tracking-[2px] leading-[20px] uppercase opacity-60">
            PRICING
          </div>

          <h2 className="text-[#0e0e0e] dark:text-white text-[36px] md:text-[52px] lg:text-[72px] font-medium leading-[120%] tracking-[-0.04em] font-['Inter_Variable']">
            Simple, Transparent Pricing <br />
            <span className="font-serif italic font-normal" style={{ fontFamily: '"Libre Caslon Text", serif' }}>
              Plan
            </span>
          </h2>
          
          <p className="text-gray-500 dark:text-gray-400 max-w-[650px] mt-2 text-[18px] leading-[160%]">
            A pricing plan is a business strategy for setting product/service costs, 
            balancing profitability with market competitiveness by considering costs, 
            customer value, and competitor pricing.
          </p>
        </div>

        {/* Pricing Content Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-10 lg:gap-[80px] w-full mt-[64px] relative">
          
          {/* LEFT - Pricing Card */}
          <div className="animate-card w-full lg:w-[520px] bg-bg-light dark:bg-[#1a1a1a] p-8 md:p-10 rounded-sm shadow-sm border border-gray-100 dark:border-white/10 transition-colors">
            <div className="flex justify-between items-baseline mb-8 border-b border-gray-300 dark:border-white/10 pb-6">
              <h3 className="text-2xl font-semibold dark:text-text-light">Growth Retainer</h3>
              <div className="text-right">
                <span className="text-4xl font-bold dark:text-text-light">$1199</span>
                <span className="text-gray-500 dark:text-gray-400 text-lg">/mo</span>
              </div>
            </div>

            <div className="space-y-6 mb-10">
              <h4 className="text-xl font-bold dark:text-text-light">Design That Drives Business.</h4>
              <ul className="space-y-4">
                {[
                  "Dedicated Design Time",
                  "Priority Support",
                  "Weekly Strategy Calls",
                  "UI, UX, and Branding",
                  "Front-end Development"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <div className="w-5 h-5 rounded-full border border-gray-400 dark:border-gray-600 flex items-center justify-center">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* RESTORED BUTTON STYLE */}
            <button className="w-full bg-[#ff4d29] hover:bg-[#e64525] text-white font-bold py-4 transition-colors rounded-sm mb-4">
              Get Started Today
            </button>
            <p className="text-center text-sm text-gray-400 flex items-center justify-center gap-1">
               <span className="w-4 h-4 rounded-full border border-gray-300 inline-flex items-center justify-center text-[10px]">✓</span>
               7-day money-back guarantee.
            </p>
          </div>

          {/* RIGHT - Detailed Features */}
          <div className="w-full lg:flex-1 space-y-12 flex flex-col justify-between">
            <div className="space-y-12">
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
                  <div key={i} className="animate-feature flex items-start gap-4 group">
                    <div className="mt-1 bg-gray-400 dark:bg-gray-600 p-1 rounded-full text-white shrink-0">
                      <Check size={14} strokeWidth={4} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 dark:text-text-light">{feature.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-[16px]">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

            {/* RESTORED LOWER BUTTON STYLE */}
            <button className="animate-feature mt-8 w-full border border-solid border-[#0e0e0e66] dark:border-gray-500 hover:bg-[#0e0e0e0d] dark:hover:bg-gray-800 transition-colors bg-transparent dark:text-text-light py-4 font-semibold rounded-sm">
              Contact us for Custom Scopes
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default PricingSection;