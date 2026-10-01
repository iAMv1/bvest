"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SDGS_DATA, SDGItem } from "@/data/sdgs";
import { IconSparkles } from "@/components/hackathon/Icons";

interface SDGNetworkGraphProps {
  onSelectSDG?: (sdg: SDGItem) => void;
}

export const SDGNetworkGraph: React.FC<SDGNetworkGraphProps> = ({ onSelectSDG }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<number>(13); // Default Climate Action

  const selectedNode = SDGS_DATA.find((s) => s.id === selectedNodeId) || SDGS_DATA[0];
  const relatedNodeIds = selectedNode.relatedSdgs;

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#090D18] border-y border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(38,189,226,0.06),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <IconSparkles size={14} />
              <span>Systemic Interconnectivity</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-black tracking-tight text-white uppercase">
              INTERCONNECTED SDG NETWORK.
            </h2>
          </div>
          <p className="font-mono text-xs text-gray-400 max-w-md">
            No sustainable challenge exists in a vacuum. Select any node below to inspect systemic cross-impacts and co-dependencies.
          </p>
        </div>

        {/* Interactive Cluster Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT: 17 Interlocking Interactive Node Chips */}
          <div className="lg:col-span-7 flex flex-wrap gap-2.5 p-6 rounded-3xl bg-white/2 border border-white/10 backdrop-blur-xl">
            {SDGS_DATA.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isRelated = relatedNodeIds.includes(node.id);

              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  data-cursor="sdg"
                  className={`group flex items-center gap-2 px-3 py-2 rounded-2xl border text-xs font-mono transition-all duration-200 ${
                    isSelected
                      ? "bg-white text-black font-bold border-white shadow-xl scale-105"
                      : isRelated
                      ? "bg-white/10 border-white/30 text-white font-semibold shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                      : "bg-white/3 border border-white/10 text-gray-400 hover:text-white hover:bg-white/6"
                  }`}
                  style={{
                    borderColor: isSelected ? node.color : undefined,
                  }}
                >
                  <span
                    className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold text-white shadow-sm shrink-0"
                    style={{ backgroundColor: node.color }}
                  >
                    {node.number}
                  </span>
                  <span className="truncate max-w-30 sm:max-w-none">{node.title}</span>
                  {isRelated && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT: Active Node Relationship Inspector Card */}
          <div className="lg:col-span-5">
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-3xl border bg-white/4 border-white/15 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
              style={{
                boxShadow: `0 0 35px ${selectedNode.color}25`,
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3.5 mb-4">
                <div
                  className="w-12 h-12 rounded-2xl p-1 flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: selectedNode.color }}
                >
                  <Image
                    src={selectedNode.icon}
                    alt={selectedNode.title}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400 block">
                    ACTIVE NODE // GOAL {selectedNode.number}
                  </span>
                  <h3 className="font-heading text-xl font-black text-white">
                    {selectedNode.title}
                  </h3>
                </div>
              </div>

              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6">
                {selectedNode.shortDescription}
              </p>

              {/* Interlocking Related Goals */}
              <div className="mb-6">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2.5">
                  DIRECT SYSTEMIC MULTIPLIERS:
                </span>
                <div className="flex flex-wrap gap-2">
                  {relatedNodeIds.map((relId) => {
                    const relSdg = SDGS_DATA.find((s) => s.id === relId);
                    if (!relSdg) return null;
                    return (
                      <button
                        key={relId}
                        onClick={() => setSelectedNodeId(relId)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white transition-colors"
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: relSdg.color }}
                        />
                        <span className="font-mono font-bold">#{relSdg.number}</span>
                        <span>{relSdg.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectSDG?.(selectedNode)}
                data-cursor="button"
                className="w-full py-3 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider text-black transition-all hover:brightness-110 active:scale-98 shadow-md"
                style={{ backgroundColor: selectedNode.color }}
              >
                OPEN COMPLETE GOAL {selectedNode.number} BRIEFING &rarr;
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
