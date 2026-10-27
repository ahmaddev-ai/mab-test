import { services, PseoService } from "@/data/pseo/services";
import { cities, PseoCity } from "@/data/pseo/cities";

export type ServiceLocationRow = {
  ServiceSlug: string;
  ServiceName: string;
  BaseModuleId: string;
  Location: string;
  LocationSlug: string;
  Tier: string;
  Connector: string;
  WithAiText: string;
  Category: string; // "marketing" | "technical" — string per DataRow constraint
};

function hasAiToken(slug: string): boolean {
  // exact-token check, not substring — avoids false positives like "email"
  return slug.split("-").includes("ai");
}

function buildRows(): ServiceLocationRow[] {
  const rows: ServiceLocationRow[] = [];
  for (const service of services) {
    const alreadyHasAi = hasAiToken(service.slug);
    const connector = alreadyHasAi ? "in" : "with-ai-in";
    const withAiText = alreadyHasAi ? "" : "With AI ";

    for (const city of cities) {
      rows.push({
        ServiceSlug: service.slug,
        ServiceName: service.name,
        BaseModuleId: service.baseModuleId,
        Location: city.name,
        LocationSlug: city.slug,
        Tier: String(city.tier),
        Connector: connector,
        WithAiText: withAiText,
        Category: service.category,
      });
    }
  }
  return rows;
}

const ROWS = buildRows();

// Slug key must match forge.ts's new template pattern exactly
const SLUG_MAP = new Map(
  ROWS.map((r) => [`${r.ServiceSlug}-${r.Connector}-${r.LocationSlug}`, r])
);

export function buildServiceLocationRows() {
  return ROWS;
}

export function getServiceLocationRowBySlug(slug: string) {
  return SLUG_MAP.get(slug) ?? null;
}
