export const dynamic = "force-dynamic";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/db";
import { sdgData } from "@/lib/sdg-data";

export default async function AdminLeaderboardPage({ searchParams }: { searchParams: Promise<{ updated?: string; deleted?: string; error?: string }> }) {
  const session = await getSession();
  if (!session.isAdmin) redirect("/admin/login");
  const sp = await searchParams;
  const events = await prisma.event.findMany({ include: { results: { orderBy: { rank: "asc" } }, hostSociety: true }, orderBy: { createdAt: "desc" } });
  const published = events.filter((e) => e.resultsPublished);
  const allResults = events.flatMap((e) => e.results.map((r) => ({ ...r, event: e })));

  return (
    <div className="relative flex-1 px-6 pt-28 md:pt-36 pb-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="bg-dots absolute inset-0 md:opacity-40" />
        <div className="absolute -left-40 top-0 w-[28rem] h-[28rem] bg-amber-500/10 rounded-full blur-[160px] animate-drift" />
      </div>
      <div className="relative max-w-6xl mx-auto">
        <div className="animate-rise-in mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Leaderboard <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Manager</span></h1>
            <p className="text-sm font-mono text-stone-600 dark:text-gray-400 mt-2">{allResults.length} results · {published.length} published events · <Link href="/leaderboard" className="underline">Public board →</Link></p>
          </div>
          <Link href="/admin/events" className="px-4 py-2 rounded-full text-xs font-semibold border border-black/10 dark:border-white/10 bg-white dark:bg-black/40 hover:bg-black/5">← Manage events</Link>
        </div>
        {sp.updated && <div className="animate-error-in mb-4 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-sm">Updated.</div>}
        {sp.deleted && <div className="animate-error-in mb-4 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 text-sm">Deleted.</div>}
        {sp.error && <div className="animate-error-in mb-4 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-300 text-sm">{sp.error}</div>}

        <div className="hard-shell">
          <div className="hard-core bg-white/70 dark:bg-[#0B0B0C]/80 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead><tr className="font-mono text-[11px] uppercase tracking-widest text-stone-500 border-b border-black/10 dark:border-white/10"><th className="px-6 py-3">Event</th><th className="px-6 py-3">Rank</th><th className="px-6 py-3">Team</th><th className="px-6 py-3 text-right">Points</th><th className="px-6 py-3 text-right">Actions</th></tr></thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5">
                  {allResults.length === 0 && <tr><td colSpan={5} className="px-6 py-12 text-center font-mono text-xs uppercase tracking-widest text-stone-500">No results yet — add podium in Events</td></tr>}
                  {allResults.map((r) => {
                    const sdg = sdgData.find((s) => String(s.number) === r.event.sdgDomainId);
                    return (
                      <tr key={r.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.03]">
                        <td className="px-6 py-3">
                          <span className="font-semibold text-stone-900 dark:text-white text-xs leading-tight block">{r.event.title}</span>
                          <span className="font-mono text-[11px] text-stone-500">/events/{r.event.slug} {sdg ? `· G${sdg.number}` : ""} {r.event.resultsPublished ? "· 🏆" : "· draft"}</span>
                        </td>
                        <td className="px-6 py-3 font-bold">{r.rank === 1 ? "🥇 1" : r.rank === 2 ? "🥈 2" : "🥉 3"}</td>
                        <td className="px-6 py-3 font-medium text-stone-900 dark:text-white">{r.teamName}</td>
                        <td className="px-6 py-3 text-right font-mono text-stone-500">{r.points ?? "—"}</td>
                        <td className="px-6 py-3 text-right">
                          <form action={async (formData: FormData) => {
                            "use server";
                            const { getSession: gs } = await import("@/lib/session");
                            const s = await gs(); if (!s.isAdmin) return;
                            const id = String(formData.get("id") ?? "");
                            const { prisma: p } = await import("@/lib/db");
                            await p.eventResult.delete({ where: { id } });
                            const { revalidatePath } = await import("next/cache");
                            revalidatePath("/admin/leaderboard");
                            const { redirect: rd } = await import("next/navigation");
                            rd("/admin/leaderboard?deleted=1");
                          }} className="inline">
                            <input type="hidden" name="id" value={r.id} />
                            <button type="submit" className="px-3 py-1 rounded-full text-xs font-semibold border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30">Delete</button>
                          </form>
                          <Link href={`/admin/events?edit=${r.event.id}#event-form`} className="ml-2 px-3 py-1 rounded-full text-xs font-semibold border border-black/10 dark:border-white/10 hover:bg-black/5">Edit</Link>
                          <Link href={`/events/${r.event.slug}/leaderboard`} className="ml-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500 text-white">View</Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <p className="text-xs font-mono text-stone-500 mt-3">Tip: edit podiums in <Link href="/admin/events" className="underline">Admin → Events → Results & podium</Link>. Publish there to go live.</p>
      </div>
    </div>
  );
}
