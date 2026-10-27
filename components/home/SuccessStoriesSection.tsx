import Image from "next/image";
import { Section } from "./shared";

const stories = [
  {
    name: "Student to AI Builder",
    result: "Built production-ready AI workflows after hands-on training.",
    image: "/gallery/gallery1.webp",
  },
  {
    name: "Startup Automation",
    result: "Reduced manual operations through CRM and agent automation.",
    image: "/gallery/gallery4.webp",
  },
  {
    name: "Enterprise Cloud Shift",
    result: "Modernized infrastructure for faster, more reliable delivery.",
    image: "/gallery/gallery8.webp",
  },
];

export default function SuccessStoriesSection() {
  return (
    <Section id="success" eyebrow="Section 5" title="Success Stories">
      <div className="grid gap-5 md:grid-cols-3">
        {stories.map((story) => (
          <article
            key={story.name}
            className="rounded-lg border border-black/10 bg-white p-4 dark:border-white/[0.08] dark:bg-white/[0.04]"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-md">
              <Image
                src={story.image}
                alt={story.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mt-5 font-heading text-xl font-medium">
              {story.name}
            </h3>
            <p className="mt-3 leading-7 text-slate-600 dark:text-[#9CA3AF]">
              {story.result}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
