import React, { useEffect } from "react";
import { X } from "lucide-react"; 

const ContactModal = ({ isOpen, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    // Container: Semi-transparent black overlay to let the footer show through
    <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4"
        onClick={onClose} // Clicking the background closes the modal
    >
      
      {/* Modal Card */}
      <div 
        className="relative w-full max-w-[600px] bg-white rounded-[20px] p-8 md:p-14 shadow-2xl animate-scale-up"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking the form itself
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute -top-5 -right-5 md:-top-6 md:-right-6 w-12 h-12 md:w-14 md:h-14 bg-[#ff4920] rounded-full flex items-center justify-center text-white hover:scale-110 hover:bg-[#e03e1b] transition-all shadow-lg z-50 cursor-pointer"
        >
          <X size={28} strokeWidth={3} />
        </button>

        {/* Form Content */}
        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          <div className="group">
            <input 
              type="text" 
              placeholder="Enter your name here.." 
              className="w-full py-4 border-b border-gray-300 text-lg text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#ff4920] transition-colors bg-transparent font-['Inter_Variable']"
            />
          </div>

          <div className="group">
            <input 
              type="tel" 
              placeholder="Enter your phone here.." 
              className="w-full py-4 border-b border-gray-300 text-lg text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#ff4920] transition-colors bg-transparent font-['Inter_Variable']"
            />
          </div>

          <div className="group">
            <input 
              type="email" 
              placeholder="Enter your e-mail here.." 
              className="w-full py-4 border-b border-gray-300 text-lg text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#ff4920] transition-colors bg-transparent font-['Inter_Variable']"
            />
          </div>

          <div className="group">
            <textarea 
              placeholder="Enter your ideas here.." 
              rows="3"
              className="w-full py-4 border-b border-gray-300 text-lg text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#ff4920] transition-colors bg-transparent resize-none font-['Inter_Variable']"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#ff4920] text-white text-xl font-medium py-4 rounded-full mt-6 hover:opacity-90 transition-opacity cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
        @keyframes scale-up {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-scale-up {
          animation: scale-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default ContactModal;