"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { sdgData } from "@/lib/sdg-data";
import { useIntro } from "@/components/IntroContext";

interface Box {
  sdgIndex: number;
  right: string;   // CSS value e.g. "5%"
  bottom: string;  // CSS value e.g. "10%"
  w: number;       // px
  h: number;       // px
  rotate: number;  // deg, slight tilt for organic feel
  opacity: number; // 0–1, fades toward outer edges
}

// Hand-crafted layout: dense at bottom-right, tapering diagonally toward top-left.
// right/bottom expressed as % of the hero container so it scales with viewport width.
const BOXES: Box[] = [
  // ── Bottom-right anchor cluster ───────────────────────────────────────────
  { sdgIndex: 0, right: "1%", bottom: "2%", w: 168, h: 168, rotate: 1, opacity: 1 },
  { sdgIndex: 1, right: "16%", bottom: "1%", w: 140, h: 140, rotate: -2, opacity: 1 },
  { sdgIndex: 2, right: "30%", bottom: "3%", w: 112, h: 112, rotate: 3, opacity: 0.95 },
  { sdgIndex: 3, right: "1.5%", bottom: "26%", w: 123, h: 123, rotate: -1, opacity: 0.95 },
  { sdgIndex: 4, right: "16%", bottom: "22%", w: 151, h: 151, rotate: 2, opacity: 1 },
  { sdgIndex: 5, right: "29%", bottom: "20%", w: 101, h: 101, rotate: -3, opacity: 0.9 },
  { sdgIndex: 6, right: "42%", bottom: "2%", w: 90, h: 90, rotate: 1, opacity: 0.85 },
  { sdgIndex: 7, right: "40%", bottom: "16%", w: 78, h: 78, rotate: -2, opacity: 0.8 },
  // ── Mid zone ─────────────────────────────────────────────────────────────
  { sdgIndex: 8, right: "2%", bottom: "52%", w: 106, h: 106, rotate: 2, opacity: 0.85 },
  { sdgIndex: 9, right: "16%", bottom: "44%", w: 129, h: 129, rotate: -1, opacity: 0.9 },
  { sdgIndex: 10, right: "30%", bottom: "38%", w: 92, h: 92, rotate: 3, opacity: 0.8 },
  { sdgIndex: 11, right: "42%", bottom: "34%", w: 70, h: 70, rotate: -2, opacity: 0.7 },
  { sdgIndex: 12, right: "52%", bottom: "4%", w: 73, h: 73, rotate: 1, opacity: 0.65 },
  { sdgIndex: 13, right: "50%", bottom: "18%", w: 62, h: 62, rotate: -3, opacity: 0.6 },
  // ── Upper-right, fading out ───────────────────────────────────────────────
  { sdgIndex: 14, right: "2%", bottom: "75%", w: 81, h: 81, rotate: 1, opacity: 0.6 },
  { sdgIndex: 15, right: "16%", bottom: "66%", w: 95, h: 95, rotate: -2, opacity: 0.55 },
  { sdgIndex: 16, right: "29%", bottom: "58%", w: 62, h: 62, rotate: 2, opacity: 0.45 },
];

export const SDGBoxCollage: React.FC = () => {
  const introDone = useIntro();

  return (
    // Fills the entire hero container; boxes use absolute positioning inside this div.
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Subtle decorative dot-grid background */}
      <div className="hero-dot-grid" />

      {/* ── Desktop: full 17-box collage with SDG images ── */}
      {BOXES.map((box, i) => {
        const sdg = sdgData[box.sdgIndex];
        return (
          <motion.div
            key={sdg.number}
            initial={{ opacity: 0, scale: 0.75, rotate: box.rotate }}
            animate={introDone ? { opacity: box.opacity, scale: 1, rotate: box.rotate } : { opacity: 0, scale: 0.75, rotate: box.rotate }}
            whileHover={{
              scale: 1.12,
              rotate: 0,
              zIndex: 30,
              boxShadow: "0 12px 36px rgba(0,0,0,0.25)",
              transition: { duration: 0.25, ease: "easeOut" }
            }}
            transition={{
              delay: i * 0.025,          // tight 25 ms stagger across all 17
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],  // custom ease-out-expo
            }}
            style={{
              position: "absolute",
              right: box.right,
              bottom: box.bottom,
              width: box.w,
              height: box.h,
              backgroundColor: sdg.hex,  // color fallback while image loads
              borderRadius: 8,
              boxShadow: "0 6px 24px rgba(0,0,0,0.14)",
              overflow: "hidden",
            }}
            className="hidden lg:block pointer-events-auto cursor-pointer"
          >
            <Image
              src={sdg.imageUrl}
              alt={`SDG ${sdg.number}: ${sdg.name}`}
              fill
              sizes={`${box.w}px`}
              className="object-cover"
              priority={i < 6}  // eagerly load the prominent bottom-right cluster
            />
          </motion.div>
        );
      })}

      {/* ── Mobile: simplified 5-box fan with images ── */}
      {BOXES.slice(0, 5).map((box, i) => {
        const sdg = sdgData[box.sdgIndex];
        const mobileSize = Math.round((52 + i * 6) * 1.4); // 72.8 → 106.4 px (40% increase)
        return (
          <motion.div
            key={`mobile-${sdg.number}`}
            initial={{ opacity: 0, scale: 0.75, rotate: box.rotate }}
            animate={introDone ? { opacity: box.opacity * 0.85, scale: 1, rotate: box.rotate } : { opacity: 0, scale: 0.75, rotate: box.rotate }}
            whileTap={{ scale: 0.95, zIndex: 10 }}
            transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
            style={{
              position: "absolute",
              right: `${3 + i * 15}%`,
              bottom: `${2 + i * 5}%`,
              width: mobileSize,
              height: mobileSize,
              backgroundColor: sdg.hex,
              borderRadius: 8,
              boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
              overflow: "hidden",
            }}
            className="block lg:hidden pointer-events-auto cursor-pointer"
          >
            <Image
              src={sdg.imageUrl}
              alt={`SDG ${sdg.number}`}
              fill
              sizes={`${mobileSize}px`}
              className="object-cover"
            />
          </motion.div>
        );
      })}
    </div>
  );
};
