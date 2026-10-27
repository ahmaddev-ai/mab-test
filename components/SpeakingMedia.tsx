"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mic, Radio, Users } from "lucide-react";

export default function SpeakingMedia() {
  return (
    <section
      id="speaking"
      className="relative min-h-[80vh] py-24 px-6 bg-[#05060A] overflow-hidden"
    >
      {/* Background Glows */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 left-0 w-[400px] h-[400px] bg-[#10B981]/10 blur-[130px]"
      />
      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#10B981]/10 blur-[150px]"
      />

      {/* Grid Container */}
      <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        {/* LEFT: TEXT + MINI ITEMS */}
        <div className="text-center md:text-left">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          >
            Speaking &{" "}
            <span className="text-[#10B981] drop-shadow-[0_0_15px_#10B981]">
              Media Presence
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-white/60 text-lg max-w-lg mb-10 leading-relaxed"
          >
            Featured on national TV and global platforms — delivering impactful
            sessions on AI, Blockchain, Cybersecurity & Future Tech.
          </motion.p>

          {/* SMALL & CLEAN ITEMS */}
          <div className="flex flex-col gap-6">
            {/* ITEM 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 p-4 rounded-xl bg-[#0A0F14] border border-white/10 hover:border-[#10B981]/40 transition"
            >
              <Radio className="w-6 h-6 text-[#10B981] mt-1" />
              <div>
                <h4 className="text-xl font-semibold text-white">
                  TV & Media Appearances
                </h4>
                <p className="text-white/60 text-sm mt-1">
                  Interviews discussing Pakistan’s digital future, AI & cyber
                  resilience.
                </p>
              </div>
            </motion.div>

            {/* ITEM 2 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 p-4 rounded-xl bg-[#0A0F14] border border-white/10 hover:border-[#10B981]/40 transition"
            >
              <Mic className="w-6 h-6 text-[#10B981] mt-1" />
              <div>
                <h4 className="text-xl font-semibold text-white">
                  Corporate Keynotes
                </h4>
                <p className="text-white/60 text-sm mt-1">
                  High-impact sessions for enterprises, incubators & global
                  teams.
                </p>
              </div>
            </motion.div>

            {/* ITEM 3 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 p-4 rounded-xl bg-[#0A0F14] border border-white/10 hover:border-[#10B981]/40 transition"
            >
              <Users className="w-6 h-6 text-[#10B981] mt-1" />
              <div>
                <h4 className="text-xl font-semibold text-white">
                  Community Leadership
                </h4>
                <p className="text-white/60 text-sm mt-1">
                  Guiding students, founders & developers toward future skills.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT: IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative w-[320px] h-[420px] md:w-[450px] md:h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-black/30 backdrop-blur-xl shadow-[0_0_40px_rgba(16,185,129,0.25)]">
            <Image
              src="/speaking-mab.webp"
              alt="Speaking Sessions - Mian Ahmad Basit"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
