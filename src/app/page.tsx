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

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-background pt-24 md:pt-28 pb-0 transition-colors duration-200">
        <SDGBoxCollage />
        <BackdropAurora
          className="absolute inset-0 z-[1]"
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
      <section className="relative py-20 md:py-24 overflow-hidden bg-sdg6/[0.05] dark:bg-transparent">
        {/* Backdrop: cursor-following aura + dot grid + signal rings */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="bg-dots absolute inset-0 md:opacity-60" />
          <div className="bg-rings absolute inset-0 opacity-60" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-sdg6/12 rounded-full blur-[160px] animate-drift" />
          <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-[20rem] h-[20rem] bg-sdg3/10 rounded-full blur-[140px] animate-drift-slow" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
        <Reveal className="relative">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-8 text-gray-900 dark:text-white tracking-tight">
            Innovating for a{" "}
            <span className="bg-gradient-to-r from-sdg6 to-sdg3 bg-clip-text text-transparent">
              Sustainable Future
            </span>
          </h2>
          <p className="text-lg md:text-xl text-stone-950 dark:text-gray-400 mb-8 leading-relaxed">
            BVEST is our premier college technical fest where innovation meets impact. We&apos;ve structured this year&apos;s entire fest around the 17 UN Sustainable Development Goals (SDGs), challenging our students to build solutions for the world&apos;s most pressing problems.
          </p>
          <p className="text-lg md:text-xl text-stone-950 dark:text-gray-400 leading-relaxed">
            Each participating society and club is assigned one specific SDG. They host technical events, hackathons, and showcases entirely dedicated to their assigned goal&apos;s domain.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="relative mt-16 md:mt-20">
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
            <StatCounter value={17} label="SDG Domains" />
            <span className="w-px h-12 bg-black/10 dark:bg-white/10 hidden md:block" aria-hidden="true" />
            <StatCounter value={30} label="Societies" />
            <span className="w-px h-12 bg-black/10 dark:bg-white/10 hidden md:block" aria-hidden="true" />
            <StatCounter value={3} label="Days of Fest" />
          </div>
        </Reveal>
        </div>
      </section>

      {/* 3. Featured Events Section — SDG rose-washed canvas in light */}
      <section id="featured-events" className="relative py-24 md:py-28 w-full overflow-hidden scroll-mt-24 bg-sdg10/[0.05] dark:bg-transparent">
        {/* Backdrop: cursor-following aura + grid texture */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="bg-grid absolute inset-0 md:opacity-60" />
          <div className="bg-dots absolute inset-0 md:opacity-40" />
          <div className="absolute top-1/4 -right-40 w-[34rem] h-[34rem] bg-sdg6/12 rounded-full blur-[170px] animate-drift" />
          <div className="absolute bottom-1/4 -right-24 w-[22rem] h-[22rem] bg-sdg10/10 rounded-full blur-[140px] animate-drift-slow" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <Reveal className="relative flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="outline-text pointer-events-none select-none absolute -top-8 md:-top-12 left-0 font-heading text-[4.5rem] md:text-[8rem] font-black uppercase tracking-tight whitespace-nowrap [mask-image:linear-gradient(to_bottom,black_45%,transparent_85%)]" aria-hidden="true">
                Events
              </span>
              <h2 className="relative font-heading text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight">
                Fest{" "}
                <span className="bg-gradient-to-r from-sdg10 to-sdg6 bg-clip-text text-transparent">
                  Events
                </span>
              </h2>
              <p className="relative text-stone-950 dark:text-gray-400 text-lg max-w-xl">
                Official competitions, hackathons, and society challenges for BVEST XIII will be announced soon.
              </p>
            </div>
          </Reveal>

          {/* Coming Soon Featured Banner */}
          <Reveal>
            <div className="hard-shell relative rounded-3xl overflow-hidden bg-gradient-to-br from-black/5 via-black/[0.02] to-sdg6/10 dark:from-white/10 dark:via-white/[0.02] dark:to-sdg6/10 p-8 md:p-14 border border-black/10 dark:border-white/10 text-center flex flex-col items-center justify-center min-h-[280px]">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sdg6/15 text-sdg6 font-mono text-xs font-bold uppercase tracking-widest mb-4 border border-sdg6/30">
                <span className="w-2 h-2 rounded-full bg-sdg6 animate-ping" />
                Coming Soon
              </div>
              <h3 className="font-heading text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
                Full Event Lineup To Be Revealed
              </h3>
              <p className="text-stone-700 dark:text-gray-300 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
                30+ Technical, Cultural, and SDG-themed competitions across all 17 UN Sustainable Development Goals are currently being finalized by society leads.
              </p>
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-stone-900 text-white dark:bg-white dark:text-stone-950 font-semibold text-sm shadow-lg">
                <svg className="w-4 h-4 text-sdg6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                Mark Your Calendar &middot; Oct 22–23, 2026
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Legacy Archive (10th, 11th, 12th & 13th Editions) */}
      <BvestLegacySection />

      {/* 5. Core Team Section */}
      <CoreTeamSection />

      {/* 5. Sponsors/Partners Strip */}
      <section className="relative py-16 md:py-20 px-6 bg-sdg11/[0.09] dark:bg-white/[0.02] border-y border-black/10 dark:border-white/5 transition-colors duration-200 overflow-hidden">
        {/* Backdrop: low center glow */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="bg-dots absolute inset-0 md:opacity-50" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[20rem] bg-sdg11/8 rounded-full blur-[150px]" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <Reveal>
            <h2 className="text-sm font-bold tracking-widest uppercase text-stone-950 dark:text-gray-400 mb-12">
              Supported by our amazing partners
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-40 grayscale">
              <div className="text-2xl font-heading font-bold text-stone-950 dark:text-gray-400">[Sponsor Logo 1]</div>
              <div className="text-2xl font-heading font-bold text-stone-950 dark:text-gray-400">[Sponsor Logo 2]</div>
              <div className="text-2xl font-heading font-bold text-stone-950 dark:text-gray-400">[Sponsor Logo 3]</div>
              <div className="text-2xl font-heading font-bold text-stone-950 dark:text-gray-400">[Sponsor Logo 4]</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}