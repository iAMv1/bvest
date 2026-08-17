"use client";

import { useEffect } from "react";
import { ErrorShell } from "@/components/ErrorShell";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html
      lang="en"
      className="h-full antialiased dark"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=localStorage.getItem("bvest-theme")||"system";var t=p==="system"?(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"):p;var r=document.documentElement;r.classList.toggle("dark",t==="dark");r.style.colorScheme=t;}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full bg-[var(--background)] font-sans">
        <div className="noise-overlay" aria-hidden="true" />
        <ErrorShell
          code="500"
          eyebrow="Critical system fault"
          accentDot="bg-sdg10"
          gradientFrom="from-sdg10"
          gradientTo="to-sdg6"
          title="The core"
          gradientWord="faulted"
          copy="A critical failure took the whole fest offline. Reset and re-enter — if this persists, contact the fest tech team immediately."
          primaryLabel="Reconnect"
          onReset={reset}
          secondaryLabel="Back to Home"
          secondaryHref="/"
        />
      </body>
    </html>
  );
}