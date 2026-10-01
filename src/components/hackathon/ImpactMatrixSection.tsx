"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IMPACT_MATRIX, TechMatrixItem } from "@/data/matrix";
import { SDGS_DATA, SDGItem } from "@/data/sdgs";
import { IconSparkles, IconLayers, IconCpu } from "@/components/hackathon/Icons";

interface ImpactMatrixSectionProps {
  onSelectSDG?: (sdg: SDGItem) => void;
}

export const ImpactMatrixSection: React.FC<ImpactMatrixSectionProps> = ({ onSelectSDG }) => {
  const [selectedTechId, setSelectedTechId] = useState<string>(IMPACT_MATRIX[0].id);

  const selectedTech =
    IMPACT_MATRIX.find((t) => t.id === selectedTechId) || IMPACT_MATRIX[0];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#090D18] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <IconLayers size={14} />
              <span>Cross-Disciplinary Matrix</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              TECHNOLOGY &times; SDG MATRIX.
            </h2>
          </div>
          <p className="font-mono text-xs text-gray-400 max-w-md">
            Interactive system matrix. Select an engineering domain to dynamically visualize and audit its primary &amp; secondary SDG deployment frontiers.
          </p>
        </div>

        {/* Tech Selector Chips */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {IMPACT_MATRIX.map((tech) => {
            const isSelected = selectedTechId === tech.id;
            return (
              <button
                key={tech.id}
                onClick={() => setSelectedTechId(tech.id)}
                data-cursor="button"
                className={`px-4 py-2.5 rounded-2xl font-mono text-xs uppercase tracking-wider transition-all duration-200 border flex items-center gap-2 ${
                  isSelected
                    ? "bg-cyan-400 text-black font-bold border-cyan-300 shadow-[0_0_20px_rgba(38,189,226,0.4)]"
                    : "bg-white/3 border border-white/10 text-gray-300 hover:text-white hover:bg-white/8"
                }`}
              >
                <IconCpu size={14} />
                <span>{tech.name}</span>
              </button>
            );
          })}
        </div>

        {/* Matrix Visualization Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: 17 SDGs Highlight Board */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-white/2 border border-white/10 backdrop-blur-xl">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-gray-400 block mb-4">
              SDG IMPACT RECEPTIVITY MAP:
            </span>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {SDGS_DATA.map((sdg) => {
                const isPrimary = selectedTech.primarySdgs.includes(sdg.id);
                const isSecondary = selectedTech.secondarySdgs.includes(sdg.id);
                const isRelevant = isPrimary || isSecondary;

                return (
                  <button
                    key={sdg.id}
                    onClick={() => onSelectSDG?.(sdg)}
                    data-cursor="sdg"
                    className={`relative rounded-2xl p-3 flex flex-col items-center text-center transition-all duration-300 border ${
                      isPrimary
                        ? "border-2 shadow-xl scale-105"
                        : isSecondary
                        ? "opacity-85 border-white/20"
                        : "opacity-25 grayscale border-transparent hover:opacity-50"
                    }`}
                    style={{
                      backgroundColor: isRelevant ? `${sdg.color}15` : "rgba(255,255,255,0.02)",
                      borderColor: isPrimary ? sdg.color : undefined,
                      boxShadow: isPrimary ? `0 0 18px ${sdg.color}40` : "none",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl p-1 mb-2 flex items-center justify-center"
                      style={{ backgroundColor: sdg.color }}
                    >
                      <Image
                        src={sdg.icon}
                        alt={sdg.title}
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    </div>
                    <span className="font-mono text-[10px] font-black text-white">
                      #{sdg.number}
                    </span>
                    <span className="font-heading text-[10px] font-bold text-gray-200 line-clamp-1 max-w-17.5">
                      {sdg.title}
                    </span>

                    {/* Primary / Secondary Tag */}
                    {isPrimary && (
                      <span className="absolute -top-2 px-1.5 py-0.2 rounded-full bg-cyan-400 text-black font-mono text-[8px] font-black uppercase">
                        PRIMARY
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Technology Deep Dive & Use Cases */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <motion.div
              key={selectedTech.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="p-6 sm:p-8 rounded-3xl bg-white/4 border border-white/15 backdrop-blur-2xl shadow-2xl"
            >
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <IconSparkles size={14} />
                <span>DOMAIN DEPLOYMENT PROFILE</span>
              </div>

              <h3 className="font-heading text-2xl font-black text-white mb-2">
                {selectedTech.name}
              </h3>

              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6">
                {selectedTech.shortDesc}
              </p>

              <div className="space-y-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  PROVEN REAL-WORLD USE CASES:
                </span>
                {selectedTech.sampleUseCases.map((uc) => {
                  const targetSdg = SDGS_DATA.find((s) => s.id === uc.sdgId);
                  return (
                    <div
                      key={uc.title}
                      className="p-3.5 rounded-2xl bg-white/3 border border-white/5"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-heading text-xs font-bold text-white">
                          {uc.title}
                        </span>
                        {targetSdg && (
                          <span
                            className="font-mono text-[10px] px-2 py-0.5 rounded-full font-bold text-white"
                            style={{ backgroundColor: targetSdg.color }}
                          >
                            Goal {targetSdg.number}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {uc.useCase}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
