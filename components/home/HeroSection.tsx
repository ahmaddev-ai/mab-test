"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ButtonLink } from "./shared";
import ParticlesBg from "./Particlesbg";

const ROLES = ["Founder", "CEO", "CTO", "Strategic Advisor"];
const NAME = "Mian Ahmad Basit";

const STATS = [
  { value: "50,000+", label: "Talent Developed" },
  { value: "13+", label: "Years Executive Leadership" },
  { value: "5", label: "Continents Reached" },
];

const TAGS = ["Product Strategy • Execution • Growth", "Tech & Business Mentor"];

function useTypewriter() {
  const [display, setDisplay] = useState("");
  const state = useRef({ phase: "typing-name", roleIndex: 0, text: "" });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const s = state.current;
      const currentRole = ROLES[s.roleIndex];

      if (s.phase === "typing-name") {
        if (s.text.length < NAME.length) {
          s.text = NAME.slice(0, s.text.length + 1);
          timeoutId = setTimeout(tick, 55);
        } else {
          s.phase = "typing-role";
          timeoutId = setTimeout(tick, 500);
        }
      } else if (s.phase === "typing-role") {
        const full = `${NAME} — ${currentRole}`;
        if (s.text.length < full.length) {
          s.text = full.slice(0, s.text.length + 1);
          timeoutId = setTimeout(tick, 55);
        } else {
          s.phase = "deleting-role";
          timeoutId = setTimeout(tick, 1400);
        }
      } else {
        // deleting-role
        const base = `${NAME} — `;
        if (s.text.length > base.length) {
          s.text = s.text.slice(0, -1);
          timeoutId = setTimeout(tick, 30);
        } else {
          s.roleIndex = (s.roleIndex + 1) % ROLES.length;
          s.phase = "typing-role";
          timeoutId = setTimeout(tick, 200);
        }
      }

      setDisplay(s.text);
    };

    timeoutId = setTimeout(tick, 55);
    return () => clearTimeout(timeoutId);
  }, []);

  return display;
}

export default function HeroSection() {
  const typed = useTypewriter();
  const [nameText, roleText] = typed.split(" — ");

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden px-4 pt-24 sm:px-6 lg:px-10"
    >
      <ParticlesBg />

      {/* Background: glow + gradient */}
      <div className="absolute inset-0 z-[-2] bg-[radial-gradient(circle_at_50%_35%,rgba(59,130,246,0.24),transparent_34%),linear-gradient(145deg,#F8FAFC_0%,#E5E7EB_55%,#F8FAFC_100%)] dark:bg-[radial-gradient(circle_at_50%_35%,rgba(59,130,246,0.22),transparent_32%),radial-gradient(circle_at_80%_15%,rgba(139,92,246,0.13),transparent_26%),linear-gradient(145deg,#0A0A0A_0%,#111111_58%,#050505_100%)]" />

      {/* Grid that fades toward the edges */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[-1] bg-[linear-gradient(rgba(59,130,246,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.07)_1px,transparent_1px)] bg-[size:72px_72px] opacity-70 [mask-image:radial-gradient(ellipse_at_50%_40%,black_30%,transparent_78%)]"
      />

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-6rem)] max-w-7xl items-center gap-14 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* LEFT: COPY */}
        <div className="text-center lg:text-left">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 backdrop-blur-sm dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300 sm:text-xs">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500" />
            </span>
            AI / Cloud / Blockchain / Security / Education
          </p>

          <h1 className="mt-6 font-heading font-medium leading-[0.95] tracking-[-1px]">
            <span className="hero-line-1 block whitespace-normal text-4xl sm:whitespace-nowrap sm:text-5xl md:text-6xl lg:text-7xl">
              Engineering{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent dark:from-orange-400 dark:to-amber-300">
                Intelligent
              </span>
            </span>

            <span className="hero-line-2 mt-2 block whitespace-normal text-4xl sm:whitespace-nowrap sm:text-5xl md:text-6xl lg:text-7xl">
              Futures.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-600 dark:text-[#9CA3AF] sm:text-lg sm:leading-8 lg:mx-0">
            Founder, CEO, CTO & Strategic Advisor building AI, Cloud,
            Blockchain, Cybersecurity and Education ventures that empower
            organizations, startups, and future leaders worldwide.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
            <div className="w-full sm:w-auto">
              <ButtonLink href="/ecosystem" variant="primary">
                Explore Ecosystem
              </ButtonLink>
            </div>
            <div className="w-full sm:w-auto">
              <ButtonLink href="/products" variant="secondary">
                View Products
              </ButtonLink>
            </div>
          </div>

          {/* Key numbers */}
          <dl className="mx-auto mt-10 grid max-w-xl grid-cols-3 divide-x divide-black/10 overflow-hidden rounded-2xl border border-black/10 bg-white/50 shadow-lg shadow-blue-500/5 backdrop-blur-md dark:divide-white/10 dark:border-white/10 dark:bg-white/[0.04] lg:mx-0">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-3 py-4 sm:px-5 sm:py-5">
                <dd className="font-heading text-2xl font-medium tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-[11px] leading-snug text-slate-600 dark:text-[#9CA3AF] sm:text-xs">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex flex-wrap justify-center gap-2.5 lg:justify-start">
            {TAGS.map((item) => (
              <span
                key={item}
                className="rounded-full border border-blue-500/15 bg-blue-500/5 px-4 py-2 text-xs font-medium text-slate-700 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-blue-500/10 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-slate-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT: PORTRAIT */}
        <div className="flex flex-col items-center gap-8 lg:items-end">
          <div className="relative aspect-square w-[220px] sm:w-[300px] lg:w-[340px]">
            {/* Ambient halo */}
            <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-blue-500/25 blur-3xl dark:bg-blue-500/20" />

            {/* Spinning orbit ring */}
            <div
              aria-hidden
              className="absolute -inset-4 rounded-full border border-dashed border-blue-500/30 motion-safe:animate-[spin_18s_linear_infinite] dark:border-blue-400/30"
            />
            <div
              aria-hidden
              className="absolute -inset-8 rounded-full border border-blue-500/10 dark:border-blue-400/10"
            />
            <div
              aria-hidden
              className="absolute -inset-14 hidden rounded-full border border-blue-500/[0.06] dark:border-blue-400/[0.06] sm:block"
            />

            {/* Gradient frame + circular portrait */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-sky-300 to-orange-400 p-[3px] shadow-2xl shadow-blue-500/30 dark:shadow-blue-500/40">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-white dark:bg-[#0A0A0A]">
                <Image
                  src="/mab-logo.webp"
                  alt="Mian Ahmad Basit"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(min-width:1024px) 340px,
         (min-width:640px) 300px,
         220px"
                  className="object-cover animate-slow-zoom"
                />
              </div>
            </div>
          </div>

          {/* Typewriter identity card */}
          <div className="flex min-h-[5.5rem] w-full max-w-sm flex-col items-center justify-center rounded-2xl border border-black/10 bg-white/60 px-6 py-4 text-center shadow-lg shadow-blue-500/5 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.05] lg:items-end lg:text-right">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-blue-600 dark:text-blue-300">
              Founder Identity
            </p>
            <p className="mt-1.5 font-heading text-xl font-medium text-slate-900 sm:text-2xl dark:text-white">
              {nameText}
              {roleText !== undefined && (
                <span className="text-blue-600 dark:text-blue-400">
                  {" "}
                  — {roleText}
                </span>
              )}
              <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-blue-600 dark:bg-blue-400" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}