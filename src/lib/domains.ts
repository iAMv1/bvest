export interface Domain {
  id: string;
  name: string;
  description: string;
  colorToken: string; // CSS custom property name, e.g. "var(--color-sdg3)"
}

export const domains: Domain[] = [
  {
    id: "sdg-debates",
    name: "SDG Debates & Policy Dialogues",
    description: "Sustainability, climate policies & social issues",
    colorToken: "var(--color-sdg13)",
  },
  {
    id: "sustainable-robotics",
    name: "Sustainable Robotics Challenges",
    description: "Robotics for environmental & social impact",
    colorToken: "var(--color-sdg9)",
  },
  {
    id: "sdg-ideation",
    name: "SDG Ideation & Innovation Challenges",
    description: "Innovative solutions for real-world SDG problems",
    colorToken: "var(--color-sdg17)",
  },
  {
    id: "green-tech-talks",
    name: "Green Tech Talks & Industry-Academia Connect",
    description: "Sustainable technology, industry practices & innovation",
    colorToken: "var(--color-sdg7)",
  },
  {
    id: "sustainable-entrepreneurship",
    name: "Sustainable Entrepreneurship & E-Talks",
    description: "Green startups, social entrepreneurship & impact ventures",
    colorToken: "var(--color-sdg8)",
  },
  {
    id: "sustainability-data-science",
    name: "Sustainability Data Science & Analytics Challenge",
    description: "Data-driven solutions for SDG challenges",
    colorToken: "var(--color-sdg16)",
  },
  {
    id: "sdg-pitching",
    name: "SDG Pitching Competitions & B-Plans",
    description: "Business solutions addressing sustainability & social impact",
    colorToken: "var(--color-sdg1)",
  },
  {
    id: "green-hardware-vlsi",
    name: "Green Hardware & VLSI Sprint",
    description: "Energy-efficient, smart & sustainable hardware solutions",
    colorToken: "var(--color-sdg7)",
  },
  {
    id: "sustainable-uiux",
    name: "Sustainable UI/UX & Product Design",
    description: "Designing eco-friendly, inclusive & sustainable products",
    colorToken: "var(--color-sdg10)",
  },
  {
    id: "sdg-case-studies",
    name: "SDG Case Studies & Problem-Solving Competitions",
    description: "Real-world environmental, social & economic challenges",
    colorToken: "var(--color-sdg15)",
  },
  {
    id: "sdg-trivia",
    name: "SDG Trivia & Quiz",
    description: "Sustainability, environment, technology & global goals",
    colorToken: "var(--color-sdg3)",
  },
  {
    id: "sustainability-gaming",
    name: "Sustainability Gaming & Esports",
    description: "Gaming experiences based on climate, sustainability & SDG awareness",
    colorToken: "var(--color-sdg11)",
  },
];
