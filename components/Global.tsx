"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SpeakerModal from "@/components/speaker-modal";

export default function GlobalSpeakerModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(true);
  }, [pathname]);

  return <SpeakerModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
