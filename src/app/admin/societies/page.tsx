export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/db";
import { AdminSocietyForm } from "@/components/AdminSocietyForm";
import { RegistryTables } from "@/components/RegistryTables";
import { ensureDefaultSocieties } from "@/lib/seed-default-societies";

interface Props {
  searchParams: Promise<{ error?: string; created?: string; updated?: string }>;
}

const ERRORS: Record<string, string> = {
  id: "Society ID must be 2–40 chars, lowercase letters / numbers / dashes.",
  name: "Name must be at least 2 characters.",
  password: "Password must be at least 6 characters.",
  members: "Pick exactly 2 member societies for an Organisation (2-society collab only).",
  duplicate: "That society ID already exists.",
};

export default async function AdminSocietiesPage({ searchParams }: Props) {
  const session = await getSession();
  if (!session.isAdmin) redirect("/admin/login");

  const { error, created, updated } = await searchParams;
  await ensureDefaultSocieties();
  const societies = await prisma.society.findMany({ orderBy: { name: "asc" } });
  const orgCount = societies.filter((s) => s.kind === "GROUP").length;
  const memberCount = societies.filter((s) => s.kind === "SOCIETY").length;

  return (
    <div className="relative flex-1 px-6 pt-28 md:pt-36 pb-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-dots absolute inset-0 md:opacity-40" />
        <div className="absolute -left-40 top-0 w-[28rem] h-[28rem] bg-sdg6/10 rounded-full blur-[160px] animate-drift" />
        <span className="outline-text pointer-events-none select-none absolute -top-3 md:-top-5 right-0 font-heading text-[5rem] md:text-[9rem] font-black uppercase tracking-tight whitespace-nowrap [mask-image:linear-gradient(to_left,black_45%,transparent_90%)]" aria-hidden="true">
          Register
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto">

        <div className="animate-rise-in mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            Society <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">Registry</span>
          </h1>
          <p className="text-stone-950 dark:text-gray-400 text-sm max-w-2xl font-mono">
            {orgCount} ORGANISATIONS (can log in & host) + {memberCount} MEMBERS (pool only) &middot; {societies.length} TOTAL ON FILE
          </p>
        </div>

        {error && ERRORS[error] && (
          <div role="alert" className="animate-error-in flex items-start gap-2.5 px-4 py-3 rounded-xl mb-6 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-300 text-sm">
            {ERRORS[error]}
          </div>
        )}
        {(created || updated) && (
          <div role="status" className="animate-error-in flex items-start gap-2.5 px-4 py-3 rounded-xl mb-6 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-sm">
            {created ? "Society created — share the ID & password with the society rep." : "Password updated."}
          </div>
        )}

        {/* Create form — structural: picker now ABOVE details, not at bottom */}
        <AdminSocietyForm existingSocieties={societies} />

        {/* Registry — split entity → split table with capsule */}
        <RegistryTables societies={societies} />
      </div>
    </div>
  );
}
