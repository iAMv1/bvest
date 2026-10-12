export interface FestEvent {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date string e.g. "2026-10-22"
  displayDate: string; // "October 22, 2026"
  dayLabel: "Day 1" | "Day 2";
  venue: string;
  unstopUrl: string;
  imageUrl: string;
  category?: string;
  sdgGoal?: number;
}

export const FEST_EVENTS: FestEvent[] = [
  // ── October 22, 2026 (Day 1) ──────────────────────────────────────────
  {
    id: "beyond-the-brief",
    slug: "beyond-the-brief",
    title: "Beyond the brief",
    description:
      "A creative design challenge combining graphic design and fashion communication, encouraging participants to transform ideas and meaningful messages into innovative visual campaigns and physical creations.",
    date: "2026-10-22",
    displayDate: "October 22, 2026",
    dayLabel: "Day 1",
    venue: "BVCOE, New Delhi",
    unstopUrl:
      "https://unstop.com/competitions/beyond-the-brief-bvest-xiii-bharati-vidyapeeths-college-of-engineering-1767816",
    imageUrl: "/bvest-logo-final.png",
    category: "Design & Creative",
    sdgGoal: 9,
  },
  {
    id: "messi-lines",
    slug: "messi-lines",
    title: "Messi Lines",
    description:
      "A robotics competition combining football and engineering, challenging participants to design and program robots that compete through precision, strategy, and intelligent control.",
    date: "2026-10-22",
    displayDate: "October 22, 2026",
    dayLabel: "Day 1",
    venue: "BVCOE, New Delhi",
    unstopUrl:
      "https://unstop.com/competitions/messi-lines-bvest-xiii-bharati-vidyapeeths-college-of-engineering-1767791",
    imageUrl: "/bvest-logo-final.png",
    category: "Robotics",
    sdgGoal: 9,
  },
  {
    id: "how-i-met-your-murderer",
    slug: "how-i-met-your-murderer",
    title: "How I Met Your Murderer",
    description:
      "An immersive murder mystery experience where participants investigate a campus crime scene, analyse cryptic clues, question suspects, and use deduction and critical thinking to uncover the truth before time runs out.",
    date: "2026-10-22",
    displayDate: "October 22, 2026",
    dayLabel: "Day 1",
    venue: "BVCOE, New Delhi",
    unstopUrl:
      "https://unstop.com/competitions/how-i-met-your-murderer-bvest-xiii-bharati-vidyapeeths-college-of-engineering-1767779",
    imageUrl: "/bvest-logo-final.png",
    category: "Mystery & Deduction",
    sdgGoal: 16,
  },
  {
    id: "dsa-showdown",
    slug: "dsa-showdown",
    title: "DSA Showdown",
    description:
      "A competitive programming event featuring aptitude assessments and data structures and algorithms challenges, evaluating logical reasoning, coding proficiency, algorithmic efficiency, and problem-solving skills.",
    date: "2026-10-22",
    displayDate: "October 22, 2026",
    dayLabel: "Day 1",
    venue: "BVCOE, New Delhi",
    unstopUrl:
      "https://unstop.com/competitions/dsa-showdown-bharati-vidyapeeths-college-of-engineering-1764784",
    imageUrl: "/bvest-logo-final.png",
    category: "Competitive Coding",
    sdgGoal: 4,
  },
  {
    id: "q-files",
    slug: "q-files",
    title: "Sherlock Files",
    description:
      "Sherlock Files is a three-round SQL challenge where teams investigate a fictional scholarship scam, uncover database irregularities, and expose the mastermind through data analysis and forensic deduction. Inspired by SDG 4 and SDG 8.",
    date: "2026-10-22",
    displayDate: "October 22, 2026",
    dayLabel: "Day 1",
    venue: "BVCOE, New Delhi",
    unstopUrl:
      "https://unstop.com/competitions/query-heist-bharati-vidyapeeths-college-of-engineering-1764780",
    imageUrl: "/bvest-logo-final.png",
    category: "Databases & Hunt",
    sdgGoal: 9,
  },
  {
    id: "dataverse",
    slug: "dataverse",
    title: "DataVerse",
    description:
      "A data-driven analytical challenge where participants investigate datasets, identify misleading information, and draw evidence-based conclusions through critical thinking and analytical reasoning.",
    date: "2026-10-22",
    displayDate: "October 22, 2026",
    dayLabel: "Day 1",
    venue: "BVCOE, New Delhi",
    unstopUrl:
      "https://unstop.com/competitions/dataverse-bharati-vidyapeeths-college-of-engineering-1764757",
    imageUrl: "/bvest-logo-final.png",
    category: "Data Science & Analytics",
    sdgGoal: 9,
  },
  {
    id: "ideas-on-trial",
    slug: "ideas-on-trial",
    title: "Ideas on Trial",
    description:
      "A courtroom-themed business competition where participants defend unsuccessful business ideas, analyse the reasons behind their failure, and demonstrate strategic thinking, persuasive communication, and entrepreneurial insight.",
    date: "2026-10-22",
    displayDate: "October 22, 2026",
    dayLabel: "Day 1",
    venue: "BVCOE, New Delhi",
    unstopUrl:
      "https://unstop.com/competitions/ideas-on-trial-bharati-vidyapeeths-college-of-engineering-1764739",
    imageUrl: "/bvest-logo-final.png",
    category: "Business & Strategy",
    sdgGoal: 8,
  },
  {
    id: "ig-nite",
    slug: "ig-nite",
    title: "IG:NITE",
    description:
      "A project revival competition that challenges participants to enhance existing projects by developing customised features, showcasing technical expertise, code quality, creativity, and implementation skills.",
    date: "2026-10-22",
    displayDate: "October 22, 2026",
    dayLabel: "Day 1",
    venue: "BVCOE, New Delhi",
    unstopUrl:
      "https://unstop.com/competitions/ignite-bharati-vidyapeeths-college-of-engineering-1764601",
    imageUrl: "/bvest-logo-final.png",
    category: "Software Development",
    sdgGoal: 9,
  },
  {
    id: "idea-got-latent",
    slug: "idea-got-latent",
    title: "Idea got Latent",
    description:
      "An idea-pitching competition that challenges participants to evaluate their own ideas before presenting them to a judging panel, testing self-awareness, confidence, and alignment with expert evaluation.",
    date: "2026-10-22",
    displayDate: "October 22, 2026",
    dayLabel: "Day 1",
    venue: "BVCOE, New Delhi",
    unstopUrl:
      "https://unstop.com/competitions/idea-got-latent-bharati-vidyapeeths-college-of-engineering-1764132",
    imageUrl: "/bvest-logo-final.png",
    category: "Pitching & Entrepreneurship",
    sdgGoal: 8,
  },
  {
    id: "binary-battles",
    slug: "binary-battles",
    title: "Binary Battles",
    description:
      "A technology-focused debate competition where participants defend opposing viewpoints, challenge arguments, and demonstrate logical reasoning, critical thinking, and persuasive communication.",
    date: "2026-10-22",
    displayDate: "October 22, 2026",
    dayLabel: "Day 1",
    venue: "BVCOE, New Delhi",
    unstopUrl:
      "https://unstop.com/competitions/binary-battles-bharati-vidyapeeths-college-of-engineering-1764121",
    imageUrl: "/bvest-logo-final.png",
    category: "Debate & Tech Talk",
    sdgGoal: 4,
  },
  {
    id: "kill-switch",
    slug: "kill-switch",
    title: "KILL//SWITCH",
    description:
      "A competitive battle royale experience featuring shifting alliances, squad reshuffles, and strategic eliminations, challenging participants to adapt their tactics and survive until the final showdown.",
    date: "2026-10-22",
    displayDate: "October 22, 2026",
    dayLabel: "Day 1",
    venue: "BVCOE, New Delhi",
    unstopUrl:
      "https://unstop.com/competitions/kill-switch-bharati-vidyapeeths-college-of-engineering-1763936",
    imageUrl: "/bvest-logo-final.png",
    category: "Gaming & Strategy",
    sdgGoal: 3,
  },

  // ── October 23, 2026 (Day 2) ──────────────────────────────────────────
  {
    id: "ctrl-compete",
    slug: "ctrl-compete",
    title: "CTRL+COMPETE",
    description:
      "A cybersecurity competition testing participants' knowledge of digital security through technical quizzes, cipher decryption, phishing detection, and interactive problem-solving challenges.",
    date: "2026-10-23",
    displayDate: "October 23, 2026",
    dayLabel: "Day 2",
    venue: "BVCOE, New Delhi",
    unstopUrl:
      "https://unstop.com/competitions/ctrlcompete-bvest-xiii-bharati-vidyapeeths-college-of-engineering-1767808",
    imageUrl: "/bvest-logo-final.png",
    category: "Cybersecurity",
    sdgGoal: 9,
  },
  {
    id: "iotopia",
    slug: "iotopia",
    title: "IoTopia",
    description:
      "A hardware innovation showcase featuring IoT applications, automation systems, and technology-driven prototypes that demonstrate creative engineering and practical solutions to real-world challenges.",
    date: "2026-10-23",
    displayDate: "October 23, 2026",
    dayLabel: "Day 2",
    venue: "BVCOE, New Delhi",
    unstopUrl:
      "https://unstop.com/competitions/iotopia-bvest-xiii-bharati-vidyapeeths-college-of-engineering-1767799",
    imageUrl: "/bvest-logo-final.png",
    category: "IoT & Hardware",
    sdgGoal: 9,
  },
  {
    id: "mun-exe",
    slug: "mun-exe",
    title: "MUN.exe",
    description:
      "A technology-themed Model United Nations experience where participants represent leading technology corporations, debate global challenges, negotiate solutions, and propose technology-driven approaches to real-world issues.",
    date: "2026-10-23",
    displayDate: "October 23, 2026",
    dayLabel: "Day 2",
    venue: "BVCOE, New Delhi",
    unstopUrl:
      "https://unstop.com/competitions/munexe-bvest-xiii-bharati-vidyapeeths-college-of-engineering-1767770",
    imageUrl: "/bvest-logo-final.png",
    category: "Tech Diplomacy & MUN",
    sdgGoal: 17,
  },
  {
    id: "taalmaxxing",
    slug: "taalmaxxing",
    title: "TaalMaxxing",
    description:
      "An AI-powered music challenge exploring the intersection of technology and creativity. Participants identify AI-generated music and experiment with prompts to create original compositions.",
    date: "2026-10-23",
    displayDate: "October 23, 2026",
    dayLabel: "Day 2",
    venue: "BVCOE, New Delhi",
    unstopUrl:
      "https://unstop.com/competitions/taalmaxxing-bvest-xiii-bharati-vidyapeeths-college-of-engineering-1765785",
    imageUrl: "/bvest-logo-final.png",
    category: "AI & Music",
    sdgGoal: 9,
  },
  {
    id: "game-of-code-4-0",
    slug: "game-of-code-4-0",
    title: "Game of Code 4.0",
    description:
      "A campus-wide coding treasure hunt that combines debugging, logical reasoning, and cryptic clues. Teams navigate technical challenges without laptops, relying on teamwork and problem-solving to complete their mission.",
    date: "2026-10-23",
    displayDate: "October 23, 2026",
    dayLabel: "Day 2",
    venue: "BVCOE, New Delhi",
    unstopUrl:
      "https://unstop.com/competitions/game-of-code-40-bharati-vidyapeeths-college-of-engineering-1764775",
    imageUrl: "/bvest-logo-final.png",
    category: "Coding Hunt",
    sdgGoal: 4,
  },
  {
    id: "case-zero",
    slug: "case-zero",
    title: "Case:Zero",
    description:
      "A business strategy competition that challenges participants to analyse real-world business scenarios, allocate resources, respond to unexpected developments, and defend decisions through structured problem-solving and strategic reasoning.",
    date: "2026-10-23",
    displayDate: "October 23, 2026",
    dayLabel: "Day 2",
    venue: "BVCOE, New Delhi",
    unstopUrl:
      "https://unstop.com/competitions/casezero-bharati-vidyapeeths-college-of-engineering-1764769",
    imageUrl: "/bvest-logo-final.png",
    category: "Case Study & Strategy",
    sdgGoal: 8,
  },
  {
    id: "prompt-ae-thon",
    slug: "prompt-ae-thon",
    title: "Prompt-ae-thon",
    description:
      "An AI-powered innovation challenge where participants transform creative ideas into functional prototypes using prompt engineering, AI-assisted coding, and collaborative problem-solving.",
    date: "2026-10-23",
    displayDate: "October 23, 2026",
    dayLabel: "Day 2",
    venue: "BVCOE, New Delhi",
    unstopUrl:
      "https://unstop.com/hackathons/prompt-ae-thon-bharati-vidyapeeths-college-of-engineering-1764749",
    imageUrl: "/bvest-logo-final.png",
    category: "Generative AI Hackathon",
    sdgGoal: 9,
  },
  {
    id: "visionquest",
    slug: "visionquest",
    title: "VisionQuest",
    description:
      "A computer vision challenge where participants apply coding, image analysis, and machine learning techniques to develop intelligent vision-based solutions to technical problems.",
    date: "2026-10-23",
    displayDate: "October 23, 2026",
    dayLabel: "Day 2",
    venue: "BVCOE, New Delhi",
    unstopUrl:
      "https://unstop.com/competitions/visionquest-bharati-vidyapeeths-college-of-engineering-1764730",
    imageUrl: "/bvest-logo-final.png",
    category: "Computer Vision & ML",
    sdgGoal: 9,
  },
  {
    id: "pixel-patakha",
    slug: "pixel-patakha",
    title: "Pixel Patakha",
    description:
      "A time-bound digital design challenge where participants transform creative concepts into engaging visual experiences, showcasing their UI/UX design skills, originality, and ability to solve design problems.",
    date: "2026-10-23",
    displayDate: "October 23, 2026",
    dayLabel: "Day 2",
    venue: "BVCOE, New Delhi",
    unstopUrl:
      "https://unstop.com/competitions/pixel-patakha-bharati-vidyapeeths-college-of-engineering-1764127",
    imageUrl: "/bvest-logo-final.png",
    category: "UI/UX Design",
    sdgGoal: 9,
  },
];

export const OCT_22_EVENTS = FEST_EVENTS.filter((e) => e.date === "2026-10-22");
export const OCT_23_EVENTS = FEST_EVENTS.filter((e) => e.date === "2026-10-23");

