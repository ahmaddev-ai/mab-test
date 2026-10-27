"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function GalleryParallax() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax layers
  const layerSlow = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const layerMid = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const layerFast = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative py-32 px-6 bg-[#05060A] overflow-hidden"
    >
      {/* Background Glows */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute -top-10 left-0 w-[420px] h-[420px] bg-[#10B981]/10 blur-[130px]"
      />
      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 9, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#10B981]/10 blur-[160px]"
      />

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center text-white mb-6"
      >
        Visual Journey{" "}
        <span className="text-[#10B981] drop-shadow-[0_0_12px_#10B981]">
          Through Innovation
        </span>
      </motion.h2>

      <p className="text-center text-white/60 mb-20 max-w-3xl mx-auto">
        Webinars, AI breakthroughs, tech events & media highlights — brought to
        life with immersive motion.
      </p>

      {/* --------------------- ROW 1 (4 images) --------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-[1500px] mx-auto">
        {[1, 2, 3, 4].map((num, i) => (
          <motion.div
            key={i}
            style={{ y: i % 2 === 0 ? layerSlow : layerMid }}
            whileHover={{
              rotateX: -6,
              rotateY: 6,
              scale: 1.06,
              transition: { type: "spring", bounce: 0.3, duration: 0.8 },
            }}
            className="rounded-3xl overflow-hidden border border-white/10 
            shadow-lg bg-[#0A0F14] group relative cursor-pointer"
          >
            <Image
              src={`/gallery/gallery${num}.jpg`}
              width={700}
              height={700}
              alt=""
              className="object-cover w-full h-full duration-300"
            />

            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition 
            bg-gradient-to-br from-white/20 to-transparent"
            />
          </motion.div>
        ))}
      </div>

      {/* --------------------- ROW 2 (4 images) --------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-[1500px] mx-auto mt-10">
        {[5, 6, 7, 8].map((num, i) => (
          <motion.div
            key={i}
            style={{ y: i % 2 === 0 ? layerFast : layerMid }}
            whileHover={{
              rotateX: -6,
              rotateY: 6,
              scale: 1.06,
              transition: { type: "spring", bounce: 0.3, duration: 0.8 },
            }}
            className="rounded-3xl overflow-hidden border border-white/10 
            shadow-lg bg-[#0A0F14] group relative cursor-pointer"
          >
            <Image
              src={`/gallery/gallery${num}.jpg`}
              width={700}
              height={700}
              alt=""
              className="object-cover w-full h-full duration:300"
            />
          </motion.div>
        ))}
      </div>

      {/* --------------------- ROW 3 (3 images) --------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto mt-10">
        {[9, 10, 11].map((num, i) => (
          <motion.div
            key={i}
            style={{ y: i === 1 ? layerFast : layerMid }}
            whileHover={{
              rotateX: -6,
              rotateY: 6,
              scale: 1.06,
              transition: { type: "spring", bounce: 0.3, duration: 0.8 },
            }}
            className="rounded-3xl overflow-hidden border border-white/10 
            shadow-lg bg-[#0A0F14] group relative cursor-pointer"
          >
            <Image
              src={`/gallery/gallery${num}.jpg`}
              width={700}
              height={700}
              alt=""
              className="object-cover w-full h-full duration-300"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
