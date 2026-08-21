export interface TeamMember {
  id: string;
  name: string;
  role: string;
  departments: string[];
  bio: string;
  initials: string;
  color: string;
  image?: string;
  category?: "tech" | "events" | "logistics" | "outreach";
}

export const coreTeamData: TeamMember[] = [
  {
    id: "1",
    name: "Aditya Yadav",
    role: "Logistics & Food Coordinator",
    departments: ["Food", "Logistics & Discipline"],
    bio: "Directing food arrangements, ground logistics, and student discipline.",
    initials: "AY",
    color: "#00689D",
    image: "/coreteampics/aditya.jpeg",
    category: "logistics",
  },
  {
    id: "2",
    name: "Anand Misra",
    role: "EM Coordinator",
    departments: ["Event Management"],
    bio: "Managing event execution, stage coordination, and competition schedules.",
    initials: "AM",
    color: "#FF3A21",
    image: "/coreteampics/Anand Misra.jpeg",
    category: "events",
  },
  {
    id: "3",
    name: "Anant Pushkar",
    role: "Design & Social Media Coordinator",
    departments: ["Design", "Social Media & Photography"],
    bio: "Directing graphic design, digital media coverage, and social media campaigns.",
    initials: "AP",
    color: "#DDA63A",
    category: "tech",
  },
  {
    id: "4",
    name: "Dhruv Kashyap",
    role: "Design Coordinator",
    departments: ["Design"],
    bio: "Crafting visual assets, banners, and creative designs for BVEST.XIII.",
    initials: "DK",
    color: "#A21942",
    image: "/coreteampics/Dhruv.PNG",
    category: "tech",
  },
  {
    id: "5",
    name: "Hasdeep Singh",
    role: "Outreach + Sponsorship Coordinator",
    departments: ["Sponsorship"],
    bio: "Managing corporate partnerships, brand tie-ups, and sponsorships for BVEST.XIII.",
    initials: "HS",
    color: "#26BDE2",
    image: "/coreteampics/Hasdeep.jpeg",
    category: "outreach",
  },
  {
    id: "6",
    name: "Muskan",
    role: "Inauguration & Outreach Coordinator",
    departments: ["Inauguration & Outreach", "Decoration"],
    bio: "Leading inauguration ceremonies, campus outreach, and decorative design.",
    initials: "MM",
    color: "#DD1367",
    image: "/coreteampics/Muskan.jpg",
    category: "outreach",
  },
  {
    id: "7",
    name: "Pratham Nahata",
    role: "EM, Technical & Budget Coordinator",
    departments: ["Technical", "Event Management", "Budget", "Printing"],
    bio: "Coordinating technical setups, event management operations, printing logistics, and budget execution.",
    initials: "PN",
    color: "#4C9F38",
    category: "events",
  },
  {
    id: "8",
    name: "Rameshwar",
    role: "Logistics & Food Coordinator",
    departments: ["Food", "Logistics & Discipline"],
    bio: "Managing campus venue infrastructure, catering logistics, and event discipline.",
    initials: "RM",
    color: "#FD9D24",
    image: "/coreteampics/rameshwar_.jpg",
    category: "logistics",
  },
  {
    id: "9",
    name: "Saksham Budhraja",
    role: "Website & Tech Support Coordinator",
    departments: ["Website", "Tech Support"],
    bio: "Leading the development of the BVEST platform, website, and technical infrastructure.",
    initials: "SB",
    color: "#E5243B",
    image: "/coreteampics/Saksham Budhiraja.jpeg",
    category: "tech",
  },
  {
    id: "10",
    name: "Tulika Bhatia",
    role: "Budget & Documentation Coordinator",
    departments: ["Budget", "Documentation", "Printing", "Inauguration", "Decoration"],
    bio: "Overseeing financial planning, official documentation, printing, and event decoration.",
    initials: "TB",
    color: "#FCC30B",
    image: "/coreteampics/Tulika.jpg",
    category: "outreach",
  },
];
