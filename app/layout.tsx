import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { Suspense, type ReactNode } from "react";
import "./globals.css";
import { AuthProvider } from "@/context/Auth";
import MetaPixel from "@/components/MetaPixels";

const SITE_URL = "https://ahmadbasit.com";
const SITE_NAME = "Mian Ahmad Basit Portfolio";
const SITE_TITLE =
  "Mian Ahmad Basit - Tech Polymath | AI & Blockchain Visionary | Founder of P2P Clouds";
const SITE_DESCRIPTION =
  "Official portfolio of Mian Ahmad Basit - tech polymath, AI strategist, blockchain expert, CTO at Pakistan Blockchain Institute, and founder of P2P Clouds. Explore AI projects, Web3 innovations, cloud systems, SaaS products, and technology leadership.";
const GTM_ID = "GTM-KS79JVVK";

const siteUrl = new URL(SITE_URL);
const defaultOgImage = new URL("/mab-about.webp", siteUrl).toString();
const personImage = new URL("/mab.webp", siteUrl).toString();
const favicon32 = "/icons/favicon-32x32.webp";
const favicon16 = "/icons/favicon-16x16.webp";
const appleTouchIcon = "/icons/apple-touch-icon.webp";
const manifestUrl = "/manifest.webmanifest";

const socialProfiles = [
  "https://pk.linkedin.com/in/mianahmadbasit",
  "https://twitter.com/MianAhmadBasit1",
  "https://github.com/MianAhmadBasit",
  "https://github.com/mianahmadbasit1",
  "https://www.instagram.com/mianahmadbasit",
] as const;

type PublicRoute = Readonly<{
  path: `/${string}` | "/";
  name: string;
  description: string;
  type?: "WebPage" | "CollectionPage" | "ItemPage";
  parentPath?: `/${string}` | "/";
}>;

const createAbsoluteUrl = (path: PublicRoute["path"]) =>
  new URL(path, siteUrl).toString();

const publicRoutes = [
  {
    path: "/",
    name: "Home",
    description:
      "Official portfolio homepage for Mian Ahmad Basit, covering AI, blockchain, cloud systems, ventures, products, and technology leadership.",
    type: "WebPage",
  },
  {
    path: "/about",
    name: "About",
    description:
      "Background, expertise, speaking, ventures, and professional profile of Mian Ahmad Basit.",
    type: "WebPage",
  },
  {
    path: "/blogs",
    name: "Blogs",
    description:
      "Articles, technical guides, and insights on AI, blockchain, software engineering, cybersecurity, and technology strategy.",
    type: "CollectionPage",
  },
  {
    path: "/companies",
    name: "Companies",
    description:
      "Technology companies and leadership ecosystem connected with Ahmad Basit, including P2P Clouds, MABSOL Technologies, SkillUstad, and TEPS.",
    type: "CollectionPage",
  },
  {
    path: "/contact",
    name: "Contact",
    description:
      "Contact page for consulting, partnerships, speaking, products, and business inquiries.",
    type: "WebPage",
  },
  {
    path: "/mab-fast-earning-program",
    name: "Courses",
    description:
      "Practical courses and learning programs covering AI, web development, cybersecurity, software engineering, freelancing, and digital growth.",
    type: "CollectionPage",
  },
  {
    path: "/ecosystem",
    name: "Ecosystem",
    description:
      "Overview of the Ahmad Basit technology ecosystem spanning AI systems, blockchain, cloud infrastructure, consulting, learning pathways, and security.",
    type: "CollectionPage",
  },
  {
    path: "/free-resources",
    name: "Free Resources",
    description:
      "Free resources, templates, and learning material for technology, AI, digital growth, and execution.",
    type: "CollectionPage",
  },
  {
    path: "/products",
    name: "Products",
    description:
      "SaaS platforms, AI automation tools, digital product templates, dashboards, and execution assets.",
    type: "CollectionPage",
  },
  {
    path: "/services",
    name: "Services",
    description:
      "Professional technology services covering AI systems, SaaS development, software engineering, cloud, cybersecurity, and blockchain.",
    type: "WebPage",
  },
  {
    path: "/webinars",
    name: "Webinars",
    description:
      "Webinars and online learning sessions led by Mian Ahmad Basit across AI, technology, business, and professional growth.",
    type: "CollectionPage",
  },
  {
    path: "/ecosystem/ai-systems-division",
    name: "AI Systems Division",
    description:
      "AI systems, automation, agents, and intelligent product engineering initiatives in the Mian Ahmad Basit ecosystem.",
    type: "ItemPage",
    parentPath: "/ecosystem",
  },
  {
    path: "/ecosystem/blockchain-institute",
    name: "Blockchain Institute",
    description:
      "Blockchain education, Web3 systems, on-chain verification, and distributed technology initiatives.",
    type: "ItemPage",
    parentPath: "/ecosystem",
  },
  {
    path: "/ecosystem/cloud-infrastructure",
    name: "Cloud Infrastructure",
    description:
      "Cloud architecture, scalable infrastructure, DevOps, and platform systems in the Ahmad Basit technology ecosystem.",
    type: "ItemPage",
    parentPath: "/ecosystem",
  },
  {
    path: "/ecosystem/consulting-services",
    name: "Consulting Services",
    description:
      "Strategic consulting for AI adoption, digital products, software architecture, blockchain, cloud, and technology operations.",
    type: "ItemPage",
    parentPath: "/ecosystem",
  },
  {
    path: "/ecosystem/learning-pathways",
    name: "Learning Pathways",
    description:
      "Structured learning pathways for practical technology skills, career growth, portfolio development, and job readiness.",
    type: "ItemPage",
    parentPath: "/ecosystem",
  },
  {
    path: "/ecosystem/security-systems",
    name: "Security Systems",
    description:
      "Cybersecurity, ethical hacking, security architecture, and operational protection systems.",
    type: "ItemPage",
    parentPath: "/ecosystem",
  },
  {
    path: "/mab-fast-earning-program/ai-ethical-hacking",
    name: "AI Ethical Hacking",
    description:
      "Course focused on AI-assisted ethical hacking, security testing, and modern cybersecurity workflows.",
    type: "ItemPage",
    parentPath: "/mab-fast-earning-program",
  },
  {
    path: "/mab-fast-earning-program/ai-freelancing-3",
    name: "AI Freelancing",
    description:
      "Course for building AI-powered freelancing skills, services, workflows, and client-ready execution systems.",
    type: "ItemPage",
    parentPath: "/mab-fast-earning-program",
  },
  {
    path: "/mab-fast-earning-program/ai-ml-agentic-engineering",
    name: "AI, ML & Agentic Engineering",
    description:
      "Course covering AI, machine learning, agentic systems, and practical intelligent application engineering.",
    type: "ItemPage",
    parentPath: "/mab-fast-earning-program",
  },
  {
    path: "/mab-fast-earning-program/ai-saas-development-bootcamp",
    name: "AI SaaS Development Bootcamp",
    description:
      "Bootcamp for building AI SaaS products, automation platforms, and production-ready software systems.",
    type: "ItemPage",
    parentPath: "/mab-fast-earning-program",
  },
  {
    path: "/mab-fast-earning-program/cloud-devops-ai-operations",
    name: "Cloud, DevOps & AI Operations",
    description:
      "Course covering cloud infrastructure, DevOps workflows, deployment systems, and AI operations.",
    type: "ItemPage",
    parentPath: "/mab-fast-earning-program",
  },
  {
    path: "/mab-fast-earning-program/cybersecurity-ethical-hacking-bug-bounty",
    name: "Cybersecurity, Ethical Hacking & Bug Bounty",
    description:
      "Course for ethical hacking, cybersecurity fundamentals, vulnerability research, and bug bounty practice.",
    type: "ItemPage",
    parentPath: "/mab-fast-earning-program",
  },
  {
    path: "/mab-fast-earning-program/digital-marketing-branding-growth",
    name: "Digital Marketing, Branding & Growth",
    description:
      "Course for digital marketing strategy, branding, audience growth, and business execution.",
    type: "ItemPage",
    parentPath: "/mab-fast-earning-program",
  },
  {
    path: "/mab-fast-earning-program/earn-6-figure",
    name: "Earn 6 Figure",
    description:
      "Course focused on practical income generation, skills monetization, and professional growth systems.",
    type: "ItemPage",
    parentPath: "/mab-fast-earning-program",
  },
  {
    path: "/mab-fast-earning-program/fast-income-generation",
    name: "Fast Income Generation",
    description:
      "Course covering fast, practical income generation strategies using digital skills and execution workflows.",
    type: "ItemPage",
    parentPath: "/mab-fast-earning-program",
  },
  {
    path: "/mab-fast-earning-program/go-high-level-marketing",
    name: "Go High Level Marketing",
    description:
      "Course for GoHighLevel marketing systems, funnels, client automation, and agency execution.",
    type: "ItemPage",
    parentPath: "/mab-fast-earning-program",
  },
  {
    path: "/mab-fast-earning-program/mobile-apps-ai",
    name: "Mobile Apps with AI",
    description:
      "Course for building mobile applications with AI-enhanced features and modern product workflows.",
    type: "ItemPage",
    parentPath: "/mab-fast-earning-program",
  },
  {
    path: "/mab-fast-earning-program/modern-software-engineering",
    name: "Modern Software Engineering",
    description:
      "Course for modern software engineering practices, architecture, delivery, tooling, and production systems.",
    type: "ItemPage",
    parentPath: "/mab-fast-earning-program",
  },
  {
    path: "/mab-fast-earning-program/product-development",
    name: "Product Development",
    description:
      "Course covering product strategy, validation, design, engineering execution, and launch planning.",
    type: "ItemPage",
    parentPath: "/mab-fast-earning-program",
  },
  {
    path: "/mab-fast-earning-program/sales-mastery-3",
    name: "Sales Mastery",
    description:
      "Course for sales systems, client communication, offers, closing, and business growth execution.",
    type: "ItemPage",
    parentPath: "/mab-fast-earning-program",
  },
  {
    path: "/mab-fast-earning-program/web-development-ai",
    name: "Web Development with AI",
    description:
      "Course for building modern websites and web applications using AI-assisted development workflows.",
    type: "ItemPage",
    parentPath: "/mab-fast-earning-program",
  },
] satisfies readonly PublicRoute[];

const primaryNavigationRoutes = publicRoutes.filter(
  ({ parentPath }) => parentPath === undefined
);

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const themeInitScript = `
try {
  var storedTheme = localStorage.getItem("theme-mode");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  var shouldUseDark = storedTheme === "dark" || (storedTheme !== "light" && prefersDark);

  document.documentElement.classList.toggle("dark", shouldUseDark);
  document.documentElement.style.colorScheme = shouldUseDark ? "dark" : "light";
} catch (_) {}
`;

const gtmScript = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
`;

// Metadata
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Mian Ahmad Basit",
    "Ahmad Basit",
    "Mian Ahmed Basit",
    "Tech polymath Pakistan",
    "AI expert Pakistan",
    "Blockchain expert Pakistan",
    "Cloud architect Pakistan",
    "P2P Clouds founder",
    "Next.js developer Pakistan",
    "Full-stack developer Pakistan",
    "AI SaaS developer",
    "AI agents developer",
    "Web3 specialist Pakistan",
    "CTO Pakistan Blockchain Institute",
    "AI automation systems",
    "AI portfolio website",
    "Blockchain Pakistan",
    "Startup founder Pakistan",
  ],
  authors: [{ name: "Mian Ahmad Basit", url: SITE_URL }],
  creator: "Mian Ahmad Basit",
  publisher: "P2P Clouds",
  generator: "Next.js 16",
  category: "Technology",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Mian Ahmad Basit - AI & Blockchain Expert | Tech Entrepreneur",
    description:
      "Explore the official portfolio of Mian Ahmad Basit - AI strategist, blockchain leader, full-stack developer, and tech entrepreneur.",
    url: "/",
    siteName: SITE_NAME,
    images: [
      {
        url: defaultOgImage,
        width: 1024,
        height: 1536,
        alt: "Mian Ahmad Basit professional portfolio portrait",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mian Ahmad Basit - AI & Blockchain Innovator",
    description:
      "Explore the work, projects, and vision of Mian Ahmad Basit - AI, blockchain, cloud technology, and full-stack engineering leader.",
    images: [
      {
        url: defaultOgImage,
        alt: "Mian Ahmad Basit professional portfolio portrait",
      },
    ],
    creator: "@MianAhmadBasit1",
    site: "@MianAhmadBasit1",
  },
  icons: {
    icon: [
      { url: favicon32, sizes: "32x32", type: "image/webp" },
      { url: favicon16, sizes: "16x16", type: "image/webp" },
    ],
    shortcut: favicon16,
    apple: [{ url: appleTouchIcon, sizes: "180x180", type: "image/webp" }],
  },
  appleWebApp: {
    capable: true,
    title: "Ahmad Basit",
    statusBarStyle: "black-translucent",
  },
  manifest: manifestUrl,
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false,
  },
};

// JSON-LD

const siteNavigationGraph = primaryNavigationRoutes.map((route, index) => ({
  "@type": "SiteNavigationElement",
  "@id": `${createAbsoluteUrl(route.path)}#site-navigation`,
  position: index + 1,
  name: route.name,
  description: route.description,
  url: createAbsoluteUrl(route.path),
}));

const routePageGraph = publicRoutes
  .filter(({ path }) => path !== "/")
  .map((route) => ({
    "@type": route.type ?? "WebPage",
    "@id": `${createAbsoluteUrl(route.path)}#webpage`,
    url: createAbsoluteUrl(route.path),
    name: route.name,
    description: route.description,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    ...(route.parentPath
      ? {
          isPartOf: [
            {
              "@id": `${SITE_URL}/#website`,
            },
            {
              "@id": `${createAbsoluteUrl(route.parentPath)}#webpage`,
            },
          ],
        }
      : {}),
    about: {
      "@id": `${SITE_URL}/#person`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "en-US",
  }));

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Mian Ahmad Basit",
      url: `${SITE_URL}/`,
      image: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#person-image`,
        url: personImage,
        contentUrl: personImage,
      },
      jobTitle: "Tech Polymath, AI & Blockchain Expert",
      description: SITE_DESCRIPTION,
      sameAs: socialProfiles,
      knowsAbout: [
        "Artificial Intelligence",
        "Blockchain",
        "Cybersecurity",
        "Cloud Systems",
        "SaaS Products",
        "Automation",
        "Machine Learning",
        "Web3",
        "Full-Stack Development",
      ],
      founder: {
        "@id": `${SITE_URL}/#organization`,
      },
      worksFor: [
        {
          "@id": `${SITE_URL}/#organization`,
        },
        {
          "@type": "Organization",
          "@id": `${SITE_URL}/#pakistan-blockchain-institute`,
          name: "Pakistan Blockchain Institute",
        },
      ],
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "P2P Clouds",
      url: "https://p2pclouds.net/",
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#organization-logo`,
        url: new URL("/p2pclouds.webp", siteUrl).toString(),
        contentUrl: new URL("/p2pclouds.webp", siteUrl).toString(),
      },
      founder: {
        "@id": `${SITE_URL}/#person`,
      },
      sameAs: socialProfiles,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      description: SITE_DESCRIPTION,
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      author: {
        "@id": `${SITE_URL}/#person`,
      },
      hasPart: publicRoutes.map((route) => ({
        "@id": `${createAbsoluteUrl(route.path)}#webpage`,
      })),
      mainEntity: siteNavigationGraph.map((route) => ({
        "@id": route["@id"],
      })),
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      about: {
        "@id": `${SITE_URL}/#person`,
      },
      primaryImageOfPage: {
        "@id": `${SITE_URL}/#person-image`,
      },
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      inLanguage: "en-US",
    },
    ...routePageGraph,
    ...siteNavigationGraph,
  ],
} satisfies Record<string, unknown>;

const structuredDataJson = JSON.stringify(structuredData).replace(
  /</g,
  "\\u003c"
);

// Root Layout

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="cM0fY738zoEeCRqzZMDQJ4fHU6JscKALGaZl7PH2_WM"
        />
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <Script id="gtm-script" strategy="lazyOnload">
          {gtmScript}
        </Script>
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: structuredDataJson }}
        />
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "y9vndxf98o");
          `}
        </Script>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LDHMK6BDL0"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-LDHMK6BDL0');
          `}
        </Script>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PHZLX4W4');
          `}
        </Script>
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased`}
      >
        {/* <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            title="Google Tag Manager"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PHZLX4W4"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>
        <AuthProvider>
          {children}
          <Suspense fallback={null}>
            <MetaPixel />
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
