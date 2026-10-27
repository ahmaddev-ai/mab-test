"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Bot, Dumbbell, BookCopy } from "lucide-react";

export default function Products() {
  const products = [
    {
      title: "AI LMS Platform",
      description:
        "AI-powered learning management system with automated assessments, smart analytics and personalized learning paths.",
      icon: BookCopy,
      link: "https://p2pclouds.net/lms/",
    },
    {
      title: "AI CRM System",
      description:
        "Customer relationship platform powered by AI for lead tracking, automation, analytics and smart engagement.",
      icon: Users,
      link: "https://p2pclouds.net/crm/",
    },
    {
      title: "Customer Service AI Agent",
      description:
        "Conversational AI agents that automate customer support, handle queries and integrate with business systems.",
      icon: Bot,
      link: "https://p2pclouds.net/ai-agents/",
    },
    {
      title: "Gym Management Software",
      description:
        "Complete gym SaaS platform for member management, QR cards, payments, analytics and product sales.",
      icon: Dumbbell,
      link: "https://p2pclouds.net/gym",
    },
  ];

  return (
    <section className="relative pb-32 px-6 bg-[#05060A] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <Image
            src="/p2pclouds.webp"
            alt="P2P Clouds"
            width={160}
            height={80}
            className="mx-auto mb-6"
          />

          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Products by{" "}
            <span className="text-[#10B981] drop-shadow-[0_0_12px_#10B981]">
              P2P Clouds
            </span>
          </h2>

          <p className="text-white/60 mt-4 text-lg max-w-2xl mx-auto">
            AI-powered platforms designed to help organizations automate, scale
            and transform their digital infrastructure.
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product, index) => {
            const Icon = product.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-[#0A0F14] border border-white/10 rounded-2xl p-8 text-center
                hover:border-[#10B981] hover:shadow-[0_0_40px_rgba(16,185,129,0.25)]
                transition flex flex-col justify-between"
              >
                <div>
                  <Icon className="mx-auto text-[#10B981]" size={36} />

                  <h3 className="text-xl font-semibold text-white mt-6">
                    {product.title}
                  </h3>

                  <p className="text-white/60 mt-4 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Button */}
                <a
                  href={product.link}
                  target="_blank"
                  className="mt-6 inline-block px-6 py-3 rounded-full
                  bg-[#10B981] text-black font-semibold
                  hover:bg-[#10B981]/90 transition"
                >
                  See More
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Explore Button */}
        <div className="text-center mt-16">
          <a
            href="https://p2pclouds.net/"
            target="_blank"
            className="inline-block px-10 py-4 rounded-full
            border border-[#10B981] text-[#10B981]
            hover:bg-[#10B981] hover:text-black
            transition font-semibold"
          >
            Explore P2P Clouds
          </a>
        </div>
      </div>
    </section>
  );
}
