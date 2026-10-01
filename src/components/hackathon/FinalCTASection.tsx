"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { EVENT_CONFIG } from "@/data/event";
import { SDGS_DATA } from "@/data/sdgs";
import { IconSparkles, IconArrowRight, IconCalendar } from "@/components/hackathon/Icons";

export const FinalCTASection: React.FC = () => {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#07090E] border-t border-white/10 overflow-hidden flex items-center justify-center text-center">
      {/* 17 Converging SDG Particles Animation Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(38,189,226,0.12),transparent_70%)]" />

        {/* 17 Floating Converging Particles representing the 17 SDGs */}
        {SDGS_DATA.map((sdg, index) => {
          const angle = (index * 2 * Math.PI) / 17;
          const initialX = Math.cos(angle) * 350;
          const initialY = Math.sin(angle) * 250;

          return (
            <motion.div
              key={sdg.id}
              initial={{
                x: initialX,
                y: initialY,
                opacity: 0.3,
                scale: 0.8,
              }}
              animate={{
                x: [initialX, initialX * 0.4, initialX * 0.8, initialX],
                y: [initialY, initialY * 0.4, initialY * 0.8, initialY],
                opacity: [0.3, 0.7, 0.4, 0.3],
                scale: [0.8, 1.2, 0.9, 0.8],
              }}
              transition={{
                duration: 12 + (index % 5),
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 w-4 h-4 rounded-full blur-[2px]"
              style={{
                backgroundColor: sdg.color,
                boxShadow: `0 0 15px ${sdg.color}`,
              }}
            />
          );
        })}
      </div>

      <div className="relative max-w-4xl mx-auto z-10 flex flex-col items-center">
        {/* HackBVP Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative h-20 w-16 mb-6 flex items-center justify-center"
        >
          <Image
            src="/hack8kalogo.png"
            alt="HackBVP 8.0 Logo"
            width={64}
            height={84}
            className="h-20 w-auto object-contain drop-shadow-[0_0_25px_rgba(56,189,248,0.7)]"
          />
        </motion.div>

        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider mb-6 shadow-[0_0_20px_rgba(38,189,226,0.2)]"
        >
          <IconSparkles size={14} />
          <span>APPLICATIONS CLOSE {EVENT_CONFIG.applicationDeadline}</span>
        </motion.div>

        {/* Massive Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 uppercase leading-tight"
        >
          READY TO BUILD{" "}
          <span className="bg-linear-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            THE FUTURE?
          </span>
        </motion.h2>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-stone-300 text-base sm:text-xl leading-relaxed max-w-2xl mb-10"
        >
          Your idea could become the next scalable solution to a real-world planetary problem. Join 400+ builders this October at BVCOE New Delhi.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={EVENT_CONFIG.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="button"
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-mono font-bold text-sm uppercase tracking-wider bg-linear-to-r from-cyan-400 via-sky-300 to-indigo-300 text-black shadow-[0_0_35px_rgba(38,189,226,0.45)] hover:brightness-110 active:scale-95 transition-all"
          >
            <IconSparkles size={18} />
            <span>REGISTER NOW</span>
            <IconArrowRight size={18} />
          </a>

          <a
            href="#sdgs"
            data-cursor="button"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-mono text-sm font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 border border-white/15 text-white transition-all active:scale-95"
          >
            <span>EXPLORE THE 17 GOALS</span>
            <IconArrowRight size={16} />
          </a>
        </motion.div>

        {/* Meta Notice */}
        <div className="mt-8 flex items-center gap-2 text-xs font-mono text-gray-500">
          <IconCalendar size={14} />
          <span>{EVENT_CONFIG.dates} &middot; BVCOE Campus New Delhi &middot; Free Participation</span>
        </div>
      </div>
    </section>
  );
};
