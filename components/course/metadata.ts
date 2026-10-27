import type { Metadata } from "next";
import type { CourseData } from "./types";
import { resolveCourse } from "./course-data";

/** Builds Next.js metadata from the course JSON (server safe). */
export function buildCourseMetadata(raw: CourseData): Metadata {
  const course = resolveCourse(raw);
  return {
    title: course.seo.title,
    description: course.seo.description,
    alternates: { canonical: course.seo.canonical },
    openGraph: {
      title: course.seo.title,
      description: course.seo.description,
      type: "website",
    },
  };
}
