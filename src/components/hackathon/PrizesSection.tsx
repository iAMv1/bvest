"use client";

import React from "react";
import { motion } from "framer-motion";
import { PRIZE_TIERS } from "@/data/prizes";
import { EVENT_CONFIG } from "@/data/event";
import { IconTrophy, IconCheck } from "@/components/hackathon/Icons";

export const PrizesSection: React.FC = () => {
  return (
    <section id="prizes" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#090D18] border-t border-white/10">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-75 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <IconTrophy size={14} />
            <span>Pool Value: {EVENT_CONFIG.prizePool}</span>
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

        {/* Podium: 3 Main Champion Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 items-stretch">
          {PRIZE_TIERS.map((tier) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`rounded-3xl p-6 sm:p-8 border flex flex-col justify-between relative overflow-hidden backdrop-blur-xl ${
                tier.featured
                  ? "bg-linear-to-b from-white/8 to-white/2 border-amber-400/40 shadow-[0_0_40px_rgba(252,195,11,0.15)] md:-translate-y-4"
                  : "bg-white/3 border border-white/10 hover:border-white/20"
              }`}
            >
              {/* Top Accent Strip */}
              <div
                className="absolute top-0 inset-x-0 h-1.5"
                style={{ backgroundColor: tier.color }}
              />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="font-mono text-xs font-black px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: `${tier.color}25`,
                      color: tier.color,
                    }}
                  >
                    RANK {tier.rank}
                  </span>
                  <span className="font-mono text-xs text-gray-400 uppercase tracking-wider">
                    {tier.tag}
                  </span>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-black text-white mb-2">
                  {tier.title}
                </h3>

                <div
                  className="font-heading text-4xl sm:text-5xl font-black mb-4 tracking-tight"
                  style={{ color: tier.color }}
                >
                  {tier.amount}
                </div>

                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {tier.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-white/10 mb-6">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                    INCLUDED REWARDS:
                  </span>
                  {tier.perks.map((perk, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-stone-300">
                      <IconCheck size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="w-full py-2.5 rounded-xl text-center font-mono text-[11px] font-bold uppercase tracking-wider border"
                style={{
                  borderColor: `${tier.color}40`,
                  color: tier.color,
                  backgroundColor: `${tier.color}10`,
                }}
              >
                Cash + Cloud Credits
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
