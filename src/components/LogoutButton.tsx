"use client";
import { useTransition } from "react";

export function LogoutButton({ label = "Log out" }: { label?: string }) {
  const [pending, start] = useTransition();
  const onClick = () => {
    start(async () => {
      await fetch("/logout", { method: "POST" });
      window.location.href = "/";
    });
  };
  return (
    <button
      onClick={onClick}
      disabled={pending}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 transition-colors disabled:opacity-60"
    >
      {label} {pending ? "…" : "↗"}
    </button>
  );
}
