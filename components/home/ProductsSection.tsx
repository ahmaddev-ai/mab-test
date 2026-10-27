import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Section } from "./shared";

const products = [
  {
    title: "P2P Clouds AI SaaS",
    description:
      "AI-powered product suite for automation, CRM, LMS, support agents, and business intelligence.",
    image: "/p2pclouds.webp",
    href: "https://p2pclouds.net/",
    cta: "View Product",
  },
  {
    title: "Automation Platform",
    description:
      "Workflow automation for teams that need repeatable sales, marketing, support, and operations systems.",
    image: "/services/saas.webp",
    href: "https://p2pclouds.net/ai-agents/",
    cta: "Subscribe",
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

export default function ProductsSection() {
  return (
    <Section
      id="products"
      eyebrow=""
      title="Products / SaaS"
      description="SaaS products and tools built around AI, automation, security, and scalable cloud systems."
    >
      <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
        {products.map((product, index) => (
          <article
            key={product.title}
            className="group flex flex-col overflow-hidden rounded-[28px] border border-black/[0.08] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_24px_50px_-28px_rgba(16,24,40,0.25)] transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-[0_34px_70px_-28px_rgba(37,99,235,0.4)] dark:border-white/[0.08] dark:bg-[#111111] dark:shadow-none dark:hover:border-blue-400/40"
          >
            {/* Image stage */}
            <div className="relative h-56 overflow-hidden border-b border-black/[0.06] bg-gradient-to-br from-slate-100 via-white to-blue-50 dark:border-white/[0.08] dark:from-black dark:via-[#0B0B0F] dark:to-[#0A1226]">
              {/* Grid + glow */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.08)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
              />
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />

              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-9 transition-transform duration-700 group-hover:scale-105"
              />

              <span
                aria-hidden="true"
                className="absolute left-5 top-5 rounded-full border border-black/10 bg-white/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.06] dark:text-blue-300"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-7 sm:p-8">
              <h3 className="text-balance font-heading text-2xl font-medium tracking-[-1px]">
                {product.title}
              </h3>
              <p className="mt-4 flex-1 leading-7 text-slate-600 dark:text-[#9CA3AF]">
                {product.description}
              </p>

              <a
                href={product.href}
                target="_blank"
                rel="noreferrer"
                className="group/cta mt-7 inline-flex w-full items-center justify-between gap-2 rounded-xl bg-gradient-to-b from-blue-500 to-blue-700 py-1.5 pl-6 pr-1.5 font-medium text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.6),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-300 hover:from-blue-500 hover:to-blue-800 hover:shadow-[0_14px_36px_-10px_rgba(37,99,235,0.7),inset_0_1px_0_rgba(255,255,255,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                {product.cta}
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 transition-transform duration-300 group-hover/cta:translate-x-0.5">
                  <ArrowRight size={17} />
                </span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
