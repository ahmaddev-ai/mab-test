import GalleryContent, {
  gallerySections,
} from "@/components/home/GalleryContent";
import type { Metadata } from "next";

const SITE_URL = "https://ahmadbasit.com";
const PAGE_URL = `${SITE_URL}/gallery`;
const OG_IMAGE = `${SITE_URL}/gallery/mian-ahmad-basit-as-speaker-1.webp`;

const TITLE = "Gallery | Mian Ahmad Basit — Conferences, Talks & Media Moments";
const DESCRIPTION =
  "Browse photos of Mian Ahmad Basit at conferences, university seminars, speaking engagements, podcasts, and student training sessions across Pakistan and beyond — networking, TEPS, PSCA, and more.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Mian Ahmad Basit",
    "Mian Ahmad Basit gallery",
    "Mian Ahmad Basit speaker",
    "Mian Ahmad Basit conferences",
    "P2P Clouds",
    "MABSOL Technologies",
    "TEPS",
    "SkillUstad",
    "Pakistan Blockchain Institute",
    "tech speaker Pakistan",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Mian Ahmad Basit",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Mian Ahmad Basit speaking at a conference",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@MianAhmadBasit1",
    creator: "@MianAhmadBasit1",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

function GalleryJsonLd() {
  const allImages = Array.isArray(gallerySections)
    ? gallerySections.flatMap((section) =>
        (section.images ?? []).map((img) => `${SITE_URL}${img.src}`)
      )
    : [];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ImageGallery",
        "@id": `${PAGE_URL}#gallery`,
        url: PAGE_URL,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "en",
        isPartOf: {
          "@type": "WebSite",
          url: SITE_URL,
          name: "Mian Ahmad Basit",
        },
        about: {
          "@type": "Person",
          name: "Mian Ahmad Basit",
          url: SITE_URL,
          sameAs: [
            "https://www.linkedin.com/in/mianahmadbasit",
            "https://twitter.com/MianAhmadBasit1",
            "https://www.instagram.com/mianahmadbasit",
            "https://github.com/MianAhmadBasit",
          ],
        },
        image: allImages.slice(0, 30),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Gallery",
            item: PAGE_URL,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function GalleryPage() {
  return (
    <>
      <GalleryJsonLd />
      <GalleryContent />
    </>
  );
}
