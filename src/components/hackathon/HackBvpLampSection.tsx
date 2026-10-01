"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { IconArrowRight, IconSparkles } from "@/components/hackathon/Icons";

export const HackBvpLampSection: React.FC = () => {
  const handleScrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const aboutEl = document.getElementById("about");
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-transparent">
      <LampContainer>
        {/* Lamp Sub-Atmosphere Glow behind logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.35, scale: 1.15 }}
          transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
          className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-40 bg-cyan-400/25 rounded-full blur-[70px]"
        />

        {/* Cinematic Drop-Down Container for the Logo */}
        <motion.div
          initial={{ opacity: 0, y: -160, scale: 0.82 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            damping: 13,
            stiffness: 75,
            mass: 1.15,
            delay: 0.28,
          }}
          className="relative flex flex-col items-center justify-center mb-3 sm:mb-4"
        >
          {/* Reactive Cyan Backlight Halo (Pulses outward upon dropping into the blue light) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              opacity: [0, 0.85, 0.45],
              scale: [0.4, 1.35, 1.15],
            }}
            transition={{
              delay: 0.45,
              duration: 1.4,
              times: [0, 0.4, 1],
              ease: "easeOut",
            }}
            className="absolute inset-0 rounded-full bg-linear-to-b from-cyan-400/40 via-cyan-500/20 to-transparent blur-3xl pointer-events-none"
          />

          {/* Gentle floating motion container (Engages smoothly after drop-down landing) */}
          <motion.div
            animate={{
              y: [0, -7, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.4,
            }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-48 sm:w-60 md:w-68 lg:w-76 h-52 sm:h-64 md:h-72 lg:h-80 flex items-center justify-center">
              <Image
                src="/hack8kalogo.png"
                alt="HackBVP 8.0 Logo"
                fill
                priority
                sizes="(max-width: 640px) 192px, (max-width: 768px) 240px, (max-width: 1024px) 272px, 304px"
                className="object-contain filter drop-shadow-[0_8px_36px_rgba(6,182,212,0.65)] select-none pointer-events-none"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Badge Pill: Drops down following the logo */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 85,
            delay: 0.55,
          }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-[11px] sm:text-xs uppercase tracking-wider mb-2.5 shadow-[0_0_15px_rgba(6,182,212,0.18)] backdrop-blur-sm"
        >
          <IconSparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>National Flagship Hackathon &bull; BVEST XIII</span>
        </motion.div>

        {/* Tagline Heading: Cascades down into position */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 80,
            delay: 0.65,
          }}
          className="bg-linear-to-br from-white via-cyan-100 to-cyan-500/60 py-1 bg-clip-text text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent font-heading uppercase leading-tight"
        >
          BUILD FOR A BETTER WORLD
        </motion.h1>

        {/* Subtitle Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.75,
            ease: "easeOut",
          }}
          className="mt-1.5 max-w-xl text-center text-xs sm:text-sm md:text-base text-slate-300/85 font-sans leading-snug"
        >
          Where 500+ elite builders, designers, and innovators converge under one roof to architect solutions for the United Nations 17 Sustainable Development Goals.
        </motion.p>

        {/* Action Controls & Navigation down */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.85,
            ease: "easeOut",
          }}
          className="mt-4 sm:mt-5 flex flex-row items-center gap-3 z-20"
        >
          <a
            href="#about"
            onClick={handleScrollToAbout}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-black font-semibold text-xs sm:text-sm tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.55)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            <span>EXPLORE HACKATHON</span>
            <IconArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="https://devfolio.co"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 text-white font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-[1.02]"
          >
            <span>Register on Devfolio</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </a>
        </motion.div>

        {/* Subtle Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-3 sm:mt-4 flex flex-col items-center gap-1 text-cyan-400/60 hover:text-cyan-300 transition-colors cursor-pointer"
          onClick={() => {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">SCROLL TO ENTER</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </LampContainer>
    </section>
  );
};
