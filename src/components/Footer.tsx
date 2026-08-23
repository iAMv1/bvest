import Link from "next/link";
import { BvestLogo } from "@/components/BvestLogo";
import { SDGColorStrip } from "@/components/SDGColorStrip";

const FOOTER_NAV_LINKS = [
  { href: "/#featured-events", label: "Events" },
  { href: "/#core-team", label: "Core Team" },
  { href: "/society/login", label: "Society Portal" },
  { href: "/links", label: "Bio Links" },
  { href: "/privacy", label: "Privacy Policy" },
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
          BVEST XIII
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 mb-12">
        {/* Top Row: Brand Info + Social Icons */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-black/10 dark:border-white/10">
          {/* Brand & Official Attribution */}
          <div className="flex flex-col items-center md:items-start text-stone-950 dark:text-white">
            <BvestLogo size={88} />
            <p className="text-stone-950 dark:text-gray-300 text-sm mt-3 text-center md:text-left font-medium">
              Innovating for a Sustainable Future across the 17 UN Sustainable Development Goals.
            </p>
            <p className="text-xs text-stone-600 dark:text-gray-400 mt-1 font-sans text-center md:text-left">
              Official Technical Fest of <strong>Bharati Vidyapeeth&apos;s College of Engineering (BVCOE)</strong>
            </p>
            <p className="text-[11px] text-stone-500 dark:text-gray-500 mt-0.5 font-mono text-center md:text-left">
              A-4, Paschim Vihar, Rohtak Road, New Delhi &ndash; 110063
            </p>
          </div>

          {/* Social Icons (Instagram & WhatsApp Only) */}
          <div className="flex items-center gap-3 shrink-0">
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
              href="https://chat.whatsapp.com/CQ9FNfCj1Sq25jSU0Ly4fK?mode=gi_t"
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

        {/* Contact Information & Official Help Desk */}
        <div className="py-8 border-b border-black/10 dark:border-white/10">
          <div className="mb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-sdg6">
              Get in Touch &middot; Support &amp; Inquiries
            </span>
            <h3 className="font-heading text-2xl font-bold text-stone-950 dark:text-white mt-1">
              Official Contact Channels
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-sdg6/15 text-sdg6 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-gray-400 font-semibold block">Official Fest Email</span>
                <a
                  href="mailto:bvest@bvcoend.ac.in"
                  className="text-base font-bold text-stone-900 dark:text-white hover:text-sdg6 transition-colors block mt-1"
                >
                  bvest@bvcoend.ac.in
                </a>
              </div>
              <p className="text-xs text-stone-600 dark:text-gray-400 mt-3">
                For official queries, sponsorships, and fest communications.
              </p>
            </div>

            {/* EM Coordinators Card */}
            <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-sdg3/15 text-sdg3 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-gray-400 font-semibold block">Event Management (EM) Coordinators</span>
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-900 dark:text-gray-200">Aastha Narang</span>
                    <a href="tel:+919899156103" className="font-mono text-stone-700 dark:text-gray-300 hover:text-sdg6 font-semibold">
                      +91 98991 56103
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-900 dark:text-gray-200">Akshat Arora</span>
                    <a href="tel:+918470084661" className="font-mono text-stone-700 dark:text-gray-300 hover:text-sdg6 font-semibold">
                      +91 84700 84661
                    </a>
                  </div>
                </div>
              </div>
              <p className="text-xs text-stone-600 dark:text-gray-400 mt-3">
                Designated EM coordinators for student &amp; event assistance.
              </p>
            </div>

            {/* Support Hours Card */}
            <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-sdg9/15 text-sdg9 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-gray-400 font-semibold block">Designated Contact Hours</span>
                <span className="text-sm font-bold text-stone-900 dark:text-white block mt-1">
                  Mon &ndash; Sat &middot; 9:00 AM &ndash; 6:00 PM IST
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-gray-400 mt-3">
                BVCOE Delhi Campus, Paschim Vihar, New Delhi.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row: Horizontal Navigation Links & Privacy Disclaimer */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
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

          <p className="text-xs text-stone-500 dark:text-gray-500 font-mono">
            &copy; 2026 BVEST XIII &middot; BVCOE Delhi. All rights reserved. &middot; <Link href="/privacy" className="underline hover:text-sdg6 transition-colors">Privacy &amp; Data Policy</Link>
          </p>
        </div>
      </div>

      <SDGColorStrip />
    </footer>
  );
}


