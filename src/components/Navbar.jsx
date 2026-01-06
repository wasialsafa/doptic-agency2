import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import Button from './MagneticButton'
import { gsap } from 'gsap'
import { useTheme } from '../context/ThemeContext'

const Navbar = ({ onMenuClick, menuOpen }) => {
  const { theme } = useTheme()
  const navRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    gsap.fromTo(
      nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const heroHeight = window.innerHeight
      if (menuOpen) return;

      if (currentScrollY > heroHeight * 0.8) {
        gsap.to(nav, { y: -100, duration: 0.4, ease: 'power2.inOut' })
      } else {
        gsap.to(nav, { y: 0, duration: 0.4, ease: 'power2.inOut' })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen) {
      gsap.to(line1Ref.current, { rotation: 45, y: 4, duration: 0.4, ease: "power2.inOut" })
      gsap.to(line2Ref.current, { rotation: -45, y: -4, duration: 0.4, ease: "power2.inOut" })
    } else {
      gsap.to(line1Ref.current, { rotation: 0, y: 0, duration: 0.4, ease: "power2.inOut" })
      gsap.to(line2Ref.current, { rotation: 0, y: 0, duration: 0.4, ease: "power2.inOut" })
    }
  }, [menuOpen])

  return (
    <>
      {/* --- 1. Top Navbar (Original) --- */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[100] bg-transparent backdrop-blur-sm w-full"
      >
        <div className="w-full max-w-[1440px] h-[80px] mx-auto px-[75px]">
          <div className="flex justify-between items-center h-full">
            
            {/* Logo Section */}
            <div className="flex items-center">
              <Link to="/">
                <img 
                  src={theme === 'dark' ? "/logos/doptic_logo_dark.svg" : "/logos/doptic_logo_light.svg"} 
                  alt="Doptic Logo"
                  className="w-auto h-[32px] cursor-pointer" 
                />
              </Link>
            </div>

            {/* Controls (ThemeToggle removed from here) */}
            <div className="flex items-center gap-[20px]">
              {/* <ThemeToggle />  <-- Removed from here */}
              
              <div className="hidden lg:block">
                <Button
                  text="Menu"
                  fill_background_color="#ff4920"
                  onClick={onMenuClick}
                  magnetic={true}
                />
              </div>

              <button 
                onClick={onMenuClick}
                className="group flex flex-col items-center justify-center w-8 h-8 gap-[6px] cursor-pointer z-[110]"
                aria-label="Toggle menu"
              >
                <div 
                  ref={line1Ref}
                  className={`w-7 h-[2px] transition-colors duration-300 ${
                      theme === 'dark' ? 'bg-white' : 'bg-black'
                  }`}
                />
                <div 
                  ref={line2Ref}
                  className={`w-7 h-[2px] transition-colors duration-300 ${
                      theme === 'dark' ? 'bg-white' : 'bg-black'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- 2. Floating Theme Toggle (Bottom Right) --- */}
      {/* - fixed: Keeps it stuck to the viewport 
          - bottom-8 / right-8: Distance from edges
          - z-[110]: Ensures it sits on top of other content
      */}
      <div className="fixed bottom-8 right-8 z-[110]">
        <ThemeToggle />
      </div>
    </>
  )
}

export default Navbar