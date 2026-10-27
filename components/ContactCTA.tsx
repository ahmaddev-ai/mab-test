"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ContactCTA() {
  const router = useRouter();

  return (
    <section
      id="contact-cta"
      className="relative min-h-[55vh] py-24 px-6 bg-[#05060A] overflow-hidden"
    >
      {/* Background Glow Left */}
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-10 left-0 w-[400px] h-[400px] bg-[#10B981]/10 blur-[150px]"
      />

      {/* Background Glow Right */}
      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#10B981]/10 blur-[170px]"
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-white leading-tight"
        >
          Let’s Build What’s{" "}
          <span className="text-[#10B981] drop-shadow-[0_0_14px_#10B981]">
            Next
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-lg text-white/65 max-w-3xl mx-auto"
        >
          Strategy, architecture, and execution across AI, Blockchain,
          Cybersecurity, Modern Development, Marketing, and Financial Systems.
          Let’s discuss how we can turn your vision into a scalable reality.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row gap-6 justify-center"
        >
          {/* Primary CTA */}
          <Button
            onClick={() => router.push("/contact")}
            className="rounded-full px-10 py-6 text-lg bg-[#10B981] text-black font-semibold
              shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:bg-[#10B981]/80"
          >
            Book a Strategy Call
          </Button>

          {/* Secondary CTA */}
          <Button
            variant="outline"
            onClick={() => router.push("/contact")}
            className="rounded-full px-10 py-6 text-lg border-white/20 text-white
              hover:bg-white/5"
          >
            Contact Me
          </Button>
        </motion.div>

        {/* Trust Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 text-sm text-white/45"
        >
          Available globally · Remote & on-site engagements · Response within
          24–48 hours
        </motion.p>
      </div>
    </section>
  );
}
