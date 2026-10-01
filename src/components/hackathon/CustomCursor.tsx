"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover">("default");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 24, stiffness: 260, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = target.closest("button, a, input, textarea, select, [data-cursor], [role='button'], .cursor-pointer");

      if (isInteractive) {
        setCursorVariant("hover");
      } else {
        setCursorVariant("default");
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-9999 overflow-hidden">
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorVariant === "hover" ? 32 : 10,
          height: cursorVariant === "hover" ? 32 : 10,
          backgroundColor:
            cursorVariant === "hover"
              ? "rgba(38, 189, 226, 0.15)"
              : "rgba(38, 189, 226, 0.9)",
          borderColor:
            cursorVariant === "hover"
              ? "rgba(38, 189, 226, 0.7)"
              : "rgba(255, 255, 255, 0.4)",
          backdropFilter: cursorVariant === "hover" ? "blur(2px)" : "none",
        }}
        transition={{ type: "spring", damping: 22, stiffness: 320, mass: 0.2 }}
        className="rounded-full border select-none shadow-[0_0_15px_rgba(38,189,226,0.6)]"
      />
    </div>
  );
};
