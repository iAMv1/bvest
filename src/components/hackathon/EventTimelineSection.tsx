"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { EVENT_SCHEDULE, TimelineEvent } from "@/data/timeline";
import { IconCalendar, IconClock, IconSparkles } from "@/components/hackathon/Icons";

export const EventTimelineSection: React.FC = () => {
  const [filterStage, setFilterStage] = useState<"all" | "pre-hack" | "day-1" | "day-2">("all");

  const filteredEvents =
    filterStage === "all"
      ? EVENT_SCHEDULE
      : EVENT_SCHEDULE.filter((ev) => ev.stage === filterStage);

  return (
    <section id="timeline" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#07090E]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <IconCalendar size={14} />
              <span>Event Progression</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              HACKATHON SCHEDULE.
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "FULL RUN OF SHOW" },
              { id: "pre-hack", label: "PHASE 1: PRE-HACK" },
              { id: "day-1", label: "DAY 1: SPRINT" },
              { id: "day-2", label: "DAY 2: DEMOS" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilterStage(btn.id as typeof filterStage)}
                data-cursor="button"
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                  filterStage === btn.id
                    ? "bg-cyan-400 text-black shadow-lg shadow-cyan-400/20"
                    : "bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Items Progression */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {filteredEvents.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="relative group"
            >
              {/* Bullet Node */}
              <div className="absolute -left-7.75 sm:-left-11.75 top-1.5 w-4 h-4 rounded-full bg-[#07090E] border-2 border-cyan-400 flex items-center justify-center group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(38,189,226,0.6)]">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>

              {/* Event Card */}
              <div className="p-6 rounded-3xl bg-white/2 border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
                    <IconClock size={13} />
                    <span>{item.time}</span>
                    <span className="text-white/30">&middot;</span>
                    <span className="text-gray-400">{item.date}</span>
                  </div>

                  {item.badge && (
                    <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-black text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
