export const dynamic = "force-dynamic";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { sdgData } from "@/lib/sdg-data";

export default async function EventLeaderboardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let event: any = null;
  try {
    event = await prisma.event.findUnique({ where: { slug }, include: { hostSociety: true, results: { orderBy: { rank: "asc" } } } });
  } catch { return notFound(); }
  if (!event) return notFound();
  const sdg = sdgData.find((s) => String(s.number) === event.sdgDomainId);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden bg-background pt-24 pb-12">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="bg-dots absolute inset-0 md:opacity-40" />
          <div className="absolute top-0 -left-40 w-[28rem] h-[28rem] rounded-full blur-[160px]" style={{ backgroundColor: sdg?.hex ? `${sdg.hex}18` : undefined }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-6">
          <Link href={`/events/${event.slug}`} className="inline-flex items-center gap-2 text-sm text-stone-600 dark:text-gray-400 hover:text-stone-900 mb-6">← Back to {event.title}</Link>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {sdg && <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border" style={{ backgroundColor: `${sdg.hex}18`, borderColor: `${sdg.hex}40`, color: sdg.hex }}>Goal {sdg.number} — {sdg.name}</span>}
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${event.resultsPublished ? "bg-amber-500 text-white border-amber-500" : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10"}`}>{event.resultsPublished ? "🏆 Results Live" : "Results not published"}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-white">{event.title} <span className="font-normal text-stone-500 text-xl">— Leaderboard</span></h1>
          {event.hostSociety && <p className="text-sm text-stone-600 dark:text-gray-400 mt-2">Hosted by <strong>{event.hostSociety.name}</strong></p>}
          <div className="mt-8">
            {!event.resultsPublished ? (
              <div className="rounded-2xl border border-dashed border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-8 text-center">
                <p className="font-mono text-xs uppercase tracking-widest text-stone-500">Podium not published yet</p>
                <p className="text-sm text-stone-600 dark:text-gray-400 mt-2">Check back after the event concludes.</p>
              </div>
            ) : event.results.length === 0 ? (
              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-8 text-center">
                <p className="text-sm text-stone-600">No results recorded.</p>
              </div>
            ) : (
              <>
                {/* Podium — visual 1-2-3 */}
                <div className={`grid gap-3 ${event.results.length === 1 ? "grid-cols-1 max-w-xs mx-auto" : event.results.length === 2 ? "grid-cols-2 max-w-xl mx-auto" : "grid-cols-1 md:grid-cols-3 items-end"}`}>
                  {[1, 2, 3].map((rank) => {
                    const r = event.results.find((x: any) => x.rank === rank);
                    if (!r) return null;
                    const isGold = rank === 1;
                    return (
                      <div key={rank} className={`rounded-2xl border p-5 text-center ${isGold ? "bg-amber-500 text-white border-amber-500 shadow-lg md:order-2 md:-mb-2" : rank === 2 ? "bg-white dark:bg-white/10 border-black/10 dark:border-white/10 md:order-1" : "bg-white dark:bg-white/5 border-black/10 dark:border-white/10 md:order-3"}`}>
                        <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center text-lg font-black ${isGold ? "bg-white text-amber-600" : "bg-black/5 dark:bg-white/10"}`}>{rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}</div>
                        <p className={`text-[10px] font-bold uppercase tracking-widest mt-3 ${isGold ? "text-white/80" : "text-stone-500"}`}>{rank === 1 ? "Gold — Rank 1" : rank === 2 ? "Silver — Rank 2" : "Bronze — Rank 3"}</p>
                        <p className={`font-bold mt-1 break-words ${isGold ? "text-white text-lg" : "text-stone-900 dark:text-white"}`}>{r.teamName}</p>
                        {r.points != null && <p className={`text-xs font-mono mt-1 ${isGold ? "text-white/80" : "text-stone-500"}`}>{r.points} pts</p>}
                      </div>
                    );
                  })}
                </div>
                {/* Table */}
                <div className="hard-shell mt-8">
                  <div className="hard-core bg-white/70 dark:bg-[#0B0B0C]/80 overflow-hidden">
                    <table className="w-full text-sm text-left">
                      <thead><tr className="font-mono text-[11px] uppercase tracking-widest text-stone-500 border-b border-black/10 dark:border-white/10"><th className="px-6 py-3">Rank</th><th className="px-6 py-3">Team</th><th className="px-6 py-3 text-right">Points</th></tr></thead>
                      <tbody className="divide-y divide-black/5 dark:divide-white/5">
                        {event.results.map((r: any) => (
                          <tr key={r.id} className={r.rank === 1 ? "bg-amber-500/5" : ""}>
                            <td className="px-6 py-3 font-bold">{r.rank === 1 ? "🥇 1" : r.rank === 2 ? "🥈 2" : "🥉 3"}</td>
                            <td className="px-6 py-3 font-semibold text-stone-900 dark:text-white">{r.teamName}</td>
                            <td className="px-6 py-3 text-right font-mono text-stone-500">{r.points ?? "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {event.publishedAt && <p className="text-xs font-mono text-stone-500 text-center mt-3">Published {new Date(event.publishedAt).toLocaleString()}</p>}
                <div className="flex justify-center gap-3 mt-6">
                  <Link href="/leaderboard" className="px-4 py-2 rounded-full text-xs font-bold border border-black/10 dark:border-white/10 hover:bg-black/5">Global board →</Link>
                  <Link href="/events" className="px-4 py-2 rounded-full text-xs font-bold bg-stone-900 text-white dark:bg-white dark:text-black">All events</Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
