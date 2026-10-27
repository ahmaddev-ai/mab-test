import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "./shared";

const blogTopics = [
  "AI future",
  "Blockchain systems",
  "SaaS scaling",
  "Tech entrepreneurship",
];

export default function BlogSection() {
  return (
    <Section
      id="notes"
      eyebrow=""
      title="Blog"
      description="Search-led writing around the systems, products, and founder lessons behind the ecosystem."
    >
      <div className="grid gap-5 md:grid-cols-4">
        {blogTopics.map((topic) => (
          <div
            key={topic}
            className="rounded-lg border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-500/60 dark:border-white/[0.08] dark:bg-[#111111]"
          >
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-blue-600 dark:text-blue-300">
              Article
            </p>
            <h3 className="mt-4 font-heading text-xl font-medium">{topic}</h3>
            <Link
              href="/blogs"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-500"
            >
              Read notes
              <ArrowRight size={16} />
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}
