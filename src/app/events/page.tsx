export const dynamic = "force-dynamic";
import Link from "next/link";
import Image from "next/image";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { sdgData } from "@/lib/sdg-data";

export default async function EventsPage() {
  let events: Prisma.EventGetPayload<{
    include: { hostSociety: { select: { id: true; name: true; kind: true } }; results: true };
  }>[] = [];
  try {
    events = await prisma.event.findMany({
      where: { status: { in: ["CONFIRMED", "LIVE", "COMPLETED"] } },
      include: { hostSociety: { select: { id: true, name: true, kind: true } }, results: { orderBy: { rank: "asc" } } },
      orderBy: [{ status: "desc" }, { createdAt: "desc" }],
    });
  } catch {
    events = [];
  }

  return (
    <div className="relative flex-1 px-6 pt-28 md:pt-36 pb-20 overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="bg-dots absolute inset-0 md:opacity-40" />
        <div className="absolute -left-40 top-0 w-[28rem] h-[28rem] bg-sdg6/10 rounded-full blur-[160px] animate-drift" />
        <div className="absolute -right-40 top-1/3 w-[30rem] h-[30rem] bg-sdg10/10 rounded-full blur-[180px] animate-drift-slow" />
        <span
          className="outline-text pointer-events-none select-none absolute -top-3 md:-top-5 right-0 font-heading text-[5rem] md:text-[9rem] font-black uppercase tracking-tight whitespace-nowrap [mask-image:linear-gradient(to_left,black_45%,transparent_90%)]"
          aria-hidden
        >
          Events
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="animate-rise-in mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Fest{" "}
              <span className="bg-gradient-to-r from-sdg10 to-sdg6 bg-clip-text text-transparent">
                Events
              </span>
            </h1>
            <p className="text-stone-700 dark:text-gray-400 text-sm md:text-base mt-2">
              Official competitions, hackathons, and society challenges for BVEST XIII.
            </p>
          </div>
        </div>

        {/* Featured Coming Soon Slide Banner */}
        <div className="hard-shell relative rounded-3xl overflow-hidden bg-gradient-to-br from-black/5 via-black/[0.02] to-sdg6/10 dark:from-white/10 dark:via-white/[0.02] dark:to-sdg6/10 p-8 md:p-14 border border-black/10 dark:border-white/10 text-center flex flex-col items-center justify-center mb-12 shadow-xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sdg6/15 text-sdg6 font-mono text-xs font-bold uppercase tracking-widest mb-4 border border-sdg6/30">
            <span className="w-2 h-2 rounded-full bg-sdg6 animate-ping" />
            Coming Soon
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
            Full Event Lineup To Be Revealed
          </h2>
          <p className="text-stone-700 dark:text-gray-300 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
            30+ Technical, Cultural, and SDG-themed competitions across all 17 UN Sustainable Development Goals are currently being finalized by society leads.
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-stone-900 text-white dark:bg-white dark:text-stone-950 font-semibold text-sm shadow-lg">
            <svg
              className="w-4 h-4 text-sdg6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            Mark Your Calendar &middot; Oct 22–23, 2026
          </div>
        </div>

        {/* Confirmed Events Grid (if available) */}
        {events.length > 0 && (
          <div>
            <h3 className="font-heading text-2xl font-bold text-stone-900 dark:text-white mb-6">
              Confirmed Lineup ({events.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {events.map((ev, i) => {
                const sdg = sdgData.find((s) => String(s.number) === ev.sdgDomainId);
                return (
                  <div
                    key={ev.id}
                    className="hard-shell group block animate-rise-in"
                    style={{ animationDelay: `${Math.min(i * 40, 300)}ms` }}
                  >
                    <div className="hard-core bg-white dark:bg-[#0B0B0C] p-6 h-full flex flex-col overflow-hidden">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {sdg && (
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border"
                            style={{
                              backgroundColor: `${sdg.hex}18`,
                              borderColor: `${sdg.hex}40`,
                              color: sdg.hex,
                            }}
                          >
                            G{sdg.number}
                          </span>
                        )}
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] font-bold border font-mono uppercase ${
                            ev.status === "LIVE"
                              ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-700 dark:text-emerald-400"
                              : ev.status === "COMPLETED"
                              ? "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10"
                              : "bg-violet-500/10 border-violet-500/25 text-violet-700"
                          }`}
                        >
                          {ev.status}
                        </span>
                        {ev.resultsPublished && (
                          <span className="px-2 py-1 rounded-full text-[10px] font-black bg-amber-500 text-white">
                            🏆 Live
                          </span>
                        )}
                      </div>
                      <h4 className="font-heading font-bold text-lg leading-tight text-stone-900 dark:text-white group-hover:text-violet-600 transition-colors">
                        {ev.title}
                      </h4>
                      {ev.hostSociety && (
                        <p className="text-xs font-medium text-fuchsia-700 dark:text-fuchsia-400 mt-1">
                          {ev.hostSociety.name}
                        </p>
                      )}
                      <p className="text-sm text-stone-600 dark:text-gray-400 mt-2 line-clamp-2 flex-1">
                        {ev.description}
                      </p>
                      {sdg && (
                        <div
                          className="w-10 h-10 rounded-xl overflow-hidden mt-4 shrink-0"
                          style={{ backgroundColor: sdg.hex }}
                        >
                          <Image
                            src={sdg.imageUrl}
                            alt=""
                            width={40}
                            height={40}
                            className="w-full h-full object-contain p-1.5"
                          />
                        </div>
                      )}
                      <div className="mt-4 flex items-center gap-2">
                        <Link
                          href={`/events/${ev.slug}`}
                          className="text-xs font-semibold text-stone-900 dark:text-white hover:text-violet-600 inline-flex items-center gap-1"
                        >
                          View →
                        </Link>
                        {ev.resultsPublished && (
                          <Link
                            href={`/events/${ev.slug}/leaderboard`}
                            className="ml-auto text-xs font-bold px-3 py-1 rounded-full bg-amber-500 text-white hover:bg-amber-600"
                          >
                            Podium
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
