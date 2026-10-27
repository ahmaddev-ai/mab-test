import Link from "next/link";
import { CheckCircle2, ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Thank You | Mian Ahmad Basit",
  description:
    "Thank you for getting in touch. Your request has been received successfully.",
};

const DEFAULTS = {
  title: "Thank you for reaching out!",
  message:
    "Your request has been submitted successfully. Our team will review your details and get back to you by email shortly.",
  backHref: "/",
  backLabel: "Back to Home",
};

type ThankYouPageProps = {
  searchParams: Promise<{
    title?: string | string[];
    message?: string | string[];
    backHref?: string | string[];
    backLabel?: string | string[];
  }>;
};

function getParam(value: string | string[] | undefined, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

export default async function ThankYouPage({
  searchParams,
}: ThankYouPageProps) {
  const params = await searchParams;

  const title = getParam(params.title, DEFAULTS.title);
  const message = getParam(params.message, DEFAULTS.message);
  const backHref = getParam(params.backHref, DEFAULTS.backHref);
  const backLabel = getParam(params.backLabel, DEFAULTS.backLabel);

  // Prevent external or protocol-relative URLs in the back link.
  const safeBackHref =
    backHref.startsWith("/") && !backHref.startsWith("//")
      ? backHref
      : DEFAULTS.backHref;

  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-slate-50 px-5 py-16 transition-colors dark:bg-[#070914] sm:px-8">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl dark:bg-emerald-400/[0.08]" />
        <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-500/[0.10]" />
      </div>

      <section className="relative w-full max-w-2xl">
        <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-7 text-center shadow-xl shadow-slate-900/[0.04] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:shadow-black/20 sm:p-12">
          {/* Success icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 dark:border-emerald-400/20 dark:bg-emerald-400/10">
            <CheckCircle2
              size={42}
              strokeWidth={1.7}
              className="text-emerald-600 dark:text-emerald-400"
              aria-hidden="true"
            />
          </div>

          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-400">
            Submission successful
          </p>

          <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            {title}
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">
            {message}
          </p>

          <div className="mx-auto mt-8 h-px max-w-xs bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-white/15" />

          <div className="mt-8 flex flex-col items-center justify-center gap-4">
            <Link
              href={safeBackHref}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-[#070914] sm:w-auto"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              {backLabel}
            </Link>

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck size={15} aria-hidden="true" />
              <span>Your submission has been received.</span>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-500">
          Thank you for your interest in working with us.
        </p>
      </section>
    </main>
  );
}
