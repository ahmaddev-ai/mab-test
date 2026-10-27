import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Companies | P2P Clouds, MABSOL Technologies, SkillUstad & TEPS | Ahmad Basit",
  description:
    "Explore the companies and leadership ecosystem connected with Ahmad Basit across AI, cloud, SaaS, software engineering, education, and technical skills development.",
  keywords: [
    "Ahmad Basit companies",
    "P2P Clouds",
    "MABSOL Technologies",
    "SkillUstad",
    "TEPS",
    "technology companies Pakistan",
    "AI company",
    "software engineering company",
    "technical education company",
  ],
  alternates: {
    canonical: "https://ahmadbasit.com/companies",
  },
  openGraph: {
    title: "Companies | Ahmad Basit Technology Leadership Ecosystem",
    description:
      "Leadership across AI, cloud, SaaS, software engineering, education, and digital transformation companies.",
    url: "https://ahmadbasit.com/companies",
    siteName: "Mian Ahmad Basit Portfolio",
    type: "website",
    images: [
      {
        url: "/companies/p2pclouds.webp",
        width: 1200,
        height: 630,
        alt: "Ahmad Basit Companies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Companies | Ahmad Basit",
    description:
      "P2P Clouds, MABSOL Technologies, SkillUstad, TEPS, and the wider leadership ecosystem.",
    images: ["/companies/p2pclouds.webp"],
  },
};

export default function CompaniesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
