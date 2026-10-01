export interface ExpertProfile {
  id: string;
  name: string;
  role: string;
  organization: string;
  domain: string;
  type: "judge" | "mentor" | "speaker";
  avatarFallback: string;
  sdgFocus: number[];
  linkedinUrl: string;
  githubUrl?: string;
  twitterUrl?: string;
}

export const EXPERT_PROFILES: ExpertProfile[] = [
  {
    id: "judge-1",
    name: "[DISTINGUISHED JURY MEMBER 1]",
    role: "Principal AI Research Scientist",
    organization: "[GLOBAL TECH LABS]",
    domain: "Computer Vision & Edge Systems",
    type: "judge",
    avatarFallback: "J1",
    sdgFocus: [3, 9, 13],
    linkedinUrl: "https://linkedin.com",
    githubUrl: "https://github.com"
  },
  {
    id: "judge-2",
    name: "[DISTINGUISHED JURY MEMBER 2]",
    role: "VP of Engineering & Open Source",
    organization: "[ENTERPRISE CLOUD INFRA]",
    domain: "Distributed Systems & Cloud",
    type: "judge",
    avatarFallback: "J2",
    sdgFocus: [7, 9, 11],
    linkedinUrl: "https://linkedin.com",
    twitterUrl: "https://twitter.com"
  },
  {
    id: "judge-3",
    name: "[DISTINGUISHED JURY MEMBER 3]",
    role: "Director of Sustainable Technology",
    organization: "[CLIMATE IMPACT FOUNDATION]",
    domain: "CleanTech & Environmental GIS",
    type: "judge",
    avatarFallback: "J3",
    sdgFocus: [6, 12, 13, 15],
    linkedinUrl: "https://linkedin.com"
  },
  {
    id: "mentor-1",
    name: "[SENIOR MENTOR ALPHA]",
    role: "Staff Infrastructure Architect",
    organization: "[FINTECH CONSORTIUM]",
    domain: "Distributed Ledgers & Security",
    type: "mentor",
    avatarFallback: "M1",
    sdgFocus: [1, 8, 16],
    linkedinUrl: "https://linkedin.com",
    githubUrl: "https://github.com"
  },
  {
    id: "mentor-2",
    name: "[SENIOR MENTOR BETA]",
    role: "Head of Product & Design",
    organization: "[HEALTHCARE ACCELERATOR]",
    domain: "Accessible UX & Health Systems",
    type: "mentor",
    avatarFallback: "M2",
    sdgFocus: [3, 4, 10],
    linkedinUrl: "https://linkedin.com"
  },
  {
    id: "mentor-3",
    name: "[SENIOR MENTOR GAMMA]",
    role: "Hardware & IoT Systems Lead",
    organization: "[SMART MOBILITY LABS]",
    domain: "Embedded Sensors & Urban GIS",
    type: "mentor",
    avatarFallback: "M3",
    sdgFocus: [9, 11, 12],
    linkedinUrl: "https://linkedin.com",
    githubUrl: "https://github.com"
  },
  {
    id: "speaker-1",
    name: "[KEYNOTE SPEAKER ONE]",
    role: "Founder & Chief Technology Strategist",
    organization: "[SDG VENTURE LABS]",
    domain: "Scaling Technology for UN 2030",
    type: "speaker",
    avatarFallback: "S1",
    sdgFocus: [17],
    linkedinUrl: "https://linkedin.com",
    twitterUrl: "https://twitter.com"
  }
];
