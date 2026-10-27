"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function GlobalAIPointer() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Smooth pointer motion
  const x = useSpring(rawX, { stiffness: 300, damping: 25, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 300, damping: 25, mass: 0.4 });

  // Offsets using useTransform (TS SAFE)
  const glowX = useTransform(x, (v) => v - 20);
  const glowY = useTransform(y, (v) => v - 20);

  const pointerX = useTransform(x, (v) => v - 2);
  const pointerY = useTransform(y, (v) => v - 2);

  const tipX = useTransform(x, (v) => v + 20);
  const tipY = useTransform(y, (v) => v + 25);

  // Mouse move listener
  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* GLOW */}
      <motion.div
        className="pointer-events-none fixed z-[9997] h-10 w-10 
        rounded-full bg-[#00E5FF]/35 blur-xl mix-blend-screen"
        style={{ x: glowX, y: glowY }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.3 }}
      />

      {/* MAIN POINTER */}
      <motion.div
        className="pointer-events-none fixed z-[9999]"
        style={{ x: pointerX, y: pointerY }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="#00E5FF"
          stroke="#00E5FF"
          strokeWidth="1.5"
          className="drop-shadow-[0_0_8px_#00E5FF]"
        >
          <path d="M3 2L20 12L12 14L10 22L3 2Z" />
        </svg>
      </motion.div>

      {/* TOOLTIP */}
      <motion.div
        className="pointer-events-none fixed z-[9998] flex items-center gap-2 
        px-3 py-1.5 rounded-full bg-[#00C2A8] text-white shadow-lg 
        font-semibold text-xs"
        style={{ x: tipX, y: tipY }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        <img
          src="/mab.webp"
          className="h-6 w-6 rounded-full border border-white/20 object-cover"
        />
        <span>MAB</span>
      </motion.div>
    </>
  );
}
