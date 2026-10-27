import type { Metadata } from "next";
import EcosystemDetailPage from "@/components/ecosystem/EcosystemDetailPage";
import { ECOSYSTEM_DIVISIONS } from "@/data/ecosystem";

const division = ECOSYSTEM_DIVISIONS["security-systems"];

export const metadata: Metadata = {
  title: division.metaTitle,
  description: division.metaDescription,
  keywords: division.keywords,
  alternates: {
    canonical: "https://ahmadbasit.com/ecosystem/security-systems",
  },
  openGraph: {
    title: division.metaTitle,
    description: division.metaDescription,
    url: "https://ahmadbasit.com/ecosystem/security-systems",
    siteName: "Mian Ahmad Basit Portfolio",
    type: "website",
    images: [
      {
        url: "/mab-about.webp",
        width: 1024,
        height: 1536,
        alt: division.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: division.metaTitle,
    description: division.metaDescription,
    images: ["/mab-about.webp"],
  },
};

export default function SecuritySystemsPage() {
  return <EcosystemDetailPage division={division} />;
}