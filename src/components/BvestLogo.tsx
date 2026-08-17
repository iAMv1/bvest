"use client";

import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/components/ThemeProvider';

export interface BvestLogoProps {
  size?: number; // Height in pixels
  showSubtitle?: boolean;
  animated?: boolean;
  className?: string;
  onClick?: () => void;
  variant?: "auto" | "dark-on-dark" | "ink-on-light"; // force one artwork
}

export const BvestLogo: React.FC<BvestLogoProps> = ({
  size = 40,
  showSubtitle, // ignored for image logo
  animated, // ignored for image logo
  className = "",
  onClick,
  variant = "auto",
}) => {
  const { theme } = useTheme();
  // White 3D-glass artwork works on dark surfaces only; ink variant for light.
  const useInk =
    variant === "ink-on-light" || (variant === "auto" && theme === "light");
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
        src={useInk ? "/logo-dark.png" : "/logo.png"}
        alt="BVEST Logo"
        fill
        sizes={`${Math.ceil(calculatedWidth)}px`}
        className="object-contain"
        priority
      />
    </div>
  );
};