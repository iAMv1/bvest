"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EVENT_CONFIG } from "@/data/event";
import { IconClock } from "@/components/hackathon/Icons";

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
    { label: "DAYS", value: String(timeLeft.days).padStart(2, "0"), accent: "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]" },
    { label: "HOURS", value: String(timeLeft.hours).padStart(2, "0"), accent: "bg-linear-to-r from-cyan-400 to-sky-500 shadow-[0_0_12px_rgba(14,165,233,0.7)]" },
    { label: "MINUTES", value: String(timeLeft.minutes).padStart(2, "0"), accent: "bg-sky-500 shadow-[0_0_12px_rgba(14,165,233,0.7)]" },
    { label: "SECONDS", value: String(timeLeft.seconds).padStart(2, "0"), accent: "bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.7)]" },
  ];

  return (
    <section id="countdown" className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[#07090E] border-y border-white/10 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
        {timeLeft.isLive ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-4 py-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 font-mono text-xs font-bold uppercase tracking-widest">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span>REGISTRATIONS CLOSED</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-7xl font-black text-white uppercase tracking-tight">
              REGISTRATIONS ARE CLOSED.
            </h2>
            <p className="text-gray-300 font-mono text-sm max-w-xl">
              Applications for HackBVP 8.0 have officially closed. Shortlisted teams will receive confirmation via email and Discord.
            </p>
          </motion.div>
        ) : (
          <div className="w-full flex flex-col items-center">
            {/* Badge Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/35 text-cyan-300 font-mono text-xs uppercase tracking-wider mb-5 shadow-[0_0_18px_rgba(6,182,212,0.22)] backdrop-blur-md">
              <IconClock size={14} className="text-cyan-400" />
              <span>REGISTRATION DEADLINE</span>
            </div>

            {/* Section Title with glowing cyan period */}
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-5xl font-black text-white uppercase tracking-tight mb-8">
              REGISTRATIONS CLOSING IN
              <span className="text-cyan-400 drop-shadow-[0_0_14px_rgba(6,182,212,0.95)]">.</span>
            </h2>

            {/* Countdown Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-3xl">
              {timeBlocks.map((block) => (
                <div
                  key={block.label}
                  className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0b101c]/90 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-cyan-500/30"
                >
                  {/* Top colored accent line */}
                  <div className={`absolute top-0 inset-x-5 h-1 rounded-full ${block.accent}`} />

                  <span
                    className="font-heading text-5xl sm:text-7xl font-black text-white tabular-nums tracking-tight"
                    suppressHydrationWarning
                  >
                    {block.value}
                  </span>

                  <span className="font-mono text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-2">
                    {block.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer Deadline Detail */}
            <p className="font-mono text-xs sm:text-sm text-gray-400 mt-6 tracking-wide">
              Registrations close October 16, 2026 at 6:00 PM IST &middot; BVCOE Delhi Campus
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CountdownSection;
