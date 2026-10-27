"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  X,
  Clock,
  BarChart2,
  Tag,
  BookOpen,
  List,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
} from "lucide-react";
import { COURSEDATA } from "@/data/data";

interface Props {
  courseKey: keyof typeof COURSEDATA;
}

export default function CourseDetail({ courseKey }: Props) {
  const data = COURSEDATA[courseKey];
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section className="bg-[#05060a] text-white">
      {/* ================= HERO ================= */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-400/10 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-20 py-28 grid md:grid-cols-2 gap-14 items-center">
          {/* LEFT */}
          <div className="flex flex-col gap-6">
            {/* BADGES */}
            <div className="flex flex-wrap gap-3">
              {[data.level, data.format, data.language].map((badge, i) => (
                <span
                  key={i}
                  className="px-4 py-1 rounded-full text-sm bg-white/5 border border-white/10"
                >
                  {badge}
                </span>
              ))}
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-emerald-400">
              {data.title}
            </h1>

            <p className="text-white/70 text-lg max-w-xl">{data.shortDesc}</p>

            {/* STATS */}
            <div className="flex flex-wrap gap-4 mt-4">
              <Stat icon={Clock} label="Duration" value={data.duration} />
              <Stat icon={BarChart2} label="Level" value={data.level} />
             
            </div>

            {/* CTA */}
            <button
              onClick={() => setShowForm(true)}
              className="mt-8 w-fit flex items-center gap-3 px-8 py-4 rounded-full bg-emerald-400 text-black font-bold hover:bg-emerald-300 transition shadow-lg"
            >
              Enroll Now <ArrowRight />
            </button>

            {/* TRUST */}
            <div className="flex items-center gap-2 text-sm text-white/50 mt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Secure enrollment • No spam
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative h-[320px] rounded-3xl overflow-hidden border border-white/10">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-fit scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </div>
      </div>

      {/* ================= CURRICULUM ================= */}
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-24 grid md:grid-cols-4 gap-10">
        {/* TOC */}
        <aside className="hidden md:block sticky top-24">
          <h3 className="text-xl font-bold text-emerald-400 mb-6 flex gap-2 items-center">
            <List /> Contents
          </h3>
          <ul className="space-y-3 text-white/70 text-sm">
            {data.curriculum.map((item, i) => (
              <li
                key={i}
                onClick={() => setExpandedModule(i)}
                className={`cursor-pointer transition ${
                  expandedModule === i
                    ? "text-emerald-400 font-semibold"
                    : "hover:text-emerald-400"
                }`}
              >
                {i + 1}. {item.title.slice(0, 40)}
              </li>
            ))}
          </ul>
        </aside>

        {/* MODULES */}
        <div className="md:col-span-3 space-y-4">
          {data.curriculum.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-[#0a0c12] border border-white/10 transition hover:border-emerald-400/30"
            >
              <button
                onClick={() =>
                  setExpandedModule(expandedModule === i ? null : i)
                }
                className="w-full flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <span className="text-emerald-400 font-bold">{i + 1}</span>
                  <span className="font-semibold text-lg text-white/90">
                    {item.title}
                  </span>
                </div>
                {expandedModule === i ? (
                  <ChevronUp className="text-emerald-400" />
                ) : (
                  <ChevronDown className="text-emerald-400" />
                )}
              </button>

              {expandedModule === i && (
                <ul className="mt-4 pl-10 space-y-2 text-white/70 animate-[fadeIn_0.3s_ease]">
                  {item.points.map((p, idx) => (
                    <li key={idx} className="list-disc">
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* MID CTA */}
          <div className="pt-10">
            <button
              onClick={() => setShowForm(true)}
              className="w-full md:w-fit px-10 py-4 rounded-full bg-emerald-400 text-black font-bold hover:bg-emerald-300 transition"
            >
              Start Learning Today
            </button>
          </div>
        </div>
      </div>

      {/* ================= DETAILS ================= */}
      <div className="max-w-7xl mx-auto px-6 md:px-20 pb-24">
        <h2 className="text-3xl font-bold text-emerald-400 mb-8">
          Course Details
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Detail icon={Clock} label="Duration" value={data.duration} />
          <Detail icon={BarChart2} label="Level" value={data.level} />
          <Detail icon={BookOpen} label="Format" value={data.format} />
          <Detail icon={Tag} label="Language" value={data.language} />
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
          <div className="relative bg-[#0a0c12] w-full max-w-md rounded-3xl p-8 border border-white/10">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-emerald-400"
            >
              <X />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-2xl font-bold text-center text-emerald-400">
                  Enroll Now
                </h3>

                <input
                  required
                  placeholder="Your Name"
                  className="w-full h-14 px-5 rounded-xl bg-[#05060a] border border-white/20 focus:ring-2 focus:ring-emerald-400"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  required
                  type="email"
                  placeholder="Your Email"
                  className="w-full h-14 px-5 rounded-xl bg-[#05060a] border border-white/20 focus:ring-2 focus:ring-emerald-400"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />

                <button className="w-full py-3 rounded-full bg-emerald-400 text-black font-bold hover:bg-emerald-300 transition">
                  {loading ? "Submitting..." : "Confirm Enrollment"}
                </button>

                <p className="text-xs text-center text-white/50">
                  We respect your privacy. No spam.
                </p>
              </form>
            ) : (
              <div className="text-center text-emerald-400 font-bold text-lg py-10">
                Enrollment successful 🎉
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

/* ================= HELPERS ================= */

function Stat({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#0a0c12] border border-white/10">
      <Icon className="text-emerald-400 w-5 h-5" />
      <div className="text-sm">
        <p className="text-white/50">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

function Detail({ icon: Icon, label, value }: any) {
  return (
    <div className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-[#0a0c12] border border-white/10">
      <Icon className="text-emerald-400 w-6 h-6" />
      <p className="text-white/50 text-sm">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
}
