# Arquitectura Multi-Tenant — PuntoFlor

**Fecha**: 2026-10-07
**Estado**: Vigente

---

## Vision

PuntoFlor es una **plataforma SaaS** donde multiples florerias crean su cuenta, gestionan su negocio y tienen su tienda publica online.

```
puntoflor.com                  → Landing: "Crea tu floreria online"
puntoflor.com/registro         → Registro de nueva floreria
puntoflor.com/login            → Login de usuarios
puntoflor.com/admin            → Panel de gestion (multi-tenant)
puntoflor.com/rosa-bella       → Tienda publica de "Rosa Bella"
puntoflor.com/flores-del-valle → Tienda publica de "Flores del Valle"
```

## Modelo de datos multi-tenant

### Tabla central: florerias
```sql
CREATE TABLE florerias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,  -- URL publica: puntoflor.com/[slug]
  logo_url TEXT,
  descripcion TEXT,
  direccion TEXT,
  telefono TEXT,
  email TEXT,
  whatsapp TEXT,
  horarios TEXT,
  redes_sociales JSONB,       -- {facebook, instagram, tiktok}
  plan TEXT DEFAULT 'free',   -- 'free' | 'pro'
  activa BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX idx_florerias_slug ON florerias(slug);
```

### Tenant isolation: floreria_id en TODA tabla
```sql
-- Ejemplo: products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  floreria_id UUID NOT NULL REFERENCES florerias(id),  -- ← OBLIGATORIO
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  ...
);

CREATE INDEX idx_products_floreria ON products(floreria_id);
```

Tablas que llevan floreria_id:
- profiles (usuarios pertenecen a 1 floreria)
- clients
- suppliers
- products
- product_images (NUEVO)
- recipes
- lots
- waste
- inventory_movements
- orders
- order_items
- order_payments

### RLS (Row Level Security)
```sql
-- Politica base para todas las tablas
CREATE POLICY tenant_isolation ON products
  USING (floreria_id = (auth.jwt()->>'floreria_id')::UUID);

-- El floreria_id se inyecta como custom claim en el JWT de Supabase
```

### Tabla de imagenes (NUEVA)
```sql
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  floreria_id UUID NOT NULL REFERENCES florerias(id),
  url TEXT NOT NULL,           -- URL en Supabase Storage
  alt_text TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Maximo 5 fotos por producto (validar en aplicacion)
```

### Storage (Supabase)
```
Bucket: product-images
Estructura: /{floreria_id}/{product_id}/{filename}

Politicas:
- INSERT: solo usuarios autenticados de esa floreria
- SELECT: publico (para la tienda)
- DELETE: solo admin de la floreria
```

## Flujo de registro

```
1. Usuario llega a puntoflor.com
2. Click "Registra tu floreria"
3. Paso 1: Email + password → crear cuenta Supabase Auth
4. Paso 2: Nombre floreria + slug + direccion + telefono
5. Paso 3: Logo (opcional, subir a Storage)
6. Sistema crea:
   - Registro en `florerias`
   - Perfil en `profiles` con rol=admin, floreria_id
   - Custom claim en JWT con floreria_id
7. Redirect a /admin (dashboard vacio, listo para configurar)
```

## Flujo de invitacion de empleados

```
1. Admin va a /admin/equipo
2. Click "Invitar miembro"
3. Ingresa email + rol (ventas | inventario)
4. Sistema crea cuenta Supabase Auth + perfil con floreria_id
5. Empleado recibe email con link para setup de password
6. Login → ve datos de SU floreria unicamente
```

## Tienda publica (/[slug])

```
1. Cliente visita puntoflor.com/rosa-bella
2. Next.js busca floreria con slug="rosa-bella"
3. Si existe y esta activa: renderiza tienda con SSR
4. Muestra: logo, nombre, catalogo con fotos, precios
5. Cliente puede filtrar por categoria
6. Click en producto: detalle con foto grande + boton "Pedir por WhatsApp"
7. Si no existe: 404
```

### SEO por floreria
```tsx
export async function generateMetadata({ params }) {
  const floreria = await getFloreriaBySlug(params.slug)
  return {
    title: `${floreria.nombre} — Flores y arreglos`,
    description: floreria.descripcion,
    openGraph: { images: [floreria.logo_url] }
  }
}
```

## Estructura de rutas

```
src/app/
├── (public)/              # Sin auth
│   ├── page.tsx           # Landing page
│   ├── registro/          # Registro de floreria
│   └── login/             # Login
├── (dashboard)/           # Con auth + floreria_id
│   ├── layout.tsx         # Sidebar + header
│   ├── page.tsx           # Dashboard
│   ├── clientes/
│   ├── proveedores/
│   ├── productos/
│   ├── inventario/
│   ├── pedidos/
│   ├── venta-rapida/
│   ├── reportes/
│   ├── equipo/            # Gestion de miembros
│   └── configuracion/     # Branding de la floreria
└── [slug]/                # Tienda publica (SSR)
    ├── page.tsx           # Catalogo
    └── [productId]/       # Detalle de producto
```

## Responsabilidades

| Persona | Responsabilidad |
|---------|----------------|
| **Jesus** | DB multi-tenant, RLS, Storage, landing page, registro, fix UI |
| Miembro 2 | Tienda publica (/[slug]) |
| Miembro 3 | Panel admin: productos + fotos |
| Miembro 4 | Panel admin: pedidos + venta rapida |
| Miembro 5 | Testing + QA + configuracion de floreria |
