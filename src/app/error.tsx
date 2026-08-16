"use client";

import { useEffect } from "react";
import { ErrorShell } from "@/components/ErrorShell";

export default function PageError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <ErrorShell
      code="ERROR"
      eyebrow="The grid hit a fault"
      accentDot="bg-sdg10"
      gradientFrom="from-sdg10"
      gradientTo="to-sdg6"
      title="Something short"
      gradientWord="circuited"
      copy="Something went wrong while loading this page. Give it another go — if it keeps happening, ping the fest tech team."
      primaryLabel="Try Again"
      onReset={reset}
      secondaryLabel="Back to Home"
      secondaryHref="/"
    />
  );
}