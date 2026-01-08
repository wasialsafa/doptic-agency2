import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MessageCircle, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Constants ---
const FONT_INTER = 'Inter Variable, sans-serif';
const FONT_CASLON = 'Libre Caslon Text, serif';

// --- Color Classes ---
const textMain = "text-[#0e0e0e] dark:text-[#e2e2e2]";
// 70% opacity for subtexts (B2 hex is approx 70%)
const textSub = "text-[#0E0E0EB2] dark:text-[#E2E2E2]/70";
const bgInput = "bg-[#E2E2E2] dark:bg-[#0e0e0e]";
const borderFade = "border border-[#0e0e0e1a] dark:border-[#e2e2e21a]";

// Typography for Header Subtext
const subTextStyle = {
  fontFamily: FONT_INTER,
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '160%',
  letterSpacing: '0%',
  textAlign: 'right', 
};

const RequestQuote = () => {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const footerRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    topic: 'Select one...',
    description: '',
    message: '',
    terms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%", 
        }
      });

      tl.from(".anim-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      tl.from(".anim-subtitle", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6");

      tl.from(formRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.4");

      tl.from(footerRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.2");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const inputClasses = `w-full ${bgInput} ${borderFade} px-4 py-3 focus:outline-none focus:border-[#0e0e0e] dark:focus:border-[#e2e2e2] transition-all placeholder:text-[#0E0E0E]/40 dark:placeholder:text-[#E2E2E2]/40 ${textMain} `;
  const labelClasses = `block text-xs font-medium ${textSub} mb-2 ml-1 uppercase tracking-wider`;

  return (
    <div 
      className="min-h-screen bg-bg-light dark:bg-bg-dark font-sans text-[#0e0e0e] dark:text-[#e2e2e2] pb-20 pt-20 transition-colors duration-300 overflow-hidden"
      style={{ fontFamily: FONT_INTER }}
    >
      
      <div 
        ref={containerRef}
        className="w-full max-w-[1440px] mx-auto px-5 md:px-[60px] py-16"
      >
        
        {/* Header Section */}
        <div className="mb-24 w-full flex flex-col items-center">
          
          <h1 className="anim-title flex flex-col md:flex-row justify-center items-center md:items-baseline md:gap-6 text-center w-full">
            <span 
              className={textMain}
              style={{
                fontFamily: FONT_INTER,
                fontWeight: 500,
                fontSize: 'clamp(48px, 8vw, 128px)', 
                lineHeight: '120%',
                letterSpacing: '-0.04em',
              }}
            >
              Request a
            </span>
            <span 
              className={textMain}
              style={{
                fontFamily: FONT_CASLON,
                fontWeight: 400,
                fontStyle: 'italic',
                fontSize: 'clamp(40px, 6.5vw, 104px)', 
                lineHeight: '120%',
                letterSpacing: '-0.04em',
              }}
            >
              quote.
            </span>
          </h1>
          
          <div className="w-full flex justify-center mt-6">
            <p 
              className={`anim-subtitle ${textSub}`}
              style={{
                ...subTextStyle,
                maxWidth: '768px',
                width: '100%',
              }}
            >
              Share your renovation dreams with us through this form and get a free consultation that turns your vision into a clear, actionable plan.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <form ref={formRef} onSubmit={handleSubmit} className="max-w-4xl mx-auto mb-20">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className={labelClasses} style={{ fontFamily: FONT_INTER }}>First name</label>
              <input 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                type="text" 
                className={inputClasses} 
                style={{ fontFamily: FONT_INTER }}
                required
              />
            </div>
            <div>
              <label className={labelClasses} style={{ fontFamily: FONT_INTER }}>Last name</label>
              <input 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange} 
                type="text" 
                className={inputClasses} 
                style={{ fontFamily: FONT_INTER }}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className={labelClasses} style={{ fontFamily: FONT_INTER }}>Email</label>
              <input 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                type="email" 
                className={inputClasses} 
                style={{ fontFamily: FONT_INTER }}
                required
              />
            </div>
            <div>
              <label className={labelClasses} style={{ fontFamily: FONT_INTER }}>Phone number</label>
              <input 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                type="tel" 
                className={inputClasses} 
                style={{ fontFamily: FONT_INTER }}
              />
            </div>
          </div>

          <div className="mb-8">
            <label className={labelClasses} style={{ fontFamily: FONT_INTER }}>Choose a topic</label>
            <div className="relative">
              <select 
                name="topic" 
                value={formData.topic} 
                onChange={handleChange} 
                className={`${inputClasses} appearance-none cursor-pointer`}
                style={{ fontFamily: FONT_INTER }}
              >
                <option className="dark:bg-[#1a1a1a]">Select one...</option>
                <option className="dark:bg-[#1a1a1a]">Renovation</option>
                <option className="dark:bg-[#1a1a1a]">New Build</option>
                <option className="dark:bg-[#1a1a1a]">Consultation</option>
              </select>
              <div className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${textSub}`}>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className={`block text-lg font-medium ${textMain} mb-4`} style={{ fontFamily: FONT_INTER }}>Which best describes you?</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 ">
              {['First choice', 'Second choice', 'Third choice', 'Fourth choice', 'Fifth choice', 'Other'].map((option, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="radio" 
                      name="description" 
                      value={option} 
                      checked={formData.description === option}
                      onChange={handleChange}
                      className={`peer appearance-none w-5 h-5  rounded-full border border-gray-300 dark:border-gray-600 checked:border-black dark:checked:border-white transition-colors`} 
                    />
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-black dark:bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                  <span className={`${textSub} text-sm group-hover:text-black dark:group-hover:text-white transition-colors`} style={{ fontFamily: FONT_INTER }}>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className={labelClasses} style={{ fontFamily: FONT_INTER }}>Message</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6" 
              className={`${inputClasses} resize-none`}
              style={{ fontFamily: FONT_INTER }}
              placeholder="Type your message..."
            ></textarea>
          </div>

          <div className="mb-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className={`w-4 h-4  border border-[#0E0E0E33] dark:border-[#E2E2E233] bg-transparent focus:ring-0`} 
              />
              <span className={`${textSub} text-sm`} style={{ fontFamily: FONT_INTER }}>I accept the Terms</span>
            </label>
          </div>

          <button type="submit" className="w-full bg-[#FF4422] text-white font-medium py-4 hover:bg-[#E03311] transition-colors duration-300 shadow-sm " style={{ fontFamily: FONT_INTER }}>
            Submit
          </button>

        </form>

        {/* Footer Info Cards */}
        <div 
          ref={footerRef} 
          className="grid grid-cols-1 md:grid-cols-3 gap-[30px] max-w-[1290px] mx-auto w-full"
        >
          
          {/* Card 1: Email */}
          <div className={`md:h-[221px] ${borderFade} bg-bg-light dark:bg-bg-dark p-8 flex flex-col items-center justify-center text-center hover:bg-gray-100 dark:hover:bg-white/5 transition-colors duration-300 cursor-pointer group`}>
            {/* Icon: 40px width/height (w-10 h-10), Opacity 0.4 */}
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800  flex items-center justify-center mb-4 text-[#0e0e0e] dark:text-[#e2e2e2] opacity-40 group-hover:scale-110 transition-transform">
              <Mail size={20} />
            </div>
            {/* Title: 32px, 500 weight, -4% tracking */}
            <h3 
              className={`font-medium text-[32px] leading-[120%] tracking-[-0.04em] mb-1 ${textMain}`} 
              style={{ fontFamily: FONT_INTER }}
            >
              Email
            </h3>
            {/* Subtext: 18px, 400 weight, 70% opacity */}
            <p 
              className={`font-normal text-[18px] leading-[160%] tracking-[0] ${textSub}`} 
              style={{ fontFamily: FONT_INTER }}
            >
              info@dopslc.com
            </p>
          </div>

          {/* Card 2: Live Chat */}
          <div className={`md:h-[221px] ${borderFade} bg-bg-light dark:bg-bg-dark p-8  flex flex-col items-center justify-center text-center hover:bg-gray-100 dark:hover:bg-white/5 transition-colors duration-300 cursor-pointer group`}>
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800  flex items-center justify-center mb-4 text-[#0e0e0e] dark:text-[#e2e2e2] opacity-40 group-hover:scale-110 transition-transform">
              <MessageCircle size={20} />
            </div>
            <h3 
              className={`font-medium text-[32px] leading-[120%] tracking-[-0.04em] mb-1 ${textMain}`} 
              style={{ fontFamily: FONT_INTER }}
            >
              Live Chat
            </h3>
            <p 
              className={`font-normal text-[18px] leading-[160%] tracking-[0] ${textSub}`} 
              style={{ fontFamily: FONT_INTER }}
            >
              +1 (555) 000-0000
            </p>
          </div>

          {/* Card 3: Phone */}
          <div className={`md:h-[221px] ${borderFade} bg-bg-light dark:bg-bg-dark p-8  flex flex-col items-center justify-center text-center hover:bg-gray-100 dark:hover:bg-white/5 transition-colors duration-300 cursor-pointer group`}>
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800  flex items-center justify-center mb-4 text-[#0e0e0e] dark:text-[#e2e2e2] opacity-40 group-hover:scale-110 transition-transform">
              <Phone size={20} />
            </div>
            <h3 
              className={`font-medium text-[32px] leading-[120%] tracking-[-0.04em] mb-1 ${textMain}`} 
              style={{ fontFamily: FONT_INTER }}
            >
              Phone
            </h3>
            <p 
              className={`font-normal text-[18px] leading-[160%] tracking-[0] ${textSub}`} 
              style={{ fontFamily: FONT_INTER }}
            >
              81 Union Street, Dunstable
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default RequestQuote;