"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Clients() {
  const clients = [
    "/clients/fast-small.webp",
    "/clients/jamia-small.webp",
    "/clients/psca-small.webp",
    "/clients/superior-small.webp",
    "/clients/umt-small.webp",
    "/clients/uol-small.webp",
    "/clients/web3pak-small.webp",
  ];

  return (
    <section className="relative pb-28 bg-[#05060A] overflow-hidden px-6">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-20 items-center">
        {/* LEFT SIDE — HEXAGON LOGOS */}
        <div className="flex flex-wrap justify-center gap-6">
          {clients.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="w-[110px] h-[120px] bg-[#0A0F14] border border-white/10 
              flex items-center justify-center 
              hover:scale-110 hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]
              transition"
              style={{
                clipPath:
                  "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0 50%)",
              }}
            >
              <Image
                src={logo}
                alt="client"
                width={70}
                height={50}
                className="object-contain opacity-80"
              />
            </motion.div>
          ))}
        </div>

        {/* RIGHT SIDE — TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Trusted by{" "}
            <span className="text-[#10B981] drop-shadow-[0_0_12px_#10B981]">
              1000+
            </span>{" "}
            Clients
          </h2>

          <p className="text-white/60 mt-6 text-lg max-w-xl">
            Our solutions power universities, government organizations,
            startups, and global tech communities across Pakistan and
            internationally.
          </p>

          <div className="mt-8 text-white/50 text-sm">
            FAST • UMT • UOL • Jamia • PSCA • Web3Pak • Superior University
          </div>
        </motion.div>
      </div>
    </section>
  );
}
