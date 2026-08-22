export const dynamic = "force-dynamic";
import Link from "next/link";
import Image from "next/image";
import { BvestLogo } from "@/components/BvestLogo";

const LINKTREE_ITEMS = [
  {
    title: "Explore Fest Events 🚀",
    description: "View all 30+ technical & cultural competitions",
    href: "/events",
    highlight: true,
  },
  {
    title: "Society Login Portal 🏛️",
    description: "Official portal for BVCOE society domain allocations",
    href: "/society/login",
    highlight: false,
  },
  {
    title: "Official Instagram Page 📸",
    description: "@bvest.bvcoe · Follow for live updates & announcements",
    href: "https://www.instagram.com/bvest.bvcoe?igsi=MWJmc283MG95eTdoNg==",
    external: true,
    highlight: false,
  },
  {
    title: "WhatsApp Channel / Group 💬",
    description: "Join the official participant broadcast community",
    href: "https://wa.me/",
    external: true,
    highlight: false,
  },
  {
    title: "BVCOE Delhi Campus Location 📍",
    description: "A-4, Paschim Vihar, Rohtak Road, New Delhi - 110063",
    href: "https://maps.google.com/?q=BVCOE+Delhi",
    external: true,
    highlight: false,
  },
];

const LEGACY_VERSIONS = [
  { version: "BVEST X", edition: "10th Edition (2023)", tagline: "Decade of Innovation" },
  { version: "BVEST XI", edition: "11th Edition (2024)", tagline: "Tech for Tomorrow" },
  { version: "BVEST XII", edition: "12th Edition (2025)", tagline: "Engineering Excellence" },
  { version: "BVEST XIII", edition: "13th Edition (2026)", tagline: "17 UN SDGs · Active" },
];

export default function LinksPage() {
  return (
    <div className="relative min-h-screen bg-stone-950 text-white flex flex-col items-center justify-start pt-24 pb-16 px-4 overflow-hidden">
      {/* Ambient Aurora Lights */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="bg-dots absolute inset-0 opacity-20" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-sdg6/15 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/3 left-1/3 w-[24rem] h-[24rem] bg-sdg10/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center">
        {/* Logo & Header */}
        <div className="mb-6">
          <BvestLogo size={140} variant="dark-on-dark" />
        </div>
        <p className="text-xs font-mono tracking-widest text-sdg6 uppercase mb-2">
          Official Link Hub &middot; BVCOE Delhi
        </p>
        <p className="text-sm text-stone-400 max-w-xs leading-relaxed mb-8">
          Annual Technical Fest themed around the 17 UN Sustainable Development Goals.
        </p>

        {/* Links Stack */}
        <div className="w-full flex flex-col gap-3.5 mb-12">
          {LINKTREE_ITEMS.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className={`group relative w-full p-4 rounded-2xl border text-left transition-all duration-300 active:scale-[0.98] ${
                item.highlight
                  ? "bg-gradient-to-r from-sdg6 to-sdg3 text-white border-sdg6/50 shadow-lg shadow-sdg6/20 hover:shadow-sdg6/40"
                  : "bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-white/25"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-heading font-bold text-base leading-snug">
                    {item.title}
                  </h3>
                  <p className={`text-xs mt-0.5 ${item.highlight ? "text-white/80" : "text-stone-400"}`}>
                    {item.description}
                  </p>
                </div>
                <span className="text-lg opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Legacy Archive Section */}
        <div className="w-full pt-8 border-t border-white/10 text-left">
          <h3 className="font-heading font-bold text-sm tracking-wider uppercase text-stone-300 mb-4 flex items-center gap-2">
            <span>🏛️ BVEST Legacy Archive</span>
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            {LEGACY_VERSIONS.map((leg) => (
              <div
                key={leg.version}
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs flex flex-col justify-between"
              >
                <div>
                  <span className="font-heading font-extrabold text-white text-sm">
                    {leg.version}
                  </span>
                  <p className="text-[10px] text-sdg6 font-mono font-medium mt-0.5">
                    {leg.edition}
                  </p>
                </div>
                <p className="text-[10px] text-stone-400 mt-2 line-clamp-1">
                  {leg.tagline}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <p className="text-[11px] text-stone-500 font-mono mt-10">
          &copy; 2026 BVEST XIII &middot; BVCOE New Delhi
        </p>
      </div>
    </div>
  );
}
