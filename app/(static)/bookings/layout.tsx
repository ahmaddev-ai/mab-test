import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://mianahmadbasit.com"),
  title:
    "Book a Meeting - Mian Ahmad Basit | AI Expert, Technology Entrepreneur & Software Engineer",

  description:
    "Book a meeting with Mian Ahmad Basit — in person at Arfa Tower, online consultation, or one-on-one tech mentorship. Pakistani Technology Entrepreneur, AI Expert, Software Engineer, Blockchain Consultant, Cloud Computing Specialist, and Digital Transformation Leader.",

  applicationName: "Ahmad Basit",

  keywords: [
    "Ahmad Basit",
    "Mian Ahmad Basit",
    "Book a meeting with Ahmad Basit",
    "Arfa Tower meeting",
    "Online consultation",
    "Tech mentorship",
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
    canonical: "https://mianahmadbasit.com/bookings",
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
    url: "https://mianahmadbasit.com/bookings",
    siteName: "Ahmad Basit",

    title:
      "Book a Meeting with Mian Ahmad Basit | Arfa Tower, Online Consultation & Tech Mentorship",

    description:
      "Book an in-person meeting at Arfa Tower, an online consultation, or a tech mentorship session with Mian Ahmad Basit — AI, Blockchain, Cloud Computing and Software Engineering expert.",

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
    title: "Book a Meeting with Mian Ahmad Basit",

    description:
      "Arfa Tower meetings, online consultations, and tech mentorship sessions with Mian Ahmad Basit.",

    images: ["/og-image.jpg"],
  },
};

export default function BookingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
