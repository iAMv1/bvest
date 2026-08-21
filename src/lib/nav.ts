import { prisma } from "@/lib/db";

export const CORE_NAV_LINKS = [
  { href: "/#goals", label: "Goals" },
  { href: "/#featured-events", label: "Events" },
  { href: "/#core-team", label: "Core Team" },
  { href: "/society/login", label: "Society Portal" },
  { href: "/#contact", label: "Contact" },
] as const;

export type NavLink = { href: string; label: string; adminOnly?: boolean; id?: string };

export function normalizeSlug(raw: string): string {
  return raw.trim().toLowerCase().replace(/^\/+|\/+$/g, "");
}

export function isReservedSlug(raw: string): boolean {
  const slug = normalizeSlug(raw);
  if (!slug) return true; // "/" or empty
  if (slug === "leaderboard") return true;
  if (slug === "society" || slug.startsWith("society/")) return true;
  if (slug === "admin" || slug.startsWith("admin/")) return true;
  if (slug === "events" || slug.startsWith("events/")) return true;
  // also block api/_next/favicon etc. defensively
  if (slug.startsWith("api/") || slug === "api") return true;
  return false;
}

export const PAGE_SLUG_RE = /^[a-z0-9][a-z0-9\-\/]{1,59}$/;
// no leading/trailing slash, no double slash
export function isValidPageSlug(raw: string): boolean {
  const slug = normalizeSlug(raw);
  if (!PAGE_SLUG_RE.test(slug)) return false;
  if (slug.includes("//")) return false;
  if (slug.startsWith("-") || slug.endsWith("-")) return false;
  if (slug.startsWith("/") || slug.endsWith("/")) return false;
  // each segment must be valid
  const segs = slug.split("/");
  for (const s of segs) {
    if (!/^[a-z0-9][a-z0-9\-]*$/.test(s)) return false;
    if (s.length < 1 || s.length > 60) return false;
  }
  return true;
}

export type PageRow = {
  id: string;
  slug: string;
  title: string;
  navLabel: string | null;
  order: number;
  showInNav: boolean;
  adminOnly: boolean;
  section: string;
  enabled: boolean;
  createdAt: Date;
};

export async function getDynamicPages(): Promise<PageRow[]> {
  try {
    return await prisma.page.findMany({
      where: { enabled: true, showInNav: true },
      orderBy: { order: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getAllPages(): Promise<PageRow[]> {
  try {
    return await prisma.page.findMany({ orderBy: { order: "asc" } });
  } catch {
    return [];
  }
}

export async function getNavLinks(opts?: { isAdmin?: boolean }): Promise<NavLink[]> {
  const isAdmin = !!opts?.isAdmin;
  let dynamic: PageRow[] = [];
  try {
    const pages: PageRow[] = await prisma.page.findMany({
      where: { enabled: true, showInNav: true },
      orderBy: { order: "asc" },
    });
    dynamic = pages.filter((p) => (p.adminOnly ? isAdmin : true));
  } catch {
    dynamic = [];
  }

  const dynamicLinks: NavLink[] = dynamic.map((p) => ({
    href: `/${normalizeSlug(p.slug)}`,
    label: (p.navLabel?.trim() || p.title).trim(),
    adminOnly: p.adminOnly,
    id: p.id,
  }));

  // Merge: core anchors stay first, then dynamic route pages
  return [...CORE_NAV_LINKS.map((c) => ({ ...c })), ...dynamicLinks];
}

export async function getNavLinksSplit(opts?: { isAdmin?: boolean }): Promise<{ core: NavLink[]; dynamic: NavLink[]; all: NavLink[] }> {
  const all = await getNavLinks(opts);
  const coreHrefs = new Set<string>(CORE_NAV_LINKS.map((c) => c.href));
  const dynamic = all.filter((l) => !coreHrefs.has(l.href as string));
  const core = all.filter((l) => coreHrefs.has(l.href as string));
  return { core, dynamic, all };
}
