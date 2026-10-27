import { adminAuth, adminDb } from "@/firebase/Admin";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { uid, name } = await req.json();

    if (!uid || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await adminAuth.updateUser(uid, { displayName: name });

    await adminDb.collection("users").doc(uid).update({ name });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("edit-user error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
