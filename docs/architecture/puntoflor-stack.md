# Stack Tecnologico y Reglas de Desarrollo — PuntoFlor MVP

**Fecha**: 2026-10-07
**Responsable de DB**: Jesús Guadalupe Canul Cua

---

## Stack Definitivo

### Core
| Capa | Tecnologia | Version | Proposito |
|------|-----------|---------|-----------|
| Framework | Next.js | 14.x | App Router, SSR, API Routes |
| Lenguaje | TypeScript | 5.x | Tipado estricto en todo el proyecto |
| Base de datos | Supabase | Cloud | PostgreSQL 15, Auth, Storage |
| ORM / Client | @supabase/supabase-js | 2.x | Queries, Auth, Realtime |

### Frontend
| Libreria | Proposito |
|----------|-----------|
| React 18 | UI components |
| Tailwind CSS | Estilos utilitarios |
| shadcn/ui | Componentes base (tablas, forms, botones, modals) |
| React Hook Form | Manejo de formularios |
| Zod | Validacion de schemas (client + server) |
| Lucide React | Iconos |
| date-fns | Manejo de fechas |

### Backend
| Herramienta | Proposito |
|-------------|-----------|
| Next.js API Routes | Endpoints REST |
| plpgsql (Supabase) | RPCs atomicas de inventario |
| Supabase Auth | Autenticacion (email/password) |
| Zod | Validacion de payloads en servidor |

### Testing
| Herramienta | Proposito |
|-------------|-----------|
| Vitest | Tests unitarios y de integracion |
| @testing-library/react | Tests de componentes |
| supertest o fetch mock | Tests de API Routes |
| Supabase local (Docker) | DB de prueba para tests de integracion |

### Calidad de codigo
| Herramienta | Proposito |
|-------------|-----------|
| ESLint | Linting |
| Prettier | Formateo |
| Husky | Git hooks (pre-commit) |
| lint-staged | Lint solo archivos modificados |

### Deploy
| Servicio | Proposito |
|----------|-----------|
| Vercel | Frontend + API Routes |
| Supabase Cloud | PostgreSQL + Auth + RPCs |
| GitHub Actions | CI: lint, tests, build |

---

## Estructura de API (REST)

### Convenciones
- Todos los endpoints bajo `/api/`
- Respuestas JSON con formato consistente: `{ data, error, meta }`
- Codigos HTTP estandar: 200 (ok), 201 (created), 400 (bad request), 401 (unauthorized), 403 (forbidden), 404 (not found), 500 (server error)
- Paginacion: `?page=1&limit=20`
- Filtros como query params: `?status=confirmado&from=2026-01-01`

### Endpoints del MVP

```
# Auth
POST   /api/auth/login          → iniciar sesion
POST   /api/auth/logout         → cerrar sesion
GET    /api/auth/me             → usuario actual + rol

# Clientes
POST   /api/clients             → crear cliente
GET    /api/clients             → listar/buscar (?q=nombre)
GET    /api/clients/:id         → detalle
PATCH  /api/clients/:id         → editar

# Proveedores
POST   /api/suppliers           → crear proveedor
GET    /api/suppliers           → listar/buscar
GET    /api/suppliers/:id       → detalle
PATCH  /api/suppliers/:id       → editar

# Productos (catalogo)
POST   /api/products            → crear producto
GET    /api/products            → listar (?category=flor&q=rosa)
GET    /api/products/:id        → detalle
PATCH  /api/products/:id        → editar

# Recetas
GET    /api/products/:id/recipe → ver receta
PUT    /api/products/:id/recipe → definir/actualizar receta

# Inventario (lotes)
POST   /api/lots                → registrar lote
GET    /api/inventory           → stock actual (con semaforo)

# Merma
POST   /api/waste               → registrar merma

# Pedidos
POST   /api/orders              → crear pedido
GET    /api/orders              → listar (?status=X&client=Y&from=Z&to=W)
GET    /api/orders/:id          → detalle con items y pagos
POST   /api/orders/:id/items    → agregar producto al pedido
PATCH  /api/orders/:id/status   → cambiar estado (maquina de estados)
DELETE /api/orders/:id/items/:itemId → quitar producto (solo en BORRADOR)

# Venta rapida
POST   /api/quick-sale          → venta rapida (1 endpoint, todo en uno)

# Pagos
POST   /api/orders/:id/payments → registrar pago

# Reportes
GET    /api/reports/daily-sales → resumen del dia (?date=2026-10-07)
```

---

## Reglas de Validacion por Entidad

### Cliente
```typescript
const clientSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^\+?[\d\s-]{7,15}$/).optional(),
  notes: z.string().max(500).optional(),
})
```

### Proveedor
```typescript
const supplierSchema = z.object({
  name: z.string().min(2).max(100),
  contact: z.string().max(100).optional(),
  phone: z.string().regex(/^\+?[\d\s-]{7,15}$/).optional(),
  notes: z.string().max(500).optional(),
})
```

### Producto
```typescript
const productSchema = z.object({
  name: z.string().min(2).max(100),
  category: z.enum(['flor', 'follaje', 'insumo']),
  price: z.number().positive(),
  unit: z.string().min(1).max(20), // "tallo", "paquete", "metro", "pieza"
  cost: z.number().nonnegative().optional(), // solo visible para Inventario/Admin
})
```

### Lote
```typescript
const lotSchema = z.object({
  product_id: z.string().uuid(),
  supplier_id: z.string().uuid(),
  quantity: z.number().int().positive(),
  unit_cost: z.number().positive(),
  received_at: z.string().datetime(), // no futura
})
```

### Merma
```typescript
const wasteSchema = z.object({
  product_id: z.string().uuid(),
  quantity: z.number().int().positive(),
  reason: z.enum(['marchitamiento', 'rotura', 'exceso', 'otro']),
  notes: z.string().max(500).optional(),
})
// Validacion extra: quantity <= stock_disponible
```

### Pedido
```typescript
const orderSchema = z.object({
  client_id: z.string().uuid().optional(), // opcional para venta rapida
  delivery_date: z.string().datetime().optional(),
  channel: z.string().max(50).optional(), // "mostrador", "whatsapp", "telefono"
  address: z.string().max(200).optional(),
  notes: z.string().max(500).optional(),
})

const orderItemSchema = z.object({
  product_id: z.string().uuid(),
  quantity: z.number().int().positive(),
  unit_price: z.number().positive(), // copiado del catalogo
  discount: z.number().min(0).max(50), // porcentaje, tope por rol
})
```

### Pago
```typescript
const paymentSchema = z.object({
  amount: z.number().positive(),
  method: z.enum(['efectivo', 'transferencia', 'tarjeta']),
  reference: z.string().max(100).optional(),
})
// Validacion extra: amount <= saldo_pendiente
```

---

## Reglas de Testing

### Cobertura minima
- Logica de inventario (RPCs): **90%**
- Servicios de negocio: **80%**
- API Routes: **80%**
- Componentes UI: **60%** (priorizamos logica sobre UI)

### Que testear obligatoriamente
1. **Cada RPC de inventario**: reservar, consumir, liberar, merma, lote
2. **Cada transicion de estado**: valida e invalida
3. **Cada endpoint de API**: happy path + error cases
4. **Validaciones de Zod**: datos validos e invalidos
5. **Permisos por rol**: cada endpoint con cada rol

### Naming de tests
```
describe('POST /api/orders')
  it('crea pedido con folio consecutivo')
  it('rechaza pedido sin items')
  it('copia precio del catalogo al detalle')
  it('aplica descuento dentro del tope')
  it('rechaza descuento superior al tope del rol')
```

### Estructura de archivos de test
```
src/
├── services/
│   ├── inventory/
│   │   ├── lot-service.ts
│   │   └── lot-service.test.ts      ← junto al codigo
│   ├── orders/
│   │   ├── order-service.ts
│   │   └── order-service.test.ts
```

---

## Reglas de Desarrollo

### Git
- Branch desde `dev`: `feat/PB-XXX-descripcion`
- Conventional commits en espanol
- Rebase obligatorio antes de PR
- PR a `dev`, nunca directo a `main`
- Review obligatorio de al menos 1 persona

### Codigo
- TypeScript strict mode
- Zod para validacion en client Y server
- No logica de negocio en componentes React
- Logica de negocio en `src/services/`
- RPCs atomicas para operaciones de inventario
- Precios inmutables post-confirmacion

### Base de datos (responsable: Jesus)
- Migraciones con timestamp en `supabase/migrations/`
- Cada migracion tiene UP y DOWN
- RPCs en `supabase/functions/`
- Triggers para validaciones criticas (estados, costeo)
- Secuencia para folios consecutivos
- Indices en campos de busqueda frecuente

---

## Asignacion de Responsabilidades

| Persona | Responsabilidad principal | Issues tipicas |
|---------|--------------------------|----------------|
| **Jesus** | Base de datos, RPCs, migraciones, backend core | Auth, estados, inventario atomico, pedidos |
| **Miembro 2** | Frontend: paginas y componentes de negocio | Clientes, proveedores, catalogo |
| **Miembro 3** | Frontend: pedidos y venta rapida | Crear pedido, venta rapida, historial |
| **Miembro 4** | Frontend: inventario y reportes | Stock, merma, corte de caja |
| **Miembro 5** | Testing y QA | Tests e2e, permisos, consistencia |

> Nota: los nombres se asignaran cuando los miembros se unan al repo de GitHub.
