"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { EVENT_CONFIG } from "@/data/event";
import { IconArrowRight, IconMenu, IconX, IconSparkles } from "@/components/hackathon/Icons";

const NAV_ITEMS = [
  { label: "ABOUT", href: "#about" },
  { label: "SDGs", href: "#sdgs" },
  { label: "TRACKS", href: "#tracks" },
  { label: "TIMELINE", href: "#timeline" },
  { label: "PRIZES", href: "#prizes" },
  { label: "SPONSORS", href: "#sponsors" },
  { label: "FAQ", href: "#faq" },
  { label: "CONTACT", href: "#contact" },
];

export const HackathonNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Simple active link detection
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = `#${section}`;
            break;
          }
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", href);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-[#07090E]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Fest link */}
          <div className="flex items-center gap-3">
            <Link
              href="#hero"
              onClick={(e) => handleScrollTo(e, "#hero")}
              className="flex items-center gap-2.5 group"
            >
              <div className="relative h-9 w-7 shrink-0 flex items-center justify-center">
                <Image
                  src="/hack8kalogo.png"
                  alt="HackBVP 8.0 Logo"
                  width={36}
                  height={48}
                  priority
                  className="h-9 w-auto object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.7)] group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-base tracking-tight text-white flex items-center gap-1.5">
                  HACKBVP <span className="text-cyan-400">8.0</span>
                </span>
                <span className="text-[10px] font-mono tracking-wider text-gray-400 -mt-1 hidden sm:block">
                  BUILD FOR A BETTER WORLD
                </span>
              </div>
            </Link>

            <span className="hidden md:inline-block text-white/20">|</span>

            <Link
              href="/"
              className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400/90 hover:text-cyan-300 hover:underline transition-colors"
            >
              &larr; Fest Portal
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className={`text-xs font-mono tracking-wider uppercase transition-colors relative py-1 ${
                  activeSection === item.href
                    ? "text-cyan-400 font-bold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
                {activeSection === item.href && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_8px_rgba(38,189,226,0.8)]"
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Right Action: Register CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={EVENT_CONFIG.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="button"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-black bg-linear-to-r from-cyan-400 via-sky-300 to-indigo-300 hover:brightness-110 shadow-[0_0_20px_rgba(38,189,226,0.35)] transition-all active:scale-95"
            >
              <IconSparkles size={14} className="animate-spin text-black" style={{ animationDuration: "6s" }} />
              <span>REGISTER NOW</span>
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <IconX size={22} /> : <IconMenu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#07090E]/95 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-10 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-4 divide-y divide-white/10">
              <div className="flex flex-col gap-3 pb-4">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className="text-lg font-heading font-bold text-white hover:text-cyan-400 transition-colors py-2 flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <IconArrowRight size={18} className="text-gray-500" />
                  </a>
                ))}
              </div>

              <div className="pt-6 flex flex-col gap-4">
                <a
                  href={EVENT_CONFIG.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-3.5 rounded-2xl bg-cyan-400 font-mono font-bold text-black text-sm uppercase tracking-wider shadow-lg shadow-cyan-400/20"
                >
                  REGISTER NOW
                </a>
                <Link
                  href="/"
                  className="w-full text-center py-3 rounded-2xl border border-white/15 bg-white/5 text-gray-300 font-mono text-xs uppercase tracking-wider"
                >
                  &larr; Back to BVEST Fest Portal
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
