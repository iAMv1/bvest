"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface IntroLoaderProps {
  onComplete?: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<"logo" | "tagline" | "complete">("logo");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Check if user already saw the loader in this session to respect repeat visits
    const seen = sessionStorage.getItem("hackbvp8-loader-seen");
    if (seen === "true") {
      setVisible(false);
      onComplete?.();
      return;
    }

    const timer1 = setTimeout(() => {
      setPhase("tagline");
    }, 850);

    const timer2 = setTimeout(() => {
      setPhase("complete");
      setVisible(false);
      sessionStorage.setItem("hackbvp8-loader-seen", "true");
      onComplete?.();
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setVisible(false);
    sessionStorage.setItem("hackbvp8-loader-seen", "true");
    onComplete?.();
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-99999 flex flex-col items-center justify-center bg-[#07090E] text-white select-none"
        >
          {/* Subtle cosmic background grid */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(38,189,226,0.15),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none" />

          {/* Skip button in top corner */}
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-300 transition-all active:scale-95"
          >
            SKIP [ESC]
          </button>

          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <AnimatePresence mode="wait">
              {phase === "logo" && (
                <motion.div
                  key="hb-logo"
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="relative h-24 w-20 flex items-center justify-center">
                    <Image
                      src="/hack8kalogo.png"
                      alt="HackBVP 8.0 Logo"
                      width={80}
                      height={104}
                      priority
                      className="h-24 w-auto object-contain drop-shadow-[0_0_25px_rgba(56,189,248,0.8)]"
                    />
                  </div>
                  <div className="font-heading text-4xl sm:text-5xl font-black tracking-tighter bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
                    HACKBVP 8.0
                  </div>
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400/80">
                    NATIONAL FLAGSHIP SPRINT
                  </span>
                </motion.div>
              )}

              {phase === "tagline" && (
                <motion.div
                  key="hb-tagline"
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
                    17 GOALS.
                  </div>
                  <div className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-tight bg-linear-to-r from-amber-300 via-orange-400 to-rose-500 bg-clip-text text-transparent">
                    ONE FUTURE.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Micro loading progress line */}
            <div className="w-48 h-0.5 bg-white/10 rounded-full mt-10 overflow-hidden relative">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.7, ease: "easeInOut" }}
                className="w-full h-full bg-linear-to-r from-cyan-400 via-blue-500 to-rose-500"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
