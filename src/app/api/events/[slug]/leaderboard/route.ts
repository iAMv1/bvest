import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const event = await prisma.event.findUnique({
      where: { slug },
      include: { hostSociety: { select: { id: true, name: true } }, results: { orderBy: { rank: "asc" } } },
    });
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });
    if (!event.resultsPublished) {
      return NextResponse.json({ event: { id: event.id, slug: event.slug, title: event.title, resultsPublished: false }, results: [], published: false });
    }
    return NextResponse.json({ event: { id: event.id, slug: event.slug, title: event.title, resultsPublished: true, publishedAt: event.publishedAt }, results: event.results, published: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed", details: String(e) }, { status: 500 });
  }
}
