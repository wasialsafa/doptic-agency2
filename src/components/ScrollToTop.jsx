import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Force the browser window to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    // 2. Force your main content wrapper to top
    // (This is likely the one actually scrolling)
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }

    // 3. Fallback for generic 'main' tags
    const mainTag = document.querySelector('main');
    if (mainTag) {
      mainTag.scrollTop = 0;
    }

  }, [pathname]);

  return null;
}