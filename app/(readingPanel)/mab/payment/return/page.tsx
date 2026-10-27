"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/firebase/config";
import {
  CheckCircle2,
  XCircle,
  Clock3,
  Loader2,
  BookOpen,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import {
  clearPendingKuickpayCheckout,
  loadPendingKuickpayCheckout,
  readKuickpayReturnParams,
} from "@/lib/kuickpay-checkout-storage";
import { onAuthStateChanged } from "firebase/auth";

type PaymentState = "checking" | "success" | "pending" | "failed";

type VerificationResponse = {
  status?: string;
  orderId?: string;
  bookId?: string;
  message?: string;
  error?: string;
};

function PaymentReturnContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [state, setState] = useState<PaymentState>("checking");
  const [message, setMessage] = useState(
    "We are confirming your payment with KuickPay."
  );
  const [orderId, setOrderId] = useState("");
  const [bookId, setBookId] = useState("");
  const [retrying, setRetrying] = useState(false);

  const startedRef = useRef(false);

  const returnedParams = readKuickpayReturnParams(
    new URLSearchParams(searchParams.toString())
  );

  const returnedOrderId = returnedParams.orderId || "";

  const returnedStatus = returnedParams.returnStatus.toLowerCase();

  const pendingCheckout = loadPendingKuickpayCheckout();

  const orderIdToVerify = returnedOrderId || pendingCheckout?.orderId || "";

  const sessionId =
    returnedParams.sessionId || pendingCheckout?.sessionId || "";

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
  async function verifyPayment(
    currentOrderId: string,
    currentSessionId: string,
    gatewayStatus = ""
  ) {
    setRetrying(true);
    setState("checking");
    setMessage("Verifying your payment securely with KuickPay.");

    try {
      const firebaseUser = await waitForAuthenticatedUser();

      if (!firebaseUser) {
        setState("pending");
        setMessage(
          "Please sign in with the same account you used to purchase this book, then return to verify your payment."
        );
        return;
      }

      const idToken = await firebaseUser.getIdToken();
      console.log("verifying");
      const response = await fetch("/api/kuickpay/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          orderId: currentOrderId,
          ...(currentSessionId ? { sessionId: currentSessionId } : {}),
          returnedStatus: gatewayStatus,
        }),
        cache: "no-store",
      });

      const data = (await response.json()) as VerificationResponse;

      if (!response.ok) {
        throw new Error(data.error || "Payment verification failed.");
      }

      setBookId(data.bookId || "");

      if (data.status === "paid") {
        clearPendingKuickpayCheckout();

        setState("success");
        setMessage(
          "Your payment has been confirmed. Your purchased book is now available in My Library."
        );
      } else if (data.status === "failed" || data.status === "cancelled") {
        setState("failed");
        setMessage(
          data.message || "The payment was not completed. You can try again."
        );
      } else {
        setState("pending");
        setMessage(
          data.message ||
            "KuickPay has not confirmed this payment yet. Please retry verification shortly."
        );
      }
    } catch (error) {
      console.error("Payment return verification failed:", error);
      setState("pending");
      setMessage(
        error instanceof Error
          ? error.message
          : "We could not verify your payment. Please try again."
      );
    } finally {
      setRetrying(false);
    }
  }

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    setOrderId(orderIdToVerify);

    if (!orderIdToVerify) {
      setState("pending");
      setMessage(
        "The order reference is missing. Please contact support with your payment details."
      );
      return;
    }

    void verifyPayment(orderIdToVerify, sessionId, returnedStatus);
  }, [orderIdToVerify, sessionId, returnedStatus]);

  async function handleRetry() {
    if (!orderIdToVerify) {
      setMessage("The order reference is missing. Please contact support.");
      return;
    }

    await verifyPayment(orderIdToVerify, sessionId, returnedStatus);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 text-slate-900 dark:bg-slate-950 dark:text-white">
      <section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:p-10">
        <div className="flex flex-col items-center text-center">
          {state === "checking" && (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
          )}

          {state === "success" && (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
              <CheckCircle2 className="h-9 w-9 text-green-600" />
            </div>
          )}

          {state === "pending" && (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950">
              <Clock3 className="h-9 w-9 text-amber-600" />
            </div>
          )}

          {state === "failed" && (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
              <XCircle className="h-9 w-9 text-red-600" />
            </div>
          )}

          <h1 className="mt-6 text-2xl font-bold tracking-tight">
            {state === "checking" && "Verifying payment"}
            {state === "success" && "Payment successful"}
            {state === "pending" && "Payment pending"}
            {state === "failed" && "Payment not completed"}
          </h1>

          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">
            {message}
          </p>

          {orderId && (
            <div className="mt-6 w-full rounded-xl bg-slate-50 p-4 text-left dark:bg-slate-800">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Order reference
              </p>
              <p className="mt-1 break-all text-sm font-semibold">{orderId}</p>
            </div>
          )}

          <div className="mt-7 flex w-full flex-col gap-3">
            {state === "success" && (
              <button
                type="button"
                onClick={() => router.push("/mab/library")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                <BookOpen className="h-5 w-5" />
                Go to My Library
              </button>
            )}

            {(state === "pending" || state === "failed") && (
              <button
                type="button"
                onClick={() => void handleRetry()}
                disabled={retrying}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {retrying ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <RefreshCw className="h-5 w-5" />
                )}
                Retry verification
              </button>
            )}

            <button
              type="button"
              onClick={() => router.push("/mab")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to books
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function PaymentReturnPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
          <Loader2 className="h-7 w-7 animate-spin text-indigo-600" />
          <span className="ml-3 text-sm text-slate-500">
            Loading payment status...
          </span>
        </main>
      }
    >
      <PaymentReturnContent />
    </Suspense>
  );
}
