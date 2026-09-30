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
  animated = true,
  className = "",
  onClick,
  variant = "auto",
  isHeader = false,
}) => {
  const { theme } = useTheme();

  // Ink variant selection based on theme & props
  const useInk =
    variant === "ink-on-light" || (variant === "auto" && theme === "light");

  // ORIGINAL ASPECT RATIOS PRESERVED EXACTLY AS YOUR SITE EXPECTS
  const aspectRatio = isHeader ? 1239 / 245 : 1692 / 929;
  const calculatedWidth = size * aspectRatio;

  const baseSrc = isHeader
    ? useInk
      ? "/headerlogolight.png"
      : "/headerlogodark.png"
    : useInk
    ? "/logo-dark.png"
    : "/bvest_white.png";

  const colorSrc = isHeader
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
      className={`relative inline-block select-none overflow-hidden ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Base Logo Image (Exact original sizing) */}
      <div className={`relative w-full h-full ${animated ? 'bvest-base-wrapper' : 'opacity-100'}`}>
        <Image
          src={baseSrc}
          alt="BVEST Logo Base"
          fill
          sizes={`${Math.ceil(calculatedWidth)}px`}
          className="object-contain"
          priority
          unoptimized
        />
      </div>

      {/* Color Overlay Layer (Single stacked container, zero misalignment) */}
      {animated && (
        <div className="absolute inset-0 w-full h-full pointer-events-none bvest-color-wrapper">
          <Image
            src={colorSrc}
            alt="BVEST Logo Color"
            fill
            sizes={`${Math.ceil(calculatedWidth)}px`}
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      )}
    </div>
  );
};