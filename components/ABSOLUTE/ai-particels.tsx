"use client";

import { motion } from "framer-motion";

export default function AIParticles() {
  const particles = Array.from({ length: 30 });

  return (
    <div className="absolute inset-0 -z-30 overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            scale: 0.4,
            x: Math.random() * 1200 - 600,
            y: Math.random() * 800 - 400,
          }}
          animate={{
            opacity: [0, 1, 0.7, 1],
            y: `-${200 + Math.random() * 200}px`,
            x: `+=${Math.random() * 80 - 40}px`,
            scale: [0.4, 0.8, 0.5, 0.9],
          }}
          transition={{
            duration: 6 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_12px_#10B981] blur-sm"
        />
      ))}
    </div>
  );
}
