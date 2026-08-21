import { prisma } from "@/lib/db";
import { domains as fallbackDomains, type Domain } from "@/lib/domains";

export async function getAllDomains(): Promise<Domain[]> {
  try {
    const dbDomains = await prisma.domain.findMany({ orderBy: { name: "asc" } });
    if (dbDomains.length > 0) return dbDomains as Domain[];
  } catch {
    // DB not ready or table missing — fallback
  }
  return fallbackDomains;
}
