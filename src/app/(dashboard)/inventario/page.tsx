"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type Categoria = "todos" | "flor" | "follaje" | "insumo";
type Semaforo = "verde" | "amarillo" | "rojo";

interface ProductoInventario {
  nombre: string;
  categoria: "flor" | "follaje" | "insumo";
  stock: number;
  minimo: number;
  costoPromedio: number;
  ultimoIngreso: string;
}

const COLORES_SEMAFORO: Record<Semaforo, string> = {
  verde: "#16A34A",
  amarillo: "#D97706",
  rojo: "#DC2626",
};

const calcularSemaforo = (stock: number, minimo: number): Semaforo => {
  if (stock === 0 || stock < minimo * 0.3) return "rojo";
  if (stock < minimo) return "amarillo";
  return "verde";
};

const PRODUCTOS: ProductoInventario[] = [
  { nombre: "Rosa Freedom", categoria: "flor", stock: 200, minimo: 100, costoPromedio: 12.5, ultimoIngreso: "2026-10-05" },
  { nombre: "Lily oriental", categoria: "flor", stock: 45, minimo: 100, costoPromedio: 25.0, ultimoIngreso: "2026-10-03" },
  { nombre: "Gerbera naranja", categoria: "flor", stock: 8, minimo: 80, costoPromedio: 8.0, ultimoIngreso: "2026-09-28" },
  { nombre: "Tulipán holandés", categoria: "flor", stock: 0, minimo: 50, costoPromedio: 18.0, ultimoIngreso: "2026-09-15" },
  { nombre: "Clavel rojo", categoria: "flor", stock: 150, minimo: 100, costoPromedio: 6.5, ultimoIngreso: "2026-10-06" },
  { nombre: "Helecho cuero", categoria: "follaje", stock: 300, minimo: 200, costoPromedio: 3.0, ultimoIngreso: "2026-10-04" },
  { nombre: "Ruscus", categoria: "follaje", stock: 15, minimo: 100, costoPromedio: 5.0, ultimoIngreso: "2026-09-20" },
  { nombre: "Oasis", categoria: "insumo", stock: 500, minimo: 200, costoPromedio: 15.0, ultimoIngreso: "2026-10-06" },
  { nombre: "Celofán transparente", categoria: "insumo", stock: 80, minimo: 50, costoPromedio: 2.5, ultimoIngreso: "2026-10-01" },
  { nombre: "Listón satinado", categoria: "insumo", stock: 5, minimo: 30, costoPromedio: 8.0, ultimoIngreso: "2026-09-10" },
];

const CATEGORIAS: { label: string; value: Categoria }[] = [
  { label: "Todos", value: "todos" },
  { label: "Flores", value: "flor" },
  { label: "Follajes", value: "follaje" },
  { label: "Insumos", value: "insumo" },
];

const BADGE_CATEGORIA: Record<string, string> = {
  flor: "bg-pink-100 text-pink-800",
  follaje: "bg-green-100 text-green-800",
  insumo: "bg-gray-100 text-gray-700",
};

const InventarioPage = () => {
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria>("todos");
  const [semaforoActivo, setSemaforoActivo] = useState<Semaforo | "todos">("todos");
  const [busqueda, setBusqueda] = useState("");

  const productosFiltrados = PRODUCTOS.filter((p) => {
    if (categoriaActiva !== "todos" && p.categoria !== categoriaActiva) return false;
    if (semaforoActivo !== "todos" && calcularSemaforo(p.stock, p.minimo) !== semaforoActivo) return false;
    if (busqueda && !p.nombre.toLowerCase().includes(busqueda.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#FAFAF8", color: "#1C1917" }}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold" style={{ color: "#2D6A4F" }}>
            Inventario
          </h1>
          <div className="flex gap-2">
            <Button style={{ backgroundColor: "#2D6A4F", color: "#fff" }}>
              Nuevo lote
            </Button>
            <Button variant="outline" style={{ borderColor: "#D4A373", color: "#D4A373" }}>
              Registrar merma
            </Button>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-3">
          <Input
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-64"
          />
          <Separator orientation="vertical" className="h-6 hidden sm:block" />

          {CATEGORIAS.map((cat) => (
            <Badge
              key={cat.value}
              className="cursor-pointer px-3 py-1 text-sm"
              style={{
                backgroundColor: categoriaActiva === cat.value ? "#2D6A4F" : "#E5E7EB",
                color: categoriaActiva === cat.value ? "#fff" : "#78716C",
              }}
              onClick={() => setCategoriaActiva(cat.value)}
            >
              {cat.label}
            </Badge>
          ))}

          <Separator orientation="vertical" className="h-6 hidden sm:block" />

          {(["todos", "verde", "amarillo", "rojo"] as const).map((s) => (
            <Badge
              key={s}
              className="cursor-pointer px-3 py-1 text-sm flex items-center gap-1.5"
              style={{
                backgroundColor: semaforoActivo === s ? (s === "todos" ? "#2D6A4F" : COLORES_SEMAFORO[s]) : "#E5E7EB",
                color: semaforoActivo === s ? "#fff" : "#78716C",
              }}
              onClick={() => setSemaforoActivo(s)}
            >
              {s !== "todos" && (
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: semaforoActivo === s ? "#fff" : COLORES_SEMAFORO[s] }}
                />
              )}
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </Badge>
          ))}
        </div>

        {/* Tabla */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ backgroundColor: "#F5F5F4" }}>
                    <th className="px-4 py-3 text-left font-medium" style={{ color: "#78716C" }}>Estado</th>
                    <th className="px-4 py-3 text-left font-medium" style={{ color: "#78716C" }}>Producto</th>
                    <th className="px-4 py-3 text-left font-medium" style={{ color: "#78716C" }}>Categoría</th>
                    <th className="px-4 py-3 text-right font-medium" style={{ color: "#78716C" }}>Stock actual</th>
                    <th className="px-4 py-3 text-right font-medium" style={{ color: "#78716C" }}>Mínimo</th>
                    <th className="px-4 py-3 text-right font-medium" style={{ color: "#78716C" }}>Costo prom.</th>
                    <th className="px-4 py-3 text-left font-medium" style={{ color: "#78716C" }}>Último ingreso</th>
                  </tr>
                </thead>
                <tbody>
                  {productosFiltrados.map((p) => {
                    const semaforo = calcularSemaforo(p.stock, p.minimo);
                    return (
                      <tr key={p.nombre} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORES_SEMAFORO[semaforo] }}
                          />
                        </td>
                        <td className="px-4 py-3 font-medium">{p.nombre}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${BADGE_CATEGORIA[p.categoria]}`}>
                            {p.categoria.charAt(0).toUpperCase() + p.categoria.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums">{p.stock}</td>
                        <td className="px-4 py-3 text-right tabular-nums" style={{ color: "#78716C" }}>{p.minimo}</td>
                        <td className="px-4 py-3 text-right tabular-nums">${p.costoPromedio.toFixed(2)}</td>
                        <td className="px-4 py-3" style={{ color: "#78716C" }}>{p.ultimoIngreso}</td>
                      </tr>
                    );
                  })}
                  {productosFiltrados.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center" style={{ color: "#78716C" }}>
                        No se encontraron productos con los filtros seleccionados.
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

export default InventarioPage;
