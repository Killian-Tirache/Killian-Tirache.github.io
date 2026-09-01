import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    const isClientNavigation = previousPath.current !== null;
    previousPath.current = pathname;

    const frame = window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      if (isClientNavigation) {
        document.getElementById("main-content")?.focus({ preventScroll: true });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);
  return null;
}

export default ScrollToTop;
