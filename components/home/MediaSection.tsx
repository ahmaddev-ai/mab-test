import Image from "next/image";
import { Mic2, Newspaper, PlayCircle } from "lucide-react";
import { Section } from "./shared";

const mediaItems = [
  "Podcast conversations on AI adoption and blockchain systems",
  "Television and radio interviews on technology education",
  "YouTube talks for founders, developers, and students",
];

const channels = [
  {
    name: "FM 4",
    logo: "/channels/fm4.webp",
  },
  {
    name: "Lahore Rang",
    logo: "/channels/lahorerang.webp",
  },
  {
    name: "Rohi News",
    logo: "/channels/rohi.png",
  },
  {
    name: "",
    logo: "/channels/salam-pakistan.png",
  },
  {
    name: "SUNO News",
    logo: "/channels/suno.webp",
  },
  {
    name: "Suno Pakistan",
    logo: "/channels/sunopak.webp",
  },
];

const cardBase =
  "rounded-[28px] border border-black/[0.08] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_24px_50px_-28px_rgba(16,24,40,0.25)] dark:border-white/[0.08] dark:bg-white/[0.04] dark:shadow-none";

export default function MediaSection() {
  return (
    <Section id="media" eyebrow="" title="Media / Podcasts">
      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
        {/* LEFT IMAGE */}
        <div
          className={`group relative flex overflow-hidden ${cardBase} dark:bg-[#111111]`}
        >
          <div className="relative h-full min-h-[460px] w-full sm:min-h-[520px]">
            <Image
              src="/gallery/mian-ahmad-basit-as-speaker-1.webp"
              alt="Ahmad Basit speaking"
              fill
              sizes="(min-width:1024px) 40vw, 100vw"
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blue-700/25 to-transparent"
            />

            {/* Play cue */}
            <div className="absolute bottom-6 left-6 flex items-center gap-4">
              <span className="relative flex h-16 w-16 items-center justify-center">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-white/30 motion-safe:animate-ping"
                />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-white/15 shadow-2xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                  <PlayCircle className="text-white" size={32} />
                </span>
              </span>
            </div>

            <div className="absolute right-5 top-5 rounded-full border border-white/15 bg-black/35 px-4 py-2 backdrop-blur-md">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-blue-200">
                Media Presence
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col gap-5 lg:gap-6">
          {/* CHANNELS */}
          <div className={`${cardBase} p-6 sm:p-7`}>
            <div className="mb-6">
              <p className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-blue-600 dark:text-blue-300">
                <span
                  aria-hidden="true"
                  className="h-px w-6 bg-gradient-to-r from-blue-600 to-transparent dark:from-blue-300"
                />
                Featured Channels
              </p>

              <h3 className="mt-3 font-heading text-2xl font-medium tracking-tight text-slate-900 dark:text-white">
                TV & Media Networks
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-6">
              {channels.map((channel, index) => (
                <div
                  key={`${channel.name}-${index}`}
                  className="group/channel rounded-2xl border border-black/[0.06] bg-slate-50/80 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-white hover:shadow-[0_18px_36px_-18px_rgba(37,99,235,0.35)] dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-400/40 dark:hover:bg-white/[0.06]"
                >
                  <div className="relative mx-auto aspect-square overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/[0.05] dark:ring-white/10">
                    <Image
                      src={channel.logo}
                      alt={channel.name}
                      fill
                      sizes="(min-width:1280px) 90px, (min-width:640px) 140px, 45vw"
                      className="object-cover transition-transform duration-500 group-hover/channel:scale-105"
                    />
                  </div>

                  {channel.name && (
                    <p className="mt-3 text-center text-xs font-semibold leading-snug text-slate-700 dark:text-[#D1D5DB]">
                      {channel.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* MEDIA ITEMS */}
          <ul className="grid gap-4">
            {mediaItems.map((item, index) => (
              <li
                key={item}
                className="group flex items-center gap-5 rounded-[24px] border border-black/[0.08] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_16px_36px_-24px_rgba(16,24,40,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_24px_48px_-24px_rgba(37,99,235,0.35)] dark:border-white/[0.08] dark:bg-white/[0.04] dark:shadow-none dark:hover:border-blue-400/40 sm:p-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/30 ring-1 ring-white/20 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
                  {index % 2 === 0 ? (
                    <Mic2 size={22} />
                  ) : (
                    <Newspaper size={22} />
                  )}
                </span>

                <p className="flex-1 leading-7 text-slate-700 dark:text-[#D1D5DB]">
                  {item}
                </p>

                <span
                  aria-hidden="true"
                  className="font-mono text-sm text-slate-300 transition-colors duration-300 group-hover:text-blue-500 dark:text-white/20 dark:group-hover:text-blue-300"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
