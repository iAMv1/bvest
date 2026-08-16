"use client";

import React from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  label: string;
  pendingLabel: string;
  variant?: "brand" | "console";
  className?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  label,
  pendingLabel,
  variant = "brand",
  className = "",
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`group btn-shine w-full inline-flex items-center justify-center gap-3 py-3.5 px-6 rounded-full text-sm font-bold transition-all duration-300 ease-fluid active:scale-[0.97] disabled:cursor-wait bg-white text-gray-950 hover:bg-gray-200 shadow-[0_12px_40px_rgba(255,255,255,0.12)] ${variant === "console" ? "font-mono tracking-wide" : ""} ${className}`}
    >
      {pending ? (
        <>
          <span className="w-4 h-4 rounded-full border-2 border-gray-950/20 border-t-gray-950 animate-spin" aria-hidden="true" />
          {pendingLabel}
        </>
      ) : (
        <>
          {label}
          <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-300 ease-fluid group-hover:translate-x-1 group-hover:-translate-y-px">
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6h8M6 2l4 4-4 4" />
            </svg>
          </span>
        </>
      )}
    </button>
  );
};