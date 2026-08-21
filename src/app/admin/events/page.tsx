export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/db";
import { sdgData } from "@/lib/sdg-data";
import { createEvent, updateEvent, updateEventStatus, saveEventResults, publishResults, unpublishResults } from "./actions";

interface Props {
  searchParams: Promise<{ error?: string; created?: string; updated?: string; edit?: string; results?: string; published?: string; unpublished?: string }>;
}

const ERRORS: Record<string, string> = {
  title: "Title must be at least 3 characters.",
  slug: "Slug must be 2–60 chars, lowercase letters / numbers / dashes.",
  sdg: "Pick a valid SDG domain.",
  description: "Description must be at least 10 characters.",
  host: "Host society not found.",
  duplicate: "That event slug already exists.",
  invalid: "Invalid event data.",
  locked: "Results are locked — unpublish to edit.",
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

  const { error, created, updated, edit, results, published, unpublished } = await searchParams;
  const events = await prisma.event.findMany({ include: { hostSociety: true, results: { orderBy: { rank: "asc" } } }, orderBy: { createdAt: "desc" } });
  const societies = await prisma.society.findMany({ orderBy: { name: "asc" } });
  const editing = edit ? events.find((e) => e.id === edit || e.slug === edit) : null;

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
            EVENTS &middot; HOSTED BY ORGANISATIONS &middot; {events.length} ON FILE &middot; Click a row to edit — or change status inline
          </p>
        </div>

        {error && (
          <div role="alert" className="animate-error-in flex items-start gap-2.5 px-4 py-3 rounded-xl mb-6 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-300 text-sm">
            {ERRORS[error] ?? error}
          </div>
        )}
        {created && (
          <div role="status" className="animate-error-in flex items-start gap-2.5 px-4 py-3 rounded-xl mb-6 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-sm">
            Event created.
          </div>
        )}
        {updated && (
          <div role="status" className="animate-error-in flex items-start gap-2.5 px-4 py-3 rounded-xl mb-6 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-sm">
            Event updated.
          </div>
        )}
        {results && (
          <div role="status" className="animate-error-in flex items-start gap-2.5 px-4 py-3 rounded-xl mb-6 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-sm">
            Results saved.
          </div>
        )}
        {published && (
          <div role="status" className="animate-error-in flex items-start gap-2.5 px-4 py-3 rounded-xl mb-6 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-sm">
            Results published — “Results Live” now on cards and event page.
          </div>
        )}
        {unpublished && (
          <div role="status" className="animate-error-in flex items-start gap-2.5 px-4 py-3 rounded-xl mb-6 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 text-sm">
            Results unpublished — you can edit again.
          </div>
        )}

        {/* Create / Edit form */}
        <div className="animate-rise-in hard-shell mb-8" id="event-form">
          <div className="hard-core bg-white/70 dark:bg-[#0B0B0C]/80 backdrop-blur-sm p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 mb-1">
              <h2 className="font-heading text-lg font-bold text-gray-900 dark:text-white">{editing ? "Edit event" : "Register an event"}</h2>
              {editing && (
                <Link href="/admin/events" className="px-3 py-1.5 rounded-full text-xs font-semibold border border-black/10 dark:border-white/10 bg-white dark:bg-black/40 hover:bg-black/5">
                  Cancel edit
                </Link>
              )}
            </div>
            <p className="text-xs text-stone-950 dark:text-gray-400 mb-6 font-mono">
              {editing ? `Editing “${editing.title}” — update and save.` : "Host = the organisation (participating group) running it. Select a row below to edit."}
            </p>
            <form action={editing ? updateEvent : createEvent} className="space-y-4">
              {editing && <input type="hidden" name="id" value={editing.id} />}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">Event title</span>
                  <input name="title" required minLength={3} defaultValue={editing?.title ?? ""} placeholder="e.g. Renewable Robotics" className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60" />
                </label>
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">Slug (URL)</span>
                  <input name="slug" required pattern="[a-z0-9][a-z0-9-]{1,59}" defaultValue={editing?.slug ?? ""} placeholder="e.g. renewable-robotics" className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 font-mono" />
                </label>
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">SDG domain</span>
                  <select name="sdgDomainId" required defaultValue={editing?.sdgDomainId ?? ""} className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60">
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
                <textarea name="description" required minLength={10} rows={3} defaultValue={editing?.description ?? ""} placeholder="What is this event about?" className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60" />
              </label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">Host organisation (participating)</span>
                  <select name="hostSocietyId" defaultValue={editing?.hostSocietyId ?? ""} className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60">
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
                  <input name="venue" defaultValue={editing?.venue ?? ""} placeholder="e.g. Main Auditorium" className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60" />
                </label>
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">Start date</span>
                  <input name="startDate" type="date" defaultValue={editing?.startDate ? new Date(editing.startDate).toISOString().split("T")[0] : ""} className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 dark:[color-scheme:dark]" />
                </label>
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">Status</span>
                  <select name="status" defaultValue={editing?.status ?? "DRAFT"} className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60">
                    {["DRAFT", "PENDING", "CONFIRMED", "LIVE", "COMPLETED"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="block">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">Registration URL (optional — Devfolio / GfG / Unstop)</span>
                <input name="registrationUrl" type="url" defaultValue={editing?.registrationUrl ?? ""} placeholder="https://…" className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 font-mono" />
              </label>
              <button type="submit" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-stone-950 text-white dark:bg-white dark:text-stone-950 hover:opacity-90 transition-all duration-200 ease-fluid active:scale-[0.97] motion-reduce:active:scale-100">
                {editing ? "Update event" : "Create event"}
              </button>
            </form>
          </div>
        </div>

        {/* Events list — click row to edit, or change status inline */}
        <div className="animate-rise-in hard-shell" style={{ animationDelay: "120ms" }}>
          <div className="hard-core bg-white/70 dark:bg-[#0B0B0C]/80 backdrop-blur-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="font-mono text-[11px] uppercase tracking-[0.15em] text-stone-500 dark:text-gray-400 font-semibold">
                    <th className="px-6 py-3.5 font-semibold border-b border-black/10 dark:border-white/10">Event</th>
                    <th className="px-6 py-3.5 font-semibold border-b border-black/10 dark:border-white/10">Domain</th>
                    <th className="px-6 py-3.5 font-semibold border-b border-black/10 dark:border-white/10">Host</th>
                    <th className="px-6 py-3.5 font-semibold border-b border-black/10 dark:border-white/10">Venue</th>
                    <th className="px-6 py-3.5 font-semibold border-b border-black/10 dark:border-white/10">Status</th>
                    <th className="px-6 py-3.5 font-semibold border-b border-black/10 dark:border-white/10 text-right">Edit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5">
                  {events.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-16 text-center">
                        <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone-950 dark:text-gray-500">
                          No events registered yet &middot; program clear
                        </span>
                      </td>
                    </tr>
                  )}
                  {events.map((event, idx) => {
                    const sdg = sdgData.find((s) => String(s.number) === event.sdgDomainId);
                    const isEditing = editing?.id === event.id;
                    return (
                      <tr key={event.id} className={`animate-rise-in transition-colors duration-200 ease-fluid ${isEditing ? "bg-violet-500/10 dark:bg-violet-500/10" : "hover:bg-violet-500/[0.04] dark:hover:bg-white/[0.03]"}`} style={{ animationDelay: `${Math.min(220 + idx * 40, 700)}ms` }}>
                        <td className="px-6 py-4">
                          <span className="block font-semibold text-[14px] leading-tight text-stone-900 dark:text-white tracking-tight">{event.title}</span>
                          <span className="block font-mono text-[11px] text-stone-500 dark:text-gray-500 tracking-wider mt-1">
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
                        <td className="px-6 py-4 text-xs font-medium text-stone-600 dark:text-gray-400">{event.venue ?? <span className="text-stone-400 dark:text-gray-600">—</span>}</td>
                        <td className="px-6 py-4">
                          <form action={updateEventStatus} className="inline-flex items-center gap-1.5">
                            <input type="hidden" name="id" value={event.id} />
                            <select name="status" defaultValue={event.status} className={`px-2.5 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider border cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500/30 ${STATUS_STYLES[event.status] ?? STATUS_STYLES.DRAFT}`}>
                              {["DRAFT", "PENDING", "CONFIRMED", "LIVE", "COMPLETED"].map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                            <button type="submit" className="px-2 py-1 rounded-full text-[10px] font-bold bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/20">Save</button>
                          </form>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex items-center gap-1.5 justify-end">
                            <Link href={`/events/${event.slug}/leaderboard`} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20">
                              Podium ↗
                            </Link>
                            <Link href={`/admin/events?edit=${event.id}#event-form`} className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${isEditing ? "bg-violet-600 text-white border-violet-600" : "bg-white dark:bg-black/40 border-black/10 dark:border-white/10 hover:border-violet-500/30 hover:text-violet-600"}`}>
                              {isEditing ? "Editing" : "Edit"} →
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Results — per event podium, publish flow */}
        <div className="animate-rise-in hard-shell mt-8" style={{ animationDelay: "160ms" }}>
          <div className="hard-core bg-white/70 dark:bg-[#0B0B0C]/80 backdrop-blur-sm p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
              <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white">Results & podium</h3>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase font-mono border bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/20">Sprint B</span>
            </div>
            <p className="text-xs text-stone-700 dark:text-gray-400 mb-6 font-mono leading-relaxed">Save team names for ranks 1–3, then Publish. Published results show “Results Live” on cards and a podium on the event page. Unpublish to edit again.</p>
            {events.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-8 text-center">
                <p className="text-sm font-medium text-stone-700 dark:text-gray-300">No events yet</p>
                <p className="text-xs font-mono text-stone-500 dark:text-gray-500 mt-1">Create an event above to start adding podium results.</p>
              </div>
            ) : (
              <div className="space-y-5">
                {events.map((event) => {
                  const publishedCount = event.results.length;
                  return (
                    <div key={event.id} className={`rounded-2xl border p-5 transition-colors ${event.resultsPublished ? "border-amber-500/20 bg-amber-500/[0.04] dark:bg-amber-500/[0.06]" : "border-black/10 dark:border-white/10 bg-white dark:bg-black/20"}`}>
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div className="min-w-0">
                          <p className="font-semibold text-[14px] leading-tight text-stone-900 dark:text-white tracking-tight truncate">{event.title} <span className="font-mono text-xs font-normal text-stone-500">/events/{event.slug}</span></p>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider border ${STATUS_STYLES[event.status]}`}>{event.status}</span>
                            {event.resultsPublished ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-white border border-amber-500">🏆 Results Live</span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium font-mono bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-stone-500">Not published</span>
                            )}
                            {publishedCount > 0 && !event.resultsPublished && <span className="text-xs font-mono text-stone-500">{publishedCount} rank{publishedCount !== 1 ? "s" : ""} saved</span>}
                            {event.resultsPublished && event.publishedAt && <span className="text-xs font-mono text-stone-500">· {new Date(event.publishedAt).toLocaleDateString()}</span>}
                          </div>
                        </div>
                        {event.resultsPublished ? (
                          <form action={unpublishResults} className="inline-flex shrink-0">
                            <input type="hidden" name="eventId" value={event.id} />
                            <button type="submit" className="px-3.5 py-1.5 rounded-full text-xs font-semibold border border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 transition-colors">Unpublish — unlock to edit</button>
                          </form>
                        ) : (
                          <form action={publishResults} className="inline-flex shrink-0">
                            <input type="hidden" name="eventId" value={event.id} />
                            <button type="submit" disabled={event.results.length === 0} title={event.results.length === 0 ? "Save at least one rank before publishing" : "Publish results live"} className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors ${event.results.length === 0 ? "bg-stone-100 dark:bg-white/5 border-black/10 dark:border-white/10 text-stone-400 cursor-not-allowed" : "bg-emerald-600 dark:bg-emerald-500 text-white border-emerald-600 dark:border-emerald-500 hover:bg-emerald-700 dark:hover:bg-emerald-600 shadow-sm"}`}>Publish results</button>
                          </form>
                        )}
                      </div>
                      <form action={saveEventResults} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input type="hidden" name="eventId" value={event.id} />
                        {[1, 2, 3].map((rank) => {
                          const r = event.results.find((x) => x.rank === rank);
                          return (
                            <label key={rank} className="block">
                              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500 font-mono mb-1.5">Rank {rank} {rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}</span>
                              <input name={`team_${rank}`} defaultValue={r?.teamName ?? ""} placeholder={`Team ${rank} name`} maxLength={80} disabled={event.resultsPublished} className="w-full rounded-xl px-3 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/60 disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-stone-400" />
                              <input name={`points_${rank}`} defaultValue={r?.points ?? ""} placeholder="Points (optional)" type="number" min={0} step={1} inputMode="numeric" disabled={event.resultsPublished} className="mt-1.5 w-full rounded-xl px-3 py-2 text-xs bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/60 disabled:opacity-50 disabled:cursor-not-allowed font-mono placeholder:text-stone-400" />
                            </label>
                          );
                        })}
                        <div className="md:col-span-3 flex flex-wrap items-center gap-3 pt-1">
                          <button type="submit" disabled={event.resultsPublished} className={`px-5 py-2 rounded-full text-xs font-semibold border transition-colors ${event.resultsPublished ? "bg-stone-100 dark:bg-white/5 border-black/10 dark:border-white/10 text-stone-400 cursor-not-allowed" : "bg-stone-900 text-white dark:bg-white dark:text-stone-900 border-stone-900 dark:border-white hover:opacity-90 active:scale-[0.97]"}`}>Save results</button>
                          {event.resultsPublished ? <span className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-500"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" /> Locked — unpublish to edit</span> : <span className="text-xs font-mono text-stone-400 dark:text-gray-500">Leave blank to clear a rank</span>}
                        </div>
                      </form>
                      {event.resultsPublished && event.results.length > 0 && (
                        <div className="mt-5">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 font-mono mb-2">Live preview</p>
                          <div className={`grid gap-2.5 text-center ${event.results.length === 1 ? "grid-cols-1 max-w-xs mx-auto" : event.results.length === 2 ? "grid-cols-2 max-w-md mx-auto" : "grid-cols-3"}`}>
                            {[1, 2, 3].map((rank) => {
                              const r = event.results.find((x) => x.rank === rank);
                              if (!r) return null;
                              return (
                                <div key={rank} className={`rounded-xl p-3.5 border ${rank === 1 ? "bg-amber-500 text-white border-amber-500 shadow-md" : rank === 2 ? "bg-white dark:bg-white/5 border-black/10 dark:border-white/10" : "bg-stone-50 dark:bg-white/[0.03] border-black/10 dark:border-white/10"}`}>
                                  <p className={`text-[10px] font-bold uppercase tracking-widest ${rank === 1 ? "text-white/80" : "text-stone-500"}`}>{rank === 1 ? "Gold" : rank === 2 ? "Silver" : "Bronze"}</p>
                                  <p className={`font-semibold mt-1 leading-tight break-words ${rank === 1 ? "text-white" : "text-stone-900 dark:text-white"}`}>{r.teamName}</p>
                                  {r.points != null && <p className={`text-xs font-mono mt-1 ${rank === 1 ? "text-white/80" : "text-stone-500"}`}>{r.points} pts</p>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      {!event.resultsPublished && event.results.length > 0 && (
                        <p className="text-xs font-mono text-stone-500 mt-3">Not yet live — press Publish to show podium on the event page.</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
