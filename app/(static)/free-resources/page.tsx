import { BOOKS } from "@/data/data";
import { BookOpen, Download, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FreeBooksPage() {
  return (
    <section className="bg-[#05060a] text-white min-h-screen pt-24">
      {/* HEADER */}
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-20 py-6">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
            Free Resources
          </span>

          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">
            Books & Learning Material
          </h1>

          <p className="mt-4 text-white/70 max-w-2xl leading-relaxed">
            Carefully selected books shared for educational purposes to help
            students, developers, and professionals grow their skills.
          </p>
        </div>
      </div>

      {/* BOOK GRID */}
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {BOOKS.map((book) => (
            <div
              key={book.id}
              className="group flex flex-col rounded-2xl overflow-hidden
                       bg-[#0d0f15] border border-white/10
                       transition-all duration-300
                       hover:border-emerald-400/30
                       hover:shadow-[0_20px_50px_-25px_rgba(16,185,129,0.25)]"
            >
              {/* COVER */}
              <div className="relative aspect-[3/4] bg-black">
                <Image
                  src={book.thumbnail}
                  alt={book.title}
                  fill
                  className="object-contain p-4 transition-transform duration-500
                           group-hover:scale-[1.03]"
                />

                {/* Top badge */}
                <div
                  className="absolute top-4 left-4 flex items-center gap-1
                              bg-black/60 backdrop-blur
                              px-2.5 py-1 rounded-full
                              text-xs text-white/80"
                >
                  <BookOpen size={14} />
                  Free Book
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex flex-col p-6 flex-1">
                <h2 className="text-lg font-semibold leading-snug">
                  {book.title}
                </h2>

                {/* Author */}
                <div className="mt-2 flex items-center gap-2 text-xs text-white/60">
                  <User size={14} />
                  {book.author}
                </div>

                <p className="mt-4 text-sm text-white/70 leading-relaxed line-clamp-4">
                  {book.description}
                </p>

                {/* ACTION */}
                <div className="mt-auto pt-6">
                  <Link
                    href={book.pdf}
                    target="_blank"
                    className="inline-flex items-center justify-center gap-2
                             w-full text-sm font-semibold
                             text-black bg-emerald-500
                             hover:bg-emerald-600
                             px-4 py-2.5 rounded-lg
                             transition"
                  >
                    <Download size={16} />
                    View / Download PDF
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER NOTE */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-20 py-10 text-center">
          <p className="text-xs text-white/50 max-w-3xl mx-auto leading-relaxed">
            These resources are shared strictly for educational use. All rights
            belong to their respective authors and publishers.
          </p>
        </div>
      </div>
    </section>
  );
}
