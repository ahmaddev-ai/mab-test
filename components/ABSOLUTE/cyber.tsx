"use client";

import { motion } from "framer-motion";

export default function CyberGrid() {
  return (
    <motion.div
      initial={{ opacity: 0.15 }}
      animate={{
        opacity: [0.15, 0.25, 0.2],
        backgroundPositionX: ["0px", "80px"],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute inset-0 -z-40 opacity-20"
      style={{
        backgroundImage:
          "linear-gradient(#10B98133 1px, transparent 1px), linear-gradient(90deg, #10B98133 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    ></motion.div>
  );
}
