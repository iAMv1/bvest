import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const s = await getSession();
  return !!s.isAdmin;
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id }, include: { results: { orderBy: { rank: "asc" } } } });
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ eventId: id, resultsPublished: event.resultsPublished, publishedAt: event.publishedAt, results: event.results });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

  // body.results: [{rank, teamName, points}]
  const results: Array<{ rank: number; teamName: string; points?: number | null }> = body.results ?? [];
  const publish = body.publish === true;
  const unpublish = body.unpublish === true;

  if (Array.isArray(results)) {
    for (const r of results) {
      const rank = Number(r.rank);
      const teamName = String(r.teamName ?? "").trim();
      if (![1, 2, 3].includes(rank)) continue;
      if (!teamName) {
        await prisma.eventResult.deleteMany({ where: { eventId: id, rank } });
        continue;
      }
      const points = r.points != null && String(r.points) !== "" ? parseInt(String(r.points), 10) : null;
      await prisma.eventResult.upsert({
        where: { eventId_rank: { eventId: id, rank } },
        create: { eventId: id, rank, teamName, points: Number.isNaN(points as number) ? null : points },
        update: { teamName, points: Number.isNaN(points as number) ? null : points },
      });
    }
  }

  if (publish) {
    const count = await prisma.eventResult.count({ where: { eventId: id } });
    if (count === 0) return NextResponse.json({ error: "No results to publish" }, { status: 400 });
    await prisma.event.update({ where: { id }, data: { resultsPublished: true, publishedAt: new Date(), status: "COMPLETED" } });
  } else if (unpublish) {
    await prisma.event.update({ where: { id }, data: { resultsPublished: false, publishedAt: null } });
  } else if (body.resultsPublished !== undefined) {
    await prisma.event.update({ where: { id }, data: { resultsPublished: !!body.resultsPublished, publishedAt: body.resultsPublished ? new Date() : null } });
  }

  const updated = await prisma.event.findUnique({ where: { id }, include: { results: { orderBy: { rank: "asc" } } } });
  return NextResponse.json({ event: updated });
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  return PUT(req, ctx);
}
