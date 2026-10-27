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
    title: "AI, Machine Learning & Agentic AI Engineering",
    shortDesc:
      "From ML fundamentals to agentic systems — build, fine-tune, and deploy production AI pipelines.",
    longDesc:
      "A comprehensive program taking you from foundational machine learning concepts to building autonomous agentic AI systems. You will implement neural networks, work with large language models, explore fine-tuning techniques, build multi-agent workflows with LangChain and AutoGen, integrate AI APIs at scale, and deploy end-to-end AI pipelines to cloud production environments.",
    slug: "ai-ml-agentic-engineering",
    image: "/mab-fast-earning-program/mab-image-ai-course.webp",
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
    title: "Personal Consultancy for International Clients",
    shortDesc:
      "Master the skills required to work professionally with international clients, close high-value projects, and build a successful global freelancing and consulting career.",
    longDesc:
      "A complete consultancy program designed for developers, designers, AI engineers, and digital professionals who want to work with international clients. Learn how to build a premium personal brand, find high-paying clients, conduct professional discovery meetings, write winning proposals, negotiate contracts, manage projects efficiently, communicate confidently, handle payments securely, and create long-term client relationships that generate recurring revenue.",
    slug: "personal-consultancy-for-international-clients",
    image: "/mab-fast-earning-program/mab-image-personal-consultancy.webp",
    category: "Business",
    duration: "8 Weeks",
    level: "Beginner to Advanced",
    format: "Online + Live Consultancy Sessions",
    outcomes: [
      "Build a premium personal brand that attracts international clients",
      "Find high-paying clients using LinkedIn, Upwork, email outreach, and networking",
      "Conduct professional discovery calls and convert prospects into paying clients",
      "Create winning proposals, quotations, and project roadmaps",
      "Negotiate pricing confidently and close high-value international deals",
      "Manage projects, communication, payments, and long-term client relationships professionally",
    ],
    curriculum: [
      {
        title: "Personal Branding & Positioning",
        points: [
          "Building a strong personal brand",
          "Creating a professional LinkedIn profile",
          "Portfolio optimization and case studies",
          "Building authority through content and networking",
        ],
      },
      {
        title: "Finding International Clients",
        points: [
          "LinkedIn client acquisition strategies",
          "Upwork, Fiverr, and freelance marketplaces",
          "Cold email outreach and lead generation",
          "Building referral and networking systems",
        ],
      },
      {
        title: "Discovery Calls & Client Communication",
        points: [
          "Conducting professional discovery meetings",
          "Understanding business requirements",
          "Asking the right consulting questions",
          "Building trust and handling objections",
        ],
      },
      {
        title: "Proposal Writing & Sales",
        points: [
          "Writing winning proposals",
          "Preparing quotations and project estimates",
          "Pricing strategies for international markets",
          "Negotiation and closing techniques",
        ],
      },
      {
        title: "Project Delivery & Client Management",
        points: [
          "Managing projects professionally",
          "Client communication best practices",
          "Handling revisions and scope changes",
          "Building long-term client relationships",
        ],
      },
      {
        title: "Payments, Contracts & Business Growth",
        points: [
          "Creating professional contracts and invoices",
          "International payment methods and invoicing",
          "Protecting yourself legally as a consultant",
          "Scaling into a consulting agency or personal brand",
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
    image: "/mab-fast-earning-program/mab-image-digital-marketing.webp",
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
