"use client";

import React from "react";
import { Reveal } from "@/components/Reveal";
import { coreTeamData } from "@/lib/team-data";

export const CoreTeamSection: React.FC = () => {
  return (
    <section
      id="core-team"
      className="relative py-24 md:py-28 w-full overflow-hidden scroll-mt-24 bg-sdg6/[0.03] dark:bg-transparent border-t border-black/10 dark:border-white/5"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-grid absolute inset-0 md:opacity-40" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[30rem] h-[30rem] bg-sdg6/10 rounded-full blur-[160px] animate-drift" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[24rem] h-[24rem] bg-sdg3/10 rounded-full blur-[140px] animate-drift-slow" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <Reveal className="text-center mb-16 relative">
          <span
            className="outline-text pointer-events-none select-none absolute -top-8 md:-top-12 left-1/2 -translate-x-1/2 font-heading text-[4.5rem] md:text-[8rem] font-black uppercase tracking-tight whitespace-nowrap [mask-image:linear-gradient(to_bottom,black_45%,transparent_85%)]"
            aria-hidden="true"
          >
            Core Team
          </span>
          <h2 className="relative font-heading text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight">
            Student{" "}
            <span className="bg-gradient-to-r from-sdg6 to-sdg3 bg-clip-text text-transparent">
              Coordinators
            </span>
          </h2>
          <p className="relative text-stone-950 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            The student leadership driving operations, logistics, design, and tech across BVEST.XIII.
          </p>
        </Reveal>

        {/* 10 Student Coordinators - Unified Grid (5 cols desktop, 3 tablet, 2 mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {coreTeamData.map((member, i) => (
            <Reveal key={member.id} delay={(i % 5) * 0.05}>
              <div className="hard-shell h-full transition-all duration-300 ease-fluid hover:-translate-y-2 hover:shadow-xl group">
                <div className="hard-core relative bg-white dark:bg-[#0B0B0C] p-5 h-full flex flex-col overflow-hidden rounded-[1.5rem]">
                  {/* Photo Placeholder Frame */}
                  <div
                    className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden mb-4 flex flex-col items-center justify-center border border-black/10 dark:border-white/10 transition-transform duration-500 group-hover:scale-[1.02]"
                    style={{
                      background: `radial-gradient(circle at 50% 30%, ${member.color}25, transparent 70%), linear-gradient(135deg, rgba(0,0,0,0.03), rgba(0,0,0,0.08))`,
                    }}
                  >
                    {/* Initials Avatar Badge */}
                    <div
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-heading text-xl font-bold text-white shadow-md border border-white/20 mb-2 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: member.color }}
                    >
                      {member.initials}
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-widest text-stone-700 dark:text-gray-400 font-semibold">
                      [ Photo ]
                    </span>
                  </div>

                  {/* Role Tag */}
                  <span
                    className="w-fit text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2 border truncate max-w-full"
                    style={{
                      backgroundColor: `${member.color}15`,
                      color: member.color,
                      borderColor: `${member.color}35`,
                    }}
                  >
                    {member.role}
                  </span>

                  {/* Name */}
                  <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                    {member.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-stone-950 dark:text-gray-400 leading-relaxed mt-auto">
                    {member.bio}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
