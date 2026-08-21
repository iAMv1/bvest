export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getAllDomains } from "@/lib/get-domains";
import { createDomain, deleteDomain, bulkImportDomains } from "./actions";

interface Props {
  searchParams: Promise<{ error?: string; created?: string; deleted?: string; imported?: string }>;
}

const ERRORS: Record<string, string> = {
  invalid: "Check ID (2–40 lowercase), name (≥2), description (≥5).",
  duplicate: "That domain ID already exists.",
};

export default async function AdminDomainsPage({ searchParams }: Props) {
  const session = await getSession();
  if (!session.isAdmin) redirect("/admin/login");

  const { error, created, deleted, imported } = await searchParams;
  const domains = await getAllDomains();

  return (
    <div className="relative flex-1 px-6 pt-28 md:pt-36 pb-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-dots absolute inset-0 md:opacity-40" />
        <div className="absolute -right-40 top-10 w-[28rem] h-[28rem] bg-sdg3/10 rounded-full blur-[160px] animate-drift" />
        <span className="outline-text pointer-events-none select-none absolute -top-3 md:-top-5 right-0 font-heading text-[5rem] md:text-[9rem] font-black uppercase tracking-tight whitespace-nowrap [mask-image:linear-gradient(to_left,black_45%,transparent_90%)]" aria-hidden="true">
          Domains
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="animate-rise-in mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            Domain <span className="bg-gradient-to-r from-sdg3 to-sdg6 bg-clip-text text-transparent">Topics</span>
          </h1>
          <p className="text-stone-950 dark:text-gray-400 text-sm max-w-2xl font-mono">
            Real topics replace the 12 dummy ones. Upload CSV or JSON, or add one by one. Deployed instantly to the preference picker. {domains.length} ON FILE
          </p>
        </div>

        {error && ERRORS[error] && (
          <div role="alert" className="animate-error-in flex items-start gap-2.5 px-4 py-3 rounded-xl mb-6 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-300 text-sm">
            {ERRORS[error]}
          </div>
        )}
        {(created || deleted || imported) && (
          <div role="status" className="animate-error-in flex items-start gap-2.5 px-4 py-3 rounded-xl mb-6 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-sm">
            {created ? "Domain created." : deleted ? "Domain removed." : `${imported} domains imported.`}
          </div>
        )}

        {/* Bulk upload */}
        <div className="animate-rise-in hard-shell mb-8">
          <div className="hard-core bg-white/70 dark:bg-[#0B0B0C]/80 backdrop-blur-sm p-6 md:p-8">
            <h2 className="font-heading text-lg font-bold text-gray-900 dark:text-white mb-1">Bulk upload</h2>
            <p className="text-xs text-stone-950 dark:text-gray-400 mb-4 font-mono">
              Paste JSON array <code className="bg-black/5 dark:bg-white/10 px-1 rounded">{`[{"id":"ai-for-good","name":"AI for Good","description":"...","colorToken":"var(--color-sdg3)"}]`}</code> or CSV <code className="bg-black/5 dark:bg-white/10 px-1 rounded">id,name,description,colorToken</code>. Existing IDs are updated.
            </p>
            <form action={bulkImportDomains} className="space-y-4">
              <textarea name="json" rows={4} placeholder='[{"id":"ai-for-good","name":"AI for Good","description":"AI for SDG...","colorToken":"var(--color-sdg3)"}] or CSV lines' className="w-full rounded-xl px-4 py-3 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 font-mono" />
              <div className="flex flex-wrap items-center gap-3">
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border border-black/10 dark:border-white/10 bg-white dark:bg-black/40 cursor-pointer">
                  📎 Choose CSV/JSON file
                  <input type="file" name="file" accept=".csv,.json" className="hidden" />
                </label>
                <button type="submit" className="px-6 py-2 rounded-full text-sm font-semibold bg-stone-950 text-white dark:bg-white dark:text-stone-950 hover:opacity-90">
                  Import
                </button>
                <a href="data:text/csv;charset=utf-8,id%2Cname%2Cdescription%2CcolorToken%0Aai-for-good%2CAI%20for%20Good%2CAI%20for%20SDG%20challenges%2Cvar(--color-sdg3)" download="domains-template.csv" className="text-xs text-violet-600 dark:text-violet-400 underline">
                  Download CSV template
                </a>
              </div>
            </form>
          </div>
        </div>

        {/* Single create */}
        <div className="animate-rise-in hard-shell mb-8">
          <div className="hard-core bg-white/70 dark:bg-[#0B0B0C]/80 backdrop-blur-sm p-6 md:p-8">
            <h2 className="font-heading text-sm font-bold text-gray-900 dark:text-white mb-4">Add single domain</h2>
            <form action={createDomain} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="block">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 font-mono mb-1.5">ID (slug)</span>
                <input name="id" required pattern="[a-z0-9][a-z0-9-]{1,39}" placeholder="ai-for-good" className="w-full rounded-xl px-3 py-2 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 font-mono" />
              </label>
              <label className="block">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 font-mono mb-1.5">Name</span>
                <input name="name" required placeholder="AI for Good" className="w-full rounded-xl px-3 py-2 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10" />
              </label>
              <label className="block md:col-span-2">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 font-mono mb-1.5">Description</span>
                <input name="description" required placeholder="AI solutions for SDG..." className="w-full rounded-xl px-3 py-2 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10" />
              </label>
              <label className="block">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 font-mono mb-1.5">Color (optional)</span>
                <input name="colorToken" placeholder="var(--color-sdg3)" className="w-full rounded-xl px-3 py-2 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 font-mono" />
              </label>
              <div className="flex items-end">
                <button type="submit" className="px-6 py-2 rounded-full text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700">Add</button>
              </div>
            </form>
          </div>
        </div>

        {/* List */}
        <div className="animate-rise-in hard-shell">
          <div className="hard-core bg-white/70 dark:bg-[#0B0B0C]/80 backdrop-blur-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="font-mono text-[11px] uppercase tracking-[0.15em] text-stone-500 dark:text-gray-400 font-semibold">
                    <th className="px-6 py-3.5 font-semibold border-b border-black/10 dark:border-white/10">ID</th>
                    <th className="px-6 py-3.5 font-semibold border-b border-black/10 dark:border-white/10">Name</th>
                    <th className="px-6 py-3.5 font-semibold border-b border-black/10 dark:border-white/10">Description</th>
                    <th className="px-6 py-3.5 font-semibold border-b border-black/10 dark:border-white/10 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5">
                  {domains.map((d) => (
                    <tr key={d.id} className="hover:bg-violet-500/[0.04]">
                      <td className="px-6 py-3 font-mono text-xs">{d.id}</td>
                      <td className="px-6 py-3 font-medium flex items-center gap-2"><span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.colorToken }} />{d.name}</td>
                      <td className="px-6 py-3 text-xs text-stone-600 dark:text-gray-400 max-w-[320px] truncate">{d.description}</td>
                      <td className="px-6 py-3 text-right">
                        <form action={deleteDomain} className="inline">
                          <input type="hidden" name="id" value={d.id} />
                          <button type="submit" className="px-3 py-1 rounded-full text-xs border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50">Delete</button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
