"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export const HackathonLogoAnimation: React.FC = () => {
  const [animKey, setAnimKey] = useState(0);
  const [phase, setPhase] = useState<"winding" | "complete">("winding");

  const restartAnimation = () => {
    setPhase("winding");
    setAnimKey((prev) => prev + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("complete");
    }, 4200);
    return () => clearTimeout(timer);
  }, [animKey]);

  return (
    <div className="relative w-full max-w-[460px] mx-auto select-none">
      {/* Ambient background glow & holographic rings */}
      <div className="absolute -inset-6 bg-gradient-to-tr from-cyan-500/25 via-blue-600/20 to-indigo-500/25 rounded-3xl blur-2xl opacity-70 dark:opacity-60 pointer-events-none" />
      
      {/* Tech Glassmorphic Pedestal Frame */}
      <div className="relative rounded-3xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur-xl p-6 sm:p-8 shadow-2xl overflow-hidden group">
        {/* Subtle Cyber Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d2ff08_1px,transparent_1px),linear-gradient(to_bottom,#00d2ff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        {/* Top HUD Bar */}
        <div className="relative z-20 flex items-center justify-between pb-4 mb-4 border-b border-black/5 dark:border-white/10 font-mono text-[11px] text-stone-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="font-semibold tracking-wider uppercase text-cyan-600 dark:text-cyan-400">
              CIRCUIT 8.0 // {phase === "winding" ? "ASSEMBLING" : "ENERGIZED"}
            </span>
          </div>
          <button
            onClick={restartAnimation}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-[10px] font-semibold text-stone-700 dark:text-gray-200 transition-all active:scale-95"
            title="Replay circuit winding animation"
          >
            <svg
              className={`w-3 h-3 ${phase === "winding" ? "animate-spin" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Replay</span>
          </button>
        </div>

        {/* Core Animation Canvas (545 x 704 aspect ratio) */}
        <div
          key={animKey}
          className="relative w-full aspect-[545/704] flex items-center justify-center overflow-hidden"
        >
          {/* Base high-res logo with staggered section reveals matching the winding paths */}
          <div className="relative w-full h-full">
            {/* Step 1: Left Pillar Reveal */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{ clipPath: "polygon(0 0, 48% 0, 48% 75%, 0 75%)" }}
              initial={{ opacity: 0, clipPath: "polygon(0 0, 48% 0, 48% 0%, 0 0%)" }}
              animate={{
                opacity: 1,
                clipPath: "polygon(0 0, 48% 0, 48% 75%, 0 75%)",
              }}
              transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/hack8kalogo.png"
                alt="HackBVP 8.0 Circuit Left"
                fill
                priority
                className="object-contain filter drop-shadow-[0_0_20px_rgba(0,180,255,0.4)]"
              />
            </motion.div>

            {/* Step 2: Center Crossbar Reveal */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{ clipPath: "polygon(30% 25%, 72% 25%, 72% 65%, 30% 65%)" }}
              initial={{ opacity: 0, clipPath: "polygon(30% 25%, 30% 25%, 30% 65%, 30% 65%)" }}
              animate={{
                opacity: 1,
                clipPath: "polygon(30% 25%, 72% 25%, 72% 65%, 30% 65%)",
              }}
              transition={{ duration: 1.4, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/hack8kalogo.png"
                alt="HackBVP 8.0 Circuit Center"
                fill
                priority
                className="object-contain filter drop-shadow-[0_0_20px_rgba(0,180,255,0.4)]"
              />
            </motion.div>

            {/* Step 3: Right Pillar Reveal */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{ clipPath: "polygon(55% 0, 100% 0, 100% 100%, 55% 100%)" }}
              initial={{ opacity: 0, clipPath: "polygon(55% 0, 100% 0, 100% 0%, 55% 0%)" }}
              animate={{
                opacity: 1,
                clipPath: "polygon(55% 0, 100% 0, 100% 100%, 55% 100%)",
              }}
              transition={{ duration: 1.5, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/hack8kalogo.png"
                alt="HackBVP 8.0 Circuit Right"
                fill
                priority
                className="object-contain filter drop-shadow-[0_0_20px_rgba(0,180,255,0.4)]"
              />
            </motion.div>

            {/* Step 4: Bottom BVP Lettering Reveal with electric flash */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{ clipPath: "polygon(0 70%, 75% 70%, 75% 100%, 0 100%)" }}
              initial={{ opacity: 0, y: 16, filter: "brightness(2)" }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "brightness(1)",
              }}
              transition={{ duration: 0.9, delay: 2.8, ease: "easeOut" }}
            >
              <Image
                src="/hack8kalogo.png"
                alt="HackBVP 8.0 BVP Base"
                fill
                priority
                className="object-contain filter drop-shadow-[0_0_25px_rgba(0,210,255,0.6)]"
              />
            </motion.div>

            {/* Final full steady glow backdrop once assembled */}
            <motion.div
              className="absolute inset-0 w-full h-full pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "complete" ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/hack8kalogo.png"
                alt="HackBVP 8.0 Full"
                fill
                priority
                className="object-contain"
              />
            </motion.div>
          </div>

          {/* Glowing Animated SVG Circuit Traces Overlay (Winding electricity across the logo) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 545 704"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="neon-glow-strong" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur1" />
                <feGaussianBlur stdDeviation="8" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="trace-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#00E5FF" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>

            {/* === LEFT PILLAR WINDING TRACES === */}
            {/* Outer Left Track: top down, turns 45 deg down-left to pad */}
            <motion.path
              d="M 98 42 L 98 440 L 52 492"
              stroke="url(#trace-cyan-grad)"
              strokeWidth="5"
              strokeLinecap="round"
              filter="url(#neon-glow-strong)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 1, 0.7] }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
            />
            {/* Outer Left Start & End Solder Nodes */}
            <motion.circle
              cx="98"
              cy="42"
              r="7"
              fill="#00E5FF"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.4, 1] }}
              transition={{ duration: 0.4, delay: 0.2 }}
            />
            <motion.circle
              cx="52"
              cy="492"
              r="7"
              fill="#00E5FF"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              transition={{ duration: 0.4, delay: 1.7 }}
            />

            {/* Middle Left Track: straight down */}
            <motion.path
              d="M 138 20 L 138 525"
              stroke="url(#trace-cyan-grad)"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#neon-glow-strong)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 1, 0.7] }}
              transition={{ duration: 1.6, delay: 0.4, ease: "easeInOut" }}
            />
            <motion.circle
              cx="138"
              cy="20"
              r="8"
              fill="#00E5FF"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              transition={{ duration: 0.4, delay: 0.4 }}
            />
            <motion.circle
              cx="138"
              cy="525"
              r="8"
              fill="#00E5FF"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              transition={{ duration: 0.4, delay: 2.0 }}
            />

            {/* Inner Left Track: down then 90 deg right into the bridge */}
            <motion.path
              d="M 172 45 L 172 232 L 222 232"
              stroke="url(#trace-cyan-grad)"
              strokeWidth="5"
              strokeLinecap="round"
              filter="url(#neon-glow-strong)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 1, 0.7] }}
              transition={{ duration: 1.4, delay: 0.8, ease: "easeInOut" }}
            />
            <motion.circle
              cx="172"
              cy="45"
              r="7"
              fill="#00E5FF"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.4, 1] }}
              transition={{ duration: 0.4, delay: 0.8 }}
            />
            <motion.circle
              cx="222"
              cy="232"
              r="7"
              fill="#00E5FF"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.6, 1] }}
              transition={{ duration: 0.4, delay: 2.2 }}
            />

            {/* === CENTER CROSSBAR & WINDING CONNECTIONS === */}
            {/* Lower winding bridge: from center pad, right, then down to right leg */}
            <motion.path
              d="M 222 390 L 388 390 L 388 650"
              stroke="url(#trace-cyan-grad)"
              strokeWidth="5"
              strokeLinecap="round"
              filter="url(#neon-glow-strong)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 1, 0.7] }}
              transition={{ duration: 1.6, delay: 1.3, ease: "easeInOut" }}
            />
            <motion.circle
              cx="222"
              cy="390"
              r="7"
              fill="#00E5FF"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.4, 1] }}
              transition={{ duration: 0.4, delay: 1.3 }}
            />
            <motion.circle
              cx="388"
              cy="650"
              r="7"
              fill="#00E5FF"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.6, 1] }}
              transition={{ duration: 0.4, delay: 2.9 }}
            />

            {/* === RIGHT PILLAR WINDING TRACES === */}
            {/* Upper Right Inner Node & Spur */}
            <motion.path
              d="M 370 195 L 370 260"
              stroke="url(#trace-cyan-grad)"
              strokeWidth="5"
              strokeLinecap="round"
              filter="url(#neon-glow-strong)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 1, 0.7] }}
              transition={{ duration: 0.8, delay: 1.7, ease: "easeInOut" }}
            />
            <motion.circle
              cx="370"
              cy="195"
              r="7"
              fill="#00E5FF"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.4, 1] }}
              transition={{ duration: 0.4, delay: 1.7 }}
            />

            {/* Middle Right Vertical Conductor */}
            <motion.path
              d="M 432 165 L 432 675"
              stroke="url(#trace-cyan-grad)"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#neon-glow-strong)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 1, 0.7] }}
              transition={{ duration: 1.6, delay: 1.9, ease: "easeInOut" }}
            />
            <motion.circle
              cx="432"
              cy="165"
              r="8"
              fill="#00E5FF"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              transition={{ duration: 0.4, delay: 1.9 }}
            />
            <motion.circle
              cx="432"
              cy="675"
              r="8"
              fill="#00E5FF"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              transition={{ duration: 0.4, delay: 3.5 }}
            />

            {/* Outer Right Track: 45 deg entrance from top right down to vertical */}
            <motion.path
              d="M 520 195 L 468 240 L 468 645"
              stroke="url(#trace-cyan-grad)"
              strokeWidth="5"
              strokeLinecap="round"
              filter="url(#neon-glow-strong)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 1, 0.7] }}
              transition={{ duration: 1.6, delay: 2.2, ease: "easeInOut" }}
            />
            <motion.circle
              cx="520"
              cy="195"
              r="7"
              fill="#00E5FF"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.4, 1] }}
              transition={{ duration: 0.4, delay: 2.2 }}
            />
            <motion.circle
              cx="468"
              cy="645"
              r="7"
              fill="#00E5FF"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              transition={{ duration: 0.4, delay: 3.8 }}
            />

            {/* Circuit surge down into BVP */}
            <motion.path
              d="M 138 525 L 138 555 L 70 555"
              stroke="#00E5FF"
              strokeWidth="3"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 0.8, 0] }}
              transition={{ duration: 0.8, delay: 2.7, ease: "easeOut" }}
            />
          </svg>

          {/* Traveling Photon Pulses on Completed Idle Circuit */}
          {phase === "complete" && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute top-[35%] left-[25%] w-32 h-32 rounded-full bg-cyan-400/10 blur-xl animate-pulse" />
            </motion.div>
          )}
        </div>

        {/* Bottom Status / Spec Bar */}
        <div className="relative z-20 mt-4 pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-stone-600 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-stone-900 dark:text-white">EDITION:</span>
            <span>8.0 FLAGSHIP</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">ONLINE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

