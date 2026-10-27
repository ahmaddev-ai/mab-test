"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { useAuth } from "@/context/Auth";
import { db } from "@/firebase/config";
import ReaderProtection from "@/components/panel/ReaderProtection";

type LibraryBook = {
  bookId: string;
  bookTitle: string;
  orderId: string;
  status: string;
  expiresAt?: Timestamp | Date | null;
  purchasedAt?: Timestamp | Date | null;
  coverUrl?: string;
  author?: string;
  description?: string;
};

function toDate(value?: Timestamp | Date | null): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (value instanceof Timestamp) return value.toDate();

  return null;
}

function formatDate(value?: Timestamp | Date | null) {
  const date = toDate(value);

  if (!date) return "Not available";

  return date.toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function MyLibraryPage() {
  const { user, loading: authLoading } = useAuth();

  const [books, setBooks] = useState<LibraryBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setBooks([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadLibrary() {
      setLoading(true);
      setError("");

      try {
        const libraryRef = collection(db, "users", user!.uid, "library");

        const librarySnapshot = await getDocs(libraryRef);

        const results = await Promise.all(
          librarySnapshot.docs.map(async (libraryDoc) => {
            const data = libraryDoc.data();

            const bookId = String(data.bookId || libraryDoc.id);
            const bookRef = doc(db, "books", bookId);
            const bookSnapshot = await getDoc(bookRef);

            const bookData = bookSnapshot.exists() ? bookSnapshot.data() : {};

            return {
              bookId,
              bookTitle: String(
                data.bookTitle || bookData.title || "Untitled book"
              ),
              orderId: String(data.orderId || ""),
              status: String(data.status || "active"),
              expiresAt: data.expiresAt ?? null,
              purchasedAt: data.purchasedAt ?? null,
              coverUrl: bookData.coverUrl || "",
              author: bookData.author || "",
              description: bookData.description || "",
            } satisfies LibraryBook;
          })
        );

        if (!cancelled) {
          results.sort((a, b) => {
            const dateA = toDate(a.purchasedAt)?.getTime() ?? 0;
            const dateB = toDate(b.purchasedAt)?.getTime() ?? 0;
            return dateB - dateA;
          });

          setBooks(results);
        }
      } catch (err) {
        console.error("Failed to load library:", err);

        if (!cancelled) {
          setError("Your library could not be loaded. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadLibrary();

    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-16">
        <p className="text-sm text-gray-500">Loading your library...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900">My Library</h1>
        <p className="mt-3 text-gray-600">
          Sign in to view your purchased books.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex rounded-xl bg-gray-900 px-6 py-3 font-medium text-white"
        >
          Sign in
        </Link>
      </main>
    );
  }

  return (
    <>
      <ReaderProtection />
      <main className="mx-auto min-h-screen max-w-7xl px-5 py-10 sm:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
              Your reading space
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300 sm:text-4xl">
              My Library
            </h1>
            <p className="mt-3 text-gray-600">
              Access your purchased books and keep track of their expiry dates.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white dark:bg-gray-900 px-5 py-4">
            <p className="text-sm text-gray-500 dark:text-gray-100">
              Purchased books
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-200  ">
              {books.length}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
            <button
              onClick={() => window.location.reload()}
              className="ml-2 font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}

        {!error && books.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 dark:bg-gray-900 px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
              📚
            </div>
            <h2 className="mt-5 text-xl font-semibold text-gray-900 dark:text-gray-200">
              Your library is empty
            </h2>
            <p className="mx-auto mt-2 max-w-md text-gray-600 dark:text-gray-200">
              Books you purchase will appear here once your payment is
              confirmed.
            </p>
            <Link
              href="/mab"
              className="mt-6 inline-flex rounded-xl bg-gray-900 dark:bg-gray-300 dark:text-gray-900 px-6 py-3 font-medium text-white transition hover:bg-gray-700"
            >
              Browse books
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => {
              const expiry = toDate(book.expiresAt);
              const expired = !expiry || expiry.getTime() <= Date.now();
              const active = book.status === "active" && !expired;

              return (
                <article
                  key={book.bookId}
                  className="group overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-gray-200/60"
                >
                  <div className="flex min-h-[240px] flex-row">
                    {/* Left: Book cover */}
                    <div className="relative flex w-[125px] shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 sm:w-[175px] sm:p-4">
                      {book.coverUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={book.coverUrl}
                          alt={book.bookTitle}
                          draggable={false}
                          className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.03] sm:rounded-lg sm:p-0 sm:shadow-md"
                        />
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center px-3 text-center">
                          <span className="text-4xl">📖</span>
                          <p className="mt-3 line-clamp-3 text-xs font-semibold text-gray-500">
                            {book.bookTitle}
                          </p>
                        </div>
                      )}

                      {/* Small cover accent */}
                      <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-indigo-500/70" />
                    </div>

                    {/* Right: Book details */}
                    <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2 className="line-clamp-2 text-base font-bold leading-6 text-gray-900 transition-colors group-hover:text-indigo-700 sm:text-lg">
                            {book.bookTitle}
                          </h2>

                          {book.author && (
                            <p className="mt-1 line-clamp-1 text-xs text-gray-500 sm:text-sm">
                              By {book.author}
                            </p>
                          )}
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold sm:text-xs ${
                            active
                              ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/15"
                              : "bg-red-50 text-red-600 ring-1 ring-inset ring-red-600/15"
                          }`}
                        >
                          {active ? "Active" : "Expired"}
                        </span>
                      </div>

                      {book.description && (
                        <p className="mt-3 line-clamp-2 text-xs leading-5 text-gray-600 sm:text-sm sm:leading-6">
                          {book.description}
                        </p>
                      )}

                      {/* Purchase information */}
                      <div className="mt-3 space-y-2 border-t border-gray-100 pt-3 text-xs sm:mt-4 sm:pt-4 sm:text-sm">
                        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                          <span className="text-gray-500">Purchased</span>
                          <span className="text-right font-medium text-gray-800">
                            {formatDate(book.purchasedAt)}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                          <span className="text-gray-500">Expires</span>
                          <span className="text-right font-medium text-gray-800">
                            {formatDate(book.expiresAt)}
                          </span>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="mt-auto pt-4">
                        {active ? (
                          <Link
                            href={`/mab/books/${encodeURIComponent(
                              book.bookId
                            )}`}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:px-4 sm:py-3 sm:text-sm"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              className="h-4 w-4"
                            >
                              <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
                              <path d="M4 5.5v16M8 7h8M8 11h8" />
                            </svg>
                            Read book
                          </Link>
                        ) : (
                          <button
                            disabled
                            className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-gray-100 px-3 py-2.5 text-xs font-semibold text-gray-400 sm:px-4 sm:py-3 sm:text-sm"
                          >
                            Access expired
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
