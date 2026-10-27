"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useAuth } from "@/context/Auth";
import {
  Archive,
  ArrowDown,
  ArrowUp,
  BookOpen,
  CheckCircle2,
  Clock3,
  Edit3,
  Eye,
  FileText,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Tag,
  X,
} from "lucide-react";

type BookStatus = "draft" | "published" | "archived";

interface Book {
  id: string;
  title: string;
  slug?: string;
  author?: string;
  description?: string;
  coverStoragePath?: string;
  coverUrl?: string;
  pdfStoragePath?: string;
  priceUsdCents?: number;
  accessDurationDays?: number;
  status: BookStatus;
  createdAt?:
    | {
        seconds?: number;
        toDate?: () => Date;
      }
    | Date
    | string
    | null;
  updatedAt?:
    | {
        seconds?: number;
        toDate?: () => Date;
      }
    | Date
    | string
    | null;
}

type StatusFilter = "all" | BookStatus;
type SortOption = "newest" | "oldest" | "title-asc" | "title-desc";

const PAGE_SIZE = 8;

const statusOptions: {
  label: string;
  value: StatusFilter;
}[] = [
  { label: "All Books", value: "all" },
  { label: "Published", value: "published" },
  { label: "Drafts", value: "draft" },
  { label: "Archived", value: "archived" },
];

function getDate(value: Book["createdAt"]): Date | null {
  if (!value) return null;

  if (value instanceof Date) return value;

  if (typeof value === "string") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  if (typeof value.toDate === "function") {
    return value.toDate();
  }

  if (typeof value.seconds === "number") {
    return new Date(value.seconds * 1000);
  }

  return null;
}

function formatDate(value: Book["createdAt"]): string {
  const date = getDate(value);

  if (!date) return "Date unavailable";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatPrice(priceUsdCents?: number): string {
  if (
    typeof priceUsdCents !== "number" ||
    !Number.isFinite(priceUsdCents) ||
    priceUsdCents < 0
  ) {
    return "Not set";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(priceUsdCents / 100);
}

function normalizeStatus(value: unknown): BookStatus {
  if (value === "published" || value === "archived") {
    return value;
  }

  return "draft";
}

function StatusBadge({ status }: { status: BookStatus }) {
  const config = {
    published: {
      label: "Published",
      className:
        "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
      icon: CheckCircle2,
    },
    draft: {
      label: "Draft",
      className:
        "bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-400",
      icon: Clock3,
    },
    archived: {
      label: "Archived",
      className:
        "bg-slate-500/10 text-slate-600 border-slate-500/20 dark:text-slate-400",
      icon: Archive,
    },
  }[status];

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      <Icon size={13} />
      {config.label}
    </span>
  );
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  accent,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ElementType;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-500/30 dark:border-white/10 dark:bg-[#0a0c12]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500 dark:text-white/50">{title}</p>

          <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            {value.toLocaleString()}
          </h3>

          <p className="mt-2 text-xs text-slate-500 dark:text-white/40">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent}`}
        >
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

function BookCover({ book }: { book: Book }) {
  // This field is only used if your existing data has a usable image URL.
  // Do not put private PDF download URLs here.
  const imageUrl = book.coverUrl;

  if (imageUrl) {
    return (
      <div className="flex h-[90px] w-[68px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-white/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={`${book.title} cover`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="flex h-[90px] w-[68px] shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-gradient-to-br from-emerald-500/15 via-slate-100 to-slate-200 dark:from-emerald-500/20 dark:via-[#111827] dark:to-[#05060a]">
      <BookOpen size={27} className="text-emerald-600 dark:text-emerald-400" />
    </div>
  );
}

export default function AdminBooksPage() {
  const router = useRouter();
  const { user, role, loading: authLoading } = useAuth();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);

  const fetchBooks = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const booksQuery = query(
        collection(db, "books"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(booksQuery);

      const fetchedBooks: Book[] = snapshot.docs.map((document) => {
        const data = document.data();

        return {
          id: document.id,
          title: typeof data.title === "string" ? data.title : "Untitled Book",
          slug: data.slug,
          author: data.author,
          description: data.description,
          coverStoragePath: data.coverStoragePath,
          coverUrl: data.coverUrl,
          pdfStoragePath: data.pdfStoragePath,
          priceUsdCents:
            typeof data.priceUsdCents === "number"
              ? data.priceUsdCents
              : undefined,
          accessDurationDays:
            typeof data.accessDurationDays === "number"
              ? data.accessDurationDays
              : 90,
          status: normalizeStatus(data.status),
          createdAt: data.createdAt ?? null,
          updatedAt: data.updatedAt ?? null,
        };
      });

      setBooks(fetchedBooks);
    } catch (err) {
      console.error("Failed to fetch books:", err);

      setError(
        "Books could not be loaded. Check your Firestore permissions and collection structure."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.replace("/admin/login");
      return;
    }

    if (role !== "admin") {
      if (role === "publisher") {
        router.replace("/publisher/dashboard");
      }

      return;
    }

    void fetchBooks();
  }, [authLoading, user, role, router, fetchBooks]);

  const stats = useMemo(() => {
    return {
      total: books.length,
      published: books.filter((book) => book.status === "published").length,
      drafts: books.filter((book) => book.status === "draft").length,
      archived: books.filter((book) => book.status === "archived").length,
    };
  }, [books]);

  const filteredBooks = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = books.filter((book) => {
      const matchesStatus =
        statusFilter === "all" || book.status === statusFilter;

      const matchesSearch =
        !normalizedSearch ||
        book.title.toLowerCase().includes(normalizedSearch) ||
        (book.author ?? "").toLowerCase().includes(normalizedSearch) ||
        (book.slug ?? "").toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });

    result.sort((a, b) => {
      if (sortBy === "title-asc") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "title-desc") {
        return b.title.localeCompare(a.title);
      }

      const dateA = getDate(a.createdAt)?.getTime() ?? 0;
      const dateB = getDate(b.createdAt)?.getTime() ?? 0;

      return sortBy === "oldest" ? dateA - dateB : dateB - dateA;
    });

    return result;
  }, [books, search, statusFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / PAGE_SIZE));

  const currentPage = Math.min(page, totalPages);

  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setSortBy("newest");
    setPage(1);
  };

  if (authLoading || !user || role !== "admin") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2
            className="mx-auto animate-spin text-emerald-500"
            size={30}
          />
          <p className="mt-4 text-sm text-slate-500 dark:text-white/50">
            Verifying admin access...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-[1600px] space-y-7 pb-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
            <BookOpen size={15} />
            Digital Library
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
            Books Management
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-white/50">
            Add premium books, manage pricing, and control which titles are
            available in your digital library.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => void fetchBooks(true)}
            disabled={loading || refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-emerald-500/40 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/80 dark:hover:text-emerald-400"
          >
            <RefreshCw
              size={16}
              className={loading || refreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>

          <Link
            href="/admin/books/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-[#052e16] shadow-lg shadow-emerald-500/10 transition hover:bg-emerald-400"
          >
            <Plus size={18} />
            Add Book
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Books"
          value={stats.total}
          description="All books in your library"
          icon={BookOpen}
          accent="bg-blue-500/10 text-blue-600 dark:text-blue-400"
        />

        <StatCard
          title="Published"
          value={stats.published}
          description="Available in the catalogue"
          icon={CheckCircle2}
          accent="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        />

        <StatCard
          title="Drafts"
          value={stats.drafts}
          description="Not yet published"
          icon={FileText}
          accent="bg-amber-500/10 text-amber-700 dark:text-amber-400"
        />

        <StatCard
          title="Archived"
          value={stats.archived}
          description="Hidden from the catalogue"
          icon={Archive}
          accent="bg-slate-500/10 text-slate-600 dark:text-slate-400"
        />
      </div>

      {/* Main Content */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#0a0c12]">
        {/* Search and filters */}
        <div className="space-y-4 border-b border-slate-200 p-4 dark:border-white/10 sm:p-5">
          <div className="flex flex-col gap-3 xl:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by book title, author or slug..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative min-w-0 sm:min-w-[175px]">
                <SlidersHorizontal
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value as StatusFilter)
                  }
                  aria-label="Filter books by status"
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-8 text-sm text-slate-700 outline-none focus:border-emerald-500/50 dark:border-white/10 dark:bg-black/20 dark:text-white"
                >
                  {statusOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-white text-slate-900 dark:bg-[#0a0c12] dark:text-white"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative min-w-0 sm:min-w-[165px]">
                <ArrowDown
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value as SortOption)
                  }
                  aria-label="Sort books"
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-8 text-sm text-slate-700 outline-none focus:border-emerald-500/50 dark:border-white/10 dark:bg-black/20 dark:text-white"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="title-asc">Title A–Z</option>
                  <option value="title-desc">Title Z–A</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-500 dark:text-white/40">
              Showing{" "}
              <span className="font-semibold text-slate-800 dark:text-white/80">
                {filteredBooks.length === 0
                  ? 0
                  : (currentPage - 1) * PAGE_SIZE + 1}
                {"–"}
                {Math.min(currentPage * PAGE_SIZE, filteredBooks.length)}
              </span>{" "}
              of {filteredBooks.length} books
            </p>

            {(search || statusFilter !== "all" || sortBy !== "newest") && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
              >
                <X size={14} />
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="m-4 flex flex-col gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>

            <button
              type="button"
              onClick={() => void fetchBooks(true)}
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400"
            >
              <RefreshCw size={15} />
              Try again
            </button>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center p-8">
            <Loader2 size={32} className="animate-spin text-emerald-500" />
            <p className="mt-4 text-sm text-slate-500 dark:text-white/50">
              Loading your book library...
            </p>
          </div>
        ) : error && books.length === 0 ? (
          <div className="flex min-h-[260px] flex-col items-center justify-center p-8 text-center">
            <BookOpen size={32} className="text-slate-400" />
            <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
              Unable to load books
            </h3>
            <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-white/50">
              Check your Firestore permissions, database connection and whether
              the books collection has the expected fields.
            </p>
          </div>
        ) : paginatedBooks.length === 0 ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10">
              {search || statusFilter !== "all" ? (
                <Search size={27} className="text-emerald-500" />
              ) : (
                <BookOpen size={27} className="text-emerald-500" />
              )}
            </div>

            <h3 className="mt-5 text-lg font-semibold text-slate-950 dark:text-white">
              {search || statusFilter !== "all"
                ? "No matching books"
                : "Your library is empty"}
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-white/50">
              {search || statusFilter !== "all"
                ? "Try a different search term or change your filters."
                : "Add your first premium book to start building your digital library."}
            </p>

            {search || statusFilter !== "all" ? (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-emerald-500/40 dark:border-white/10 dark:text-white/80"
              >
                Clear filters
              </button>
            ) : (
              <Link
                href="/admin/books/new"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-[#052e16] transition hover:bg-emerald-400"
              >
                <Plus size={17} />
                Add Your First Book
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500 dark:border-white/10 dark:bg-white/[0.02] dark:text-white/40">
                    <th className="px-5 py-4 font-medium">Book</th>
                    <th className="px-5 py-4 font-medium">Price</th>
                    <th className="px-5 py-4 font-medium">Access</th>
                    <th className="px-5 py-4 font-medium">Status</th>
                    <th className="px-5 py-4 font-medium">Created</th>
                    <th className="px-5 py-4 text-right font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {paginatedBooks.map((book) => (
                    <tr
                      key={book.id}
                      className="transition hover:bg-slate-50/80 dark:hover:bg-white/[0.025]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex min-w-[260px] items-center gap-4">
                          <BookCover book={book} />

                          <div className="min-w-0">
                            <p className="line-clamp-2 font-semibold text-slate-900 dark:text-white">
                              {book.title}
                            </p>

                            <p className="mt-1 text-xs text-slate-500 dark:text-white/40">
                              {book.author || "Author not specified"}
                            </p>

                            <p className="mt-1 truncate text-xs text-slate-400 dark:text-white/30">
                              {book.slug || book.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {formatPrice(book.priceUsdCents)}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600 dark:text-white/60">
                        {book.accessDurationDays ?? 90} days
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        <StatusBadge status={book.status} />
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500 dark:text-white/50">
                        {formatDate(book.createdAt)}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            title="Preview book details"
                            onClick={() =>
                              router.push(`/admin/books/${book.id}`)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-emerald-500/40 hover:text-emerald-600 dark:border-white/10 dark:text-white/60 dark:hover:text-emerald-400"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            type="button"
                            title="Edit book"
                            onClick={() =>
                              router.push(`/admin/books/${book.id}`)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-emerald-500/40 hover:text-emerald-600 dark:border-white/10 dark:text-white/60 dark:hover:text-emerald-400"
                          >
                            <Edit3 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile and Tablet Cards */}
            <div className="grid gap-4 p-4 sm:grid-cols-2 lg:hidden">
              {paginatedBooks.map((book) => (
                <article
                  key={book.id}
                  className="rounded-xl border border-slate-200 p-4 transition hover:border-emerald-500/30 dark:border-white/10"
                >
                  <div className="flex gap-4">
                    <BookCover book={book} />

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 font-semibold text-slate-900 dark:text-white">
                        {book.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500 dark:text-white/40">
                        {book.author || "Author not specified"}
                      </p>

                      <div className="mt-3">
                        <StatusBadge status={book.status} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4 dark:border-white/10">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-white/40">
                        Price
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                        {formatPrice(book.priceUsdCents)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 dark:text-white/40">
                        Access duration
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                        {book.accessDurationDays ?? 90} days
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-500 dark:text-white/40">
                      {formatDate(book.createdAt)}
                    </span>

                    <button
                      type="button"
                      onClick={() => router.push(`/admin/books/${book.id}`)}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-emerald-500/40 hover:text-emerald-600 dark:border-white/10 dark:text-white/80 dark:hover:text-emerald-400"
                    >
                      <Edit3 size={14} />
                      Manage
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <p className="text-xs text-slate-500 dark:text-white/40">
                  Page {currentPage} of {totalPages}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() =>
                      setPage((current) => Math.max(1, current - 1))
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:border-emerald-500/40 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-white/70"
                  >
                    <ArrowUp size={14} className="-rotate-90" />
                    Previous
                  </button>

                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() =>
                      setPage((current) => Math.min(totalPages, current + 1))
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:border-emerald-500/40 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-white/70"
                  >
                    Next
                    <ArrowDown size={14} className="-rotate-90" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer note */}
      <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white/60 p-4 dark:border-white/10 dark:bg-white/[0.02]">
        <Tag size={18} className="mt-0.5 shrink-0 text-emerald-500" />

        <p className="text-xs leading-5 text-slate-500 dark:text-white/45">
          Prices shown here are stored USD prices. The final PKR checkout amount
          will be calculated and locked on the server when KuickPay checkout is
          implemented. Book editing and publishing actions require the
          corresponding backend APIs.
        </p>
      </div>
    </section>
  );
}
