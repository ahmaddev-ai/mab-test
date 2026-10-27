"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function BlogHighlights() {
  return (
    <section
      id="blog"
      className="relative min-h-[70vh] py-24 px-6 bg-[#05060A] overflow-hidden"
    >
      {/* Background neon glows */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-10 left-0 w-[400px] h-[400px] bg-[#10B981]/10 blur-[140px]"
      />

      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#10B981]/10 blur-[150px]"
      />

      <div className="relative z-10 max-w-[1600px] mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-6"
        >
          Blog{" "}
          <span className="text-[#10B981] drop-shadow-[0_0_12px_#10B981]">
            Highlights
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-white/60 text-lg mb-16 max-w-3xl mx-auto"
        >
          Insights on AI, Cybersecurity, Blockchain and the Future of Digital
          Transformation.
        </motion.p>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-6">
          {/* Blog 1 */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="group bg-[#0A0F14] border border-white/10 rounded-3xl overflow-hidden 
              shadow-[0_0_25px_rgba(16,185,129,0.12)]
              hover:border-[#10B981] hover:shadow-[0_0_55px_rgba(16,185,129,0.3)]
              transition-all cursor-pointer"
          >
            <Image
              src="/blogs/ai.webp"
              alt="Blog"
              width={500}
              height={300}
              className="object-cover w-full h-48 group-hover:scale-105 transition duration-300"
            />

            <div className="p-8 text-left">
              <h3 className="text-xl font-semibold text-white">
                The Future of AI: From Agents to Autonomous Systems
              </h3>
              <p className="text-white/60 mt-3 text-sm leading-relaxed">
                How modern AI is shifting from chatbots to intelligent
                decision-making systems powering businesses.
              </p>

              <Link
                href="#"
                className="text-[#10B981] font-semibold mt-4 inline-block"
              >
                Read more →
              </Link>
            </div>
          </motion.div>

          {/* Blog 2 */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group bg-[#0A0F14] border border-white/10 rounded-3xl overflow-hidden 
              shadow-[0_0_25px_rgba(16,185,129,0.12)]
              hover:border-[#10B981] hover:shadow-[0_0_55px_rgba(16,185,129,0.3)]
              transition-all cursor-pointer"
          >
            <Image
              src="/blogs/development.webp"
              alt="Blog"
              width={500}
              height={300}
              className="object-cover w-full h-48 group-hover:scale-105 transition duration-300"
            />

            <div className="p-8 text-left">
              <h3 className="text-xl font-semibold text-white">
                Cybersecurity in 2025 — What Companies Must Prepare For
              </h3>
              <p className="text-white/60 mt-3 text-sm leading-relaxed">
                A breakdown of major security risks and the architecture needed
                to protect modern digital enterprises.
              </p>

              <Link
                href="#"
                className="text-[#10B981] font-semibold mt-4 inline-block"
              >
                Read more →
              </Link>
            </div>
          </motion.div>

          {/* Blog 3 */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="group bg-[#0A0F14] border border-white/10 rounded-3xl overflow-hidden 
              shadow-[0_0_25px_rgba(16,185,129,0.12)]
              hover:border-[#10B981] hover:shadow-[0_0_55px_rgba(16,185,129,0.3)]
              transition-all cursor-pointer"
          >
            <Image
              src="/blogs/blockchain.webp"
              alt="Blog"
              width={500}
              height={300}
              className="object-cover w-full h-48 group-hover:scale-105 transition duration-300"
            />

            <div className="p-8 text-left">
              <h3 className="text-xl font-semibold text-white">
                Blockchain Beyond Crypto — Real Enterprise Use Cases
              </h3>
              <p className="text-white/60 mt-3 text-sm leading-relaxed">
                From supply chain to identity management — how Web3 is powering
                new digital ecosystems.
              </p>

              <Link
                href="#"
                className="text-[#10B981] font-semibold mt-4 inline-block"
              >
                Read more →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
