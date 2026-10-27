export type TopicGroup = { icon: string; title: string; items: string[] };

export type PseoModuleContent = {
  moduleId: string;
  heroHighlight: string;
  heroDescription: string;
  overview: string;
  topicGroups: TopicGroup[];
  faqs: { question: string; answer: string }[];
  keyOutcome: string;
};

export const pseoModules: PseoModuleContent[] = [
  {
    moduleId: "B1",
    heroHighlight: "Meta Ads Mastery",
    heroDescription:
      "Facebook, Instagram, Messenger and WhatsApp ads, built for real client campaigns.",
    overview:
      "A comprehensive Meta Ads track covering ad delivery science, auctions, Business Manager setup, Pixel and Conversion API tracking, creative strategy, audience targeting, automation, and agency-ready client work — learned the way agencies actually run campaigns, not just theory.",
    topicGroups: [
      {
        icon: "target",
        title: "Foundations & Account Setup",
        items: [
          "Meta Ads algorithm and ad delivery science",
          "Ads auction, total value, and quality ranking",
          "Business Manager, ad accounts, access, and billing",
          "Ad account policies and troubleshooting rejections",
          "Learning phase and delivery optimization",
        ],
      },
      {
        icon: "gauge",
        title: "Tracking, Funnels & Optimization",
        items: [
          "Funnels and customer journey mapping",
          "Events Manager and Meta Pixel setup",
          "Advanced tracking and multi-touch attribution",
          "Custom conversions and offline event uploads",
          "Conversion API and server-side tracking",
        ],
      },
      {
        icon: "sparkles",
        title: "Creative, Scaling & Automation",
        items: [
          "Creative strategy, hooks, and ad psychology",
          "Audience targeting, lookalikes, and retargeting",
          "Campaign objectives and placement strategy",
          "Automated rules, ManyChat, WhatsApp, and Zapier",
          "Client hunting, reporting, and agency growth",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need prior ads experience?",
        answer:
          "No — the course starts from Business Manager setup and account fundamentals before moving into advanced strategy.",
      },
      {
        question: "Does this cover WhatsApp and Messenger ads?",
        answer:
          "Yes — click-to-WhatsApp campaigns, Messenger automation, and ManyChat integration are all included.",
      },
      {
        question: "Will I learn how to fix rejected ads?",
        answer:
          "Yes — ad policy troubleshooting and account recovery are covered as a dedicated topic.",
      },
    ],
    keyOutcome:
      "Launch, optimize, and report on a complete Meta Ads campaign, including tracking, creative, and scaling.",
  },
  {
    moduleId: "B2",
    heroHighlight: "Google Ads Mastery",
    heroDescription:
      "Search, Display, Shopping, PMax, and YouTube ads with real conversion tracking.",
    overview:
      "A complete Google Ads track covering lead generation fundamentals, keyword strategy, Performance Max, Shopping, Demand Gen, YouTube advertising, and enhanced conversion tracking with GTM — built for agencies and in-house teams running real budgets.",
    topicGroups: [
      {
        icon: "search",
        title: "Lead Generation & Conversion Setup",
        items: [
          "Lead generation campaign requirements and daily budget calculation",
          "Events vs conversions and primary/secondary conversion mapping",
          "Enhanced conversions with Google Tag Manager",
          "Conversion tracking audits and troubleshooting",
          "Call tracking and offline conversion imports",
        ],
      },
      {
        icon: "chart",
        title: "Search, Display, Shopping & PMax",
        items: [
          "Keyword match types and ad group theming",
          "Negative keywords, RLSA, and bidding strategy",
          "Display audience targeting and creative formats",
          "WooCommerce and Shopify shopping feed setup",
          "Performance Max audience signals and asset groups",
        ],
      },
      {
        icon: "video",
        title: "YouTube, Apps & Reporting",
        items: [
          "App install campaigns and Firebase event tracking",
          "Demand Gen campaign best practices",
          "YouTube audiences, Shorts ads, and conversion campaigns",
          "Google Ads Editor for bulk campaign management",
          "Automated scripts and anomaly detection reports",
        ],
      },
    ],
    faqs: [
      {
        question: "Does this cover Shopify and WooCommerce ads?",
        answer:
          "Yes — shopping feed setup and troubleshooting for both platforms is included.",
      },
      {
        question: "Is Performance Max covered in depth?",
        answer:
          "Yes — asset group structure, audience signals, and PMax-specific optimization are a dedicated topic.",
      },
      {
        question: "Will I learn Google Ads Editor?",
        answer:
          "Yes — bulk editing, filters, and custom rules for managing large accounts are covered.",
      },
    ],
    keyOutcome:
      "Run search, shopping, PMax, and YouTube campaigns with proper conversion tracking and reporting.",
  },
  {
    moduleId: "B3",
    heroHighlight: "AI & ChatGPT Marketing",
    heroDescription:
      "AI clone workflows, marketing agents, and Go HighLevel automation.",
    overview:
      "Focused sessions on where AI genuinely fits into marketing execution — AI clone workflows, generative content, building marketing agents, and automating client operations end-to-end with Go HighLevel, without needing a coding background.",
    topicGroups: [
      {
        icon: "bot",
        title: "AI Clone & Content Automation",
        items: [
          "AI clone setup and voice/likeness workflows",
          "Generative AI for ad copy and creative variations",
          "AI-assisted content calendars and campaign briefs",
          "Prompt workflows built specifically for marketing tasks",
          "Quality control for AI-generated marketing assets",
        ],
      },
      {
        icon: "network",
        title: "Marketing Agent Development",
        items: [
          "Development of AI agents for digital marketing tasks",
          "Agent-driven reporting and client update automation",
          "Connecting AI agents to campaign data sources",
          "Handling agent errors and human review checkpoints",
          "Practical use cases across paid and organic channels",
        ],
      },
      {
        icon: "boxes",
        title: "Go HighLevel & Client Automation",
        items: [
          "Go HighLevel marketing and CRM automation mastery",
          "Automated follow-up sequences and pipelines",
          "Client onboarding and reporting automation",
          "Integrating Go HighLevel with paid campaigns",
          "Building repeatable automation templates for agency use",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this a coding course?",
        answer:
          "No — it's applied AI for marketers, no coding background needed.",
      },
      {
        question: "Do I need a Go HighLevel subscription to follow along?",
        answer:
          "It helps for hands-on practice, but the concepts apply to similar CRM/automation platforms too.",
      },
      {
        question: "Is this useful for freelancers, not just agencies?",
        answer:
          "Yes — the automation templates are built to scale from solo freelance work up to full agency operations.",
      },
    ],
    keyOutcome:
      "Apply AI automation directly to campaign execution, reporting, and client workflows.",
  },
  {
    moduleId: "B4",
    heroHighlight: "Programmatic Marketing",
    heroDescription:
      "DV360, Campaign Manager 360, CRM, and data-driven media buying.",
    overview:
      "Advanced programmatic marketing covering DV360 media buying, Campaign Manager 360 measurement, conversion rate optimization, CRM mastery, data management platforms, and AI-powered reporting with Power BI — for marketers ready to move beyond Meta and Google.",
    topicGroups: [
      {
        icon: "database",
        title: "Programmatic Media Buying",
        items: [
          "DV360 programmatic campaign planning and setup",
          "Audience segments and inventory targeting in DV360",
          "Campaign Manager 360 measurement and tag management",
          "Cross-channel programmatic budget allocation",
          "Software, app, and crypto marketing campaign specifics",
        ],
      },
      {
        icon: "gauge",
        title: "CRO & Data Management",
        items: [
          "Conversion Rate Optimization fundamentals and testing",
          "Data Management Platform (DMP) setup and segmentation",
          "P2P Clouds CRM mastery for campaign and lead tracking",
          "Audience data hygiene and privacy-compliant targeting",
          "Connecting DMP audiences to programmatic campaigns",
        ],
      },
      {
        icon: "chart",
        title: "AI Reporting & Analytics",
        items: [
          "AI data engineering for marketers using Power BI",
          "Building automated cross-channel dashboards",
          "Attribution modeling across programmatic and paid social",
          "Anomaly detection in spend and performance data",
          "Client-ready reporting templates for programmatic results",
        ],
      },
    ],
    faqs: [
      {
        question: "Who is this module for?",
        answer:
          "Marketers ready to move beyond Meta/Google into enterprise-level programmatic buying.",
      },
      {
        question: "Do I need a large budget to practice DV360?",
        answer:
          "No — the module focuses on structure and strategy that applies regardless of budget size.",
      },
      {
        question: "Is Power BI required beforehand?",
        answer:
          "No prior Power BI experience is needed — dashboard building is taught from the ground up.",
      },
    ],
    keyOutcome:
      "Plan, measure, and report on programmatic campaigns across DV360, CM360, and CRM systems.",
  },
  {
    moduleId: "B5",
    heroHighlight: "SEO Mastery",
    heroDescription:
      "Keyword research, technical SEO, backlinks, and client-ready audits.",
    overview:
      "A complete SEO system covering niche and keyword research, site architecture, technical audits, backlink outreach, local and eCommerce SEO, and AI-assisted content workflows — built to produce client-ready audits and real ranking improvements, not just theory.",
    topicGroups: [
      {
        icon: "search",
        title: "Keyword Strategy & Content",
        items: [
          "SEO fundamentals and advanced niche research",
          "Keyword research, intent mapping, and clustering",
          "SERP analysis and competitive gap identification",
          "Site structure, topical authority, and internal linking",
          "AI-powered SEO content with SurferSEO and ChatGPT",
        ],
      },
      {
        icon: "gauge",
        title: "Technical SEO & Authority",
        items: [
          "Website design and SEO best practices",
          "Schema, structured data, and Core Web Vitals audits",
          "Indexing issues and crawl budget optimization",
          "Backlink outreach, guest posting, and link profile analysis",
          "GA4 dashboards and client revenue-tracking reports",
        ],
      },
      {
        icon: "briefcase",
        title: "Automation & Client Work",
        items: [
          "Zapier and n8n SEO workflow automation",
          "AI agents for ongoing SEO monitoring",
          "High-ticket SEO client acquisition strategy",
          "Live SEO audit and optimization project work",
          "Local SEO, eCommerce SEO, and international SEO",
        ],
      },
    ],
    faqs: [
      {
        question: "Does this include local SEO?",
        answer:
          "Yes — local and eCommerce SEO are both covered as dedicated topics.",
      },
      {
        question: "Do I need existing SEO tools?",
        answer:
          "Ahrefs, SEMrush, Screaming Frog, and SurferSEO workflows are taught — access to at least one is recommended for practice.",
      },
      {
        question: "Will I be able to sell SEO audits to clients after this?",
        answer:
          "Yes — the module includes a client-ready audit template you can use directly with real clients.",
      },
    ],
    keyOutcome:
      "Deliver a client-ready SEO audit and execute the technical and content fixes it identifies.",
  },
  {
    moduleId: "B6",
    heroHighlight: "YouTube SEO & Growth",
    heroDescription:
      "Algorithm mastery, mobile production, and faceless channel growth.",
    overview:
      "A complete YouTube growth track covering niche validation, algorithm signals, mobile-first production, thumbnail design, and monetization — with a full alternative path for building a channel without appearing on camera.",
    topicGroups: [
      {
        icon: "video",
        title: "Creator Strategy & Validation",
        items: [
          "Why most channels fail and the mindset shifts required",
          "Pocket Niche Method and demand validation",
          "YouTube algorithm signals and recommendation behavior",
          "10-second hook formula for retention",
          "Mobile production studio setup on a budget",
        ],
      },
      {
        icon: "sparkles",
        title: "Growth & Thumbnails",
        items: [
          "Thumbnail blueprint and fast mobile thumbnail creation",
          "No-SEO growth system for early channels",
          "CTR, audience retention, and watch time optimization",
          "Shorts vs long-form content strategy",
          "Monetization blueprint and revenue diversification",
        ],
      },
      {
        icon: "bot",
        title: "Faceless Channel Setup",
        items: [
          "Faceless YouTube success principles for 2026",
          "Binge-worthy faceless video structure",
          "Faceless Shorts production workflow",
          "A-to-Z channel setup, branding, and metadata",
          "30-minute faceless long-form video creation workflow",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need on-camera experience?",
        answer:
          "No — the faceless content track is a full alternative path covered start to finish.",
      },
      {
        question: "Do I need expensive equipment?",
        answer:
          "No — the mobile production studio setup is built around affordable, accessible gear.",
      },
      {
        question: "Is this only for Shorts, or long-form too?",
        answer:
          "Both — the module covers Shorts vs long-form strategy and how to decide which fits your niche.",
      },
    ],
    keyOutcome:
      "Build and grow a monetized YouTube channel from scratch, faceless or on-camera.",
  },
  {
    moduleId: "B7",
    heroHighlight: "Email Marketing",
    heroDescription: "AI-driven automation and monetization sequences.",
    overview:
      "Focused sessions on email monetization strategy and AI-driven automation — campaign planning, follow-up sequences, and systems that convert subscribers into revenue, applicable across major ESPs and Go HighLevel.",
    topicGroups: [
      {
        icon: "mail",
        title: "Monetization Strategy",
        items: [
          "Email monetization strategy and revenue modeling",
          "List segmentation for higher conversion rates",
          "Offer sequencing and promotional cadence",
          "Building trust before the sales sequence",
          "Re-engagement campaigns for cold subscribers",
        ],
      },
      {
        icon: "bot",
        title: "AI-Driven Automation",
        items: [
          "AI-driven email marketing automation workflows",
          "AI-assisted subject line and copy generation",
          "Behavioral trigger automation based on user actions",
          "Automated A/B testing of sequences",
          "AI algorithm mastery for deliverability signals",
        ],
      },
      {
        icon: "briefcase",
        title: "Campaign & Sequence Planning",
        items: [
          "Campaign planning frameworks for launches",
          "Welcome sequences and onboarding flows",
          "Abandoned cart and re-engagement sequences",
          "Follow-up systems for long-term retention",
          "Reporting on open rate, CTR, and revenue attribution",
        ],
      },
    ],
    faqs: [
      {
        question: "What platforms are covered?",
        answer:
          "Core principles apply across major ESPs and Go HighLevel, so the skills transfer regardless of platform.",
      },
      {
        question: "Is this for beginners or existing email marketers?",
        answer:
          "Both — foundational sequence structure is covered before moving into AI-driven optimization.",
      },
      {
        question: "Does this cover deliverability?",
        answer:
          "Yes — deliverability signals and how AI automation affects sender reputation are addressed.",
      },
    ],
    keyOutcome:
      "Build automated, AI-assisted email sequences that support real monetization.",
  },
  {
    moduleId: "B8",
    heroHighlight: "Etsy & Digital Products",
    heroDescription: "POD, digital products, Gumroad, and logistics.",
    overview:
      "A complete Etsy and digital product track covering seller setup, print-on-demand, digital product creation, private label sourcing, international logistics, and a Gumroad backup store — ending in a live product development contest with real metrics.",
    topicGroups: [
      {
        icon: "store",
        title: "Store Setup & Products",
        items: [
          "Etsy seller account setup and Payoneer payment setup",
          "Shop banners, logos, and store policy design",
          "POD niche research and listing creation",
          "Digital product creation with AI and Canva",
          "SEO-optimized Etsy listing titles and tags",
        ],
      },
      {
        icon: "sparkles",
        title: "Promotion & Sales",
        items: [
          "Sales campaigns, coupons, and ad budget planning",
          "Etsy Ads optimization and budget pacing",
          "Cross-promotion between Etsy and social channels",
          "Seasonal and trend-based product launches",
          "Customer review generation strategy",
        ],
      },
      {
        icon: "briefcase",
        title: "Logistics & Expansion",
        items: [
          "Private label opportunity research and policy compliance",
          "FedEx logistics session and international shipping",
          "Gumroad backup store setup and traffic redirection",
          "Inventory and fulfillment workflow management",
          "Live product development contest with real metrics",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need a product idea already?",
        answer: "No — niche and product research is covered from scratch.",
      },
      {
        question: "Is this only digital products, or physical too?",
        answer:
          "Both — POD, private label physical products, and pure digital products are all covered.",
      },
      {
        question: "What is the live product development contest?",
        answer:
          "A practical exercise where students launch a real listing and are evaluated on actual performance metrics.",
      },
    ],
    keyOutcome:
      "Launch and promote an Etsy or digital product offer through a complete, practical workflow.",
  },
  {
    moduleId: "B9",
    heroHighlight: "AEO — Answer Engine Optimization",
    heroDescription:
      "Get cited by ChatGPT, Gemini, Perplexity, and AI Overviews.",
    overview:
      "A focused track on how answer engines select, summarize, and cite content — structuring pages, schema, and authority signals so your brand gets pulled into AI-generated answers instead of just ranking in blue links.",
    topicGroups: [
      {
        icon: "search",
        title: "How Answer Engines Work",
        items: [
          "AEO vs traditional SEO — what actually changes",
          "How LLMs select and cite sources",
          "AI Overviews, Perplexity, and ChatGPT search behavior",
          "Entity recognition and topical authority signals",
          "Why citation-worthy formatting beats keyword stuffing",
        ],
      },
      {
        icon: "gauge",
        title: "Structuring Content for Citation",
        items: [
          "Answer-first content structure and formatting",
          "Schema markup for AI comprehension",
          "FAQ and structured data for direct answers",
          "Source credibility signals answer engines look for",
          "Formatting patterns that get pulled into AI Overviews",
        ],
      },
      {
        icon: "sparkles",
        title: "Implementation & Monitoring",
        items: [
          "Auditing existing pages for AEO readiness",
          "Tracking brand mentions across AI answer engines",
          "Local and service-page AEO for client work",
          "AEO client acquisition and reporting frameworks",
          "Measuring citation frequency over time",
        ],
      },
    ],
    faqs: [
      {
        question: "Is AEO part of the 8-month program?",
        answer:
          "It's a specialized add-on workshop, run alongside the core curriculum.",
      },
      {
        question: "Do I need existing SEO knowledge first?",
        answer:
          "Basic SEO familiarity helps, but the module explains where AEO diverges from traditional SEO from the start.",
      },
      {
        question: "Can I offer AEO as a client service after this?",
        answer:
          "Yes — the module includes an audit framework and client acquisition approach for AEO specifically.",
      },
    ],
    keyOutcome:
      "Restructure pages to get cited by AI answer engines, not just ranked in search results.",
  },
  {
    moduleId: "phase-11-12",
    heroHighlight: "Agentic AI Engineering",
    heroDescription:
      "Build stateful, tool-using AI agents with LangGraph, PydanticAI, MCP, and A2A protocols.",
    overview:
      "Go beyond chatbots into production agentic systems — stateful graph orchestration, type-safe agent contracts, standardized tool protocols, and multi-agent coordination that actually ships to production, not just a notebook demo.",
    topicGroups: [
      {
        icon: "network",
        title: "LangGraph Orchestration",
        items: [
          "StateGraph architecture, nodes, and edges",
          "Conditional routing and ReAct tool-calling loops",
          "Human-in-the-loop interrupts and approval workflows",
          "Checkpointers, Postgres persistence, and MemorySaver",
          "Supervisor architectures and multi-agent swarms",
        ],
      },
      {
        icon: "bot",
        title: "PydanticAI & Type-Safe Agents",
        items: [
          "Agents, models, and runnable contracts",
          "Structured results and discriminated unions",
          "Dependency injection with RunContext",
          "@agent.tool patterns and ModelRetry error handling",
          "Pydantic Evals and Logfire tracing",
        ],
      },
      {
        icon: "boxes",
        title: "MCP & A2A Protocols",
        items: [
          "Model Context Protocol servers, clients, and tools",
          "FastMCP development and stdio/SSE transport",
          "Agent Cards and A2A discovery",
          "A2A task lifecycle states and JSON-RPC messaging",
          "Multi-server orchestration and trust boundaries",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need prior LLM experience?",
        answer:
          "Basic Python and API familiarity is enough — the course builds up from function calling to full multi-agent systems.",
      },
      {
        question: "Is this specific to one AI provider?",
        answer:
          "No — MCP and A2A are open standards, and the patterns taught apply across Claude, OpenAI, and other providers.",
      },
      {
        question: "Will I build a real multi-agent project?",
        answer:
          "Yes — the module builds toward a stateful, checkpointed multi-agent system with human approval workflows.",
      },
    ],
    keyOutcome:
      "Build and deploy a stateful, checkpointed multi-agent system with human-in-the-loop controls.",
  },
  {
    moduleId: "phase-4",
    heroHighlight: "LLM Fine-Tuning",
    heroDescription:
      "Master LoRA, QLoRA, DPO, and GRPO to align and specialize open-weight models.",
    overview:
      "Learn the complete fine-tuning lifecycle — from dataset preparation and parameter-efficient adapters through preference alignment, quantization, and production-ready deployment of open-weight models.",
    topicGroups: [
      {
        icon: "database",
        title: "Data Preparation",
        items: [
          "Instruction-pair and chat-format dataset construction",
          "ChatML and LLaMA-3 chat formatting",
          "Loss masking and dataset deduplication",
          "Synthetic instruction generation with Self-Instruct",
          "Data quality filtering pipelines",
        ],
      },
      {
        icon: "code",
        title: "PEFT & Adapters",
        items: [
          "LoRA mathematics and rank/alpha selection",
          "QLoRA with NF4 quantization and paged optimizers",
          "DoRA magnitude-direction decomposition",
          "AdaLoRA adaptive rank allocation",
          "SFT pipeline design with FLAN and OpenHermes datasets",
        ],
      },
      {
        icon: "brain",
        title: "Alignment & Deployment",
        items: [
          "DPO, GRPO, and ORPO preference alignment",
          "RLHF, PPO, and reward model fundamentals",
          "GPTQ, AWQ, and FP8 quantization for inference",
          "LoRA adapter merging and multi-LoRA serving",
          "Deployment with vLLM, SGLang, and GGUF/llama.cpp",
        ],
      },
    ],
    faqs: [
      {
        question: "What hardware do I need?",
        answer:
          "QLoRA techniques covered in the course allow fine-tuning on a single consumer GPU — no enterprise hardware required.",
      },
      {
        question: "Which tools does the course use?",
        answer:
          "Hugging Face TRL, PEFT, Unsloth, and Axolotl are all covered as fine-tuning frameworks.",
      },
      {
        question: "Does this cover reasoning models like DeepSeek-R1?",
        answer:
          "The alignment section covers GRPO and rule-based rewards, the same techniques behind reasoning-model training.",
      },
    ],
    keyOutcome:
      "Fine-tune, align, and deploy an open-weight LLM using production-grade techniques.",
  },
  {
    moduleId: "phase-10",
    heroHighlight: "RAG Systems",
    heroDescription:
      "Build production retrieval-augmented generation with hybrid search, reranking, and GraphRAG.",
    overview:
      "Move past vanilla RAG into the architectures production teams actually use — hybrid dense/sparse retrieval, self-correcting pipelines, multimodal document understanding, knowledge-graph-backed retrieval, and the security layer enterprise RAG needs.",
    topicGroups: [
      {
        icon: "database",
        title: "Retrieval Frameworks",
        items: [
          "LangChain and LlamaIndex production retrieval pipelines",
          "Document loaders, chunking strategies, and text splitters",
          "Qdrant, Pinecone, and PGVector vector store integration",
          "Metadata filtering and hybrid search",
          "Query engines and response synthesis",
        ],
      },
      {
        icon: "network",
        title: "Advanced Retrieval Architectures",
        items: [
          "Hybrid dense + sparse retrieval with Reciprocal Rank Fusion",
          "Query rewriting, HyDE, and sub-query decomposition",
          "Self-RAG, Corrective RAG, and Adaptive RAG",
          "Cross-encoder reranking with Cohere and BGE-Reranker",
          "RAG evaluation: faithfulness, context precision, and recall",
        ],
      },
      {
        icon: "boxes",
        title: "Multimodal, Graph & Security",
        items: [
          "ColPali visual page retrieval for document RAG",
          "Neo4j GraphRAG and knowledge graph construction",
          "Semantic caching with Redis and GPTCache",
          "PII masking and prompt injection defense in retrieval",
          "Retrieval-interface security for multi-tenant systems",
        ],
      },
    ],
    faqs: [
      {
        question: "Which vector databases are covered?",
        answer:
          "Qdrant, Pinecone, and PGVector, along with hybrid search patterns that work across all three.",
      },
      {
        question:
          "Does this cover document parsing for PDFs and scanned files?",
        answer:
          "Yes — multimodal document RAG including OCR, layout detection, and tools like LlamaParse and Docling are covered.",
      },
      {
        question: "Is GraphRAG included?",
        answer:
          "Yes — Neo4j-based GraphRAG and knowledge graph construction are a full topic group.",
      },
    ],
    keyOutcome:
      "Ship a secure, evaluated, production-grade RAG system, not a demo notebook.",
  },
  {
    moduleId: "phase-12",
    heroHighlight: "MCP & A2A Protocols",
    heroDescription:
      "Standardize how your AI agents connect to tools and to each other.",
    overview:
      "Master the two protocols defining how modern AI systems interoperate — Model Context Protocol for agent-to-tool connections, and Agent-to-Agent protocol for cross-agent delegation, discovery, and task lifecycle management.",
    topicGroups: [
      {
        icon: "network",
        title: "Model Context Protocol Deep Dive",
        items: [
          "MCP Hosts, Clients, Servers, Tools, Resources, and Prompts",
          "FastMCP server and client development",
          "stdio and SSE transport layer implementation",
          "Remote MCP servers, authentication, and authorization",
          "Multi-server orchestration and trust boundaries",
        ],
      },
      {
        icon: "gitbranch",
        title: "Agent-to-Agent Protocol",
        items: [
          "Why A2A exists and agent interoperability fundamentals",
          "Agent Cards and the /.well-known/agent.json discovery pattern",
          "A2A task lifecycle: submitted, working, completed, failed",
          "HTTP, SSE transport, and JSON-RPC messaging",
          "Remote agent delegation and A2A vs MCP tradeoffs",
        ],
      },
      {
        icon: "gauge",
        title: "Function Calling & Observability",
        items: [
          "JSON Schema tool definitions and parameter typing",
          "Parallel tool calls and forced tool selection",
          "LangSmith and Langfuse multi-agent tracing",
          "Tool execution traces and agent handoff tracing",
          "Cost attribution and latency analysis across agents",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this specific to one AI provider?",
        answer:
          "No — both protocols are open standards designed to work across Claude, OpenAI, and other providers.",
      },
      {
        question: "Do I need to know MCP before learning A2A?",
        answer:
          "MCP is covered first since it's the more foundational protocol, then A2A builds on those concepts for multi-agent systems.",
      },
      {
        question: "Will I build both a server and a client?",
        answer:
          "Yes — the module includes hands-on FastMCP server development and MCP/A2A client implementation.",
      },
    ],
    keyOutcome:
      "Build and connect MCP servers and A2A-compliant agents across a distributed system.",
  },
  {
    moduleId: "phase-16",
    heroHighlight: "AI Security & Guardrails",
    heroDescription:
      "Defend production AI against prompt injection, PII leaks, and unauthorized access.",
    overview:
      "Secure enterprise AI systems the way real production teams do — guardrails against prompt injection and jailbreaks, PII redaction, LLM gateway routing, and RBAC at the retrieval and prompt layer with multi-tenant isolation testing.",
    topicGroups: [
      {
        icon: "shield",
        title: "Guardrails & Defense",
        items: [
          "Direct and indirect prompt injection defense",
          "Jailbreak prevention and toxicity filtering",
          "NVIDIA NeMo Guardrails and Colang rule authoring",
          "Microsoft Presidio PII detection and redaction",
          "LlamaFirewall and LLM Guard output validation",
        ],
      },
      {
        icon: "network",
        title: "LLM Gateways & Routing",
        items: [
          "LLM gateway architecture and load balancing",
          "LiteLLM Proxy setup and automatic retries",
          "AWS Bedrock routing and model fallback strategies",
          "Gateway-level caching and observability",
          "Provider routing for multi-model deployments",
        ],
      },
      {
        icon: "lock",
        title: "RBAC & Multi-Tenancy",
        items: [
          "Authentication, authorization, and JWT fundamentals",
          "Retrieval-layer RBAC and document-level tenant filtering",
          "Prompt-layer RBAC with dynamic system prompts by role",
          "Tenant isolation and data isolation guarantees",
          "Multi-tenant isolation and PII leakage testing",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this relevant for non-enterprise projects?",
        answer:
          "Yes — the same guardrail patterns apply to any public-facing AI product handling user data.",
      },
      {
        question: "Does this cover prompt injection specifically?",
        answer:
          "Yes — both direct and indirect prompt injection defense are covered as dedicated topics.",
      },
      {
        question: "What if I'm building a single-tenant app?",
        answer:
          "The RBAC and guardrail sections still apply — multi-tenancy is covered as an extension, not a prerequisite.",
      },
    ],
    keyOutcome:
      "Deploy enterprise AI behind guardrails, secure gateways, PII protection, and tenant-aware RBAC controls.",
  },
  {
    moduleId: "phase-14",
    heroHighlight: "LLMOps",
    heroDescription:
      "Instrument production AI with tracing, evaluation, and cost control.",
    overview:
      "Operate LLM systems in production the way SREs operate infrastructure — full-stack tracing, automated evaluation, semantic caching, token accounting, and financial budget enforcement for AI workloads that need to stay reliable and affordable.",
    topicGroups: [
      {
        icon: "gauge",
        title: "Tracing & Telemetry",
        items: [
          "LangSmith tracing and span-level telemetry",
          "Langfuse token and latency monitoring",
          "Logfire span-level traces for Python AI services",
          "RAGAS and Inspect AI automated evaluation",
          "RAG and agent output validation pipelines",
        ],
      },
      {
        icon: "database",
        title: "Caching & Cost Control",
        items: [
          "Anthropic and OpenAI prompt prefix caching",
          "Semantic caching with Redis and GPTCache",
          "Token accounting across multi-model deployments",
          "Rate limiting and per-user token budgets",
          "Financial budget enforcement and alerting",
        ],
      },
      {
        icon: "chart",
        title: "Production Reliability",
        items: [
          "Building end-to-end observability dashboards",
          "Detecting silent quality regressions in production",
          "Cost attribution by feature, user, and model",
          "Setting SLOs for latency and error rate on AI endpoints",
          "Incident response patterns for LLM-specific failures",
        ],
      },
    ],
    faqs: [
      {
        question: "Who is LLMOps for?",
        answer:
          "Engineers already running LLM apps in production who need observability and cost discipline, not beginners.",
      },
      {
        question: "Does this cover multi-model deployments?",
        answer:
          "Yes — token accounting and cost attribution across multiple providers and models are covered.",
      },
      {
        question: "Is prompt caching provider-specific?",
        answer:
          "Both Anthropic and OpenAI's caching mechanisms are covered, along with general semantic caching that works across providers.",
      },
    ],
    keyOutcome:
      "Instrument a production AI workload with end-to-end telemetry, evaluation, and automated cost controls.",
  },
  {
    moduleId: "ml-dl-phase",
    heroHighlight: "Machine Learning & Deep Learning",
    heroDescription:
      "From classical ML algorithms to neural networks and PyTorch, built for real deployment.",
    overview:
      "Build the mathematical and engineering foundation every AI engineer needs — linear algebra, statistics, and optimization, classical ML algorithms with proper evaluation, and hands-on neural network training in PyTorch, including CNNs and sequence models.",
    topicGroups: [
      {
        icon: "sigma",
        title: "Mathematical Foundations",
        items: [
          "Linear algebra: vectors, matrices, and eigenvalues",
          "Probability, Bayes theorem, and distributions",
          "Descriptive and inferential statistics, hypothesis testing",
          "Calculus: gradients, chain rule, and convexity",
          "Optimization fundamentals for machine learning",
        ],
      },
      {
        icon: "brain",
        title: "Classical Machine Learning",
        items: [
          "Regression, KNN, Decision Trees, and Random Forest",
          "XGBoost, LightGBM, CatBoost, and SVM",
          "K-Means, hierarchical clustering, and PCA",
          "Feature engineering, encoding, and normalization",
          "Cross-validation, grid search, and evaluation metrics",
        ],
      },
      {
        icon: "cpu",
        title: "Deep Learning & PyTorch",
        items: [
          "Neural network mechanics and backpropagation",
          "Gradient Descent, Adam, and learning rate scheduling",
          "PyTorch tensors, autograd, and custom nn.Module models",
          "CNNs, ResNet, and image classification",
          "RNNs, LSTMs, and sequence-to-sequence models",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need a math background?",
        answer:
          "The course builds the required math from the ground up — no prior linear algebra or statistics needed.",
      },
      {
        question: "Is this classical ML, deep learning, or both?",
        answer:
          "Both — the module covers classical algorithms first, then builds into neural networks and PyTorch.",
      },
      {
        question: "Will I train real models, not just theory?",
        answer:
          "Yes — hands-on model training, evaluation, and serialization are core to every topic group.",
      },
    ],
    keyOutcome:
      "Train, evaluate, and serialize both classical ML models and neural networks in PyTorch.",
  },
  {
    moduleId: "phase-7",
    heroHighlight: "Computer Vision & VLMs",
    heroDescription:
      "Vision Transformers, CLIP, and Visual Language Models like LLaVA and Qwen-2-VL.",
    overview:
      "Bridge classical computer vision into the multimodal era — Vision Transformer mechanics, contrastive vision-language models like CLIP and SigLIP, and how modern VLMs connect visual encoders to LLM backbones for multimodal reasoning.",
    topicGroups: [
      {
        icon: "image",
        title: "Vision Transformers",
        items: [
          "CNN-to-ViT conceptual bridge and inductive bias",
          "Patch embeddings, CLS token, and 2D positional encoding",
          "Visual self-attention and attention map interpretation",
          "CLIP and SigLIP contrastive vision-language pretraining",
          "DINO and DINOv2 self-supervised visual encoders",
        ],
      },
      {
        icon: "network",
        title: "Visual Language Models",
        items: [
          "VLM architecture: encoder, projector, and LLM backbone",
          "LLaVA and Qwen-2-VL architecture walkthroughs",
          "MLP projectors and cross-attention aligners",
          "Vision-language feature space alignment",
          "Visual grounding for object and region understanding",
        ],
      },
      {
        icon: "boxes",
        title: "Multimodal Applications",
        items: [
          "Document and layout understanding with VLMs",
          "Video and multi-frame document processing",
          "ColPali visual page retrieval for multimodal RAG",
          "Gemini Vision and multimodal API integration",
          "Building a practical visual-question-answering pipeline",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this only for image classification?",
        answer:
          "No — the focus is multimodal reasoning, visual grounding, and document/video understanding, not just classification.",
      },
      {
        question: "Do I need computer vision experience first?",
        answer:
          "The module bridges from CNN concepts, so basic deep learning familiarity is enough to start.",
      },
      {
        question: "Does this connect to the RAG module?",
        answer:
          "Yes — ColPali visual retrieval overlaps with multimodal RAG, and the two modules are designed to complement each other.",
      },
    ],
    keyOutcome:
      "Explain and build the encoder-projector-LLM pipeline behind modern VLMs.",
  },
];
