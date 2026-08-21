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
  } catch { events = []; }

  return (
    <div className="relative flex-1 px-6 pt-28 md:pt-36 pb-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="bg-dots absolute inset-0 md:opacity-40" />
        <div className="absolute -left-40 top-0 w-[28rem] h-[28rem] bg-sdg9/10 rounded-full blur-[160px] animate-drift" />
        <span className="outline-text pointer-events-none select-none absolute -top-3 md:-top-5 right-0 font-heading text-[5rem] md:text-[9rem] font-black uppercase tracking-tight whitespace-nowrap [mask-image:linear-gradient(to_left,black_45%,transparent_90%)]" aria-hidden>Events</span>
      </div>
      <div className="relative max-w-6xl mx-auto">
        <div className="animate-rise-in mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">All <span className="bg-gradient-to-r from-sdg9 to-sdg6 bg-clip-text text-transparent">Events</span></h1>
            <p className="text-stone-700 dark:text-gray-400 text-sm mt-2 font-mono">{events.length} events · CONFIRMED · LIVE · COMPLETED</p>
          </div>
          <Link href="/leaderboard" className="px-4 py-2 rounded-full text-xs font-bold border bg-amber-500 text-white border-amber-500 hover:bg-amber-600">🏆 Global Leaderboard →</Link>
        </div>
        {events.length === 0 ? (
          <div className="hard-shell"><div className="hard-core bg-white/70 dark:bg-[#0B0B0C]/80 p-10 text-center rounded-[calc(1.75rem-1.5px)]"><p className="font-mono text-xs tracking-widest uppercase text-stone-500">No events yet — check back soon</p></div></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {events.map((ev, i) => {
              const sdg = sdgData.find((s) => String(s.number) === ev.sdgDomainId);
              return (
                <div key={ev.id} className="hard-shell group block animate-rise-in" style={{ animationDelay: `${Math.min(i * 40, 300)}ms` }}>
                  <div className="hard-core bg-white dark:bg-[#0B0B0C] p-6 h-full flex flex-col overflow-hidden">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {sdg && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border" style={{ backgroundColor: `${sdg.hex}18`, borderColor: `${sdg.hex}40`, color: sdg.hex }}>G{sdg.number}</span>}
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold border font-mono uppercase ${ev.status === "LIVE" ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-700 dark:text-emerald-400" : ev.status === "COMPLETED" ? "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10" : "bg-violet-500/10 border-violet-500/25 text-violet-700"}`}>{ev.status}</span>
                      {ev.resultsPublished && <span className="px-2 py-1 rounded-full text-[10px] font-black bg-amber-500 text-white">🏆 Live</span>}
                    </div>
                    <h3 className="font-heading font-bold text-lg leading-tight text-stone-900 dark:text-white group-hover:text-violet-600 transition-colors">{ev.title}</h3>
                    {ev.hostSociety && <p className="text-xs font-medium text-fuchsia-700 dark:text-fuchsia-400 mt-1">{ev.hostSociety.name}</p>}
                    <p className="text-sm text-stone-600 dark:text-gray-400 mt-2 line-clamp-2 flex-1">{ev.description}</p>
                    {sdg && <div className="w-10 h-10 rounded-xl overflow-hidden mt-4 shrink-0" style={{ backgroundColor: sdg.hex }}><Image src={sdg.imageUrl} alt="" width={40} height={40} className="w-full h-full object-contain p-1.5" /></div>}
                    <div className="mt-4 flex items-center gap-2">
                      <Link href={`/events/${ev.slug}`} className="text-xs font-semibold text-stone-900 dark:text-white hover:text-violet-600 inline-flex items-center gap-1">View →</Link>
                      {ev.resultsPublished && <Link href={`/events/${ev.slug}/leaderboard`} className="ml-auto text-xs font-bold px-3 py-1 rounded-full bg-amber-500 text-white hover:bg-amber-600">Podium</Link>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
