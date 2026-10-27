import Image from "next/image";
import { Section } from "./shared";

const clientLogos = [
  "/clients/fast-small.webp",
  "/clients/jamia-small.webp",
  "/clients/psca-small.webp",
  "/clients/superior-small.webp",
  "/clients/umt-small.webp",
  "/clients/uol-small.webp",
  "/clients/web3pak-small.webp",
  "/clients/anz.webp",
  "/clients/ideo.webp",
  "/clients/ministry-of-it.webp",
  "/clients/nexskill.webp",
  "/clients/ozi.webp",
  "/clients/pbi.webp",
  "/clients/tevta.webp",
  "/clients/turtle.webp",
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
  "group flex h-24 shrink-0 items-center rounded-2xl border border-black/[0.06] bg-white/70 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_12px_28px_-18px_rgba(16,24,40,0.18)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_18px_36px_-18px_rgba(37,99,235,0.35)] dark:border-white/[0.08] dark:bg-white/[0.04] dark:shadow-none dark:hover:border-blue-400/40 dark:hover:bg-white/[0.07]";

export default function TrustedBySection() {
  const logos = [...clientLogos, ...clientLogos];
  const mediaChannels = [...channels, ...channels, ...channels];

  return (
    <Section id="trusted" eyebrow="" title="Trusted By">
      <div className="space-y-10">
        {/* Clients */}
        <div>
          <p className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500 dark:text-[#9CA3AF]">
            Clients
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-gradient-to-r from-black/10 to-transparent dark:from-white/10"
            />
          </p>

          <div className="group/row relative overflow-hidden">
            {/* Fade Edges */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent sm:w-40" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent sm:w-40" />

            <div className="flex w-max animate-marquee gap-5 py-3 motion-reduce:animate-none group-hover/row:[animation-play-state:paused]">
              {logos.map((logo, index) => (
                <div
                  key={`${logo}-${index}`}
                  aria-hidden={index >= clientLogos.length ? true : undefined}
                  className={`${cardBase} min-w-[180px] justify-center px-8`}
                >
                  <Image
                    src={logo}
                    alt={index >= clientLogos.length ? "" : "Client Logo"}
                    width={180}
                    height={80}
                    className="h-full max-h-16 w-full object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Channels */}
        <div>
          <p className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500 dark:text-[#9CA3AF]">
            Media / Podcast
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-gradient-to-r from-black/10 to-transparent dark:from-white/10"
            />
          </p>

          <div className="group/row relative overflow-hidden">
            {/* Fade Edges */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent sm:w-40" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent sm:w-40" />

            <div className="flex w-max animate-marquee-reverse gap-5 py-3 motion-reduce:animate-none group-hover/row:[animation-play-state:paused]">
              {mediaChannels.map((channel, index) => (
                <div
                  key={`${channel.name}-${index}`}
                  aria-hidden={index >= channels.length ? true : undefined}
                  className={`${cardBase} min-w-[220px] gap-4 px-6`}
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-black/[0.05] dark:bg-white/90 dark:ring-white/10">
                    <Image
                      src={channel.logo}
                      alt={index >= channels.length ? "" : channel.name}
                      width={60}
                      height={60}
                      className="h-10 w-10 object-contain"
                    />
                  </span>

                  {channel.name && (
                    <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
                      {channel.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
