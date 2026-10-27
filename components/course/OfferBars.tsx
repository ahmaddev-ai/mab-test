"use client";

import { useEffect, useState } from "react";
import { BadgePercent, X } from "lucide-react";
import { pad2, useCountdown, type Countdown } from "./course-utils";
import type { Offer } from "./types";

/** Digital countdown. Shows "--" until the client has mounted. */
export function CountdownDisplay({
  time,
  size = "sm",
}: {
  time: Countdown;
  size?: "sm" | "lg";
}) {
  const units: [string, number][] = [];
  if (time.days > 0) units.push(["Days", time.days]);
  units.push(["Hrs", time.hours], ["Min", time.minutes], ["Sec", time.seconds]);

  const box =
    size === "lg"
      ? "min-w-[64px] rounded-2xl px-3 py-3 text-3xl"
      : "min-w-[44px] rounded-lg px-2 py-1 text-base";
  const label = size === "lg" ? "mt-1 text-xs" : "text-[10px] leading-none";

  const spoken = time.ready
    ? `${time.days} days ${time.hours} hours ${time.minutes} minutes ${time.seconds} seconds left`
    : "Offer countdown";

  return (
    <div role="timer" aria-label={spoken} className="flex items-center gap-1.5">
      {units.map(([name, value]) => (
        <div
          key={name}
          className={`flex flex-col items-center bg-black/30 font-extrabold tabular-nums text-white ring-1 ring-white/15 ${box}`}
        >
          <span aria-hidden="true">{time.ready ? pad2(value) : "--"}</span>
          <span className={`font-medium uppercase text-white/60 ${label}`} aria-hidden="true">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Slim attention strip shown above the hero. */
export function OfferStrip({
  offer,
  onEnroll,
}: {
  offer: Offer;
  onEnroll: () => void;
}) {
  const time = useCountdown(offer.endsAt);
  if (!offer.enabled || time.expired) return null;

  return (
    <div className="relative z-30 border-b border-white/10 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4 py-2.5">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <BadgePercent className="h-4 w-4" aria-hidden="true" />
          {offer.headline}
          <span className="hidden font-normal text-white/80 md:inline">
            · ends in
          </span>
        </p>
        <CountdownDisplay time={time} />
        <button
          type="button"
          onClick={onEnroll}
          className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-[#060714] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-600"
        >
          Claim {offer.discountPercent}% off
        </button>
      </div>
    </div>
  );
}

/** Floating bar that appears once the hero has scrolled out of view. */
export function FloatingOfferBar({
  offer,
  onEnroll,
}: {
  offer: Offer;
  onEnroll: () => void;
}) {
  const time = useCountdown(offer.endsAt);
  const [heroVisible, setHeroVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setHeroVisible(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!offer.enabled || !time.ready || time.expired || dismissed || heroVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 sm:inset-x-auto sm:bottom-5 sm:left-1/2 sm:-translate-x-1/2">
      <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-[#0A0C1F]/95 py-2.5 pl-4 pr-2.5 text-white shadow-[0_20px_60px_-15px_rgba(99,102,241,0.7)] backdrop-blur-xl sm:gap-4">
        <BadgePercent className="hidden h-5 w-5 shrink-0 text-indigo-300 sm:block" aria-hidden="true" />
        <p className="hidden text-sm font-semibold md:block">
          {offer.discountPercent}% off ends in
        </p>
        <CountdownDisplay time={time} />
        <button
          type="button"
          onClick={onEnroll}
          className="whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-bold text-[#060714] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Claim offer
        </button>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss offer bar"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
