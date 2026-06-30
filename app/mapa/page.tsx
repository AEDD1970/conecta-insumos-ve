import Link from "next/link";
import { AppShell } from "@/src/components/dashboard/app-shell";
import { LeafletMapLoader } from "@/src/components/map/leaflet-map-loader";
import {
  freeServices,
  inventoryExchanges,
  publicHospitals,
} from "@/src/lib/operations-content";

export default function PublicMapPage() {
  return (
    <AppShell
      eyebrow="Acceso invitado"
      title="Consulta publica de necesidades solidarias"
    >
      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(520px,1fr)]">
        <section className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-blue-700">
                Portal de consulta ciudadana
              </p>
              <h2 className="mt-1 text-xl font-black text-slate-950">
                Servicios gratuitos y hospitales con faltantes
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Informacion publica para ubicar ayuda, insumos requeridos y
                posibles donantes.
              </p>
            </div>
            <div className="flex gap-2 text-xs font-black">
              <span className="rounded-[10px] bg-blue-50 px-3 py-2 text-blue-700">
                Servicios ({freeServices.length})
              </span>
              <span className="rounded-[10px] bg-rose-50 px-3 py-2 text-rose-700">
                Faltantes ({inventoryExchanges.length})
              </span>
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            <div className="space-y-3">
              {freeServices.map((service) => (
                <article
                  key={service.name}
                  className="rounded-[14px] border border-slate-200 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-black text-slate-950">
                        {service.name}
                      </h3>
                      <p className="mt-1 text-xs text-blue-700">
                        {service.area}
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-[0.65rem] font-black text-emerald-700">
                      {service.availability}
                    </span>
                  </div>
                  <p className="mt-3 rounded-[10px] border border-slate-100 bg-slate-50 p-3 text-xs leading-5 text-slate-700">
                    {service.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="space-y-3">
              {inventoryExchanges.map((exchange) => (
                <article
                  key={exchange.item}
                  className="rounded-[14px] border border-slate-200 p-4"
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
                    <span className="rounded-full bg-rose-50 px-3 py-1 text-[0.65rem] font-black text-rose-700">
                      Faltan {exchange.requested}
                    </span>
                  </div>
                  <div className="mt-3 rounded-[10px] border border-slate-100 bg-slate-50 p-3">
                    <p className="text-xs font-bold text-slate-700">
                      Donante sugerido: {exchange.donor}
                    </p>
                    <div className="mt-2 h-2 rounded-full bg-slate-200">
                      <div
                        className="h-2 rounded-full bg-rose-500"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.round(
                              (exchange.available / exchange.requested) * 100,
                            ),
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-4 xl:sticky xl:top-6">
          <section className="overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-4">
              <p className="text-xs font-black uppercase tracking-wide text-blue-700">
                Mapa operativo
              </p>
              <h2 className="mt-1 text-xl font-black text-slate-950">
                Hospitales y solicitudes activas
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Revisa la red completa para ubicar centros con faltantes,
                donantes sugeridos y rutas de apoyo.
              </p>
            </div>
            <div className="h-[520px]">
              <LeafletMapLoader interactive minHeight={520} />
            </div>
          </section>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-[14px] border border-rose-100 bg-rose-50 p-4">
              <p className="text-xs font-black uppercase text-rose-700">
                Solicitudes
              </p>
              <p className="mt-2 text-3xl font-black text-slate-950">
                {inventoryExchanges.length}
              </p>
            </div>
            <div className="rounded-[14px] border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-xs font-black uppercase text-emerald-700">
                Hospitales
              </p>
              <p className="mt-2 text-3xl font-black text-slate-950">
                {publicHospitals.length}
              </p>
            </div>
            <div className="rounded-[14px] border border-blue-100 bg-blue-50 p-4">
              <p className="text-xs font-black uppercase text-blue-700">
                Servicios
              </p>
              <p className="mt-2 text-3xl font-black text-slate-950">
                {freeServices.length}
              </p>
            </div>
          </div>

          <section className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-black text-slate-950">
              Hospitales visibles en mapa
            </h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3 xl:grid-cols-1">
              {publicHospitals.map((hospital) => (
                <article
                  key={hospital.name}
                  className="rounded-[12px] border border-slate-100 bg-slate-50 p-4"
                >
                  <p className="text-sm font-black text-slate-950">
                    {hospital.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{hospital.zone}</p>
                  <p className="mt-3 text-xs font-bold text-slate-700">
                    {hospital.need}
                  </p>
                  <p className="mt-2 text-[0.68rem] font-black text-blue-700">
                    {hospital.position[0].toFixed(4)},{" "}
                    {hospital.position[1].toFixed(4)}
                  </p>
                </article>
              ))}
            </div>
          </section>
          <Link
            href="/"
            className="block rounded-[12px] bg-slate-950 px-5 py-4 text-center text-sm font-black text-white transition hover:bg-blue-700"
          >
            Registrar colaborador
          </Link>
          <Link
            href="/hospitales/registro"
            className="block rounded-[12px] border border-blue-200 bg-blue-50 px-5 py-4 text-center text-sm font-black text-blue-700 transition hover:bg-blue-100"
          >
            Monitoreo en tiempo real
          </Link>
        </aside>
      </div>
    </AppShell>
  );
}
