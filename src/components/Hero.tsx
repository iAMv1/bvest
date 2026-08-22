"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BvestLogo } from "@/components/BvestLogo";
import { Magnetic } from "@/components/Magnetic";
import { useIntro } from "@/components/IntroContext";
import { sdgData } from "@/lib/sdg-data";


const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export const Hero: React.FC = () => {
  const introDone = useIntro();
  const shouldReduceMotion = useReducedMotion();
  const start = introDone; // choreograph after intro curtain lifts

  if (shouldReduceMotion) {
    return (
      <div className="max-w-xl pb-24 md:pb-40 pointer-events-auto flex flex-col items-center md:items-start text-center md:text-left mx-auto md:mx-0">
        <div className="mb-8 text-gray-900 dark:text-white flex justify-center md:justify-start w-full">
          <BvestLogo size={200} showSubtitle={true} />
        </div>

        <p className="text-xl md:text-2xl text-stone-950 dark:text-gray-300 max-w-lg mb-10 leading-relaxed font-medium">
          The Annual Technical Fest themed around the UN Sustainable Development Goals.
        </p>

        <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-6 text-stone-950 dark:text-gray-400 mb-12 text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-900 dark:text-gray-200 uppercase text-xs tracking-wider">Date:</span>
            <span>October 22 &ndash; 23, 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-900 dark:text-gray-200 uppercase text-xs tracking-wider">Venue:</span>
            <span>BVCOE Campus</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
          <Link
            href="/events"
            className="group inline-flex items-center gap-3 px-7 py-3.5 bg-white text-stone-950 rounded-full font-semibold transition-all duration-200 hover:bg-stone-200 active:scale-[0.98] shadow-md dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
          >
            Explore Fest Events
            <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center text-stone-900 transition-transform duration-200 group-hover:translate-x-0.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 6h8M6 2l4 4-4 4" />
              </svg>
            </span>
          </Link>
          <Link
            href="/society/login"
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-semibold island-glass text-stone-950 dark:text-white transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/10 active:scale-[0.98]"
          >
            Society Portal
            <span className="w-6 h-6 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-xs transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-xl pb-24 md:pb-40 pointer-events-auto flex flex-col items-center md:items-start text-center md:text-left mx-auto md:mx-0"
      initial="hidden"
      animate={start ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
      }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 24 },
          show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
        }}
        className="mb-8 text-gray-900 dark:text-white flex justify-center md:justify-start w-full"
      >
        <h1 className="sr-only">
          BVEST XIII (2026) — Annual Technical Fest of Bharati Vidyapeeth&apos;s College of Engineering (BVCOE) Delhi
        </h1>
        <BvestLogo size={200} showSubtitle={true} />
      </motion.div>

      <motion.p
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT_EXPO } },
        }}
        className="text-xl md:text-2xl text-stone-950 dark:text-gray-300 max-w-lg mb-10 leading-relaxed font-medium"
      >
        The Annual Technical Fest themed around the UN Sustainable Development Goals.
      </motion.p>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 18 },
          show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
        }}
        className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-6 text-stone-950 dark:text-gray-400 mb-12 text-sm font-medium"
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold text-stone-900 dark:text-gray-200 uppercase text-xs tracking-wider">Date:</span>
          <span>October 22 &ndash; 23, 2026</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-stone-900 dark:text-gray-200 uppercase text-xs tracking-wider">Venue:</span>
          <span>BVCOE Campus</span>
        </div>
      </motion.div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 18 },
          show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
        }}
        className="flex flex-wrap items-center justify-center md:justify-start gap-4"
      >
        <Link
          href="/events"
          className="group inline-flex items-center gap-3 px-7 py-3.5 bg-white text-stone-950 rounded-full font-semibold transition-all duration-200 hover:bg-stone-200 active:scale-[0.98] shadow-md dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
        >
          Explore Fest Events
          <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center text-stone-900 transition-transform duration-200 group-hover:translate-x-0.5">
            <svg className="w-3.5 h-3.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6h8M6 2l4 4-4 4" />
            </svg>
          </span>
        </Link>
        <Link
          href="/society/login"
          className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-semibold island-glass text-stone-950 dark:text-white transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/10 active:scale-[0.98]"
        >
          Society Portal
          <span className="w-6 h-6 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-xs transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
        </Link>
      </motion.div>
    </motion.div>
  );
};