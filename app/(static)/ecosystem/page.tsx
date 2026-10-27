import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Network,
  Sparkles,
} from "lucide-react";
import { ButtonLink, Section } from "@/components/home/shared";
import { ECOSYSTEM_DIVISIONS, ECOSYSTEM_SLUGS } from "@/data/ecosystem";

const divisions = ECOSYSTEM_SLUGS.map((slug) => ECOSYSTEM_DIVISIONS[slug]);

const ecosystemStats = [
  { label: "Specialized Divisions", value: `${divisions.length}` },
  { label: "Learners Trained", value: "50,000+" },
  { label: "Systems & Deployments", value: "320+" },
];

const operatingPrinciples = [
  {
    title: "Strategy connected to execution",
    description:
      "Advisory, architecture, implementation, and training stay connected so every plan can become a working system.",
  },
  {
    title: "Production-grade delivery",
    description:
      "Every division is built around real operating environments: cloud, security, AI workflows, learning systems, and business constraints.",
  },
  {
    title: "Capability transfer",
    description:
      "The ecosystem does more than build for clients; it helps teams understand, operate, and scale the systems after launch.",
  },
];

export const metadata: Metadata = {
  title:
    "Technology Ecosystem | AI, Cloud, Blockchain, Security & Learning | Ahmad Basit",
  description:
    "Explore Ahmad Basit's technology ecosystem across AI systems, cloud infrastructure, blockchain, cybersecurity, learning pathways, and consulting services.",
  keywords: [
    "Ahmad Basit ecosystem",
    "AI systems",
    "cloud infrastructure",
    "blockchain institute",
    "security systems",
    "technology learning pathways",
    "digital transformation consulting",
  ],
  alternates: {
    canonical: "https://ahmadbasit.com/ecosystem",
  },
  openGraph: {
    title:
      "Technology Ecosystem | AI, Cloud, Blockchain, Security & Learning | Ahmad Basit",
    description:
      "A connected technology ecosystem for building, securing, scaling, and teaching modern digital systems.",
    url: "https://ahmadbasit.com/ecosystem",
    siteName: "Mian Ahmad Basit Portfolio",
    type: "website",
    images: [
      {
        url: "/mab-about.webp",
        width: 1024,
        height: 1536,
        alt: "Ahmad Basit Technology Ecosystem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology Ecosystem | Ahmad Basit",
    description:
      "AI, cloud, blockchain, security, learning, and consulting divisions built as one connected technology ecosystem.",
    images: ["/mab-about.webp"],
  },
};

export default function EcosystemPage() {
  return (
    <main className="overflow-hidden bg-[#F8FAFC] text-[#0A0A0A] dark:bg-[#0A0A0A] dark:text-white">
      <section className="relative isolate overflow-hidden px-5 pt-24 sm:px-6 lg:px-10">
        <div className="absolute inset-0 z-[-2] bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.22),transparent_32%),linear-gradient(145deg,#F8FAFC_0%,#E5E7EB_55%,#F8FAFC_100%)] dark:bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.2),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(139,92,246,0.12),transparent_26%),linear-gradient(145deg,#0A0A0A_0%,#111111_58%,#050505_100%)]" />
        <div className="absolute inset-0 z-[-1] bg-[linear-gradient(rgba(59,130,246,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.07)_1px,transparent_1px)] bg-[size:72px_72px] opacity-70" />

        <div className="relative z-10 mx-auto max-w-6xl py-16 text-center sm:py-24">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-300">
            <Network size={30} />
          </div>

          <p className="mt-6 font-mono text-xs uppercase tracking-[0.32em] text-blue-600 dark:text-blue-300">
            Technology Ecosystem
          </p>

          <h1 className="mx-auto mt-5 max-w-5xl font-heading text-4xl font-medium leading-[1.05] tracking-[-1px] text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            A Connected Ecosystem for Building, Securing, Scaling, and Teaching
            Modern Technology
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-600 dark:text-[#9CA3AF]">
            The Ahmad Basit ecosystem brings together AI systems, cloud
            infrastructure, blockchain education, cybersecurity, practical
            learning, and founder-led consulting into one coordinated technology
            platform.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact?mode=call" variant="primary">
              Book a Strategy Call
            </ButtonLink>
            <ButtonLink href="#divisions" variant="outline">
              Explore Divisions
            </ButtonLink>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {ecosystemStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-black/10 bg-white/70 px-6 py-6 backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]"
              >
                <p className="font-heading text-3xl font-medium tracking-[-1px] text-blue-600 dark:text-blue-300">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-[#9CA3AF]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section
        id="overview"
        eyebrow="Overview"
        title="One Ecosystem, Multiple Specialist Divisions"
        description="Each division has a focused mandate, but they are designed to work together across the full lifecycle of modern digital systems."
      >
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5 text-base leading-8 text-slate-600 dark:text-[#9CA3AF] sm:text-lg">
            <p>
              The ecosystem exists to connect the work that modern organizations
              usually treat as separate: AI adoption, platform engineering,
              security, education, and business transformation. That connection
              matters because real digital growth depends on more than one
              technical capability.
            </p>
            <p>
              AI systems need reliable cloud infrastructure. Cloud platforms
              need security controls. Security programs need trained teams.
              Blockchain and emerging technology initiatives need clear strategy
              before they become useful products. The ecosystem gives each of
              those needs a dedicated division while keeping the broader outcome
              aligned.
            </p>
            <p>
              Whether the engagement is a production AI workflow, a scalable
              SaaS deployment, a security roadmap, a learning program, or an
              executive advisory partnership, the same standard applies:
              practical systems that can operate in the real world.
            </p>
          </div>

          <div className="rounded-3xl border border-black/10 bg-[#111827] p-8 text-white dark:border-white/[0.08] dark:bg-[#080810]">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-blue-300">
              Operating Model
            </p>
            <h2 className="mt-4 font-heading text-2xl font-medium tracking-[-1px]">
              Built for organizations that need both direction and delivery.
            </h2>
            <div className="mt-6 space-y-4">
              {operatingPrinciples.map((principle) => (
                <div key={principle.title} className="flex gap-3">
                  <CheckCircle2
                    className="mt-1 flex-shrink-0 text-blue-300"
                    size={18}
                  />
                  <div>
                    <h3 className="font-medium text-white">
                      {principle.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="divisions"
        eyebrow="Divisions"
        title="Explore the Ecosystem"
        description="Use each division as a focused gateway into the services, capabilities, benefits, industries, and delivery process behind that part of the ecosystem."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {divisions.map((division) => {
            const Icon = division.icon;

            return (
              <Link
                key={division.slug}
                href={`/ecosystem/${division.slug}`}
                className="group rounded-lg border border-black/10 bg-white/80 p-7 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-blue-500/70 hover:shadow-[0_0_35px_rgba(59,130,246,0.18)] dark:border-white/[0.08] dark:bg-white/[0.04]"
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-3 text-blue-600 dark:text-blue-300">
                    <Icon size={24} />
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-500"
                  />
                </div>
                <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
                  {division.label}
                </p>
                <h2 className="mt-3 font-heading text-2xl font-medium tracking-[-1px] text-slate-900 dark:text-white">
                  {division.title}
                </h2>
                <p className="mt-4 leading-7 text-slate-600 dark:text-[#9CA3AF]">
                  {division.heroDescription}
                </p>
                <div className="mt-6 border-t border-black/10 pt-5 dark:border-white/[0.08]">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-[#9CA3AF]">
                    Key capabilities
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {division.capabilities.slice(0, 3).map((capability) => (
                      <span
                        key={capability.title}
                        className="rounded-md border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-700 dark:text-blue-200"
                      >
                        {capability.title}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <div className="border-y border-black/10 bg-[#111827] py-20 text-white dark:border-white/[0.08] dark:bg-[#080810] sm:py-28">
        <div className="px-5 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-blue-300">
                Shared Outcomes
              </p>
              <h2 className="mt-4 font-heading text-4xl font-medium tracking-[-1px] sm:text-5xl">
                What the Ecosystem Helps You Achieve
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                The divisions are specialized, but the outcomes are connected:
                smarter operations, stronger platforms, safer systems, and more
                capable teams.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {divisions.slice(0, 4).map((division) => (
                <div
                  key={division.slug}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:border-blue-400/40 hover:bg-white/[0.06]"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-300">
                    {division.label}
                  </p>
                  <h3 className="mt-4 font-heading text-xl font-medium tracking-[-0.5px] text-white">
                    {division.benefits[0].title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {division.benefits[0].description}
                  </p>
                  <p className="mt-5 border-t border-white/10 pt-4 font-mono text-xs uppercase tracking-[0.16em] text-blue-300">
                    {division.benefits[0].metric}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Section
        id="how-it-connects"
        eyebrow="How It Connects"
        title="From Strategy to Live Systems"
        description="The ecosystem can support a single focused initiative or a broader transformation program spanning multiple divisions."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Compass,
              title: "Define the direction",
              description:
                "Consulting Services turns business goals into an executable roadmap across AI, cloud, security, product, or learning needs.",
            },
            {
              icon: Sparkles,
              title: "Build the capability",
              description:
                "Specialist divisions design and implement the systems, infrastructure, controls, and learning tracks required for the roadmap.",
            },
            {
              icon: Network,
              title: "Scale the operating model",
              description:
                "The work expands into reliable operations, team enablement, continuous improvement, and measurable business outcomes.",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-black/10 bg-white p-7 shadow-xl shadow-blue-500/5 dark:border-white/[0.08] dark:bg-white/[0.04]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-300">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 font-heading text-xl font-medium tracking-[-0.5px] text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600 dark:text-[#9CA3AF]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      <section
        id="contact-cta"
        className="relative overflow-hidden border-t border-black/10 bg-[#111827] px-5 py-24 text-white dark:border-white/[0.08] dark:bg-[#111111] sm:px-6 lg:px-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.24),transparent_32%)]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-blue-300">
            Start Here
          </p>
          <h2 className="mt-4 font-heading text-4xl font-medium tracking-[-1px] sm:text-5xl">
            Find the Right Division for Your Next Move
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Bring your AI, cloud, security, learning, blockchain, or strategy
            goals into one conversation and map the most practical path forward.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact?mode=call" variant="primary">
              Book a Strategy Call
            </ButtonLink>
            <ButtonLink href="/contact" variant="light">
              Contact Us
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
