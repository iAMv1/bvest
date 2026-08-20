import { prisma } from "@/lib/db";

export type LandingEvent = {
  id: string;
  slug: string;
  title: string;
  sdgDomainId: string;
  description: string;
  venue: string | null;
  hostSocietyId: string | null;
  hostSociety: { id: string; name: string; kind: string } | null;
  status: string;
  startDate: Date | null;
  endDate: Date | null;
  registrationUrl: string | null;
};

// Live events are the source of truth for landing auto-update
const LIVE_STATUSES = ["CONFIRMED", "LIVE"] as const;

export async function getLandingEvents(): Promise<LandingEvent[]> {
  return prisma.event.findMany({
    where: { status: { in: [...LIVE_STATUSES] } },
    include: { hostSociety: { select: { id: true, name: true, kind: true } } },
    orderBy: [{ status: "desc" }, { createdAt: "desc" }],
  });
}

export function eventForSdg(events: LandingEvent[], sdgNumber: number): LandingEvent | undefined {
  const id = String(sdgNumber);
  // Prefer LIVE over CONFIRMED
  return (
    events.find((e) => e.sdgDomainId === id && e.status === "LIVE") ??
    events.find((e) => e.sdgDomainId === id && e.status === "CONFIRMED")
  );
}

export function featuredEvents(events: LandingEvent[], limit = 3): LandingEvent[] {
  if (events.length === 0) return [];
  // LIVE first, then CONFIRMED, newest first — already sorted
  return events.slice(0, limit);
}
