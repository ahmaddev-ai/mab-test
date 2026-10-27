"use client";

import { useMemo, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import { Section } from "./ui";

export default function FaqSection({
  id,
  heading,
  description,
  searchPlaceholder,
  initialCount,
  items,
}: {
  id: string;
  heading: string;
  description: string;
  searchPlaceholder: string;
  initialCount: number;
  items: { question: string; answer: string }[];
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  const q = query.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      items
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => !q || `${item.question} ${item.answer}`.toLowerCase().includes(q)),
    [items, q]
  );

  const limited = q || showAll ? filtered : filtered.slice(0, initialCount);
  const hidden = filtered.length - limited.length;

  return (
    <Section id={id} title={heading} description={description}>
      <div className="mx-auto max-w-3xl">
        <div className="relative">
          <label htmlFor="faq-search" className="sr-only">
            Search questions
          </label>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            id="faq-search"
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

        <ul className="mt-6 space-y-3">
          {limited.map(({ item, index }) => {
            const isOpen = open === index;
            return (
              <li
                key={item.question}
                className={`rounded-[22px] border transition-all duration-300 ${
                  isOpen
                    ? "border-indigo-400/40 bg-indigo-400/[0.07]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/25"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${index}`}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="flex w-full items-center gap-4 rounded-[22px] p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
                  >
                    <span className="flex-1 text-base font-semibold leading-snug text-white">
                      {item.question}
                    </span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen ? "rotate-45 bg-white text-[#060714]" : "bg-white/10 text-white"
                      }`}
                      aria-hidden="true"
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${index}`}
                  role="region"
                  aria-labelledby={`faq-q-${index}`}
                  className={`grid transition-[grid-template-rows,visibility] duration-300 ease-out ${
                    isOpen ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[15px] leading-relaxed text-slate-300">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {filtered.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
            <p className="text-lg font-semibold text-white">No questions found</p>
            <p className="mt-1 text-slate-400">Try a different keyword.</p>
          </div>
        ) : null}

        {hidden > 0 ? (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="rounded-full border border-white/20 bg-white/[0.05] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Show all {filtered.length} questions
            </button>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
