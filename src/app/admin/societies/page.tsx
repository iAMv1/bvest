export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/db";
import { AdminNav } from "../AdminNav";
import { createSociety, resetPassword } from "./actions";

interface Props {
  searchParams: Promise<{ error?: string; created?: string; updated?: string }>;
}

const ERRORS: Record<string, string> = {
  id: "Society ID must be 2–40 chars, lowercase letters / numbers / dashes.",
  name: "Name must be at least 2 characters.",
  password: "Password must be at least 6 characters.",
  members: "A collaboration group needs at least one member society.",
  duplicate: "That society ID already exists.",
};

export default async function AdminSocietiesPage({ searchParams }: Props) {
  const session = await getSession();
  if (!session.isAdmin) redirect("/admin/login");

  const { error, created, updated } = await searchParams;
  const societies = await prisma.society.findMany({ orderBy: { name: "asc" } });
  const byId = new Map(societies.map((s) => [s.id, s]));

  return (
    <div className="relative flex-1 px-6 py-10 overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-dots absolute inset-0 md:opacity-40" />
        <div className="absolute -left-40 top-0 w-[28rem] h-[28rem] bg-sdg6/10 rounded-full blur-[160px] animate-drift" />
        <span className="outline-text pointer-events-none select-none absolute -top-3 md:-top-5 right-0 font-heading text-[5rem] md:text-[9rem] font-black uppercase tracking-tight whitespace-nowrap [mask-image:linear-gradient(to_left,black_45%,transparent_90%)]" aria-hidden="true">
          Register
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <AdminNav active="societies" />

        <div className="animate-rise-in mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-violet-700 dark:text-violet-300 font-mono bg-violet-500/10 border border-violet-500/25 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            system // registry
          </span>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            Society <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">Registry</span>
          </h1>
          <p className="text-stone-950 dark:text-gray-400 text-sm max-w-2xl font-mono">
            CREATE SOCIETY ACCOUNTS &amp; COLLABORATION GROUPS &middot; PARTICIPATING UNITS ARE GROUPS &middot; {societies.length} ON FILE
          </p>
        </div>

        {error && ERRORS[error] && (
          <div role="alert" className="animate-error-in flex items-start gap-2.5 px-4 py-3 rounded-xl mb-6 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-300 text-sm">
            {ERRORS[error]}
          </div>
        )}
        {(created || updated) && (
          <div role="status" className="animate-error-in flex items-start gap-2.5 px-4 py-3 rounded-xl mb-6 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-sm">
            {created ? "Society created — share the ID & password with the society rep." : "Password updated."}
          </div>
        )}

        {/* Create form */}
        <div className="animate-rise-in hard-shell mb-8">
          <div className="hard-core bg-white/70 dark:bg-[#0B0B0C]/80 backdrop-blur-sm p-6 md:p-8">
            <h2 className="font-heading text-lg font-bold text-gray-900 dark:text-white mb-1">Register a society or group</h2>
            <p className="text-xs text-stone-950 dark:text-gray-400 mb-6 font-mono">
              Participating units are <strong>groups</strong> — one ID + password shared by the member societies of an event. Member societies are recorded for the pool only and don&apos;t participate directly.
            </p>
            <form action={createSociety} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">Society ID</span>
                  <input
                    name="id"
                    required
                    pattern="[a-z0-9][a-z0-9-]{1,39}"
                    placeholder="e.g. robo-tech-fest"
                    className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 font-mono"
                  />
                </label>
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">Display name</span>
                  <input
                    name="name"
                    required
                    placeholder="e.g. Robotics Club × Tech Society"
                    className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
                  />
                </label>
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">Password</span>
                  <input
                    name="password"
                    required
                    minLength={6}
                    type="password"
                    placeholder="min. 6 characters"
                    className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 font-mono"
                  />
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">Type</span>
                  <select name="kind" className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60">
                    <option value="GROUP">Collaboration group — participates</option>
                    <option value="SOCIETY">Member society — pool only, no login</option>
                  </select>
                </label>
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">Member societies (groups only)</span>
                  <select name="memberIds" multiple size={4} className="w-full rounded-xl px-4 py-2 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 font-mono">
                    {societies.filter((s) => s.kind !== "GROUP").map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.id} — {s.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <button type="submit" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-stone-950 text-white dark:bg-white dark:text-stone-950 hover:opacity-90 transition-all duration-200 ease-fluid active:scale-[0.97] motion-reduce:active:scale-100">
                Create account
                <span className="font-mono text-[10px] opacity-60">HASH → 12 ROUNDS</span>
              </button>
            </form>
          </div>
        </div>

        {/* Registry table */}
        <div className="animate-rise-in hard-shell" style={{ animationDelay: "120ms" }}>
          <div className="hard-core bg-white/70 dark:bg-[#0B0B0C]/80 backdrop-blur-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500">
                    <th className="px-6 py-4 font-bold border-b border-black/10 dark:border-white/10">Account</th>
                    <th className="px-6 py-4 font-bold border-b border-black/10 dark:border-white/10">Type</th>
                    <th className="px-6 py-4 font-bold border-b border-black/10 dark:border-white/10">Members</th>
                    <th className="px-6 py-4 font-bold border-b border-black/10 dark:border-white/10">Status</th>
                    <th className="px-6 py-4 font-bold border-b border-black/10 dark:border-white/10 text-right">Reset password</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5">
                  {societies.map((society, idx) => {
                    const members = society.memberIds ? ((JSON.parse(society.memberIds) as string[]) ?? []) : [];
                    return (
                      <tr key={society.id} className="animate-rise-in transition-colors duration-200 ease-fluid hover:bg-violet-500/[0.04] dark:hover:bg-white/[0.03]" style={{ animationDelay: `${Math.min(200 + idx * 40, 700)}ms` }}>
                        <td className="px-6 py-4">
                          <span className="block font-medium text-gray-900 dark:text-white">{society.name}</span>
                          <span className="block font-mono text-[10px] text-stone-950 dark:text-gray-500 tracking-wider mt-0.5">{society.id.toUpperCase()}</span>
                        </td>
                        <td className="px-6 py-4">
                          {society.kind === "GROUP" ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider text-fuchsia-700 dark:text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/20">
                              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse" />
                              Group
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider text-violet-700 dark:text-violet-300 bg-violet-500/10 border border-violet-500/20">
                              Member
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {members.length === 0 ? (
                            <span className="text-xs text-stone-950 dark:text-gray-600 font-mono">—</span>
                          ) : (
                            <div className="flex flex-wrap gap-1.5">
                              {members.map((m) => (
                                <span key={m} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] text-stone-950 dark:text-gray-300">
                                  <span className="w-1.5 h-1.5 rounded-full bg-sdg6" />
                                  {byId.get(m)?.name ?? m}
                                </span>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {society.locked ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Locked
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20">
                              Active
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <form action={resetPassword} className="inline-flex items-center gap-2">
                            <input type="hidden" name="id" value={society.id} />
                            <input
                              name="password"
                              required
                              minLength={6}
                              type="password"
                              placeholder="new password"
                              className="w-36 rounded-lg px-3 py-1.5 text-xs bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 font-mono"
                            />
                            <button type="submit" className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/[0.06] text-stone-950 dark:text-gray-300 hover:border-black/25 dark:hover:border-white/25 transition-colors duration-200">
                              Reset
                            </button>
                          </form>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}