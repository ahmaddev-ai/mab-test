// app/(website)/production-llm-and-agentic-ai-engineering/page.tsx
//
// The page only passes data. All content comes from the JSON file.
import type { Metadata } from "next";
import { buildCourseMetadata } from "@/components/course/metadata";
import type { CourseData } from "@/components/course/types";
import courseJson from "@/data/courses/production-llm-agentic-ai.json";
import CoursePage from "@/components/course/CoursePage";

const course = courseJson as unknown as CourseData;

export const metadata: Metadata = buildCourseMetadata(course);

export default function Page() {
  return <CoursePage course={course} />;
}
