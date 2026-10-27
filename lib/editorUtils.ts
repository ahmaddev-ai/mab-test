import type { OutputData } from "@editorjs/editorjs";

/** Extracts plain text from EditorJS blocks (paragraphs, headers, lists, quotes, tables, code). */
export function blocksToText(data: OutputData | undefined): string {
  if (!data?.blocks?.length) return "";
  return data.blocks
    .map((block) => {
      switch (block.type) {
        case "paragraph":
        case "header":
        case "quote":
          return stripHtml(block.data?.text || block.data?.caption || "");
        case "list":
          return (block.data?.items || [])
            .map((i: any) => (typeof i === "string" ? stripHtml(i) : stripHtml(i?.content || "")))
            .join(" ");
        case "code":
          return block.data?.code || "";
        case "table":
          return (block.data?.content || [])
            .flat()
            .map((c: string) => stripHtml(c))
            .join(" ");
        default:
          return "";
      }
    })
    .join(" ")
    .trim();
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function wordCount(text: string): number {
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

export function charCount(text: string): number {
  return text.length;
}

/** Average adult reading speed ~200 wpm */
export function readingTimeMinutes(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / 200));
}

export function editorStats(data: OutputData | undefined) {
  const text = blocksToText(data);
  const words = wordCount(text);
  return {
    words,
    characters: charCount(text),
    readingTime: readingTimeMinutes(words),
  };
}

/** Appends a short random suffix if a slug collides — call after checking Firestore for existing slug */
export function withUniqueSuffix(slug: string): string {
  return `${slug}-${Math.random().toString(36).slice(2, 6)}`;
}
