import React from "react";

interface FestTickerProps {
  items: string[];
  duration?: string;
}

export const FestTicker: React.FC<FestTickerProps> = ({ items, duration = "36s" }) => {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-white/[0.02] py-3 select-none" aria-hidden="true">
      <div className="flex whitespace-nowrap animate-marquee w-max" style={{ animationDuration: duration }}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 mx-3">
            <span className="outline-text font-heading text-sm md:text-base font-bold uppercase tracking-[0.35em]">
              {item}
            </span>
            <span className="text-[10px] text-sdg6/70">&#10038;</span>
          </span>
        ))}
      </div>
    </div>
  );
};