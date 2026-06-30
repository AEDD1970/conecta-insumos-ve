"use client";

import { useState } from "react";
import { AppShell } from "@/src/components/dashboard/app-shell";
import { StatCard } from "@/src/components/dashboard/stat-card";
import { logisticsLog, transferRequests } from "@/src/lib/operations-content";

type DeliveryState = "Tomada" | "En ruta" | "Entregado";

export default function DriverDashboardPage() {
  const [acceptedRequestIds, setAcceptedRequestIds] = useState<string[]>([]);
  const [deliveryStates, setDeliveryStates] = useState<
    Record<string, DeliveryState>
  >({});
  const [deliveryEvidence, setDeliveryEvidence] = useState<
    Record<string, string>
  >({});

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
    <AppShell eyebrow="Rol conductor" title="Rutas disponibles para entrega">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          label="Solicitudes"
          value={String(transferRequests.length)}
          tone="emerald"
        />
        <StatCard
          label="Tomadas"
          value={String(acceptedRequestIds.length)}
          tone="blue"
        />
        <StatCard label="Criticas" value="1" tone="rose" />
        <StatCard
          label="Completadas"
          value={String(
            Object.values(deliveryStates).filter(
              (state) => state === "Entregado",
            ).length + 18,
          )}
          tone="amber"
        />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_340px]">
        <section className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
                Alertas de traslado
              </p>
              <h2 className="mt-1 text-lg font-black text-slate-950">
                Solicitudes disponibles para tomar
              </h2>
            </div>
 
          </div>
          <div className="mt-5 space-y-3">
            {transferRequests.map((request) => {
              const isAccepted = acceptedRequestIds.includes(request.id);
              const deliveryState = deliveryStates[request.id];
              const evidence = deliveryEvidence[request.id];

              return (
                <article
                  key={request.id}
                  className={`rounded-[14px] border p-4 ${
                    isAccepted
                      ? "border-blue-200 bg-blue-50"
                      : "border-slate-100 bg-slate-50"
                  }`}
                >
                  <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-[8px] bg-white px-2 py-1 text-[0.65rem] font-black text-slate-500">
                          {request.id}
                        </span>
                        <span
                          className={`rounded-[8px] px-2 py-1 text-[0.65rem] font-black ${
                            request.priority === "Critica"
                              ? "bg-rose-100 text-rose-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {request.priority}
                        </span>
                      </div>
                      <h3 className="mt-3 text-sm font-black text-slate-950">
                        {request.item}
                      </h3>
                      <p className="mt-1 text-xs text-slate-600">
                        {request.quantity} {request.unit} para trasladar
                      </p>
                      <div className="mt-3 grid gap-2 text-xs leading-5 text-slate-600 md:grid-cols-2">
                        <p>
                          <strong className="text-slate-950">Origen:</strong>{" "}
                          {request.origin}
                        </p>
                        <p>
                          <strong className="text-slate-950">Destino:</strong>{" "}
                          {request.destination}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between gap-3 text-left sm:min-w-32 sm:text-right">
                      <p className="text-xs font-black text-blue-700">
                        {request.distance}
                      </p>
                      <button
                        className={`rounded-[10px] px-4 py-2 text-xs font-black text-white transition ${
                          isAccepted
                            ? "bg-blue-600"
                            : "bg-slate-950 hover:bg-emerald-600"
                        }`}
                        disabled={isAccepted}
                        onClick={() => acceptRequest(request.id)}
                        type="button"
                      >
                        {isAccepted ? "Solicitud tomada" : "Tomar solicitud"}
                      </button>
                    </div>
                  </div>
                  {isAccepted ? (
                    <div className="mt-4 rounded-[12px] border border-blue-100 bg-white p-4">
                      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                        <div>
                          <p className="text-xs font-black uppercase tracking-wide text-blue-700">
                            Seguimiento del traslado
                          </p>
                          <p className="mt-1 text-sm font-black text-slate-950">
                            Estado actual: {deliveryState}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            className="rounded-[10px] bg-amber-500 px-3 py-2 text-xs font-black text-white"
                            onClick={() =>
                              updateDeliveryState(request.id, "En ruta")
                            }
                            type="button"
                          >
                            Marcar en ruta
                          </button>
                          <button
                            className="rounded-[10px] bg-emerald-600 px-3 py-2 text-xs font-black text-white"
                            disabled={!evidence}
                            onClick={() =>
                              updateDeliveryState(request.id, "Entregado")
                            }
                            type="button"
                          >
                            Completar entrega
                          </button>
                        </div>
                      </div>
                      <label className="mt-3 block">
                        <span className="mb-1 block text-[0.65rem] font-black uppercase tracking-wide text-slate-500">
                          Foto o documento de entrega
                        </span>
                        <input
                          className="block w-full rounded-[10px] border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 file:mr-3 file:rounded-[8px] file:border-0 file:bg-slate-950 file:px-3 file:py-2 file:text-xs file:font-black file:text-white"
                          onChange={(event) => {
                            const fileName =
                              event.target.files?.[0]?.name ?? "";

                            setDeliveryEvidence((current) => ({
                              ...current,
                              [request.id]: fileName,
                            }));
                          }}
                          type="file"
                        />
                      </label>
                      {evidence ? (
                        <p className="mt-2 text-xs font-black text-emerald-700">
                          Evidencia lista: {evidence}
                        </p>
                      ) : (
                        <p className="mt-2 text-xs text-slate-500">
                          Para completar la orden primero sube una foto o
                          documento de entrega.
                        </p>
                      )}
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>

        <aside className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black text-slate-950">
            Estado de despacho
          </h2>
          <div className="mt-5 space-y-3">
            <div className="rounded-[12px] border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-sm font-black text-slate-950">
                Disponible ahora
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                Listo para aceptar una ruta priorizada.
              </p>
            </div>
            {acceptedRequestIds.length ? (
              <div className="rounded-[12px] border border-blue-100 bg-blue-50 p-4">
                <p className="text-sm font-black text-slate-950">
                  Solicitudes tomadas
                </p>
                <div className="mt-3 space-y-2">
                  {acceptedRequestIds.map((requestId) => {
                    const request = transferRequests.find(
                      (item) => item.id === requestId,
                    );

                    if (!request) {
                      return null;
                    }

                    return (
                      <p
                        className="rounded-[10px] bg-white px-3 py-2 text-xs font-black text-blue-700"
                        key={request.id}
                      >
                        {request.id}: {request.origin} {"->"}{" "}
                        {request.destination}
                      </p>
                    );
                  })}
                </div>
              </div>
            ) : null}
            <div className="rounded-[12px] border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm font-black text-slate-950">
                Bitacora cerrada
              </p>
              <div className="mt-3 space-y-2">
                {logisticsLog.map((entry) => (
                  <p
                    className="rounded-[10px] bg-white px-3 py-2 text-xs font-black text-slate-600"
                    key={entry.id}
                  >
                    {entry.id}: {entry.status}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-[12px] border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm font-black text-slate-950">
                Vehiculo pendiente
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                Falta validar placa, capacidad y telefono alternativo.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
