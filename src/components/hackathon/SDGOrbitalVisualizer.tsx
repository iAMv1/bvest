"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SDGS_DATA, SDGItem } from "@/data/sdgs";
import { IconSparkles, IconArrowRight } from "@/components/hackathon/Icons";

interface SDGOrbitalVisualizerProps {
  onSelectSDG?: (sdg: SDGItem) => void;
  selectedSdgId?: number | null;
}

export const SDGOrbitalVisualizer: React.FC<SDGOrbitalVisualizerProps> = ({
  onSelectSDG,
  selectedSdgId: controlledSdgId,
}) => {
  const [internalSelectedId, setInternalSelectedId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const activeId = controlledSdgId ?? internalSelectedId;
  const activeSdg = SDGS_DATA.find((s) => s.id === (hoveredId ?? activeId)) ?? null;

  // 17 nodes distributed evenly in 360 degrees
  const totalNodes = SDGS_DATA.length;
  const radius = 175; // px on desktop canvas

  return (
    <div className="relative w-full max-w-135 aspect-square mx-auto flex items-center justify-center select-none p-4">
      {/* Background ambient radial glow matching active SDG color */}
      <motion.div
        animate={{
          backgroundColor: activeSdg ? `${activeSdg.color}25` : "rgba(38, 189, 226, 0.12)",
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-4 rounded-full blur-3xl pointer-events-none"
      />

      {/* Outer subtle orbital tracks */}
      <div className="absolute inset-6 rounded-full border border-dashed border-white/10 pointer-events-none animate-spin" style={{ animationDuration: "120s" }} />
      <div className="absolute inset-16 rounded-full border border-white/5 pointer-events-none animate-spin" style={{ animationDuration: "90s", animationDirection: "reverse" }} />
      <div className="absolute inset-28 rounded-full border border-white/10 pointer-events-none" />

      {/* SVG Connecting Ray Lines to active node */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="-240 -240 480 480">
        <defs>
          <radialGradient id="hubGradient" cx="0" cy="0" r="1">
            <stop offset="0%" stopColor="#26BDE2" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#26BDE2" stopOpacity="0" />
          </radialGradient>
        </defs>
        {activeSdg && (
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            x1="0"
            y1="0"
            x2={Math.cos(((activeSdg.id - 1) * (2 * Math.PI) / totalNodes) - Math.PI / 2) * radius}
            y2={Math.sin(((activeSdg.id - 1) * (2 * Math.PI) / totalNodes) - Math.PI / 2) * radius}
            stroke={activeSdg.color}
            strokeWidth="2.5"
            strokeDasharray="4 4"
          />
        )}
      </svg>

      {/* Central Command Core */}
      <div className="relative z-20 w-44 h-44 rounded-full bg-[#0B0F19]/90 border border-white/15 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center text-center p-3">
        <AnimatePresence mode="wait">
          {activeSdg ? (
            <motion.div
              key={`active-${activeSdg.id}`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              <div
                className="w-10 h-10 rounded-xl p-1 mb-1 shadow-md flex items-center justify-center"
                style={{ backgroundColor: activeSdg.color }}
              >
                <Image
                  src={activeSdg.icon}
                  alt={activeSdg.title}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
                GOAL {activeSdg.number}
              </span>
              <span className="font-heading text-xs font-bold text-white line-clamp-1 max-w-32.5">
                {activeSdg.title}
              </span>
              <button
                onClick={() => onSelectSDG?.(activeSdg)}
                data-cursor="button"
                className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-cyan-300 transition-colors"
              >
                <span>EXPLORE</span>
                <IconArrowRight size={10} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="default-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="w-8 h-8 rounded-full bg-linear-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white mb-1 shadow-[0_0_15px_rgba(38,189,226,0.6)]">
                <IconSparkles size={16} />
              </div>
              <span className="font-heading text-sm font-black tracking-tight text-white">
                HACKBVP <span className="text-cyan-400">8.0</span>
              </span>
              <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mt-0.5">
                SDG CORE
              </span>
              <span className="text-[8px] font-mono text-cyan-400/80 mt-1">
                Hover any node
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 17 Nodes positioned circularly */}
      {SDGS_DATA.map((sdg, index) => {
        const angle = (index * (2 * Math.PI)) / totalNodes - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const isHovered = hoveredId === sdg.id;
        const isSelected = activeId === sdg.id;

        return (
          <motion.div
            key={sdg.id}
            style={{
              position: "absolute",
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: "translate(-50%, -50%)",
            }}
            whileHover={{ scale: 1.35 }}
            className="z-30"
          >
            <button
              onClick={() => {
                setInternalSelectedId(sdg.id);
                onSelectSDG?.(sdg);
              }}
              onMouseEnter={() => setHoveredId(sdg.id)}
              onMouseLeave={() => setHoveredId(null)}
              data-cursor="sdg"
              aria-label={`SDG ${sdg.number}: ${sdg.title}`}
              className={`relative group rounded-full transition-all duration-200 flex items-center justify-center ${
                isHovered || isSelected
                  ? "w-11 h-11 ring-4 ring-offset-2 ring-offset-[#07090E] shadow-lg"
                  : "w-8 h-8 opacity-80 hover:opacity-100"
              }`}
              style={{
                backgroundColor: sdg.color,
                boxShadow: isHovered || isSelected ? `0 0 20px ${sdg.color}` : "none",
              }}
            >
              {/* SDG Icon or Number */}
              {isHovered || isSelected ? (
                <div className="relative w-7 h-7">
                  <Image
                    src={sdg.icon}
                    alt={sdg.title}
                    fill
                    sizes="28px"
                    className="object-contain p-0.5"
                  />
                </div>
              ) : (
                <span className="font-mono text-[10px] font-black text-white drop-shadow">
                  {sdg.number}
                </span>
              )}

              {/* Tooltip on Hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-[#0F1424] border border-white/15 text-[10px] font-mono whitespace-nowrap text-white z-50 shadow-xl"
                  >
                    <span className="text-cyan-400 font-bold mr-1">#{sdg.number}</span>
                    {sdg.title}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        );
      })}
    </div>
  );
};
