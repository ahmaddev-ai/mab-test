"use client";

import Image from "next/image";
import { ArrowRight, Target } from "lucide-react";
import { services } from "@/data/data";

export default function ServicesPage() {
  return (
    <section className="bg-[#05060a] text-white">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto px-6 md:px-20 pt-24 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Services</h1>
        <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
          Explore our complete suite of technology and business services,
          designed to drive growth, innovation, and long-term success in the
          digital era.
        </p>
      </div>

      {/* SERVICES GRID */}
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-24 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-[#0a0c12] border border-white/10 rounded-3xl overflow-hidden shadow-lg flex flex-col items-center gap-4 p-6 hover:shadow-[0_12px_40px_rgba(16,185,129,0.25)] hover:scale-[1.03] transition-all duration-300"
          >
            {/* IMAGE */}
            <div className="relative w-full h-56 rounded-xl overflow-hidden shadow-md">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>

            {/* TEXT */}
            <div className="flex flex-col justify-between space-y-3 text-center">
              <h2 className="text-2xl font-bold text-emerald-400">
                {service.title}
              </h2>
              <p className="text-white/80 text-sm md:text-base">
                {service.shortDesc}
              </p>
              <a
                href={`${service.link}`}
                target="_blank"
                className="inline-flex items-center gap-2 text-emerald-400 font-semibold hover:text-emerald-300 transition"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* WHY CHOOSE US SECTION */}
      <div className="max-w-6xl mx-auto px-6 md:px-20 py-24">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-emerald-400 mb-12">
          Why Choose Us
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="bg-[#0a0c12] rounded-2xl p-8 border border-white/10 shadow hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)] transition">
            <h3 className="text-xl font-bold text-white mb-2">Expert Team</h3>
            <p className="text-white/70 text-sm">
              Work with industry-leading experts who deliver scalable,
              future-ready solutions.
            </p>
          </div>
          <div className="bg-[#0a0c12] rounded-2xl p-8 border border-white/10 shadow hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)] transition">
            <h3 className="text-xl font-bold text-white mb-2">
              Innovative Solutions
            </h3>
            <p className="text-white/70 text-sm">
              Cutting-edge technology and creative approaches to solve complex
              business challenges.
            </p>
          </div>
          <div className="bg-[#0a0c12] rounded-2xl p-8 border border-white/10 shadow hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)] transition">
            <h3 className="text-xl font-bold text-white mb-2">
              Customer Focused
            </h3>
            <p className="text-white/70 text-sm">
              Solutions designed with the end-user in mind, ensuring value,
              usability, and satisfaction.
            </p>
          </div>
        </div>
      </div>

      {/* CALL TO ACTION */}
      <div className="bg-[#0a0c12] border-t border-white/10 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-emerald-400">
            Ready to Transform Your Business?
          </h2>
          <p className="text-white/70 mb-8">
            Connect with our experts to discuss your project and find the
            perfect solution for your needs.
          </p>
          <a
            href="/contact"
            className="inline-block bg-emerald-500 text-black font-semibold px-8 py-4 rounded-xl shadow hover:bg-emerald-600 transition"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}
