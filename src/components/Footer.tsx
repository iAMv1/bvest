import Link from "next/link";
import { BvestLogo } from "@/components/BvestLogo";
import { SDGColorStrip } from "@/components/SDGColorStrip";

const FOOTER_NAV_LINKS = [
  { href: "/#goals", label: "Goals" },
  { href: "/#featured-events", label: "Events" },
  { href: "/#core-team", label: "Core Team" },
  { href: "/society/login", label: "Society Portal" },
];

export function Footer() {
  return (
    <footer id="contact" className="relative bg-[#EBEEF2] dark:bg-black pt-16 md:pt-20 mt-auto border-t border-black/10 dark:border-white/5 transition-colors duration-200 overflow-hidden scroll-mt-24">
      {/* Backdrop: SDG-tinted radial + giant ghost wordmark */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[50rem] h-[24rem] bg-sdg6/10 dark:bg-white/4 rounded-full blur-[160px]" />
        <span
          className="ghost-faint select-none absolute -bottom-6 left-1/2 -translate-x-1/2 font-heading text-[7rem] md:text-[13rem] font-black uppercase tracking-tight whitespace-nowrap text-center leading-none [mask-image:radial-gradient(ellipse_62%_72%_at_50%_42%,transparent_0_30%,black_72%)]"
        >
          BVEST 2026
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 mb-12">
        {/* Top Row: Brand Info + Social Icons */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-black/10 dark:border-white/10">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-stone-950 dark:text-white">
            <BvestLogo size={88} />
            <p className="text-stone-950 dark:text-gray-400 text-sm mt-3 text-center md:text-left">
              Innovating for a Sustainable Future.
            </p>
            <p className="text-xs text-stone-600 dark:text-gray-500 mt-1 font-mono">
              BVCOE Delhi &middot; BVEST 2026
            </p>
          </div>

          {/* Social Icons (Instagram & WhatsApp Only) */}
          <div className="flex items-center gap-3">
            {/* Instagram Icon Button */}
            <a
              href="https://www.instagram.com/bvest.bvcoe?igsi=MWJmc283MG95eTdoNg=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="group relative p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-stone-700 dark:text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 shadow-sm hover:shadow-lg hover:border-pink-500/50"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              <svg
                className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* WhatsApp Icon Button */}
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="group relative p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-stone-700 dark:text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 shadow-sm hover:shadow-lg hover:border-emerald-500/50"
            >
              <div className="absolute inset-0 rounded-2xl bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
              <div className="absolute inset-0 rounded-2xl bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              <svg
                className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Row: Horizontal Navigation Links + Separate Admin Portal Access Link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 md:gap-8">
            {FOOTER_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-stone-950 dark:text-gray-400 transition-colors duration-200 hover:text-sdg6 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Separate Admin Portal Link */}
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 hover:bg-violet-500/10 text-xs font-mono text-stone-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-300 border border-black/10 dark:border-white/10 hover:border-violet-500/30 transition-all duration-200"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500/70 animate-pulse" />
            Admin Access
          </Link>
        </div>
      </div>

      <SDGColorStrip />
    </footer>
  );
}


