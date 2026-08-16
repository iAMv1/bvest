import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Link from "next/link";
import { IntroOverlay } from "@/components/IntroOverlay";
import { BvestLogo } from "@/components/BvestLogo";
import { IntroProvider } from "@/components/IntroContext";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
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
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <IntroProvider>
          <IntroOverlay />

          {/* Navigation Header */}
          <header className="sticky top-0 z-40 w-full border-b border-gray-100 dark:border-gray-900 bg-background/85 backdrop-blur-md transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              <Link href="/" className="text-gray-900 dark:text-white">
                <BvestLogo size={56} />
              </Link>
              <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
                <Link href="/#goals" className="hover:text-gray-900 dark:hover:text-white transition-colors">Goals</Link>
                <Link href="/#featured-events" className="hover:text-gray-900 dark:hover:text-white transition-colors">Events</Link>
                <Link href="/society/login" className="hover:text-gray-900 dark:hover:text-white transition-colors">Society Portal</Link>
                <Link href="/admin/login" className="hover:text-gray-900 dark:hover:text-white transition-colors">Admin Portal</Link>
                <Link href="/#contact" className="hover:text-gray-900 dark:hover:text-white transition-colors">Contact</Link>
              </nav>
              <div className="flex items-center gap-4">
                <Link
                  href="/#goals"
                  className="px-5 py-2 bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 rounded-full text-xs font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:scale-105 duration-200"
                >
                  Explore Events
                </Link>
              </div>
            </div>
          </header>

          {children}
        </IntroProvider>
      </body>
    </html>
  );
}
