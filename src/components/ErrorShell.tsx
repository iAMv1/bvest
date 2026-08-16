"use client";

import React from "react";
import Link from "next/link";
import { SDGColorStrip } from "@/components/SDGColorStrip";

interface ErrorShellProps {
  code: string;
  eyebrow: string;
  accentDot: string;
  gradientFrom: string;
  gradientTo: string;
  title: string;
  gradientWord: string;
  copy: string;
  primaryLabel: string;
  primaryHref?: string;
  onReset?: () => void;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export const ErrorShell: React.FC<ErrorShellProps> = ({
  code,
  eyebrow,
  accentDot,
  gradientFrom,
  gradientTo,
  title,
  gradientWord,
  copy,
  primaryLabel,
  primaryHref,
  onReset,
  secondaryLabel,
  secondaryHref,
}) => {
  return (
    <main className="relative min-h-[calc(100dvh-6rem)] flex items-center justify-center px-6 py-24 overflow-hidden">
      {/* Backdrop: dot grid + drifting orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-dots absolute inset-0 md:opacity-60" />
        <div className="absolute top-1/4 -left-32 w-[26rem] h-[26rem] bg-sdg6/8 rounded-full blur-[150px] animate-drift" />
        <div className="absolute bottom-1/4 -right-32 w-[24rem] h-[24rem] bg-sdg10/8 rounded-full blur-[140px] animate-drift-slow" />
      </div>

      {/* Giant ghost code behind the card */}
      <span
        className="outline-text pointer-events-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%] font-heading text-[9rem] md:text-[16rem] font-black uppercase tracking-tight whitespace-nowrap"
        aria-hidden="true"
      >
        {code}
      </span>

      <div className="relative text-center max-w-xl mx-auto">
        <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 bg-white/5 border border-white/10 mb-8">
          <span className={`w-1 h-1 rounded-full ${accentDot}`} />
          {eyebrow}
        </span>

        <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
          {title}{" "}
          <span className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}>
            {gradientWord}
          </span>
        </h1>

        <p className="text-lg text-gray-400 leading-relaxed mb-12 max-w-lg mx-auto">{copy}</p>

        <div className="flex flex-wrap justify-center gap-4">
          {primaryHref && (
            <Link
              href={primaryHref}
              className="btn-shine inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-gray-950 text-sm font-bold transition-all duration-300 ease-fluid hover:bg-gray-200 active:scale-[0.97] motion-reduce:active:scale-100"
            >
              {primaryLabel}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="btn-shine inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-gray-950 text-sm font-bold transition-all duration-300 ease-fluid hover:bg-gray-200 active:scale-[0.97] motion-reduce:active:scale-100"
            >
              {primaryLabel}
              <span aria-hidden="true">&rarr;</span>
            </button>
          )}
          {secondaryHref && (
            <Link
              href={secondaryHref}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 bg-white/5 text-white text-sm font-semibold transition-all duration-300 ease-fluid hover:bg-white/10 active:scale-[0.97] motion-reduce:active:scale-100"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>

      {/* Brand strip */}
      <div className="absolute bottom-0 inset-x-0" aria-hidden="true">
        <SDGColorStrip />
      </div>
    </main>
  );
};