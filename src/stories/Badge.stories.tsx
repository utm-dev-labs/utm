import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { Badge } from '@/components/ui/badge'

const meta: Meta<typeof Badge> = {
  title: 'PuntoFlor/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Badges para estados de pedido, roles de usuario y categorías de producto.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const EstadosPedido: Story = {
  name: 'Estados de pedido',
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge className="bg-gray-100 text-gray-700">Borrador</Badge>
      <Badge className="bg-blue-100 text-blue-700">Confirmado</Badge>
      <Badge className="bg-yellow-100 text-yellow-700">En preparación</Badge>
      <Badge className="bg-green-100 text-green-700">Listo</Badge>
      <Badge className="bg-emerald-100 text-emerald-800">Entregado</Badge>
      <Badge className="bg-red-100 text-red-700">Cancelado</Badge>
    </div>
  ),
}

export const Roles: Story = {
  name: 'Roles de usuario',
  render: () => (
    <div className="flex gap-2">
      <Badge className="bg-purple-100 text-purple-700">Admin</Badge>
      <Badge className="bg-green-100 text-green-700">Ventas</Badge>
      <Badge className="bg-amber-100 text-amber-700">Inventario</Badge>
    </div>
  ),
}

export const Categorias: Story = {
  name: 'Categorías de producto',
  render: () => (
    <div className="flex gap-2">
      <Badge className="bg-pink-100 text-pink-700">Flor</Badge>
      <Badge className="bg-lime-100 text-lime-700">Follaje</Badge>
      <Badge className="bg-slate-100 text-slate-700">Insumo</Badge>
    </div>
  ),
}

export const Pago: Story = {
  name: 'Estado de pago',
  render: () => (
    <div className="flex gap-2">
      <Badge className="bg-green-100 text-green-700">Pagado</Badge>
      <Badge className="bg-yellow-100 text-yellow-700">Parcial</Badge>
      <Badge className="bg-red-100 text-red-700">Pendiente</Badge>
    </div>
  ),
}

export const MetodoPago: Story = {
  name: 'Método de pago',
  render: () => (
    <div className="flex gap-2">
      <Badge variant="outline">Efectivo</Badge>
      <Badge variant="outline">Transferencia</Badge>
      <Badge variant="outline">Tarjeta</Badge>
    </div>
  ),
}
