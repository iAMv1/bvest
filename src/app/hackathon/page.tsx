import type { Metadata } from "next";
import { HackathonApp } from "@/components/hackathon/HackathonApp";
import { EVENT_CONFIG } from "@/data/event";

export const metadata: Metadata = {
  title: "HackBVP 8.0 — Build for a Better World",
  description:
    "HackBVP 8.0 is a technology hackathon inspired by the 17 Sustainable Development Goals. Build innovative solutions for real-world challenges at BVCOE New Delhi.",
  keywords: [
    "HackBVP",
    "HackBVP 8.0",
    "BVEST",
    "BVEST XIII",
    "BVCOE Delhi",
    "SDG Hackathon",
    "UN Sustainable Development Goals",
    "Delhi Hackathons 2026",
    "Student Hackathon India",
    "AI for Impact",
  ],
  authors: [
    { name: "HackBVP Organizing Team" },
    { name: "BVCOE Delhi Student Community" },
  ],
  openGraph: {
    title: "HackBVP 8.0 — Build for a Better World",
    description:
      "National flagship hackathon powered by the 17 UN Sustainable Development Goals. 36 hours of high-impact engineering at BVCOE New Delhi.",
    url: "https://bvest.bvcoend.ac.in/hackathon",
    siteName: "HackBVP 8.0",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HackBVP 8.0 — Build for a Better World",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HackBVP 8.0 — Build for a Better World",
    description:
      "Join 400+ builders at BVCOE Delhi for 36 hours of innovation centered on the 17 UN Sustainable Development Goals.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://bvest.bvcoend.ac.in/hackathon",
  },
};

export default function HackathonPage() {
  // JSON-LD Structured Data for Event SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hackathon",
    "name": `${EVENT_CONFIG.name} ${EVENT_CONFIG.edition}`,
    "description": EVENT_CONFIG.concept,
    "startDate": EVENT_CONFIG.startDate,
    "endDate": EVENT_CONFIG.endDate,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": EVENT_CONFIG.institution,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "A-4 Block, Paschim Vihar",
        "addressLocality": "New Delhi",
        "postalCode": "110063",
        "addressCountry": "IN",
      },
    },
    "organizer": {
      "@type": "Organization",
      "name": EVENT_CONFIG.organizer,
      "url": "https://bvest.bvcoend.ac.in/hackathon",
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": EVENT_CONFIG.registrationUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HackathonApp />
    </>
  );
}
