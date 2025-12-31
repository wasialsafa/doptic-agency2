// components/SmoothScroll.jsx
import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      // DURATION: The "smoothness" (default is 1.2). Higher = smoother/floatier.
      duration: 1.5, 
      
      // EASING: The curve of the scroll (easeOutQuart is standard premium feel)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      
      // SENSITIVITY: This controls how "fast" the scroll is.
      // 1 is default. 2 means one flick scrolls twice as much distance.
      // Try values between 1.5 and 2.5 to get that "1 scroll finishes page" feel.
      wheelMultiplier: 2, 
      
      // Infinite scroll? (usually false)
      infinite: false,
    });

    // This connects Lenis to the browser's animation frame for performance
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;