"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Download,
  ImageIcon,
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

/* =========================================================
   GALLERY DATA
========================================================= */

const gallerySections: GallerySection[] = [
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
    ],
  },
  {
    id: "speaking",
    label: "Speaking & Presentations",
    description:
      "Speaking engagements, presentations, training sessions, and professional talks.",
    images: [
      // image("mian-ahmad-basit-as-a-speaker.jpeg"),
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
    images: [
      image("mian-ahmad-basit-blockchain-certificate.jpeg"),
      // image("mian-ahmad-basit-distributing-certificate-1.jpeg"),
      // image("mian-ahmad-basit-distributing-certificate-2.jpeg"),
    ],
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

/* =========================================================
   COMPONENT
========================================================= */

export default function GallerySection() {
  // First accordion open by default
  const [openSection, setOpenSection] = useState<string>(gallerySections[0].id);

  const [contextMenu, setContextMenu] = useState<ContextMenu>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  /* =======================================================
     ADD READABLE TITLES
  ======================================================= */

  const sections = useMemo(() => {
    return gallerySections.map((section) => ({
      ...section,
      images: section.images.map((item) => ({
        ...item,
        title: item.title || getImageTitle(item.src),
      })),
    }));
  }, []);

  /* =======================================================
     CLOSE CONTEXT MENU
  ======================================================= */

  useEffect(() => {
    if (!contextMenu) return;

    const close = () => setContextMenu(null);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
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

  /* =======================================================
     KEEP CONTEXT MENU INSIDE VIEWPORT
  ======================================================= */

  useEffect(() => {
    if (!contextMenu || !menuRef.current) return;

    const menu = menuRef.current;

    const { innerWidth, innerHeight } = window;

    const { offsetWidth: width, offsetHeight: height } = menu;

    let { x, y } = contextMenu;

    if (x + width > innerWidth - 8) {
      x = innerWidth - width - 8;
    }

    if (y + height > innerHeight - 8) {
      y = innerHeight - height - 8;
    }

    menu.style.left = `${Math.max(8, x)}px`;
    menu.style.top = `${Math.max(8, y)}px`;
  }, [contextMenu]);

  /* =======================================================
     CONTEXT MENU
  ======================================================= */

  const handleContextMenu = (
    e: React.MouseEvent,
    src: string,
    title: string,
    index: number
  ) => {
    e.preventDefault();

    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      src,
      title,
      index,
    });
  };

  /* =======================================================
     DOWNLOAD
  ======================================================= */

  const handleSaveImage = async (src: string) => {
    setContextMenu(null);

    try {
      const response = await fetch(src);

      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

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

  /* =======================================================
     OPEN IMAGE
  ======================================================= */

  const handleOpenInTab = (src: string) => {
    setContextMenu(null);

    window.open(src, "_blank", "noopener,noreferrer");
  };

  /* =======================================================
     ACCORDION TOGGLE
  ======================================================= */

  const toggleSection = (id: string) => {
    setOpenSection((current) => (current === id ? "" : id));
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      id="gallery"
      className="relative isolate overflow-hidden px-5 py-12 sm:px-6 lg:px-10 lg:py-16"
    >
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.10),transparent_28%),linear-gradient(145deg,#F8FAFC_0%,#E5E7EB_58%,#F8FAFC_100%)] dark:bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.16),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(139,92,246,0.10),transparent_24%),linear-gradient(145deg,#050505_0%,#0E0E11_58%,#020202_100%)]" />

      <div className="mx-auto max-w-7xl">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-blue-600 dark:text-blue-300">
            Events / Conferences / Media
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Gallery
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-[#9CA3AF]">
            Conferences, workshops, speaking sessions, networking events,
            podcasts, student interactions, and technology ecosystem moments.
          </p>
        </div>

        {/* =================================================
            ACCORDION
        ================================================= */}

        <div className="mx-auto mt-14 max-w-6xl space-y-4">
          {sections.map((section, sectionIndex) => {
            const isOpen = openSection === section.id;

            return (
              <div
                key={section.id}
                className={[
                  "overflow-hidden rounded-[28px] border transition-all duration-500",
                  isOpen
                    ? "border-blue-500/30 bg-white/80 shadow-xl shadow-blue-500/5 dark:border-blue-400/20 dark:bg-white/[0.04]"
                    : "border-black/5 bg-white/60 hover:border-blue-500/20 dark:border-white/10 dark:bg-white/[0.02]",
                ].join(" ")}
              >
                {/* =========================================
                    ACCORDION HEADER
                ========================================= */}

                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${section.id}-content`}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-7 sm:py-6"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    {/* Number */}

                    <div
                      className={[
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-mono text-xs transition-all",
                        isOpen
                          ? "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-300"
                          : "border-black/10 bg-black/5 text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400",
                      ].join(" ")}
                    >
                      {String(sectionIndex + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-base font-semibold text-slate-900 sm:text-lg dark:text-white">
                          {section.label}
                        </h3>

                        {/* <span className="rounded-full border border-blue-500/10 bg-blue-500/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-blue-600 dark:border-blue-400/10 dark:bg-blue-400/5 dark:text-blue-300">
                          {section.images.length}{" "}
                          {section.images.length === 1 ? "Image" : "Images"}
                        </span> */}
                      </div>

                      <p className="mt-1.5 hidden max-w-2xl text-sm leading-6 text-slate-500 sm:block dark:text-slate-400">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  {/* Chevron */}

                  <div
                    className={[
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                      isOpen
                        ? "rotate-180 border-blue-500/20 bg-blue-500/10 text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300"
                        : "border-black/10 bg-black/5 text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400",
                    ].join(" ")}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {/* =========================================
                    ACCORDION CONTENT
                ========================================= */}

                <div
                  id={`${section.id}-content`}
                  className={[
                    "grid transition-[grid-template-rows] duration-500 ease-in-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  ].join(" ")}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="border-t border-black/5 px-4 pb-5 pt-5 sm:px-6 sm:pb-7 sm:pt-6 dark:border-white/10">
                      {/* Gallery */}

                      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
                        {section.images.map((item, index) => (
                          <div
                            key={item.src}
                            className="group relative mb-5 block overflow-hidden rounded-[24px] border border-black/5 bg-white/70 shadow-lg shadow-blue-500/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
                          >
                            {/* IMAGE */}

                            <div className="relative overflow-hidden">
                              <img
                                src={item.src}
                                alt={item.title}
                                title={item.title}
                                loading={
                                  sectionIndex === 0 && index < 3
                                    ? "eager"
                                    : "lazy"
                                }
                                draggable={false}
                                onContextMenu={(e) =>
                                  handleContextMenu(
                                    e,
                                    item.src,
                                    item.title || "",
                                    index
                                  )
                                }
                                className="h-auto w-full select-none object-cover transition-transform duration-700 group-hover:scale-105"
                              />

                              {/* Dark overlay */}

                              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                              {/* Image title */}

                              <div className="pointer-events-none absolute bottom-0 left-0 right-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-200">
                                  {section.label}
                                </p>

                                {/* <p className="mt-1 text-sm font-medium text-white">
                                  {item.title}
                                </p> */}
                              </div>

                              {/* Open icon */}

                              <div className="pointer-events-none absolute right-4 top-4 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full border border-white/20 bg-white/10 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                <ArrowUpRight
                                  className="text-white"
                                  size={17}
                                />
                              </div>

                              {/* Category badge */}

                              <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/15 bg-black/30 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-blue-200 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100">
                                {section.label}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===================================================
          CUSTOM CONTEXT MENU
      =================================================== */}

      {contextMenu && (
        <div
          ref={menuRef}
          onClick={(e) => e.stopPropagation()}
          style={{
            left: contextMenu.x,
            top: contextMenu.y,
          }}
          className="fixed z-[9999] min-w-[220px] max-w-[280px] overflow-hidden rounded-2xl border border-black/10 bg-white/95 shadow-2xl shadow-black/20 backdrop-blur-xl dark:border-white/10 dark:bg-[#111]/95"
        >
          {/* Menu Header */}

          <div className="border-b border-black/5 px-4 py-3 dark:border-white/5">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              Image
            </p>

            <p className="mt-1 truncate text-xs font-medium text-slate-700 dark:text-slate-200">
              {contextMenu.title}
            </p>
          </div>

          {/* Actions */}

          <div className="p-1.5">
            <button
              type="button"
              onClick={() => handleSaveImage(contextMenu.src)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
            >
              <Download size={15} className="shrink-0" />
              Save Image
            </button>

            <button
              type="button"
              onClick={() => handleOpenInTab(contextMenu.src)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white"
            >
              <ImageIcon size={15} className="shrink-0" />
              Open in New Tab
            </button>
          </div>

          {/* Close */}

          <div className="border-t border-black/5 p-1.5 dark:border-white/5">
            <button
              type="button"
              onClick={() => setContextMenu(null)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:text-slate-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
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
