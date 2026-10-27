"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Search,
  ShoppingBag,
  LoaderCircle,
} from "lucide-react";
import { db } from "@/firebase/config";
import ReaderProtection from "@/components/panel/ReaderProtection";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  slug: string;
  coverUrl: string;
  pricePkr: number;
  accessDurationDays: number;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadBooks() {
      try {
        const booksQuery = query(
          collection(db, "books"),
          where("status", "==", "published")
        );

        const snapshot = await getDocs(booksQuery);

        const items: Book[] = snapshot.docs.map((item) => {
          const data = item.data();

          return {
            id: item.id,
            title: String(data.title || "Untitled book"),
            author: String(data.author || "E-MAB"),
            description: String(data.description || ""),
            slug: String(data.slug || item.id),
            coverUrl: String(data.coverUrl || ""),
            pricePkr: typeof data.pricePkr === "number" ? data.pricePkr : 0,
            accessDurationDays:
              typeof data.accessDurationDays === "number"
                ? data.accessDurationDays
                : 90,
          };
        });

        items.sort((a, b) => a.title.localeCompare(b.title));

        if (!cancelled) setBooks(items);
      } catch (err) {
        console.error("Books loading failed:", err);
        if (!cancelled) {
          setError("Books could not be loaded. Please try again later.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadBooks();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredBooks = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return books;

    return books.filter((book) =>
      [book.title, book.author, book.description].some((value) =>
        value.toLowerCase().includes(term)
      )
    );
  }, [books, search]);

  return (
    <>
      <ReaderProtection />
      <main className="min-h-screen bg-white pb-20 pt-28 text-slate-900 dark:bg-[#080B14] dark:text-white">
        <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:border-white/10 dark:from-[#080B14] dark:via-[#0D1224] dark:to-indigo-950/40">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700 dark:border-indigo-400/20 dark:bg-white/5 dark:text-indigo-300">
                <BookOpen size={15} />
                E-MAB Digital Library
              </span>

              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
                Knowledge for your
                <span className="block text-indigo-600 dark:text-indigo-400">
                  next big idea.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                Explore digital books, learn at your own pace, and access your
                purchased reading material through your personal library.
              </p>
            </div>

            <div className="mt-9 max-w-xl">
              <label htmlFor="book-search" className="sr-only">
                Search books
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm focus-within:border-indigo-500 dark:border-white/10 dark:bg-white/5">
                <Search className="shrink-0 text-slate-400" size={20} />
                <input
                  id="book-search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by title, author, or topic..."
                  className="min-h-14 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
              <span className="rounded-full border border-slate-200 bg-white/70 px-4 py-2 dark:border-white/10 dark:bg-white/5">
                {books.length} published {books.length === 1 ? "book" : "books"}
              </span>
              <Link
                href="/mab/library"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-white/10 dark:bg-white/5 dark:hover:text-indigo-300"
              >
                <BookOpen size={16} />
                My Library
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                Explore collection
              </p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Discover your next read
              </h2>
            </div>
            <p className="text-sm text-slate-500">
              Showing {filteredBooks.length} of {books.length} books
            </p>
          </div>

          {loading ? (
            <div className="flex min-h-64 items-center justify-center gap-3 text-slate-500">
              <LoaderCircle className="animate-spin" size={24} />
              Loading books...
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
              {error}
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-20 text-center dark:border-white/15">
              <BookOpen className="mx-auto text-slate-400" size={38} />
              <h3 className="mt-4 text-lg font-semibold">No books found</h3>
              <p className="mt-2 text-sm text-slate-500">
                Try another search or check back later for new books.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              {filteredBooks.map((book) => (
                <article
                  key={book.id}
                  className="group flex min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-slate-200/60 dark:border-white/10 dark:bg-[#111827] dark:hover:border-indigo-400/40 dark:hover:shadow-none"
                >
                  {/* Book Cover */}
                  <Link
                    href={`/books/${encodeURIComponent(book.slug)}`}
                    aria-label={`View ${book.title}`}
                    className="relative flex w-[38%] max-w-[190px] shrink-0 items-center justify-center self-stretch overflow-hidden bg-slate-50 p-4 sm:w-[34%] sm:p-5 dark:bg-white/[0.03]"
                  >
                    <div className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-lg">
                      {book.coverUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={book.coverUrl}
                          alt={`Cover of ${book.title}`}
                          loading="lazy"
                          draggable={false}
                          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5">
                          <BookOpen
                            size={42}
                            strokeWidth={1.4}
                            className="text-slate-400"
                          />
                        </div>
                      )}
                    </div>

                    <span className="absolute left-2 top-2 rounded-md border border-slate-200/80 bg-white/95 px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-slate-600 shadow-sm sm:left-3 sm:top-3 sm:text-[10px] dark:border-white/10 dark:bg-slate-900/95 dark:text-slate-300">
                      E-Book
                    </span>
                  </Link>

                  {/* Book Information */}
                  <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
                    <p className="truncate text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      {book.author || "Unknown Author"}
                    </p>

                    <Link
                      href={`/books/${encodeURIComponent(book.slug)}`}
                      className="mt-2 block"
                    >
                      <h3 className="line-clamp-2 text-base font-bold leading-6 text-slate-900 transition-colors group-hover:text-indigo-600 sm:text-lg dark:text-white dark:group-hover:text-indigo-400">
                        {book.title}
                      </h3>
                    </Link>

                    <p className="mt-2 line-clamp-3 text-sm leading-5 text-slate-500 dark:text-slate-400">
                      {book.description || "Explore this digital book."}
                    </p>

                    {/* Bottom Section */}
                    <div className="mt-auto pt-5">
                      <div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-2 border-t border-slate-100 pt-4 dark:border-white/10">
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            Price
                          </p>
                          <p className="mt-1 text-lg font-bold leading-6 text-slate-900 sm:text-xl dark:text-white">
                            {book.pricePkr > 0
                              ? formatPrice(book.pricePkr)
                              : "Unavailable"}
                          </p>
                        </div>

                        <div className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-2 text-xs font-medium text-slate-600 dark:bg-white/[0.06] dark:text-slate-300">
                          <Clock3 size={14} />
                          {book.accessDurationDays} days
                        </div>
                      </div>

                      <Link
                        href={`/books/${encodeURIComponent(book.slug)}`}
                        className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#111827]"
                      >
                        <ShoppingBag size={16} />
                        View Book Details
                        <ArrowRight
                          size={16}
                          className="ml-auto transition-transform group-hover:translate-x-0.5"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
