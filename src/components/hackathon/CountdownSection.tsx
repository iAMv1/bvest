"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EVENT_CONFIG } from "@/data/event";
import { IconClock, IconSparkles } from "@/components/hackathon/Icons";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
}

export const CountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(EVENT_CONFIG.countdownTarget).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isLive: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: "DAYS", value: String(timeLeft.days).padStart(2, "0") },
    { label: "HOURS", value: String(timeLeft.hours).padStart(2, "0") },
    { label: "MINUTES", value: String(timeLeft.minutes).padStart(2, "0") },
    { label: "SECONDS", value: String(timeLeft.seconds).padStart(2, "0") },
  ];

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[#090D18] border-y border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {timeLeft.isLive ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-4 py-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>HACKATHON IN PROGRESS</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-7xl font-black text-white uppercase tracking-tight">
              HACKBVP 8.0 IS LIVE.
            </h2>
            <p className="text-gray-300 font-mono text-sm max-w-xl">
              The 36-hour sprint has commenced at BVCOE Delhi. Check the live Discord channels for ongoing mentor check-ins and announcements.
            </p>
          </motion.div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-4">
              <IconClock size={14} />
              <span>COMMENCEMENT COUNTDOWN</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mb-8">
              THE 36-HOUR CLOCK IS TICKING.
            </h2>

            {/* Huge Animated Digit Boxes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-3xl">
              {timeBlocks.map((block) => (
                <div
                  key={block.label}
                  className="p-6 sm:p-8 rounded-3xl bg-white/3 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center relative overflow-hidden"
                >
                  {/* Subtle top cyan line */}
                  <div className="absolute top-0 inset-x-6 h-1 bg-linear-to-r from-cyan-400 to-blue-500 opacity-60" />

                  <span className="font-heading text-5xl sm:text-7xl font-black text-white tabular-nums tracking-tight">
                    {block.value}
                  </span>

                  <span className="font-mono text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-2">
                    {block.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="font-mono text-xs text-gray-400 mt-6">
              Hacking begins October 22, 2026 &middot; BVCOE Delhi Main Auditorium
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
