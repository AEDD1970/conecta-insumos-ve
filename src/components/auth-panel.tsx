"use client";

import Link from "next/link";
import { useState } from "react";
import { partnerHospitals, urgencyLevels } from "@/src/lib/home-content";

const inputBase =
  "h-9 w-full rounded-[10px] border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100";

type Role = "medico" | "conductor";
type AuthMode = "login" | "register";

const roles: Array<{
  id: Role;
  label: string;
  helper: string;
  route: string;
}> = [
  {
    id: "medico",
    label: "Medico",
    helper: "Gestiona insumos de un hospital",
    route: "/dashboard/medico",
  },
  {
    id: "conductor",
    label: "Conductor",
    helper: "Registra vehiculo y traslada insumos",
    route: "/dashboard/conductor",
  },
];

export function AuthPanel() {
  const [authMode, setAuthMode] = useState<AuthMode>("register");
  const [selectedRole, setSelectedRole] = useState<Role>("medico");
  const activeRole = roles.find((role) => role.id === selectedRole) ?? roles[0];
  const isLogin = authMode === "login";

  return (
    <section
      aria-label="Acceso y registro"
      className="w-full rounded-[18px] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-300/60 lg:sticky lg:top-5 lg:max-w-[420px]"
    >
      <div className="grid grid-cols-2 rounded-[15px] border border-slate-950 bg-slate-50 p-1">
        <button
          className={`h-9 rounded-[12px] text-xs font-black transition ${
            isLogin
              ? "bg-white text-slate-950 shadow-sm"
              : "text-slate-500 hover:text-slate-950"
          }`}
          onClick={() => setAuthMode("login")}
          type="button"
        >
          Ingresar al Sistema
        </button>
        <button
          className={`h-9 rounded-[12px] text-xs font-black transition ${
            !isLogin
              ? "bg-white text-slate-950 shadow-sm"
              : "text-slate-500 hover:text-slate-950"
          }`}
          onClick={() => setAuthMode("register")}
          type="button"
        >
          Registrar Nuevo Rol
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 rounded-[14px] border border-blue-100 bg-blue-50 p-4">
        <div>
          <p className="text-xs font-black uppercase text-blue-700">
            Acceso publico sin cuenta
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-600">
            Consulta hospitales, rutas y reportes comunitarios en tiempo real.
          </p>
        </div>
        <Link
          href="/mapa"
          className="shrink-0 rounded-[10px] bg-indigo-600 px-4 py-3 text-xs font-black text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500"
        >
          Explorar
        </Link>
      </div>

      <Link
        href="/hospitales/registro"
        className="mt-3 block rounded-[14px] border border-emerald-100 bg-emerald-50 p-4 transition hover:border-emerald-200 hover:bg-emerald-100"
      >
        <p className="text-xs font-black uppercase text-emerald-700">
          Registrar hospital en la red
        </p>
        <p className="mt-1 text-xs leading-5 text-slate-600">
          Agrega nombre, direccion y coordenadas para ubicarlo en el mapa.
        </p>
      </Link>

      <form action={activeRole.route} className="mt-4 space-y-4">
        <div>
          <h2 className="text-sm font-black text-slate-950">
            {isLogin ? "Ingresar al sistema" : "Crear cuenta operativa"}
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            {isLogin
              ? "Selecciona tu rol e ingresa con tus credenciales aprobadas."
              : "Selecciona medico o conductor para cargar el formulario correcto."}
          </p>
        </div>

        <fieldset>
          <legend className="mb-2 text-[0.65rem] font-black uppercase tracking-wide text-slate-500">
            Seleccionar rol de colaborador
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {roles.map((role) => {
              const isActive = selectedRole === role.id;

              return (
                <button
                  aria-pressed={isActive}
                  className={`min-h-14 rounded-[10px] border px-2 py-2 text-left transition ${
                    isActive
                      ? "border-blue-500 bg-blue-50 text-blue-800 ring-4 ring-blue-100"
                      : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-slate-50"
                  }`}
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  type="button"
                >
                  <span className="block text-xs font-black">{role.label}</span>
                  <span className="mt-1 block text-[0.62rem] font-semibold leading-3">
                    {role.helper}
                  </span>
                </button>
              );
            })}
          </div>
          <input name="role" type="hidden" value={selectedRole} />
        </fieldset>

        {isLogin ? (
          <LoginFields />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Nombre" placeholder="Ej. Pedro" />
              <Field label="Apellido" placeholder="Ej. Perez" />
              <Field label="Cedula" placeholder="V-12.345.678" />
              <Field label="Telefono" placeholder="0412-1234567" />
            </div>

            <Field
              label="Correo electronico"
              placeholder="pedro.perez@redsalud.org.ve"
              type="email"
            />
            <Field
              label="Establecer contrasena"
              placeholder="Contrasena segura"
              type="password"
            />

            <RoleSpecificFields selectedRole={selectedRole} />
          </>
        )}

        <button
          type="submit"
          className="h-11 w-full rounded-[12px] bg-slate-950 text-sm font-black text-white transition hover:bg-blue-700"
        >
          {isLogin
            ? `Ingresar como ${activeRole.label}`
            : `Finalizar registro como ${activeRole.label}`}
        </button>
        <p className="text-center text-[0.68rem] font-bold leading-4 text-slate-400">
          Las cuentas administradoras se crean internamente desde base de datos.
        </p>
      </form>
    </section>
  );
}

function LoginFields() {
  return (
    <div className="rounded-[14px] border border-slate-200 bg-slate-50 p-4">
      <h3 className="text-xs font-black uppercase text-slate-700">
        Credenciales aprobadas
      </h3>
      <div className="mt-3 space-y-3">
        <Field
          label="Correo electronico"
          placeholder="usuario@redsalud.org.ve"
          type="email"
        />
        <Field
          label="Contrasena"
          placeholder="Ingresa tu contrasena"
          type="password"
        />
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">
        El acceso final se conectara a base de datos; por ahora te lleva al
        panel del rol seleccionado.
      </p>
    </div>
  );
}

function RoleSpecificFields({ selectedRole }: { selectedRole: Role }) {
  if (selectedRole === "conductor") {
    return (
      <div className="rounded-[14px] border border-emerald-200 bg-emerald-50/50 p-4">
        <h3 className="text-xs font-black uppercase text-emerald-700">
          Datos obligatorios del vehiculo
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <Field label="Tipo de vehiculo" placeholder="Camioneta, moto, carro" />
          <Field label="Modelo / marca" placeholder="Ej. Toyota Hilux" />
          <Field label="Placa" placeholder="Ej. AB123CD" />
          <Field label="Capacidad de carga" placeholder="Ej. 120 kg" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[14px] border border-rose-200 bg-rose-50/50 p-4">
      <h3 className="text-xs font-black uppercase text-rose-700">
        Centro hospitalario
      </h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-[0.65rem] font-black uppercase tracking-wide text-slate-500">
            Hospital asignado
          </span>
          <select className={inputBase} defaultValue="">
            <option value="" disabled>
              Selecciona un centro
            </option>
            {partnerHospitals.map((hospital) => (
              <option key={hospital}>{hospital}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-[0.65rem] font-black uppercase tracking-wide text-slate-500">
            Nivel de urgencia inicial
          </span>
          <select className={inputBase} defaultValue="">
            <option value="" disabled>
              Selecciona prioridad
            </option>
            {urgencyLevels.map((level) => (
              <option key={level}>{level}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[0.65rem] font-black uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <input className={inputBase} placeholder={placeholder} type={type} />
    </label>
  );
}
