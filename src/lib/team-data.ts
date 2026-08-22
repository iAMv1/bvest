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
    role: "Logistics + Food Coordinator",
    departments: ["Food", "Logistics & Discipline"],
    bio: "Taking care of food arrangements and on-ground requirements to ensure the event flows smoothly.",
    initials: "AY",
    color: "#00689D",
    image: "/coreteampics/aditya.jpeg",
    category: "logistics",
  },
  {
    id: "2",
    name: "Anand Misra",
    role: "EM + Logistics + Sponsorship Coordinator",
    departments: ["Event Management", "Logistics", "Sponsorship"],
    bio: "Working across event execution, logistics, and sponsorship to keep different teams and requirements connected throughout the fest.",
    initials: "AM",
    color: "#FF3A21",
    image: "/coreteampics/Anand Misra.jpeg",
    category: "events",
  },
  {
    id: "3",
    name: "Anant Pushkar",
    role: "Design + Social Media Coordinator",
    departments: ["Design", "Social Media & Photography"],
    bio: "Bringing together creative visuals and social media content while shaping how the fest is presented across digital platforms.",
    initials: "AP",
    color: "#DDA63A",
    category: "tech",
  },
  {
    id: "4",
    name: "Dhruv Kashyap",
    role: "Design Coordinator",
    departments: ["Design"],
    bio: "Working on creative visuals while adding a consistent look to the fest’s communication.",
    initials: "DK",
    color: "#A21942",
    image: "/coreteampics/Dhruv.PNG",
    category: "tech",
  },
  {
    id: "5",
    name: "Hasdeep Singh",
    role: "Outreach + Sponsorship Coordinator",
    departments: ["Sponsorship", "Outreach"],
    bio: "Contributing towards brand collaborations and sponsorship opportunities for the fest.",
    initials: "HS",
    color: "#26BDE2",
    image: "/coreteampics/Hasdeep.jpeg",
    category: "outreach",
  },
  {
    id: "6",
    name: "Muskan",
    role: "Inauguration + Outreach Coordinator",
    departments: ["Inauguration & Outreach", "Decoration"],
    bio: "Contributing to the opening ceremony, outreach activities, and event presentation while working closely with the team.",
    initials: "MM",
    color: "#DD1367",
    image: "/coreteampics/Muskan.jpg",
    category: "outreach",
  },
  {
    id: "7",
    name: "Pratham Nahata",
    role: "EM, Technical + Budget Coordinator",
    departments: ["Technical", "Event Management", "Budget"],
    bio: "Working across event operations, technical requirements, and budgeting to support the smooth execution of different activities.",
    initials: "PN",
    color: "#4C9F38",
    category: "events",
  },
  {
    id: "8",
    name: "Rameshwar",
    role: "Logistics + Food Coordinator",
    departments: ["Food", "Logistics & Discipline"],
    bio: "Working on venue requirements and food arrangements to keep the event running smoothly.",
    initials: "RM",
    color: "#FD9D24",
    image: "/coreteampics/rameshwar_.jpg",
    category: "logistics",
  },
  {
    id: "9",
    name: "Saksham Budhiraja",
    role: "Website + Tech Support Coordinator",
    departments: ["Website", "Tech Support"],
    bio: "Working on the fest website and technical requirements while supporting the digital side of the event.",
    initials: "SB",
    color: "#E5243B",
    image: "/coreteampics/Saksham Budhiraja.jpeg",
    category: "tech",
  },
  {
    id: "10",
    name: "Tulika Bhatia",
    role: "Budget + Documentation Coordinator",
    departments: ["Budget", "Documentation"],
    bio: "Working on financial planning and documentation while keeping important event details up to date.",
    initials: "TB",
    color: "#FCC30B",
    image: "/coreteampics/Tulika.jpg",
    category: "outreach",
  },
];
