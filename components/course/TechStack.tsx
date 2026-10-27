"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Section } from "./ui";

type Category = {
  category: string;
  tools: { name: string; badge: string; body: string }[];
};

export default function TechStack({
  id,
  heading,
  description,
  searchPlaceholder,
  categories,
}: {
  id: string;
  heading: string;
  description: string;
  searchPlaceholder: string;
  categories: Category[];
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");

  const total = categories.reduce((n, c) => n + c.tools.length, 0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories
      .filter((c) => active === "All" || c.category === active)
      .map((c) => ({
        ...c,
        tools: c.tools.filter(
          (t) =>
            !q || `${c.category} ${t.name} ${t.badge} ${t.body}`.toLowerCase().includes(q)
        ),
      }))
      .filter((c) => c.tools.length > 0);
  }, [categories, active, query]);

  return (
    <Section id={id} title={heading} description={description}>
      <div className="relative">
        <label htmlFor="stack-search" className="sr-only">
          Search tools
        </label>
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          id="stack-search"
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

      <div
        role="group"
        aria-label="Filter by category"
        className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {["All", ...categories.map((c) => c.category)].map((item) => {
          const selected = active === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setActive(item)}
              aria-pressed={selected}
              className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 ${
                selected
                  ? "border-indigo-400/60 bg-indigo-400/20 text-indigo-100"
                  : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/25 hover:text-white"
              }`}
            >
              {item === "All" ? `All (${total})` : item}
            </button>
          );
        })}
      </div>

      <div className="mt-10 space-y-12">
        {filtered.map((group) => (
          <div key={group.category}>
            <div className="mb-5 flex items-center gap-3">
              <h3 className="text-xl font-extrabold text-white sm:text-2xl">{group.category}</h3>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-300">
                {group.tools.length}
              </span>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.tools.map((tool) => (
                <li
                  key={tool.name}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-white/25 hover:bg-white/[0.07]"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-base font-bold text-white">{tool.name}</h4>
                    {tool.badge ? (
                      <span className="rounded-full bg-indigo-400/15 px-2.5 py-0.5 text-xs font-semibold text-indigo-200">
                        {tool.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-slate-300">{tool.body}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
            <p className="text-lg font-semibold text-white">No tools found</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActive("All");
              }}
              className="mt-4 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#060714] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#060714]"
            >
              Reset filters
            </button>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
