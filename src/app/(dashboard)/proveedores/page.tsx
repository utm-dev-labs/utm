"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, Pencil } from "lucide-react";

type SupplyCategory = "Flor" | "Follaje" | "Insumo";

interface Supplier {
  id: number;
  name: string;
  contact: string;
  phone: string;
  categories: SupplyCategory[];
  lastPurchase: string;
}

const categoryColors: Record<SupplyCategory, { bg: string; text: string }> = {
  Flor: { bg: "#FCE7F3", text: "#9D174D" },
  Follaje: { bg: "#D1FAE5", text: "#065F46" },
  Insumo: { bg: "#DBEAFE", text: "#1E40AF" },
};

const suppliers: Supplier[] = [
  {
    id: 1,
    name: "Flores del Sureste",
    contact: "José Martínez",
    phone: "999 111 2233",
    categories: ["Flor", "Follaje"],
    lastPurchase: "2026-10-05",
  },
  {
    id: 2,
    name: "Distribuidora Pérez",
    contact: "Luisa Pérez",
    phone: "999 222 3344",
    categories: ["Flor"],
    lastPurchase: "2026-10-03",
  },
  {
    id: 3,
    name: "Insumos Florales MX",
    contact: "Raúl Domínguez",
    phone: "999 333 4455",
    categories: ["Insumo"],
    lastPurchase: "2026-09-28",
  },
  {
    id: 4,
    name: "Vivero San Juan",
    contact: "Patricia Gómez",
    phone: "999 444 5566",
    categories: ["Flor", "Follaje", "Insumo"],
    lastPurchase: "2026-10-06",
  },
];

const ProveedoresPage = () => {
  const [search, setSearch] = useState("");

  const filtered = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.contact.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 p-6" style={{ backgroundColor: "#FAFAF8", minHeight: "100%" }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ color: "#1C1917" }}>
          Proveedores
        </h1>
        <Button
          className="text-white"
          style={{ backgroundColor: "#2D6A4F" }}
        >
          <Plus size={18} className="mr-2" />
          Nuevo proveedor
        </Button>
      </div>

      {/* Búsqueda */}
      <div className="relative w-full sm:w-72">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2"
          size={18}
          style={{ color: "#78716C" }}
        />
        <Input
          placeholder="Buscar proveedor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
          style={{ borderColor: "#D4A373" }}
        />
      </div>

      {/* Tabla */}
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#D4A373", backgroundColor: "#FFFFFF" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "#F5F5F4" }}>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#1C1917" }}>Nombre</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#1C1917" }}>Contacto</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#1C1917" }}>Teléfono</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#1C1917" }}>Productos</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#1C1917" }}>Última compra</th>
              <th className="text-center px-4 py-3 font-semibold" style={{ color: "#1C1917" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((supplier) => (
              <tr
                key={supplier.id}
                className="border-t hover:bg-stone-50 transition-colors"
                style={{ borderColor: "#E7E5E4" }}
              >
                <td className="px-4 py-3 font-medium" style={{ color: "#1C1917" }}>
                  {supplier.name}
                </td>
                <td className="px-4 py-3" style={{ color: "#78716C" }}>
                  {supplier.contact}
                </td>
                <td className="px-4 py-3" style={{ color: "#78716C" }}>
                  {supplier.phone}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5 flex-wrap">
                    {supplier.categories.map((cat) => (
                      <span
                        key={cat}
                        className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: categoryColors[cat].bg,
                          color: categoryColors[cat].text,
                        }}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3" style={{ color: "#78716C" }}>
                  {supplier.lastPurchase}
                </td>
                <td className="px-4 py-3 text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    style={{ color: "#2D6A4F" }}
                  >
                    <Pencil size={16} />
                  </Button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center" style={{ color: "#78716C" }}>
                  No se encontraron proveedores
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProveedoresPage;
