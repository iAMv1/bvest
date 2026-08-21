export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/db";
import { createPage, togglePageField, movePage, deletePage, updatePage } from "./actions";

interface Props {
  searchParams: Promise<{ error?: string; created?: string; updated?: string; deleted?: string; edit?: string }>;
}

const ERRORS: Record<string, string> = {
  slug: "Slug must be 1–60 chars, lowercase letters / numbers / dashes / slashes (e.g. about, results/robo-war).",
  reserved: "Reserved slug — /society/*, /admin/*, /events/*, /leaderboard and / are blocked. Pick another.",
  duplicate: "That page slug already exists.",
  title: "Title must be at least 2 characters.",
  navLabel: "Nav label must be ≤40 characters.",
  invalid: "Invalid request.",
};

export default async function AdminPagesPage({ searchParams }: Props) {
  const session = await getSession();
  if (!session.isAdmin) redirect("/admin/login");

  const { error, created, updated, deleted, edit } = await searchParams;

  let pages: any[] = [];
  try {
    pages = await (prisma as any).page.findMany({ orderBy: { order: "asc" } });
  } catch {
    pages = [];
  }

  const editing = edit ? pages.find((p) => p.id === edit || p.slug === edit) : null;

  return (
    <div className="relative flex-1 px-6 pt-28 md:pt-36 pb-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-dots absolute inset-0 md:opacity-40" />
        <div className="absolute -left-40 top-0 w-[28rem] h-[28rem] bg-violet-500/10 rounded-full blur-[160px] animate-drift" />
        <div className="absolute -right-40 bottom-20 w-[30rem] h-[30rem] bg-sdg16/10 rounded-full blur-[170px] animate-drift-slow" />
        <span className="outline-text pointer-events-none select-none absolute -top-3 md:-top-5 right-0 font-heading text-[5rem] md:text-[9rem] font-black uppercase tracking-tight whitespace-nowrap [mask-image:linear-gradient(to_left,black_45%,transparent_90%)]" aria-hidden="true">
          Navigation
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="animate-rise-in mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            Pages & <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">Navigation</span>
          </h1>
          <p className="text-stone-950 dark:text-gray-400 text-sm max-w-2xl font-mono">
            DYNAMIC NAV &middot; {pages.length} PAGES &middot; CREATE → ORDER (UP/DOWN) → TOGGLE VISIBILITY &middot; CHANGES LIVE INSTANTLY (NO REBUILD)
          </p>
        </div>

        {error && (
          <div role="alert" className="animate-error-in flex items-start gap-2.5 px-4 py-3 rounded-xl mb-6 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-300 text-sm">
            {ERRORS[error] ?? error}
          </div>
        )}
        {created && (
          <div role="status" className="animate-error-in flex items-start gap-2.5 px-4 py-3 rounded-xl mb-6 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-sm">
            Page created — nav updates everywhere instantly.
          </div>
        )}
        {updated && (
          <div role="status" className="animate-error-in flex items-start gap-2.5 px-4 py-3 rounded-xl mb-6 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-sm">
            Page updated.
          </div>
        )}
        {deleted && (
          <div role="status" className="animate-error-in flex items-start gap-2.5 px-4 py-3 rounded-xl mb-6 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 text-sm">
            Page removed — nav updated.
          </div>
        )}

        {/* Create / Edit form */}
        <div className="animate-rise-in hard-shell mb-8" id="page-form">
          <div className="hard-core bg-white/70 dark:bg-[#0B0B0C]/80 backdrop-blur-sm p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 mb-1">
              <h2 className="font-heading text-lg font-bold text-gray-900 dark:text-white">{editing ? "Edit page" : "Add a page"}</h2>
              {editing && (
                <Link href="/admin/pages" className="px-3 py-1.5 rounded-full text-xs font-semibold border border-black/10 dark:border-white/10 bg-white dark:bg-black/40 hover:bg-black/5">
                  Cancel edit
                </Link>
              )}
            </div>
            <p className="text-xs text-stone-950 dark:text-gray-400 mb-6 font-mono">
              {editing ? `Editing “${editing.title}” — slug is the URL (e.g. /${editing.slug}).` : "Slug becomes the URL (e.g. about → /about). Reserved: /society/*, /admin/*, /events/*, /leaderboard, /."}
            </p>
            <form action={editing ? updatePage : createPage} className="space-y-4">
              {editing && <input type="hidden" name="id" value={editing.id} />}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">Slug (URL path)</span>
                  <input name="slug" required pattern="[a-z0-9][a-z0-9\-\/]{1,59}" defaultValue={editing?.slug ?? ""} placeholder="e.g. about or results/robo-war" className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 font-mono" />
                </label>
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">Title (page heading)</span>
                  <input name="title" required minLength={2} defaultValue={editing?.title ?? ""} placeholder="e.g. About BVEST" className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60" />
                </label>
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">Nav label (optional)</span>
                  <input name="navLabel" maxLength={40} defaultValue={editing?.navLabel ?? ""} placeholder="e.g. About (defaults to title)" className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60" />
                </label>
              </div>

              {!editing && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <label className="block">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">Section</span>
                    <select name="section" defaultValue="main" className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60">
                      <option value="main">main (top nav)</option>
                      <option value="portal">portal</option>
                      <option value="footer">footer</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">Order (optional)</span>
                    <input name="order" type="number" step={1} placeholder="auto" className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 font-mono" />
                  </label>
                  <div className="md:col-span-2 flex flex-wrap items-end gap-4 pb-1">
                    <label className="inline-flex items-center gap-2 text-sm font-medium text-stone-900 dark:text-gray-200 cursor-pointer">
                      <input type="hidden" name="showInNav" value="off" />
                      <input type="checkbox" name="showInNav" value="on" defaultChecked={true} className="w-4 h-4 rounded border-black/20 text-violet-600 focus:ring-violet-500" /> show in nav
                    </label>
                    <label className="inline-flex items-center gap-2 text-sm font-medium text-stone-900 dark:text-gray-200 cursor-pointer">
                      <input type="hidden" name="enabled" value="off" />
                      <input type="checkbox" name="enabled" value="on" defaultChecked={true} className="w-4 h-4 rounded border-black/20 text-violet-600 focus:ring-violet-500" /> enabled
                    </label>
                    <label className="inline-flex items-center gap-2 text-sm font-medium text-stone-900 dark:text-gray-200 cursor-pointer">
                      <input type="hidden" name="adminOnly" value="off" />
                      <input type="checkbox" name="adminOnly" value="on" defaultChecked={false} className="w-4 h-4 rounded border-black/20 text-violet-600 focus:ring-violet-500" /> admin only
                    </label>
                  </div>
                </div>
              )}

              {editing && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="block">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">Section</span>
                    <select name="section" defaultValue={editing.section ?? "main"} className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60">
                      <option value="main">main</option>
                      <option value="portal">portal</option>
                      <option value="footer">footer</option>
                    </select>
                  </label>
                  <div className="md:col-span-2 flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-gray-500 pt-7">
                    Use toggles/order in the table below for showInNav / enabled / adminOnly / ordering.
                  </div>
                </div>
              )}

              <button type="submit" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-stone-950 text-white dark:bg-white dark:text-stone-950 hover:opacity-90 transition-all duration-200 ease-fluid active:scale-[0.97] motion-reduce:active:scale-100">
                {editing ? "Update page" : "Create page"}
              </button>
            </form>
          </div>
        </div>

        {/* Pages list */}
        <div className="animate-rise-in hard-shell" style={{ animationDelay: "120ms" }}>
          <div className="hard-core bg-white/70 dark:bg-[#0B0B0C]/80 backdrop-blur-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="font-mono text-[11px] uppercase tracking-[0.15em] text-stone-500 dark:text-gray-400 font-semibold">
                    <th className="px-6 py-3.5 font-semibold border-b border-black/10 dark:border-white/10">Page</th>
                    <th className="px-6 py-3.5 font-semibold border-b border-black/10 dark:border-white/10">Order</th>
                    <th className="px-6 py-3.5 font-semibold border-b border-black/10 dark:border-white/10">Section</th>
                    <th className="px-6 py-3.5 font-semibold border-b border-black/10 dark:border-white/10">Nav</th>
                    <th className="px-6 py-3.5 font-semibold border-b border-black/10 dark:border-white/10">Enabled</th>
                    <th className="px-6 py-3.5 font-semibold border-b border-black/10 dark:border-white/10">Admin only</th>
                    <th className="px-6 py-3.5 font-semibold border-b border-black/10 dark:border-white/10 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5">
                  {pages.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-16 text-center">
                        <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone-950 dark:text-gray-500">
                          No pages yet &middot; add one above to extend the nav
                        </span>
                      </td>
                    </tr>
                  )}
                  {pages.map((p, idx) => {
                    const isEditing = editing?.id === p.id;
                    return (
                      <tr key={p.id} className={`animate-rise-in transition-colors duration-200 ease-fluid ${isEditing ? "bg-violet-500/10 dark:bg-violet-500/10" : "hover:bg-violet-500/[0.04] dark:hover:bg-white/[0.03]"}`} style={{ animationDelay: `${Math.min(220 + idx * 30, 700)}ms` }}>
                        <td className="px-6 py-4">
                          <span className="block font-semibold text-[14px] leading-tight text-stone-900 dark:text-white tracking-tight">{p.title}</span>
                          <span className="block font-mono text-[11px] text-stone-500 dark:text-gray-500 tracking-wider mt-1">
                            /{p.slug} {p.navLabel && <span className="text-violet-600 dark:text-violet-400">· nav: {p.navLabel}</span>}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="inline-flex items-center gap-1">
                            <span className="font-mono text-xs tabular-nums min-w-[1.5rem] text-center">{p.order}</span>
                            <form action={movePage} className="inline">
                              <input type="hidden" name="id" value={p.id} />
                              <input type="hidden" name="dir" value="up" />
                              <button type="submit" disabled={idx === 0} aria-label="Move up" className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs ${idx === 0 ? "opacity-30 cursor-not-allowed border-black/10 dark:border-white/10" : "border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"}`}>↑</button>
                            </form>
                            <form action={movePage} className="inline">
                              <input type="hidden" name="id" value={p.id} />
                              <input type="hidden" name="dir" value="down" />
                              <button type="submit" disabled={idx === pages.length - 1} aria-label="Move down" className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs ${idx === pages.length - 1 ? "opacity-30 cursor-not-allowed border-black/10 dark:border-white/10" : "border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"}`}>↓</button>
                            </form>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider border bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-stone-600 dark:text-gray-400">{p.section}</span>
                        </td>
                        {["showInNav", "enabled", "adminOnly"].map((field) => {
                          const val = p[field];
                          const on = !!val;
                          return (
                            <td key={field} className="px-6 py-4">
                              <form action={togglePageField} className="inline">
                                <input type="hidden" name="id" value={p.id} />
                                <input type="hidden" name="field" value={field} />
                                <button type="submit" aria-label={`Toggle ${field}`} className={`px-2.5 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider border transition-colors ${on ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400" : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-stone-500 dark:text-gray-500"}`}>
                                  {on ? "ON" : "OFF"}
                                </button>
                              </form>
                            </td>
                          );
                        })}
                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <Link href={`/admin/pages?edit=${p.id}#page-form`} className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${isEditing ? "bg-violet-600 text-white border-violet-600" : "bg-white dark:bg-black/40 border-black/10 dark:border-white/10 hover:border-violet-500/30 hover:text-violet-600"}`}>
                              {isEditing ? "Editing" : "Edit"} →
                            </Link>
                            <form action={deletePage} className="inline">
                              <input type="hidden" name="id" value={p.id} />
                              <button type="submit" className="px-3 py-1.5 rounded-full text-xs font-semibold border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/50">Delete</button>
                            </form>
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

        <div className="mt-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.03] p-4 text-xs font-mono leading-relaxed text-stone-600 dark:text-gray-400">
          <p className="font-bold text-stone-900 dark:text-white mb-1">How it works</p>
          <p>Pages with <span className="font-bold">showInNav + enabled</span> appear in the top island nav (merged after Goals/Events/Core Team/Society Portal/Contact). Dragless ordering via ↑/↓ swaps the <code className="bg-black/5 dark:bg-white/10 px-1 rounded">order</code> value. <span className="font-bold">adminOnly</span> links only render when an admin session cookie exists.</p>
          <p className="mt-2">Reserved slugs are blocked at creation: <code className="bg-black/5 dark:bg-white/10 px-1 rounded">/society/*</code>, <code className="bg-black/5 dark:bg-white/10 px-1 rounded">/admin/*</code>, <code className="bg-black/5 dark:bg-white/10 px-1 rounded">/events/*</code>, <code className="bg-black/5 dark:bg-white/10 px-1 rounded">/leaderboard</code>, <code className="bg-black/5 dark:bg-white/10 px-1 rounded">/</code>.</p>
        </div>
      </div>
    </div>
  );
}
