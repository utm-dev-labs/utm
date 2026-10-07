"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, ClipboardList, Zap, Users, Truck,
  Package, Warehouse, Trash2, Calculator, LogOut
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/venta-rapida", label: "Venta rápida", icon: Zap, highlight: true },
  { href: "/pedidos", label: "Pedidos", icon: ClipboardList },
  { href: "/clientes", label: "Clientes", icon: Users },
  { href: "/productos", label: "Productos", icon: Package },
  { href: "/proveedores", label: "Proveedores", icon: Truck },
  { href: "/inventario", label: "Inventario", icon: Warehouse },
  { href: "/reportes", label: "Corte de caja", icon: Calculator },
]

export const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-60 flex flex-col" style={{ backgroundColor: '#1B4332' }}>
      <div className="p-5 border-b border-white/10">
        <h1 className="text-xl font-bold text-white">🌸 PuntoFlor</h1>
        <p className="text-xs mt-1" style={{ color: '#D8F3DC' }}>Sistema de gestión</p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-white/15 text-white font-medium'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              } ${item.highlight ? 'mt-2 mb-2' : ''}`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
              {item.highlight && (
                <Badge className="ml-auto bg-[#D4A373] text-[#1C1917] text-[10px] px-1.5">POS</Badge>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">JC</div>
          <div>
            <p className="text-sm text-white font-medium">Jesús Canul</p>
            <Badge className="bg-purple-500/20 text-purple-200 text-[10px]">Admin</Badge>
          </div>
        </div>
        <button className="flex items-center gap-2 text-white/50 hover:text-white text-sm w-full">
          <LogOut className="h-4 w-4" /> Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
