import { WEBINAR } from "@/data/data";
import Image from "next/image";

export default function WebinarPage() {
  return (
    <section className="bg-[#05060a] text-white">
      {/* HERO */}
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-20 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span
                className="inline-block text-xs uppercase tracking-widest
                               text-emerald-400 font-semibold
                               bg-emerald-400/10 px-3 py-1 rounded"
              >
                Webinar Series
              </span>

              <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
                {WEBINAR.title}
              </h1>

              <p className="mt-4 text-lg text-white/70 max-w-xl">
                {WEBINAR.subtitle}
              </p>

              <p className="mt-3 text-white/60 max-w-xl leading-relaxed">
                {WEBINAR.description}
              </p>
            </div>

            <div className="relative h-[300px] rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={WEBINAR.heroImage}
                alt="Webinar"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* EVENT OVERVIEW */}
      <div className="max-w-6xl mx-auto px-6 md:px-20 py-16">
        <h2 className="text-2xl font-bold mb-8">Webinar Overview</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Successfully conducted as part of the National Webinar Series",
            "Focused on practical knowledge, industry trends, and real-world applications",
            "Engaged participants from academia, startups, and professional sectors",
          ].map((text, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-xl bg-[#0d0f15] px-6 py-6"
            >
              <p className="text-sm text-white/70 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TOPICS */}
      <div className="max-w-6xl mx-auto px-6 md:px-20 py-16 border-t border-white/10">
        <h2 className="text-2xl font-bold mb-8">Core Focus Areas Covered</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {WEBINAR.topics.map((topic, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-xl bg-[#0d0f15]
                         px-6 py-7 hover:border-emerald-400/40 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{topic.icon}</span>
                <h3 className="text-lg font-semibold">{topic.title}</h3>
              </div>

              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                {topic.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* AUDIENCE */}
      <div className="bg-[#0a0c12] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-20 py-16">
          <h2 className="text-2xl font-bold mb-8">Who Attended</h2>

          <div className="grid md:grid-cols-4 gap-5">
            {[
              "University Students",
              "Software Developers",
              "Startup Founders",
              "Industry Professionals",
            ].map((role, index) => (
              <div
                key={index}
                className="border border-white/10 rounded-lg bg-[#0d0f15]
                           px-5 py-4 text-sm text-white/70"
              >
                {role}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOST */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-20 py-16">
          <h2 className="text-2xl font-bold mb-8">Hosted & Led By</h2>

          <div className="border border-white/10 rounded-xl bg-[#0d0f15] p-6">
            <h3 className="text-lg font-semibold">Mian Ahmad Basit</h3>
            <p className="mt-2 text-sm text-white/70 max-w-2xl leading-relaxed">
              Technology consultant and educator with hands-on experience in
              Artificial Intelligence, Blockchain, Modern Web Development,
              Digital Marketing, and Financial Systems. Actively involved in
              mentoring and delivering national-level knowledge initiatives.
            </p>
          </div>
        </div>
      </div>

      {/* ORGANIZATIONS */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-20 py-16">
          <h2 className="text-2xl font-bold mb-8">
            Participating Institutions & Organizations
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WEBINAR.organizations.map((org, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border border-white/10 rounded-lg bg-[#0d0f15]
                     px-5 py-4 hover:border-emerald-400/40 transition"
              >
                {/* Logo */}
                {org.logo && (
                  <div className="w-10 h-10 relative flex-shrink-0">
                    <Image
                      src={org.logo}
                      alt={org.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}

                {/* Content */}
                <div>
                  <h4 className="text-sm font-semibold">{org.name}</h4>

                  <span
                    className="inline-block mt-1 text-[11px] uppercase tracking-wider
                         text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded"
                  >
                    {org.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RESOURCES */}
      <div className="bg-[#0a0c12] border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 md:px-20 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Session Resources</h2>

          <p className="text-sm text-white/70 max-w-2xl mx-auto">
            Session recordings, slides, and related materials will be shared
            with participants or published through official channels where
            applicable.
          </p>
        </div>
      </div>
    </section>
  );
}
