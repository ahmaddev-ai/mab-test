"use client";

import { useState } from "react";
import { ArrowRight, Flag, Target } from "lucide-react";
import { Chip, Cta, GlassCard, Section } from "./ui";
import type { Phase } from "./types";

export default function Roadmap({
  id,
  heading,
  description,
  cta,
  phases,
  onEnroll,
}: {
  id: string;
  heading: string;
  description: string;
  cta: string;
  phases: Phase[];
  onEnroll: () => void;
}) {
  const [index, setIndex] = useState(0);
  const phase = phases[index];
  const progress = ((index + 1) / phases.length) * 100;

  return (
    <Section id={id} title={heading} description={description}>
      <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:gap-8">
        {/* Phase list */}
        <ol
          role="tablist"
          aria-label="Program phases"
          aria-orientation="vertical"
          className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:max-h-[640px] lg:flex-col lg:overflow-y-auto lg:px-0 lg:pb-0 lg:pr-2 [&::-webkit-scrollbar]:hidden"
        >
          {phases.map((p, i) => {
            const selected = i === index;
            return (
              <li key={p.id} className="shrink-0 lg:shrink">
                <button
                  type="button"
                  role="tab"
                  id={`phase-tab-${p.id}`}
                  aria-selected={selected}
                  aria-controls="phase-panel"
                  onClick={() => setIndex(i)}
                  className={`flex w-[230px] items-center gap-3 rounded-2xl border p-3.5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 lg:w-full ${
                    selected
                      ? "border-indigo-400/50 bg-indigo-400/10 shadow-[0_10px_40px_-20px_rgba(99,102,241,0.8)]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold ${
                      selected
                        ? "bg-gradient-to-br from-indigo-400 to-violet-500 text-white"
                        : "bg-white/[0.07] text-slate-300"
                    }`}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold text-indigo-300">
                      {p.badge} · {p.weeks}
                    </span>
                    <span className="line-clamp-2 text-sm font-semibold leading-snug text-white">
                      {p.title}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Phase detail */}
        <div
          role="tabpanel"
          id="phase-panel"
          aria-labelledby={`phase-tab-${phase.id}`}
          className="min-w-0"
        >
          <GlassCard hover={false} innerClassName="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2.5">
              <Chip tone="indigo">{phase.badge}</Chip>
              <Chip>{phase.weeks}</Chip>
              <Chip>
                {phase.modules.length} module{phase.modules.length === 1 ? "" : "s"}
              </Chip>
            </div>

            <h3 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
              {phase.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate-300">
              {phase.description}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-indigo-300">
                  <Flag className="h-4 w-4" aria-hidden="true" />
                  Checkpoint
                </p>
                <p className="mt-1.5 text-[15px] font-medium text-white">{phase.checkpoint}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
                  <Target className="h-4 w-4" aria-hidden="true" />
                  Milestone
                </p>
                <p className="mt-1.5 text-[15px] font-medium text-white">{phase.milestone}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold text-slate-400">Skills you gain</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {phase.skills.map((s) => (
                    <Chip key={s} tone="indigo">
                      {s}
                    </Chip>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-400">Tools you use</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {phase.tools.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-slate-400">Modules in this phase</h4>
              <ul className="mt-3 space-y-2">
                {phase.modules.map((m) => (
                  <li
                    key={m.id}
                    className="flex items-start gap-3 rounded-xl bg-white/[0.04] px-4 py-3"
                  >
                    <span className="mt-0.5 rounded-md bg-indigo-400/15 px-2 py-0.5 text-xs font-bold text-indigo-200">
                      {m.id}
                    </span>
                    <span className="text-[15px] font-medium leading-snug text-slate-100">
                      {m.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <div className="min-w-[180px] flex-1">
                <p className="text-sm text-slate-400">
                  Phase {index + 1} of {phases.length}
                </p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-cyan-300 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setIndex((i) => Math.min(phases.length - 1, i + 1))}
                  disabled={index === phases.length - 1}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 px-5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-40"
                >
                  Next phase
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <Cta onClick={onEnroll}>{cta}</Cta>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </Section>
  );
}
