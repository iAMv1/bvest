export interface SponsorTier {
  tierName: string;
  badge: string;
  description: string;
  sponsors: {
    id: string;
    name: string;
    role: string;
    websiteUrl: string;
    placeholderLabel: string;
  }[];
}

export const SPONSOR_TIERS: SponsorTier[] = [
  {
    tierName: "TITLE PARTNER",
    badge: "Flagship Presenting Sponsor",
    description: "Anchor organization powering the visionary mission of HackBVP 8.0.",
    sponsors: [
      {
        id: "title-partner",
        name: "[TITLE PARTNER]",
        role: "Global Innovation Leader",
        websiteUrl: "#",
        placeholderLabel: "TITLE SPONSOR PARTNER"
      }
    ]
  },
  {
    tierName: "POWERED BY",
    badge: "Ecosystem Backbone",
    description: "Providing foundational technical infrastructure and developer tooling.",
    sponsors: [
      {
        id: "powered-by-1",
        name: "[PARTNER ONE]",
        role: "Cloud & AI Infrastructure",
        websiteUrl: "#",
        placeholderLabel: "CLOUD PARTNER"
      },
      {
        id: "powered-by-2",
        name: "[PARTNER TWO]",
        role: "Developer Platform & Tooling",
        websiteUrl: "#",
        placeholderLabel: "PLATFORM PARTNER"
      }
    ]
  },
  {
    tierName: "TECHNOLOGY PARTNERS",
    badge: "Tooling & APIs",
    description: "Granting live APIs, cloud credits, and specialized SDK access to hackers.",
    sponsors: [
      {
        id: "tech-1",
        name: "[PARTNER THREE]",
        role: "Decentralized Infrastructure",
        websiteUrl: "#",
        placeholderLabel: "API SPONSOR"
      },
      {
        id: "tech-2",
        name: "[PARTNER FOUR]",
        role: "Database & Vector Systems",
        websiteUrl: "#",
        placeholderLabel: "DATABASE SPONSOR"
      },
      {
        id: "tech-3",
        name: "[PARTNER FIVE]",
        role: "Authentication & Security",
        websiteUrl: "#",
        placeholderLabel: "DEV SEC PARTNER"
      },
      {
        id: "tech-4",
        name: "[PARTNER SIX]",
        role: "AI Model Provider",
        websiteUrl: "#",
        placeholderLabel: "MODEL PROVIDER"
      }
    ]
  },
  {
    tierName: "COMMUNITY & ECOSYSTEM",
    badge: "Outreach & Student Chapters",
    description: "Connecting student developer chapters across universities nationwide.",
    sponsors: [
      {
        id: "comm-1",
        name: "[COMMUNITY PARTNER ALPHA]",
        role: "Delhi Tech Student Guild",
        websiteUrl: "#",
        placeholderLabel: "STUDENT GUILD"
      },
      {
        id: "comm-2",
        name: "[COMMUNITY PARTNER BETA]",
        role: "Open Source Collective",
        websiteUrl: "#",
        placeholderLabel: "OSS ALLIANCE"
      },
      {
        id: "comm-3",
        name: "[COMMUNITY PARTNER GAMMA]",
        role: "Women In Tech Network",
        websiteUrl: "#",
        placeholderLabel: "WIT NETWORK"
      },
      {
        id: "comm-4",
        name: "[COMMUNITY PARTNER DELTA]",
        role: "Sustainability Fellowship",
        websiteUrl: "#",
        placeholderLabel: "IMPACT ACCELERATOR"
      }
    ]
  }
];
