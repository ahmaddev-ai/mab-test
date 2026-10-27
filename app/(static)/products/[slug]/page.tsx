import { PRODUCTS } from "@/data/data";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export const dynamic = 'force-static';
export const dynamicParams = false;

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product)
    return (
      <div className="text-white p-20 text-center text-2xl">
        ❌ Product not found.
      </div>
    );

  return (
    <section className="w-full py-20 bg-[#05060a] px-6 md:px-10 lg:px-20">
      <div className="max-w-5xl mx-auto text-white">
        {/* --- IMAGE WRAPPER --- */}
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_35px_rgba(16,185,129,0.25)]">
          <div className="relative w-full h-[260px] md:h-[360px]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* --- TITLE + BUTTON ROW --- */}
        <div className="mt-8 flex justify-between flex-col md:flex-row md:items-start gap-6">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight mb-2">
              {product.title}
            </h1>
            <p className="text-2xl text-[#10B981] font-semibold">
              {product.price}
            </p>
          </div>
          <Link href={`/checkout/${product.slug}`}>
            <button
              className="
      px-6 py-3 rounded-xl 
      shadow-[0_0_25px_rgba(16,185,129,0.5)]
      hover:bg-[#10B981]/80 hover:shadow-[0_0_35px_rgba(16,185,129,0.65)]
      cursor-pointer 
      active:scale-95 
      text-white 
      font-semibold 
      transition
      bg-[#10B981]
    "
            >
              Buy now
            </button>
          </Link>
        </div>

        {/* --- DESCRIPTION --- */}
        <div className="mt-10 bg-[#0d0f15]/60 p-6 rounded-2xl border border-white/10 backdrop-blur">
          <h2 className="text-xl font-bold mb-4 text-white/90">
            What You’ll Get
          </h2>
          <div className="text-white/80 whitespace-pre-line leading-relaxed">
            {product.description}
          </div>
        </div>

        {/* --- FAQ SECTION --- */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">FAQs</h2>

          <div className="bg-[#0d0f15]/80 rounded-2xl border border-white/10 divide-y divide-white/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            {product.faq.map((q, i) => (
              <details
                key={i}
                className="group px-6 py-4 cursor-pointer transition-all hover:bg-white/5"
              >
                <summary className="font-semibold text-white/90 text-lg flex justify-between items-center">
                  {q}
                  <span className="text-[#10B981] group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>

                <p className="mt-3 text-white/60 text-sm leading-relaxed">
                  This is placeholder answer text. Add real answers later.
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
