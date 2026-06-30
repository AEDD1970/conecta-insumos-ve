import Link from "next/link";
import { BrandMark } from "@/src/components/brand-mark";

type AppShellProps = {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
};

export function AppShell({ children, eyebrow, title }: AppShellProps) {
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
              Mapa
            </Link>
            <Link className="nav-pill" href="/dashboard/medico">
              Medico
            </Link>
            <Link className="nav-pill" href="/dashboard/conductor">
              Conductor
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-8">
        <div className="mb-7">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">
            {eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">
            {title}
          </h1>
        </div>
        {children}
      </main>
    </div>
  );
}
