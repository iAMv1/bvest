export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/db";
import { domains } from "@/lib/domains";
import { ensureDefaultSocieties } from "@/lib/seed-default-societies";

interface Props {
  searchParams: Promise<{ status?: string }>;
}

const TABS = [
  { key: "", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "locked", label: "Locked" },
] as const;

export default async function AdminAllocationsPage({ searchParams }: Props) {
  const session = await getSession();

  if (!session.isAdmin) {
    redirect("/admin/login");
  }

  const { status } = await searchParams;
  const filter = status === "pending" || status === "locked" ? status : "";

  await ensureDefaultSocieties();
  const societies = await prisma.society.findMany({
    include: {
      preferences: { orderBy: { rank: "asc" } },
    },
    orderBy: { name: "asc" },
  });

  const filtered = filter
    ? societies.filter((s) => (filter === "locked" ? s.locked : !s.locked))
    : societies;
  const lockedCount = societies.filter((s) => s.locked).length;
  const submittedCount = societies.filter((s) => s.submittedAt).length;
  const pendingCount = societies.length - lockedCount;

  const STATS = [
    { label: "Societies", value: societies.length, dot: "bg-sdg17" },
    { label: "Submitted", value: submittedCount, dot: "bg-emerald-500" },
    { label: "Pending", value: pendingCount, dot: "bg-amber-500" },
    { label: "Locked", value: lockedCount, dot: "bg-violet-500" },
  ];

  const domainByRank = (society: { preferences: { rank: number; domainId: string }[] }, rank: number) => {
    const pref = society.preferences.find((p) => p.rank === rank);
    if (!pref) return null;
    return domains.find((d) => d.id === pref.domainId) ?? null;
  };

  return (
    <div className="relative flex-1 px-6 pt-28 md:pt-36 pb-16 overflow-hidden">
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-dots absolute inset-0 md:opacity-40" />
        <div className="absolute -right-40 top-0 w-[30rem] h-[30rem] bg-violet-500/10 rounded-full blur-[170px] animate-drift" />
        <div className="absolute -left-40 bottom-0 w-[26rem] h-[26rem] bg-sdg16/10 rounded-full blur-[150px] animate-drift-slow" />
        {/* Ghost display splash */}
        <span className="outline-text pointer-events-none select-none absolute -top-3 md:-top-5 right-0 font-heading text-[5rem] md:text-[9rem] font-black uppercase tracking-tight whitespace-nowrap [mask-image:linear-gradient(to_left,black_45%,transparent_90%)]" aria-hidden="true">
          Ledger
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Page header */}
        <div className="animate-rise-in mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            Allocation{" "}
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
              Console
            </span>
          </h1>
          <p className="text-stone-950 dark:text-gray-400 text-sm max-w-2xl font-mono">
            ALL SOCIETIES &middot; PREFERENCE LEDGER &middot; STATUS:{" "}
            <span className="text-emerald-600 dark:text-emerald-400">{lockedCount}/{societies.length} LOCKED</span>
          </p>
        </div>

        {/* Stat strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="animate-rise-in hard-shell"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="hard-core bg-white dark:bg-[#0B0B0C] px-5 py-4">
                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-950 dark:text-gray-500 font-mono mb-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${stat.dot}`} />
                  {stat.label}
                </span>
                <span className="font-heading text-3xl font-bold text-gray-900 dark:text-white tabular-nums">
                  {stat.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-6" role="tablist" aria-label="Filter societies">
          {TABS.map((tab) => {
            const href = tab.key ? `/admin/allocations?status=${tab.key}` : "/admin/allocations";
            const active = filter === tab.key;
            return (
              <Link
                key={tab.key || "all"}
                href={href}
                role="tab"
                aria-selected={active}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ease-fluid active:scale-[0.97] motion-reduce:active:scale-100 ${
                  active
                    ? "bg-stone-950 text-white dark:bg-white dark:text-stone-950 shadow-[0_8px_24px_rgba(23,21,15,0.25)] dark:shadow-[0_8px_24px_rgba(255,255,255,0.12)]"
                    : "bg-black/5 dark:bg-white/[0.06] text-stone-950 dark:text-gray-300 border border-black/10 dark:border-white/10 hover:border-black/25 dark:hover:border-white/25"
                }`}
              >
                {tab.label}
                <span className={`font-mono text-[10px] tabular-nums ${active ? "opacity-70" : "opacity-50"}`}>
                  {tab.key === "locked" ? lockedCount : tab.key === "pending" ? pendingCount : societies.length}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Ledger table */}
        <div className="animate-rise-in hard-shell" style={{ animationDelay: "140ms" }}>
          <div className="hard-core bg-white/70 dark:bg-[#0B0B0C]/80 backdrop-blur-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500">
                    <th className="px-6 py-4 font-bold border-b border-black/10 dark:border-white/10">Society</th>
                    <th className="px-6 py-4 font-bold border-b border-black/10 dark:border-white/10">Status</th>
                    <th className="px-6 py-4 font-bold border-b border-black/10 dark:border-white/10">Submitted</th>
                    <th className="px-6 py-4 font-bold border-b border-black/10 dark:border-white/10">Rank 1</th>
                    <th className="px-6 py-4 font-bold border-b border-black/10 dark:border-white/10">Rank 2</th>
                    <th className="px-6 py-4 font-bold border-b border-black/10 dark:border-white/10">Rank 3</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5">
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-16 text-center">
                        <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone-950 dark:text-gray-500">
                          No societies in this state &middot; ledger clear
                        </span>
                      </td>
                    </tr>
                  )}
                  {filtered.map((society, idx) => (
                    <tr
                      key={society.id}
                      className="animate-rise-in transition-colors duration-200 ease-fluid hover:bg-violet-500/[0.04] dark:hover:bg-white/[0.03]"
                      style={{ animationDelay: `${Math.min(160 + idx * 50, 600)}ms` }}
                    >
                      <td className="px-6 py-4">
                        <span className="block font-medium text-gray-900 dark:text-white">{society.name}</span>
                        <span className="block font-mono text-[10px] text-stone-950 dark:text-gray-500 tracking-wider mt-0.5">
                          {society.id.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {society.locked ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                            Locked
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-stone-950 dark:text-gray-400 tabular-nums whitespace-nowrap">
                        {society.submittedAt ? new Date(society.submittedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "—"}
                      </td>
                      {[1, 2, 3].map((rank) => {
                        const domain = domainByRank(society, rank);
                        return (
                          <td key={rank} className="px-6 py-4">
                            {domain ? (
                              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04]">
                                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: domain.colorToken }} />
                                <span className="text-xs font-medium text-stone-950 dark:text-gray-300 truncate max-w-[150px]">
                                  {domain.name}
                                </span>
                                <span className="font-mono text-[9px] text-stone-950 dark:text-gray-500">R{rank}</span>
                              </span>
                            ) : (
                              <span className="text-xs text-stone-950 dark:text-gray-600 font-mono">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* TODO: Add auto-allocation algorithm here for future feature */}
      </div>
    </div>
  );
}
