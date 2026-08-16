"use client";

import React from "react";

const TECHNICAL_SOCIETIES = [
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
];

const NON_TECHNICAL_SOCIETIES = [
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
  const allSocieties = [...TECHNICAL_SOCIETIES, ...NON_TECHNICAL_SOCIETIES];

  // Prepare multiple distinct staggered rows of tilted society text marquee
  const row1 = [...TECHNICAL_SOCIETIES, ...NON_TECHNICAL_SOCIETIES];
  const row2 = [...NON_TECHNICAL_SOCIETIES, ...TECHNICAL_SOCIETIES];
  const row3 = [...TECHNICAL_SOCIETIES].reverse();
  const row4 = [...NON_TECHNICAL_SOCIETIES].reverse();
  const row5 = [...allSocieties].sort(() => 0.5 - Math.random());

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none z-0 select-none opacity-20 dark:opacity-15 flex flex-col justify-between py-10 rotate-[-12deg] scale-125"
    >
      {/* Glow gradient backdrops */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/20 rounded-full blur-[140px]" />

      {/* Row 1 */}
      <div className="flex gap-8 whitespace-nowrap animate-marquee font-heading text-xl md:text-3xl font-extrabold tracking-widest uppercase text-gray-400 dark:text-gray-500">
        {row1.concat(row1).map((name, i) => (
          <span key={`r1-${i}`} className="inline-flex items-center gap-6">
            <span className="hover:text-white transition-colors">{name}</span>
            <span className="text-xs opacity-40">&bull;</span>
          </span>
        ))}
      </div>

      {/* Row 2 */}
      <div className="flex gap-8 whitespace-nowrap animate-marquee-reverse font-heading text-2xl md:text-4xl font-black tracking-wider uppercase text-gray-500 dark:text-gray-400">
        {row2.concat(row2).map((name, i) => (
          <span key={`r2-${i}`} className="inline-flex items-center gap-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-300 dark:to-gray-600">
              {name}
            </span>
            <span className="text-xs opacity-40">&bull;</span>
          </span>
        ))}
      </div>

      {/* Row 3 */}
      <div className="flex gap-10 whitespace-nowrap animate-marquee font-heading text-lg md:text-2xl font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500">
        {row3.concat(row3).map((name, i) => (
          <span key={`r3-${i}`} className="inline-flex items-center gap-6">
            <span>{name}</span>
            <span className="text-xs opacity-40">&bull;</span>
          </span>
        ))}
      </div>

      {/* Row 4 */}
      <div className="flex gap-8 whitespace-nowrap animate-marquee-reverse font-heading text-3xl md:text-5xl font-black tracking-widest uppercase text-gray-600 dark:text-gray-300">
        {row4.concat(row4).map((name, i) => (
          <span key={`r4-${i}`} className="inline-flex items-center gap-6">
            <span>{name}</span>
            <span className="text-xs opacity-40">&bull;</span>
          </span>
        ))}
      </div>

      {/* Row 5 */}
      <div className="flex gap-8 whitespace-nowrap animate-marquee font-heading text-xl md:text-3xl font-extrabold tracking-widest uppercase text-gray-400 dark:text-gray-500">
        {row5.concat(row5).map((name, i) => (
          <span key={`r5-${i}`} className="inline-flex items-center gap-6">
            <span>{name}</span>
            <span className="text-xs opacity-40">&bull;</span>
          </span>
        ))}
      </div>
    </div>
  );
};
