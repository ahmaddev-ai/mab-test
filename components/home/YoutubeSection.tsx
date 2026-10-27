"use client";

import { ArrowUpRight, Play } from "lucide-react";
import { Section } from "./shared";
import { useEffect, useRef, useState } from "react";

const videos = [
  {
    id: "W1vL9Vp8NLU",
    label: "AoA Pakistan | Roohi",
    title:
      "Build Your Career & Business | E-Commerce, Digital Marketing & Entrepreneurship",
  },
  {
    id: "WO4blqp3eLw",
    label: "Good Morning Lahore",
    title: "Digital Creators, Be Careful | How To Avoid Online Fraud",
  },
  {
    id: "Qyj4lWAdzcc",
    label: "Suno Pakistan",
    title: "Online Fraud Case with Dr. Nighat Shakeel",
  },
  {
    id: "RUomfBBewVg",
    label: "Suno Pakistan",
    title: "Freelancers Beware | A Shocking New Scam Exposed",
  },
];

export default function YouTubeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [playingVideos, setPlayingVideos] = useState<string[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "200px",
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setPlayingVideos([]);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    videos.forEach((video) => {
      const randomDelay = Math.floor(Math.random() * 8000) + 1000;

      const timer = setTimeout(() => {
        setPlayingVideos((previous) =>
          previous.includes(video.id) ? previous : [...previous, video.id]
        );
      }, randomDelay);

      timers.push(timer);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isVisible]);
  return (
    <section ref={sectionRef}>
      <Section
        id="videos"
        eyebrow="Media / Talks / Featured"
        title="Watch & Learn"
        description="Featured talks, sessions, and insights from conferences, podcasts, and tech programs."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {videos.map((video) => (
            <article
              key={video.id}
              className="group flex flex-col overflow-hidden rounded-[28px] border border-black/[0.08] bg-white/80 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_24px_50px_-28px_rgba(37,99,235,0.25)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-[0_30px_60px_-28px_rgba(37,99,235,0.4)] dark:border-white/[0.08] dark:bg-white/[0.04] dark:shadow-none dark:hover:border-blue-400/40"
            >
              {/* Video */}
              <div className="relative aspect-video overflow-hidden bg-black">
                {isVisible && playingVideos.includes(video.id) ? (
                  <iframe
                    key={video.id}
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=0&rel=0&modestbranding=1&playsinline=1`}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                      alt={video.title}
                      className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />

                    <a
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Watch ${video.title} on YouTube`}
                      className="absolute inset-0 flex items-center justify-center focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-blue-400"
                    >
                      <span className="relative flex h-16 w-16 items-center justify-center">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full bg-white/40 motion-safe:animate-ping"
                        />
                        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-blue-600 shadow-2xl ring-8 ring-white/20 transition-transform duration-300 group-hover:scale-110">
                          <Play
                            size={26}
                            className="translate-x-0.5"
                            fill="currentColor"
                          />
                        </span>
                      </span>
                    </a>
                  </>
                )}

                {/* Label */}
                <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-white/15 bg-black/40 px-3 py-1 backdrop-blur-md">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-blue-200">
                    {video.label}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-blue-600 dark:text-blue-300">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-red-500"
                  />
                  YouTube
                </p>

                <h3 className="mt-3 text-balance font-heading text-lg font-medium leading-snug text-slate-900 dark:text-white sm:text-xl">
                  {video.title}
                </h3>

                <div className="mt-auto pt-6">
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-2 text-sm font-medium text-blue-600 transition-colors duration-300 hover:border-blue-500 hover:bg-blue-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300 dark:hover:border-blue-400 dark:hover:bg-blue-500 dark:hover:text-white"
                  >
                    Watch Now
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </section>
  );
}
