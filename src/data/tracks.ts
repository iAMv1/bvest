export interface HackathonTrack {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  sdgs: number[];
  accentColor: string;
  iconName: string;
  keyChallenges: string[];
  techPointers: string[];
}

export const HACKATHON_TRACKS: HackathonTrack[] = [
  {
    id: "ai-for-humanity",
    number: "01",
    title: "AI FOR HUMANITY",
    tagline: "Empowering vulnerable populations through compassionate, accessible intelligence.",
    description: "Harness modern machine learning, speech interfaces, computer vision, and autonomous agents to eliminate systemic barriers in healthcare, primary education, and financial sovereignty.",
    sdgs: [1, 2, 3, 4, 10],
    accentColor: "#E5243B",
    iconName: "HeartPulse",
    keyChallenges: [
      "Offline and vernacular voice agents for non-literate community clinics",
      "Low-cost acoustic/vision diagnostic triage for remote health workers",
      "Personalized adaptive Socratic tutoring for neurodiverse learners",
      "Decentralized micro-lending & alternative credit scoring without predatory interest"
    ],
    techPointers: ["PyTorch / ONNX Web", "FastAPI", "Whisper Small", "FHIR Standards", "Edge ML"]
  },
  {
    id: "climate-and-planet",
    number: "02",
    title: "CLIMATE & PLANET",
    tagline: "Sensing, modeling, and restoring fragile biosphere ecosystems.",
    description: "Develop high-resolution monitoring systems, decentralized clean energy microgrids, circular waste pipelines, and ocean conservation tools that turn climate anxiety into actionable mitigation.",
    sdgs: [6, 7, 12, 13, 14, 15],
    accentColor: "#3F7E44",
    iconName: "Globe2",
    keyChallenges: [
      "Satellite & drone remote sensing for early wildfire and forest encroachment",
      "Sub-$20 IoT telemetry nodes for community groundwater contamination & leak alerts",
      "Peer-to-peer neighborhood solar microgrid energy settlements",
      "Autonomous computer vision sorting for municipal electronic & plastic waste"
    ],
    techPointers: ["Sentinel-2 Earth Observation", "Modbus / MQTT", "WebAssembly", "GIS Mapbox", "Time-series Models"]
  },
  {
    id: "smart-cities",
    number: "03",
    title: "SMART & SUSTAINABLE CITIES",
    tagline: "Building resilient civic infrastructure and zero-emission urban mobility.",
    description: "Re-engineer modern metropolises into safe, walkable, energy-efficient, and resilient habitats. Optimize public transit, simulate flood patterns, and automate municipal civic accountability.",
    sdgs: [9, 11, 12, 13],
    accentColor: "#FD9D24",
    iconName: "Building2",
    keyChallenges: [
      "Dynamic emergency vehicle signal preemption & adaptive urban traffic grids",
      "Hydrological simulation for rapid monsoon urban flash-flood prediction",
      "Decentralized public infrastructure reporting with SLA verification",
      "Smart commercial building energy twin reducing peak cooling grid loads"
    ],
    techPointers: ["Deck.gl", "Digital Twins", "Sensor Web APIs", "Graph Neural Networks", "WebSockets"]
  },
  {
    id: "inclusive-futures",
    number: "04",
    title: "INCLUSIVE FUTURES",
    tagline: "Dismantling systemic inequalities and fostering ethical governance.",
    description: "Build platforms that advance gender parity, guarantee universal web accessibility, uphold workers' rights in algorithmic gig economies, and create transparent civic institutions.",
    sdgs: [5, 8, 10, 16, 17],
    accentColor: "#DD1367",
    iconName: "Users2",
    keyChallenges: [
      "Zero-latency eye-tracking & switch-control web navigation overlays",
      "Algorithmic auditing for hiring & lending platforms to eliminate systemic demographic bias",
      "Public tender transparency graphs exposing institutional conflict-of-interest",
      "Fair algorithmic bargaining platforms and collective safety nets for gig couriers"
    ],
    techPointers: ["MediaPipe Hands/Face", "Zero-Knowledge Proofs", "WebRTC", "Neo4j Graph", "WCAG 2.2"]
  },
  {
    id: "open-impact",
    number: "05",
    title: "OPEN IMPACT & WILDCARD",
    tagline: "Bold, unconstrained innovation across any of the 17 UN SDGs.",
    description: "Have a radical thesis that breaks boundaries? Combine cutting-edge tech—from quantum computing to bio-inspired algorithms—to address any UN SDG that ignites your team's passion.",
    sdgs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    accentColor: "#26BDE2",
    iconName: "Sparkles",
    keyChallenges: [
      "Novel synthesis of two or more seemingly unrelated SDGs",
      "High-risk, high-reward prototype demonstrating novel technical architecture",
      "Radical open-source scientific tooling that empowers global researchers",
      "Experimental interactive human-computer interfaces for civic change"
    ],
    techPointers: ["Your Stack of Choice", "Open Source Libraries", "Hardware Microcontrollers", "Custom ML"]
  }
];
