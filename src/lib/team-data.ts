export interface TeamMember {
  id: string;
  name: string;
  role: string;
  departments: string[];
  bio: string;
  initials: string;
  color: string;
}

export const coreTeamData: TeamMember[] = [
  {
    id: "1",
    name: "Aditya",
    role: "Logistics & Food Coordinator",
    departments: ["Food", "Logistics & Discipline"],
    bio: "Directing food arrangements, ground logistics, and student discipline.",
    initials: "AD",
    color: "#00689D",
  },
  {
    id: "2",
    name: "Anand",
    role: "EM Coordinator",
    departments: ["Event Management"],
    bio: "Managing event execution, stage coordination, and competition schedules.",
    initials: "AN",
    color: "#FF3A21",
  },
  {
    id: "3",
    name: "Anant Pushkar",
    role: "Design & Social Media Head",
    departments: ["Design", "Social Media & Photography"],
    bio: "Directing graphic design, digital media coverage, and social media campaigns.",
    initials: "AP",
    color: "#DDA63A",
  },
  {
    id: "4",
    name: "Dhruv",
    role: "Design Coordinator",
    departments: ["Design"],
    bio: "Crafting visual assets, banners, and creative designs for BVEST.XIII.",
    initials: "DH",
    color: "#A21942",
  },
  {
    id: "5",
    name: "Hasdeep",
    role: "Sponsorship Coordinator",
    departments: ["Sponsorship"],
    bio: "Managing corporate partnerships, brand tie-ups, and sponsorships for BVEST.XIII.",
    initials: "HD",
    color: "#26BDE2",
  },
  {
    id: "6",
    name: "Muskan",
    role: "Inauguration & Outreach Coordinator",
    departments: ["Inauguration & Outreach", "Decoration"],
    bio: "Leading inauguration ceremonies, campus outreach, and decorative design.",
    initials: "MS",
    color: "#DD1367",
  },
  {
    id: "7",
    name: "Pratham",
    role: "EM & Budget Coordinator",
    departments: ["Event Management", "Budget", "Printing"],
    bio: "Coordinating event management operations, printing logistics, and budget execution.",
    initials: "PR",
    color: "#4C9F38",
  },
  {
    id: "8",
    name: "Rameshwar",
    role: "Logistics & Food Coordinator",
    departments: ["Food", "Logistics & Discipline"],
    bio: "Managing campus venue infrastructure, catering logistics, and event discipline.",
    initials: "RM",
    color: "#FD9D24",
  },
  {
    id: "9",
    name: "Saksham",
    role: "Website & Tech Support Head",
    departments: ["Website", "Tech Support"],
    bio: "Leading the development of the BVEST platform, website, and technical infrastructure.",
    initials: "SK",
    color: "#E5243B",
  },
  {
    id: "10",
    name: "Tulika",
    role: "Budget & Documentation Coordinator",
    departments: ["Budget", "Documentation", "Printing", "Inauguration", "Decoration"],
    bio: "Overseeing financial planning, official documentation, printing, and event decoration.",
    initials: "TL",
    color: "#FCC30B",
  },
];
