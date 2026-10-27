"use client";

import React, { useEffect, useMemo, useState } from "react";

export type ThemeMode = "system" | "light" | "dark";

const STORAGE_KEY = "theme-mode";

function getPreferredTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
    ? "dark"
    : "light";
}

function normalizeMode(v: unknown): ThemeMode {
  if (v === "light" || v === "dark" || v === "system") return v;
  return "system";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("system");

  // Keep a stable value so other components can read it (via prop drilling if needed later)
  const appliedTheme = useMemo(() => {
    return mode === "system" ? getPreferredTheme() : mode;
  }, [mode]);

  useEffect(() => {
    // Read user preference
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      setMode(normalizeMode(stored));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    // Apply class to <html>
    const html = document.documentElement;
    if (appliedTheme === "dark") html.classList.add("dark");
    else html.classList.remove("dark");

    // Also set browser theme-color hint for some browsers
    // (Tailwind/CSS handles visuals; this is just a tiny extra.)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute(
        "content",
        appliedTheme === "dark" ? "#0a0a0a" : "#F8FAFC"
      );
  }, [appliedTheme]);

  useEffect(() => {
    // React to system changes when user uses "system"
    if (mode !== "system") return;
    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!media) return;

    const handler = () => {
      const html = document.documentElement;
      if (media.matches) html.classList.add("dark");
      else html.classList.remove("dark");
    };

    media.addEventListener?.("change", handler);
    return () => media.removeEventListener?.("change", handler);
  }, [mode]);

  return (
    <ThemeModeContext.Provider
      value={{
        mode,
        appliedTheme,
        setMode,
      }}
    >
      {children}
    </ThemeModeContext.Provider>
  );
}

// Simple context (no external deps)
export type ThemeModeContextValue = {
  mode: ThemeMode;
  appliedTheme: "light" | "dark";
  setMode: React.Dispatch<React.SetStateAction<ThemeMode>>;
};

const ThemeModeContext = React.createContext<ThemeModeContextValue>({
  mode: "system",
  appliedTheme: "dark",
  setMode: () => {},
});

export function useThemeMode() {
  const ctx = React.useContext(ThemeModeContext);
  if (!ctx) {
    throw new Error("useThemeMode must be used within ThemeProvider");
  }
  return ctx;
}

// Small helper to persist changes.
export function persistThemeMode(mode: ThemeMode) {
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // ignore
  }
}
