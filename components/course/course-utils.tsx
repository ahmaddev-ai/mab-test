"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  Bot,
  BookOpen,
  Boxes,
  Brain,
  Cloud,
  Code2,
  Cpu,
  Database,
  Fingerprint,
  Folder,
  Gauge,
  GitBranch,
  Image as ImageIcon,
  Layers,
  Lock,
  Mic,
  Network,
  Server,
  Shield,
  ShieldCheck,
  Sigma,
  Sparkles,
  Terminal,
  Type,
  Wand2,
  Zap,
  type LucideIcon,
} from "lucide-react";

/** String icon keys used inside the course JSON. */
export const ICONS: Record<string, LucideIcon> = {
  // highlights
  layers: Layers,
  book: BookOpen,
  shield: ShieldCheck,
  cpu: Cpu,
  cloud: Cloud,
  terminal: Terminal,
  // topic groups
  code: Code2,
  boxes: Boxes,
  sigma: Sigma,
  brain: Brain,
  type: Type,
  network: Network,
  wand: Wand2,
  gauge: Gauge,
  sparkles: Sparkles,
  gitbranch: GitBranch,
  image: ImageIcon,
  mic: Mic,
  fingerprint: Fingerprint,
  database: Database,
  bot: Bot,
  server: Server,
  lock: Lock,
  security: Shield,
  function: Code2,
  folder: Folder,
  chart: BarChart3,
  zap: Zap,
};

export const getIcon = (key: string): LucideIcon => ICONS[key] ?? Sparkles;

/** Tailwind classes for the colored icon tiles (highlights). */
export const TILE_COLORS: Record<string, string> = {
  cyan: "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
  blue: "border-blue-400/30 bg-blue-400/10 text-blue-300",
  emerald: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  violet: "border-violet-400/30 bg-violet-400/10 text-violet-300",
  orange: "border-orange-400/30 bg-orange-400/10 text-orange-300",
  indigo: "border-indigo-400/30 bg-indigo-400/10 text-indigo-300",
};

export type Countdown = {
  ready: boolean;
  expired: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/**
 * Real countdown to `endsAt`. Starts "not ready" so the server and first
 * client render match (no hydration mismatch), then ticks every second.
 */
export function useCountdown(endsAt?: string): Countdown {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const end = endsAt ? Date.parse(endsAt) : NaN;

  if (now === null) {
    return { ready: false, expired: false, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  if (Number.isNaN(end)) {
    return { ready: true, expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const diff = Math.max(0, end - now);
  const total = Math.floor(diff / 1000);
  return {
    ready: true,
    expired: diff === 0,
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

export type VideoSource =
  | { kind: "youtube"; id: string; embed: string; thumb: string }
  | { kind: "file"; src: string };

/** Understands YouTube watch / shorts / youtu.be links, otherwise treats it as a video file. */
export function getVideoSource(url: string): VideoSource {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  if (match) {
    const id = match[1];
    return {
      kind: "youtube",
      id,
      embed: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`,
      thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    };
  }
  return { kind: "file", src: url };
}

export const pad2 = (n: number) => String(n).padStart(2, "0");
