import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useCursor } from '../context/CursorContext'

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const textRef = useRef(null) 
  const { cursorVariant, cursorText } = useCursor()

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    
    if (!cursor || !follower) return

    const baseSize = 32; 

    // Quick setters
    const followerX = gsap.quickTo(follower, "x", { duration: 0.7, ease: "power3.out" })
    const followerY = gsap.quickTo(follower, "y", { duration: 0.7, ease: "power3.out" })
    const cursorX = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power2.out" })
    const cursorY = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power2.out" })

    const handleMouseMove = (e) => {
      cursorX(e.clientX)
      cursorY(e.clientY)
      followerX(e.clientX)
      followerY(e.clientY)
    }

    // --- Interaction Logic ---

    // 1. Text Hover (Generic)
    const onTextEnter = () => {
      if (cursorVariant === 'contact') return; 

      gsap.to(follower, {
        width: baseSize * 10, 
        height: baseSize * 10,
        backgroundColor: "white",
        mixBlendMode: "difference", // Keep difference for normal text
        duration: 0.5,
        ease: "expo.out",
        overwrite: 'auto'
      })
    }

    // 2. Image Hover
    const onImageEnter = () => {
      if (cursorVariant === 'contact') return;

      gsap.to(follower, {
        width: baseSize * 1.5,
        height: baseSize * 1.5,
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(1px) saturate(180%)", 
        border: "1px solid rgba(255, 255, 255, 0.4)",
        mixBlendMode: "normal",
        duration: 0.6,
        ease: "expo.out",
        overwrite: 'auto'
      })
    }

    // 3. Reset (Generic)
    const onLeave = () => {
      if (cursorVariant === 'contact') return;

      gsap.to(follower, {
        width: baseSize,
        height: baseSize,
        backgroundColor: "white",
        backdropFilter: "blur(0px)",
        border: "none",
        mixBlendMode: "difference", // Reset to difference
        duration: 0.5,
        ease: "expo.out",
        overwrite: 'auto'
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, span, li, a, button')
    const imageElements = document.querySelectorAll('img, .project-image')

    textElements.forEach(el => {
      el.addEventListener('mouseenter', onTextEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    imageElements.forEach(el => {
      el.addEventListener('mouseenter', onImageEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      textElements.forEach(el => {
        el.removeEventListener('mouseenter', onTextEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
      imageElements.forEach(el => {
        el.removeEventListener('mouseenter', onImageEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [cursorVariant]) 


  // [4] Variant Watcher
  useEffect(() => {
    const follower = followerRef.current
    const text = textRef.current
    const baseSize = 32

    if (cursorVariant === 'contact') {
      // === CONTACT MODE ===
      gsap.to(follower, {
        width: baseSize * 5, 
        height: baseSize * 5,
        backgroundColor: "#ffffff", // Pure White
        mixBlendMode: "normal",     // IMPORTANT: No color inversion!
        border: 'none',
        duration: 0.4,
        ease: "expo.out",
        overwrite: true 
      })
      
      gsap.to(text, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        delay: 0.1
      })
    } else {
      // === NORMAL MODE ===
      gsap.to(text, {
        opacity: 0,
        scale: 0,
        duration: 0.2
      })
      
      // Reset back to blend-mode difference
      gsap.to(follower, {
        width: baseSize,
        height: baseSize,
        backgroundColor: "white",
        mixBlendMode: "difference", // Go back to inverting colors
        duration: 0.4,
        ease: "expo.out",
        overwrite: 'auto'
      })
    }
  }, [cursorVariant])


  return (
    <>
      <div 
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 w-1.5 h-1.5 bg-white mix-blend-difference rounded-full z-[10000]"
        style={{ transform: 'translate3d(-50%, -50%, 0)' }}
      />
      
      <div 
        ref={followerRef}
        // Removed 'mix-blend-difference' class here because we control it via GSAP now
        className="pointer-events-none fixed top-0 left-0 w-8 h-8 bg-white rounded-full z-[9999] flex items-center justify-center overflow-hidden"
        style={{ 
          transform: 'translate3d(-50%, -50%, 0)',
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
          mixBlendMode: 'difference' // Default start state
        }}
      >
        <span 
            ref={textRef} 
            className="text-black text-xs font-bold opacity-0 uppercase whitespace-nowrap"
            style={{ 
              fontFamily: 'Inter Variable, sans-serif',
              letterSpacing: '0.05em'
            }}
        >
            {cursorText}
        </span>
      </div>
    </>
  )
}

export default CustomCursor