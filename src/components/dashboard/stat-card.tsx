type StatCardProps = {
  label: string;
  value: string;
  tone?: "blue" | "rose" | "emerald" | "amber";
};

const toneClasses = {
  blue: "border-blue-100 bg-blue-50 text-blue-700",
  rose: "border-rose-100 bg-rose-50 text-rose-700",
  emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
  amber: "border-amber-100 bg-amber-50 text-amber-700",
};

export function StatCard({ label, value, tone = "blue" }: StatCardProps) {
  return (
    <article className={`rounded-[14px] border p-5 ${toneClasses[tone]}`}>
      <p className="text-xs font-black uppercase tracking-wide opacity-80">
        {label}
      </p>
      <p className="mt-3 text-3xl font-black text-slate-950">{value}</p>
    </article>
  );
}
