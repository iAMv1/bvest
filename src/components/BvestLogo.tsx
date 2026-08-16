"use client";

import React from 'react';
import Image from 'next/image';

export interface BvestLogoProps {
  size?: number; // Height in pixels
  showSubtitle?: boolean;
  animated?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BvestLogo: React.FC<BvestLogoProps> = ({
  size = 40,
  showSubtitle, // ignored for image logo
  animated, // ignored for image logo
  className = "",
  onClick,
}) => {
  // Original image dimensions: 1692 x 929 (aspect ratio ~ 1.82)
  const aspectRatio = 1692 / 929;
  const calculatedWidth = size * aspectRatio;

  return (
    <div
      style={{ height: size, width: calculatedWidth }}
      onClick={onClick}
      className={`relative inline-block select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <Image
        src="/logo.png"
        alt="BVEST Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
};
