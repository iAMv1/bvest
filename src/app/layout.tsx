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
  metadataBase: new URL("https://bvest.bvcoend.ac.in"),
  title: {
    default: "BVEST XIII",
    template: "%s | BVEST XIII",
  },
  description:
    "Official portal for BVEST XIII (2026), the annual college technical fest of Bharati Vidyapeeth's College of Engineering (BVCOE), New Delhi, themed around the 17 UN Sustainable Development Goals (SDGs).",
  keywords: [
    "BVEST",
    "BVEST 2026",
    "BVEST XIII",
    "BVCOE",
    "BVCOE Delhi",
    "Bharati Vidyapeeth's College of Engineering",
    "UN SDGs",
    "Sustainable Development Goals",
    "College Technical Fest Delhi",
    "Hackathon Delhi",
  ],
  authors: [
    { name: "BVCOE Delhi", url: "https://bvcoend.ac.in" },
    { name: "BVEST Tech Team" },
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "BVEST XIII",
    description:
      "Innovating for a Sustainable Future across the 17 UN Sustainable Development Goals. Join 30+ student societies at BVCOE Delhi on October 22–23, 2026.",
    url: "https://bvest.bvcoend.ac.in",
    siteName: "BVEST XIII",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BVEST XIII Logo",
      },
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "BVEST XIII Icon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BVEST XIII",
    description:
      "Official website for BVEST XIII at BVCOE Delhi. Technical events, hackathons, and showcases themed around the 17 UN Sustainable Development Goals.",
    creator: "@bvcoe_delhi",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
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