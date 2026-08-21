export const dynamic = "force-dynamic";
import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { sdgData } from "@/lib/sdg-data";

type PublishedEvent = Prisma.EventGetPayload<{
  include: { results: true; hostSociety: { select: { id: true; name: true } } };
}>;

export default async function GlobalLeaderboardPage() {
  let events: PublishedEvent[] = [];
  try {
    events = await prisma.event.findMany({ where: { resultsPublished: true }, include: { results: true, hostSociety: { select: { id: true, name: true } } }, orderBy: { publishedAt: "desc" } });
  } catch { events = []; }

  const byTeam = new Map<string, { teamName: string; gold: number; silver: number; bronze: number; events: number; totalPoints: number; rawPoints: number }>();
  for (const ev of events) for (const r of ev.results) {
    const k = r.teamName.trim(); if (!k) continue;
    if (!byTeam.has(k)) byTeam.set(k, { teamName: k, gold: 0, silver: 0, bronze: 0, events: 0, totalPoints: 0, rawPoints: 0 });
    const t = byTeam.get(k)!;
    if (r.rank === 1) t.gold++; else if (r.rank === 2) t.silver++; else if (r.rank === 3) t.bronze++;
    t.events++; const s = r.rank === 1 ? 3 : r.rank === 2 ? 2 : 1;
    t.totalPoints += s + (r.points ?? 0); t.rawPoints += r.points ?? 0;
  }
  const leaderboard = [...byTeam.values()].sort((a, b) => b.totalPoints - a.totalPoints || b.gold - a.gold || a.teamName.localeCompare(b.teamName));

  return (
    <div className="relative flex-1 px-6 pt-28 md:pt-36 pb-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="bg-dots absolute inset-0 md:opacity-40" />
        <div className="absolute -left-40 top-0 w-[28rem] h-[28rem] bg-amber-500/10 rounded-full blur-[160px] animate-drift" />
        <span className="outline-text pointer-events-none select-none absolute -top-3 md:-top-5 right-0 font-heading text-[4rem] md:text-[8rem] font-black uppercase tracking-tight whitespace-nowrap [mask-image:linear-gradient(to_left,black_45%,transparent_90%)]" aria-hidden>Board</span>
      </div>
      <div className="relative max-w-5xl mx-auto">
        <div className="animate-rise-in mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Global <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Leaderboard</span></h1>
          <p className="text-sm text-stone-700 dark:text-gray-400 mt-2 font-mono">{events.length} events with published results · Aggregated across all podiums · <Link href="/events" className="underline">All events</Link></p>
        </div>

        {leaderboard.length === 0 ? (
          <div className="hard-shell"><div className="hard-core bg-white/70 dark:bg-[#0B0B0C]/80 p-10 text-center"><p className="font-mono text-xs uppercase tracking-widest text-stone-500">No published results yet</p><p className="text-sm text-stone-600 dark:text-gray-400 mt-2">Publish a podium from <Link href="/admin/events" className="underline">Admin → Events</Link> to see it here.</p></div></div>
        ) : (
          <>
            <div className="hard-shell mb-8">
              <div className="hard-core bg-white/70 dark:bg-[#0B0B0C]/80 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead><tr className="font-mono text-[11px] uppercase tracking-widest text-stone-500 border-b border-black/10 dark:border-white/10"><th className="px-6 py-3">#</th><th className="px-6 py-3">Team</th><th className="px-6 py-3 text-center">🥇</th><th className="px-6 py-3 text-center">🥈</th><th className="px-6 py-3 text-center">🥉</th><th className="px-6 py-3 text-center">Events</th><th className="px-6 py-3 text-right">Score</th></tr></thead>
                    <tbody className="divide-y divide-black/5 dark:divide-white/5">
                      {leaderboard.map((t, idx) => (
                        <tr key={t.teamName} className={`animate-rise-in ${idx === 0 ? "bg-amber-500/5" : ""}`} style={{ animationDelay: `${Math.min(idx * 20, 300)}ms` }}>
                          <td className="px-6 py-3 font-mono font-bold">{idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : String(idx + 1)}</td>
                          <td className="px-6 py-3 font-semibold text-stone-900 dark:text-white">{t.teamName}</td>
                          <td className="px-6 py-3 text-center font-mono">{t.gold || "—"}</td>
                          <td className="px-6 py-3 text-center font-mono">{t.silver || "—"}</td>
                          <td className="px-6 py-3 text-center font-mono">{t.bronze || "—"}</td>
                          <td className="px-6 py-3 text-center font-mono text-stone-500">{t.events}</td>
                          <td className="px-6 py-3 text-right font-mono font-bold">{t.totalPoints}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <h2 className="font-heading font-bold text-lg text-stone-900 dark:text-white mb-3">Per-event podiums</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((ev) => {
                const sdg = sdgData.find((s) => String(s.number) === ev.sdgDomainId);
                return (
                  <Link key={ev.id} href={`/events/${ev.slug}/leaderboard`} className="hard-shell block hover:-translate-y-1 transition-transform">
                    <div className="hard-core bg-white dark:bg-[#0B0B0C] p-5">
                      <div className="flex items-center gap-2 mb-2">{sdg && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: sdg.hex }} />}{sdg && <span className="text-xs font-bold" style={{ color: sdg.hex }}>G{sdg.number}</span>}<span className="text-xs font-mono text-stone-500">/events/{ev.slug}</span></div>
                      <h3 className="font-semibold text-stone-900 dark:text-white leading-tight">{ev.title}</h3>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {ev.results.sort((a, b) => a.rank - b.rank).map((r) => (
                          <span key={r.id} className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${r.rank === 1 ? "bg-amber-500 text-white border-amber-500" : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10"}`}>{r.rank === 1 ? "🥇" : r.rank === 2 ? "🥈" : "🥉"} {r.teamName}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
