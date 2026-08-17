"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  type MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
} from "framer-motion";

interface Layer {
  hex: string;
  radius: string;
  opacity: number;
  ox: number;
  oy: number;
}

interface BackdropAuroraProps {
  layers: Layer[];
  home?: { x: number; y: number };
  /** px drift at 1000px of page scroll (negative = flows up). 0 = none. */
  parallax?: number;
  className?: string;
}

function rgba(hex: string, opacity: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${opacity})`;
}

const AuroraLayer = ({ l, sx, sy }: { l: Layer; sx: MotionValue<number>; sy: MotionValue<number> }) => {
  const lx = useTransform(sx, (v) => `${Math.max(0, Math.min(100, v + l.ox))}%`);
  const ly = useTransform(sy, (v) => `${Math.max(0, Math.min(100, v + l.oy))}%`);
  const bg = useMotionTemplate`radial-gradient(${l.radius} at ${lx} ${ly}, ${rgba(l.hex, l.opacity)}, transparent 62%)`;
  return <motion.div className="absolute inset-0 will-change-transform" style={{ background: bg }} />;
};

export const BackdropAurora = ({
  layers,
  home = { x: 50, y: 32 },
  parallax = 0,
  className = "absolute inset-0",
}: BackdropAuroraProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => `${-(v * (parallax / 1000)).toFixed(2)}px`);

  const mx = useMotionValue(home.x);
  const my = useMotionValue(home.y);
  const sx = useSpring(mx, { stiffness: 100, damping: 21, mass: 0.8 });
  const sy = useSpring(my, { stiffness: 100, damping: 21, mass: 0.8 });

  useEffect(() => {
    const el = ref.current;
    if (!el || shouldReduceMotion) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;
      mx.set(((e.clientX - rect.left) / rect.width) * 100);
      my.set(((e.clientY - rect.top) / rect.height) * 100);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <div className={`pointer-events-none z-0 ${className}`} aria-hidden="true">
        {layers.map((l) => (
          <div
            key={l.hex + l.ox}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(${l.radius} at ${home.x + l.ox}% ${home.y + l.oy}%, ${rgba(l.hex, l.opacity)}, transparent 62%)`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`pointer-events-none z-0 ${className}`}
      aria-hidden="true"
      style={parallax ? { y } : undefined}
    >
      {layers.map((l, i) => (
        <AuroraLayer key={i} l={l} sx={sx} sy={sy} />
      ))}
    </motion.div>
  );
};