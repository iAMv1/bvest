"use client";

import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import { SDGItem } from "@/data/sdgs";
import { CustomCursor } from "@/components/hackathon/CustomCursor";
import { IntroLoader } from "@/components/hackathon/IntroLoader";
import { HackathonNavbar } from "@/components/hackathon/HackathonNavbar";
import { SDGIntroSection } from "@/components/hackathon/SDGIntroSection";
import { SDGExplorerSection } from "@/components/hackathon/SDGExplorerSection";
import { ArcaHeroAnimation } from "@/components/hackathon/ArcaHeroAnimation";
import { SDGDetailDrawer } from "@/components/hackathon/SDGDetailDrawer";
import { SDGNetworkGraph } from "@/components/hackathon/SDGNetworkGraph";
import { ImpactMatrixSection } from "@/components/hackathon/ImpactMatrixSection";
import { CountdownSection } from "@/components/hackathon/CountdownSection";
import { EventTimelineSection } from "@/components/hackathon/EventTimelineSection";
import { PrizesSection } from "@/components/hackathon/PrizesSection";
import { JudgingCriteriaSection } from "@/components/hackathon/JudgingCriteriaSection";
import { JudgesMentorsSection } from "@/components/hackathon/JudgesMentorsSection";
import { SponsorsSection } from "@/components/hackathon/SponsorsSection";
import { FAQSection } from "@/components/hackathon/FAQSection";
import { FinalCTASection } from "@/components/hackathon/FinalCTASection";
import { HackathonFooter } from "@/components/hackathon/HackathonFooter";
import { EasterEggBanner } from "@/components/hackathon/EasterEggBanner";
import { HackBvpLampSection } from "@/components/hackathon/HackBvpLampSection";
import { HackathonBackgroundFlow } from "@/components/hackathon/HackathonBackgroundFlow";

export const HackathonApp: React.FC = () => {
  const [selectedSDG, setSelectedSDG] = useState<SDGItem | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // Only enable if user does not prefer reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  const handleOpenSDG = (sdg: SDGItem) => {
    setSelectedSDG(sdg);
  };

  const handleCloseSDG = () => {
    setSelectedSDG(null);
  };

  return (
    <div className="relative min-h-screen bg-[#07090E] text-white selection:bg-cyan-400 selection:text-black font-sans antialiased overflow-x-hidden">
      {/* Interactive Gateway Flow in background strictly for Hackathon */}
      <HackathonBackgroundFlow />

      {/* Custom interactive desktop cursor */}
      <CustomCursor />

      {/* Intro Loader Animation */}
      <IntroLoader />

      {/* Sticky Glass Command-Center Navbar */}
      <HackathonNavbar />

      {/* Main Hackathon Storytelling Flow */}
      <main id="main-content" className="relative">
        {/* 0. Aceternity Lamp Entrance: Glowing Lamp with Subtle Lighting & HackBVP Logo */}
        <HackBvpLampSection />

        {/* 1. Narrative Why HackBVP & SDG Thesis */}
        <SDGIntroSection />

        {/* 3. The 17 SDGs Main Interactive Grid Explorer */}
        <SDGExplorerSection
          onSelectSDG={handleOpenSDG}
        />

        {/* 4. Hackathon Tracks 3D Rotating Cylinder */}
        <section id="tracks" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#07090E] border-t border-white/10 overflow-hidden">
          <div className="max-w-7xl mx-auto mb-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <span>Interactive 3D Stage</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase mb-4">
              HACKATHON TRACKS
            </h2>
            <p className="font-mono text-xs sm:text-sm text-gray-400 max-w-xl">
              5 core challenge tracks mapped to the 17 UN Sustainable Development Goals. Drag to spin the 3D cylinder or click any card to inspect problem statements and tech primitives.
            </p>
          </div>
          <div className="max-w-7xl mx-auto">
            <ArcaHeroAnimation
              onExploreTracks={() => {
                const el = document.getElementById("tracks");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>
        </section>

        {/* 5. Interconnected SDG Network Graph */}
        <SDGNetworkGraph onSelectSDG={handleOpenSDG} />

        {/* 6. Impact Matrix (Tech vs SDG) */}
        <ImpactMatrixSection onSelectSDG={handleOpenSDG} />

        {/* 7. Large Real-Time Sprint Countdown */}
        <CountdownSection />

        {/* 8. Run of Show / Event Timeline */}
        <EventTimelineSection />

        {/* 9. Prizes Podium */}
        <PrizesSection />

        {/* 10. Judging Criteria & Weightings */}
        <JudgingCriteriaSection />

        {/* 15. Grand Jury & Technical Mentors */}
        <JudgesMentorsSection onSelectSDG={handleOpenSDG} />

        {/* 16. Ecosystem Sponsors & Community Alliances */}
        <SponsorsSection />

        {/* 17. Frequently Asked Questions Accordion */}
        <FAQSection />

        {/* 18. Bottom Registration CTA with Converging SDG Particles */}
        <FinalCTASection />
      </main>

      {/* Footer */}
      <HackathonFooter />

      {/* SDG Full Details Drawer Modal */}
      <SDGDetailDrawer
        sdg={selectedSDG}
        onClose={handleCloseSDG}
        onSelectRelated={(related) => setSelectedSDG(related)}
      />

      {/* Secret Easter Egg triggered by typing '17' */}
      <EasterEggBanner />
    </div>
  );
};
