"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { FEST_EVENTS, FestEvent } from "@/data/festEvents";

interface EventLineupSectionProps {
  initialDay?: "all" | "2026-10-22" | "2026-10-23";
  showHeroBanner?: boolean;
}

export const EventLineupSection: React.FC<EventLineupSectionProps> = ({
  initialDay = "all",
  showHeroBanner = true,
}) => {
  const [activeTab, setActiveTab] = useState<"all" | "2026-10-22" | "2026-10-23">(initialDay);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = useMemo(() => {
    return FEST_EVENTS.filter((event) => {
      const matchesDay = activeTab === "all" || event.date === activeTab;
      const matchesSearch =
        !searchQuery.trim() ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.category && event.category.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesDay && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const oct22List = useMemo(
    () => filteredEvents.filter((e) => e.date === "2026-10-22"),
    [filteredEvents]
  );
  const oct23List = useMemo(
    () => filteredEvents.filter((e) => e.date === "2026-10-23"),
    [filteredEvents]
  );

  return (
    <div className="w-full">
      {/* Hero Banner / Headline */}
      {showHeroBanner && (
        <div className="relative mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sdg6/15 text-sdg6 font-mono text-xs font-bold uppercase tracking-widest mb-4 border border-sdg6/30">
            <span className="w-2 h-2 rounded-full bg-sdg6 animate-pulse" />
            Lineup Revealed &middot; BVEST XIII
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Official{" "}
            <span className="text-sdg6">
              Event Lineup
            </span>
          </h2>
          <p className="mt-4 text-stone-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
            Explore 20 premier competitions, hackathons, and challenges scheduled across October 22 &amp; 23, 2026. Register now on Unstop to secure your spot.
          </p>
        </div>
      )}

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-black/10 dark:border-white/10">
        {/* Day Pills */}
        <div className="flex items-center gap-2 p-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 w-full sm:w-auto overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 shrink-0 ${
              activeTab === "all"
                ? "bg-stone-900 text-white dark:bg-white dark:text-stone-950 shadow-md"
                : "text-stone-600 dark:text-gray-400 hover:text-stone-900 dark:hover:text-white"
            }`}
          >
            All Events ({FEST_EVENTS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("2026-10-22")}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 shrink-0 ${
              activeTab === "2026-10-22"
                ? "bg-stone-900 text-white dark:bg-white dark:text-stone-950 shadow-md"
                : "text-stone-600 dark:text-gray-400 hover:text-stone-900 dark:hover:text-white"
            }`}
          >
            October 22 &middot; Day 1 (11)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("2026-10-23")}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 shrink-0 ${
              activeTab === "2026-10-23"
                ? "bg-stone-900 text-white dark:bg-white dark:text-stone-950 shadow-md"
                : "text-stone-600 dark:text-gray-400 hover:text-stone-900 dark:hover:text-white"
            }`}
          >
            October 23 &middot; Day 2 (9)
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <svg
            className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events or topics..."
            className="w-full pl-9 pr-4 py-2 rounded-full text-xs bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-sdg6/50 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-900 dark:hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* No Results */}
      {filteredEvents.length === 0 && (
        <div className="rounded-3xl border border-dashed border-black/10 dark:border-white/10 p-12 text-center my-8">
          <p className="text-stone-600 dark:text-gray-400 font-medium">No events found matching your search.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setActiveTab("all");
            }}
            className="mt-3 text-xs font-bold text-sdg6 hover:underline"
          >
            Reset filters
          </button>
        </div>
      )}

      {/* SECTION 1: October 22, 2026 (Day 1) */}
      {(activeTab === "all" || activeTab === "2026-10-22") && oct22List.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-sdg6/15 border border-sdg6/30 flex items-center justify-center text-sdg6 font-bold font-mono text-sm shrink-0">
              22
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sdg6">
                  Day 1
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-stone-700" />
                <span className="text-xs text-stone-500 font-medium">
                  {oct22List.length} Competitions
                </span>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-stone-900 dark:text-white tracking-tight">
                October 22, 2026 Lineup
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {oct22List.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: October 23, 2026 (Day 2) */}
      {(activeTab === "all" || activeTab === "2026-10-23") && oct23List.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-sdg7/15 border border-sdg7/30 flex items-center justify-center text-sdg7 font-bold font-mono text-sm shrink-0">
              23
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500 dark:text-amber-400">
                  Day 2
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-stone-700" />
                <span className="text-xs text-stone-500 font-medium">
                  {oct23List.length} Competitions
                </span>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-stone-900 dark:text-white tracking-tight">
                October 23, 2026 Lineup
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {oct23List.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ── Event Card Component ────────────────────────────────────────────────
const EventCard: React.FC<{ event: FestEvent }> = ({ event }) => {
  return (
    <div className="group hard-shell flex flex-col h-full transition-transform duration-300 hover:-translate-y-1">
      <div className="hard-core bg-white/95 dark:bg-[#0B0B0C]/95 backdrop-blur-md p-5 flex flex-col h-full rounded-[1.65rem] border border-black/5 dark:border-white/5 shadow-sm hover:shadow-xl hover:border-black/15 dark:hover:border-white/15 transition-all">
        
        {/* Square Image container */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-black/10 dark:border-white/10 group-hover:border-sdg6/30 transition-colors shadow-inner">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-6 transform group-hover:scale-105 transition-transform duration-500 ease-out"
            priority={false}
          />

          {/* Top badges over square image */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono bg-black/70 backdrop-blur-md text-white border border-white/15 shadow-sm">
              {event.dayLabel}
            </span>
            {event.category && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/90 dark:bg-black/80 backdrop-blur-md text-stone-900 dark:text-white border border-black/10 dark:border-white/20 shadow-sm truncate max-w-[55%]">
                {event.category}
              </span>
            )}
          </div>
        </div>

        {/* Card details */}
        <div className="flex flex-col flex-1 pt-4">
          {/* Title */}
          <h4 className="font-heading text-xl font-bold tracking-tight text-stone-900 dark:text-white group-hover:text-sdg6 transition-colors leading-snug">
            {event.title}
          </h4>

          {/* Meta Info: Date & Venue */}
          <div className="flex flex-wrap items-center gap-2.5 my-3 text-xs text-stone-600 dark:text-gray-400 font-medium">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/3 dark:bg-white/4 border border-black/5 dark:border-white/5">
              <svg
                className="w-3.5 h-3.5 text-sdg6 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <span>{event.displayDate}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/3 dark:bg-white/4 border border-black/5 dark:border-white/5">
              <svg
                className="w-3.5 h-3.5 text-sdg7 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{event.venue}</span>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-stone-600 dark:text-gray-300 leading-relaxed line-clamp-3 mb-5 flex-1">
            {event.description}
          </p>

          {/* Action Button: Register on Unstop */}
          <div className="mt-auto pt-2">
            <a
              href={event.unstopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-stone-900 text-white dark:bg-white dark:text-stone-950 hover:bg-stone-800 dark:hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm group/btn active:scale-[0.98]"
            >
              <span>Register on Unstop</span>
              <svg
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};

