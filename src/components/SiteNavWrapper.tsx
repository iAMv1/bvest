import { getSession } from "@/lib/session";
import { getNavLinks, CORE_NAV_LINKS } from "@/lib/nav";
import { SiteNav } from "@/components/SiteNav";

export async function SiteNavWrapper() {
  let dynamicLinks: { href: string; label: string; adminOnly?: boolean }[] = [];
  try {
    const session = await getSession().catch(() => ({ isAdmin: false } as any));
    const isAdmin = !!session?.isAdmin;
    const all = await getNavLinks({ isAdmin });
    const coreHrefs = new Set<string>(CORE_NAV_LINKS.map((c) => c.href));
    dynamicLinks = all.filter((l) => !coreHrefs.has(l.href as string));
  } catch {
    dynamicLinks = [];
  }
  return <SiteNav dynamicLinks={dynamicLinks} />;
}
