"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="relative rounded-[18px] border border-black/10 dark:border-white/[0.08] overflow-hidden bg-slate-50 dark:bg-[#111111] shadow-xl shadow-blue-500/5 group">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-black/10 dark:border-white/[0.08] bg-white dark:bg-white/[0.04]">
        {/* Window dots */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <div className="w-3 h-3 rounded-full bg-blue-400/80" />
        </div>

        {/* Copy Button */}
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-[#9CA3AF] hover:border-blue-500/60 hover:text-blue-600 dark:hover:border-blue-500/40 dark:hover:text-blue-300 transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          {copied ? (
            <>
              <Check size={13} className="text-blue-600 dark:text-blue-300" />
              Copied
            </>
          ) : (
            <>
              <Copy size={13} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code Block */}
      <pre className="p-6 overflow-x-auto text-sm leading-relaxed">
        <code className="text-slate-800 dark:text-[#D1D5DB] whitespace-pre-wrap font-mono">
          {code}
        </code>
      </pre>
    </div>
  );
}