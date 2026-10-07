"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";

type OrderStatus =
  | "confirmado"
  | "en_preparacion"
  | "listo"
  | "entregado"
  | "cancelado";
type PaymentStatus = "pagado" | "pendiente" | "parcial";

interface Order {
  folio: string;
  client: string;
  date: string;
  productCount: number;
  total: number;
  status: OrderStatus;
  payment: PaymentStatus;
}

const statusConfig: Record<
  OrderStatus,
  { label: string; bg: string; text: string }
> = {
  confirmado: { label: "Confirmado", bg: "#D1FAE5", text: "#065F46" },
  en_preparacion: { label: "En preparación", bg: "#FEF3C7", text: "#92400E" },
  listo: { label: "Listo", bg: "#DBEAFE", text: "#1E40AF" },
  entregado: { label: "Entregado", bg: "#E0E7FF", text: "#3730A3" },
  cancelado: { label: "Cancelado", bg: "#FEE2E2", text: "#991B1B" },
};

const paymentConfig: Record<
  PaymentStatus,
  { label: string; bg: string; text: string }
> = {
  pagado: { label: "Pagado", bg: "#D1FAE5", text: "#065F46" },
  pendiente: { label: "Pendiente", bg: "#FEF3C7", text: "#92400E" },
  parcial: { label: "Parcial", bg: "#FED7AA", text: "#9A3412" },
};

const orders: Order[] = [
  { folio: "PF-0035", client: "María López", date: "2026-10-07", productCount: 3, total: 980, status: "confirmado", payment: "pagado" },
  { folio: "PF-0036", client: "Carlos Ruiz", date: "2026-10-07", productCount: 1, total: 350, status: "en_preparacion", payment: "pagado" },
  { folio: "PF-0037", client: "Ana Torres", date: "2026-10-06", productCount: 2, total: 1100, status: "listo", payment: "pendiente" },
  { folio: "PF-0038", client: "Público general", date: "2026-10-06", productCount: 1, total: 280, status: "entregado", payment: "pagado" },
  { folio: "PF-0039", client: "Roberto García", date: "2026-10-05", productCount: 4, total: 1850, status: "en_preparacion", payment: "parcial" },
  { folio: "PF-0040", client: "Laura Sánchez", date: "2026-10-05", productCount: 1, total: 600, status: "cancelado", payment: "pendiente" },
  { folio: "PF-0041", client: "Diego Mendoza", date: "2026-10-04", productCount: 2, total: 770, status: "entregado", payment: "pagado" },
  { folio: "PF-0042", client: "Sofía Ramírez", date: "2026-10-04", productCount: 3, total: 1250, status: "confirmado", payment: "pagado" },
];

const filters: { key: OrderStatus | "todos"; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "confirmado", label: "Confirmado" },
  { key: "en_preparacion", label: "En preparación" },
  { key: "listo", label: "Listo" },
  { key: "entregado", label: "Entregado" },
  { key: "cancelado", label: "Cancelado" },
];

const PAGE_SIZE = 5;

const PedidosPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "todos">("todos");
  const [page, setPage] = useState(0);

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.folio.toLowerCase().includes(search.toLowerCase()) ||
      o.client.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "todos" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-6 p-6" style={{ backgroundColor: "#FAFAF8", minHeight: "100%" }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ color: "#1C1917" }}>
          Pedidos
        </h1>
        <Button
          className="text-white"
          style={{ backgroundColor: "#2D6A4F" }}
        >
          <Plus size={18} className="mr-2" />
          Nuevo pedido
        </Button>
      </div>

      {/* Búsqueda + filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-72">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2"
            size={18}
            style={{ color: "#78716C" }}
          />
          <Input
            placeholder="Buscar folio o cliente..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="pl-10"
            style={{ borderColor: "#D4A373" }}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const isActive = statusFilter === f.key;
            return (
              <Badge
                key={f.key}
                className="cursor-pointer select-none px-3 py-1 text-xs font-medium transition-colors"
                style={{
                  backgroundColor: isActive ? "#2D6A4F" : "#F5F5F4",
                  color: isActive ? "#FFFFFF" : "#78716C",
                  border: "1px solid",
                  borderColor: isActive ? "#2D6A4F" : "#D6D3D1",
                }}
                onClick={() => {
                  setStatusFilter(f.key);
                  setPage(0);
                }}
              >
                {f.label}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Tabla */}
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#D4A373", backgroundColor: "#FFFFFF" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "#F5F5F4" }}>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#1C1917" }}>Folio</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#1C1917" }}>Cliente</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#1C1917" }}>Fecha</th>
              <th className="text-center px-4 py-3 font-semibold" style={{ color: "#1C1917" }}>Productos</th>
              <th className="text-right px-4 py-3 font-semibold" style={{ color: "#1C1917" }}>Total</th>
              <th className="text-center px-4 py-3 font-semibold" style={{ color: "#1C1917" }}>Estado</th>
              <th className="text-center px-4 py-3 font-semibold" style={{ color: "#1C1917" }}>Pago</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((order) => {
              const sc = statusConfig[order.status];
              const pc = paymentConfig[order.payment];
              return (
                <tr
                  key={order.folio}
                  className="border-t hover:bg-stone-50 transition-colors"
                  style={{ borderColor: "#E7E5E4" }}
                >
                  <td className="px-4 py-3 font-mono font-medium" style={{ color: "#2D6A4F" }}>
                    {order.folio}
                  </td>
                  <td className="px-4 py-3" style={{ color: "#1C1917" }}>
                    {order.client}
                  </td>
                  <td className="px-4 py-3" style={{ color: "#78716C" }}>
                    {order.date}
                  </td>
                  <td className="px-4 py-3 text-center" style={{ color: "#1C1917" }}>
                    {order.productCount}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold" style={{ color: "#1C1917" }}>
                    ${order.total.toLocaleString("es-MX")}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className="inline-block rounded-full px-3 py-1 text-xs font-medium"
                      style={{ backgroundColor: sc.bg, color: sc.text }}
                    >
                      {sc.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className="inline-block rounded-full px-3 py-1 text-xs font-medium"
                      style={{ backgroundColor: pc.bg, color: pc.text }}
                    >
                      {pc.label}
                    </span>
                  </td>
                </tr>
              );
            })}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center" style={{ color: "#78716C" }}>
                  No se encontraron pedidos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: "#78716C" }}>
            Mostrando {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} de {filtered.length}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={page >= totalPages - 1}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PedidosPage;
