"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Globe,
  LayoutDashboard,
  Smartphone,
  Chrome,
  Megaphone,
  BrainCircuit,
  Blocks,
} from "lucide-react";

export default function MabsolServices() {
  const services = [
    {
      title: "Web Development",
      description:
        "Modern, fast and scalable websites built with modern frameworks and optimized performance.",
      icon: Globe,
      link: "https://www.mabsoltech.com/services/web-development",
    },
    {
      title: "Web Applications",
      description:
        "Enterprise-grade web applications including dashboards, platforms and custom business systems.",
      icon: LayoutDashboard,
      link: "https://www.mabsoltech.com/services/web-app",
    },
    {
      title: "SaaS Platforms",
      description:
        "End-to-end SaaS product development including architecture, multi-tenant systems and cloud deployment.",
      icon: LayoutDashboard,
      link: "https://www.mabsoltech.com/services/saas/",
    },
    {
      title: "Chrome Extension Development",
      description:
        "Custom Chrome extensions for automation, productivity tools and browser-based applications.",
      icon: Chrome,
      link: "https://www.mabsoltech.com/services/chrome-extension",
    },
    {
      title: "Mobile App Development",
      description:
        "High performance mobile applications for both Android and iOS with scalable backend systems.",
      icon: Smartphone,
      link: "https://www.mabsoltech.com/services/mobile-app/",
    },
    {
      title: "Digital Marketing",
      description:
        "Growth-focused marketing strategies including SEO, paid ads, social media and analytics.",
      icon: Megaphone,
      link: "https://www.mabsoltech.com/services/digital-marketing",
    },
    {
      title: "Artificial Intelligence Solutions",
      description:
        "AI-powered applications including automation, AI agents, LLM systems and intelligent workflows.",
      icon: BrainCircuit,
      link: "https://www.mabsoltech.com/services/ai/",
    },
    {
      title: "Blockchain Development",
      description:
        "Smart contracts, decentralized applications (DApps), Web3 systems and blockchain integrations.",
      icon: Blocks,
      link: "https://www.mabsoltech.com/services/blockchain/",
    },
  ];

  return (
    <section className="relative pb-32 pt-4 px-6 bg-[#05060A] overflow-hidden">
      <div className="max-w-[1500px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <Image
            src="/mab-c.webp"
            alt="MABSOL Technologies"
            width={200}
            height={80}
            className="mx-auto mb-6"
          />

          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Services by{" "}
            <span className="text-[#10B981] drop-shadow-[0_0_12px_#10B981]">
              MABSOL Technologies
            </span>
          </h2>

          <p className="text-white/60 mt-5 max-w-2xl mx-auto text-lg">
            Delivering cutting-edge technology solutions including AI, SaaS, Web
            & Mobile Applications, Blockchain systems and digital growth
            strategies.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.a
                key={index}
                href={service.link}
                target="_blank"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-[#0A0F14] border border-white/10 rounded-2xl p-8
                text-center hover:border-[#10B981]
                hover:shadow-[0_0_40px_rgba(16,185,129,0.25)]
                transition flex flex-col justify-between"
              >
                <div>
                  <Icon size={36} className="mx-auto text-[#10B981]" />

                  <h3 className="text-lg font-semibold text-white mt-6">
                    {service.title}
                  </h3>

                  <p className="text-white/60 text-sm mt-4 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <span className="mt-6 text-[#10B981] font-semibold text-sm">
                  Learn More →
                </span>
              </motion.a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <a
            href="https://www.mabsoltech.com/"
            target="_blank"
            className="px-10 py-4 rounded-full bg-[#10B981] text-black font-semibold
            shadow-[0_0_25px_rgba(16,185,129,0.4)]
            hover:bg-[#10B981]/90 transition"
          >
            Explore MABSOL Technologies
          </a>
        </div>
      </div>
    </section>
  );
}
