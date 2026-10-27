"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Sora } from "next/font/google";
import { resolveCourse } from "./course-data";
import type { CourseData } from "./types";
import Hero from "./Hero";
import { FloatingOfferBar, OfferStrip } from "./OfferBars";
import SectionNav from "./SectionNav";
import EnrollModal from "./EnrollModal";
import VideoReels from "./VideoReels";
import Roadmap from "./Roadmap";
import CurriculumExplorer from "./CurriculumExplorer";
import Simulator from "./Simulator";
import TechStack from "./TechStack";
import CareerSection from "./CareerSection";
import Diagnostic from "./Diagnostic";
import FaqSection from "./FaqSection";
import {
  BonusesSection,
  FinalCtaSection,
  HighlightsSection,
  InstructorsSection,
  MentorBand,
  SecuritySection,
  ToolsSection,
} from "./Sections";

// Font loaders must live at module scope
const display = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

/**
 * Reusable course landing page.
 * Pass a course JSON object and everything on the page is rendered from it.
 * Control which sections show (and in what order) with `layout` in the JSON.
 */
export default function CoursePage({ course: raw }: { course: CourseData }) {
  const course = useMemo(() => resolveCourse(raw), [raw]);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const openEnroll = () => setEnrollOpen(true);
  const closeEnroll = () => setEnrollOpen(false);

  const sections: Record<string, () => ReactNode> = {
    videos: () =>
      course.videos ? (
        <VideoReels
          key="videos"
          id="videos"
          heading={course.videos.heading}
          description={course.videos.description}
          items={course.videos.items}
        />
      ) : null,
    instructors: () =>
      course.instructors ? (
        <InstructorsSection
          key="instructors"
          id="instructors"
          copy={course.instructors}
        />
      ) : null,
    highlights: () =>
      course.highlights ? (
        <HighlightsSection
          key="highlights"
          id="highlights"
          copy={course.highlights}
        />
      ) : null,
    career: () =>
      course.career ? (
        <CareerSection
          key="career"
          id="career"
          copy={course.career}
          onEnroll={openEnroll}
        />
      ) : null,
    roadmap: () =>
      course.roadmap ? (
        <Roadmap
          key="roadmap"
          id="roadmap"
          heading={course.roadmap.heading}
          description={course.roadmap.description}
          cta={course.roadmap.cta}
          phases={course.phases}
          onEnroll={openEnroll}
        />
      ) : null,
    curriculum: () =>
      course.curriculum ? (
        <CurriculumExplorer
          key="curriculum"
          id="curriculum"
          heading={course.curriculum.heading}
          description={course.curriculum.description}
          searchPlaceholder={course.curriculum.searchPlaceholder}
          phases={course.phases}
          syllabus={course.syllabus}
        />
      ) : null,
    mentor: () =>
      course.mentor ? (
        <MentorBand
          key="mentor"
          id="mentor"
          copy={course.mentor}
          onEnroll={openEnroll}
        />
      ) : null,
    tools: () =>
      course.tools ? (
        <ToolsSection key="tools" id="tools" copy={course.tools} />
      ) : null,
    simulator: () =>
      course.simulator ? (
        <Simulator
          key="simulator"
          id="simulator"
          heading={course.simulator.heading}
          description={course.simulator.description}
          topics={course.simulator.topics}
          defaultPrompt={course.simulator.defaultPrompt}
          logs={course.simulator.logs}
          steps={course.simulator.steps}
          cta={course.simulator.cta}
          onEnroll={openEnroll}
        />
      ) : null,
    security: () =>
      course.security ? (
        <SecuritySection
          key="security"
          id="security"
          copy={course.security}
          onEnroll={openEnroll}
        />
      ) : null,
    stack: () =>
      course.stack ? (
        <TechStack
          key="stack"
          id="stack"
          heading={course.stack.heading}
          description={course.stack.description}
          searchPlaceholder={course.stack.searchPlaceholder}
          categories={course.stack.categories}
        />
      ) : null,

    bonuses: () =>
      course.bonuses ? (
        <BonusesSection
          key="bonuses"
          id="bonuses"
          copy={course.bonuses}
          onEnroll={openEnroll}
        />
      ) : null,
    diagnostic: () =>
      course.diagnostic ? (
        <Diagnostic
          key="diagnostic"
          id="diagnostic"
          data={course.diagnostic}
          onEnroll={openEnroll}
        />
      ) : null,
    faq: () =>
      course.faq ? (
        <FaqSection
          key="faq"
          id="faq"
          heading={course.faq.heading}
          description={course.faq.description}
          searchPlaceholder={course.faq.searchPlaceholder}
          initialCount={course.faq.initialCount}
          items={course.faq.items}
        />
      ) : null,
    finalCta: () =>
      course.finalCta ? (
        <FinalCtaSection
          key="finalCta"
          copy={course.finalCta}
          offer={course.offer}
          onEnroll={openEnroll}
        />
      ) : null,
  };

  return (
    <main
      className={` ${display.className} min-h-screen overflow-x-clip bg-[#060714] text-white`}
    >
      <OfferStrip offer={course.offer} onEnroll={openEnroll} />
      <SectionNav links={course.nav} />

      <Hero
        hero={course.hero}
        syllabus={course.syllabus}
        onEnroll={openEnroll}
      />

      {course.layout.map((key) => sections[key]?.() ?? null)}

      <FloatingOfferBar offer={course.offer} onEnroll={openEnroll} />
      <EnrollModal
        open={enrollOpen}
        onClose={closeEnroll}
        enrollment={course.enrollment}
        offer={course.offer}
      />
    </main>
  );
}
