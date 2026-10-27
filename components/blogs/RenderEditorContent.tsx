import Image from "next/image";
import CopyCode from "./CopyCode";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { deserializeEditorContentFromFirestore } from "@/lib/editorContent";

interface Props {
  content: any;
  skipFirstImage?: boolean;
}

export default function RenderEditorContent({
  content,
  skipFirstImage = false,
}: Props) {
  const normalized = deserializeEditorContentFromFirestore(content);
  if (!normalized?.blocks) return null;

  let imageSkipped = false;

  return (
    <div className="space-y-10 leading-relaxed">
      {normalized.blocks.map((block: any) => {
        /* ---------- HEADER ---------- */
        if (block.type === "header") {
          const level = Math.min(Math.max(Number(block.data.level) || 2, 1), 6);
          const Tag = `h${level}` as any;
          return (
            <Tag
              key={block.id}
              className="mt-12 scroll-mt-32 font-heading text-3xl font-semibold tracking-[-1px] text-slate-950 dark:text-white md:text-4xl"
              dangerouslySetInnerHTML={{ __html: block.data.text }}
            />
          );
        }

        /* ---------- PARAGRAPH ---------- */
        if (block.type === "paragraph") {
          return (
            <p
              key={block.id}
              className="max-w-none text-lg leading-8 text-slate-700 dark:text-slate-300"
              dangerouslySetInnerHTML={{ __html: block.data.text }}
            />
          );
        }

        /* ---------- QUOTE ---------- */
        if (block.type === "quote") {
          return (
            <figure
              key={block.id}
              className="rounded-[18px] border border-slate-200 bg-slate-50 p-6 dark:border-white/[0.08] dark:bg-white/[0.03]"
            >
              <blockquote className="text-xl leading-9 text-slate-900 dark:text-white">
                <p dangerouslySetInnerHTML={{ __html: block.data.text }} />
              </blockquote>
              {block.data.caption && (
                <figcaption className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  {block.data.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        /* ---------- LIST ---------- */
        if (block.type === "list") {
          const Tag = block.data.style === "ordered" ? "ol" : "ul";
          return (
            <Tag
              key={block.id}
              className={`space-y-2 text-lg leading-8 text-slate-700 dark:text-slate-300 ${
                block.data.style === "ordered"
                  ? "list-decimal pl-6"
                  : "list-disc pl-6"
              }`}
            >
              {block.data.items.map((item: any, index: number) => (
                <li
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: typeof item === "string" ? item : item.content,
                  }}
                />
              ))}
            </Tag>
          );
        }

        /* ---------- IMAGE ---------- */
        if (block.type === "image") {
          if (skipFirstImage && !imageSkipped) {
            imageSkipped = true;
            return null;
          }
          return (
            <figure
              key={block.id}
              className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-xl shadow-blue-500/5 dark:border-white/[0.08] dark:bg-white/[0.03]"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={block.data.file.url}
                  alt={block.data.caption || "blog image"}
                  fill
                  className="object-cover"
                />
              </div>
              {block.data.caption && (
                <figcaption className="border-t border-slate-200 px-5 py-3 text-sm text-slate-500 dark:border-white/[0.08] dark:text-slate-400">
                  {block.data.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        /* ---------- CODE ---------- */
        if (block.type === "code") {
          const code = block.data.code || "";
          const rawLanguage = String(
            block.data.language || block.data.lang || ""
          )
            .toLowerCase()
            .trim();

          const languageMap: Record<string, string> = {
            html: "html",
            htm: "html",
            css: "css",
            js: "js",
            javascript: "js",
            jsx: "jsx",
            ts: "ts",
            typescript: "ts",
            tsx: "tsx",
          };

          const language = languageMap[rawLanguage] || rawLanguage || "code";

          const playgroundUrl = `/playground?${new URLSearchParams({
            code,
            language,
          }).toString()}`;
          // console.log(code);
          return (
            <div key={block.id} className="group relative mt-8">
              <div className="flex items-center justify-between rounded-t-xl border border-slate-200 bg-slate-100 px-4 py-2 dark:border-white/[0.08] dark:bg-[#151821]">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {language}
                </span>

                <Link
                  href={playgroundUrl}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-700"
                >
                  <ExternalLink size={14} />
                  Open in Playground
                </Link>
              </div>

              <div className="[&_pre]:!mt-0 [&_pre]:!rounded-t-none">
                <CopyCode code={code} />
              </div>
            </div>
          );
        }

        /* ---------- DELIMITER ---------- */
        if (block.type === "delimiter") {
          return (
            <hr
              key={block.id}
              className="my-14 border-slate-200 dark:border-white/[0.08]"
            />
          );
        }

        /* ---------- TABLE ---------- */
        if (block.type === "table") {
          const rows = Array.isArray(block.data.content)
            ? block.data.content
            : [];
          return (
            <div
              key={block.id}
              className="overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm dark:border-white/[0.08] dark:bg-white/[0.03]"
            >
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <tbody>
                    {rows.map((row: any, r: number) => {
                      const cells = Array.isArray(row) ? row : row?.cells || [];
                      return (
                        <tr
                          key={r}
                          className="border-b border-slate-200 last:border-0 dark:border-white/[0.06]"
                        >
                          {cells.map((cell: any, c: number) => (
                            <td
                              key={c}
                              className="min-w-[160px] px-4 py-3 align-top text-slate-700 dark:text-slate-300"
                              dangerouslySetInnerHTML={{ __html: cell }}
                            />
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        }

        /* ---------- WARNING ---------- */
        if (block.type === "warning") {
          return (
            <div
              key={block.id}
              className="rounded-[18px] border border-amber-300/40 bg-amber-50 p-5 text-amber-950 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-100"
            >
              {block.data.title && (
                <p className="mb-2 font-semibold">{block.data.title}</p>
              )}
              <p className="text-sm leading-7">{block.data.message}</p>
            </div>
          );
        }

        /* ---------- EMBED ---------- */
        if (block.type === "embed") {
          return (
            <figure key={block.id} className="space-y-3">
              <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-xl shadow-blue-500/5 dark:border-white/[0.08] dark:bg-white/[0.03]">
                <div className="aspect-video">
                  <iframe
                    src={block.data.embed}
                    title={
                      block.data.caption ||
                      block.data.service ||
                      "Embedded content"
                    }
                    className="h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
              {block.data.caption && (
                <figcaption className="text-center text-sm text-slate-500 dark:text-slate-400">
                  {block.data.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        /* ---------- LINK PREVIEW ---------- */
        if (block.type === "linkTool") {
          return (
            <a
              key={block.id}
              href={block.data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-500/30 hover:shadow-lg dark:border-white/[0.08] dark:bg-white/[0.03]"
            >
              {block.data.meta?.image?.url && (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={block.data.meta.image.url}
                    alt=""
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="space-y-2 p-5">
                <p className="text-base font-semibold text-slate-950 dark:text-white">
                  {block.data.meta?.title || block.data.link}
                </p>
                <p className="line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {block.data.meta?.description}
                </p>
                <p className="break-all text-xs text-slate-400 dark:text-slate-500">
                  {block.data.link}
                </p>
              </div>
            </a>
          );
        }

        return null;
      })}
    </div>
  );
}
