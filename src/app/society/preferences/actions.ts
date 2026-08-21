"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

interface Selection {
  domainId: string;
  rank: number; // 1, 2, or 3
}

export async function submitPreferences(
  selections: Selection[]
): Promise<{ ok: true } | { ok: false; error: string }> {
  const session = await getSession();
  if (!session.societyId) {
    return { ok: false, error: "Not authenticated." };
  }
  const societyId = session.societyId as string;

  if (selections.length !== 3) {
    return { ok: false, error: "Exactly 3 preferences required." };
  }

  const ranks = selections.map((s) => s.rank).sort();
  if (JSON.stringify(ranks) !== JSON.stringify([1, 2, 3])) {
    return { ok: false, error: "Ranks must be 1, 2, and 3." };
  }

  // Validate against DB domains first, fallback to static domains file
  const dbDomains = await prisma.domain.findMany({ select: { id: true } }).catch(() => []);
  const allowedIds = dbDomains.length > 0 ? dbDomains.map((d) => d.id) : (await import("@/lib/domains")).domains.map((d) => d.id);
  const allowed = new Set(allowedIds);
  for (const s of selections) {
    if (!allowed.has(s.domainId)) return { ok: false, error: "Invalid domain selected." };
  }

  const society = await prisma.society.findUnique({
    where: { id: societyId },
  });

  if (!society) return { ok: false, error: "Society not found." };
  if (society.locked) return { ok: false, error: "Preferences already locked." };

  await prisma.$transaction([
    // Clear any previous partial attempts
    prisma.preference.deleteMany({ where: { societyId } }),
    // Insert new ranked preferences
    prisma.preference.createMany({
      data: selections.map((s) => ({
        societyId,
        domainId: s.domainId,
        rank: s.rank,
      })),
    }),
    // Lock the society
    prisma.society.update({
      where: { id: societyId },
      data: { locked: true, submittedAt: new Date() },
    }),
  ]);

  revalidatePath("/society/preferences");
  return { ok: true };
}
