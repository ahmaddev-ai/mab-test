import { BadgeCheck, Check } from "lucide-react";
import { Chip, Cta } from "./ui";
import type { CourseData } from "./types";

export default function Hero({
  hero,
  syllabus,
  onEnroll,
}: {
  hero: CourseData["hero"];
  syllabus: CourseData["syllabus"];
  onEnroll: () => void;
}) {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-white px-5 pb-16 pt-14 text-slate-900 transition-colors duration-300 dark:bg-[#080A18] dark:text-white sm:px-8 lg:px-12 lg:pb-24 lg:pt-24"
    >
      {/* Atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-[-260px] h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[150px] dark:bg-indigo-600/35" />
        <div className="absolute -right-40 top-40 h-[420px] w-[520px] rounded-full bg-violet-500/15 blur-[140px] dark:bg-violet-600/25" />
        <div className="absolute -left-40 top-[55%] h-[380px] w-[480px] rounded-full bg-cyan-500/10 blur-[140px] dark:bg-cyan-500/15" />

        <div
          className="absolute inset-0 opacity-[0.07] dark:opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 70% 55% at 50% 0%, #000 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 55% at 50% 0%, #000 30%, transparent 100%)",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        {/* Left */}
        <div>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white/70 px-4 py-1.5 text-sm font-semibold text-indigo-700 backdrop-blur-md dark:border-white/15 dark:bg-white/[0.06] dark:text-indigo-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {hero.leadBadge}
          </p>

          <p className="mt-6 text-sm font-semibold text-indigo-600 dark:text-indigo-300 sm:text-base">
            {hero.kicker}
          </p>

          <h1
            id="hero-heading"
            className="mt-3 text-balance text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-slate-950 dark:text-white sm:text-5xl lg:text-6xl"
          >
            {hero.title}
            <span className="mt-1 block bg-gradient-to-r from-cyan-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent dark:from-cyan-300 dark:via-indigo-300 dark:to-violet-300">
              {hero.titleAccent}
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-cyan-800 dark:text-cyan-200">
            {hero.highlight}
          </p>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            {hero.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {hero.chips.map((chip) => (
              <li key={chip}>
                <Chip>{chip}</Chip>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Cta onClick={onEnroll}>{hero.primaryCta}</Cta>
            <Cta
              href={hero.secondaryCta.href}
              variant="secondary"
              arrow={false}
            >
              {hero.secondaryCta.label}
            </Cta>
          </div>

          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            <a
              href={hero.tertiaryCta.href}
              className="font-semibold text-indigo-600 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:underline dark:text-indigo-300"
            >
              {hero.tertiaryCta.label}
            </a>
            <span
              className="mx-2 text-slate-400 dark:text-slate-600"
              aria-hidden="true"
            >
              |
            </span>
            <a
              href={syllabus.href}
              download={syllabus.filename}
              className="font-semibold text-indigo-600 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:underline dark:text-indigo-300"
            >
              {syllabus.button}
            </a>
          </p>
        </div>

        {/* Right: path + stats */}
        <div className="rounded-[30px] bg-gradient-to-b from-slate-300/70 via-slate-200/40 to-slate-100/60 p-px shadow-[0_40px_80px_-30px_rgba(99,102,241,0.25)] dark:from-white/35 dark:via-white/10 dark:to-white/5 dark:shadow-[0_40px_80px_-30px_rgba(99,102,241,0.55)]">
          <div className="rounded-[29px] bg-white/95 p-6 backdrop-blur-xl dark:bg-[#0A0C1F]/90 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {hero.journeyTitle}
            </h2>

            <ol className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {hero.journey.map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 dark:bg-indigo-400/15 dark:text-indigo-200"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span className="text-[15px] font-medium text-slate-700 dark:text-slate-100">
                    {step}
                  </span>
                </li>
              ))}
            </ol>

            <dl className="mt-7 grid grid-cols-2 gap-3 border-t border-slate-200 pt-6 dark:border-white/10">
              {hero.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-slate-100/80 p-4 dark:bg-white/[0.05]"
                >
                  <dt className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                    <BadgeCheck
                      className="h-4 w-4 text-indigo-600 dark:text-indigo-300"
                      aria-hidden="true"
                    />
                    {stat.label}
                  </dt>
                  <dd className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Check
                className="h-4 w-4 text-emerald-600 dark:text-emerald-300"
                aria-hidden="true"
              />
              Live weekend sessions with direct mentor guidance
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
