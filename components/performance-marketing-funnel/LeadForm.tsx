"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { trackMetaEvent } from "@/lib/meta-tracking";

const EMPTY_FORM = { name: "", email: "", organization: "", message: "" };

type LeadFormProps = {
  sourceTag?: string; // e.g. "SEO — Lahore" — omit for default cohort-page behavior
  redirectBackHref?: string;
  redirectBackLabel?: string;
};

export default function LeadForm({
  sourceTag,
  redirectBackHref = "/performance-marketing-mastery-program",
  redirectBackLabel = "Back to the program",
}: LeadFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const { name, email, organization, message } = formData;

  const getFormTitle = () =>
    sourceTag
      ? `${sourceTag} — Cohort Application`
      : "Performance Marketing Cohort Application";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      toast.error("Name and email are required.");
      return;
    }

    const body = {
      projectName: process.env.NEXT_PUBLIC_PROJECT_NAME,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      to: "ahmadhasandevai@gmail.com",
      subject: `${getFormTitle()} — ${name}`,
      htmlBody: `
        <div style="font-family: Arial; padding: 20px; background: #111; color: white;">
          <h2>${getFormTitle()} - Contact Form</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Organization:</b> ${organization || "N/A"}</p>
          <p><b>Message:</b> ${message || "N/A"}</p>
          ${sourceTag ? `<p><b>Source Page:</b> ${sourceTag}</p>` : ""}
        </div>`,
    };

    try {
      setLoading(true);
      await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URL + "/v1/project/sendEmail",
        body
      );
      trackMetaEvent("Lead", { content_name: getFormTitle(), content_category: "cohort_application" });
      toast.success("🎉 Your request has been sent successfully!");
      setFormData(EMPTY_FORM);
      router.push(
        "/thank-you?" +
          new URLSearchParams({
            title: "Your application is in.",
            message:
              "Thanks for applying. The team will follow up by email with the curriculum PDF and next cohort dates.",
            backHref: redirectBackHref,
            backLabel: redirectBackLabel,
          }).toString()
      );
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 max-w-2xl rounded-[28px] border border-black/10 bg-white p-8 shadow-xl shadow-blue-500/5 dark:border-white/[0.08] dark:bg-white/[0.04]"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-900 dark:text-white">
            Name
          </label>
          <input
            name="name"
            value={name}
            onChange={handleChange}
            required
            placeholder="Your full name"
            className="mt-2 w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-white/[0.1] dark:text-white"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-900 dark:text-white">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            placeholder="you@email.com"
            className="mt-2 w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-white/[0.1] dark:text-white"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-slate-900 dark:text-white">
            Organization (optional)
          </label>
          <input
            name="organization"
            value={organization}
            onChange={handleChange}
            placeholder="Company or university"
            className="mt-2 w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-white/[0.1] dark:text-white"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-slate-900 dark:text-white">
            What do you want to start with?
          </label>
          <textarea
            name="message"
            value={message}
            onChange={handleChange}
            rows={4}
            placeholder="Paid ads, SEO/YouTube, freelancing, AI automation…"
            className="mt-2 w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-white/[0.1] dark:text-white"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:opacity-60"
      >
        {loading ? "Sending…" : "Apply for Performance Cohort"}
      </button>
    </form>
  );
}
