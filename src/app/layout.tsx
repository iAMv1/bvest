import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import { IntroOverlay } from "@/components/IntroOverlay";
import { IntroProvider } from "@/components/IntroContext";
import { SiteNav } from "@/components/SiteNav";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BVEST | College Technical Fest",
  description: "Official website for BVEST.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <IntroProvider>
          <IntroOverlay />

          {/* Floating island navigation */}
          <SiteNav />

          {children}

          {/* Fixed film grain — pointer-events-none, never on scrolling content */}
          <div className="noise-overlay" aria-hidden="true" />
        </IntroProvider>
      </body>
    </html>
  );
}