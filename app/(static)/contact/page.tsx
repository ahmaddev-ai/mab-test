import ContactClient from "@/components/contact/ContactClient";
import { Suspense } from "react";

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactClient />
    </Suspense>
  );
}
