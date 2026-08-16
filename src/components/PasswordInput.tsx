"use client";

import React, { useState } from "react";

interface PasswordInputProps {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  mono?: boolean;
}

const ACCENT = "focus:ring-blue-400/30 focus:border-blue-400/40";

export const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  name,
  label,
  placeholder = "••••••••",
  mono = false,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className={`block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 ${mono ? "font-mono tracking-widest" : ""}`}
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={show ? "text" : "password"}
          autoComplete="current-password"
          required
          placeholder={placeholder}
          className={`w-full px-4 py-3.5 pr-12 rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 transition-all duration-200 ease-fluid ${ACCENT} ${mono ? "font-mono" : ""}`}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200 ease-fluid active:scale-90"
        >
          {show ? (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3l18 18" />
              <path d="M10.6 10.7a2 2 0 002.7 2.7" />
              <path d="M9.9 5.2A10.9 10.9 0 0112 5c5.5 0 9 7 9 7a17.7 17.7 0 01-2.6 3.8M6.6 6.6A16.7 16.7 0 003 12s3.5 7 9 7a10.4 10.4 0 003.4-.6" />
            </svg>
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};