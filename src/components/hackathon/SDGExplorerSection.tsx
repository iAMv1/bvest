"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SDGS_DATA, SDGItem, SDGCategory } from "@/data/sdgs";
import { IconArrowRight, IconSparkles } from "@/components/hackathon/Icons";

interface SDGExplorerSectionProps {
  categoryFilter?: SDGCategory | "ALL";
  onSelectSDG: (sdg: SDGItem) => void;
}

export const SDGExplorerSection: React.FC<SDGExplorerSectionProps> = ({
  categoryFilter: propCategoryFilter,
  onSelectSDG,
}) => {
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const [internalFilter, setInternalFilter] = useState<SDGCategory | "ALL">("ALL");

  const activeFilter = propCategoryFilter !== undefined ? propCategoryFilter : internalFilter;

  const filteredSdgs =
    activeFilter === "ALL"
      ? SDGS_DATA
      : SDGS_DATA.filter((s) => s.category === activeFilter);

  return (
    <section id="sdgs" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#07090E]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <IconSparkles size={14} />
              <span>Interactive SDG Explorer</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              THE 17 GLOBAL GOALS.
            </h2>
          </div>

          <p className="font-mono text-xs text-gray-400 max-w-md">
            Showing {filteredSdgs.length} of 17 United Nations Goals. Click any card to inspect challenge statements, tech suggestions, and builder prompts.
          </p>
        </div>

        {/* Self-Contained Category Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {[
            { label: "ALL 17 GOALS", value: "ALL" },
            { label: "PEOPLE & SOCIAL", value: "PEOPLE" },
            { label: "PLANET & CLIMATE", value: "PLANET" },
            { label: "PROSPERITY & TECH", value: "PROSPERITY" },
            { label: "PEACE & INSTITUTIONS", value: "PEACE" },
            { label: "PARTNERSHIPS", value: "PARTNERSHIP" },
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => setInternalFilter(cat.value as SDGCategory | "ALL")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all ${
                activeFilter === cat.value
                  ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                  : "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 17 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredSdgs.map((sdg, index) => {
            const isHovered = hoveredCardId === sdg.id;

            return (
              <motion.div
                key={sdg.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                onMouseEnter={() => setHoveredCardId(sdg.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => onSelectSDG(sdg)}
                data-cursor="sdg"
                className="group relative rounded-3xl p-6 bg-white/3 border border-white/10 hover:border-white/25 backdrop-blur-xl flex flex-col justify-between cursor-pointer transition-all duration-300 overflow-hidden"
                style={{
                  boxShadow: isHovered
                    ? `0 12px 35px -8px ${sdg.color}35`
                    : "0 4px 20px -2px rgba(0,0,0,0.3)",
                  transform: isHovered ? "translateY(-6px)" : "none",
                }}
              >
                {/* Background ambient corner glow on hover */}
                <div
                  className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl transition-opacity duration-300"
                  style={{
                    backgroundColor: sdg.color,
                    opacity: isHovered ? 0.35 : 0.08,
                  }}
                />

                {/* Top Row: Icon + SDG Number */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-2xl p-1.5 shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: sdg.color }}
                    >
                      <Image
                        src={sdg.icon}
                        alt={sdg.title}
                        width={38}
                        height={38}
                        className="object-contain"
                      />
                    </div>

                    <span
                      className="font-heading text-3xl font-black transition-all duration-300 group-hover:scale-110"
                      style={{ color: sdg.color }}
                    >
                      {sdg.number}
                    </span>
                  </div>

                  {/* Category Pill */}
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-gray-400 mb-2">
                    {sdg.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {sdg.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-gray-300 text-xs leading-relaxed line-clamp-3 mb-4">
                    {sdg.shortDescription}
                  </p>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span
                    className="font-bold tracking-wider transition-colors"
                    style={{ color: sdg.color }}
                  >
                    EXPLORE
                  </span>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center transition-all group-hover:translate-x-1"
                    style={{ backgroundColor: `${sdg.color}25` }}
                  >
                    <IconArrowRight size={12} style={{ color: sdg.color }} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
