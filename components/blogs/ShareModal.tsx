"use client";

import { useState } from "react";
import {
  X,
  Copy,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
} from "lucide-react";

export default function ShareModal({
  open,
  onClose,
  title,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const url = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const socialLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#111111] border border-black/10 dark:border-white/[0.08] rounded-3xl p-8 shadow-xl shadow-blue-500/5">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-blue-600 dark:text-blue-300">
              Share
            </p>
            <h2 className="mt-1 font-heading text-lg font-medium text-slate-900 dark:text-white">
              Share Article
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:text-[#9CA3AF] dark:hover:text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Copy Link */}
        <div className="mb-7">
          <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-[#9CA3AF]">
            Copy Link
          </label>
          <div className="flex gap-2 mt-2">
            <input
              value={url}
              readOnly
              className="flex-1 bg-slate-50 dark:bg-white/[0.04] border border-black/10 dark:border-white/[0.08] rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-[#9CA3AF] outline-none"
            />
            <button
              onClick={copyLink}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition text-sm"
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        {/* Social Share */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-[#9CA3AF] mb-4">
            Share on Social
          </p>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-black/10 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.04] hover:border-blue-500/60 dark:hover:border-blue-500/40 transition text-slate-700 dark:text-[#D1D5DB] text-sm font-medium"
            >
              <MessageCircle size={16} className="text-blue-500 dark:text-blue-300" />
              WhatsApp
            </a>
            <a
              href={socialLinks.facebook}
              target="_blank"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-black/10 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.04] hover:border-blue-500/60 dark:hover:border-blue-500/40 transition text-slate-700 dark:text-[#D1D5DB] text-sm font-medium"
            >
              <Facebook size={16} className="text-blue-600 dark:text-blue-400" />
              Facebook
            </a>
            <a
              href={socialLinks.twitter}
              target="_blank"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-black/10 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.04] hover:border-blue-500/60 dark:hover:border-blue-500/40 transition text-slate-700 dark:text-[#D1D5DB] text-sm font-medium"
            >
              <Twitter size={16} className="text-slate-700 dark:text-[#D1D5DB]" />
              Twitter
            </a>
          <a  
              href={socialLinks.linkedin}
              target="_blank"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-black/10 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.04] hover:border-blue-500/60 dark:hover:border-blue-500/40 transition text-slate-700 dark:text-[#D1D5DB] text-sm font-medium"
            >
              <Linkedin size={16} className="text-blue-600 dark:text-blue-400" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}