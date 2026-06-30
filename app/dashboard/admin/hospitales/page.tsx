import { AppShell } from "@/src/components/dashboard/app-shell";
import { HospitalLocationPickerLoader } from "@/src/components/hospitals/hospital-location-picker-loader";

export default function AdminHospitalsPage() {
  return (
    <AppShell
      eyebrow="Administracion interna"
      title="Registrar hospital y ubicacion"
    >
      <HospitalLocationPickerLoader context="admin" />
    </AppShell>
  );
}
