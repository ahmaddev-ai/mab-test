"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import {
  collection,
  getCountFromServer,
  doc,
  getDoc,
} from "firebase/firestore";

import { FileText, Users, Activity, BarChart3, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalPublishers: 0,
    totalUsers: 0,
    totalPublishedBlogs: 0,
  });

  /* ---------------- FETCH ANALYTICS ---------------- */

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const globalSnap = await getDoc(doc(db, "analytics", "global"));
        const globalData = globalSnap.data();

        setStats({
          totalBlogs: globalData?.totalBlogs || 0,
          totalPublishers: globalData?.totalPublishers || 0,
          totalUsers: globalData?.totalUsers || 0,
          totalPublishedBlogs: globalData?.totalPublishedBlogs || 0,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  /* ---------------- LOADING UI ---------------- */

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-white/50">
        <Loader2 className="animate-spin mr-3" />
        Loading analytics...
      </div>
    );
  }

  return (
    <section className="p-8 max-w-7xl mx-auto space-y-10 mt-2">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Dashboard
        </h1>
        <p className="text-black dark:text-white">
          Overview of platform performance and analytics
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Blogs"
          value={stats.totalBlogs}
          icon={FileText}
        />

        <StatCard
          title="Published Blogs"
          value={stats.totalPublishedBlogs}
          icon={BarChart3}
        />

        <StatCard
          title="Publishers"
          value={stats.totalPublishers}
          icon={Users}
        />

        <StatCard title="Platform Activity" value="Active" icon={Activity} />
      </div>

      {/* QUICK OVERVIEW PANEL */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Growth Panel */}
        <div className="bg-white dark:bg-[#0a0c12] border border-slate-200 dark:border-white/10 rounded-3xl p-8">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Platform Growth
          </h2>

          <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed">
            Track user engagement, publishing trends, and platform performance.
            Connect charts here later using Recharts.
          </p>

          <div className="mt-6 h-48 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-white/30">
            Chart Area
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-[#0a0c12] border border-slate-200 dark:border-white/10 rounded-3xl p-8">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Recent Activity
          </h2>

          <div className="space-y-4 text-sm text-slate-600 dark:text-white/60">
            <p>• New blog published</p>
            <p>• New publisher registered</p>
            <p>• System running normally</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- STAT CARD ---------------- */
function StatCard({ title, value, icon: Icon }: any) {
  return (
    <div className="bg-white dark:bg-[#0a0c12] border border-slate-200 dark:border-white/10 rounded-3xl p-6 flex items-center justify-between hover:border-emerald-500/40 transition">
      <div>
        <p className="text-slate-500 dark:text-white/50 text-sm">{title}</p>
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
          {value}
        </h3>
      </div>

      <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
        <Icon size={22} />
      </div>
    </div>
  );
}
