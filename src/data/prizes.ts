export interface PrizeTier {
  id: string;
  rank: string;
  title: string;
  amount: string;
  tag: string;
  description: string;
  color: string;
  perks: string[];
  featured?: boolean;
}

export interface SpecialAward {
  id: string;
  title: string;
  sdgTag: string;
  amount: string;
  description: string;
  icon: string;
}

export const PRIZE_TIERS: PrizeTier[] = [
  {
    id: "grand-prize",
    rank: "01",
    title: "GRAND CHAMPION",
    amount: "₹50,000",
    tag: "Overall Winner",
    description: "Awarded to the most groundbreaking, architecturally sound, and societally impactful solution presented at HackBVP 8.0.",
    color: "#FCC30B", // Gold / SDG 7 yellow
    featured: true,
    perks: [
      "Direct fast-track interview rounds with top partner engineering teams",
      "Cloud credits & premium developer tooling vouchers worth ₹1,00,000+",
      "Official Winner Trophy, physical certificates & exclusive HackBVP swag pack",
      "Incubation mentorship & seed grant presentation opportunities"
    ]
  },
  {
    id: "second-prize",
    rank: "02",
    title: "FIRST RUNNER-UP",
    amount: "₹30,000",
    tag: "Excellence in Execution",
    description: "Awarded to the project demonstrating outstanding technical rigor, thoughtful UX polish, and deep SDG alignment.",
    color: "#26BDE2", // Silver/Cyan / SDG 6
    perks: [
      "Mentorship sessions with senior engineering leaders & founders",
      "Cloud infra credits worth ₹50,000+",
      "Runner-up Memento, verified certificates & HackBVP premium swag",
      "Priority consideration for student incubator cohorts"
    ]
  },
  {
    id: "third-prize",
    rank: "03",
    title: "SECOND RUNNER-UP",
    amount: "₹20,000",
    tag: "Technical Innovation",
    description: "Celebrates exceptional creativity, ambitious scope, and functional end-to-end prototype delivery.",
    color: "#FD6925", // Bronze/Orange / SDG 9
    perks: [
      "Technical advisory sessions with domain specialists",
      "Developer credits & domain vouchers",
      "Runner-up Memento & official certificates",
      "HackBVP merchandise and community showcase feature"
    ]
  }
];

export const SPECIAL_SDG_AWARDS: SpecialAward[] = [
  {
    id: "best-climate",
    title: "Best Climate & Biosphere Solution",
    sdgTag: "SDG 13, 14, 15",
    amount: "₹10,000",
    description: "Most impactful environmental monitoring, carbon accounting, or ecological restoration hack.",
    icon: "Leaf"
  },
  {
    id: "best-health",
    title: "Best Healthcare & Well-Being Hack",
    sdgTag: "SDG 03",
    amount: "₹10,000",
    description: "Most innovative telemedicine, clinical diagnostic, or mental health assistive technology.",
    icon: "Heart"
  },
  {
    id: "best-inclusive",
    title: "Best Assistive & Inclusive Tech",
    sdgTag: "SDG 05, 10",
    amount: "₹10,000",
    description: "Exemplary solution addressing physical accessibility, gender equity, or social safety nets.",
    icon: "Sparkles"
  },
  {
    id: "best-smart-city",
    title: "Best Smart City & Infrastructure",
    sdgTag: "SDG 09, 11",
    amount: "₹10,000",
    description: "Superior civic automation, disaster resilience, or urban transportation intelligence.",
    icon: "Compass"
  },
  {
    id: "best-freshers",
    title: "Best All-Freshers / Beginner Team",
    sdgTag: "All SDGs",
    amount: "₹5,000 + Swag",
    description: "Highest scoring team composed entirely of first-year collegiate builders.",
    icon: "Zap"
  },
  {
    id: "best-ai-impact",
    title: "Best AI for Global Impact",
    sdgTag: "UN SDG System",
    amount: "₹5,000 + Credits",
    description: "Most creative, responsible deployment of ML models solving acute real-world friction.",
    icon: "Cpu"
  }
];

export const GENERAL_PERKS = [
  { title: "36 Hours Meals & High-Speed Wi-Fi", desc: "Nutritious meals, midnight snacks, uninterrupted power and gigabit campus connectivity." },
  { title: "Exclusive Swag Kit", desc: "Custom HackBVP 8.0 mechanical graphic tees, holographic sticker packs, badges, and sponsor perks." },
  { title: "Verifiable Participation Credential", desc: "Digitally signed certificates recognized across premier engineering institutions." },
  { title: "Industry Mentorship", desc: "1-on-1 scheduled office hours with senior architects, FAANG engineers, and venture founders." }
];
