"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BadgePercent, Loader2, Send, X } from "lucide-react";
import type { Enrollment, Offer } from "./types";
import { trackMetaEvent } from "@/lib/meta-tracking";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};
const EMPTY: FormState = { name: "", email: "", phone: "", message: "" };

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const fieldClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 text-base text-white placeholder:text-slate-500 transition-colors focus:border-indigo-400 focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-indigo-400/20 disabled:opacity-60";

export default function EnrollModal({
  open,
  onClose,
  enrollment,
  offer,
}: {
  open: boolean;
  onClose: () => void;
  enrollment: Enrollment;
  offer?: Offer;
}) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);

  const offerActive = !!offer?.enabled && Date.parse(offer.endsAt) > Date.now();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    nameRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, loading, onClose]);

  if (!open) return null;

  const set = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();

    if (!name || !email || !form.phone.trim()) {
      toast.error("Please fill in your name, email and phone");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Everything the user typed is escaped before it goes into the email HTML.
    const offerLine =
      offerActive && offer
        ? `<p><b>Offer:</b> ${offer.discountPercent}% off (code ${escapeHtml(
            offer.code
          )})</p>`
        : "";

    const body = {
      projectName: process.env.NEXT_PUBLIC_PROJECT_NAME,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      to: enrollment.recipient,
      subject: `${enrollment.formTitle} - ${name}`,
      htmlBody: `
        <div style="font-family: Arial; padding: 20px; background: #111; color: white;">
          <h2>${escapeHtml(enrollment.formTitle)} - Contact Form</h2>
          <p><b>Name:</b> ${escapeHtml(name)}</p>
          <p><b>Email:</b> ${escapeHtml(email)}</p>
          <p><b>Phone:</b> ${escapeHtml(form.phone.trim() || "N/A")}</p>
          <p><b>Message:</b> ${escapeHtml(form.message.trim() || "N/A")}</p>
          ${offerLine}
        </div>
      `,
    };

    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/project/sendEmail`,
        body
      );

      trackMetaEvent("Lead", {
        content_name: "Contact Form",
      });
      router.push(
        `${enrollment.thankYouPath}?title=${encodeURIComponent(
          enrollment.thankYouTitle
        )}&message=${encodeURIComponent(enrollment.thankYouMessage)}`
      );
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {loading ? (
        <div
          role="status"
          className="fixed inset-0 z-[10001] flex flex-col items-center justify-center bg-[#060714]"
        >
          <Loader2
            className="h-10 w-10 animate-spin text-indigo-300"
            aria-hidden="true"
          />
          <p className="mt-5 text-sm font-medium text-white">
            Submitting your enrollment...
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Please wait while we process your request.
          </p>
        </div>
      ) : null}

      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div
          onClick={() => !loading && onClose()}
          className="absolute inset-0 bg-[#060714]/80 backdrop-blur-md"
          aria-hidden="true"
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="enroll-title"
          className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-[28px] bg-gradient-to-b from-white/30 via-white/10 to-white/5 p-px shadow-[0_40px_100px_-30px_rgba(99,102,241,0.6)]"
        >
          <div className="relative overflow-hidden rounded-[27px] bg-[#0A0C1F] p-6 sm:p-8">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-indigo-500/30 blur-[80px]"
              aria-hidden="true"
            />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-indigo-300">
                  {enrollment.eyebrow}
                </p>
                <h3
                  id="enroll-title"
                  className="mt-1.5 text-2xl font-extrabold text-white"
                >
                  {enrollment.heading}
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  {enrollment.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => !loading && onClose()}
                aria-label="Close enrollment form"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-slate-300 transition-colors hover:bg-white hover:text-[#060714] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {offerActive && offer ? (
              <p className="relative mt-5 flex items-center gap-2.5 rounded-xl border border-indigo-400/30 bg-indigo-400/10 px-4 py-3 text-sm font-medium text-indigo-100">
                <BadgePercent className="h-5 w-5 shrink-0" aria-hidden="true" />
                {offer.discountPercent}% off applied to your request (code{" "}
                {offer.code})
              </p>
            ) : null}

            <form className="relative mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="enroll-name"
                  className="mb-1.5 block text-sm font-semibold text-slate-200"
                >
                  Full name
                </label>
                <input
                  ref={nameRef}
                  id="enroll-name"
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                  value={form.name}
                  disabled={loading}
                  onChange={(e) => set("name", e.target.value)}
                  className={fieldClass}
                  style={{ height: "3.25rem" }}
                />
              </div>
              <div>
                <label
                  htmlFor="enroll-email"
                  className="mb-1.5 block text-sm font-semibold text-slate-200"
                >
                  Email address
                </label>
                <input
                  id="enroll-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  disabled={loading}
                  onChange={(e) => set("email", e.target.value)}
                  className={fieldClass}
                  style={{ height: "3.25rem" }}
                />
              </div>
              <div>
                <label
                  htmlFor="enroll-number"
                  className="mb-1.5 block text-sm font-semibold text-slate-200"
                >
                  Phone{" "}
                </label>
                <input
                  id="enroll-number"
                  autoComplete="phone"
                  placeholder="Phone"
                  value={form.phone}
                  disabled={loading}
                  onChange={(e) => set("phone", e.target.value)}
                  className={fieldClass}
                  style={{ height: "3.25rem" }}
                />
              </div>
              <div>
                <label
                  htmlFor="enroll-message"
                  className="mb-1.5 block text-sm font-semibold text-slate-200"
                >
                  Message{" "}
                  <span className="font-normal text-slate-500">(optional)</span>
                </label>
                <textarea
                  id="enroll-message"
                  rows={3}
                  placeholder="Anything we should know?"
                  value={form.message}
                  disabled={loading}
                  onChange={(e) => set("message", e.target.value)}
                  className="w-full resize-none rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-base text-white placeholder:text-slate-500 transition-colors focus:border-indigo-400 focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-indigo-400/20 disabled:opacity-60"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-xl bg-white text-base font-bold text-[#060714] shadow-[0_10px_40px_-8px_rgba(129,140,248,0.7)] transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0C1F] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2
                      className="h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Submit enrollment
                  </>
                )}
              </button>
              <p className="text-center text-xs text-slate-500">
                Your information is kept confidential.
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
