import { NextRequest, NextResponse } from "next/server";
import {
  buildKuickpayOrderId,
  createKuickpayCheckoutSession,
  createKuickpaySignature,
  getKuickpayConfig,
} from "@/lib/kuickpay";
import { adminAuth, adminDb } from "@/firebase/Admin";

export const runtime = "nodejs";

function logStep(
  step: string,
  startedAt: number,
  details: Record<string, unknown> = {}
) {
  console.info("[KuickPay Session]", {
    step,
    durationMs: Date.now() - startedAt,
    ...details,
  });
}

export async function POST(request: NextRequest) {
  const requestStartedAt = Date.now();
  let currentStep = "request_received";
  let orderId: string | undefined;

  try {
    console.info("[KuickPay Session] Request received", {
      method: request.method,
      path: request.nextUrl.pathname,
      timestamp: new Date().toISOString(),
    });

    // 1. Authenticate the customer.
    currentStep = "authentication";
    let stepStartedAt = Date.now();

    const authorization = request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      console.warn("[KuickPay Session] Missing bearer token");

      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    const idToken = authorization.slice("Bearer ".length);
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    logStep(currentStep, stepStartedAt, { authenticated: true });

    // 2. Read and validate the requested book.
    currentStep = "read_book";
    stepStartedAt = Date.now();

    const body = await request.json();
    const bookId = typeof body.bookId === "string" ? body.bookId.trim() : "";

    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required." },
        { status: 400 }
      );
    }

    const bookSnapshot = await adminDb.collection("books").doc(bookId).get();

    if (!bookSnapshot.exists) {
      return NextResponse.json({ error: "Book not found." }, { status: 404 });
    }

    const book = bookSnapshot.data();

    if (book?.status !== "published") {
      return NextResponse.json(
        { error: "This book is not available for purchase." },
        { status: 400 }
      );
    }

    const pricePkr = book.pricePkr;

    if (
      typeof pricePkr !== "number" ||
      !Number.isSafeInteger(pricePkr) ||
      pricePkr <= 0
    ) {
      return NextResponse.json(
        { error: "This book does not have a valid PKR price." },
        { status: 400 }
      );
    }

    logStep(currentStep, stepStartedAt, {
      bookId,
      pricePkr,
      published: true,
    });

    // 3. Generate the order and signature.
    currentStep = "prepare_order";
    stepStartedAt = Date.now();

    const config = getKuickpayConfig();

    orderId = buildKuickpayOrderId(config.prefix);
    const amount = pricePkr.toFixed(2);
    const amountPayable = amount;
    const timestamp = new Date().toISOString();

    const signature = createKuickpaySignature(
      config.companyId,
      orderId,
      amount,
      amountPayable,
      timestamp,
      config.securedKey
    );

    logStep(currentStep, stepStartedAt, {
      orderId,
      amount,
      timestamp,
      // Do not log the secured key, signature, or auth token.
    });

    // 4. Save the pending order.
    currentStep = "save_order";
    stepStartedAt = Date.now();

    const orderRef = adminDb.collection("kuickpay_orders").doc(orderId);

    await orderRef.set({
      orderId,
      userId: uid,
      bookId,
      bookTitle: book.title ?? "",
      amount: pricePkr,
      amountPayable: pricePkr,
      currency: "PKR",
      gatewayAmount: amount,
      gatewayAmountPayable: amountPayable,
      timestamp,
      signature,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    logStep(currentStep, stepStartedAt, { orderId, saved: true });

    // 5. Request a hosted checkout session.
    currentStep = "create_gateway_session";
    stepStartedAt = Date.now();

    const origin =
      process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;

    const returnUrl = `${origin}/mab/payment/return?orderId=${encodeURIComponent(
      orderId
    )}`;

    console.info("[KuickPay Session] Sending session request", {
      orderId,
      gatewayConfigured: true,
      returnUrl,
      // Never log credentials or the signature.
    });

    const session = await createKuickpayCheckoutSession({
      companyid: config.companyId,
      orderid: orderId,
      amount,
      amountPayable,
      timestamp,
      transactiondescription: `E-MAB Book — ${String(
        book.title ?? "Purchase"
      )}`,
      returnurl: returnUrl,
      signature,
    });

    logStep(currentStep, stepStartedAt, {
      orderId,
      sessionCreated: Boolean(session.sessionID),
      redirectHost: (() => {
        try {
          return new URL(session.redirectURL).host;
        } catch {
          return "invalid-url";
        }
      })(),
    });

    // 6. Save the returned session ID.
    currentStep = "update_order_session";
    stepStartedAt = Date.now();
    const sessionId = session.sessionID?.trim();
    if (!sessionId) {
      throw new Error("KuickPay did not return a valid session ID.");
    }

    await orderRef.update({
      sessionId: session.sessionID,
      updatedAt: new Date(),
    });

    logStep(currentStep, stepStartedAt, {
      orderId,
      sessionSaved: true,
    });

    logStep("request_complete", requestStartedAt, {
      orderId,
      success: true,
    });

    return NextResponse.json({
      redirectURL: session.redirectURL,
      orderId,
      sessionId: session.sessionID || sessionId,
    });
  } catch (error) {
    console.error("[KuickPay Session] Request failed", {
      step: currentStep,
      orderId,
      durationMs: Date.now() - requestStartedAt,
      error:
        error instanceof Error
          ? {
              name: error.name,
              message: error.message,
            }
          : "Unknown error",
    });

    return NextResponse.json(
      { error: "Unable to start checkout. Please try again." },
      { status: 500 }
    );
  }
}
