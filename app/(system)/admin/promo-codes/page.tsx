"use client";

import { useCallback, useEffect, useState, FormEvent } from "react";
import { getIdToken } from "firebase/auth";
import { auth, db } from "@/firebase/config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

type Book = {
  id: string;
  title: string;
};

type PromoCode = {
  id: string;
  code: string;
  status: string;
  bookIds: string[];
  accessDurationDays: number;
  maxRedemptions: number;
  redemptionCount: number;
  expiresAt: string | null;
  createdAt: string | null;
};

function dateLabel(value: string | null) {
  if (!value) return "Not available";
  return new Date(value).toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminPromoCodesPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [promos, setPromos] = useState<PromoCode[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [code, setCode] = useState("");
  const [maxRedemptions, setMaxRedemptions] = useState("50");
  const [expiresAt, setExpiresAt] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [busyCode, setBusyCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const requestApi = useCallback(
    async (url: string, options: RequestInit = {}) => {
      const user = auth.currentUser;

      if (!user) throw new Error("Please sign in again.");

      const token = await getIdToken(user);

      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Request failed.");
      }

      return data;
    },
    []
  );

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [promoData, bookSnapshot] = await Promise.all([
        requestApi("/api/admin/promo-codes"),
        getDocs(query(collection(db, "books"), orderBy("title", "asc"))),
      ]);

      setPromos(promoData.promoCodes as PromoCode[]);

      setBooks(
        bookSnapshot.docs
          .filter((item) => item.data().status === "published")
          .map((item) => ({
            id: item.id,
            title: String(item.data().title || "Untitled book"),
          }))
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load management page."
      );
    } finally {
      setLoading(false);
    }
  }, [requestApi]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  function toggleBook(bookId: string) {
    setSelectedBooks((previous) =>
      previous.includes(bookId)
        ? previous.filter((id) => id !== bookId)
        : [...previous, bookId]
    );
  }

  async function createPromo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (selectedBooks.length === 0) {
      setError("Select at least one book.");
      return;
    }

    if (!expiresAt || new Date(expiresAt).getTime() <= Date.now()) {
      setError("Choose a future expiry date and time.");
      return;
    }

    setSaving(true);

    try {
      const result = await requestApi("/api/admin/promo-codes", {
        method: "POST",
        body: JSON.stringify({
          code,
          bookIds: selectedBooks,
          maxRedemptions: Number(maxRedemptions),
          expiresAt: new Date(expiresAt).toISOString(),
        }),
      });

      setMessage(`Promo code ${result.code} created successfully.`);
      setCode("");
      setSelectedBooks([]);
      setMaxRedemptions("50");
      setExpiresAt("");
      await loadData();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not create promo code."
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(promo: PromoCode) {
    const nextStatus = promo.status === "active" ? "inactive" : "active";

    setBusyCode(promo.id);
    setError("");
    setMessage("");

    try {
      await requestApi(
        `/api/admin/promo-codes/${encodeURIComponent(promo.id)}`,
        {
          method: "PATCH",
          body: JSON.stringify({ status: nextStatus }),
        }
      );

      setMessage(`Promo code ${promo.code} is now ${nextStatus}.`);
      await loadData();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not update promo code."
      );
    } finally {
      setBusyCode("");
    }
  }

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
          E-MAB Administration
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
          Promo Code Management
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Create shared free-access codes and manage their redemption limits.
        </p>
      </header>

      {message && (
        <div
          role="status"
          className="rounded-lg bg-green-50 p-3 text-sm text-green-800"
        >
          {message}
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Create shared promo code
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Every successful redemption grants 90 days of access to one selected
          book.
        </p>

        <form onSubmit={createPromo} className="mt-6 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="promo-code"
                className="mb-2 block text-sm font-medium"
              >
                Promo code
              </label>
              <input
                id="promo-code"
                required
                minLength={4}
                maxLength={40}
                pattern="[A-Za-z0-9_-]+"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="STUDENT-FREE-2026"
                className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="promo-limit"
                className="mb-2 block text-sm font-medium"
              >
                Maximum redemptions
              </label>
              <input
                id="promo-limit"
                required
                type="number"
                min={1}
                max={100000}
                value={maxRedemptions}
                onChange={(e) => setMaxRedemptions(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="promo-expiry"
              className="mb-2 block text-sm font-medium"
            >
              Promo code expiry
            </label>
            <input
              id="promo-expiry"
              required
              type="datetime-local"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 outline-none focus:border-indigo-500 sm:max-w-md"
            />
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium">Select eligible books</h3>
            <div className="max-h-64 space-y-2 overflow-y-auto rounded-lg border border-gray-200 p-3 dark:border-gray-800">
              {books.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No published books found.
                </p>
              ) : (
                books.map((book) => (
                  <label
                    key={book.id}
                    className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBooks.includes(book.id)}
                      onChange={() => toggleBook(book.id)}
                      className="size-4 accent-indigo-600"
                    />
                    <span className="text-sm">{book.title}</span>
                  </label>
                ))
              )}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Selected: {selectedBooks.length} book(s). Access duration is fixed
              at 90 days.
            </p>
          </div>

          <button
            type="submit"
            disabled={saving || loading}
            className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? "Creating..." : "Create promo code"}
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Existing promo codes
          </h2>
          <button
            type="button"
            onClick={() => void loadData()}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="py-8 text-sm text-gray-500">Loading promo codes...</p>
        ) : promos.length === 0 ? (
          <p className="py-8 text-sm text-gray-500">
            No promo codes created yet.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {promos.map((promo) => {
              const remaining = Math.max(
                0,
                promo.maxRedemptions - promo.redemptionCount
              );
              const expired =
                !promo.expiresAt ||
                new Date(promo.expiresAt).getTime() <= Date.now();
              const active =
                promo.status === "active" && !expired && remaining > 0;

              return (
                <article
                  key={promo.id}
                  className="rounded-xl border border-gray-200 p-4 dark:border-gray-800"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <code className="rounded bg-gray-100 px-2 py-1 font-semibold dark:bg-gray-800">
                          {promo.code}
                        </code>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            active
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {expired
                            ? "Expired"
                            : remaining === 0
                            ? "Limit reached"
                            : promo.status}
                        </span>
                      </div>

                      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                        Duration: {promo.accessDurationDays} days
                      </p>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Redemptions: {promo.redemptionCount} /{" "}
                        {promo.maxRedemptions}
                      </p>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Remaining: {remaining}
                      </p>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Eligible books: {promo.bookIds.length}
                      </p>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Code expires: {dateLabel(promo.expiresAt)}
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={
                        busyCode === promo.id || expired || remaining === 0
                      }
                      onClick={() => void toggleStatus(promo)}
                      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {busyCode === promo.id
                        ? "Updating..."
                        : promo.status === "active"
                        ? "Deactivate"
                        : "Activate"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
