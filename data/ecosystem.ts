import {
  Bot,
  Cloud,
  WalletCards,
  ShieldCheck,
  GraduationCap,
  Building2,
  Workflow,
  Network,
  Database,
  GitBranch,
  ServerCog,
  Lock,
  Layers,
  Boxes,
  Code2,
  Users,
  BookOpen,
  Award,
  Radar,
  KeyRound,
  FileCheck2,
  ScanSearch,
  Compass,
  LineChart,
  Rocket,
  Sparkles,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

export interface EcosystemCapability {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface EcosystemSolution {
  title: string;
  description: string;
  outcome: string;
}

export interface EcosystemBenefit {
  title: string;
  description: string;
  metric: string;
}

export interface EcosystemProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface EcosystemDivision {
  slug: string;
  label: string;
  navLabel: string;
  title: string;
  icon: LucideIcon;
  heroImage: string;
  heroHeadline: string;
  heroSubheading: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  overviewTitle: string;
  overviewParagraphs: string[];
  overviewStats: { label: string; value: string }[];
  personalNoteTitle: string;
  personalNote: string;
  capabilitiesTitle: string;
  capabilitiesDescription: string;
  capabilities: EcosystemCapability[];
  solutions: EcosystemSolution[];
  benefits: EcosystemBenefit[];
  industries: { name: string; description: string }[];
  process: EcosystemProcessStep[];
  whyChooseUs: { title: string; description: string }[];
  ctaHeadline: string;
  ctaDescription: string;
}

export const ECOSYSTEM_DIVISIONS: Record<string, EcosystemDivision> = {
  "ai-systems-division": {
    slug: "ai-systems-division",
    label: "AI / Automation",
    navLabel: "AI Systems Division",
    title: "AI Systems Division",
    icon: Bot,
    heroImage: "/mab-about-image.webp",
    heroHeadline: "Agentic AI Systems Built for Real Business Operations",
    heroSubheading: "AI Systems Division",
    heroDescription:
      "I design, engineer, and deploy production-grade AI agents, multi-agent systems, and retrieval-augmented generation pipelines that automate enterprise workflows and turn business knowledge into intelligent action.",
    metaTitle:
      "AI Systems by Mian Ahmad Basit — Agentic AI, AI Agents & Enterprise Automation",
    metaDescription:
      "Mian Ahmad Basit builds applied AI systems: agentic AI, multi-agent systems, RAG pipelines, and workflow automation engineered for measurable business outcomes.",
    keywords: [
      "Mian Ahmad Basit AI",
      "agentic AI development Pakistan",
      "AI agents for enterprise",
      "multi-agent systems development",
      "RAG systems development",
      "enterprise AI automation",
      "AI products development",
      "P2P Clouds AI systems",
    ],
    overviewTitle: "Applied Intelligence, Not Experiments",
    overviewParagraphs: [
      "As founder and CEO of P2P Clouds, I build applied artificial intelligence that operates inside real business processes, not isolated demos. My work spans agentic AI architectures, multi-agent orchestration, and retrieval systems that connect large language models to a company's actual data, tools, and decision points.",
      "Every engagement is built around one principle: AI should remove operational friction. That means autonomous agents that complete multi-step tasks, RAG pipelines that ground responses in verified internal knowledge, and automation layers that connect CRMs, support desks, and internal tools into one coordinated system.",
      "From early-stage automation audits to fully productized AI features inside the P2P Clouds platform, I partner directly with founders and operations teams to convert manual, repetitive work into intelligent, self-running workflows.",
    ],
    overviewStats: [
      { label: "Years Building AI & Cloud Systems", value: "10+" },
      { label: "Founder & CEO", value: "P2P Clouds" },
      { label: "Learners Mentored in AI", value: "50,000+" },
    ],
    personalNoteTitle: "Why I Focus Here",
    personalNote:
      "I started P2P Clouds because most businesses were drowning in repetitive manual work that AI could already handle. I want every system I ship to remove a real bottleneck, not just demonstrate a model.",
    capabilitiesTitle: "How I Help",
    capabilitiesDescription:
      "A focused set of capabilities I personally architect and ship, engineered to operate inside real business systems rather than standalone demos.",
    capabilities: [
      {
        title: "Agentic AI Architecture",
        description:
          "Goal-driven AI agents capable of planning, tool use, and autonomous multi-step task execution across business systems.",
        icon: Sparkles,
      },
      {
        title: "AI Agents & Assistants",
        description:
          "Custom conversational and task-executing agents embedded into CRMs, support desks, and internal operational tools.",
        icon: Bot,
      },
      {
        title: "Multi-Agent Systems",
        description:
          "Coordinated agent networks that divide complex workflows across specialized roles for higher accuracy and throughput.",
        icon: Network,
      },
      {
        title: "Enterprise Automation",
        description:
          "End-to-end automation of repetitive operational processes, from data entry to multi-system orchestration.",
        icon: Workflow,
      },
      {
        title: "RAG Systems",
        description:
          "Retrieval-augmented generation pipelines that ground AI responses in verified, up-to-date internal knowledge bases.",
        icon: Database,
      },
      {
        title: "Workflow Automation",
        description:
          "Business-process automation connecting tools, APIs, and data sources into a single intelligent execution layer.",
        icon: GitBranch,
      },
      {
        title: "AI Product Development",
        description:
          "Productized AI features and standalone AI-powered modules built for the P2P Clouds platform and client products.",
        icon: Layers,
      },
      {
        title: "Intelligent Business Operations",
        description:
          "Operational intelligence layers that monitor, decide, and act, reducing dependency on manual oversight.",
        icon: ServerCog,
      },
    ],
    solutions: [
      {
        title: "Customer Support Automation",
        description:
          "Multi-agent support systems that triage, resolve, and escalate tickets using RAG-grounded knowledge bases and CRM integration.",
        outcome: "Faster first-response time and lighter support workload.",
      },
      {
        title: "Sales & Lead Operations",
        description:
          "Autonomous agents that qualify leads, enrich CRM records, and trigger follow-up sequences without manual handling.",
        outcome: "Faster lead response and more consistent conversion.",
      },
      {
        title: "Internal Knowledge Assistants",
        description:
          "RAG-powered assistants that let teams query internal documentation, policies, and reports in natural language.",
        outcome: "Less time spent searching for internal information.",
      },
      {
        title: "Back-Office Process Automation",
        description:
          "Multi-agent pipelines that handle data reconciliation, reporting, and repetitive administrative workflows.",
        outcome: "A noticeable drop in manual operational overhead.",
      },
    ],
    benefits: [
      {
        title: "Reduced Operational Cost",
        description:
          "Automation replaces repetitive manual labor across support, sales, and back-office functions.",
        metric: "Less time spent on repetitive tasks",
      },
      {
        title: "Faster Decision Cycles",
        description:
          "AI agents process and act on information in real time, removing approval bottlenecks.",
        metric: "Decisions executed in minutes, not days",
      },
      {
        title: "Consistent Output Quality",
        description:
          "Agentic systems apply the same logic and standards every time, reducing human variance.",
        metric: "Predictable, repeatable process outcomes",
      },
      {
        title: "Scalable Without Linear Headcount",
        description:
          "Automated systems absorb increased workload without proportional staffing growth.",
        metric: "Growth without a matching rise in headcount",
      },
    ],
    industries: [
      {
        name: "SaaS & Technology",
        description:
          "AI agents embedded directly into product workflows and customer support layers.",
      },
      {
        name: "E-Commerce & Retail",
        description:
          "Automated order support, inventory queries, and customer engagement agents.",
      },
      {
        name: "Education & EdTech",
        description:
          "Intelligent assistants for student support, content retrieval, and admissions workflows.",
      },
      {
        name: "Financial Services",
        description:
          "Automation for document processing, compliance checks, and client query handling.",
      },
      {
        name: "Healthcare Administration",
        description:
          "Non-clinical workflow automation for scheduling, records, and administrative communication.",
      },
      {
        name: "Professional Services",
        description:
          "Knowledge assistants and reporting automation for consulting and advisory teams.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Discovery & Automation Audit",
        description:
          "I map your existing workflows, identify automation opportunities, and define measurable success criteria.",
      },
      {
        step: "02",
        title: "Architecture & Agent Design",
        description:
          "System architecture, agent roles, and data pipelines are designed around your existing tools and infrastructure.",
      },
      {
        step: "03",
        title: "Build & Integration",
        description:
          "Agents, RAG pipelines, and automation layers are engineered and integrated into your live business systems.",
      },
      {
        step: "04",
        title: "Testing & Guardrails",
        description:
          "Rigorous evaluation, safety guardrails, and human-in-the-loop checkpoints are put in place before launch.",
      },
      {
        step: "05",
        title: "Deployment & Optimization",
        description:
          "Systems go live with ongoing monitoring, performance tuning, and iterative improvement cycles.",
      },
    ],
    whyChooseUs: [
      {
        title: "Engineering-First Approach",
        description:
          "Every AI system I build follows production architecture standards, not prototype-grade scripts.",
      },
      {
        title: "Cross-Domain Expertise",
        description:
          "Hands-on experience spanning AI, cloud infrastructure, and enterprise software means systems that actually integrate.",
      },
      {
        title: "Outcome-Driven Delivery",
        description:
          "Every engagement is tied to a measurable operational outcome, not just a technical deliverable.",
      },
      {
        title: "Direct, Long-Term Involvement",
        description:
          "You work with me directly, with continued support after launch rather than a one-time handoff.",
      },
    ],
    ctaHeadline: "Automate What's Slowing Your Business Down",
    ctaDescription:
      "Talk to me directly about your operations and discover where agentic AI and automation can remove manual bottlenecks across your organization.",
  },

  "cloud-infrastructure": {
    slug: "cloud-infrastructure",
    label: "Cloud / DevOps",
    navLabel: "Cloud Infrastructure",
    title: "Cloud Infrastructure",
    icon: Cloud,
    heroImage: "/mab-about-image-2.webp",
    heroHeadline: "Cloud Architecture Engineered for Scale and Reliability",
    heroSubheading: "Cloud Infrastructure",
    heroDescription:
      "I design and operate cloud-native infrastructure, SaaS deployment pipelines, and DevOps systems that keep platforms fast, secure, and reliable as they scale, built on modern CI/CD and reliability engineering practices.",
    metaTitle:
      "Cloud Infrastructure by Mian Ahmad Basit — Cloud Architecture & DevOps",
    metaDescription:
      "Mian Ahmad Basit, CEO of P2P Clouds, builds cloud architecture, SaaS deployment pipelines, DevOps, CI/CD systems, and reliability engineering for scalable platforms.",
    keywords: [
      "Mian Ahmad Basit cloud architecture",
      "P2P Clouds infrastructure",
      "SaaS deployment Pakistan",
      "DevOps consulting Lahore",
      "CI/CD pipeline setup",
      "infrastructure modernization",
      "cloud security architecture",
      "site reliability engineering",
    ],
    overviewTitle: "Infrastructure That Doesn't Slow You Down",
    overviewParagraphs: [
      "Cloud infrastructure is the operational backbone of everything I build at P2P Clouds, covering how applications are architected, deployed, secured, and kept running at scale. I design cloud-native systems built to handle real production load, not just pass a demo.",
      "My work spans full cloud architecture design, SaaS deployment pipelines, containerized infrastructure, and CI/CD systems that let teams ship faster without sacrificing stability. I modernize legacy infrastructure into resilient, cloud-native environments with proper observability and security from day one.",
      "The goal is simple: infrastructure that scales quietly in the background while your product and business move forward.",
    ],
    overviewStats: [
      { label: "Founder & CEO", value: "P2P Clouds" },
      { label: "Years in Cloud & SaaS Engineering", value: "10+" },
      { label: "CTO Roles Held", value: "PBI & ANZ Tech" },
    ],
    personalNoteTitle: "Why I Focus Here",
    personalNote:
      "I have watched too many good products get held back by infrastructure that was never built to scale. At P2P Clouds, reliability is not an afterthought, it is the foundation everything else is built on.",
    capabilitiesTitle: "How I Help",
    capabilitiesDescription:
      "Infrastructure capabilities I personally apply across P2P Clouds and client engagements, designed around real traffic and real growth.",
    capabilities: [
      {
        title: "Cloud Architecture",
        description:
          "Scalable, fault-tolerant cloud architectures designed around real traffic patterns and growth projections.",
        icon: Cloud,
      },
      {
        title: "SaaS Deployment",
        description:
          "Multi-tenant deployment pipelines and infrastructure tailored for subscription-based software products.",
        icon: Boxes,
      },
      {
        title: "DevOps Engineering",
        description:
          "End-to-end DevOps practices connecting development, operations, and release management into one workflow.",
        icon: GitBranch,
      },
      {
        title: "CI/CD Pipelines",
        description:
          "Automated build, test, and deployment pipelines that ship code safely and consistently, every time.",
        icon: Workflow,
      },
      {
        title: "Infrastructure Modernization",
        description:
          "Migration of legacy systems into containerized, cloud-native architectures with minimal downtime.",
        icon: ServerCog,
      },
      {
        title: "Cloud Security",
        description:
          "Network segmentation, identity controls, and security hardening applied across every infrastructure layer.",
        icon: Lock,
      },
      {
        title: "Reliability Engineering",
        description:
          "Monitoring, alerting, and incident-response systems built to keep platforms available under real load.",
        icon: Radar,
      },
      {
        title: "Platform Operations",
        description:
          "Ongoing infrastructure operations, cost optimization, and capacity planning for growing platforms.",
        icon: Layers,
      },
    ],
    solutions: [
      {
        title: "SaaS Platform Scaling",
        description:
          "Re-architecting monolithic SaaS backends into scalable, multi-tenant cloud infrastructure with automated deployments.",
        outcome: "Higher concurrent user capacity with stable performance.",
      },
      {
        title: "Zero-Downtime Migration",
        description:
          "Migrating legacy on-premise or single-server systems to cloud-native infrastructure without service interruption.",
        outcome: "A seamless transition with no customer-facing downtime.",
      },
      {
        title: "CI/CD Modernization",
        description:
          "Replacing manual deployment processes with automated pipelines for testing, staging, and production releases.",
        outcome: "Faster, safer releases with fewer production incidents.",
      },
      {
        title: "Cost & Capacity Optimization",
        description:
          "Right-sizing infrastructure, eliminating idle resources, and implementing autoscaling based on real usage.",
        outcome: "Lower cloud spend without sacrificing performance.",
      },
    ],
    benefits: [
      {
        title: "Improved System Uptime",
        description:
          "Reliability engineering and proactive monitoring minimize unplanned downtime.",
        metric: "Built for consistent platform availability",
      },
      {
        title: "Faster Release Cycles",
        description:
          "Automated CI/CD pipelines reduce the time from code commit to production.",
        metric: "Shorter time from commit to release",
      },
      {
        title: "Lower Infrastructure Cost",
        description:
          "Right-sized, optimized cloud environments reduce unnecessary spend.",
        metric: "Leaner cloud spend without losing performance",
      },
      {
        title: "Stronger Security Posture",
        description:
          "Hardened infrastructure reduces exposure to breaches and misconfigurations.",
        metric: "Fewer critical exposures at the infrastructure layer",
      },
    ],
    industries: [
      {
        name: "SaaS Platforms",
        description:
          "Multi-tenant infrastructure built for subscription software at scale.",
      },
      {
        name: "Fintech & Payments",
        description:
          "High-availability infrastructure with strict security and compliance needs.",
      },
      {
        name: "E-Commerce",
        description:
          "Infrastructure that handles seasonal traffic spikes without degradation.",
      },
      {
        name: "EdTech Platforms",
        description:
          "Scalable backends supporting concurrent learners and content delivery.",
      },
      {
        name: "Healthcare Systems",
        description:
          "Secure, compliant cloud environments for sensitive operational data.",
      },
      {
        name: "Enterprise IT",
        description:
          "Modernization of internal systems into cloud-native operating environments.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Infrastructure Assessment",
        description:
          "I map your current architecture, bottlenecks, and risk areas against your business and scaling goals.",
      },
      {
        step: "02",
        title: "Architecture Design",
        description:
          "I design a target cloud architecture covering compute, networking, storage, and security layers.",
      },
      {
        step: "03",
        title: "Pipeline & Automation Build",
        description:
          "CI/CD pipelines, infrastructure-as-code, and deployment automation are implemented end to end.",
      },
      {
        step: "04",
        title: "Migration & Hardening",
        description:
          "Systems are migrated or modernized with zero-downtime strategies and security hardening applied.",
      },
      {
        step: "05",
        title: "Monitoring & Optimization",
        description:
          "I establish observability, alerting, and continuous cost and performance optimization after launch.",
      },
    ],
    whyChooseUs: [
      {
        title: "Production-Grade Standards",
        description:
          "Infrastructure is built to handle real production load from day one, not just pass a staging test.",
      },
      {
        title: "Security-Conscious by Default",
        description:
          "Cloud security is built into architecture decisions, not bolted on afterward.",
      },
      {
        title: "Cost-Aware Engineering",
        description:
          "Every architecture decision considers long-term operational cost, not just initial setup.",
      },
      {
        title: "Hands-On Operational Support",
        description:
          "I stay involved with ongoing platform operations and incident response, not just a one-time deployment.",
      },
    ],
    ctaHeadline: "Build Infrastructure That Scales With You",
    ctaDescription:
      "Tell me about your current architecture and let's find out where cloud modernization, automation, and reliability engineering can strengthen your platform.",
  },

  "blockchain-institute": {
    slug: "blockchain-institute",
    label: "Web3 / Systems",
    navLabel: "Blockchain Institute",
    title: "Blockchain Institute",
    icon: WalletCards,
    heroImage: "/mab-about-image-3.webp",
    heroHeadline: "Web3 Engineering, Education, and Ecosystem Development",
    heroSubheading: "Blockchain Institute",
    heroDescription:
      "As CTO of the Pakistan Blockchain Institute, I combine hands-on Web3 development with structured blockchain education, building smart contracts, decentralized applications, and training the next generation of blockchain developers.",
    metaTitle:
      "Blockchain Work by Mian Ahmad Basit — Web3 Development & Education",
    metaDescription:
      "Mian Ahmad Basit, CTO of the Pakistan Blockchain Institute, builds Web3 systems, smart contracts, decentralized applications, and developer training programs.",
    keywords: [
      "Mian Ahmad Basit blockchain",
      "Pakistan Blockchain Institute CTO",
      "Web3 development services",
      "smart contract development Pakistan",
      "decentralized application development",
      "blockchain developer training Lahore",
      "Web3 ecosystem Pakistan",
      "blockchain education Pakistan",
    ],
    overviewTitle: "Building and Teaching the Decentralized Web",
    overviewParagraphs: [
      "As CTO of the Pakistan Blockchain Institute, I work at the intersection of engineering and education, building real Web3 systems while training the developers who will maintain the next generation of decentralized infrastructure.",
      "On the engineering side, I design and review smart contracts, build decentralized applications, and architect systems around verifiable digital ownership. On the education side, I run structured developer training that takes engineers from foundational blockchain concepts to production-ready Web3 development.",
      "This dual focus means every training program is grounded in systems that have actually been built and shipped, and every engineering engagement benefits from a network of trained Web3 talent I have personally mentored.",
    ],
    overviewStats: [
      { label: "CTO", value: "Pakistan Blockchain Institute" },
      { label: "Learners Trained Across Programs", value: "50,000+" },
      { label: "Years in Web3 & Software Engineering", value: "10+" },
    ],
    personalNoteTitle: "Why I Focus Here",
    personalNote:
      "Blockchain only matters if people understand how to build on it responsibly. Half of my work here is engineering, and the other half is making sure the next generation of Pakistani developers can do this work themselves.",
    capabilitiesTitle: "How I Help",
    capabilitiesDescription:
      "Engineering and education capabilities I lead personally as CTO of the Pakistan Blockchain Institute.",
    capabilities: [
      {
        title: "Blockchain Education",
        description:
          "Structured curricula covering blockchain fundamentals, consensus mechanisms, and decentralized system design.",
        icon: BookOpen,
      },
      {
        title: "Web3 Development",
        description:
          "Full-stack Web3 engineering connecting on-chain logic with modern frontend and backend systems.",
        icon: Code2,
      },
      {
        title: "Smart Contracts",
        description:
          "Secure, reviewed smart contract development for tokenization, governance, and automated agreements.",
        icon: FileCheck2,
      },
      {
        title: "Decentralized Applications",
        description:
          "End-to-end dApp development spanning wallet integration, on-chain data, and user-facing interfaces.",
        icon: Boxes,
      },
      {
        title: "Ecosystem Growth",
        description:
          "Community and partnership programs that expand adoption and strengthen Web3 ecosystem participation.",
        icon: Network,
      },
      {
        title: "Research Programs",
        description:
          "Applied research into emerging blockchain protocols, scalability models, and decentralized governance.",
        icon: ScanSearch,
      },
      {
        title: "Developer Training",
        description:
          "Hands-on cohorts and mentorship that turn engineers into production-ready blockchain developers.",
        icon: Users,
      },
      {
        title: "Digital Ownership",
        description:
          "Systems for verifiable digital ownership, asset provenance, and tokenized representation of real-world value.",
        icon: KeyRound,
      },
    ],
    solutions: [
      {
        title: "Tokenization Platforms",
        description:
          "Smart contract systems that represent real-world or digital assets as verifiable, tradable tokens.",
        outcome: "Transparent, auditable ownership records on-chain.",
      },
      {
        title: "Decentralized Identity Systems",
        description:
          "dApps that give users verifiable, self-managed digital identity across platforms and services.",
        outcome: "Less reliance on centralized identity providers.",
      },
      {
        title: "Cohort-Based Developer Training",
        description:
          "Structured training programs that take engineers from Web2 backgrounds into production Web3 development.",
        outcome: "A trained pipeline of job-ready blockchain developers.",
      },
      {
        title: "Smart Contract Review",
        description:
          "Security-focused review and hardening of existing smart contracts before mainnet deployment.",
        outcome: "Lower risk of exploits and contract-level vulnerabilities.",
      },
    ],
    benefits: [
      {
        title: "Verified Digital Ownership",
        description:
          "Smart contracts provide transparent, tamper-resistant records of ownership and transactions.",
        metric: "Fully auditable on-chain records",
      },
      {
        title: "Faster Ecosystem Onboarding",
        description:
          "Structured education accelerates developer readiness for live Web3 projects.",
        metric: "Quicker ramp-up for new blockchain teams",
      },
      {
        title: "Reduced Contract Risk",
        description:
          "Security-focused development and review reduce exposure to common exploit vectors.",
        metric: "Fewer common vulnerability patterns",
      },
      {
        title: "Stronger Talent Pipeline",
        description:
          "Developers I have personally trained are available to support ongoing Web3 product development.",
        metric: "50,000+ learners trained across programs",
      },
    ],
    industries: [
      {
        name: "Fintech & DeFi",
        description:
          "Smart contract systems for decentralized financial products and asset management.",
      },
      {
        name: "Education Technology",
        description:
          "Credentialing and certification systems built on verifiable blockchain records.",
      },
      {
        name: "Supply Chain & Logistics",
        description:
          "Provenance and traceability systems using on-chain verification.",
      },
      {
        name: "Gaming & Digital Collectibles",
        description:
          "Token-based ownership systems for in-game assets and digital collectibles.",
      },
      {
        name: "Public & Government Systems",
        description:
          "Research into transparent, verifiable record-keeping for public infrastructure.",
      },
      {
        name: "Startups & Web3 Founders",
        description:
          "End-to-end dApp and tokenomics development for early-stage Web3 ventures.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Use-Case Definition",
        description:
          "I define whether the engagement is engineering-led, education-led, or both, and scope outcomes accordingly.",
      },
      {
        step: "02",
        title: "Architecture & Curriculum Design",
        description:
          "Smart contract architecture or training curriculum is designed around the specific protocol and goals.",
      },
      {
        step: "03",
        title: "Build / Training Delivery",
        description:
          "Contracts and dApps are developed, or cohorts are guided through structured, hands-on training modules.",
      },
      {
        step: "04",
        title: "Review & Assessment",
        description:
          "Security review of contracts, or skills assessment of trained developers, happens before final delivery.",
      },
      {
        step: "05",
        title: "Launch & Ecosystem Support",
        description:
          "I provide mainnet deployment support or post-program mentorship and ecosystem integration.",
      },
    ],
    whyChooseUs: [
      {
        title: "Engineering-Backed Education",
        description:
          "Every training program is built on real, shipped blockchain systems, not theoretical content.",
      },
      {
        title: "Security-First Contract Development",
        description:
          "Smart contracts are built and reviewed with a security-first mindset from day one.",
      },
      {
        title: "Proven Training Track Record",
        description:
          "A track record of training developers who go on to work in production Web3 environments.",
      },
      {
        title: "Research-Informed Engineering",
        description:
          "Active research into emerging protocols keeps my engineering practices current and forward-looking.",
      },
    ],
    ctaHeadline: "Build or Learn Web3 the Right Way",
    ctaDescription:
      "Whether you need a smart contract system engineered or your team trained in blockchain development, let's scope the right path forward together.",
  },

  "security-systems": {
    slug: "security-systems",
    label: "Cybersecurity",
    navLabel: "Security Systems",
    title: "Security Systems",
    icon: ShieldCheck,
    heroImage: "/speaking-mab.webp",
    heroHeadline:
      "Resilient Security Operations for Modern Digital Infrastructure",
    heroSubheading: "Security Systems",
    heroDescription:
      "I build security operations, threat monitoring, and compliance frameworks that protect digital infrastructure end to end, combining vulnerability assessments, identity management, and risk-based security audits.",
    metaTitle:
      "Security Systems by Mian Ahmad Basit — Threat Monitoring & Compliance",
    metaDescription:
      "Mian Ahmad Basit builds security operations, threat monitoring, vulnerability assessments, identity management, compliance, and security audits.",
    keywords: [
      "Mian Ahmad Basit cybersecurity",
      "security operations Pakistan",
      "threat monitoring solutions",
      "vulnerability assessment services",
      "identity management systems",
      "compliance and risk management",
      "security audit services Lahore",
      "cybersecurity consulting Pakistan",
    ],
    overviewTitle: "Security Built Into the System, Not Bolted On",
    overviewParagraphs: [
      "I have spent years speaking publicly about digital fraud and online safety, from TV interviews to community sessions, because most security failures come from gaps that were never closed in the first place. Security Systems is where I apply that same thinking to the infrastructure, applications, and data businesses depend on every day.",
      "Rather than treating security as a final checklist item, I build protection into architecture, operations, and governance from the ground up. My work spans continuous threat monitoring, structured vulnerability assessments, identity and access management, and compliance programs aligned with recognized security frameworks.",
      "Each engagement is grounded in risk management, identifying what matters most and protecting it first, so the result is a layered security posture that holds up under real-world conditions.",
    ],
    overviewStats: [
      { label: "Years in Tech Leadership", value: "10+" },
      { label: "Media Appearances on Cyber Safety", value: "20+" },
      { label: "CTO Roles in Security-Critical Orgs", value: "2" },
    ],
    personalNoteTitle: "Why I Focus Here",
    personalNote:
      "I have sat across from people who lost money to fraud that better security habits could have prevented. That is what drives this work: building systems and raising awareness so fewer people end up in that position.",
    capabilitiesTitle: "How I Help",
    capabilitiesDescription:
      "Security capabilities I personally apply across client infrastructure, designed to detect issues early and hold up under audit.",
    capabilities: [
      {
        title: "Security Operations",
        description:
          "Continuous monitoring and incident response operations that detect and contain threats in real time.",
        icon: Radar,
      },
      {
        title: "Threat Monitoring",
        description:
          "Ongoing visibility into network, application, and endpoint activity to catch anomalies before they escalate.",
        icon: ScanSearch,
      },
      {
        title: "Vulnerability Assessments",
        description:
          "Systematic identification and prioritization of security weaknesses across infrastructure and applications.",
        icon: Layers,
      },
      {
        title: "Identity Management",
        description:
          "Access control, authentication, and identity governance systems that limit exposure from compromised accounts.",
        icon: KeyRound,
      },
      {
        title: "Compliance",
        description:
          "Security programs aligned with recognized frameworks and regulatory requirements for your industry.",
        icon: FileCheck2,
      },
      {
        title: "Risk Management",
        description:
          "Structured risk assessment and mitigation planning that prioritizes protection by business impact.",
        icon: Compass,
      },
      {
        title: "Security Audits",
        description:
          "In-depth audits of systems, configurations, and policies against industry best practices.",
        icon: ShieldCheck,
      },
      {
        title: "Digital Protection",
        description:
          "Layered defenses across network, application, and data layers designed to resist sophisticated attacks.",
        icon: Lock,
      },
    ],
    solutions: [
      {
        title: "Continuous Threat Monitoring",
        description:
          "Real-time monitoring systems that flag suspicious activity across infrastructure and applications around the clock.",
        outcome: "Faster threat detection and reduced incident response time.",
      },
      {
        title: "Pre-Launch Security Audits",
        description:
          "Comprehensive security review of applications and infrastructure before public launch or major release.",
        outcome: "Vulnerabilities resolved before they reach production.",
      },
      {
        title: "Identity & Access Hardening",
        description:
          "Implementation of strong authentication, role-based access, and identity governance across systems.",
        outcome: "Lower risk from compromised or over-privileged accounts.",
      },
      {
        title: "Compliance Readiness Programs",
        description:
          "Structured programs that prepare organizations for security certifications and regulatory audits.",
        outcome:
          "An audit-ready posture with documented controls and policies.",
      },
    ],
    benefits: [
      {
        title: "Reduced Breach Risk",
        description:
          "Proactive vulnerability management and monitoring significantly lower the chance of successful attacks.",
        metric: "Earlier detection of suspicious activity",
      },
      {
        title: "Faster Incident Response",
        description:
          "Structured security operations reduce the time between detection and containment.",
        metric: "Shorter time from detection to containment",
      },
      {
        title: "Audit & Compliance Readiness",
        description:
          "Documented controls and processes simplify regulatory and certification audits.",
        metric: "A smoother path to certification",
      },
      {
        title: "Stronger Stakeholder Trust",
        description:
          "Demonstrated security maturity builds confidence with customers, partners, and investors.",
        metric: "Greater confidence from clients and partners",
      },
    ],
    industries: [
      {
        name: "Financial Services",
        description:
          "High-assurance security and compliance programs for sensitive financial data.",
      },
      {
        name: "Healthcare & Health-Tech",
        description:
          "Protection of sensitive patient and operational data against unauthorized access.",
      },
      {
        name: "SaaS & Technology",
        description:
          "Application-level security audits and continuous monitoring for cloud software.",
      },
      {
        name: "E-Commerce",
        description:
          "Protection of payment systems, customer data, and transaction infrastructure.",
      },
      {
        name: "Government & Public Sector",
        description:
          "Risk management and compliance alignment for public-facing digital systems.",
      },
      {
        name: "Education Platforms",
        description:
          "Identity management and data protection for student and institutional records.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Risk & Exposure Assessment",
        description:
          "I map your current security posture, assets, and risk exposure across infrastructure and applications.",
      },
      {
        step: "02",
        title: "Vulnerability Assessment",
        description:
          "Systematic testing identifies and prioritizes vulnerabilities based on real business impact.",
      },
      {
        step: "03",
        title: "Remediation & Hardening",
        description:
          "Identified issues are remediated, and systems are hardened against identified attack vectors.",
      },
      {
        step: "04",
        title: "Monitoring Implementation",
        description:
          "Continuous threat monitoring and alerting systems are deployed across critical infrastructure.",
      },
      {
        step: "05",
        title: "Audit & Continuous Improvement",
        description:
          "Independent review and ongoing risk reviews ensure the security posture evolves with new threats.",
      },
    ],
    whyChooseUs: [
      {
        title: "Risk-Based Methodology",
        description:
          "Security investment is prioritized by actual business risk, not generic checklists.",
      },
      {
        title: "Cross-Stack Visibility",
        description:
          "Deep familiarity with cloud, application, and identity layers means threats are caught across the full stack.",
      },
      {
        title: "Compliance-Aware Engineering",
        description:
          "Security programs are designed with regulatory and certification requirements in mind from the start.",
      },
      {
        title: "Public Awareness Track Record",
        description:
          "I regularly speak on TV and radio about digital fraud, bringing real-world threat awareness into every engagement.",
      },
    ],
    ctaHeadline: "Strengthen Your Security Posture Today",
    ctaDescription:
      "Let's get a clear picture of your current risk exposure and build a practical roadmap toward a more resilient, audit-ready security program.",
  },

  "learning-pathways": {
    slug: "learning-pathways",
    label: "Learning / Skills",
    navLabel: "Learning Pathways",
    title: "Learning Pathways",
    icon: GraduationCap,
    heroImage: "/companies/skill_ustad_0.webp",
    heroHeadline:
      "Practical Technology Education Built for Career Acceleration",
    heroSubheading: "Learning Pathways",
    heroDescription:
      "Through my work in technology education, I deliver industry-aligned learning that combines practical skills, certification, and mentorship to help students progress from foundational knowledge to job-ready expertise.",

    metaTitle:
      "Technology Education by Mian Ahmad Basit — Practical AI, Web & Cloud Training",

    metaDescription:
      "Mian Ahmad Basit delivers practical technology education in AI, web development, cloud computing, and related fields, focused on skills, certification, mentorship, and career outcomes.",

    keywords: [
      "Mian Ahmad Basit instructor",
      "Mian Ahmad Basit technology education",
      "technology education Pakistan",
      "technology training Pakistan",
      "career acceleration training Pakistan",
      "AI training Pakistan",
      "web development training Pakistan",
      "cloud computing training Pakistan",
      "certification programs technology",
      "practical technology learning",
      "job ready technology skills",
      "technology mentorship Pakistan",
    ],
    overviewTitle: "Education Measured by Career Outcomes",
    overviewParagraphs: [
      "As a technology education leader and instructor, I have spent years turning technology education into real career outcomes. My programs are built around the skills the market actually demands, not generic curricula disconnected from industry reality.",

      "Every learning pathway blends structured technical training with practical, project-based learning, supported by certification that validates skills against recognized standards. I personally mentor learners through Web Development, AI, and cloud tracks, because career guidance should never be an afterthought.",

      "The result is a learning experience that has helped move over 50,000 students and professionals from foundational knowledge toward industry readiness, backed by a track record built one learner and one cohort at a time.",
    ],
    overviewStats: [
      { label: "Learners Trained", value: "50,000+" },
      { label: "R&D Director", value: "SkillUstad" },
      { label: "Instructor", value: "Arfa Tower" },
    ],
    personalNoteTitle: "Why I Focus Here",
    personalNote:
      "Teaching has shaped my career as much as building products has. Watching a student go from confused to confident in a tool I taught them is one of the most rewarding parts of what I do.",
    capabilitiesTitle: "How I Help",
    capabilitiesDescription:
      "Education capabilities I personally deliver, built around practical skills, industry relevance, and measurable career outcomes rather than course completion alone.",
    capabilities: [
      {
        title: "Technology Education",
        description:
          "Structured curricula across AI, software development, cloud, and emerging technologies.",
        icon: BookOpen,
      },
      {
        title: "Career Acceleration",
        description:
          "Career-focused guidance, portfolio building, and job-readiness support built into every program.",
        icon: Rocket,
      },
      {
        title: "Skill Development",
        description:
          "Hands-on skill-building tracks designed around real industry tools and workflows.",
        icon: Sparkles,
      },
      {
        title: "Certification Programs",
        description:
          "Recognized certification pathways that validate competency to employers and clients.",
        icon: Award,
      },
      {
        title: "Practical Learning",
        description:
          "Project-based learning models that mirror real-world technical and business problems.",
        icon: Code2,
      },
      {
        title: "Industry Readiness",
        description:
          "Curriculum continuously updated to reflect current industry expectations and hiring standards.",
        icon: Briefcase,
      },
      {
        title: "Professional Development",
        description:
          "Ongoing upskilling tracks for working professionals advancing within their current roles.",
        icon: LineChart,
      },
      {
        title: "Student Success",
        description:
          "Mentorship, progress tracking, and support systems built around individual learner outcomes.",
        icon: Users,
      },
    ],
    solutions: [
      {
        title: "Cohort-Based Bootcamps",
        description:
          "Intensive, structured cohorts that take learners from fundamentals to job-ready skills in focused timeframes.",
        outcome: "Job-ready graduates with portfolio-backed technical skills.",
      },
      {
        title: "Corporate Upskilling Programs",
        description:
          "Custom training tracks designed for organizations upskilling existing technical teams.",
        outcome: "Teams equipped with current, industry-relevant skill sets.",
      },
      {
        title: "Certification Pathways",
        description:
          "Structured programs leading to recognized certifications that strengthen employability.",
        outcome:
          "Certified professionals with validated, market-recognized skills.",
      },
      {
        title: "Mentorship-Driven Career Tracks",
        description:
          "One-on-one mentorship combined with structured learning to accelerate individual career trajectories.",
        outcome:
          "Faster transitions into technical roles with ongoing guidance.",
      },
    ],
    benefits: [
      {
        title: "Faster Career Transitions",
        description:
          "Practical, project-based learning accelerates readiness for technical roles.",
        metric: "Reduced time-to-employment for graduates",
      },
      {
        title: "Validated Skill Credentials",
        description:
          "Certification programs give learners recognized proof of competency.",
        metric: "Industry-recognized certification outcomes",
      },
      {
        title: "Higher Learner Engagement",
        description:
          "Mentorship and practical projects keep learners engaged and progressing.",
        metric: "Strong program completion rates",
      },
      {
        title: "Workforce-Ready Talent",
        description:
          "Organizations gain access to a pipeline of practically trained, job-ready talent.",
        metric: "50,000+ learners trained to date",
      },
    ],
    industries: [
      {
        name: "Technology & Software",
        description:
          "Technical training pipelines feeding software and product development teams.",
      },
      {
        name: "Higher Education",
        description:
          "Partnership programs with universities to supplement academic technical training.",
      },
      {
        name: "Corporate Enterprises",
        description:
          "Internal upskilling programs for teams adapting to new technologies.",
      },
      {
        name: "Startups & Founders",
        description:
          "Practical technical training for early-stage teams building their first products.",
      },
      {
        name: "Government Skill Initiatives",
        description:
          "Large-scale digital skills programs aligned with national workforce development goals.",
      },
      {
        name: "Freelance & Remote Professionals",
        description:
          "Skill and certification tracks for independent professionals building global careers.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Skill Gap Assessment",
        description:
          "I assess learner or organizational skill gaps against current industry and role requirements.",
      },
      {
        step: "02",
        title: "Pathway Design",
        description:
          "A structured learning pathway is built, combining curriculum, projects, and certification milestones.",
      },
      {
        step: "03",
        title: "Guided Learning Delivery",
        description:
          "Cohort or self-paced learning is delivered with direct mentorship and practical project checkpoints.",
      },
      {
        step: "04",
        title: "Certification & Assessment",
        description:
          "Learners are assessed against defined competency standards and certified accordingly.",
      },
      {
        step: "05",
        title: "Career Transition Support",
        description:
          "I personally support portfolio review, interview preparation, and ongoing mentorship through the transition to employment.",
      },
    ],
    whyChooseUs: [
      {
        title: "Industry-Aligned Curriculum",
        description:
          "Programs are built and continuously updated based on real hiring requirements, not static syllabi.",
      },
      {
        title: "Proven Track Record",
        description:
          "A history of training over 50,000 learners across a wide range of technology disciplines through practical, industry-focused education.",
      },
      {
        title: "Mentorship-Centered Model",
        description:
          "Every learner has access to direct mentorship from me, not just pre-recorded content.",
      },
      {
        title: "Outcome-Focused Programs",
        description:
          "Success is measured by career outcomes and skill validation, not just course completion.",
      },
    ],
    ctaHeadline: "Start Your Technology Career Pathway",
    ctaDescription:
      "Explore structured, mentorship-backed learning pathways with me, designed to take you from foundational skills to industry readiness.",
  },

  "consulting-services": {
    slug: "consulting-services",
    label: "Strategy / Build",
    navLabel: "Consulting Services",
    title: "Consulting Services",
    icon: Building2,
    heroImage: "/mab.webp",
    heroHeadline: "Founder-Led Strategy for Digital Transformation and Growth",
    heroSubheading: "Consulting Services",
    heroDescription:
      "I provide hands-on technical and strategic advisory for organizations navigating AI adoption, cloud strategy, SaaS growth, and digital transformation, bridging the gap between strategy and execution.",
    metaTitle:
      "Consulting by Mian Ahmad Basit — Digital Transformation & AI Strategy",
    metaDescription:
      "Mian Ahmad Basit provides founder-led consulting for digital transformation, AI adoption strategy, SaaS growth, cloud strategy, and operational excellence.",
    keywords: [
      "Mian Ahmad Basit consulting",
      "digital transformation consulting Pakistan",
      "AI adoption strategy consulting",
      "SaaS growth advisory",
      "cloud strategy consulting Lahore",
      "product strategy consulting",
      "technical advisory services Pakistan",
      "business modernization strategy",
    ],
    overviewTitle: "Strategy That's Grounded in Execution",
    overviewParagraphs: [
      "Strategy without execution experience tends to produce plans that never survive contact with reality. My consulting work is grounded in actually having built and scaled AI systems, cloud platforms, and SaaS products as CEO of P2P Clouds and CTO of Pakistan Blockchain Institute and ANZ Technologies.",
      "Engagements range from focused AI adoption roadmaps to full digital transformation programs spanning product strategy, cloud strategy, and operational redesign. My approach is direct: understand the business model, identify the highest-leverage technical and operational changes, and define a realistic path to implement them.",
      "This is advisory for founders and executive teams who want a technical partner who understands both the strategic question and the engineering reality behind the answer, because I have personally lived through both sides.",
    ],
    overviewStats: [
      { label: "Years of Executive Leadership", value: "13+" },
      { label: "Leadership Roles Held", value: "CEO & CTO" },
      { label: "Learners & Teams Mentored", value: "50,000+" },
    ],
    personalNoteTitle: "Why I Focus Here",
    personalNote:
      "Every strategic recommendation I make has already been tested somewhere in my own work, whether at P2P Clouds, MABSOL, or one of the institutes I lead. I do not advise from the sidelines.",
    capabilitiesTitle: "How I Help",
    capabilitiesDescription:
      "Strategic capabilities I bring personally to founders and leadership teams, shaped by what I have actually built across AI, cloud, and Web3.",
    capabilities: [
      {
        title: "Digital Transformation",
        description:
          "End-to-end transformation strategy spanning technology, process, and organizational change.",
        icon: Compass,
      },
      {
        title: "AI Adoption Strategy",
        description:
          "Practical roadmaps for integrating AI into existing products, operations, and decision-making.",
        icon: Sparkles,
      },
      {
        title: "SaaS Growth",
        description:
          "Growth-focused advisory covering product, pricing, and scaling strategy for SaaS businesses.",
        icon: LineChart,
      },
      {
        title: "Cloud Strategy",
        description:
          "Strategic cloud planning aligned with business goals, cost constraints, and growth trajectory.",
        icon: Cloud,
      },
      {
        title: "Product Strategy",
        description:
          "Roadmap and positioning guidance grounded in market reality and technical feasibility.",
        icon: Layers,
      },
      {
        title: "Technical Advisory",
        description:
          "Hands-on technical guidance for founders and leadership navigating architecture and build decisions.",
        icon: Code2,
      },
      {
        title: "Operational Excellence",
        description:
          "Process redesign and operational improvements that increase efficiency without adding overhead.",
        icon: ServerCog,
      },
      {
        title: "Business Modernization",
        description:
          "Strategic modernization of legacy business models and systems for the digital-first market.",
        icon: Building2,
      },
    ],
    solutions: [
      {
        title: "AI Adoption Roadmaps",
        description:
          "Practical, phased plans for integrating AI capabilities into existing products and operations.",
        outcome: "A clear, de-risked path from AI interest to live deployment.",
      },
      {
        title: "SaaS Scaling Strategy",
        description:
          "Strategic advisory covering pricing, retention, and infrastructure decisions during high-growth phases.",
        outcome:
          "Sustainable growth without operational or technical collapse.",
      },
      {
        title: "Executive Technical Advisory",
        description:
          "Ongoing advisory retained by founders and executives for major architecture and technology decisions.",
        outcome:
          "Confident, technically sound decision-making at the leadership level.",
      },
      {
        title: "Operational Modernization Programs",
        description:
          "Full-scale redesign of outdated operational processes using modern digital tools and automation.",
        outcome: "Leaner, faster operations with less manual dependency.",
      },
    ],
    benefits: [
      {
        title: "Faster Strategic Clarity",
        description:
          "Founder-led advisory cuts through ambiguity to define clear, executable priorities.",
        metric: "Roadmaps delivered in weeks, not months",
      },
      {
        title: "Reduced Execution Risk",
        description:
          "Strategy is grounded in real technical feasibility, reducing the risk of failed initiatives.",
        metric: "Plans tested against engineering reality",
      },
      {
        title: "Stronger Growth Trajectory",
        description:
          "SaaS and product strategy advisory directly supports sustainable revenue growth.",
        metric: "Strategy aligned to durable growth, not vanity metrics",
      },
      {
        title: "Leadership Confidence",
        description:
          "Executive teams gain a trusted technical partner for high-stakes decisions.",
        metric: "13+ years of applied executive experience",
      },
    ],
    industries: [
      {
        name: "SaaS & Technology Startups",
        description:
          "Strategic advisory for product, growth, and technical scaling decisions.",
      },
      {
        name: "Enterprise Organizations",
        description:
          "Digital transformation and modernization programs for established enterprises.",
      },
      {
        name: "Financial Services",
        description:
          "Technology and AI adoption strategy aligned with regulatory and risk considerations.",
      },
      {
        name: "Education Institutions",
        description:
          "Digital transformation advisory for academic and training organizations.",
      },
      {
        name: "Government & Public Sector",
        description:
          "Strategic guidance on digital modernization for public-facing systems.",
      },
      {
        name: "Non-Profit Organizations",
        description:
          "Operational and digital strategy advisory for mission-driven organizations.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Strategic Discovery",
        description:
          "I assess your business model, goals, and current technical and operational reality in depth.",
      },
      {
        step: "02",
        title: "Opportunity Mapping",
        description:
          "I identify and prioritize the highest-leverage opportunities for transformation, AI adoption, or growth.",
      },
      {
        step: "03",
        title: "Roadmap Development",
        description:
          "I develop a phased, realistic roadmap with clear milestones and resource requirements.",
      },
      {
        step: "04",
        title: "Execution Support",
        description:
          "I stay hands-on throughout implementation, making sure strategy translates into actual delivery.",
      },
      {
        step: "05",
        title: "Review & Iteration",
        description:
          "Ongoing review cycles refine the strategy based on real-world results and market feedback.",
      },
    ],
    whyChooseUs: [
      {
        title: "Builder-Led Advisory",
        description:
          "Strategy comes from someone who has actually built and scaled AI, cloud, and SaaS systems himself.",
      },
      {
        title: "Cross-Disciplinary Perspective",
        description:
          "My advisory spans AI, cloud, blockchain, and security, covering the full modern technology stack.",
      },
      {
        title: "Execution-Oriented Strategy",
        description:
          "Every recommendation is filtered through technical feasibility and operational reality.",
      },
      {
        title: "Direct Access, No Layers",
        description:
          "You work directly with me, not a junior consultant relaying decisions back and forth.",
      },
    ],
    ctaHeadline: "Get Strategic Clarity on Your Next Move",
    ctaDescription:
      "Bring me your toughest strategic and technical questions, and let's build a realistic, execution-ready plan for your next phase of growth.",
  },
};

export type EcosystemSlug = keyof typeof ECOSYSTEM_DIVISIONS;

export const ECOSYSTEM_SLUGS = Object.keys(
  ECOSYSTEM_DIVISIONS
) as EcosystemSlug[];
