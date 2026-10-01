"use client";

import React, { useEffect, useState } from "react";
import { GatewayFlow } from "@/components/ui/GatewayFlow";

/**
 * HackBVP Animated Dots / Particle Flow Background.
 * Rendered exclusively on the Hackathon website (/hackathon).
 */
export const GlobalBackgroundFlow: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-1 overflow-hidden select-none"
      aria-hidden="true"
      style={{ opacity: 0.95 }}
    >
      <GatewayFlow
        className="w-full h-full"
        speed={1.05}
        density={1.1}
        particleColor="rgba(6, 182, 212, 0.95)"
        lineColor="rgba(6, 182, 212, 0.38)"
        glowColor="rgba(56, 189, 248, 0.85)"
        interactive={true}
      />
    </div>
  );
};

export const HackathonBackgroundFlow = GlobalBackgroundFlow;
export default GlobalBackgroundFlow;
