"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LampContainer, LampBarLight } from "@/components/ui/lamp";
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
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-20 pb-12 sm:pb-16 flex items-center min-h-[calc(100vh-64px)]">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
            
            {/* LEFT COLUMN: Large Typography "BUILD FOR A BETTER WORLD" + Narrative + CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start justify-center text-left order-2 lg:order-1 z-20">
              {/* Badge Pill */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/35 text-cyan-300 font-mono text-xs uppercase tracking-wider mb-4 shadow-[0_0_18px_rgba(6,182,212,0.22)] backdrop-blur-md"
              >
                <IconSparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>National Flagship Hackathon &bull; BVEST XIII</span>
              </motion.div>

              {/* Tagline Heading: Scaled-up and parallel */}
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.18,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-heading font-black tracking-tight text-white uppercase text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-[5.5rem] leading-[0.93] text-left"
              >
                <span className="block text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-50 to-white">
                  BUILD FOR A
                </span>
                <span className="block text-transparent bg-clip-text bg-linear-to-r from-cyan-300 via-cyan-400 to-blue-500 drop-shadow-[0_0_35px_rgba(6,182,212,0.45)]">
                  BETTER WORLD
                </span>
              </motion.h1>

              {/* Subtitle Narrative */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-5 max-w-xl text-left text-sm sm:text-base md:text-lg text-slate-300/90 font-sans leading-relaxed"
              >
                Where 500+ elite builders, designers, and innovators converge under one roof to architect solutions for the United Nations 17 Sustainable Development Goals.
              </motion.p>

              {/* Action Controls */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.32,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-7 flex flex-wrap items-center gap-3.5 z-20"
              >
                <a
                  href="#about"
                  onClick={handleScrollToAbout}
                  className="group relative inline-flex items-center gap-2.5 px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.65)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
                >
                  <span>EXPLORE HACKATHON</span>
                  <IconArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="https://unstop.com/o/odOaLzm?lb=qM7xnnx6&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Sakshbud9598"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-cyan-500/40 text-white font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-[1.02] backdrop-blur-md"
                >
                  <span>Register on Unstop</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </a>
              </motion.div>

              {/* Quick Event Metadata Strip */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.38,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm font-mono text-slate-300"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
                  <span>October 22–23, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
                  <span>BVCOE New Delhi</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
                  <span>24-Hour Sprint</span>
                </div>
              </motion.div>

              {/* Subtle Scroll Cue */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.48, duration: 0.6 }}
                className="mt-6 inline-flex items-center gap-2 text-cyan-400/60 hover:text-cyan-300 transition-colors cursor-pointer"
                onClick={() => {
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="text-[11px] font-mono tracking-widest uppercase">SCROLL TO EXPLORE</span>
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
            </div>

            {/* RIGHT COLUMN: The Bar Light Fixture with HackBVP Logo Illuminated */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2 relative w-full">
              {/* The Glowing Bar Light Fixture directly above the Logo */}
              <LampBarLight />

              {/* Cinematic Drop-Down Logo Container under the Bar Light */}
              <motion.div
                initial={{ opacity: 0, y: -28, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
                className="relative z-20 flex flex-col items-center justify-center -mt-2 sm:-mt-4"
              >
                {/* Reactive Cyan Backlight Halo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{
                    opacity: [0, 0.8, 0.45],
                    scale: [0.7, 1.25, 1.1],
                  }}
                  transition={{
                    duration: 1.0,
                    times: [0, 0.45, 1],
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 rounded-full bg-linear-to-b from-cyan-400/35 via-cyan-500/18 to-transparent blur-3xl pointer-events-none"
                />

                {/* Floating motion container */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.65,
                  }}
                  className="relative flex items-center justify-center"
                >
                  <div className="relative w-64 sm:w-80 md:w-92 lg:w-[380px] xl:w-[440px] h-64 sm:h-80 md:h-92 lg:h-[380px] xl:h-[440px] flex items-center justify-center drop-shadow-[0_12px_45px_rgba(6,182,212,0.65)]">
                    <Image
                      src="/hack8kalogo.png"
                      alt="HackBVP 8.0 Logo"
                      fill
                      priority
                      sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, (max-width: 1024px) 368px, (max-width: 1280px) 380px, 440px"
                      className="object-contain select-none pointer-events-none"
                    />
                  </div>
                </motion.div>

                {/* Pedestal floor glow */}
                <div className="w-56 sm:w-72 lg:w-80 h-6 bg-cyan-400/20 blur-xl rounded-full pointer-events-none -mt-4" />
              </motion.div>
            </div>

          </div>
        </div>
      </LampContainer>
    </section>
  );
};
