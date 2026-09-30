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
    <>
      <style jsx>{`
        /* Smooth base fade-in */
        @keyframes bvestBaseFade {
          0% {
            opacity: 0;
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
          }
        }

        /* Color layer progressive section reveal */
        @keyframes bvestColorSweep {
          0% {
            opacity: 0;
            clip-path: inset(0 100% 0 0);
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            clip-path: inset(0 0% 0 0);
          }
        }

        .bvest-base-wrapper {
          animation: bvestBaseFade 1s ease-out forwards;
        }

        .bvest-color-wrapper {
          opacity: 0;
          animation: bvestColorSweep 2.8s cubic-bezier(0.25, 1, 0.5, 1) 0.8s forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .bvest-base-wrapper,
          .bvest-color-wrapper {
            animation: none !important;
            opacity: 1 !important;
            clip-path: none !important;
            filter: none !important;
          }
        }
      `}</style>

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
            />
          </div>
        )}
      </div>
    </>
  );
};