import "./Preloader.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Preloader = ({ setIsLoading }: {setIsLoading: React.Dispatch<React.SetStateAction<boolean>>} ) => {
  const [fadeOut, setFadeOut] = useState(false);
  const wordsPart1 = ["Bienvenue", "sur", "mon"];
  const wordsPart2 = ["Site", "Portfolio"];

  useEffect(() => {
    setTimeout(() => setFadeOut(true), 3500);
    setTimeout(() => setIsLoading(false), 3500);
    setTimeout(() => 4000);
  }, []);

  return (
    <div className={`preloader ${fadeOut ? "fade-out" : ""}`}>
      <motion.div className="spinner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="spinner1"></div>
      </motion.div>

      <motion.h3>
        {wordsPart1.map((word, index) => (
          <motion.span
            key={index}
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
            key={index}
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
      </motion.h3>

      <motion.div className="progress-loader"
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
