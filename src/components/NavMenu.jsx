import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import gsap from "gsap"
import { useTheme } from '../context/ThemeContext'

// Defined constant for Font Family
const FONT_INTER = '"Inter Variable", sans-serif'

export default function NavMenu({ isOpen, onClose }) {
  const { theme } = useTheme()
  const navigate = useNavigate()
  
  // Set default to null so only main texts are visible initially
  const [activeMenuKey, setActiveMenuKey] = useState(null)
  const [activeSubImage, setActiveSubImage] = useState(null)
  const [isLocked, setIsLocked] = useState(false)

  const menuContainerRef = useRef(null)
  const lineRef = useRef(null) 

  // Data Structure
  const navData = {
    "Home": { 
      path: "/", 
      subs: [
        { label: "Home_01", path: "/", image: "/images/navmenu/homepage1.svg" },
        { label: "Home_02", path: "/home-02", image: "/images/navmenu/homepage1.svg" },
        { label: "Home_03", path: "/home-03", image: "/images/navmenu/homepage1.svg" },
        { label: "Home_04", path: "/home-04", image: "/images/navmenu/homepage1.svg" }
      ]
    },
    "About": { 
      path: "/about", 
      subs: [
        { label: "About_01", path: "/about", image: "/images/aboutpage/AboutPageHeroImage.svg" },
        { label: "About_02", path: "/about", image: "/images/aboutpage/AboutPageHeroImage.svg" },
        { label: "About_03", path: "/about", image: "/images/aboutpage/AboutPageHeroImage.svg" },
        { label: "About_04", path: "/about", image: "/images/aboutpage/AboutPageHeroImage.svg" }
      ]
    },
    "Projects": { 
      path: "/projects", 
      subs: [
        { label: "All Projects", path: "/projects", image: "/images/projectspage/projectimage1.svg" },
        { label: "Project Details_01", path: "/projects/project_details_01", image: "/images/projectspage/projectimage2.svg" },
        { label: "Project Details_02", path: "/projects/project_details_02", image: "/images/proj3.jpg" },
        { label: "Project Details_03", path: "/projects/project_details_03", image: "/images/proj4.jpg" }
      ]
    },
    "Services": { 
      path: "/services", 
      subs: [
        { label: "Service_01", path: "/services", image: "/images/projectspage/projectimage3.svg" },
        { label: "Service_02", path: "/services/development", image: "/images/serv2.jpg" },
        { label: "Service_03", path: "/services/design", image: "/images/serv3.jpg" },
        { label: "Service_04", path: "/services/support", image: "/images/serv4.jpg" }
      ]
    },
    "Blogs": { 
      path: "/blog", 
      subs: [
        { label: "Blog Grid_01", path: "/blog", image: "/images/blogpage/blogimage1.svg" },
        { label: "Blog Standard_02", path: "/blogstandard02", image: "/images/blogpage/blogimage2.svg" },
        { label: "Blog Post_01", path: "/blogpost01", image: "/images/blogpage/blogpostimage1.svg" },
        { label: "Blog_04", path: "/blog/categories", image: "/images/blogpage/blogimage4.svg" }
      ]
    },
    "Team": { 
      path: "/team", 
      subs: [
        { label: "Team_01", path: "/team", image: "/images/teamspage/design lead.svg" },
        { label: "Design team", path: "/design_team", image: "/images/teamspage/design lead.svg" },
        { label: "Team_02", path: "/team/departments", image: "/images/team3.jpg" },
        { label: "Team_03", path: "/team/careers", image: "/images/team4.jpg" }
      ]
    },
    "Contact Us": { 
      path: "/contact01", // UPDATED: Direct path to contact01
      subs: [] // UPDATED: Removed sub-options as requested
    }
  }
  const navItems = Object.keys(navData)

  const moveLine = (target) => {
    if (!target || !lineRef.current) return;
    if (window.innerWidth < 1024) return;

    const { offsetTop } = target;
    
    gsap.to(lineRef.current, {
      top: offsetTop + 18,    
      left: 225,              
      width: 165,             
      height: 1,              
      opacity: 1,
      // Logic for Line Color based on Theme
      background: theme === 'dark' ? "#E2E2E2" : "#0E0E0E",  
      duration: 0.4,
      ease: "expo.out"
    });
  }

  // --- ANIMATION LOGIC ---
  useEffect(() => {
    if (isOpen) {
      // 1. Panel Slide Down
      gsap.to(menuContainerRef.current, { y: "0%", duration: 0.8, ease: "expo.inOut" })
      
      // 2. Text Stagger/Reveal Animation
      gsap.fromTo(
        ".menu-item-reveal", 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1, 
          ease: "power3.out",
          delay: 0.3 
        }
      );

    } else {
      // Close Panel
      gsap.to(menuContainerRef.current, { y: "-100%", duration: 0.8, ease: "expo.inOut" })
      setIsLocked(false)
      setActiveSubImage(null)
      setActiveMenuKey(null)
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
    if (name === "Contact Us") {
        handleSubLinkClick(navData[name].path);
        return;
    }
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
    }, 750)
  }

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsLocked(false)
      setActiveMenuKey(null)
      if (lineRef.current) {
        gsap.to(lineRef.current, { opacity: 0, duration: 0.3 });
      }
    }
  }

  return (
    <div 
      ref={menuContainerRef} 
      onClick={handleBackgroundClick}
      style={{ fontFamily: FONT_INTER }} 
      className={`fixed inset-0 transform -translate-y-full ${theme === 'dark' ? "bg-bg-dark" : "bg-[#E5E5E5]"} z-[90] overflow-y-auto lg:overflow-hidden`}
    >
      
      {/* MAIN CONTENT CONTAINER */}
      <div 
        onClick={handleBackgroundClick}
        className="w-full max-w-[1290px] mx-auto px-6 md:px-12 lg:px-0 pt-28 lg:pt-[150px] xl:pt-[200px] flex flex-col lg:flex-row justify-between lg:gap-[80px] relative h-auto lg:h-full min-h-[600px] pb-10 lg:pb-0"
      >
        
        {/* --- DIV 1: Navigation --- */}
        <div className="relative flex flex-col items-start w-full lg:w-[410px] shrink-0">
          
          <div 
              className="hidden lg:block absolute right-0 top-0 w-[1px] bg-gray-300 dark:bg-gray-700"
              style={{ height: '346px' }}
          />

          <div 
            ref={lineRef}
            className="absolute origin-left pointer-events-none opacity-0 hidden lg:block"
            // Default background color updated in moveLine logic, but initial style for safety:
            style={{ width: '0px', height: '1px', backgroundColor: theme === 'dark' ? '#E2E2E2' : '#0E0E0E' }} 
          />

          <nav className="flex flex-col gap-4 lg:gap-[24px] w-full">
            {navItems.map((name) => {
                
                // --- COLOR LOGIC ---
                const isSelected = activeMenuKey === name;
                let textColor;

                if (theme === 'dark') {
                    // Dark Mode Logic
                    textColor = isSelected ? '#E2E2E2' : '#E2E2E266';
                } else {
                    // Light Mode Logic
                    textColor = isSelected ? '#0E0E0E' : '#0E0E0E66';
                }

                return (
                  <div key={name} className="flex flex-col w-full">
                    {/* Main Menu Button */}
                    <button
                      id={`nav-${name}`}
                      className="menu-item-reveal text-left transition-all duration-300"
                      onMouseEnter={(e) => handleHover(name, e)}
                      onClick={(e) => handleMainItemClick(name, e)}
                      style={{ 
                        fontFamily: FONT_INTER,
                        fontWeight: 500, 
                        fontSize: '24px',
                        lineHeight: '120%',
                        letterSpacing: '-0.04em',
                        color: textColor, // Applied dynamic color
                        paddingLeft: isSelected ? '20px' : '0px'
                      }}
                    >
                      {name}
                    </button>

                    {/* MOBILE ACCORDION */}
                    <div 
                      className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
                        isSelected && name !== "Contact Us" ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'
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
                              style={{ fontFamily: FONT_INTER }} 
                              className={`text-left text-base ${
                                theme === 'dark' ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              {sub.label}
                            </button>
                          ))}

                          {/* MOBILE IMAGE VISIBILITY */}
                          {navData[name].subs.length > 0 && (
                            <div className="mt-4 w-full h-[200px] bg-gray-200 rounded-md overflow-hidden">
                                 <img 
                                    src={navData[name].subs[0].image || "/images/homepageImage.svg"} 
                                    alt={name}
                                    className="w-full h-full object-cover"
                                 />
                            </div>
                          )}

                      </div>
                    </div>
                  </div>
                )
            })}
          </nav>
        </div>

        {/* --- DIV 2: Middle (Sub Categories - DESKTOP) --- */}
        {activeMenuKey && activeMenuKey !== "Contact Us" ? (
            <div 
            onClick={handleBackgroundClick} 
            className="hidden lg:flex flex-col animate-fade-in"
            style={{ width: '390px', height: '210px', justifyContent: 'space-between' }}
            > 
            <nav className="flex flex-col gap-4 mt-2">
                {navData[activeMenuKey].subs.map((sub) => (
                <button 
                    key={sub.label} 
                    onClick={() => handleSubLinkClick(sub.path)}
                    onMouseEnter={() => setActiveSubImage(sub.image || "/images/homepageImage.svg")} 
                    onMouseLeave={() => setActiveSubImage(null)}
                    style={{ fontFamily: FONT_INTER }} 
                    className={`text-left text-lg transition-all hover:translate-x-2 duration-300 ${
                    theme === 'dark' ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"
                    }`}
                >
                    {sub.label}
                </button>
                ))}
            </nav>
            </div>
        ) : (
             <div className="hidden lg:block w-[390px]"></div>
        )}

        {/* --- DIV 3: Right Side (Image - DESKTOP) --- */}
        {activeMenuKey && activeMenuKey !== "Contact Us" ? (
            <div 
            onClick={handleBackgroundClick}
            className="hidden lg:block relative animate-fade-in"
            style={{ width: '330px', height: '294px' }}
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
        ) : (
             <div className="hidden lg:block w-[330px]"></div>
        )}

      </div>

      {/* --- BOTTOM DIV (Footer) --- */}
      <div className="relative mt-10 lg:mt-0 lg:absolute lg:bottom-[30px] w-full flex justify-center pb-10 lg:pb-0">
        <div 
            className="bg-[#FF4422] flex flex-wrap lg:flex-nowrap items-center justify-between"
            style={{
                width: '1290px',
                height: '66px',
                paddingTop: '20px',
                paddingBottom: '20px',
                paddingLeft: '30px',
                paddingRight: '30px'
            }}
        >
            <a href="#" style={{ fontFamily: FONT_INTER }} className="text-black text-sm font-medium hover:opacity-70 underline decoration-transparent hover:decoration-black transition-all">Instagram</a>
            <a href="#" style={{ fontFamily: FONT_INTER }} className="text-black text-sm font-medium hover:opacity-70 underline decoration-transparent hover:decoration-black transition-all">Linkedin</a>
            <a href="#" style={{ fontFamily: FONT_INTER }} className="text-black text-sm font-medium hover:opacity-70 underline decoration-transparent hover:decoration-black transition-all">Youtube</a>
            <a href="#" style={{ fontFamily: FONT_INTER }} className="text-black text-sm font-medium hover:opacity-70 underline decoration-transparent hover:decoration-black transition-all">Discord</a>
        </div>
      </div>

    </div>
  )
}