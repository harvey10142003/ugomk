type Stat = {
  value: string;
  label: string;
  hint?: string;
};

export function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-px bg-ink-100 rounded-2xl overflow-hidden border border-ink-100 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-white p-6 md:p-8">
          <div className="text-[11px] tracking-widest-2 uppercase font-semibold text-ink-500">
            {s.label}
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl font-extrabold text-ink-900 tracking-tight">
              {s.value}
            </span>
            {s.hint ? <span className="text-xs text-ink-400">{s.hint}</span> : null}
          </div>
        </div>
      ))}
    </div>
  );
}
