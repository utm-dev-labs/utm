"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type CategoriaProducto = "flor" | "follaje" | "insumo" | "arreglo";
type TabProducto = "todos" | CategoriaProducto;

interface Producto {
  nombre: string;
  categoria: CategoriaProducto;
  precioVenta: number;
  unidad: string;
  stock: number;
  activo: boolean;
}

const PRODUCTOS: Producto[] = [
  { nombre: "Docena de rosas", categoria: "arreglo", precioVenta: 350, unidad: "pieza", stock: 12, activo: true },
  { nombre: "Ramo mixto", categoria: "arreglo", precioVenta: 280, unidad: "pieza", stock: 8, activo: true },
  { nombre: "Centro de mesa elegante", categoria: "arreglo", precioVenta: 450, unidad: "pieza", stock: 5, activo: true },
  { nombre: "Rosa Freedom", categoria: "flor", precioVenta: 0, unidad: "tallo", stock: 200, activo: true },
  { nombre: "Lily oriental", categoria: "flor", precioVenta: 0, unidad: "tallo", stock: 45, activo: true },
  { nombre: "Helecho cuero", categoria: "follaje", precioVenta: 0, unidad: "manojo", stock: 300, activo: true },
  { nombre: "Oasis", categoria: "insumo", precioVenta: 0, unidad: "pieza", stock: 500, activo: true },
  { nombre: "Celofán transparente", categoria: "insumo", precioVenta: 0, unidad: "metro", stock: 80, activo: true },
];

const TABS: { label: string; value: TabProducto }[] = [
  { label: "Todos", value: "todos" },
  { label: "Flores", value: "flor" },
  { label: "Follajes", value: "follaje" },
  { label: "Insumos", value: "insumo" },
  { label: "Arreglos", value: "arreglo" },
];

const BADGE_COLORES: Record<CategoriaProducto, { bg: string; text: string }> = {
  flor: { bg: "#FCE7F3", text: "#9D174D" },
  follaje: { bg: "#D1FAE5", text: "#065F46" },
  insumo: { bg: "#F3F4F6", text: "#4B5563" },
  arreglo: { bg: "#FEF3C7", text: "#92400E" },
};

const ProductosPage = () => {
  const [tabActiva, setTabActiva] = useState<TabProducto>("todos");
  const [busqueda, setBusqueda] = useState("");

  const productosFiltrados = PRODUCTOS.filter((p) => {
    if (tabActiva !== "todos" && p.categoria !== tabActiva) return false;
    if (busqueda && !p.nombre.toLowerCase().includes(busqueda.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#FAFAF8", color: "#1C1917" }}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold" style={{ color: "#2D6A4F" }}>
            Catálogo de productos
          </h1>
          <Button style={{ backgroundColor: "#2D6A4F", color: "#fff" }}>
            Nuevo producto
          </Button>
        </div>

        {/* Búsqueda + Tabs */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Input
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-64"
          />
          <Separator orientation="vertical" className="h-6 hidden sm:block" />
          <div className="flex gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setTabActiva(tab.value)}
                className="px-4 py-2 text-sm font-medium rounded-md transition-colors"
                style={{
                  backgroundColor: tabActiva === tab.value ? "#2D6A4F" : "transparent",
                  color: tabActiva === tab.value ? "#fff" : "#78716C",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tabla */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ backgroundColor: "#F5F5F4" }}>
                    <th className="px-4 py-3 text-left font-medium" style={{ color: "#78716C" }}>Nombre</th>
                    <th className="px-4 py-3 text-left font-medium" style={{ color: "#78716C" }}>Categoría</th>
                    <th className="px-4 py-3 text-right font-medium" style={{ color: "#78716C" }}>Precio venta</th>
                    <th className="px-4 py-3 text-left font-medium" style={{ color: "#78716C" }}>Unidad</th>
                    <th className="px-4 py-3 text-right font-medium" style={{ color: "#78716C" }}>Stock</th>
                    <th className="px-4 py-3 text-left font-medium" style={{ color: "#78716C" }}>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {productosFiltrados.map((p) => (
                    <tr key={p.nombre} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium">{p.nombre}</td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: BADGE_COLORES[p.categoria].bg,
                            color: BADGE_COLORES[p.categoria].text,
                          }}
                        >
                          {p.categoria.charAt(0).toUpperCase() + p.categoria.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums">
                        {p.precioVenta > 0 ? `$${p.precioVenta.toFixed(2)}` : "—"}
                      </td>
                      <td className="px-4 py-3" style={{ color: "#78716C" }}>{p.unidad}</td>
                      <td className="px-4 py-3 text-right tabular-nums">{p.stock}</td>
                      <td className="px-4 py-3">
                        {p.activo && (
                          <Badge
                            className="text-xs"
                            style={{ backgroundColor: "#D1FAE5", color: "#065F46" }}
                          >
                            Activo
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                  {productosFiltrados.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center" style={{ color: "#78716C" }}>
                        No se encontraron productos.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductosPage;
