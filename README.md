# PuntoFlor

<!-- Badges -->
![Build Status](https://img.shields.io/badge/build-pending-lightgrey)
![License](https://img.shields.io/badge/license-MIT-blue)
![Stack](https://img.shields.io/badge/stack-Next.js%20%2B%20Supabase-blue)
![Sprint](https://img.shields.io/badge/sprint-1%20de%204-green)

> Sistema de gestion integral para florerias — trazabilidad de inventario, ventas y control financiero.

---

## Que es PuntoFlor

PuntoFlor es un sistema interno para florerias que conecta la venta con el inventario real. Su idea central es **trazabilidad**: seguir una flor desde que llega del proveedor, entra en un lote, se reserva o consume en un producto, forma parte de un pedido y finalmente se entrega o se pierde por merma.

### Problemas que resuelve

- **Perdida de trazabilidad**: se compra flor en volumen, pero se usa por tallo, ramo o arreglo
- **Merma sin medir**: flores que se marchitan y cuyo costo no se cuantifica
- **Precios historicos**: las ventas deben conservar el precio cobrado aunque el catalogo cambie
- **Control de acceso**: no todos los empleados deben ver costos de compra o modificar pedidos

### Funcion principal

Mantener trazabilidad y control operativo: saber que flor entro, de donde vino, cuanto costo, cuanto queda, cuanto esta apartado, cuanto se consumio y en que pedido o servicio se utilizo.

## Stack tecnologico (OBLIGATORIO)

> **REGLA**: Este es el stack oficial del proyecto. No se permite agregar ni sustituir tecnologias sin aprobacion del equipo. Toda contribucion debe usar estas herramientas.

### Core

| Capa | Tecnologia | Version | Proposito | Obligatorio |
|------|-----------|---------|-----------|:-----------:|
| Framework | **Next.js** | 14.x | App Router, SSR, API Routes | SI |
| Lenguaje | **TypeScript** | 5.x | Tipado estricto en todo el proyecto | SI |
| Base de datos | **Supabase** | Cloud | PostgreSQL 15, Auth, RPCs | SI |
| DB Client | **@supabase/supabase-js** | 2.x | Queries, Auth, Realtime | SI |
| PWA | **@serwist/next** | latest | Progressive Web App | SI |

### Frontend

| Libreria | Proposito | Obligatorio |
|----------|-----------|:-----------:|
| **React 18** | UI components | SI |
| **Tailwind CSS** | Estilos utilitarios | SI |
| **shadcn/ui** | Componentes base (tablas, forms, botones, modals) | SI |
| **React Hook Form** | Manejo de formularios | SI |
| **Zod** | Validacion de schemas (client + server) | SI |
| **Lucide React** | Iconos | SI |
| **date-fns** | Manejo de fechas | SI |

### Backend

| Herramienta | Proposito | Obligatorio |
|-------------|-----------|:-----------:|
| **Next.js API Routes** | Endpoints REST | SI |
| **plpgsql** (Supabase) | RPCs atomicas de inventario | SI |
| **Supabase Auth** | Autenticacion (email/password) | SI |
| **Zod** | Validacion de payloads en servidor | SI |

### Testing y calidad

| Herramienta | Proposito | Obligatorio |
|-------------|-----------|:-----------:|
| **Vitest** | Tests unitarios e integracion | SI |
| **@testing-library/react** | Tests de componentes | SI |
| **ESLint** | Linting | SI |
| **Prettier** | Formateo | SI |
| **Husky + lint-staged** | Git hooks pre-commit | SI |

### Deploy e infraestructura

| Servicio | Proposito | Obligatorio |
|----------|-----------|:-----------:|
| **Vercel** | Frontend + API Routes | SI |
| **Supabase Cloud** | PostgreSQL + Auth + RPCs | SI |
| **GitHub Actions** | CI: lint, tests, build | SI |

### PWA — Progressive Web App

PuntoFlor es una **PWA** (Progressive Web App). Esto significa que:

- Se puede **instalar** en celular o tablet como app nativa (sin App Store)
- Funciona en **cualquier navegador** moderno (Chrome, Safari, Firefox)
- Tiene **Service Worker** para cache de assets y carga rapida
- En V1.1: soporte **offline basico** (catalogo y pedidos pendientes de sync)
- En V2: **push notifications** para cambios de estado de pedidos

**Configuracion**: Se usa `@serwist/next` integrado con Next.js. El manifest y Service Worker se configuran en `next.config.js`.

**Requerimientos PWA**:
- `manifest.json` con nombre, iconos y colores del tema
- Service Worker registrado para cache de assets estaticos
- Meta tags de PWA en `layout.tsx`
- Iconos en multiples resoluciones (192x192, 512x512)
- `theme-color` consistente con la marca PuntoFlor

### Reglas del stack

1. **No instalar librerias sin justificacion** — si shadcn/ui o las herramientas listadas ya resuelven el problema, no agregar otra dependencia
2. **TypeScript strict mode** obligatorio — no usar `any`, no desactivar checks
3. **Zod para toda validacion** — en formularios (client) y en API Routes (server)
4. **No logica de negocio en componentes React** — toda logica va en `src/services/`
5. **RPCs atomicas para inventario** — reserva, consumo, merma y lotes se operan via plpgsql, nunca desde el frontend
6. **API Routes para backend** — no llamar Supabase directamente desde componentes para operaciones de escritura
7. **Tailwind + shadcn/ui para UI** — no CSS modules, no styled-components, no CSS-in-JS
8. **Conventional Commits en espanol** — `feat(auth): agregar login con Supabase`
9. **Tests obligatorios** — toda logica de negocio debe tener tests antes del merge
10. **PWA compatible** — toda pagina debe funcionar correctamente como PWA instalada

## Requisitos

- Node.js 18+
- npm 9+
- Git 2.30+
- Cuenta de Supabase (gratuita)
- Navegador moderno (Chrome 90+, Safari 15+, Firefox 90+)

## Instalacion

```bash
# Clonar el repositorio
git clone https://github.com/utm-dev-labs/utm.git
cd utm

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Supabase

# Servidor de desarrollo
npm run dev
```

## Comandos principales

```bash
npm run dev          # servidor de desarrollo (http://localhost:3000)
npm run build        # build de produccion
npm run test         # ejecutar tests
npm run lint         # ejecutar linter
npm run lint:fix     # corregir errores de lint
```

## Arquitectura

```
src/
├── app/              # Rutas y paginas (Next.js App Router)
│   ├── (auth)/       # Paginas de autenticacion
│   ├── (dashboard)/  # Paginas protegidas por rol
│   ├── api/          # API Routes (logica de negocio)
│   └── layout.tsx    # Layout principal
├── components/       # Componentes reutilizables
│   ├── ui/           # Componentes base (botones, inputs, tablas)
│   └── forms/        # Formularios de negocio
├── lib/              # Utilidades
│   ├── supabase/     # Cliente y tipos de Supabase
│   ├── validators/   # Validacion de datos
│   └── utils/        # Helpers generales
├── services/         # Logica de negocio
│   ├── inventory/    # Lotes, stock, merma, reserva
│   ├── orders/       # Pedidos, estados, pagos
│   └── catalog/      # Productos, recetas, proveedores
├── types/            # Definiciones de tipos TypeScript
├── hooks/            # Custom hooks de React
└── tests/            # Tests unitarios e integracion

supabase/
├── migrations/       # Migraciones SQL (timestamps)
└── functions/        # RPCs plpgsql (inventario atomico)

docs/
├── architecture/     # Decisiones tecnicas y plan de sprints
├── business-rules/   # Reglas de negocio y backlog MVP
├── api/              # Documentacion de endpoints
└── guides/           # Guias de desarrollo y onboarding

bmad/
├── brainstorm/       # Ideas iniciales
├── maduracion/       # Ideas en refinamiento
├── analisis/         # Ideas analizadas (PuntoFlor MVP aqui)
├── desarrollo/       # Ideas en implementacion
└── archivo/          # Ideas completadas o descartadas
```

## Modelo de datos (MVP)

```
profiles        → Usuarios y roles (admin, ventas, inventario)
clients         → Clientes de la floreria
suppliers       → Proveedores de flores
products        → Catalogo (flores, follajes, insumos)
recipes         → Composicion de cada producto (que flores necesita)
lots            → Lotes de flores (cantidad, costo, proveedor, fecha)
stock           → Existencia actual por producto
waste           → Registro de merma valorizada
orders          → Pedidos con folio consecutivo (PF-NNNN)
order_items     → Detalle del pedido (productos, precios inmutables)
order_payments  → Pagos registrados por pedido
order_transitions → Transiciones validas de estados
```

## Roles y permisos

| Rol | Puede | No puede |
|-----|-------|----------|
| **Admin** | Todo | — |
| **Ventas** | Clientes, pedidos, pagos, catalogo | Ver costos de compra, modificar inventario |
| **Inventario** | Proveedores, lotes, stock, merma, preparacion | Modificar pedidos, ver precios de venta |

## Flujo de un pedido

```
BORRADOR → CONFIRMADO → EN_PREPARACION → LISTO → ENTREGADO
                ↓              ↓            
            CANCELADO      CANCELADO
```

- **Confirmar** → reserva flores del inventario
- **Preparar** → convierte reserva en consumo
- **Cancelar** → libera reservas

## Reglas de negocio clave

| Regla | Descripcion |
|-------|-------------|
| Costeo promedio ponderado | Se recalcula con cada entrada de lote |
| Reserva ≠ Consumo | Apartar flores no es lo mismo que usarlas |
| Precios inmutables | El precio se copia al pedido y no cambia |
| Merma valorizada | Toda merma se registra con su costo |
| Folio consecutivo | PF-0001, PF-0002... sin huecos |
| Descuento con tope | Ventas max 15%, Admin max 50% |
| Venta rapida | Mostrador sin registro de cliente, <60 seg |

Ver documentacion completa en [`docs/business-rules/puntoflor-reglas.md`](docs/business-rules/puntoflor-reglas.md).

## Plan de desarrollo (MVP)

| Sprint | Semanas | Foco | Items |
|--------|---------|------|-------|
| S1 | 1-2 | Cimientos | Auth, clientes, proveedores, catalogo |
| S2 | 3-4 | Inventario | Lotes, stock, recetas, merma, reserva |
| S3 | 5-6 | Venta | Pedidos, venta rapida, estados, pagos |
| S4 | 7-8 | Estabilizacion | Tests, bugs, deploy (0 features nuevas) |

Ver plan detallado en [`docs/architecture/puntoflor-sprints.md`](docs/architecture/puntoflor-sprints.md).

## Desarrollo

1. Crear rama desde `dev`: `git checkout dev && git checkout -b feat/mi-feature`
2. Desarrollar con commits descriptivos (Conventional Commits en espanol)
3. Rebase antes de push: `git fetch origin dev && git rebase origin/dev`
4. Abrir Pull Request hacia `dev`
5. Esperar review y aprobacion

**IMPORTANTE**: Siempre rebase, nunca merge commits. El historial debe ser lineal.

Para mas detalle, ver la [guia de onboarding](docs/guides/onboarding.md).

## Documentacion

| Documento | Contenido |
|-----------|-----------|
| [`docs/business-rules/puntoflor-reglas.md`](docs/business-rules/puntoflor-reglas.md) | 9 reglas de negocio formales |
| [`docs/business-rules/puntoflor-mvp-backlog.md`](docs/business-rules/puntoflor-mvp-backlog.md) | Backlog MVP (17 items) + V1.1 + V2+ |
| [`docs/architecture/puntoflor-decisiones.md`](docs/architecture/puntoflor-decisiones.md) | 7 decisiones tecnicas |
| [`docs/architecture/puntoflor-sprints.md`](docs/architecture/puntoflor-sprints.md) | Plan de 4 sprints |
| [`bmad/analisis/puntoflor-mvp.md`](bmad/analisis/puntoflor-mvp.md) | Analisis VIMAD del proyecto |

## Equipo

**Equipo 5** — Universidad Tecnologica Metropolitana (UTM)

## Licencia

MIT
