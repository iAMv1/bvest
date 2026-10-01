"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SDGItem, SDGS_DATA } from "@/data/sdgs";
import { EVENT_CONFIG } from "@/data/event";
import {
  IconX,
  IconSparkles,
  IconArrowRight,
  IconCpu,
  IconGlobe,
  IconExternalLink,
} from "@/components/hackathon/Icons";

interface SDGDetailDrawerProps {
  sdg: SDGItem | null;
  onClose: () => void;
  onSelectRelated?: (relatedSdg: SDGItem) => void;
}

export const SDGDetailDrawer: React.FC<SDGDetailDrawerProps> = ({
  sdg,
  onClose,
  onSelectRelated,
}) => {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (sdg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sdg]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!sdg) return null;

  const relatedList = SDGS_DATA.filter((s) => sdg.relatedSdgs.includes(s.id));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-end">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: "100%", opacity: 0.5 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 280 }}
          className="relative z-10 w-full max-w-2xl h-full bg-[#0B0F19] border-l border-white/15 shadow-2xl flex flex-col overflow-y-auto"
        >
          {/* Header banner with SDG Accent Color */}
          <div
            className="relative p-6 sm:p-8 flex flex-col justify-end min-h-55 overflow-hidden"
            style={{ backgroundColor: `${sdg.color}20` }}
          >
            {/* Top decorative gradient bar */}
            <div
              className="absolute top-0 inset-x-0 h-2"
              style={{ backgroundColor: sdg.color }}
            />

            {/* Background huge numeral watermark */}
            <span
              className="pointer-events-none select-none absolute -right-4 -bottom-6 font-heading text-9xl font-black opacity-20"
              style={{ color: sdg.color }}
            >
              {sdg.number}
            </span>

            {/* Top Close Button */}
            <button
              onClick={onClose}
              data-cursor="button"
              className="absolute top-5 right-5 p-2 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white transition-all active:scale-90"
              aria-label="Close SDG details"
            >
              <IconX size={20} />
            </button>

            {/* Header Content */}
            <div className="relative z-10 flex items-center gap-4 mb-3">
              <div
                className="w-16 h-16 rounded-2xl p-1.5 shadow-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: sdg.color }}
              >
                <Image
                  src={sdg.icon}
                  alt={sdg.title}
                  width={52}
                  height={52}
                  className="object-contain"
                />
              </div>

              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/70 block">
                  GOAL {sdg.number} &middot; {sdg.category}
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-black text-white leading-tight">
                  {sdg.title}
                </h2>
              </div>
            </div>

            <p className="relative z-10 text-xs sm:text-sm font-mono text-white/90">
              &ldquo;{sdg.tagline}&rdquo;
            </p>
          </div>

          {/* Drawer Body Details */}
          <div className="p-6 sm:p-8 flex-1 flex flex-col gap-8">
            {/* Why It Matters */}
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
                <IconGlobe size={16} />
                <span>WHY THIS MATTERS</span>
              </div>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                {sdg.whyItMatters}
              </p>
            </div>

            {/* Hackathon Challenge Examples */}
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                <IconSparkles size={16} />
                <span>HACKATHON CHALLENGE EXAMPLES</span>
              </div>
              <ul className="space-y-2.5">
                {sdg.challengeExamples.map((ch, idx) => (
                  <li
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/3 border border-white/10 text-xs sm:text-sm text-gray-200 flex items-start gap-2.5"
                  >
                    <span
                      className="font-mono font-bold text-xs mt-0.5 shrink-0"
                      style={{ color: sdg.color }}
                    >
                      0{idx + 1}.
                    </span>
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What Builders Can Create */}
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
                <IconCpu size={16} />
                <span>WHAT BUILDERS CAN CREATE</span>
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {sdg.whatBuildersCanCreate.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/2 border border-white/5 text-xs text-stone-300"
                  >
                    <span className="font-semibold text-white mr-1.5">&#10003;</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Tech Primitives */}
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2.5">
                RECOMMENDED TECH STACK &amp; PRIMITIVES
              </span>
              <div className="flex flex-wrap gap-2">
                {sdg.technologyExamples.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
                {sdg.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-gray-300"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Interconnected SDGs */}
            {relatedList.length > 0 && (
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2.5">
                  INTERCONNECTED GOALS
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {relatedList.map((rel) => (
                    <button
                      key={rel.id}
                      onClick={() => onSelectRelated?.(rel)}
                      data-cursor="button"
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 text-left transition-all"
                    >
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[10px] font-mono font-bold shrink-0"
                        style={{ backgroundColor: rel.color }}
                      >
                        {rel.number}
                      </div>
                      <span className="text-xs font-medium text-gray-200 truncate">
                        {rel.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer CTA */}
          <div className="p-6 border-t border-white/10 bg-[#07090E] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sdg.color }} />
              <span className="font-mono text-xs text-gray-300">
                Ready to hack on Goal {sdg.number}?
              </span>
            </div>

            <a
              href={EVENT_CONFIG.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-wider text-black transition-all hover:brightness-110 active:scale-95 shadow-lg"
              style={{ backgroundColor: sdg.color }}
            >
              <span>BUILD THIS AT HACKBVP</span>
              <IconExternalLink size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
