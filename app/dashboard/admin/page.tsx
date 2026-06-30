import Link from "next/link";
import { AppShell } from "@/src/components/dashboard/app-shell";
import { StatCard } from "@/src/components/dashboard/stat-card";

const pendingApprovals = [
  {
    name: "Dra. Alexis Duque",
    role: "Medico colaborador",
    detail: "Hospital Jose Maria Vargas",
  },
  {
    name: "Carlos Mendoza",
    role: "Conductor",
    detail: "Camioneta pickup - carga ligera",
  },
  {
    name: "Fundacion Salud Caracas",
    role: "Organizacion aliada",
    detail: "Servicios gratuitos",
  },
] as const;

export default function AdminDashboardPage() {
  return (
    <AppShell eyebrow="Rol administrador" title="Aprobaciones y control de red">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Pendientes" value="12" tone="amber" />
        <StatCard label="Hospitales" value="8" tone="blue" />
        <StatCard label="Conductores" value="2" tone="emerald" />
        <StatCard label="Alertas" value="6" tone="rose" />
      </div>

      <section className="mt-6 rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-indigo-700">
              Peticiones de registro
            </p>
            <h2 className="mt-1 text-lg font-black text-slate-950">
              Validar credenciales antes de activar acceso
            </h2>
          </div>
          <button className="rounded-[10px] bg-indigo-600 px-4 py-2 text-xs font-black text-white">
            Ver bitacora
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {pendingApprovals.map((approval) => (
            <article
              className="grid gap-3 rounded-[14px] border border-slate-100 bg-slate-50 p-4 sm:grid-cols-[1fr_auto]"
              key={approval.name}
            >
              <div>
                <h3 className="text-sm font-black text-slate-950">
                  {approval.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500">{approval.detail}</p>
              </div>
              <div className="flex gap-2">
                <span className="rounded-[10px] bg-indigo-50 px-3 py-2 text-xs font-black text-indigo-700">
                  {approval.role}
                </span>
                <button className="rounded-[10px] bg-emerald-600 px-3 py-2 text-xs font-black text-white">
                  Aprobar
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-[18px] border border-blue-100 bg-blue-50 p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-blue-700">
              Hospitales de la red
            </p>
            <h2 className="mt-1 text-lg font-black text-slate-950">
              Alta de centro con direccion y coordenadas
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Registra nombre, direccion, latitud y longitud para ubicarlo en el
              mapa operativo.
            </p>
          </div>
          <Link
            className="rounded-[12px] bg-slate-950 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-blue-700"
            href="/dashboard/admin/hospitales"
          >
            Registrar hospital
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
