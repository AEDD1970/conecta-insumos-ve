"use client";

import dynamic from "next/dynamic";

const DynamicLeafletMap = dynamic(
  () => import("@/src/components/map/leaflet-map").then((mod) => mod.LeafletMap),
  {
    loading: () => (
      <div className="grid h-full min-h-[240px] place-items-center bg-slate-100 text-sm font-black text-slate-500">
        Cargando mapa operativo...
      </div>
    ),
    ssr: false,
  },
);

export function LeafletMapLoader({
  interactive = false,
  minHeight = 240,
}: {
  interactive?: boolean;
  minHeight?: number;
}) {
  return <DynamicLeafletMap interactive={interactive} minHeight={minHeight} />;
}
