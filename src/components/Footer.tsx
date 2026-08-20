import Link from "next/link";
import { BvestLogo } from "@/components/BvestLogo";
import { SDGColorStrip } from "@/components/SDGColorStrip";

const FOOTER_NAV_LINKS = [
  { href: "/#goals", label: "Goals" },
  { href: "/#featured-events", label: "Events" },
  { href: "/#core-team", label: "Core Team" },
  { href: "/society/login", label: "Society Portal" },
  { href: "/admin/login", label: "Admin Portal", isAdmin: true },
];

export function Footer() {
  return (
    <footer id="contact" className="relative bg-[#EBEEF2] dark:bg-black pt-16 md:pt-24 mt-auto border-t border-black/10 dark:border-white/5 transition-colors duration-200 overflow-hidden scroll-mt-24">
      {/* Backdrop: SDG-tinted radial + giant ghost wordmark */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[50rem] h-[24rem] bg-sdg6/10 dark:bg-white/4 rounded-full blur-[160px]" />
        <span
          className="ghost-faint select-none absolute -bottom-6 left-1/2 -translate-x-1/2 font-heading text-[7rem] md:text-[13rem] font-black uppercase tracking-tight whitespace-nowrap text-center leading-none [mask-image:radial-gradient(ellipse_62%_72%_at_50%_42%,transparent_0_30%,black_72%)]"
        >
          BVEST 2026
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Col 1: Brand */}
          <div className="flex flex-col items-center md:items-start text-stone-950 dark:text-white">
            <BvestLogo size={88} />
            <p className="text-stone-950 dark:text-gray-400 text-sm mt-3 text-center md:text-left">
              Innovating for a Sustainable Future.
            </p>
            <p className="text-xs text-stone-600 dark:text-gray-500 mt-2 font-mono">
              BVCOE Delhi &middot; BVEST 2026
            </p>
          </div>

          {/* Col 2: Navigation Links (Including Admin Portal) */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-400 font-mono mb-4">
              Navigation
            </h4>
            <ul className="flex flex-wrap md:flex-col gap-3 text-center md:text-left justify-center">
              {FOOTER_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-sdg6 dark:hover:text-white ${
                      link.isAdmin
                        ? "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/25 hover:bg-violet-500/20"
                        : "text-stone-950 dark:text-gray-400"
                    }`}
                  >
                    {link.label}
                    {link.isAdmin && (
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social & Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-400 font-mono mb-4">
              Connect
            </h4>
            <div className="flex flex-wrap justify-center md:justify-start gap-2.5 text-xs text-stone-950 dark:text-gray-400 font-medium">
              {["Twitter", "Instagram", "LinkedIn", "contact@bvest.edu"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/10 hover:text-sdg6 dark:hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SDGColorStrip />
    </footer>
  );
}
