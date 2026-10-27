"use client";

export type MetaEventName = "PageView" | "ViewContent" | "Lead" | "CompleteRegistration" | "AddToCart" | "InitiateCheckout" | "Purchase";

declare global {
  interface Navigator {
    globalPrivacyControl?: boolean;
  }
  interface Window {
    fbq?: (...args: unknown[]) => void;
    /** Set by the site's consent manager when consent is required. */
    __metaTrackingConsent?: boolean;
  }
}

const CONSENT_COOKIE = "meta_tracking_consent";

/** Respects a required consent setting and Global Privacy Control. */
export function canTrackMetaEvents() {
  if (typeof window === "undefined") return false;
  if (process.env.NEXT_PUBLIC_META_REQUIRE_CONSENT !== "true") return true;
  if (navigator.globalPrivacyControl || window.__metaTrackingConsent === false) return false;
  if (window.__metaTrackingConsent === true) return true;

  const cookieConsent = document.cookie.split("; ").find((entry) => entry.startsWith(`${CONSENT_COOKIE}=`))?.split("=")[1];
  return cookieConsent === "granted" || window.localStorage.getItem(CONSENT_COOKIE) === "granted";
}

function createEventId() {
  return typeof crypto?.randomUUID === "function" ? crypto.randomUUID() : `meta_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
}

/** Sends one browser Pixel event and its CAPI counterpart with the same ID. */
export function trackMetaEvent(eventName: MetaEventName, params: Record<string, unknown> = {}) {
  if (!canTrackMetaEvents()) return undefined;

  const eventId = createEventId();
  window.fbq?.("track", eventName, params, { eventID: eventId });
  void fetch("/api/meta-capi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    keepalive: true,
    body: JSON.stringify({ eventName, eventId, eventSourceUrl: window.location.href, customData: params, consent: true }),
  }).catch(() => {
    // Browser Pixel delivery must not be affected by a CAPI network failure.
  });
  return eventId;
}
