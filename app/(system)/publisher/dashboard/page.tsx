"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/Auth";
import { db } from "@/firebase/config";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

import { FileText, Loader2, CheckCircle, Clock, RefreshCw } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  status: string;
  createdAt?: any;
}

export default function PublisherDashboard() {
  const { user } = useAuth();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false); // 👈 important

  /* ---------------- FETCH FUNCTION ---------------- */

  const fetchBlogs = async () => {
    if (!user?.uid) return;

    try {
      setLoading(true);

      const q = query(
        collection(db, "blogs"),
        where("authorId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const snap = await getDocs(q);

      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Blog[];

      setBlogs(data);
      setHasLoaded(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- FIRST TIME LOAD ONLY ---------------- */

  useEffect(() => {
    if (user && !hasLoaded) {
      fetchBlogs();
    }
  }, [user, hasLoaded]);

  /* ---------------- STATS ---------------- */

  const totalBlogs = blogs.length;
  const publishedBlogs = blogs.filter((b) => b.status === "published").length;
  const draftBlogs = blogs.filter((b) => b.status === "draft").length;

  /* ---------------- UI ---------------- */

  return (
    <section className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-10 mt-2">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Publisher Dashboard
          </h1>

          <p className="text-gray-500 dark:text-white/50 text-sm mt-1">
            Overview of your blog activity
          </p>
        </div>

        {/* Refresh Button */}
        <button
          onClick={fetchBlogs}
          disabled={loading}
          className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 px-4 py-2 rounded-xl transition text-gray-700 dark:text-white/80 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <RefreshCw size={16} />
          )}
          Refresh
        </button>
      </div>

      {/* LOADING STATE */}
      {!hasLoaded && loading && (
        <div className="flex items-center justify-center py-32 text-gray-500 dark:text-white/50">
          <Loader2 className="animate-spin mr-3" />
          Loading dashboard...
        </div>
      )}

      {/* CONTENT */}
      {hasLoaded && (
        <>
          {/* ================= STATS ================= */}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              title="Total Blogs"
              value={totalBlogs}
              icon={<FileText />}
            />

            <StatCard
              title="Published"
              value={publishedBlogs}
              icon={<CheckCircle />}
            />

            <StatCard title="Drafts" value={draftBlogs} icon={<Clock />} />
          </div>

          {/* ================= RECENT BLOGS ================= */}

          <div className="bg-white dark:bg-[#0a0c12] border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm dark:shadow-none">
            <div className="p-6 border-b border-gray-200 dark:border-white/10">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Blogs
              </h2>
            </div>

            {blogs.length === 0 ? (
              <div className="p-12 text-center text-gray-500 dark:text-white/50">
                No blogs created yet
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-white/5">
                {blogs.slice(0, 5).map((blog) => (
                  <div
                    key={blog.id}
                    className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition"
                  >
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {blog.title}
                      </p>

                      <p className="text-gray-500 dark:text-white/40 text-sm mt-1">
                        {blog.createdAt?.seconds
                          ? new Date(
                              blog.createdAt.seconds * 1000
                            ).toDateString()
                          : ""}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        blog.status === "published"
                          ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                          : "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

/* ================= STAT CARD ================= */

import type { ReactNode } from "react";

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-[#0a0c12] border border-slate-200 dark:border-white/10 rounded-3xl p-6 flex items-center justify-between hover:border-emerald-500/40 transition">
      <div>
        <p className="text-slate-500 dark:text-white/50 text-sm">{title}</p>

        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
          {value}
        </h3>
      </div>

      <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
        {icon}
      </div>
    </div>
  );
}
