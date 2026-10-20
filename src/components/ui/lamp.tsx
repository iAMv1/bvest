"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * LampBarLight: Renders the glowing horizontal illuminated filament bar
 * along with dual downward conic spotlight beams and radiant cyan core glow.
 * Can be positioned directly above the logo or inside the hero right column.
 */
export const LampBarLight: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative w-full flex flex-col items-center justify-start overflow-visible ${className}`}>
      {/* Top illuminated filament bar */}
      <motion.div
        initial={{ opacity: 0.3, scaleX: 0.35 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{
          duration: 0.65,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          transformOrigin: "center center",
          willChange: "transform, opacity",
        }}
        className="relative z-30 h-1 sm:h-1.5 w-64 sm:w-80 md:w-96 lg:w-full max-w-110 rounded-full bg-linear-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_25px_rgba(6,182,212,1),0_0_55px_rgba(6,182,212,0.85),0_0_90px_rgba(6,182,212,0.5)]"
      />

      {/* Futuristic subtle accent brackets */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-0.5 bg-cyan-200/60 blur-[1px] pointer-events-none" />

      {/* Conic Light Beams & Glow Halo Stage */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-130 pointer-events-none select-none overflow-hidden flex justify-center z-10">
        {/* Left Conic Light Beam (Spreads Down-Left from Center) */}
        <motion.div
          initial={{ opacity: 0.2, scaleX: 0.35 }}
          animate={{ opacity: 0.95, scaleX: 1 }}
          transition={{
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            top: 0,
            transformOrigin: "right top",
            willChange: "transform, opacity",
            background:
              "conic-gradient(from 180deg at 100% 0%, #06b6d4 0deg, rgba(6,182,212,0.65) 20deg, rgba(6,182,212,0.18) 45deg, transparent 65deg, transparent 360deg)",
          }}
          className="absolute right-1/2 h-120 w-[320px] sm:w-105 text-white"
        >
          {/* Soft edge and bottom masks */}
          <div className="absolute w-full left-0 bg-[#020306] h-32 bottom-0 z-20 mask-[linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-32 h-full left-0 bg-[#020306] bottom-0 z-20 mask-[linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right Conic Light Beam (Spreads Down-Right from Center) */}
        <motion.div
          initial={{ opacity: 0.2, scaleX: 0.35 }}
          animate={{ opacity: 0.95, scaleX: 1 }}
          transition={{
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            top: 0,
            transformOrigin: "left top",
            willChange: "transform, opacity",
            background:
              "conic-gradient(from 115deg at 0% 0%, transparent 0deg, rgba(6,182,212,0.18) 20deg, rgba(6,182,212,0.65) 45deg, #06b6d4 65deg, transparent 65deg, transparent 360deg)",
          }}
          className="absolute left-1/2 h-120 w-[320px] sm:w-105 text-white"
        >
          {/* Soft edge and bottom masks */}
          <div className="absolute w-32 h-full right-0 bg-[#020306] bottom-0 z-20 mask-[linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-full right-0 bg-[#020306] h-32 bottom-0 z-20 mask-[linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Central Diffuse Cyan Light Cloud */}
        <div
          style={{ top: "0px" }}
          className="absolute left-1/2 -translate-x-1/2 z-20 h-48 w-95 sm:w-120 rounded-full bg-cyan-500/25 blur-3xl pointer-events-none"
        />

        {/* Inner Glowing Core */}
        <motion.div
          initial={{ opacity: 0.3, scaleX: 0.45 }}
          animate={{ opacity: 0.85, scaleX: 1 }}
          transition={{
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            top: "0px",
            transformOrigin: "center center",
            willChange: "transform, opacity",
          }}
          className="absolute left-1/2 -translate-x-1/2 z-20 h-28 w-72 sm:w-88 rounded-full bg-cyan-400/40 blur-2xl pointer-events-none"
        />
      </div>
    </div>
  );
};

/**
 * LampContainer: Wrapper for the hero section with ceiling blocker
 * and backdrop ambient lighting.
 */
export const LampContainer = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`relative min-h-[calc(100vh-64px)] w-full flex flex-col items-center justify-start overflow-hidden bg-transparent ${className}`}
    >
      {/* Top Ceiling Blocker: Matches the exact navbar height (64px) */}
      <div className="absolute top-0 left-0 w-full h-16 bg-[#020306] z-30 pointer-events-none" />

      {/* Ambient background glow for atmospheric depth */}
      <div className="absolute top-24 left-1/4 -translate-x-1/2 w-125 h-100 bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-16 right-1/4 translate-x-1/2 w-150 h-125 bg-cyan-600/6 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* Children content (Parallel Hero Grid) */}
      {children}
    </div>
  );
};
