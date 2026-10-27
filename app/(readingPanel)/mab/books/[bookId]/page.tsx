"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/Auth";
import { auth } from "@/firebase/config";
import ReaderProtection from "@/components/panel/ReaderProtection";
import { loadPageBlob, loadPageCount } from "@/components/panel/readerCache";

type Props = {
  params: Promise<{ bookId: string }>;
};

type BookLanguage = "en" | "ur";

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e1116]";

function ReaderSpinner({ text }: { text: string }) {
  return (
    <div
      className="flex min-h-[55vh] flex-col items-center justify-center gap-4"
      role="status"
      aria-live="polite"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-200/15 border-t-amber-200 motion-reduce:animate-none" />
      <p className="text-sm text-stone-300">{text}</p>
    </div>
  );
}

export default function ProtectedBookReader({ params }: Props) {
  const { bookId } = use(params);
  const { user, loading: authLoading } = useAuth();

  const [bookLanguage, setBookLanguage] = useState<BookLanguage>("en");
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const [zoom, setZoom] = useState(100);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    let currentObjectUrl = "";

    async function loadPage() {
      if (authLoading) return;

      if (!user || !auth.currentUser) {
        setError("Please sign in to read this book.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      setImageUrl("");

      try {
        const currentUser = auth.currentUser;
        const token = await currentUser.getIdToken();

        const baseUrl =
          `/api/books/${encodeURIComponent(bookId)}/pages` +
          `?lang=${bookLanguage}`;

        // Cache page counts separately for English and Urdu.
        const count = await loadPageCount(
          `${currentUser.uid}:${bookId}:${bookLanguage}:info`,
          `${baseUrl}&info=1`,
          token
        );

        if (cancelled) return;

        setTotalPages(count);

        if (count <= 0) {
          setImageUrl("");
          setError(
            `No pages are available for the ${bookLanguage.toUpperCase()} version.`
          );
          return;
        }

        if (pageNumber > count) {
          setPageNumber(count);
          return;
        }

        // Cache pages separately for each language.
        const blob = await loadPageBlob(
          `${currentUser.uid}:${bookId}:${bookLanguage}:${pageNumber}`,
          `${baseUrl}&page=${pageNumber}`,
          token
        );

        if (cancelled) return;

        currentObjectUrl = URL.createObjectURL(blob);
        setImageUrl(currentObjectUrl);

        // Preload the next page in the background.
        if (pageNumber < count) {
          void loadPageBlob(
            `${currentUser.uid}:${bookId}:${bookLanguage}:${pageNumber + 1}`,
            `${baseUrl}&page=${pageNumber + 1}`,
            token
          ).catch((preloadError) => {
            console.warn("Next-page preload failed:", preloadError);
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Unable to open this book."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadPage();

    return () => {
      cancelled = true;

      if (currentObjectUrl) {
        URL.revokeObjectURL(currentObjectUrl);
      }
    };
  }, [bookId, pageNumber, bookLanguage, user, authLoading]);

  function changeLanguage(language: BookLanguage) {
    if (language === bookLanguage) return;

    setImageUrl("");
    setError("");
    setTotalPages(0);
    setPageNumber(1);
    setBookLanguage(language);
  }

  // Keyboard navigation: arrow keys turn pages.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;

      if (
        el &&
        (["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName) ||
          el.isContentEditable)
      ) {
        return;
      }

      if (e.key === "ArrowRight") {
        setPageNumber((p) => (totalPages ? Math.min(totalPages, p + 1) : p));
      }

      if (e.key === "ArrowLeft") {
        setPageNumber((p) => Math.max(1, p - 1));
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [totalPages]);

  if (authLoading) {
    return (
      <main className="min-h-screen bg-[#0e1116] p-6 text-stone-200">
        <ReaderSpinner text="Checking your account…" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0e1116] p-6">
        <div className="w-full max-w-md rounded-3xl bg-[#171c25] p-10 text-center ring-1 ring-inset ring-white/[0.07]">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-200/10 text-amber-200">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-6 w-6"
            >
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
          </div>

          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-stone-50">
            Sign in to keep reading
          </h1>

          <p className="mt-2 text-sm leading-6 text-stone-400">
            Use the account that owns this book.
          </p>

          <Link
            href="/login"
            className={`mt-7 inline-flex rounded-full bg-amber-200 px-6 py-3 text-sm font-semibold text-stone-900 transition hover:bg-amber-100 ${focusRing}`}
          >
            Go to sign in
          </Link>
        </div>
      </main>
    );
  }

  const progress = totalPages
    ? Math.min(100, (pageNumber / totalPages) * 100)
    : 0;

  const canPrev = !loading && pageNumber > 1;
  const canNext = !loading && !!totalPages && pageNumber < totalPages;
  const pagesLeft = totalPages - pageNumber;

  return (
    <>
      <ReaderProtection />

      <main className="min-h-screen bg-[#0e1116] font-sans text-stone-200 antialiased selection:bg-amber-200/20">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="hidden w-72 shrink-0 flex-col border-r border-white/[0.06] bg-[#12161d] lg:flex">
            <div className="flex-1 px-6 py-8">
              <Link
                href="/mab/library"
                className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-stone-400 transition hover:bg-white/[0.04] hover:text-stone-100 ${focusRing}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5 transition group-hover:-translate-x-0.5"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Back to My Library
              </Link>

              {/* Progress */}
              <div className="mt-8 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-5 ring-1 ring-inset ring-white/[0.07]">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0">
                    <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
                      <circle
                        cx="18"
                        cy="18"
                        r="15.5"
                        fill="none"
                        stroke="rgba(255,255,255,0.07)"
                        strokeWidth="2.5"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.5"
                        fill="none"
                        stroke="#fcd34d"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray={`${(progress / 100) * 97.4} 97.4`}
                        style={{ transition: "stroke-dasharray 400ms ease" }}
                      />
                    </svg>

                    <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold tabular-nums text-stone-100">
                      {totalPages ? `${Math.round(progress)}%` : "—"}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p className="text-base font-semibold leading-tight tracking-tight text-stone-100">
                      Your reading
                    </p>
                    <p className="mt-1 text-sm text-stone-400">
                      Page{" "}
                      <span className="tabular-nums text-stone-200">
                        {pageNumber}
                      </span>{" "}
                      of{" "}
                      <span className="tabular-nums">{totalPages || "—"}</span>
                    </p>
                  </div>
                </div>

                {totalPages > 0 && (
                  <p className="mt-4 text-xs text-stone-500">
                    {pagesLeft === 0
                      ? "You've reached the last page."
                      : `${pagesLeft} ${
                          pagesLeft === 1 ? "page" : "pages"
                        } left`}
                  </p>
                )}
              </div>

              <p className="mt-8 px-3 text-xs leading-5 text-stone-500">
                Tip: press{" "}
                <kbd className="rounded bg-white/[0.07] px-1.5 py-0.5 font-sans text-[11px] text-stone-300">
                  ←
                </kbd>{" "}
                <kbd className="rounded bg-white/[0.07] px-1.5 py-0.5 font-sans text-[11px] text-stone-300">
                  →
                </kbd>{" "}
                to turn pages.
              </p>
            </div>

            <div className="border-t border-white/[0.06] p-5">
              <div className="flex items-center gap-3 rounded-xl px-2 py-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-200/10 text-sm font-semibold text-amber-200">
                  E
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-stone-200">
                    E-MAB Reader
                  </p>
                  <p className="text-xs text-stone-500">Protected reading</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Reader */}
          <section className="relative flex min-w-0 flex-1 flex-col">
            {/* Header */}
            <header className="border-b border-white/[0.06] bg-[#0e1116]/85 backdrop-blur-xl">
              <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-8">
                <div className="flex min-w-0 items-center gap-3">
                  <Link
                    href="/mab/library"
                    aria-label="Back to library"
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-stone-400 transition hover:bg-white/[0.06] hover:text-white lg:hidden ${focusRing}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-5 w-5"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </Link>

                  <div className="min-w-0">
                    <h1 className="truncate text-lg font-semibold tracking-tight text-stone-100">
                      Reading Room
                    </h1>
                    <p className="text-xs text-stone-500">
                      Page {pageNumber} of {totalPages || "—"}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {/* EN / UR toggle */}
                  <div
                    className="flex items-center rounded-full border border-white/10 bg-[#171c25] p-1"
                    role="group"
                    aria-label="Book language"
                  >
                    <button
                      type="button"
                      onClick={() => changeLanguage("en")}
                      aria-pressed={bookLanguage === "en"}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                        bookLanguage === "en"
                          ? "bg-amber-200 text-stone-900"
                          : "text-stone-400 hover:text-white"
                      }`}
                    >
                      EN
                    </button>

                    <button
                      type="button"
                      onClick={() => changeLanguage("ur")}
                      aria-pressed={bookLanguage === "ur"}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                        bookLanguage === "ur"
                          ? "bg-amber-200 text-stone-900"
                          : "text-stone-400 hover:text-white"
                      }`}
                    >
                      UR
                    </button>
                  </div>

                  <span className="flex items-center gap-2 rounded-full bg-emerald-400/[0.08] px-3 py-1.5 text-xs font-medium text-emerald-300 ring-1 ring-inset ring-emerald-400/20">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60 motion-reduce:hidden" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    Secure session
                  </span>
                </div>
              </div>

              {/* Progress line */}
              <div
                className="h-[2px] w-full bg-white/[0.04]"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
                aria-label="Reading progress"
              >
                <div
                  className="h-full bg-gradient-to-r from-amber-300 to-amber-200 transition-[width] duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </header>

            {/* Canvas */}
            <div className="relative flex-1 px-3 pb-32 pt-6 sm:px-8 sm:pt-10">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(252,211,77,0.06),transparent_65%)]" />

              <div className="relative mx-auto max-w-5xl">
                {error ? (
                  <div className="mx-auto mt-16 max-w-md rounded-3xl bg-red-950/25 p-10 text-center ring-1 ring-inset ring-red-400/15">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-400/10 text-red-300">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        className="h-6 w-6"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 8v5M12 16.5v.01" strokeLinecap="round" />
                      </svg>
                    </div>

                    <h2 className="mt-5 text-xl font-semibold tracking-tight text-stone-50">
                      This book can&apos;t be opened
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-red-200/75">
                      {error}
                    </p>

                    <Link
                      href="/mab/library"
                      className={`mt-7 inline-flex rounded-full bg-stone-100 px-6 py-3 text-sm font-semibold text-stone-900 transition hover:bg-white ${focusRing}`}
                    >
                      Go to My Library
                    </Link>
                  </div>
                ) : (
                  <div
                    className="relative overflow-auto rounded-3xl bg-[#171c25] p-3 ring-1 ring-inset ring-white/[0.06] sm:p-8"
                    onContextMenu={(event) => event.preventDefault()}
                  >
                    {loading ? (
                      <div
                        className="flex min-h-[65vh] flex-col items-center justify-center gap-5"
                        role="status"
                        aria-live="polite"
                      >
                        <div className="relative flex h-14 w-14 items-center justify-center">
                          <div className="absolute inset-0 animate-spin rounded-full border-2 border-amber-200/15 border-t-amber-200 motion-reduce:animate-none" />
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="h-6 w-6 text-amber-200"
                          >
                            <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
                            <path d="M4 5.5v16M8 7h8M8 11h8" />
                          </svg>
                        </div>

                        <div className="text-center">
                          <p className="text-base font-semibold text-stone-100">
                            Opening {bookLanguage.toUpperCase()} page{" "}
                            {pageNumber}
                          </p>
                          <p className="mt-1 text-sm text-stone-500">
                            Just a moment…
                          </p>
                        </div>
                      </div>
                    ) : imageUrl ? (
                      <div className="flex w-full justify-center">
                        <img
                          src={imageUrl}
                          alt={`${bookLanguage.toUpperCase()} book page ${pageNumber}`}
                          draggable={false}
                          onContextMenu={(event) => event.preventDefault()}
                          className="block h-auto select-none rounded-[3px] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.3),0_30px_70px_-10px_rgba(0,0,0,0.65)] transition-[width] duration-200"
                          style={{
                            width: `${zoom}%`,
                            maxWidth:
                              zoom === 100 ? "min(100%, 780px)" : "none",
                          }}
                        />
                      </div>
                    ) : (
                      <div className="flex min-h-[65vh] flex-col items-center justify-center gap-2 text-center">
                        <p className="text-base font-semibold text-stone-300">
                          This page is empty
                        </p>
                        <p className="text-sm text-stone-500">
                          Try another page using the controls below.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Floating control dock */}
            {!error && (
              <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-3 pb-4 sm:pb-6 lg:pl-72">
                <nav
                  aria-label="Reader controls"
                  className="pointer-events-auto flex items-center gap-1 rounded-full bg-[#1a202b]/90 p-1.5 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.7)] ring-1 ring-inset ring-white/10 backdrop-blur-xl"
                >
                  <button
                    onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                    disabled={!canPrev}
                    aria-label="Previous page"
                    className={`flex h-11 w-11 items-center justify-center rounded-full text-stone-300 transition hover:bg-white/[0.08] hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 ${focusRing}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-5 w-5"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>

                  <div
                    className="min-w-[88px] px-2 text-center"
                    aria-live="polite"
                  >
                    <span className="text-base font-semibold tabular-nums text-stone-50">
                      {totalPages ? pageNumber : "—"}
                    </span>
                    <span className="mx-1 text-sm text-stone-600">/</span>
                    <span className="text-sm tabular-nums text-stone-400">
                      {totalPages || "—"}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      setPageNumber((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={!canNext}
                    aria-label="Next page"
                    className={`flex h-11 items-center gap-2 rounded-full bg-amber-200 px-5 text-sm font-semibold text-stone-900 transition hover:bg-amber-100 active:scale-95 disabled:cursor-not-allowed disabled:bg-white/[0.06] disabled:text-stone-500 ${focusRing}`}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-4 w-4"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>

                  <span
                    className="mx-1.5 h-6 w-px bg-white/10"
                    aria-hidden="true"
                  />

                  <button
                    onClick={() => setZoom((z) => Math.max(50, z - 10))}
                    disabled={zoom <= 50}
                    aria-label="Zoom out"
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-lg text-stone-300 transition hover:bg-white/[0.08] disabled:opacity-30 ${focusRing}`}
                  >
                    −
                  </button>

                  <button
                    onClick={() => setZoom(100)}
                    aria-label="Reset zoom to 100%"
                    className={`hidden min-w-12 rounded-full px-2 py-2 text-xs font-medium tabular-nums text-stone-300 transition hover:bg-white/[0.08] sm:block ${focusRing}`}
                  >
                    {zoom}%
                  </button>

                  <button
                    onClick={() => setZoom((z) => Math.min(150, z + 10))}
                    disabled={zoom >= 150}
                    aria-label="Zoom in"
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-lg text-stone-300 transition hover:bg-white/[0.08] disabled:opacity-30 ${focusRing}`}
                  >
                    +
                  </button>
                </nav>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
