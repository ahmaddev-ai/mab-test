
import { NextRequest, NextResponse } from "next/server";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { adminAuth, adminDb } from "@/firebase/Admin";

export const runtime = "nodejs";

const MAX_CODE_LENGTH = 80;

function jsonError(message: string, status: number) {
  return NextResponse.json({ success: false, message }, { status });
}

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate the student.
    const authorization = request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return jsonError("Please sign in to redeem a promo code.", 401);
    }

    const idToken = authorization.slice("Bearer ".length);
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // 2. Validate the request body.
    const body = await request.json().catch(() => null);

    const rawCode =
      typeof body?.code === "string" ? body.code.trim() : "";
    const bookId =
      typeof body?.bookId === "string" ? body.bookId.trim() : "";

    if (
      !rawCode ||
      rawCode.length > MAX_CODE_LENGTH ||
      !/^[A-Za-z0-9_-]+$/.test(rawCode)
    ) {
      return jsonError("Enter a valid promo code.", 400);
    }

    if (
      !bookId ||
      bookId.length > 150 ||
      bookId.includes("/")
    ) {
      return jsonError("Invalid book selection.", 400);
    }

    const normalizedCode = rawCode.toUpperCase();

    // Promo document IDs are stored in uppercase.
    const promoRef = adminDb.collection("promoCodes").doc(normalizedCode);
    const bookRef = adminDb.collection("books").doc(bookId);
    const libraryRef = adminDb
      .collection("users")
      .doc(uid)
      .collection("library")
      .doc(bookId);

    // One redemption per student per book for this promo.
    const redemptionRef = promoRef
      .collection("redemptions")
      .doc(uid)
      .collection("books")
      .doc(bookId);

    const result = await adminDb.runTransaction(async (transaction) => {
      // All reads happen before writes.
      const [promoSnap, bookSnap, librarySnap, redemptionSnap] =
        await Promise.all([
          transaction.get(promoRef),
          transaction.get(bookRef),
          transaction.get(libraryRef),
          transaction.get(redemptionRef),
        ]);

      if (!promoSnap.exists) {
        throw new Error("INVALID_PROMO");
      }

      const promo = promoSnap.data()!;

      if (
        promo.code !== normalizedCode ||
        promo.type !== "free_access" ||
        promo.status !== "active"
      ) {
        throw new Error("PROMO_INACTIVE");
      }

      const now = Timestamp.now();
      const promoExpiry = promo.expiresAt;

      if (
        !(promoExpiry instanceof Timestamp) ||
        promoExpiry.toMillis() <= now.toMillis()
      ) {
        throw new Error("PROMO_EXPIRED");
      }

      if (!bookSnap.exists) {
        throw new Error("BOOK_NOT_FOUND");
      }

      const book = bookSnap.data()!;

      if (book.status !== "published") {
        throw new Error("BOOK_UNAVAILABLE");
      }

      const allowedBookIds: unknown = promo.bookIds;

      if (
        !Array.isArray(allowedBookIds) ||
        !allowedBookIds.includes(bookId)
      ) {
        throw new Error("BOOK_NOT_ALLOWED");
      }

      // Do not overwrite an existing, currently active entitlement.
      if (librarySnap.exists) {
        const existing = librarySnap.data()!;
        const existingExpiry = existing.expiresAt;

        if (
          existing.status === "active" &&
          existingExpiry instanceof Timestamp &&
          existingExpiry.toMillis() > now.toMillis()
        ) {
          return {
            alreadyHasAccess: true,
            expiresAt: existingExpiry.toDate().toISOString(),
          };
        }
      }

      // A successful redemption cannot be repeated to reset the 90 days.
      if (redemptionSnap.exists) {
        throw new Error("ALREADY_REDEEMED");
      }

      const maxRedemptions = promo.maxRedemptions;
      const redemptionCount = promo.redemptionCount;

      if (
        !Number.isSafeInteger(maxRedemptions) ||
        maxRedemptions < 1 ||
        !Number.isSafeInteger(redemptionCount) ||
        redemptionCount < 0
      ) {
        throw new Error("PROMO_CONFIGURATION_ERROR");
      }

      if (redemptionCount >= maxRedemptions) {
        throw new Error("PROMO_LIMIT_REACHED");
      }

      const accessDurationDays = promo.accessDurationDays;

      // This endpoint intentionally grants exactly 90 days.
      if (accessDurationDays !== 90) {
        throw new Error("PROMO_CONFIGURATION_ERROR");
      }

      const expiresAt = Timestamp.fromMillis(
        now.toMillis() + 90 * 24 * 60 * 60 * 1000
      );

      const bookTitle =
        typeof book.title === "string" ? book.title : "Book";

      // Create or replace an expired library entitlement.
      transaction.set(libraryRef, {
        bookId,
        bookTitle,
        orderId: null,
        purchasePricePkr: 0,
        currency: "PKR",
        accessDurationDays: 90,
        status: "active",
        accessSource: "promo_code",
        promoCodeId: normalizedCode,
        purchasedAt: FieldValue.serverTimestamp(),
        expiresAt,
        createdAt: librarySnap.exists
          ? librarySnap.data()?.createdAt ?? FieldValue.serverTimestamp()
          : FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });

      transaction.create(redemptionRef, {
        uid,
        bookId,
        code: normalizedCode,
        redeemedAt: FieldValue.serverTimestamp(),
        expiresAt,
      });

      transaction.update(promoRef, {
        redemptionCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      });

      return {
        alreadyHasAccess: false,
        expiresAt: expiresAt.toDate().toISOString(),
      };
    });

    return NextResponse.json({
      success: true,
      alreadyHasAccess: result.alreadyHasAccess,
      expiresAt: result.expiresAt,
      message: result.alreadyHasAccess
        ? "You already have access to this book."
        : "Promo code applied. Your free access is active for 90 days.",
    });
  } catch (error) {
    const errorCode =
      error instanceof Error ? error.message : "UNKNOWN_ERROR";

    const errors: Record<string, { message: string; status: number }> = {
      INVALID_PROMO: {
        message: "This promo code is invalid.",
        status: 404,
      },
      PROMO_INACTIVE: {
        message: "This promo code is not active.",
        status: 400,
      },
      PROMO_EXPIRED: {
        message: "This promo code has expired.",
        status: 400,
      },
      BOOK_NOT_FOUND: {
        message: "The selected book was not found.",
        status: 404,
      },
      BOOK_UNAVAILABLE: {
        message: "This book is currently unavailable.",
        status: 400,
      },
      BOOK_NOT_ALLOWED: {
        message: "This promo code cannot be used for this book.",
        status: 400,
      },
      ALREADY_REDEEMED: {
        message: "You have already redeemed this promo code for this book.",
        status: 409,
      },
      PROMO_LIMIT_REACHED: {
        message: "This promo code has reached its redemption limit.",
        status: 400,
      },
      PROMO_CONFIGURATION_ERROR: {
        message: "This promo code is not configured correctly.",
        status: 500,
      },
    };

    const knownError = errors[errorCode];

    if (knownError) {
      return jsonError(knownError.message, knownError.status);
    }

    console.error("Promo redemption failed:", error);
    return jsonError("Unable to redeem the promo code. Please try again.", 500);
  }
}
