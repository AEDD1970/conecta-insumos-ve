export const roleCards = [
  {
    eyebrow: "Colaborador Medico",
    title: "Medico",
    accent: "rose",
    items: [
      "Reporta stocks faltantes o excedentes disponibles para donacion.",
      "Solicita traslados de ambulancias o transporte para pacientes graves.",
      "Valida la llegada de cargamentos directamente en el almacen.",
    ],
  },
  {
    eyebrow: "Colaborador Conductor",
    title: "Conductor",
    accent: "emerald",
    items: [
      "Visualiza un mapa interactivo con solicitudes pendientes de envio.",
      "Acepta traslados, retira insumos del hospital origen y entrega en destino.",
      "Registra camionetas, camiones ligeros o motos para coordinar despachos.",
    ],
  },
] as const;

export const networkStats = [
  {
    label: "Hospitales conectados",
    value: "8",
  },
  {
    label: "Conductores activos",
    value: "2",
  },
  {
    label: "Alertas abiertas",
    value: "6",
  },
] as const;

export const cooperationSteps = [
  {
    title: "Reporta faltante",
    copy: "Un hospital indica que insumo necesita y cuanto falta.",
  },
  {
    title: "Ofrece donacion",
    copy: "Otro hospital registra excedentes disponibles para traslado.",
  },
  {
    title: "Coordina ruta",
    copy: "Un conductor retira en origen y entrega al hospital receptor.",
  },
] as const;

export const partnerHospitals = [
  "Hospital Universitario de Caracas",
  "Hospital J. M. de los Rios",
  "Hospital Dr. Domingo Luciani",
  "Hospital Domingo Luciani",
  "Hospital Perez Carreno",
] as const;
