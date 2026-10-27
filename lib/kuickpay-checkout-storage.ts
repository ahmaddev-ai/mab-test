const STORAGE_KEY = "emab_pending_kuickpay_checkout";
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

export type PendingKuickpayCheckout = {
  orderId: string;
  sessionId: string;
  savedAt: number;
};

export function savePendingKuickpayCheckout(
  orderId: string,
  sessionId: string
): void {
  if (typeof window === "undefined") return;
  if (!orderId.trim() || !sessionId.trim()) return;

  const payload: PendingKuickpayCheckout = {
    orderId: orderId.trim(),
    sessionId: sessionId.trim(),
    savedAt: Date.now(),
  };

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function loadPendingKuickpayCheckout(): PendingKuickpayCheckout | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as PendingKuickpayCheckout;

    if (
      typeof parsed.orderId !== "string" ||
      !parsed.orderId.trim() ||
      typeof parsed.sessionId !== "string" ||
      !parsed.sessionId.trim() ||
      typeof parsed.savedAt !== "number"
    ) {
      return null;
    }

    const age = Date.now() - parsed.savedAt;

    if (age < 0 || age > MAX_AGE_MS) {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return {
      ...parsed,
      orderId: parsed.orderId.trim(),
      sessionId: parsed.sessionId.trim(),
    };
  } catch {
    return null;
  }
}

export function clearPendingKuickpayCheckout(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}

export function readKuickpayReturnParams(searchParams: URLSearchParams): {
  orderId: string | null;
  sessionId: string | null;
  returnStatus: string;
} {
  const values = new Map<string, string>();

  searchParams.forEach((value, key) => {
    values.set(key.toLowerCase(), value.trim());
  });

  const pick = (keys: string[]): string | null => {
    for (const key of keys) {
      const value = values.get(key.toLowerCase());
      if (value) return value;
    }
    return null;
  };

  return {
    orderId: pick([
      "orderid",
      "order_id",
      "merchantorderid",
      "merchant_order_id",
    ]),
    sessionId: pick(["sessionid", "session_id", "checkoutsessionid"]),
    returnStatus: pick(["status", "paymentstatus", "payment_status"]) || "",
  };
}
