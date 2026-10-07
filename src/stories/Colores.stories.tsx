import type { Meta, StoryObj } from '@storybook/react-webpack5'

const ColorSwatch = ({ name, hex, token }: { name: string; hex: string; token: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 rounded-lg border shadow-sm" style={{ backgroundColor: hex }} />
    <div>
      <p className="text-sm font-medium">{name}</p>
      <p className="text-xs text-gray-500">{hex} — {token}</p>
    </div>
  </div>
)

const PaletaCompleta = () => (
  <div className="space-y-8 p-6">
    <div>
      <h2 className="text-xl font-bold mb-4" style={{ color: '#1C1917' }}>Marca</h2>
      <div className="grid grid-cols-2 gap-4">
        <ColorSwatch name="Primario" hex="#2D6A4F" token="primary" />
        <ColorSwatch name="Primario (foreground)" hex="#FFFFFF" token="primary-foreground" />
        <ColorSwatch name="Secundario" hex="#D4A373" token="secondary" />
        <ColorSwatch name="Secundario (foreground)" hex="#1C1917" token="secondary-foreground" />
      </div>
    </div>

    <div>
      <h2 className="text-xl font-bold mb-4" style={{ color: '#1C1917' }}>Fondos y superficies</h2>
      <div className="grid grid-cols-2 gap-4">
        <ColorSwatch name="Background" hex="#FAFAF8" token="background" />
        <ColorSwatch name="Card" hex="#FFFFFF" token="card" />
        <ColorSwatch name="Sidebar" hex="#1B4332" token="sidebar" />
        <ColorSwatch name="Sidebar text" hex="#D8F3DC" token="sidebar-foreground" />
        <ColorSwatch name="Muted" hex="#F0EDE8" token="muted" />
        <ColorSwatch name="Muted text" hex="#78716C" token="muted-foreground" />
      </div>
    </div>

    <div>
      <h2 className="text-xl font-bold mb-4" style={{ color: '#1C1917' }}>Texto</h2>
      <div className="grid grid-cols-2 gap-4">
        <ColorSwatch name="Principal" hex="#1C1917" token="foreground" />
        <ColorSwatch name="Secundario" hex="#57534E" token="foreground-secondary" />
        <ColorSwatch name="Muted" hex="#A8A29E" token="foreground-muted" />
      </div>
    </div>

    <div>
      <h2 className="text-xl font-bold mb-4" style={{ color: '#1C1917' }}>Estados</h2>
      <div className="grid grid-cols-2 gap-4">
        <ColorSwatch name="Success" hex="#16A34A" token="success" />
        <ColorSwatch name="Warning" hex="#D97706" token="warning" />
        <ColorSwatch name="Error" hex="#DC2626" token="destructive" />
        <ColorSwatch name="Info" hex="#2563EB" token="info" />
      </div>
    </div>

    <div>
      <h2 className="text-xl font-bold mb-4" style={{ color: '#1C1917' }}>Semáforo de stock</h2>
      <div className="grid grid-cols-3 gap-4">
        <ColorSwatch name="Stock OK (>50%)" hex="#16A34A" token="success" />
        <ColorSwatch name="Stock bajo (≤50%)" hex="#D97706" token="warning" />
        <ColorSwatch name="Sin stock (≤10%)" hex="#DC2626" token="destructive" />
      </div>
    </div>

    <div>
      <h2 className="text-xl font-bold mb-4" style={{ color: '#1C1917' }}>Roles</h2>
      <div className="grid grid-cols-3 gap-4">
        <ColorSwatch name="Admin" hex="#7C3AED" token="role-admin" />
        <ColorSwatch name="Ventas" hex="#2D6A4F" token="role-ventas" />
        <ColorSwatch name="Inventario" hex="#B45309" token="role-inventario" />
      </div>
    </div>
  </div>
)

const meta: Meta = {
  title: 'PuntoFlor/Design System/Paleta de Colores',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Paleta completa de colores de PuntoFlor. Primario verde bosque (#2D6A4F), secundario dorado arena (#D4A373).',
      },
    },
  },
}

export default meta

export const Paleta: StoryObj = {
  render: () => <PaletaCompleta />,
}
