import type { OutputData } from "@editorjs/editorjs";
import { deserializeEditorContentFromFirestore } from "@/lib/editorContent";

interface Props {
  data: OutputData;
}

export default function BlogRenderer({ data }: Props) {
  const normalized = deserializeEditorContentFromFirestore(data);
  if (!normalized?.blocks?.length) {
    return (
      <p className="text-slate-500 italic dark:text-white/30">
        Nothing to preview yet.
      </p>
    );
  }

  return (
    <div className="prose prose-slate max-w-none prose-img:rounded-xl prose-a:text-emerald-600 dark:prose-invert dark:prose-a:text-emerald-400">
      {normalized.blocks.map((block, i) => {
        switch (block.type) {
          case "header": {
            const level = Math.min(
              Math.max(Number(block.data.level) || 2, 1),
              6
            );
            const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
            return (
              <Tag
                key={i}
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            );
          }
          case "paragraph":
            return (
              <p
                key={i}
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            );
          case "list": {
            const Tag = block.data.style === "ordered" ? "ol" : "ul";
            return (
              <Tag key={i}>
                {block.data.items.map((item: any, j: number) => (
                  <li
                    key={j}
                    dangerouslySetInnerHTML={{
                      __html: typeof item === "string" ? item : item.content,
                    }}
                  />
                ))}
              </Tag>
            );
          }
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-emerald-500 pl-4"
              >
                <p dangerouslySetInnerHTML={{ __html: block.data.text }} />
                {block.data.caption && (
                  <cite className="text-sm text-slate-500 dark:text-white/40">
                    {block.data.caption}
                  </cite>
                )}
              </blockquote>
            );
          case "code":
            return (
              <pre
                key={i}
                className="overflow-x-auto rounded-lg bg-slate-950 p-4 text-slate-50 dark:bg-black/50"
              >
                <code>{block.data.code}</code>
              </pre>
            );
          case "delimiter":
            return (
              <div
                key={i}
                className="my-6 text-center text-slate-400 dark:text-white/30"
              >
                ...
              </div>
            );
          case "image":
            return (
              <figure key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={block.data.file?.url}
                  alt={block.data.caption || ""}
                  loading="lazy"
                  style={{ width: block.data.stretched ? "100%" : undefined }}
                  className={
                    block.data.withBorder
                      ? "border border-slate-200 dark:border-white/10"
                      : undefined
                  }
                />
                {block.data.caption && (
                  <figcaption className="text-center text-sm text-slate-500 dark:text-white/40">
                    {block.data.caption}
                  </figcaption>
                )}
              </figure>
            );
          case "table":
            return (
              <table key={i}>
                <tbody>
                  {(Array.isArray(block.data.content)
                    ? block.data.content
                    : []
                  ).map((row: any, r: number) => (
                    <tr key={r}>
                      {(Array.isArray(row) ? row : row?.cells || []).map(
                        (cell: any, c: number) => (
                          <td
                            key={c}
                            dangerouslySetInnerHTML={{ __html: cell }}
                          />
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          case "warning":
            return (
              <div
                key={i}
                className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4"
              >
                <p className="font-medium text-amber-500 dark:text-amber-400">
                  {block.data.title}
                </p>
                <p className="text-sm text-slate-700 dark:text-white/70">
                  {block.data.message}
                </p>
              </div>
            );
          case "embed":
            return (
              <figure key={i} className="not-prose my-6">
                <div className="aspect-video overflow-hidden rounded-lg bg-slate-100 dark:bg-black/40">
                  <iframe
                    src={block.data.embed}
                    title={
                      block.data.caption ||
                      block.data.service ||
                      "Embedded content"
                    }
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                {block.data.caption && (
                  <figcaption className="mt-2 text-center text-sm text-slate-500 dark:text-white/40">
                    {block.data.caption}
                  </figcaption>
                )}
              </figure>
            );
          case "linkTool":
            return (
              <a
                key={i}
                href={block.data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="not-prose block rounded-lg border border-slate-200 bg-white p-4 no-underline shadow-sm transition hover:border-emerald-500/40 dark:border-white/10 dark:bg-white/5"
              >
                {block.data.meta?.image?.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={block.data.meta.image.url}
                    alt=""
                    className="mb-3 max-h-48 w-full rounded-md object-cover"
                    loading="lazy"
                  />
                )}
                <p className="font-medium text-slate-950 dark:text-white">
                  {block.data.meta?.title || block.data.link}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-white/50">
                  {block.data.meta?.description}
                </p>
                <p className="mt-2 break-all text-xs text-slate-400 dark:text-white/30">
                  {block.data.link}
                </p>
              </a>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
