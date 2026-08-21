import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: { hostSociety: { select: { id: true, name: true, kind: true } }, results: { orderBy: { rank: "asc" } } },
      orderBy: { createdAt: "desc" },
    });
    // Public: hide drafts unless needed — return all but mark status; frontend filters
    return NextResponse.json({ events });
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch events", details: String(e) }, { status: 500 });
  }
}
