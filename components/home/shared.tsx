import Link from "next/link";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-20 px-5 py-16 sm:px-6 sm:py-16  lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl">
          <p className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-blue-600 dark:text-blue-300">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-r from-blue-600 to-transparent dark:from-blue-300"
            />
            {eyebrow}
          </p>
          <h2 className="mt-5 text-balance font-heading text-4xl font-medium leading-[1.05] tracking-[-1px] sm:text-5xl lg:text-[56px]">
            {title}
          </h2>
          {description ? (
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-[#9CA3AF]">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}

export function ButtonLink({
  href,
  variant,
  children,
}: {
  href: string;
  variant: "primary" | "secondary" | "outline" | "light";
  children: React.ReactNode;
}) {
  const classes = {
    primary:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0_10px_30px_-8px_rgba(37,99,235,0.6),inset_0_1px_0_rgba(255,255,255,0.25)] hover:from-blue-500 hover:to-blue-800 hover:shadow-[0_14px_36px_-8px_rgba(37,99,235,0.7),inset_0_1px_0_rgba(255,255,255,0.25)] focus-visible:ring-blue-500",
    secondary:
      "bg-black text-white shadow-lg shadow-black/10 hover:bg-slate-800 dark:bg-white dark:text-black dark:shadow-white/5 dark:hover:bg-slate-200 focus-visible:ring-slate-900 dark:focus-visible:ring-white",
    outline:
      "border border-black/15 bg-white/40 text-slate-900 backdrop-blur-sm hover:border-blue-500 hover:bg-blue-500/5 hover:text-blue-600 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:border-blue-400 dark:hover:bg-blue-400/10 dark:hover:text-blue-300 focus-visible:ring-blue-500",
    light:
      "bg-white text-black shadow-lg shadow-black/10 hover:bg-slate-200 focus-visible:ring-white",
  }[variant];

  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-7 py-3 font-medium transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:w-auto ${classes}`}
    >
      {children}
      <svg
        className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    </Link>
  );
}
