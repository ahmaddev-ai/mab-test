"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gallerySections } from "./GalleryContent";

const PREVIEW_SECTION_IDS = ["networking"];
const MAX_PREVIEW_IMAGES = 8;

function getPreviewImages() {
  const bySection = PREVIEW_SECTION_IDS.map((id) =>
    gallerySections.find((section) => section.id === id)
  ).filter(Boolean) as typeof gallerySections;

  const images: { src: string; label: string }[] = [];

  // Round-robin across sections so the grid isn't dominated by one category
  let round = 0;
  while (images.length < MAX_PREVIEW_IMAGES) {
    let addedAny = false;

    for (const section of bySection) {
      const item = section.images[round];
      if (item) {
        images.push({ src: item.src, label: section.label });
        addedAny = true;
      }
      if (images.length >= MAX_PREVIEW_IMAGES) break;
    }

    if (!addedAny) break;
    round += 1;
  }

  return images;
}

export default function FeaturedGallery() {
  const previewImages = getPreviewImages();

  return (
    <section className="relative isolate overflow-hidden px-5 py-16 sm:px-6 sm:py-24 lg:px-10">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.10),transparent_28%),linear-gradient(145deg,#F8FAFC_0%,#E5E7EB_58%,#F8FAFC_100%)] dark:bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.16),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(139,92,246,0.10),transparent_24%),linear-gradient(145deg,#050505_0%,#0E0E11_58%,#020202_100%)]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_50%_30%,black_25%,transparent_75%)]"
      />

      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-blue-600 dark:text-blue-300">
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

          <h2 className="mt-5 text-balance font-heading text-4xl font-medium leading-[1.05] tracking-[-1px] text-slate-900 sm:text-5xl lg:text-[56px] dark:text-white">
            Gallery
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-[#9CA3AF]">
            A few moments from conferences, talks, and student sessions.
          </p>
        </div>

        {/* PREVIEW GRID */}
        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {previewImages.map((item, index) => (
            <Link
              key={item.src}
              href="/gallery"
              aria-label={`${item.label} — open gallery`}
              className={[
                "group relative block overflow-hidden rounded-[24px] border border-black/[0.06] bg-white/70 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_20px_44px_-24px_rgba(16,24,40,0.3)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-500/40 hover:shadow-[0_30px_60px_-26px_rgba(37,99,235,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none dark:hover:border-blue-400/40",
                // Make the first tile a bit larger for visual rhythm
                index === 0 ? "col-span-2 row-span-2" : "",
              ].join(" ")}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={item.src}
                  alt={item.label}
                  loading={index < 4 ? "eager" : "lazy"}
                  draggable={false}
                  className="h-full w-full select-none object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Persistent label on the feature tile */}
                {index === 0 && (
                  <>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/35 px-3.5 py-1.5 backdrop-blur-md">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-200">
                        {item.label}
                      </p>
                    </div>
                  </>
                )}

                {/* Hover overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {index !== 0 && (
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 translate-y-2 p-3.5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-blue-200">
                      {item.label}
                    </p>
                  </div>
                )}

                <div className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full border border-white/25 bg-white/15 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight className="text-white" size={15} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* VIEW ALL BUTTON */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/5 py-2 pl-6 pr-2 text-sm font-medium text-blue-600 backdrop-blur-md transition-all duration-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-blue-400/25 dark:bg-blue-400/10 dark:text-blue-300 dark:hover:border-blue-500 dark:hover:bg-blue-500 dark:hover:text-white"
          >
            View All Gallery
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition-all duration-300 group-hover:bg-white group-hover:text-blue-600 dark:bg-blue-500">
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
