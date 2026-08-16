import React from 'react';
import { SDG } from '@/lib/sdg-data';

interface SDGBadgeProps {
  sdg: SDG;
}

const colorClasses: Record<number, string> = {
  1: "text-sdg1 border-sdg1 bg-sdg1/10",
  2: "text-sdg2 border-sdg2 bg-sdg2/10",
  3: "text-sdg3 border-sdg3 bg-sdg3/10",
  4: "text-sdg4 border-sdg4 bg-sdg4/10",
  5: "text-sdg5 border-sdg5 bg-sdg5/10",
  6: "text-sdg6 border-sdg6 bg-sdg6/10",
  7: "text-sdg7 border-sdg7 bg-sdg7/10",
  8: "text-sdg8 border-sdg8 bg-sdg8/10",
  9: "text-sdg9 border-sdg9 bg-sdg9/10",
  10: "text-sdg10 border-sdg10 bg-sdg10/10",
  11: "text-sdg11 border-sdg11 bg-sdg11/10",
  12: "text-sdg12 border-sdg12 bg-sdg12/10",
  13: "text-sdg13 border-sdg13 bg-sdg13/10",
  14: "text-sdg14 border-sdg14 bg-sdg14/10",
  15: "text-sdg15 border-sdg15 bg-sdg15/10",
  16: "text-sdg16 border-sdg16 bg-sdg16/10",
  17: "text-sdg17 border-sdg17 bg-sdg17/10",
};

export const SDGBadge: React.FC<SDGBadgeProps> = ({ sdg }) => {
  const badgeClasses = colorClasses[sdg.number] || "text-gray-500 border-gray-500 bg-gray-500/10";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeClasses}`}
    >
      Goal {sdg.number} &middot; {sdg.name}
    </span>
  );
};
