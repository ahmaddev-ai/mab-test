export type CourseModule = {
  title: string;
  points: string[];
};

export type CourseCatalogItem = {
  title: string;
  shortDesc: string;
  longDesc: string;
  slug: string;
  image: string;
  category: string;
  duration: string;
  level: string;
  format: string;
  outcomes: string[];
  curriculum: CourseModule[];
};

export const COURSE_CATALOG = [
  {
    title: "AI SaaS Development Bootcamp",
    shortDesc:
      "Build scalable AI SaaS systems with automation, APIs & cloud workflows.",
    longDesc:
      "A practical program for building production-ready AI SaaS products from idea validation to deployment. You will design app architecture, connect AI APIs, build secure workflows, and ship an MVP that can support real users.",
    slug: "ai-saas-development-bootcamp",
    image: "/mab-fast-earning-program/ai-saas.webp",
    category: "AI",
    duration: "8 Weeks",
    level: "Intermediate",
    format: "Online + Project Work",
    outcomes: [
      "Plan and scope an AI SaaS product",
      "Connect AI models with full-stack application flows",
      "Build user dashboards, payments, and automation pipelines",
      "Deploy and maintain a scalable MVP",
    ],
    curriculum: [
      {
        title: "SaaS Foundations",
        points: ["Product idea selection", "MVP planning", "Feature mapping"],
      },
      {
        title: "AI Application Architecture",
        points: ["API workflows", "Prompt systems", "Data flow design"],
      },
      {
        title: "Build and Launch",
        points: ["Dashboard buildout", "Deployment", "Launch checklist"],
      },
    ],
  },
  {
    title: "Sales Mastery 3.0",
    shortDesc: "Learn persuasion, high-ticket closing & modern sales systems.",
    longDesc:
      "A focused sales training program for closing higher-value offers with better discovery, follow-up, objection handling, and pipeline discipline.",
    slug: "sales-mastery-3",
    image: "/mab-fast-earning-program/sales.webp",
    category: "Business",
    duration: "6 Weeks",
    level: "Beginner to Advanced",
    format: "Online + Roleplay Sessions",
    outcomes: [
      "Run structured sales conversations",
      "Qualify prospects with confidence",
      "Handle objections without pressure tactics",
      "Build a repeatable follow-up system",
    ],
    curriculum: [
      {
        title: "Sales Psychology",
        points: ["Buyer intent", "Trust building", "Offer positioning"],
      },
      {
        title: "Closing Systems",
        points: ["Discovery calls", "Objection handling", "Follow-up flows"],
      },
      {
        title: "Pipeline Growth",
        points: ["Lead tracking", "CRM habits", "Performance review"],
      },
    ],
  },
  {
    title: "Fast Income Generation",
    shortDesc: "Digital monetization systems & scalable online income models.",
    longDesc:
      "Learn practical online income models, choose a realistic offer, create a delivery process, and build systems for acquiring and serving customers.",
    slug: "fast-income-generation",
    image: "/mab-fast-earning-program/income.webp",
    category: "Business",
    duration: "5 Weeks",
    level: "Beginner",
    format: "Online + Action Plans",
    outcomes: [
      "Choose a practical income model",
      "Create a simple sellable offer",
      "Build outreach and delivery systems",
      "Track revenue, costs, and next steps",
    ],
    curriculum: [
      {
        title: "Model Selection",
        points: ["Skill audit", "Market demand", "Offer fit"],
      },
      {
        title: "Client Acquisition",
        points: ["Outreach scripts", "Lead lists", "Follow-up cadence"],
      },
      {
        title: "Delivery Systems",
        points: ["Client onboarding", "Service process", "Retention basics"],
      },
    ],
  },
  {
    title: "AI Ethical Hacking",
    shortDesc:
      "Modern cybersecurity, AI hacking workflows & bug bounty systems.",
    longDesc:
      "A responsible security program covering web application testing, AI-assisted research workflows, reporting, and bug bounty discipline.",
    slug: "ai-ethical-hacking",
    image: "/mab-fast-earning-program/hacking.webp",
    category: "Security",
    duration: "8 Weeks",
    level: "Intermediate",
    format: "Online + Labs",
    outcomes: [
      "Understand common web vulnerabilities",
      "Use AI to speed up security research",
      "Document findings professionally",
      "Practice ethical testing boundaries",
    ],
    curriculum: [
      {
        title: "Security Foundations",
        points: ["HTTP basics", "Threat models", "Testing ethics"],
      },
      {
        title: "Web Testing Workflows",
        points: ["Recon", "Common vulnerabilities", "Validation steps"],
      },
      {
        title: "Reporting and Bounties",
        points: [
          "Proof of concept writing",
          "Risk rating",
          "Submission quality",
        ],
      },
    ],
  },
  {
    title: "Go High Level Marketing",
    shortDesc:
      "Funnels, CRM automation, lead systems & AI marketing workflows.",
    longDesc:
      "Build marketing systems in Go High Level, including funnels, CRM pipelines, automations, appointment flows, and AI-assisted follow-up.",
    slug: "go-high-level-marketing",
    image: "/mab-fast-earning-program/gohighlevel.webp",
    category: "Marketing",
    duration: "6 Weeks",
    level: "Beginner to Intermediate",
    format: "Online + Workflow Builds",
    outcomes: [
      "Create funnels and lead capture flows",
      "Set up CRM pipelines and automations",
      "Build appointment and follow-up systems",
      "Package GHL services for clients",
    ],
    curriculum: [
      {
        title: "GHL Setup",
        points: ["Account structure", "Pipelines", "Contact management"],
      },
      {
        title: "Funnels and Automations",
        points: ["Landing pages", "Forms", "Workflow triggers"],
      },
      {
        title: "Client Delivery",
        points: ["Snapshots", "Reporting", "Service packaging"],
      },
    ],
  },
  {
    title: "Earn 6 Figure Program",
    shortDesc: "Build scalable digital systems for high-income online growth.",
    longDesc:
      "A business systems program focused on offer design, acquisition channels, fulfillment, operations, and scaling decisions.",
    slug: "earn-6-figure",
    image: "/mab-fast-earning-program/6figure.webp",
    category: "Business",
    duration: "10 Weeks",
    level: "Intermediate",
    format: "Online + Mentorship",
    outcomes: [
      "Design a higher-value offer",
      "Build a consistent acquisition engine",
      "Improve fulfillment and retention",
      "Track business metrics for scale",
    ],
    curriculum: [
      {
        title: "Offer and Market",
        points: ["Niche clarity", "Pricing", "Positioning"],
      },
      {
        title: "Growth Systems",
        points: ["Organic channels", "Sales process", "Referral loops"],
      },
      {
        title: "Operations",
        points: ["Delivery SOPs", "Metrics", "Scaling constraints"],
      },
    ],
  },
  {
    title: "AI Freelancing 3.0",
    shortDesc: "Client acquisition, automation & premium AI service delivery.",
    longDesc:
      "Learn how to package AI services, find clients, deliver automation projects, and build repeatable freelance operations.",
    slug: "ai-freelancing-3",
    image: "/mab-fast-earning-program/freelancing.webp",
    category: "Freelancing",
    duration: "6 Weeks",
    level: "Beginner to Intermediate",
    format: "Online + Templates",
    outcomes: [
      "Package practical AI services",
      "Find and qualify freelance clients",
      "Deliver automation projects reliably",
      "Create proposals and recurring offers",
    ],
    curriculum: [
      {
        title: "Service Design",
        points: ["AI offer selection", "Pricing", "Scope control"],
      },
      {
        title: "Client Acquisition",
        points: ["Portfolio assets", "Outreach", "Discovery calls"],
      },
      {
        title: "Delivery",
        points: ["Automation builds", "Handover", "Retainers"],
      },
    ],
  },
  {
    title: "Web Development with AI",
    shortDesc: "Build modern AI-powered web apps with intelligent workflows.",
    longDesc:
      "A full-stack web development program that uses AI tools to accelerate planning, coding, debugging, testing, and deployment.",
    slug: "web-development-ai",
    image: "/mab-fast-earning-program/web-ai.webp",
    category: "AI",
    duration: "8 Weeks",
    level: "Beginner to Intermediate",
    format: "Online + Coding Projects",
    outcomes: [
      "Build responsive web interfaces",
      "Create backend routes and data flows",
      "Use AI tools for development workflows",
      "Deploy complete web applications",
    ],
    curriculum: [
      {
        title: "Frontend Foundations",
        points: ["React basics", "Responsive layouts", "Component patterns"],
      },
      {
        title: "Backend and Data",
        points: ["API routes", "Database basics", "Authentication concepts"],
      },
      {
        title: "AI Development Workflow",
        points: ["Prompted coding", "Debugging", "Deployment"],
      },
    ],
  },
  {
    title: "Mobile Apps with AI",
    shortDesc: "Create Android & iOS apps using AI systems & React Native.",
    longDesc:
      "Build cross-platform mobile apps with AI-assisted workflows, focusing on interface design, state management, APIs, and app release basics.",
    slug: "mobile-apps-ai",
    image: "/mab-fast-earning-program/mobile.webp",
    category: "Mobile",
    duration: "8 Weeks",
    level: "Intermediate",
    format: "Online + App Project",
    outcomes: [
      "Plan and design mobile app screens",
      "Build cross-platform app flows",
      "Connect APIs and AI services",
      "Prepare apps for release",
    ],
    curriculum: [
      {
        title: "Mobile Foundations",
        points: ["React Native basics", "Navigation", "Reusable components"],
      },
      {
        title: "AI App Features",
        points: ["API connections", "State handling", "User flows"],
      },
      {
        title: "Release Prep",
        points: ["Testing", "Performance checks", "Store assets"],
      },
    ],
  },
  {
    title: "Product Development",
    shortDesc: "Learn MVP building, startup systems & scalable architecture.",
    longDesc:
      "A product-building program for founders and makers who want to validate ideas, define MVP scope, build user-focused features, and plan scalable releases.",
    slug: "product-development",
    image: "/mab-fast-earning-program/product.webp",
    category: "Startup",
    duration: "7 Weeks",
    level: "Beginner to Intermediate",
    format: "Online + Product Sprint",
    outcomes: [
      "Validate product ideas before building",
      "Define MVP scope and feature priorities",
      "Plan product architecture and roadmap",
      "Prepare for launch and user feedback",
    ],
    curriculum: [
      {
        title: "Product Discovery",
        points: ["User problems", "Market research", "Validation tests"],
      },
      {
        title: "MVP Planning",
        points: ["Feature priority", "User journeys", "Roadmap design"],
      },
      {
        title: "Launch Systems",
        points: ["Feedback loops", "Metrics", "Iteration plan"],
      },
    ],
  },
  {
    title: "AI, Machine Learning & Agentic AI Engineering",
    shortDesc:
      "From ML fundamentals to agentic systems — build, fine-tune, and deploy production AI pipelines.",
    longDesc:
      "A comprehensive program taking you from foundational machine learning concepts to building autonomous agentic AI systems. You will implement neural networks, work with large language models, explore fine-tuning techniques, build multi-agent workflows with LangChain and AutoGen, integrate AI APIs at scale, and deploy end-to-end AI pipelines to cloud production environments.",
    slug: "ai-ml-agentic-engineering",
    image: "/mab-fast-earning-program/ml-agenticai-image.webp",
    category: "AI",
    duration: "12 Weeks",
    level: "Advanced",
    format: "Online + Project Work",
    outcomes: [
      "Implement core ML algorithms and understand their mathematical foundations",
      "Design and train neural networks for classification, regression, and generation",
      "Fine-tune large language models for domain-specific applications",
      "Build multi-agent AI systems using LangChain and AutoGen",
      "Integrate AI APIs and orchestrate complex AI-powered workflows",
      "Deploy and monitor production AI pipelines on cloud infrastructure",
    ],
    curriculum: [
      {
        title: "ML & AI Foundations",
        points: [
          "Supervised and unsupervised learning algorithms",
          "Feature engineering and data preparation",
          "Model evaluation, bias, and overfitting",
          "Python ML stack: NumPy, Pandas, scikit-learn",
        ],
      },
      {
        title: "Neural Networks & Deep Learning",
        points: [
          "Feedforward and convolutional architectures",
          "Training loops, optimizers, and regularization",
          "Transfer learning with pre-trained models",
          "PyTorch fundamentals and model checkpointing",
        ],
      },
      {
        title: "Large Language Models",
        points: [
          "Transformer architecture and attention mechanisms",
          "Prompt engineering and context management",
          "RAG (Retrieval-Augmented Generation) systems",
          "Fine-tuning with LoRA and PEFT techniques",
        ],
      },
      {
        title: "Agentic AI Systems",
        points: [
          "Agent architectures: ReAct, Plan-and-Execute, and memory",
          "LangChain chains, tools, and agent loops",
          "Multi-agent orchestration with AutoGen",
          "Tool calling, function execution, and state management",
        ],
      },
      {
        title: "AI API Integration & Orchestration",
        points: [
          "OpenAI, Anthropic, and Gemini API integration",
          "Building AI-powered microservices",
          "Streaming responses and real-time AI outputs",
        ],
      },
      {
        title: "Production Deployment & MLOps",
        points: [
          "Containerizing AI services with Docker",
          "Model serving with FastAPI and cloud endpoints",
          "Monitoring model drift, latency, and costs",
          "CI/CD pipelines for AI applications",
        ],
      },
    ],
  },
  {
    title: "Modern Software Engineering (Web2, Web3 & Mobile Apps)",
    shortDesc:
      "Full-stack mastery across React/Next.js, Node.js APIs, Solidity smart contracts, and React Native apps.",
    longDesc:
      "A multi-disciplinary engineering program built for developers who want to ship complete digital products. You will build modern web interfaces with React and Next.js, design scalable server-side APIs with Node.js, write and deploy Solidity smart contracts for Web3 applications, and create cross-platform mobile apps using React Native and Expo — all with TypeScript as the shared foundation.",
    slug: "modern-software-engineering",
    image: "/mab-fast-earning-program/modern-software-engineering.webp",
    category: "Development",
    duration: "10 Weeks",
    level: "Intermediate",
    format: "Online + Project Work",
    outcomes: [
      "Build production-ready web applications with React and Next.js",
      "Design and secure RESTful and GraphQL APIs with Node.js",
      "Write, test, and deploy Solidity smart contracts on EVM chains",
      "Develop and publish cross-platform mobile apps with React Native",
      "Apply consistent TypeScript patterns across all layers of a project",
      "Implement CI/CD pipelines for continuous software delivery",
    ],
    curriculum: [
      {
        title: "React & Next.js Engineering",
        points: [
          "Component architecture and state management",
          "Next.js App Router, SSR, and static generation",
          "Performance optimization and Core Web Vitals",
          "TypeScript patterns for scalable frontends",
        ],
      },
      {
        title: "Node.js API Development",
        points: [
          "RESTful API design and routing patterns",
          "Authentication with JWT and OAuth2",
          "Database integration with PostgreSQL and MongoDB",
          "API security, rate limiting, and error handling",
        ],
      },
      {
        title: "Web3 & Smart Contract Development",
        points: [
          "Solidity fundamentals and contract structure",
          "ERC-20 and ERC-721 token standards",
          "Testing contracts with Hardhat and Foundry",
          "Deploying to testnets and mainnet",
        ],
      },
      {
        title: "React Native & Mobile Apps",
        points: [
          "Expo setup and cross-platform navigation",
          "Mobile UI components and responsive layouts",
          "Device APIs: camera, notifications, and storage",
          "App store preparation and release builds",
        ],
      },
      {
        title: "TypeScript Patterns & Architecture",
        points: [
          "Advanced types, generics, and utility types",
          "Domain-driven design fundamentals",
          "Monorepo setup with shared type definitions",
        ],
      },
      {
        title: "CI/CD & Product Delivery",
        points: [
          "GitHub Actions workflows for build and test",
          "Deployment pipelines to Vercel, Railway, and cloud",
          "Feature flagging and staged rollouts",
          "Code review standards and PR workflows",
        ],
      },
    ],
  },
  {
    title: "Cloud Engineering, DevOps & AI Operations",
    shortDesc:
      "AWS, Docker, Kubernetes, Terraform, and MLOps — design and operate production cloud-native infrastructure.",
    longDesc:
      "A hands-on cloud engineering program covering multi-cloud fundamentals, containerization, orchestration, and AI-specific operations. You will deploy infrastructure on AWS, GCP, and Azure, manage containerized workloads with Docker and Kubernetes, automate infrastructure provisioning with Terraform, and build MLOps pipelines to monitor and maintain AI models in production.",
    slug: "cloud-devops-ai-operations",
    image: "/mab-fast-earning-program/cloud-engineering.webp",
    category: "AI",
    duration: "10 Weeks",
    level: "Intermediate",
    format: "Online + Project Work",
    outcomes: [
      "Design and deploy multi-cloud architectures on AWS, GCP, and Azure",
      "Build and manage containerized services with Docker and Kubernetes",
      "Automate infrastructure provisioning using Terraform",
      "Create end-to-end CI/CD pipelines for code and model delivery",
      "Implement MLOps workflows for AI model deployment and monitoring",
      "Set up observability stacks with logging, metrics, and alerting",
    ],
    curriculum: [
      {
        title: "Cloud Fundamentals",
        points: [
          "AWS core services: EC2, S3, RDS, Lambda, and IAM",
          "GCP and Azure equivalents for cross-cloud literacy",
          "Networking: VPC, subnets, and security groups",
          "Cloud cost management and resource tagging",
        ],
      },
      {
        title: "Docker & Containerization",
        points: [
          "Writing optimized Dockerfiles and multi-stage builds",
          "Docker Compose for local multi-service development",
          "Container registry workflows with ECR and GCR",
          "Security scanning and image hardening",
        ],
      },
      {
        title: "Kubernetes & Orchestration",
        points: [
          "Pods, deployments, services, and ingress controllers",
          "Helm charts and package management",
          "Auto-scaling and resource limits",
          "Kubernetes on EKS, GKE, and AKS",
        ],
      },
      {
        title: "Infrastructure as Code with Terraform",
        points: [
          "Terraform modules, state management, and workspaces",
          "Provisioning cloud resources declaratively",
          "CI/CD integration for infrastructure changes",
        ],
      },
      {
        title: "CI/CD Pipelines",
        points: [
          "GitHub Actions and GitLab CI pipeline design",
          "Blue-green and canary deployment strategies",
          "Secrets management with Vault and cloud KMS",
          "Automated testing gates in deployment pipelines",
        ],
      },
      {
        title: "MLOps & AI Operations",
        points: [
          "Model registry, versioning, and artifact storage",
          "Serving AI models with Triton and BentoML",
          "Monitoring model drift and performance degradation",
          "Retraining pipelines with Kubeflow and Airflow",
        ],
      },
    ],
  },
  {
    title: "Cyber Security, Ethical Hacking & Bug Bounty",
    shortDesc:
      "OWASP Top 10, penetration testing, AI-assisted recon, and professional bug bounty reporting.",
    longDesc:
      "A structured security program for practitioners who want to think like attackers and operate within ethical and legal boundaries. You will study network security fundamentals, execute penetration testing methodology end-to-end, analyze the OWASP Top 10 web vulnerabilities in controlled labs, explore reverse engineering basics, and build a credible bug bounty workflow on HackerOne and Bugcrowd using AI-assisted reconnaissance.",
    slug: "cybersecurity-ethical-hacking-bug-bounty",
    image: "/mab-fast-earning-program/cybersecurity.webp",
    category: "Security",
    duration: "10 Weeks",
    level: "Intermediate",
    format: "Online + Labs",
    outcomes: [
      "Understand network protocols, attack surfaces, and threat modeling",
      "Execute structured penetration tests across web and network targets",
      "Identify and exploit OWASP Top 10 vulnerabilities in lab environments",
      "Apply AI tools to accelerate asset discovery and reconnaissance",
      "Write professional vulnerability reports with accurate risk ratings",
      "Build and maintain an active bug bounty practice on major platforms",
    ],
    curriculum: [
      {
        title: "Security Fundamentals & Networking",
        points: [
          "TCP/IP, DNS, HTTP/S, and common network protocols",
          "Threat modeling and attack surface mapping",
          "Linux command line for security practitioners",
          "Lab environment setup with Kali Linux and VMs",
        ],
      },
      {
        title: "Penetration Testing Methodology",
        points: [
          "Reconnaissance: passive and active information gathering",
          "Scanning and enumeration with Nmap and Nessus",
          "Exploitation frameworks: Metasploit basics",
          "Post-exploitation and lateral movement concepts",
        ],
      },
      {
        title: "Web Application Security (OWASP Top 10)",
        points: [
          "Injection attacks: SQL, Command, and SSTI",
          "Authentication flaws, IDOR, and broken access control",
          "XSS, CSRF, and client-side vulnerabilities",
          "Hands-on labs using DVWA and HackTheBox",
        ],
      },
      {
        title: "Reverse Engineering Basics",
        points: [
          "Binary analysis fundamentals with Ghidra",
          "Static and dynamic analysis of simple programs",
          "Understanding compiled code and memory layout",
        ],
      },
      {
        title: "AI-Assisted Recon & Automation",
        points: [
          "Using AI tools for subdomain enumeration and pattern analysis",
          "Automating recon workflows with Python and APIs",
          "OSINT techniques and digital footprint analysis",
          "Ethical and legal boundaries of AI-assisted hacking",
        ],
      },
      {
        title: "Bug Bounty & Professional Reporting",
        points: [
          "HackerOne and Bugcrowd platform setup and program selection",
          "Writing clear, reproducible proof-of-concept reports",
          "CVSS scoring and risk rating fundamentals",
          "Building a bounty hunter portfolio and reputation",
        ],
      },
    ],
  },
  {
    title: "Digital Marketing, Branding & Growth Hacking",
    shortDesc:
      "Build brand authority, drive conversions, and scale audiences with AI-powered marketing systems.",
    longDesc:
      "A practical marketing program that takes you from brand positioning fundamentals to deploying full-funnel digital marketing campaigns. You will craft brand strategy, execute SEO and content marketing, run profitable paid ad campaigns on Google and Meta, grow organic social media audiences, build email funnels, optimize conversion rates, and leverage AI tools to accelerate every stage of the marketing workflow.",
    slug: "digital-marketing-branding-growth",
    image: "/mab-fast-earning-program/digital-marketing-growth.webp",
    category: "Marketing",
    duration: "6 Weeks",
    level: "Beginner",
    format: "Online + Live Sessions",
    outcomes: [
      "Define brand positioning, voice, and visual identity strategy",
      "Execute SEO campaigns and create high-converting content",
      "Run and optimize paid ads on Google Ads and Meta Ads Manager",
      "Grow social media audiences using organic and paid growth tactics",
      "Build automated email funnels that nurture leads to conversion",
      "Use AI tools to accelerate content, research, and analytics reporting",
    ],
    curriculum: [
      {
        title: "Brand Strategy & Identity",
        points: [
          "Brand positioning frameworks and competitive differentiation",
          "Tone of voice, messaging pillars, and audience personas",
          "Visual identity basics: color, typography, and logo direction",
          "Brand consistency across digital touchpoints",
        ],
      },
      {
        title: "SEO & Content Marketing",
        points: [
          "Keyword research and search intent mapping",
          "On-page SEO: structure, metadata, and internal linking",
          "Content calendar planning and editorial workflow",
          "Link-building fundamentals and domain authority",
        ],
      },
      {
        title: "Paid Advertising: Google & Meta",
        points: [
          "Google Search and Display campaign setup",
          "Meta Ads Manager: audiences, creatives, and bidding",
          "A/B testing ad copy, creatives, and landing pages",
          "ROAS tracking and budget optimization",
        ],
      },
      {
        title: "Social Media Growth",
        points: [
          "Platform-specific strategies for Instagram, LinkedIn, and TikTok",
          "Community building and engagement loops",
          "Influencer collaboration and UGC campaigns",
        ],
      },
      {
        title: "Email Funnels & Conversion Optimization",
        points: [
          "Email list building with lead magnets and opt-in flows",
          "Automated drip sequences and behavioral triggers",
          "Landing page design and CRO fundamentals",
          "Analytics dashboards: GA4, Hotjar, and attribution models",
        ],
      },
      {
        title: "AI Tools for Marketers",
        points: [
          "AI-powered copywriting and content generation",
          "Audience research and trend analysis with AI",
          "Automating reporting and analytics summaries",
          "Integrating AI into full-funnel marketing workflows",
        ],
      },
    ],
  },
] satisfies CourseCatalogItem[];

export type CourseSlug = (typeof COURSE_CATALOG)[number]["slug"];

export const COURSE_CATALOG_BY_SLUG = Object.fromEntries(
  COURSE_CATALOG.map((course) => [course.slug, course])
) as Record<CourseSlug, CourseCatalogItem>;
