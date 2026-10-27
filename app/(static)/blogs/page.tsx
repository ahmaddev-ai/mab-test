"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(data);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0A0A] relative overflow-hidden">
      {/* Subtle radial bg — same as home page */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.08),transparent_40%)]" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 pt-28 pb-16">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-blue-600 dark:text-blue-300">
            Section / Blog
          </p>
          <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-medium tracking-[-1px] text-slate-900 dark:text-white">
            Latest Articles.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-[#9CA3AF]">
            Insights, tutorials, and ideas from AI, blockchain, cloud and
            technology entrepreneurship.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 pb-24">
        {/* Loading Skeleton */}
        {loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-[28px] border border-black/10 dark:border-white/[0.08] bg-white dark:bg-[#111111] h-[320px]"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && blogs.length === 0 && (
          <div className="text-center text-slate-500 dark:text-[#9CA3AF] py-20 font-mono text-sm uppercase tracking-[0.2em]">
            No articles published yet
          </div>
        )}

        {/* Blog Grid */}
        {!loading && blogs.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => {
              const slug = slugify(blog.title);
              return (
                <Link
                  key={blog.id}
                  href={`/blogs/${slug}`}
                  className="group overflow-hidden rounded-[28px] border border-black/10 dark:border-white/[0.08] bg-white dark:bg-[#111111] shadow-xl shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/60 dark:hover:border-blue-500/40"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden border-b border-black/10 dark:border-white/[0.08]">
                    <Image
                      src={getBlogImage(blog)}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 dark:text-blue-300">
                      Article
                    </p>
                    <h2 className="mt-3 font-heading text-xl font-medium tracking-[-0.5px] line-clamp-2 text-slate-900 dark:text-white">
                      {blog.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-[#9CA3AF] line-clamp-3">
                      {getExcerpt(blog)}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-300">
                      Read Article
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function getBlogImage(blog: any) {
  const imageBlock = blog.featuredImage?.url;
  return (
    imageBlock || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  );
}

function getExcerpt(blog: any) {
  const textBlock = blog.content?.blocks?.find(
    (b: any) => b.type === "paragraph"
  );
  return (
    textBlock?.data?.text?.replace(/<[^>]*>/g, "") ||
    "No description available."
  );
}
