"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Transaccion {
  folio: string;
  hora: string;
  cliente: string;
  items: string;
  total: number;
  metodo: "Efectivo" | "Transferencia" | "Tarjeta";
  estado: "Completada" | "Pendiente" | "Cancelada";
}

const TRANSACCIONES: Transaccion[] = [
  { folio: "VTA-001", hora: "09:15", cliente: "María García", items: "Docena de rosas x1", total: 350, metodo: "Efectivo", estado: "Completada" },
  { folio: "VTA-002", hora: "09:45", cliente: "Carlos López", items: "Ramo mixto x2", total: 560, metodo: "Transferencia", estado: "Completada" },
  { folio: "VTA-003", hora: "10:30", cliente: "Ana Martínez", items: "Centro de mesa x1", total: 450, metodo: "Tarjeta", estado: "Completada" },
  { folio: "VTA-004", hora: "11:00", cliente: "Pedro Sánchez", items: "Docena de rosas x3", total: 1050, metodo: "Efectivo", estado: "Completada" },
  { folio: "VTA-005", hora: "12:15", cliente: "Laura Díaz", items: "Ramo mixto x1, Celofán x2", total: 340, metodo: "Transferencia", estado: "Completada" },
  { folio: "VTA-006", hora: "13:00", cliente: "Roberto Hernández", items: "Centro de mesa x2", total: 900, metodo: "Efectivo", estado: "Completada" },
  { folio: "VTA-007", hora: "14:30", cliente: "Sofía Ramírez", items: "Docena de rosas x1", total: 350, metodo: "Transferencia", estado: "Completada" },
  { folio: "VTA-008", hora: "15:45", cliente: "Diego Torres", items: "Ramo mixto x1, Arreglo especial x1", total: 580, metodo: "Efectivo", estado: "Completada" },
];

const METODO_COLORES: Record<string, { bg: string; text: string }> = {
  Efectivo: { bg: "#D1FAE5", text: "#065F46" },
  Transferencia: { bg: "#DBEAFE", text: "#1E40AF" },
  Tarjeta: { bg: "#F3E8FF", text: "#6B21A8" },
};

const ESTADO_COLORES: Record<string, { bg: string; text: string }> = {
  Completada: { bg: "#D1FAE5", text: "#065F46" },
  Pendiente: { bg: "#FEF3C7", text: "#92400E" },
  Cancelada: { bg: "#FEE2E2", text: "#991B1B" },
};

const ReportesPage = () => {
  const [fecha, setFecha] = useState("2026-10-07");

  const totalVentas = 6050;
  const totalTransacciones = 18;
  const ticketPromedio = 336;
  const merma = 340;

  const desglosePago = [
    { metodo: "Efectivo", total: 3200, operaciones: 10 },
    { metodo: "Transferencia", total: 2100, operaciones: 5 },
    { metodo: "Tarjeta", total: 750, operaciones: 3 },
  ];

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#FAFAF8", color: "#1C1917" }}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold" style={{ color: "#2D6A4F" }}>
            Corte de caja
          </h1>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="rounded-md border px-3 py-2 text-sm"
            style={{ borderColor: "#D4A373" }}
          />
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium" style={{ color: "#78716C" }}>
                Total ventas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: "#2D6A4F" }}>
                ${totalVentas.toLocaleString()}
              </div>
              <p className="text-xs mt-1" style={{ color: "#78716C" }}>
                {totalTransacciones} transacciones
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium" style={{ color: "#78716C" }}>
                Ticket promedio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: "#2D6A4F" }}>
                ${ticketPromedio}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium" style={{ color: "#78716C" }}>
                Merma del día
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: "#DC2626" }}>
                ${merma}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Desglose por método de pago */}
        <div>
          <h2 className="text-lg font-semibold mb-3" style={{ color: "#1C1917" }}>
            Desglose por método de pago
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {desglosePago.map((d) => (
              <Card key={d.metodo}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      style={{
                        backgroundColor: METODO_COLORES[d.metodo].bg,
                        color: METODO_COLORES[d.metodo].text,
                      }}
                    >
                      {d.metodo}
                    </Badge>
                    <span className="text-xs" style={{ color: "#78716C" }}>
                      {d.operaciones} ops
                    </span>
                  </div>
                  <div className="text-xl font-bold" style={{ color: "#2D6A4F" }}>
                    ${d.total.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator />

        {/* Tabla de transacciones */}
        <div>
          <h2 className="text-lg font-semibold mb-3" style={{ color: "#1C1917" }}>
            Transacciones del día
          </h2>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b" style={{ backgroundColor: "#F5F5F4" }}>
                      <th className="px-4 py-3 text-left font-medium" style={{ color: "#78716C" }}>Folio</th>
                      <th className="px-4 py-3 text-left font-medium" style={{ color: "#78716C" }}>Hora</th>
                      <th className="px-4 py-3 text-left font-medium" style={{ color: "#78716C" }}>Cliente</th>
                      <th className="px-4 py-3 text-left font-medium" style={{ color: "#78716C" }}>Items</th>
                      <th className="px-4 py-3 text-right font-medium" style={{ color: "#78716C" }}>Total</th>
                      <th className="px-4 py-3 text-left font-medium" style={{ color: "#78716C" }}>Método</th>
                      <th className="px-4 py-3 text-left font-medium" style={{ color: "#78716C" }}>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRANSACCIONES.map((t) => (
                      <tr key={t.folio} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium" style={{ color: "#2D6A4F" }}>{t.folio}</td>
                        <td className="px-4 py-3" style={{ color: "#78716C" }}>{t.hora}</td>
                        <td className="px-4 py-3">{t.cliente}</td>
                        <td className="px-4 py-3" style={{ color: "#78716C" }}>{t.items}</td>
                        <td className="px-4 py-3 text-right tabular-nums font-medium">
                          ${t.total.toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: METODO_COLORES[t.metodo].bg,
                              color: METODO_COLORES[t.metodo].text,
                            }}
                          >
                            {t.metodo}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: ESTADO_COLORES[t.estado].bg,
                              color: ESTADO_COLORES[t.estado].text,
                            }}
                          >
                            {t.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportesPage;
