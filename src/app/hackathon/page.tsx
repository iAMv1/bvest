import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { HackathonLogoAnimation } from "@/components/HackathonLogoAnimation";

export const metadata: Metadata = {
  title: "HACK@BVP 8.0 | BVEST XIII",
  description:
    "Official Flagship Hackathon of BVEST XIII at BVCOE Delhi. 36 hours of intense building, UN SDG tracks, cash prizes, and tech innovation.",
};

const HACKATHON_TRACKS = [
  {
    title: "AI & Intelligent Systems",
    desc: "Autonomous agents, computer vision, and LLM-driven tools for high-impact automation.",
    icon: "⚡",
    sdg: "SDG 9: Industry & Innovation",
  },
  {
    title: "CleanTech & Sustainability",
    desc: "Smart grids, carbon accounting, waste management, and renewable energy monitoring.",
    icon: "🌱",
    sdg: "SDG 7 & 13: Clean Energy & Climate",
  },
  {
    title: "HealthTech & BioInformatics",
    desc: "Accessible telemedicine, predictive diagnostics, and assistive wellness devices.",
    icon: "🧬",
    sdg: "SDG 3: Good Health & Well-Being",
  },
  {
    title: "Open Innovation & Web3",
    desc: "Decentralized networks, fintech inclusions, smart governance, and student wildcards.",
    icon: "🚀",
    sdg: "SDG 11: Sustainable Communities",
  },
];

export default function HackathonPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-200">
      <main className="relative flex-1 px-6 pt-28 md:pt-36 pb-20 overflow-hidden">
        {/* Ambient Aurora & Background Grid */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="bg-dots absolute inset-0 opacity-40 dark:opacity-30" />
          <div className="absolute -left-40 top-20 w-[36rem] h-[36rem] bg-cyan-500/15 rounded-full blur-[170px] animate-drift" />
          <div className="absolute -right-40 top-60 w-[32rem] h-[32rem] bg-blue-600/15 rounded-full blur-[170px] animate-drift-slow" />
          <span
            className="outline-text pointer-events-none select-none absolute -top-4 md:-top-8 right-0 font-heading text-[6rem] md:text-[11rem] font-black uppercase tracking-tight whitespace-nowrap [mask-image:linear-gradient(to_left,black_40%,transparent_90%)]"
            aria-hidden
          >
            HACK 8.0
          </span>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Main Hero Grid: Logo on the LEFT side, Details on the RIGHT side */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center mb-20">
            {/* LEFT COLUMN: Modern Winding HackBVP Logo Animation */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start order-1 lg:order-1">
              <HackathonLogoAnimation />
              <p className="mt-4 text-xs font-mono text-stone-500 dark:text-gray-400 text-center lg:text-left">
                Interactive Circuit Core &middot; Built for BVEST XIII 2026
              </p>
            </div>

            {/* RIGHT COLUMN: Event Headline, Details & CTA */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-2">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-300 mb-6">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Flagship Technical Hackathon &middot; BVEST XIII
              </div>

              {/* Title */}
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-950 dark:text-white mb-4">
                HACK@BVP{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  8.0
                </span>
              </h1>

              {/* Tagline */}
              <p className="text-lg sm:text-xl font-semibold text-stone-800 dark:text-gray-200 mb-4 max-w-xl">
                36 Hours of Code, Circuitry &amp; High-Impact Innovation.
              </p>

              {/* Description */}
              <p className="text-stone-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mb-8">
                The eighth edition of Bharati Vidyapeeth&apos;s College of Engineering (BVCOE Delhi) premier national hackathon. Gather with top student engineers, designers, and innovators to build cutting-edge solutions addressing real-world Sustainable Development Goals (SDGs).
              </p>

              {/* Key Details Pill Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl mb-8">
                <div className="p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 text-left">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-gray-400 block mb-1">
                    Dates
                  </span>
                  <span className="font-heading text-sm font-bold text-stone-900 dark:text-white block">
                    Oct 22 &ndash; 23
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 text-left">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-gray-400 block mb-1">
                    Venue
                  </span>
                  <span className="font-heading text-sm font-bold text-stone-900 dark:text-white block">
                    BVCOE Delhi
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 text-left">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-gray-400 block mb-1">
                    Team Size
                  </span>
                  <span className="font-heading text-sm font-bold text-stone-900 dark:text-white block">
                    2 &ndash; 4 Members
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 text-left">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-gray-400 block mb-1">
                    Tracks
                  </span>
                  <span className="font-heading text-sm font-bold text-stone-900 dark:text-white block">
                    17 UN SDGs
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <button
                  disabled
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 cursor-not-allowed opacity-90 transition-all"
                >
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  Registrations Opening Soon
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold island-glass text-stone-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 border border-black/10 dark:border-white/15 transition-all active:scale-[0.98]"
                >
                  &larr; Back to Fest Home
                </Link>
              </div>
            </div>
          </div>

          {/* Hackathon Focus Tracks Section */}
          <div className="pt-12 border-t border-black/10 dark:border-white/10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                  Innovation Domains
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-stone-950 dark:text-white mt-1">
                  Hackathon Tracks &amp; Challenges
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-gray-400 font-mono">
                Official problem statements release prior to hacking commencement.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {HACKATHON_TRACKS.map((track, i) => (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-white/70 dark:bg-black/30 border border-black/5 dark:border-white/10 backdrop-blur-md shadow-sm hover:shadow-md hover:border-cyan-500/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-xl mb-4">
                      {track.icon}
                    </div>
                    <h3 className="font-heading text-lg font-bold text-stone-900 dark:text-white mb-2">
                      {track.title}
                    </h3>
                    <p className="text-stone-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
                      {track.desc}
                    </p>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-cyan-700 dark:text-cyan-400 pt-3 border-t border-black/5 dark:border-white/5">
                    {track.sdg}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

