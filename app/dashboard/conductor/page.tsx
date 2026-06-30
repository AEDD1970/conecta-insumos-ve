"use client";

import { useState } from "react";
import { AppShell } from "@/src/components/dashboard/app-shell";
import { logisticsLog, transferRequests } from "@/src/lib/operations-content";

type DeliveryState = "Tomada" | "En ruta" | "Entregado";
type TransferRequest = (typeof transferRequests)[number];

const driverProfile = {
  name: "Jose Miguel Arrieta",
  vehicle: "Suzuki GN-125",
  unit: "Carga Ligera",
  plate: "AB9X21Y",
  type: "Moto",
  color: "Rojo",
  circulationCard: "CC-543219-M",
};

export default function DriverDashboardPage() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [acceptedRequestIds, setAcceptedRequestIds] = useState<string[]>([]);
  const [deliveryStates, setDeliveryStates] = useState<
    Record<string, DeliveryState>
  >({});
  const [deliveryEvidence, setDeliveryEvidence] = useState<
    Record<string, string>
  >({});

  const pendingRequests = transferRequests.filter(
    (request) => !acceptedRequestIds.includes(request.id),
  );
  const acceptedRequests = acceptedRequestIds
    .map((requestId) =>
      transferRequests.find((request) => request.id === requestId),
    )
    .filter((request): request is TransferRequest => Boolean(request));
  const closedDeliveries = logisticsLog.filter(
    (entry) => entry.driver === driverProfile.name,
  );
  const myActiveLoads = [...acceptedRequests];

  function acceptRequest(requestId: string) {
    setAcceptedRequestIds((current) => {
      if (current.includes(requestId)) {
        return current;
      }

      setDeliveryStates((states) => ({ ...states, [requestId]: "Tomada" }));
      return [...current, requestId];
    });
  }

  function updateDeliveryState(requestId: string, state: DeliveryState) {
    setDeliveryStates((current) => ({ ...current, [requestId]: state }));
  }

  return (
    <AppShell eyebrow="Rol conductor" title="Centro de traslado solidario">
      <section className="rounded-[18px] border border-emerald-100 bg-emerald-50 p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
              Perfil conductor colaborador activo
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">
              Vehiculo registrado:{" "}
              <span className="text-emerald-700">
                {driverProfile.vehicle} ({driverProfile.unit})
              </span>
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Placa:{" "}
              <strong className="rounded-[6px] bg-white px-2 py-1 text-blue-700">
                {driverProfile.plate}
              </strong>{" "}
              | Tipo: {driverProfile.type} | Color: {driverProfile.color} |
              Carnet Circ.: {driverProfile.circulationCard}
            </p>
          </div>

          <div className="rounded-[14px] border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide text-slate-400">
              Mi estado en el sistema
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span
                className={`text-sm font-black ${
                  isAvailable ? "text-emerald-700" : "text-rose-700"
                }`}
              >
                {isAvailable
                  ? "Disponible para traslado"
                  : "No disponible temporalmente"}
              </span>
              <button
                className={`rounded-[10px] px-4 py-2 text-xs font-black transition ${
                  isAvailable
                    ? "bg-rose-50 text-rose-700 hover:bg-rose-100"
                    : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                }`}
                onClick={() => setIsAvailable((current) => !current)}
                type="button"
              >
                {isAvailable ? "Desactivar" : "Activar"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_360px]">
        <section className="rounded-[18px] border border-slate-950 bg-slate-950 p-5 text-white shadow-lg">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-700 pb-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">
                Viajes solidarios pendientes (alertas de la red)
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                Insumos de donacion y escasez que necesitan transporte urgente
                entre hospitales o puntos comunitarios de Caracas. Acepte una
                ruta y movilicela.
              </p>
            </div>
            <span className="w-fit rounded-[8px] bg-amber-500/10 px-3 py-2 text-xs font-black text-amber-300">
              {pendingRequests.length} viajes en espera
            </span>
          </div>

          <div className="mt-5 max-h-[330px] space-y-3 overflow-y-auto pr-2">
            {pendingRequests.length ? (
              pendingRequests.map((request) => (
                <article
                  className="rounded-[14px] border border-slate-700 bg-slate-900 p-4"
                  key={request.id}
                >
                  <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-[8px] bg-white/10 px-2 py-1 text-[0.65rem] font-black text-slate-300">
                          {request.id}
                        </span>
                        <span className="rounded-[8px] bg-rose-500/10 px-2 py-1 text-[0.65rem] font-black text-rose-200">
                          {request.priority}
                        </span>
                      </div>
                      <h3 className="mt-3 text-base font-black">
                        {request.item} ({request.quantity} {request.unit})
                      </h3>
                      <div className="mt-3 grid gap-2 text-sm leading-6 text-slate-300 md:grid-cols-2">
                        <p>
                          Origen:{" "}
                          <strong className="text-white">
                            {request.origin}
                          </strong>
                        </p>
                        <p>
                          Destino:{" "}
                          <strong className="text-white">
                            {request.destination}
                          </strong>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between gap-3 lg:items-end">
                      <span className="text-xs font-black text-blue-200">
                        {request.distance}
                      </span>
                      <button
                        className="rounded-[10px] bg-emerald-500 px-4 py-2 text-xs font-black text-white transition hover:bg-emerald-400"
                        disabled={!isAvailable}
                        onClick={() => acceptRequest(request.id)}
                        type="button"
                      >
                        Tomar solicitud
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <p className="rounded-[12px] border border-slate-600 px-4 py-5 text-center text-sm italic text-slate-400">
                No hay viajes pendientes en la red en este momento.
              </p>
            )}
          </div>
        </section>

        <aside className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
              Mis traslados de carga ({myActiveLoads.length + closedDeliveries.length})
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Siga el estado de los insumos que ha recogido para entregar en el
              centro hospitalario destino.
            </p>
          </div>

          <div className="mt-5 max-h-[360px] space-y-3 overflow-y-auto pr-2">
            {myActiveLoads.map((request) => {
              const state = deliveryStates[request.id] ?? "Tomada";
              const evidence = deliveryEvidence[request.id];

              return (
                <article
                  className="rounded-[14px] border border-blue-100 bg-blue-50 p-4"
                  key={request.id}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-black text-slate-950">
                      Envio #{request.id}
                    </h3>
                    <span className="rounded-[8px] bg-blue-100 px-2 py-1 text-[0.65rem] font-black text-blue-700">
                      {state}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-black text-slate-950">
                    Carga: {request.item}{" "}
                    <span className="text-emerald-700">
                      ({request.quantity} {request.unit})
                    </span>
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Origen: {request.origin}
                    <br />
                    Destino: {request.destination}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      className="rounded-[10px] bg-amber-500 px-3 py-2 text-xs font-black text-white"
                      onClick={() => updateDeliveryState(request.id, "En ruta")}
                      type="button"
                    >
                      En ruta
                    </button>
                    <button
                      className="rounded-[10px] bg-emerald-600 px-3 py-2 text-xs font-black text-white disabled:cursor-not-allowed disabled:bg-slate-300"
                      disabled={!evidence}
                      onClick={() =>
                        updateDeliveryState(request.id, "Entregado")
                      }
                      type="button"
                    >
                      Entregado
                    </button>
                  </div>
                  <label className="mt-3 block">
                    <span className="mb-1 block text-[0.65rem] font-black uppercase tracking-wide text-slate-500">
                      Foto o documento de entrega
                    </span>
                    <input
                      className="block w-full rounded-[10px] border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 file:mr-3 file:rounded-[8px] file:border-0 file:bg-slate-950 file:px-3 file:py-2 file:text-xs file:font-black file:text-white"
                      onChange={(event) => {
                        const fileName = event.target.files?.[0]?.name ?? "";

                        setDeliveryEvidence((current) => ({
                          ...current,
                          [request.id]: fileName,
                        }));
                      }}
                      type="file"
                    />
                  </label>
                  <p className="mt-3 text-xs italic leading-5 text-slate-500">
                    {evidence
                      ? `Evidencia cargada: ${evidence}`
                      : "Esperando evidencia para cerrar esta entrega."}
                  </p>
                </article>
              );
            })}

            {closedDeliveries.map((entry) => (
              <article
                className="rounded-[14px] border border-slate-100 bg-slate-50 p-4"
                key={entry.id}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-black text-slate-950">
                    Envio #{entry.id}
                  </h3>
                  <span className="rounded-[8px] bg-cyan-100 px-2 py-1 text-[0.65rem] font-black text-cyan-700">
                    {entry.status}
                  </span>
                </div>
                <p className="mt-3 text-sm font-black text-slate-950">
                  Carga: {entry.item}{" "}
                  <span className="text-emerald-700">
                    ({entry.quantity} {entry.unit})
                  </span>
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Origen: {entry.origin}
                  <br />
                  Destino: {entry.destination}
                </p>
                <p className="mt-4 text-xs italic leading-5 text-slate-400">
                  Esperando que el gerente en destino confirme recepcion.
                </p>
              </article>
            ))}

            {!myActiveLoads.length && !closedDeliveries.length ? (
              <p className="rounded-[12px] bg-slate-50 p-5 text-center text-sm italic text-slate-500">
                No tienes traslados tomados todavia.
              </p>
            ) : null}
          </div>
        </aside>
      </div>

      <section className="mt-6 rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-950 pb-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-blue-700">
              Bitacora general de logistica ({logisticsLog.length})
            </p>
          </div>
          <span className="rounded-[10px] bg-blue-50 px-3 py-2 text-xs font-black text-blue-700">
            Monitoreo activo de la red
          </span>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {logisticsLog.map((entry) => (
            <article
              className="rounded-[14px] border border-slate-100 bg-slate-50 p-4"
              key={entry.id}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-black text-slate-950">
                  {entry.item}
                </h3>
                <span
                  className={`rounded-[8px] px-3 py-1 text-xs font-black ${
                    entry.status === "Entregado"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {entry.status}
                </span>
              </div>
              <div className="mt-3 space-y-1 text-sm leading-6 text-slate-600">
                <p>
                  <strong>Cantidad:</strong> {entry.quantity} {entry.unit}
                </p>
                <p>
                  <strong>Origen:</strong> {entry.origin}
                </p>
                <p>
                  <strong>Destino:</strong> {entry.destination}
                </p>
              </div>
              <p className="mt-4 text-xs font-black uppercase tracking-wide text-slate-400">
                Conductor: {entry.driver} [{entry.vehicle}]
              </p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
