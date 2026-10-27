"use client";

import { Eye, Loader2, Send } from "lucide-react";
import type { SaveStatus } from "@/hooks/useAutosave";

interface Props {
  status: SaveStatus;
  words: number;
  characters: number;
  readingTime: number;
  publishing: boolean;
  onPreview: () => void;
  onPublish: () => void;
  publishLabel?: string; // "Publish" vs "Update"
}

const statusLabel: Record<SaveStatus, string> = {
  idle: "",
  saving: "Saving...",
  saved: "Saved",
  error: "Couldn't save",
};

export default function PublishToolbar({
  status,
  words,
  characters,
  readingTime,
  publishing,
  onPreview,
  onPublish,
  publishLabel = "Publish",
}: Props) {
  return (
    <div className="sticky top-0 z-30 -mx-4 flex items-center justify-between gap-4 border-b border-slate-200 bg-slate-50/85 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 dark:border-white/10 dark:bg-[#05060a]/80">
      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-white/40">
        <span
          className={
            status === "error"
              ? "text-red-400"
              : status === "saving"
              ? "text-amber-400"
              : "text-emerald-400/80"
          }
        >
          {statusLabel[status]}
        </span>
        <span className="hidden sm:inline">{words} words</span>
        <span className="hidden sm:inline">{characters} chars</span>
        <span>{readingTime} min read</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPreview}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-200/70 dark:text-white/70 dark:hover:bg-white/5"
        >
          <Eye size={15} /> Preview
        </button>
        <button
          type="button"
          onClick={onPublish}
          disabled={publishing}
          className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 font-medium text-black transition hover:bg-emerald-600 disabled:opacity-50"
        >
          {publishing ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <Send size={15} />
          )}
          {publishing ? "Publishing..." : publishLabel}
        </button>
      </div>
    </div>
  );
}
