import { NextRequest, NextResponse } from "next/server";
import { Timestamp } from "firebase-admin/firestore";
import { adminAuth, adminDb } from "@/firebase/Admin";

export const runtime = "nodejs";

async function verifyAdmin(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) return null;

  try {
    const token = authorization.slice(7);
    const decoded = await adminAuth.verifyIdToken(token);
    const userSnap = await adminDb.collection("users").doc(decoded.uid).get();

    if (!userSnap.exists) return null;

    const userData = userSnap.data()!;

    if (userData.role !== "admin" && userData.isAdmin !== true) {
      return null;
    }

    return decoded.uid;
  } catch {
    return null;
  }
}

function error(message: string, status: number) {
  return NextResponse.json({ success: false, message }, { status });
}

export async function GET(request: NextRequest) {
  const uid = await verifyAdmin(request);
  if (!uid) return error("Admin access required.", 403);

  try {
    const snapshot = await adminDb
      .collection("promoCodes")
      .orderBy("createdAt", "desc")
      .limit(100)
      .get();

    const promoCodes = snapshot.docs.map((item) => {
      const data = item.data();

      return {
        id: item.id,
        code: data.code,
        type: data.type,
        status: data.status,
        bookIds: data.bookIds ?? [],
        accessDurationDays: data.accessDurationDays,
        maxRedemptions: data.maxRedemptions,
        redemptionCount: data.redemptionCount,
        expiresAt:
          data.expiresAt instanceof Timestamp
            ? data.expiresAt.toDate().toISOString()
            : null,
        createdAt:
          data.createdAt instanceof Timestamp
            ? data.createdAt.toDate().toISOString()
            : null,
      };
    });

    return NextResponse.json({ success: true, promoCodes });
  } catch (err) {
    console.error("Admin promo list error:", err);
    return error("Could not load promo codes.", 500);
  }
}

export async function POST(request: NextRequest) {
  const uid = await verifyAdmin(request);
  if (!uid) return error("Admin access required.", 403);

  try {
    const body = await request.json();

    const code =
      typeof body.code === "string" ? body.code.trim().toUpperCase() : "";

    const bookIds: unknown = body.bookIds;
    const maxRedemptions = body.maxRedemptions;
    const expiryDate = body.expiresAt;

    if (!/^[A-Z0-9_-]{4,40}$/.test(code)) {
      return error(
        "Code must be 4–40 characters using letters, numbers, hyphens or underscores.",
        400
      );
    }

    if (
      !Array.isArray(bookIds) ||
      bookIds.length === 0 ||
      bookIds.length > 100 ||
      !bookIds.every(
        (id) =>
          typeof id === "string" &&
          id.length > 0 &&
          id.length <= 150 &&
          !id.includes("/")
      )
    ) {
      return error("Select at least one valid book.", 400);
    }

    if (
      !Number.isSafeInteger(maxRedemptions) ||
      maxRedemptions < 1 ||
      maxRedemptions > 100000
    ) {
      return error("Enter a valid redemption limit.", 400);
    }

    const expiryMillis = Date.parse(expiryDate);

    if (
      typeof expiryDate !== "string" ||
      !Number.isFinite(expiryMillis) ||
      expiryMillis <= Date.now()
    ) {
      return error("Promo expiry must be a future date.", 400);
    }

    const uniqueBookIds = [...new Set(bookIds as string[])];

    // Verify every selected book exists and is published.
    const bookSnapshots = await Promise.all(
      uniqueBookIds.map((id) => adminDb.collection("books").doc(id).get())
    );

    if (
      bookSnapshots.some(
        (book) => !book.exists || book.data()?.status !== "published"
      )
    ) {
      return error(
        "One or more selected books are not published or do not exist.",
        400
      );
    }

    const promoRef = adminDb.collection("promoCodes").doc(code);

    const result = await adminDb.runTransaction(async (tx) => {
      const existing = await tx.get(promoRef);

      if (existing.exists) {
        throw new Error("CODE_EXISTS");
      }

      tx.create(promoRef, {
        code,
        type: "free_access",
        status: "active",
        bookIds: uniqueBookIds,
        accessDurationDays: 90,
        maxRedemptions,
        redemptionCount: 0,
        expiresAt: Timestamp.fromMillis(expiryMillis),
        createdAt: Timestamp.now(),
        createdBy: uid,
        updatedAt: Timestamp.now(),
      });
    });

    void result;

    return NextResponse.json({
      success: true,
      message: "Promo code created successfully.",
      code,
    });
  } catch (err) {
    if (err instanceof Error && err.message === "CODE_EXISTS") {
      return error("This promo code already exists.", 409);
    }

    console.error("Admin promo creation error:", err);
    return error("Could not create promo code.", 500);
  }
}
