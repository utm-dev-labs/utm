import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, TrendingUp, AlertTriangle, Package } from "lucide-react"
import Link from "next/link"

const pedidosHoy = [
  { folio: "PF-0042", cliente: "María García", estado: "En preparación", total: "$1,250", hora: "14:30" },
  { folio: "PF-0041", cliente: "Roberto López", estado: "Confirmado", total: "$850", hora: "13:15" },
  { folio: "PF-0040", cliente: "Ana Mendez", estado: "Listo", total: "$2,100", hora: "11:00" },
  { folio: "PF-0039", cliente: "Público general", estado: "Entregado", total: "$350", hora: "10:30" },
  { folio: "PF-0038", cliente: "Carlos Ruiz", estado: "Entregado", total: "$1,500", hora: "09:45" },
]

const estadoColor: Record<string, string> = {
  "Confirmado": "bg-blue-100 text-blue-700",
  "En preparación": "bg-yellow-100 text-yellow-700",
  "Listo": "bg-green-100 text-green-700",
  "Entregado": "bg-emerald-100 text-emerald-800",
  "Cancelado": "bg-red-100 text-red-700",
}

export default function Dashboard() {
  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1C1917]">Dashboard</h1>
          <p className="text-sm text-[#78716C]">Resumen del día — 7 octubre 2026</p>
        </div>
        <Link href="/venta-rapida">
          <Button size="lg" className="bg-[#2D6A4F] hover:bg-[#1B4332] text-lg px-6">
            <Zap className="mr-2 h-5 w-5" /> Venta rápida
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Ventas hoy</CardDescription>
            <CardTitle className="text-2xl text-[#2D6A4F]">$6,050</CardTitle>
          </CardHeader>
          <CardContent><p className="text-xs text-green-600">+15% vs ayer</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pedidos</CardDescription>
            <CardTitle className="text-2xl">5</CardTitle>
          </CardHeader>
          <CardContent><p className="text-xs text-[#78716C]">2 pendientes de entrega</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Merma del día</CardDescription>
            <CardTitle className="text-2xl text-red-600">$340</CardTitle>
          </CardHeader>
          <CardContent><p className="text-xs text-[#78716C]">12 tallos perdidos</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1"><Package className="h-3 w-3" /> Stock bajo</CardDescription>
            <CardTitle className="text-2xl text-yellow-600">3</CardTitle>
          </CardHeader>
          <CardContent><p className="text-xs text-[#78716C]">productos necesitan restock</p></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pedidos del día</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-[#78716C]">
                <th className="pb-2 font-medium">Folio</th>
                <th className="pb-2 font-medium">Cliente</th>
                <th className="pb-2 font-medium">Hora</th>
                <th className="pb-2 font-medium">Estado</th>
                <th className="pb-2 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {pedidosHoy.map((p) => (
                <tr key={p.folio} className="border-b last:border-0 hover:bg-[#F0EDE8]/50 cursor-pointer">
                  <td className="py-3 font-medium text-[#2D6A4F]">{p.folio}</td>
                  <td className="py-3">{p.cliente}</td>
                  <td className="py-3 text-[#78716C]">{p.hora}</td>
                  <td className="py-3"><Badge className={estadoColor[p.estado]}>{p.estado}</Badge></td>
                  <td className="py-3 text-right font-medium">{p.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
