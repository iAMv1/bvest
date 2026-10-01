"use client";

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { IconSparkles, IconX } from "@/components/hackathon/Icons";

export const EasterEggBanner: React.FC = () => {
  const [active, setActive] = useState(false);
  const [typedBuffer, setTypedBuffer] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      const next = (typedBuffer + e.key).slice(-4);
      setTypedBuffer(next);

      if (next.endsWith("17")) {
        triggerEasterEgg();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [typedBuffer]);

  const triggerEasterEgg = () => {
    setActive(true);

    // Fire colorful SDG confetti bursts
    const colors = [
      "#E5243B",
      "#DDA63A",
      "#4C9F38",
      "#C5192D",
      "#FF3A21",
      "#26BDE2",
      "#FCC30B",
      "#A21942",
      "#FD6925",
      "#DD1367",
      "#FD9D24",
      "#BF8B2E",
      "#3F7E44",
      "#0A97D9",
      "#56C02B",
      "#00689D",
      "#19486A",
    ];

    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors,
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        colors,
      });
    }, 250);
  };

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-9999 max-w-sm p-4 rounded-2xl bg-[#0F1424] border border-cyan-400/40 text-white shadow-2xl backdrop-blur-xl flex items-start justify-between gap-3"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-cyan-400 to-rose-400 flex items-center justify-center shrink-0 shadow-md">
              <IconSparkles size={16} className="text-black" />
            </div>
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-0.5">
                SDG PROTOCOL DISCOVERED
              </span>
              <p className="font-heading text-xs font-bold leading-snug">
                &ldquo;17 goals. One future. And you can help build it.&rdquo;
              </p>
              <span className="text-[10px] font-mono text-gray-400 mt-1 block">
                HackBVP 8.0 &middot; October 22&ndash;23, 2026
              </span>
            </div>
          </div>

          <button
            onClick={() => setActive(false)}
            className="text-gray-400 hover:text-white p-1 rounded-lg"
          >
            <IconX size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
