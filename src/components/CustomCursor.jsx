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

    // 1. Text Hover
    const onTextEnter = () => {
      if (cursorVariant === 'contact') return; 

      gsap.to(cursor, { scale: 1, duration: 0.3 }) 
      gsap.to(follower, {
        width: baseSize * 8, 
        height: baseSize * 8,
        backgroundColor: "white",
        mixBlendMode: "difference", 
        border: 'none',
        backdropFilter: 'none',
        duration: 0.5,
        ease: "expo.out",
        overwrite: 'auto'
      })
    }

    // 2. Image Hover
    const onImageEnter = () => {
      if (cursorVariant === 'contact') return;

      gsap.to(cursor, { scale: 0, duration: 0.3 })

      gsap.to(follower, {
        width: 100, 
        height: 100,
        backgroundColor: "rgba(255, 255, 255, 0.1)", 
        backdropFilter: "blur(5px)", 
        border: "1px solid rgba(255, 255, 255, 0.2)", 
        mixBlendMode: "normal", 
        duration: 0.5,
        ease: "power3.out",
        overwrite: 'auto'
      })
    }

    // 3. Reset
    const onLeave = () => {
      if (cursorVariant === 'contact') return;

      gsap.to(cursor, { scale: 1, duration: 0.3 })

      gsap.to(follower, {
        width: baseSize,
        height: baseSize,
        backgroundColor: "white",
        backdropFilter: "none",
        border: "none",
        mixBlendMode: "difference", 
        duration: 0.5,
        ease: "expo.out",
        overwrite: 'auto'
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, span, li, a, button, input, textarea')
    const imageElements = document.querySelectorAll('img, .project-image, .glass-cursor-trigger')

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


  // [4] Variant Watcher (Contact Mode Logic)
  useEffect(() => {
    const follower = followerRef.current
    const text = textRef.current
    const cursor = cursorRef.current 
    const baseSize = 32

    if (cursorVariant === 'contact') {
      
      // Hide the dot in contact mode
      gsap.to(cursor, { scale: 0, duration: 0.3 })

      gsap.to(follower, {
        width: baseSize * 5, 
        height: baseSize * 5,
        backgroundColor: "#FF4920", 
        mixBlendMode: "normal",
        // UPDATED: Added Black Border here
        border: '2px solid #000000', 
        duration: 0.7,
        ease: "elastic.out(1, 0.75)",
        overwrite: true 
      })

      gsap.to(follower, {
        scale: 1.2,
        duration: 0.8,
        repeat: -1, 
        yoyo: true, 
        ease: "sine.inOut",
        delay: 0.2
      })
      
      gsap.to(text, {
        opacity: 1,
        scale: 1,
        color: "#FFFFFF",
        duration: 0.3,
        delay: 0.1
      })

    } else {
      gsap.killTweensOf(follower, "scale") 

      // Bring dot back
      gsap.to(cursor, { scale: 1, duration: 0.3 })

      gsap.to(text, { opacity: 0, scale: 0, duration: 0.2 })
      
      gsap.to(follower, {
        width: baseSize,
        height: baseSize,
        scale: 1,
        backgroundColor: "white",
        mixBlendMode: "difference", 
        // UPDATED: Reset border to none
        border: 'none',
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
        className="pointer-events-none fixed top-0 left-0 w-8 h-8 bg-white rounded-full z-[9999] flex items-center justify-center overflow-hidden"
        style={{ 
          transform: 'translate3d(-50%, -50%, 0)',
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
          mixBlendMode: 'difference'
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