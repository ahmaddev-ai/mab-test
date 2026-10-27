"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section } from "./shared";
import Link from "next/link";
import { useState } from "react";

const companies = [
  {
    name: "P2P Clouds",
    role: "CEO",
    description:
      "AI ecosystem, SaaS infrastructure, cloud systems, blockchain solutions, and enterprise technology innovation across modern industries.",
    logo: "/companies/p2pclouds.webp",
    link: "https://p2pclouds.net",
  },
  {
    name: "MABSOL Technologies",
    role: "CEO",
    description:
      "Modern software engineering company building scalable digital products, AI-powered systems, and complete end-to-end startup solutions.",
    logo: "/companies/mab-c.webp",
    link: "https://mabsoltech.com/",
  },
  {
    name: "SkillUstad",
    role: "Research & Development Director",
    description:
      "Advanced AI education platform delivering research-driven learning systems, developer training, and future technology programs globally.",
    logo: "/companies/skill_ustad_0.webp",
    link: "https://skillustad.com/",
  },
  {
    name: "TEPS",
    role: "Education Partner",
    description:
      "Pakistan's leading technical education provider securing futures through industry-aligned programs in technology, engineering, and skills.",
    logo: "/companies/teps.jpg",
    link: "https://www.facebook.com/tepsschools",
  },
];

export default function CompaniesSection() {
  const [errorLogos, setErrorLogos] = useState<Set<string>>(new Set());

  return (
    <Section
      id="companies"
      eyebrow="Companies / Leadership / Ecosystem"
      title="Building Modern Technology Companies."
      description="Leadership roles across AI, cloud infrastructure, education, software engineering, and digital transformation ecosystems."
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {companies.map((company, i) => {
          const gradId = `company-wave-${i}`;
          return (
            <article
              key={company.name}
              className="group flex flex-col overflow-hidden rounded-[28px] border border-black/[0.06] shadow-[0_1px_2px_rgba(16,24,40,0.04),0_24px_50px_-28px_rgba(16,24,40,0.3)] transition-all duration-500 hover:-translate-y-3 hover:border-blue-500/40 hover:shadow-[0_34px_70px_-28px_rgba(37,99,235,0.45)] dark:border-white/[0.08] dark:shadow-none dark:hover:border-blue-400/40"
            >
              {/* ── DARK HEADER ── */}
              <div className="relative isolate overflow-hidden bg-[#111827] px-6 pb-9 pt-10 text-center dark:bg-[#080810]">
                {/* Rings + glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10"
                >
                  {[160, 260, 360].map((size) => (
                    <div
                      key={size}
                      className="absolute left-1/2 top-[52px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]"
                      style={{ width: size, height: size }}
                    />
                  ))}
                  <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/25 opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                {/* Logo */}
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-[22px] bg-black p-2.5 shadow-xl shadow-blue-500/10 ring-1 ring-white/15 transition-transform duration-500 group-hover:scale-105">
                  {errorLogos.has(company.name) ? (
                    <span className="text-2xl font-bold text-white">
                      {company.name.charAt(0)}
                    </span>
                  ) : (
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={68}
                      height={68}
                      className="object-contain"
                      onError={() =>
                        setErrorLogos(
                          (prev) => new Set([...prev, company.name])
                        )
                      }
                    />
                  )}
                </div>

                {/* Company Name */}
                <h3 className="relative mt-5 text-balance font-heading text-xl font-medium leading-snug tracking-tight text-white">
                  {company.name}
                </h3>

                {/* Role */}
                <p className="relative mx-auto mt-3 inline-flex max-w-full rounded-full border border-blue-400/25 bg-blue-400/10 px-3 py-1 text-[10px] font-semibold uppercase leading-snug tracking-[0.18em] text-blue-300">
                  {company.role}
                </p>
              </div>

              {/* ── WAVE TRANSITION ── */}
              <div className="relative" style={{ height: "56px" }}>
                {/* Top half matches dark header */}
                <div className="absolute left-0 right-0 top-0 h-1/2 bg-[#111827] dark:bg-[#080810]" />
                {/* Bottom half matches body */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white dark:bg-slate-900" />
                {/* Gradient wave sits on top */}
                <svg
                  viewBox="0 0 400 56"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient
                      id={gradId}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#1d4ed8" />
                      <stop offset="50%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                  {/* Wave shape — fills from top to the curved bottom edge */}
                  <path
                    d="M0,0 L400,0 L400,22 Q200,58 0,22 Z"
                    fill={`url(#${gradId})`}
                  />
                </svg>
              </div>

              {/* ── BODY ── */}
              <div className="flex flex-1 flex-col bg-white px-6 pb-7 pt-3 dark:bg-slate-900">
                <p className="mb-6 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {company.description}
                </p>

                <div className="mt-auto border-t border-black/[0.06] pt-5 dark:border-white/[0.08]">
                  <Link
                    href={company.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex w-full items-center justify-between gap-2 rounded-full border border-blue-500/30 bg-blue-500/5 py-1.5 pl-5 pr-1.5 text-sm font-medium text-blue-600 transition-all duration-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-300 dark:hover:border-blue-500 dark:hover:bg-blue-500 dark:hover:text-white"
                  >
                    Explore Company
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white transition-all duration-300 group-hover/link:bg-white group-hover/link:text-blue-600 dark:bg-blue-500">
                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
