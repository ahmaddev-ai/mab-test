"use client";

import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

interface Publisher {
  id: string;
  name: string;
  email: string;
}

interface Props {
  publisher: Publisher | null;
  onClose: () => void;
  onUpdated: (id: string, name: string) => void;
}

export default function EditPublisherModal({
  publisher,
  onClose,
  onUpdated,
}: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (publisher) {
      setName(publisher.name);
      setError("");
    }
  }, [publisher]);

  if (!publisher) return null;

  const handleSave = async () => {
    const trimmed = name.trim();

    if (!trimmed) {
      return setError("Name is required.");
    }

    if (trimmed === publisher.name) {
      return onClose();
    }

    try {
      setLoading(true);
      setError("");

      await updateDoc(doc(db, "users", publisher.id), {
        name: trimmed,
      });

      onUpdated(publisher.id, trimmed);
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#0a0c12] border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Edit Publisher
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-gray-500 dark:text-white/50 text-xs block mb-1.5">
              Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              placeholder="Publisher name"
              className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 outline-none focus:border-emerald-500/60 transition"
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="text-gray-500 dark:text-white/50 text-xs block mb-1.5">
              Email{" "}
              <span className="text-gray-400 dark:text-white/25">
                (cannot be changed)
              </span>
            </label>

            <input
              value={publisher.email}
              readOnly
              className="w-full bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-gray-500 dark:text-white/40 outline-none cursor-not-allowed"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}

              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
