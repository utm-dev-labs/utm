import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "PuntoFlor — Sistema de gestión para florerías",
  description: "Trazabilidad de inventario, ventas y control financiero",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  )
}
