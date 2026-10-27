import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, Quote } from "lucide-react";
import { ButtonLink, Section } from "@/components/home/shared";
import type { EcosystemDivision } from "@/data/ecosystem";

interface Props {
  division: EcosystemDivision;
}

export default function EcosystemDetailPage({ division }: Props) {
  const HeroIcon = division.icon;

  return (
    <main className="overflow-hidden bg-[#F8FAFC] text-[#0A0A0A] dark:bg-[#0A0A0A] dark:text-white">
      {/* ================= HERO ================= */}
      <section className="relative isolate overflow-hidden px-5 pt-24 sm:px-6 lg:px-10">
        <div className="absolute inset-0 z-[-2] bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.22),transparent_32%),linear-gradient(145deg,#F8FAFC_0%,#E5E7EB_55%,#F8FAFC_100%)] dark:bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.2),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(139,92,246,0.12),transparent_26%),linear-gradient(145deg,#0A0A0A_0%,#111111_58%,#050505_100%)]" />
        <div className="absolute inset-0 z-[-1] bg-[linear-gradient(rgba(59,130,246,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.07)_1px,transparent_1px)] bg-[size:72px_72px] opacity-70" />

        <div className="relative z-10 mx-auto max-w-7xl py-16 sm:py-20">
          <nav aria-label="Breadcrumb" className="flex justify-center lg:justify-start">
            <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500 dark:text-[#9CA3AF]">
              <li>
                <Link
                  href="/#ecosystem"
                  className="transition hover:text-blue-600 dark:hover:text-blue-300"
                >
                  Ecosystem
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-blue-600 dark:text-blue-300">
                {division.navLabel}
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            {/* LEFT: COPY */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-500/20 bg-blue-500/[0.07] px-4 py-2 dark:border-blue-400/20 dark:bg-blue-400/[0.08]">
                <HeroIcon size={16} className="text-blue-600 dark:text-blue-300" />
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-blue-600 dark:text-blue-300">
                  {division.heroSubheading}
                </span>
              </div>

              <h1 className="mt-6 font-heading text-4xl font-medium leading-[1.08] tracking-[-1px] text-slate-900 dark:text-white sm:text-5xl lg:text-[3.4rem]">
                {division.heroHeadline}
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-[#9CA3AF] lg:mx-0">
                {division.heroDescription}
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <ButtonLink href="/contact?mode=call" variant="primary">
                  Book a Strategy Call
                </ButtonLink>
                <ButtonLink href="/contact" variant="outline">
                  Discuss Your Project
                </ButtonLink>
              </div>
            </div>

            {/* RIGHT: PHOTO */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[360px]">
                <div className="absolute -inset-3 -z-10 rounded-[28px] bg-gradient-to-br from-blue-500/15 via-transparent to-violet-500/10 blur-2xl" />
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-2xl shadow-blue-500/10 dark:border-white/10 dark:bg-white/5 dark:shadow-blue-500/20">
                  <Image
                    src={division.heroImage}
                    alt={`Mian Ahmad Basit — ${division.navLabel}`}
                    fill
                    priority
                    sizes="(min-width:1024px) 360px, 80vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-200">
                      {division.label}
                    </p>
                    <p className="mt-1 font-heading text-lg font-medium text-white">
                      Mian Ahmad Basit
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {division.overviewStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-black/10 bg-white/70 px-6 py-6 text-center backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04] sm:text-left"
              >
                <p className="font-heading text-2xl font-medium tracking-[-0.5px] text-blue-600 dark:text-blue-300 sm:text-3xl">
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

      {/* ================= OVERVIEW ================= */}
      <Section
        id="overview"
        eyebrow="Overview"
        title={division.overviewTitle}
      >
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            {division.overviewParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-8 text-slate-600 dark:text-[#9CA3AF] sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* PERSONAL NOTE PANEL — redesigned as a quote card with photo */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111827] p-8 text-white dark:bg-[#080810]">
            <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative flex items-center gap-4">
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border-2 border-blue-400/40">
                <Image
                  src="/mab.webp"
                  alt="Mian Ahmad Basit"
                  fill
                  sizes="56px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <p className="font-heading text-base font-medium text-white">
                  Mian Ahmad Basit
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-300">
                  {division.label}
                </p>
              </div>
              <Quote
                size={28}
                className="ml-auto flex-shrink-0 text-blue-400/30"
                aria-hidden="true"
              />
            </div>

            <h3 className="mt-6 font-heading text-xl font-medium tracking-[-0.5px] text-white">
              {division.personalNoteTitle}
            </h3>
            <p className="mt-3 leading-7 text-slate-300">
              {division.personalNote}
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 border-t border-white/10 pt-5 text-sm font-medium text-blue-300 transition hover:text-blue-200"
            >
              Start a conversation with me
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Section>

      {/* ================= CAPABILITIES ================= */}
      <Section
        id="capabilities"
        eyebrow="Services / Capabilities"
        title={division.capabilitiesTitle}
        description={division.capabilitiesDescription}
      >
        <div className="grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-4">
          {division.capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <div
                key={capability.title}
                className="group flex flex-col rounded-lg border border-black/10 bg-white/80 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-blue-500/70 hover:shadow-[0_0_35px_rgba(59,130,246,0.18)] dark:border-white/[0.08] dark:bg-white/[0.04]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-300">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 font-heading text-lg font-medium tracking-[-0.5px] text-slate-900 dark:text-white">
                  {capability.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-[#9CA3AF]">
                  {capability.description}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ================= SOLUTIONS ================= */}
      <div className="border-y border-black/10 bg-[#111827] py-20 text-white dark:border-white/[0.08] dark:bg-[#080810] sm:py-28">
        <div className="px-5 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-blue-300">
                Solutions
              </p>
              <h2 className="mt-4 font-heading text-4xl font-medium tracking-[-1px] sm:text-5xl">
                Implementation in Practice
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Real-world scenarios I solve for clients, and the business
                outcomes that follow.
              </p>
            </div>

            <div className="grid auto-rows-fr gap-6 md:grid-cols-2">
              {division.solutions.map((solution) => (
                <div
                  key={solution.title}
                  className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:border-blue-400/40 hover:bg-white/[0.06]"
                >
                  <h3 className="font-heading text-xl font-medium tracking-[-0.5px] text-white">
                    {solution.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-7 text-slate-300">
                    {solution.description}
                  </p>
                  <div className="mt-5 flex items-start gap-2 border-t border-white/10 pt-4 text-sm text-blue-300">
                    <ArrowUpRight size={16} className="mt-0.5 flex-shrink-0" />
                    <span>{solution.outcome}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= BENEFITS ================= */}
      <Section
        id="benefits"
        eyebrow="Benefits"
        title="Real Value, Not Just Technical Novelty"
        description="What clients consistently notice after working with me, beyond the technology itself."
      >
        <div className="grid auto-rows-fr gap-6 md:grid-cols-2 xl:grid-cols-4">
          {division.benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex flex-col rounded-3xl border border-black/10 bg-white p-7 shadow-xl shadow-blue-500/5 dark:border-white/[0.08] dark:bg-white/[0.04]"
            >
              <CheckCircle2 className="text-blue-600 dark:text-blue-300" size={24} />
              <h3 className="mt-5 font-heading text-lg font-medium tracking-[-0.5px] text-slate-900 dark:text-white">
                {benefit.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-[#9CA3AF]">
                {benefit.description}
              </p>
              <p className="mt-5 border-t border-black/5 pt-4 text-sm font-medium leading-snug text-slate-700 dark:border-white/[0.06] dark:text-slate-200">
                {benefit.metric}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ================= INDUSTRIES ================= */}
      <Section
        id="industries"
        eyebrow="Industries"
        title="Industries I Work With"
        description="Engagements span sectors with different constraints, but the same demand for systems that actually work in production."
      >
        <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {division.industries.map((industry) => (
            <div
              key={industry.name}
              className="flex flex-col rounded-2xl border border-black/10 bg-white/80 p-6 backdrop-blur transition duration-300 hover:border-blue-500/50 dark:border-white/[0.08] dark:bg-white/[0.04]"
            >
              <h3 className="font-heading text-lg font-medium tracking-[-0.5px] text-slate-900 dark:text-white">
                {industry.name}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-[#9CA3AF]">
                {industry.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ================= PROCESS ================= */}
      <div className="border-y border-black/10 bg-slate-50 py-20 dark:border-white/[0.08] dark:bg-[#0D0D10] sm:py-28">
        <div className="px-5 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-blue-600 dark:text-blue-300">
                Process / Methodology
              </p>
              <h2 className="mt-4 font-heading text-4xl font-medium tracking-[-1px] text-slate-900 dark:text-white sm:text-5xl">
                How I Take This From Idea to Impact
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-[#9CA3AF]">
                A structured, end-to-end workflow that keeps every engagement
                accountable to a clear outcome.
              </p>
            </div>

            <div className="grid auto-rows-fr gap-6 md:grid-cols-5">
              {division.process.map((step, index) => (
                <div key={step.step} className="relative flex">
                  <div className="flex w-full flex-col rounded-2xl border border-black/10 bg-white p-6 dark:border-white/[0.08] dark:bg-white/[0.04]">
                    <span className="font-heading text-3xl font-medium tracking-[-1px] text-blue-500/40 dark:text-blue-400/30">
                      {step.step}
                    </span>
                    <h3 className="mt-4 font-heading text-base font-medium tracking-[-0.3px] text-slate-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-slate-600 dark:text-[#9CA3AF]">
                      {step.description}
                    </p>
                  </div>
                  {index < division.process.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="absolute right-[-12px] top-1/2 hidden h-px w-6 -translate-y-1/2 bg-blue-500/30 md:block"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= WHY CHOOSE ME ================= */}
      <Section
        id="why-choose-us"
        eyebrow="Why Work With Me"
        title="Trust Built on Delivered Work"
        description="Differentiators that come from actually building and operating these systems myself, not just advising on them from the outside."
      >
        <div className="grid auto-rows-fr gap-6 md:grid-cols-2">
          {division.whyChooseUs.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-2xl border border-black/10 bg-white/80 p-6 backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]"
            >
              <CheckCircle2
                className="mt-1 flex-shrink-0 text-blue-600 dark:text-blue-300"
                size={22}
              />
              <div>
                <h3 className="font-heading text-lg font-medium tracking-[-0.5px] text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-[#9CA3AF]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ================= CTA ================= */}
      <section
        id="contact-cta"
        className="relative overflow-hidden border-t border-black/10 bg-[#111827] px-5 py-24 text-white dark:border-white/[0.08] dark:bg-[#111111] sm:px-6 lg:px-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.24),transparent_32%)]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-blue-300">
            {division.label}
          </p>
          <h2 className="mt-4 font-heading text-4xl font-medium tracking-[-1px] sm:text-5xl">
            {division.ctaHeadline}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            {division.ctaDescription}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact?mode=call" variant="primary">
              Book a Strategy Call
            </ButtonLink>
            <ButtonLink href="/contact" variant="light">
              Contact Me
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}