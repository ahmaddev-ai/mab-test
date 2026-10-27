"use client";

import { useState } from "react";
import { Cta, GlassCard, Section } from "./ui";
import type { CourseData, SliderConfig } from "./types";

type Career = NonNullable<CourseData["career"]>;

const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

function Slider({
  id,
  config,
  value,
  onChange,
}: {
  id: string;
  config: SliderConfig;
  value: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - config.min) / (config.max - config.min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={id}
          className="text-[15px] font-semibold text-slate-200"
        >
          {config.label}
        </label>
        <span className="text-xl font-extrabold text-white">
          {config.unit.startsWith("$") ? fmt(value) : value}
          <span className="ml-1 text-sm font-medium text-slate-400">
            {config.unit.startsWith("$") ? "/hr" : config.unit}
          </span>
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={config.min}
        max={config.max}
        step={config.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          background: `linear-gradient(to right, #818cf8 ${pct}%, rgba(255,255,255,0.12) ${pct}%)`,
        }}
        className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full accent-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0C1F]"
      />
      <div className="mt-2 flex justify-between text-xs text-slate-400">
        <span>{config.minLabel}</span>
        <span>{config.maxLabel}</span>
      </div>
    </div>
  );
}

export default function CareerSection({
  id,
  copy,
  onEnroll,
}: {
  id: string;
  copy: Career;
  onEnroll: () => void;
}) {
  const calc = copy.calculator;
  const [rate, setRate] = useState(calc?.rate.default ?? 0);
  const [hours, setHours] = useState(calc?.hours.default ?? 0);

  const monthly = calc ? rate * hours * calc.weeksPerMonth : 0;
  const yearly = monthly * 12;

  return (
    <Section id={id} title={copy.heading} description={copy.description}>
      <ul className="grid gap-5 lg:grid-cols-3">
        {copy.cards.map((card) => (
          <li key={card.title}>
            <GlassCard className="h-full" innerClassName="p-6 sm:p-7">
              <p className="text-sm font-semibold text-indigo-300">
                {card.title}
              </p>
              <h3 className="mt-1.5 text-lg font-bold text-white">
                {card.label}
              </h3>
              <p className="mt-4 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-3xl font-extrabold text-transparent">
                {card.value}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-300">
                {card.body}
              </p>
            </GlassCard>
          </li>
        ))}
      </ul>

      {calc ? (
        <div className="mt-8 grid gap-6 rounded-[28px] border border-emerald-400/25 bg-emerald-400/[0.05] p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-10">
          <div>
            <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
              {calc.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate-300">
              {calc.text}
            </p>
            <div className="mt-6">
              <Cta onClick={onEnroll}>{calc.cta}</Cta>
            </div>
          </div>

          <div className="rounded-3xl bg-[#0A0C1F] p-6 ring-1 ring-white/10">
            <div className="space-y-7">
              <Slider
                id="calc-rate"
                config={calc.rate}
                value={rate}
                onChange={setRate}
              />
              <Slider
                id="calc-hours"
                config={calc.hours}
                value={hours}
                onChange={setHours}
              />
            </div>

            <div
              className="mt-7 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5"
              aria-live="polite"
            >
              <p className="text-sm font-semibold text-emerald-200">
                {calc.resultLabel}
              </p>
              <p className="mt-1 text-4xl font-extrabold text-white">
                {fmt(monthly)}
                <span className="ml-1 text-lg font-medium text-slate-300">
                  / month
                </span>
              </p>
              <p className="mt-2 text-sm text-slate-300">
                About {fmt(yearly)} per year from part-time remote consulting.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {copy.disclaimer ? (
        <p className="mt-5 text-sm text-slate-400">{copy.disclaimer}</p>
      ) : null}
    </Section>
  );
}
