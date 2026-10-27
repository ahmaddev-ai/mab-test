import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Gradient hairline used around glass cards. */
export const hairline =
  "bg-gradient-to-b from-white/25 via-white/[0.07] to-white/[0.03]";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      className={`relative isolate scroll-mt-20 overflow-hidden border-t border-white/10 px-5 py-16 sm:px-8 lg:px-12 lg:py-12  ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute -left-40 top-0 h-[420px] w-[520px] rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-[380px] w-[520px] rounded-full bg-violet-600/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <header className="mb-10 max-w-3xl lg:mb-10">
          {eyebrow ? (
            <p className="mb-3 text-sm font-semibold text-indigo-300">
              {eyebrow}
            </p>
          ) : null}
          <h2
            id={id ? `${id}-heading` : undefined}
            className="text-balance bg-gradient-to-b from-white to-indigo-200/70 bg-clip-text text-3xl font-extrabold leading-[1.1] tracking-tight text-transparent sm:text-4xl lg:text-5xl"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              {description}
            </p>
          ) : null}
        </header>
        {children}
      </div>
    </section>
  );
}

/** Glass card with a gradient hairline border. */
export function GlassCard({
  children,
  className = "",
  innerClassName = "p-6",
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`rounded-[26px] ${hairline} p-px ${
        hover
          ? "transition-all duration-300 hover:-translate-y-1 hover:from-white/45"
          : ""
      } ${className}`}
    >
      <div className={`h-full rounded-[25px] bg-[#0A0C1F] ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}

type CtaProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "accent";
  className?: string;
  download?: string;
  newTab?: boolean;
  arrow?: boolean;
};

const ctaBase =
  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#060714]";

const ctaVariants: Record<NonNullable<CtaProps["variant"]>, string> = {
  primary:
    "bg-white text-[#060714] shadow-[0_10px_40px_-8px_rgba(129,140,248,0.7)] hover:-translate-y-0.5 hover:shadow-[0_14px_50px_-8px_rgba(129,140,248,0.9)]",
  secondary:
    "border border-white/20 bg-white/[0.05] text-white backdrop-blur-md hover:bg-white/10",
  accent:
    "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-[0_10px_40px_-10px_rgba(99,102,241,0.8)] hover:-translate-y-0.5 hover:from-indigo-400 hover:to-violet-400",
};

export function Cta({
  children,
  onClick,
  href,
  variant = "primary",
  className = "",
  download,
  newTab = false,
  arrow = true,
}: CtaProps) {
  const classes = `${ctaBase} ${ctaVariants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow ? (
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {content}
      </button>
    );
  }

  const target = href ?? "#";
  const isPlainAnchor =
    download !== undefined ||
    target.startsWith("#") ||
    target.startsWith("mailto:");

  if (isPlainAnchor || newTab) {
    return (
      <a
        href={target}
        className={classes}
        {...(download !== undefined ? { download } : {})}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={target} className={classes}>
      {content}
    </Link>
  );
}

export function Chip({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "indigo" | "emerald";
}) {
  const tones = {
    default:
      "border-slate-200 bg-slate-100 text-slate-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200",
    indigo:
      "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-400/25 dark:bg-indigo-400/10 dark:text-indigo-200",
    emerald:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
