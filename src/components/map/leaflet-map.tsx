"use client";

import L from "leaflet";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { publicHospitals } from "@/src/lib/operations-content";

const center: LatLngExpression = [10.497, -66.902];

const statusColors = {
  Critico: "#e11d48",
  Alta: "#f97316",
  Estable: "#059669",
};

const route: LatLngExpression[] = publicHospitals.map(
  (hospital) => hospital.position,
);

export function LeafletMap({
  interactive = false,
  minHeight = 240,
}: {
  interactive?: boolean;
  minHeight?: number;
}) {
  return (
    <MapContainer
      center={center}
      className="h-full w-full"
      doubleClickZoom={interactive}
      dragging={interactive}
      scrollWheelZoom={interactive}
      style={{ minHeight }}
      zoom={11}
      zoomControl={interactive}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline
        pathOptions={{ color: "#2563eb", dashArray: "7", weight: 2 }}
        positions={route}
      />
      {publicHospitals.map((hospital) => (
        <Marker
          icon={createHospitalIcon(statusColors[hospital.status])}
          key={hospital.name}
          position={hospital.position}
        >
          <Popup>
            <div className="space-y-1">
              <p className="text-sm font-black text-slate-950">
                {hospital.name}
              </p>
              <p className="text-xs text-slate-600">{hospital.zone}</p>
              <p className="text-xs font-bold text-rose-700">
                {hospital.need}
              </p>
              <p className="text-xs font-black text-blue-700">
                Estado: {hospital.status}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
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
