import "./HomeCard.css";
import HomeImage from "./../../assets/home-image.webp";
import { motion, useMotionValue, animate } from "framer-motion";
import { useRef } from "react";
import FadeInWhenVisible from "../FadeinWhenVisible/FadeInWhenVisible";

const HomeCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = x - centerX;
    const deltaY = y - centerY;

    const rotateMax = 10;

    const newRotateY = (deltaX / centerX) * rotateMax;
    const newRotateX = -(deltaY / centerY) * rotateMax;

    rotateX.set(newRotateX);
    rotateY.set(newRotateY);
  };

  const handleMouseLeave = () => {
    animate(rotateX, 0, { duration: 0.5, ease: "easeOut" });
    animate(rotateY, 0, { duration: 0.5, ease: "easeOut" });
  };

  return (
    <div className="home__image">
      <motion.div
        id="card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transition: "transform 0.1s ease",
        }}
      >
        <FadeInWhenVisible initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}>
          <img src={HomeImage} alt="developer coding" />
        </FadeInWhenVisible>
      </motion.div>
    </div>
  );
};

export default HomeCard;