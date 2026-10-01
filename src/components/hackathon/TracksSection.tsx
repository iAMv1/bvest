"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HACKATHON_TRACKS, HackathonTrack } from "@/data/tracks";
import { SDGS_DATA } from "@/data/sdgs";
import {
  IconSparkles,
  IconArrowRight,
  IconCpu,
  IconCheck,
} from "@/components/hackathon/Icons";

export const TracksSection: React.FC = () => {
  const [activeTrackId, setActiveTrackId] = useState<string>(HACKATHON_TRACKS[0].id);

  const activeTrack =
    HACKATHON_TRACKS.find((t) => t.id === activeTrackId) || HACKATHON_TRACKS[0];

  return (
    <section id="tracks" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#07090E]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <IconSparkles size={14} />
              <span>Technology &times; Sustainability</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              HACKATHON TRACKS.
            </h2>
          </div>
          <p className="font-mono text-xs text-gray-400 max-w-md">
            Derived directly from intersecting engineering domains with the 17 UN Sustainable Development Goals. Pick one focus track or submit in Open Wildcard.
          </p>
        </div>

        {/* Tracks Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Track Selection Rail */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {HACKATHON_TRACKS.map((track) => {
              const isSelected = activeTrackId === track.id;

              return (
                <button
                  key={track.id}
                  onClick={() => setActiveTrackId(track.id)}
                  data-cursor="button"
                  className={`p-5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between ${
                    isSelected
                      ? "bg-white/8 border-white/40 shadow-xl"
                      : "bg-white/2 border-white/10 hover:border-white/20 hover:bg-white/4"
                  }`}
                  style={{
                    boxShadow: isSelected ? `0 0 25px ${track.accentColor}25` : undefined,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="font-mono text-xs font-black px-2.5 py-1 rounded-lg"
                      style={{
                        backgroundColor: `${track.accentColor}25`,
                        color: track.accentColor,
                      }}
                    >
                      {track.number}
                    </span>
                    <div>
                      <h3 className="font-heading text-base font-bold text-white mb-0.5">
                        {track.title}
                      </h3>
                      <span className="font-mono text-[11px] text-gray-400 block line-clamp-1">
                        {track.tagline}
                      </span>
                    </div>
                  </div>

                  <IconArrowRight
                    size={18}
                    className={`transition-transform duration-200 shrink-0 ${
                      isSelected ? "translate-x-1 text-white" : "text-gray-600"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Active Track Comprehensive Display */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTrack.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="p-6 sm:p-8 rounded-3xl bg-white/4 border border-white/15 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
              >
                {/* Accent top line */}
                <div
                  className="absolute top-0 inset-x-0 h-1.5"
                  style={{ backgroundColor: activeTrack.accentColor }}
                />

                <div className="flex items-center justify-between gap-4 mb-4">
                  <span
                    className="font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
                    style={{
                      borderColor: `${activeTrack.accentColor}40`,
                      color: activeTrack.accentColor,
                      backgroundColor: `${activeTrack.accentColor}15`,
                    }}
                  >
                    TRACK {activeTrack.number}
                  </span>

                  <span className="font-mono text-xs text-gray-400">
                    {activeTrack.sdgs.length} Connected SDGs
                  </span>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl font-black text-white mb-2">
                  {activeTrack.title}
                </h3>
                <p className="font-mono text-xs text-cyan-400 font-semibold mb-6">
                  {activeTrack.tagline}
                </p>

                <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-8">
                  {activeTrack.description}
                </p>

                {/* Targeted SDGs Badges */}
                <div className="mb-8">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
                    ALIGNED UN SUSTAINABLE DEVELOPMENT GOALS:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeTrack.sdgs.map((sdgId) => {
                      const sdg = SDGS_DATA.find((s) => s.id === sdgId);
                      if (!sdg) return null;
                      return (
                        <div
                          key={sdgId}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono"
                          style={{
                            borderColor: `${sdg.color}40`,
                            backgroundColor: `${sdg.color}15`,
                            color: "#fff",
                          }}
                        >
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: sdg.color }}
                          />
                          <span className="font-bold">Goal {sdg.number}</span>
                          <span className="text-gray-300 truncate max-w-30">
                            {sdg.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Key Challenges */}
                <div className="mb-8">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 block mb-3">
                    INSPIRATION CHALLENGE STATEMENTS:
                  </span>
                  <div className="space-y-2.5">
                    {activeTrack.keyChallenges.map((ch, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white/2 border border-white/5 text-xs sm:text-sm text-stone-200 flex items-start gap-2.5"
                      >
                        <IconCheck size={16} className="text-cyan-400 mt-0.5 shrink-0" />
                        <span>{ch}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Pointers */}
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2.5">
                    RECOMMENDED TECH PRIMITIVES:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeTrack.techPointers.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
