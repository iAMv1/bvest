"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate } from "framer-motion";

interface StatCounterProps {
  value: number;
  label: string;
  className?: string;
  mono?: boolean;
}

export const StatCounter: React.FC<StatCounterProps> = ({ value, label, className = "", mono = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(String(value));

  useEffect(() => {
    if (!inView) return;
    if (shouldReduceMotion) {
      setDisplay(String(value));
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(String(Math.round(v))),
    });
    return () => controls.stop();
  }, [inView, value, shouldReduceMotion]);

  return (
    <div ref={ref} className={`flex flex-col items-center gap-1 ${className}`}>
      <span className={`font-heading text-4xl md:text-5xl font-bold text-stone-950 dark:text-white tabular-nums ${mono ? "font-mono" : ""}`}>
        {display}
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500">
        {label}
      </span>
    </div>
  );
};