import admin from "@/firebase/Admin";
import { adminAuth, adminDb } from "@/firebase/Admin";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { uid } = await req.json();

    if (!uid) {
      return NextResponse.json({ error: "Missing uid" }, { status: 400 });
    }

    const FieldValue = admin.firestore.FieldValue;
    const userRef = adminDb.collection("users").doc(uid);
    const userSnap = await userRef.get();
    const userData = userSnap.exists ? userSnap.data() : null;
    const isPublisher = userData?.role === "publisher";

    const blogsSnap = await adminDb
      .collection("blogs")
      .where("authorId", "==", uid)
      .get();

    let countedBlogs = 0;
    let countedPublishedBlogs = 0;

    blogsSnap.forEach((blogDoc) => {
      const blog = blogDoc.data();
      const isPublished = blog.status === "published";
      const wasCounted =
        blog.analyticsCounted === true ||
        (blog.analyticsCounted !== false && isPublished);
      const wasPublishedCounted =
        blog.analyticsPublishedCounted === true ||
        (blog.analyticsPublishedCounted !== false && isPublished);

      if (wasCounted) countedBlogs += 1;
      if (wasPublishedCounted) countedPublishedBlogs += 1;
    });

    await adminAuth.deleteUser(uid);

    const batch = adminDb.batch();
    batch.delete(userRef);
    blogsSnap.forEach((blogDoc) => batch.delete(blogDoc.ref));

    batch.set(
      adminDb.collection("analytics").doc("global"),
      {
        totalUsers: FieldValue.increment(-1),
        ...(isPublisher ? { totalPublishers: FieldValue.increment(-1) } : {}),
        ...(countedBlogs
          ? { totalBlogs: FieldValue.increment(-countedBlogs) }
          : {}),
        ...(countedPublishedBlogs
          ? {
              totalPublishedBlogs: FieldValue.increment(-countedPublishedBlogs),
            }
          : {}),
      },
      { merge: true }
    );

    const today = new Date().toLocaleDateString("en-CA");
    batch.set(
      adminDb.collection("analytics").doc(`daily_${today}`),
      {
        date: today,
        usersDeleted: FieldValue.increment(1),
        ...(isPublisher ? { publishersDeleted: FieldValue.increment(1) } : {}),
        ...(countedBlogs
          ? { blogsDeleted: FieldValue.increment(countedBlogs) }
          : {}),
        ...(countedPublishedBlogs
          ? {
              publishedBlogsDeleted:
                FieldValue.increment(countedPublishedBlogs),
            }
          : {}),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    await batch.commit();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("delete-user error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
