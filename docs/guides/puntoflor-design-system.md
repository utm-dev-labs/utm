# PuntoFlor — Sistema de Diseno

**Stack**: Next.js 14 + Tailwind CSS + shadcn/ui  
**PWA**: Tablet y celular  
**Roles**: Admin, Ventas, Inventario

---

## 1. Paleta de colores

### Marca
| Token | Hex | Tailwind | Uso |
|-------|-----|----------|-----|
| primary | `#2D6A4F` | `primary` | Botones principales, enlaces, sidebar activo |
| primary-foreground | `#FFFFFF` | `primary-foreground` | Texto sobre primary |
| secondary | `#D4A373` | `secondary` | Acentos, badges, CTA secundarios |
| secondary-foreground | `#1C1917` | `secondary-foreground` | Texto sobre secondary |

### Fondos y superficies
| Token | Hex | Uso |
|-------|-----|-----|
| background | `#FAFAF8` | Fondo general de la app |
| card | `#FFFFFF` | Cards, modals |
| sidebar | `#1B4332` | Sidebar navegacion |
| sidebar-foreground | `#D8F3DC` | Texto/iconos en sidebar |
| header | `#FFFFFF` | Header superior |
| muted | `#F0EDE8` | Fondos secundarios, filas alternas |
| muted-foreground | `#78716C` | Texto muted, placeholders |

### Texto
| Token | Hex | Uso |
|-------|-----|-----|
| foreground | `#1C1917` | Texto principal |
| foreground-secondary | `#57534E` | Texto secundario |
| foreground-muted | `#A8A29E` | Labels, captions |

### Estados
| Estado | Hex | Token | Uso |
|--------|-----|-------|-----|
| Success | `#16A34A` | `success` | Confirmaciones, pagos completados |
| Warning | `#D97706` | `warning` | Alertas, stock bajo |
| Error | `#DC2626` | `destructive` | Errores, eliminaciones |
| Info | `#2563EB` | `info` | Informativo, tooltips |

### Semaforo de stock
| Color | Hex | Significado |
|-------|-----|-------------|
| Verde | `#16A34A` | Stock suficiente (>50% del minimo) |
| Amarillo | `#D97706` | Stock bajo (<=50% del minimo) |
| Rojo | `#DC2626` | Sin stock o critico (<=10%) |

### Colores por rol
| Rol | Hex | Token | Uso |
|-----|-----|-------|-----|
| Admin | `#7C3AED` | `role-admin` | Badge, borde sidebar |
| Ventas | `#2D6A4F` | `role-ventas` | Badge, indicador |
| Inventario | `#B45309` | `role-inventario` | Badge, indicador |

### CSS Variables (globals.css)
```css
@layer base {
  :root {
    --background: 40 20% 98%;
    --foreground: 20 14% 10%;
    --card: 0 0% 100%;
    --card-foreground: 20 14% 10%;
    --popover: 0 0% 100%;
    --popover-foreground: 20 14% 10%;
    --primary: 153 42% 30%;
    --primary-foreground: 0 0% 100%;
    --secondary: 29 49% 64%;
    --secondary-foreground: 20 14% 10%;
    --muted: 30 16% 93%;
    --muted-foreground: 25 6% 49%;
    --accent: 30 16% 93%;
    --accent-foreground: 20 14% 10%;
    --destructive: 0 72% 51%;
    --destructive-foreground: 0 0% 100%;
    --border: 30 10% 87%;
    --input: 30 10% 87%;
    --ring: 153 42% 30%;
    --radius: 0.5rem;

    /* Custom tokens */
    --success: 142 72% 37%;
    --warning: 32 95% 44%;
    --info: 217 91% 53%;
    --sidebar: 153 42% 18%;
    --sidebar-foreground: 133 41% 90%;
    --role-admin: 263 70% 58%;
    --role-ventas: 153 42% 30%;
    --role-inventario: 28 92% 37%;
  }
}
```

---

## 2. Tipografia

| Propiedad | Valor |
|-----------|-------|
| **Principal** | `Inter` (sans-serif) — UI, cuerpo |
| **Display** | `DM Serif Display` — Logo, titulos hero |

| Nivel | Tamano | Weight | Line-height | Clase Tailwind |
|-------|--------|--------|-------------|----------------|
| h1 | 30px | 700 | 1.2 | `text-3xl font-bold` |
| h2 | 24px | 600 | 1.3 | `text-2xl font-semibold` |
| h3 | 20px | 600 | 1.4 | `text-xl font-semibold` |
| body | 16px | 400 | 1.5 | `text-base` |
| small | 14px | 400 | 1.4 | `text-sm` |
| caption | 12px | 500 | 1.3 | `text-xs font-medium` |

Weights usados: 400 (regular), 500 (medium), 600 (semibold), 700 (bold).

---

## 3. Componentes shadcn/ui

| Componente | Variantes / Uso |
|------------|-----------------|
| **Button** | `default` (primary verde), `secondary` (dorado), `destructive` (rojo), `outline`, `ghost`. Tamano `lg` para touch en tablet. |
| **Input** | Text, number, search. Height minimo 44px para touch. |
| **Select** | Categorias, proveedores, estados. |
| **Form** | React Hook Form + Zod. Campos de producto, pedido, cliente. |
| **Table** | Listados de inventario, pedidos, clientes. Filas alternas con `muted`. |
| **Card** | Dashboard KPIs, resumen de pedido, ficha de producto. |
| **Dialog** | Confirmacion de eliminacion, detalle de lote, nuevo cliente rapido. |
| **Sheet** | Menu lateral en mobile (slide-over). |
| **Toast** | Sonner. Confirmacion de venta, error de stock, alerta de merma. |
| **Badge** | Estados de pedido: `nuevo` (info), `preparando` (warning), `listo` (success), `entregado` (muted), `cancelado` (destructive). |
| **Tabs** | Secciones dentro de vistas (ej: producto > general / lotes / historial). |
| **Command** | Busqueda rapida de productos en venta (cmd+k / tap). |
| **Separator** | Division visual en formularios y sidebars. |

### Componente custom: Semaforo de stock
```tsx
// Circulo de 12px con color segun porcentaje de stock
<span className={cn(
  "inline-block h-3 w-3 rounded-full",
  pct > 50 && "bg-success",
  pct > 10 && pct <= 50 && "bg-warning",
  pct <= 10 && "bg-destructive"
)} />
```

---

## 4. Layout

### Estructura general
```
+--[ Sidebar 240px ]--+--[ Header 56px ]------------+
|  Logo               |  Busqueda | Rol badge | User |
|  Nav items           +-----------------------------+
|  (por rol)          |                               |
|                     |  Main content (scroll)        |
|  Corte de caja (V)  |  Padding: 24px               |
|  Config (A)         |                               |
+---------------------+-------------------------------+
```

- **Sidebar**: Fija en desktop/tablet landscape. Fondo `sidebar` (#1B4332). Logo arriba, nav al centro, usuario abajo.
- **Header**: Sticky. Barra de busqueda global (Command), badge de rol, avatar + logout.
- **Main**: Max-width 1280px centrado. Padding 24px. Scroll vertical.

### Responsive
| Viewport | Sidebar | Comportamiento |
|----------|---------|----------------|
| >= 1024px | Visible fija 240px | Layout completo |
| 768-1023px | Colapsada a iconos 64px | Expand on hover |
| < 768px | Oculta | Sheet slide-over desde hamburger |

### PWA
- `theme-color`: `#1B4332` (sidebar verde oscuro).
- Status bar blends con header.
- Splash: logo centrado sobre fondo `#FAFAF8`.
- Touch targets minimo 44x44px en toda la app.

---

## 5. Iconografia (Lucide)

| Seccion | Icono | Nombre Lucide |
|---------|-------|---------------|
| Dashboard | `LayoutDashboard` | Vista general |
| Productos | `Package` | Catalogo |
| Inventario | `Warehouse` | Lotes y stock |
| Pedidos | `ClipboardList` | Listado de pedidos |
| Venta rapida | `Zap` | POS mostrador |
| Clientes | `Users` | Directorio |
| Proveedores | `Truck` | Compras |
| Merma | `Trash2` | Registro de perdida |
| Corte de caja | `Calculator` | Cierre diario |
| Configuracion | `Settings` | Admin |
| Buscar | `Search` | Barra global |
| Notificaciones | `Bell` | Alertas stock |
| Logout | `LogOut` | Cerrar sesion |
| Agregar | `Plus` | Crear nuevo |
| Editar | `Pencil` | Modificar |
| Eliminar | `Trash2` | Borrar |
| Filtrar | `Filter` | Filtros de tabla |
| Exportar | `Download` | Descargar CSV |

---

## Referencia BMAD
Este sistema de diseno corresponde al proyecto PuntoFlor definido en `bmad/analisis/puntoflor-mvp.md`.
