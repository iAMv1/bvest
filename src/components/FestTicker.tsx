import React from "react";

interface FestTickerProps {
  items: string[];
  duration?: string;
}

export const FestTicker: React.FC<FestTickerProps> = ({ items, duration = "36s" }) => {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] py-3 select-none" aria-hidden="true">
      {/* Edge fade masks — keep the marquee from popping at the section seams */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 z-10 bg-gradient-to-l from-background to-transparent" />
      <div className="flex whitespace-nowrap animate-marquee w-max" style={{ animationDuration: duration }}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 mx-3">
            <span className="font-heading text-sm md:text-base font-bold uppercase tracking-[0.35em] text-stone-950/80 dark:text-gray-200/90">
              {item}
            </span>
            <span className="text-[10px] text-sdg6/70">&#10038;</span>
          </span>
        ))}
      </div>
    </div>
  );
};