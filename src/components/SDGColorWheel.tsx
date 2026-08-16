"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sdgData, SDG } from '@/lib/sdg-data';

interface SDGColorWheelProps {
  size?: number;
}

export const SDGColorWheel: React.FC<SDGColorWheelProps> = ({ size = 400 }) => {
  const [hoveredSdg, setHoveredSdg] = useState<SDG | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const rOut = 100;
  const rIn = 65;
  const numSegments = 17;
  const anglePerSegment = 360 / numSegments;

  const getArcPath = (
    cx: number,
    cy: number,
    rIn: number,
    rOut: number,
    startAngleDeg: number,
    endAngleDeg: number
  ) => {
    const toRad = (deg: number) => (deg * Math.PI) / 180;

    // Outer circle coordinates
    const x1_out = cx + rOut * Math.cos(toRad(startAngleDeg));
    const y1_out = cy + rOut * Math.sin(toRad(startAngleDeg));
    const x2_out = cx + rOut * Math.cos(toRad(endAngleDeg));
    const y2_out = cy + rOut * Math.sin(toRad(endAngleDeg));

    // Inner circle coordinates
    const x1_in = cx + rIn * Math.cos(toRad(startAngleDeg));
    const y1_in = cy + rIn * Math.sin(toRad(startAngleDeg));
    const x2_in = cx + rIn * Math.cos(toRad(endAngleDeg));
    const y2_in = cy + rIn * Math.sin(toRad(endAngleDeg));

    const largeArcFlag = endAngleDeg - startAngleDeg > 180 ? 1 : 0;

    return [
      `M ${x1_out} ${y1_out}`,
      `A ${rOut} ${rOut} 0 ${largeArcFlag} 1 ${x2_out} ${y2_out}`,
      `L ${x2_in} ${y2_in}`,
      `A ${rIn} ${rIn} 0 ${largeArcFlag} 0 ${x1_in} ${y1_in}`,
      `Z`
    ].join(' ');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleScrollToGoal = (goalNumber: number) => {
    const element = document.getElementById(`goal-${goalNumber}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div 
      className="relative flex items-center justify-center select-none"
      style={{ width: '100%', maxWidth: size, aspectRatio: '1/1' }}
      onMouseMove={handleMouseMove}
    >
      <svg
        viewBox="-110 -110 220 220"
        className="w-full h-full"
      >
        {/* Center label circle background */}
        <circle cx="0" cy="0" r={rIn - 1} fill="#FAFAF8" />

        {/* Center text dynamic preview */}
        <text
          x="0"
          y="-2"
          textAnchor="middle"
          className="font-heading font-bold fill-gray-900"
          style={{ fontSize: '10px' }}
        >
          {hoveredSdg ? `Goal ${hoveredSdg.number}` : 'BVEST'}
        </text>
        <text
          x="0"
          y="10"
          textAnchor="middle"
          className="font-sans fill-gray-500 font-medium"
          style={{ fontSize: '5.5px' }}
        >
          {hoveredSdg 
            ? (hoveredSdg.name.length > 20 ? hoveredSdg.name.substring(0, 18) + '...' : hoveredSdg.name)
            : 'UN SDG Theme'}
        </text>

        {/* 17 Segments */}
        {sdgData.map((sdg, i) => {
          const startAngle = -90 + i * anglePerSegment;
          const endAngle = -90 + (i + 1) * anglePerSegment;
          const pathD = getArcPath(0, 0, rIn, rOut, startAngle, endAngle);

          return (
            <motion.g
              key={sdg.number}
              whileHover={{ scale: 1.04 }}
              onClick={() => handleScrollToGoal(sdg.number)}
              onMouseEnter={() => setHoveredSdg(sdg)}
              onMouseLeave={() => setHoveredSdg(null)}
              className="cursor-pointer origin-center"
              style={{ transformOrigin: '0px 0px' }}
            >
              <path
                d={pathD}
                fill={sdg.hex}
                stroke="#FAFAF8"
                strokeWidth="1.2"
                className="transition-opacity hover:opacity-95"
              />
            </motion.g>
          );
        })}
      </svg>

      {/* Floating tooltip */}
      <AnimatePresence>
        {hoveredSdg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute z-30 pointer-events-none bg-gray-950/95 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-xl shadow-xl flex flex-col gap-0.5 whitespace-nowrap border border-white/10"
            style={{
              left: mousePos.x + 15,
              top: mousePos.y + 15,
            }}
          >
            <span className="font-heading font-bold" style={{ color: hoveredSdg.hex }}>
              Goal {hoveredSdg.number}
            </span>
            <span className="font-sans font-medium text-gray-200">{hoveredSdg.name}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
