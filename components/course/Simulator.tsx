"use client";

import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw, TerminalSquare } from "lucide-react";
import { Chip, Cta, GlassCard, Section } from "./ui";

type SimulatorProps = {
  id: string;
  heading: string;
  description: string;
  topics: string[];
  defaultPrompt: string;
  logs: string[];
  steps: { title: string; body: string }[];
  cta: { title: string; text: string; button: string };
  onEnroll: () => void;
};

export default function Simulator({
  id,
  heading,
  description,
  topics,
  defaultPrompt,
  logs,
  steps,
  cta,
  onEnroll,
}: SimulatorProps) {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [visible, setVisible] = useState(logs.length);
  const [running, setRunning] = useState(false);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const run = () => {
    clearTimers();
    setVisible(0);
    setRunning(true);
    logs.forEach((_, i) => {
      const t = window.setTimeout(() => {
        setVisible(i + 1);
        if (i === logs.length - 1) setRunning(false);
      }, 450 * (i + 1));
      timers.current.push(t);
    });
  };

  const stepLit = (i: number) =>
    visible >= Math.ceil(((i + 1) * logs.length) / steps.length);

  return (
    <Section id={id} title={heading} description={description}>
      <div className="mb-6 flex flex-wrap gap-2.5">
        {topics.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Terminal */}
        <div className="overflow-hidden rounded-[26px] border border-emerald-400/25 bg-[#03110e] font-mono shadow-[0_30px_80px_-40px_rgba(16,185,129,0.5)]">
          <div className="flex items-center justify-between gap-3 border-b border-emerald-400/20 px-5 py-3.5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-400/70" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-amber-400/70" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/70" aria-hidden="true" />
              <span className="ml-3 text-sm text-emerald-200">Live architecture engine v2.4</span>
            </div>
            <span className="rounded-md bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
              {running ? "RUNNING" : "ACTIVE"}
            </span>
          </div>

          <div className="p-5">
            <label htmlFor="agent-prompt" className="block text-sm text-slate-400">
              Test prompt
            </label>
            <textarea
              id="agent-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="mt-2 min-h-28 w-full resize-y rounded-xl border border-white/10 bg-black/45 p-4 text-sm leading-6 text-slate-200 outline-none transition focus:border-emerald-300/70 focus:ring-4 focus:ring-emerald-300/10"
            />
            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-xs text-slate-500">
                Tokens: ~{Math.max(1, Math.round(prompt.length / 4))}
              </p>
              <button
                type="button"
                onClick={run}
                disabled={running}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-300 px-5 text-sm font-bold text-slate-950 transition hover:bg-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#03110e] disabled:cursor-wait disabled:opacity-70"
              >
                {visible === logs.length && !running ? (
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Play className="h-4 w-4" aria-hidden="true" />
                )}
                {running ? "Running..." : "Run simulation"}
              </button>
            </div>

            <p className="mt-6 text-sm font-semibold text-emerald-200">Pipeline trace logs</p>
            <div className="mt-3 min-h-[260px] space-y-2.5" aria-live="polite">
              {logs.slice(0, visible).map((log) => (
                <p key={log} className="text-sm leading-6 text-emerald-100">
                  <span className="text-emerald-400">&gt;</span> {log}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Steps */}
        <ol className="grid gap-4">
          {steps.map((step, i) => {
            const lit = stepLit(i);
            return (
              <li
                key={step.title}
                className={`rounded-[22px] border p-5 transition-colors duration-500 ${
                  lit
                    ? "border-emerald-400/40 bg-emerald-400/[0.06]"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-500 ${
                      lit ? "bg-emerald-400/20 text-emerald-300" : "bg-white/[0.07] text-slate-300"
                    }`}
                  >
                    <TerminalSquare className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      <span className="mr-2 text-indigo-300">0{i + 1}</span>
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-slate-300">{step.body}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <GlassCard className="mt-8" hover={false} innerClassName="p-7 text-center sm:p-9">
        <h3 className="text-2xl font-extrabold text-white">{cta.title}</h3>
        <p className="mx-auto mt-2 max-w-xl text-base text-slate-300">{cta.text}</p>
        <div className="mt-6 flex justify-center">
          <Cta onClick={onEnroll}>{cta.button}</Cta>
        </div>
      </GlassCard>
    </Section>
  );
}
