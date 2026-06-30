import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Conecta Med | Insumos medicos para hospitales en Venezuela, Caracas y La Guaira",
  description:
    "Conecta hospitales que necesitan insumos con hospitales que pueden donarlos en Venezuela, Caracas y La Guaira. Coordina solicitudes, donaciones y traslados humanitarios.",
  keywords: [
    "Conecta Med",
    "insumos medicos Venezuela",
    "insumos medicos Caracas",
    "insumos medicos La Guaira",
    "donacion de insumos hospitalarios",
    "hospitales Venezuela",
    "hospitales Caracas",
    "hospitales La Guaira",
    "traslado de insumos medicos",
    "ayuda hospitalaria",
  ],
  openGraph: {
    title: "Conecta Med | Red de insumos medicos en Venezuela",
    description:
      "Conecta hospitales que necesitan insumos con hospitales que pueden donarlos en Venezuela, Caracas y La Guaira.",
    type: "website",
    locale: "es_VE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
