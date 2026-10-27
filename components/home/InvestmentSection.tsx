import { ButtonLink } from "./shared";

export default function InvestmentSection() {
  return (
    <section
      id="investment"
      className="relative overflow-hidden border-y border-black/10 bg-[#111827] px-5 py-24 text-white dark:border-white/[0.08] dark:bg-[#111111]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.24),transparent_32%)]" />
      <div className="relative mx-auto max-w-5xl text-center">
        {/* <p className="font-mono text-xs uppercase tracking-[0.28em] text-blue-300">
          Section 6 / Investment
        </p> */}
        <h2 className="mt-4 font-heading text-4xl font-medium tracking-[-1px] sm:text-5xl">
          Partner With Our Ecosystem
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          Building AI, Cloud & Blockchain systems for global scale.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/contact?mode=investor-deck" variant="primary">
            Request Investor Deck
          </ButtonLink>
          <ButtonLink href="/contact?mode=partner" variant="light">
            Become Partner
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
