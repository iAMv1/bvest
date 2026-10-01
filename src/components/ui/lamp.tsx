"use client";

import React from "react";
import { motion } from "framer-motion";

export const LampContainer = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-transparent ${className}`}
    >
      {/* Lamp Illumination Stage */}
      <div className="absolute top-0 left-0 w-full h-190 pointer-events-none select-none overflow-hidden z-0">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Top Ceiling Blocker: Matches the exact navbar height (64px) so there is zero gap */}
          <div className="absolute top-0 left-0 w-full h-16 bg-[#07090E] z-30 pointer-events-none" />

          {/* Left Conic Light Beam (Spreads from Center Down-Left immediately below navbar) */}
          <motion.div
            initial={{ opacity: 0.2, width: "16rem" }}
            animate={{ opacity: 1, width: "42rem" }}
            transition={{
              delay: 0.1,
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              top: "64px",
              background:
                "conic-gradient(from 180deg at 100% 0%, #06b6d4 0deg, rgba(6,182,212,0.65) 20deg, rgba(6,182,212,0.18) 45deg, transparent 65deg, transparent 360deg)",
            }}
            className="absolute right-1/2 h-125 w-2xl text-white z-10"
          >
            {/* Soft edge and bottom masks */}
            <div className="absolute w-full left-0 bg-[#07090E] h-36 bottom-0 z-20 mask-[linear-gradient(to_top,white,transparent)]" />
            <div className="absolute w-44 h-full left-0 bg-[#07090E] bottom-0 z-20 mask-[linear-gradient(to_right,white,transparent)]" />
          </motion.div>

          {/* Right Conic Light Beam (Spreads from Center Down-Right immediately below navbar) */}
          <motion.div
            initial={{ opacity: 0.2, width: "16rem" }}
            animate={{ opacity: 1, width: "42rem" }}
            transition={{
              delay: 0.1,
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              top: "64px",
              background:
                "conic-gradient(from 115deg at 0% 0%, transparent 0deg, rgba(6,182,212,0.18) 20deg, rgba(6,182,212,0.65) 45deg, #06b6d4 65deg, transparent 65deg, transparent 360deg)",
            }}
            className="absolute left-1/2 h-125 w-2xl text-white z-10"
          >
            {/* Soft edge and bottom masks */}
            <div className="absolute w-44 h-full right-0 bg-[#07090E] bottom-0 z-20 mask-[linear-gradient(to_left,white,transparent)]" />
            <div className="absolute w-full right-0 bg-[#07090E] h-36 bottom-0 z-20 mask-[linear-gradient(to_top,white,transparent)]" />
          </motion.div>

          {/* Central Diffuse Cyan Light Cloud */}
          <div
            style={{ top: "35px" }}
            className="absolute left-1/2 -translate-x-1/2 z-20 h-52 w-2xl rounded-full bg-cyan-500/30 blur-3xl pointer-events-none"
          />

          {/* Inner Glowing Core */}
          <motion.div
            initial={{ width: "12rem", opacity: 0.3 }}
            animate={{ width: "26rem", opacity: 0.85 }}
            transition={{
              delay: 0.1,
              duration: 0.85,
              ease: "easeInOut",
            }}
            style={{ top: "45px" }}
            className="absolute left-1/2 -translate-x-1/2 z-20 h-32 w-96 rounded-full bg-cyan-400/45 blur-2xl pointer-events-none"
          />

          {/* Horizontal Lamp Filament Beam: Situated flush immediately below the 64px navbar */}
          <motion.div
            initial={{ width: "14rem", opacity: 0.3 }}
            animate={{ width: "38rem", opacity: 1 }}
            transition={{
              delay: 0.1,
              duration: 0.85,
              ease: "easeInOut",
            }}
            style={{ top: "64px" }}
            className="absolute left-1/2 -translate-x-1/2 z-40 h-0.5 w-152 bg-linear-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_25px_rgba(6,182,212,1),0_0_50px_rgba(6,182,212,0.8)]"
          />

          {/* Bottom Ambient Dark Vignette Fade */}
          <div
            style={{ top: "480px" }}
            className="absolute left-0 w-full h-48 bg-linear-to-b from-transparent to-[#07090E] z-10 pointer-events-none"
          />
        </div>
      </div>

      {/* Children Content placed directly under the illuminated lamp flush with navbar */}
      <div className="relative z-20 flex flex-col items-center pt-20 sm:pt-24 pb-8 px-4 w-full max-w-5xl mx-auto">
        {children}
      </div>
    </div>
  );
};
