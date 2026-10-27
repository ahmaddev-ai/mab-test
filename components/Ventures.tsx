"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Building2, Radio, Users } from "lucide-react";

export default function Ventures() {
  return (
    <section
      id="ventures"
      className="relative min-h-[120vh] pb-8 pt-4 px-6 bg-[#05060A] overflow-hidden"
    >
      {/* Background Glow Effects */}
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-10 w-[450px] h-[450px] bg-[#10B981]/10 blur-[150px]"
      />

      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#10B981]/10 blur-[180px]"
      />

      <div className="relative z-10 max-w-[1600px] mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-6"
        >
          Ventures &{" "}
          <span className="text-[#10B981] drop-shadow-[0_0_15px_#10B981]">
            Ecosystem
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white/60 text-lg max-w-3xl mx-auto mb-16"
        >
          Leading and contributing to organizations that shape the future of AI,
          Blockchain, Cloud and Cybersecurity — impacting teams, industries and
          communities globally.
        </motion.p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          {/* P2P Clouds */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[#0A0F14] border border-white/10 rounded-3xl p-10 text-center
              hover:border-[#10B981] hover:shadow-[0_0_60px_rgba(16,185,129,0.25)]
              transition-all shadow-[0_0_25px_rgba(16,185,129,0.12)] cursor-pointer"
          >
            <Image
              src="/p2pclouds.webp"
              alt="P2P Clouds"
              width={120}
              height={80}
              className="mx-auto mb-6 opacity-90"
            />
            <h3 className="text-2xl font-semibold text-white mb-3">
              P2P Clouds
            </h3>
            <p className="text-[#10B981] text-sm font-semibold">CEO</p>

            <p className="text-white/60 mt-4 leading-relaxed text-base">
              A next-gen cloud & AI solutions company delivering automation,
              SaaS platforms, enterprise systems and intelligent infrastructure
              for global clients.
            </p>
          </motion.div>

          {/* PBI */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="bg-[#0A0F14] border border-white/10 rounded-3xl p-10 text-center
              hover:border-[#10B981] hover:shadow-[0_0_60px_rgba(16,185,129,0.25)]
              transition-all shadow-[0_0_25px_rgba(16,185,129,0.12)] cursor-pointer"
          >
            <Image
              src="/mab-c.webp"
              alt="MABSOL Technologies"
              width={130}
              height={90}
              className="mx-auto mb-6 opacity-90 "
            />
            <h3 className="text-2xl font-semibold text-white mb-3">
              MABSOL Technologies
            </h3>
            <p className="text-[#10B981] text-sm font-semibold">CEO</p>

            <p className="text-white/60 mt-4 leading-relaxed text-base">
              MABSOL Technologies is a leading provider of AI, Blockchain and
              Cloud solutions, delivering innovative products and services to
              enterprises worldwide.
            </p>
          </motion.div>

          {/* ANZ Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#0A0F14] border border-white/10 rounded-3xl p-10 text-center
              hover:border-[#10B981] hover:shadow-[0_0_60px_rgba(16,185,129,0.25)]
              transition-all shadow-[0_0_25px_rgba(16,185,129,0.12)] cursor-pointer"
          >
            <Image
              src="/skill_ustad_0.webp"
              alt="ANZ Technologies"
              width={130}
              height={80}
              className="mx-auto mb-6 opacity-90 rounded-full"
            />
            <h3 className="text-2xl font-semibold text-white mb-3">
              SkillUstad
            </h3>
            <p className="text-[#10B981] text-sm font-semibold">
              Research & Development Head
            </p>

            <p className="text-white/60 mt-4 leading-relaxed text-base">
              SkillUstad Pakistan No.1 Training Platform, empowering individuals
              with in-demand tech skills through comprehensive courses, expert
              instructors, and industry-recognized certifications.
            </p>
          </motion.div>
        </div>

        {/* Optional 4th Block - Media / Leadership / Speaking */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mt-16 bg-[#0A0F14] border border-white/10 rounded-3xl p-10 text-center
  shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:shadow-[0_0_50px_rgba(16,185,129,0.25)]
  transition-all max-w-4xl mx-auto"
        >
          <Radio size={40} className="mx-auto text-[#10B981]" />

          <h3 className="text-2xl font-semibold text-white mt-4">
            Media & Tech Leadership
          </h3>

          <p className="text-white/60 mt-3 leading-relaxed max-w-2xl mx-auto">
            Featured on tech shows, delivering talks on AI, Cybersecurity,
            Blockchain and Innovation — inspiring developers, enterprises &
            communities.
          </p>

          {/* Channel Logos */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[
              "/channels/fm4.webp",
              "/channels/lahorerang.webp",
              "/channels/suno.webp",
              "/channels/sunopak.webp",
            ].map((logo, i) => (
              <div
                key={i}
                className="w-16 h-16 rounded-full overflow-hidden border border-white/10
        hover:scale-110 transition shadow-md"
              >
                <Image
                  src={logo}
                  alt="media channel"
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
