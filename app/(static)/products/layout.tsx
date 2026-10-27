import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Products | SaaS, Automation Tools & Digital Product Templates | Ahmad Basit",
  description:
    "Explore Ahmad Basit's products, including SaaS platforms, AI automation tools, security dashboards, digital marketing templates, agency kits, and execution assets.",
  keywords: [
    "Ahmad Basit products",
    "SaaS products",
    "AI automation tools",
    "digital product templates",
    "Google Ads checklist",
    "digital marketing strategy template",
    "agency kit",
    "media planning templates",
  ],
  alternates: {
    canonical: "https://ahmadbasit.com/products",
  },
  openGraph: {
    title: "Products | SaaS, Automation Tools & Digital Assets",
    description:
      "SaaS platforms, AI automation products, dashboards, templates, and digital execution kits for modern teams.",
    url: "https://ahmadbasit.com/products",
    siteName: "Mian Ahmad Basit Portfolio",
    type: "website",
    images: [
      {
        url: "/products/google-ads.webp",
        width: 1200,
        height: 630,
        alt: "Ahmad Basit Digital Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Products | Ahmad Basit",
    description:
      "SaaS, AI automation, dashboards, templates, and digital product systems.",
    images: ["/products/google-ads.webp"],
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
