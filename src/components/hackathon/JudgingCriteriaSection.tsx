"use client";

import React from "react";
import { motion } from "framer-motion";
import { JUDGING_CRITERIA } from "@/data/criteria";
import { IconSparkles, IconCheck } from "@/components/hackathon/Icons";

export const JudgingCriteriaSection: React.FC = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#090D18] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <IconSparkles size={14} />
              <span>Evaluation Rubric</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              HOW TEAMS ARE JUDGED.
            </h2>
          </div>
          <p className="font-mono text-xs text-gray-400 max-w-md">
            Judged on 6 weighted dimensions by senior industry architects, startup founders, and UN SDG specialists. Total weight equals 100%.
          </p>
        </div>

        {/* Criteria Weighted Horizontal Bars & Guiding Questions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {JUDGING_CRITERIA.map((criterion, idx) => (
            <motion.div
              key={criterion.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="p-6 sm:p-7 rounded-3xl bg-white/3 border border-white/10 hover:border-white/20 backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="font-mono text-xs font-black px-2.5 py-1 rounded-lg"
                    style={{
                      backgroundColor: `${criterion.color}25`,
                      color: criterion.color,
                    }}
                  >
                    WEIGHT: {criterion.weight}%
                  </span>
                  <span className="font-heading text-2xl font-black text-white">
                    {criterion.weight}%
                  </span>
                </div>

                {/* Animated Progress Bar */}
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${criterion.weight * 3.5}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: criterion.color }}
                  />
                </div>

                <h3 className="font-heading text-lg font-black text-white mb-2">
                  {criterion.title}
                </h3>

                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {criterion.description}
                </p>
              </div>

              {/* Guiding Questions */}
              <div className="pt-4 border-t border-white/10">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                  JURY SCRUTINY QUESTIONS:
                </span>
                <ul className="space-y-1.5">
                  {criterion.guidingQuestions.map((q, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[11px] text-gray-400">
                      <IconCheck size={12} className="text-cyan-400 mt-0.5 shrink-0" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
