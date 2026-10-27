"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getIdToken } from "firebase/auth";
import { auth } from "@/firebase/config";

type PromoCodeRedeemerProps = {
  bookId: string;
};

type RedeemResponse = {
  success?: boolean;
  message?: string;
  expiresAt?: string;
  alreadyHasAccess?: boolean;
};

export default function PromoCodeRedeemer({ bookId }: PromoCodeRedeemerProps) {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setSuccess(false);

    const user = auth.currentUser;

    if (!user) {
      setMessage("Please sign in before applying a promo code.");
      return;
    }

    const trimmedCode = code.trim();

    if (!trimmedCode) {
      setMessage("Enter your promo code.");
      return;
    }

    setLoading(true);

    try {
      const token = await getIdToken(user);

      const response = await fetch("/api/promo-codes/redeem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code: trimmedCode,
          bookId,
        }),
      });

      const data = (await response.json()) as RedeemResponse;

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to apply promo code.");
      }

      setSuccess(true);
      setMessage(
        data.alreadyHasAccess
          ? "You already have access to this book."
          : `Free access activated until ${
              data.expiresAt
                ? new Date(data.expiresAt).toLocaleDateString("en-PK", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "the expiry date"
            }.`
      );

      setCode("");

      // Refresh the current page, then send the student to My Library.
      router.refresh();
      window.setTimeout(() => {
        router.push("/mab/library");
      }, 1200);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4 rounded-xl border border-gray-200 p-4 dark:border-gray-700">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
        Have a free-access promo code?
      </h3>

      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Redeem your code to unlock this book for 90 days.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-3 flex flex-col gap-2 sm:flex-row"
      >
        <label htmlFor={`promo-${bookId}`} className="sr-only">
          Promo code
        </label>

        <input
          id={`promo-${bookId}`}
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Enter promo code"
          autoComplete="off"
          maxLength={80}
          disabled={loading}
          className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />

        <button
          type="submit"
          disabled={loading || !code.trim()}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Applying..." : "Apply code"}
        </button>
      </form>

      {message && (
        <p
          role="status"
          aria-live="polite"
          className={`mt-3 text-sm ${
            success ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
