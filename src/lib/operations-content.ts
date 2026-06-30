export const publicHospitals = [
  {
    name: "Hospital Universitario de Caracas",
    zone: "Distrito Sanitario Oeste",
    need: "Acetaminofen pediatrico y soluciones salinas",
    status: "Critico",
    position: [10.4892, -66.8908] as [number, number],
  },
  {
    name: "Hospital Jose Maria Vargas",
    zone: "Libertador",
    need: "Gasas esteriles",
    status: "Alta",
    position: [10.5061, -66.9144] as [number, number],
  },
  {
    name: "Hospital Domingo Luciani",
    zone: "El Llanito",
    need: "Antisepticos y gasas",
    status: "Estable",
    position: [10.4834, -66.8039] as [number, number],
  },
] as const;

export const inventoryExchanges = [
  {
    item: "Gasas Esteriles",
    requester: "Hospital Jose Maria Vargas",
    donor: "Hospital Militar Dr. Carlos Arvelo",
    requested: 500,
    available: 350,
    unit: "paquetes",
    status: "Emparejado",
    requesterPosition: [10.5061, -66.9144] as [number, number],
    donorPosition: [10.4914, -66.9603] as [number, number],
  },
  {
    item: "Acetaminofen Pediatrico Jarabe",
    requester: "Hospital Universitario de Caracas",
    donor: "Hospital Domingo Luciani",
    requested: 120,
    available: 90,
    unit: "frascos",
    status: "Por confirmar",
    requesterPosition: [10.4892, -66.8908] as [number, number],
    donorPosition: [10.4834, -66.8039] as [number, number],
  },
  {
    item: "Guantes Quirurgicos Talla 7.5",
    requester: "Hospital J. M. de los Rios",
    donor: "Hospital Universitario de Caracas",
    requested: 250,
    available: 500,
    unit: "cajas",
    status: "Listo para traslado",
    requesterPosition: [10.5075, -66.9025] as [number, number],
    donorPosition: [10.4892, -66.8908] as [number, number],
  },
] as const;

export const freeServices = [
  {
    name: "Ambulancias Angeles de la Salud",
    area: "Plaza Venezuela, Urb. Los Caobos",
    description:
      "Traslado gratuito de pacientes en ambulancias equipadas para emergencias criticas.",
    availability: "Disponible",
  },
  {
    name: "Operativo Cardiologico Gratuito",
    area: "Ambulatorio Salud Chacao",
    description:
      "Despistaje de hipertension, electrocardiogramas y entrega de medicamentos esenciales.",
    availability: "Alta demanda",
  },
] as const;

export const medicRequests = [
  {
    title: "Reposicion de guantes esteriles",
    hospital: "Hospital Universitario de Caracas",
    priority: "Critica",
    units: "320 cajas",
  },
  {
    title: "Traslado de soluciones salinas",
    hospital: "Hospital Perez Carreno",
    priority: "Alta",
    units: "80 bolsas",
  },
  {
    title: "Validar recepcion de gasas",
    hospital: "Hospital J. M. de los Rios",
    priority: "Media",
    units: "15 bultos",
  },
] as const;

export const hospitalInventory = [
  {
    item: "Gasas Esteriles",
    type: "Faltante",
    obtained: 150,
    goal: 500,
    updatedAt: "Hoy 02:00 PM",
  },
  {
    item: "Acetaminofen Tabletas 500mg",
    type: "Sobrante",
    obtained: 350,
    goal: 0,
    updatedAt: "Hoy 01:00 PM",
  },
] as const;

export const driverRoutes = [
  {
    title: "Urb. La Florida -> Hospital Universitario",
    distance: "7.8 km",
    payload: "Antisepticos, guantes y gasas",
    priority: "Critica",
  },
  {
    title: "Los Dos Caminos -> Domingo Luciani",
    distance: "10.4 km",
    payload: "Soluciones salinas",
    priority: "Alta",
  },
  {
    title: "Chacao -> J. M. de los Rios",
    distance: "5.2 km",
    payload: "Kits pediatricos",
    priority: "Programada",
  },
] as const;

export const transferRequests = [
  {
    id: "TR-001",
    item: "Guantes Quirurgicos Talla 7.5",
    quantity: 50,
    unit: "cajas",
    origin: "Hospital Universitario de Caracas",
    destination: "Hospital Jose Maria Vargas",
    distance: "6.4 km",
    priority: "Alta",
    status: "Pendiente",
  },
  {
    id: "TR-002",
    item: "Gasas Esteriles",
    quantity: 50,
    unit: "paquetes",
    origin: "Hospital Militar Dr. Carlos Arvelo",
    destination: "Hospital Jose Maria Vargas",
    distance: "8.1 km",
    priority: "Critica",
    status: "Pendiente",
  },
  {
    id: "TR-003",
    item: "Acetaminofen Pediatrico Jarabe",
    quantity: 25,
    unit: "frascos",
    origin: "Hospital Domingo Luciani",
    destination: "Hospital Universitario de Caracas",
    distance: "9.8 km",
    priority: "Programada",
    status: "Pendiente",
  },
] as const;

export const logisticsLog = [
  {
    id: "TR-010",
    item: "Jeringas de 10ml",
    quantity: 150,
    unit: "unds",
    origin: "Hospital Universitario de Caracas",
    destination: "Hospital Dr. Miguel Perez Carreno",
    driver: "Carlos Mendoza",
    vehicle: "A6SC68K",
    status: "En ruta",
    evidence: null,
  },
  {
    id: "TR-011",
    item: "Guantes Quirurgicos Talla 8.0",
    quantity: 200,
    unit: "unds",
    origin: "Hospital Dr. Miguel Perez Carreno",
    destination: "Hospital Militar Dr. Carlos Arvelo",
    driver: "Jose Miguel Arrieta",
    vehicle: "AB9A21Y",
    status: "Entregado",
    evidence: "entrega-guantes-quirurgicos.jpg",
  },
] as const;
