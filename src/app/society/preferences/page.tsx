export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/db";
import { domains } from "@/lib/domains";
import { PreferencePicker } from "./PreferencePicker";
import { LogoutButton } from "@/components/LogoutButton";

export default async function PreferencesPage() {
  const session = await getSession();

  if (!session.societyId) {
    redirect("/society/login");
  }

  const society = await prisma.society.findUnique({
    where: { id: session.societyId },
    include: {
      preferences: { orderBy: { rank: "asc" } },
    },
  });

  if (!society) {
    redirect("/society/login");
  }

  // ── Locked: read-only confirmation view ────────────────────────────────────
  if (society.locked) {
    const rankedDomains = society.preferences.map((pref: { rank: number; domainId: string }) => ({
      rank: pref.rank,
      domain: domains.find((d) => d.id === pref.domainId),
    }));

    return (
      <div className="relative flex-1 flex items-center justify-center px-4 pt-28 md:pt-36 pb-16 overflow-hidden">
        {/* Backdrop */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="bg-dots absolute inset-0 md:opacity-60" />
          <div className="absolute left-1/4 top-1/4 w-[26rem] h-[26rem] bg-sdg6/12 rounded-full blur-[150px] animate-drift" />
          <div className="absolute right-1/4 bottom-1/4 w-[22rem] h-[22rem] bg-sdg7/10 rounded-full blur-[130px] animate-drift-slow" />
          {/* Ghost display splash */}
          <span className="outline-text pointer-events-none select-none absolute -top-4 md:-top-6 left-1/2 -translate-x-1/2 font-heading text-[5rem] md:text-[9rem] font-black uppercase tracking-tight whitespace-nowrap [mask-image:linear-gradient(to_bottom,black_40%,transparent_85%)]" aria-hidden="true">
            Sealed
          </span>
        </div>

        <div className="relative w-full max-w-2xl">
          {/* Confirmation header */}
          <div className="text-center mb-10">
            <div className="animate-pop-in inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/25 dark:border-emerald-400/25 mb-5 shadow-[0_0_40px_rgba(16,185,129,0.18)]">
              <svg
                className="w-8 h-8 text-emerald-500 dark:text-emerald-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Preferences Submitted
            </h1>
            <p className="text-stone-950 dark:text-gray-400 text-sm max-w-md mx-auto">
              Thank you, <strong className="text-stone-800 dark:text-gray-200">{society.name}</strong>.
              Your domain preferences have been recorded and locked.
            </p>
            <div className="mt-4">
              <LogoutButton label="Log out" />
            </div>
            <p className="inline-flex items-center gap-2 text-[11px] text-stone-950 dark:text-gray-500 font-mono mt-4 px-3.5 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04]">
              <span className="text-sdg6">RECEIPT</span> &middot; {society.id.toUpperCase()} &middot;{" "}
              {society.submittedAt
                ? new Date(society.submittedAt).toLocaleString("en-IN", {
                    dateStyle: "long",
                    timeStyle: "short",
                  })
                : "recorded"}
            </p>
          </div>

          {/* Ranked choices */}
          <div className="space-y-3">
            {rankedDomains.map(({ rank, domain }: { rank: number; domain: { id: string; name: string; description: string; colorToken: string } | undefined }) => {
              if (!domain) return null;
              return (
                <div
                  key={rank}
                  className="animate-rise-in hard-shell"
                  style={{ animationDelay: `${(rank - 1) * 90}ms` }}
                >
                  <div className="hard-core relative flex items-center gap-4 bg-white dark:bg-[#0B0B0C] p-5 overflow-hidden">
                    {/* Color stripe */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1.5"
                      style={{ backgroundColor: domain.colorToken }}
                    />

                    {/* Rank badge */}
                    <div
                      className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-white font-heading font-bold text-base"
                      style={{ backgroundColor: domain.colorToken, boxShadow: `0 8px 20px ${domain.colorToken}44` }}
                    >
                      {rank}
                    </div>

                    <div className="pl-2 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-950 dark:text-gray-500 mb-0.5">
                        {rank === 1 ? "1st" : rank === 2 ? "2nd" : "3rd"} Choice
                      </p>
                      <h3 className="font-heading font-semibold text-stone-950 dark:text-white text-sm">
                        {domain.name}
                      </h3>
                      <p className="text-xs text-stone-950 dark:text-gray-400 mt-0.5">
                        {domain.description}
                      </p>
                    </div>

                    <span className="shrink-0 font-mono text-[10px] tracking-widest text-stone-950 dark:text-gray-500 border border-black/10 dark:border-white/10 rounded-full px-2.5 py-1">
                      R{rank} &middot; {domain.id.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-xs text-stone-950 dark:text-gray-500 mt-8">
            Preferences are now locked. Contact the BVEST organising committee if you need to make changes.
          </p>
        </div>
      </div>
    );
  }

  // ── Unlocked: interactive picker ───────────────────────────────────────────
  return (
    <div className="relative flex-1 px-6 pt-28 md:pt-36 pb-16 overflow-hidden">
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-dots absolute inset-0 md:opacity-50" />
        <div className="absolute top-0 -left-40 w-[28rem] h-[28rem] bg-sdg6/12 rounded-full blur-[160px] animate-drift" />
        <div className="absolute bottom-0 -right-40 w-[26rem] h-[26rem] bg-sdg7/10 rounded-full blur-[150px] animate-drift-slow" />
        {/* Ghost display splash */}
        <span className="outline-text pointer-events-none select-none absolute -top-4 md:-top-6 left-1/2 -translate-x-1/2 font-heading text-[5rem] md:text-[9rem] font-black uppercase tracking-tight whitespace-nowrap [mask-image:linear-gradient(to_bottom,black_40%,transparent_85%)]" aria-hidden="true">
          Priority
        </span>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Page header */}
        <div className="animate-rise-in mb-10 flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
              {society.name}
            </h1>
            <p className="text-stone-950 dark:text-gray-400 text-sm max-w-xl leading-relaxed">
              Select your society&apos;s <strong className="text-stone-800 dark:text-gray-200">3 domain preferences</strong> in ranked order — click a
              card to assign it as your next choice. Click a selected card to deselect it.
              Once all 3 are chosen, click <strong className="text-stone-800 dark:text-gray-200">Submit Preferences</strong>. Submissions are final.
            </p>
          </div>
          <div className="shrink-0 pt-1">
            <LogoutButton label="Log out" />
          </div>
        </div>

        <PreferencePicker domains={domains} />
      </div>
    </div>
  );
}