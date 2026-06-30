# Conecta Med

Base web para una plataforma solidaria de coordinacion de insumos medicos, donaciones y traslados humanitarios entre hospitales.

## Getting Started

Instala dependencias y corre el servidor de desarrollo:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Estructura

- `app/`: rutas y layout global de Next.js.
- `src/components/`: componentes reutilizables de UI.
- `src/lib/`: constantes, contenido y futuros helpers de dominio.
- `docs/ARCHITECTURE.md`: mapa de crecimiento del producto.

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

## Nota tecnica

Este proyecto usa Next.js 16 con App Router. Antes de usar APIs o convenciones nuevas de Next, revisar la documentacion local en `node_modules/next/dist/docs/`, como indica `AGENTS.md`.

La base evita `next/font/google` para que el build no dependa de descargar fuentes externas.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
