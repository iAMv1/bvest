"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { coreTeamData } from "@/lib/team-data";

const CATEGORIES = [
  { id: "all", label: "ALL CREW" },
  { id: "tech", label: "TECH & DESIGN" },
  { id: "events", label: "EVENTS EXEC" },
  { id: "logistics", label: "LOGISTICS & FOOD" },
  { id: "outreach", label: "OUTREACH & SPONSORS" },
] as const;

export const CoreTeamSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredMembers =
    activeTab === "all"
      ? coreTeamData
      : coreTeamData.filter((m) => m.category === activeTab);

  const isAllCrewView = activeTab === "all";

  return (
    <section
      id="core-team"
      className="relative py-24 md:py-28 w-full overflow-hidden scroll-mt-24 bg-sdg6/[0.03] dark:bg-transparent border-t border-black/10 dark:border-white/5"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-grid absolute inset-0 md:opacity-40" />
        <div className="bg-dots absolute inset-0 opacity-40" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[30rem] h-[30rem] bg-sdg6/10 rounded-full blur-[160px] animate-drift" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[24rem] h-[24rem] bg-sdg3/10 rounded-full blur-[140px] animate-drift-slow" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <Reveal className="text-center mb-12 md:mb-16 relative">
          <span
            className="outline-text pointer-events-none select-none absolute -top-8 md:-top-12 left-1/2 -translate-x-1/2 font-heading text-[4.5rem] md:text-[8rem] font-black uppercase tracking-tight whitespace-nowrap [mask-image:linear-gradient(to_bottom,black_45%,transparent_85%)]"
            aria-hidden="true"
          >
            Core Team
          </span>
          <h2 className="relative font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight">
            Student{" "}
            <span className="bg-gradient-to-r from-sdg6 to-sdg3 bg-clip-text text-transparent">
              Coordinators
            </span>
          </h2>
          <p className="relative text-stone-950 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-sans">
            The student leadership driving operations, logistics, design, and tech across BVEST XIII.
          </p>
        </Reveal>

        {/* Modern Clean Filter Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3 mb-12 sm:mb-16">
          {CATEGORIES.map((tab) => {
            const isActive = activeTab === tab.id;
            const count =
              tab.id === "all"
                ? coreTeamData.length
                : coreTeamData.filter((m) => m.category === tab.id).length;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "text-white dark:text-stone-950 shadow-md scale-105"
                    : "text-stone-700 dark:text-gray-300 hover:text-stone-950 dark:hover:text-white bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-xl bg-stone-950 dark:bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab.label}
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-md font-mono ${
                      isActive
                        ? "bg-white/20 dark:bg-black/20 text-white dark:text-stone-950"
                        : "bg-black/10 dark:bg-white/10 text-stone-600 dark:text-gray-300"
                    }`}
                  >
                    {count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Card Container */}
        <motion.div
          layout
          className={
            isAllCrewView
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          }
        >
          <AnimatePresence mode="popLayout">
            {filteredMembers.map((member, idx) => {
              // ---------------- COMPACT CARD LAYOUT (FOR ALL CREW VIEW - NO BIO DESCRIPTION) ----------------
              if (isAllCrewView) {
                return (
                  <motion.div
                    key={member.id}
                    layout
                    initial={{ opacity: 0, scale: 0.92, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="group relative flex flex-row items-center gap-4 bg-[#121316] p-4 rounded-2xl border border-white/10 shadow-lg hover:border-white/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    style={{
                      boxShadow: `0 8px 24px -8px ${member.color}25`,
                    }}
                  >
                    {/* Hover Glow Border */}
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 border"
                      style={{ borderColor: member.color }}
                    />

                    {/* Member ID Tag */}
                    <div className="absolute top-2 right-2 z-10 pointer-events-none opacity-80 group-hover:opacity-100">
                      <span className="bg-white/10 text-stone-300 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border border-white/15">
                        #{member.id}
                      </span>
                    </div>

                    {/* Compact Left Photo/Avatar Container */}
                    <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden shrink-0 border border-white/20 bg-gradient-to-b from-stone-900 to-[#18191E] flex items-center justify-center">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="100px"
                          className="object-cover object-top transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="relative w-full h-full flex flex-col items-center justify-center bg-black/40">
                          <span
                            className="text-2xl font-heading font-black"
                            style={{
                              color: member.color,
                              textShadow: `0 0 12px ${member.color}99`,
                            }}
                          >
                            {member.initials}
                          </span>
                        </div>
                      )}

                      {/* Mini Accent Line */}
                      <div
                        className="absolute bottom-0 inset-x-0 h-1"
                        style={{ backgroundColor: member.color }}
                      />
                    </div>

                    {/* Compact Right Info Details */}
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-heading text-lg font-bold text-white leading-tight truncate">
                          {member.name}
                        </h3>
                      </div>

                      {/* Role Ribbon */}
                      <div className="mb-2">
                        <span
                          className="inline-block text-[10px] font-heading font-bold px-2 py-0.5 rounded text-stone-950 uppercase tracking-wider"
                          style={{ backgroundColor: member.color }}
                        >
                          {member.role}
                        </span>
                      </div>

                      {/* Departments */}
                      <div className="flex flex-wrap gap-1">
                        {member.departments.slice(0, 2).map((dept) => (
                          <span
                            key={dept}
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-stone-300 truncate"
                          >
                            #{dept}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              }

              // ---------------- BIG PHOTO POSTER LAYOUT (FOR INTERNAL DEPARTMENTS - WITH BIO DESCRIPTION) ----------------
              return (
                <motion.div
                  key={member.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative h-full flex flex-col"
                >
                  {/* Outer Card Frame */}
                  <div
                    className="relative flex flex-col h-full bg-[#121316] rounded-3xl overflow-hidden border border-white/15 shadow-xl transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02]"
                    style={{
                      boxShadow: `0 12px 35px -10px ${member.color}35`,
                    }}
                  >
                    {/* Hover Glow Border */}
                    <div
                      className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 z-30"
                      style={{
                        borderColor: member.color,
                        boxShadow: `inset 0 0 15px ${member.color}40, 0 0 25px ${member.color}60`,
                      }}
                    />

                    {/* Member ID Corner Tag */}
                    <div className="absolute top-3 right-3 z-30 pointer-events-none">
                      <div className="bg-white/10 text-stone-200 font-mono text-[9px] font-bold uppercase px-2.5 py-1 rounded-lg border border-white/15 backdrop-blur-md tracking-wider">
                        CREW #{member.id}
                      </div>
                    </div>

                    {/* PHOTO / AVATAR AREA */}
                    <div className="relative w-full h-64 sm:h-72 bg-gradient-to-b from-stone-900 to-[#18191E] overflow-hidden border-b border-white/10 shrink-0">
                      {/* Ambient Color Glow */}
                      <div
                        className="absolute inset-0 opacity-40 mix-blend-screen transition-opacity group-hover:opacity-75 duration-300"
                        style={{
                          background: `radial-gradient(circle at 50% 40%, ${member.color}66 0%, transparent 75%)`,
                        }}
                      />

                      {/* Halftone Dots Overlay */}
                      <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />

                      {member.image ? (
                        /* Photo Display */
                        <div className="relative w-full h-full">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                            priority={idx < 4}
                          />
                          {/* Gradient Vignette */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-black/20" />
                        </div>
                      ) : (
                        /* Initials Artwork Canvas */
                        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 select-none">
                          <div className="relative z-10 flex items-center justify-center">
                            <span
                              className="text-6xl sm:text-7xl font-heading font-black tracking-widest relative z-10 transition-transform duration-300 group-hover:scale-110"
                              style={{
                                color: member.color,
                                textShadow: `0 0 20px ${member.color}aa`,
                              }}
                            >
                              {member.initials}
                            </span>
                          </div>

                          <div className="mt-3 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/15 bg-black/40 backdrop-blur-sm text-stone-300">
                            CREW // {member.name.toUpperCase()}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* CARD INFO SECTION */}
                    <div className="relative p-6 pt-5 flex-1 flex flex-col justify-between bg-[#121316] z-10">
                      <div>
                        {/* Member Name */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-heading text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-sdg6 transition-colors">
                            {member.name}
                          </h3>
                        </div>

                        {/* Role Sticker Ribbon */}
                        <div className="mb-4 inline-block">
                          <span
                            className="inline-block text-xs font-heading font-bold px-3 py-1 rounded-lg text-stone-950 uppercase tracking-wider shadow-md"
                            style={{
                              backgroundColor: member.color,
                              boxShadow: `0 4px 12px ${member.color}44`,
                            }}
                          >
                            {member.role}
                          </span>
                        </div>

                        {/* Department Badges */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {member.departments.map((dept) => (
                            <span
                              key={dept}
                              className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-white/5 border border-white/15 text-stone-300 uppercase tracking-wide"
                            >
                              #{dept}
                            </span>
                          ))}
                        </div>

                        {/* Bio / Description (Preserved in Internal Sections) */}
                        <p className="text-xs text-gray-400 leading-relaxed font-sans line-clamp-3">
                          {member.bio}
                        </p>
                      </div>

                      {/* Bottom Accent Line */}
                      <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                        <div
                          className="h-1.5 w-12 rounded-full transition-all duration-300 group-hover:w-full"
                          style={{ backgroundColor: member.color }}
                        />
                        <span className="text-[10px] text-gray-500 font-mono">
                          BVEST crew
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
