"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TIMELINE_METRO_DATA,
  TimelineStation,
} from "@/data/timeline";
import {
  IconCalendar,
  IconClock,
  IconMapPin,
  IconSparkles,
  IconUsers,
} from "@/components/hackathon/Icons";

export const EventTimelineSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "day-1" | "day-2">("all");
  const [viewMode, setViewMode] = useState<"metro" | "feed">("metro");
  const [selectedStationId, setSelectedStationId] = useState<string>("d1-welcome");

  const day1Stations = TIMELINE_METRO_DATA.filter((s) => s.day === "day-1");
  const day2Stations = TIMELINE_METRO_DATA.filter((s) => s.day === "day-2");

  const displayedStations =
    activeTab === "all"
      ? TIMELINE_METRO_DATA
      : activeTab === "day-1"
      ? day1Stations
      : day2Stations;

  return (
    <section id="timeline" className="relative py-24 px-4 sm:px-6 lg:px-10 bg-[#020306] overflow-hidden">
      {/* Background Cybernetic Auras */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-10 left-1/4 w-125 h-125 bg-[#000F9B]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 w-150 h-150 bg-[#3D008D]/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-75 bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <IconCalendar size={14} />
              <span>18TH &amp; 22ND OCTOBER 2026 &bull; 24 HOURS</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[0.95]">
              HACKATHON <span className="text-cyan-400">TIMELINE.</span>
            </h2>
            <p className="mt-3 text-slate-400 font-sans text-sm sm:text-base max-w-2xl">
              24-Hour Hybrid Route: Online Kickoff &amp; Round 1 on Discord, followed by Grand Finale &amp; In-Person Pitches at BVCOE New Delhi Campus.
            </p>
          </div>

          {/* Controls: Mode Switcher & Day Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* View Mode Toggle */}
            <div className="inline-flex p-1 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
              <button
                onClick={() => setViewMode("metro")}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold uppercase transition-all ${
                  viewMode === "metro"
                    ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🚇 Circuit Route Map
              </button>
              <button
                onClick={() => setViewMode("feed")}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold uppercase transition-all ${
                  viewMode === "feed"
                    ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                📋 Run of Show
              </button>
            </div>

            {/* Day Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "all", label: "FULL RUN" },
                { id: "day-1", label: "DAY 1 (ONLINE)" },
                { id: "day-2", label: "DAY 2 (OFFLINE)" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setActiveTab(btn.id as typeof activeTab)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold uppercase transition-all border ${
                    activeTab === btn.id
                      ? "bg-blue-600/30 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                      : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Phase Summary Cards: Direct representation of Day 1 & Day 2 from SVG */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {/* Day 1 Box */}
          <div
            onClick={() => setActiveTab("day-1")}
            className={`cursor-pointer group relative p-5 rounded-2xl border transition-all duration-300 ${
              activeTab === "day-1" || activeTab === "all"
                ? "bg-[#0A1535] border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.15)]"
                : "bg-[#060D22] border-white/10 opacity-70 hover:opacity-100 hover:bg-[#0A1535]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="px-3 py-1 rounded-md bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-extrabold uppercase tracking-widest">
                DAY 1 &bull; 18 OCT
              </span>
              <span className="font-mono text-xs text-cyan-400 font-bold uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                ONLINE DISCORD
              </span>
            </div>
            <h3 className="font-heading text-xl font-black text-white uppercase group-hover:text-cyan-300 transition-colors">
              REMOTE SPRINT &amp; ROUND I JUDGING
            </h3>
            <p className="text-slate-400 font-sans text-xs mt-1">
              Kickoff, architecture guidance, deep development sprints, and preliminary online evaluations to shortlist Day 2 finalists.
            </p>
          </div>

          {/* Day 2 Box */}
          <div
            onClick={() => setActiveTab("day-2")}
            className={`cursor-pointer group relative p-5 rounded-2xl border transition-all duration-300 ${
              activeTab === "day-2" || activeTab === "all"
                ? "bg-[#0A1535] border-blue-400/40 shadow-[0_0_25px_rgba(59,130,246,0.15)]"
                : "bg-[#060D22] border-white/10 opacity-70 hover:opacity-100 hover:bg-[#0A1535]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="px-3 py-1 rounded-md bg-blue-500/20 border border-blue-400/40 text-blue-300 font-mono text-xs font-extrabold uppercase tracking-widest">
                DAY 2 &bull; 22 OCT
              </span>
              <span className="font-mono text-xs text-blue-400 font-bold uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                OFFLINE &bull; BVCOE NEW DELHI
              </span>
            </div>
            <h3 className="font-heading text-xl font-black text-white uppercase group-hover:text-blue-300 transition-colors">
              CAMPUS SPRINT, JURY DEMOS &amp; AWARDS
            </h3>
            <p className="text-slate-400 font-sans text-xs mt-1">
              Inauguration ceremony, in-person table mentorship, Semifinals (Round 2), Grand Auditorium Pitches (Round 3), and Valedictory.
            </p>
          </div>
        </div>

        {/* VIEW 1: CYBER METRO CIRCUIT ROUTE MAP (Directly Inspired by timeline 8.0.svg) */}
        {viewMode === "metro" && (
          <div className="relative mb-12">
            {/* Desktop / Tablet Horizontal Interactive Map Container */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-black/60 border border-cyan-500/25 backdrop-blur-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden">
              {/* Circuit Header Strip */}
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-sm bg-[#0011A6] text-white font-bold uppercase tracking-wider">
                    CIRCUIT TRANSIT PROTOCOL
                  </span>
                  <span className="text-slate-400 hidden sm:inline">24-Hour Hybrid Sprint Track</span>
                </div>
                <div className="flex items-center gap-4 text-cyan-400 font-bold">
                  <span>TOTAL STATIONS: {TIMELINE_METRO_DATA.length}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
              </div>

              {/* Day 1 Subway Section */}
              {(activeTab === "all" || activeTab === "day-1") && (
                <div className="relative mb-16">
                  {/* Day 1 Header Badge from SVG */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="px-4 py-2 border-2 border-cyan-400 bg-cyan-950/60 rounded-lg text-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                      <div className="font-heading font-black text-white text-base tracking-wider uppercase">DAY 1</div>
                      <div className="font-mono text-[10px] text-cyan-300 font-bold">ONLINE &bull; 18 OCT &bull; DISCORD</div>
                    </div>
                    <div className="h-0.5 flex-1 bg-linear-to-r from-cyan-400/60 to-transparent" />
                  </div>

                  {/* Horizontal Scroll Track for Day 1 */}
                  <div className="overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-cyan-500/30">
                    <div className="min-w-245 relative py-16 px-4">
                      {/* Main Dual Glowing Rails */}
                      <div className="absolute top-1/2 left-16 right-16 -translate-y-1/2 h-2.5 rounded-full bg-[#0011A6]/80 border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.5)] z-0">
                        {/* Animated traveling photon pulse */}
                        <motion.div
                          animate={{ x: ["0%", "100%"] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          className="w-20 h-full rounded-full bg-linear-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_15px_#06b6d4]"
                        />
                      </div>

                      {/* [START] Pill */}
                      <div className="absolute top-1/2 left-2 -translate-y-1/2 z-10">
                        <span className="px-2.5 py-1 rounded-sm bg-[#000F9B] border-2 border-cyan-400 text-white font-mono text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                          START
                        </span>
                      </div>

                      {/* Day 1 Stations Along the Line */}
                      <div className="relative flex justify-between items-center z-10 pl-20 pr-8">
                        {day1Stations.map((station, idx) => {
                          const isTop = idx % 2 === 0;
                          const isSelected = selectedStationId === station.id;

                          return (
                            <div
                              key={station.id}
                              onClick={() => setSelectedStationId(station.id)}
                              className="group relative flex flex-col items-center cursor-pointer"
                            >
                              {/* Station Callout Label (Alternating Top / Bottom like the SVG) */}
                              <div
                                className={`absolute ${
                                  isTop ? "-top-16" : "top-8"
                                } w-40 text-center flex flex-col items-center transition-all duration-300 group-hover:scale-105`}
                              >
                                <span className={`font-mono text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md transition-colors ${
                                  isSelected ? "bg-cyan-400 text-black shadow-[0_0_10px_#06b6d4]" : "text-cyan-300 bg-cyan-950/70 border border-cyan-500/30"
                                }`}>
                                  {station.time}
                                </span>
                                <span className={`font-heading text-xs font-black uppercase mt-1 leading-tight tracking-tight transition-colors ${
                                  isSelected ? "text-cyan-300" : "text-white group-hover:text-cyan-200"
                                }`}>
                                  {station.title}
                                </span>
                              </div>

                              {/* Dashed Connector Stem from SVG */}
                              <div
                                className={`absolute ${
                                  isTop ? "-top-6 h-6" : "top-4 h-6"
                                } w-0.5 border-l-2 border-dashed ${
                                  isSelected ? "border-cyan-400" : "border-cyan-500/40"
                                }`}
                              />

                              {/* Station Ring Node */}
                              <div className="relative w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-125">
                                {/* Outer Glowing Ring */}
                                <div
                                  className={`absolute inset-0 rounded-full border-2 transition-all ${
                                    isSelected
                                      ? "border-cyan-300 bg-cyan-500/30 shadow-[0_0_20px_#06b6d4]"
                                      : "border-cyan-400 bg-[#020306] group-hover:border-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                                  }`}
                                />
                                {/* Inner Solid Dot */}
                                <div className={`w-3 h-3 rounded-full ${isSelected ? "bg-cyan-300 shadow-[0_0_8px_#06b6d4]" : "bg-white"}`} />
                                {isSelected && (
                                  <span className="absolute -inset-1 rounded-full border border-cyan-400 animate-ping opacity-60" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Transition Inter-Day Warp Link */}
              {activeTab === "all" && (
                <div className="flex items-center justify-center my-6">
                  <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-dashed border-cyan-400/40 text-cyan-400 font-mono text-[11px] uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>INTER-PHASE TRANSIT &bull; 19–21 OCT REPOSITORY REFINEMENT &bull; ARRIVAL AT BVCOE</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  </div>
                </div>
              )}

              {/* Day 2 Subway Section (Snake Circuit Route matching SVG) */}
              {(activeTab === "all" || activeTab === "day-2") && (
                <div className="relative">
                  {/* Day 2 Header Badge from SVG */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="px-4 py-2 border-2 border-blue-400 bg-blue-950/60 rounded-lg text-center shadow-[0_0_20px_rgba(61,0,141,0.4)]">
                      <div className="font-heading font-black text-white text-base tracking-wider uppercase">DAY 2</div>
                      <div className="font-mono text-[10px] text-blue-300 font-bold">OFFLINE &bull; 22 OCT &bull; BVCOE, NEW DELHI</div>
                    </div>
                    <div className="h-0.5 flex-1 bg-linear-to-r from-blue-400/60 to-transparent" />
                  </div>

                  {/* Horizontal Scroll Track for Day 2 */}
                  <div className="overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-blue-500/30">
                    <div className="min-w-275 relative py-16 px-4">
                      {/* Dual Glowing Rails */}
                      <div className="absolute top-1/2 left-8 right-20 -translate-y-1/2 h-2.5 rounded-full bg-[#3D008D]/80 border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.4)] z-0">
                        {/* Animated traveling photon pulse */}
                        <motion.div
                          animate={{ x: ["0%", "100%"] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                          className="w-20 h-full rounded-full bg-linear-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_15px_#06b6d4]"
                        />
                      </div>

                      {/* [END] Pill */}
                      <div className="absolute top-1/2 right-2 -translate-y-1/2 z-10">
                        <span className="px-2.5 py-1 rounded-sm bg-[#000F9B] border-2 border-cyan-400 text-white font-mono text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                          END
                        </span>
                      </div>

                      {/* Day 2 Stations */}
                      <div className="relative flex justify-between items-center z-10 pl-6 pr-24">
                        {day2Stations.map((station, idx) => {
                          const isTop = idx % 2 === 0;
                          const isSelected = selectedStationId === station.id;

                          return (
                            <div
                              key={station.id}
                              onClick={() => setSelectedStationId(station.id)}
                              className="group relative flex flex-col items-center cursor-pointer"
                            >
                              {/* Station Callout Label */}
                              <div
                                className={`absolute ${
                                  isTop ? "-top-16" : "top-8"
                                } w-36 text-center flex flex-col items-center transition-all duration-300 group-hover:scale-105`}
                              >
                                <span className={`font-mono text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md transition-colors ${
                                  isSelected ? "bg-cyan-400 text-black shadow-[0_0_10px_#06b6d4]" : "text-cyan-300 bg-blue-950/70 border border-blue-500/30"
                                }`}>
                                  {station.time}
                                </span>
                                <span className={`font-heading text-[11px] font-black uppercase mt-1 leading-tight tracking-tight transition-colors ${
                                  isSelected ? "text-cyan-300" : "text-white group-hover:text-cyan-200"
                                }`}>
                                  {station.title}
                                </span>
                              </div>

                              {/* Dashed Connector Stem */}
                              <div
                                className={`absolute ${
                                  isTop ? "-top-6 h-6" : "top-4 h-6"
                                } w-0.5 border-l-2 border-dashed ${
                                  isSelected ? "border-cyan-400" : "border-blue-400/40"
                                }`}
                              />

                              {/* Station Ring Node */}
                              <div className="relative w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-125">
                                <div
                                  className={`absolute inset-0 rounded-full border-2 transition-all ${
                                    isSelected
                                      ? "border-cyan-300 bg-cyan-500/30 shadow-[0_0_20px_#06b6d4]"
                                      : "border-blue-400 bg-[#020306] group-hover:border-cyan-300 shadow-[0_0_10px_rgba(61,0,141,0.4)]"
                                  }`}
                                />
                                <div className={`w-3 h-3 rounded-full ${isSelected ? "bg-cyan-300 shadow-[0_0_8px_#06b6d4]" : "bg-white"}`} />
                                {isSelected && (
                                  <span className="absolute -inset-1 rounded-full border border-cyan-400 animate-ping opacity-60" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: RUN OF SHOW TACTICAL FEED (Cards view) */}
        {viewMode === "feed" && (
          <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
            {displayedStations.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="relative group cursor-pointer"
                onClick={() => setSelectedStationId(item.id)}
              >
                {/* Station Node on vertical spine */}
                <div className={`absolute -left-7.75 sm:-left-11.75 top-2 w-4 h-4 rounded-full bg-[#020306] border-2 transition-transform group-hover:scale-125 flex items-center justify-center ${
                  selectedStationId === item.id
                    ? "border-cyan-300 shadow-[0_0_15px_#06b6d4]"
                    : "border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${selectedStationId === item.id ? "bg-cyan-300" : "bg-cyan-400"}`} />
                </div>

                {/* Card Container */}
                <div className={`p-6 rounded-3xl border backdrop-blur-xl transition-all ${
                  selectedStationId === item.id
                    ? "bg-cyan-950/30 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                    : "bg-white/2 border-white/10 hover:border-white/20"
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3 text-xs font-mono font-bold">
                      <span className={`px-2.5 py-0.5 rounded-md ${
                        item.day === "day-1"
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                          : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      }`}>
                        {item.phase} &bull; {item.mode}
                      </span>
                      <div className="flex items-center gap-1.5 text-cyan-400">
                        <IconClock size={13} />
                        <span>{item.time}</span>
                      </div>
                      <span className="text-white/20">&bull;</span>
                      <div className="flex items-center gap-1 text-slate-400">
                        <IconMapPin size={13} />
                        <span>{item.platform}</span>
                      </div>
                    </div>

                    {item.badge && (
                      <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-black uppercase tracking-wider bg-cyan-400/10 border border-cyan-400/30 text-cyan-300">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-black text-white uppercase group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
