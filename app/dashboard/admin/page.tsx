"use client";

import Link from "next/link";
import { useState } from "react";
import { AppShell } from "@/src/components/dashboard/app-shell";
import { LeafletMapLoader } from "@/src/components/map/leaflet-map-loader";
import {
  adminHospitals,
  approvedCollaborators,
  freeServices,
  inventoryExchanges,
  logisticsLog,
  registrationRequests,
} from "@/src/lib/operations-content";

type AdminPanel =
  | "monitoreo"
  | "hospitales"
  | "colaboradores"
  | "peticiones"
  | "servicios";

const panelCopy = {
  monitoreo: {
    eyebrow: "Monitoreo en tiempo real",
    title: "Mapa operativo de la red",
    copy: "Visualice la ubicacion de los centros de salud, distribucion de excedentes, faltantes y servicios de transporte activos en el mapa metropolitano de Caracas.",
  },
  hospitales: {
    eyebrow: "Hospitales registrados en la red",
    title: "Centros conectados al sistema",
    copy: "Consulte el listado de centros de salud conectados al sistema de cooperacion de suministros.",
  },
  colaboradores: {
    eyebrow: "Informacion de colaboradores activos",
    title: "Usuarios aprobados oficialmente",
    copy: "Consulte la base de datos de gerentes de centros hospitalarios y conductores de la red aprobados oficialmente.",
  },
  peticiones: {
    eyebrow: "Peticiones de registro de colaboradores",
    title: "Solicitudes pendientes de aprobacion",
    copy: "Evalue las solicitudes de registro de nuevos medicos y conductores. Al aprobarlos se habilita su acceso al sistema.",
  },
  servicios: {
    eyebrow: "Solicitudes de servicios medicos gratuitos",
    title: "Servicios activos en el mapa publico",
    copy: "Apruebe o rechace las solicitudes enviadas por instituciones y usuarios sin registro. Una vez aprobadas apareceran geolocalizadas en el mapa publico.",
  },
} as const;

export default function AdminDashboardPage() {
  const [activePanel, setActivePanel] = useState<AdminPanel>("monitoreo");
  const [hospitalSearch, setHospitalSearch] = useState("");

  const filteredHospitals = adminHospitals.filter((hospital) => {
    const query = hospitalSearch.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return (
      hospital.name.toLowerCase().includes(query) ||
      hospital.municipality.toLowerCase().includes(query) ||
      hospital.address.toLowerCase().includes(query)
    );
  });

  const activeCopy = panelCopy[activePanel];
  const menuButtonClass = (panel: AdminPanel) =>
    `rounded-[10px] border px-4 py-4 text-left text-sm font-black transition ${
      activePanel === panel
        ? "border-indigo-200 bg-indigo-50 text-indigo-700"
        : "border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50"
    }`;

  return (
    <AppShell eyebrow="Rol administrador" title="Control operativo de la red">
      <section className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid items-start gap-5 lg:grid-cols-[240px_1fr]">
          <aside className="rounded-[16px] border border-slate-200 bg-slate-50 p-4">
            <p className="mb-3 border-b border-slate-200 pb-3 text-xs font-black uppercase tracking-wide text-slate-400">
              Menu de gestion
            </p>
            <nav className="grid gap-2">
              <button
                className={menuButtonClass("monitoreo")}
                onClick={() => setActivePanel("monitoreo")}
                type="button"
              >
                Monitoreo en Tiempo Real
              </button>
              <button
                className={menuButtonClass("hospitales")}
                onClick={() => setActivePanel("hospitales")}
                type="button"
              >
                Hospitales ({adminHospitals.length})
              </button>
              <button
                className={menuButtonClass("colaboradores")}
                onClick={() => setActivePanel("colaboradores")}
                type="button"
              >
                Colaboradores ({approvedCollaborators.length})
              </button>
              <button
                className={menuButtonClass("peticiones")}
                onClick={() => setActivePanel("peticiones")}
                type="button"
              >
                Peticiones Registro
              </button>
              <button
                className={menuButtonClass("servicios")}
                onClick={() => setActivePanel("servicios")}
                type="button"
              >
                Servicios de Ayuda
              </button>
            </nav>
          </aside>

          <div className="min-w-0">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-slate-950">
                  {activeCopy.eyebrow}
                </p>
                <h2 className="mt-1 text-lg font-black text-slate-950">
                  {activeCopy.title}
                </h2>
                <p className="mt-1 max-w-4xl text-sm leading-6 text-slate-500">
                  {activeCopy.copy}
                </p>
              </div>
              {activePanel === "hospitales" ? (
                <Link
                  className="rounded-[12px] bg-indigo-600 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-indigo-500"
                  href="/dashboard/admin/hospitales"
                >
                  Registrar hospital nuevo
                </Link>
              ) : null}
            </div>

            {activePanel === "monitoreo" ? <MonitoringPanel /> : null}
            {activePanel === "hospitales" ? (
              <HospitalsPanel
                filteredHospitals={filteredHospitals}
                hospitalSearch={hospitalSearch}
                onSearchChange={setHospitalSearch}
              />
            ) : null}
            {activePanel === "colaboradores" ? <CollaboratorsPanel /> : null}
            {activePanel === "peticiones" ? <RequestsPanel /> : null}
            {activePanel === "servicios" ? <ServicesPanel /> : null}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-950 pb-4 sm:flex-row sm:items-center">
          <p className="text-lg font-black text-slate-950">
            Bitacora general de logistica ({logisticsLog.length})
          </p>
          <span className="rounded-[10px] bg-blue-50 px-3 py-2 text-xs font-black text-blue-700">
            Monitoreo activo de la red
          </span>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
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

function MonitoringPanel() {
  return (
    <section className="mt-5 overflow-hidden rounded-[18px] border border-slate-950 bg-white">
      <div className="border-b border-slate-100 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black text-slate-950">
              Monitoreo en Tiempo Real: Caracas
            </p>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              Haz clic en los marcadores para destacar requerimientos criticos o
              servicios de ayuda.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs font-black">
            <span className="text-rose-600">Falta insumos</span>
            <span className="text-emerald-600">Sobra insumos</span>
            <span className="text-amber-600">Ambos</span>
            <span className="text-violet-600">Servicio gratuito</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-black">
          <span className="rounded-[10px] bg-white px-3 py-2 text-slate-700 shadow-sm">
            Mostrar todo
          </span>
          <span className="rounded-[10px] bg-rose-50 px-3 py-2 text-rose-700">
            Necesitan insumos ({inventoryExchanges.length})
          </span>
          <span className="rounded-[10px] bg-emerald-50 px-3 py-2 text-emerald-700">
            Tienen excedentes (4)
          </span>
          <span className="rounded-[10px] bg-violet-50 px-3 py-2 text-violet-700">
            Servicios gratuitos ({freeServices.length})
          </span>
        </div>
      </div>
      <div className="h-[390px]">
        <LeafletMapLoader interactive minHeight={390} />
      </div>
    </section>
  );
}

function HospitalsPanel({
  filteredHospitals,
  hospitalSearch,
  onSearchChange,
}: {
  filteredHospitals: typeof adminHospitals[number][];
  hospitalSearch: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <section className="mt-5">
      <div className="mb-5 flex flex-col justify-between gap-3 rounded-[14px] border border-slate-950 bg-white p-3 sm:flex-row sm:items-center">
        <input
          className="h-11 rounded-[10px] border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-indigo-500 focus:bg-white sm:w-80"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar hospital por nombre o municipio..."
          value={hospitalSearch}
        />
        <span className="text-xs font-black uppercase tracking-wide text-slate-400">
          Mostrando {filteredHospitals.length} de {adminHospitals.length} centros
        </span>
      </div>
      <div className="max-h-[360px] overflow-y-auto pr-2">
        <div className="grid gap-3 lg:grid-cols-2">
          {filteredHospitals.map((hospital) => (
            <article
              className="rounded-[14px] border border-slate-950 bg-white p-4"
              key={hospital.name}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`rounded-[10px] px-3 py-1 text-xs font-black uppercase ${
                    hospital.municipality === "Sucre"
                      ? "bg-amber-50 text-amber-700"
                      : hospital.municipality === "Chacao"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {hospital.municipality}
                </span>
                <span className="rounded-[8px] bg-slate-50 px-3 py-1 text-xs font-black text-blue-400">
                  {hospital.position[0].toFixed(4)},{" "}
                  {hospital.position[1].toFixed(4)}
                </span>
              </div>
              <h3 className="mt-3 border-b border-slate-100 pb-3 text-sm font-black text-slate-950">
                {hospital.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                <strong className="uppercase text-slate-400">Ubicacion:</strong>{" "}
                {hospital.address}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CollaboratorsPanel() {
  return (
    <section className="mt-5 max-h-[390px] space-y-4 overflow-y-auto pr-2">
      {approvedCollaborators.map((collaborator) => (
        <article
          className="grid gap-5 rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-[190px_1fr]"
          key={collaborator.email}
        >
          <div className="flex flex-col items-start gap-3">
            <div className="grid size-20 place-items-center rounded-[16px] border border-slate-200 bg-slate-100 text-lg font-black text-slate-400">
              {collaborator.initials}
            </div>
            <span className="rounded-full bg-rose-50 px-3 py-1 text-[0.65rem] font-black uppercase text-rose-700">
              {collaborator.role}
            </span>
          </div>
          <div>
            <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-3 sm:flex-row sm:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-black text-slate-950">
                    {collaborator.name}
                  </h3>
                  <span className="rounded-[8px] bg-emerald-50 px-2 py-1 text-[0.65rem] font-black text-emerald-700">
                    Codigo verificado
                  </span>
                  <span className="rounded-[8px] bg-emerald-50 px-2 py-1 text-[0.65rem] font-black text-emerald-700">
                    {collaborator.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  Cedula de identidad:{" "}
                  <strong className="text-slate-700">
                    {collaborator.document}
                  </strong>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="rounded-[10px] border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-black text-amber-700"
                  type="button"
                >
                  Desactivar
                </button>
                <button
                  className="rounded-[10px] border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-black text-rose-700"
                  type="button"
                >
                  Eliminar
                </button>
              </div>
            </div>
            <div className="mt-4 grid gap-3 rounded-[14px] border border-slate-100 bg-slate-50 p-4 md:grid-cols-2">
              <InfoBlock label="Telefono de contacto" value={collaborator.phone} />
              <InfoBlock label="Correo electronico" value={collaborator.email} />
              <InfoBlock
                label="Hospital asignado / adscripcion"
                value={collaborator.hospital}
              />
              <InfoBlock
                label="Carnet institucional / codigo de certificacion"
                value={collaborator.credential}
              />
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

function RequestsPanel() {
  return (
    <section className="mt-5">
      {registrationRequests.length ? (
        <div className="space-y-3">
          {registrationRequests.map((request) => (
            <article
              className="rounded-[14px] border border-slate-200 bg-slate-50 p-4"
              key={String(request)}
            >
              <p className="text-sm font-black text-slate-950">
                Solicitud pendiente
              </p>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-[18px] border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-full border border-emerald-200 bg-white text-2xl font-black text-emerald-600">
            OK
          </div>
          <p className="mt-4 text-sm font-black italic text-slate-500">
            No hay peticiones de registro pendientes de aprobacion.
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Todos los colaboradores se encuentran activos o validados por la
            administracion.
          </p>
        </div>
      )}
    </section>
  );
}

function ServicesPanel() {
  return (
    <section className="mt-5 max-h-[390px] space-y-4 overflow-y-auto pr-2">
      {freeServices.map((service) => (
        <article
          className="rounded-[18px] border border-emerald-100 bg-emerald-50/30 p-4"
          key={service.name}
        >
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <h3 className="text-sm font-black text-slate-950">
                {service.name}
              </h3>
              <p className="mt-1 text-sm font-bold text-slate-700">
                Ubicacion: {service.area}
              </p>
            </div>
            <span className="w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase text-emerald-700">
              Activo en mapa
            </span>
          </div>

          <div className="mt-4 rounded-[12px] border border-emerald-100 bg-white p-4">
            <p className="text-sm font-black leading-6 text-slate-700">
              Descripcion del servicio:{" "}
              <span className="font-semibold italic">
                {service.description}
              </span>
            </p>
            <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 text-sm text-slate-600 md:grid-cols-2">
              <p>
                Responsable:{" "}
                <strong className="text-slate-950">
                  {service.responsible}
                </strong>
              </p>
              <p>
                Contacto telefono:{" "}
                <strong className="text-slate-950">{service.phone}</strong>
              </p>
              <p>
                Fecha disponible:{" "}
                <strong className="text-slate-950">{service.dateRange}</strong>
              </p>
              <p>
                Horas:{" "}
                <strong className="text-slate-950">{service.hours}</strong>
              </p>
              <p className="font-black text-indigo-700 md:col-span-2">
                Coordenadas del servicio: Lat: {service.position[0].toFixed(4)},
                Lng: {service.position[1].toFixed(4)}
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              className="rounded-[10px] bg-amber-500 px-4 py-2 text-xs font-black text-white transition hover:bg-amber-400"
              type="button"
            >
              Parar / finalizar servicio
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-black text-slate-950">{value}</p>
    </div>
  );
}
