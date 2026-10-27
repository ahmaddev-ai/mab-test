"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Download,
  ImageIcon,
  Pause,
  Play,
  X,
} from "lucide-react";

type GalleryImage = {
  src: string;
  title?: string;
};

type GallerySection = {
  id: string;
  label: string;
  description: string;
  images: GalleryImage[];
};

type TitledImage = GalleryImage & { title: string };

type TitledSection = Omit<GallerySection, "images"> & {
  images: TitledImage[];
};

type ContextMenu = {
  x: number;
  y: number;
  src: string;
  title: string;
  index: number;
} | null;

/* =========================================================
   HELPERS
========================================================= */

const image = (src: string): GalleryImage => ({
  src: `/gallery/${src}`,
});

/**
 * Converts filenames into readable image titles.
 *
 * Example:
 * mian-ahmad-basit-as-speaker-1.webp
 * ->
 * As Speaker 1
 */
function getImageTitle(src: string) {
  const filename = src.split("/").pop() ?? "";

  return filename
    .replace(/\.[^/.]+$/, "")
    .replace(/^mian-ahmad-basit-?/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

/**
 * Builds a descriptive, human-readable alt attribute from the generated
 * title and the section it belongs to, e.g.
 * "With Nexskill Ceo" + "Networking & Industry" ->
 * "Mian Ahmad Basit with Nexskill CEO — Networking & Industry"
 */
function getImageAlt(title: string, sectionLabel: string) {
  const cleaned = title
    .replace(/\bCeo\b/g, "CEO")
    .replace(/\bUet\b/g, "UET")
    .replace(/\bPsca\b/g, "PSCA")
    .replace(/\bTeps\b/g, "TEPS");

  const subject = cleaned.toLowerCase().startsWith("with")
    ? `Mian Ahmad Basit ${cleaned.toLowerCase()}`
    : `Mian Ahmad Basit — ${cleaned}`;

  return `${subject} (${sectionLabel})`;
}

/* =========================================================
   GALLERY DATA
========================================================= */

export const gallerySections: GallerySection[] = [
  {
    id: "networking",
    label: "Networking & Industry",
    description:
      "Professional networking, technology leaders, entrepreneurs, and industry connections.",
    images: [
      image("mian-ahmad-basit-ideo-ceo.webp"),
      image("mian-ahmad-basit-with-nexskill-ceo.webp"),
      image("mian-ahmad-basit-with-nexskill-ceo-1.webp"),
      image("mian-ahmad-basit-with-nexskill-ceo-2.webp"),
      image("mian-ahmad-basit-with-osman-sheikh.webp"),
      image("mian-ahmad-basit-with-osman-sheikh-1.webp"),
      image("mian-ahmad-basit-with-pny-ceo.webp"),
      image("mian-ahmad-basit-with-zeeshan-ali.webp"),
      image("mian-ahmad-basit-with-zeeshan-ali-1.webp"),
      image("mian-ahmad-basit-with-rohi-news-show-host-yusra.jpeg"),
      image("mian-ahmad-basit-at-job-fair-of-pny-trainings.jpeg"),
      image("mian-ahmad-basit-with-usman-sheikh.jpeg"),
    ],
  },
  {
    id: "speaking",
    label: "Speaking & Presentations",
    description:
      "Speaking engagements, presentations, training sessions, and professional talks.",
    images: [
      image("mian-ahmad-basit-as-speaker-1.webp"),
      image("mian-ahmad-basit-as-speaker-2.webp"),
      image("mian-ahmad-basit-giving-presentation.jpeg"),
      image("mian-ahmad-basit-giving-session-0.jpeg"),
      image("mian-ahmad-basit-giving-session-1.jpeg"),
      image("mian-ahmad-basit-giving-session-2.jpeg"),
      image("mian-ahmad-basit-taking-online-session.jpeg"),
      image("mian-ahmad-basit-taking-online-session-1.jpeg"),
    ],
  },
  {
    id: "seminars",
    label: "Seminars & Universities",
    description:
      "University seminars, institutional events, conferences, and educational engagements.",
    images: [
      image("mian-ahmad-basit-at-superior-university.webp"),
      image("mian-ahmad-basit-at-superior-university-seminar.jpeg"),
      image("mian-ahmad-basit-seminar-at-nexskill.webp"),
      image("mian-ahmad-basit-seminar-at-nexskill-1.webp"),
      image("mian-ahmad-basit-seminar-at-uet-uni.webp"),
      image("mian-ahmad-basit-at-psca.webp"),
      image("mian-ahmad-basit-at-ozi-group.jpeg"),
    ],
  },
  {
    id: "students",
    label: "Students & Training",
    description:
      "Training sessions, student interactions, classroom moments, and educational activities.",
    images: [
      image("mian-ahmad-basit-students_8.webp"),
      image("mian-ahmad-basit-students_9.webp"),
      image("mian-ahmad-basit-with-students_0.jpeg"),
      image("mian-ahmad-basit-with-students_1.jpeg"),
      image("mian-ahmad-basit-with-students_2.jpeg"),
      image("mian-ahmad-basit-with-students_3.jpeg"),
      image("mian-ahmad-basit-with-students_4.jpeg"),
      image("mian-ahmad-basit-with-students_5.jpeg"),
      image("mian-ahmad-basit-with-students_6.jpeg"),
      image("mian-ahmad-basit-with-students_7.jpeg"),
      image("mian-ahmad-basit-with-students_10.jpeg"),
    ],
  },
  {
    id: "teps",
    label: "TEPS Students",
    description:
      "Moments and interactions from TEPS student sessions and activities.",
    images: [
      image("mian-ahmad-basit-teps-student-3.jpeg"),
      image("mian-ahmad-basit-teps-student-4.jpeg"),
      image("mian-ahmad-basit-teps-students-1.jpeg"),
      image("mian-ahmad-basit-with-teps-student-2.jpeg"),
      image("mian-ahmad-basit-with-teps-students.jpeg"),
    ],
  },
  {
    id: "certificates",
    label: "Certificates & Recognition",
    description:
      "Certificate distribution, achievements, recognition, and professional milestones.",
    images: [image("mian-ahmad-basit-blockchain-certificate.jpeg")],
  },
  {
    id: "media",
    label: "Podcasts & Media",
    description:
      "Podcast appearances, media sessions, interviews, and technology discussions.",
    images: [
      image("mian-ahmad-basit-podcast-with-ahmad-manzoor.jpeg"),
      image("mian-ahmad-basit-live-at-suno-news.webp"),
      image("mian-ahmad-basit-with-ahmad-manzoor.jpeg"),
      image("mian-ahmad-basit-with-ahmad-manzoor-1.jpeg"),
      image("mian-ahmad-basit-with-ahmad-manzoor-2.jpeg"),
      image("mian-ahmad-basit-with-ahmad-manzoor-4.jpeg"),
      image("mian-ahmad-basit-with-ahmad-manzoor-5.jpeg"),
    ],
  },
  {
    id: "featured",
    label: "Featured Moments",
    description:
      "Selected photographs highlighting professional, educational, and community moments.",
    images: [
      image("mian-ahmad-basit.webp"),
      image("mian-ahmad-basit-1.jpeg"),
      image("mian-ahmad-basit-2.jpeg"),
    ],
  },
];

/**
 * Dedicated hero-slider images, served from /gallery/slider — a distinct
 * folder from the section photos above, curated specifically for the
 * top-of-page slideshow.
 */
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

/* =========================================================
   REVEAL ON SCROLL (single, restrained motion cue per section)
========================================================= */

function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window !== "undefined" && "matchMedia" in window) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setVisible(true);
        return;
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/* =========================================================
   HERO SLIDER — top images that stay put and animate through
========================================================= */

type HeroSlide = GalleryImage & { title: string };

const heroButton =
  "flex items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % slides.length) + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    if (!playing) return;

    timerRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing, slides.length]);

  return (
    <div
      className="group/hero relative isolate mx-auto mt-10 w-full max-w-6xl overflow-hidden rounded-[32px] border border-black/[0.06] bg-black shadow-[0_40px_80px_-30px_rgba(37,99,235,0.45)] ring-1 ring-black/5 dark:border-white/10 dark:ring-white/5"
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => setPlaying(true)}
    >
      <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
        {slides.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={`Mian Ahmad Basit — ${slide.title}`}
            draggable={false}
            loading={i === 0 ? "eager" : "lazy"}
            className={[
              "absolute inset-0 h-full w-full select-none object-cover transition-all duration-[1200ms] ease-out",
              i === index ? "scale-100 opacity-100" : "scale-105 opacity-0",
            ].join(" ")}
          />
        ))}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/35" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blue-700/20 to-transparent" />

        {/* Counter */}
        <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/35 px-3.5 py-1.5 backdrop-blur-md sm:left-6 sm:top-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-200">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </p>
        </div>

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-5 pr-40 sm:p-8 sm:pr-48">
          <p className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-blue-200 sm:text-xs">
            <span
              aria-hidden="true"
              className="h-px w-6 bg-gradient-to-r from-blue-300 to-transparent"
            />
            {slides[index].title}
          </p>
        </div>

        {/* Play / pause */}
        <div className="absolute right-4 top-4 flex items-center gap-2 sm:right-6 sm:top-6">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            className={`${heroButton} h-10 w-10 md:opacity-0 md:group-hover/hero:opacity-100 md:focus-visible:opacity-100`}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
          </button>
        </div>

        {/* Arrows (always visible on touch, on hover on desktop) */}
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous image"
          className={`${heroButton} absolute left-3 top-1/2 h-11 w-11 -translate-y-1/2 sm:left-5 md:opacity-0 md:group-hover/hero:opacity-100 md:focus-visible:opacity-100`}
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next image"
          className={`${heroButton} absolute right-3 top-1/2 h-11 w-11 -translate-y-1/2 sm:right-5 md:opacity-0 md:group-hover/hero:opacity-100 md:focus-visible:opacity-100`}
        >
          <ChevronRight size={18} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 right-5 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/35 px-3 py-2 backdrop-blur-md sm:bottom-7 sm:right-7">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={[
                "h-1.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                i === index
                  ? "w-6 bg-blue-400"
                  : "w-1.5 bg-white/40 hover:bg-white/70",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SECTION — one labeled block of spread-out images
========================================================= */

function GallerySectionBlock({
  section,
  sectionIndex,
  onContextMenu,
}: {
  section: TitledSection;
  sectionIndex: number;
  onContextMenu: (
    e: React.MouseEvent,
    src: string,
    title: string,
    index: number
  ) => void;
}) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <div
      ref={ref}
      id={section.id}
      className={[
        "scroll-mt-24 transition-all duration-700 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      ].join(" ")}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.07] pb-5 dark:border-white/10">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 font-mono text-sm font-medium text-white shadow-lg shadow-blue-500/30 ring-1 ring-white/20"
          >
            {String(sectionIndex + 1).padStart(2, "0")}
          </span>
          <h2 className="text-balance font-heading text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            {section.label}
          </h2>
        </div>
        <span className="rounded-full border border-blue-500/20 bg-blue-500/5 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
          {section.images.length}{" "}
          {section.images.length === 1 ? "photo" : "photos"}
        </span>
      </div>

      <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600 dark:text-slate-400">
        {section.description}
      </p>

      <div className="mt-7 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {section.images.map((item, index) => (
          <div
            key={item.src}
            className="group relative mb-5 block break-inside-avoid overflow-hidden rounded-[24px] border border-black/[0.06] bg-white/70 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_20px_44px_-24px_rgba(16,24,40,0.3)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_30px_60px_-26px_rgba(37,99,235,0.45)] dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none dark:hover:border-blue-400/40"
          >
            <div className="relative overflow-hidden">
              <img
                src={item.src}
                alt={getImageAlt(item.title, section.label)}
                title={item.title}
                loading={sectionIndex === 0 && index < 3 ? "eager" : "lazy"}
                draggable={false}
                onContextMenu={(e) =>
                  onContextMenu(e, item.src, item.title, index)
                }
                className="h-auto w-full select-none object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="pointer-events-none absolute bottom-0 left-0 right-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-200">
                  {section.label}
                </p>
              </div>

              <div className="pointer-events-none absolute right-4 top-4 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full border border-white/25 bg-white/15 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight className="text-white" size={17} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export default function GalleryContent() {
  const [contextMenu, setContextMenu] = useState<ContextMenu>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const sections = useMemo<TitledSection[]>(() => {
    return gallerySections.map((section) => ({
      ...section,
      images: section.images.map((item) => ({
        ...item,
        title: item.title || getImageTitle(item.src),
      })),
    }));
  }, []);

  // Dedicated slider images, always given a resolved string title so the
  // hero component never has to deal with an optional/undefined title.
  const heroSlides = useMemo<HeroSlide[]>(
    () =>
      heroSliderImages.map((item) => ({
        ...item,
        title: item.title ?? getImageTitle(item.src),
      })),
    []
  );

  useEffect(() => {
    if (!contextMenu) return;

    const close = () => setContextMenu(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("click", close);
    window.addEventListener("scroll", close, true);
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("keydown", onKey);
    };
  }, [contextMenu]);

  useEffect(() => {
    if (!contextMenu || !menuRef.current) return;

    const menu = menuRef.current;
    const { innerWidth, innerHeight } = window;
    const { offsetWidth: width, offsetHeight: height } = menu;

    let { x, y } = contextMenu;
    if (x + width > innerWidth - 8) x = innerWidth - width - 8;
    if (y + height > innerHeight - 8) y = innerHeight - height - 8;

    menu.style.left = `${Math.max(8, x)}px`;
    menu.style.top = `${Math.max(8, y)}px`;
  }, [contextMenu]);

  const handleContextMenu = (
    e: React.MouseEvent,
    src: string,
    title: string,
    index: number
  ) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, src, title, index });
  };

  const handleSaveImage = async (src: string) => {
    setContextMenu(null);
    try {
      const response = await fetch(src);
      if (!response.ok) throw new Error("Failed to fetch image");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");

      anchor.href = url;
      anchor.download = src.split("/").pop() ?? "image";

      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      URL.revokeObjectURL(url);
    } catch {
      window.open(src, "_blank", "noopener,noreferrer");
    }
  };

  const handleOpenInTab = (src: string) => {
    setContextMenu(null);
    window.open(src, "_blank", "noopener,noreferrer");
  };

  const totalImages = sections.reduce((sum, s) => sum + s.images.length, 0);

  return (
    <section
      id="gallery"
      className="relative isolate overflow-hidden px-5 py-12 sm:px-6 lg:px-10 lg:py-16"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.10),transparent_28%),linear-gradient(145deg,#F8FAFC_0%,#E5E7EB_58%,#F8FAFC_100%)] dark:bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.16),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(139,92,246,0.10),transparent_24%),linear-gradient(145deg,#050505_0%,#0E0E11_58%,#020202_100%)]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_50%_20%,black_25%,transparent_75%)]"
      />

      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mx-auto mt-8 max-w-3xl text-center">
          <p className="inline-flex items-center gap-3 pt-10 font-mono text-xs uppercase tracking-[0.28em] text-blue-600 dark:text-blue-300 md:pt-0">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-r from-transparent to-blue-600 dark:to-blue-300"
            />
            Events / Conferences / Media
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-l from-transparent to-blue-600 dark:to-blue-300"
            />
          </p>

          <h1 className="mt-5 text-balance font-heading text-5xl font-medium leading-[1] tracking-[-1px] text-slate-900 sm:text-6xl dark:text-white">
            Gallery
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-[#9CA3AF]">
            Conferences, workshops, speaking sessions, networking events,
            podcasts, student interactions, and technology ecosystem moments
          </p>

          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-blue-500"
            />
            {totalImages} photos · {sections.length} collections
          </p>
        </div>

        {/* HERO SLIDER */}
        {heroSlides.length > 0 && <HeroSlider slides={heroSlides} />}

        {/* SECTION NAV */}
        <nav
          aria-label="Gallery collections"
          className="mx-auto mt-10 max-w-6xl"
        >
          <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            {sections.map((section) => (
              <li key={section.id} className="shrink-0">
                <a
                  href={`#${section.id}`}
                  className="inline-flex items-center rounded-full border border-black/10 bg-white/60 px-4 py-2 text-sm font-medium text-slate-700 backdrop-blur-md transition-colors hover:border-blue-500/50 hover:bg-blue-500/5 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-blue-400/50 dark:hover:bg-blue-400/10 dark:hover:text-blue-300"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* SECTIONS — spread down the page, no accordion */}
        <div className="mx-auto mt-14 max-w-6xl space-y-20">
          {sections.map((section, sectionIndex) => (
            <GallerySectionBlock
              key={section.id}
              section={section}
              sectionIndex={sectionIndex}
              onContextMenu={handleContextMenu}
            />
          ))}
        </div>
      </div>

      {/* CUSTOM CONTEXT MENU */}
      {contextMenu && (
        <div
          ref={menuRef}
          role="menu"
          onClick={(e) => e.stopPropagation()}
          style={{ left: contextMenu.x, top: contextMenu.y }}
          className="fixed z-[9999] min-w-[220px] max-w-[280px] overflow-hidden rounded-2xl border border-black/10 bg-white/95 shadow-[0_30px_60px_-20px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-[#111]/95"
        >
          <div className="border-b border-black/5 bg-gradient-to-r from-blue-500/5 to-transparent px-4 py-3 dark:border-white/5">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
              Image
            </p>
            <p className="mt-1 truncate text-xs font-medium text-slate-700 dark:text-slate-200">
              {contextMenu.title}
            </p>
          </div>

          <div className="p-1.5">
            <button
              type="button"
              role="menuitem"
              onClick={() => handleSaveImage(contextMenu.src)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-200 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
            >
              <Download size={15} className="shrink-0" />
              Save Image
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => handleOpenInTab(contextMenu.src)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white"
            >
              <ImageIcon size={15} className="shrink-0" />
              Open in New Tab
            </button>
          </div>

          <div className="border-t border-black/5 p-1.5 dark:border-white/5">
            <button
              type="button"
              role="menuitem"
              onClick={() => setContextMenu(null)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500 transition-colors hover:bg-red-50 hover:text-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 dark:text-slate-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
            >
              <X size={15} className="shrink-0" />
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
