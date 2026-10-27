import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // spaces → dash
    .replace(/--+/g, "-"); // remove double dash
}
export function hasRealContent(content: any) {
  if (!content?.blocks?.length) return false;

  return content.blocks.some((block: any) => {
    if (block.type === "paragraph" || block.type === "header") {
      return block.data?.text?.replace(/<[^>]*>/g, "").trim() !== "";
    }

    if (block.type === "image") return true;
    if (block.type === "code") return block.data?.code?.trim() !== "";

    return false;
  });
}

// ─── SEO Generation ───────────────────────────────────────────────────────────

const SITE_NAME = "Mian Ahmad Basit";

const SEO_STOP_WORDS = new Set([
  "a","an","the","and","or","but","in","on","at","to","for","of","with",
  "by","from","as","is","was","are","were","be","been","being","have",
  "has","had","do","does","did","will","would","could","should","may",
  "might","shall","can","it","its","this","that","these","those","i",
  "you","he","she","we","they","my","your","his","her","our","their",
  "what","which","who","when","where","why","how","all","each","every",
  "both","few","more","most","other","some","such","no","not","only",
  "same","so","than","too","very","just","about","after","also","back",
  "even","get","give","go","here","if","into","know","like","look",
  "make","me","much","new","now","over","own","say","see","take",
  "think","time","two","up","use","way","well","while","then",
]);

function truncateAtWord(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  const cut = text.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");
  return lastSpace > 0 ? cut.slice(0, lastSpace) : cut;
}

function extractPlainText(content: any): string {
  if (!content?.blocks?.length) return "";
  return content.blocks
    .map((block: any) => {
      if (block.type === "paragraph" || block.type === "header" || block.type === "quote") {
        return block.data?.text?.replace(/<[^>]*>/g, "").trim() || "";
      }
      if (block.type === "list") {
        const items: string[] = block.data?.items || [];
        return items.map((item: any) =>
          typeof item === "string"
            ? item.replace(/<[^>]*>/g, "").trim()
            : (item?.content || "").replace(/<[^>]*>/g, "").trim()
        ).join(" ");
      }
      if (block.type === "code") return block.data?.code?.trim() || "";
      return "";
    })
    .filter(Boolean)
    .join(" ");
}

function extractKeywords(text: string, max = 8): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !SEO_STOP_WORDS.has(w));

  const freq: Record<string, number> = {};
  for (const word of words) freq[word] = (freq[word] || 0) + 1;

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([word]) => word);
}

export function generateSeoMeta(
  title: string,
  content: any
): { metaTitle: string; metaDescription: string; keywords: string[] } {
  const plainText = extractPlainText(content);

  // Meta title: keep within 60 chars; append site name if it fits
  const withSite = `${title.trim()} | ${SITE_NAME}`;
  const metaTitle =
    withSite.length <= 60
      ? withSite
      : title.trim().length <= 60
      ? title.trim()
      : truncateAtWord(title.trim(), 57) + "...";

  // Meta description: first 155 chars of content, trimmed at a word boundary
  const metaDescription =
    plainText.length === 0
      ? `Read "${title.trim()}" on ${SITE_NAME}.`
      : plainText.length <= 160
      ? plainText
      : truncateAtWord(plainText, 155) + "...";

  // Keywords: blend title words + content frequency
  const keywords = extractKeywords(`${title} ${plainText.slice(0, 600)}`);

  return { metaTitle, metaDescription, keywords };
}
