import type { Metadata } from "next";
import { AdminNavbar } from "@/components/AdminNavbar";

export const metadata: Metadata = {
  title: "Admin Portal | BVEST",
  description: "Admin portal for BVEST — societies, events, allocations.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-200 relative overflow-x-clip">
      {/* Ambient mesh glow */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div className="absolute top-1/4 -right-40 w-[30rem] h-[30rem] bg-sdg16/15 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/3 -left-32 w-[26rem] h-[26rem] bg-sdg9/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10">
        <AdminNavbar />
      </div>
      <main className="flex-1 flex flex-col relative z-10">{children}</main>
    </div>
  );
}