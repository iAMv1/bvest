import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Society Portal | BVEST",
  description: "Society login and domain preference portal for BVEST.",
};

export default function SocietyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-200 relative overflow-x-clip">
      {/* Ambient mesh glow */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div className="absolute top-1/4 -left-32 w-[28rem] h-[28rem] bg-sdg6/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/3 -right-32 w-[30rem] h-[30rem] bg-sdg3/10 rounded-full blur-[180px]" />
      </div>

      <main className="flex-1 flex flex-col relative z-10">{children}</main>
    </div>
  );
}