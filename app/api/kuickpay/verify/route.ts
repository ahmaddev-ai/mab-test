import { NextRequest, NextResponse } from "next/server";
import {
  getKuickpayConfig,
  verifyKuickpayPaymentStatus,
  isKuickpayPaymentSuccessful,
} from "@/lib/kuickpay";
import { adminAuth, adminDb } from "@/firebase/Admin";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate the customer.
    const authorization = request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    const token = authorization.slice("Bearer ".length);
    const decodedToken = await adminAuth.verifyIdToken(token);
    const uid = decodedToken.uid;

    // 2. Validate the request.
    const body = await request.json();

    const orderId = typeof body.orderId === "string" ? body.orderId.trim() : "";

    const sessionId =
      typeof body.sessionId === "string" ? body.sessionId.trim() : "";

    if (!orderId || !sessionId) {
      return NextResponse.json(
        { error: "Order ID and session ID are required." },
        { status: 400 }
      );
    }

    const orderRef = adminDb.collection("kuickpay_orders").doc(orderId);
    const orderSnapshot = await orderRef.get();

    if (!orderSnapshot.exists) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    const order = orderSnapshot.data()!;

    if (order.userId !== uid) {
      return NextResponse.json(
        { error: "You are not authorized to verify this order." },
        { status: 403 }
      );
    }

    if (
      order.orderId !== orderId ||
      order.sessionId !== sessionId ||
      typeof order.bookId !== "string" ||
      !order.bookId
    ) {
      return NextResponse.json(
        { error: "Order, session, or book details do not match." },
        { status: 400 }
      );
    }

    if (order.status !== "pending" && order.status !== "paid") {
      return NextResponse.json({
        status: order.status,
        orderId,
        message: "This order cannot be verified.",
      });
    }

    // 3. Verify pending payments with KuickPay.
    // Never trust the browser's return URL as proof of payment.
    if (order.status === "pending") {
      const config = getKuickpayConfig();

      const gatewayResponse = await verifyKuickpayPaymentStatus({
        companyid: config.companyId,
        orderid: order.orderId,
        sessionid: order.sessionId,
        amount: order.gatewayAmount,
        amountpayable: order.gatewayAmountPayable,
        timestamp: order.timestamp,
        signature: order.signature,
      });

      if (!isKuickpayPaymentSuccessful(gatewayResponse)) {
        return NextResponse.json({
          status: "pending",
          orderId,
          bookId: order.bookId,
          message: "KuickPay has not confirmed this payment yet.",
        });
      }
    }

    // 4. Prepare references for the library entitlement.
    const bookId = order.bookId as string;

    const bookRef = adminDb.collection("books").doc(bookId);

    const libraryRef = adminDb
      .collection("users")
      .doc(uid)
      .collection("library")
      .doc(bookId);

    // 5. Mark paid and grant access atomically.
    const result = await adminDb.runTransaction(async (transaction) => {
      // Firestore transaction reads must happen before writes.
      const [freshOrderSnapshot, bookSnapshot, librarySnapshot] =
        await Promise.all([
          transaction.get(orderRef),
          transaction.get(bookRef),
          transaction.get(libraryRef),
        ]);

      if (!freshOrderSnapshot.exists) {
        throw new Error("Order no longer exists.");
      }

      const freshOrder = freshOrderSnapshot.data()!;

      if (
        freshOrder.userId !== uid ||
        freshOrder.orderId !== orderId ||
        freshOrder.sessionId !== sessionId ||
        freshOrder.bookId !== bookId
      ) {
        throw new Error("Order validation failed.");
      }

      if (freshOrder.status !== "pending" && freshOrder.status !== "paid") {
        return {
          status: String(freshOrder.status),
          accessGranted: false,
        };
      }

      if (!bookSnapshot.exists) {
        throw new Error("The purchased book no longer exists.");
      }

      const book = bookSnapshot.data()!;
      const accessDurationDays = book.accessDurationDays;

      if (
        typeof accessDurationDays !== "number" ||
        !Number.isSafeInteger(accessDurationDays) ||
        accessDurationDays <= 0
      ) {
        throw new Error("The book has an invalid access duration.");
      }

      // If access already exists, do not reset its expiry.
      if (librarySnapshot.exists) {
        if (freshOrder.status === "pending") {
          transaction.update(orderRef, {
            status: "paid",
            verifiedAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
          });
        }

        return { status: "paid", accessGranted: true };
      }

      // Reuse the original verification time when repairing an
      // already-paid order. Otherwise use the current time.
      const verifiedAt = freshOrder.verifiedAt;

      const purchasedAt =
        verifiedAt instanceof Timestamp ? verifiedAt.toDate() : new Date();

      const expiresAt = new Date(
        purchasedAt.getTime() + accessDurationDays * 24 * 60 * 60 * 1000
      );

      if (freshOrder.status === "pending") {
        transaction.update(orderRef, {
          status: "paid",
          verifiedAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        });
      }

      transaction.set(libraryRef, {
        bookId,
        bookTitle: freshOrder.bookTitle || book.title || "Untitled book",
        orderId,
        purchasePricePkr: freshOrder.amount,
        currency: freshOrder.currency || "PKR",
        purchasedAt: Timestamp.fromDate(purchasedAt),
        expiresAt: Timestamp.fromDate(expiresAt),
        accessDurationDays,
        status: "active",
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });

      return { status: "paid", accessGranted: true };
    });

    if (result.status !== "paid" || !result.accessGranted) {
      return NextResponse.json({
        status: result.status,
        orderId,
        bookId,
        message: "Payment has not been confirmed as paid.",
      });
    }

    return NextResponse.json({
      status: "paid",
      orderId,
      bookId,
      message: "Payment verified and book access granted.",
    });
  } catch (error) {
    console.error("KuickPay verification failed:", error);

    return NextResponse.json(
      { error: "Unable to verify payment. Please try again." },
      { status: 500 }
    );
  }
}
