import {
  ArrowRight,
  Bot,
  Building2,
  Cloud,
  GraduationCap,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { Section } from "./shared";

const ecosystemCards = [
  {
    title: "AI Systems Division",
    label: "AI / Automation",
    description:
      "Applied AI systems, agent workflows, enterprise automation, and productized intelligence for modern businesses.",
    href: "/ecosystem/ai-systems-division",
    icon: Bot,
  },
  {
    title: "Cloud Infrastructure",
    label: "Cloud / DevOps",
    description:
      "Scalable cloud architecture, SaaS deployments, infrastructure modernization, and operational reliability.",
    href: "/ecosystem/cloud-infrastructure",
    icon: Cloud,
  },
  {
    title: "Blockchain Institute",
    label: "Web3 / Systems",
    description:
      "Blockchain education, decentralized systems research, Web3 engineering, and ecosystem enablement.",
    href: "/ecosystem/blockchain-institute",
    icon: WalletCards,
  },
  {
    title: "Security Systems",
    label: "Cybersecurity",
    description:
      "Security dashboards, audits, monitoring, identity controls, and resilient digital protection layers.",
    href: "/ecosystem/security-systems",
    icon: ShieldCheck,
  },
  {
    title: "Learning Pathways",
    label: "Learning / Skills",
    description:
      "High-impact technology learning programs, student success pathways, and practical career acceleration.",
    href: "/ecosystem/learning-pathways",
    icon: GraduationCap,
  },
  {
    title: "Consulting Services",
    label: "Strategy / Build",
    description:
      "Founder-led advisory for AI adoption, SaaS scaling, cloud strategy, and secure digital transformation.",
    href: "/ecosystem/consulting-services",
    icon: Building2,
  },
];

export default function EcosystemSection() {
  return (
    <Section
      id="ecosystem"
      eyebrow=""
      title="Technology Ecosystem"
      description="Each card opens a closer look at where I personally lead, build, and advise. Click through to explore the full scope of any division."
    >
      <div className="grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3">
        {ecosystemCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <a
              key={card.title}
              href={card.href}
              className="group relative isolate flex flex-col overflow-hidden rounded-[28px] border border-black/[0.08] bg-white/80 p-7 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_20px_44px_-28px_rgba(16,24,40,0.2)] backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-500/50 hover:shadow-[0_30px_60px_-28px_rgba(37,99,235,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-white/[0.08] dark:bg-white/[0.04] dark:shadow-none dark:hover:border-blue-400/50 sm:p-8"
            >
              {/* Hover glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 -z-10 h-56 w-56 rounded-full bg-blue-500/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              <div className="flex items-start justify-between gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/30 ring-1 ring-white/20 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
                  <Icon size={22} />
                </div>

                <span
                  aria-hidden="true"
                  className="font-mono text-sm text-slate-300 transition-colors duration-300 group-hover:text-blue-500 dark:text-white/20 dark:group-hover:text-blue-300"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="mt-7 text-[11px] font-medium uppercase tracking-[0.14em] text-blue-600/80 dark:text-blue-300/80">
                {card.label}
              </p>
              <h3 className="mt-2 font-heading text-2xl font-medium tracking-[-1px] text-slate-900 dark:text-white">
                {card.title}
              </h3>
              <p className="mt-4 flex-1 leading-7 text-slate-600 dark:text-[#9CA3AF]">
                {card.description}
              </p>

              <div className="mt-7 flex items-center justify-between border-t border-black/[0.06] pt-5 text-sm font-medium text-slate-700 transition-colors duration-300 group-hover:text-blue-600 dark:border-white/[0.08] dark:text-slate-300 dark:group-hover:text-blue-300">
                Explore division
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.04] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-blue-600 group-hover:text-white dark:bg-white/[0.06]">
                  <ArrowRight size={15} />
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </Section>
  );
}
