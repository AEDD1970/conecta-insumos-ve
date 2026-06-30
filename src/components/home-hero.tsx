import Link from "next/link";
import { AuthPanel } from "@/src/components/auth-panel";
import { BrandMark } from "@/src/components/brand-mark";
import {
  cooperationSteps,
  networkStats,
  roleCards,
} from "@/src/lib/home-content";

const accentStyles = {
  rose: {
    card: "border-rose-200 bg-rose-50/30",
    icon: "bg-rose-600 shadow-rose-200",
    bullet: "text-rose-600",
  },
  emerald: {
    card: "border-emerald-200 bg-emerald-50/30",
    icon: "bg-emerald-600 shadow-emerald-200",
    bullet: "text-emerald-600",
  },
} as const;

export function HomeHero() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white/95">
        <div className="mx-auto flex min-h-[60px] w-full max-w-6xl flex-col justify-between gap-3 px-5 py-3 md:flex-row md:items-center">
          <BrandMark />
          <div className="flex flex-wrap items-center gap-3">
            <div className="hidden items-center gap-3 text-xs font-black text-slate-600 lg:flex">
              {networkStats.slice(0, 2).map((stat) => (
                <span key={stat.label} className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  {stat.value} {stat.label}
                </span>
              ))}
            </div>
            <Link
              href="/mapa"
              className="rounded-[10px] border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
            >
              Ver mapa publico
            </Link>
            <Link
              href="/hospitales/registro"
              className="rounded-[10px] bg-blue-600 px-4 py-2 text-xs font-black text-white shadow-sm transition hover:bg-blue-500"
            >
              Registrar hospital
            </Link>
          </div>
        </div>
      </header>

      <main className="grid-background">
        <div className="mx-auto grid w-full max-w-6xl gap-7 px-5 py-8 lg:grid-cols-[1fr_420px] lg:py-12">
          <section>
            <div className="inline-flex items-center rounded-[10px] border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs font-black uppercase tracking-wide text-indigo-700">
              Red cooperativa de insumos medicos
            </div>

            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              Conecta hospitales que necesitan insumos con hospitales que
              pueden donarlos en Venezuela, Caracas y La Guaira.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              Registra faltantes, ofrece sobrantes y coordina traslados entre
              centros de salud de Venezuela, Caracas y La Guaira con
              trazabilidad por rol.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {networkStats.map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-[14px] border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <p className="text-3xl font-black text-slate-950">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-black uppercase tracking-wide text-slate-500">
                    {stat.label}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {roleCards.map((role) => {
                const styles = accentStyles[role.accent];

                return (
                  <article
                    key={role.title}
                    className={`rounded-[14px] border p-5 ${styles.card}`}
                  >
                    <div
                      className={`grid size-9 place-items-center rounded-[10px] text-sm font-black text-white shadow-lg ${styles.icon}`}
                    >
                      {role.title.slice(0, 1)}
                    </div>
                    <h2 className="mt-4 text-sm font-black text-slate-800">
                      {role.eyebrow}
                    </h2>
                    <ul className="mt-4 space-y-3 text-xs leading-5 text-slate-600">
                      {role.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className={`font-black ${styles.bullet}`}>
                            -
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>

            <section className="mt-5 rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-blue-700">
                    Flujo cooperativo
                  </p>
                  <h2 className="mt-1 text-lg font-black text-slate-950">
                    De faltante a entrega confirmada
                  </h2>
                </div>
                <Link
                  href="/mapa"
                  className="rounded-[10px] bg-slate-950 px-4 py-2 text-center text-xs font-black text-white transition hover:bg-blue-700"
                >
                  Explorar necesidades
                </Link>
                <Link
                  href="/hospitales/registro"
                  className="rounded-[10px] border border-blue-200 bg-blue-50 px-4 py-2 text-center text-xs font-black text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
                >
                  Postular hospital
                </Link>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {cooperationSteps.map((step, index) => (
                  <article
                    key={step.title}
                    className="rounded-[12px] border border-slate-100 bg-slate-50 p-4"
                  >
                    <span className="grid size-7 place-items-center rounded-full bg-blue-600 text-xs font-black text-white">
                      {index + 1}
                    </span>
                    <h3 className="mt-3 text-sm font-black text-slate-950">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-slate-600">
                      {step.copy}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </section>

          <AuthPanel />
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-5 py-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-base font-black text-slate-950">Conecta Med</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Plataforma de ayuda hospitalaria que conecta hospitales que
              necesitan insumos con hospitales que pueden donarlos en
              Venezuela, Caracas y La Guaira, coordinando solicitudes,
              inventario, traslados y evidencias de entrega.
            </p>
            <p className="mt-4 text-xs font-semibold text-slate-400">
              © 2026 Conecta Med. Coordinacion hospitalaria solidaria.
            </p>
          </div>
          <nav className="grid gap-2 text-sm font-black text-slate-600 sm:grid-cols-3 md:self-start">
            <Link href="/mapa" className="hover:text-blue-700">
              Consulta publica
            </Link>
            <Link href="/hospitales/registro" className="hover:text-blue-700">
              Registrar hospital
            </Link>
            <Link href="/dashboard/conductor" className="hover:text-blue-700">
              Logistica
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
