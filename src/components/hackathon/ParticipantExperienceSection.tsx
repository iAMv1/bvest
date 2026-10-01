"use client";

import React from "react";
import { motion } from "framer-motion";
import { HACKATHON_STATS } from "@/data/stats";
import { IconSparkles, IconCpu, IconGlobe, IconUsers, IconTrophy } from "@/components/hackathon/Icons";

const EXPERIENCE_PILLARS = [
  {
    tag: "01",
    title: "BUILD",
    headline: "High-Velocity Autonomous Prototyping",
    desc: "36 hours of distraction-free hacking with unlimited campus Wi-Fi, hardware stations, and food. Push code, debug edge cases, and ship working software.",
    color: "#26BDE2",
  },
  {
    tag: "02",
    title: "LEARN",
    headline: "Direct Architect & Founder Mentorship",
    desc: "Roving technical mentors and scheduled office hours provide real-time architectural audits, API debugging, and domain feedback.",
    color: "#FCC30B",
  },
  {
    tag: "03",
    title: "NETWORK",
    headline: "400+ Elite Collegiate Builders",
    desc: "Connect with the sharpest minds from premier institutes nationwide. Meet future startup co-founders, collaborators, and engineering leads.",
    color: "#FD6925",
  },
  {
    tag: "04",
    title: "CREATE IMPACT",
    headline: "Tangible UN SDG Alignment",
    desc: "Your code doesn't live in a vacuum. Solve real-world environmental and societal challenges, pitch to impact judges, and scale post-hackathon.",
    color: "#4C9F38",
  },
];

export const ParticipantExperienceSection: React.FC = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#07090E] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <IconSparkles size={14} />
            <span>The Builder Experience</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            WHY HACKBVP?
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mt-4">
            Designed from the ground up by student engineers for student engineers. Here is what makes HackBVP 8.0 an unforgettable weekend.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {EXPERIENCE_PILLARS.map((pil, idx) => (
            <motion.div
              key={pil.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="p-6 sm:p-8 rounded-3xl bg-white/3 border border-white/10 hover:border-white/20 backdrop-blur-xl flex flex-col justify-between group transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="font-mono text-xs font-black px-2.5 py-1 rounded-lg"
                    style={{
                      backgroundColor: `${pil.color}25`,
                      color: pil.color,
                    }}
                  >
                    PILLAR {pil.tag}
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-black text-white mb-1 group-hover:text-cyan-300 transition-colors">
                  {pil.title}
                </h3>

                <span className="font-mono text-xs text-cyan-400 font-semibold block mb-3">
                  {pil.headline}
                </span>

                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  {pil.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Hackathon Stat Strip */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/2 border border-white/10 backdrop-blur-xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {HACKATHON_STATS.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center">
              <span
                className="font-heading text-3xl sm:text-4xl font-black mb-1"
                style={{ color: stat.color }}
              >
                {stat.value}{stat.suffix}
              </span>
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider block mb-0.5">
                {stat.label}
              </span>
              <span className="text-[10px] text-gray-500 font-mono">
                {stat.sublabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
