export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { EventLineupSection } from "@/components/EventLineupSection";

export const metadata: Metadata = {
  title: "Events Lineup",
  description: "Browse all official competitions, hackathons, and challenges for BVEST XIII 2026 across October 22 & 23.",
};

export default function EventsPage() {
  return (
    <div className="relative flex-1 px-6 pt-28 md:pt-36 pb-20 overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-dots absolute inset-0 md:opacity-40" />
        <div className="absolute -left-40 top-0 w-[28rem] h-[28rem] bg-sdg6/10 rounded-full blur-[160px] animate-drift" />
        <div className="absolute -right-40 top-1/3 w-[30rem] h-[30rem] bg-sdg3/10 rounded-full blur-[180px] animate-drift-slow" />
        <span
          className="outline-text pointer-events-none select-none absolute -top-3 md:-top-5 right-0 font-heading text-[5rem] md:text-[9rem] font-black uppercase tracking-tight whitespace-nowrap [mask-image:linear-gradient(to_left,black_45%,transparent_90%)]"
          aria-hidden="true"
        >
          Events
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <EventLineupSection showHeroBanner={true} />
      </div>
    </div>
  );
}
