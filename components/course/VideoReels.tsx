"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Play, Volume2, X } from "lucide-react";

import { getVideoSource } from "./course-utils";
import { Section } from "./ui";
import type { VideoItem } from "./types";

const POSTERS = [
  "from-indigo-600 via-violet-700 to-[#0A0C1F]",
  "from-cyan-600 via-blue-700 to-[#0A0C1F]",
  "from-fuchsia-600 via-purple-700 to-[#0A0C1F]",
  "from-emerald-600 via-teal-700 to-[#0A0C1F]",
  "from-orange-500 via-rose-600 to-[#0A0C1F]",
  "from-sky-500 via-indigo-700 to-[#0A0C1F]",
];

const CARD_GAP = 16;

function getAutoplayEmbed(url: string) {
  try {
    const embedUrl = new URL(url);
    embedUrl.searchParams.set("autoplay", "1");
    embedUrl.searchParams.set("playsinline", "1");
    embedUrl.searchParams.set("enablejsapi", "1");
    return embedUrl.toString();
  } catch {
    return url;
  }
}

/* -----------------------------------------
   LIGHTBOX
------------------------------------------ */

function Lightbox({
  video,
  onClose,
}: {
  video: VideoItem;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  const source = getVideoSource(video.url);
  const landscape = video.orientation === "landscape";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mounted, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-[2147483000] isolate flex items-center justify-center bg-black/90 p-3 backdrop-blur-md sm:p-5"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={[
          "relative overflow-hidden rounded-xl bg-black shadow-2xl ring-1 ring-white/20 sm:rounded-2xl",
          "max-h-[calc(100dvh-5rem)] max-w-full",
          landscape
            ? "aspect-video w-full max-w-5xl"
            : "aspect-[9/16] h-[min(78dvh,760px)] w-auto max-w-full",
        ].join(" ")}
      >
        {source.kind === "youtube" ? (
          <iframe
            src={getAutoplayEmbed(source.embed)}
            title={video.title}
            className="absolute inset-0 h-full w-full border-0"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <video
            key={source.src}
            src={source.src}
            controls
            autoPlay
            playsInline
            className="absolute inset-0 h-full w-full object-contain"
          />
        )}
      </div>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close video"
        className="absolute right-3 top-3 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black text-white shadow-2xl transition hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-5 sm:top-5"
      >
        <X className="h-6 w-6" strokeWidth={2.5} />
      </button>
    </div>,
    document.body
  );
}

/* -----------------------------------------
   REEL CARD
------------------------------------------ */

function ReelCard({
  video,
  index,
  autoplay,
  onOpen,
}: {
  video: VideoItem;
  index: number;
  autoplay: boolean;
  onOpen: () => void;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLVideoElement>(null);

  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  const source = getVideoSource(video.url);
  const shouldMute = true;

  const poster =
    video.thumbnail || (source.kind === "youtube" ? source.thumb : "");

  useEffect(() => {
    const element = boxRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = fileRef.current;
    if (!element) return;

    element.muted = true;

    if (visible && autoplay) {
      element.play().catch(() => setReady(false));
    } else {
      element.pause();
    }
  }, [visible, autoplay]);

  return (
    <div
      ref={boxRef}
      className="group relative isolate aspect-[9/16] w-full overflow-hidden rounded-2xl bg-[#0A0C1F] ring-1 ring-white/15 transition duration-300 hover:-translate-y-1 hover:ring-white/40 sm:rounded-3xl"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          POSTERS[index % POSTERS.length]
        }`}
        aria-hidden="true"
      />

      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {source.kind === "youtube" && autoplay && visible ? (
          <iframe
            src={`https://www.youtube.com/embed/${source.id}?autoplay=1&mute=1&loop=1&playlist=${source.id}&controls=0&playsinline=1&modestbranding=1&rel=0&disablekb=1&fs=0`}
            title=""
            tabIndex={-1}
            allow="autoplay; encrypted-media"
            onLoad={() => setReady(true)}
            className={[
              "absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 border-0 transition-opacity duration-500",
              ready ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />
        ) : null}

        {source.kind === "file" && autoplay ? (
          <video
            ref={fileRef}
            src={source.src}
            muted={shouldMute}
            loop
            playsInline
            preload="metadata"
            poster={poster || undefined}
            onPlaying={() => setReady(true)}
            className={[
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
              ready ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />
        ) : null}
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/25"
        aria-hidden="true"
      />

      <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/40 backdrop-blur-md transition group-hover:bg-white/30 sm:h-16 sm:w-16">
        <Play className="ml-0.5 h-5 w-5 fill-white text-white sm:h-6 sm:w-6" />
      </span>

      {ready ? (
        <span className="pointer-events-none absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur sm:right-3 sm:top-3 sm:text-xs">
          <Volume2 className="h-3.5 w-3.5" />
          Tap for sound
        </span>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-left sm:p-4">
        <p className="line-clamp-3 break-words text-sm font-bold leading-snug text-white sm:text-base">
          {video.title}
        </p>

        {video.subtitle ? (
          <p className="mt-1 line-clamp-2 break-words text-xs leading-relaxed text-white/75 sm:text-sm">
            {video.subtitle}
          </p>
        ) : null}
      </div>

      <button
        type="button"
        onClick={onOpen}
        aria-label={`Play video with sound: ${video.title}`}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white sm:rounded-3xl"
      />
    </div>
  );
}

/* -----------------------------------------
   INFINITE REEL MARQUEE
------------------------------------------ */

export default function VideoReels({
  id,
  heading,
  description,
  items,
}: {
  id: string;
  heading: string;
  description: string;
  items: VideoItem[];
}) {
  const [active, setActive] = useState<VideoItem | null>(null);
  const [autoplay, setAutoplay] = useState(false);
  const [paused, setPaused] = useState(false);

  const close = useCallback(() => setActive(null), []);

  const open = useCallback((video: VideoItem) => {
    setActive(video);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const saveData = (
      navigator as Navigator & {
        connection?: { saveData?: boolean };
      }
    ).connection?.saveData;

    setAutoplay(!reducedMotion && !saveData);
  }, []);

  if (!items.length) return null;

  // Duplicate the list so the marquee can loop seamlessly.
  const marqueeItems = [...items, ...items];

  return (
    <Section id={id} title={heading} description={description}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs leading-relaxed text-slate-400 sm:text-sm">
          Explore our video reels. Hover or touch to pause.
        </p>

        <button
          type="button"
          onClick={() => setPaused((previous) => !previous)}
          aria-pressed={paused}
          className="rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-xs font-medium text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {paused ? "Resume marquee" : "Pause marquee"}
        </button>
      </div>

      <div
        className="reel-marquee relative -mx-4 overflow-hidden px-4 py-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <ul
          className="reel-marquee-track flex w-max gap-4"
          style={
            {
              animationPlayState: paused || active ? "paused" : "running",
              "--reel-duration": `${Math.max(items.length * 5, 25)}s`,
            } as React.CSSProperties
          }
        >
          {marqueeItems.map((video, index) => (
            <li
              key={`${video.title}-${index}`}
              className="w-[min(44vw,190px)] shrink-0 sm:w-[220px] lg:w-[240px]"
            >
              <ReelCard
                video={video}
                index={index % items.length}
                autoplay={autoplay && !active}
                onOpen={() => open(video)}
              />
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .reel-marquee-track {
          animation: reel-marquee var(--reel-duration, 30s) linear infinite;
          will-change: transform;
        }

        @keyframes reel-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 8px));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .reel-marquee-track {
            animation: none;
          }
        }
      `}</style>

      {active ? <Lightbox video={active} onClose={close} /> : null}
    </Section>
  );
}
