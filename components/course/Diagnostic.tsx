"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, RotateCcw, Sparkles } from "lucide-react";
import { Cta, GlassCard, Section } from "./ui";
import type { DiagnosticData } from "./types";

function pickResult(data: DiagnosticData, answers: (number | undefined)[]) {
  const holds = (c: { question: number; options: number[] }) => {
    const a = answers[c.question];
    return a !== undefined && c.options.includes(a);
  };
  for (const rule of data.rules) {
    const ok =
      rule.match === "any" ? rule.conditions.some(holds) : rule.conditions.every(holds);
    if (ok) return data.results[rule.result];
  }
  return data.results[data.defaultResult];
}

export default function Diagnostic({
  id,
  data,
  onEnroll,
}: {
  id: string;
  data: DiagnosticData;
  onEnroll: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | undefined)[]>([]);
  const [done, setDone] = useState(false);

  const total = data.questions.length;
  const question = data.questions[current];
  const result = useMemo(() => pickResult(data, answers), [data, answers]);
  const progress = done ? 100 : (current / total) * 100;

  const choose = (optionIndex: number) => {
    const next = [...answers];
    next[current] = optionIndex;
    setAnswers(next);
    if (current === total - 1) setDone(true);
    else window.setTimeout(() => setCurrent((c) => c + 1), 180);
  };

  const reset = () => {
    setAnswers([]);
    setCurrent(0);
    setDone(false);
  };

  return (
    <Section id={id} title={data.heading} description={data.description}>
      <div className="mx-auto max-w-3xl">
        <GlassCard hover={false} innerClassName="p-6 sm:p-9">
          {done ? (
            <div className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300 ring-8 ring-emerald-400/5">
                <Check className="h-7 w-7" strokeWidth={2.5} aria-hidden="true" />
              </span>
              <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-300">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Your recommended starting point
              </p>
              <h3 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                {result.phase}
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-slate-300">
                {result.description}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Cta onClick={onEnroll}>{data.enrollCta}</Cta>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  {data.retakeLabel}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between gap-4 text-sm">
                <p className="font-semibold text-white">
                  Question {current + 1} of {total}
                </p>
                <p className="text-indigo-300">{Math.round(progress)}% complete</p>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-cyan-300 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <h3 className="mt-7 text-xl font-bold leading-snug text-white sm:text-2xl">
                {question.question}
              </h3>

              <div role="radiogroup" aria-label={question.question} className="mt-6 space-y-3">
                {question.options.map((option, i) => {
                  const selected = answers[current] === i;
                  return (
                    <button
                      key={option}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => choose(i)}
                      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left text-[15px] leading-snug transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 ${
                        selected
                          ? "border-indigo-400/60 bg-indigo-400/15 text-white"
                          : "border-white/10 bg-white/[0.04] text-slate-200 hover:border-white/25 hover:bg-white/[0.07]"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                          selected ? "bg-indigo-400 text-[#060714]" : "bg-white/10 text-slate-300"
                        }`}
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <span className="flex-1">{option}</span>
                      {selected ? <Check className="h-5 w-5 text-indigo-200" aria-hidden="true" /> : null}
                    </button>
                  );
                })}
              </div>

              {current > 0 ? (
                <button
                  type="button"
                  onClick={() => setCurrent((c) => c - 1)}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white focus-visible:outline-none focus-visible:underline"
                >
                  <ArrowRight className="h-4 w-4 rotate-180" aria-hidden="true" />
                  Previous question
                </button>
              ) : null}
            </>
          )}
        </GlassCard>
      </div>
    </Section>
  );
}
