import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: "rgb(255, 255, 255)",
      mixBlendMode: "difference",
    },
  };

  const dotVariants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
    },
  };

  return (
    <>
      {/* Circle */}
      <motion.div
        className="cursor-circle fixed top-0 left-0 w-8 h-8 border-2 border-black rounded-full pointer-events-none z-50"
        variants={variants}
        animate={cursorVariant}
        transition={{
            type: "spring",
            stiffness: 500,
            damping: 28
        }}
      />
      {/* Dot */}
      <motion.div
        className="cursor-dot fixed top-0 left-0 w-2 h-2 bg-black rounded-full pointer-events-none z-50"
        variants={dotVariants}
        animate="default"
        transition={{
            type: "spring",
            stiffness: 1500,
            damping: 100
        }}
      />
    </>
  );
}
