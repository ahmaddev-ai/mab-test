"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Lock, Network, CircuitBoard } from "lucide-react";

export default function Expertise() {
  return (
    <section
      id="expertise"
      className="relative min-h-[75vh] pt-20 pb-0 px-6 bg-[#05060A] overflow-hidden"
    >
      {/* BG Glow */}
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 left-0 w-96 h-96 bg-[#10B981]/10 blur-[130px]"
      />

      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#10B981]/10 blur-[150px]"
      />

      {/* Container */}
      <div className="relative z-10 max-w-[1600px] mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-4"
        >
          Expertise &{" "}
          <span className="text-[#10B981] drop-shadow-[0_0_12px_#10B981]">
            Services
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-white/60 text-lg max-w-2xl mx-auto mb-14"
        >
          A strategic blend of Artificial Intelligence, Blockchain engineering
          and Cybersecurity — enabling organizations to build the future with
          confidence, intelligence and security.
        </motion.p>

        {/* Expertise Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          {/* AI Engineering */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#0A0F14] border border-white/10 rounded-2xl p-10 text-center
              hover:border-[#10B981] hover:shadow-[0_0_40px_rgba(16,185,129,0.25)]
              transition-all cursor-pointer"
          >
            <BrainCircuit size={55} className="mx-auto text-[#10B981]" />
            <h3 className="text-2xl font-semibold text-white mt-6">
              AI Engineering
            </h3>
            <p className="text-white/60 mt-4 text-base leading-relaxed">
              AI agents, intelligent automation, NLP systems, enterprise
              chatbots & predictive analytics — built for real-world impact.
            </p>
          </motion.div>

          {/* Blockchain Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="bg-[#0A0F14] border border-white/10 rounded-2xl p-10 text-center
              hover:border-[#10B981] hover:shadow-[0_0_40px_rgba(16,185,129,0.25)]
              transition-all cursor-pointer"
          >
            <Network size={55} className="mx-auto text-[#10B981]" />
            <h3 className="text-2xl font-semibold text-white mt-6">
              Blockchain Engineering
            </h3>
            <p className="text-white/60 mt-4 text-base leading-relaxed">
              Smart contracts, tokenization, Web3 apps, decentralized systems
              and secure blockchain integrations — for tomorrow’s internet.
            </p>
          </motion.div>

          {/* Cybersecurity Architecture */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#0A0F14] border border-white/10 rounded-2xl p-10 text-center
              hover:border-[#10B981] hover:shadow-[0_0_40px_rgba(16,185,129,0.25)]
              transition-all cursor-pointer"
          >
            <Lock size={55} className="mx-auto text-[#10B981]" />
            <h3 className="text-2xl font-semibold text-white mt-6">
              Cybersecurity Architecture
            </h3>
            <p className="text-white/60 mt-4 text-base leading-relaxed">
              Secure system design, risk mitigation, cyber defense strategies
              and enterprise security frameworks to safeguard digital assets.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
