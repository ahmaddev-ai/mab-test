import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import { notFound } from "next/navigation";
import BlogDetails from "@/components/blogs/BlogDetail";

export const revalidate = 3600; // optional (1 hour)

// ✅ build time → fetch all blog slugs
export async function generateStaticParams() {
  const snap = await getDocs(collection(db, "blogs"));

  return snap.docs
    .map((doc) => {
      const data = doc.data();

      if (!data.slug) return null;

      return { id: data.slug }; // route param = id
    })
    .filter(Boolean);
}

// props type
type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  // Next.js new versions me params promise ho sakta
  const resolvedParams = await params;

  const slug = resolvedParams?.id;

  if (!slug || typeof slug !== "string") {
    notFound();
  }

  // optional validation → check blog exists
  const q = query(collection(db, "blogs"), where("slug", "==", slug));
  const snap = await getDocs(q);

  if (snap.empty) {
    notFound();
  }

  // client component ko slug pass
  return <BlogDetails id={slug} />;
}
