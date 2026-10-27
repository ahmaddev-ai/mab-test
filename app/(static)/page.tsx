import HeroSection from "@/components/home/HeroSection";
import TrustedBySection from "@/components/home/TrustedBySection";
import dynamic from "next/dynamic";

const YouTubeSection = dynamic(
  () => import("@/components/home/YoutubeSection")
);
const EcosystemSection = dynamic(
  () => import("@/components/home/EcosystemSection")
);
const CompaniesSection = dynamic(() => import("@/components/home/Companies"));
const ProductsSection = dynamic(
  () => import("@/components/home/ProductsSection")
);
const FeaturedCourses = dynamic(
  () => import("@/components/home/FeaturedCourses")
);
const MediaSection = dynamic(() => import("@/components/home/MediaSection"));
const GallerySection = dynamic(
  () => import("@/components/home/FeaturedGallery")
);
const InvestmentSection = dynamic(
  () => import("@/components/home/InvestmentSection")
);
const BlogSection = dynamic(() => import("@/components/home/BlogSection"));

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8FAFC] text-[#0A0A0A] transition-colors duration-300 dark:bg-[#0A0A0A] dark:text-white">
      <HeroSection />
      <TrustedBySection />
      <YouTubeSection />
      <EcosystemSection />
      <CompaniesSection />
      <ProductsSection />
      <FeaturedCourses />
      {/* <SuccessStoriesSection /> */}
      <MediaSection />
      <GallerySection />
      <InvestmentSection />
      <BlogSection />
    </main>
  );
}
