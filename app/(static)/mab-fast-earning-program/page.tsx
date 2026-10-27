"use client";

import Image from "next/image";
import Link from "next/link";
import { COURSE_CATALOG } from "@/data/course-catalog";
import { ArrowRight, Search } from "lucide-react";
import { useMemo, useState } from "react";

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "AI",
    "Development",
    "Business",
    "Marketing",
    "Security",
    "Mobile",
    "Startup",
    "Freelancing",
  ];

  const filteredCourses = useMemo(() => {
    return COURSE_CATALOG.filter((course) => {
      const matchesSearch = course.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "All" || course.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <section className="relative isolate overflow-hidden bg-white px-5 py-28 text-slate-900 dark:bg-[#050505] dark:text-white sm:px-6 lg:px-10">
      {/* HERO BACKGROUND */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.10),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(139,92,246,0.08),transparent_24%),linear-gradient(145deg,#F8FAFC_0%,#E5E7EB_58%,#F8FAFC_100%)] dark:bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.18),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(139,92,246,0.12),transparent_24%),linear-gradient(145deg,#050505_0%,#0E0E11_58%,#020202_100%)]" />

      {/* GRID */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-blue-600 dark:text-blue-300">
            Courses Ecosystem
          </p>

          <h1 className="mt-5 text-4xl font-medium leading-[0.95] tracking-[-2px] text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            Premium AI &
            <span className="mt-2 block bg-gradient-to-r from-blue-600 to-violet-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-violet-400">
              Digital Programs.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-[#9CA3AF]">
            Industry-focused learning systems for developers, freelancers,
            marketers, founders, and AI builders.
          </p>
        </div>

        {/* SEARCH */}
        <div className="mt-14 flex flex-col gap-6 lg:flex-row">
          {/* SIDEBAR */}
          <div className="w-full lg:w-[260px]">
            <div className="sticky top-24 rounded-[28px] border border-black/5 bg-white/70 p-6 shadow-xl shadow-blue-500/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-blue-500/10">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-[#9CA3AF]" />

                <input
                  type="text"
                  placeholder="Search courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-black/10 bg-white/80 pl-11 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-[#6B7280]"
                />
              </div>

              {/* Categories */}
              <div className="mt-8">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500 dark:text-[#9CA3AF]">
                  Categories
                </p>

                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition-all duration-300 ${
                        activeCategory === category
                          ? "border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:border-blue-500/30 dark:bg-blue-500/15 dark:text-blue-300"
                          : "border border-black/5 bg-black/[0.02] text-slate-600 hover:bg-black/[0.04] hover:text-slate-900 dark:border-white/5 dark:bg-white/[0.03] dark:text-[#9CA3AF] dark:hover:bg-white/[0.06] dark:hover:text-white"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* COURSES */}
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {filteredCourses.map((course, index) => (
                <Link
                  href={`/mab-fast-earning-program/${course.slug}`}
                  key={index}
                  className="group overflow-hidden rounded-[28px] border border-black/5 bg-white/70 shadow-xl shadow-blue-500/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/20 hover:shadow-[0_20px_60px_rgba(59,130,246,0.10)] dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-500/30 dark:hover:bg-white/[0.05] dark:hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)]"
                >
                  {/* IMAGE */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/10 to-transparent dark:from-[#050505] dark:via-black/10 dark:to-transparent" />

                    {/* CATEGORY */}
                    <div className="absolute left-2 top-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-blue-600 backdrop-blur-md dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300">
                      {course.category}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">
                    <h2 className="line-clamp-2 text-lg font-medium leading-snug text-slate-900 dark:text-white">
                      {course.title}
                    </h2>

                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600 dark:text-[#9CA3AF]">
                      {course.shortDesc}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-sm font-medium text-blue-600 transition-all duration-300 group-hover:gap-3 dark:text-blue-300">
                      Explore
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* EMPTY */}
            {filteredCourses.length === 0 && (
              <div className="flex min-h-[300px] items-center justify-center rounded-[28px] border border-black/5 bg-white/70 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="text-center">
                  <h3 className="text-2xl font-medium text-slate-900 dark:text-white">
                    No Courses Found
                  </h3>

                  <p className="mt-3 text-slate-600 dark:text-[#9CA3AF]">
                    Try another keyword or category.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
