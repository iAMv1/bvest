import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const s = await getSession();
  return !!s.isAdmin;
}

// Manage a single EventResult by its id
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const result = await prisma.eventResult.findUnique({ where: { id }, include: { event: { select: { id: true, slug: true, title: true } } } });
  if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ result });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  const data: Record<string, unknown> = {};
  if (body.teamName !== undefined) data.teamName = String(body.teamName).trim();
  if (body.rank !== undefined) data.rank = parseInt(String(body.rank), 10);
  if (body.points !== undefined) data.points = body.points === null || body.points === "" ? null : parseInt(String(body.points), 10);
  if (data.teamName !== undefined && String(data.teamName).length === 0) return NextResponse.json({ error: "teamName required" }, { status: 400 });
  if (data.rank !== undefined && ![1, 2, 3].includes(data.rank as number)) return NextResponse.json({ error: "rank must be 1-3" }, { status: 400 });
  try {
    const result = await prisma.eventResult.update({ where: { id }, data });
    return NextResponse.json({ result });
  } catch (e) {
    return NextResponse.json({ error: "Update failed", details: String(e) }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    await prisma.eventResult.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Delete failed", details: String(e) }, { status: 400 });
  }
}
