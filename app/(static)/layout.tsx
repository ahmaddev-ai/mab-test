// StaticLayout.tsx
import MabAIChatbot from "@/components/AiChatbot";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NewsletterPopup from "@/components/NewsLetterPopUp";
import SocialShare from "@/components/SocialShare";
import Whatsapp from "@/components/Whatsapp";
import GlobalSpeakerModal from "@/components/Global";

export default function StaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <SocialShare />
      <Whatsapp />
      <MabAIChatbot />
      <GlobalSpeakerModal />

      <NewsletterPopup />
      {children}
      <Footer />
    </>
  );
}
