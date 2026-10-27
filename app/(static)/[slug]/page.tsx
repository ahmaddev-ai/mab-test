import { notFound } from "next/navigation";
import { createNextHelpers, P2PForgeJsonLd } from "p2pforge/next";
import { forge } from "@/data/pseo/forge";
import { getServiceLocationRowBySlug } from "@/data/pseo/seo-data";
import ServiceLocationPage from "@/components/pseo/ServiceLocationPage";

const { getPage: getForgePage } = createNextHelpers(forge, { routePath: "/" });

export async function generateStaticParams() {
  return forge.getAllPages("/").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const forgePage = getForgePage(slug);
  if (forgePage) {
    return {
      title: forgePage.seo.title,
      description: forgePage.seo.description,
      alternates: { canonical: forgePage.seo.canonical },
      robots: "index, follow", // all 90 are city-level, real intent — no thin tier here (sub-city deferred)
    };
  }
  return { title: "Not Found", robots: "noindex, nofollow" };
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const forgePage = getForgePage(slug);
  if (!forgePage) notFound();

  const row = getServiceLocationRowBySlug(slug);
  if (!row) return notFound(); // slug-pattern mismatch bug — shouldn't happen if forgePage resolved

  return (
    <>
      <ServiceLocationPage row={row} />
      <P2PForgeJsonLd page={forgePage} />
    </>
  );
}
