"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BvestLogo } from "@/components/BvestLogo";
import { Magnetic } from "@/components/Magnetic";
import { useIntro } from "@/components/IntroContext";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export const Hero: React.FC = () => {
  const introDone = useIntro();
  const shouldReduceMotion = useReducedMotion();
  const start = introDone; // choreograph after intro curtain lifts

  if (shouldReduceMotion) {
    return (
      <div className="max-w-xl pb-24 md:pb-40 pointer-events-auto">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-300 island-glass mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          BVCOE · Annual Technical Fest
        </span>

        <div className="mb-8 text-gray-900 dark:text-white">
          <BvestLogo size={200} showSubtitle={true} />
        </div>

        <p className="text-xl md:text-2xl text-gray-300 max-w-lg mb-10 leading-relaxed font-medium">
          The Annual Technical Fest themed around the UN Sustainable Development Goals.
        </p>

        <div className="flex flex-col sm:flex-row items-start gap-4 text-gray-400 mb-12 text-sm font-medium">
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] uppercase tracking-widest px-2.5 py-1.5 rounded-full island-glass text-gray-300">Date</span>
            <span>October 24 &ndash; 26, 2026 (Placeholder)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] uppercase tracking-widest px-2.5 py-1.5 rounded-full island-glass text-gray-300">Venue</span>
            <span>BVCOE Campus (Placeholder)</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Magnetic strength={0.25}>
            <Link
              href="#goals"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-950 rounded-full font-semibold transition-all duration-300 ease-fluid hover:bg-gray-200 active:scale-[0.97] shadow-[0_8px_40px_rgba(255,255,255,0.15)]"
            >
              Explore the 17 Goals
              <span className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-300 ease-fluid group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105">
                <svg className="w-3.5 h-3.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 6h8M6 2l4 4-4 4" />
                </svg>
              </span>
            </Link>
          </Magnetic>
          <Magnetic strength={0.25}>
            <Link
              href="/society/login"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold island-glass text-white transition-all duration-300 ease-fluid hover:bg-white/10 active:scale-[0.97]"
            >
              Society Portal
              <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-sm">&rarr;</span>
            </Link>
          </Magnetic>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-xl pb-24 md:pb-40 pointer-events-auto"
      initial="hidden"
      animate={start ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
      }}
    >
      <motion.span
        variants={{
          hidden: { opacity: 0, y: 16 },
          show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
        }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-300 island-glass mb-8"
      >
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-emerald-400"
          animate={{ opacity: [1, 0.35, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        BVCOE · Annual Technical Fest
      </motion.span>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 24 },
          show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
        }}
        className="mb-8 text-gray-900 dark:text-white"
      >
        <BvestLogo size={200} showSubtitle={true} />
      </motion.div>

      <motion.p
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT_EXPO } },
        }}
        className="text-xl md:text-2xl text-gray-300 max-w-lg mb-10 leading-relaxed font-medium"
      >
        The Annual Technical Fest themed around the UN Sustainable Development Goals.
      </motion.p>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 18 },
          show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
        }}
        className="flex flex-col sm:flex-row items-start gap-4 text-gray-400 mb-12 text-sm font-medium"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] uppercase tracking-widest px-2.5 py-1.5 rounded-full island-glass text-gray-300">Date</span>
          <span>October 24 &ndash; 26, 2026 (Placeholder)</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] uppercase tracking-widest px-2.5 py-1.5 rounded-full island-glass text-gray-300">Venue</span>
          <span>BVCOE Campus (Placeholder)</span>
        </div>
      </motion.div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 18 },
          show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
        }}
        className="flex flex-wrap items-center gap-4"
      >
        <Magnetic strength={0.25}>
          <Link
            href="#goals"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-950 rounded-full font-semibold transition-all duration-300 ease-fluid hover:bg-gray-200 active:scale-[0.97] shadow-[0_8px_40px_rgba(255,255,255,0.15)]"
          >
            Explore the 17 Goals
            <span className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-300 ease-fluid group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105">
              <svg className="w-3.5 h-3.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 6h8M6 2l4 4-4 4" />
              </svg>
            </span>
          </Link>
        </Magnetic>
        <Magnetic strength={0.25}>
          <Link
            href="/society/login"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold island-glass text-white transition-all duration-300 ease-fluid hover:bg-white/10 active:scale-[0.97]"
          >
            Society Portal
            <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-sm">&rarr;</span>
          </Link>
        </Magnetic>
      </motion.div>
    </motion.div>
  );
};