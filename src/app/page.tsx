import Link from 'next/link';
import Image from 'next/image';
import { SDGColorStrip } from '@/components/SDGColorStrip';
import { SDGBadge } from '@/components/SDGBadge';
import { SDGBoxCollage } from '@/components/SDGBoxCollage';
import { BvestLogo } from '@/components/BvestLogo';
import { Reveal } from '@/components/Reveal';
import { Hero } from '@/components/Hero';
import { BackdropAurora } from '@/components/BackdropAurora';
import { FestTicker } from '@/components/FestTicker';
import { StatCounter } from '@/components/StatCounter';
import { CoreTeamSection } from '@/components/CoreTeamSection';
import { Footer } from '@/components/Footer';
import { sdgData } from '@/lib/sdg-data';

export default function Home() {
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

      {/* 3. The 17 Goals Grid — asymmetric bento */}
      <section id="goals" className="relative py-20 md:py-24 px-6 bg-sdg7/[0.07] dark:bg-white/[0.02] border-y border-black/10 dark:border-white/5 overflow-hidden scroll-mt-24">
        {/* Backdrop: drifting orbs + dot grid */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="bg-grid absolute inset-0 md:opacity-70" />
          <div className="bg-dots absolute inset-0 opacity-40" />
          <div className="absolute top-10 -left-40 w-[26rem] h-[26rem] bg-sdg2/12 rounded-full blur-[140px] animate-drift" />
          <div className="absolute bottom-10 -right-40 w-[30rem] h-[30rem] bg-sdg10/14 rounded-full blur-[160px] animate-drift-slow" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <Reveal className="text-center mb-24">
            {/* Ghost display splash */}
            <span className="outline-text pointer-events-none select-none absolute -top-6 md:-top-10 left-1/2 -translate-x-1/2 font-heading text-[6rem] md:text-[11rem] font-black uppercase tracking-tight whitespace-nowrap [mask-image:linear-gradient(to_bottom,black_45%,transparent_85%)]" aria-hidden="true">
              17 Goals
            </span>
            <h2 className="relative font-heading text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
              The{" "}
              <span className="bg-gradient-to-r from-sdg7 to-sdg9 bg-clip-text text-transparent">
                17 Goals
              </span>
            </h2>
            <p className="relative text-stone-950 dark:text-gray-400 text-lg max-w-2xl mx-auto">Discover the events hosted by our societies across all 17 domains.</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
            {sdgData.map((sdg, i) => (
              <Reveal key={sdg.number} delay={(i % 4) * 0.05} className={i === 0 || i === 5 || i === 11 ? "lg:col-span-2" : ""}>
                <Link
                  id={`goal-${sdg.number}`}
                  href={`/events/${sdg.number}`}
                  className="hard-shell block group h-full transition-all duration-300 ease-fluid hover:-translate-y-1.5 hover:bg-black/15 dark:hover:bg-white/25 active:scale-[0.98] motion-reduce:active:scale-100"
                  style={{ background: `linear-gradient(180deg, ${sdg.hex}33, var(--glass-stroke))` }}
                >
                  <div className="hard-core relative bg-white dark:bg-[#0B0B0C] p-6 h-full overflow-hidden transition-all duration-300 ease-fluid group-hover:bg-stone-50 dark:group-hover:bg-[#101012] flex flex-col items-start gap-4">
                    {/* Ghost watermark number */}
                    <span
                      className="pointer-events-none select-none absolute -right-1 -bottom-5 font-heading text-[5.5rem] font-black leading-none"
                      style={{ color: sdg.hex, opacity: 0.08 }}
                      aria-hidden="true"
                    >
                      {sdg.number}
                    </span>

                    {/* Hover arrow chip */}
                    <span className="absolute right-5 top-5 w-8 h-8 rounded-full border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 backdrop-blur-md flex items-center justify-center text-stone-950 dark:text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-fluid" aria-hidden="true">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9L9 3M4 3h5v5" />
                      </svg>
                    </span>

                    <div
                      className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ease-fluid group-hover:w-1.5"
                      style={{ backgroundColor: sdg.hex }}
                    />

                    {/* SDG icon chip with number badge */}
                    <div
                      className="relative w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg shrink-0 transition-transform duration-500 ease-fluid group-hover:rotate-[8deg] group-hover:scale-110"
                      style={{ backgroundColor: sdg.hex, boxShadow: `0 8px 24px ${sdg.hex}44` }}
                    >
                      <Image
                        src={sdg.imageUrl}
                        alt=""
                        width={56}
                        height={56}
                        className="w-full h-full object-contain p-1.5"
                      />
                      <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white dark:bg-[#0B0B0C] border border-black/10 dark:border-white/15 text-stone-950 dark:text-white text-[10px] font-heading font-bold flex items-center justify-center">
                        {sdg.number}
                      </span>
                    </div>

                    <h3 className="font-heading font-semibold text-lg text-gray-900 dark:text-white leading-tight">
                      {sdg.name}
                    </h3>

                    <div className="mt-auto pt-5 w-full border-t border-black/10 dark:border-white/10">
                      <p className="text-xs text-stone-950 dark:text-gray-400 mb-2"><span className="font-semibold text-stone-800 dark:text-gray-300">Hosted by:</span> BVCOE Student Societies</p>
                      <p className="text-xs text-stone-950 dark:text-gray-400"><span className="font-semibold text-stone-800 dark:text-gray-300">Event:</span> Confirmed &mdash; reveal soon</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Events Section — SDG rose-washed canvas in light */}
      <section id="featured-events" className="relative py-24 md:py-28 w-full overflow-hidden scroll-mt-24 bg-sdg10/[0.05] dark:bg-transparent">
        {/* Backdrop: cursor-following aura + grid texture */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="bg-grid absolute inset-0 md:opacity-60" />
          <div className="bg-dots absolute inset-0 md:opacity-40" />
          <div className="absolute top-1/4 -right-40 w-[34rem] h-[34rem] bg-sdg6/12 rounded-full blur-[170px] animate-drift" />
          <div className="absolute bottom-1/4 -right-24 w-[22rem] h-[22rem] bg-sdg10/10 rounded-full blur-[140px] animate-drift-slow" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
        <Reveal className="relative flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="outline-text pointer-events-none select-none absolute -top-8 md:-top-12 left-0 font-heading text-[4.5rem] md:text-[8rem] font-black uppercase tracking-tight whitespace-nowrap [mask-image:linear-gradient(to_bottom,black_45%,transparent_85%)]" aria-hidden="true">
              Events
            </span>
            <h2 className="relative font-heading text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">Featured{" "}
              <span className="bg-gradient-to-r from-sdg10 to-sdg6 bg-clip-text text-transparent">
                Events
              </span>
            </h2>
            <p className="relative text-stone-950 dark:text-gray-400 text-lg max-w-xl">A sneak peek at some of the major competitions happening this year.</p>
          </div>
          <Link href="#goals" className="group relative text-base font-semibold text-stone-950 dark:text-white flex items-center gap-2 transition-colors duration-200 ease-fluid hover:text-sdg6 dark:hover:text-gray-300 active:scale-[0.97] motion-reduce:active:scale-100 w-fit md:w-auto">
            View all events
            <span className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center transition-all duration-300 ease-fluid group-hover:translate-x-1 group-hover:bg-black/10 dark:group-hover:bg-white/10" aria-hidden="true">&rarr;</span>
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {[
            { sdg: sdgData[3], title: "Code4Ed Hackathon", host: "Tech Society", desc: "Build innovative ed-tech solutions to make quality education accessible to everyone in remote areas." },
            { sdg: sdgData[6], title: "Renewable Robotics", host: "Robotics Club", desc: "Design and race autonomous robots powered entirely by alternative energy sources." },
            { sdg: sdgData[12], title: "Climate Data Challenge", host: "Data Science Group", desc: "Analyze massive environmental datasets to predict and visualize local climate impact over the next decade." },
          ].map((event, i) => (
            <Reveal key={event.title} delay={i * 0.1}>
              <div className="hard-shell h-full transition-all duration-300 ease-fluid hover:-translate-y-1.5 hover:bg-white/20">
                <div className="hard-core relative bg-white dark:bg-[#0B0B0C] p-8 h-full flex flex-col overflow-hidden">
                  {/* Banner image — zoom on hover */}
                  <div className="relative h-40 rounded-2xl overflow-hidden mb-6">
                    <Image
                      src={event.sdg.imageUrl}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-fluid group-hover:scale-105"
                      style={{ backgroundColor: event.sdg.hex }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" aria-hidden="true" />
                    <div className="absolute bottom-3 left-3">
                      <SDGBadge sdg={event.sdg} />
                    </div>
                    <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold text-white bg-black/45 backdrop-blur-md border border-white/15">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                      </svg>
                      Oct 24&ndash;26
                    </div>
                  </div>

                  <h3 className="font-heading text-2xl font-bold mb-3 text-gray-900 dark:text-white">{event.title}</h3>
                  <p className="text-sm font-medium text-stone-950 dark:text-gray-400 mb-6">{event.host}</p>
                  <p className="text-stone-950 dark:text-gray-400 text-base leading-relaxed mb-8">{event.desc}</p>
                  <button className="group/btn mt-auto inline-flex items-center gap-2 text-sm font-semibold text-stone-950 dark:text-white hover:text-sdg6 dark:hover:text-gray-300 transition-all duration-200 ease-fluid active:scale-[0.97] motion-reduce:active:scale-100 w-fit">
                    Learn more
                    <span className="w-6 h-6 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center transition-all duration-300 ease-fluid group-hover/btn:translate-x-1 group-hover/btn:bg-black/10 dark:group-hover/btn:bg-white/10" aria-hidden="true">&rarr;</span>
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      {/* 5. Core Team Section */}
      <CoreTeamSection />

      {/* 6. Sponsors/Partners Strip */}
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