import type { Page } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { normalizeSlug, isReservedSlug } from "@/lib/nav";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export default async function DynamicPage({ params }: Props) {
  const { slug: slugParts } = await params;
  if (!slugParts || slugParts.length === 0) return notFound();
  const raw = slugParts.join("/");
  const slug = normalizeSlug(raw);

  // Let specific routes handle their own slugs; but if someone navigates to a reserved prefix that is not a defined route, 404
  // We still allow Page lookup to naturally 404 for reserved slugs (they can never be created)
  if (isReservedSlug(slug)) return notFound();

  let page: Page | null = null;
  try {
    page = await prisma.page.findUnique({ where: { slug } });
  } catch {
    return notFound();
  }

  if (!page || !page.enabled) return notFound();

  if (page.adminOnly) {
    try {
      const session = await getSession();
      if (!session.isAdmin) redirect("/admin/login");
    } catch {
      redirect("/admin/login");
    }
  }

  return (
    <div className="relative flex-1 px-6 pt-28 md:pt-36 pb-16 overflow-hidden min-h-[60vh]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-dots absolute inset-0 md:opacity-40" />
        <div className="absolute -left-40 top-10 w-[28rem] h-[28rem] bg-violet-500/10 rounded-full blur-[160px] animate-drift" />
        <div className="absolute -right-40 bottom-10 w-[30rem] h-[30rem] bg-sdg6/10 rounded-full blur-[150px] animate-drift-slow" />
        <span className="outline-text pointer-events-none select-none absolute -top-3 md:-top-5 right-0 font-heading text-[4rem] md:text-[8rem] font-black uppercase tracking-tight whitespace-nowrap [mask-image:linear-gradient(to_left,black_45%,transparent_90%)]" aria-hidden="true">
          {page.title.slice(0, 12)}
        </span>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="animate-rise-in hard-shell">
          <div className="hard-core bg-white/70 dark:bg-[#0B0B0C]/80 backdrop-blur-sm p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase font-mono border bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/20">Page</span>
              <span className="font-mono text-xs text-stone-500 dark:text-gray-500">/{page.slug}</span>
              {page.adminOnly && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white">admin only</span>}
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono border bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10">{page.section}</span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-white mb-3">{page.title}</h1>
            {page.navLabel && page.navLabel !== page.title && (
              <p className="text-sm font-mono text-violet-600 dark:text-violet-400 mb-6">Nav label: {page.navLabel}</p>
            )}
            <div className="prose prose-stone dark:prose-invert max-w-none">
              <p className="text-stone-700 dark:text-gray-300 leading-relaxed">
                This is a dynamic page managed from <code className="bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono text-xs">/admin/pages</code>. Add richer content (blocks, markdown) in a future iteration — for now the title and nav presence are live.
              </p>
              <div className="mt-6 rounded-2xl border border-dashed border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-6">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500 mb-2">Content placeholder</p>
                <p className="text-sm text-stone-600 dark:text-gray-400">Replace this stub with your CMS block or markdown renderer when ready. Sort via <span className="font-semibold">order</span>, toggle <span className="font-semibold">showInNav / enabled / adminOnly</span> from the admin manager — no redeploy needed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
