import Link from "next/link";

const LINKS = [
  { key: "console", label: "Console", href: "/admin/allocations" },
  { key: "societies", label: "Societies", href: "/admin/societies" },
  { key: "events", label: "Events", href: "/admin/events" },
] as const;

export function AdminNav({ active }: { active: "console" | "societies" | "events" }) {
  return (
    <nav className="animate-rise-in flex flex-wrap items-center gap-2 mb-8" aria-label="Admin sections">
      {LINKS.map((link) => (
        <Link
          key={link.key}
          href={link.href}
          aria-current={active === link.key ? "page" : undefined}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ease-fluid active:scale-[0.97] motion-reduce:active:scale-100 ${
            active === link.key
              ? "bg-stone-950 text-white dark:bg-white dark:text-stone-950 shadow-[0_8px_24px_rgba(23,21,15,0.25)] dark:shadow-[0_8px_24px_rgba(255,255,255,0.12)]"
              : "bg-black/5 dark:bg-white/[0.06] text-stone-950 dark:text-gray-300 border border-black/10 dark:border-white/10 hover:border-black/25 dark:hover:border-white/25"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${active === link.key ? "bg-emerald-400" : "bg-violet-500"}`} />
          {link.label}
        </Link>
      ))}
    </nav>
  );
}