import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { sdgData } from "@/lib/sdg-data";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;

  // First, try to find event by slug (event detail)
  const event = await prisma.event.findUnique({
    where: { slug },
    include: { hostSociety: true },
  });

  if (event) {
    const sdg = sdgData.find((s) => String(s.number) === event.sdgDomainId);
    const isLive = event.status === "LIVE" || event.status === "CONFIRMED";
    return (
      <div className="flex flex-col min-h-screen">
        <section className="relative overflow-hidden bg-background pt-24 pb-12">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="bg-dots absolute inset-0 md:opacity-40" />
            <div className="absolute top-0 -left-40 w-[28rem] h-[28rem] rounded-full blur-[160px]" style={{ backgroundColor: sdg?.hex ? `${sdg.hex}22` : undefined }} />
          </div>
          <div className="relative max-w-4xl mx-auto px-6">
            <Link href="/#featured-events" className="inline-flex items-center gap-2 text-sm text-stone-600 dark:text-gray-400 hover:text-stone-900 dark:hover:text-white mb-6">
              ← Back to events
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {sdg && (
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border" style={{ backgroundColor: `${sdg.hex}18`, borderColor: `${sdg.hex}40`, color: sdg.hex }}>
                  Goal {sdg.number} — {sdg.name}
                </span>
              )}
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${event.status === "LIVE" ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-700 dark:text-emerald-400" : event.status === "CONFIRMED" ? "bg-violet-500/10 border-violet-500/25 text-violet-700 dark:text-violet-300" : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10"}`}>
                {event.status}
              </span>
              {event.hostSociety && <span className="text-xs text-stone-600 dark:text-gray-400">Hosted by <strong>{event.hostSociety.name}</strong></span>}
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-white mb-4">{event.title}</h1>
            {sdg && <div className="w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center mb-6" style={{ backgroundColor: sdg.hex }}><Image src={sdg.imageUrl} alt="" width={56} height={56} className="w-full h-full object-contain p-1.5" /></div>}
            <p className="text-stone-700 dark:text-gray-300 leading-relaxed mb-6">{event.description}</p>
            <div className="flex flex-wrap gap-3 text-sm">
              {event.venue && <span className="px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">📍 {event.venue}</span>}
              {event.startDate && <span className="px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">🗓 {new Date(event.startDate).toLocaleDateString()} {event.endDate ? `— ${new Date(event.endDate).toLocaleDateString()}` : ""}</span>}
            </div>
            {event.registrationUrl && isLive && (
              <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 text-white dark:bg-white dark:text-black font-semibold hover:opacity-90">
                Register now — {new URL(event.registrationUrl).hostname} ↗
              </a>
            )}
            {!isLive && <p className="mt-6 text-sm text-amber-700 dark:text-amber-400">This event is still in {event.status} — details will be confirmed soon.</p>}
          </div>
        </section>
      </div>
    );
  }

  // Fallback: treat slug as SDG number (goal page)
  const sdgNum = Number(slug);
  if (!Number.isNaN(sdgNum) && sdgNum >= 1 && sdgNum <= 17) {
    const sdg = sdgData.find((s) => s.number === sdgNum)!;
    const events = await prisma.event.findMany({
      where: { sdgDomainId: String(sdgNum), status: { in: ["CONFIRMED", "LIVE"] } },
      include: { hostSociety: true },
      orderBy: { createdAt: "desc" },
    });
    return (
      <div className="flex flex-col min-h-screen">
        <section className="relative overflow-hidden bg-background pt-24 pb-12">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="bg-dots absolute inset-0 md:opacity-40" />
            <div className="absolute top-0 -left-40 w-[28rem] h-[28rem] rounded-full blur-[160px]" style={{ backgroundColor: `${sdg.hex}22` }} />
          </div>
          <div className="relative max-w-4xl mx-auto px-6">
            <Link href="/#goals" className="inline-flex items-center gap-2 text-sm text-stone-600 dark:text-gray-400 hover:text-stone-900 dark:hover:text-white mb-6">
              ← Back to goals
            </Link>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center shrink-0" style={{ backgroundColor: sdg.hex }}><Image src={sdg.imageUrl} alt="" width={64} height={64} className="w-full h-full object-contain p-2" /></div>
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-white">Goal {sdg.number}: {sdg.name}</h1>
                <p className="text-stone-600 dark:text-gray-400">Events in this SDG domain</p>
              </div>
            </div>
            {events.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-black/20 dark:border-white/20 p-8 text-center">
                <p className="text-stone-600 dark:text-gray-400">No confirmed events yet for this goal — check back soon.</p>
                <p className="text-xs text-stone-500 mt-2">Admin can create one at <code className="bg-black/5 dark:bg-white/5 px-1 rounded">/admin/events</code> with SDG {sdgNum} and status CONFIRMED.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {events.map((ev) => (
                  <Link key={ev.id} href={`/events/${ev.slug}`} className="block rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-5 hover:bg-black/[0.02] dark:hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${ev.status === "LIVE" ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-700" : "bg-violet-500/10 border-violet-500/25 text-violet-700"}`}>{ev.status}</span>
                      {ev.hostSociety && <span className="text-xs text-stone-600 dark:text-gray-400">Hosted by {ev.hostSociety.name}</span>}
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-stone-900 dark:text-white">{ev.title}</h3>
                    <p className="text-sm text-stone-600 dark:text-gray-400 mt-1 line-clamp-2">{ev.description}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  return notFound();
}
