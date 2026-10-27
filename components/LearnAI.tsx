"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LearnAI() {
  return (
    <section className="relative pb-28 pt-8 px-6 bg-[#05060A] overflow-hidden">
      {/* Background Glow */}
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-10 left-0 w-[420px] h-[420px] bg-[#10B981]/10 blur-[140px]"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto grid md:grid-cols-2 gap-20 items-center">
        {/* LEFT SIDE — TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Learn{" "}
            <span className="text-[#10B981] drop-shadow-[0_0_12px_#10B981]">
              Emerging Technologies
            </span>
          </h2>

          <p className="text-white/60 mt-6 text-lg max-w-xl">
            If you're a developer, student or founder looking to enter the world
            of Artificial Intelligence, Blockchain and modern technologies,
            SkillUstad provides industry-focused training programs designed for
            real-world skills.
          </p>

          {/* Promo */}
          <div className="mt-8 bg-[#0A0F14] border border-[#10B981]/40 rounded-xl p-6">
            <p className="text-white text-lg">
              Use Promo Code:
              <span className="text-[#10B981] font-bold text-xl ml-2">MAB</span>
            </p>

            <p className="text-white/60 mt-2">
              Get <span className="text-[#10B981] font-semibold">50% OFF</span>{" "}
              on selected AI & emerging technology courses.
            </p>
          </div>

          {/* CTA */}
          <Link
            href="https://skillustad.com?ref=mab"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="mt-8 px-8 py-4 rounded-full bg-[#10B981] text-black font-semibold
            shadow-[0_0_25px_rgba(16,185,129,0.5)] cursor-pointer hover:bg-[#10B981]/90 transition"
            >
              Start Learning with SkillUstad
            </button>
          </Link>
        </motion.div>

        {/* RIGHT SIDE — LOGO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div
            className="bg-[#0A0F14] border border-white/10 rounded-3xl p-12
          shadow-[0_0_40px_rgba(16,185,129,0.2)]"
          >
            <Image
              src="/skill_ustad_0.webp"
              alt="SkillUstad"
              width={220}
              height={120}
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
