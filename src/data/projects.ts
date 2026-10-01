export interface InspirationProject {
  id: string;
  number: string;
  title: string;
  tagline: string;
  summary: string;
  primarySdg: number;
  sdgs: number[];
  technologies: string[];
  impactMetric: string;
  accentColor: string;
}

export const INSPIRATION_PROJECTS: InspirationProject[] = [
  {
    id: "smart-water-grid",
    number: "01",
    title: "AURA HYDRO: AUTONOMOUS URBAN WATER GRID",
    tagline: "Acoustic IoT telemetry localizing potable water pipeline ruptures within minutes.",
    summary: "Urban water distribution in developing cities loses up to 40% of treated potable water before reaching residential taps. Aura Hydro deploys sub-$25 vibration transducers clamped onto arterial pipe joints, feeding raw acoustic streams into an edge transformer model that flags pressure micro-drops and pinpoints leak coordinates within 3 meters.",
    primarySdg: 6,
    sdgs: [6, 9, 11],
    technologies: ["IoT Accelerometers", "Acoustic ML", "GIS Leaflet", "MQTT"],
    impactMetric: "Saves up to 1.8M Liters of Potable Water / Ward Monthly",
    accentColor: "#26BDE2"
  },
  {
    id: "carbon-ci-cd",
    number: "02",
    title: "ECO-OPS: REAL-TIME ZERO-CARBON CI/CD",
    tagline: "Scheduling hyperscale cloud computational workloads against grid carbon intensity.",
    summary: "Cloud data centers consume enormous electricity, often powered by coal during peak evening hours. Eco-Ops intercepts automated GitHub Actions and Docker build pipelines, dynamically routing containerized compute to regional cloud zones currently experiencing surplus solar or wind generation, slashing build emissions by up to 68%.",
    primarySdg: 13,
    sdgs: [7, 9, 12, 13],
    technologies: ["Green Cloud APIs", "Docker", "Go", "Grid Intensity Telemetry"],
    impactMetric: "Reduces Compute Carbon Footprint by 68%",
    accentColor: "#3F7E44"
  },
  {
    id: "gaze-speak",
    number: "03",
    title: "NEURO-VOICE: WEBCAM GAZE ACCESSIBILITY",
    tagline: "Converting standard browser webcam eye-tracking into fluid synthetic speech.",
    summary: "Millions of individuals living with cerebral palsy or ALS cannot purchase specialized $5,000 eye-gaze hardware. Neuro-Voice runs a lightweight WebAssembly computer vision neural network directly inside any budget Chromium browser, allowing users to type words, select emergency phrases, and speak with zero latency and complete privacy.",
    primarySdg: 10,
    sdgs: [3, 4, 10],
    technologies: ["WebAssembly", "MediaPipe Face Mesh", "Web Audio API", "Next.js"],
    impactMetric: "Zero-Cost Universal Access for Motor-Impaired Users",
    accentColor: "#DD1367"
  },
  {
    id: "satellite-wildfire",
    number: "04",
    title: "PYRO-WATCH: SATELLITE WILDFIRE PREDICTOR",
    tagline: "Thermal anomaly detection and wind velocity fire spread simulation.",
    summary: "Pyro-Watch pulls near-real-time thermal infrared data from NASA MODIS and ESA Sentinel-3 satellites. When a thermal anomaly exceeds baseline forest canopy temperature, an automated cellular SMS alert with predicted 6-hour flame vectors is dispatched to local ranger outposts and adjacent village gram panchayats.",
    primarySdg: 15,
    sdgs: [11, 13, 15],
    technologies: ["Satellite InSAR", "Thermodynamics Simulation", "Twilio API", "FastAPI"],
    impactMetric: "Up to 4-Hour Early Warning Before Canopy Deflagration",
    accentColor: "#FD6925"
  },
  {
    id: "vernacular-med",
    number: "05",
    title: "SWASTHYA-AI: VERNACULAR CLINICAL TRIAGE",
    tagline: "Low-bandwidth multilingual voice assistant for rural primary health centers.",
    summary: "Rural health sub-centers often have a single auxiliary nurse serving thousands. Swasthya-AI operates completely offline on rugged Android tablets, taking patient symptom descriptions in 12 regional languages, transcribing through quantized Whisper models, and generating differential diagnostic triage priority checklists for the visiting physician.",
    primarySdg: 3,
    sdgs: [1, 3, 10],
    technologies: ["Quantized Whisper", "Llama 3 Local", "IndexedDB", "Android PWA"],
    impactMetric: "Triages 300+ Rural Consultations per Clinic Daily",
    accentColor: "#4C9F38"
  },
  {
    id: "circular-waste-sorter",
    number: "06",
    title: "SORT-AI: OPTICAL CIRCULAR WASTE BOT",
    tagline: "Real-time municipal conveyor sorting of recyclable plastics and e-waste.",
    summary: "Combining edge camera sensors with robotic pneumatic diverters, Sort-AI inspects conveyor debris moving at 2.5 m/s. It distinguishes HDPE, PET, and polypropylene containers while segregating circuit board e-waste for toxic chemical reclamation, multiplying recyclability rates threefold.",
    primarySdg: 12,
    sdgs: [9, 11, 12, 14],
    technologies: ["YOLOv8 Edge", "Robotic Pneumatics", "Raspberry Pi 5", "TimescaleDB"],
    impactMetric: "94.8% Sorting Accuracy at 120 Items / Minute",
    accentColor: "#BF8B2E"
  }
];
