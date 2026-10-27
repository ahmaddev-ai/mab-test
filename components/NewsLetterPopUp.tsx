// components/NewsletterPopup.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; // swap for your actual toast import if different
import { trackMetaEvent } from "@/lib/meta-tracking";

const STORAGE_KEY = "newsletter_popup_dismissed";
const SHOW_DELAY_MS = 1000;

const EMPTY_FORM = { name: "", phone: "", email: "", message: "" };

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // const dismissed = sessionStorage.getItem(STORAGE_KEY);
    // if (dismissed) return;

    const timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      nameInputRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, phone, email, message } = formData;
    if (!name.trim() || !email.trim()) {
      toast.error("Name and email are required.");
      return;
    }

    const body = {
      projectName: process.env.NEXT_PUBLIC_PROJECT_NAME,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      to: "ahmadhasandevai@gmail.com",
      subject: `Newsletter Signup — ${name}`,
      htmlBody: `
        <div style="font-family: Arial; padding: 20px; background: #111; color: white;">
          <h2>Newsletter Signup</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Phone:</b> ${phone || "N/A"}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b> ${message || "N/A"}</p>
        </div>`,
    };

    try {
      setLoading(true);
      const res = await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URL + "/v1/project/sendEmail",
        body
      );
      console.log(res);
      trackMetaEvent("Lead", {
        content_name: "Newsletter subscription",
      });
      toast.success("🎉 Thanks — you're on the list!");
      setFormData(EMPTY_FORM);
      setTimeout(() => {
        close();
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-popup-title"
    >
      <div
        className="relative w-full max-w-md animate-[fadeUp_0.35s_ease-out] border border-black/10 bg-[#F8FAFC] p-8 shadow-2xl dark:border-white/10 dark:bg-[#0A0A0A]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Blueprint grid accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.06)_1px,transparent_1px)] bg-[size:28px_28px]"
        />

        {/* Corner brackets */}
        <span
          aria-hidden
          className="absolute -left-[1px] -top-[1px] h-6 w-6 border-l-2 border-t-2 border-blue-500/60 dark:border-blue-400/60"
        />
        <span
          aria-hidden
          className="absolute -right-[1px] -top-[1px] h-6 w-6 border-r-2 border-t-2 border-blue-500/60 dark:border-blue-400/60"
        />
        <span
          aria-hidden
          className="absolute -bottom-[1px] -left-[1px] h-6 w-6 border-b-2 border-l-2 border-blue-500/60 dark:border-blue-400/60"
        />
        <span
          aria-hidden
          className="absolute -bottom-[1px] -right-[1px] h-6 w-6 border-b-2 border-r-2 border-blue-500/60 dark:border-blue-400/60"
        />

        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M1 1L17 17M17 1L1 17"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="relative">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-blue-600 dark:text-blue-300">
            Stay Ahead
          </p>
          <h2
            id="newsletter-popup-title"
            className="mt-2 font-heading text-2xl font-medium leading-tight text-slate-900 dark:text-white"
          >
            Get insights on AI, Cloud & Blockchain.
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-[#9CA3AF]">
            Occasional updates, no spam. Drop your details and we'll reach out.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <input
              ref={nameInputRef}
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-black/10 bg-white/70 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-blue-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9+\-\s]{7,20}"
              className="w-full border border-black/10 bg-white/70 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-blue-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-black/10 bg-white/70 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-blue-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
            />
            <textarea
              name="message"
              placeholder="What are you interested in? (optional)"
              value={formData.message}
              onChange={handleChange}
              rows={2}
              className="w-full resize-none border border-black/10 bg-white/70 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-blue-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full bg-blue-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending…" : "Subscribe"}
            </button>
          </form>

          <button
            type="button"
            onClick={close}
            className="mt-3 w-full text-center font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
          >
            Maybe later
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          div :global(*) {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
