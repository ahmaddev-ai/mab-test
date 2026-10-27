"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Twitter, Instagram, Github, Mail } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const expertiseList = [
  "Artificial Intelligence (AI) & AI Integration",
  "Blockchain Technology & Web3",
  "Cloud Computing & Cloud-Native Architecture",
  "Software Engineering",
  "SaaS Product Development",
  "Cybersecurity",
  "Digital Transformation",
];

const careerRoles = [
  "Software Engineer",
  "Lead Engineer",
  "Technology Consultant",
  "Blockchain Advisor",
  "CTO / Technology Leader",
];

const productAreas = [
  "Artificial Intelligence solutions",
  "Blockchain applications",
  "Cloud-based platforms",
  "Automation systems",
  "Digital transformation services",
];

const companies = [
  { src: "/companies/p2pclouds.webp", name: "P2P Clouds", role: "CEO" },
  { src: "/companies/mab-c.webp", name: "MABSOL Technologies", role: "CEO" },
  {
    src: "/companies/skill_ustad_0.webp",
    name: "SkillUstad",
    role: "Research & Development Director",
  },
  { src: "/companies/teps.jpg", name: "TEPS", role: "Education Partner" },
];

const speakingTopics = [
  "Artificial Intelligence",
  "Blockchain & Web3",
  "Cloud Computing",
  "Software Product Development",
  "Technology Entrepreneurship",
];

const faqs = [
  {
    q: "Who is Ahmad Basit?",
    a: "Ahmad Basit is a technology entrepreneur, AI innovator, software product builder, and technology educator specializing in Artificial Intelligence, Blockchain, Cloud Computing, and SaaS solutions.",
  },
  {
    q: "What technologies does Ahmad Basit work with?",
    a: "Ahmad Basit works with emerging technologies including AI, Blockchain, Web3, Cloud Computing, software engineering, automation, and digital transformation.",
  },
  {
    q: "What is Ahmad Basit known for?",
    a: "Ahmad Basit is known for building technology products, mentoring developers, speaking about emerging technologies, and contributing to Pakistan's technology ecosystem.",
  },
  {
    q: "Does Ahmad Basit provide technology consulting?",
    a: "Yes, Ahmad Basit provides technology leadership, consulting, and innovation guidance for businesses building digital products and adopting emerging technologies.",
  },
];

const socialLinks = [
  {
    href: "https://pk.linkedin.com/in/mianahmadbasit",
    label: "LinkedIn",
    icon: <Linkedin size={18} />,
  },
  {
    href: "https://twitter.com/MianAhmadBasit1",
    label: "Twitter / X",
    icon: <Twitter size={18} />,
  },
  {
    href: "https://www.instagram.com/mianahmadbasit",
    label: "Instagram",
    icon: <Instagram size={18} />,
  },
  {
    href: "https://github.com/MianAhmadBasit",
    label: "GitHub",
    icon: <Github size={18} />,
  },
  {
    href: "mailto:info@p2pclouds.net",
    label: "Email",
    icon: <Mail size={18} />,
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="text-slate-400 dark:text-white/35 text-[11px] font-mono font-bold uppercase tracking-[0.22em] whitespace-nowrap">
        {children}
      </span>
      <div className="flex-1 h-px bg-slate-200 dark:bg-white/10" />
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 dark:border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 cursor-pointer"
      >
        <span className="text-slate-900 dark:text-white text-sm font-semibold leading-snug">
          {q}
        </span>
        <span className="text-[#1447E6] text-xl font-light flex-shrink-0 leading-none">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <p className="text-slate-600 dark:text-white/55 text-sm leading-relaxed pb-5">
          {a}
        </p>
      )}
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden">
      {/* ══ SECTION 1 — HERO ══ */}
      <div className="bg-white dark:bg-[#0A0A0A]">
        <div className="mx-auto max-w-[1400px] px-4 pt-14 pb-14 sm:px-6 sm:pt-20 sm:pb-20 md:pt-32 md:pb-28">
          <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 md:grid-cols-12 md:gap-16">

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="min-w-0 space-y-5 sm:space-y-6 md:col-span-8"
            >
              {/* Eyebrow */}
              <span className="flex max-w-full flex-wrap items-center gap-2 font-mono text-[9px] font-semibold uppercase leading-5 tracking-[0.16em] text-slate-500 dark:text-white/40 sm:gap-3 sm:text-[10px] sm:tracking-[0.2em] md:text-[11px] md:tracking-[0.22em]">
                <span className="block h-px w-6 shrink-0 bg-gradient-to-r from-[#1447E6] to-transparent sm:w-8" />

                <span className="min-w-0">
                  Technology Entrepreneur · AI Innovation Leader · Blockchain & Cloud
                  Expert
                </span>
              </span>

              <div className="min-w-0">
                {/* Label */}
                <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-white/40 sm:mb-4 sm:text-xs sm:tracking-[0.18em]">
                  Professional Overview
                </p>

                {/* Heading */}
                <h1 className="break-words font-heading text-[2.7rem] font-extrabold leading-[0.95] tracking-tight text-slate-900 dark:text-white sm:text-5xl sm:leading-[0.92] md:text-7xl lg:text-[5.5rem]">
                  <span>Technology,</span>
                  <br />
                  <span>Innovation &</span>
                  <br />
                  <span className="text-gradient-green">
                    Digital Leadership.
                  </span>
                </h1>
              </div>

              {/* Main Description */}
              <p className="max-w-3xl break-words text-sm leading-6 text-slate-700 dark:text-white/70 sm:text-base sm:leading-relaxed md:text-lg">
                <Link
                  href="https://www.scribd.com/document/1059046142/Mian-Ahmad-Basit"
                  target="_blank"
                  className="font-medium transition hover:text-[#1447E6] dark:hover:text-blue-300"
                >
                  Mian Ahmad Basit
                </Link>{" "}
                is a technology entrepreneur, AI innovator, software product builder,
                and technology educator from Pakistan. He specializes in Artificial
                Intelligence, Blockchain, Cloud Computing, Web3, SaaS products,
                software engineering, and digital transformation.
              </p>

              {/* Secondary Description */}
              <p className="max-w-3xl break-words text-xs leading-5 text-slate-600 dark:text-white/55 sm:text-sm sm:leading-relaxed">
                With more than a decade of experience in technology and innovation,{" "}
                <Link
                  href="https://www.scribd.com/document/1059046142/Mian-Ahmad-Basit"
                  target="_blank"
                  className="transition hover:text-[#1447E6] dark:hover:text-blue-300"
                >
                  Mian Ahmad Basit
                </Link>{" "}
                has worked on building digital solutions, mentoring technology
                talent, and helping organizations adopt emerging technologies.
              </p>

              {/* Social Links */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1 sm:gap-3 sm:pt-2">
                {socialLinks.map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-black/10 text-slate-600 transition hover:border-[#1447E6] hover:text-[#1447E6] sm:h-10 sm:w-10 dark:border-white/10 dark:text-white/60 dark:hover:border-blue-400 dark:hover:text-blue-300"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="w-full min-w-0 md:col-span-4"
            >
              <div className="relative mx-auto h-[380px] w-full max-w-[420px] overflow-hidden rounded-xl border border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:h-[460px] sm:rounded-2xl md:h-auto md:max-w-none md:aspect-[3/4] dark:border-white/8 dark:shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                <Image
                  src="/mab.webp"
                  alt="Ahmad Basit — AI, Blockchain & Cloud Technology Entrepreneur from Pakistan"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Image Text */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                  <p className="mb-1 font-mono text-[8px] uppercase tracking-[0.18em] text-white/60 sm:text-[10px] sm:tracking-[0.22em]">
                    Technology Leader
                  </p>

                  <p className="text-base font-bold tracking-tight text-white sm:text-lg">
                    Mian Ahmad Basit
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* ══ SECTION 2 — MY JOURNEY ══ */}
      <div className="bg-slate-50 dark:bg-[#0D0D10] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6">
          <SectionLabel>My Journey</SectionLabel>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75 }}
            >
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.14)] dark:shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
                <Image
                  src="/speaking-mab.webp"
                  alt="Ahmad Basit — Speaker & Technology Educator at a conference"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[#1447E6] text-[10px] font-mono uppercase tracking-widest font-bold mb-1.5">
                    Speaker & Educator
                  </p>
                  <Link
                    href={
                      "https://www.scribd.com/document/1059046142/Mian-Ahmad-Basit"
                    }
                    target="_blank"
                  >
                    <p className="text-white text-xl font-bold leading-tight mb-1">
                      Mian Ahmad Basit
                    </p>
                  </Link>
                  <p className="text-white/55 text-xs">
                    Conferences · Universities · Tech Platforms
                  </p>
                </div>
              </div>
              <div className="mt-5 flex gap-1.5">
                <div className="h-1 w-12 rounded-full bg-[#1447E6]" />
                <div className="h-1 w-4 rounded-full bg-[#1447E6]/30" />
                <div className="h-1 w-2 rounded-full bg-[#1447E6]/15" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="space-y-7 pt-2"
            >
              <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-extrabold font-heading leading-tight">
                From Learning Technology
                <br />
                to Building the Future
              </h2>

              <div className="space-y-4">
                <p className="text-slate-700 dark:text-white/70 text-sm leading-relaxed">
                  My technology journey started at the age of 15 with curiosity
                  and a passion for understanding how digital systems create
                  opportunities.
                </p>
                <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed">
                  I started with digital marketing and performance marketing,
                  where I learned how technology, data, and user behavior can
                  drive growth. This experience became the foundation for my
                  transition into software engineering, cloud-native
                  development, and modern technology ecosystems.
                </p>
              </div>

              <div>
                <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed mb-4">
                  Over time, I expanded my expertise into:
                </p>
                <ul className="space-y-2.5">
                  {expertiseList.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-slate-700 dark:text-white/65 text-sm"
                    >
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#1447E6]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed mb-3">
                  My journey has always been focused on one mission:
                </p>
                <blockquote className="border-l-2 border-[#1447E6] pl-5 py-0.5">
                  <p className="text-slate-800 dark:text-white/80 text-sm font-semibold leading-relaxed">
                    Turning innovative ideas into scalable technology solutions.
                  </p>
                </blockquote>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══ SECTION 3 — LEADERSHIP ══ */}
      <div className="bg-white dark:bg-[#0A0A0A] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6">
          <SectionLabel>Technology Leadership</SectionLabel>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
            {/* Image — smaller, constrained */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75 }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-[300px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <Image
                  src="/mab-about-image.webp"
                  alt="Ahmad Basit — Technology Leadership & Professional Experience"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-[#1447E6] text-[10px] font-mono uppercase tracking-widest font-bold mb-1">
                    Technology Leadership
                  </p>
                  <Link
                    href={
                      "https://www.scribd.com/document/1059046142/Mian-Ahmad-Basit"
                    }
                  >
                    <p className="text-white text-sm font-bold leading-tight">
                      Mian Ahmad Basit
                    </p>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="space-y-6"
            >
              <h2 className="text-slate-900 dark:text-white text-2xl md:text-3xl font-extrabold font-heading leading-tight">
                Technology Leadership & Professional Experience
              </h2>

              <p className="text-slate-700 dark:text-white/70 text-sm leading-relaxed">
                Throughout my career, I have worked across multiple technology
                roles, evolving from software engineering into leadership
                positions including:
              </p>

              <ul className="space-y-2.5">
                {careerRoles.map((role) => (
                  <li
                    key={role}
                    className="flex items-center gap-3 text-slate-700 dark:text-white/65 text-sm"
                  >
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#1447E6]" />
                    {role}
                  </li>
                ))}
              </ul>

              <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed">
                I have contributed to technology projects involving software
                platforms, emerging technologies, automation systems, and
                digital products.
              </p>
              <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed">
                My approach combines engineering, business strategy, and
                innovation to create solutions that solve real-world problems.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══ SECTION 4 — BUILDING PRODUCTS ══ */}
      <div className="bg-slate-50 dark:bg-[#0D0D10] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6">
          <SectionLabel>Products & Companies</SectionLabel>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
            {/* Text + Company Logos */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75 }}
              className="space-y-6"
            >
              <h2 className="text-slate-900 dark:text-white text-2xl md:text-3xl font-extrabold font-heading leading-tight">
                Building Technology Products & Companies
              </h2>

              <p className="text-slate-700 dark:text-white/70 text-sm leading-relaxed">
                As a technology entrepreneur, I focus on building software
                products, SaaS platforms, and technology solutions designed for
                modern businesses.
              </p>

              <div>
                <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed mb-4">
                  My work involves creating products around:
                </p>
                <ul className="space-y-2.5">
                  {productAreas.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-slate-700 dark:text-white/65 text-sm"
                    >
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#1447E6]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <blockquote className="border-l-2 border-[#1447E6] pl-5 py-0.5">
                <p className="text-slate-700 dark:text-white/70 text-sm leading-relaxed italic">
                  I believe successful technology is created when innovation
                  meets execution.
                </p>
              </blockquote>
            </motion.div>

            {/* Company cards — 2×2 grid */}
            <div className="grid grid-cols-2 gap-4">
              {companies.map(({ src, name, role }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.15 + i * 0.08 }}
                  className="group relative bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70 dark:hover:shadow-black/50 transition-all duration-300 overflow-hidden cursor-default"
                >
                  {/* Top accent line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#1447E6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Logo */}
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-slate-100 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm flex-shrink-0">
                    <Image
                      src={src}
                      alt={name}
                      fill
                      className="object-contain p-1.5"
                    />
                  </div>

                  {/* Info */}
                  <div className="space-y-1.5">
                    <p className="text-slate-900 dark:text-white text-sm font-bold leading-snug font-heading">
                      {name}
                    </p>
                    <p className="text-[#1447E6] dark:text-blue-400 text-[10px] font-mono font-semibold uppercase tracking-[0.16em] leading-relaxed">
                      {role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ SECTION 5 — EDUCATION ══ */}
      <div className="bg-white dark:bg-[#0A0A0A] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6">
          <SectionLabel>Education & Mentorship</SectionLabel>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75 }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-[300px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <Image
                  src="/mab-about-image-2.webp"
                  alt="Ahmad Basit — Education, Mentorship & Technology Community"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-[#1447E6] text-[10px] font-mono uppercase tracking-widest font-bold mb-1">
                    Educator & Mentor
                  </p>
                  <p className="text-white text-sm font-bold leading-tight">
                    Mian Ahmad Basit
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="space-y-5"
            >
              <p className="text-[#1447E6] text-[11px] font-mono font-bold uppercase tracking-[0.22em]">
                Education & Mentorship
              </p>
              <h2 className="text-slate-900 dark:text-white text-2xl md:text-3xl font-extrabold font-heading leading-tight">
                Education, Mentorship & Technology Community
              </h2>
              <p className="text-slate-700 dark:text-white/65 text-sm leading-relaxed">
                Teaching has been one of the most meaningful parts of my
                journey.
              </p>
              <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed">
                I have worked with universities, colleges, and technology
                platforms to educate students and professionals in software
                development, AI, Blockchain, Cloud Computing, and emerging
                technologies.
              </p>
              <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed">
                Through my training and mentorship initiatives, I have helped
                thousands of learners develop practical technology skills and
                prepare for careers in the global tech industry.
              </p>
              <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed">
                My goal is not only to teach technology — but to create future
                builders, innovators, and entrepreneurs.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══ SECTION 6 — SPEAKING · MISSION ══ */}
      <div className="bg-slate-50 dark:bg-[#0D0D10] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6">
          <SectionLabel>Speaking · Mission</SectionLabel>

          {/* Speaking — text left, image right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75 }}
              className="space-y-5"
            >
              <p className="text-[#1447E6] text-[11px] font-mono font-bold uppercase tracking-[0.22em]">
                Speaking & Advocacy
              </p>
              <h2 className="text-slate-900 dark:text-white text-2xl md:text-3xl font-extrabold font-heading leading-tight">
                Technology Speaker, Mentor & Innovation Advocate
              </h2>
              <p className="text-slate-700 dark:text-white/65 text-sm leading-relaxed">
                I have participated as a speaker, mentor, and technology judge
                at different innovation and technology events.
              </p>
              <div>
                <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed mb-4">
                  My areas of discussion include:
                </p>
                <ul className="space-y-2.5">
                  {speakingTopics.map((topic) => (
                    <li
                      key={topic}
                      className="flex items-center gap-3 text-slate-700 dark:text-white/65 text-sm"
                    >
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#1447E6]" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed">
                I continue to collaborate with technology communities and
                innovators to promote growth and digital transformation.
              </p>
            </motion.div>

            {/* Image — right */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-[300px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <Image
                  src="/mab-about-image-3.webp"
                  alt="Mian Ahmad Basit — Technology Speaker, Mentor & Innovation Advocate"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-[#1447E6] text-[10px] font-mono uppercase tracking-widest font-bold mb-1">
                    Speaker & Mentor
                  </p>
                  <p className="text-white text-sm font-bold leading-tight">
                    Mian Ahmad Basit
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mission — centered */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-16 border-t border-slate-200 dark:border-white/10 pt-14 text-center max-w-2xl mx-auto space-y-5"
          >
            <p className="text-[#1447E6] text-[11px] font-mono font-bold uppercase tracking-[0.22em]">
              My Mission
            </p>
            <h3 className="text-slate-900 dark:text-white text-2xl md:text-3xl font-extrabold font-heading leading-tight">
              My Mission
            </h3>
            <p className="text-slate-700 dark:text-white/65 text-sm leading-relaxed">
              My mission is to build impactful technology products, empower
              talent, and contribute towards a stronger digital future.
            </p>
            <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed">
              I believe technology should create opportunities, solve meaningful
              problems, and improve the way people and businesses operate.
            </p>
            <p className="text-slate-800 dark:text-white/80 text-sm font-semibold leading-relaxed italic">
              The future belongs to those who learn continuously, build
              consistently, and create with purpose.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ══ SECTION 7 — FAQs ══ */}
      <div className="bg-white dark:bg-[#0A0A0A] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-[#1447E6] text-[11px] font-mono font-bold uppercase tracking-[0.22em] mb-4">
              FAQs
            </p>
            <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-extrabold font-heading mb-12">
              Frequently Asked Questions
            </h2>
            <div>
              {faqs.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
