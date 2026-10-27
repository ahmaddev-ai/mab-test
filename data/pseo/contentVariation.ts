export type ServiceCategory = "marketing" | "technical";

const marketingTierIntros: Record<1 | 2 | 3, string[]> = {
  1: [
    "As one of Pakistan's largest digital economies, {city} has no shortage of agencies claiming results — this program teaches you to run campaigns yourself.",
    "{city}'s competitive market means generic marketing knowledge isn't enough. This course builds practical, campaign-ready skills.",
  ],
  2: [
    "{city}'s growing business scene needs marketers who can execute, not just theorize — this program is built for that.",
    "As {city}'s digital market expands, demand for skilled marketers is rising fast. Get ahead of it.",
  ],
  3: [
    "{city} is an emerging market for digital services — early movers who master these skills have the advantage.",
    "Local businesses in {city} are actively looking for marketers who understand both global platforms and local context.",
  ],
};

const technicalTierIntros: Record<1 | 2 | 3, string[]> = {
  1: [
    "As {city}'s tech talent pool grows, demand for engineers who can ship production AI systems — not just prototypes — is rising fast.",
    "{city}'s software industry is competitive enough that AI fundamentals aren't a differentiator anymore. This program builds production-grade depth instead.",
  ],
  2: [
    "{city}'s tech and software sector is expanding, and engineers who can build real AI systems have a clear edge over ones who only know the theory.",
    "As {city} attracts more remote and outsourced engineering work, production AI skills open doors that generic coding knowledge doesn't.",
  ],
  3: [
    "{city}'s tech scene is still emerging — engineers who build genuine AI engineering depth now are positioned ahead of the curve.",
    "Remote AI engineering roles don't care where you're based — {city}-based engineers with real production skills can compete globally.",
  ],
};

const tierIntrosByCategory: Record<
  ServiceCategory,
  Record<1 | 2 | 3, string[]>
> = {
  marketing: marketingTierIntros,
  technical: technicalTierIntros,
};

export function pickTierIntro(
  citySlug: string,
  cityName: string,
  tier: string,
  category: ServiceCategory = "marketing"
): string {
  const tierNum = Number(tier) as 1 | 2 | 3;
  const pool =
    tierIntrosByCategory[category]?.[tierNum] ?? marketingTierIntros[1];
  const variant = pickVariant(citySlug, pool);
  return variant.replace(/\{city\}/g, cityName);
}

export function pickVariant<T>(seed: string, variants: T[]): T {
  let hash = 0;
  for (let i = 0; i < seed.length; i++)
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return variants[hash % variants.length];
}
