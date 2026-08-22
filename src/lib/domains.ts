export interface Domain {
  id: string;
  name: string;
  description: string;
  colorToken: string; // CSS custom property name, e.g. "var(--color-sdg3)"
}

export const domains: Domain[] = [
  {
    id: "interface-design",
    name: "Interface Design (UI/UX)",
    description: "Reimagine digital interaction through intuitive interfaces that harmonise visual language, functionality, accessibility, and user behaviour.",
    colorToken: "var(--color-sdg10)",
  },
  {
    id: "visual-arts",
    name: "Visual Arts (Graphic Designing)",
    description: "Translate concepts into compelling visual narratives through composition, typography, illustration, branding, and refined design aesthetics.",
    colorToken: "var(--color-sdg11)",
  },
  {
    id: "tech-trivia",
    name: "Tech Trivia (Technical Quiz)",
    description: "Navigate an intellectually demanding arena spanning computing, emerging technologies, scientific breakthroughs, and the evolving digital landscape.",
    colorToken: "var(--color-sdg4)",
  },
  {
    id: "venture-forge",
    name: "Venture Forge (Ideathon / B-Plan)",
    description: "Conceptualise, validate, and articulate ventures with a compelling proposition, sustainable framework, and strategic business outlook.",
    colorToken: "var(--color-sdg8)",
  },
  {
    id: "case-arena",
    name: "Case Arena (Case Study Challenges)",
    description: "Deconstruct intricate real-world scenarios, identify underlying complexities, and formulate strategic approaches grounded in evidence and reasoning.",
    colorToken: "var(--color-sdg12)",
  },
  {
    id: "coderush",
    name: "CodeRush (DSA / Competitive Programming)",
    description: "Confront intricate algorithmic problems where computational efficiency, logical precision, and structured thinking define the path to success.",
    colorToken: "var(--color-sdg9)",
  },
  {
    id: "spotlight",
    name: "Spotlight (TED Talk / Just a Minute)",
    description: "Command the stage through articulate expression, persuasive storytelling, and the ability to transform a thought into an engaging narrative.",
    colorToken: "var(--color-sdg5)",
  },
  {
    id: "robo-combat",
    name: "Robo Combat (Robotics Challenges & Robo-Wars)",
    description: "Engineer, manoeuvre, and compete with autonomous or remotely controlled machines across demanding arenas of precision, mechanics, strategy, and control.",
    colorToken: "var(--color-sdg9)",
  },
  {
    id: "vibecode",
    name: "VibeCode (VibeCoding)",
    description: "Step into an unconventional development environment where natural-language interaction, rapid prototyping, experimentation, and digital creation converge.",
    colorToken: "var(--color-sdg9)",
  },
  {
    id: "circuitverse",
    name: "CircuitVerse (Hardware & VLSI)",
    description: "Delve into electronic architecture through circuit design, digital systems, semiconductor concepts, and the intricate world of VLSI engineering.",
    colorToken: "var(--color-sdg7)",
  },
  {
    id: "datalab",
    name: "DataLab (Data Science & Analytics)",
    description: "Extract significance from complex datasets by uncovering correlations, interpreting patterns, and translating quantitative evidence into actionable insights.",
    colorToken: "var(--color-sdg16)",
  },
  {
    id: "cipher-hunt",
    name: "Cipher Hunt (Treasure Hunt)",
    description: "Embark on an intellectually charged pursuit of encrypted clues, concealed pathways, and layered puzzles where deduction and perceptiveness determine the next move.",
    colorToken: "var(--color-sdg16)",
  },
  {
    id: "gamegrid",
    name: "GameGrid (Gaming & E-Sports)",
    description: "Enter a high-intensity competitive ecosystem where strategic execution, rapid reflexes, team coordination, and digital proficiency collide.",
    colorToken: "var(--color-sdg3)",
  },
  {
    id: "beyond-boundaries",
    name: "Beyond Boundaries (Open Innovation)",
    description: "Transcend disciplinary conventions by presenting unconventional approaches that merge diverse perspectives, emerging technologies, and unexplored possibilities.",
    colorToken: "var(--color-sdg17)",
  },
];
