"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BvestLogo } from "@/components/BvestLogo";
import { useTheme } from "@/components/ThemeProvider";
import { LogoutButton } from "@/components/LogoutButton";

const ADMIN_LINKS = [
  { key: "console", label: "Console", href: "/admin/allocations", desc: "Ledger" },
  { key: "societies", label: "Societies", href: "/admin/societies", desc: "Registry" },
  { key: "events", label: "Events", href: "/admin/events", desc: "Program" },
  { key: "domains", label: "Domains", href: "/admin/domains", desc: "Topics" },
] as const;

export function AdminNavbar() {
  const pathname = usePathname();
  if (pathname === "/admin/login") return null;
  const { theme, setPreference } = useTheme();
  const toggleTheme = () => setPreference(theme === "dark" ? "light" : "dark");

  const activeKey = pathname.includes("/societies")
    ? "societies"
    : pathname.includes("/events")
      ? "events"
      : pathname.includes("/domains")
        ? "domains"
        : "console";

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-[64px] flex items-center justify-between gap-4">
        {/* Left: brand + admin badge */}
        <div className="flex items-center gap-3">
          <Link href="/admin/allocations" className="flex items-center gap-3 shrink-0" aria-label="Admin console home">
            <BvestLogo size={32} />
            <span className="hidden sm:flex flex-col leading-none">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-violet-600 dark:text-violet-400">Admin</span>
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-stone-500 dark:text-white/50">BVEST Console</span>
            </span>
          </Link>
          <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-violet-600 text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Authorized
          </span>
        </div>

        {/* Center: tabs (desktop) */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10" aria-label="Admin sections">
          {ADMIN_LINKS.map((link) => {
            const isActive = activeKey === link.key;
            return (
              <Link
                key={link.key}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${isActive ? "bg-stone-900 text-white dark:bg-white dark:text-black shadow" : "text-stone-600 dark:text-white/60 hover:text-stone-900 dark:hover:text-white"}`}
              >
                {link.label}
                <span className="ml-1.5 text-[10px] opacity-60 hidden lg:inline">{link.desc}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          <Link href="/" className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5">
            ← Site
          </Link>
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light" : "Switch to dark"}
            className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10"
          >
            {theme === "dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
            )}
          </button>
          <LogoutButton label="Log out" />
        </div>
      </div>

      {/* Mobile tabs: capsule below bar */}
      <div className="md:hidden px-3 pb-3">
        <nav className="flex items-center gap-1 p-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10" aria-label="Admin sections mobile">
          {ADMIN_LINKS.map((link) => {
            const isActive = activeKey === link.key;
            return (
              <Link
                key={link.key}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex-1 text-center px-3 py-2 rounded-full text-xs font-semibold transition-all ${isActive ? "bg-stone-900 text-white dark:bg-white dark:text-black" : "text-stone-600 dark:text-white/60"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
