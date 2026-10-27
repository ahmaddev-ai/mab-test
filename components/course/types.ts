// Types for the reusable course landing page.
// Every course is described by one JSON file that matches `CourseData`.

export type Cta = { label: string; href: string };

export type TopicGroup = { icon: string; title: string; items: string[] };

export type ModuleData = {
  id: string;
  title: string;
  subtitle: string;
  overview: string;
  topicGroups: TopicGroup[];
  keyOutcome: string;
};

export type Phase = {
  id: string;
  badge: string;
  domain: string;
  title: string;
  description: string;
  weeks: string;
  checkpoint: string;
  milestone: string;
  skills: string[];
  tools: string[];
  modules: ModuleData[];
};

export type NavItem = { id: string; label: string; short: string };

export type Offer = {
  enabled: boolean;
  discountPercent: number;
  code: string;
  /** ISO date with timezone, e.g. 2026-10-15T23:59:59+05:00 */
  endsAt: string;
  headline: string;
  subtext: string;
  disclaimer?: string;
};

export type Enrollment = {
  recipient: string;
  formTitle: string;
  eyebrow: string;
  heading: string;
  subtitle: string;
  thankYouPath: string;
  thankYouTitle: string;
  thankYouMessage: string;
};

export type Syllabus = {
  title: string;
  description: string;
  href: string;
  filename: string;
  button: string;
};

export type VideoItem = {
  title: string;
  subtitle?: string;
  url: string;
  thumbnail?: string;
  orientation?: "portrait" | "landscape";
};

export type Social = {
  type: "portfolio" | "linkedin" | "twitter" | "instagram" | "github" | "email";
  label: string;
  href: string;
  text?: string;
};

export type CourseData = {
  slug: string;
  seo: { title: string; description: string; canonical: string };
  /** Order of the sections after the hero. Remove an id to hide that section. */
  layout: string[];
  nav: NavItem[];
  offer: Offer;
  enrollment: Enrollment;
  syllabus: Syllabus;
  hero: {
    leadBadge: string;
    kicker: string;
    title: string;
    titleAccent: string;
    highlight: string;
    description: string;
    primaryCta: string;
    secondaryCta: Cta;
    tertiaryCta: Cta;
    chips: string[];
    journeyTitle: string;
    journey: string[];
    stats: { value: string; label: string }[];
  };
  videos?: { heading: string; description: string; items: VideoItem[] };
  highlights?: {
    heading: string;
    description: string;
    items: { icon: string; color: string; title: string; description: string }[];
    includesTitle: string;
    includes: string[];
  };
  roadmap?: { heading: string; description: string; cta: string };
  curriculum?: { heading: string; description: string; searchPlaceholder: string };
  mentor?: {
    heading: string;
    name: string;
    role: string;
    quote: string;
    cta: string;
  };
  tools?: {
    heading: string;
    description: string;
    items: {
      icon: string;
      title: string;
      name: string;
      category: string;
      detail: string;
    }[];
    providersTitle: string;
    providers: {
      title: string;
      subtitle: string;
      tools: { name: string; body: string }[];
    }[];
  };
  simulator?: {
    heading: string;
    description: string;
    topics: string[];
    defaultPrompt: string;
    logs: string[];
    steps: { title: string; body: string }[];
    cta: { title: string; text: string; button: string };
  };
  security?: {
    heading: string;
    description: string;
    coveredIn: string;
    cards: { title: string; subtitle: string; body: string }[];
    promise: { title: string; quote: string; cta: string };
  };
  stack?: {
    heading: string;
    description: string;
    searchPlaceholder: string;
    categories: {
      category: string;
      tools: { name: string; badge: string; body: string }[];
    }[];
  };
  instructors?: {
    heading: string;
    description: string;
    lead: {
      name: string;
      role: string;
      headline: string;
      title: string;
      badge: string;
      image: string;
      quote: string;
      facts: string[];
      socials: Social[];
    };
    teamTitle: string;
    team: {
      name: string;
      role: string;
      title: string;
      image: string;
      linkedin: string;
      website: string;
      websiteLabel: string;
    }[];
  };
  career?: {
    heading: string;
    description: string;
    disclaimer: string;
    cards: { title: string; label: string; value: string; body: string }[];
    calculator: {
      title: string;
      text: string;
      rate: SliderConfig;
      hours: SliderConfig;
      weeksPerMonth: number;
      resultLabel: string;
      cta: string;
    };
  };
  bonuses?: {
    heading: string;
    description: string;
    items: {
      kicker: string;
      heading: string;
      body: string;
      points: string[];
    }[];
    quote: { title: string; subtitle: string; quote: string; cta: string };
  };
  diagnostic?: DiagnosticData;
  faq?: {
    heading: string;
    description: string;
    searchPlaceholder: string;
    initialCount: number;
    items: { question: string; answer: string }[];
  };
  finalCta?: {
    kicker: string;
    title: string;
    text: string;
    primaryCta: string;
    secondaryCta: Cta;
    path: string[];
  };
  phases: Phase[];
};

export type SliderConfig = {
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  default: number;
  minLabel: string;
  maxLabel: string;
};

export type DiagnosticData = {
  heading: string;
  description: string;
  questions: { question: string; options: string[] }[];
  results: Record<string, { phase: string; description: string }>;
  rules: {
    result: string;
    match: "any" | "all";
    conditions: { question: number; options: number[] }[];
  }[];
  defaultResult: string;
  enrollCta: string;
  retakeLabel: string;
};
