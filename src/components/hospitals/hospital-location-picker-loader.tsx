"use client";

import dynamic from "next/dynamic";

const DynamicHospitalLocationPicker = dynamic(
  () =>
    import("@/src/components/hospitals/hospital-location-picker").then(
      (mod) => mod.HospitalLocationPicker,
    ),
  {
    loading: () => (
      <div className="grid min-h-[360px] place-items-center rounded-[18px] border border-slate-200 bg-white text-sm font-black text-slate-500">
        Cargando selector de ubicacion...
      </div>
    ),
    ssr: false,
  },
);

export function HospitalLocationPickerLoader({
  context = "public",
}: {
  context?: "public" | "admin";
}) {
  return <DynamicHospitalLocationPicker context={context} />;
}
