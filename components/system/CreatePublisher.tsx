"use client";

import { useEffect, useState } from "react";
import { X, Copy, Check } from "lucide-react";
import { createPublisherUser, registerUser } from "@/firebase/config";

export default function CreatePublisherModal({
  open,
  onClose,
  onCreated,
}: any) {
  /* ---------- state ---------- */

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState("");

  /* ---------- auto email from name ---------- */

  useEffect(() => {
    if (!name) {
      setEmail("");
      return;
    }

    const username = name
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9]/g, "");

    setEmail(`${username}@ahmadbasit.com`);
  }, [name]);

  /* ---------- generate password ---------- */

  const generatePassword = () => {
    const pass = Math.random().toString(36).slice(-10);
    setPassword(pass);
  };

  /* ---------- copy helper ---------- */

  const copy = async (value: string, field: string) => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 1500);
  };

  /* ---------- create user ---------- */

  const createPublisher = async () => {
    if (!name || !email || !password) return;

    try {
      setLoading(true);

      await createPublisherUser({
        name,
        email,
        password,
        role: "publisher",
      });

      onCreated({ name, email, password });

      setName("");
      setPassword("");
      onClose();
    } catch (err) {
      console.log(err);
      alert("Failed to create publisher");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- RETURN AFTER HOOKS ---------- */

  if (!open) return null;

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
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Create Publisher
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition"
          >
            <X />
          </button>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <input
            placeholder="Publisher name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 outline-none focus:border-emerald-400 transition"
          />

          {/* Email */}
          <div className="flex gap-2">
            <input
              value={email}
              readOnly
              placeholder="Auto email"
              className="flex-1 bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-600 dark:text-white/70 placeholder:text-gray-400 dark:placeholder:text-white/30 outline-none"
            />

            <button
              onClick={() => copy(email, "email")}
              className="px-3 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 text-gray-700 dark:text-white/70 rounded-xl transition"
            >
              {copiedField === "email" ? <Check /> : <Copy />}
            </button>
          </div>

          {/* Password */}
          <div className="flex gap-2">
            <input
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 outline-none focus:border-emerald-400 transition"
            />

            <button
              onClick={generatePassword}
              className="px-3 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 text-gray-700 dark:text-white/70 rounded-xl transition"
            >
              Generate
            </button>

            <button
              onClick={() => copy(password, "password")}
              className="px-3 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 text-gray-700 dark:text-white/70 rounded-xl transition"
            >
              {copiedField === "password" ? <Check /> : <Copy />}
            </button>
          </div>

          {/* Create */}
          <button
            onClick={createPublisher}
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-black py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Creating..." : "Create Publisher"}
          </button>
        </div>
      </div>
    </div>
  );
}
