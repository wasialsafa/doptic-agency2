import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MessageCircle, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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

  // Handle Input Changes
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
    // Add your API call here
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%", // Trigger slightly earlier for better UX
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

      // Animate the form rows (children of the form container)
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

  const inputClasses = "w-full bg-[#E5E5E5]/50 dark:bg-white/10 border border-gray-300 dark:border-gray-700 px-4 py-3 focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500 focus:outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-white rounded-md"; // Added rounded-md for polish
  const labelClasses = "block text-xs font-medium text-gray-600 dark:text-gray-300 mb-2 ml-1 uppercase tracking-wider"; // Added uppercase/tracking for design polish

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark font-sans text-black dark:text-white pb-20 pt-20 transition-colors duration-300 overflow-hidden">
      
      {/* Ideally, move this to index.css */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Libre+Caslon+Text:ital,wght@0,400;1,400&display=swap');
        `}
      </style>

      <div 
        ref={containerRef}
        className="max-w-[calc(100%-40px)] md:max-w-[calc(100%-60px)] lg:max-w-[calc(100%-120px)] mx-auto px-0 py-16"
      >
        
        {/* Header Section */}
        <div className="text-center mb-24 w-full">
          <h1 className="anim-title flex flex-col md:flex-row justify-center items-center md:items-baseline md:gap-6">
            <span 
              className="text-black dark:text-white"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 'clamp(48px, 8vw, 128px)', 
                lineHeight: '120%',
                letterSpacing: '-0.04em',
              }}
            >
                Request a
            </span>
            <span 
              className="text-black dark:text-white"
              style={{
                fontFamily: "'Libre Caslon Text', serif",
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
          <p className="anim-subtitle text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-md mx-auto mt-6">
            Share your renovation dreams with us through this form and get a free consultation that turns your vision into a clear, actionable plan.
          </p>
        </div>

        {/* Form Section */}
        <form ref={formRef} onSubmit={handleSubmit} className="max-w-4xl mx-auto mb-20">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className={labelClasses}>First name</label>
              <input 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                type="text" 
                className={inputClasses} 
                required
              />
            </div>
            <div>
              <label className={labelClasses}>Last name</label>
              <input 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange} 
                type="text" 
                className={inputClasses} 
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className={labelClasses}>Email</label>
              <input 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                type="email" 
                className={inputClasses} 
                required
              />
            </div>
            <div>
              <label className={labelClasses}>Phone number</label>
              <input 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                type="tel" 
                className={inputClasses} 
              />
            </div>
          </div>

          <div className="mb-8">
            <label className={labelClasses}>Choose a topic</label>
            <div className="relative">
              <select 
                name="topic" 
                value={formData.topic} 
                onChange={handleChange} 
                className={`${inputClasses} appearance-none cursor-pointer`}
              >
                <option className="dark:bg-[#1a1a1a]">Select one...</option>
                <option className="dark:bg-[#1a1a1a]">Renovation</option>
                <option className="dark:bg-[#1a1a1a]">New Build</option>
                <option className="dark:bg-[#1a1a1a]">Consultation</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-lg font-medium text-black dark:text-white mb-4">Which best describes you?</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
              {['First choice', 'Second choice', 'Third choice', 'Fourth choice', 'Fifth choice', 'Other'].map((option, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="radio" 
                      name="description" 
                      value={option}
                      checked={formData.description === option}
                      onChange={handleChange}
                      className="peer appearance-none w-5 h-5 rounded-full border border-gray-300 dark:border-gray-600 checked:border-black dark:checked:border-white transition-colors" 
                    />
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-black dark:bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 text-sm group-hover:text-black dark:group-hover:text-white transition-colors">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className={labelClasses}>Message</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6" 
              className={`${inputClasses} resize-none`}
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
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-black dark:bg-white/10 focus:ring-0" 
              />
              <span className="text-gray-500 dark:text-gray-400 text-sm">I accept the Terms</span>
            </label>
          </div>

          <button type="submit" className="w-full bg-[#FF4422] text-white font-medium py-4 hover:bg-[#E03311] transition-colors duration-300 shadow-sm rounded-md">
            Submit
          </button>

        </form>

        {/* Footer Info Cards */}
{/* Footer Info Cards */}
        {/* Applied Styles based on requirements:
            - Width: 1290px (max-w-[1290px])
            - Height: 221px (md:h-[221px] - fixed on desktop, auto on mobile)
            - Gap: 30px (gap-[30px])
        */}
        <div 
          ref={footerRef} 
          className="grid grid-cols-1 md:grid-cols-3 gap-[30px] max-w-[1290px] mx-auto w-full"
        >
          
          {/* Card 1: Email */}
          <div className="md:h-[221px] border border-gray-200/60 dark:border-gray-800 bg-[#Eaeaea] dark:bg-white/5 p-8 rounded-lg flex flex-col items-center justify-center text-center hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-300 cursor-pointer group">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 text-gray-700 dark:text-gray-200 group-hover:scale-110 transition-transform">
              <Mail size={20} />
            </div>
            <h3 className="font-semibold text-lg mb-1 text-black dark:text-white">Email</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">info@dopslc.com</p>
          </div>

          {/* Card 2: Live Chat */}
          <div className="md:h-[221px] border border-gray-200/60 dark:border-gray-800 bg-[#Eaeaea] dark:bg-white/5 p-8 rounded-lg flex flex-col items-center justify-center text-center hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-300 cursor-pointer group">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 text-gray-700 dark:text-gray-200 group-hover:scale-110 transition-transform">
              <MessageCircle size={20} />
            </div>
            <h3 className="font-semibold text-lg mb-1 text-black dark:text-white">Live Chat</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">+1 (555) 000-0000</p>
          </div>

          {/* Card 3: Phone */}
          <div className="md:h-[221px] border border-gray-200/60 dark:border-gray-800 bg-[#Eaeaea] dark:bg-white/5 p-8 rounded-lg flex flex-col items-center justify-center text-center hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-300 cursor-pointer group">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 text-gray-700 dark:text-gray-200 group-hover:scale-110 transition-transform">
              <Phone size={20} />
            </div>
            <h3 className="font-semibold text-lg mb-1 text-black dark:text-white">Phone</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">81 Union Street, Dunstable</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default RequestQuote;