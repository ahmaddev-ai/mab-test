import Image from "next/image";
import {
  ArrowUpRight,
  Bot,
  Building2,
  CheckCircle2,
  Cloud,
  GraduationCap,
  Network,
  Rocket,
} from "lucide-react";
import { ButtonLink, Section } from "@/components/home/shared";

const companies = [
  {
    name: "P2P Clouds",
    role: "CEO",
    category: "AI / Cloud / SaaS",
    description:
      "AI ecosystem, SaaS infrastructure, cloud systems, blockchain solutions, and enterprise technology innovation across modern industries.",
    longDescription:
      "P2P Clouds sits at the center of the technical ecosystem, combining AI development, SaaS engineering, cloud infrastructure, automation, blockchain systems, and enterprise-grade digital transformation services.",
    logo: "/companies/p2pclouds.webp",
    link: "https://p2pclouds.net",
    icon: Cloud,
    focus: ["AI systems", "Cloud infrastructure", "SaaS platforms"],
  },
  {
    name: "MABSOL Technologies",
    role: "CEO",
    category: "Software Engineering",
    description:
      "Modern software engineering company building scalable digital products, AI-powered systems, and complete end-to-end startup solutions.",
    longDescription:
      "MABSOL Technologies focuses on product engineering for founders and businesses that need reliable web platforms, mobile apps, AI-enabled products, and complete technical execution from idea to launch.",
    logo: "/companies/mab-c.webp",
    link: "https://mabsoltech.com/",
    icon: Building2,
    focus: ["Product engineering", "Startup MVPs", "AI-powered apps"],
  },
  {
    name: "SkillUstad",
    role: "Research & Development Director",
    category: "AI Education",
    description:
      "Advanced AI education platform delivering research-driven learning systems, developer training, and future technology programs globally.",
    longDescription:
      "SkillUstad connects practical learning with emerging technology research, helping learners and professionals build relevant skills across AI, development, cloud, and modern digital work.",
    logo: "/companies/skill_ustad_0.webp",
    link: "https://skillustad.com/",
    icon: Bot,
    focus: ["AI education", "Developer training", "R&D programs"],
  },
  {
    name: "TEPS",
    role: "CEO",
    category: "Technical Education",
    description:
      "Pakistan's leading technical education provider securing futures through industry-aligned programs in technology, engineering, and skills.",
    longDescription:
      "TEPS expands the education side of the ecosystem through technical and vocational learning, industry-aligned skills, and accessible pathways for students entering practical careers.",
    logo: "/companies/teps.jpg",
    link: "https://www.facebook.com/tepsschools",
    icon: GraduationCap,
    focus: ["Technical education", "Career pathways", "Skills programs"],
  },
];

const ecosystemRoles = [
  {
    title: "Build",
    description:
      "Software, SaaS, AI systems, cloud infrastructure, and digital products are built through engineering-led companies.",
  },
  {
    title: "Scale",
    description:
      "Products and platforms are supported with automation, infrastructure, security, and digital growth systems.",
  },
  {
    title: "Teach",
    description:
      "Education partners turn technical experience into structured learning, mentorship, and career-ready skill development.",
  },
];

const leadershipSignals = [
  "Leadership across AI, cloud, SaaS, software engineering, and education.",
  "Companies connected by practical execution rather than isolated branding.",
  "A combined ecosystem for building products, training talent, and supporting business transformation.",
  "Direct connection between commercial delivery, research, and skill development.",
];

export default function CompaniesPage() {
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
            Companies / Leadership / Ecosystem
          </p>
          <h1 className="mx-auto mt-5 max-w-5xl font-heading text-4xl font-medium leading-[1.05] tracking-[-1px] text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            Technology Companies Built Around AI, Software, Cloud, and Skills
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-600 dark:text-[#9CA3AF]">
            A connected company ecosystem spanning AI systems, SaaS products,
            cloud infrastructure, software engineering, technical education, and
            career-focused learning.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/companies" variant="primary">
              Explore Companies
            </ButtonLink>
            <ButtonLink href="/ecosystem" variant="outline">
              View Ecosystem
            </ButtonLink>
          </div>
        </div>
      </section>

      <Section
        id="companies"
        eyebrow="Companies"
        title="Leadership Across the Technology Stack"
        description="Each company has its own focus, but together they form a practical ecosystem for building, scaling, and teaching modern technology."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {companies.map((company) => {
            const Icon = company.icon;
            return (
              <article
                key={company.name}
                className="group flex flex-col overflow-hidden rounded-lg border border-black/10 bg-white transition duration-300 hover:-translate-y-1 hover:border-blue-500/70 hover:shadow-[0_0_35px_rgba(59,130,246,0.18)] dark:border-white/[0.08] dark:bg-white/[0.04]"
              >
                <div className="relative overflow-hidden bg-[#111827] px-6 py-9 text-center dark:bg-[#080810]">
                  <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative mx-auto flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-2xl bg-black p-2 ring-1 ring-white/10">
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={68}
                      height={68}
                      className="object-contain"
                    />
                  </div>
                  <h2 className="relative mt-5 text-lg font-bold leading-snug text-white">
                    {company.name}
                  </h2>
                  <p className="relative mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-300">
                    {company.role}
                  </p>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300">
                    <Icon size={15} />
                    {company.category}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-[#9CA3AF]">
                    {company.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {company.focus.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-700 dark:text-blue-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <a
                    href={company.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-blue-600 transition hover:gap-3 dark:text-blue-300"
                  >
                    Explore Company
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <div className="border-y border-black/10 bg-[#111827] py-20 text-white dark:border-white/[0.08] dark:bg-[#080810] sm:py-28">
        <div className="px-5 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-blue-300">
                Company Ecosystem
              </p>
              <h2 className="mt-4 font-heading text-4xl font-medium tracking-[-1px] sm:text-5xl">
                Built to Connect Delivery, Growth, and Education
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                The companies are structured around a clear operating model:
                build real products, scale them through modern infrastructure
                and growth systems, then transfer knowledge through practical
                learning pathways.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {ecosystemRoles.map((role) => (
                <div
                  key={role.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-7"
                >
                  <p className="font-heading text-4xl font-medium tracking-[-1px] text-blue-300">
                    {role.title}
                  </p>
                  <p className="mt-5 leading-7 text-slate-300">
                    {role.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Section
        id="company-details"
        eyebrow="Company Focus"
        title="What Each Company Contributes"
        description="A closer look at how each organization fits into the wider leadership and technology ecosystem."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {companies.map((company) => {
            const Icon = company.icon;
            return (
              <div
                key={company.name}
                className="rounded-3xl border border-black/10 bg-white p-7 shadow-xl shadow-blue-500/5 dark:border-white/[0.08] dark:bg-white/[0.04]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-300">
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300">
                      {company.category}
                    </p>
                    <h2 className="mt-2 font-heading text-2xl font-medium tracking-[-1px]">
                      {company.name}
                    </h2>
                  </div>
                </div>
                <p className="mt-5 leading-8 text-slate-600 dark:text-[#9CA3AF]">
                  {company.longDescription}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section
        id="leadership"
        eyebrow="Leadership Model"
        title="One Connected Direction"
        description="The company ecosystem is designed to support both commercial delivery and long-term talent development."
      >
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-xl shadow-blue-500/5 dark:border-white/[0.08] dark:bg-white/[0.04]">
            <Rocket className="text-blue-600 dark:text-blue-300" size={30} />
            <h2 className="mt-5 font-heading text-2xl font-medium tracking-[-1px]">
              Companies that reinforce each other
            </h2>
            <p className="mt-4 leading-8 text-slate-600 dark:text-[#9CA3AF]">
              Product work informs training. Cloud and AI work informs software
              delivery. Education partnerships create a stronger talent
              pipeline. The result is a company network that can serve clients,
              students, and founders from multiple angles.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {leadershipSignals.map((signal) => (
              <div
                key={signal}
                className="flex gap-3 rounded-2xl border border-black/10 bg-white/80 p-5 dark:border-white/[0.08] dark:bg-white/[0.04]"
              >
                <CheckCircle2
                  className="mt-1 flex-shrink-0 text-blue-600 dark:text-blue-300"
                  size={20}
                />
                <p className="text-sm leading-7 text-slate-600 dark:text-[#9CA3AF]">
                  {signal}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <section className="relative overflow-hidden border-t border-black/10 bg-[#111827] px-5 py-24 text-white dark:border-white/[0.08] dark:bg-[#111111] sm:px-6 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.24),transparent_32%)]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-blue-300">
            Work With the Ecosystem
          </p>
          <h2 className="mt-4 font-heading text-4xl font-medium tracking-[-1px] sm:text-5xl">
            Build, Scale, or Learn Through the Right Company
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Whether you need a SaaS platform, AI system, technical education
            pathway, or software delivery partner, the company ecosystem gives
            you a practical starting point.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact?mode=call" variant="primary">
              Book a Strategy Call
            </ButtonLink>
            <ButtonLink href="/products" variant="light">
              View Products
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
