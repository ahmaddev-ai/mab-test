"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useAuth } from "@/context/Auth";
import { BookOpen, UserRound, LogOut, Loader2 } from "lucide-react";
import { useState } from "react";

export default function ReadingNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    setLoggingOut(true);
    setError("");

    try {
      await signOut(auth);
      router.replace("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Unable to sign out. Please try again.");
      setLoggingOut(false);
    }
  }

  const isProfilePage = pathname === "/profile";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/mab" className="flex items-center gap-3">
          <span className="rounded-xl bg-indigo-600 p-2.5 text-white">
            <BookOpen className="h-6 w-6" />
          </span>

          <span>
            <span className="block text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              E-MAB
            </span>
            <span className="hidden text-xs text-slate-500 sm:block">
              Your digital library
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
              !isProfilePage
                ? "bg-indigo-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
            }`}
          >
            Go to Site
          </Link>
          <Link
            href="/mab"
            className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
              !isProfilePage
                ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
            }`}
          >
            Books
          </Link>

          <Link
            href="/mab/profile"
            aria-label="My profile"
            title="My profile"
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
              isProfilePage
                ? "bg-indigo-600 text-white"
                : "border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
            }`}
          >
            <UserRound className="h-5 w-5" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            title="Sign out"
            aria-label="Sign out"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
          >
            {loggingOut ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <LogOut className="h-5 w-5" />
            )}
          </button>
        </nav>
      </div>

      {error && (
        <div
          role="alert"
          className="border-t border-red-200 bg-red-50 px-4 py-2 text-center text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
        >
          {error}
        </div>
      )}
    </header>
  );
}
