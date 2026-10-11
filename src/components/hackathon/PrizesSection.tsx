"use client";

import React from "react";
import { motion } from "framer-motion";
import { EVENT_CONFIG } from "@/data/event";
import { IconTrophy, IconSparkles } from "@/components/hackathon/Icons";

export const PrizesSection: React.FC = () => {
  return (
    <section id="prizes" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#090D18] border-t border-white/10">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-75 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <IconTrophy size={14} />
            <span>POOL VALUE: {EVENT_CONFIG.prizePool}</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-6xl font-black tracking-tight text-white uppercase">
            WIN BIG.{" "}
            <span className="bg-linear-to-r from-amber-300 via-orange-400 to-yellow-200 bg-clip-text text-transparent">
              CREATE IMPACT.
            </span>
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mt-4">
            Celebrating technical depth, architectural elegance, and profound alignment with the 17 UN Sustainable Development Goals. Cash rewards, developer grants, and direct incubation mentorship.
          </p>
        </div>

        {/* Single Featured Reward Pool Card: 30 Lakhs+ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl p-8 sm:p-12 lg:p-14 border border-cyan-500/30 bg-linear-to-r from-cyan-950/40 via-blue-950/30 to-purple-950/40 backdrop-blur-xl relative overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)]"
        >
          {/* Top Gradient Accent Bar */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-linear-to-r from-amber-400 via-cyan-400 to-blue-500 shadow-[0_0_12px_rgba(6,182,212,0.8)]" />

          {/* Ambient Cyber Light Spill */}
          <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-24 -top-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            {/* Left: Giant 30 Lakhs+ Display & Branding */}
            <div className="flex flex-col items-start text-left max-w-xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider mb-4">
                <IconSparkles size={13} className="text-cyan-400 animate-pulse" />
                <span>CUMULATIVE REWARD POOL</span>
              </div>

              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-heading text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-200 to-blue-400 drop-shadow-[0_0_35px_rgba(6,182,212,0.35)]">
                  30 LAKHS+
                </span>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Includes cash bounties, domain track prizes, cloud compute credits, developer tooling grants, API vouchers, and fast-track incubation mentorship for all participating finalists.
              </p>
            </div>

            {/* Right: 2 Focused Boxes (Cash Prizes & Sponsor Bounties & Vouchers) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:max-w-lg w-full">
              {/* Box 1: Cash Prizes */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/35 transition-all duration-300 flex flex-col justify-between gap-3 backdrop-blur-md hover:bg-white/8 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] shrink-0" />
                  <h4 className="font-heading text-base sm:text-lg font-bold text-white tracking-tight">
                    Cash Prizes
                  </h4>
                </div>
                <p className="text-xs sm:text-sm font-mono text-slate-300/80 leading-relaxed">
                  Top champions, podium placements &amp; category track cash awards.
                </p>
              </div>

              {/* Box 2: Sponsor Bounties and Vouchers */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/35 transition-all duration-300 flex flex-col justify-between gap-3 backdrop-blur-md hover:bg-white/8 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] shrink-0" />
                  <h4 className="font-heading text-base sm:text-lg font-bold text-white tracking-tight">
                    Sponsor Bounties &amp; Vouchers
                  </h4>
                </div>
                <p className="text-xs sm:text-sm font-mono text-slate-300/80 leading-relaxed">
                  Partner track rewards, cloud infrastructure compute credits &amp; tooling vouchers.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrizesSection;
