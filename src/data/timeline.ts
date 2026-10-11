export interface TimelineStation {
  id: string;
  time: string;
  date: string;
  day: "day-1" | "day-2";
  phase: string;
  mode: "ONLINE" | "OFFLINE";
  platform: string;
  title: string;
  description: string;
  badge?: string;
  isSpecial?: "start" | "end" | "turn" | "milestone";
  iconType?: "flag" | "code" | "users" | "coffee" | "award" | "mic" | "sparkles";
}

export interface JourneyStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  actionableTip: string;
  iconName: string;
  color: string;
}

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    step: "01",
    title: "IDENTIFY",
    subtitle: "Anchor in Real-World Friction",
    description: "Select one of the 17 UN SDGs. Study localized friction points—whether groundwater depletion in North India or high-latency clinical triage in rural health sub-centers.",
    actionableTip: "Don't build solutions looking for a problem. Interview domain users or read UN baseline reports.",
    iconName: "Search",
    color: "#E5243B"
  },
  {
    step: "02",
    title: "ARCHITECT",
    subtitle: "Pragmatic Engineering Design",
    description: "Map your technical blueprint. Select the right foundational primitives: lightweight edge inference, offline mesh networking, real-time spatial tiles, or robust REST APIs.",
    actionableTip: "Aim for clean system interfaces over bloated, unverified tech stacks.",
    iconName: "Cpu",
    color: "#FD6925"
  },
  {
    step: "03",
    title: "BUILD",
    subtitle: "24-Hour Hybrid Sprint Execution",
    description: "Transform blueprints into functioning code and hardware prototypes. Push code to your team repo, hook up live APIs, and assemble responsive interfaces.",
    actionableTip: "Prioritize end-to-end working flow over ten half-baked micro-features.",
    iconName: "Code2",
    color: "#FCC30B"
  },
  {
    step: "04",
    title: "VALIDATE & REFINE",
    subtitle: "Mentorship Stress-Testing",
    description: "Present your alpha prototype to industry architects and domain specialists during scheduled checkpoint rounds. Ingest critical feedback and pivot rapidly.",
    actionableTip: "Ask mentors: 'Where will this break at 10,000 real-world users?'",
    iconName: "CheckCircle2",
    color: "#26BDE2"
  },
  {
    step: "05",
    title: "IMPACT & SCALE",
    subtitle: "The Jury Showcase",
    description: "Pitch live on the BVCOE auditorium main stage. Demonstrate working code, articulate measurable SDG outcomes, and lay out an actionable post-hackathon roadmap.",
    actionableTip: "Show real live telemetry or interactive demo runs, not static slides.",
    iconName: "Rocket",
    color: "#4C9F38"
  }
];

export const TIMELINE_METRO_DATA: TimelineStation[] = [
  // DAY 1: ONLINE | 18 OCT (DISCORD)
  {
    id: "d1-welcome",
    time: "8:00 AM",
    date: "18 OCT 2026",
    day: "day-1",
    phase: "DAY 1",
    mode: "ONLINE",
    platform: "DISCORD · MAIN STAGE",
    title: "WELCOME",
    description: "Welcome address, hackathon protocol briefing, release of detailed problem statements, team channel initialization, and official opening of HackBVP 8.0 Day 1.",
    badge: "START",
    isSpecial: "start",
    iconType: "flag"
  },
  {
    id: "d1-dev-1",
    time: "8:30 AM – 11:30 AM",
    date: "18 OCT 2026",
    day: "day-1",
    phase: "DAY 1",
    mode: "ONLINE",
    platform: "DISCORD · TEAM VOICE ROOMS",
    title: "PROJECT DEVELOPMENT",
    description: "Sprint round begins! Ideation, repository setup, architectural design, and core feature development under the United Nations 17 Sustainable Development Goals.",
    badge: "CORE SPRINT",
    iconType: "code"
  },
  {
    id: "d1-mentor",
    time: "11:30 AM – 1:30 PM",
    date: "18 OCT 2026",
    day: "day-1",
    phase: "DAY 1",
    mode: "ONLINE",
    platform: "DISCORD · MENTOR BOOTHS",
    title: "MENTORSHIP SESSION",
    description: "First technical stress-testing. Domain mentors visit team voice channels to review system architecture, API choices, feasibility, and SDG alignment.",
    badge: "MENTORING",
    isSpecial: "milestone",
    iconType: "users"
  },
  {
    id: "d1-lunch",
    time: "1:30 PM – 2:30 PM",
    date: "18 OCT 2026",
    day: "day-1",
    phase: "DAY 1",
    mode: "ONLINE",
    platform: "DISCORD · COMMUNITY LOUNGE",
    title: "LUNCH BREAK & ACTIVITIES",
    description: "Midday break, energizer trivia, community mini-games, and quick recharge before the afternoon deep development block.",
    badge: "ENERGIZER",
    iconType: "coffee"
  },
  {
    id: "d1-dev-2",
    time: "1:30 PM – 4:00 PM",
    date: "18 OCT 2026",
    day: "day-1",
    phase: "DAY 1",
    mode: "ONLINE",
    platform: "DISCORD · TEAM VOICE ROOMS",
    title: "PROJECT DEVELOPMENT",
    description: "Deep development phase. Prototyping core workflows, integrating databases, building frontend interfaces, and unit testing prior to preliminary evaluation.",
    badge: "SPRINT",
    iconType: "code"
  },
  {
    id: "d1-judging-1",
    time: "5:00 PM – 8:00 PM",
    date: "18 OCT 2026",
    day: "day-1",
    phase: "DAY 1",
    mode: "ONLINE",
    platform: "DISCORD · JURY ROOMS",
    title: "JUDGING & RESULTS ROUND I",
    description: "Round 1 evaluation. Teams present working progress and codebase to jury panels. Shortlisted finalist teams announced for Day 2 on BVCOE campus!",
    badge: "ROUND I RESULTS",
    isSpecial: "milestone",
    iconType: "award"
  },

  // DAY 2: OFFLINE | 22 OCT (BVCOE, NEW DELHI)
  {
    id: "d2-reporting",
    time: "8:00 AM",
    date: "22 OCT 2026",
    day: "day-2",
    phase: "DAY 2",
    mode: "OFFLINE",
    platform: "BVCOE NEW DELHI · MAIN CAMPUS",
    title: "REPORTING TIME",
    description: "Finalist teams arrive at BVCOE campus. Security check-in, physical badge allocation, Wi-Fi pairing, and HackBVP 8.0 custom swag kit distribution.",
    badge: "CHECK-IN",
    iconType: "flag"
  },
  {
    id: "d2-dev-mentoring",
    time: "9:00 AM – 11:00 AM",
    date: "22 OCT 2026",
    day: "day-2",
    phase: "DAY 2",
    mode: "OFFLINE",
    platform: "BVCOE · HACKING LABS",
    title: "PROJECT DEVELOPMENT & MENTORING",
    description: "Hardware pairing and morning in-person sprint. Senior industry mentors review prototypes table-by-table for edge cases, performance, and UI polish.",
    badge: "IN-PERSON MENTORING",
    iconType: "users"
  },
  {
    id: "d2-inauguration",
    time: "11:00 AM",
    date: "22 OCT 2026",
    day: "day-2",
    phase: "DAY 2",
    mode: "OFFLINE",
    platform: "BVCOE · MAIN AUDITORIUM",
    title: "INAUGURATION",
    description: "Official campus inauguration ceremony with college leadership, tech dignitaries, keynotes, and ceremonial lighting of the lamp for BVEST XIII.",
    badge: "CEREMONY",
    isSpecial: "milestone",
    iconType: "sparkles"
  },
  {
    id: "d2-dev-final",
    time: "12:00 PM – 1:30 PM",
    date: "22 OCT 2026",
    day: "day-2",
    phase: "DAY 2",
    mode: "OFFLINE",
    platform: "BVCOE · HACKING LABS",
    title: "DEVELOPMENT",
    description: "Final code push and polish. Refining user experience, assembling live test telemetry, stress-testing offline flows, and preparing pitch decks.",
    badge: "FINAL SPRINT",
    iconType: "code"
  },
  {
    id: "d2-lunch",
    time: "1:30 PM – 2:30 PM",
    date: "22 OCT 2026",
    day: "day-2",
    phase: "DAY 2",
    mode: "OFFLINE",
    platform: "BVCOE · DINING COMMONS",
    title: "LUNCH BREAK",
    description: "Campus networking buffet, refreshments, and casual interactions with organizers, mentors, and fellow builders across hackathon tracks.",
    badge: "NETWORKING BUFFET",
    iconType: "coffee"
  },
  {
    id: "d2-judging-2",
    time: "2:30 PM – 4:00 PM",
    date: "22 OCT 2026",
    day: "day-2",
    phase: "DAY 2",
    mode: "OFFLINE",
    platform: "BVCOE · EVALUATION PODS",
    title: "JUDGING ROUND II (RESULTS - 4:30 PM)",
    description: "Semifinal jury demonstration rounds. Teams demonstrate working prototypes to industry judges. Score tallying and top finalist shortlist announced at 4:30 PM.",
    badge: "SEMIFINALS",
    isSpecial: "milestone",
    iconType: "award"
  },
  {
    id: "d2-dev-pitch-prep",
    time: "4:30 PM – 5:30 PM",
    date: "22 OCT 2026",
    day: "day-2",
    phase: "DAY 2",
    mode: "OFFLINE",
    platform: "BVCOE · FINALIST PODS",
    title: "PROJECT DEVELOPMENT",
    description: "Selected grand finalist teams refine live demo run-throughs and auditorium slide presentations with specialized pitch coaches.",
    badge: "PITCH POLISH",
    iconType: "code"
  },
  {
    id: "d2-refreshments",
    time: "5:30 PM",
    date: "22 OCT 2026",
    day: "day-2",
    phase: "DAY 2",
    mode: "OFFLINE",
    platform: "BVCOE · CENTRAL COURTYARD",
    title: "REFRESHMENTS",
    description: "High tea, snacks, coffee recharge, and preparation for the auditorium grand finale showcase.",
    badge: "HIGH TEA",
    iconType: "coffee"
  },
  {
    id: "d2-pitching-3",
    time: "6:00 PM – 8:00 PM",
    date: "22 OCT 2026",
    day: "day-2",
    phase: "DAY 2",
    mode: "OFFLINE",
    platform: "BVCOE · AUDITORIUM STAGE",
    title: "PITCHING ROUND 3",
    description: "Grand finale stage! Top finalists present 5-minute live working demos followed by 3-minute hard Q&A before the grand jury panel and auditorium audience.",
    badge: "GRAND FINALE",
    isSpecial: "milestone",
    iconType: "mic"
  },
  {
    id: "d2-valedictory",
    time: "8:00 PM",
    date: "22 OCT 2026",
    day: "day-2",
    phase: "DAY 2",
    mode: "OFFLINE",
    platform: "BVCOE · AUDITORIUM STAGE",
    title: "VALEDICTORY CEREMONY",
    description: "Grand finale awards! Announcement of overall Champions, SDG category winners, prize distribution, trophy handover, and closing celebration.",
    badge: "END",
    isSpecial: "end",
    iconType: "award"
  }
];

// For backward compatibility with any other imports
export interface TimelineEvent {
  id: string;
  time: string;
  date: string;
  title: string;
  description: string;
  stage: "pre-hack" | "day-1" | "day-2" | "post-hack";
  badge?: string;
}

export const EVENT_SCHEDULE: TimelineEvent[] = TIMELINE_METRO_DATA.map((item) => ({
  id: item.id,
  time: item.time,
  date: item.date,
  title: item.title,
  description: item.description,
  stage: item.day,
  badge: item.badge
}));
