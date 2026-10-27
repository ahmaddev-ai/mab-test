"use client";

import { useMemo, useState } from "react";
import type { ComponentType } from "react";
import {
  Clock,
  MapPin,
  GraduationCap,
  Briefcase,
  ChevronDown,
  Target,
  Gauge,
  Sparkles,
  Search,
  BarChart3,
  Video,
  Bot,
  Database,
  Mail,
  Store,
  Network,
  Boxes,
  Code,
  Brain,
  GitBranch,
  Shield,
  Lock,
  Sigma,
  Cpu,
  Image as ImageIcon,
} from "lucide-react";
import { Section } from "@/components/home/shared";
import LeadForm from "@/components/performance-marketing-funnel/LeadForm";
import HeroQuickForm from "@/components/performance-marketing-funnel/heroquickform";
import { getLocalizedContent } from "@/data/pseo/localize";
import { ServiceLocationRow } from "@/data/pseo/seo-data";
import YouTubeSection from "../home/YoutubeSection";
import HeroSlider from "./PSeoGallery";

const ICONS: Record<
  string,
  ComponentType<{ size?: number; className?: string }>
> = {
  target: Target,
  gauge: Gauge,
  sparkles: Sparkles,
  search: Search,
  chart: BarChart3,
  video: Video,
  bot: Bot,
  database: Database,
  mail: Mail,
  store: Store,
  network: Network,
  boxes: Boxes,
  code: Code,
  brain: Brain,
  gitbranch: GitBranch,
  shield: Shield,
  lock: Lock,
  sigma: Sigma,
  cpu: Cpu,
  image: ImageIcon,
};
type GalleryImage = {
  src: string;
  title?: string;
};
function TopicGroupCard({
  group,
  index,
}: {
  group: { icon: string; title: string; items: string[] };
  index: number;
}) {
  const Icon = ICONS[group.icon] ?? Sparkles;
  return (
    <div className="rounded-[28px] border border-black/10 bg-white p-7 shadow-xl shadow-blue-500/5 transition-all duration-300 hover:border-blue-500/30 dark:border-white/[0.08] dark:bg-white/[0.04] sm:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600/10">
          <Icon size={22} className="text-blue-500" />
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-blue-600 dark:text-blue-300">
            Module {String(index + 1).padStart(2, "0")}
          </p>
          <h4 className="mt-1 font-heading text-xl font-medium text-slate-900 dark:text-white">
            {group.title}
          </h4>
        </div>
      </div>

      <ul className="mt-6 space-y-3 border-t border-black/10 pt-6 dark:border-white/[0.08]">
        {group.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
            <span className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
type HeroSlide = GalleryImage & { title: string };

const image = (src: string): GalleryImage => ({
  src: `/gallery/${src}`,
});

const heroSliderImages: GalleryImage[] = [
  image("slider/mian-ahmad-basit-at-job-fair-of-pny-trainings.jpeg"),
  image("slider/mian-ahmad-basit-at-psca.webp"),
  image("slider/mian-ahmad-basit-at-superior-university.webp"),
  image("slider/mian-ahmad-basit-live-at-suno-news.webp"),
  image("slider/mian-ahmad-basit-taking-online-session.jpeg"),
  image("slider/mian-ahmad-basit-with-osman-sheikh.webp"),
  image("slider/mian-ahmad-basit-with-rohi-news-show-host-yusra.jpeg"),
  image("slider/mian-ahmad-basit-with-usman-sheikh.jpeg"),
];

export default function ServiceLocationPage({
  row,
}: {
  row: ServiceLocationRow;
}) {
  const content = getLocalizedContent(row);
  const [faqOpen, setFaqOpen] = useState(false);
  if (!content) return null;

  const pageHref = `/${row.ServiceSlug}-${row.Connector}-${row.LocationSlug}`;
  const backLabel = `Back to ${row.ServiceName} in ${row.Location}`;

  function getImageTitle(src: string) {
    const filename = src.split("/").pop() ?? "";

    return filename
      .replace(/\.[^/.]+$/, "")
      .replace(/^mian-ahmad-basit-?/i, "")
      .replace(/[_-]+/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .trim();
  }
  const heroSlides = useMemo<HeroSlide[]>(
    () =>
      heroSliderImages.map((item) => ({
        ...item,
        title: item.title ?? getImageTitle(item.src),
      })),
    []
  );

  const stats = [
    { icon: MapPin, label: row.Location, sub: "Live cohort location" },
    {
      icon: Clock,
      label: "Live Weekly Classes",
      sub: "Practical, hands-on sessions",
    },
    { icon: GraduationCap, label: "Certification", sub: "On completion" },
    {
      icon: Briefcase,
      label: "Freelance-Ready",
      sub: "Practical project focus",
    },
  ];

  return (
    <main className="bg-white dark:bg-black">
      {/* Hero */}
      <Section
        id="hero"
        eyebrow={`Lead Instructor: Mian Ahmad Basit — ${row.Location}`}
        title=""
      >
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <h1 className="font-heading text-4xl font-medium leading-tight text-slate-900 dark:text-white sm:text-5xl">
              {content.heroHighlight}
            </h1>
            <p className="mt-5 max-w-xl text-slate-600 dark:text-slate-300">
              {content.heroDescription}
            </p>
            <p className="mt-4 max-w-xl text-slate-600 dark:text-slate-300">
              {content.localizedIntro}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {stats.map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-black/10 bg-white p-5 dark:border-white/[0.08] dark:bg-white/[0.04]"
                >
                  <Icon size={20} className="text-blue-500" />
                  <p className="mt-3 font-heading text-lg font-medium text-slate-900 dark:text-white">
                    {label}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {sub}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#curriculum"
                className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-500"
              >
                Explore the Curriculum
              </a>
              <a
                href="#apply"
                className="rounded-full border border-black/10 px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:border-blue-500/40 dark:border-white/[0.15] dark:text-white"
              >
                Apply Now
              </a>
            </div>
          </div>

          <div className="lg:pt-2">
            <HeroQuickForm
              sourceTag={`${row.ServiceName} — ${row.Location}`}
              redirectBackHref={pageHref}
              redirectBackLabel={backLabel}
            />
          </div>
        </div>
      </Section>

      {/* Curriculum */}
      <Section
        id="curriculum"
        eyebrow="Curriculum Breakdown"
        title={`${row.ServiceName} — What You'll Learn in ${row.Location}`}
        description={content.overview}
      >
        <div className="mb-8 flex flex-wrap gap-3">
          <span className="rounded-full bg-blue-600/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
            {content.topicGroups.length} Modules
          </span>
          <span className="rounded-full bg-blue-600/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
            {content.topicGroups.reduce((sum, g) => sum + g.items.length, 0)}{" "}
            Topics Covered
          </span>
          <span className="rounded-full bg-blue-600/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
            Live in {row.Location}
          </span>
        </div>

        <div className="space-y-6">
          {content.topicGroups.map((group, i) => (
            <TopicGroupCard key={group.title} group={group} index={i} />
          ))}
        </div>

        <div className="mt-8 rounded-[28px] border border-blue-600/20 bg-blue-600/5 p-7 sm:p-8">
          <p className="flex items-center gap-2 text-sm font-medium text-blue-700 dark:text-blue-300">
            <Sparkles size={16} />
            Outcome
          </p>
          <p className="mt-2 text-base leading-relaxed text-blue-700 dark:text-blue-300">
            {content.keyOutcome}
          </p>
        </div>
      </Section>

      {/* Mentor */}
      <Section
        id="mentor"
        eyebrow="Program Instructor & Mentor"
        title={`Learn ${row.ServiceName} With Mian Ahmad Basit`}
        description={`Live mentorship for students in ${row.Location} and across Pakistan — practical training, not just theory.`}
      >
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* Left — quote + credibility */}
          <div className="relative">
            <blockquote className="relative rounded-[28px] border border-black/10 bg-white p-8 text-lg leading-relaxed text-slate-700 shadow-xl shadow-blue-500/5 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-200 sm:p-10 mt-4">
              Every module pairs structured theory with real, hands-on work — so
              students in{" "}
              <span className="font-medium text-slate-900 dark:text-white">
                {row.Location}
              </span>{" "}
              leave with skills they've actually practiced, not just watched.
            </blockquote>

            <p className="mt-4 pl-2 font-heading text-base font-medium text-slate-900 dark:text-white">
              Mian Ahmad Basit
            </p>
            <p className="pl-2 text-sm text-slate-500 dark:text-slate-400">
              Lead Instructor &amp; Program Architect
            </p>

            {/* Credibility badges */}
            <div className="mt-6 flex flex-wrap gap-2 pl-2">
              {[
                "Job Fair Speaker",
                "PSCA Guest",
                "Superior University",
                "Suno News",
                "Rohi News",
              ].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-xs text-slate-600 dark:border-white/[0.1] dark:bg-white/[0.02] dark:text-slate-300"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right — hero slider */}
          {heroSlides.length > 0 && (
            <div>
              <HeroSlider slides={heroSlides} />
              <p className="mt-3 text-center text-xs text-slate-400 dark:text-slate-500">
                Live sessions, media appearances, and speaking engagements
              </p>
            </div>
          )}
        </div>
      </Section>
      <YouTubeSection />

      {/* FAQ */}
      <Section
        id="faq"
        eyebrow="Frequently Asked Questions"
        title={`${row.ServiceName} in ${row.Location} — FAQs`}
      >
        <div className="space-y-4">
          {content.faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-black/10 bg-white p-5 dark:border-white/[0.08] dark:bg-white/[0.04]"
            >
              <p className="font-medium text-slate-900 dark:text-white">
                {faq.question}
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Lead Magnet Funnel */}
      <Section
        id="apply"
        eyebrow="Lead Magnet Funnel"
        title={`Apply for ${row.ServiceName} in ${row.Location}`}
        description="Share a few details and the team will follow up with the curriculum PDF, seat availability and next cohort dates."
      >
        <LeadForm
          sourceTag={`${row.ServiceName} — ${row.Location}`}
          redirectBackHref={pageHref}
          redirectBackLabel={backLabel}
        />
      </Section>
    </main>
  );
}
