import Link from "next/link";
import { BrandMark } from "@/src/components/brand-mark";
import { HospitalLocationPickerLoader } from "@/src/components/hospitals/hospital-location-picker-loader";

export default function PublicHospitalRegistrationPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-[64px] w-full max-w-6xl flex-col justify-between gap-4 px-5 py-4 sm:flex-row sm:items-center">
          <BrandMark />
          <nav className="flex flex-wrap gap-2 text-xs font-black text-slate-600">
            <Link className="nav-pill" href="/">
              Inicio
            </Link>
            <Link className="nav-pill" href="/mapa">
              Consulta publica
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-8">
        <div className="mb-7 rounded-[18px] border border-blue-100 bg-blue-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">
            Registro visible de hospitales
          </p>
          <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">
            Postula un hospital para integrarlo a la red
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            Completa nombre, direccion y coordenadas. La solicitud queda visible
            para el equipo administrativo y se aprueba antes de publicar el
            centro en el mapa operativo.
          </p>
        </div>

        <HospitalLocationPickerLoader context="public" />
      </main>
    </div>
  );
}
