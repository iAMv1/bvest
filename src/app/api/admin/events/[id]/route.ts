import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";
const STATUSES = ["DRAFT", "PENDING", "CONFIRMED", "LIVE", "COMPLETED"];

async function requireAdmin() {
  const s = await getSession();
  return !!s.isAdmin;
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id }, include: { hostSociety: true, results: { orderBy: { rank: "asc" } } } });
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ event });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  const data: Record<string, unknown> = {};
  if (body.title !== undefined) data.title = String(body.title).trim();
  if (body.slug !== undefined) data.slug = String(body.slug).trim().toLowerCase();
  if (body.sdgDomainId !== undefined) data.sdgDomainId = String(body.sdgDomainId);
  if (body.description !== undefined) data.description = String(body.description).trim();
  if (body.venue !== undefined) data.venue = body.venue ? String(body.venue).trim() : null;
  if (body.hostSocietyId !== undefined) data.hostSocietyId = body.hostSocietyId ? String(body.hostSocietyId).trim() : null;
  if (body.status !== undefined && STATUSES.includes(body.status)) data.status = body.status;
  if (body.registrationUrl !== undefined) data.registrationUrl = body.registrationUrl ? String(body.registrationUrl).trim() : null;
  if (body.startDate !== undefined) data.startDate = body.startDate ? new Date(body.startDate) : null;
  if (body.endDate !== undefined) data.endDate = body.endDate ? new Date(body.endDate) : null;
  if (body.resultsPublished !== undefined) data.resultsPublished = !!body.resultsPublished;

  try {
    const event = await prisma.event.update({ where: { id }, data });
    return NextResponse.json({ event });
  } catch (e) {
    return NextResponse.json({ error: "Update failed", details: String(e) }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    await prisma.event.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Delete failed", details: String(e) }, { status: 400 });
  }
}
