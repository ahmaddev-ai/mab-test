import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  LinkIcon,
  Package,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { PRODUCTS } from "@/data/data";
import { ButtonLink, Section } from "@/components/home/shared";

const featuredProducts = [
  {
    title: "P2P Clouds AI SaaS",
    description:
      "AI-powered product suite for automation, CRM, LMS, support agents, and business intelligence.",
    image: "/p2pclouds.webp",
    href: "https://p2pclouds.net/",
    cta: "View Platform",
  },
  {
    title: "Automation Platform",
    description:
      "Workflow automation for teams that need repeatable sales, marketing, support, and operations systems.",
    image: "/services/saas.webp",
    href: "https://p2pclouds.net/ai-agents/",
    cta: "Explore Automation",
  },
  {
    title: "Security Dashboard",
    description:
      "Centralized visibility for cybersecurity status, audits, monitoring, incidents, and executive reporting.",
    image: "/vision/cybersecurity.webp",
    href: "https://p2pclouds.net/",
    cta: "Request Demo",
  },
];

const productSystems = [
  {
    title: "Templates and operating systems",
    description:
      "Practical documents, checklists, planning sheets, and workflows built for marketers, agencies, founders, and growth teams.",
    icon: FileText,
  },
  {
    title: "AI and automation products",
    description:
      "SaaS tools and intelligent automation layers connected to business operations, support, sales, and reporting workflows.",
    icon: Sparkles,
  },
  {
    title: "Security and cloud tooling",
    description:
      "Operational products designed around visibility, reliability, monitoring, audits, and secure platform growth.",
    icon: ShieldCheck,
  },
];

const productBenefits = [
  "Ready-to-use systems instead of starting from a blank page.",
  "Built from practical experience across growth, SaaS, AI, and operations.",
  "Designed for founders, agencies, freelancers, and modern technical teams.",
  "Connected to training, consulting, and implementation support where needed.",
];

export default function ProductsPage() {
  return (
    <main className="overflow-hidden bg-[#F8FAFC] text-[#0A0A0A] dark:bg-[#0A0A0A] dark:text-white">
      <section className="relative isolate overflow-hidden px-5 pt-24 sm:px-6 lg:px-10">
        <div className="absolute inset-0 z-[-2] bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.22),transparent_32%),linear-gradient(145deg,#F8FAFC_0%,#E5E7EB_55%,#F8FAFC_100%)] dark:bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.2),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(139,92,246,0.12),transparent_26%),linear-gradient(145deg,#0A0A0A_0%,#111111_58%,#050505_100%)]" />
        <div className="absolute inset-0 z-[-1] bg-[linear-gradient(rgba(59,130,246,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.07)_1px,transparent_1px)] bg-[size:72px_72px] opacity-70" />

        <div className="relative z-10 mx-auto max-w-6xl py-16 text-center sm:py-24">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-300">
            <Package size={30} />
          </div>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.32em] text-blue-600 dark:text-blue-300">
            Products / SaaS / Digital Assets
          </p>
          <h1 className="mx-auto mt-5 max-w-5xl font-heading text-4xl font-medium leading-[1.05] tracking-[-1px] text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            Digital Products Built for Growth, Automation, and Execution
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-600 dark:text-[#9CA3AF]">
            Explore SaaS platforms, automation systems, dashboards, templates,
            checklists, and operating assets designed to help founders,
            agencies, marketers, and technical teams move faster with practical
            systems.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            {/* <ButtonLink href="#catalog" variant="primary">
              Browse Catalog
            </ButtonLink> */}
            <ButtonLink href="/contact" variant="outline">
              Request Custom Product
            </ButtonLink>
          </div>
        </div>
      </section>

      <Section
        id="featured"
        eyebrow="Featured Products"
        title="SaaS and Platform Products"
        description="Core products connected to the broader Ahmad Basit ecosystem across AI, automation, cloud, security, and business operations."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <article
              key={product.title}
              className="overflow-hidden rounded-lg border border-black/10 bg-white dark:border-white/[0.08] dark:bg-[#111111]"
            >
              <div className="relative h-56 border-b border-black/10 bg-slate-100 dark:border-white/[0.08] dark:bg-black">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-8"
                />
              </div>
              <div className="p-7">
                <h2 className="font-heading text-2xl font-medium tracking-[-1px]">
                  {product.title}
                </h2>
                <p className="mt-4 min-h-28 leading-7 text-slate-600 dark:text-[#9CA3AF]">
                  {product.description}
                </p>
                <a
                  href={product.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                >
                  {product.cta}
                  <ArrowRight size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <div className="border-y border-black/10 bg-[#111827] py-20 text-white dark:border-white/[0.08] dark:bg-[#080810] sm:py-28">
        <div className="px-5 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-blue-300">
                Product System
              </p>
              <h2 className="mt-4 font-heading text-4xl font-medium tracking-[-1px] sm:text-5xl">
                Built Around Repeatable Execution
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                These products are not random downloads. They sit inside a
                broader operating model for launching campaigns, building SaaS,
                automating workflows, and improving technical operations.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {productSystems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-7"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-400/10 text-blue-300">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-5 font-heading text-xl font-medium tracking-[-0.5px]">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-300">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Section
        id="why-products"
        eyebrow="Why These Products"
        title="Practical Assets for People Who Need to Ship"
        description="The catalog is designed for users who need structure, clarity, and implementation speed across marketing, operations, SaaS, and digital growth."
      >
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-xl shadow-blue-500/5 dark:border-white/[0.08] dark:bg-white/[0.04]">
            <Workflow className="text-blue-600 dark:text-blue-300" size={30} />
            <h2 className="mt-5 font-heading text-2xl font-medium tracking-[-1px]">
              From idea to usable workflow
            </h2>
            <p className="mt-4 leading-8 text-slate-600 dark:text-[#9CA3AF]">
              Every product focuses on reducing friction. Instead of spending
              days building a process from scratch, teams can start with a
              proven structure and adapt it to their own work.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {productBenefits.map((benefit) => (
              <div
                key={benefit}
                className="flex gap-3 rounded-2xl border border-black/10 bg-white/80 p-5 dark:border-white/[0.08] dark:bg-white/[0.04]"
              >
                <CheckCircle2
                  className="mt-1 flex-shrink-0 text-blue-600 dark:text-blue-300"
                  size={20}
                />
                <p className="text-sm leading-7 text-slate-600 dark:text-[#9CA3AF]">
                  {benefit}
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
            Product Support
          </p>
          <h2 className="mt-4 font-heading text-4xl font-medium tracking-[-1px] sm:text-5xl">
            Need a Custom Product or Internal Tool?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Build a custom template, dashboard, automation system, or SaaS
            workflow around your exact business process.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact?mode=call" variant="primary">
              Book a Strategy Call
            </ButtonLink>
            <ButtonLink href="/ecosystem" variant="light">
              View Ecosystem
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
