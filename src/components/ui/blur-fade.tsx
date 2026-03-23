"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface BlurFadeProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function BlurFade({ children, delay = 0, className }: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger when element is 60px above the bottom of the viewport
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 20, filter: "blur(6px)" }
      }
      transition={{
        duration: 0.55,
        delay,
        ease: [0.16, 1, 0.3, 1], // expo-out — fast start, settles smoothly
      }}
    >
      {children}
    </motion.div>
  );
}
