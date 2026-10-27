"use client";

import Image from "next/image";
import { useEffect } from "react";
import { X, CalendarDays, MapPin, Clock, ExternalLink } from "lucide-react";

interface SpeakerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SpeakerModal({ isOpen, onClose }: SpeakerModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-black/80 p-0 backdrop-blur-md sm:p-3 md:p-5 lg:p-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="speaker-title"
        className="relative my-auto flex max-h-[100dvh] w-full max-w-6xl flex-col overflow-hidden rounded-none border border-white/5 bg-[#080d18] text-white shadow-2xl sm:max-h-[94dvh] sm:rounded-2xl lg:rounded-3xl"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close speaker details"
          className="absolute right-3 top-3 z-30 rounded-full border border-white/20 bg-black/75 p-2 text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-cyan-400 sm:right-4 sm:top-4"
        >
          <X size={20} />
        </button>

        {/* Responsive content */}
        <div className="grid min-h-0 grid-cols-1 overflow-y-auto overscroll-contain md:grid-cols-2 md:overflow-hidden">
          {/* Poster */}
          <div className="relative flex min-w-0 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-[#101b35] to-black p-4 sm:p-6 md:min-h-0 md:p-5 lg:p-8">
            <div className="pointer-events-none absolute h-48 w-48 rounded-full bg-blue-500/20 blur-3xl sm:h-72 sm:w-72" />

            <div className="relative z-10 w-full max-w-[280px] sm:max-w-[360px] md:max-w-full">
              <Image
                src="/superior-as-speakrer.jpeg.jpeg"
                alt="Mian Ahmad Basit — Career Discovery Bootcamp poster"
                width={1100}
                height={1400}
                priority
                unoptimized
                sizes="(max-width: 639px) 280px, (max-width: 767px) 360px, 45vw"
                className="mx-auto block h-auto max-h-[42dvh] w-full rounded-lg border border-cyan-400/25 object-contain sm:max-h-[50dvh] md:max-h-[86dvh]"
              />
            </div>

            <span className="absolute bottom-3 left-3 z-10 rounded-full border border-cyan-400/30 bg-black/75 px-3 py-1.5 text-xs font-medium text-cyan-300 backdrop-blur-md sm:bottom-5 sm:left-5">
              Guest Speaker
            </span>
          </div>

          {/* Speaker information */}
          <div className="min-w-0 p-5 sm:p-7 md:min-h-0 md:overflow-y-auto md:p-7 lg:p-10">
            <p className="mb-2 pr-8 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-400 sm:text-xs sm:tracking-[0.2em]">
              Career Discovery Bootcamp
            </p>

            <h2
              id="speaker-title"
              className="break-words text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
            >
              Mian Ahmad Basit
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-400 sm:text-base">
              CEO &amp; Tech Entrepreneur
              <span className="text-cyan-400"> · P2P Clouds</span>
            </p>

            <div className="my-5 h-px bg-gradient-to-r from-cyan-400/60 to-transparent sm:my-6" />

            <h3 className="mb-3 text-lg font-semibold sm:text-xl">
              Understanding Blockchain
            </h3>

            <p className="text-sm leading-6 text-gray-300 sm:text-base">
              Explore blockchain fundamentals, real-world applications, and
              emerging career opportunities in Web3 in this technology-focused
              session.
            </p>

            {/* Event details */}
            <div className="mt-6 space-y-4 sm:mt-7 sm:space-y-5">
              <div className="flex items-start gap-3">
                <CalendarDays
                  className="mt-1 shrink-0 text-cyan-400"
                  size={19}
                />
                <div className="min-w-0">
                  <p className="text-xs text-gray-400">Date</p>
                  <p className="break-words text-sm font-semibold leading-6 sm:text-base">
                    Wednesday, 28 October 2026
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-1 shrink-0 text-cyan-400" size={19} />
                <div className="min-w-0">
                  <p className="text-xs text-gray-400">Time</p>
                  <p className="text-sm font-semibold leading-6 sm:text-base">
                    11:00 AM – 12:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-1 shrink-0 text-cyan-400" size={19} />
                <div className="min-w-0">
                  <p className="text-xs text-gray-400">Venue</p>
                  <p className="break-words text-sm font-semibold leading-6 sm:text-base">
                    Superior University, Gold Campus, Lahore
                  </p>
                </div>
              </div>
            </div>

            {/* Website link */}
            <a
              href="/"
              className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-[#080d18] sm:mt-7 sm:text-base"
            >
              Visit Site
              <ExternalLink size={17} />
            </a>

            <p className="mt-4 text-center text-xs leading-5 text-gray-500">
              Open to students, freshers &amp; professionals
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
