"use client";

import { X, Copy } from "lucide-react";

export default function CredentialsModal({ data, onClose }: any) {
  if (!data) return null;

  const copy = (v: string) => navigator.clipboard.writeText(v);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#0a0c12] border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="flex justify-between mb-6">
          <h2 className="font-semibold text-gray-900 dark:text-white">
            Publisher Created
          </h2>

          <button
            onClick={onClose}
            className="cursor-pointer text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition"
          >
            <X />
          </button>
        </div>

        <div className="space-y-4">
          {/* Email */}
          <div className="flex justify-between items-center gap-3 bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/5 p-3 rounded-xl">
            <span className="text-gray-700 dark:text-white/80 break-all">
              {data.email}
            </span>

            <button
              onClick={() => copy(data.email)}
              className="shrink-0 text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition"
            >
              <Copy size={18} />
            </button>
          </div>

          {/* Password */}
          <div className="flex justify-between items-center gap-3 bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/5 p-3 rounded-xl">
            <span className="text-gray-700 dark:text-white/80 break-all">
              {data.password}
            </span>

            <button
              onClick={() => copy(data.password)}
              className="shrink-0 text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition"
            >
              <Copy size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
