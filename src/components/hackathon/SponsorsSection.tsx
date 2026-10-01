"use client";

import React from "react";
import { motion } from "framer-motion";
import { SPONSOR_TIERS } from "@/data/sponsors";
import { EVENT_CONFIG } from "@/data/event";
import { IconSparkles, IconExternalLink } from "@/components/hackathon/Icons";

export const SponsorsSection: React.FC = () => {
  return (
    <section id="sponsors" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#07090E] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <IconSparkles size={14} />
            <span>Ecosystem Support</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            POWERING THE IMPACT.
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mt-4">
            Organizations and community collectives providing the infrastructure, cloud compute, and mentorship that turn student vision into field-ready deployments.
          </p>
        </div>

        {/* Tiered Sponsor Grid */}
        <div className="space-y-12">
          {SPONSOR_TIERS.map((tier) => (
            <div key={tier.tierName} className="flex flex-col items-center">
              {/* Tier Label */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-300">
                  {tier.tierName}
                </span>
                <span className="text-gray-500 text-xs">&middot;</span>
                <span className="font-mono text-xs text-gray-400">
                  {tier.badge}
                </span>
              </div>

              {/* Sponsor Cards Grid for this tier */}
              <div className="flex flex-wrap justify-center gap-5 w-full max-w-5xl">
                {tier.sponsors.map((sp) => (
                  <div
                    key={sp.id}
                    className="p-6 sm:p-8 rounded-3xl bg-white/2 border border-white/10 hover:border-cyan-500/30 backdrop-blur-xl flex flex-col items-center justify-center text-center transition-all group min-w-60 flex-1 max-w-sm"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white/4 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-cyan-500/10 transition-all">
                      <span className="font-heading font-black text-xs text-white/50 group-hover:text-cyan-400">
                        HB 8.0
                      </span>
                    </div>

                    <span className="font-heading text-base font-black text-white mb-1">
                      {sp.name}
                    </span>

                    <span className="font-mono text-xs text-gray-400 block mb-3">
                      {sp.role}
                    </span>

                    <span className="text-[10px] font-mono text-cyan-400/80 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                      {sp.placeholderLabel}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sponsor Callout Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-linear-to-r from-cyan-950/40 via-blue-950/30 to-purple-950/40 border border-cyan-500/20 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="font-heading text-xl font-black text-white mb-1">
              Interested in Sponsoring HackBVP 8.0?
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm">
              Connect with 400+ top engineers and position your APIs at the forefront of UN SDG innovation.
            </p>
          </div>

          <a
            href={`mailto:${EVENT_CONFIG.email}?subject=HackBVP%208.0%20Sponsorship%20Inquiry`}
            data-cursor="button"
            className="shrink-0 px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-gray-200 transition-all active:scale-95 shadow-lg"
          >
            BECOME A SPONSOR &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};
