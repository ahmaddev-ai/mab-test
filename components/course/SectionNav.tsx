"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { NavItem } from "./types";

/** Floating quick-links on the right edge (large screens only). */
export default function SectionNav({ links }: { links: NavItem[] }) {
  const [activeId, setActiveId] = useState(links[0]?.id ?? "");
  const [collapsed, setCollapsed] = useState(true);
  const activeRef = useRef(activeId);

  useEffect(() => {
    activeRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    const sections = links
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) ratios.set(entry.target.id, entry.intersectionRatio);
        let best = activeRef.current;
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        if (bestRatio > 0) setActiveId(best);
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [links]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveId(id);
  };

  const [present, setPresent] = useState(links);

  useEffect(() => {
    setPresent(links.filter(({ id }) => document.getElementById(id) !== null));
  }, [links]);

  return (
    <nav
      aria-label="Section quick links"
      className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 2xl:block"
    >
      <div className="relative rounded-2xl border border-white/10 bg-[#0A0C1F]/85 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Expand section navigation" : "Collapse section navigation"}
          className="absolute -left-3 top-4 flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-[#0A0C1F] text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
        >
          {collapsed ? (
            <ChevronLeft className="h-3.5 w-3.5" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5" />
          )}
        </button>

        <ul className={`space-y-1 p-2.5 transition-all duration-300 ${collapsed ? "w-[88px]" : "w-52"}`}>
          {present.map(({ id, label, short }) => {
            const active = activeId === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => go(e, id)}
                  title={label}
                  aria-current={active ? "true" : undefined}
                  className={`flex items-center gap-2.5 overflow-hidden whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 ${
                    active
                      ? "bg-indigo-400/15 text-indigo-100"
                      : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                      active ? "bg-indigo-300" : "bg-white/25"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="truncate">{collapsed ? short : label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
