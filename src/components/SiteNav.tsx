"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { BvestLogo } from "@/components/BvestLogo";

const NAV_LINKS = [
  { href: "/#goals", label: "Goals" },
  { href: "/#featured-events", label: "Events" },
  { href: "/society/login", label: "Society Portal" },
  { href: "/admin/login", label: "Admin" },
  { href: "/#contact", label: "Contact" },
];

export const SiteNav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();
  const onPortal = pathname.startsWith("/society") || pathname.startsWith("/admin");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="fixed inset-x-0 top-4 z-40 flex justify-center px-4 pointer-events-none">
        <div className="island-glass rounded-full pl-4 pr-3 py-2 flex items-center gap-6 pointer-events-auto w-full max-w-5xl md:w-auto">
          <Link href="/" className="shrink-0 transition-transform duration-300 ease-fluid hover:scale-[1.04] active:scale-[0.97] motion-reduce:hover:scale-100" aria-label="BVEST home">
            <BvestLogo size={34} />
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-gray-300 whitespace-nowrap">
            {NAV_LINKS.slice(0, 4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="relative transition-colors duration-200 ease-fluid hover:text-white after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-white/60 after:transition-transform after:duration-300 after:ease-fluid hover:after:scale-x-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              href="/#goals"
              className={`btn-shine ${onPortal ? "hidden" : "hidden md:inline-flex"} items-center gap-2 px-4 py-2 bg-white text-gray-950 rounded-full text-xs font-semibold transition-all duration-200 ease-fluid hover:bg-gray-200 active:scale-[0.96] group`}
            >
              Explore Events
              <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-200 ease-fluid group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 6h8M6 2l4 4-4 4" />
                </svg>
              </span>
            </Link>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="md:hidden relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-colors duration-200 hover:bg-white/10"
            >
              <span className="relative block w-4 h-3">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-full bg-white rounded-full transition-all duration-300 ease-fluid ${open ? "top-1/2 -translate-y-1/2 rotate-45" : ""}`}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-[1.5px] w-full bg-white rounded-full transition-all duration-200 ease-fluid ${open ? "opacity-0" : "opacity-100"}`}
                />
                <span
                  className={`absolute left-0 bottom-0 h-[1.5px] w-full bg-white rounded-full transition-all duration-300 ease-fluid ${open ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>
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
              className="absolute inset-0 bg-black/85 backdrop-blur-3xl"
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
                    className="flex items-center justify-between px-6 py-4 rounded-2xl text-2xl font-heading font-semibold text-white/90 hover:bg-white/5 hover:text-white transition-colors duration-200 ease-fluid active:scale-[0.98]"
                  >
                    {link.label}
                    <span className="text-white/30 text-lg">&rarr;</span>
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
                    href="/#goals"
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