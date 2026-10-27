import ModuleCard from "./ModuleCard";

export default function PhaseSection({ phase }: { phase: any }) {
  return (
    <div id={phase.id}>
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-blue-600/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
          {phase.badge}
        </span>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {phase.weeks}
        </span>
      </div>

      <h3 className="font-heading text-2xl font-medium text-slate-900 dark:text-white">
        {phase.title}
      </h3>
      <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
        {phase.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {phase.skills.map((skill: any) => (
          <span
            key={skill}
            className="rounded-full border border-black/10 px-3 py-1 text-xs text-slate-600 dark:border-white/[0.1] dark:text-slate-300"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {phase.modules.map((mod: any) => (
          <ModuleCard key={mod.id} module={mod} />
        ))}
      </div>
    </div>
  );
}
