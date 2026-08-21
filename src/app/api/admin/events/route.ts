import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { sdgData } from "@/lib/sdg-data";

export const dynamic = "force-dynamic";
const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,59}$/;
const STATUSES = ["DRAFT", "PENDING", "CONFIRMED", "LIVE", "COMPLETED"] as const;

async function requireAdmin() {
  const s = await getSession();
  if (!s.isAdmin) return false;
  return true;
}

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const events = await prisma.event.findMany({ include: { hostSociety: true, results: { orderBy: { rank: "asc" } } }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ events });
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  const title = String(body.title ?? "").trim();
  const slug = String(body.slug ?? "").trim().toLowerCase();
  const sdgDomainId = String(body.sdgDomainId ?? "").trim();
  const description = String(body.description ?? "").trim();
  const venue = body.venue ? String(body.venue).trim() : null;
  const hostSocietyId = body.hostSocietyId ? String(body.hostSocietyId).trim() : null;
  const status = STATUSES.includes(body.status) ? body.status : "DRAFT";
  const registrationUrl = body.registrationUrl ? String(body.registrationUrl).trim() : null;

  if (title.length < 3) return NextResponse.json({ error: "title" }, { status: 400 });
  if (!SLUG_RE.test(slug)) return NextResponse.json({ error: "slug" }, { status: 400 });
  if (!sdgData.some((s) => String(s.number) === sdgDomainId)) return NextResponse.json({ error: "sdg" }, { status: 400 });
  if (description.length < 10) return NextResponse.json({ error: "description" }, { status: 400 });

  const exists = await prisma.event.findUnique({ where: { slug } });
  if (exists) return NextResponse.json({ error: "duplicate" }, { status: 409 });

  const event = await prisma.event.create({ data: { title, slug, sdgDomainId, description, venue, hostSocietyId, status, registrationUrl } });
  return NextResponse.json({ event }, { status: 201 });
}
