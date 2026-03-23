"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// High stiffness + low mass = near-instant response with a tiny natural tail
// Damping at 28 prevents overshoot while keeping it smooth
const SPRING = { stiffness: 500, damping: 28, mass: 0.1 };

export function SpringCursor() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const x = useSpring(mouseX, SPRING);
  const y = useSpring(mouseY, SPRING);

  useEffect(() => {
    // Only activate on true pointer devices (not touch/stylus)
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    document.body.style.cursor = "none";

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.style.cursor = "";
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
    >
      {/* 18px solid amber circle */}
      <div className="w-[18px] h-[18px] rounded-full bg-amber" />
    </motion.div>
  );
}
