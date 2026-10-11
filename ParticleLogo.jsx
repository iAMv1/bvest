"use client";

import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Interactive 3D Cursor-reactive HackBVP 8.0 Logo Component
 */
export default function ParticleLogo({
  logoSrc = "/hack8kalogo.png",
  className = "",
  style,
  onFormed,
  ...props
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    onFormed?.();
  }, [onFormed]);

  // Normalized cursor coordinates (-1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Responsive spring physics for smooth, elastic movement
  const springConfig = { damping: 22, stiffness: 170, mass: 0.55 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Dynamic 3D tilt angles and parallax displacement
  const rotateX = useTransform(smoothY, [-1, 1], [16, -16]);
  const rotateY = useTransform(smoothX, [-1, 1], [-16, 16]);
  const posX = useTransform(smoothX, [-1, 1], [-28, 28]);
  const posY = useTransform(smoothY, [-1, 1], [-24, 24]);

  // Ambient cyber glow shifts with depth parallax
  const glowX = useTransform(smoothX, [-1, 1], [-45, 45]);
  const glowY = useTransform(smoothY, [-1, 1], [-40, 40]);

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rangeX = Math.max(300, window.innerWidth * 0.45);
      const rangeY = Math.max(300, window.innerHeight * 0.45);

      const dx = (e.clientX - centerX) / rangeX;
      const dy = (e.clientY - centerY) / rangeY;

      mouseX.set(Math.max(-1, Math.min(1, dx)));
      mouseY.set(Math.max(-1, Math.min(1, dy)));
    };

    const handlePointerLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="HackBVP 8.0 logo"
      className={`relative flex items-center justify-center w-full max-w-80 sm:max-w-97.5 lg:max-w-112.5 xl:max-w-122.5 aspect-545/704 perspective-1000 cursor-grab active:cursor-grabbing ${className}`}
      style={style}
      {...props}
    >
      {/* Dynamic Parallax Cyber Glow Aura */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute inset-0 m-auto w-[90%] h-[90%] rounded-full bg-radial from-cyan-400/30 via-blue-600/12 to-transparent blur-3xl pointer-events-none -z-10"
      />

      {/* 3D Tilting & Floating Logo */}
      <motion.div
        style={{
          x: posX,
          y: posY,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.035 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="relative w-full h-full flex items-center justify-center select-none"
      >
        <img
          src={logoSrc}
          alt="HackBVP 8.0 Logo"
          className="w-full h-auto max-h-[68vh] object-contain drop-shadow-[0_0_35px_rgba(56,189,248,0.4)] pointer-events-none"
        />
      </motion.div>
    </div>
  );
}
