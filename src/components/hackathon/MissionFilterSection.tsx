"use client";

import React from "react";
import { motion } from "framer-motion";
import { SDG_CATEGORIES, SDGCategory } from "@/data/sdgs";
import { IconSparkles } from "@/components/hackathon/Icons";

interface MissionFilterSectionProps {
  selectedCategory: SDGCategory | "ALL";
  onSelectCategory: (category: SDGCategory | "ALL") => void;
}

export const MissionFilterSection: React.FC<MissionFilterSectionProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-[#07090E]/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-2">
              <IconSparkles size={12} />
              <span>Systemic Impact Pillars</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-black tracking-tight text-white uppercase">
              CHOOSE YOUR MISSION.
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onSelectCategory("ALL")}
              data-cursor="button"
              className={`px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === "ALL"
                  ? "bg-white text-black shadow-lg shadow-white/10"
                  : "bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              ALL 17 GOALS
            </button>
            {SDG_CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                data-cursor="button"
                className={`px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  selectedCategory === cat.name
                    ? "text-black shadow-lg"
                    : "bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
                }`}
                style={{
                  backgroundColor: selectedCategory === cat.name ? cat.color : undefined,
                }}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat.name ? "bg-black/20 text-black font-black" : "bg-white/10 text-gray-400"
                  }`}
                >
                  {cat.sdgs.length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 5 Pillar Mission Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SDG_CATEGORIES.map((cat, i) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * i }}
                onClick={() => onSelectCategory(isSelected ? "ALL" : cat.name)}
                data-cursor="button"
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? "bg-white/8 border-white/40 shadow-xl"
                    : "bg-white/2 border-white/10 hover:border-white/20 hover:bg-white/4"
                }`}
                style={{
                  boxShadow: isSelected ? `0 0 25px ${cat.color}30` : undefined,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="font-heading text-lg font-black tracking-tight"
                      style={{ color: cat.color }}
                    >
                      {cat.name}
                    </span>
                    <span className="font-mono text-[10px] text-gray-400 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                      GOALS {cat.sdgs.join(", ")}
                    </span>
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-gray-400">
                    {isSelected ? "Filter active" : "Click to isolate"}
                  </span>
                  <span style={{ color: cat.color }} className="font-bold">
                    &rarr;
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
