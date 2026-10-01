"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { EXPERT_PROFILES, ExpertProfile } from "@/data/judges";
import { SDGS_DATA, SDGItem } from "@/data/sdgs";
import { IconSparkles, IconUsers, IconExternalLink } from "@/components/hackathon/Icons";

interface JudgesMentorsSectionProps {
  onSelectSDG?: (sdg: SDGItem) => void;
}

export const JudgesMentorsSection: React.FC<JudgesMentorsSectionProps> = ({ onSelectSDG }) => {
  const [filterRole, setFilterRole] = useState<"all" | "judge" | "mentor" | "speaker">("all");

  const filteredProfiles =
    filterRole === "all"
      ? EXPERT_PROFILES
      : EXPERT_PROFILES.filter((p) => p.type === filterRole);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#090D18] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <IconUsers size={14} />
              <span>Advisory &amp; Evaluation Panel</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              JURY &amp; MENTORS.
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "ALL EXPERTS" },
              { id: "judge", label: "GRAND JURY" },
              { id: "mentor", label: "TECHNICAL MENTORS" },
              { id: "speaker", label: "KEYNOTE SPEAKERS" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilterRole(btn.id as typeof filterRole)}
                data-cursor="button"
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                  filterRole === btn.id
                    ? "bg-cyan-400 text-black shadow-lg shadow-cyan-400/20"
                    : "bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProfiles.map((expert, idx) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className="group p-6 rounded-3xl bg-white/3 border border-white/10 hover:border-white/25 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Avatar Fallback Graphic */}
                <div className="relative w-full aspect-square rounded-2xl bg-linear-to-tr from-[#13192B] to-[#1E293B] border border-white/10 mb-4 flex flex-col items-center justify-center overflow-hidden group-hover:border-cyan-500/40 transition-colors">
                  <div className="font-heading text-4xl font-black text-white/40 group-hover:scale-110 group-hover:text-cyan-400 transition-all">
                    {expert.avatarFallback}
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-gray-500 mt-2">
                    {expert.type}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                    {expert.domain}
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-400 uppercase">
                    {expert.type}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-black text-white mb-0.5">
                  {expert.name}
                </h3>

                <p className="text-xs text-gray-300 font-medium mb-1">
                  {expert.role}
                </p>

                <p className="text-xs text-stone-400 font-mono mb-4">
                  {expert.organization}
                </p>
              </div>

              {/* SDG Focus Chips */}
              <div className="pt-3 border-t border-white/10">
                <span className="text-[10px] font-mono text-gray-500 block mb-1.5 uppercase">
                  SDG ALIGNMENT:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {expert.sdgFocus.map((sdgId) => {
                    const sdg = SDGS_DATA.find((s) => s.id === sdgId);
                    if (!sdg) return null;
                    return (
                      <button
                        key={sdgId}
                        onClick={() => onSelectSDG?.(sdg)}
                        data-cursor="sdg"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono border"
                        style={{
                          borderColor: `${sdg.color}30`,
                          backgroundColor: `${sdg.color}15`,
                          color: "#fff",
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sdg.color }} />
                        <span>#{sdg.number}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
