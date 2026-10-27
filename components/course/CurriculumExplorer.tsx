"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Download, ExternalLink, FileText, Search, X } from "lucide-react";
import { getIcon } from "./course-utils";
import { Cta, GlassCard, Section } from "./ui";
import type { ModuleData, Phase, Syllabus } from "./types";

function ModuleRow({ module }: { module: ModuleData }) {
  const [open, setOpen] = useState(false);
  const panelId = `module-${module.id}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-300"
      >
        <span className="shrink-0 rounded-lg bg-indigo-400/15 px-2.5 py-1 text-xs font-bold text-indigo-200">
          {module.id}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold leading-snug text-white sm:text-base">
            {module.title}
          </span>
          <span className="mt-0.5 line-clamp-1 block text-sm text-slate-400">
            {module.subtitle}
          </span>
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      <div
        id={panelId}
        role="region"
        className={`grid transition-[grid-template-rows,visibility] duration-300 ease-out ${
          open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/10 px-4 pb-5 pt-4">
            <p className="text-[15px] leading-relaxed text-slate-300">{module.overview}</p>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {module.topicGroups.map((group) => {
                const Icon = getIcon(group.icon);
                return (
                  <div
                    key={group.title}
                    className="rounded-xl border border-white/10 bg-black/20 p-4"
                  >
                    <p className="flex items-center gap-2.5 text-[15px] font-semibold text-white">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-400/15 text-indigo-300">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      {group.title}
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-slate-300">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-indigo-300" aria-hidden="true" />
                          <span className="min-w-0 break-words">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 rounded-xl border border-emerald-400/25 bg-emerald-400/[0.06] px-4 py-3">
              <p className="text-sm font-semibold text-emerald-300">Key outcome</p>
              <p className="mt-1 text-[15px] leading-relaxed text-slate-100">{module.keyOutcome}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CurriculumExplorer({
  id,
  heading,
  description,
  searchPlaceholder,
  phases,
  syllabus,
}: {
  id: string;
  heading: string;
  description: string;
  searchPlaceholder: string;
  phases: Phase[];
  syllabus: Syllabus;
}) {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("All");

  const totals = useMemo(() => {
    const modules = phases.reduce((n, p) => n + p.modules.length, 0);
    const topics = phases.reduce(
      (n, p) =>
        n +
        p.modules.reduce(
          (m, mod) => m + mod.topicGroups.reduce((g, grp) => g + grp.items.length, 0),
          0
        ),
      0
    );
    return { phases: phases.length, modules, topics };
  }, [phases]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return phases
      .filter((p) => domain === "All" || p.domain === domain)
      .map((p) => {
        if (!q) return p;
        const headerMatch = `${p.badge} ${p.title} ${p.description} ${p.skills.join(" ")} ${p.tools.join(" ")}`
          .toLowerCase()
          .includes(q);
        if (headerMatch) return p;
        const modules = p.modules.filter((m) =>
          `${m.id} ${m.title} ${m.subtitle} ${m.overview} ${m.topicGroups
            .map((g) => `${g.title} ${g.items.join(" ")}`)
            .join(" ")}`
            .toLowerCase()
            .includes(q)
        );
        return { ...p, modules };
      })
      .filter((p) => p.modules.length > 0);
  }, [phases, query, domain]);

  const stats = [
    [String(totals.phases), "Phases"],
    [String(totals.modules), "Modules"],
    [`${totals.topics}`, "Topics & subtopics"],
  ];

  return (
    <Section id={id} title={heading} description={description}>
      {/* Stats */}
      <dl className="grid gap-4 sm:grid-cols-3">
        {stats.map(([value, label]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center">
            <dd className="text-3xl font-extrabold text-white">{value}</dd>
            <dt className="mt-1 text-sm text-slate-400">{label}</dt>
          </div>
        ))}
      </dl>

      {/* Syllabus download */}
      <GlassCard className="mt-6" hover={false} innerClassName="p-6 sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 text-white">
              <FileText className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-white">{syllabus.title}</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-slate-300">
                {syllabus.description}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Cta href={syllabus.href} download={syllabus.filename} arrow={false}>
              <Download className="h-4 w-4" aria-hidden="true" />
              {syllabus.button}
            </Cta>
            <Cta href={syllabus.href} newTab variant="secondary" arrow={false}>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              View online
            </Cta>
          </div>
        </div>
      </GlassCard>

      {/* Search */}
      <div className="relative mt-8">
        <label htmlFor="curriculum-search" className="sr-only">
          Search the curriculum
        </label>
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          id="curriculum-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          autoComplete="off"
          className="h-14 w-full rounded-2xl border border-white/15 bg-white/[0.05] pl-12 pr-12 text-base text-white placeholder:text-slate-500 focus:border-indigo-400 focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-indigo-400/20 [&::-webkit-search-cancel-button]:hidden"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {/* Phase filter */}
      <div
        role="group"
        aria-label="Filter by phase"
        className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {["All", ...phases.map((p) => p.domain)].map((item) => {
          const active = domain === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setDomain(item)}
              aria-pressed={active}
              className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 ${
                active
                  ? "border-indigo-400/60 bg-indigo-400/20 text-indigo-100"
                  : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/25 hover:text-white"
              }`}
            >
              {item === "All" ? "All phases" : item}
            </button>
          );
        })}
      </div>

      {/* Phases */}
      <div className="mt-8 space-y-6">
        {filtered.map((phase) => (
          <article
            key={phase.id}
            className="rounded-[26px] border border-white/10 bg-white/[0.02] p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full bg-indigo-400/15 px-3 py-1 text-sm font-semibold text-indigo-200">
                {phase.badge}
              </span>
              <span className="text-sm text-slate-400">
                {phase.weeks} · {phase.modules.length} module
                {phase.modules.length === 1 ? "" : "s"}
              </span>
            </div>
            <h3 className="mt-3 text-xl font-extrabold leading-snug text-white sm:text-2xl">
              {phase.title}
            </h3>
            <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-slate-300">
              {phase.description}
            </p>
            <div className="mt-5 space-y-3">
              {phase.modules.map((module) => (
                <ModuleRow key={module.id} module={module} />
              ))}
            </div>
          </article>
        ))}

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
            <p className="text-lg font-semibold text-white">No curriculum topics found</p>
            <p className="mt-1 text-slate-400">Try a different keyword or reset the filters.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setDomain("All");
              }}
              className="mt-5 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#060714] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#060714]"
            >
              Reset filters
            </button>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
