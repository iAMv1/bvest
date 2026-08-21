"use client";

import { useState } from "react";
import { resetPassword } from "@/app/admin/societies/actions";

interface Society {
  id: string;
  name: string;
  kind: string;
  memberIds: string | null;
  locked: boolean;
  createdAt?: string | Date | null;
}

interface Props {
  societies: Society[];
}

export function RegistryTables({ societies }: Props) {
  const [tab, setTab] = useState<"GROUP" | "SOCIETY">("GROUP");
  const orgs = societies.filter((s) => s.kind === "GROUP");
  const members = societies.filter((s) => s.kind === "SOCIETY");
  const byId = new Map(societies.map((s) => [s.id, s]));
  // For members, compute which groups they belong to
  const memberUsage = new Map<string, string[]>();
  for (const g of orgs) {
    if (!g.memberIds) continue;
    try {
      const ids = JSON.parse(g.memberIds) as string[];
      for (const mid of ids) {
        if (!memberUsage.has(mid)) memberUsage.set(mid, []);
        memberUsage.get(mid)!.push(g.name);
      }
    } catch {}
  }

  const list = tab === "GROUP" ? orgs : members;

  return (
    <div className="animate-rise-in hard-shell" style={{ animationDelay: "120ms" }}>
      <div className="hard-core bg-white/70 dark:bg-[#0B0B0C]/80 backdrop-blur-sm overflow-hidden">
        {/* Capsule switch */}
        <div className="px-6 pt-6 pb-4 flex flex-wrap items-center justify-between gap-4 border-b border-black/5 dark:border-white/5">
          <div className="flex items-center gap-3">
            <h3 className="font-heading font-bold text-stone-900 dark:text-white">Registry</h3>
            <span className="text-xs text-stone-500 dark:text-gray-500 font-mono">
              {orgs.length} organisations · {members.length} members
            </span>
          </div>
          <div className="flex items-center gap-1 p-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
            <button
              onClick={() => setTab("GROUP")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${tab === "GROUP" ? "bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow" : "text-stone-600 dark:text-white/60 hover:text-stone-900"}`}
            >
              Organisations <span className="ml-1 opacity-60">({orgs.length})</span>
            </button>
            <button
              onClick={() => setTab("SOCIETY")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${tab === "SOCIETY" ? "bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow" : "text-stone-600 dark:text-white/60 hover:text-stone-900"}`}
            >
              Members <span className="ml-1 opacity-60">({members.length})</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {tab === "GROUP" ? (
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="font-mono text-[11px] uppercase tracking-[0.15em] text-stone-500 dark:text-gray-400 font-semibold">
                  <th className="px-6 py-3.5 font-semibold border-b border-black/10 dark:border-white/10">Organisation</th>
                  <th className="px-6 py-3.5 font-semibold border-b border-black/10 dark:border-white/10">Members (exactly 2)</th>
                  <th className="px-6 py-3.5 font-semibold border-b border-black/10 dark:border-white/10">Status</th>
                  <th className="px-6 py-3.5 font-semibold border-b border-black/10 dark:border-white/10 text-right">Reset password</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {orgs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center">
                      <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone-400">No organisations yet — pick 2 members above and create one</span>
                    </td>
                  </tr>
                )}
                {orgs.map((society, idx) => {
                  const membersArr = society.memberIds ? ((JSON.parse(society.memberIds) as string[]) ?? []) : [];
                  return (
                    <tr key={society.id} className="animate-rise-in hover:bg-violet-500/[0.04] dark:hover:bg-white/[0.03]" style={{ animationDelay: `${Math.min(200 + idx * 40, 700)}ms` }}>
                      <td className="px-6 py-4">
                        <span className="block font-semibold text-[14px] leading-tight text-stone-900 dark:text-white tracking-tight">{society.name}</span>
                        <span className="block font-mono text-[11px] text-stone-500 dark:text-gray-500 tracking-wider mt-1">{society.id.toUpperCase()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {membersArr.map((m) => (
                            <span key={m} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.06] text-stone-700 dark:text-gray-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                              {byId.get(m)?.name ?? m}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {society.locked ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Locked
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <form action={resetPassword} className="inline-flex items-center gap-2">
                          <input type="hidden" name="id" value={society.id} />
                          <input name="password" required minLength={6} type="password" placeholder="new password" className="w-36 rounded-lg px-3 py-1.5 text-xs bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 font-mono" />
                          <button type="submit" className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/[0.06] text-stone-950 dark:text-gray-300 hover:border-black/25 dark:hover:border-white/25">
                            Reset
                          </button>
                        </form>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="font-mono text-[11px] uppercase tracking-[0.15em] text-stone-500 dark:text-gray-400 font-semibold">
                  <th className="px-6 py-3.5 font-semibold border-b border-black/10 dark:border-white/10">Member Society</th>
                  <th className="px-6 py-3.5 font-semibold border-b border-black/10 dark:border-white/10">ID</th>
                  <th className="px-6 py-3.5 font-semibold border-b border-black/10 dark:border-white/10">Used in</th>
                  <th className="px-6 py-3.5 font-semibold border-b border-black/10 dark:border-white/10 text-right">Pool</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {members.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center">
                      <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone-400">No members — they will appear here after seeding</span>
                    </td>
                  </tr>
                )}
                {members.map((m, idx) => {
                  const used = memberUsage.get(m.id) || [];
                  return (
                    <tr key={m.id} className="animate-rise-in hover:bg-violet-500/[0.04]" style={{ animationDelay: `${Math.min(200 + idx * 20, 700)}ms` }}>
                      <td className="px-6 py-4">
                        <span className="block font-semibold text-[14px] leading-tight text-stone-900 dark:text-white tracking-tight">{m.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-[11px] text-stone-500 dark:text-gray-500 tracking-wider">{m.id.toUpperCase()}</span>
                      </td>
                      <td className="px-6 py-4">
                        {used.length === 0 ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-stone-500">Unused</span>
                        ) : (
                          <div className="flex flex-wrap gap-1">
                            {used.map((g) => (
                              <span key={g} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-violet-500/10 border border-violet-500/20 text-violet-700 dark:text-violet-300">
                                {g}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider text-stone-500 dark:text-gray-500 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                          Pool — No login
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
