"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { WavyBackground } from "@/components/ui/wavy-background";
import {
  Cpu,
  Network,
  ShieldCheck,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Mail,
  Users,
  Mic,
  Presentation,
} from "lucide-react";
import AIParticles from "./ABSOLUTE/ai-particels";
import CyberGrid from "./ABSOLUTE/cyber";
import Link from "next/link";

/* ───────────────── SOCIAL ICON ───────────────── */
function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-full
                 border border-white/15
                 text-white/70
                 hover:text-emerald-400
                 hover:border-emerald-400/40
                 hover:shadow-[0_0_15px_rgba(16,185,129,0.35)]
                 transition"
    >
      {icon}
    </a>
  );
}

export default function Hero() {
  return (
    <WavyBackground
      className="min-h-screen w-full flex flex-col overflow-x-hidden"
      containerClassName="min-h-[100svh] bg-[#05060a] overflow-x-hidden"
      colors={["#0f172a", "#0f766e", "#10b981", "#0a0f14"]}
      waveWidth={60}
      backgroundFill="#05060a"
      blur={6}
      speed="slow"
      waveOpacity={0.35}
    >
      {/* ───────────────── FLOATING TECH ICONS ───────────────── */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-[26%] hidden md:block"
      >
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.45)]">
          <Cpu className="w-6 h-6 text-emerald-400" />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-24 left-[38%] hidden md:block"
      >
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.45)]">
          <Network className="w-6 h-6 text-emerald-400" />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[45%] left-12 hidden md:block"
      >
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.45)]">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
        </div>
      </motion.div>

      {/* BACKGROUND EFFECTS */}
      <AIParticles />
      <CyberGrid />

      {/* ───────────────── MAIN HERO ───────────────── */}
      <section
        id="home"
        className="relative z-10 w-full max-w-7xl mx-auto
  min-h-[calc(100svh-4rem)]
  px-5 sm:px-6 md:px-10
  flex flex-col md:flex-row items-center gap-14
  pt-[6.5rem] sm:pt-28 md:pt-20"
      >
        {/* GLOW ORBS */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 left-16 w-72 h-72 bg-emerald-500/20 blur-3xl rounded-full"
        />

        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 right-16 w-80 h-80 bg-emerald-500/15 blur-3xl rounded-full"
        />

        {/* ───────── LEFT CONTENT ───────── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-[2.4rem] sm:text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="text-white/90">Mian Ahmad Basit</span>
            <br />
            <span className="inline-block mt-4 px-4 py-1.5 rounded-xl bg-emerald-500 text-black font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.5)]">
              Tech Polymath
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto md:mx-0">
            AI × Blockchain × Cybersecurity Visionary. CEO of P2P Clouds. CTO at
            PBI & ANZ Technologies. Educator and speaker building secure,
            intelligent, and scalable digital systems.
          </p>

          {/* STATS */}
          <div className="mt-8 grid grid-cols-3 gap-6 max-w-xl mx-auto md:mx-0">
            <Stat icon={<Users />} value="50k+" label="Students Taught" />
            <Stat icon={<Presentation />} value="Webinars" label="Global" />
            <Stat icon={<Mic />} value="Talks" label="Conferences" />
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/contact">
              <Button className="rounded-full cursor-pointer px-10 py-6 text-lg bg-emerald-500 text-black font-semibold shadow-[0_0_25px_rgba(16,185,129,0.45)] hover:bg-emerald-600">
                Book a Strategy Call
              </Button>
            </Link>

            {/* <Link href="/mab-fast-earning-program">
              <Button
                variant="outline"
                className="rounded-full cursor-pointer px-10 py-6 text-lg border-white/20 text-black hover:bg-white/5 hover:text-white"
              >
                View Courses
              </Button>
            </Link> */}
          </div>

          {/* SOCIAL LINKS */}
          <div className="mt-10 flex items-center gap-6 justify-center md:justify-start">
            <SocialIcon
              href="https://github.com/MianAhmadBasit"
              icon={<Github />}
            />
            <SocialIcon
              href="https://www.linkedin.com/in/mianahmadbasit/"
              icon={<Linkedin />}
            />
            <SocialIcon
              href="https://www.facebook.com/mianahmedbasit/"
              icon={<Facebook />}
            />
            <SocialIcon
              href="https://www.instagram.com/mianahmadbasit/?hl=en"
              icon={<Instagram />}
            />
            <SocialIcon href="mailto:youremail@gmail.com" icon={<Mail />} />
          </div>
        </motion.div>

        {/* ───────── RIGHT IMAGE ───────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex justify-center "
        >
          <div
            className="relative w-80 h-80 md:w-[420px] md:h-[420px]
                          rounded-3xl overflow-hidden border border-white/15
                          shadow-[0_0_50px_rgba(16,185,129,0.45)]
                          bg-black/40 backdrop-blur-xl "
          >
            <Image
              src="/mab.webp"
              alt="Mian Ahmad Basit"
              fill
              className="object-cover "
              priority
            />
          </div>
        </motion.div>
      </section>
    </WavyBackground>
  );
}

/* ───────────────── STAT COMPONENT ───────────────── */
function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 justify-center md:justify-start">
      <div className="text-emerald-400">{icon}</div>
      <div className="text-left">
        <p className="text-lg font-bold">{value}</p>
        <p className="text-xs text-white/60">{label}</p>
      </div>
    </div>
  );
}
