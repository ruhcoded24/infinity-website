/**
 * INFINITY – The Tech Society, SGGSCC (University of Delhi)
 * Master Data Store & Content Configuration
 * 
 * Verified historical facts:
 * - College: Sri Guru Gobind Singh College of Commerce (Opposite TV Tower, Pitampura, Delhi - 110034)
 * - 2025–26 Office Bearers: Kulsehaj Singh (President), Advay Nagpal (VP), Harshmohan Singh (General Sec),
 *   Harnoor Kaur (Joint Sec), Prabhleen Kaur (Advisory)
 * - Key historical events: BGMI Showdown 2.0 (30 teams), Cybersecurity Awareness Event - 8 Oct 2025 (100+ participants),
 *   Community Outreach Drive (200+ students reached), LinkedIn Optimization Webinar - 6 Feb 2026, Prompt Engineering Workshop.
 */

export const SOCIETY_INFO = {
  name: "INFINITY",
  fullName: "INFINITY – The Tech Society, SGGSCC",
  institution: "Sri Guru Gobind Singh College of Commerce, University of Delhi",
  tagline: "BEYOND THE LIMITS.",
  subtagline: "An ecosystem of curious minds, bold ideas and limitless technological possibilities.",
  brandPhilosophy: "Technology has no boundaries. Learning has no limits. Ideas can become infinite possibilities.",
  alternativeTagline: "Where Curiosity Meets Innovation.",
  collegeAddress: "Opposite TV Tower, Pitampura, Delhi – 110034, India",
  collegePhone: "011-20871260 / 20871262",
  collegeEmail: "principaloffice@sggscc.du.ac.in",
  societyEmail: "infinity.sggscc@gmail.com", // Editable society contact
  recruitmentCoordinator: "Kulsehaj Singh (President) & Advay Nagpal (VP)",
  socials: {
    linkedin: "https://www.linkedin.com/company/infinitysggscc",
    instagram: "https://www.instagram.com/infinity.sggscc/",
    college: "https://www.sggscc.ac.in/"
  },
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.988225026601!2d77.13689447631333!3d28.68999997563462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03b749d03d3d%3A0x8cfbc0f6904bb7b5!2sSri%20Guru%20Gobind%20Singh%20College%20of%20Commerce!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  directionsUrl: "https://maps.google.com/?q=Sri+Guru+Gobind+Singh+College+of+Commerce+Pitampura+Delhi"
};

export const DOMAINS = [
  {
    id: "ai-innovation",
    title: "AI & Innovation",
    tagline: "Pushing the frontiers of machine intelligence and creative computation.",
    shortDesc: "Artificial intelligence, prompt engineering, emerging technologies and experimentation.",
    color: "from-purple-500 to-indigo-600",
    glowColor: "rgba(168, 85, 247, 0.4)",
    borderColor: "border-purple-500/30 hover:border-purple-500",
    accent: "#a855f7",
    icon: "Cpu",
    curriculum: [
      "Generative AI & LLM Prompt Architecture",
      "Neural Networks & Deep Learning Foundations",
      "Computer Vision & Agentic Automation",
      "AI Hackathon Incubation & Prototype Labs"
    ],
    sampleActivities: [
      "Hands-on Prompt Engineering Masterclass",
      "AI Hackdays & Autonomous Agents Showcase",
      "Ethics in Artificial Intelligence Roundtables"
    ]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    tagline: "Securing digital frontiers through defensive intelligence.",
    shortDesc: "Digital safety, cybersecurity awareness and responsible technology usage.",
    color: "from-cyan-500 to-blue-600",
    glowColor: "rgba(6, 182, 212, 0.4)",
    borderColor: "border-cyan-500/30 hover:border-cyan-500",
    accent: "#06b6d4",
    icon: "ShieldAlert",
    curriculum: [
      "Network Penetration & Vulnerability Assessment",
      "Web Security (OWASP Top 10)",
      "Digital Forensics & OSINT Reconnaissance",
      "Ethical Hacking & Secure Code Review"
    ],
    sampleActivities: [
      "Annual SGGSCC Cybersecurity Awareness Summit (Verified 100+ attendees)",
      "Capture The Flag (CTF) Simulated Cyber Defence Challenge",
      "Personal Privacy & Device Hardening Clinics"
    ]
  },
  {
    id: "gaming-esports",
    title: "Gaming & Esports",
    tagline: "Tactical mastery, competitive tournaments, and game architecture.",
    shortDesc: "Gaming tournaments, competitive gaming and strategic sportsmanship.",
    color: "from-pink-500 to-rose-600",
    glowColor: "rgba(244, 63, 94, 0.4)",
    borderColor: "border-pink-500/30 hover:border-pink-500",
    accent: "#f43f5e",
    icon: "Gamepad2",
    curriculum: [
      "Esports Tournament Management & Broadcast Production",
      "Tactical Strategy & Squad Coordination in Battle Royale",
      "Game Design Foundations (Unity / Unreal)",
      "Streaming, Casting & Audience Engagement"
    ],
    sampleActivities: [
      "BGMI Showdown 2.0 (Verified flagship: 30 competing squads)",
      "Valorant Intra-College Tactical Invitational",
      "Esports Industry & Career Ecosystem Talks"
    ]
  },
  {
    id: "creativity-design",
    title: "Creativity & Design",
    tagline: "Visual storytelling, futuristic UI/UX, and digital brandcraft.",
    shortDesc: "Graphic design, digital creativity and visual communication.",
    color: "from-violet-500 to-fuchsia-600",
    glowColor: "rgba(192, 132, 252, 0.4)",
    borderColor: "border-violet-500/30 hover:border-violet-500",
    accent: "#c084fc",
    icon: "Palette",
    curriculum: [
      "UI/UX Design Systems & Figma Prototyping",
      "Brand Identity, Typography & Visual Rhythm",
      "3D Modeling, Blender Motion Graphics & Generative Art",
      "Design Critique & Human-Centered Interaction"
    ],
    sampleActivities: [
      "Design-A-Thon: Redesigning Everyday Campus Tech",
      "Brand Identity Showcase for Tech Startups",
      "Motion Graphics & Cyberpunk Visuals Workshop"
    ]
  },
  {
    id: "community-growth",
    title: "Community & Professional Growth",
    tagline: "Empowering careers, fostering digital literacy, and bridging opportunities.",
    shortDesc: "Outreach initiatives, digital literacy, networking and professional development.",
    color: "from-emerald-500 to-teal-600",
    glowColor: "rgba(16, 185, 129, 0.4)",
    borderColor: "border-emerald-500/30 hover:border-emerald-500",
    accent: "#10b981",
    icon: "Users",
    curriculum: [
      "LinkedIn Profile Optimization & Personal Branding",
      "Resume Engineering & Tech Interview Preparation",
      "Social Impact Initiatives & Digital Literacy Drives",
      "Alumni Mentorship Networks & Industry Roundtables"
    ],
    sampleActivities: [
      "Community Outreach Drive (Verified: 200+ students reached)",
      "LinkedIn Optimization Webinar (Verified: 6 Feb 2026)",
      "Tech Career Roadmap & Portfolio Review Series"
    ]
  }
];

export const EVENTS = [
  {
    id: "evt-bgmi-showdown-2",
    title: "BGMI Showdown 2.0",
    type: "past",
    category: "gaming",
    categoryLabel: "Gaming & Esports",
    date: "Verified Historical Event",
    displayDate: "Academic Session 2025–26",
    venue: "Online Esports Arena (Live Streamed)",
    tag: "Flagship Tournament",
    status: "Completed",
    isVerified: true,
    verifiedMetric: "30 Competing Squads",
    shortDesc: "The high-voltage collegiate mobile esports championship bringing together 30 competitive squads in intense strategic combat.",
    longDesc: "BGMI Showdown 2.0 was INFINITY's flagship collegiate gaming championship. Over 30 teams registered and battled through grueling qualifier lobbies, culminating in a live-streamed grand finals broadcast featuring tactical commentary and team leaderboards.",
    stats: { teams: 30, players: 120, matches: 8 },
    highlights: ["Custom custom room esports tournament", "30 squads across Delhi University", "Live broadcast with shoutcasters", "Winner trophies and certificates"],
    speakers: ["Esports Ops Team, INFINITY"],
    image: "assets/images/cyber-warp-stream.jpg"
  },
  {
    id: "evt-cyber-awareness-2025",
    title: "Cybersecurity Awareness Summit",
    type: "past",
    category: "workshops",
    categoryLabel: "Cybersecurity Workshop",
    date: "2025-10-08",
    displayDate: "8 October 2025",
    venue: "Seminar Hall, SGGSCC Campus",
    tag: "Awareness Drive",
    status: "Completed",
    isVerified: true,
    verifiedMetric: "100+ Participants",
    shortDesc: "Interactive workshop on digital hygiene, phishing mitigation, and personal information protection for modern students.",
    longDesc: "Held at SGGSCC on 8 October 2025, this milestone session attracted more than 100 enthusiastic participants. Industry mentors demonstrated real-world phishing vectors, password entropy, identity protection techniques, and cyber laws in India.",
    stats: { participants: "100+", duration: "3 Hours", handsOn: "Yes" },
    highlights: ["Live simulated social engineering demo", "2-Factor Authentication security clinic", "Cyber law and reporting overview", "Q&A with certified ethical hackers"],
    speakers: ["Cybersecurity Domain Leads & Industry Guest Speakers"],
    image: "assets/images/tech-sphere-dark.jpg"
  },
  {
    id: "evt-community-outreach",
    title: "Community Digital Outreach Drive",
    type: "past",
    category: "webinars",
    categoryLabel: "Outreach & Literacy",
    date: "Verified Historical Event",
    displayDate: "Community Impact Session",
    venue: "Community Learning Center & Hybrid Session",
    tag: "Social Impact",
    status: "Completed",
    isVerified: true,
    verifiedMetric: "200+ Students Reached",
    shortDesc: "Grassroots digital empowerment mission helping underprivileged school students learn computer basics, web safety and coding fundamentals.",
    longDesc: "INFINITY's commitment to social good materialized in this community outreach initiative where over 200 young learners gained their first structured hands-on encounter with computer applications, internet safety, and creative coding.",
    stats: { studentsReached: "200+", volunteerHours: "40+", workshopsConducted: 4 },
    highlights: ["Interactive computer literacy modules", "Safe internet browsing guidance", "Introductory visual programming games", "Distribution of study resources"],
    speakers: ["Community & Outreach Cell, INFINITY"],
    image: "assets/images/infinity-core-glow.jpg"
  },
  {
    id: "evt-linkedin-optimization-2026",
    title: "LinkedIn Optimization & Tech Branding Masterclass",
    type: "past",
    category: "webinars",
    categoryLabel: "Professional Development",
    date: "2026-02-06",
    displayDate: "6 February 2026",
    venue: "Virtual Keynote (Google Meet / Zoom)",
    tag: "Career Acceleration",
    status: "Completed",
    isVerified: true,
    verifiedMetric: "Flagship Webinar",
    shortDesc: "Strategic deep-dive into crafting high-converting LinkedIn profiles, personal technical branding, and networking for college tech students.",
    longDesc: "On 6 February 2026, INFINITY hosted an intensive masterclass dissecting LinkedIn algorithms, headline architectures, project showcases, and cold outreach etiquette to help college students stand out for internships and fellowships.",
    stats: { attendees: "150+", profileReviews: "25+", resumeTemplates: "3" },
    highlights: ["Live profile teardown of volunteer participants", "Key search terms and algorithm visibility tips", "Cold email and message frameworks that work", "Digital portfolio integration"],
    speakers: ["Corporate Recruiters & Senior Tech Mentors"],
    image: "assets/images/tech-sphere-dark.jpg"
  },
  {
    id: "evt-prompt-engineering",
    title: "Prompt Engineering & Generative AI Lab",
    type: "past",
    category: "workshops",
    categoryLabel: "AI & Innovation",
    date: "Verified Historical Event",
    displayDate: "AI Innovation Lab Series",
    venue: "Computer Labs, SGGSCC",
    tag: "Hands-on Workshop",
    status: "Completed",
    isVerified: true,
    verifiedMetric: "Hands-on AI Lab",
    shortDesc: "Mastering few-shot prompting, chain-of-thought logic, and building generative AI mini-apps using modern foundational models.",
    longDesc: "An immersive hands-on session where students unpacked prompt architecture, system instructions, retrieval augmented generation concepts, and image synthesis workflows to supercharge academic and creative productivity.",
    stats: { projectsBuilt: "45+", promptsTested: "500+" },
    highlights: ["Context injection and zero-shot vs few-shot paradigms", "Building a custom student study assistant bot", "Generative image prompting techniques"],
    speakers: ["AI Domain Leads, INFINITY"],
    image: "assets/images/cyber-warp-stream.jpg"
  },
  // Upcoming events are clearly flagged as demonstration / preview content
  {
    id: "evt-nexus-hackathon-2027",
    title: "NEXUS: 24-Hour Collegiate Hackathon",
    type: "upcoming",
    category: "competitions",
    categoryLabel: "Hackathon [Demo Preview]",
    date: "2027-03-28",
    displayDate: "March 2027 (Demonstration Preview)",
    venue: "SGGSCC Campus & Virtual Sandbox",
    tag: "Flagship Hackathon",
    status: "Registration Open (Demo)",
    isVerified: false,
    verifiedMetric: "₹50,000+ Prize Pool (Demo)",
    shortDesc: "A 24-hour sprint of coding, design, and innovation solving pressing civic, fintech, and AI challenges.",
    longDesc: "Notice: This upcoming event listing is a demonstration preview for the INFINITY digital platform prototype. Actual dates and registrations will be published upon official executive society clearance.",
    stats: { tracks: 4, prizePool: "Demo", maxSquadSize: 4 },
    highlights: ["Tracks in AI, Cybersecurity, Open Innovation & Fintech", "Mentorship from industry tech leads", "Free snacks, energy drinks, and merchandise", "Verified digital certificate of participation"],
    speakers: ["Invited Tech Judges & Alumni Mentors"],
    image: "assets/images/cyber-warp-stream.jpg"
  },
  {
    id: "evt-future-ctf",
    title: "Aegis CTF: Cyber Defence Tournament",
    type: "upcoming",
    category: "competitions",
    categoryLabel: "Cybersecurity CTF [Demo Preview]",
    date: "2027-04-12",
    displayDate: "April 2027 (Demonstration Preview)",
    venue: "Cyber Simulation Lab (Online)",
    tag: "Competitive CTF",
    status: "Coming Soon (Demo)",
    isVerified: false,
    verifiedMetric: "Jeopardy Style CTF",
    shortDesc: "Test your reverse engineering, cryptography, web exploitation, and forensics prowess across 20 challenge flags.",
    longDesc: "Notice: Demonstration preview. Designed to showcase the event registration modal, digital ticketing, and leaderboard integration.",
    stats: { challenges: 20, difficulty: "Beginner to Advanced", mode: "Jeopardy" },
    highlights: ["Crypto & steganography challenges", "Web application vulnerability testing", "Dynamic point breakdown and live scoreboard"],
    speakers: ["INFINITY Cybersecurity Core"],
    image: "assets/images/tech-sphere-dark.jpg"
  }
];

export const VERIFIED_METRICS = [
  {
    id: "metric-outreach",
    number: 200,
    suffix: "+",
    label: "Students Reached",
    subtext: "Community Digital Outreach Initiative",
    eventContext: "Verified Grassroots Digital Literacy Mission",
    icon: "Users"
  },
  {
    id: "metric-cyber",
    number: 100,
    suffix: "+",
    label: "Active Participants",
    subtext: "Cybersecurity Awareness Event (8 Oct 2025)",
    eventContext: "Verified On-Campus Security Summit at SGGSCC",
    icon: "ShieldCheck"
  },
  {
    id: "metric-bgmi",
    number: 30,
    suffix: "",
    label: "Competing Squads",
    subtext: "BGMI Showdown 2.0 Esports Championship",
    eventContext: "Verified Competitive Collegiate Tournament",
    icon: "Gamepad2"
  },
  {
    id: "metric-domains",
    number: 5,
    suffix: "",
    label: "Specialized Domains",
    subtext: "AI, Cyber, Esports, Design, Community",
    eventContext: "Core Pillars of Student Innovation & Exploration",
    icon: "Layers"
  }
];

export const HISTORICAL_TIMELINE = [
  {
    period: "October 2025",
    title: "Cybersecurity Awareness Summit",
    location: "SGGSCC Seminar Hall",
    description: "Conducted the milestone cybersecurity workshop empowering 100+ students with defensive digital habits, threat modeling, and password security.",
    type: "Workshop",
    icon: "ShieldAlert"
  },
  {
    period: "Academic Year 2025",
    title: "BGMI Showdown 2.0",
    location: "Online Esports Arena",
    description: "Executed the electrifying second edition of our mobile gaming championship with 30 competing teams battling across custom maps with live casting.",
    type: "Esports",
    icon: "Gamepad2"
  },
  {
    period: "Community Drive",
    title: "Digital Empowerment Outreach",
    location: "Community Centers, Delhi",
    description: "Reached over 200 school students through our community service initiative, teaching computational thinking and digital safety.",
    type: "Social Impact",
    icon: "HeartHandshake"
  },
  {
    period: "February 2026",
    title: "LinkedIn Optimization Masterclass",
    location: "Virtual Keynote",
    description: "Strategic session on 6 February 2026 covering technical portfolio packaging, networking outreach, and career growth for university students.",
    type: "Career",
    icon: "TrendingUp"
  },
  {
    period: "AI Innovation Series",
    title: "Prompt Engineering & GenAI Labs",
    location: "Computer Labs, SGGSCC",
    description: "Hands-on series exploring prompt patterns, LLM orchestration, and student productivity workflows.",
    type: "Innovation",
    icon: "Sparkles"
  }
];

export const TEAM_MEMBERS = [
  {
    id: "member-kulsehaj",
    name: "Kulsehaj Singh",
    role: "President",
    session: "2025–26 Office Bearer",
    isHistorical: true,
    domain: "Executive Leadership & Tech Strategy",
    bio: "Passionate tech strategist and leader driving society initiatives, inter-college collaborations, and student empowerment across Delhi University.",
    linkedin: "https://www.linkedin.com/company/infinitysggscc",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    skills: ["Strategic Vision", "Community Building", "Public Speaking", "Full-Stack Development"]
  },
  {
    id: "member-advay",
    name: "Advay Nagpal",
    role: "Vice-President",
    session: "2025–26 Office Bearer",
    isHistorical: true,
    domain: "Operations & Technical Direction",
    bio: "Architecting seamless execution of events, hackathons, and cross-domain synergy across tech and creative pipelines.",
    linkedin: "https://www.linkedin.com/company/infinitysggscc",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    skills: ["Operations Management", "Event Planning", "Team Mentorship", "System Architecture"]
  },
  {
    id: "member-harshmohan",
    name: "Harshmohan Singh",
    role: "General Secretary",
    session: "2025–26 Office Bearer",
    isHistorical: true,
    domain: "Administration & External Relations",
    bio: "Coordinating administrative frameworks, institutional liaisons, and student engagement initiatives across departments.",
    linkedin: "https://www.linkedin.com/company/infinitysggscc",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    skills: ["Institutional Relations", "Workflow Automation", "Public Relations", "Team Governance"]
  },
  {
    id: "member-harnoor",
    name: "Harnoor Kaur",
    role: "Joint Secretary",
    session: "2025–26 Office Bearer",
    isHistorical: true,
    domain: "Program Coordination & Outreach",
    bio: "Spearheading community outreach, speaker coordination, and fostering inclusive participation across all academic years.",
    linkedin: "https://www.linkedin.com/company/infinitysggscc",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    skills: ["Outreach Strategy", "Event Logistics", "Digital Communication", "Creative Coordination"]
  },
  {
    id: "member-prabhleen",
    name: "Prabhleen Kaur",
    role: "Advisory & Mentor",
    session: "2025–26 Office Bearer",
    isHistorical: true,
    domain: "Strategic Mentorship & Quality Assurance",
    bio: "Providing senior governance, pedagogical direction, and bridging alumni-to-student opportunities for continuous society evolution.",
    linkedin: "https://www.linkedin.com/company/infinitysggscc",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    skills: ["Curriculum Advisory", "Career Roadmaps", "Leadership Mentorship", "Quality Benchmarking"]
  }
];

export const GALLERY_ITEMS = [
  {
    id: "gal-1",
    title: "Luminous Infinity Core",
    category: "branding",
    categoryLabel: "Brand Identity",
    caption: "The radiant kinetic infinity symbol representing boundless curiosity and technical discovery.",
    src: "assets/images/infinity-core-glow.jpg"
  },
  {
    id: "gal-2",
    title: "Cyber Warp & Esports Arena",
    category: "gaming",
    categoryLabel: "BGMI Showdown 2.0",
    caption: "High-adrenaline atmosphere during competitive collegiate matches in the esports division.",
    src: "assets/images/cyber-warp-stream.jpg"
  },
  {
    id: "gal-3",
    title: "Deep Tech & Security Sphere",
    category: "workshops",
    categoryLabel: "Cybersecurity Summit",
    caption: "Technical visualization of network layers and security protocols explored in our hands-on workshops.",
    src: "assets/images/tech-sphere-dark.jpg"
  },
  {
    id: "gal-4",
    title: "Prompt Engineering Bootcamp",
    category: "workshops",
    categoryLabel: "AI Workshop",
    caption: "Students exploring LLM parameterization, system design, and prompt chaining in computer labs.",
    src: "assets/images/tech-sphere-dark.jpg"
  },
  {
    id: "gal-5",
    title: "Outreach & Digital Literacy",
    category: "community",
    categoryLabel: "Social Impact",
    caption: "Impacting over 200 young learners with fundamental computational knowledge and digital confidence.",
    src: "assets/images/infinity-core-glow.jpg"
  },
  {
    id: "gal-6",
    title: "Esports Broadcast Command Center",
    category: "gaming",
    categoryLabel: "Gaming Tournaments",
    caption: "Behind the scenes coordination and tournament brackets for BGMI Showdown 2.0.",
    src: "assets/images/cyber-warp-stream.jpg"
  }
];

export const DEMO_STUDENT = {
  id: "std-sggscc-2026-442",
  name: "Simranjeet Kaur",
  collegeEmail: "simranjeet.2024@sggscc.du.ac.in",
  course: "B.Sc (Hons.) Computer Science",
  year: "2nd Year",
  rollNo: "CS/24/089",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  points: 840,
  rank: 7,
  tier: "Cyber Elite",
  bio: "Passionate about ethical hacking, CTF challenges, and building responsive React applications. Active member of INFINITY AI & Cyber wings.",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  registeredEvents: [
    {
      id: "evt-bgmi-showdown-2",
      title: "BGMI Showdown 2.0",
      date: "Academic Session 2025–26",
      status: "Attended",
      ticketCode: "INF-BGMI-7782",
      badge: "Esports Participant",
      category: "Gaming"
    },
    {
      id: "evt-cyber-awareness-2025",
      title: "Cybersecurity Awareness Summit",
      date: "8 October 2025",
      status: "Attended",
      ticketCode: "INF-CYBER-9931",
      badge: "Security Defender",
      category: "Workshop"
    },
    {
      id: "evt-nexus-hackathon-2027",
      title: "NEXUS: 24-Hour Collegiate Hackathon",
      date: "March 2027 (Preview)",
      status: "Confirmed (Demo)",
      ticketCode: "INF-NEXUS-4029",
      badge: "Hackathon Hacker",
      category: "Hackathon"
    }
  ],
  certificates: [
    {
      id: "cert-cyber-2025",
      title: "Certificate of Active Participation",
      event: "Cybersecurity Awareness Summit (8 Oct 2025)",
      issueDate: "October 10, 2025",
      certNumber: "INF/CYBER/2025/089",
      issuer: "INFINITY SGGSCC in partnership with SGGSCC Tech Cell",
      description: "Successfully participated in practical demonstrations of digital defense, threat response, and network hygiene."
    },
    {
      id: "cert-prompt-2025",
      title: "Certificate of Skill Mastery",
      event: "Generative AI & Prompt Engineering Masterclass",
      issueDate: "November 14, 2025",
      certNumber: "INF/AI/2025/112",
      issuer: "INFINITY AI Division",
      description: "Demonstrated competence in few-shot prompting, autonomous agent workflow design, and generative interface engineering."
    }
  ],
  activityLog: [
    { action: "Registered for NEXUS 24-Hour Hackathon", date: "Today", pts: "+50 pts" },
    { action: "Earned Certificate for Cybersecurity Summit", date: "Oct 2025", pts: "+200 pts" },
    { action: "Participated in BGMI Showdown 2.0", date: "Session 2025-26", pts: "+150 pts" },
    { action: "Completed Digital Literacy Outreach Volunteer Shift", date: "Session 2025-26", pts: "+300 pts" }
  ]
};

export const LEADERBOARD = [
  { rank: 1, name: "Gurkirat Singh", course: "B.Sc (H) CS, 3rd Yr", points: 1420, events: 8, badge: "Master Innovator", domain: "AI & Innovation" },
  { rank: 2, name: "Ananya Mehra", course: "B.Com (H), 2nd Yr", points: 1280, events: 7, badge: "Community Champion", domain: "Community" },
  { rank: 3, name: "Taranjot Singh", course: "BBE, 3rd Yr", points: 1150, events: 6, badge: "Cyber Sentinel", domain: "Cybersecurity" },
  { rank: 4, name: "Rishabh Malhotra", course: "BMS, 2nd Yr", points: 1040, events: 6, badge: "Design Maestro", domain: "Creativity" },
  { rank: 5, name: "Harjas Singh", course: "B.Sc (H) CS, 1st Yr", points: 980, events: 5, badge: "Esports Ace", domain: "Gaming" },
  { rank: 6, name: "Jasleen Kaur", course: "B.Com (P), 2nd Yr", points: 890, events: 5, badge: "Code Crusader", domain: "AI & Innovation" },
  { rank: 7, name: "Simranjeet Kaur", course: "B.Sc (H) CS, 2nd Yr", points: 840, events: 4, badge: "Cyber Elite", domain: "Cybersecurity" },
  { rank: 8, name: "Manav Sethi", course: "BMS, 1st Yr", points: 760, events: 4, badge: "Rising Talent", domain: "Community" },
  { rank: 9, name: "Prabhnoor Singh", course: "B.Com (H), 2nd Yr", points: 710, events: 3, badge: "Tactical Strategist", domain: "Gaming" },
  { rank: 10, name: "Divya Sharma", course: "B.A. (H) Economics", points: 680, events: 3, badge: "Creative Prodigy", domain: "Creativity" }
];

export const RECRUITMENT_TIMELINE = [
  { step: "01", stage: "Applications Open", duration: "Phase 1", desc: "Online submission of portfolio, domain interests, and creative problem brief.", status: "completed" },
  { step: "02", stage: "Application Review", duration: "Phase 2", desc: "Domain leads evaluate candidate portfolios, past projects, and technical curiosity.", status: "current" },
  { step: "03", stage: "Task / Interaction Round", duration: "Phase 3", desc: "Hands-on challenge: mini-design brief, code sandbox task, or outreach proposal.", status: "upcoming" },
  { step: "04", stage: "Personal Interview", duration: "Phase 4", desc: "One-on-one conversation with society office bearers to explore alignment and culture.", status: "upcoming" },
  { step: "05", stage: "Final Selection", duration: "Phase 5", desc: "Notification of selected candidates via college email and official social channels.", status: "upcoming" },
  { step: "06", stage: "Welcome to INFINITY", duration: "Orientation", desc: "Induction ceremony, domain team onboarding, and first society hack-session.", status: "upcoming" }
];
