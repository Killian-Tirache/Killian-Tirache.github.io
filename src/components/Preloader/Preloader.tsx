import "./Preloader.css";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const shouldReduceMotion = useReducedMotion();
  const preloaderRef = useRef<HTMLDivElement>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [isVisible, setIsVisible] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const wordsPart1 = ["Bienvenue", "sur", "mon"];
  const wordsPart2 = ["Site", "Portfolio"];

  useEffect(() => {
    if (!isVisible) return;

    const fadeDelay = shouldReduceMotion ? 0 : 3500;
    const removeDelay = shouldReduceMotion ? 0 : 4200;
    const fadeTimer = window.setTimeout(() => {
      setFadeOut(true);
      onComplete();
    }, fadeDelay);
    const removeTimer = window.setTimeout(() => setIsVisible(false), removeDelay);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, [isVisible, onComplete, shouldReduceMotion]);

  useEffect(() => {
    if (!isVisible || fadeOut || !preloaderRef.current?.parentElement) return;

    const siblings = Array.from(preloaderRef.current.parentElement.children)
      .filter((element): element is HTMLElement => (
        element instanceof HTMLElement && element !== preloaderRef.current
      ));
    const previousValues = siblings.map((element) => element.inert);

    siblings.forEach((element) => {
      element.inert = true;
    });

    return () => {
      siblings.forEach((element, index) => {
        element.inert = previousValues[index];
      });
    };
  }, [fadeOut, isVisible]);

  const skipIntroduction = () => {
    setFadeOut(true);
    setIsVisible(false);
    onComplete();
    window.requestAnimationFrame(() => {
      document.getElementById("main-content")?.focus({ preventScroll: true });
    });
  };

  if (!isVisible) return null;

  return (
    <div ref={preloaderRef} className={`preloader ${fadeOut ? "fade-out" : ""}`}>
      <button type="button" className="preloader__skip" onClick={skipIntroduction}>
        Passer l’introduction
      </button>
      <motion.div className="spinner"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="spinner1"></div>
      </motion.div>

      <motion.div className="preloader__message" aria-hidden="true">
        {wordsPart1.map((word, index) => (
          <motion.span
            key={word}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
              delay: index * 0.5,
            }}
            style={{ display: "inline-block", marginRight: "1rem" }}
          >
            {word}
          </motion.span>
        ))}
        <br />
        {wordsPart2.map((word, index) => (
          <motion.b
            key={word}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
              delay: 0.6 + index * 0.5,
            }}
            style={{ display: "inline-block", marginRight: "1rem" }}
          >
            {word}
          </motion.b>
        ))}
      </motion.div>

      <motion.div className="progress-loader"
        aria-hidden="true"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="loader"></div>
      </motion.div>
    </div>
  );
};

export default Preloader;
