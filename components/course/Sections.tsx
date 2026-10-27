"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  BadgePercent,
  Check,
  Globe,
  Mail,
  Quote,
  ShieldCheck,
} from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { CountdownDisplay } from "./OfferBars";
import { TILE_COLORS, getIcon, useCountdown } from "./course-utils";
import { Chip, Cta, GlassCard, Section } from "./ui";
import type { CourseData, Offer, Social } from "./types";

/* ---------------------------------------------------------------- Highlights */

export function HighlightsSection({
  id,
  copy,
}: {
  id: string;
  copy: NonNullable<CourseData["highlights"]>;
}) {
  return (
    <Section id={id} title={copy.heading} description={copy.description}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {copy.items.map((item) => {
          const Icon = getIcon(item.icon);
          return (
            <li key={item.title}>
              <GlassCard className="h-full" innerClassName="p-6">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                    TILE_COLORS[item.color] ?? TILE_COLORS.indigo
                  }`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-slate-300">
                  {item.description}
                </p>
              </GlassCard>
            </li>
          );
        })}
      </ul>

      <div className="mt-10">
        <h3 className="text-lg font-bold text-white">{copy.includesTitle}</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {copy.includes.map((text) => (
            <li
              key={text}
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
              </span>
              <span className="text-[15px] font-medium leading-snug text-slate-100">
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------- Mentor */

export function MentorBand({
  id,
  copy,
  onEnroll,
}: {
  id: string;
  copy: NonNullable<CourseData["mentor"]>;
  onEnroll: () => void;
}) {
  return (
    <section
      id={id}
      aria-label={copy.heading}
      className="relative isolate scroll-mt-20 overflow-hidden border-t border-white/10 px-5 py-16 sm:px-8 lg:px-12 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-700 p-7 sm:p-12">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-[80px]"
            aria-hidden="true"
          />
          <Quote
            className="absolute right-8 top-8 h-24 w-24 text-white/10"
            aria-hidden="true"
          />

          <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-indigo-100">
                {copy.role}
              </p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                {copy.heading}
              </h2>
            </div>
            <div>
              <blockquote className="text-xl font-medium leading-relaxed text-white sm:text-2xl">
                &ldquo;{copy.quote}&rdquo;
              </blockquote>
              <p className="mt-4 text-base font-semibold text-indigo-100">
                {copy.name}
              </p>
              <div className="mt-6">
                <Cta onClick={onEnroll}>{copy.cta}</Cta>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- Tools */

export function ToolsSection({
  id,
  copy,
}: {
  id: string;
  copy: NonNullable<CourseData["tools"]>;
}) {
  return (
    <Section id={id} title={copy.heading} description={copy.description}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {copy.items.map((tool) => (
          <li key={tool.name}>
            <GlassCard className="h-full" innerClassName="p-5 sm:p-6">
              <div className="flex items-center gap-4">
                <Image
                  src={tool.icon}
                  alt=""
                  width={96}
                  height={96}
                  className="h-12 w-12 shrink-0 rounded-full bg-white object-cover"
                />
                <div className="min-w-0">
                  <h3 className="text-lg font-bold leading-tight text-white">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-slate-400">{tool.category}</p>
                </div>
              </div>
              <p className="mt-4 text-sm font-semibold text-indigo-300">
                {tool.title}
              </p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-slate-300">
                {tool.detail}
              </p>
            </GlassCard>
          </li>
        ))}
      </ul>

      <h3 className="mt-14 text-2xl font-extrabold text-white">
        {copy.providersTitle}
      </h3>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {copy.providers.map((group) => (
          <div
            key={group.title}
            className="rounded-[26px] border border-white/10 bg-white/[0.03] p-6"
          >
            <h4 className="text-xl font-bold text-white">{group.title}</h4>
            <p className="mt-1 text-sm text-slate-400">{group.subtitle}</p>
            <ul className="mt-5 divide-y divide-white/10">
              {group.tools.map((t) => (
                <li key={t.name} className="py-3">
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-slate-400">
                    {t.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ Security */

export function SecuritySection({
  id,
  copy,
  onEnroll,
}: {
  id: string;
  copy: NonNullable<CourseData["security"]>;
  onEnroll: () => void;
}) {
  return (
    <Section id={id} title={copy.heading} description={copy.description}>
      <ul className="grid gap-5 md:grid-cols-2">
        {copy.cards.map((card) => (
          <li key={card.title}>
            <GlassCard className="h-full" innerClassName="p-6 sm:p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-[#060714]">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="mt-5 text-sm font-semibold text-emerald-300">
                {card.subtitle}
              </p>
              <h3 className="mt-1 text-xl font-bold text-white">
                {card.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-300">
                {card.body}
              </p>
            </GlassCard>
          </li>
        ))}
      </ul>

      <p className="mt-6">
        <Chip tone="indigo">{copy.coveredIn}</Chip>
      </p>

      {copy.promise ? (
        <div className="mt-8 rounded-[28px] border border-indigo-400/25 bg-indigo-400/[0.07] p-6 sm:p-8">
          <h3 className="text-xl font-bold text-white">{copy.promise.title}</h3>
          <blockquote className="mt-3 text-lg leading-relaxed text-slate-100 sm:text-xl">
            &ldquo;{copy.promise.quote}&rdquo;
          </blockquote>
          <div className="mt-6">
            <Cta onClick={onEnroll}>{copy.promise.cta}</Cta>
          </div>
        </div>
      ) : null}
    </Section>
  );
}

/* --------------------------------------------------------------- Instructors */

const SOCIAL_ICONS: Record<Social["type"], React.ReactNode> = {
  portfolio: <Globe className="h-[18px] w-[18px]" aria-hidden="true" />,
  linkedin: <FaLinkedin size={18} aria-hidden="true" />,
  twitter: <FaTwitter size={18} aria-hidden="true" />,
  instagram: <FaInstagram size={18} aria-hidden="true" />,
  github: <FaGithub size={18} aria-hidden="true" />,
  email: <Mail className="h-[18px] w-[18px]" aria-hidden="true" />,
};

export function InstructorsSection({
  id,
  copy,
}: {
  id: string;
  copy: NonNullable<CourseData["instructors"]>;
}) {
  const lead = copy.lead;
  return (
    <Section id={id} title={copy.heading} description={copy.description}>
      <GlassCard hover={false} innerClassName="p-5 sm:p-8">
        <div className="grid gap-8 md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] lg:gap-10">
          <div className="relative mx-auto aspect-square w-full max-w-[340px] overflow-hidden rounded-3xl bg-indigo-600 ring-1 ring-white/15 md:mx-0">
            <Image
              src={lead.image}
              alt={lead.name}
              fill
              sizes="(min-width: 1024px) 340px, 90vw"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-indigo-300">
              {lead.badge}
            </p>
            <h3 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              {lead.name}
            </h3>
            <p className="mt-1 text-base font-medium text-slate-300">
              {lead.title}
            </p>
            <p className="mt-1 text-sm text-slate-400">{lead.headline}</p>

            {lead.quote ? (
              <blockquote className="mt-6 border-l-2 border-indigo-400/60 pl-5 text-[16px] leading-relaxed text-slate-200">
                {lead.quote}
              </blockquote>
            ) : null}

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {lead.facts.map((fact) => (
                <li
                  key={fact}
                  className="flex items-start gap-2.5 rounded-2xl bg-white/[0.05] px-4 py-3 text-sm font-medium text-slate-100"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300"
                    aria-hidden="true"
                  />
                  {fact}
                </li>
              ))}
            </ul>

            <ul className="mt-6 flex flex-wrap gap-2">
              {lead.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    {...(s.href.startsWith("mailto:")
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    aria-label={s.label}
                    className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3.5 text-sm font-medium text-slate-200 transition-colors hover:border-indigo-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
                  >
                    {SOCIAL_ICONS[s.type]}
                    {s.text ?? null}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </GlassCard>

      {copy.team && copy.team.length > 0 ? (
        <>
          <h3 className="mt-12 text-2xl font-extrabold text-white">
            {copy.teamTitle ?? "More from the faculty"}
          </h3>
          <ul className="mt-6 grid gap-5 md:grid-cols-2">
            {copy.team?.map((person) => (
              <li key={person.name}>
                <GlassCard className="h-full" innerClassName="p-5">
                  <div className="flex items-center gap-4">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/15">
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-indigo-300">
                        {person.role}
                      </p>
                      <h4 className="text-xl font-bold text-white">
                        {person.name}
                      </h4>
                      <p className="mt-1 text-sm leading-snug text-slate-300">
                        {person.title}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.name} on LinkedIn`}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] text-slate-200 transition-colors hover:border-indigo-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
                    >
                      <FaLinkedin size={17} aria-hidden="true" />
                    </a>
                    <a
                      href={person.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-300 hover:text-white focus-visible:outline-none focus-visible:underline"
                    >
                      {person.websiteLabel}
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </GlassCard>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </Section>
  );
}

/* ------------------------------------------------------------------- Bonuses */

export function BonusesSection({
  id,
  copy,
  onEnroll,
}: {
  id: string;
  copy: NonNullable<CourseData["bonuses"]>;
  onEnroll: () => void;
}) {
  return (
    <Section id={id} title={copy.heading} description={copy.description}>
      <ul className="grid gap-5 md:grid-cols-2">
        {copy.items.map((bonus) => (
          <li key={bonus.heading}>
            <GlassCard
              className="h-full"
              innerClassName="flex h-full flex-col p-6 sm:p-7"
            >
              <p className="text-sm font-semibold text-indigo-300">
                {bonus.kicker}
              </p>
              <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                {bonus.heading}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-300">
                {bonus.body}
              </p>
              <ul className="mt-5 space-y-3">
                {bonus.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-[15px] leading-snug text-slate-200"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-6 text-sm font-semibold text-emerald-300">
                Included in the program
              </p>
            </GlassCard>
          </li>
        ))}
      </ul>

      {copy.quote ? (
        <div className="mt-8 rounded-[28px] border border-indigo-400/25 bg-indigo-400/[0.07] p-6 sm:p-8">
          <h3 className="text-xl font-bold text-white sm:text-2xl">
            {copy.quote.title}
          </h3>
          <p className="mt-1 text-sm text-slate-400">{copy.quote.subtitle}</p>
          <blockquote className="mt-4 text-lg leading-relaxed text-slate-100 sm:text-xl">
            &ldquo;{copy.quote.quote}&rdquo;
          </blockquote>
          <div className="mt-6">
            <Cta onClick={onEnroll}>{copy.quote.cta}</Cta>
          </div>
        </div>
      ) : null}
    </Section>
  );
}

/* ----------------------------------------------------------------- Final CTA */

export function FinalCtaSection({
  copy,
  offer,
  onEnroll,
}: {
  copy: NonNullable<CourseData["finalCta"]>;
  offer: Offer;
  onEnroll: () => void;
}) {
  const time = useCountdown(offer.endsAt);
  const showOffer = offer.enabled && !time.expired;

  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-heading"
      className="relative isolate overflow-hidden border-t border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 h-[460px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/30 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold text-indigo-300">{copy.kicker}</p>
        <h2
          id="final-cta-heading"
          className="mt-4 text-balance bg-gradient-to-b from-white to-indigo-200/70 bg-clip-text text-4xl font-extrabold leading-[1.05] tracking-tight text-transparent sm:text-6xl"
        >
          {copy.title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
          {copy.text}
        </p>

        {showOffer ? (
          <div className="mx-auto mt-9 max-w-xl rounded-[26px] border border-indigo-400/30 bg-indigo-400/10 p-6">
            <p className="flex items-center justify-center gap-2 text-base font-bold text-white">
              <BadgePercent
                className="h-5 w-5 text-indigo-300"
                aria-hidden="true"
              />
              {offer.headline}
            </p>
            <div className="mt-4 flex justify-center">
              <CountdownDisplay time={time} size="lg" />
            </div>
            <p className="mt-4 text-sm text-slate-300">
              {offer.subtext}{" "}
              <span className="font-semibold text-white">
                Code: {offer.code}
              </span>
            </p>
          </div>
        ) : null}

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Cta onClick={onEnroll}>{copy.primaryCta}</Cta>
          <Cta href={copy.secondaryCta.href} variant="secondary" arrow={false}>
            {copy.secondaryCta.label}
          </Cta>
        </div>

        <ol className="mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm text-slate-400">
          {copy.path.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-medium text-slate-300">
                {step}
              </span>
              {i < copy.path.length - 1 ? (
                <span className="text-slate-600" aria-hidden="true">
                  &rarr;
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        {offer.enabled && offer.disclaimer ? (
          <p className="mt-6 text-xs text-slate-500">{offer.disclaimer}</p>
        ) : null}
      </div>
    </section>
  );
}
