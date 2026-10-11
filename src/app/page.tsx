import Link from 'next/link';
import Image from 'next/image';
import { SDGColorStrip } from '@/components/SDGColorStrip';
import { SDGBoxCollage } from '@/components/SDGBoxCollage';
import { Reveal } from '@/components/Reveal';
import { Hero } from '@/components/Hero';
import { BackdropAurora } from '@/components/BackdropAurora';
import { FestTicker } from '@/components/FestTicker';
import { StatCounter } from '@/components/StatCounter';
import { BvestLegacySection } from '@/components/BvestLegacySection';
import { CoreTeamSection } from '@/components/CoreTeamSection';
import { Footer } from '@/components/Footer';
import { EventLineupSection } from '@/components/EventLineupSection';

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-background pt-24 md:pt-28 pb-0 transition-colors duration-200">
        <SDGBoxCollage />
        <BackdropAurora
          className="absolute inset-0 z-1"
          parallax={55}
          home={{ x: 50, y: 32 }}
          layers={[
            { hex: "#26BDE2", radius: "34rem", opacity: 0.16, ox: 0, oy: 0 },
            { hex: "#FCC30B", radius: "30rem", opacity: 0.11, ox: -34, oy: 14 },
          ]}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pointer-events-none">
          <Hero />
        </div>

        <SDGColorStrip />
      </section>

      {/* Fest ticker */}
      <FestTicker
        items={[
          "17 SDG-Driven Domains",
          "30+ Technical & Cultural Societies",
          "Hackathons · Showcases · Races",
          "BVCOE Delhi",
        ]}
      />

      {/* 2. About Section — SDG cyan-washed canvas in light */}
      <section className="relative py-20 md:py-24 overflow-hidden bg-sdg6/5 dark:bg-transparent">
        {/* Backdrop: cursor-following aura + dot grid + signal rings */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="bg-dots absolute inset-0 md:opacity-60" />
          <div className="bg-rings absolute inset-0 opacity-60" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-xl h-144 bg-sdg6/12 rounded-full blur-[160px] animate-drift" />
          <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-80 h-80 bg-sdg3/10 rounded-full blur-[140px] animate-drift-slow" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
        <Reveal className="relative">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-8 text-gray-900 dark:text-white tracking-tight">
            BVEST 13 &mdash;{" "}
            <span className="bg-linear-to-r from-sdg6 to-sdg3 bg-clip-text text-transparent">
              Engineering a Better Tomorrow
            </span>
          </h2>
          <p className="text-lg md:text-xl text-stone-950 dark:text-gray-300 mb-6 leading-relaxed">
            BVEST 13 is a major student festival by Bharati Vidyapeeth&apos;s College of Engineering focused on technology, innovation, creativity, and intellectual excellence. This edition is centered around the 17 UN Sustainable Development Goals (SDGs), with each student society/chapter assigned one SDG.
          </p>
          <p className="text-lg md:text-xl text-stone-950 dark:text-gray-300 mb-6 leading-relaxed">
            Through technical events, competitions, showcases, and hands-on challenges, students will explore their SDG and turn it into innovative ideas and experiences. The festival aims to connect student talent with real-world global challenges and encourage collaboration across disciplines.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="relative mt-16 md:mt-20">
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
            <StatCounter value={17} label="SDG Domains" />
            <span className="w-px h-12 bg-black/10 dark:bg-white/10 hidden md:block" aria-hidden="true" />
            <StatCounter value={30} label="Societies" />
            <span className="w-px h-12 bg-black/10 dark:bg-white/10 hidden md:block" aria-hidden="true" />
            <StatCounter value={2} label="Days of Fest" />
          </div>
        </Reveal>
        </div>
      </section>

      {/* 3. Featured Events Section — clean light background without pink tint */}
      <section id="featured-events" className="relative py-24 md:py-28 w-full overflow-hidden scroll-mt-24 bg-sdg6/4 dark:bg-transparent transition-colors duration-200">
        {/* Backdrop: cursor-following aura + grid texture */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="bg-grid absolute inset-0 md:opacity-60" />
          <div className="bg-dots absolute inset-0 md:opacity-40" />
          <div className="absolute top-1/4 -right-40 w-136 h-136 bg-sdg6/12 rounded-full blur-[170px] animate-drift" />
          <div className="absolute bottom-1/4 -right-24 w-88 h-88 bg-sdg3/10 rounded-full blur-[140px] animate-drift-slow" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <Reveal>
            <EventLineupSection showHeroBanner={true} />
          </Reveal>
        </div>
      </section>

      {/* 4. Legacy Archive (10th, 11th, 12th & 13th Editions) */}
      <BvestLegacySection />

      {/* 5. Core Team Section */}
      <CoreTeamSection />


      {/* 6. Footer */}
      <Footer />
    </div>
  );
}