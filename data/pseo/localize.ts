import {
  pickTierIntro,
  pickVariant,
  ServiceCategory,
} from "./contentVariation";
import { pseoModules } from "./modules";
import { ServiceLocationRow } from "./seo-data";

const genericFaqs = [
  {
    question: "Is this a standalone course or part of the full program?",
    answer:
      "This module is drawn from Mian Ahmad Basit's full-length program and can be taken as a focused track or as part of the complete curriculum.",
  },
  {
    question: "Is this class online or in-person?",
    answer:
      "Classes run live online, so students anywhere in Pakistan — including this city — can join without relocating.",
  },
];

export function getLocalizedContent(row: ServiceLocationRow) {
  const base = pseoModules.find((m) => m.moduleId === row.BaseModuleId);
  if (!base) return null;

  const intro = pickTierIntro(
    row.LocationSlug,
    row.Location,
    row.Tier,
    row.Category as ServiceCategory
  );

  return {
    ...base,
    heroHighlight: `${base.heroHighlight} in ${row.Location}`,
    localizedIntro: intro,
    overview: `${base.overview} ${intro}`,
    faqs: [...base.faqs, ...genericFaqs], // all 3 module FAQs + 2 generic = 5 total
  };
}
