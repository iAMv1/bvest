export interface TimelineEvent {
  id: string;
  time: string;
  date: string;
  title: string;
  description: string;
  stage: "pre-hack" | "day-1" | "day-2" | "post-hack";
  sdgEmphasis?: string;
  badge?: string;
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
    subtitle: "36-Hour Sprint Execution",
    description: "Transform blueprints into functioning code and hardware prototypes. Push code to your team repo, hook up live APIs, and assemble responsive interfaces.",
    actionableTip: "Prioritize end-to-end working flow over ten half-baked micro-features.",
    iconName: "Code2",
    color: "#FCC30B"
  },
  {
    step: "04",
    title: "VALIDATE & REFINE",
    subtitle: "Mentorship Stress-Testing",
    description: "Present your alpha prototype to industry architects and domain specialists during scheduled midnight checkpoints. Ingest critical feedback and pivot rapidly.",
    actionableTip: "Ask mentors: 'Where will this break at 10,000 real-world users?'",
    iconName: "CheckCircle2",
    color: "#26BDE2"
  },
  {
    step: "05",
    title: "IMPACT & SCALE",
    subtitle: "The Jury Showcase",
    description: "Pitch live on stage. Demonstrate your working prototype, articulate measurable SDG outcomes, and lay out an actionable open-source post-hackathon roadmap.",
    actionableTip: "Show real live telemetry or interactive demo runs, not static slides.",
    iconName: "Rocket",
    color: "#4C9F38"
  }
];

export const EVENT_SCHEDULE: TimelineEvent[] = [
  {
    id: "reg-open",
    date: "OCTOBER 01, 2026",
    time: "10:00 AM IST",
    title: "Registrations & Track Guidelines Open",
    description: "Official portal goes live. Builders register teams, browse the 17 SDG challenge banks, and join the HackBVP Discord community.",
    stage: "pre-hack",
    badge: "Milestone"
  },
  {
    id: "reg-close",
    date: "OCTOBER 18, 2026",
    time: "11:59 PM IST",
    title: "Applications Deadline & Shortlisting",
    description: "Registration portal closes. Shortlisted teams receive official invitation emails, travel advisories, and check-in QR passes.",
    stage: "pre-hack",
    badge: "Crucial"
  },
  {
    id: "check-in",
    date: "OCTOBER 22, 2026",
    time: "08:00 AM – 09:30 AM",
    title: "Campus Check-in & Breakfast",
    description: "Builders arrive at BVCOE Delhi campus. Physical kit distribution, badge handoffs, Wi-Fi pairing, and workspace allocation.",
    stage: "day-1"
  },
  {
    id: "opening-ceremony",
    date: "OCTOBER 22, 2026",
    time: "10:00 AM – 11:00 AM",
    title: "Opening Ceremony & SDG Keynote",
    description: "Welcome address by institution leadership, introduction of judging panels, track sponsors, and release of detailed problem statements.",
    stage: "day-1",
    badge: "Ceremony"
  },
  {
    id: "hack-starts",
    date: "OCTOBER 22, 2026",
    time: "11:30 AM IST",
    title: "Hacking Sprint Begins (36h Timer Starts)",
    description: "The countdown clock starts! Builders start coding, repository setups initialize, and real-time Discord support desks open.",
    stage: "day-1",
    badge: "Hacking Active"
  },
  {
    id: "mentor-round-1",
    date: "OCTOBER 22, 2026",
    time: "04:00 PM – 06:30 PM",
    title: "Mentorship Round 01: Architecture Audit",
    description: "Senior engineers and domain experts visit team tables to evaluate technical viability, SDG scope, and API architectural choices.",
    stage: "day-1"
  },
  {
    id: "midnight-checkpoint",
    date: "OCTOBER 23, 2026",
    time: "01:00 AM – 02:30 AM",
    title: "Midnight Checkpoint & Fun Mini-Games",
    description: "Midnight coffee, energy drinks, gaming tournaments, and quick code health reviews to keep momentum high.",
    stage: "day-1",
    badge: "Energizer"
  },
  {
    id: "mentor-round-2",
    date: "OCTOBER 23, 2026",
    time: "07:30 AM – 09:30 AM",
    title: "Mentorship Round 02: UX & Stress Testing",
    description: "Final technical guidance before freeze. Mentors verify prototype stability, mobile responsiveness, and presentation flow.",
    stage: "day-2"
  },
  {
    id: "code-freeze",
    date: "OCTOBER 23, 2026",
    time: "02:00 PM IST",
    title: "Final Code & Video Submission Deadline",
    description: "Git repositories locked. Video demonstrations, pitch decks, and GitHub links uploaded to the evaluation portal.",
    stage: "day-2",
    badge: "Hard Deadline"
  },
  {
    id: "jury-pitches",
    date: "OCTOBER 23, 2026",
    time: "03:00 PM – 05:30 PM",
    title: "Live Jury Demos & Evaluation",
    description: "Top finalist teams present 5-minute live working demos followed by 3-minute technical Q&A before the grand jury.",
    stage: "day-2",
    badge: "Showcase"
  },
  {
    id: "valedictory",
    date: "OCTOBER 23, 2026",
    time: "06:30 PM – 08:00 PM",
    title: "Closing Ceremony & Grand Winner Awards",
    description: "Announcement of track winners, special SDG category awards, Grand Champions, trophy presentations, and group photography.",
    stage: "day-2",
    badge: "Winners"
  }
];
