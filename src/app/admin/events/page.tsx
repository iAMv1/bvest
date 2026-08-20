export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/db";
import { sdgData } from "@/lib/sdg-data";
import { createEvent } from "./actions";

interface Props {
  searchParams: Promise<{ error?: string; created?: string }>;
}

const ERRORS: Record<string, string> = {
  title: "Title must be at least 3 characters.",
  slug: "Slug must be 2–60 chars, lowercase letters / numbers / dashes.",
  sdg: "Pick a valid SDG domain.",
  description: "Description must be at least 10 characters.",
  host: "Host society not found.",
  duplicate: "That event slug already exists.",
};

const STATUS_STYLES: Record<string, string> = {
  DRAFT: "text-gray-700 dark:text-gray-400 bg-gray-500/10 border-gray-500/25",
  PENDING: "text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/25",
  CONFIRMED: "text-violet-700 dark:text-violet-300 bg-violet-500/10 border-violet-500/25",
  LIVE: "text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
  COMPLETED: "text-stone-950 dark:text-gray-400 bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10",
};

export default async function AdminEventsPage({ searchParams }: Props) {
  const session = await getSession();
  if (!session.isAdmin) redirect("/admin/login");

  const { error, created } = await searchParams;
  const events = await prisma.event.findMany({ include: { hostSociety: true }, orderBy: { createdAt: "desc" } });
  const societies = await prisma.society.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="relative flex-1 px-6 pt-28 md:pt-36 pb-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-dots absolute inset-0 md:opacity-40" />
        <div className="absolute -left-40 top-0 w-[28rem] h-[28rem] bg-sdg7/10 rounded-full blur-[160px] animate-drift" />
        <span className="outline-text pointer-events-none select-none absolute -top-3 md:-top-5 right-0 font-heading text-[5rem] md:text-[9rem] font-black uppercase tracking-tight whitespace-nowrap [mask-image:linear-gradient(to_left,black_45%,transparent_90%)]" aria-hidden="true">
          Program
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto">

        <div className="animate-rise-in mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            Event <span className="bg-gradient-to-r from-sdg7 to-sdg9 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">Program</span>
          </h1>
          <p className="text-stone-950 dark:text-gray-400 text-sm max-w-2xl font-mono">
            EVENTS &middot; HOSTED BY ORGANISATIONS &middot; {events.length} ON FILE
          </p>
        </div>

        {error && ERRORS[error] && (
          <div role="alert" className="animate-error-in flex items-start gap-2.5 px-4 py-3 rounded-xl mb-6 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-300 text-sm">
            {ERRORS[error]}
          </div>
        )}
        {created && (
          <div role="status" className="animate-error-in flex items-start gap-2.5 px-4 py-3 rounded-xl mb-6 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-sm">
            Event created.
          </div>
        )}

        {/* Create form */}
        <div className="animate-rise-in hard-shell mb-8">
          <div className="hard-core bg-white/70 dark:bg-[#0B0B0C]/80 backdrop-blur-sm p-6 md:p-8">
            <h2 className="font-heading text-lg font-bold text-gray-900 dark:text-white mb-1">Register an event</h2>
            <p className="text-xs text-stone-950 dark:text-gray-400 mb-6 font-mono">
              Host = the organisation (participating group registry account) running it.
            </p>
            <form action={createEvent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">Event title</span>
                  <input name="title" required minLength={3} placeholder="e.g. Renewable Robotics" className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60" />
                </label>
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">Slug (URL)</span>
                  <input name="slug" required pattern="[a-z0-9][a-z0-9-]{1,59}" placeholder="e.g. renewable-robotics" className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 font-mono" />
                </label>
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">SDG domain</span>
                  <select name="sdgDomainId" required className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60">
                    {sdgData.map((sdg) => (
                      <option key={sdg.number} value={String(sdg.number)}>
                        Goal {sdg.number} — {sdg.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="block">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">Description</span>
                <textarea name="description" required minLength={10} rows={3} placeholder="What is this event about?" className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60" />
              </label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">Host organisation (participating)</span>
                  <select name="hostSocietyId" className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60">
                    <option value="">— unassigned —</option>
                    {societies.filter((s) => s.kind === "GROUP").map((s) => (
                      <option key={s.id} value={s.id}>
                        ⟡ {s.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">Venue</span>
                  <input name="venue" placeholder="e.g. Main Auditorium" className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60" />
                </label>
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">Start date</span>
                  <input name="startDate" type="date" className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 dark:[color-scheme:dark]" />
                </label>
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">Status</span>
                  <select name="status" className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60">
                    {["DRAFT", "PENDING", "CONFIRMED", "LIVE", "COMPLETED"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="block">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">Registration URL (optional — Devfolio / GfG / Unstop)</span>
                <input name="registrationUrl" type="url" placeholder="https://…" className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 font-mono" />
              </label>
              <button type="submit" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-stone-950 text-white dark:bg-white dark:text-stone-950 hover:opacity-90 transition-all duration-200 ease-fluid active:scale-[0.97] motion-reduce:active:scale-100">
                Create event
              </button>
            </form>
          </div>
        </div>

        {/* Events list */}
        <div className="animate-rise-in hard-shell" style={{ animationDelay: "120ms" }}>
          <div className="hard-core bg-white/70 dark:bg-[#0B0B0C]/80 backdrop-blur-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500">
                    <th className="px-6 py-4 font-bold border-b border-black/10 dark:border-white/10">Event</th>
                    <th className="px-6 py-4 font-bold border-b border-black/10 dark:border-white/10">Domain</th>
                    <th className="px-6 py-4 font-bold border-b border-black/10 dark:border-white/10">Host</th>
                    <th className="px-6 py-4 font-bold border-b border-black/10 dark:border-white/10">Venue</th>
                    <th className="px-6 py-4 font-bold border-b border-black/10 dark:border-white/10">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5">
                  {events.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center">
                        <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone-950 dark:text-gray-500">
                          No events registered yet &middot; program clear
                        </span>
                      </td>
                    </tr>
                  )}
                  {events.map((event, idx) => {
                    const sdg = sdgData.find((s) => String(s.number) === event.sdgDomainId);
                    return (
                      <tr key={event.id} className="animate-rise-in transition-colors duration-200 ease-fluid hover:bg-violet-500/[0.04] dark:hover:bg-white/[0.03]" style={{ animationDelay: `${Math.min(220 + idx * 40, 700)}ms` }}>
                        <td className="px-6 py-4">
                          <span className="block font-medium text-gray-900 dark:text-white">{event.title}</span>
                          <span className="block font-mono text-[10px] text-stone-950 dark:text-gray-500 tracking-wider mt-0.5">
                            /events/{event.slug}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {sdg ? (
                            <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04]">
                              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: sdg.hex }} />
                              <span className="text-xs font-medium text-stone-950 dark:text-gray-300">Goal {sdg.number}</span>
                            </span>
                          ) : (
                            <span className="text-xs font-mono text-stone-950 dark:text-gray-600">{event.sdgDomainId}</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {event.hostSociety ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider text-fuchsia-700 dark:text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/20">
                              {event.hostSociety.kind === "GROUP" ? "⟡ " : ""}
                              {event.hostSociety.name}
                            </span>
                          ) : (
                            <span className="text-xs font-mono text-stone-950 dark:text-gray-600">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-xs text-stone-950 dark:text-gray-400">{event.venue ?? "—"}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider border ${STATUS_STYLES[event.status] ?? STATUS_STYLES.DRAFT}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${event.status === "LIVE" ? "bg-emerald-500 animate-pulse" : "bg-current opacity-60"}`} />
                            {event.status}
                          </span>
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