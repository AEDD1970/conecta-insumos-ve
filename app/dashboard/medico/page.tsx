"use client";

import { useState } from "react";
import { AppShell } from "@/src/components/dashboard/app-shell";
import { StatCard } from "@/src/components/dashboard/stat-card";
import { MedicAlertMapLoader } from "@/src/components/map/medic-alert-map-loader";
import type { MedicTransferAlert } from "@/src/components/map/medic-alert-map";
import {
  hospitalInventory,
  inventoryExchanges,
  logisticsLog,
  medicRequests,
  publicHospitals,
} from "@/src/lib/operations-content";

type HospitalResource = {
  item: string;
  type: "Faltante" | "Sobrante";
  obtained: number;
  goal: number;
  updatedAt: string;
  priority?: "Critica" | "Alta" | "Normal";
  notes?: string;
};

const activeHospital = {
  name: "Hospital Jose Maria Vargas",
  address: "Libertador - Calle Monte Elena, San Jose, Caracas",
  credential: "H-VARGAS-2024",
};

export default function MedicDashboardPage() {
  const [transferAlerts, setTransferAlerts] = useState<MedicTransferAlert[]>([]);
  const [hospitalResources, setHospitalResources] = useState<HospitalResource[]>(
    [...hospitalInventory],
  );
  const [selectedDestinations, setSelectedDestinations] = useState<
    Record<string, string>
  >({});
  const [requestedQuantities, setRequestedQuantities] = useState<
    Record<string, string>
  >({});
  const [resourceName, setResourceName] = useState("");
  const [resourceType, setResourceType] = useState<"Faltante" | "Sobrante">(
    "Sobrante",
  );
  const [resourceQuantity, setResourceQuantity] = useState("500");
  const [resourcePriority, setResourcePriority] =
    useState<HospitalResource["priority"]>("Normal");
  const [resourceNotes, setResourceNotes] = useState("");

  function requestResource(
    exchange: (typeof inventoryExchanges)[number],
    quantity: number,
  ) {
    const destinationName =
      selectedDestinations[exchange.item] || activeHospital.name;
    const destination =
      publicHospitals.find((hospital) => hospital.name === destinationName) ??
      publicHospitals.find((hospital) => hospital.name === activeHospital.name) ??
      publicHospitals[0];

    setTransferAlerts((current) => {
      const alreadyExists = current.some(
        (alert) =>
          alert.item === exchange.item && alert.destination === destination.name,
      );

      if (alreadyExists) {
        return current;
      }

      return [
        ...current,
        {
          item: exchange.item,
          donor: exchange.donor,
          donorPosition: exchange.donorPosition,
          destination: destination.name,
          destinationPosition: destination.position,
          quantity,
          unit: exchange.unit,
        },
      ];
    });
  }

  function registerHospitalResource(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const quantity = Number(resourceQuantity);
    const item = resourceName.trim();

    if (!item || !Number.isFinite(quantity) || quantity <= 0) {
      return;
    }

    const newResource: HospitalResource = {
      item,
      type: resourceType,
      obtained: resourceType === "Sobrante" ? quantity : 0,
      goal: resourceType === "Faltante" ? quantity : 0,
      updatedAt: "Ahora",
      priority: resourceType === "Faltante" ? resourcePriority : "Normal",
      notes: resourceNotes.trim() || undefined,
    };

    setHospitalResources((current) => [newResource, ...current]);
    setResourceName("");
    setResourceQuantity("500");
    setResourcePriority("Normal");
    setResourceNotes("");
  }

  const missingResources = hospitalResources.filter(
    (item) => item.type === "Faltante",
  );
  const surplusResources = hospitalResources.filter(
    (item) => item.type === "Sobrante",
  );

  return (
    <AppShell eyebrow="Rol medico" title="Centro de solicitudes medicas">
      <section className="mb-6 rounded-[18px] border border-blue-100 bg-blue-50 p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-blue-700">
              Hospital de adscripcion medico activo
            </p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">
              {activeHospital.name}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {activeHospital.address}
            </p>
          </div>
          <div className="rounded-[12px] border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm">
            Carnet: {activeHospital.credential}
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Criticas" value="6" tone="rose" />
        <StatCard label="En transito" value="9" tone="blue" />
        <StatCard label="Recibidas" value="24" tone="emerald" />
        <StatCard label="Pendientes" value="11" tone="amber" />
      </div>

      <section className="mt-6 rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
              Centro de alertas e intercambio solidario
            </p>
            <h2 className="mt-1 text-lg font-black text-slate-950">
              Caracas hospital a hospital
            </h2>
          </div>
          <span className="rounded-[10px] border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-black text-blue-700">
            {transferAlerts.length || inventoryExchanges.length} alertas activas
          </span>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_360px]">
          <div className="rounded-[14px] border border-emerald-100 bg-emerald-50/50 p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-black text-emerald-800">
                Insumos disponibles
              </h3>
              <span className="text-xs font-black text-emerald-700">
                Solicita y genera alerta
              </span>
            </div>
            <div className="mt-3 max-h-[260px] space-y-3 overflow-auto pr-2">
              {inventoryExchanges
                .filter((exchange) => exchange.available > 0)
                .map((exchange) => {
                  const destinationName =
                    selectedDestinations[exchange.item] || activeHospital.name;
                  const wasRequested = transferAlerts.some(
                    (alert) =>
                      alert.item === exchange.item &&
                      alert.destination === destinationName,
                  );

                  return (
                    <article
                      key={exchange.item}
                      className={`rounded-[12px] border bg-white p-3 ${
                        wasRequested
                          ? "border-blue-200 ring-4 ring-blue-50"
                          : "border-emerald-100"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-black text-slate-950">
                            {exchange.item}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            Origen: {exchange.donor}
                          </p>
                        </div>
                        <span className="rounded-[8px] bg-emerald-50 px-2 py-1 text-xs font-black text-emerald-700">
                          {exchange.available} disp.
                        </span>
                      </div>
                      <div className="mt-3 grid gap-2 lg:grid-cols-[1fr_auto]">
                        <label className="block text-xs font-black uppercase text-slate-500">
                          Enviar a
                          <select
                            className="mt-1 h-9 w-full rounded-[9px] border border-slate-200 bg-slate-50 px-2 text-xs font-black text-slate-950 outline-none focus:border-blue-500 focus:bg-white"
                            onChange={(event) =>
                              setSelectedDestinations((current) => ({
                                ...current,
                                [exchange.item]: event.target.value,
                              }))
                            }
                            value={destinationName}
                          >
                            {publicHospitals.map((hospital) => (
                              <option key={hospital.name} value={hospital.name}>
                                {hospital.name}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="grid grid-cols-[auto_1fr] items-center gap-2 text-xs font-black uppercase text-slate-500">
                          Necesitamos
                          <input
                            className="h-9 rounded-[9px] border border-slate-200 bg-slate-50 px-2 text-sm font-black text-slate-950 outline-none focus:border-blue-500 focus:bg-white"
                            min="1"
                            onChange={(event) =>
                              setRequestedQuantities((current) => ({
                                ...current,
                                [exchange.item]: event.target.value,
                              }))
                            }
                            type="number"
                            value={requestedQuantities[exchange.item] ?? "50"}
                          />
                        </label>
                        <button
                          className={`rounded-[9px] px-3 py-2 text-xs font-black text-white transition lg:col-start-2 ${
                            wasRequested
                              ? "bg-blue-600"
                              : "bg-emerald-600 hover:bg-emerald-500"
                          }`}
                          disabled={wasRequested}
                          onClick={() => {
                            const quantity = Number(
                              requestedQuantities[exchange.item] ?? 50,
                            );

                            requestResource(
                              exchange,
                              Number.isFinite(quantity) && quantity > 0
                                ? quantity
                                : 50,
                            );
                          }}
                          type="button"
                        >
                          {wasRequested ? "Alerta creada" : "Solicitar traslado"}
                        </button>
                      </div>
                    </article>
                  );
                })}
            </div>
          </div>

          <div className="overflow-hidden rounded-[14px] border border-rose-100 bg-white">
            <div className="border-b border-slate-100 p-4">
              <p className="text-xs font-black uppercase tracking-wide text-rose-700">
                Alertas en mapa
              </p>
              <h3 className="mt-1 text-sm font-black text-slate-950">
                Solicitudes de traslado generadas
              </h3>
            </div>
            <div className="h-[260px]">
              <MedicAlertMapLoader alerts={transferAlerts} />
            </div>
            <div className="border-t border-slate-100 bg-slate-50 p-4">
              {transferAlerts.length ? (
                <div className="space-y-2">
                  {transferAlerts.map((alert) => (
                    <p
                      className="rounded-[10px] bg-white px-3 py-2 text-xs font-black text-rose-700"
                      key={`${alert.item}-${alert.destination}`}
                    >
                      {alert.item}: {alert.donor} {"->"} {alert.destination}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-xs leading-5 text-slate-500">
                  Solicita un recurso disponible para crear una alerta y
                  visualizar la ruta en el mapa.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_340px]">
        <section className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <h2 className="text-lg font-black text-slate-950">
              Solicitudes recientes
            </h2>
            <button className="rounded-[10px] bg-rose-600 px-4 py-2 text-xs font-black text-white transition hover:bg-rose-500">
              Nueva solicitud
            </button>
          </div>
          <div className="mt-5 space-y-3">
            {medicRequests.map((request) => (
              <article
                key={request.title}
                className="grid gap-3 rounded-[14px] border border-slate-100 bg-slate-50 p-4 sm:grid-cols-[1fr_auto]"
              >
                <div>
                  <p className="text-sm font-black text-slate-950">
                    {request.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {request.hospital}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs font-black text-rose-700">
                    {request.priority}
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-600">
                    {request.units}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black text-slate-950">
            Registrar recurso del hospital
          </h2>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Este recurso queda asociado a {activeHospital.name}.
          </p>
          <form className="mt-4 space-y-3" onSubmit={registerHospitalResource}>
            <label className="block">
              <span className="mb-1 block text-[0.65rem] font-black uppercase tracking-wide text-slate-500">
                Insumo o medicamento
              </span>
              <input
                className="h-10 w-full rounded-[10px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
                onChange={(event) => setResourceName(event.target.value)}
                placeholder="Ej. Guantes de latex"
                value={resourceName}
              />
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label
                className={`rounded-[10px] border p-3 text-xs font-black ${
                  resourceType === "Faltante"
                    ? "border-rose-300 bg-rose-50 text-rose-700 ring-4 ring-rose-50"
                    : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                <input
                  checked={resourceType === "Faltante"}
                  className="mr-1"
                  name="reportType"
                  onChange={() => setResourceType("Faltante")}
                  type="radio"
                />
                Falta / se necesita
              </label>
              <label
                className={`rounded-[10px] border p-3 text-xs font-black ${
                  resourceType === "Sobrante"
                    ? "border-emerald-300 bg-emerald-50 text-emerald-700 ring-4 ring-emerald-50"
                    : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                <input
                  checked={resourceType === "Sobrante"}
                  className="mr-1"
                  name="reportType"
                  onChange={() => setResourceType("Sobrante")}
                  type="radio"
                />
                Sobra / disponible
              </label>
            </div>
            {resourceType === "Faltante" ? (
              <label className="block">
                <span className="mb-1 block text-[0.65rem] font-black uppercase tracking-wide text-slate-500">
                  Prioridad
                </span>
                <select
                  className="h-10 w-full rounded-[10px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
                  onChange={(event) =>
                    setResourcePriority(
                      event.target.value as HospitalResource["priority"],
                    )
                  }
                  value={resourcePriority}
                >
                  <option value="Normal">Normal</option>
                  <option value="Alta">Alta</option>
                  <option value="Critica">Critica</option>
                </select>
              </label>
            ) : null}
            <label className="block">
              <span className="mb-1 block text-[0.65rem] font-black uppercase tracking-wide text-slate-500">
                Cantidad
              </span>
              <input
                className="h-10 w-full rounded-[10px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
                min="1"
                onChange={(event) => setResourceQuantity(event.target.value)}
                placeholder="500"
                type="number"
                value={resourceQuantity}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[0.65rem] font-black uppercase tracking-wide text-slate-500">
                Nota opcional
              </span>
              <textarea
                className="min-h-20 w-full resize-none rounded-[10px] border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white"
                onChange={(event) => setResourceNotes(event.target.value)}
                placeholder="Ej. Talla, vencimiento, condicion, observacion"
                value={resourceNotes}
              />
            </label>
            <button
              className="h-11 w-full rounded-[12px] bg-blue-600 text-sm font-black text-white transition hover:bg-blue-500"
              type="submit"
            >
              Registrar recurso en hospital
            </button>
          </form>
        </aside>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_340px]">
        <section className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-blue-700">
                Inventario del hospital
              </p>
              <h2 className="mt-1 text-lg font-black text-slate-950">
                Recursos registrados en {activeHospital.name}
              </h2>
            </div>
            <div className="flex gap-2 text-xs font-black">
              <span className="rounded-[10px] bg-rose-50 px-3 py-2 text-rose-700">
                Faltan {missingResources.length}
              </span>
              <span className="rounded-[10px] bg-emerald-50 px-3 py-2 text-emerald-700">
                Sobran {surplusResources.length}
              </span>
            </div>
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-2">
            <InventoryColumn
              items={missingResources}
              title="Insumos que faltan / se necesitan"
              tone="missing"
            />
            <InventoryColumn
              items={surplusResources}
              title="Insumos disponibles / sobrantes"
              tone="surplus"
            />
          </div>
        </section>

        <aside className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black text-slate-950">
            Flujo prioritario
          </h2>
          <ol className="mt-5 space-y-4 text-sm text-slate-600">
            <li className="rounded-[12px] bg-rose-50 p-4">
              <strong className="text-slate-950">1. Reportar necesidad</strong>
              <p className="mt-1 text-xs leading-5">
                Cantidad, urgencia, hospital y contacto responsable.
              </p>
            </li>
            <li className="rounded-[12px] bg-blue-50 p-4">
              <strong className="text-slate-950">2. Esperar asignacion</strong>
              <p className="mt-1 text-xs leading-5">
                El sistema cruza excedentes y rutas voluntarias.
              </p>
            </li>
            <li className="rounded-[12px] bg-emerald-50 p-4">
              <strong className="text-slate-950">3. Validar entrega</strong>
              <p className="mt-1 text-xs leading-5">
                Confirmacion con evidencia para cerrar la auditoria.
              </p>
            </li>
          </ol>
        </aside>
      </div>

      <section className="mt-6 rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-blue-700">
              Bitacora general de logistica
            </p>
            <h2 className="mt-1 text-lg font-black text-slate-950">
              Tracking de solicitudes enviadas
            </h2>
          </div>
          <span className="rounded-[10px] bg-blue-50 px-3 py-2 text-xs font-black text-blue-700">
            {logisticsLog.length} movimientos
          </span>
        </div>
        <div className="mt-4 space-y-3">
          {logisticsLog.map((entry) => (
            <article
              className="rounded-[14px] border border-slate-100 bg-slate-50 p-4"
              key={entry.id}
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <h3 className="text-sm font-black text-slate-950">
                    {entry.item} ({entry.quantity} {entry.unit})
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    De: {entry.origin} - A: {entry.destination}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Conductor: {entry.driver} ({entry.vehicle})
                  </p>
                  {entry.evidence ? (
                    <p className="mt-2 text-xs font-black text-emerald-700">
                      Evidencia recibida: {entry.evidence}
                    </p>
                  ) : null}
                </div>
                <span
                  className={`w-fit rounded-[10px] px-3 py-2 text-xs font-black ${
                    entry.status === "Entregado"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {entry.status}
                </span>
              </div>
            </article>
          ))}
          {transferAlerts.map((alert) => (
            <article
              className="rounded-[14px] border border-amber-100 bg-amber-50 p-4"
              key={`${alert.item}-${alert.destination}-pending`}
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <h3 className="text-sm font-black text-slate-950">
                    {alert.item} ({alert.quantity} {alert.unit})
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    De: {alert.donor} - A: {alert.destination}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Conductor: pendiente de asignacion
                  </p>
                </div>
                <span className="w-fit rounded-[10px] bg-amber-100 px-3 py-2 text-xs font-black text-amber-700">
                  Pendiente
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function InventoryColumn({
  items,
  title,
  tone,
}: {
  items: HospitalResource[];
  title: string;
  tone: "missing" | "surplus";
}) {
  const isMissing = tone === "missing";

  return (
    <div
      className={`rounded-[14px] border p-4 ${
        isMissing
          ? "border-rose-100 bg-rose-50/50"
          : "border-emerald-100 bg-emerald-50/50"
      }`}
    >
      <h3
        className={`text-sm font-black ${
          isMissing ? "text-rose-800" : "text-emerald-800"
        }`}
      >
        {title}
      </h3>
      <div className="mt-3 space-y-3">
        {items.length ? (
          items.map((item) => (
            <article
              className="rounded-[12px] border border-white bg-white p-4 shadow-sm"
              key={`${item.item}-${item.updatedAt}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-slate-950">
                    {item.item}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Hospital Jose Maria Vargas - {item.updatedAt}
                  </p>
                  {item.notes ? (
                    <p className="mt-2 text-xs leading-5 text-slate-600">
                      {item.notes}
                    </p>
                  ) : null}
                </div>
                <span
                  className={`rounded-[10px] px-3 py-2 text-xs font-black ${
                    isMissing
                      ? "bg-rose-50 text-rose-700"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {isMissing ? item.goal : item.obtained}
                </span>
              </div>
              {isMissing ? (
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-xs font-black text-rose-700">
                    Prioridad: {item.priority ?? "Normal"}
                  </span>
                  <button
                    className="rounded-[9px] bg-rose-600 px-3 py-2 text-xs font-black text-white"
                    type="button"
                  >
                    Solicitar apoyo
                  </button>
                </div>
              ) : (
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-xs font-black text-emerald-700">
                    Disponible para donar
                  </span>
                  <button
                    className="rounded-[9px] bg-emerald-600 px-3 py-2 text-xs font-black text-white"
                    type="button"
                  >
                    Publicar sobrante
                  </button>
                </div>
              )}
            </article>
          ))
        ) : (
          <p className="rounded-[12px] bg-white p-4 text-xs leading-5 text-slate-500">
            No hay recursos registrados en esta categoria.
          </p>
        )}
      </div>
    </div>
  );
}
