export interface ProblemStatement {
  id: string;
  code: string;
  title: string;
  description: string;
  whatWeNeed: string[];
  sdgs?: string[];
  coreFlow?: string;
}

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
  problemStatements: ProblemStatement[];
}

export const HACKATHON_TRACKS: HackathonTrack[] = [
  {
    id: "health-well-being",
    number: "01",
    title: "HEALTH & WELL-BEING",
    tagline: "Innovate to improve healthcare, mental well-being, and quality of life.",
    description: "Develop innovative technologies that improve healthcare delivery, remote diagnosis, mental health support, and overall human quality of life across diverse communities.",
    sdgs: [3, 1, 2, 6],
    accentColor: "#10B981",
    iconName: "HeartPulse",
    keyChallenges: [
      "Offline & vernacular tele-consultation triage for underserved rural clinics",
      "Non-invasive mental well-being monitoring & accessible therapeutic support tools",
      "Wearable vitals telemetry and early anomaly detection for elderly care",
      "Decentralized patient medical data portability with privacy-preserving encryption"
    ],
    techPointers: ["FastAPI / Python", "WebRTC Video", "Bio-Sensors / ESP32", "FHIR Standards", "Edge ML Inference"],
    problemStatements: [
      {
        id: "hw-ps1",
        code: "PS1",
        title: "The Pollution Blame Ledger: Source Attribution with Health Cost",
        description: "Delhi’s PM2.5 pollution comes from multiple sources such as stubble burning, vehicles, construction, industry, and weather conditions. However, determining how much each source contributes to a specific pollution episode remains difficult. Build a data-driven system that estimates the contribution of different pollution sources to Delhi’s PM2.5 levels and quantifies their estimated health impact.",
        whatWeNeed: [
          "Estimate the contribution of each major pollution source using satellite fire detections, weather/wind data, CPCB air-quality readings, and traffic indicators.",
          "Provide uncertainty or confidence for its estimates.",
          "Convert pollution exposure into estimated health impacts using published research.",
          "Present results through a simple, evidence-based dashboard that clearly communicates what the model can and cannot determine.",
          "Demonstrate how the attribution changes when tested on a new pollution event provided during judging."
        ],
        sdgs: ["SDG 3 – Good Health and Well-Being", "SDG 11 – Sustainable Cities and Communities", "SDG 13 – Climate Action", "SDG 16 – Peace, Justice and Strong Institutions"]
      },
      {
        id: "hw-ps2",
        code: "PS2",
        title: "Break the AI Doctor: Detect Bias, Then Fix It",
        description: "AI health assistants can appear accurate overall while performing poorly for specific groups, languages, age groups, genders, or communication styles. Build a system that systematically identifies hidden biases in a black-box AI health assistant, statistically validates the findings, and reduces the identified bias without significantly reducing overall performance.",
        whatWeNeed: [
          "Identifies groups and situations where the AI performs differently.",
          "Uses statistical evidence to distinguish real bias from random variation.",
          "Applies a model-independent wrapper or mitigation technique to reduce unfair outcomes.",
          "Compares fairness and overall accuracy before and after the fix.",
          "Demonstrates whether the approach can detect and handle a new, unseen bias introduced by the organizers."
        ],
        sdgs: ["SDG 10 – Reduced Inequalities", "SDG 3 – Good Health and Well-Being", "SDG 5 – Gender Equality", "SDG 16 – Peace, Justice and Strong Institutions"]
      },
      {
        id: "hw-ps3",
        code: "PS3",
        title: "The Resistance Radar: City-Scale Antibiotic Resistance Intelligence",
        description: "Antimicrobial resistance is making common infections increasingly difficult to treat. Hospitals often lack a clear, up-to-date view of which antibiotics remain effective locally. Build a system that combines laboratory culture and antibiotic-sensitivity data from multiple hospitals to monitor resistance patterns and identify emerging changes.",
        whatWeNeed: [
          "Generates hospital- and ward-level antibiograms from structured and semi-structured data.",
          "Estimates how key drug–bacteria resistance patterns may change over the coming quarter.",
          "Detects unusual resistance spikes that could indicate emerging outbreaks.",
          "Provides evidence-based empirical antibiotic options with clear confidence levels.",
          "Handles missing data, reporting delays, and differences in testing patterns between hospitals."
        ],
        sdgs: ["SDG 3 – Good Health and Well-Being", "SDG 10 – Reduced Inequalities"]
      },
      {
        id: "hw-ps4",
        code: "PS4",
        title: "The Nutri-Equity Engine: Affordable Nutrition Optimization",
        description: "Low-income households often struggle to maintain nutritious diets because of food prices, seasonal availability, household needs, and access to subsidized food. Build a system that creates affordable, nutritionally adequate, and culturally practical weekly meal plans based on household characteristics, local food prices, and available food entitlements.",
        whatWeNeed: [
          "Generates the lowest-cost nutritionally adequate weekly meal plan.",
          "Considers household size, age, dietary preferences, cooking constraints, and local food availability.",
          "Incorporates PDS entitlements and changing food prices.",
          "Detects price changes and automatically adjusts meal plans.",
          "Estimates potential changes in anemia risk based on nutritional adequacy.",
          "Provides results through a simple, low-literacy and vernacular-friendly interface."
        ],
        sdgs: ["SDG 2 – Zero Hunger", "SDG 3 – Good Health and Well-Being", "SDG 5 – Gender Equality", "SDG 1 – No Poverty"]
      },
      {
        id: "hw-ps5",
        code: "PS5",
        title: "The Mother-Watch Planner: Maternal Care Prioritization",
        description: "Missed antenatal visits and delayed identification of high-risk pregnancies can lead to preventable complications, while frontline health workers have limited time and resources. Build a system that identifies pregnancies requiring greater attention and creates efficient weekly visit plans for frontline workers.",
        whatWeNeed: [
          "Identifies women at higher risk of missing antenatal care or developing complications.",
          "Creates optimized weekly visit schedules based on risk and travel effort.",
          "Clearly explains why each case is prioritized.",
          "Accounts for limited workforce and geographic constraints.",
          "Audits the scheduling process to identify potential bias against specific communities."
        ],
        sdgs: ["SDG 3 – Good Health and Well-Being", "SDG 5 – Gender Equality", "SDG 10 – Reduced Inequalities"]
      },
      {
        id: "hw-ps6",
        code: "PS6",
        title: "The Stockout Shield: Essential Medicine Supply Optimization",
        description: "Essential medicines can run out at some healthcare facilities while excess stock at others expires unused. Build a system that helps healthcare facilities anticipate medicine demand, identify stockout and expiry risks, and efficiently redistribute available supplies.",
        whatWeNeed: [
          "Forecasts medicine-level demand for each facility.",
          "Detects upcoming stockout and expiry risks.",
          "Accounts for seasonal trends, outbreaks, and sudden demand changes.",
          "Recommends inter-facility transfers and reorder quantities to reduce shortages and wastage.",
          "Handles sparse, irregular, and incomplete inventory data.",
          "Clearly explains the reason behind every recommendation."
        ],
        sdgs: ["SDG 3 – Good Health and Well-Being", "SDG 9 – Industry, Innovation and Infrastructure", "SDG 12 – Responsible Consumption and Production"]
      }
    ]
  },
  {
    id: "social-impact-women-safety",
    number: "02",
    title: "SOCIAL IMPACT & WOMEN SAFETY",
    tagline: "Develop solutions that empower communities, promote inclusivity, and create safer spaces.",
    description: "Build compassionate, high-impact platforms that enhance personal safety in transit, dismantle systemic gender barriers, promote community inclusivity, and protect vulnerable citizens.",
    sdgs: [5, 10, 11, 16],
    accentColor: "#EC4899",
    iconName: "Shield",
    keyChallenges: [
      "Discreet hands-free SOS triggers, covert route safety telemetry & geo-fenced safe havens",
      "Crowdsourced harassment hotspot heatmaps with verifiable anonymous incident reports",
      "Community empowerment networks, legal aid navigators & digital literacy tools",
      "Universal web accessibility layers & switch-control navigation overlays"
    ],
    techPointers: ["Geolocation APIs", "WebSockets / Live Feeds", "Encrypted Mesh Routing", "Zero-Knowledge Proofs", "React Native / PWA"],
    problemStatements: [
      {
        id: "si-ps1",
        code: "PS1",
        title: "Silent Surveillance: Detecting Covert Tracking on Personal Devices",
        description: "Covert monitoring through stalkerware, shared accounts, compromised sessions, and physical trackers can expose a survivor’s location, communication, and personal information without their knowledge. Build a defensive system that helps identify possible monitoring while minimizing the risk of alerting the person responsible.",
        whatWeNeed: [
          "Identifies potential stalkerware, compromised accounts, and nearby trackers.",
          "Shows what information may be exposed and the evidence supporting the finding.",
          "Provides safe, step-by-step guidance on what to secure, preserve, or avoid changing immediately.",
          "Works for users with low technical literacy.",
          "Evaluates false positives, evasion, and the risk of the tool itself being detected."
        ],
        sdgs: ["SDG 5 – Gender Equality", "SDG 16 – Peace, Justice and Strong Institutions"]
      },
      {
        id: "si-ps2",
        code: "PS2",
        title: "The Leaky Pipeline: Tracing Gaps in the Justice System",
        description: "Cases of violence against women often pass through multiple institutions, including police, hospitals, forensic labs, prosecutors, and courts. Fragmented records make it difficult to track cases across these stages and identify where delays, drop-offs, or bottlenecks occur. Build a privacy-safe system to reconstruct this journey and identify systemic gaps.",
        whatWeNeed: [
          "Links fragmented case records without relying on a common identifier.",
          "Reconstructs the journey of cases across different institutions.",
          "Identifies patterns in delays, case drop-offs, and bottlenecks.",
          "Highlights trends across stages, locations, or case categories without targeting individuals.",
          "Measures and manages record-linkage errors.",
          "Protects survivor identities and prevents misuse of the analysis."
        ],
        sdgs: ["SDG 16 – Peace, Justice and Strong Institutions", "SDG 5 – Gender Equality"]
      },
      {
        id: "si-ps3",
        code: "PS3",
        title: "Ten Seconds to Read a Call: Helpline Triage in Hinglish",
        description: "Helpline calls can contain limited, noisy, or mixed-language information, making it difficult to quickly identify emergencies and route them to the right support service. Build an AI-based triage system that can understand Hinglish and regional language variations and extract critical information from short call transcripts.",
        whatWeNeed: [
          "Assigns an appropriate urgency level with minimal risk of missing emergencies.",
          "Extracts location, threat type, and key details from noisy transcripts.",
          "Routes cases to the appropriate service such as police, medical care, shelter, or legal aid.",
          "Identifies potential repeat complaints involving the same individual while minimizing incorrect matches.",
          "Handles indirect language, code words, dialects, and callers who cannot speak openly.",
          "Evaluates performance on a hidden set of unseen transcripts."
        ],
        sdgs: ["SDG 5 – Gender Equality", "SDG 16 – Peace, Justice and Strong Institutions", "SDG 10 – Reduced Inequalities", "SDG 9 – Industry, Innovation and Infrastructure"]
      },
      {
        id: "si-ps4",
        code: "PS4",
        title: "The Poisoned Safety Map: Detecting Fake Safety Reports",
        description: "Crowdsourced safety maps can be manipulated through coordinated fake reports, making genuinely unsafe areas appear safe or unfairly damaging the reputation of a neighbourhood or business. Build a trust system that identifies suspicious reports while minimizing the risk of suppressing genuine safety complaints.",
        whatWeNeed: [
          "Assesses the credibility of individual safety reports.",
          "Detects coordinated and isolated fake-report campaigns.",
          "Preserves genuine reports and minimizes false suppression.",
          "Improves the reliability of the safety map using evidence from the report stream.",
          "Detects new attack patterns without requiring the system to be rebuilt.",
          "Measures fake detection, genuine-report suppression, and map accuracy before and after processing."
        ],
        sdgs: ["SDG 5 – Gender Equality", "SDG 16 – Peace, Justice and Strong Institutions", "SDG 11 – Sustainable Cities and Communities", "SDG 9 – Industry, Innovation and Infrastructure"]
      },
      {
        id: "si-ps5",
        code: "PS5",
        title: "Know Your Rights in Ten Minutes: A Reliable Legal Guide",
        description: "People facing harassment or violence may not know which complaint to make, where to seek help, what documents are required, or what happens next. Build a reliable Hindi-English legal guidance system that provides clear, situation-based information without inventing laws, procedures, forms, or authorities.",
        whatWeNeed: [
          "Answers legal and process-related questions using the provided legal knowledge base.",
          "Gives clear, step-by-step guidance in Hindi and English.",
          "Identifies situations where the available information is insufficient and directs users to legal aid support.",
          "Avoids hallucinating laws, forms, offices, deadlines, or procedures.",
          "Handles ambiguous and trick questions safely.",
          "Immediately reflects updated rules provided by the organizers during judging."
        ],
        sdgs: ["SDG 16 – Peace, Justice and Strong Institutions", "SDG 5 – Gender Equality", "SDG 10 – Reduced Inequalities", "SDG 4 – Quality Education"]
      }
    ]
  },
  {
    id: "sustainability-smart-cities",
    number: "03",
    title: "SUSTAINABILITY & SMART CITIES",
    tagline: "Build sustainable technologies for smarter, greener, and more efficient urban environments.",
    description: "Re-engineer modern urban centers into sustainable, resilient, and energy-smart environments. Optimize civic infrastructure, reduce carbon footprints, and automate municipal responsiveness.",
    sdgs: [11, 7, 12, 13],
    accentColor: "#F59E0B",
    iconName: "Building2",
    keyChallenges: [
      "Dynamic emergency vehicle signal preemption & adaptive urban traffic corridor grids",
      "Hydrological simulation for rapid monsoon urban flash-flood prediction & drainage monitoring",
      "Computer vision sorting & decentralized tracking for circular waste recycling",
      "Commercial building energy digital twins reducing peak cooling grid loads"
    ],
    techPointers: ["Deck.gl / Mapbox", "Digital Twins", "Sensor Web APIs", "Graph Neural Networks", "Time-Series Models"],
    problemStatements: [
      {
        id: "ssc-ps1",
        code: "PS1",
        title: "Crop Health Monitoring Using Satellite Imagery",
        description: "Farmers and agricultural authorities often lack timely information about crop health across large farming areas. Build an intelligent system that uses satellite imagery and environmental data to identify crop stress, abnormal growth, and potential water-related issues without requiring manual inspection of every field.",
        whatWeNeed: [
          "Maps agricultural fields and assigns a crop-health status.",
          "Detects areas showing signs of crop stress or abnormal growth.",
          "Uses satellite imagery along with rainfall, temperature, or soil-moisture data where available.",
          "Compares historical imagery to identify improving or declining crop health.",
          "Generates alerts highlighting areas that require field-level inspection."
        ],
        sdgs: ["SDG 2 – Zero Hunger", "SDG 6 – Clean Water and Sanitation", "SDG 12 – Responsible Consumption and Production", "SDG 13 – Climate Action"]
      },
      {
        id: "ssc-ps2",
        code: "PS2",
        title: "Satellite-Based Flood Prediction & Early Warning System",
        description: "Flooding and urban waterlogging can vary significantly across nearby areas, making city-wide warnings insufficient. Build a data-driven system that combines satellite imagery, terrain, rainfall, drainage, and historical flood data to identify where flooding is likely to occur, estimate its severity, and determine which areas require attention first.",
        whatWeNeed: [
          "Generates a dynamic flood-risk map.",
          "Identifies specific vulnerable locations or zones.",
          "Estimates the potential severity of flooding.",
          "Assigns priorities based on risk and severity.",
          "Provides recommended actions for each high-risk area.",
          "Uses historical and real-time/updated environmental data where available."
        ],
        sdgs: ["SDG 11 – Sustainable Cities and Communities", "SDG 6 – Clean Water and Sanitation", "SDG 13 – Climate Action"]
      },
      {
        id: "ssc-ps3",
        code: "PS3",
        title: "Smart Mobility & Carbon-Aware Route Planning",
        description: "Urban commuters usually choose routes based on travel time or distance, while congestion, fuel consumption, and carbon emissions are rarely considered together. Build a smart route-planning system that helps users understand the mobility and environmental impact of different travel options.",
        whatWeNeed: [
          "Takes source, destination, travel mode, and optional departure time as inputs.",
          "Considers distance, congestion, travel time, vehicle type, and estimated fuel/energy consumption.",
          "Estimates the carbon emissions associated with each route.",
          "Provides multiple route options with clear time, cost, and environmental trade-offs.",
          "Allows users to choose a route based on their own priorities."
        ],
        sdgs: ["SDG 11 – Sustainable Cities and Communities", "SDG 13 – Climate Action", "SDG 12 – Responsible Consumption and Production"]
      },
      {
        id: "ssc-ps4",
        code: "PS4",
        title: "Self-Healing Renewable Energy Grid",
        description: "As campuses and communities adopt solar power, batteries, EVs, and other distributed energy resources, changing demand, intermittent renewable generation, and equipment failures can cause energy wastage and local power disruptions. Build a software-defined self-healing microgrid that intelligently coordinates these resources to maintain reliable power while maximizing renewable-energy use.",
        whatWeNeed: [
          "Continuously monitors simulated renewable generation, batteries, EVs, electricity demand, and critical loads.",
          "Detects changes, faults, and supply-demand imbalances.",
          "Predicts upcoming energy shortages or excess generation.",
          "Reallocates available energy between resources.",
          "Shifts flexible loads and EV charging when required.",
          "Protects critical loads during disruptions and recovers from component failures without manual intervention.",
          "Minimizes energy wastage, peak demand, and carbon emissions."
        ],
        coreFlow: "Detect → Predict → Reallocate → Recover",
        sdgs: ["SDG 7 – Affordable and Clean Energy", "SDG 9 – Industry, Innovation and Infrastructure", "SDG 11 – Sustainable Cities and Communities", "SDG 13 – Climate Action"]
      }
    ]
  },
  {
    id: "ai4impact",
    number: "04",
    title: "AI4IMPACT",
    tagline: "Leverage artificial intelligence to solve meaningful real-world problems and drive positive change.",
    description: "Deploy state-of-the-art machine learning, computer vision, natural language intelligence, and autonomous agents to tackle complex societal challenges with ethical transparency.",
    sdgs: [4, 8, 9, 10, 16],
    accentColor: "#8B5CF6",
    iconName: "Sparkles",
    keyChallenges: [
      "Multimodal Socratic educational copilots adapted for vernacular & neurodiverse learners",
      "Agrarian vision models analyzing soil nutrient deficits, crop rust, and weather volatility",
      "Automated civic document summarization and public tender transparency audits",
      "Algorithmic fairness audits that detect and eliminate systemic demographic bias"
    ],
    techPointers: ["LangChain / LlamaIndex", "PyTorch / ONNX Web", "Whisper Speech Models", "Vector DBs", "FastAPI"],
    problemStatements: [
      {
        id: "ai-ps1",
        code: "PS1",
        title: "AI-Powered Disaster Response",
        description: "During disasters, emergency teams receive large amounts of images, reports, and location data, making it difficult to quickly determine where help is needed most. Build an AI-powered disaster response system that analyzes this information to assess damage, identify affected areas, and prioritize emergency response.",
        whatWeNeed: [
          "Detects floods, fires, structural damage, blocked roads, and other disaster impacts from images and reports.",
          "Classifies affected locations by severity: Low, Medium, High, or Critical.",
          "Estimates the extent of damage and affected infrastructure/areas.",
          "Generates a dynamic priority score using severity, population impact, accessibility, and urgency.",
          "Recommends the type and priority of resources required, such as rescue teams, medical aid, food, or water.",
          "Displays affected locations, severity, and response priorities on an interactive map/dashboard."
        ],
        coreFlow: "Detect → Assess → Prioritize → Allocate → Respond",
        sdgs: ["SDG 11 – Sustainable Cities and Communities", "SDG 13 – Climate Action", "SDG 3 – Good Health and Well-Being", "SDG 9 – Industry, Innovation and Infrastructure"]
      },
      {
        id: "ai-ps2",
        code: "PS2",
        title: "AI-Powered Smart Irrigation",
        description: "Agriculture consumes significant amounts of water, while irrigation is often based on fixed schedules rather than actual crop and soil conditions. Build an AI-powered irrigation system that predicts water requirements and optimizes when, where, and how much water should be supplied.",
        whatWeNeed: [
          "Predicts water requirements using soil, crop, weather, and historical irrigation data.",
          "Forecasts future soil-moisture levels.",
          "Generates optimized irrigation schedules for different fields.",
          "Minimizes water usage while maintaining suitable soil moisture.",
          "Detects over-irrigation and under-irrigation and generates alerts.",
          "Automatically adapts recommendations to rainfall and weather forecasts.",
          "Provides customized recommendations based on crop, soil type, and field conditions."
        ],
        coreFlow: "Predictive ML → Time-Series Forecasting → Weather Analysis → Optimization → Visualization",
        sdgs: ["SDG 2 – Zero Hunger", "SDG 6 – Clean Water and Sanitation", "SDG 12 – Responsible Consumption and Production", "SDG 13 – Climate Action"]
      },
      {
        id: "ai-ps3",
        code: "PS3",
        title: "AI-Powered Vendor Compliance Checker for Government Procurement",
        description: "Government procurement requires verification of multiple vendor documents, making manual compliance checks time-consuming and prone to missed inconsistencies or expired information. Build an AI-powered document verification system that checks vendor submissions against a predefined procurement checklist.",
        whatWeNeed: [
          "Accepts vendor documents such as GST, PAN, Udyam/MSME, Startup India, OEM authorization, and supporting documents.",
          "Extracts relevant information using OCR and document intelligence.",
          "Checks documents for missing, inconsistent, expired, or potentially invalid information.",
          "Compares extracted details against the provided procurement requirements.",
          "Highlights discrepancies and missing requirements with supporting evidence.",
          "Generates a simple Compliance Report showing compliant, non-compliant, and requires-review items."
        ],
        coreFlow: "Upload → Extract → Verify → Detect Issues → Compliance Report",
        sdgs: ["SDG 16 – Peace, Justice and Strong Institutions", "SDG 9 – Industry, Innovation and Infrastructure", "SDG 8 – Decent Work and Economic Growth"]
      },
      {
        id: "ai-ps4",
        code: "PS4",
        title: "AI-Powered Intelligent Disease Symptom Checker",
        description: "Build an AI-powered health assessment system that analyzes symptoms and basic health information, asks relevant follow-up questions, identifies possible conditions, and assesses the urgency of medical attention.",
        whatWeNeed: [
          "Accepts symptoms, duration, age, medical history, and allergies.",
          "Generates intelligent, symptom-specific follow-up questions.",
          "Identifies possible conditions based on the provided information.",
          "Classifies urgency, such as Self-Care, Doctor Consultation, or Emergency.",
          "Clearly explains the factors behind the assessment."
        ],
        sdgs: ["SDG 3 – Good Health and Well-Being", "SDG 10 – Reduced Inequalities"]
      }
    ]
  },
  {
    id: "fintech",
    number: "05",
    title: "FINTECH",
    tagline: "Transform financial services through innovative, secure, and accessible technology.",
    description: "Reinvent modern commerce, inclusive micro-lending, algorithmic fraud prevention, and transparent financial tools. Democratize economic opportunities for underbanked populations.",
    sdgs: [1, 8, 9, 10],
    accentColor: "#3B82F6",
    iconName: "Coins",
    keyChallenges: [
      "Alternative cash-flow credit underwriting for gig workers & informal sector micro-merchants",
      "Real-time fraud and synthetic identity detection on high-velocity payment rails",
      "Micro-savings automation, peer-to-peer liquidity networks, and decentralized escrow",
      "Interactive financial literacy simulators for first-time digital banking consumers"
    ],
    techPointers: ["Account Aggregator APIs", "UPI Sandbox Rails", "ZK Identity Proofs", "Graph Databases", "Next.js / Node.js"],
    problemStatements: [
      {
        id: "ft-ps1",
        code: "PS1",
        title: "Parent-Controlled Teen Wallet with Financial Learning",
        description: "Teenagers often lack practical financial education while parents have limited tools to guide spending safely. Build a parent-controlled digital wallet that combines spending controls with interactive financial learning.",
        whatWeNeed: [
          "Allows parents to set spending limits and merchant-category controls.",
          "Provides a safe simulated or prepaid wallet for teenagers.",
          "Includes short lessons on saving, budgeting, and responsible spending.",
          "Rewards users with badges and goals for completing learning activities.",
          "Includes mock investing or financial simulations to build practical skills.",
          "Provides parents with a simple view of spending and learning progress."
        ],
        coreFlow: "Set Limits → Spend → Learn → Save → Earn Badges",
        sdgs: ["SDG 4 – Quality Education", "SDG 8 – Decent Work and Economic Growth", "SDG 10 – Reduced Inequalities"]
      },
      {
        id: "ft-ps2",
        code: "PS2",
        title: "Anti-Predatory Loan App Detector",
        description: "Some digital lending applications may request excessive permissions, hide important terms, or operate without appropriate authorization, exposing borrowers to financial and privacy risks. Build a loan-app risk assessment system that helps users identify potentially unsafe lending applications before using them.",
        whatWeNeed: [
          "Analyzes an app's permissions and requested access.",
          "Checks available information about the lender's registration and authorization status.",
          "Identifies suspicious indicators such as excessive data access or unclear lending practices.",
          "Generates a simple Safe / Risky / Requires Review assessment with reasons.",
          "Explains the detected risks in simple, user-friendly language.",
          "Allows users to assess an app using its name, available metadata, or APK where feasible."
        ],
        coreFlow: "Scan → Verify → Assess Risk → Explain → Warn",
        sdgs: ["SDG 10 – Reduced Inequalities", "SDG 16 – Peace, Justice and Strong Institutions", "SDG 9 – Industry, Innovation and Infrastructure"]
      },
      {
        id: "ft-ps3",
        code: "PS3",
        title: "Crypto & Web3 Scam Wallet Checker",
        description: "Crypto users can interact with scam wallets and malicious token contracts without realizing the associated risks. Build a risk-analysis system that evaluates wallet addresses and token contracts using available blockchain and threat-intelligence data.",
        whatWeNeed: [
          "Accepts a wallet address or token contract as input.",
          "Checks for known scam associations and suspicious activity.",
          "Detects indicators such as rug-pull patterns, honeypot behavior, and risky approval requests.",
          "Generates a clear risk assessment with evidence behind the findings.",
          "Presents the results through a simple, user-friendly dashboard."
        ],
        coreFlow: "Enter Address → Analyze On-Chain Data → Detect Risks → Explain → Risk Report",
        sdgs: ["SDG 16 – Peace, Justice and Strong Institutions", "SDG 9 – Industry, Innovation and Infrastructure", "SDG 10 – Reduced Inequalities"]
      },
      {
        id: "ft-ps4",
        code: "PS4",
        title: "Mutual Fund Overlap & Portfolio X-Ray",
        description: "Investors may hold multiple mutual funds believing they are diversified, while several funds may contain many of the same companies or sectors. Build a portfolio analysis system that reveals hidden overlap and concentration across a user's mutual fund holdings.",
        whatWeNeed: [
          "Imports and parses a CAS statement or equivalent portfolio data.",
          "Identifies overlapping holdings across multiple mutual funds.",
          "Visualizes stock and sector concentration.",
          "Highlights factors such as high expense ratios and significant portfolio overlap.",
          "Generates an easy-to-understand portfolio X-ray showing where diversification may be limited.",
          "Provides data-driven simplification options without presenting them as personalized financial advice."
        ],
        coreFlow: "Import → Parse → Compare Holdings → Detect Overlap → Portfolio X-Ray",
        sdgs: ["SDG 8 – Decent Work and Economic Growth", "SDG 10 – Reduced Inequalities", "SDG 12 – Responsible Consumption and Production"]
      }
    ]
  },
  {
    id: "iot",
    number: "06",
    title: "INTERNET OF THINGS (IoT)",
    tagline: "Create connected, intelligent solutions using smart devices, sensors, and real-time data.",
    description: "Bridge the physical and digital divide through connected hardware, sensor telemetry, and real-time telemetry processing. Enable proactive automation and data-driven insights.",
    sdgs: [6, 7, 9, 12],
    accentColor: "#06B6D4",
    iconName: "Globe2",
    keyChallenges: [
      "Sub-$15 community groundwater contamination, pipeline leak, and water quality telemetry nodes",
      "Decentralized air quality index (AQI) mesh networks with hyper-local pollutant attribution",
      "Precision agriculture sensor arrays measuring real-time soil moisture and microclimate",
      "Industrial asset predictive maintenance with vibration FFT analysis on tiny microcontrollers"
    ],
    techPointers: ["MQTT / CoAP", "ESP32 / STM32", "Edge Impulse (TinyML)", "InfluxDB / Timescale", "WebSockets"],
    problemStatements: [
      {
        id: "iot-ps1",
        code: "PS1",
        title: "Wildfire & Forest Fire Early-Warning Mesh",
        description: "Forest fires in remote areas can spread rapidly before they are detected, while poor network connectivity makes conventional monitoring difficult. Build a low-power fire detection and communication system that identifies early signs of fire and relays alerts from remote locations to a central monitoring point.",
        whatWeNeed: [
          "Monitors temperature, smoke, and humidity to detect potential fires.",
          "Uses a low-power mesh network to relay alerts across remote areas.",
          "Filters false alarms using sensor data and contextual analysis.",
          "Displays detected fire-risk zones and alerts on a live map.",
          "Demonstrates reliable communication even when direct connectivity is unavailable."
        ],
        sdgs: ["SDG 15 – Life on Land", "SDG 13 – Climate Action", "SDG 9 – Industry, Innovation and Infrastructure"]
      },
      {
        id: "iot-ps2",
        code: "PS2",
        title: "Indoor Navigation Aid for the Visually Impaired",
        description: "GPS-based navigation is unreliable indoors, making it difficult for visually impaired people to independently navigate places such as hospitals, malls, and railway stations. Build an indoor navigation and obstacle-detection system that provides accessible guidance without relying on GPS.",
        whatWeNeed: [
          "Detects nearby obstacles and hazards.",
          "Determines the user's approximate indoor location using technologies such as BLE beacons or other positioning methods.",
          "Provides navigation through audio or haptic feedback.",
          "Guides users toward a selected destination.",
          "Demonstrates reliable navigation across a defined indoor environment."
        ],
        sdgs: ["SDG 10 – Reduced Inequalities", "SDG 11 – Sustainable Cities and Communities", "SDG 3 – Good Health and Well-Being"]
      },
      {
        id: "iot-ps3",
        code: "PS3",
        title: "AI-Powered Wildlife Monitoring & Threat Detection",
        description: "Large wildlife reserves are difficult to monitor continuously, making it challenging to track animals and detect unauthorized human activity. Build an AI-powered monitoring system that analyzes aerial or camera imagery to identify wildlife, humans, vehicles, and potential threats.",
        whatWeNeed: [
          "Detects animals, humans, vehicles, and other relevant objects.",
          "Identifies wildlife species where sufficient data is available.",
          "Flags potential threats such as unauthorized human activity or vehicles.",
          "Maps detected activity across monitored areas.",
          "Handles challenges such as varying lighting, terrain, and environmental conditions."
        ],
        sdgs: ["SDG 15 – Life on Land", "SDG 13 – Climate Action", "SDG 9 – Industry, Innovation and Infrastructure"]
      }
    ]
  },
  {
    id: "robotics-hardware",
    number: "07",
    title: "ROBOTICS & HARDWARE",
    tagline: "Design and develop innovative hardware systems, robotics applications, and tangible technological solutions.",
    description: "Construct physical computing machinery, autonomous robotic assistants, mechatronics, and custom silicon. Solve tough physical challenges through tangible hardware and robotics engineering.",
    sdgs: [3, 9, 11, 15],
    accentColor: "#EF4444",
    iconName: "Cpu",
    keyChallenges: [
      "Low-cost powered robotic prosthetics and assistive physical rehabilitation exoware",
      "Semi-autonomous search-and-rescue indoor rovers / drones for disaster localization",
      "Automated robotic sorting mechanisms and agricultural harvesting end-effectors",
      "Modular reconfigurable embedded computing boards for rapid edge hardware prototyping"
    ],
    techPointers: ["ROS 2", "OpenCV / Spatial Vision", "Embedded C++ / MicroPython", "Motor Drivers / Kinematics", "LiDAR Sensors"],
    problemStatements: [
      {
        id: "rh-ps1",
        code: "PS1",
        title: "Swarm Robots for Warehouse & Search-and-Rescue Simulation",
        description: "Large-scale tasks such as warehouse exploration and search-and-rescue can be inefficient when handled by a single robot, especially when failures or communication loss occur. Build a multi-robot coordination system where a group of robots autonomously divides tasks and adapts when conditions change.",
        whatWeNeed: [
          "Divides a map into tasks and allocates them among multiple robots.",
          "Enables robots to navigate while avoiding collisions.",
          "Handles communication loss and robot failures.",
          "Dynamically reassigns unfinished tasks when a robot becomes unavailable.",
          "Demonstrates decentralized coordination through physical robots or a ROS/Gazebo simulation."
        ],
        sdgs: ["SDG 9 – Industry, Innovation and Infrastructure", "SDG 11 – Sustainable Cities and Communities"]
      },
      {
        id: "rh-ps2",
        code: "PS2",
        title: "Computer-Vision Sorting System for Waste & Produce",
        description: "Manual sorting of waste, agricultural produce, and components can be slow, inconsistent, and difficult to scale. Build a computer-vision-based automated sorting system that identifies objects and directs them to the appropriate category.",
        whatWeNeed: [
          "Uses a camera and lightweight vision model to classify objects.",
          "Handles real-world variations such as lighting and object orientation.",
          "Automatically directs items to the correct category using a servo, robotic arm, or simulated mechanism.",
          "Demonstrates real-time or near-real-time classification and sorting.",
          "Measures classification accuracy and sorting throughput."
        ],
        sdgs: ["SDG 12 – Responsible Consumption and Production", "SDG 9 – Industry, Innovation and Infrastructure", "SDG 11 – Sustainable Cities and Communities"]
      },
      {
        id: "rh-ps3",
        code: "PS3",
        title: "Autonomous Edge Robotics & Sensor Mesh Hardware",
        description: "Hardware integration across edge compute units, sensor nodes, and robotic actuators often bottlenecks field deployments. Build a modular hardware platform combining rapid telemetry processing, fail-safe motor drive control, and autonomous edge responsiveness.",
        whatWeNeed: [
          "Integrates motor drivers, microcontrollers (ESP32/STM32), and edge vision sensors.",
          "Ensures fail-safe state machines and watchdogs for loss-of-signal scenarios.",
          "Demonstrates real-time actuator feedback and battery telemetry monitoring.",
          "Provides physical or simulated hardware prototype verification."
        ],
        sdgs: ["SDG 9 – Industry, Innovation and Infrastructure", "SDG 11 – Sustainable Cities and Communities", "SDG 3 – Good Health and Well-Being"]
      }
    ]
  }
];
