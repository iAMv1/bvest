export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Participation" | "Hacking & SDGs" | "Logistics";
}

export const FAQS_DATA: FAQItem[] = [
  {
    id: "what-is-hackbvp",
    category: "General",
    question: "What is HackBVP 8.0?",
    answer: "HackBVP 8.0 is the premier national flagship hackathon organized by Bharati Vidyapeeth's College of Engineering (BVCOE New Delhi). Now in its 8th edition, the hackathon brings together 400+ handpicked student builders, designers, and innovators to engineer functional solutions aligned with the 17 United Nations Sustainable Development Goals (SDGs)."
  },
  {
    id: "who-can-participate",
    category: "Participation",
    question: "Who can participate in HackBVP 8.0?",
    answer: "Any registered student currently enrolled in an undergraduate or postgraduate program, polytechnic institute, or secondary school worldwide can apply. Diverse interdisciplinary teams featuring both software engineers and designers or hardware enthusiasts are strongly encouraged."
  },
  {
    id: "team-size",
    category: "Participation",
    question: "What is the permissible team size?",
    answer: "Teams must consist of 2 to 4 members. Cross-college and cross-specialization teams are completely permissible and encouraged. All team members must be physically present at the venue during the 36-hour sprint."
  },
  {
    id: "solo-participation",
    category: "Participation",
    question: "Can I participate without a team?",
    answer: "While you can submit an initial individual application, all builders must form or join a team of 2–4 members prior to check-in. We host a dedicated #team-formation channel on our official Discord server where shortlisted participants connect and pitch complementary skills."
  },
  {
    id: "registration-fee",
    category: "Logistics",
    question: "Is there any registration or entry fee?",
    answer: "No. Participation in HackBVP 8.0 is 100% free of charge for all accepted teams. Thanks to our university backing and generous sponsors, meals, high-speed Wi-Fi, swag, and overnight rest spaces are provided completely free."
  },
  {
    id: "sdg-only",
    category: "Hacking & SDGs",
    question: "Do I need to build strictly an SDG-related project?",
    answer: "Yes. HackBVP 8.0 is fundamentally anchored in the 17 United Nations Sustainable Development Goals. Your submission must directly map to at least one primary SDG. However, the interpretation is expansive—whether you are creating AI for medical diagnostics (SDG 3), clean microgrid coordination (SDG 7), or web accessibility tools (SDG 10), almost every impactful engineering idea maps directly into this framework."
  },
  {
    id: "technologies-allowed",
    category: "Hacking & SDGs",
    question: "What programming languages and hardware are permitted?",
    answer: "Any software framework, programming language, cloud platform, or microcontroller (Arduino, ESP32, Raspberry Pi, etc.) is allowed. You can use open-source libraries and public APIs, provided all custom application logic and prototypes are authored during the official 36-hour hacking period."
  },
  {
    id: "freshers-allowed",
    category: "Participation",
    question: "Are first-year students and complete beginners welcome?",
    answer: "Absolutely! We believe hackathons are the ultimate learning accelerant. We even feature a dedicated 'Best All-Freshers Team' prize award, and roving mentors will be available throughout the event to guide you through Git, API debugging, and deployment hurdles."
  },
  {
    id: "food-and-accommodation",
    category: "Logistics",
    question: "Will food, beverages, and accommodation be provided?",
    answer: "Yes! High-protein hot meals, midnight energy snacks, coffee, and breakfast are served on campus throughout the 36 hours. Dedicated indoor rest lounges with beanbags and mattresses are segregated for male and female hackers, guarded by 24/7 campus security."
  },
  {
    id: "what-to-submit",
    category: "Hacking & SDGs",
    question: "What deliverables are required for final submission?",
    answer: "Teams must submit: (1) A public GitHub repository with genuine git commits during the hackathon, (2) A 2-minute video demonstration, (3) A concise project description detailing which SDGs you addressed and how your architecture functions, and (4) A live deployed URL or hardware demonstration for judges."
  },
  {
    id: "judging-methodology",
    category: "Hacking & SDGs",
    question: "How will projects be evaluated?",
    answer: "Judging is conducted by senior industry engineers, startup founders, and academic leads across six weighted dimensions: Real-World SDG Impact (25%), Technical Innovation & Difficulty (20%), Working Prototype Implementation (20%), SDG Alignment Rigor (20%), UI/UX Design (10%), and Live Pitch Delivery (5%)."
  },
  {
    id: "where-is-venue",
    category: "Logistics",
    question: "Where is the venue and how do I get there?",
    answer: "HackBVP 8.0 will take place at the Main Auditorium & Engineering Labs of Bharati Vidyapeeth's College of Engineering (BVCOE), A-4 Block, Paschim Vihar, New Delhi - 110063. The campus is directly adjacent to the Paschim Vihar East Metro Station (Green Line)."
  }
];
