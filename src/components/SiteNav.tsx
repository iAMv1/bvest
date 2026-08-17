"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion, useScroll } from "framer-motion";
import { BvestLogo } from "@/components/BvestLogo";
import { useTheme } from "@/components/ThemeProvider";

const NAV_LINKS = [
  { href: "/#goals", label: "Goals" },
  { href: "/#featured-events", label: "Events" },
  { href: "/society/login", label: "Society Portal" },
  { href: "/admin/login", label: "Admin" },
  { href: "/#contact", label: "Contact" },
];

export const SiteNav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();
  const onPortal = pathname.startsWith("/society") || pathname.startsWith("/admin");
  const { theme, setPreference } = useTheme();
  const { scrollYProgress } = useScroll();

  const toggleTheme = () => setPreference(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Scroll behavior: solidify above the fold, hide while scrolling down,
  // reveal on scroll up — no hide when motion is reduced.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (shouldReduceMotion) return;
      const delta = y - lastY;
      if (Math.abs(delta) > 10) {
        setHidden(delta > 0 && y > 480);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [shouldReduceMotion]);

  return (
    <>
      {/* Scroll progress hairline — SDG gradient, tracks page progress */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left"
        style={{
          scaleX: scrollYProgress,
          background: "linear-gradient(90deg, #E5243B, #DDA63A, #4C9F38, #26BDE2, #DD1367, #00689D)",
        }}
      />

      <div className="fixed inset-x-0 top-4 z-40 flex justify-center px-4 pointer-events-none">
        <motion.div
          animate={{ y: hidden || open ? -120 : 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`island-glass rounded-full pl-4 pr-4 py-2 flex items-center gap-5 pointer-events-auto w-full max-w-5xl md:w-auto transition-shadow duration-300 ease-fluid ${
            scrolled
              ? "shadow-[0_12px_44px_rgba(23,21,15,0.14),inset_0_1px_0_rgba(255,255,255,0.7)] dark:shadow-[0_12px_44px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)]"
              : ""
          }`}
        >
          <Link href="/" className="shrink-0 transition-transform duration-300 ease-fluid hover:scale-[1.04] active:scale-[0.97] motion-reduce:hover:scale-100" aria-label="BVEST home">
            <BvestLogo size={34} />
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-stone-950 dark:text-gray-300 whitespace-nowrap">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="relative transition-colors duration-200 ease-fluid hover:text-sdg6 dark:hover:text-white after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-stone-900/60 dark:after:bg-white/60 after:transition-transform after:duration-300 after:ease-fluid hover:after:scale-x-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            {!onPortal && (
              <Link
                href="/#featured-events"
                className={`btn-shine hidden lg:inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-white text-gray-950 dark:text-gray-950 rounded-full text-xs font-semibold transition-all duration-200 ease-fluid hover:bg-gray-200 dark:hover:bg-gray-200 active:scale-[0.96] group`}
              >
              Explore Events
              <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-200 ease-fluid group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 6h8M6 2l4 4-4 4" />
                </svg>
              </span>
            </Link>
            )}

            {/* Theme toggle — sits at the outer edge, after the CTA */}
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="relative shrink-0 w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center transition-colors duration-200 ease-fluid hover:bg-black/10 dark:hover:bg-white/10 active:scale-90"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={shouldReduceMotion ? false : { opacity: 0, rotate: -60, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, rotate: 60, scale: 0.6 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="text-stone-950 dark:text-gray-300"
                >
                  {theme === "dark" ? (
                    <svg className="w-5 h-5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  )}
                </motion.span>
              </AnimatePresence>
            </button>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="md:hidden relative shrink-0 w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center transition-colors duration-200 hover:bg-black/10 dark:hover:bg-white/10"
            >
              <span className="relative block w-4 h-3">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-full bg-stone-950 dark:bg-white rounded-full transition-all duration-300 ease-fluid ${open ? "top-1/2 -translate-y-1/2 rotate-45" : ""}`}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-[1.5px] w-full bg-stone-950 dark:bg-white rounded-full transition-all duration-200 ease-fluid ${open ? "opacity-0" : "opacity-100"}`}
                />
                <span
                  className={`absolute left-0 bottom-0 h-[1.5px] w-full bg-stone-950 dark:bg-white rounded-full transition-all duration-300 ease-fluid ${open ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="site-nav-overlay"
            className="fixed inset-0 z-50 md:hidden"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div
              className="absolute inset-0 bg-white/90 backdrop-blur-3xl dark:bg-black/85"
              onClick={() => setOpen(false)}
            />
            <div className="relative h-full flex flex-col items-center justify-center gap-2 px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full max-w-sm"
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-6 py-4 rounded-2xl text-2xl font-heading font-semibold text-stone-950 dark:text-white/90 hover:bg-black/5 dark:hover:bg-white/5 hover:text-stone-900 dark:hover:text-white transition-colors duration-200 ease-fluid active:scale-[0.98]"
                  >
                    {link.label}
                    <span className="text-stone-500 dark:text-white/30 text-lg">&rarr;</span>
                  </Link>
                </motion.div>
              ))}
              {!onPortal && (
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + NAV_LINKS.length * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full max-w-sm mt-4"
                >
                  <Link
                    href="/#featured-events"
                    className="flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white text-gray-950 font-semibold transition-all duration-200 ease-fluid active:scale-[0.98]"
                  >
                    Explore Events
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};