export type SDGCategory = "PEOPLE" | "PLANET" | "PROSPERITY" | "PEACE" | "PARTNERSHIP";

export interface SDGItem {
  id: number;
  number: string;
  title: string;
  tagline: string;
  shortDescription: string;
  color: string;
  category: SDGCategory;
  icon: string;
  whyItMatters: string;
  challengeExamples: string[];
  technologyExamples: string[];
  keywords: string[];
  relatedSdgs: number[];
  whatBuildersCanCreate: string[];
}

export const SDGS_DATA: SDGItem[] = [
  {
    id: 1,
    number: "01",
    title: "No Poverty",
    tagline: "End poverty in all its forms everywhere",
    shortDescription: "Empower underserved populations with transparent financial infrastructure, micro-lending networks, and equitable resource allocation.",
    color: "#E5243B",
    category: "PEOPLE",
    icon: "/E SDG Icons WEB/E-WEB-Goal-01.png",
    whyItMatters: "Over 700 million people live in extreme poverty, lacking access to credit, basic insurance, and economic safety nets. Resilient digital public infrastructure can bridge this divide.",
    challengeExamples: [
      "Decentralized micro-lending with zero-collateral credit scoring",
      "Offline digital payments for unbanked rural regions",
      "Direct disaster relief aid tracking with verifiable telemetry"
    ],
    technologyExamples: ["Account Aggregators", "Zero-Knowledge Proofs", "Offline Mesh P2P", "USSD AI Agents"],
    keywords: ["FinTech", "Inclusion", "Micro-loans", "Poverty Alleviation", "Public Goods"],
    relatedSdgs: [8, 10, 2],
    whatBuildersCanCreate: [
      "AI financial literacy voice agents in vernacular dialects",
      "Decentralized voucher distribution systems for direct benefit transfer",
      "Community group savings & rotatory credit (Chit Fund) smart contracts"
    ]
  },
  {
    id: 2,
    number: "02",
    title: "Zero Hunger",
    tagline: "End hunger, achieve food security and improved nutrition",
    shortDescription: "Revolutionize agricultural yield, reduce supply chain harvest losses, and democratize nutritional intelligence.",
    color: "#DDA63A",
    category: "PEOPLE",
    icon: "/E SDG Icons WEB/E-WEB-Goal-02.png",
    whyItMatters: "One third of all food produced globally is wasted while 828 million people face persistent food insecurity. Precision agriculture and transparent supply chains unlock resilience.",
    challengeExamples: [
      "Computer vision pest and blight detection on mobile devices",
      "Real-time surplus food redistribution logistics across urban nodes",
      "Satellite NDVI crop health forecasting and hyper-local weather advisory"
    ],
    technologyExamples: ["Edge Computer Vision", "IoT Soil Probes", "Routing Optimization APIs", "GIS Remote Sensing"],
    keywords: ["AgriTech", "Food Waste", "Precision Farming", "Logistics", "Nutrition"],
    relatedSdgs: [1, 3, 12, 13],
    whatBuildersCanCreate: [
      "Drone/phone camera plant pathology analysis and organic cure generator",
      "Cold-chain temperature telemetry monitoring with spoilage prediction",
      "Autonomous dynamic meal-matching network between banquets & shelters"
    ]
  },
  {
    id: 3,
    number: "03",
    title: "Good Health and Well-Being",
    tagline: "Ensure healthy lives and promote well-being for all",
    shortDescription: "Decentralize clinical diagnostic tools, expand remote triage, and empower preventative community medicine.",
    color: "#4C9F38",
    category: "PEOPLE",
    icon: "/E SDG Icons WEB/E-WEB-Goal-03.png",
    whyItMatters: "Billions lack access to certified specialist physicians. AI triage, assistive robotics, and tamper-proof health records save lives during critical medical windows.",
    challengeExamples: [
      "Early auditory/acoustic biomarker screening for respiratory diseases",
      "Accessible EHR interoperability with patient sovereign consent",
      "Mental health support engines with empathetic clinical protocols"
    ],
    technologyExamples: ["Edge ML Audio Models", "FHIR Standards", "Computer Vision", "Wearable Biometrics"],
    keywords: ["HealthTech", "Diagnostics", "Telemedicine", "Mental Wellness", "Assistive Tech"],
    relatedSdgs: [2, 6, 10],
    whatBuildersCanCreate: [
      "Smartphone camera retinal scan or skin lesion classification engine",
      "Continuous glucose/vitals trend forecasting with wearable BLE stream",
      "Low-bandwidth telemedicine and auto-translation consultation rooms"
    ]
  },
  {
    id: 4,
    number: "04",
    title: "Quality Education",
    tagline: "Ensure inclusive and equitable quality education",
    shortDescription: "Adaptive interactive learning experiences tailored to every student's cognitive pace and socio-economic context.",
    color: "#C5192D",
    category: "PEOPLE",
    icon: "/E SDG Icons WEB/E-WEB-Goal-04.png",
    whyItMatters: "Over 250 million children and youth are out of school, and hundreds of millions struggle with basic numeracy and literacy. AI-driven personalized pedagogy levels the playing field.",
    challengeExamples: [
      "Personalized Socratic AI tutors that adjust to learning neurodiversity",
      "Accessible STEM laboratory simulations running in low-spec browsers",
      "Open educational credential verification and skill micro-certifications"
    ],
    technologyExamples: ["WebAssembly", "LLM Reasoning Chains", "Speech Recognition", "WebGL Visualizers"],
    keywords: ["EdTech", "Neurodiversity", "Interactive Labs", "Vernacular Learning", "Open Science"],
    relatedSdgs: [1, 5, 8, 10],
    whatBuildersCanCreate: [
      "Gamified STEM circuit & physics simulator accessible on budget smartphones",
      "Multi-lingual textbook conversational tutor with visual diagrams",
      "Assistive screen reader & sign-language gesture converter for classrooms"
    ]
  },
  {
    id: 5,
    number: "05",
    title: "Gender Equality",
    tagline: "Achieve gender equality and empower all women and girls",
    shortDescription: "Build platforms that eradicate systemic bias, enhance physical and digital safety, and foster economic parity.",
    color: "#FF3A21",
    category: "PEOPLE",
    icon: "/E SDG Icons WEB/E-WEB-Goal-05.png",
    whyItMatters: "Women perform three times more unpaid care work and face ongoing safety and wage disparities. Technology can safeguard autonomy, spotlight bias, and scale mentorship.",
    challengeExamples: [
      "Predictive algorithmic bias audit suites for hiring and lending platforms",
      "Discreet, offline distress telemetry networks for personal safety",
      "Mentorship and angel fund pipelines dedicated to women founders"
    ],
    technologyExamples: ["Fairness ML Toolkits", "Encrypted Mesh Networks", "Geo-fencing", "Secure Enclaves"],
    keywords: ["Equality", "Safety Tech", "Fair AI", "Empowerment", "Civic Rights"],
    relatedSdgs: [1, 4, 8, 10],
    whatBuildersCanCreate: [
      "Anti-harassment telemetry wearable triggers with zero network dependency",
      "NLP job description and code review bias diagnostic analyzer",
      "Women micro-entrepreneur collaborative commerce incubator platform"
    ]
  },
  {
    id: 6,
    number: "06",
    title: "Clean Water and Sanitation",
    tagline: "Ensure availability and sustainable management of water",
    shortDescription: "Sensor networks for aquifer monitoring, leak mitigation, contaminant detection, and equitable community distribution.",
    color: "#26BDE2",
    category: "PLANET",
    icon: "/E SDG Icons WEB/E-WEB-Goal-06.png",
    whyItMatters: "2 billion people lack safely managed drinking water. Urban pipe networks lose up to 40% of treated water before reaching taps due to undetectable leaks.",
    challengeExamples: [
      "Acoustic and pressure sensor IoT pipelines for urban pipeline leak localization",
      "Low-cost spectrophotometric water turbidity and heavy metal analyzers",
      "Rainwater harvesting calculation models using drone aerial 3D elevation"
    ],
    technologyExamples: ["IoT Sensor Hubs", "Acoustic ML", "GIS Hydrology", "Smart Meters"],
    keywords: ["WaterTech", "Sanitation", "Leak Detection", "Hydrology", "Clean Resources"],
    relatedSdgs: [3, 9, 11, 14],
    whatBuildersCanCreate: [
      "Sub-$15 IoT water purity tester streaming TDS, pH, and coliform risk",
      "Municipal water rationing and pressure balancing digital twin",
      "Community groundwater table depletion tracking & recharge advisor"
    ]
  },
  {
    id: 7,
    number: "07",
    title: "Affordable and Clean Energy",
    tagline: "Ensure access to affordable, reliable, sustainable energy",
    shortDescription: "Accelerate distributed renewable energy adoption, microgrid load balancing, and battery storage optimization.",
    color: "#FCC30B",
    category: "PROSPERITY",
    icon: "/E SDG Icons WEB/E-WEB-Goal-07.png",
    whyItMatters: "Transitioning away from fossil fuels is the defining engineering challenge of our century. Smart microgrids allow decentralized solar and wind to stabilize regional grids.",
    challengeExamples: [
      "Peer-to-peer neighborhood solar energy trading over distributed ledgers",
      "Predictive solar panel degradation and soiling detection via computer vision",
      "Dynamic EV charging schedules synchronized with grid carbon intensity"
    ],
    technologyExamples: ["Smart Contracts", "Time-series Forecasting", "Modbus IoT", "Carbon APIs"],
    keywords: ["CleanEnergy", "Solar", "Microgrids", "EV Charging", "Renewables"],
    relatedSdgs: [9, 11, 12, 13],
    whatBuildersCanCreate: [
      "Rooftop solar potential 3D LiDAR simulator with payback period analytics",
      "Virtual power plant (VPP) coordinator for distributed battery systems",
      "Grid demand-response automation switch with dynamic tariff pricing"
    ]
  },
  {
    id: 8,
    number: "08",
    title: "Decent Work and Economic Growth",
    tagline: "Promote sustained, inclusive and sustainable economic growth",
    shortDescription: "Foster ethical gig economies, transparent labor standards, skill re-tooling, and sustainable digital entrepreneurship.",
    color: "#A21942",
    category: "PROSPERITY",
    icon: "/E SDG Icons WEB/E-WEB-Goal-08.png",
    whyItMatters: "Global youth unemployment and unregulated precarious labor persist. Transparent job matching and worker protections drive durable macroeconomic vitality.",
    challengeExamples: [
      "Equitable gig worker algorithmic bargaining and fatigue management",
      "Predictive workforce skill-gap analysis and reskilling roadmaps",
      "Transparent supply chain worker safety and fair wage verification"
    ],
    technologyExamples: ["Labor Market Analytics", "Decentralized Reputation", "Wearable Ergonomics"],
    keywords: ["Future of Work", "Economic Growth", "Fair Wages", "Upskilling", "Gig Economy"],
    relatedSdgs: [1, 4, 9, 10],
    whatBuildersCanCreate: [
      "Open-source gig worker income stability & emergency mutual fund",
      "AI resume anonymizer ensuring anti-discriminatory hiring pipelines",
      "Vocational skill credentialing portal backed by verifiable portfolio proofs"
    ]
  },
  {
    id: 9,
    number: "09",
    title: "Industry, Innovation and Infrastructure",
    tagline: "Build resilient infrastructure, foster innovation and sustainable industry",
    shortDescription: "Modernize industrial manufacturing with autonomous intelligence, predictive maintenance, and sustainable materials.",
    color: "#FD6925",
    category: "PROSPERITY",
    icon: "/E SDG Icons WEB/E-WEB-Goal-09.png",
    whyItMatters: "Infrastructure deficits hold back billions. Sustainable industrial processes reduce carbon footprint while boosting economic productivity.",
    challengeExamples: [
      "Vibration and thermal anomaly detection for civil infrastructure (bridges, tunnels)",
      "Digital twins for circular manufacturing minimizing virgin raw materials",
      "Edge-computing industrial IoT nodes for real-time factory efficiency"
    ],
    technologyExamples: ["Digital Twins", "Predictive Maintenance ML", "Edge IoT", "Robotics"],
    keywords: ["Industry 4.0", "Infrastructure", "Innovation", "Digital Twins", "Sensors"],
    relatedSdgs: [7, 8, 11, 12],
    whatBuildersCanCreate: [
      "Structural health sensor mesh for aging overpasses and flyovers",
      "Factory energy waste optimizer with continuous telemetry heatmaps",
      "Decentralized patent and hardware blueprint collaborative repository"
    ]
  },
  {
    id: 10,
    number: "10",
    title: "Reduced Inequalities",
    tagline: "Reduce inequality within and among countries",
    shortDescription: "Dismantle digital barriers, guarantee universal web accessibility, and foster equal socio-economic opportunity.",
    color: "#DD1367",
    category: "PROSPERITY",
    icon: "/E SDG Icons WEB/E-WEB-Goal-10.png",
    whyItMatters: "The richest 10% earn more than half of global income. Equitable digital tools empower marginalized communities to access credit, justice, and representation.",
    challengeExamples: [
      "Universal accessibility overlays converting any web app to eye-tracking and switch control",
      "Democratized legal document simplification and rights literacy AI",
      "Algorithmic redlining detection in municipal resource allocation"
    ],
    technologyExamples: ["WCAG 2.2 Automation", "Computer Vision Eye Gaze", "NLP Simplifiers"],
    keywords: ["Accessibility", "Inclusion", "Social Justice", "Equitable Systems", "Equal Rights"],
    relatedSdgs: [1, 4, 5, 16],
    whatBuildersCanCreate: [
      "Real-time webcam gaze-to-speech assistive communication board",
      "Vernacular legal rights assistant breaking down eviction and labor laws",
      "Crowdsourced accessibility mapping for urban wheelchair navigators"
    ]
  },
  {
    id: 11,
    number: "11",
    title: "Sustainable Cities and Communities",
    tagline: "Make cities inclusive, safe, resilient and sustainable",
    shortDescription: "Pioneer smart urban transit, civic feedback loops, rapid disaster response, and high-efficiency smart buildings.",
    color: "#FD9D24",
    category: "PROSPERITY",
    icon: "/E SDG Icons WEB/E-WEB-Goal-11.png",
    whyItMatters: "Cities consume over 70% of global energy and produce over 70% of greenhouse gases. Intelligent urban systems make dense cities livable and resilient.",
    challengeExamples: [
      "Multimodal transit optimization synchronizing buses, metros, and micro-mobility",
      "Autonomous flood risk simulation modeling for urban drainage networks",
      "Citizen civic reporting app with automated department routing and SLAs"
    ],
    technologyExamples: ["Computer Vision Traffic Agents", "GIS Spatial Analytics", "Civic APIs"],
    keywords: ["SmartCities", "Urban Mobility", "Disaster Response", "Civic Tech", "Resilience"],
    relatedSdgs: [6, 7, 9, 13],
    whatBuildersCanCreate: [
      "Live traffic signal timing optimizer responsive to emergency vehicle sirens",
      "Urban heat island satellite mapper with cool-roof recommendation engine",
      "Civic problem reporting dashboard with automated duplicate clustering"
    ]
  },
  {
    id: 12,
    number: "12",
    title: "Responsible Consumption and Production",
    tagline: "Ensure sustainable consumption and production patterns",
    shortDescription: "Design out waste through circular economy platforms, material lifecycle tracking, and smart recycling.",
    color: "#BF8B2E",
    category: "PLANET",
    icon: "/E SDG Icons WEB/E-WEB-Goal-12.png",
    whyItMatters: "Electronic waste alone generates over 50 million metric tons yearly, containing billions in recoverable metals alongside toxic compounds.",
    challengeExamples: [
      "Barcode/QR product passport exposing full carbon footprint and repairability score",
      "Computer vision recycling bin sorting plastics, paper, and electronic scrap",
      "B2B industrial byproduct exchange marketplace matching waste to input materials"
    ],
    technologyExamples: ["Computer Vision", "Digital Product Passports", "Supply Chain Tracing"],
    keywords: ["Circular Economy", "Waste Sorting", "E-Waste", "Lifecycle Analysis", "Recycling"],
    relatedSdgs: [6, 8, 9, 13, 14, 15],
    whatBuildersCanCreate: [
      "Smart camera waste bin that mechanically classifies recyclables in real time",
      "Repairability index chrome extension calculating product longevity",
      "Hyperlocal peer-to-peer tool and appliance sharing library"
    ]
  },
  {
    id: 13,
    number: "13",
    title: "Climate Action",
    tagline: "Take urgent action to combat climate change and its impacts",
    shortDescription: "Deploy carbon calculation intelligence, early warning systems, and climate adaptation engineering.",
    color: "#3F7E44",
    category: "PLANET",
    icon: "/E SDG Icons WEB/E-WEB-Goal-13.png",
    whyItMatters: "Rising global temperatures exacerbate extreme weather events, threatening food supply and vulnerable coastal communities worldwide.",
    challengeExamples: [
      "Automated carbon footprint telemetry for cloud computing workloads",
      "Satellite early wildfire detection and perimeter spread simulation",
      "Community disaster preparedness and extreme weather early warning SMS broadcasts"
    ],
    technologyExamples: ["Satellite Earth Observation", "Thermodynamic Models", "Green Cloud APIs"],
    keywords: ["ClimateTech", "Carbon Accounting", "Wildfire Detection", "Early Warning", "Adaptation"],
    relatedSdgs: [7, 11, 14, 15],
    whatBuildersCanCreate: [
      "Green CI/CD optimizer scheduling cloud builds when grid carbon intensity is lowest",
      "Wildfire smoke trajectory visualizer with N95 mask advisory alerts",
      "Community flood evacuation routing system factoring real-time road flooding"
    ]
  },
  {
    id: 14,
    number: "14",
    title: "Life Below Water",
    tagline: "Conserve and sustainably use oceans, seas and marine resources",
    shortDescription: "Protect aquatic ecosystems from plastic pollution, overfishing, and chemical acidification through autonomous monitoring.",
    color: "#0A97D9",
    category: "PLANET",
    icon: "/E SDG Icons WEB/E-WEB-Goal-14.png",
    whyItMatters: "Oceans absorb 30% of carbon dioxide and produce over 50% of the world's oxygen. Overfishing and plastic dumping threaten marine food webs.",
    challengeExamples: [
      "Automated acoustic hydrophone monitoring for illegal trawling in marine sanctuaries",
      "Satellite radar oil slick detection and plastic gyre tracking models",
      "Coral reef bleaching health index derived from multispectral satellite bands"
    ],
    technologyExamples: ["Underwater Acoustics ML", "SAR Radar Satellite", "Autonomous Surface Vessels"],
    keywords: ["OceanTech", "Marine Life", "Plastic Cleanup", "Coral Reefs", "Fisheries"],
    relatedSdgs: [6, 12, 13, 15],
    whatBuildersCanCreate: [
      "Hydrophone acoustic classifier detecting marine mammal distress and boat engines",
      "Coastal plastic accumulation tracker using crowd-uploaded beach photos",
      "Sustainable seafood provenance verification scanner for consumers"
    ]
  },
  {
    id: 15,
    number: "15",
    title: "Life on Land",
    tagline: "Protect, restore and promote sustainable use of terrestrial ecosystems",
    shortDescription: "Combating deforestation, halting biodiversity loss, and automating anti-poaching surveillance.",
    color: "#56C02B",
    category: "PLANET",
    icon: "/E SDG Icons WEB/E-WEB-Goal-15.png",
    whyItMatters: "One million species face extinction within decades. Forests filter our air, regulate water cycles, and harbor ancestral indigenous wisdom.",
    challengeExamples: [
      "Acoustic chainsaw and gunshot detection in protected national parks via solar IoT sensors",
      "Drone LiDAR canopy density and reforestation tracking analytics",
      "AI camera trap wildlife census and endangered species counter"
    ],
    technologyExamples: ["Bioacoustic ML", "Drone Photogrammetry", "Edge Camera Traps"],
    keywords: ["BioDiversity", "Reforestation", "Anti-Poaching", "Wildlife Tracking", "Forests"],
    relatedSdgs: [6, 12, 13, 14],
    whatBuildersCanCreate: [
      "Solar-powered tree-mounted acoustic anomaly detector reporting illegal felling",
      "Camera trap edge ML device that logs tiger and leopard movements",
      "Drone seed bombing route planner maximizing tree survival rates"
    ]
  },
  {
    id: 16,
    number: "16",
    title: "Peace, Justice and Strong Institutions",
    tagline: "Promote peaceful and inclusive societies for sustainable development",
    shortDescription: "Uphold transparency, fight corruption, protect human rights, and strengthen institutional accountability.",
    color: "#00689D",
    category: "PEACE",
    icon: "/E SDG Icons WEB/E-WEB-Goal-16.png",
    whyItMatters: "Without justice and transparent governance, sustainable development cannot flourish. Free information access and algorithmic transparency safeguard democracy.",
    challengeExamples: [
      "Public tender procurement anomaly detection identifying conflicts of interest",
      "Censorship-resistant citizen journalism archive with cryptographic timestamps",
      "Whistleblower anonymity portal with zero metadata leakage"
    ],
    technologyExamples: ["Cryptographic Timestamps", "Zero-Knowledge Proofs", "Graph Analytics"],
    keywords: ["Civic Integrity", "Open Data", "JusticeTech", "Transparency", "Accountability"],
    relatedSdgs: [5, 10, 17],
    whatBuildersCanCreate: [
      "Government spending procurement graph visualizer detecting supplier collusion",
      "End-to-end encrypted anonymous whistleblower platform with Tor routing",
      "Civic ballot and policy debate synthesizer distilling complex bills"
    ]
  },
  {
    id: 17,
    number: "17",
    title: "Partnerships for the Goals",
    tagline: "Strengthen the means of implementation and revitalize global partnership",
    shortDescription: "Unite academia, student innovators, open source ecosystems, and civic bodies for cross-border collective impact.",
    color: "#19486A",
    category: "PARTNERSHIP",
    icon: "/E SDG Icons WEB/E-WEB-Goal-17.png",
    whyItMatters: "The 17 SDGs cannot be solved in isolation. Cross-sector collaboration, shared open-source datasets, and multilateral cooperation turn vision into execution.",
    challengeExamples: [
      "Federated global research data commons for open science reproduction",
      "Open-source hardware standardization and peer-to-peer technology transfer",
      "Multi-NGO resource coordination mesh during complex humanitarian responses"
    ],
    technologyExamples: ["Federated Learning", "Open APIs", "Interoperable Data Standards"],
    keywords: ["Partnerships", "Open Science", "Global Alliances", "Cross-Sector", "Impact Scaling"],
    relatedSdgs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    whatBuildersCanCreate: [
      "Global open-source SDG project index with skill & donor matching",
      "Federated humanitarian aid API standard connecting student hackathons to NGOs",
      "Impact telemetry dashboard aggregating carbon and social outcomes across projects"
    ]
  }
];

export const SDG_CATEGORIES: { name: SDGCategory; description: string; color: string; sdgs: number[] }[] = [
  {
    name: "PEOPLE",
    description: "Universal wellbeing, basic dignity, gender equality, and quality learning for every human.",
    color: "#E5243B",
    sdgs: [1, 2, 3, 4, 5]
  },
  {
    name: "PLANET",
    description: "Preserving biodiversity, safeguarding oceans, clean water, and halting climate catastrophe.",
    color: "#3F7E44",
    sdgs: [6, 12, 13, 14, 15]
  },
  {
    name: "PROSPERITY",
    description: "Sustainable infrastructure, fair work, clean energy, and thriving equitable cities.",
    color: "#FCC30B",
    sdgs: [7, 8, 9, 10, 11]
  },
  {
    name: "PEACE",
    description: "Open institutions, civic integrity, rule of law, and protection of universal freedoms.",
    color: "#00689D",
    sdgs: [16]
  },
  {
    name: "PARTNERSHIP",
    description: "Cross-domain alliances, open science, and global collaborative technology standards.",
    color: "#19486A",
    sdgs: [17]
  }
];
