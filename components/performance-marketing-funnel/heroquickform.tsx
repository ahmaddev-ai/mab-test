"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { trackMetaEvent } from "@/lib/meta-tracking";

type HeroQuickFormProps = {
  sourceTag?: string; // e.g. "Meta Ads — Karachi"
  redirectBackHref?: string;
  redirectBackLabel?: string;
};

export default function HeroQuickForm({
  sourceTag,
  redirectBackHref = "/performance-marketing-mastery-program",
  redirectBackLabel = "Back to the program",
}: HeroQuickFormProps) {
  const router = useRouter();
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);

  const getFormTitle = () =>
    sourceTag
      ? `${sourceTag} — WhatsApp Callback`
      : "Hero Quick Interest — WhatsApp Callback";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!whatsapp.trim()) {
      toast.error("Enter your WhatsApp number.");
      return;
    }

    const body = {
      projectName: process.env.NEXT_PUBLIC_PROJECT_NAME,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      to: "ahmadhasandevai@gmail.com",
      subject: `${getFormTitle()} — ${whatsapp}`,
      htmlBody: `
        <div style="font-family: Arial; padding: 20px; background: #111; color: white;">
          <h2>${getFormTitle()}</h2>
          <p><b>WhatsApp Number:</b> ${whatsapp}</p>
          <p><b>Source:</b> ${
            sourceTag ?? "Performance Marketing Mastery — Hero Quick Form"
          }</p>
        </div>`,
    };

    try {
      setLoading(true);
      await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URL + "/v1/project/sendEmail",
        body
      );
      trackMetaEvent("Lead", { content_name: getFormTitle(), content_category: "whatsapp_callback" });
      toast.success("🎉 Got it — we'll reach out on WhatsApp shortly!");
      setWhatsapp("");
      router.push(
        "/thank-you?" +
          new URLSearchParams({
            title: "We've got your number.",
            message:
              "Someone from the team will message you on WhatsApp shortly with cohort dates and the curriculum PDF.",
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
    <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-xl shadow-blue-500/5 dark:border-white/[0.08] dark:bg-white/[0.04] sm:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-blue-600 dark:text-blue-300">
        Before you scroll
      </p>
      <h3 className="mt-2 font-heading text-xl font-medium text-slate-900 dark:text-white">
        Most people who see the curriculum don&apos;t finish reading it.
      </h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Drop your WhatsApp number and we&apos;ll send you the seat count for the
        next cohort — before it fills up.
      </p>

      <form onSubmit={handleSubmit} className="mt-6">
        <label className="text-sm font-medium text-slate-900 dark:text-white">
          WhatsApp Number
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            required
            placeholder="+92 3XX XXXXXXX"
            className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-white/[0.1] dark:text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:opacity-60"
          >
            {loading ? "Sending…" : "Notify Me"}
            {!loading && <ArrowRight size={15} />}
          </button>
        </div>
      </form>
    </div>
  );
}
