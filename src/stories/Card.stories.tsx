import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const meta: Meta = {
  title: 'PuntoFlor/Card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Cards para dashboard KPIs, resumen de pedido, fichas de producto.',
      },
    },
  },
}

export default meta

export const StatCard: StoryObj = {
  name: 'Stat Card (Dashboard)',
  render: () => (
    <div className="grid grid-cols-3 gap-4 max-w-2xl">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Ventas hoy</CardDescription>
          <CardTitle className="text-2xl">$12,450</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-green-600">+15% vs ayer</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Pedidos</CardDescription>
          <CardTitle className="text-2xl">18</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-gray-500">5 pendientes de entrega</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Merma del día</CardDescription>
          <CardTitle className="text-2xl text-red-600">$340</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-gray-500">12 tallos perdidos</p>
        </CardContent>
      </Card>
    </div>
  ),
}

export const PedidoCard: StoryObj = {
  name: 'Card de pedido',
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>PF-0042</CardTitle>
            <CardDescription>María García • 14:30</CardDescription>
          </div>
          <Badge className="bg-yellow-100 text-yellow-700">En preparación</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">3 productos</span>
            <span className="font-medium">$1,250.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Entrega</span>
            <span>Envío a domicilio</span>
          </div>
          <div className="flex justify-between">
            <Badge className="bg-green-100 text-green-700">Pagado</Badge>
            <span className="text-xs text-gray-400">Transferencia</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
}

export const ProductoCard: StoryObj = {
  name: 'Card de producto (venta rápida)',
  render: () => (
    <div className="grid grid-cols-4 gap-3 max-w-xl">
      {[
        { nombre: 'Docena de rosas', precio: '$350', cat: 'Arreglo' },
        { nombre: 'Ramo mixto', precio: '$280', cat: 'Arreglo' },
        { nombre: 'Corona fúnebre', precio: '$500', cat: 'Arreglo' },
        { nombre: 'Centro de mesa', precio: '$450', cat: 'Arreglo' },
      ].map((p) => (
        <Card key={p.nombre} className="cursor-pointer hover:border-[#2D6A4F] transition-colors">
          <CardContent className="p-4 text-center">
            <p className="text-sm font-medium">{p.nombre}</p>
            <p className="text-lg font-bold text-[#2D6A4F]">{p.precio}</p>
            <Badge variant="outline" className="text-xs mt-1">{p.cat}</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}
