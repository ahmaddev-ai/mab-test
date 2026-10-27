"use client";

import { COURSEDATA } from "@/data/data";
import Image from "next/image";
import Link from "next/link";

export default function HomeCourses() {
  // convert object → array and take only 3 courses
  const courses = Object.values(COURSEDATA).slice(0, 3);

  return (
    <section className="w-full bg-[#05060A] py-5 px-4 sm:px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Popular Courses
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            Learn in-demand skills with practical, industry-focused courses
            designed to help you grow faster.
          </p>
        </div>

        {/* COURSES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Link
              key={course.slug}
              href={`/mab-fast-earning-program/${course.slug}`}
              className="group"
            >
              <div
                className="
                  h-full rounded-2xl overflow-hidden
                  bg-white/5 border border-white/10
                  backdrop-blur-md
                  transition
                  hover:border-emerald-400/40
                  hover:shadow-[0_0_25px_rgba(16,185,129,0.35)]
                "
              >
                {/* IMAGE */}
                <div className="relative w-full h-48">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white">
                    {course.title}
                  </h3>

                  <p className="mt-3 text-white/60 text-sm leading-relaxed">
                    {course.shortDesc}
                  </p>

                  {/* META */}
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-white/50">{course.duration}</span>
                  </div>

                  {/* CTA */}
                  <div className="mt-6">
                    <span
                      className="
                        inline-block text-sm font-semibold
                        text-black bg-emerald-500
                        px-4 py-2 rounded-full
                        shadow-[0_0_15px_rgba(16,185,129,0.45)]
                        group-hover:bg-emerald-600
                        transition
                      "
                    >
                      View Course
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* VIEW ALL BUTTON */}
        <div className="mt-14 text-center">
          <Link
            href="/mab-fast-earning-program"
            className="
              inline-block rounded-full
              px-8 py-4 text-lg font-semibold
              border border-white/20 text-white
              hover:bg-white/5 hover:border-emerald-400/40
              transition
            "
          >
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  );
}
