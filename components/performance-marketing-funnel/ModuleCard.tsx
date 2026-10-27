"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import {
  ChevronDown,
  Target,
  Gauge,
  Sparkles,
  Search,
  BarChart3,
  Video,
  Bot,
  Database,
  Briefcase,
  Mail,
  Store,
} from "lucide-react";

const ICONS: Record<
  string,
  ComponentType<{ size?: number; className?: string }>
> = {
  target: Target,
  gauge: Gauge,
  sparkles: Sparkles,
  search: Search,
  chart: BarChart3,
  video: Video,
  bot: Bot,
  database: Database,
  briefcase: Briefcase,
  mail: Mail,
  store: Store,
};

export default function ModuleCard({ module }: { module: any }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-xl shadow-blue-500/5 transition-all duration-500 dark:border-white/[0.08] dark:bg-white/[0.04]">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-blue-600 dark:text-blue-300">
        {module.id}
      </p>
      <h4 className="mt-2 font-heading text-xl font-medium text-slate-900 dark:text-white">
        {module.title}
      </h4>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {module.subtitle}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {module.overview}
      </p>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-600"
      >
        {open ? "Show less" : "Read more"}
        <ChevronDown
          size={15}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="mt-5 space-y-5 border-t border-black/10 pt-5 dark:border-white/[0.08]">
          {module.topicGroups.map((group: any) => {
            const Icon = ICONS[group.icon] ?? Sparkles;
            return (
              <div key={group.title}>
                <div className="flex items-center gap-2">
                  <Icon size={16} className="text-blue-500" />
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {group.title}
                  </p>
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-slate-600 dark:text-slate-300">
                  {group.items.map((item: any) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          })}

          <p className="rounded-xl bg-blue-600/5 p-3 text-sm text-blue-700 dark:text-blue-300">
            <span className="font-medium">Outcome: </span>
            {module.keyOutcome}
          </p>
        </div>
      )}
    </div>
  );
}
