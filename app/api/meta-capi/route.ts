import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.replace(/[^0-9]/g, "");
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;

// Optional: set this only while testing in Events Manager.
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;

const ALLOWED_EVENTS = new Set([
  "PageView",
  "ViewContent",
  "Lead",
  "CompleteRegistration",
  "AddToCart",
  "InitiateCheckout",
  "Purchase",
]);

const MAX_REQUESTS_PER_MINUTE = 60;
const requestWindows = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(request: NextRequest) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const current = requestWindows.get(key);
  if (!current || current.resetAt <= now) {
    requestWindows.set(key, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS_PER_MINUTE;
}

function allowedOrigins() {
  return [process.env.SITE_URL, ...(process.env.META_CAPI_ALLOWED_ORIGINS ?? "").split(",")]
    .filter((origin): origin is string => Boolean(origin?.trim()))
    .map((origin) => new URL(origin.trim()).origin);
}

function sanitizeCustomData(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  const data = value as Record<string, unknown>;
  const output: Record<string, string | number | boolean> = {};
  const allowedKeys = new Set(["content_name", "content_category", "value", "currency", "num_items"]);

  for (const [key, item] of Object.entries(data)) {
    if (!allowedKeys.has(key)) continue;
    if (typeof item === "string" && item.length <= 100) output[key] = item;
    if (typeof item === "number" && Number.isFinite(item)) output[key] = item;
    if (typeof item === "boolean") output[key] = item;
  }
  if (typeof output.currency === "string" && !/^[A-Z]{3}$/.test(output.currency)) {
    delete output.currency;
  }
  return Object.keys(output).length ? output : undefined;
}

export async function POST(request: NextRequest) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return NextResponse.json(
      { error: "Meta CAPI is not configured" },
      { status: 500 }
    );
  }

  if (isRateLimited(request)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await request.json();

    const { eventName, eventId, eventSourceUrl, customData, consent } = body;

    if (
      typeof eventName !== "string" ||
      !ALLOWED_EVENTS.has(eventName) ||
      typeof eventId !== "string" ||
      !/^[a-zA-Z0-9_-]{1,100}$/.test(eventId) ||
      typeof eventSourceUrl !== "string" ||
      eventSourceUrl.length > 2_048 ||
      consent !== true
    ) {
      return NextResponse.json(
        { error: "Invalid event payload" },
        { status: 400 }
      );
    }

    // Only allow URLs belonging to your own website.
    if (!process.env.SITE_URL) {
      return NextResponse.json(
        { error: "SITE_URL is not configured" },
        { status: 500 }
      );
    }

    const source = new URL(eventSourceUrl);
    if (!['http:', 'https:'].includes(source.protocol) || !allowedOrigins().includes(source.origin)) {
      return NextResponse.json(
        { error: "Invalid event source URL" },
        { status: 400 }
      );
    }

    const fbp = request.cookies.get("_fbp")?.value;
    const fbc = request.cookies.get("_fbc")?.value;
    const userAgent = request.headers.get("user-agent");

    const userData: Record<string, string> = {};

    if (fbp) userData.fbp = fbp;
    if (fbc) userData.fbc = fbc;
    if (userAgent) userData.client_user_agent = userAgent;

    const event: Record<string, unknown> = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      event_source_url: source.toString(),
      action_source: "website",
      user_data: userData,
    };

    const sanitizedCustomData = sanitizeCustomData(customData);
    if (sanitizedCustomData) event.custom_data = sanitizedCustomData;

    const payload: Record<string, unknown> = {
      data: [event],
    };

    if (TEST_EVENT_CODE) {
      payload.test_event_code = TEST_EVENT_CODE;
    }

    const response = await fetch(
      `https://graph.facebook.com/v23.0/${PIXEL_ID}/events?access_token=${encodeURIComponent(
        ACCESS_TOKEN
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Meta CAPI error:", result);

      return NextResponse.json(
        { error: "Meta rejected the event" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request or Meta API failure" },
      { status: 400 }
    );
  }
}
