"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Pencil } from "lucide-react";

interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  notes: string;
  registeredAt: string;
}

const clients: Client[] = [
  { id: 1, name: "Público general", phone: "—", email: "—", notes: "Cliente por defecto para ventas sin registro", registeredAt: "2026-01-01" },
  { id: 2, name: "María López", phone: "999 123 4567", email: "maria.lopez@email.com", notes: "Prefiere rosas rojas. Alergia al lirio.", registeredAt: "2026-03-15" },
  { id: 3, name: "Carlos Ruiz", phone: "999 234 5678", email: "carlos.ruiz@email.com", notes: "Pedidos corporativos frecuentes", registeredAt: "2026-04-22" },
  { id: 4, name: "Ana Torres", phone: "999 345 6789", email: "ana.torres@email.com", notes: "Cumpleaños: 12 de noviembre", registeredAt: "2026-05-10" },
  { id: 5, name: "Roberto García", phone: "999 456 7890", email: "roberto.g@email.com", notes: "Pago siempre con transferencia", registeredAt: "2026-06-03" },
  { id: 6, name: "Laura Sánchez", phone: "999 567 8901", email: "laura.sanchez@email.com", notes: "", registeredAt: "2026-08-19" },
];

const ClientesPage = () => {
  const [search, setSearch] = useState("");

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div className="flex flex-col gap-6 p-6" style={{ backgroundColor: "#FAFAF8", minHeight: "100%" }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ color: "#1C1917" }}>
          Clientes
        </h1>
        <Button
          className="text-white"
          style={{ backgroundColor: "#2D6A4F" }}
        >
          <Plus size={18} className="mr-2" />
          Nuevo cliente
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
          placeholder="Buscar cliente..."
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
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#1C1917" }}>Teléfono</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#1C1917" }}>Email</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#1C1917" }}>Notas</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#1C1917" }}>Registro</th>
              <th className="text-center px-4 py-3 font-semibold" style={{ color: "#1C1917" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((client) => (
              <tr
                key={client.id}
                className="border-t hover:bg-stone-50 transition-colors"
                style={{ borderColor: "#E7E5E4" }}
              >
                <td className="px-4 py-3 font-medium" style={{ color: "#1C1917" }}>
                  {client.name}
                </td>
                <td className="px-4 py-3" style={{ color: "#78716C" }}>
                  {client.phone}
                </td>
                <td className="px-4 py-3" style={{ color: "#78716C" }}>
                  {client.email}
                </td>
                <td className="px-4 py-3 max-w-[200px] truncate" style={{ color: "#78716C" }}>
                  {client.notes || "—"}
                </td>
                <td className="px-4 py-3" style={{ color: "#78716C" }}>
                  {client.registeredAt}
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
                  No se encontraron clientes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientesPage;
