"use client";

import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";

interface LegacyEdition {
  version: string;
  edition: string;
  year: string;
  tagline: string;
  badgeHex: string;
  imageSrc?: string;
  description: string;
}

const LEGACY_EDITIONS: LegacyEdition[] = [
  {
    version: "BVEST X",
    edition: "10th Edition",
    year: "2023",
    tagline: "A Decade of Technical Excellence",
    badgeHex: "#26BDE2",
    description: "Milestone 10th anniversary celebrating student innovation and inter-college tech rivalries.",
  },
  {
    version: "BVEST XI",
    edition: "11th Edition",
    year: "2024",
    tagline: "Empowering Future Engineers",
    badgeHex: "#8B5CF6",
    description: "Expanded to 25+ student societies featuring flagship hackathons and robotics races.",
  },
  {
    version: "BVEST XII",
    edition: "12th Edition",
    year: "2025",
    tagline: "Engineering Beyond Boundaries",
    badgeHex: "#FD6925",
    description: "Pioneered sustainable technology challenges and inter-departmental collaboration.",
  },
  {
    version: "BVEST XIII",
    edition: "13th Edition (Current)",
    year: "2026",
    tagline: "17 UN Sustainable Development Goals",
    badgeHex: "#4C9F38",
    imageSrc: "/logo.png",
    description: "The official 2026 edition aligning all 30+ BVCOE societies with the UN Sustainable Development Goals.",
  },
];

export const BvestLegacySection: React.FC = () => {
  return (
    <section id="legacy" className="relative py-20 md:py-28 overflow-hidden bg-stone-900/5 dark:bg-transparent">
      {/* Background Orbs & Grid */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-40 dark:opacity-30" />
        <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-sdg6/10 rounded-full blur-[160px] animate-drift" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/10 text-stone-700 dark:text-stone-300 font-mono text-xs font-bold uppercase tracking-widest mb-4 border border-black/10 dark:border-white/10">
            Heritage &amp; History
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-stone-950 dark:text-white tracking-tight mb-4">
            BVEST <span className="bg-gradient-to-r from-sdg6 to-sdg10 bg-clip-text text-transparent">Legacy</span>
          </h2>
          <p className="text-stone-700 dark:text-gray-400 text-base md:text-lg leading-relaxed">
            Exploring past poster editions and logos of BVCOE Delhi&apos;s flagship technical fest through the years.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LEGACY_EDITIONS.map((item, index) => (
            <Reveal key={item.version} delay={index * 0.1}>
              <div className="hard-shell group h-full transition-transform duration-300 hover:-translate-y-1.5">
                <div className="hard-core bg-white dark:bg-[#111215] p-6 rounded-[calc(1.75rem-1.5px)] h-full flex flex-col justify-between border border-black/10 dark:border-white/10 shadow-lg">
                  <div>
                    {/* Header Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span
                        className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border"
                        style={{
                          backgroundColor: `${item.badgeHex}15`,
                          borderColor: `${item.badgeHex}40`,
                          color: item.badgeHex,
                        }}
                      >
                        {item.edition}
                      </span>
                      <span className="text-xs font-mono font-semibold text-stone-500 dark:text-gray-400">
                        {item.year}
                      </span>
                    </div>

                    {/* Logo / Poster Visual Placeholder Frame */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 dark:bg-black/50 border border-black/5 dark:border-white/10 flex items-center justify-center p-6 mb-5 group-hover:border-sdg6/50 transition-colors">
                      {item.imageSrc ? (
                        <Image
                          src={item.imageSrc}
                          alt={`${item.version} Logo`}
                          fill
                          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="text-center flex flex-col items-center justify-center gap-2">
                          <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center font-heading font-black text-lg text-white shadow-md"
                            style={{ backgroundColor: item.badgeHex }}
                          >
                            {item.version.replace("BVEST ", "")}
                          </div>
                          <span className="font-heading font-black text-xl text-stone-900 dark:text-white tracking-wider">
                            {item.version}
                          </span>
                          <span className="text-[10px] font-mono uppercase text-stone-500 dark:text-gray-400">
                            Poster &amp; Logo Archive
                          </span>
                        </div>
                      )}
                    </div>

                    <h3 className="font-heading text-xl font-bold text-stone-950 dark:text-white mb-2">
                      {item.version}
                    </h3>
                    <p className="text-xs font-medium text-sdg6 mb-3 font-mono">
                      &ldquo;{item.tagline}&rdquo;
                    </p>
                    <p className="text-xs text-stone-600 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
