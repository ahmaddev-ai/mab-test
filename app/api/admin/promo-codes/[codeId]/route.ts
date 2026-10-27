import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/firebase/Admin";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ codeId: string }>;
};

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const authorization = request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Admin access required." },
        { status: 403 }
      );
    }

    const decoded = await adminAuth.verifyIdToken(authorization.slice(7));

    const userSnap = await adminDb.collection("users").doc(decoded.uid).get();

    const userData = userSnap.data();

    if (
      !userSnap.exists ||
      (userData?.role !== "admin" && userData?.isAdmin !== true)
    ) {
      return NextResponse.json(
        { success: false, message: "Admin access required." },
        { status: 403 }
      );
    }

    const { codeId } = await context.params;

    if (!codeId || codeId.length > 40 || !/^[A-Za-z0-9_-]+$/.test(codeId)) {
      return NextResponse.json(
        { success: false, message: "Invalid promo code ID." },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (!["active", "inactive"].includes(body.status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status." },
        { status: 400 }
      );
    }

    const promoRef = adminDb.collection("promoCodes").doc(codeId);
    const promoSnap = await promoRef.get();

    if (!promoSnap.exists) {
      return NextResponse.json(
        { success: false, message: "Promo code not found." },
        { status: 404 }
      );
    }

    await promoRef.update({
      status: body.status,
      updatedAt: new Date(),
      updatedBy: decoded.uid,
    });

    return NextResponse.json({
      success: true,
      message: `Promo code ${body.status}.`,
    });
  } catch (error) {
    console.error("Promo status update failed:", error);

    return NextResponse.json(
      { success: false, message: "Could not update promo code." },
      { status: 500 }
    );
  }
}
