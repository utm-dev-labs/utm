import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Plus } from 'lucide-react'

const meta: Meta = {
  title: 'PuntoFlor/Formularios',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Inputs y formularios del sistema. Height mínimo 44px para touch en tablet.',
      },
    },
  },
}

export default meta

export const InputBasico: StoryObj = {
  name: 'Inputs básicos',
  render: () => (
    <div className="space-y-4 max-w-sm">
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Nombre del cliente</label>
        <Input placeholder="Ej: María García" className="h-11" />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Teléfono</label>
        <Input placeholder="999 123 4567" type="tel" className="h-11" />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Notas</label>
        <Input placeholder="Notas opcionales..." className="h-11" />
      </div>
    </div>
  ),
}

export const BusquedaConFiltros: StoryObj = {
  name: 'Barra de búsqueda con filtros',
  render: () => (
    <div className="space-y-3 max-w-2xl">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input placeholder="Buscar por nombre, folio o teléfono..." className="pl-9 h-11" />
        </div>
        <Button size="lg"><Plus className="mr-2 h-4 w-4" /> Nuevo</Button>
      </div>
      <div className="flex gap-2">
        <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 px-3 py-1">Todos</Badge>
        <Badge className="bg-[#2D6A4F] text-white px-3 py-1">Confirmados</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 px-3 py-1">En preparación</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 px-3 py-1">Listos</Badge>
      </div>
    </div>
  ),
}

export const FormNuevoLote: StoryObj = {
  name: 'Formulario: Nuevo lote',
  render: () => (
    <div className="max-w-md p-6 bg-white rounded-lg border space-y-4">
      <h3 className="text-lg font-semibold">Registrar nuevo lote</h3>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Producto *</label>
        <Input placeholder="Buscar producto..." className="h-11" />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Proveedor *</label>
        <Input placeholder="Seleccionar proveedor..." className="h-11" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Cantidad *</label>
          <Input type="number" placeholder="0" className="h-11" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Costo unitario *</label>
          <Input type="number" placeholder="$0.00" className="h-11" />
        </div>
      </div>
      <div className="pt-2 border-t flex justify-between items-center">
        <span className="text-sm text-gray-500">Costo total: <strong>$0.00</strong></span>
        <Button size="lg">Registrar lote</Button>
      </div>
    </div>
  ),
}

export const FormMerma: StoryObj = {
  name: 'Formulario: Registrar merma',
  render: () => (
    <div className="max-w-md p-6 bg-white rounded-lg border space-y-4">
      <h3 className="text-lg font-semibold">Registrar merma</h3>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Producto *</label>
        <Input placeholder="Buscar producto..." className="h-11" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Cantidad *</label>
          <Input type="number" placeholder="0" className="h-11" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Motivo *</label>
          <Input placeholder="Marchitamiento" className="h-11" />
        </div>
      </div>
      <div className="p-3 bg-red-50 rounded-lg">
        <p className="text-sm text-red-700">Costo de merma estimado: <strong>$0.00</strong></p>
      </div>
      <Button size="lg" variant="destructive" className="w-full">Registrar merma</Button>
    </div>
  ),
}
