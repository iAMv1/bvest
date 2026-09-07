import { prisma } from "@/lib/db";
import { domains as fallbackDomains, type Domain } from "@/lib/domains";

export async function getAllDomains(): Promise<Domain[]> {
  const map = new Map<string, Domain>();

  // Always seed fallback domains first
  for (const d of fallbackDomains) {
    map.set(d.id, d);
  }

  try {
    const dbDomains = await prisma.domain.findMany({ orderBy: { name: "asc" } });
    for (const d of dbDomains) {
      map.set(d.id, d as Domain);
    }
  } catch {
    // DB not ready or table missing — fallback map is already populated
  }

  return Array.from(map.values());
}
