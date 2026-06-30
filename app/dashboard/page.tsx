import Link from "next/link";
import { AppShell } from "@/src/components/dashboard/app-shell";

export default function DashboardPage() {
  return (
    <AppShell eyebrow="Panel operativo" title="Selecciona un rol de trabajo">
      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/dashboard/medico"
          className="rounded-[18px] border border-rose-200 bg-white p-6 shadow-sm transition hover:border-rose-300 hover:shadow-md"
        >
          <p className="text-xs font-black uppercase tracking-wide text-rose-700">
            Centro hospitalario
          </p>
          <h2 className="mt-3 text-2xl font-black text-slate-950">
            Panel medico
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Reporta faltantes, excedentes, urgencias y recepciones.
          </p>
        </Link>
        <Link
          href="/dashboard/conductor"
          className="rounded-[18px] border border-emerald-200 bg-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
        >
          <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
            Logistica voluntaria
          </p>
          <h2 className="mt-3 text-2xl font-black text-slate-950">
            Panel conductor
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Consulta rutas disponibles, carga asignada y entregas activas.
          </p>
        </Link>
      </div>
    </AppShell>
  );
}
