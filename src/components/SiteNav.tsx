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
  { href: "/#core-team", label: "Core Team" },
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
  const [bottomActive, setBottomActive] = useState<string>(NAV_LINKS[0].href);

  const toggleTheme = () => setPreference(theme === "dark" ? "light" : "dark");

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);
    setBottomActive(href);
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (pathname === "/") {
        e.preventDefault();
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", `#${targetId}`);
        }
      }
    }
  };

  // Bottom capsule: curated 5, fits pill (Contact lives in footer)
  const BOTTOM_LINKS = NAV_LINKS.filter((l) => l.href !== "/#contact");


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
          animate={{ y: hidden && !open ? -120 : 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`island-glass rounded-full pl-4 pr-4 py-2 flex items-center justify-between md:justify-start gap-5 pointer-events-auto w-full max-w-5xl md:w-auto transition-shadow duration-300 ease-fluid ${
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
                onClick={(e) => handleNavClick(e, link.href)}
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
                onClick={(e) => handleNavClick(e, "/#featured-events")}
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

            {/* Theme toggle — visible on all sizes */}
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

            {/* Hamburger — mobile (kept for test compat + overflow menu alongside bottom capsule) */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="md:hidden relative shrink-0 w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center transition-colors duration-200 hover:bg-black/10 dark:hover:bg-white/10"
            >
              <span className="relative block w-4 h-3">
                <span className={`absolute left-0 top-0 h-[1.5px] w-full bg-stone-950 dark:bg-white rounded-full transition-all duration-300 ease-fluid ${open ? "top-1/2 -translate-y-1/2 rotate-45" : ""}`} />
                <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-[1.5px] w-full bg-stone-950 dark:bg-white rounded-full transition-all duration-200 ease-fluid ${open ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 bottom-0 h-[1.5px] w-full bg-stone-950 dark:bg-white rounded-full transition-all duration-300 ease-fluid ${open ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom capsule nav — mobile only (Apple / WhatsApp capsule) */}
      <div className="md:hidden fixed inset-x-3 bottom-3 z-40 flex justify-center pointer-events-none" style={{ paddingBottom: "max(0px, env(safe-area-inset-bottom))" }}>
        <nav
          aria-label="Mobile navigation"
          className="island-glass rounded-full p-1.5 flex items-center gap-1 pointer-events-auto w-full max-w-[360px] shadow-[0_12px_44px_rgba(23,21,15,0.14),inset_0_1px_0_rgba(255,255,255,0.7)] dark:shadow-[0_12px_44px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)]"
        >
          {BOTTOM_LINKS.map((link) => {
            const isActive = bottomActive === link.href;
            const isPortal = link.href.startsWith("/society") || link.href.startsWith("/admin");
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={isActive ? "page" : undefined}
                className={`flex-1 flex items-center justify-center px-2 py-2.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.97] ${
                  isActive
                    ? "bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
                    : isPortal
                    ? "text-stone-950 dark:text-white/70 bg-black/[0.04] dark:bg-white/[0.06] border border-black/5 dark:border-white/5"
                    : "text-stone-600 dark:text-white/60 hover:text-stone-900 dark:hover:text-white"
                }`}
              >
                {link.label === "Goals" && (
                  <svg className="w-3.5 h-3.5 mr-1 hidden sm:inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></svg>
                )}
                {link.label === "Events" && (
                  <svg className="w-3.5 h-3.5 mr-1 hidden sm:inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                )}
                <span className="truncate">{link.label.replace(" Portal", "")}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile full-screen drawer — kept for edge case (deep links), now unreachable via UI but still accessible if open state forced externally */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="site-nav-overlay"
            className="fixed inset-0 z-50 md:hidden flex flex-col bg-[#F4F1F8]/95 dark:bg-black/95 backdrop-blur-3xl"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/10 dark:border-white/10">
              <Link href="/" onClick={() => setOpen(false)} aria-label="BVEST home">
                <BvestLogo size={36} />
              </Link>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 flex items-center justify-center text-stone-950 dark:text-white"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-stone-500 dark:text-gray-400 px-3 mb-2 font-mono">
                  Navigation
                </p>
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="flex items-center justify-between px-5 py-4 rounded-2xl text-xl font-heading font-semibold text-stone-950 dark:text-white bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 active:scale-[0.98] transition-all"
                    >
                      <span>{link.label}</span>
                      <span className="text-stone-400 dark:text-white/30 text-base">&rarr;</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-col gap-3 pt-4 border-t border-black/10 dark:border-white/10">
                {!onPortal && (
                  <Link
                    href="/#featured-events"
                    onClick={(e) => handleNavClick(e, "/#featured-events")}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-sdg6 to-sdg3 text-white font-semibold text-base shadow-lg active:scale-[0.98]"
                  >
                    Explore Events &rarr;
                  </Link>
                )}
                <p className="text-center text-xs text-stone-500 dark:text-gray-500 font-mono tracking-widest uppercase">
                  BVCOE Delhi &middot; BVEST 2026
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};