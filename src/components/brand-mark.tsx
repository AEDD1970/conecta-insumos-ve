type BrandMarkProps = {
  compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-9 place-items-center rounded-[10px] bg-blue-600 text-white shadow-sm shadow-blue-200">
        <span className="text-lg font-black leading-none">C</span>
      </div>
      {!compact ? (
        <div>
          <div className="flex items-center gap-2">
            <p className="text-base font-black text-slate-950">
              Conecta Med
            </p>
            <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-black text-blue-700">
              Venezuela / Caracas / La Guaira
            </span>
          </div>
          <p className="mt-1 text-[0.58rem] font-bold uppercase tracking-[0.24em] text-slate-500">
            Sistema cooperativo de traslado inmediato de insumos medicos
          </p>
        </div>
      ) : null}
    </div>
  );
}
