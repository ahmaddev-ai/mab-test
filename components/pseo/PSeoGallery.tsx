"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type GalleryImage = {
  src: string;
  title?: string;
};

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

export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
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
      className="group/hero relative isolate mx-auto mt-8 w-full max-w-6xl overflow-hidden rounded-[28px] border border-black/5 bg-black shadow-2xl shadow-blue-500/10 dark:border-white/10"
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

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/30" />

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-blue-300">
            {slides[index].title}
          </p>
        </div>

        {/* Controls */}
        <div className="absolute right-4 top-4 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover/hero:opacity-100 sm:right-6 sm:top-6">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
          </button>
        </div>

        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:bg-white/20 group-hover/hero:opacity-100 sm:left-5"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next image"
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:bg-white/20 group-hover/hero:opacity-100 sm:right-5"
        >
          <ChevronRight size={18} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 right-5 flex items-center gap-1.5 sm:bottom-6">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={[
                "h-1.5 rounded-full transition-all duration-300",
                i === index
                  ? "w-6 bg-blue-400"
                  : "w-1.5 bg-white/40 hover:bg-white/60",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
