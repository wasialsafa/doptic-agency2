import React from "react";
// Removed useNavigate since we want a hard refresh
import { useCursor } from "../context/CursorContext";

// --- START: CallToActionSection Component ---

export const CallToActionSection = () => {
  const { setCursorVariant, setCursorText } = useCursor();

  const handleMouseEnter = () => {
    setCursorVariant("contact");
    setCursorText("CONTACT US");
  };

  const handleMouseLeave = () => {
    setCursorVariant("default");
    setCursorText("");
  };

  const handleClick = () => {
    // Reset cursor first
    setCursorVariant("default");
    setCursorText("");
    
    // ✅ FIX: Force a manual refresh/hard load to the contact page
    // This kills all stuck GSAP animations from the previous page
    window.location.href = "/contact01";
  };

  return (
    <section 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="flex flex-col w-full items-center gap-20 px-6 md:px-[75px] py-[100px] md:py-[200px] bg-[#ff4920] transition-colors duration-300 cursor-none"
    >
      <div className="flex flex-col items-center gap-3.5 relative w-full pointer-events-none">
        <h2 className="w-fit font-normal text-transparent text-5xl md:text-7xl lg:text-9xl text-center leading-tight md:leading-[128px] relative mt-[-1.00px] [font-family:'Inter_Variable-Medium',Helvetica] translate-y-[-1rem] animate-fade-in opacity-1 [--animation-delay:200ms]">
          <span className="font-medium text-text-dark dark:text-text-light tracking-tighter md:tracking-[-6.55px] leading-tight md:leading-[153.6px]">
            GOT AN IDEA?
            <br />
          </span>

          <span className="[font-family:'Libre_Caslon_Text',Helvetica] italic text-text-dark dark:text-text-light tracking-tighter md:tracking-[-6.55px] leading-tight md:leading-[153.6px]">
            LET&#39;S TALK
          </span>
        </h2>

        <p className="text-text-dark dark:text-text-light text-base md:text-lg text-center leading-[28.8px] relative [font-family:'Inter_Variable-Regular',Helvetica] font-normal tracking-[0] max-w-full translate-y-[-1rem] animate-fade-in opacity-1 [--animation-delay:400ms]">
          We craft design experiences that leave a lasting impression bold,
          purposeful, and deeply human.
        </p>
      </div>
    </section>
  );
};

// --- END: CallToActionSection Component ---

// --- START: FooterSection Component ---

// ✅ FIX: Added 'href' to these links so they actually go somewhere
const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Project", href: "/projects" },
  { label: "Service", href: "/services" },
  { label: "Values", href: "/about" }, // Assuming values is on about page
  { label: "Contact", href: "/contact01" }, // ✅ Goes to contact page
];

const supportLinks = [
  { label: "Style Guide", href: "#" },
  { label: "License", href: "#" },
  { label: "Changelog", href: "#" },
  { label: "Link Nine", href: "#" },
  { label: "Link Ten", href: "#" },
];

const socialLinks = [
  {
    icon: "https://c.animaapp.com/mj6xytezddxCqE/img/scoials-cur-05.svg",
    label: "Instagram",
    href: "#"
  },
  {
    icon: "https://c.animaapp.com/mj6xytezddxCqE/img/scoials-cur-03.svg",
    label: "LinkedIn",
    href: "#"
  },
  {
    icon: "https://c.animaapp.com/mj6xytezddxCqE/img/icon---youtube.svg",
    label: "Youtube",
    href: "#"
  },
];

export const FooterSection = () => {
  return (
    <footer className="w-full bg-bg-light dark:bg-bg-dark flex flex-col relative overflow-hidden">
      
      {/* Page Container */}
      <div className="w-full max-w-[1440px] mx-auto pt-[80px] md:pt-[120px] px-6 md:px-[75px] pb-[20px] flex flex-col gap-[64px]">
        
        {/* --- Top Div --- */}
        <div className="w-full flex flex-col lg:flex-row items-start">
          
          {/* Left Side: Navigation Links */}
          <div className="flex flex-wrap md:flex-nowrap items-start gap-8 flex-1 w-full lg:max-w-[730px]">
            {/* Company */}
            <nav className="items-start gap-4 flex-1 flex flex-col min-w-[120px]">
              <h3 className="self-stretch [font-family:'Inter_Variable-Medium',Helvetica] font-medium text-text-dark dark:text-text-light text-xl md:text-2xl tracking-[-0.96px] leading-[28.8px]">
                Company
              </h3>
              <ul className="items-start self-stretch w-full flex flex-col">
                {companyLinks.map((link, index) => (
                  <li key={index} className="flex items-start px-0 py-2 self-stretch w-full">
                    <a 
                      href={link.href} // ✅ Uses the real URL
                      className="flex-1 [font-family:'Inter_Variable-Regular',Helvetica] font-normal text-gray-700 dark:text-text-secondary text-base tracking-[0] leading-[25.6px] hover:text-text-dark dark:text-text-light transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Support */}
            <nav className="items-start gap-4 flex-1 flex flex-col min-w-[120px]">
              <h3 className="self-stretch [font-family:'Inter_Variable-Medium',Helvetica] font-medium text-text-dark dark:text-text-light text-xl md:text-2xl tracking-[-0.96px] leading-[28.8px]">
                Support
              </h3>
              <ul className="flex flex-col items-start self-stretch w-full">
                {supportLinks.map((link, index) => (
                  <li key={index} className="flex items-start px-0 py-2 self-stretch w-full">
                    <a href={link.href} className="flex-1 [font-family:'Inter_Variable-Regular',Helvetica] font-normal text-gray-700 dark:text-text-secondary text-base tracking-[0] leading-[25.6px] hover:text-text-dark dark:text-text-light transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social */}
            <nav className="items-start gap-4 flex-1 flex flex-col min-w-[120px]">
              <h3 className="self-stretch [font-family:'Inter_Variable-Medium',Helvetica] font-medium text-text-dark dark:text-text-light text-xl md:text-2xl tracking-[-0.96px] leading-[28.8px]">
                Social
              </h3>
              <ul className="flex flex-col items-start self-stretch w-full">
                {socialLinks.map((link, index) => (
                  <li key={index} className="flex items-center gap-3 px-0 py-2 self-stretch w-full">
                    {link.icon && <img className="w-6 h-6" alt={link.label} src={link.icon} />}
                    <a href={link.href} className="[font-family:'Inter_Variable-Regular',Helvetica] font-normal text-gray-700 dark:text-text-secondary text-base tracking-[0] leading-[25.6px] whitespace-nowrap hover:text-text-dark dark:text-text-light transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right Side: Email */}
          <div className="w-full lg:w-[560px] lg:h-[77px] flex flex-col gap-6 lg:ml-auto items-start lg:items-end mt-10 lg:mt-0">
            <a
              href="mailto:hello@info.com"
              className="[font-family:'Inter_Variable-Medium',Helvetica] font-medium text-text-dark dark:text-text-light 
              text-4xl md:text-5xl lg:text-[64px] 
              text-left lg:text-right tracking-[-1px] lg:tracking-[-2.56px] leading-tight lg:leading-[76.8px] hover:opacity-70 transition-opacity break-all md:break-normal"
            >
              hello@info.com
            </a>
          </div>
        </div>

        {/* --- Bottom Div --- */}
        <div className="w-full flex flex-col gap-[48px]">
          <h2 className="text-start self-stretch [font-family:'Inter_Variable-Medium',Helvetica] font-medium text-text-dark dark:text-text-light text-6xl md:text-8xl lg:text-[160px] tracking-[0] leading-tight md:leading-[1] lg:leading-[0.9]">
            Doptic
          </h2>

          <div className="w-full items-center gap-5 flex flex-col">
            <div className="w-full h-px bg-[#0e0e0e1a] dark:bg-[#ffffff1a]" />
            <div className="flex items-center justify-center w-full text-center">
              <p className="[font-family:'Inter_Variable-Regular',Helvetica] font-normal text-gray-700 dark:text-text-secondary text-sm md:text-base tracking-[0] leading-[25.6px] whitespace-normal md:whitespace-nowrap">
                Copyright ©Doptic – Where designs meet the future.
              </p>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

// --- Combined Component ---

export const PageBottom = () => {
  return (
    <>
      <CallToActionSection />
      <FooterSection />
    </>
  );
};

export default FooterSection;