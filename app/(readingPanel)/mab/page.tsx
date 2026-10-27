"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, getIdToken, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { useAuth } from "@/context/Auth";
import {
  BookOpen,
  Search,
  LogOut,
  Loader2,
  ShoppingBag,
  BookMarked,
  UserRound,
  ArrowUpRight,
  RefreshCw,
  LibraryBig,
  CheckCircle2,
  Clock3,
  AlertCircle,
} from "lucide-react";
import PromoCodeRedeemer from "@/components/panel/PromoCodeRedeemer";
import ReaderProtection from "@/components/panel/ReaderProtection";
import { savePendingKuickpayCheckout } from "@/lib/kuickpay-checkout-storage";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  slug: string;
  coverUrl: string;
  priceUsdCents: number;
  pricePkr: number;
  accessDurationDays: number;
  status: string;
};

type PurchasedBook = {
  bookId: string;
  status: string;
  expiresAt: Date | null;
  purchasedAt: Date | null;
  orderId: string;
};

function formatPrice(pricePkr: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(pricePkr);
}

function toDate(value: unknown): Date | null {
  if (
    value &&
    typeof value === "object" &&
    "toDate" in value &&
    typeof value.toDate === "function"
  ) {
    const date = value.toDate();

    return date instanceof Date && !Number.isNaN(date.getTime()) ? date : null;
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }

  return null;
}

function formatDate(date: Date | null) {
  if (!date) return "Not available";

  return date.toLocaleString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Karachi",
  });
}

export default function MabBooksPage() {
  const router = useRouter();
  const { user, role, loading: authLoading } = useAuth();
  // console.log(user, role, authLoading);

  const [books, setBooks] = useState<Book[]>([]);
  const [purchases, setPurchases] = useState<Record<string, PurchasedBook>>({});

  const [booksLoading, setBooksLoading] = useState(true);
  const [purchasesLoading, setPurchasesLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"newest" | "price-low" | "price-high">(
    "newest"
  );

  const [error, setError] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  const [purchaseError, setPurchaseError] = useState("");
  const [checkoutBookId, setCheckoutBookId] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchBooks = useCallback(async () => {
    setBooksLoading(true);
    setError("");

    try {
      const booksQuery = query(
        collection(db, "books"),
        where("status", "==", "published")
      );

      const snapshot = await getDocs(booksQuery);

      const result: Book[] = snapshot.docs.map((item) => {
        const data = item.data();

        return {
          id: item.id,
          title: data.title ?? "Untitled book",
          author: data.author ?? "Unknown author",
          description: data.description ?? "",
          slug: data.slug ?? item.id,
          coverUrl: data.coverUrl ?? "",
          priceUsdCents:
            typeof data.priceUsdCents === "number" ? data.priceUsdCents : 2000,
          pricePkr: typeof data.pricePkr === "number" ? data.pricePkr : 0,
          accessDurationDays:
            typeof data.accessDurationDays === "number"
              ? data.accessDurationDays
              : 90,
          status: data.status ?? "draft",
        };
      });

      result.sort((a, b) => a.title.localeCompare(b.title));
      setBooks(result);
    } catch (err) {
      console.error("Failed to fetch published books:", err);
      setError(
        "Unable to load books. Check your Firestore permissions and connection."
      );
    } finally {
      setBooksLoading(false);
    }
  }, []);

  const fetchPurchases = useCallback(async () => {
    if (!user) {
      setPurchases({});
      setPurchasesLoading(false);
      return;
    }

    setPurchasesLoading(true);
    setPurchaseError("");

    try {
      const currentUser = auth.currentUser;

      if (!currentUser || currentUser.uid !== user.uid) {
        throw new Error("Please sign in again to view your library.");
      }

      const libraryQuery = query(
        collection(db, "users", currentUser.uid, "library")
      );

      const snapshot = await getDocs(libraryQuery);
      const result: Record<string, PurchasedBook> = {};

      snapshot.docs.forEach((item) => {
        const data = item.data();

        const bookId = String(data.bookId ?? item.id);
        const expiresAt = toDate(data.expiresAt);
        const purchasedAt = toDate(data.purchasedAt);
        const status = String(data.status ?? "active").toLowerCase();

        // An expired entitlement must not be treated as readable,
        // even if its stored status has not yet changed to "expired".
        const isExpired = !expiresAt || expiresAt.getTime() <= Date.now();

        result[bookId] = {
          bookId,
          status: status === "active" && !isExpired ? "active" : "expired",
          expiresAt,
          purchasedAt,
          orderId: String(data.orderId ?? ""),
        };
      });

      setPurchases(result);
    } catch (err) {
      console.error("Failed to fetch purchased books:", err);
      setPurchaseError(
        err instanceof Error
          ? err.message
          : "Unable to load your purchased books."
      );
    } finally {
      setPurchasesLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (role === "admin") {
      router.replace("/admin/dashboard");
      return;
    }

    if (role === "publisher") {
      router.replace("/publisher/dashboard");
      return;
    }

    if (role === "user") {
      void fetchBooks();
      void fetchPurchases();
    }
  }, [authLoading, user, role, router, fetchBooks, fetchPurchases, refreshKey]);

  const filteredBooks = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    const filtered = books.filter((book) => {
      return (
        book.title.toLowerCase().includes(searchText) ||
        book.author.toLowerCase().includes(searchText) ||
        book.description.toLowerCase().includes(searchText)
      );
    });

    if (sort === "price-low") {
      filtered.sort((a, b) => a.pricePkr - b.pricePkr);
    } else if (sort === "price-high") {
      filtered.sort((a, b) => b.pricePkr - a.pricePkr);
    }

    return filtered;
  }, [books, search, sort]);

  const purchasedBooks = useMemo(() => {
    return books.filter((book) => Boolean(purchases[book.id]));
  }, [books, purchases]);

  const availableBooks = useMemo(() => {
    return filteredBooks.filter((book) => !purchases[book.id]);
  }, [filteredBooks, purchases]);

  function readBook(bookId: string) {
    router.push(`/mab/books/${encodeURIComponent(bookId)}`);
  }

  async function waitForAuthenticatedUser() {
    if (auth.currentUser) {
      return auth.currentUser;
    }

    return new Promise<import("firebase/auth").User | null>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(user);
      });
    });
  }
  async function handleBuyBook(bookId: string) {
    if (!user) {
      router.push("/login");
      return;
    }

    // Prevent accidental repurchase when a library entitlement exists.
    if (purchases[bookId]) {
      if (purchases[bookId].status === "active") {
        readBook(bookId);
      } else {
        setCheckoutError(
          "You have previously purchased this book, but its reading access has expired."
        );
      }
      return;
    }

    setCheckoutBookId(bookId);
    setCheckoutError("");
    setError("");

    try {
      const firebaseUser = await waitForAuthenticatedUser();

      if (!firebaseUser || firebaseUser.uid !== user.uid) {
        throw new Error("Please sign in again to continue.");
      }

      const idToken = await getIdToken(firebaseUser);

      const response = await fetch("/api/kuickpay/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ bookId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to start checkout.");
      }

      if (typeof data.redirectURL !== "string" || !data.redirectURL) {
        throw new Error("KuickPay did not return a checkout URL.");
      }
      savePendingKuickpayCheckout(data.orderId, data.sessionId);

      window.location.assign(data.redirectURL);
    } catch (err) {
      console.error("Book checkout failed:", err);

      setCheckoutError(
        err instanceof Error
          ? err.message
          : "Unable to start checkout. Please try again."
      );

      setCheckoutBookId(null);
    }
  }

  async function handleLogout() {
    setLoggingOut(true);

    try {
      await signOut(auth);
      router.replace("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Could not sign out. Please try again.");
      setLoggingOut(false);
    }
  }

  function refreshPage() {
    setRefreshKey((current) => current + 1);
  }

  if (authLoading || !user || role !== "user") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="h-7 w-7 animate-spin text-indigo-600" />
        <span className="ml-3 text-sm text-slate-500">
          Opening your library...
        </span>
      </main>
    );
  }

  const isLoading = booksLoading || purchasesLoading;

  return (
    <>
      <ReaderProtection />
      <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          {/* Welcome section */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-indigo-800 to-violet-700 px-6 py-9 text-white sm:px-10 sm:py-12">
            <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />
            <div className="pointer-events-none absolute -bottom-28 right-40 h-56 w-56 rounded-full bg-violet-400/20 blur-3xl" />

            <div className="relative max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-indigo-100">
                <BookOpen className="h-3.5 w-3.5" />
                YOUR READING SPACE
              </span>

              <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Welcome to your
                <span className="mt-1 block text-indigo-200">
                  personal library.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-indigo-100 sm:text-base">
                Discover new books, continue reading your purchases, and keep
                your learning journey in one place.
              </p>

              <div className="mt-7 flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5">
                  <BookMarked className="h-4 w-4" />
                  {books.length} {books.length === 1 ? "book" : "books"}{" "}
                  available
                </span>

                <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5">
                  <LibraryBig className="h-4 w-4" />
                  {purchasedBooks.length} purchased
                </span>
              </div>
            </div>
          </section>

          {/* Page feedback */}
          {(error || checkoutError || purchaseError) && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
            >
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <div className="min-w-0 flex-1">
                {checkoutError || purchaseError || error}
              </div>
              {purchaseError && (
                <button
                  type="button"
                  onClick={refreshPage}
                  className="shrink-0 font-semibold underline"
                >
                  Retry
                </button>
              )}
            </div>
          )}

          {/* Purchased books */}
          <section className="mt-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <LibraryBig className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <h2 className="text-2xl font-bold tracking-tight">
                    My purchased books
                  </h2>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  Continue reading books you already own.
                </p>
              </div>

              <button
                type="button"
                onClick={refreshPage}
                disabled={isLoading}
                className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                />
                Refresh library
              </button>
            </div>

            {isLoading ? (
              <div className="mt-5 flex min-h-40 items-center justify-center rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
                <span className="ml-3 text-sm text-slate-500">
                  Loading your library...
                </span>
              </div>
            ) : purchasedBooks.length > 0 ? (
              <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {purchasedBooks.map((book) => {
                  const purchase = purchases[book.id];
                  const active = purchase.status === "active";

                  return (
                    <article
                      key={book.id}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                    >
                      <div className="flex gap-4 p-4 sm:p-5">
                        <div className="flex h-36 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                          {book.coverUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={book.coverUrl}
                              alt={`Cover of ${book.title}`}
                              loading="lazy"
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <BookOpen className="h-10 w-10 text-slate-400" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                              active
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                                : "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300"
                            }`}
                          >
                            {active ? (
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            ) : (
                              <Clock3 className="h-3.5 w-3.5" />
                            )}
                            {active ? "Access active" : "Access expired"}
                          </span>

                          <h3 className="mt-3 line-clamp-2 font-bold leading-5">
                            {book.title}
                          </h3>

                          <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                            By {book.author}
                          </p>

                          <p className="mt-3 text-xs text-slate-500">Expires</p>
                          <p className="mt-1 text-xs font-medium text-slate-700 dark:text-slate-300">
                            {formatDate(purchase.expiresAt)}
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-slate-100 p-4 dark:border-slate-800">
                        {active ? (
                          <button
                            type="button"
                            onClick={() => readBook(book.id)}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                          >
                            <BookOpen className="h-4 w-4" />
                            Read book
                            <ArrowUpRight className="ml-auto h-4 w-4" />
                          </button>
                        ) : (
                          <div className="rounded-xl bg-slate-100 px-4 py-3 text-center text-sm font-medium text-slate-500 dark:bg-slate-800">
                            Reading access has expired
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                  <LibraryBig className="h-7 w-7" />
                </div>

                <h3 className="mt-4 font-semibold">
                  Your library is waiting for its first book
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  After a successful purchase, your book will appear here with a
                  button to open the protected reader.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("explore-books")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Explore books
                </button>
              </div>
            )}
          </section>

          {/* Explore books */}
          <section id="explore-books" className="mt-14 scroll-mt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Explore books
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Browse the published collection and find your next read.
                </p>
              </div>

              <button
                type="button"
                onClick={refreshPage}
                disabled={isLoading}
                className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by title, author, or description..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900"
                />
              </div>

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as typeof sort)}
                aria-label="Sort books"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-900"
              >
                <option value="newest">Default order</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </div>

            {booksLoading ? (
              <div className="flex min-h-64 items-center justify-center">
                <Loader2 className="h-7 w-7 animate-spin text-indigo-600" />
                <span className="ml-3 text-sm text-slate-500">
                  Loading published books...
                </span>
              </div>
            ) : availableBooks.length > 0 ? (
              <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {availableBooks.map((book) => (
                  <article
                    key={book.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-900 dark:hover:shadow-none"
                  >
                    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-100 dark:bg-slate-800">
                      {book.coverUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={book.coverUrl}
                          alt={`Cover of ${book.title}`}
                          draggable={false}
                          loading="lazy"
                          className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-3 text-slate-400">
                          <BookOpen className="h-12 w-12" />
                          <span className="text-xs">No cover available</span>
                        </div>
                      )}

                      <span className="absolute left-3 top-3 rounded-full border border-white/60 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-200">
                        Digital book
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="line-clamp-2 text-lg font-bold leading-6 text-slate-900 dark:text-white">
                        {book.title}
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        By {book.author}
                      </p>

                      <p className="mt-4 line-clamp-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {book.description ||
                          "Explore this book and its contents."}
                      </p>

                      <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
                        <div className="flex items-end justify-between gap-3">
                          <div>
                            <p className="text-xs text-slate-500">Price</p>
                            <p className="mt-1 text-2xl font-bold tracking-tight">
                              {book.pricePkr > 0
                                ? formatPrice(book.pricePkr)
                                : "Price unavailable"}
                            </p>
                          </div>

                          <span className="text-right text-xs leading-5 text-slate-500">
                            {book.accessDurationDays} days
                            <br />
                            reading access
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => void handleBuyBook(book.id)}
                          disabled={
                            checkoutBookId !== null || book.pricePkr <= 0
                          }
                          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {checkoutBookId === book.id ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Redirecting to checkout...
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="h-4 w-4" />
                              {book.pricePkr > 0
                                ? "Buy book"
                                : "Price unavailable"}
                              <ArrowUpRight className="ml-auto h-4 w-4" />
                            </>
                          )}
                        </button>
                        <PromoCodeRedeemer bookId={book.id} />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                  <BookOpen className="h-7 w-7" />
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  {search
                    ? "No matching books available to purchase"
                    : "You've explored all available books"}
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  {search
                    ? "Try another search term. Books already in your library are shown in My Purchased Books above."
                    : "Your purchased books are listed above. New published books will appear here when available."}
                </p>

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="mt-5 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </section>

          <footer className="mt-16 border-t border-slate-200 py-6 text-center text-xs text-slate-500 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => router.push("/profile")}
                className="inline-flex items-center gap-2 hover:text-indigo-600"
              >
                <UserRound className="h-4 w-4" />
                My profile
              </button>

              <button
                type="button"
                onClick={() => void handleLogout()}
                disabled={loggingOut}
                className="inline-flex items-center gap-2 hover:text-indigo-600 disabled:opacity-50"
              >
                {loggingOut ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4" />
                )}
                Sign out
              </button>
            </div>

            <p className="mt-4">E-MAB · Your digital reading library</p>
          </footer>
        </div>
      </main>
    </>
  );
}
