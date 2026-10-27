"use client";

import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Image from "next/image";

export default function VisionSticky() {
  const items = [
    {
      title: "Vision",
      description:
        "A future where AI, Blockchain, and Cybersecurity work together to create intelligent, secure, and autonomous global systems — elevating human capability through technology.",
      content: (
        <Image
          src="/vision/vision1.webp"
          alt="Vision"
          width={350}
          height={500}
          className="object-cover w-full h-full"
        />
      ),
    },
    {
      title: "Tech Innovation",
      description:
        "Building scalable AI agents, next-generation SaaS platforms, LLM-powered automations, and enterprise-grade digital ecosystems that shape the global tech landscape.",
      content: (
        <Image
          src="/vision/innovation.webp"
          alt="Innovation"
          width={350}
          height={500}
          className="object-cover w-full h-full"
        />
      ),
    },
    {
      title: "Leadership & Growth",
      description:
        "Guiding startups, enterprises, and global organizations with technology-driven leadership, growth strategy, and future-focused digital transformation insights.",
      content: (
        <Image
          src="/vision/leadership.webp"
          alt="Leadership"
          width={350}
          height={500}
          className="object-cover w-full h-full"
        />
      ),
    },
    {
      title: "AI Future",
      description:
        "Creating systems where AI automates decision-making, optimizes infrastructure, enhances human intelligence, and becomes the backbone of new digital economies.",
      content: (
        <Image
          src="/vision/ai.webp"
          alt="AI Future"
          width={350}
          height={500}
          className="object-cover w-full h-full"
        />
      ),
    },
    {
      title: "Blockchain Transformation",
      description:
        "Developing decentralized, transparent, secure blockchain ecosystems for enterprises, digital identity, financial inclusion, and next-gen public infrastructure.",
      content: (
        <Image
          src="/vision/blockchain.webp"
          alt="Blockchain"
          width={350}
          height={500}
          className="object-cover w-full h-full"
        />
      ),
    },
    {
      title: "Cybersecurity Excellence",
      description:
        "Engineering cyber-resilient infrastructures, secure automation, threat-intelligent systems, and zero-trust models for the modern digital world.",
      content: (
        <Image
          src="/vision/cybersecurity.webp"
          alt="Cybersecurity"
          width={350}
          height={500}
          className="object-cover w-full h-full"
        />
      ),
    },
  ];

  return (
    <section id="vision" className=" ">
      <div className="w-full mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-2">
          My{" "}
          <span className="text-[#10B981] drop-shadow-[0_0_12px_#10B981]">
            Vision & Mission
          </span>
        </h2>

        <p className="text-center text-white/60 max-w-3xl mx-auto mb-5">
          A deeper look into the mindset, innovation philosophy, and future
          goals behind every project, leadership role, and technological shift.
        </p>

        <StickyScroll
          content={items}
          contentClassName="rounded-3xl shadow-xl   sticky-no-scroll"
        />
      </div>
    </section>
  );
}
