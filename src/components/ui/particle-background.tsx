"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;       // radius — tiny
  speed: number;
  opacity: number;
  maxOpacity: number;
  rising: boolean; // fading in vs out
};

function makeStar(w: number, h: number): Star {
  const maxOpacity = Math.random() * 0.25 + 0.05;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 0.7 + 0.2,           // 0.2–0.9 px radius
    speed: Math.random() * 0.06 + 0.02,     // very slow drift upward
    opacity: 0,
    maxOpacity,
    rising: true,
  };
}

export function ParticleBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sync = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    sync();

    // ~1 star per 9 000 px² — sparse enough to read as "deep space"
    const count = () => Math.max(50, Math.floor((canvas.width * canvas.height) / 9000));

    let stars: Star[] = [];
    let raf = 0;

    const init = () => {
      stars = Array.from({ length: count() }, () =>
        makeStar(canvas.width, canvas.height)
      );
      // Stagger initial opacities so the field doesn't all appear at once
      stars.forEach((s) => {
        s.opacity = Math.random() * s.maxOpacity;
        s.rising = Math.random() > 0.5;
      });
    };

    const FADE_SPEED = 0.001;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of stars) {
        // Drift upward
        s.y -= s.speed;
        if (s.y + s.r < 0) {
          // Wrap to bottom
          s.y = canvas.height + s.r;
          s.x = Math.random() * canvas.width;
          s.opacity = 0;
          s.rising = true;
        }

        // Twinkle — fade in/out between 0 and maxOpacity
        if (s.rising) {
          s.opacity += FADE_SPEED;
          if (s.opacity >= s.maxOpacity) { s.opacity = s.maxOpacity; s.rising = false; }
        } else {
          s.opacity -= FADE_SPEED;
          if (s.opacity <= 0) { s.opacity = 0; s.rising = true; }
        }

        // Draw as a crisp circle (real star dot)
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 252, 245, ${s.opacity})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const onResize = () => { sync(); init(); };
    window.addEventListener("resize", onResize, { passive: true });
    init();
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
    />
  );
}
