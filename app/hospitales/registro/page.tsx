import Link from "next/link";
import { BrandMark } from "@/src/components/brand-mark";
import { LeafletMapLoader } from "@/src/components/map/leaflet-map-loader";
import {
  inventoryExchanges,
  publicHospitals,
} from "@/src/lib/operations-content";

export default function PublicHospitalMonitoringPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-[64px] w-full max-w-6xl flex-col justify-between gap-4 px-5 py-4 sm:flex-row sm:items-center">
          <BrandMark />
          <nav className="flex flex-wrap gap-2 text-xs font-black text-slate-600">
            <Link className="nav-pill" href="/">
              Inicio
            </Link>
            <Link className="nav-pill" href="/mapa">
              Consulta publica
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-8">
        <div className="mb-7 rounded-[18px] border border-blue-100 bg-blue-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">
            Monitoreo en Tiempo Real: Caracas
          </p>
          <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">
            Hospitales, faltantes y rutas solidarias activas
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            Consulta la red publica de centros hospitalarios conectados,
            solicitudes activas y posibles donantes. El registro y ubicacion de
            hospitales se gestiona desde perfiles medicos certificados.
          </p>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <p className="text-xs font-black uppercase tracking-wide text-blue-700">
                Mapa operativo
              </p>
              <h2 className="mt-1 text-xl font-black text-slate-950">
                Caracas conectado en tiempo real
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Haz clic en los marcadores para revisar hospitales con
                necesidades, excedentes y rutas sugeridas.
              </p>
            </div>
            <div className="h-[540px]">
              <LeafletMapLoader interactive minHeight={540} />
            </div>
          </section>

          <aside className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <MetricCard
                label="Hospitales"
                tone="blue"
                value={publicHospitals.length}
              />
              <MetricCard
                label="Faltantes"
                tone="rose"
                value={inventoryExchanges.length}
              />
              <MetricCard label="Rutas" tone="emerald" value={7} />
            </div>

            <section className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wide text-rose-700">
                Alertas activas
              </p>
              <div className="mt-4 max-h-[290px] space-y-3 overflow-y-auto pr-2">
                {inventoryExchanges.map((exchange) => (
                  <article
                    className="rounded-[14px] border border-slate-100 bg-slate-50 p-4"
                    key={exchange.item}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-black text-slate-950">
                          {exchange.requester}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                          Necesita {exchange.item}
                        </p>
                      </div>
                      <span className="rounded-[8px] bg-rose-50 px-2 py-1 text-[0.65rem] font-black text-rose-700">
                        {exchange.requested}
                      </span>
                    </div>
                    <p className="mt-3 rounded-[10px] bg-white p-3 text-xs font-bold leading-5 text-slate-700">
                      Donante sugerido: {exchange.donor}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
                Centros conectados
              </p>
              <div className="mt-4 max-h-[260px] space-y-3 overflow-y-auto pr-2">
                {publicHospitals.map((hospital) => (
                  <article
                    className="rounded-[14px] border border-slate-100 bg-slate-50 p-4"
                    key={hospital.name}
                  >
                    <h3 className="text-sm font-black text-slate-950">
                      {hospital.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {hospital.zone}
                    </p>
                    <p className="mt-3 text-xs font-bold leading-5 text-slate-700">
                      {hospital.need}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}

function MetricCard({
  label,
  tone,
  value,
}: {
  label: string;
  tone: "blue" | "rose" | "emerald";
  value: number;
}) {
  const toneClass = {
    blue: "border-blue-100 bg-blue-50 text-blue-700",
    rose: "border-rose-100 bg-rose-50 text-rose-700",
    emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
  }[tone];

  return (
    <div className={`rounded-[14px] border p-4 ${toneClass}`}>
      <p className="text-[0.65rem] font-black uppercase">{label}</p>
      <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
    </div>
  );
}
