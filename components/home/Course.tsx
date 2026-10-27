"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  ShieldCheck,
  Globe,
  Smartphone,
  Rocket,
  ArrowRight,
} from "lucide-react";

const featuredCourses = [
  {
    title: "AI SaaS Development",
    slug: "ai-saas-development",
    icon: BrainCircuit,
    desc: "Build scalable AI products & SaaS systems.",
  },
  {
    title: "AI Ethical Hacking",
    slug: "ai-ethical-hacking",
    icon: ShieldCheck,
    desc: "Modern cybersecurity & bug bounty systems.",
  },
  {
    title: "Web Development",
    slug: "web-development",
    icon: Globe,
    desc: "Frontend, backend & full-stack engineering.",
  },
  {
    title: "Mobile Apps with AI",
    slug: "mobile-app-with-ai",
    icon: Smartphone,
    desc: "Build Android & iOS apps using AI workflows.",
  },
];

export default function HomeCoursesSection() {
  return (
    <section className="relative overflow-hidden px-5 py-28 sm:px-6 lg:px-10">
      {/* BG */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_28%),linear-gradient(to_bottom,#F8FAFC,#EEF2FF,#F8FAFC)] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_25%),linear-gradient(to_bottom,#050505,#0B1120,#030303)]" />

      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-blue-600 dark:text-blue-300">
            Courses Ecosystem
          </p>

          <h2 className="mt-5 font-heading text-4xl font-medium tracking-[-1px] text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            Learn Future-Proof
            <span className="block bg-gradient-to-r from-blue-600 to-violet-500 bg-clip-text text-transparent">
              Digital Skills.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
            Industry-focused programs in AI, Development, Security, Marketing &
            Online Business.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredCourses.map((course, index) => {
            const Icon = course.icon;

            return (
              <motion.div
                key={course.slug}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/mab-fast-earning-program/${course.slug}`}
                  className="group block rounded-[28px] border border-black/10 bg-white/60 p-7 shadow-xl shadow-blue-500/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-blue-500/15 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
                    <Icon className="h-7 w-7 text-blue-600 dark:text-blue-300" />
                  </div>

                  <h3 className="mt-6 text-2xl font-medium text-slate-900 dark:text-white">
                    {course.title}
                  </h3>

                  <p className="mt-4 text-[15px] leading-7 text-slate-600 dark:text-slate-400">
                    {course.desc}
                  </p>

                  <div className="mt-8 flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-300">
                    Explore Course
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* BUTTON */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/mab-fast-earning-program"
            className="rounded-full border border-black/10 bg-white px-7 py-3 text-sm font-medium transition-all hover:border-blue-500 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:hover:border-blue-400"
          >
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  );
}
