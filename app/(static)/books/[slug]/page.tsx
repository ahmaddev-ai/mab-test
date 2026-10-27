"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getIdToken } from "firebase/auth";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  LockKeyhole,
  ShoppingBag,
} from "lucide-react";
import { auth, db } from "@/firebase/config";
import { useAuth } from "@/context/Auth";
import ReaderProtection from "@/components/panel/ReaderProtection";
import { savePendingKuickpayCheckout } from "@/lib/kuickpay-checkout-storage";

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

export default function BookDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = decodeURIComponent(String(params.slug || ""));
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;

    async function loadBook() {
      setLoading(true);
      setError("");

      try {
        let found: Book | null = null;

        // First look up the public slug.
        const slugQuery = query(
          collection(db, "books"),
          where("slug", "==", slug),
          where("status", "==", "published")
        );

        const slugSnapshot = await getDocs(slugQuery);

        if (!slugSnapshot.empty) {
          const item = slugSnapshot.docs[0];
          const data = item.data();

          found = {
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
        } else {
          // Fallback for older links that use the Firestore document ID.
          const directSnapshot = await getDoc(doc(db, "books", slug));

          if (
            directSnapshot.exists() &&
            directSnapshot.data().status === "published"
          ) {
            const data = directSnapshot.data();

            found = {
              id: directSnapshot.id,
              title: String(data.title || "Untitled book"),
              author: String(data.author || "E-MAB"),
              description: String(data.description || ""),
              slug: String(data.slug || directSnapshot.id),
              coverUrl: String(data.coverUrl || ""),
              pricePkr: typeof data.pricePkr === "number" ? data.pricePkr : 0,
              accessDurationDays:
                typeof data.accessDurationDays === "number"
                  ? data.accessDurationDays
                  : 90,
            };
          }
        }

        if (!found) {
          if (!cancelled) setError("This book could not be found.");
          return;
        }

        if (!cancelled) setBook(found);
      } catch (err) {
        console.error("Book detail loading failed:", err);
        if (!cancelled) {
          setError("Unable to load this book. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadBook();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (authLoading || !user || !book) {
      setHasAccess(false);
      return;
    }

    let cancelled = false;

    async function checkAccess() {
      try {
        const libraryRef = doc(db, "users", user!.uid, "library", book!.id);
        const librarySnap = await getDoc(libraryRef);

        if (!librarySnap.exists()) {
          if (!cancelled) setHasAccess(false);
          return;
        }

        const entitlement = librarySnap.data();
        const expiryValue = entitlement.expiresAt;
        const expiry =
          expiryValue && typeof expiryValue.toDate === "function"
            ? expiryValue.toDate()
            : expiryValue instanceof Date
            ? expiryValue
            : null;

        const active =
          entitlement.status === "active" &&
          expiry !== null &&
          expiry.getTime() > Date.now();

        if (!cancelled) setHasAccess(active);
      } catch (err) {
        console.error("Access check failed:", err);
        if (!cancelled) setHasAccess(false);
      }
    }

    void checkAccess();

    return () => {
      cancelled = true;
    };
  }, [user, authLoading, book]);

  async function handleCheckout() {
    if (!book) return;

    if (!user) {
      router.push(
        `/login?redirect=${encodeURIComponent(`/books/${book.slug}`)}`
      );
      return;
    }

    if (hasAccess) {
      router.push(`/mab/books/${encodeURIComponent(book.id)}`);
      return;
    }

    if (book.pricePkr <= 0) {
      setCheckoutError("The price for this book is currently unavailable.");
      return;
    }

    setCheckoutLoading(true);
    setCheckoutError("");

    try {
      const currentUser = auth.currentUser;

      if (!currentUser || currentUser.uid !== user.uid) {
        throw new Error("Please sign in again to continue.");
      }

      const token = await getIdToken(currentUser);

      const response = await fetch("/api/kuickpay/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId: book.id }),
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
          : "Checkout failed. Please try again."
      );
      setCheckoutLoading(false);
    }
  }

  if (loading || authLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center gap-3 pt-20">
        <LoaderCircle className="animate-spin text-indigo-600" size={26} />
        <span className="text-sm text-slate-500">Loading book details...</span>
      </main>
    );
  }

  if (error || !book) {
    return (
      <main className="mx-auto min-h-[70vh] max-w-3xl px-5 py-32 text-center">
        <BookOpen className="mx-auto text-slate-400" size={44} />
        <h1 className="mt-5 text-2xl font-bold">Book unavailable</h1>
        <p className="mt-3 text-slate-500">
          {error || "This book is not available."}
        </p>
        <Link
          href="/books"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white"
        >
          <ArrowLeft size={17} />
          Browse books
        </Link>
      </main>
    );
  }

  return (
    <>
      <ReaderProtection />
      <main className="min-h-screen bg-white pb-20 pt-28 text-slate-900 dark:bg-[#080B14] dark:text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <ArrowLeft size={16} />
            Back to all books
          </Link>

          <section className="mt-8 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-indigo-50 p-8 dark:border-white/10 dark:from-white/5 dark:to-indigo-950/30 sm:min-h-[500px]">
              {book.coverUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={book.coverUrl}
                  alt={`Cover of ${book.title}`}
                  className="max-h-[480px] w-full object-contain drop-shadow-xl"
                />
              ) : (
                <BookOpen size={90} className="text-slate-400" />
              )}
            </div>

            <div className="flex flex-col justify-center py-2">
              <span className="w-fit rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-300">
                E-MAB Digital Book
              </span>

              <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                {book.title}
              </h1>

              <p className="mt-4 text-base text-slate-500 dark:text-slate-400">
                By {book.author}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm dark:border-white/10">
                  <Clock3 className="text-indigo-600" size={17} />
                  {book.accessDurationDays} days access
                </span>
                <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm dark:border-white/10">
                  <LockKeyhole className="text-indigo-600" size={17} />
                  Protected reader
                </span>
              </div>

              <div className="mt-8 border-y border-slate-200 py-6 dark:border-white/10">
                <p className="text-sm text-slate-500">Book price</p>
                <p className="mt-1 text-4xl font-bold">
                  {book.pricePkr > 0
                    ? formatPrice(book.pricePkr)
                    : "Price unavailable"}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Secure checkout powered by KuickPay.
                </p>
              </div>

              {hasAccess ? (
                <Link
                  href={`/mab/books/${encodeURIComponent(book.id)}`}
                  className="mt-7 inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-emerald-600 px-6 py-4 font-semibold text-white transition hover:bg-emerald-700"
                >
                  <CheckCircle2 size={19} />
                  Read this book
                  <ArrowRight className="ml-auto" size={18} />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => void handleCheckout()}
                  disabled={checkoutLoading || book.pricePkr <= 0}
                  className="mt-7 inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-indigo-600 px-6 py-4 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {checkoutLoading ? (
                    <LoaderCircle className="animate-spin" size={19} />
                  ) : (
                    <ShoppingBag size={19} />
                  )}
                  {checkoutLoading
                    ? "Connecting to KuickPay..."
                    : book.pricePkr > 0
                    ? "Buy Now"
                    : "Price unavailable"}
                  {!checkoutLoading && (
                    <ArrowRight className="ml-auto" size={18} />
                  )}
                </button>
              )}

              {checkoutError && (
                <p role="alert" className="mt-4 text-sm text-red-600">
                  {checkoutError}
                </p>
              )}

              {!user && (
                <p className="mt-3 text-sm text-slate-500">
                  You will need to sign in before checkout.
                </p>
              )}
            </div>
          </section>

          <section className="mt-16 max-w-4xl border-t border-slate-200 pt-10 dark:border-white/10">
            <h2 className="text-2xl font-bold">About this book</h2>
            <p className="mt-5 whitespace-pre-line text-base leading-8 text-slate-600 dark:text-slate-300">
              {book.description || "Book description coming soon."}
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
