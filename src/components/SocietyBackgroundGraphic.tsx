"use client";

import React from "react";

const ALL_SOCIETIES = [
  "IEEE BVCOE",
  "OPTiCA",
  "BVP ISTE",
  "DSC",
  "BVP CSI",
  "Microsoft Learn SAC",
  "BVP ACM",
  "BVP ISA",
  "IET",
  "TechShuttle",
  "Campus Block",
  "CODE CHEF",
  "IOSC",
  "GFG",
  "ATHENA",
  "DANCE",
  "MUSIC",
  "NSS",
  "DAS",
  "THEATRE",
  "Blissful Minds",
  "TEDx",
  "Eduminerva",
  "QAAFILA",
  "VENUVA",
  "BVP Inc",
  "Horizon",
];

export const SocietyBackgroundGraphic: React.FC = () => {
  return (
    <div aria-hidden="true" className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* 1. Engineering Grid & Dot Matrix Backdrops */}
      <div className="bg-grid absolute inset-0 opacity-40 dark:opacity-30" />
      <div className="bg-dots absolute inset-0 opacity-30 dark:opacity-20" />

      {/* 2. Soft Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[36rem] h-[36rem] bg-sdg6/15 dark:bg-sdg6/10 rounded-full blur-[160px] animate-drift" />
      <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-sdg10/12 dark:bg-purple-600/10 rounded-full blur-[190px] animate-drift-slow" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[28rem] h-[28rem] bg-sdg7/10 dark:bg-sdg7/5 rounded-full blur-[150px]" />

      {/* 3. Vignette Shadow Overlay — creates cinematic focus on the central card */}
      <div className="absolute inset-0 bg-radial-vignette opacity-60 dark:opacity-80 pointer-events-none" />

      {/* 4. Small Infinite Scrolling Society Ticker at Bottom */}
      <div className="absolute bottom-0 inset-x-0 py-3 border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-black/40 backdrop-blur-md overflow-hidden">
        <div style={{ animationDuration: "45s" }} className="flex gap-8 whitespace-nowrap animate-marquee font-mono text-xs font-medium tracking-widest uppercase text-stone-700 dark:text-stone-300">
          {ALL_SOCIETIES.concat(ALL_SOCIETIES).map((name, i) => (
            <span key={`soc-${i}`} className="inline-flex items-center gap-6">
              <span>{name}</span>
              <span className="text-[8px] opacity-40 text-stone-500 dark:text-stone-400">&bull;</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
