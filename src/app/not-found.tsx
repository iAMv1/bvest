import { ErrorShell } from "@/components/ErrorShell";

export default function NotFound() {
  return (
    <ErrorShell
      code="404"
      eyebrow="Signal lost in the fest grid"
      accentDot="bg-sdg6"
      gradientFrom="from-sdg6"
      gradientTo="to-sdg3"
      title="This page drifted off the"
      gradientWord="grid"
      copy="The page you&apos;re looking for doesn&apos;t exist, hasn&apos;t been built yet, or packed up and left. Head back — the fest is still live."
      primaryLabel="Back to Home"
      primaryHref="/"
      secondaryLabel="Explore the 17 Goals"
      secondaryHref="/#goals"
    />
  );
}