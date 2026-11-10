/**
 * INFINITY – The Multiverse Nexus Data Configuration
 * Comprehensive data for all 5 Dimensional Realms:
 * 1. AI — Intelligence Realm (Violet: #8B5CF6)
 * 2. Cybersecurity — Shadow Realm (Crimson: #FF0055)
 * 3. Web Development — Creation Realm (Cyan: #00E5FF)
 * 4. Robotics — Physical Realm (Orange: #FF6B00)
 * 5. Cloud Computing — Infinite Realm (Electric Blue: #00B0FF)
 */

export const UNIVERSES = {
  ai: {
    id: "ai",
    name: "AI & NEURAL ARCHITECTURE",
    realmTitle: "THE INTELLIGENCE REALM",
    codename: "REALM-01 // SYNAPSE",
    tagline: "Synthetic Cognition & Autonomous Algorithmic Frontiers",
    motto: "Thinking beyond biological limits.",
    color: "#8B5CF6",
    secondaryColor: "#C084FC",
    accentName: "violet",
    bgGradient: "radial-gradient(ellipse at 50% 20%, rgba(139, 92, 246, 0.25) 0%, rgba(12, 10, 28, 0.95) 60%, #070711 100%)",
    glowColor: "rgba(139, 92, 246, 0.6)",
    borderColor: "border-[#8B5CF6]/40",
    stats: [
      { label: "NEURAL MODELS TRAINED", value: "28+" },
      { label: "GENAI WORKSHOPS", value: "14" },
      { label: "ACTIVE RESEARCHERS", value: "85+" },
      { label: "HACKATHON WINS", value: "9" }
    ],
    overview: {
      philosophy: "The Intelligence Realm exists at the boundary of machine perception and autonomous agency. We deconstruct foundational large language models, train computer vision networks, and engineer generative agents capable of human-level reasoning.",
      focusAreas: [
        "LLM Prompt Engineering & Context-Aware RAG Pipelines",
        "Deep Neural Networks & Transformer Mechanics",
        "Agentic Autonomous Workflows & Tool Invocation",
        "Computer Vision & Multimodal Perception"
      ],
      technologies: ["PyTorch", "TensorFlow", "Hugging Face", "LangChain", "OpenCV", "Ollama", "Gemini API"]
    },
    projects: [
      {
        id: "neural-sggscc",
        title: "AegisGPT: College Knowledge Agent",
        status: "DEPLOYED // CAMPUS",
        tag: "RAG & LLM",
        description: "An open-source intelligent assistant trained on SGGSCC academic syllabi, college notices, and student FAQs with real-time semantic search.",
        techStack: ["React", "FastAPI", "ChromaDB", "Gemini Pro"],
        metrics: "2,500+ Student Queries Processed"
      },
      {
        id: "vision-sentinel",
        title: "SpectraVision: Real-Time Edge Vision",
        status: "PROTOTYPE // BETA",
        tag: "Computer Vision",
        description: "Low-latency object tracking and anomaly detection engine running entirely on consumer edge devices with WebAssembly.",
        techStack: ["Python", "YOLOv8", "TensorRT", "WebAssembly"],
        metrics: "60 FPS on Edge Hardware"
      },
      {
        id: "algorithmic-alpha",
        title: "NeuroTrader: Predictive Signals",
        status: "RESEARCH LAB",
        tag: "Deep Learning",
        description: "Recurrent neural network analyzing high-frequency order books and algorithmic sentiment trends across modern financial exchanges.",
        techStack: ["PyTorch", "Pandas", "CUDA", "FastAPI"],
        metrics: "78.4% Directional Accuracy"
      }
    ],
    curriculum: [
      {
        level: "CYCLE 01 // FOUNDATIONS",
        title: "Mathematical Foundations & Python Mastery",
        topics: ["Linear algebra & calculus intuition", "NumPy & Pandas for tensor manipulation", "Exploratory data analysis & statistical modeling"]
      },
      {
        level: "CYCLE 02 // DEEP LEARNING",
        title: "Neural Networks & Backpropagation",
        topics: ["Perceptrons to multilayer networks", "Convolutional networks & vision", "PyTorch architecture design from scratch"]
      },
      {
        level: "CYCLE 03 // GENERATIVE AI",
        title: "Transformers, LLMs & Agentic Systems",
        topics: ["Attention mechanisms & positional encoding", "Prompt engineering & function calling", "Autonomous multi-agent orchestration"]
      }
    ],
    missions: [
      {
        id: "m-prompt-workshop",
        title: "Prompt Engineering & GenAI Masterclass",
        type: "Historical Milestone",
        date: "Academic Session 2025–26",
        badge: "VERIFIED EVENT",
        venue: "Computer Labs, SGGSCC",
        description: "Hands-on masterclass teaching students few-shot prompt construction, chain-of-thought logic, and building functional AI wrappers.",
        metric: "45+ Mini-apps Built"
      },
      {
        id: "m-ai-hack",
        title: "Synapse 48-Hour AI Hackathon",
        type: "Upcoming Mission",
        date: "March 2027 (Demonstration Preview)",
        badge: "FLAGSHIP",
        venue: "Hybrid // SGGSCC Campus",
        description: "Inter-collegiate sprint challenging student teams to architect generative AI applications solving urban and educational challenges.",
        metric: "₹40,000 Prize Pool"
      }
    ],
    commanders: [
      {
        name: "Kulsehaj Singh",
        role: "President & AI Strategy Lead",
        session: "2025–26",
        image: "/assets/images/team/kulsehaj-singh.jpg",
        bio: "Driving institutional tech strategy, generative AI masterclasses, and inter-college hackathon culture.",
        linkedin: "https://www.linkedin.com/in/kulsehajsingh/"
      },
      {
        name: "Advay Nagpal",
        role: "Vice-President & Tech Architect",
        session: "2025–26",
        image: "/assets/images/team/advay-nagpal.jpg",
        bio: "Specializing in software infrastructure, algorithmic workflows, and team hackathon mentorship.",
        linkedin: "https://www.linkedin.com/in/advay-nagpal-778271333/"
      }
    ]
  },

  cybersecurity: {
    id: "cybersecurity",
    name: "CYBER DEFENSE & INTEL",
    realmTitle: "THE SHADOW REALM",
    codename: "REALM-02 // CIPHER",
    tagline: "Offensive Security, Cryptography & Red Team Operations",
    motto: "In a world of constant surveillance, privacy is power.",
    color: "#FF0055",
    secondaryColor: "#FF4D88",
    accentName: "crimson",
    bgGradient: "radial-gradient(ellipse at 50% 20%, rgba(255, 0, 85, 0.25) 0%, rgba(26, 8, 14, 0.95) 60%, #070711 100%)",
    glowColor: "rgba(255, 0, 85, 0.6)",
    borderColor: "border-[#FF0055]/40",
    stats: [
      { label: "CTF TEAMS RANKED", value: "Top 5% DU" },
      { label: "ATTENDEES REACHED", value: "100+ Verified" },
      { label: "EXPLOITS AUDITED", value: "45+" },
      { label: "SECURITY CLINICS", value: "8" }
    ],
    overview: {
      philosophy: "The Shadow Realm trains modern ethical hackers to think like adversaries to build impenetrable defenses. From binary exploitation and memory corruption to OSINT forensics and web app penetration, we guard the digital perimeter.",
      focusAreas: [
        "Web Application Exploitation (OWASP Top 10)",
        "Binary Reverse Engineering & Buffer Overflows",
        "Cryptographic Implementations & Zero-Knowledge Proofs",
        "Network Defense, Traffic Analysis & Digital Forensics"
      ],
      technologies: ["Burp Suite", "Wireshark", "Ghidra", "Metasploit", "Kali Linux", "Docker", "Python Scapy"]
    },
    projects: [
      {
        id: "vuln-scanner",
        title: "ShadowScan: Automated Recon Engine",
        status: "DEPLOYED // INTERNAL",
        tag: "Recon & OSINT",
        description: "An asynchronous scanning framework that audits subdomains, exposed S3 buckets, and SSL cipher suites for vulnerability flags.",
        techStack: ["Go", "Python", "Nmap Engine", "Docker"],
        metrics: "Scans 1,000 Endpoints in < 60s"
      },
      {
        id: "ctf-portal",
        title: "AegisCTF: Wargame Arena",
        status: "LIVE SANDBOX",
        tag: "Cyber Wargames",
        description: "A custom collegiate Jeopardy-style Capture The Flag platform hosting cryptography, web exploitation, and steganography challenges.",
        techStack: ["React", "Node.js", "Redis", "Isolated Sandboxes"],
        metrics: "30+ Challenges Hosted"
      },
      {
        id: "traffic-sentinel",
        title: "PacketVoid: Network IDS",
        status: "PROTOTYPE",
        tag: "Defensive Security",
        description: "Lightweight intrusion detection tool flagging ARP spoofing, SYN flood attempts, and DNS exfiltration anomalies in real time.",
        techStack: ["Rust", "libpcap", "InfluxDB", "Grafana"],
        metrics: "Zero Packet Drop at 1 Gbps"
      }
    ],
    curriculum: [
      {
        level: "CYCLE 01 // RECON & LINUX",
        title: "Linux Internals, Networking & Reconnaissance",
        topics: ["TCP/IP handshakes, routing & packet dissection", "Bash scripting & command line dominance", "OSINT discovery techniques & Google dorking"]
      },
      {
        level: "CYCLE 02 // WEB DEFENSE",
        title: "Web Security & OWASP Domination",
        topics: ["SQL injection, XSS, CSRF & SSRF exploits", "Session hijacking & JWT cryptographic flaws", "Burp Suite automated & manual testing"]
      },
      {
        level: "CYCLE 03 // EXPLOITATION",
        title: "Binary Reversing & Defensive Cryptography",
        topics: ["x86 assembly & stack frame dissection", "Ghidra decompiler workflows & binary patching", "Public key cryptography & zero-knowledge intuition"]
      }
    ],
    missions: [
      {
        id: "m-cyber-summit",
        title: "Annual Cybersecurity Awareness Summit",
        type: "Historical Milestone",
        date: "8 October 2025",
        badge: "VERIFIED: 100+ ATTENDEES",
        venue: "Seminar Hall, SGGSCC Campus",
        description: "Milestone campus security event with live demonstration of social engineering vectors, 2FA bypass prevention, and digital hygiene practices.",
        metric: "100+ Active Attendees"
      },
      {
        id: "m-ctf-tourney",
        title: "Zero-Day Invitational CTF",
        type: "Upcoming Mission",
        date: "April 2027 (Demonstration Preview)",
        badge: "COMPETITIVE CTF",
        venue: "Virtual Arena // Discord War Room",
        description: "Inter-college capture-the-flag wargame featuring 20+ jeopardy challenges across cryptography, web, and reverse engineering.",
        metric: "Top 3 Podium Awards"
      }
    ],
    commanders: [
      {
        name: "Harshmohan Singh",
        role: "General Secretary & Cyber Operations",
        session: "2025–26",
        image: "/assets/images/team/harshmohan-singh.jpg",
        bio: "Specializing in network penetration testing, digital privacy clinics, and competitive CTF coordination.",
        linkedin: "https://www.linkedin.com/in/harshmohansingh/"
      },
      {
        name: "Prabhleen Kaur",
        role: "Advisory Council & Security Strategist",
        session: "2025–26",
        image: "/assets/images/team/prabhleen-kaur.jpg",
        bio: "Providing strategic guidance on student technical initiatives, inter-society liaisons, and cyber workshops.",
        linkedin: "https://www.linkedin.com/in/prabhleenkaur/"
      }
    ]
  },

  webdev: {
    id: "webdev",
    name: "FULL-STACK MATRIX & CLOUD",
    realmTitle: "THE CREATION REALM",
    codename: "REALM-03 // MATRIX",
    tagline: "Hyper-Optimized Architecture, Distributed Systems & Modern Web Interfaces",
    motto: "We do not simply visit the web; we architect its next dimension.",
    color: "#00E5FF",
    secondaryColor: "#38EEFF",
    accentName: "cyan",
    bgGradient: "radial-gradient(ellipse at 50% 20%, rgba(0, 229, 255, 0.25) 0%, rgba(7, 24, 30, 0.95) 60%, #070711 100%)",
    glowColor: "rgba(0, 229, 255, 0.6)",
    borderColor: "border-[#00E5FF]/40",
    stats: [
      { label: "PRODUCTION APPS", value: "18+" },
      { label: "GITHUB STARS", value: "340+" },
      { label: "MEMBERS ENROLLED", value: "120+" },
      { label: "CODE SPRINTS", value: "24" }
    ],
    overview: {
      philosophy: "The Creation Realm translates abstract ideas into blazing-fast, accessible, and reactive digital realities. We build everything from serverless microservices and WebGL experiences to resilient enterprise cloud architectures.",
      focusAreas: [
        "Modern Component Frameworks (React, Next.js, Vite)",
        "Interactive 3D Web & Creative Coding (Three.js, GSAP, WebGL)",
        "Scalable Backends & APIs (Node.js, Go, GraphQL, PostgreSQL)",
        "Performance Tuning, Lighthouse 100 & Edge Caching"
      ],
      technologies: ["React", "Next.js", "Three.js", "Tailwind CSS", "TypeScript", "Node.js", "PostgreSQL", "Docker"]
    },
    projects: [
      {
        id: "infinity-nexus",
        title: "PORTAL NEXUS 3D: Multiverse System",
        status: "LIVE PRODUCTION",
        tag: "Three.js & WebGL",
        description: "The official interactive dimensional portal platform for INFINITY featuring 3D particle physics, custom shaders, and GSAP warp cinematics.",
        techStack: ["React 18", "Three.js", "R3F", "Tailwind CSS", "GSAP"],
        metrics: "60 FPS 3D Multiverse"
      },
      {
        id: "campus-flow",
        title: "CampusSync: Student Schedule Matrix",
        status: "DEPLOYED // BETA",
        tag: "Full-Stack App",
        description: "Real-time timetable synchronization, society event notifications, and digital hall passes for SGGSCC students.",
        techStack: ["Next.js", "Tailwind", "Supabase", "TypeScript"],
        metrics: "800+ Active Student Users"
      },
      {
        id: "pulse-analytics",
        title: "EdgeTelemetry: Web Vitals Monitor",
        status: "OPEN SOURCE",
        tag: "DevTools",
        description: "Lightweight open-source analytics daemon tracking FID, INP, and real user interactions without tracking personal cookies.",
        techStack: ["Go", "React", "ClickHouse", "WebSockets"],
        metrics: "< 1KB Script Footprint"
      }
    ],
    curriculum: [
      {
        level: "CYCLE 01 // FRONTEND MASTERY",
        title: "Modern JavaScript, React & Responsive CSS",
        topics: ["ES6+, functional programming & asynchronous JS", "React hooks, state management & component lifecycle", "Tailwind CSS & responsive layout engineering"]
      },
      {
        level: "CYCLE 02 // FULL-STACK ARCHITECTURE",
        title: "Databases, Serverless & REST/GraphQL APIs",
        topics: ["Node.js, Express & asynchronous IO backends", "Relational SQL (Postgres) vs NoSQL modeling", "Authentication (OAuth2, Session Tokens & JWT)"]
      },
      {
        level: "CYCLE 03 // 3D & PERFORMANCE",
        title: "Creative Coding & Edge Deployment",
        topics: ["Three.js coordinate spaces, meshes & materials", "GSAP timelines, scroll-triggers & micro-interactions", "Docker containerization & CI/CD pipeline automation"]
      }
    ],
    missions: [
      {
        id: "m-linkedin-masterclass",
        title: "LinkedIn Optimization & Tech Portfolio Masterclass",
        type: "Historical Milestone",
        date: "6 February 2026",
        badge: "VERIFIED SESSION",
        venue: "Virtual Keynote // Google Meet",
        description: "Strategic session guiding 100+ students on packaging technical web portfolios, open-source commits, and personal branding.",
        metric: "100+ Students Attended"
      },
      {
        id: "m-web-hack",
        title: "MatrixJam: 36-Hour Frontend Challenge",
        type: "Upcoming Mission",
        date: "May 2027 (Demonstration Preview)",
        badge: "INNOVATION SPRINT",
        venue: "Online // GitHub Classroom",
        description: "Sprint to design and build stunning, high-performance web experiences pushing the boundaries of creative UI/UX.",
        metric: "Cash Awards & Swag"
      }
    ],
    commanders: [
      {
        name: "Harnoor Kaur",
        role: "Joint Secretary & Frontend Lead",
        session: "2025–26",
        image: "/assets/images/team/harnoor-kaur.jpg",
        bio: "Directing web initiatives, creative frontend design systems, and student hackathon teams.",
        linkedin: "https://www.linkedin.com/in/harnoorkaur/"
      },
      {
        name: "Ruhani Layal",
        role: "Technical Lead & System Architect",
        session: "2025–26",
        image: "/assets/images/ruhani-layal.jpg",
        bio: "Specializing in full-stack architecture, WebGL creative engineering, and high-performance React applications.",
        linkedin: "https://www.linkedin.com/in/ruhani-layal/"
      }
    ]
  },

  robotics: {
    id: "robotics",
    name: "ROBOTICS & EMBEDDED REALM",
    realmTitle: "THE PHYSICAL REALM",
    codename: "REALM-04 // KINETIC",
    tagline: "Mechatronics, Autonomous Drones & IoT Hardware Systems",
    motto: "Transcending cyberspace to command the physical world.",
    color: "#FF6B00",
    secondaryColor: "#FFA040",
    accentName: "orange",
    bgGradient: "radial-gradient(ellipse at 50% 20%, rgba(255, 107, 0, 0.25) 0%, rgba(30, 16, 5, 0.95) 60%, #070711 100%)",
    glowColor: "rgba(255, 107, 0, 0.6)",
    borderColor: "border-[#FF6B00]/40",
    stats: [
      { label: "HARDWARE PROTOTYPES", value: "12+" },
      { label: "BOTS CONSTRUCTED", value: "8" },
      { label: "MAKER LAB SESSIONS", value: "16" },
      { label: "SENSORS TESTED", value: "150+" }
    ],
    overview: {
      philosophy: "The Physical Realm bridges logic and physical matter. We build autonomous obstacle-navigating rovers, IoT sensor telemetry networks, and robotic manipulators designed to solve physical-world automation hurdles.",
      focusAreas: [
        "Microcontroller Architecture (ESP32, Arduino, Raspberry Pi)",
        "Kinematics, Servo Feedback Loops & Motor Control",
        "Sensor Fusion (LiDAR, Ultrasonic, IMU Accelerometers)",
        "Robot Operating System (ROS 2) & Autonomous Pathing"
      ],
      technologies: ["C++", "Python", "ROS 2", "ESP-IDF", "FreeRTOS", "Fusion 360", "KiCad"]
    },
    projects: [
      {
        id: "rover-alpha",
        title: "AegisRover: Autonomous Terrain Bot",
        status: "PHYSICAL LAB // BUILT",
        tag: "Autonomous Robotics",
        description: "A 4-wheel differential-drive rover utilizing ultrasonic sensor arrays and computer vision for real-time corridor navigation.",
        techStack: ["ESP32", "C++", "OpenCV", "ROS 2"],
        metrics: "Autonomous Obstacle Avoidance"
      },
      {
        id: "campus-weather",
        title: "AeroTelemetry: Micro-Weather Station",
        status: "LIVE SENSORS",
        tag: "IoT & Telemetry",
        description: "Solar-powered IoT sensor array installed at college capturing temperature, humidity, AQI, and transmitting via LoRaWAN.",
        techStack: ["Arduino", "LoRaWAN", "MQTT", "Grafana"],
        metrics: "5km Wireless Transmission"
      },
      {
        id: "robotic-arm",
        title: "KineticGrip: 4-DOF Robotic Arm",
        status: "PROTOTYPE",
        tag: "Mechatronics",
        description: "3D-printed 4-axis manipulator with inverse kinematics calculations for precision pick-and-place student tasks.",
        techStack: ["Fusion 360", "PCA9685", "Python", "Kinematics"],
        metrics: "0.5mm Repeatability"
      }
    ],
    curriculum: [
      {
        level: "CYCLE 01 // CIRCUIT ARCHITECTURE",
        title: "Electronics, Microcontrollers & Embedded C",
        topics: ["Ohm's Law, PCB schematics & breadboard prototyping", "GPIO interrupts, PWM timers & ADC converters", "Embedded C/C++ firmware programming"]
      },
      {
        level: "CYCLE 02 // SENSOR INTEGRATION",
        title: "Sensor Fusion, Motor Drivers & Actuation",
        topics: ["H-Bridge motor drivers & PID control loops", "I2C, SPI & UART communication protocols", "IMU stabilization & Kalman filtering intuition"]
      },
      {
        level: "CYCLE 03 // AUTONOMOUS KINETICS",
        title: "ROS 2, Computer Vision & Navigation",
        topics: ["ROS 2 nodes, publishers, subscribers & services", "Visual odometry & SLAM spatial mapping", "Deploying lightweight vision on Raspberry Pi"]
      }
    ],
    missions: [
      {
        id: "m-maker-drive",
        title: "Hands-on Microcontroller & IoT Bootcamp",
        type: "Historical Milestone",
        date: "Academic Year 2025–26",
        badge: "HARDWARE WORKSHOP",
        venue: "Physics & Electronics Labs, SGGSCC",
        description: "Interactive hardware assembly session where students wired and programmed their first obstacle-detecting robot chassis.",
        metric: "18 Hardware Kits Deployed"
      },
      {
        id: "m-robowars",
        title: "MechaShowdown: Tactical Bot Arena",
        type: "Upcoming Mission",
        date: "September 2027 (Demonstration Preview)",
        badge: "ROBOTICS BATTLE",
        venue: "College Amphitheatre, SGGSCC",
        description: "High-octane collegiate combat and line-follower challenge bringing engineering teams from across Delhi University.",
        metric: "Custom Trophy & Cash Grants"
      }
    ],
    commanders: [
      {
        name: "Advay Nagpal",
        role: "VP & Hardware Operations Lead",
        session: "2025–26",
        image: "/assets/images/team/advay-nagpal.jpg",
        bio: "Guiding embedded systems prototyping, hardware event planning, and robotics lab inventory.",
        linkedin: "https://www.linkedin.com/in/advay-nagpal-778271333/"
      },
      {
        name: "Kulsehaj Singh",
        role: "President & Project Sponsor",
        session: "2025–26",
        image: "/assets/images/team/kulsehaj-singh.jpg",
        bio: "Championing maker grants, laboratory equipment upgrades, and inter-collegiate technical fairs.",
        linkedin: "https://www.linkedin.com/in/kulsehajsingh/"
      }
    ]
  },

  cloud: {
    id: "cloud",
    name: "CLOUD COMPUTING & DEVOPS",
    realmTitle: "THE INFINITE REALM",
    codename: "REALM-05 // NEXUS-CORE",
    tagline: "Hyper-Scale Infrastructure, Kubernetes Orchestration & Zero-Downtime Resilience",
    motto: "Unlimited scale across the infinite digital cosmos.",
    color: "#00B0FF",
    secondaryColor: "#40C4FF",
    accentName: "electricBlue",
    bgGradient: "radial-gradient(ellipse at 50% 20%, rgba(0, 176, 255, 0.25) 0%, rgba(5, 18, 32, 0.95) 60%, #070711 100%)",
    glowColor: "rgba(0, 176, 255, 0.6)",
    borderColor: "border-[#00B0FF]/40",
    stats: [
      { label: "SYSTEM UPTIME", value: "99.99%" },
      { label: "CLUSTERS DEPLOYED", value: "14" },
      { label: "CONTAINERS MANAGED", value: "350+" },
      { label: "GLOBAL EDGE POPS", value: "24" }
    ],
    overview: {
      philosophy: "The Infinite Realm architects the unseen machinery powering the modern global internet. We build resilient container orchestration meshes, automated CI/CD pipelines, and multi-region cloud backbones engineered to withstand massive spikes.",
      focusAreas: [
        "Containerization & Microservices (Docker, Podman)",
        "Kubernetes Cluster Orchestration & Helm Charts",
        "Infrastructure as Code (Terraform, Ansible)",
        "Site Reliability Engineering (SRE), Metrics & Observability"
      ],
      technologies: ["Kubernetes", "Docker", "Terraform", "AWS", "Google Cloud", "Prometheus", "Grafana", "Linux"]
    },
    projects: [
      {
        id: "kube-infinity",
        title: "OmniCluster: Collegiate K8s Mesh",
        status: "LIVE PRODUCTION",
        tag: "Kubernetes Cluster",
        description: "A multi-node lightweight K3s cluster hosting student society web apps, discord bots, and hackathon judge platforms.",
        techStack: ["K3s", "Traefik", "Cert-Manager", "Prometheus"],
        metrics: "99.98% High Availability"
      },
      {
        id: "infra-code",
        title: "TerraBase: Cloud Genesis Module",
        status: "OPEN SOURCE",
        tag: "IaC Terraform",
        description: "Reusable Infrastructure-as-Code blueprints to spin up production-ready VPCs, secure subnets, and load balancers on AWS and GCP.",
        techStack: ["Terraform", "AWS ECS", "GCP Cloud Run"],
        metrics: "Deploys in Under 3 Minutes"
      },
      {
        id: "sre-radar",
        title: "SentinelEye: SRE Health Matrix",
        status: "DEPLOYED",
        tag: "Observability",
        description: "Real-time anomaly detection monitor scraping CPU, memory saturation, and error budgets across all society infrastructure.",
        techStack: ["Prometheus", "Grafana", "Loki", "Alertmanager"],
        metrics: "Alert Latency < 1.2s"
      }
    ],
    curriculum: [
      {
        level: "CYCLE 01 // CONTAINERS & LINUX",
        title: "Linux System Administration & Docker",
        topics: ["Kernel cgroups, namespaces & storage overlays", "Docker image optimization & multi-stage builds", "Docker Compose microservice networking"]
      },
      {
        level: "CYCLE 02 // CLOUD & IAC",
        title: "Cloud Providers & Infrastructure as Code",
        topics: ["AWS & Google Cloud core architecture (VPC, IAM, S3)", "Declarative cloud provisioning with Terraform", "Secrets management & cloud security hardening"]
      },
      {
        level: "CYCLE 03 // ORCHESTRATION & SRE",
        title: "Kubernetes, CI/CD & Observability",
        topics: ["Kubernetes Pods, Deployments, Services & Ingress", "GitHub Actions automated CI/CD deployment pipelines", "Prometheus metrics collection & Grafana dashboards"]
      }
    ],
    missions: [
      {
        id: "m-community-outreach",
        title: "Community Digital Outreach Drive",
        type: "Historical Milestone",
        date: "Academic Year 2025–26",
        badge: "VERIFIED: 200+ STUDENTS",
        venue: "Community Learning Center & Hybrid Session",
        description: "Grassroots digital literacy drive teaching school students digital safety, cloud internet fundamentals, and coding basics.",
        metric: "200+ Students Reached"
      },
      {
        id: "m-devops-summit",
        title: "CloudForge: Microservices & Docker Bootcamp",
        type: "Upcoming Mission",
        date: "October 2027 (Demonstration Preview)",
        badge: "DEVOPS BOOTCAMP",
        venue: "Computer Labs, SGGSCC",
        description: "Hands-on workshop provisioning cloud servers, configuring reverse proxies, and deploying real-world microservices.",
        metric: "Free Cloud Credits Provided"
      }
    ],
    commanders: [
      {
        name: "Kulsehaj Singh",
        role: "President & Cloud Architecture",
        session: "2025–26",
        image: "/assets/images/team/kulsehaj-singh.jpg",
        bio: "Championing student cloud credits, modern DevOps workshops, and high-availability society portals.",
        linkedin: "https://www.linkedin.com/in/kulsehajsingh/"
      },
      {
        name: "Harshmohan Singh",
        role: "General Secretary & Infrastructure",
        session: "2025–26",
        image: "/assets/images/team/harshmohan-singh.jpg",
        bio: "Managing server deployments, domain registrations, and reliable socket connections for live events.",
        linkedin: "https://www.linkedin.com/in/harshmohansingh/"
      }
    ]
  }
};

export const REALM_KEYS = ['ai', 'cybersecurity', 'webdev', 'robotics', 'cloud'];
