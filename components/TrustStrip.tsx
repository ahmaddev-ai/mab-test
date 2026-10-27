"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TrustStrip() {
  return (
    <section
      id="trust"
      className="
        relative w-full
        min-h-[180px] sm:min-h-[240px] md:min-h-[280px]
        
        flex flex-col items-center justify-center
        overflow-hidden
        px-4 sm:px-6 md:px-10 
      "
    >
      {/* BG Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0F14]/60 to-black opacity-70" />

      {/* TOP HEADING */}
      <div className="absolute top-4 sm:top-6 md:top-10 z-10 w-full text-center px-3">
        <h3
          className="
            text-white/70
            text-xs sm:text-sm md:text-base
            tracking-wide uppercase
          "
        >
          Trusted By Leaders in AI, Blockchain & Cloud Innovation
        </h3>
      </div>

      {/* SLIDING LOGO ROW */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-50%" }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
        className="
          flex items-center
          gap-8 sm:gap-12 md:gap-20
          absolute z-20
        "
      >
        {["/p2pclouds.webp", "/ozi.webp", "/p2pclouds.webp", "/ozi.webp"].map(
          (logo, i) => (
            <div
              key={i}
              className="
              flex items-center justify-center
              w-12 h-12
              sm:w-14 sm:h-14
              md:w-18 md:h-18
              lg:w-20 lg:h-20
              rounded-full
              bg-white/5
              border border-white/10
              backdrop-blur-md
              shadow-[0_0_8px_rgba(255,255,255,0.1)]
              hover:shadow-[0_0_14px_rgba(255,255,255,0.25)]
              transition
            "
            >
              <Image
                src={logo}
                alt="Partner Logo"
                width={120}
                height={120}
                className="
                object-contain
                rounded-full
                opacity-80
                hover:opacity-100
                transition
              "
              />
            </div>
          )
        )}
      </motion.div>
    </section>
  );
}
