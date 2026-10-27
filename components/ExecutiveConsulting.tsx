"use client";

import { motion } from "framer-motion";
import { Crown, BrainCircuit, ShieldCheck } from "lucide-react";

export default function ExecutiveConsulting() {
  return (
    <section className="relative pb-32 px-6 bg-[#05060A] overflow-hidden">
      {/* Glow Effects */}
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-10 left-10 w-[420px] h-[420px] bg-[#10B981]/10 blur-[140px]"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            One-to-One{" "}
            <span className="text-[#10B981] drop-shadow-[0_0_12px_#10B981]">
              Executive Consulting
            </span>
          </h2>

          <p className="text-white/60 mt-6 text-lg">
            Strategic advisory for founders, CEOs and C-level executives who
            want to adopt emerging technologies like AI, Blockchain and
            Cybersecurity to transform their organizations.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10 mt-20">
          {/* Card 1 */}
          <div className="bg-[#0A0F14] border border-white/10 rounded-2xl p-10 text-center hover:border-[#10B981] transition">
            <Crown className="mx-auto text-[#10B981]" size={40} />
            <h3 className="text-xl font-semibold text-white mt-6">
              C-Level Strategy
            </h3>
            <p className="text-white/60 mt-4">
              Personalized sessions for CEOs, CTOs and founders on integrating
              AI, Blockchain and cloud infrastructure into business strategy.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0A0F14] border border-white/10 rounded-2xl p-10 text-center hover:border-[#10B981] transition">
            <BrainCircuit className="mx-auto text-[#10B981]" size={40} />
            <h3 className="text-xl font-semibold text-white mt-6">
              AI Transformation
            </h3>
            <p className="text-white/60 mt-4">
              Guidance on building AI powered products, automations, LLM
              solutions and data driven decision systems.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0A0F14] border border-white/10 rounded-2xl p-10 text-center hover:border-[#10B981] transition">
            <ShieldCheck className="mx-auto text-[#10B981]" size={40} />
            <h3 className="text-xl font-semibold text-white mt-6">
              Secure Tech Architecture
            </h3>
            <p className="text-white/60 mt-4">
              Advisory on scalable system design, blockchain architecture,
              cybersecurity frameworks and enterprise-grade technology stacks.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <button
            className="px-10 py-4 rounded-full bg-[#10B981] text-black font-semibold
          shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:bg-[#10B981]/90 transition"
          >
            Book a Private Strategy Session
          </button>
        </div>
      </div>
    </section>
  );
}
