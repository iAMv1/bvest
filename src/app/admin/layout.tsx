import type { Metadata } from "next";
import Link from "next/link";
import { BvestLogo } from "@/components/BvestLogo";

export const metadata: Metadata = {
  title: "Admin Portal | BVEST",
  description: "Admin portal for BVEST.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-200">


      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
