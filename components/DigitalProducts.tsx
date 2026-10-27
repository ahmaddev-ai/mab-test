"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FileText, LinkIcon } from "lucide-react";
import Link from "next/link";
import { PRODUCTS } from "@/data/data";

export default function DigitalProducts() {
  return (
    <section
      id="products"
      className="w-full mb-20 bg-[#05060a] px-6 md:px-12 flex flex-col items-center"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-14 text-center">
        Digital Products
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12 place-items-center w-full max-w-7xl">
        {PRODUCTS.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="
              bg-[#0d0f15]/80 backdrop-blur-xl 
              rounded-3xl overflow-hidden relative
              border border-[#10B981]/20 
              shadow-[0_0_25px_rgba(16,185,129,0.15)]
              hover:shadow-[0_0_40px_rgba(16,185,129,0.45)]
              hover:scale-[1.03] transition-all duration-500
              w-[320px]
            "
          >
            <Link href={`/products/${product.slug}`}>
              {/* IMAGE */}
              <div className="relative w-full h-48">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6 text-white/90">
                <div className="flex items-center gap-2 text-sm text-[#10B981] font-semibold mb-3">
                  {product.type === "Document" ? (
                    <FileText className="w-4 h-4" />
                  ) : (
                    <LinkIcon className="w-4 h-4" />
                  )}
                  {product.type}
                </div>

                <h3 className="text-lg font-semibold leading-tight min-h-[48px]">
                  {product.title}
                </h3>

                <div className="mt-4 flex items-center gap-3">
                  <span className="text-xl font-bold text-white">
                    {product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-white/40 line-through text-sm">
                      {product.oldPrice}
                    </span>
                  )}
                </div>

                <button
                  className="
                  mt-6 w-full py-3 rounded-xl 
                  bg-[#10B981] text-black font-semibold text-sm
                  shadow-[0_0_20px_rgba(16,185,129,0.4)]
                  hover:bg-[#10B981]/85 hover:shadow-[0_0_30px_rgba(16,185,129,0.65)]
                  transition-all duration-300 active:scale-[0.97]
                "
                >
                  Get This Product
                </button>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
