import { adminAuth, adminDb } from "@/firebase/Admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("Creating user...");
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    /* -------- create auth user -------- */

    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: name,
    });

    /* -------- save in firestore -------- */

    await adminDb
      .collection("users")
      .doc(userRecord.uid)
      .set({
        name,
        email,
        role: role || "publisher",
        createdAt: new Date(),
      });

    return NextResponse.json({
      success: true,
      uid: userRecord.uid,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
