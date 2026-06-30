"use client";

import L from "leaflet";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

export type MedicTransferAlert = {
  item: string;
  donor: string;
  donorPosition: [number, number];
  destination: string;
  destinationPosition: [number, number];
  quantity: number;
  unit: string;
};

type MedicAlertMapProps = {
  alerts: MedicTransferAlert[];
};

const center: LatLngExpression = [10.497, -66.89];

export function MedicAlertMap({ alerts }: MedicAlertMapProps) {
  const hasAlerts = alerts.length > 0;

  return (
    <MapContainer
      center={center}
      className="h-full min-h-[260px] w-full"
      scrollWheelZoom={false}
      zoom={12}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {hasAlerts ? (
        alerts.map((alert) => (
          <RouteAlert key={`${alert.item}-${alert.destination}`} alert={alert} />
        ))
      ) : (
        <Marker icon={createMarker("#64748b")} position={center}>
          <Popup>No hay alertas solicitadas todavia.</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

function RouteAlert({
  alert,
}: {
  alert: MedicTransferAlert;
}) {
  const route = [alert.donorPosition, alert.destinationPosition] satisfies [
    LatLngExpression,
    LatLngExpression,
  ];

  return (
    <>
      <Polyline
        pathOptions={{ color: "#e11d48", dashArray: "8", weight: 3 }}
        positions={route}
      />
      <Marker icon={createMarker("#059669")} position={alert.donorPosition}>
        <Popup>
          <strong>{alert.donor}</strong>
          <br />
          Dona {alert.quantity} {alert.unit} de {alert.item}.
        </Popup>
      </Marker>
      <Marker icon={createMarker("#e11d48")} position={alert.destinationPosition}>
        <Popup>
          <strong>{alert.destination}</strong>
          <br />
          Recibe {alert.item}.
        </Popup>
      </Marker>
    </>
  );
}

function createMarker(color: string) {
  return L.divIcon({
    className: "",
    html: `<span class="hospital-marker" style="--marker-color:${color}"></span>`,
    iconAnchor: [10, 10],
    iconSize: [20, 20],
    popupAnchor: [0, -16],
  });
}
