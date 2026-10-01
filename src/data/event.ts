export interface EventConfig {
  name: string;
  edition: string;
  tagline: string;
  subtagline: string;
  concept: string;
  organizer: string;
  institution: string;
  dates: string;
  startDate: string;
  endDate: string;
  venue: string;
  city: string;
  registrationUrl: string;
  discordUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  email: string;
  prizePool: string;
  teamSize: string;
  hackDuration: string;
  applicationDeadline: string;
  countdownTarget: string; // ISO date format
}

export const EVENT_CONFIG: EventConfig = {
  name: "HACKBVP",
  edition: "8.0",
  tagline: "BUILD FOR A BETTER WORLD",
  subtagline: "17 GOALS. COUNTLESS IDEAS. ONE FUTURE.",
  concept: "National-level flagship hackathon powered by the 17 UN Sustainable Development Goals.",
  organizer: "HackBVP Organizing Team & Student Community",
  institution: "Bharati Vidyapeeth's College of Engineering (BVCOE), New Delhi",
  dates: "October 22 – 23, 2026",
  startDate: "2026-10-22T09:00:00+05:30",
  endDate: "2026-10-23T21:00:00+05:30",
  venue: "BVCOE Delhi Campus, Paschim Vihar",
  city: "New Delhi, India",
  registrationUrl: "https://unstop.com", // [REGISTRATION PLATFORM URL]
  discordUrl: "https://discord.gg/hackbvp",
  instagramUrl: "https://instagram.com/hackbvp",
  linkedinUrl: "https://linkedin.com/school/bvcoend",
  email: "hackbvp@bvcoend.ac.in",
  prizePool: "₹1,50,000+",
  teamSize: "2 – 4 Builders",
  hackDuration: "36 Hours In-Person",
  applicationDeadline: "October 18, 2026",
  countdownTarget: "2026-10-22T09:00:00+05:30",
};
