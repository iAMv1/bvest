"use client";

import React from "react";
import { motion } from "framer-motion";
import { SDG_NARRATIVE_STATS } from "@/data/stats";

export const SDGIntroSection: React.FC = () => {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#07090E]/60 overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(38,189,226,0.08),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400 mb-4"
          >
            <span>THE CORE THESIS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 uppercase"
          >
            17 GOALS.{" "}
            <span className="bg-linear-to-r from-cyan-400 via-amber-300 to-rose-400 bg-clip-text text-transparent">
              ONE SHARED FUTURE.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-300 text-base sm:text-lg leading-relaxed"
          >
            In 2015, all 193 United Nations Member States adopted the 17 Sustainable Development Goals—a universal call to action to eradicate poverty, protect our biosphere, and guarantee peace and prosperity by 2030. HackBVP 8.0 is not a generic hackathon; it is an engineering crucible where student builders translate these 17 systemic challenges into tangible open-source algorithms, hardware prototypes, and civic software.
          </motion.p>
        </div>

        {/* Narrative Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {SDG_NARRATIVE_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="p-6 sm:p-8 rounded-3xl bg-white/3 border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-all text-center flex flex-col items-center justify-center"
            >
              {/* Subtle top indicator bar */}
              <div
                className="absolute top-0 inset-x-8 h-1 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: stat.color }}
              />

              <span
                className="font-heading text-4xl sm:text-6xl font-black block mb-2 tracking-tight"
                style={{ color: stat.color }}
              >
                {stat.value}
              </span>

              <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-gray-300 uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
