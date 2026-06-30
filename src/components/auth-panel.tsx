"use client";

import Link from "next/link";
import { useState } from "react";
import { partnerHospitals } from "@/src/lib/home-content";

const inputBase =
  "h-9 w-full rounded-[10px] border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100";

type Role = "medico" | "conductor";
type AuthMode = "login" | "register";
type RegisterStep = 1 | 2 | 3;

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
  const [registerStep, setRegisterStep] = useState<RegisterStep>(1);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const activeRole = roles.find((role) => role.id === selectedRole) ?? roles[0];
  const isLogin = authMode === "login";
  const simulatedCode = "7809";

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
          onClick={() => {
            setAuthMode("login");
            setRegisterStep(1);
          }}
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
          onClick={() => {
            setAuthMode("register");
            setRegisterStep(1);
          }}
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
          Monitoreo en Tiempo Real: Caracas
        </p>
        <p className="mt-1 text-xs leading-5 text-slate-600">
          Visualiza hospitales, faltantes y rutas solidarias activas.
        </p>
      </Link>

      <form
        action={registerStep === 3 || isLogin ? activeRole.route : undefined}
        className="mt-4 space-y-4"
        onSubmit={(event) => {
          if (!isLogin && registerStep !== 3) {
            event.preventDefault();
          }
        }}
      >
        <div>
          <h2 className="text-sm font-black text-slate-950">
            {isLogin ? "Ingresar al sistema" : "Crear Nueva Cuenta"}
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            {isLogin
              ? "Selecciona tu rol e ingresa con tus credenciales aprobadas."
              : "Unete a la red cooperativa registrandote en un rol certificado."}
          </p>
        </div>

        {!isLogin ? <RegisterStepper currentStep={registerStep} /> : null}

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
                  onClick={() => {
                    setSelectedRole(role.id);
                    setRegisterStep(1);
                  }}
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
        ) : null}

        {!isLogin && registerStep === 1 ? (
          <RegisterDataStep
            email={email}
            onEmailChange={setEmail}
            selectedRole={selectedRole}
          />
        ) : null}

        {!isLogin && registerStep === 2 ? (
          <VerificationStep
            code={verificationCode}
            email={email}
            onCodeChange={setVerificationCode}
            simulatedCode={simulatedCode}
          />
        ) : null}

        {!isLogin && registerStep === 3 ? (
          <CredentialsStep
            onPhotoChange={setProfilePhoto}
            profilePhoto={profilePhoto}
          />
        ) : null}

        {isLogin ? (
          <button
            type="submit"
            className="h-11 w-full rounded-[12px] bg-slate-950 text-sm font-black text-white transition hover:bg-blue-700"
          >
            Ingresar como {activeRole.label}
          </button>
        ) : (
          <RegisterActions
            canVerify={verificationCode === simulatedCode}
            currentStep={registerStep}
            email={email}
            onBack={() =>
              setRegisterStep((step) => (step > 1 ? ((step - 1) as RegisterStep) : step))
            }
            onNext={() =>
              setRegisterStep((step) =>
                step < 3 ? ((step + 1) as RegisterStep) : step,
              )
            }
            roleLabel={activeRole.label}
          />
        )}
        <p className="text-center text-[0.68rem] font-bold leading-4 text-slate-400">
          Las cuentas administradoras se crean internamente desde base de datos.
        </p>
      </form>
    </section>
  );
}

function RegisterStepper({ currentStep }: { currentStep: RegisterStep }) {
  const steps = [
    { id: 1, label: "Datos" },
    { id: 2, label: "Verificar" },
    { id: 3, label: "Credenciales" },
  ] as const;

  return (
    <div className="grid grid-cols-3 gap-2">
      {steps.map((step) => {
        const isActive = currentStep >= step.id;

        return (
          <div className="flex items-center gap-2" key={step.id}>
            <span
              className={`grid size-6 shrink-0 place-items-center rounded-full text-xs font-black ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {step.id}
            </span>
            <span
              className={`text-xs font-black ${
                isActive ? "text-slate-950" : "text-slate-400"
              }`}
            >
              {step.label}
            </span>
            <span className="hidden h-px flex-1 bg-slate-200 sm:block" />
          </div>
        );
      })}
    </div>
  );
}

function RegisterDataStep({
  email,
  onEmailChange,
  selectedRole,
}: {
  email: string;
  onEmailChange: (email: string) => void;
  selectedRole: Role;
}) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <Field label="Nombre" placeholder="Ej. Pedro" />
        <Field label="Apellido" placeholder="Ej. Perez" />
        <Field label="Cedula" placeholder="V-12.345.678" />
        <Field label="Telefono" placeholder="0412-1234567" />
      </div>
      <Field
        label="Correo electronico"
        onChange={(event) => onEmailChange(event.target.value)}
        placeholder="pedro.perez@redsalud.org.ve"
        type="email"
        value={email}
      />
      <RoleSpecificFields selectedRole={selectedRole} />
    </>
  );
}

function VerificationStep({
  code,
  email,
  onCodeChange,
  simulatedCode,
}: {
  code: string;
  email: string;
  onCodeChange: (code: string) => void;
  simulatedCode: string;
}) {
  const verified = code === simulatedCode;
  const targetEmail = email || "tu correo registrado";

  return (
    <div className="space-y-4">
      <div className="rounded-[14px] border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800">
        Codigo de verificacion enviado al correo {targetEmail} (simulado).
      </div>
      <div className="rounded-[16px] border border-slate-950 bg-slate-50 p-5 text-center">
        <p className="text-3xl text-blue-600">✉</p>
        <h3 className="mt-2 text-sm font-black text-slate-950">
          Verificacion de Correo en Progreso
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Hemos simulado el envio de un codigo de verificacion de 4 digitos a{" "}
          <strong>{targetEmail}</strong>.
        </p>
        <div className="mx-auto mt-4 max-w-64 rounded-[12px] bg-blue-50 p-4">
          <p className="text-xs font-black uppercase tracking-wide text-blue-700">
            Codigo recibido (simulacion)
          </p>
          <p className="mt-2 text-2xl font-black tracking-[0.3em] text-blue-700">
            {simulatedCode}
          </p>
        </div>
      </div>
      <label className="block text-center">
        <span className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-500">
          Ingresa el codigo de 4 digitos
        </span>
        <input
          className="mx-auto h-12 w-40 rounded-[12px] border border-slate-200 bg-slate-50 px-4 text-center text-xl font-black tracking-[0.35em] text-slate-950 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          maxLength={4}
          onChange={(event) => onCodeChange(event.target.value)}
          placeholder="0000"
          value={code}
        />
      </label>
      {verified ? (
        <div className="rounded-[14px] border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800">
          Codigo verificado con exito. Ahora asigna una contrasena y sube tu
          foto de perfil si lo deseas.
        </div>
      ) : null}
    </div>
  );
}

function CredentialsStep({
  onPhotoChange,
  profilePhoto,
}: {
  onPhotoChange: (fileName: string) => void;
  profilePhoto: string;
}) {
  const avatars = ["AM", "DR", "CM", "LC"];

  return (
    <div className="space-y-4">
      <Field
        label="Asigna una contrasena para tu cuenta"
        placeholder="Minimo 6 caracteres"
        type="password"
      />
      <Field
        label="Repite tu contrasena"
        placeholder="Repite la contrasena"
        type="password"
      />
      <div className="rounded-[14px] border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-black uppercase tracking-wide text-slate-500">
          Sube tu foto de perfil (opcional)
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="grid size-14 place-items-center rounded-full border border-slate-200 bg-white text-xl font-black text-slate-400">
            {profilePhoto ? "✓" : "○"}
          </div>
          <label className="cursor-pointer rounded-[10px] border border-slate-200 bg-white px-4 py-3 text-xs font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700">
            Subir Foto
            <input
              accept="image/png,image/jpeg"
              className="sr-only"
              onChange={(event) =>
                onPhotoChange(event.target.files?.[0]?.name ?? "")
              }
              type="file"
            />
          </label>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Formatos soportados: JPG, PNG. Tamano maximo sugerido: 2MB.
        </p>
        {profilePhoto ? (
          <p className="mt-2 text-xs font-black text-emerald-700">
            Foto seleccionada: {profilePhoto}
          </p>
        ) : null}
        <p className="mt-4 text-xs font-black uppercase text-slate-400">
          O elige un avatar rapido de la red:
        </p>
        <div className="mt-3 flex gap-2">
          {avatars.map((avatar) => (
            <button
              className="grid size-10 place-items-center rounded-full bg-blue-100 text-xs font-black text-blue-700"
              key={avatar}
              onClick={() => onPhotoChange(`avatar-${avatar}`)}
              type="button"
            >
              {avatar}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function RegisterActions({
  canVerify,
  currentStep,
  email,
  onBack,
  onNext,
  roleLabel,
}: {
  canVerify: boolean;
  currentStep: RegisterStep;
  email: string;
  onBack: () => void;
  onNext: () => void;
  roleLabel: string;
}) {
  if (currentStep === 3) {
    return (
      <div className="grid grid-cols-2 gap-2">
        <button
          className="h-11 rounded-[12px] border border-slate-200 bg-white text-sm font-black text-slate-600"
          onClick={onBack}
          type="button"
        >
          Atras
        </button>
        <button
          className="h-11 rounded-[12px] bg-blue-600 text-sm font-black text-white transition hover:bg-blue-500"
          type="submit"
        >
          Finalizar Registro
        </button>
      </div>
    );
  }

  return (
    <div className={currentStep === 1 ? "block" : "grid grid-cols-2 gap-2"}>
      {currentStep === 2 ? (
        <button
          className="h-11 rounded-[12px] border border-slate-200 bg-white text-sm font-black text-slate-600"
          onClick={onBack}
          type="button"
        >
          Atras
        </button>
      ) : null}
      <button
        className="h-11 w-full rounded-[12px] bg-blue-600 text-sm font-black text-white transition hover:bg-blue-500 disabled:bg-slate-300"
        disabled={currentStep === 1 ? !email : !canVerify}
        onClick={onNext}
        type="button"
      >
        {currentStep === 1
          ? "Siguiente: Enviar Codigo de Correo"
          : `Continuar como ${roleLabel}`}
      </button>
    </div>
  );
}

function LoginFields() {
  return (
    <div className="rounded-[14px] border border-slate-200 bg-slate-50 p-4">
      <h3 className="text-xs font-black uppercase text-slate-700">
        Credenciales aprobadas
      </h3>
        <div className="mt-3 space-y-3">
        <Field label="Correo electronico" placeholder="usuario@redsalud.org.ve" type="email" />
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
          Credenciales de Carga / Vehículo
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-[0.65rem] font-black uppercase tracking-wide text-slate-500">
              Tipo de Unidad
            </span>
            <select className={inputBase} defaultValue="Ambulancia/Carga Fría 🚑">
              <option>Ambulancia/Carga Fría 🚑</option>
              <option>Camioneta/Pick-Up 🛻</option>
              <option>Camión ligero</option>
              <option>Moto</option>
              <option>Vehículo particular</option>
            </select>
          </label>
          <Field label="Placa del Vehículo" placeholder="AB123CD" />
          <div className="sm:col-span-2">
            <Field label="Modelo del Vehículo" placeholder="Ej. Toyota Land Cruiser" />
          </div>
          <Field label="Color del Vehículo" placeholder="Ej. Blanco / Plata" />
          <Field label="Carnet de Circulación" placeholder="Ej. CC-123456" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[14px] border border-rose-200 bg-rose-50/50 p-4">
      <h3 className="text-xs font-black uppercase text-rose-700">
        Centro hospitalario
      </h3>
      <div className="mt-3 grid gap-3">
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
            Carnet Profesional / Código Certificación
          </span>
          <input className={inputBase} placeholder="Ej. MPPS-123456 / M-10294" />
        </label>
      </div>
    </div>
  );
}

function Field({
  label,
  onChange,
  placeholder,
  type = "text",
  value,
}: {
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  type?: string;
  value?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[0.65rem] font-black uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <input
        className={inputBase}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </label>
  );
}
