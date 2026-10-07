import type { Meta, StoryObj } from '@storybook/react-webpack5'

interface SemaforoProps {
  stock: number
  minimo: number
  producto: string
}

const Semaforo = ({ stock, minimo, producto }: SemaforoProps) => {
  const pct = minimo > 0 ? (stock / minimo) * 100 : 100
  const color = pct > 50 ? 'bg-green-500' : pct > 10 ? 'bg-yellow-500' : 'bg-red-500'
  const label = pct > 50 ? 'Suficiente' : pct > 10 ? 'Bajo' : 'Crítico'

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border bg-white">
      <span className={`inline-block h-3 w-3 rounded-full ${color}`} />
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{producto}</p>
        <p className="text-xs text-gray-500">{stock} / {minimo} unidades</p>
      </div>
      <span className={`text-xs font-medium px-2 py-1 rounded ${
        pct > 50 ? 'bg-green-100 text-green-700' :
        pct > 10 ? 'bg-yellow-100 text-yellow-700' :
        'bg-red-100 text-red-700'
      }`}>
        {label}
      </span>
    </div>
  )
}

const meta: Meta<typeof Semaforo> = {
  title: 'PuntoFlor/Semáforo de Stock',
  component: Semaforo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Indicador visual de nivel de stock. Verde >50%, Amarillo ≤50%, Rojo ≤10% del mínimo configurado.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Semaforo>

export const StockSuficiente: Story = {
  args: { stock: 120, minimo: 100, producto: 'Rosa Freedom roja' },
}

export const StockBajo: Story = {
  args: { stock: 30, minimo: 100, producto: 'Lily oriental blanca' },
}

export const StockCritico: Story = {
  args: { stock: 5, minimo: 100, producto: 'Gerbera naranja' },
}

export const SinStock: Story = {
  args: { stock: 0, minimo: 50, producto: 'Tulipán holandés' },
}

export const ListaInventario: Story = {
  name: 'Lista de inventario completa',
  render: () => (
    <div className="space-y-2 max-w-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Inventario — Stock actual</h3>
      <Semaforo stock={200} minimo={100} producto="Rosa Freedom roja" />
      <Semaforo stock={45} minimo={100} producto="Lily oriental blanca" />
      <Semaforo stock={8} minimo={80} producto="Gerbera naranja" />
      <Semaforo stock={0} minimo={50} producto="Tulipán holandés" />
      <Semaforo stock={500} minimo={200} producto="Oasis (insumo)" />
      <Semaforo stock={15} minimo={100} producto="Clavel rojo" />
    </div>
  ),
}
