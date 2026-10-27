import type { Metadata } from "next";
import Script from "next/script";
import { aboutSchema } from "@/components/schemas/about";

export const metadata: Metadata = {
  metadataBase: new URL("https://mianahmadbasit.com"),
  title:
    "Mian Ahmad Basit | AI Expert, Technology Entrepreneur & Software Engineer",

  description:
    "Official website of Mian Ahmad Basit, a Pakistani Technology Entrepreneur, AI Expert, Software Engineer, Blockchain Consultant, Cloud Computing Specialist, SaaS Product Builder, Technology Speaker, Mentor, and Digital Transformation Leader.",

  applicationName: "Ahmad Basit",

  keywords: [
    "Ahmad Basit",
    "Mian Ahmad Basit",
    "AI Expert",
    "Artificial Intelligence",
    "Software Engineer",
    "Technology Entrepreneur",
    "Pakistan",
    "Blockchain",
    "Cloud Computing",
    "Web3",
    "SaaS",
    "Digital Transformation",
    "Technology Speaker",
    "CTO",
    "Technology Consultant",
    "Innovation Leader",
    "Machine Learning",
    "Automation",
    "Cloud Native",
    "Software Development",
  ],

  authors: [
    {
      name: "Ahmad Basit",
      url: "https://mianahmadbasit.com",
    },
  ],

  creator: "Ahmad Basit",

  publisher: "Ahmad Basit",

  category: "Technology",

  alternates: {
    canonical: "https://mianahmadbasit.com/about",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mianahmadbasit.com",
    siteName: "Ahmad Basit",

    title:
      "Mian Ahmad Basit | Artificial Intelligence, Blockchain & Cloud Computing Expert",

    description:
      "Technology Entrepreneur, Artificial Intelligence Expert, Blockchain Consultant, Cloud Computing Specialist, SaaS Builder, Technology Speaker and Software Engineering Leader.",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ahmad Basit",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    creator: "@MianAhmadBasit1",
    title: "Mian Ahmad Basit | Technology Entrepreneur & AI Expert",

    description:
      "Artificial Intelligence, Blockchain, Cloud Computing, SaaS, Software Engineering and Digital Transformation.",

    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}

        <Script
          id="about-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(aboutSchema),
          }}
        />
      </body>
    </html>
  );
}
