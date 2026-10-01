export interface JudgingCriterion {
  id: string;
  title: string;
  weight: number; // percentage
  description: string;
  guidingQuestions: string[];
  color: string;
}

export const JUDGING_CRITERIA: JudgingCriterion[] = [
  {
    id: "impact",
    title: "REAL-WORLD IMPACT & SCALE",
    weight: 25,
    description: "Does this solution solve an acute, measurable pain point? Could this genuinely change lives, conserve resources, or improve community well-being if deployed in production?",
    guidingQuestions: [
      "Is the targeted problem validated with evidence or lived community reality?",
      "Can this solution scale sustainably beyond the 36-hour hackathon environment?",
      "What is the projected tangible metric of improvement (e.g. liters saved, hours saved, lives helped)?"
    ],
    color: "#E5243B" // SDG 1 Red
  },
  {
    id: "technical-rigor",
    title: "TECHNICAL RIGOR & ARCHITECTURE",
    weight: 20,
    description: "Depth of engineering execution, system design elegance, codebase quality, appropriate tool selection, and resilient handling of edge cases.",
    guidingQuestions: [
      "Is the technical architecture sound, scalable, and responsive?",
      "Did the team overcome complex implementation hurdles rather than chaining trivial mock APIs?",
      "Is there genuine custom code, algorithms, hardware interfacing, or model fine-tuning?"
    ],
    color: "#26BDE2" // SDG 6 Cyan
  },
  {
    id: "sdg-alignment",
    title: "SDG ALIGNMENT & SYSTEMIC RIGOR",
    weight: 20,
    description: "Meaningful coherence with the 17 UN Sustainable Development Goals. The project shouldn't merely slap an SDG label onto an arbitrary app—it must address root systemic dynamics.",
    guidingQuestions: [
      "Does the team demonstrate deep comprehension of the targeted UN Goal?",
      "Are second-order systemic effects (e.g., unintended environmental or social fallout) considered?",
      "Does the solution support the UN 2030 Agenda ethos of leaving no one behind?"
    ],
    color: "#FCC30B" // SDG 7 Yellow
  },
  {
    id: "innovation",
    title: "INNOVATION & ORIGINALITY",
    weight: 20,
    description: "Freshness of the core thesis. Does the team challenge orthodox assumptions or synthesize existing primitives in a genuinely novel, unexpected manner?",
    guidingQuestions: [
      "Does this approach differ substantially from existing commercial solutions?",
      "Is there creative problem reframing or an ingenious technological synthesis?",
      "Did the project inspire excitement and curiosity among mentors?"
    ],
    color: "#FD6925" // SDG 9 Orange
  },
  {
    id: "design-ux",
    title: "UI/UX & ACCESSIBILITY",
    weight: 10,
    description: "Human-centered design, visual polish, intuitive interaction flows, micro-interactions, responsive adaptability, and adherence to accessibility standards.",
    guidingQuestions: [
      "Can a first-time user comprehend and navigate the interface effortlessly?",
      "Are keyboard accessibility, high contrast, and responsive viewports supported?",
      "Does the visual hierarchy feel professional, cohesive, and intentional?"
    ],
    color: "#4C9F38" // SDG 3 Green
  },
  {
    id: "pitch-delivery",
    title: "PRESENTATION & DEMO CLARITY",
    weight: 5,
    description: "Ability to articulate value clearly within 5 minutes, deliver a smooth live demo without catastrophic failure, and respond incisively to jury scrutiny.",
    guidingQuestions: [
      "Was the presentation concise, compelling, and free of unnecessary buzzword padding?",
      "Did the live prototype work convincingly in real time?",
      "Did the team answer technical and domain questions with poise and authority?"
    ],
    color: "#DD1367" // SDG 10 Rose
  }
];
