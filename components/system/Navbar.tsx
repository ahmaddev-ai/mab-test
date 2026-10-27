"use client";

import { Menu, LogOut, Moon, Sun } from "lucide-react";
import { logoutUser } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type NavbarProps = {
  title: string;
  loginUrl: string;
  toggleSidebar: () => void;
};

export default function Navbar({
  title,
  loginUrl,
  toggleSidebar,
}: NavbarProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const handleLogout = async () => {
    if (loading) return;

    try {
      setLoading(true);
      await logoutUser();
      router.replace(loginUrl);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    const html = document.documentElement;
    const nextDark = !html.classList.contains("dark");

    html.classList.toggle("dark", nextDark);
    html.style.colorScheme = nextDark ? "dark" : "light";

    window.localStorage.setItem("theme-mode", nextDark ? "dark" : "light");

    setIsDark(nextDark);
  };

  return (
    <header className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/85 px-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0c12]/80 md:px-6">
      <div className="flex items-center gap-3 md:gap-4">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-200/70 dark:text-white dark:hover:bg-white/10"
        >
          <Menu size={22} />
        </button>

        <h1 className="text-base font-bold text-emerald-500 md:text-lg">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={isDark ? "Light mode" : "Dark mode"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:border-emerald-500/40 dark:border-white/10 dark:text-white/70"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-600 transition hover:bg-slate-200/70 hover:text-red-500 disabled:opacity-50 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-red-400 md:px-4"
        >
          <LogOut size={18} />
          <span className="hidden sm:block">
            {loading ? "Logging out..." : "Logout"}
          </span>
        </button>
      </div>
    </header>
  );
}
