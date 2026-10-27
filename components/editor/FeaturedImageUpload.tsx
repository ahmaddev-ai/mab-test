"use client";

import { useCallback, useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import toast from "react-hot-toast";
import { deleteImage, uploadImage, validateImage } from "@/lib/imageUpload";

interface Props {
  value?: { url: string; path: string } | null;
  onChange: (img: { url: string; path: string } | null) => void;
}

export default function FeaturedImageUpload({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback(
    async (file: File | null) => {
      if (!file) return;
      const err = validateImage(file);
      if (err) return toast.error(err);

      try {
        setProgress(0);
        if (value?.path) await deleteImage(value.path);
        const result = await uploadImage(file, "blogs/featured", setProgress);
        onChange({ url: result.url, path: result.path });
        toast.success("Featured image uploaded");
      } catch (e: any) {
        toast.error(e?.message || "Upload failed");
      } finally {
        setProgress(null);
      }
    },
    [value, onChange]
  );

  const handleRemove = async () => {
    if (value?.path) await deleteImage(value.path);
    onChange(null);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFile(e.dataTransfer.files?.[0] || null);
      }}
      className={`relative overflow-hidden rounded-xl border-2 border-dashed transition ${
        dragging
          ? "border-emerald-500 bg-emerald-500/5"
          : "border-slate-200 bg-white dark:border-white/10 dark:bg-white/5"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] || null)}
      />

      {value?.url ? (
        <div className="group relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value.url}
            alt="Featured"
            className="max-h-80 w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 transition group-hover:opacity-100">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-lg bg-white/90 px-4 py-2 text-sm font-medium text-black"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="rounded-lg bg-red-500/90 p-2 text-white"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 py-14 text-slate-500 transition hover:text-slate-800 dark:text-white/40 dark:hover:text-white/70"
        >
          <ImagePlus size={28} />
          <span className="text-sm">
            Drag & drop a featured image, or click to browse
          </span>
          <span className="text-xs text-slate-400 dark:text-white/25">
            JPG, PNG, WEBP, GIF - up to 5MB
          </span>
        </button>
      )}

      {progress !== null && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200 dark:bg-white/10">
          <div
            className="h-full bg-emerald-500 transition-all"
            style={{ width: `${progress}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <Loader2 className="animate-spin text-emerald-400" size={18} />
          </div>
        </div>
      )}
    </div>
  );
}
