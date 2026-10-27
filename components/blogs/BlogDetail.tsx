"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import Image from "next/image";
import RenderEditorContent from "@/components/blogs/RenderEditorContent";
import { Calendar, Clock, Share2 } from "lucide-react";
import ShareModal from "./ShareModal";
import { deserializeEditorContentFromFirestore } from "@/lib/editorContent";

export default function BlogDetails({ id }: { id: string }) {
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "blogs"), where("slug", "==", id));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const data = snap.docs[0].data() as any;
          setBlog({
            id: snap.docs[0].id,
            ...data,
            content: deserializeEditorContentFromFirestore(
              data.content || { blocks: [] }
            ),
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0A0A] flex items-center justify-center relative overflow-hidden">
        <div className="relative bg-white dark:bg-[#111111] border border-black/10 dark:border-white/[0.08] rounded-3xl px-12 py-10 shadow-xl shadow-blue-500/5 flex flex-col items-center gap-6">
          <div className="w-14 h-14 border-4 border-blue-500/20 border-t-blue-600 rounded-full animate-spin" />
          <div className="text-center">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Loading Article
            </h2>
            <p className="text-slate-500 dark:text-[#9CA3AF] text-sm mt-1">
              Preparing your reading experience...
            </p>
          </div>
          <div className="space-y-3 w-64 mt-4">
            <div className="h-3 bg-slate-100 dark:bg-white/[0.06] rounded animate-pulse" />
            <div className="h-3 bg-slate-100 dark:bg-white/[0.06] rounded animate-pulse w-5/6" />
            <div className="h-3 bg-slate-100 dark:bg-white/[0.06] rounded animate-pulse w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0A0A] flex items-center justify-center text-slate-500 dark:text-[#9CA3AF]">
        Blog not found
      </div>
    );
  }

  /* ---------- Helpers ---------- */
  const featuredImage = blog.featuredImage?.url;
  const contentHeroImage = blog.content?.blocks?.find(
    (b: any) => b.type === "image"
  )?.data?.file?.url;
  const heroImage = featuredImage || contentHeroImage;
  const skipFirstBodyImage = !featuredImage && !!contentHeroImage;

  const publishedDate = blog.createdAt?.seconds
    ? new Date(blog.createdAt.seconds * 1000).toDateString()
    : "";

  const readingTime = calculateReadingTime(blog);

  /* ---------- UI ---------- */
  return (
    <article className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0A0A] text-slate-900 dark:text-white relative overflow-hidden">
      {/* Subtle radial bg — matches home page hero */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.08),transparent_40%)]" />

      <div className="relative">
        {/* HERO SECTION */}
        <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-28 pb-12 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-blue-600 dark:text-blue-300">
            Article
          </p>
          <h1 className="mt-5 font-heading text-4xl md:text-5xl font-medium tracking-[-1px] leading-[1.05] text-slate-900 dark:text-white">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center justify-center flex-wrap gap-4 mt-8 text-sm text-slate-500 dark:text-[#9CA3AF]">
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              {publishedDate}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} />
              {readingTime} min read
            </div>
            <button
              onClick={() => setShareOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-black/10 dark:border-white/[0.08] bg-white dark:bg-white/[0.04] hover:border-blue-500/60 dark:hover:border-blue-500/40 transition text-slate-600 dark:text-[#9CA3AF] hover:text-blue-600 dark:hover:text-blue-300"
            >
              <Share2 size={14} />
              Share
            </button>
          </div>
        </div>

        {/* HERO IMAGE */}
        {heroImage && (
          <div className="max-w-4xl mx-auto px-5 sm:px-6 mb-16">
            <div className="relative h-[420px] md:h-[460px] rounded-[28px] overflow-hidden border border-black/10 dark:border-white/[0.08] shadow-xl shadow-blue-500/5 bg-white dark:bg-[#111111]">
              <Image
                src={heroImage}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* ARTICLE BODY */}
        <div className="max-w-6xl mx-auto px-5 sm:px-6 pb-28">
          <div className="rounded-[28px] border border-black/10 dark:border-white/[0.08] bg-white dark:bg-[#111111] p-8 md:p-10 shadow-xl shadow-blue-500/5">
            <RenderEditorContent
              content={blog.content}
              skipFirstImage={skipFirstBodyImage}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-black/10 dark:border-white/[0.08] py-16 text-center text-slate-400 dark:text-[#9CA3AF] font-mono text-xs uppercase tracking-[0.22em]">
          Thanks for reading
        </div>
      </div>

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        title={blog.title}
      />
    </article>
  );
}

/* ---------- UTIL ---------- */
function calculateReadingTime(blog: any) {
  const textBlocks =
    blog.content?.blocks?.filter((b: any) => b.type === "paragraph") || [];
  const totalWords = textBlocks
    .map((b: any) => b.data.text.replace(/<[^>]*>/g, ""))
    .join(" ")
    .split(" ").length;
  return Math.max(1, Math.ceil(totalWords / 200));
}
