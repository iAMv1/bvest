export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/db";
import { domains } from "@/lib/domains";
import { PreferencePicker } from "./PreferencePicker";

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
    const rankedDomains = society.preferences.map((pref: any) => ({
      rank: pref.rank,
      domain: domains.find((d) => d.id === pref.domainId),
    }));

    return (
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-2xl">
          {/* Confirmation header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
              <svg
                className="w-7 h-7 text-green-600 dark:text-green-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Preferences Submitted
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Thank you, <strong className="text-gray-700 dark:text-gray-300">{society.name}</strong>.
              Your domain preferences have been recorded and locked.
            </p>
            {society.submittedAt && (
              <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                Submitted on{" "}
                {new Date(society.submittedAt).toLocaleString("en-IN", {
                  dateStyle: "long",
                  timeStyle: "short",
                })}
              </p>
            )}
          </div>

          {/* Ranked choices */}
          <div className="space-y-3">
            {rankedDomains.map(({ rank, domain }: any) => {
              if (!domain) return null;
              return (
                <div
                  key={rank}
                  className="relative flex items-center gap-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 overflow-hidden"
                >
                  {/* Color stripe */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1.5"
                    style={{ backgroundColor: domain.colorToken }}
                  />

                  {/* Rank badge */}
                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-heading font-bold text-base shadow-sm"
                    style={{ backgroundColor: domain.colorToken }}
                  >
                    {rank}
                  </div>

                  <div className="pl-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-0.5">
                      {rank === 1 ? "1st" : rank === 2 ? "2nd" : "3rd"} Choice
                    </p>
                    <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-sm">
                      {domain.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {domain.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-8">
            Preferences are now locked. Contact the BVEST organising committee if you need to make changes.
          </p>
        </div>
      </div>
    );
  }

  // ── Unlocked: interactive picker ───────────────────────────────────────────
  return (
    <div className="flex-1 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Page header */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
            Logged in as
          </p>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {society.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl">
            Select your society&apos;s <strong>3 domain preferences</strong> in ranked order — click a
            card to assign it as your next choice. Click a selected card to deselect it.
            Once all 3 are chosen, click <strong>Submit Preferences</strong>. Submissions are final.
          </p>
        </div>

        <PreferencePicker societyName={society.name} domains={domains} />
      </div>
    </div>
  );
}
