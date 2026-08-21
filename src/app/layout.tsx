import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import { IntroOverlay } from "@/components/IntroOverlay";
import { IntroProvider } from "@/components/IntroContext";
import { SiteNavWrapper } from "@/components/SiteNavWrapper";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BackToTop } from "@/components/BackToTop";
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
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=localStorage.getItem("bvest-theme")||"system";var t=p==="system"?(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"):p;var r=document.documentElement;r.classList.toggle("dark",t==="dark");r.style.colorScheme=t;}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <IntroProvider>
            <IntroOverlay />

            {/* Floating island navigation — server-fed dynamic links */}
            <SiteNavWrapper />

            {children}

            {/* Back-to-top launcher — appears after scroll, shows page progress ring */}
            <BackToTop />

            {/* Fixed film grain — pointer-events-none, never on scrolling content */}
            <div className="noise-overlay" aria-hidden="true" />
          </IntroProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}