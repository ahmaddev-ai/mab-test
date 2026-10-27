import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bot, Megaphone } from "lucide-react";
import { COURSE_CATALOG } from "@/data/course-catalog";

// Base route for the course pages. Change this one line if the two course
// folders live under a different parent route.
const COURSES_BASE_PATH = "";

/**
 * The two featured programs. Text comes from each course's data.tsx
 * (chips, heroStats, curriculumStats). Slugs match the route folder names.
 * If COURSE_CATALOG has an entry with the same slug, its image is used;
 * otherwise a designed gradient panel is shown.
 */
const FEATURED = [
  {
    slug: "performance-marketing-mastery-program",
    category: "Digital Marketing",
    title: "Performance Marketing Mastery Program",
    description:
      "Master paid and organic growth across Meta Ads, Google Ads, SEO, YouTube, email, and AI automation, finishing with a real-world internship.",
    stats: ["8 Months", "2 Semesters", "2-Month Internship"],
    chips: [
      "Meta Ads 2026",
      "Google Ads",
      "SEO & YouTube",
      "Email Marketing",
      "AI Automation",
    ],
    icon: Megaphone,
  },
  {
    slug: "production-llm-and-agentic-ai-engineering",
    category: "AI Engineering",
    title: "Production LLM & Agentic AI Engineering",
    description:
      "Go from Python and ML foundations to production RAG, multi-agent systems, LLMOps, AI security, and cloud deployment.",
    stats: ["120+ Topics", "24 Modules", "2 Years Access"],
    chips: [
      "MCP & A2A Agents",
      "GraphRAG & Vector",
      "Fine-Tuning & DPO",
      "AIOps & LLMOps",
      "AI Security & RBAC",
    ],
    icon: Bot,
  },
];

export default function FeaturedCourses() {
  const featuredCourses = FEATURED.map((course) => ({
    ...course,
    image: COURSE_CATALOG.find((c) => c.slug === course.slug)?.image as
      | string
      | undefined,
  }));

  return (
    <section className="scroll-mt-20 px-5 py-16 sm:px-6 sm:py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-blue-600 dark:text-blue-300">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-gradient-to-r from-blue-600 to-transparent dark:from-blue-300"
              />
              Featured Courses
            </p>

            <h2 className="mt-5 text-balance font-heading text-4xl font-medium leading-[1.05] tracking-[-1px] sm:text-5xl lg:text-[56px]">
              Acquire Skills That Pay in Dollars
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-[#9CA3AF]">
              Master AI, development, business, and digital growth with
              industry-focused programs.
            </p>
          </div>

          <Link
            href="/mab-fast-earning-program"
            className="group hidden shrink-0 items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/5 py-2 pl-5 pr-2 text-sm font-medium text-blue-600 transition-all duration-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-blue-400/25 dark:bg-blue-400/10 dark:text-blue-300 dark:hover:border-blue-500 dark:hover:bg-blue-500 dark:hover:text-white md:inline-flex"
          >
            View All
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-white group-hover:text-blue-600 dark:bg-blue-500">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
          {featuredCourses.map((course, index) => {
            const Icon = course.icon;

            return (
              <Link
                key={course.slug}
                href={`${COURSES_BASE_PATH}/${course.slug}`}
                className="group flex flex-col overflow-hidden rounded-[28px] border border-black/[0.08] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_24px_50px_-28px_rgba(16,24,40,0.25)] transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-[0_34px_70px_-28px_rgba(37,99,235,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-white/[0.08] dark:bg-white/[0.04] dark:shadow-none dark:hover:border-blue-400/40"
              >
                {/* Visual header */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#0B1020] via-[#10204A] to-blue-700 sm:h-64">
                  {course.image ? (
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      sizes="(min-width:768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      {/* Rings + glow + icon (used when there is no catalog image) */}
                      <div aria-hidden="true" className="absolute inset-0">
                        {[200, 320, 440, 560].map((size) => (
                          <div
                            key={size}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.08]"
                            style={{ width: size, height: size }}
                          />
                        ))}
                        <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/30 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                      </div>
                      <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl bg-white/10 text-white shadow-2xl ring-1 ring-white/25 backdrop-blur-md transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                        <Icon className="h-9 w-9" />
                      </div>
                    </>
                  )}

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent"
                  />

                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                    {course.category}
                  </span>

                  <span
                    aria-hidden="true"
                    className="absolute bottom-4 right-5 font-mono text-sm text-white/70"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h3 className="text-balance font-heading text-2xl font-medium leading-snug tracking-tight text-slate-900 dark:text-white sm:text-[28px]">
                    {course.title}
                  </h3>

                  <p className="mt-3 text-[15px] leading-7 text-slate-600 dark:text-[#9CA3AF]">
                    {course.description}
                  </p>

                  {/* Key numbers */}
                  <dl className="mt-6 grid grid-cols-3 divide-x divide-black/[0.08] overflow-hidden rounded-2xl border border-black/[0.08] bg-black/[0.02] dark:divide-white/[0.08] dark:border-white/[0.08] dark:bg-white/[0.03]">
                    {course.stats.map((stat) => (
                      <div
                        key={stat}
                        className="flex items-center justify-center px-2 py-3.5 text-center"
                      >
                        <dd className="text-xs font-semibold leading-snug text-slate-800 dark:text-slate-200 sm:text-sm">
                          {stat}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {/* Topic chips */}
                  <ul className="mt-5 flex flex-1 flex-wrap content-start gap-2">
                    {course.chips.map((chip) => (
                      <li
                        key={chip}
                        className="rounded-full border border-blue-500/15 bg-blue-500/5 px-3 py-1 text-xs font-medium text-slate-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-slate-200"
                      >
                        {chip}
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className="mt-7 flex items-center justify-between border-t border-black/[0.06] pt-5 text-sm font-medium text-slate-700 transition-colors duration-300 group-hover:text-blue-600 dark:border-white/[0.08] dark:text-slate-300 dark:group-hover:text-blue-300">
                    Learn More
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.04] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-blue-600 group-hover:text-white dark:bg-white/[0.06]">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile "View All" */}
        <div className="mt-12 text-center md:hidden">
          <Link
            href="/mab-fast-earning-program"
            className="group inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/5 py-2 pl-6 pr-2 text-sm font-medium text-blue-600 transition-all duration-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-blue-400/25 dark:bg-blue-400/10 dark:text-blue-300 dark:hover:border-blue-500 dark:hover:bg-blue-500 dark:hover:text-white"
          >
            View All Courses
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white transition-all duration-300 group-hover:bg-white group-hover:text-blue-600 dark:bg-blue-500">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
