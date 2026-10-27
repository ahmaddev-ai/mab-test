// Pure helpers (no React) so they can be used on the server and the client.
import type { CourseData, Phase } from "./types";

export function computeStats(phases: Phase[]) {
  const modules = phases.reduce((n, p) => n + p.modules.length, 0);
  const topicGroups = phases.reduce(
    (n, p) => n + p.modules.reduce((m, mod) => m + mod.topicGroups.length, 0),
    0
  );
  const topics = phases.reduce(
    (n, p) =>
      n +
      p.modules.reduce(
        (m, mod) =>
          m + mod.topicGroups.reduce((g, grp) => g + grp.items.length, 0),
        0
      ),
    0
  );
  return {
    phases: phases.length,
    modules,
    topicGroups,
    topics,
    // Rounded down to the nearest 50 for friendly "900+" style marketing copy
    topicsRounded: topics >= 100 ? Math.floor(topics / 50) * 50 : topics,
  };
}

/**
 * Replaces {phases}, {modules}, {topics} and {groups} in every string of the
 * course JSON, so numbers in the copy always match the real curriculum data.
 */
export function resolveCourse(raw: CourseData): CourseData {
  const s = computeStats(raw.phases);
  const tokens: Record<string, string> = {
    phases: String(s.phases),
    modules: String(s.modules),
    topics: String(s.topicsRounded),
    groups: String(s.topicGroups),
  };

  const walk = (value: unknown): unknown => {
    if (typeof value === "string") {
      return value.replace(/\{(phases|modules|topics|groups)\}/g, (_, k) => tokens[k]);
    }
    if (Array.isArray(value)) return value.map(walk);
    if (value && typeof value === "object") {
      return Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, walk(v)])
      );
    }
    return value;
  };

  return walk(raw) as CourseData;
}
