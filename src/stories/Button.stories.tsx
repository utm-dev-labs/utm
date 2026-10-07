import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, Zap, LogOut, Search } from 'lucide-react'

const meta: Meta<typeof Button> = {
  title: 'PuntoFlor/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Botones del sistema PuntoFlor. Touch target mínimo 44px. Tamaño `lg` por defecto en tablet.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { children: 'Confirmar pedido', size: 'lg' },
}

export const Secondary: Story = {
  args: { children: 'Ver detalle', variant: 'secondary', size: 'lg' },
}

export const Destructive: Story = {
  args: { children: 'Cancelar pedido', variant: 'destructive', size: 'lg' },
}

export const Outline: Story = {
  args: { children: 'Volver', variant: 'outline', size: 'lg' },
}

export const Ghost: Story = {
  args: { children: 'Editar', variant: 'ghost' },
}

export const ConIcono: Story = {
  name: 'Con ícono',
  render: () => (
    <div className="flex gap-3">
      <Button size="lg"><Plus className="mr-2 h-4 w-4" /> Nuevo pedido</Button>
      <Button size="lg" variant="destructive"><Trash2 className="mr-2 h-4 w-4" /> Eliminar</Button>
      <Button size="lg" variant="secondary"><Search className="mr-2 h-4 w-4" /> Buscar</Button>
    </div>
  ),
}

export const VentaRapida: Story = {
  name: 'Venta rápida (CTA principal)',
  render: () => (
    <Button size="lg" className="bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-lg px-8 py-6">
      <Zap className="mr-2 h-5 w-5" /> Venta rápida
    </Button>
  ),
}

export const Sizes: Story = {
  name: 'Tamaños',
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large (tablet)</Button>
    </div>
  ),
}
