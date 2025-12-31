import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import gsap from "gsap"
import { useTheme } from '../context/ThemeContext'

// Defined constant for Font Family
const FONT_INTER = '"Inter Variable", sans-serif'

export default function NavMenu({ isOpen, onClose }) {
  const { theme } = useTheme()
  const navigate = useNavigate()
  
  const [activeMenuKey, setActiveMenuKey] = useState("Home")
  const [activeSubImage, setActiveSubImage] = useState(null)
  const [isLocked, setIsLocked] = useState(false)

  const menuContainerRef = useRef(null)
  const lineRef = useRef(null) 

  // Data Structure
  const navData = {
    "Home": { 
      path: "/", 
      subs: [
        { label: "Home_01", path: "/", image: "/images/home1.jpg" },
        { label: "Home_02", path: "/home-02", image: "/images/home2.jpg" },
        { label: "Home_03", path: "/home-03", image: "/images/home3.jpg" },
        { label: "Home_04", path: "/home-04", image: "/images/home4.jpg" }
      ]
    },
    "About": { 
      path: "/about", 
      subs: [
        { label: "About_01", path: "/about", image: "/images/about1.jpg" },
        { label: "About_02", path: "/about", image: "/images/about2.jpg" },
        { label: "About_03", path: "/about", image: "/images/about3.jpg" },
        { label: "About_04", path: "/about", image: "/images/about4.jpg" }
      ]
    },
    "Projects": { 
      path: "/projects", 
      subs: [
        { label: "All Projects", path: "/projects", image: "/images/proj1.jpg" },
        { label: "Project Details_01", path: "/projects/project_details_01", image: "/images/proj2.jpg" },
        { label: "Project Details_02", path: "/projects/project_details_02", image: "/images/proj3.jpg" },
        { label: "Project Details_03", path: "/projects/project_details_03", image: "/images/proj4.jpg" }
      ]
    },
    "Services": { 
      path: "/services", 
      subs: [
        { label: "Service_01", path: "/services", image: "/images/serv1.jpg" },
        { label: "Service_02", path: "/services/development", image: "/images/serv2.jpg" },
        { label: "Service_03", path: "/services/design", image: "/images/serv3.jpg" },
        { label: "Service_04", path: "/services/support", image: "/images/serv4.jpg" }
      ]
    },
    "Blogs": { 
      path: "/blog", 
      subs: [
        { label: "Blog Grid_01", path: "/blog", image: "/images/blog1.jpg" },
        { label: "Blog Standard_02", path: "/blogstandard02", image: "/images/blog2.jpg" },
        { label: "Blog Post_01", path: "/blogpost01", image: "/images/blog3.jpg" },
        { label: "Blog_04", path: "/blog/categories", image: "/images/blog4.jpg" }
      ]
    },
    "Team": { 
      path: "/team", 
      subs: [
        { label: "Team_01", path: "/team", image: "/images/team1.jpg" },
        { label: "Design team", path: "/design_team", image: "/images/team2.jpg" },
        { label: "Team_02", path: "/team/departments", image: "/images/team3.jpg" },
        { label: "Team_03", path: "/team/careers", image: "/images/team4.jpg" }
      ]
    },
    "Contact Us": { 
      path: "/contact", 
      subs: [
        { label: "Contact_01", path: "/contact01", image: "/images/contact1.jpg" },
        { label: "Location", path: "/contact/location", image: "/images/contact2.jpg" },
        { label: "Inquiry", path: "/contact/inquiry", image: "/images/contact3.jpg" }
      ]
    }
  }

  const navItems = Object.keys(navData)

  // Logic to move the line beside the active main menu item
  const moveLine = (target) => {
    if (!target || !lineRef.current) return;
    
    // Only run this logic on larger screens where the line is visible
    if (window.innerWidth < 1024) return;

    const { offsetTop, offsetHeight, offsetWidth } = target;
    
    gsap.to(lineRef.current, {
      top: offsetTop + (offsetHeight / 2),
      left: offsetWidth - 100, // Reduced distance
      width: 165,             
      height: 1,              
      opacity: 1,
      duration: 0.4,
      ease: "expo.out"
    });
  }

  // Animation for Open/Close
  useEffect(() => {
    if (isOpen) {
      gsap.to(menuContainerRef.current, { y: "0%", duration: 0.8, ease: "expo.inOut" })
      setTimeout(() => {
        const firstBtn = document.getElementById(`nav-${activeMenuKey}`);
        moveLine(firstBtn);
      }, 600);
    } else {
      gsap.to(menuContainerRef.current, { y: "-100%", duration: 0.8, ease: "expo.inOut" })
      setIsLocked(false)
      setActiveSubImage(null)
    }
  }, [isOpen])

  const handleHover = (name, e) => {
    if (window.innerWidth >= 1024 && !isLocked) {
      setActiveMenuKey(name)
      moveLine(e.currentTarget)
      setActiveSubImage(null)
    }
  }

  const handleMainItemClick = (name, e) => {
    setActiveMenuKey(name)
    if (window.innerWidth >= 1024) {
      setIsLocked(true)
      moveLine(e.currentTarget)
    }
  }

  const handleSubLinkClick = (path) => {
    if (!path) return;
    onClose()
    setTimeout(() => { 
      navigate(path);
      window.location.reload();
    }, 750)
  }

  // RESET LOGIC: Clicking on the background
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsLocked(false)
    }
  }

  return (
    <div 
      ref={menuContainerRef} 
      onClick={handleBackgroundClick}
      style={{ fontFamily: FONT_INTER }} // Applied to Main Wrapper
      className={`fixed inset-0 transform -translate-y-full ${theme === 'dark' ? "bg-bg-dark" : "bg-[#E5E5E5]"} z-[90] overflow-y-auto lg:overflow-hidden`}
    >
      
      {/* MAIN CONTENT CONTAINER */}
      <div 
        onClick={handleBackgroundClick}
        className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[75px] pt-28 lg:pt-[200px] flex flex-col lg:flex-row justify-between relative h-full min-h-[600px] pb-24 lg:pb-0"
      >
        
        {/* --- DIV 1: Navigation --- */}
        <div className="relative flex flex-col items-start w-full lg:w-[410px] gap-6 shrink-0">
          
          <div 
            ref={lineRef}
            className="absolute bg-gray-400 dark:bg-gray-500 origin-left pointer-events-none opacity-0 hidden lg:block"
            style={{ width: '0px', height: '1px' }} 
          />

          <nav className="flex flex-col gap-4 lg:gap-[24px] w-full">
            {navItems.map((name) => (
              <div key={name} className="flex flex-col w-full">
                {/* Main Menu Button */}
                <button
                  id={`nav-${name}`}
                  onMouseEnter={(e) => handleHover(name, e)}
                  onClick={(e) => handleMainItemClick(name, e)}
                  className={`text-left text-[32px] md:text-[40px] leading-tight transition-colors duration-300 ${
                    activeMenuKey === name
                      ? (theme === 'dark' ? "text-white" : "text-black")
                      : "text-gray-400 dark:text-gray-600"
                  }`}
                  // Applied FONT_INTER merged with fontWeight logic
                  style={{ 
                    fontFamily: FONT_INTER,
                    fontWeight: activeMenuKey === name ? 500 : 400 
                  }}
                >
                  {name}
                </button>

                {/* MOBILE ACCORDION */}
                <div 
                  className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
                    activeMenuKey === name ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="flex flex-col gap-3 pl-4 border-l-2 border-gray-300 dark:border-gray-700">
                     {navData[name].subs.map((sub) => (
                        <button 
                          key={sub.label} 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSubLinkClick(sub.path);
                          }}
                          style={{ fontFamily: FONT_INTER }} // Applied to Mobile Sub-links
                          className={`text-left text-base ${
                            theme === 'dark' ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {sub.label}
                        </button>
                     ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* --- DIV 2: Middle (Sub Categories - DESKTOP) --- */}
        <div 
          onClick={handleBackgroundClick} 
          className="hidden lg:flex w-[390px] flex-col pt-4"
        > 
          <h3 
            style={{ fontFamily: FONT_INTER }} // Applied to Header
            className={`text-xs uppercase tracking-[0.2em] font-bold opacity-40 mb-10 ${theme === 'dark' ? "text-white" : "text-black"}`}
          >
            {activeMenuKey} Categories
          </h3>
          
          <nav className="flex flex-col gap-4">
            {navData[activeMenuKey].subs.map((sub) => (
              <button 
                key={sub.label} 
                onClick={() => handleSubLinkClick(sub.path)}
                onMouseEnter={() => setActiveSubImage(sub.image || "/images/homepageImage.svg")} 
                onMouseLeave={() => setActiveSubImage(null)}
                style={{ fontFamily: FONT_INTER }} // Applied to Desktop Sub-links
                className={`text-left text-lg transition-all hover:translate-x-2 duration-300 ${
                  theme === 'dark' ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"
                }`}
              >
                {sub.label}
              </button>
            ))}
          </nav>
        </div>

        {/* --- DIV 3: Right Side (Image - DESKTOP) --- */}
        <div 
          onClick={handleBackgroundClick}
          className="hidden lg:block w-[330px] h-[294px] relative"
        >
          {activeSubImage && (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-800 overflow-hidden shadow-xl animate-fade-in">
              <img 
                src={activeSubImage} 
                alt="Preview" 
                className="w-full h-full object-cover" 
              />
            </div>
          )}
        </div>

      </div>

      {/* --- BOTTOM DIV (Footer) --- */}
      <div 
        className="absolute bottom-0 lg:bottom-[30px] left-0 lg:left-[75px] right-0 lg:right-[75px] h-auto lg:h-[66px] bg-[#FF4422] flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-between gap-4 lg:gap-0 px-6 py-4 lg:px-[30px] lg:py-[20px]"
      >
        <a 
            href="#" 
            style={{ fontFamily: FONT_INTER }} // Applied to Footer
            className="text-black text-sm font-medium hover:opacity-70 underline decoration-transparent hover:decoration-black transition-all"
        >
            Instagram
        </a>
        <a 
            href="#" 
            style={{ fontFamily: FONT_INTER }} // Applied to Footer
            className="text-black text-sm font-medium hover:opacity-70 underline decoration-transparent hover:decoration-black transition-all"
        >
            Linkedin
        </a>
        <a 
            href="#" 
            style={{ fontFamily: FONT_INTER }} // Applied to Footer
            className="text-black text-sm font-medium hover:opacity-70 underline decoration-transparent hover:decoration-black transition-all"
        >
            Youtube
        </a>
        <a 
            href="#" 
            style={{ fontFamily: FONT_INTER }} // Applied to Footer
            className="text-black text-sm font-medium hover:opacity-70 underline decoration-transparent hover:decoration-black transition-all"
        >
            Discord
        </a>
      </div>

    </div>
  )
}