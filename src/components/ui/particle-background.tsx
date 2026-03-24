"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  speed: number;
  opacity: number;
  minOpacity: number;
  maxOpacity: number;
  rising: boolean;
  glow: boolean; // larger stars get a soft bloom
};

function makeStar(w: number, h: number): Star {
  const isBright = Math.random() < 0.15; // 15% are brighter accent stars
  const r = isBright
    ? Math.random() * 1.2 + 1.2   // 1.2–2.4 px
    : Math.random() * 1.0 + 0.6;  // 0.6–1.6 px
  const maxOpacity = isBright
    ? Math.random() * 0.15 + 0.45 // 0.45–0.60
    : Math.random() * 0.15 + 0.25; // 0.25–0.40
  const minOpacity = maxOpacity * 0.45; // never fades below 45% of its peak
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    r,
    speed: Math.random() * 0.06 + 0.02,
    opacity: minOpacity + Math.random() * (maxOpacity - minOpacity),
    minOpacity,
    maxOpacity,
    rising: Math.random() > 0.5,
    glow: isBright,
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

    // ~1 star per 4 500 px²
    const count = () => Math.max(120, Math.floor((canvas.width * canvas.height) / 4500));

    let stars: Star[] = [];
    let raf = 0;

    const init = () => {
      stars = Array.from({ length: count() }, () =>
        makeStar(canvas.width, canvas.height)
      );
    };

    const FADE_SPEED = 0.003;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of stars) {
        // Drift upward, wrap at top
        s.y -= s.speed;
        if (s.y + s.r < 0) {
          s.y = canvas.height + s.r;
          s.x = Math.random() * canvas.width;
          s.opacity = s.minOpacity;
          s.rising = true;
        }

        // Twinkle — pulse between minOpacity and maxOpacity
        if (s.rising) {
          s.opacity += FADE_SPEED;
          if (s.opacity >= s.maxOpacity) { s.opacity = s.maxOpacity; s.rising = false; }
        } else {
          s.opacity -= FADE_SPEED;
          if (s.opacity <= s.minOpacity) { s.opacity = s.minOpacity; s.rising = true; }
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);

        if (s.glow) {
          // Soft bloom on accent stars
          ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
          ctx.shadowBlur = s.r * 4;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.fill();
      }

      ctx.shadowBlur = 0; // reset so it doesn't leak
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
