export type PseoService = {
  slug: string;
  name: string;
  baseModuleId: string;
  category: "marketing" | "technical";
};

export const services: PseoService[] = [
  // marketing
  {
    slug: "meta-ads-course",
    name: "Meta Ads",
    baseModuleId: "B1",
    category: "marketing",
  },
  {
    slug: "google-ads-course",
    name: "Google Ads",
    baseModuleId: "B2",
    category: "marketing",
  },
  {
    slug: "ai-marketing-course",
    name: "AI & ChatGPT Marketing",
    baseModuleId: "B3",
    category: "marketing",
  },
  {
    slug: "programmatic-marketing-course",
    name: "Programmatic Marketing",
    baseModuleId: "B4",
    category: "marketing",
  },
  {
    slug: "seo-course",
    name: "SEO",
    baseModuleId: "B5",
    category: "marketing",
  },
  {
    slug: "youtube-seo-course",
    name: "YouTube SEO",
    baseModuleId: "B6",
    category: "marketing",
  },
  {
    slug: "email-marketing-course",
    name: "Email Marketing",
    baseModuleId: "B7",
    category: "marketing",
  },
  {
    slug: "etsy-course",
    name: "Etsy & Digital Products",
    baseModuleId: "B8",
    category: "marketing",
  },
  {
    slug: "aeo-course",
    name: "AEO",
    baseModuleId: "B9",
    category: "marketing",
  },
  // technical
  {
    slug: "agentic-ai-course",
    name: "Agentic AI Engineering",
    baseModuleId: "phase-11-12",
    category: "technical",
  },
  {
    slug: "llm-fine-tuning-course",
    name: "LLM Fine-Tuning",
    baseModuleId: "phase-4",
    category: "technical",
  },
  {
    slug: "rag-course",
    name: "RAG Systems",
    baseModuleId: "phase-10",
    category: "technical",
  },
  {
    slug: "mcp-a2a-course",
    name: "MCP & A2A Protocols",
    baseModuleId: "phase-12",
    category: "technical",
  },
  {
    slug: "ai-security-course",
    name: "AI Security & Guardrails",
    baseModuleId: "phase-16",
    category: "technical",
  },
  {
    slug: "llmops-course",
    name: "LLMOps",
    baseModuleId: "phase-14",
    category: "technical",
  },
  {
    slug: "machine-learning-course",
    name: "Machine Learning & Deep Learning",
    baseModuleId: "ml-dl-phase",
    category: "technical",
  },
  {
    slug: "computer-vision-course",
    name: "Computer Vision & VLMs",
    baseModuleId: "phase-7",
    category: "technical",
  },
];
