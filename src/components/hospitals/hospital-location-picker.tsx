"use client";

import L from "leaflet";
import { useMemo, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

const defaultPosition = [10.497, -66.902] as [number, number];

type HospitalLocationPickerProps = {
  context?: "public" | "admin";
};

export function HospitalLocationPicker({
  context = "public",
}: HospitalLocationPickerProps) {
  const [position, setPosition] = useState<[number, number]>(defaultPosition);
  const markerIcon = useMemo(() => createHospitalIcon("#2563eb"), []);

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[390px_1fr]">
      <HospitalForm context={context} position={position} />

      <section className="h-fit overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4">
          <p className="text-xs font-black uppercase tracking-wide text-blue-700">
            Ubicacion en mapa
          </p>
          <h2 className="mt-1 text-base font-black text-slate-950">
            Haz click para ubicar el hospital
          </h2>
        </div>
        <div className="h-[320px]">
          <MapContainer
            center={position}
            className="h-full w-full"
            scrollWheelZoom
            zoom={12}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationClickHandler onPick={setPosition} />
            <Marker icon={markerIcon} position={position}>
              <Popup>Ubicacion seleccionada</Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 border-t border-slate-100 bg-slate-50 p-4 text-xs">
          <div className="rounded-[10px] bg-white p-3">
            <p className="font-black uppercase text-slate-500">Latitud</p>
            <p className="mt-1 font-black text-slate-950">
              {position[0].toFixed(6)}
            </p>
          </div>
          <div className="rounded-[10px] bg-white p-3">
            <p className="font-black uppercase text-slate-500">Longitud</p>
            <p className="mt-1 font-black text-slate-950">
              {position[1].toFixed(6)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function HospitalForm({
  context,
  position,
}: {
  context: "public" | "admin";
  position: [number, number];
}) {
  const isPublic = context === "public";

  return (
    <section className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
        {isPublic ? "Solicitud visible" : "Registro de hospital"}
      </p>
      <h2 className="mt-1 text-lg font-black text-slate-950">
        {isPublic ? "Postular centro hospitalario" : "Datos base del centro"}
      </h2>

      <form
        action={isPublic ? "/hospitales/registro" : "/dashboard/admin/hospitales"}
        className="mt-5 space-y-4"
      >
        <Field label="Nombre del hospital" placeholder="Ej. Hospital Central" />
        <label className="block">
          <span className="mb-1 block text-[0.65rem] font-black uppercase tracking-wide text-slate-500">
            Direccion
          </span>
          <textarea
            className="min-h-24 w-full resize-none rounded-[10px] border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="Avenida, sector, municipio, referencia cercana"
          />
        </label>
        <div className="grid grid-cols-2 gap-2">
          <Field
            label="Latitud"
            name="latitude"
            placeholder="10.497000"
            value={position[0].toFixed(6)}
          />
          <Field
            label="Longitud"
            name="longitude"
            placeholder="-66.902000"
            value={position[1].toFixed(6)}
          />
        </div>
        {isPublic ? (
          <div className="rounded-[12px] border border-blue-100 bg-blue-50 p-3">
            <p className="text-xs font-black uppercase text-blue-700">
              Datos de contacto
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Field label="Responsable" placeholder="Nombre y apellido" />
              <Field label="Telefono" placeholder="0412-1234567" />
            </div>
          </div>
        ) : null}
        <button
          className="h-11 w-full rounded-[12px] bg-slate-950 text-sm font-black text-white transition hover:bg-blue-700"
          type="submit"
        >
          {isPublic ? "Enviar solicitud de hospital" : "Registrar hospital"}
        </button>
        <p className="text-xs leading-5 text-slate-500">
          {isPublic
            ? "La solicitud quedara pendiente de revision administrativa antes de aparecer en la red."
            : "En la siguiente etapa este formulario guardara el hospital en base de datos y lo publicara en el mapa operativo."}
        </p>
      </form>
    </section>
  );
}

function LocationClickHandler({
  onPick,
}: {
  onPick: (position: [number, number]) => void;
}) {
  useMapEvents({
    click(event) {
      onPick([event.latlng.lat, event.latlng.lng]);
    },
  });

  return null;
}

function Field({
  label,
  placeholder,
  name,
  value,
}: {
  label: string;
  placeholder: string;
  name?: string;
  value?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[0.65rem] font-black uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <input
        className="h-9 w-full rounded-[10px] border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
        name={name}
        placeholder={placeholder}
        readOnly={Boolean(value)}
        value={value}
      />
    </label>
  );
}

function createHospitalIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<span class="hospital-marker" style="--marker-color:${color}"></span>`,
    iconAnchor: [10, 10],
    iconSize: [20, 20],
    popupAnchor: [0, -16],
  });
}
