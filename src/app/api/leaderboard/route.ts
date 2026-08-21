import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

// Global leaderboard: aggregate published EventResults across all events.
// Scoring: rank 1 = 3 pts, rank 2 = 2, rank 3 = 1 + explicit points if present (sum).
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      where: { resultsPublished: true },
      include: { results: true, hostSociety: { select: { id: true, name: true } } },
    });
    const byTeam = new Map<string, { teamName: string; gold: number; silver: number; bronze: number; events: number; totalPoints: number; rawPoints: number }>();
    for (const ev of events) {
      for (const r of ev.results) {
        const key = r.teamName.trim();
        if (!key) continue;
        if (!byTeam.has(key)) byTeam.set(key, { teamName: key, gold: 0, silver: 0, bronze: 0, events: 0, totalPoints: 0, rawPoints: 0 });
        const t = byTeam.get(key)!;
        if (r.rank === 1) t.gold++;
        else if (r.rank === 2) t.silver++;
        else if (r.rank === 3) t.bronze++;
        t.events++;
        const rankScore = r.rank === 1 ? 3 : r.rank === 2 ? 2 : 1;
        t.totalPoints += rankScore + (r.points ?? 0);
        t.rawPoints += r.points ?? 0;
      }
    }
    const leaderboard = [...byTeam.values()].sort((a, b) => b.totalPoints - a.totalPoints || b.gold - a.gold || a.teamName.localeCompare(b.teamName));
    // Also return per-event podiums for detail
    const podiums = events.map((ev) => ({ eventId: ev.id, slug: ev.slug, title: ev.title, sdgDomainId: ev.sdgDomainId, results: ev.results.sort((a, b) => a.rank - b.rank) }));
    return NextResponse.json({ leaderboard, podiums, eventsCount: events.length });
  } catch (e) {
    return NextResponse.json({ error: "Failed", details: String(e) }, { status: 500 });
  }
}
