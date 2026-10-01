export interface TechMatrixItem {
  id: string;
  name: string;
  shortDesc: string;
  iconName: string;
  primarySdgs: number[];
  secondarySdgs: number[];
  sampleUseCases: {
    sdgId: number;
    title: string;
    useCase: string;
  }[];
}

export const IMPACT_MATRIX: TechMatrixItem[] = [
  {
    id: "ai-ml",
    name: "Artificial Intelligence & ML",
    shortDesc: "Foundation models, predictive time-series, reinforcement learning, and autonomous reasoning agents.",
    iconName: "BrainCircuit",
    primarySdgs: [3, 4, 9, 13],
    secondarySdgs: [1, 2, 8, 10, 11, 16],
    sampleUseCases: [
      { sdgId: 3, title: "Diagnostic Triage", useCase: "Sub-second acoustic lung sound classification for community health volunteers." },
      { sdgId: 4, title: "Socratic Pedagogy", useCase: "Autonomous multi-dialect tutoring tailored to student attention spans." },
      { sdgId: 13, title: "Extreme Weather AI", useCase: "Hyper-local flash flood prediction using satellite cloud velocity matrices." }
    ]
  },
  {
    id: "computer-vision",
    name: "Computer Vision & Edge ML",
    shortDesc: "Real-time object detection, segmentation, optical character recognition, and multispectral analysis.",
    iconName: "Eye",
    primarySdgs: [2, 12, 14, 15],
    secondarySdgs: [3, 6, 9, 11],
    sampleUseCases: [
      { sdgId: 2, title: "Pest & Blight Diagnostics", useCase: "Offline camera detection of foliar fungal blights on staple crops." },
      { sdgId: 12, title: "Optical Waste Separation", useCase: "High-speed conveyor sorting of PET plastics from aluminum containers." },
      { sdgId: 15, title: "Acoustic Camera Traps", useCase: "Automated endangered carnivore census without human disturbance." }
    ]
  },
  {
    id: "iot-embedded",
    name: "IoT & Hardware Sensors",
    shortDesc: "Ultra-low power microcontrollers, LoRaWAN mesh, environmental transducers, and edge telemetry.",
    iconName: "Cpu",
    primarySdgs: [6, 7, 9, 11],
    secondarySdgs: [2, 3, 12, 13, 14, 15],
    sampleUseCases: [
      { sdgId: 6, title: "Aquifer Depletion Nodes", useCase: "Submersible ultrasonic hydrostatic probes tracking regional water tables." },
      { sdgId: 7, title: "Microgrid Balancers", useCase: "Real-time automated relay toggling based on solar irradiance peaks." },
      { sdgId: 11, title: "Air Quality Mesh", useCase: "Hyper-dense particulate matter (PM2.5/PM10) spatial mapping across intersections." }
    ]
  },
  {
    id: "gis-spatial",
    name: "GIS & Earth Observation",
    shortDesc: "Satellite multispectral imagery, LiDAR point clouds, spatial routing, and elevation analytics.",
    iconName: "MapPin",
    primarySdgs: [6, 11, 13, 14, 15],
    secondarySdgs: [1, 2, 7, 9],
    sampleUseCases: [
      { sdgId: 11, title: "Heat Island Telemetry", useCase: "Surface thermal emissivity mapping to direct municipal shade tree planting." },
      { sdgId: 13, title: "Deforestation Tracking", useCase: "Bi-weekly Sentinel-2 NDVI change detection flagging illegal logging." },
      { sdgId: 14, title: "Marine Plastic Gyres", useCase: "Synthetic aperture radar (SAR) detection of ocean surface plastic slicks." }
    ]
  },
  {
    id: "web3-distributed",
    name: "Distributed Systems & Web3",
    shortDesc: "Zero-knowledge proofs, decentralized identity (DID), verifiable credentials, and public registries.",
    iconName: "ShieldCheck",
    primarySdgs: [1, 8, 10, 16],
    secondarySdgs: [7, 12, 17],
    sampleUseCases: [
      { sdgId: 1, title: "Direct Benefit Transfer", useCase: "Non-custodial programmable vouchers ensuring aid reaches intended families." },
      { sdgId: 8, title: "Verifiable Labor Proofs", useCase: "Cryptographic work experience attestations preventing resume fraud." },
      { sdgId: 16, title: "Anti-Tamper Whistleblower", useCase: "Immutable public document timestamping impervious to retrospective redaction." }
    ]
  },
  {
    id: "digital-twins",
    name: "Digital Twins & Simulation",
    shortDesc: "Physics-based 3D modeling, urban flow simulation, thermodynamic building models, and supply loop twins.",
    iconName: "Layers",
    primarySdgs: [7, 9, 11, 12],
    secondarySdgs: [6, 13, 17],
    sampleUseCases: [
      { sdgId: 7, title: "Solar Rooftop Simulators", useCase: "Raytraced shadow calculations predicting rooftop kWh generation." },
      { sdgId: 9, title: "Structural Stress Twins", useCase: "Finite element modeling of bridge vibration fatigue under heavy haul loads." },
      { sdgId: 11, title: "Storm Surge Drainage", useCase: "Dynamic hydraulic mesh modeling flash-flood choke points during cloudbursts." }
    ]
  },
  {
    id: "accessibility-hci",
    name: "Assistive HCI & Voice AI",
    shortDesc: "Eye gaze trackers, switch access, low-latency screen readers, neural speech synthesis, and haptics.",
    iconName: "Sparkles",
    primarySdgs: [3, 4, 5, 10],
    secondarySdgs: [1, 8, 16],
    sampleUseCases: [
      { sdgId: 4, title: "Dyslexia Adaptive Readers", useCase: "Real-time syllable segmentation and phoneme audio rendering for books." },
      { sdgId: 10, title: "Webcam Gaze Keyboard", useCase: "Eye-tracking virtual keyboard enabling communication for motor-impaired youth." },
      { sdgId: 5, title: "Discreet Distress Triggers", useCase: "Sub-vocal speech classification and pressure gestures triggering silent SOS." }
    ]
  }
];
