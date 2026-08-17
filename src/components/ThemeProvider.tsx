"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemePreference = Theme | "system";

interface ThemeContextValue {
  theme: Theme;
  preference: ThemePreference;
  setPreference: (p: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  preference: "system",
  setPreference: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const STORAGE_KEY = "bvest-theme";

function resolveTheme(pref: ThemePreference): Theme {
  if (pref !== "system") return pref;
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preference, setPreferenceState] = useState<ThemePreference>("system");
  const [theme, setTheme] = useState<Theme>("dark");

  // Boot: read stored preference right after first paint (no-flash script already set the class)
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const stored = (() => {
        try {
          return (localStorage.getItem(STORAGE_KEY) as ThemePreference) || "system";
        } catch {
          return "system";
        }
      })();
      setPreferenceState(stored);
      setTheme(resolveTheme(stored));
      applyTheme(resolveTheme(stored));
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Follow system changes while preference is "system"
  useEffect(() => {
    if (preference !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => setTheme(resolveTheme("system"));
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [preference]);

  const setPreference = (p: ThemePreference) => {
    setPreferenceState(p);
    const next = resolveTheme(p);
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, p);
    } catch {
      /* private mode — ignore */
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, preference, setPreference }}>
      {children}
    </ThemeContext.Provider>
  );
};