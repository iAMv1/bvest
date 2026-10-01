export interface StatItem {
  id: string;
  value: string;
  number: number;
  suffix?: string;
  label: string;
  sublabel: string;
  color?: string;
}

export const HACKATHON_STATS: StatItem[] = [
  {
    id: "hours",
    value: "36",
    number: 36,
    suffix: "h",
    label: "Continuous Hacking",
    sublabel: "Non-stop in-person sprint on campus",
    color: "#26BDE2"
  },
  {
    id: "sdgs",
    value: "17",
    number: 17,
    suffix: "",
    label: "UN Global Goals",
    sublabel: "The core architecture of every challenge",
    color: "#FCC30B"
  },
  {
    id: "builders",
    value: "400",
    number: 400,
    suffix: "+",
    label: "Elite Builders",
    sublabel: "Engineers, designers & researchers nationwide",
    color: "#E5243B"
  },
  {
    id: "teams",
    value: "100",
    number: 100,
    suffix: "+",
    label: "Finalist Teams",
    sublabel: "Shortlisted from over 1,500+ applicants",
    color: "#FD6925"
  },
  {
    id: "prize",
    value: "1.5",
    number: 150000,
    suffix: "L+",
    label: "Prize Pool Value",
    sublabel: "Cash rewards, credits, and sponsor bounties",
    color: "#4C9F38"
  },
  {
    id: "edition",
    value: "8th",
    number: 8,
    suffix: "th",
    label: "Annual Edition",
    sublabel: "Continuous legacy of technical excellence",
    color: "#DD1367"
  }
];

export const SDG_NARRATIVE_STATS = [
  { value: "17", label: "GLOBAL GOALS", color: "#E5243B" },
  { value: "1", label: "SHARED PLANET", color: "#26BDE2" },
  { value: "∞", label: "POSSIBILITIES", color: "#FCC30B" },
  { value: "2030", label: "SHARED DEADLINE", color: "#4C9F38" }
];
