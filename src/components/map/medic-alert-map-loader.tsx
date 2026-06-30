"use client";

import dynamic from "next/dynamic";
import type { MedicTransferAlert } from "@/src/components/map/medic-alert-map";

const DynamicMedicAlertMap = dynamic(
  () =>
    import("@/src/components/map/medic-alert-map").then(
      (mod) => mod.MedicAlertMap,
    ),
  {
    loading: () => (
      <div className="grid min-h-[260px] place-items-center bg-slate-100 text-sm font-black text-slate-500">
        Cargando mapa de alertas...
      </div>
    ),
    ssr: false,
  },
);

export function MedicAlertMapLoader({
  alerts,
}: {
  alerts: MedicTransferAlert[];
}) {
  return <DynamicMedicAlertMap alerts={alerts} />;
}
