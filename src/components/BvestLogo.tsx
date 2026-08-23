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
  isHeader?: boolean;
}

export const BvestLogo: React.FC<BvestLogoProps> = ({
  size = 40,
  showSubtitle, // ignored for image logo
  animated, // ignored for image logo
  className = "",
  onClick,
  variant = "auto",
  isHeader = false,
}) => {
  const { theme } = useTheme();
  // White 3D-glass artwork works on dark surfaces only; ink variant for light.
  const useInk =
    variant === "ink-on-light" || (variant === "auto" && theme === "light");

  const aspectRatio = isHeader ? 1239 / 245 : 1692 / 929;
  const calculatedWidth = size * aspectRatio;

  const imgSrc = isHeader
    ? useInk
      ? "/headerlogolight.png"
      : "/headerlogodark.png"
    : useInk
    ? "/logo-dark.png"
    : "/logo.png";

  return (
    <div
      style={{ height: size, width: calculatedWidth }}
      onClick={onClick}
      className={`relative inline-block select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <Image
        src={imgSrc}
        alt="BVEST Logo"
        fill
        sizes={`${Math.ceil(calculatedWidth)}px`}
        className="object-contain"
        priority
      />
    </div>
  );
};