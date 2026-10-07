# Decisiones Tecnicas — PuntoFlor MVP

**Fecha**: 2026-10-07
**Estado**: Vigente
**Origen**: Debate VIMAD, validado por perspectiva tecnica (Ing. Ricardo) y financiera (CP Manuel)

---

## DT-001: Stack tecnologico

**Decision**: TypeScript + Next.js + Supabase (PostgreSQL)

**Contexto**: Equipo universitario de 5 personas, necesidad de desarrollo rapido con stack moderno.

**Alternativas consideradas**:
- React + Express + PostgreSQL manual → mas control, mas boilerplate
- Supabase con RLS granular → demasiado complejo para V1

**Decision final**:
- **Frontend**: Next.js (App Router) con TypeScript
- **Backend**: Next.js API Routes para logica de negocio
- **Base de datos**: Supabase como proveedor de PostgreSQL
- **Auth**: Supabase Auth (no auth casero)
- **Deploy**: Vercel (frontend) + Supabase Cloud (DB)

**Justificacion**: Supabase se usa como base de datos, NO como backend completo. La logica de negocio (inventario, estados, costeo) vive en API Routes y RPCs de PostgreSQL, no en el cliente.

---

## DT-002: Operaciones atomicas de inventario

**Decision**: RPCs en plpgsql para reserva, consumo y merma

**Contexto**: Las operaciones de inventario (reservar, consumir, registrar merma) deben ser atomicas. Supabase JS no tiene `BEGIN/COMMIT` nativo desde el cliente.

**Decision final**:
- Crear funciones `plpgsql` en Supabase para:
  - `reservar_inventario(pedido_id)` — aparta stock al confirmar
  - `consumir_reserva(pedido_id)` — convierte reserva en consumo al preparar
  - `liberar_reserva(pedido_id)` — devuelve stock al cancelar
  - `registrar_merma(producto_id, cantidad, motivo)` — descuenta y valoriza
- Llamar estas funciones via `supabase.rpc()` desde API Routes
- NUNCA hacer read-modify-write desde el frontend

**Justificacion**: Sin transacciones atomicas, dos vendedores pueden reservar el mismo stock simultaneamente.

---

## DT-003: Maquina de estados en base de datos

**Decision**: Tabla de transiciones validas + validacion en trigger

**Contexto**: 6 estados de pedido con transiciones especificas. Sin formalizacion, el codigo se vuelve spaghetti de ifs.

**Decision final**:
```sql
CREATE TYPE order_status AS ENUM (
  'borrador', 'confirmado', 'en_preparacion', 'listo', 'entregado', 'cancelado'
);

CREATE TABLE order_transitions (
  from_status order_status NOT NULL,
  to_status order_status NOT NULL,
  requires_role TEXT, -- NULL = cualquier rol
  PRIMARY KEY (from_status, to_status)
);

-- Trigger que valida transicion antes de UPDATE
```

**Justificacion**: La validacion en DB es la ultima linea de defensa. Aunque el frontend tenga bugs, la DB rechaza transiciones invalidas.

---

## DT-004: Costeo promedio ponderado

**Decision**: Recalcular costo promedio en cada entrada de lote

**Contexto**: Necesidad de costear productos y valorizar merma. PEPS requiere rastrear consumo por lote especifico (complejidad alta). Promedio ponderado es suficiente para V1.

**Decision final**:
- Campo `costo_promedio` en tabla `productos`
- Se recalcula con trigger al insertar en `lotes`:
  ```
  nuevo_promedio = (stock_actual * costo_actual + cantidad_nueva * costo_nuevo) / (stock_actual + cantidad_nueva)
  ```
- La merma se valoriza contra el `costo_promedio` vigente al momento del registro
- Los insumos no florales usan costo fijo (ultimo costo de compra)

**Justificacion**: Promedio ponderado es aceptable fiscalmente y simple de implementar. PEPS queda para V2 si el negocio lo requiere.

---

## DT-005: Folio consecutivo sin huecos

**Decision**: Secuencia de PostgreSQL con formato PF-NNNN

**Contexto**: Requisito fiscal minimo: folios consecutivos sin huecos para notas de venta.

**Decision final**:
```sql
CREATE SEQUENCE pedido_folio_seq START 1;

-- Al crear pedido:
folio = 'PF-' || LPAD(nextval('pedido_folio_seq')::TEXT, 4, '0')
```

**Justificacion**: Las secuencias de PostgreSQL garantizan unicidad y consecutividad sin gaps en condiciones normales. El formato PF-NNNN es legible y extensible.

---

## DT-006: Estructura de precios inmutables

**Decision**: Copiar precio al detalle del pedido al momento de agregar producto

**Contexto**: Si el catalogo cambia de precio, las ventas pasadas no deben alterarse.

**Decision final**:
- `detalle_pedido.precio_unitario` = precio del producto al momento de agregar
- `detalle_pedido.descuento` = monto o porcentaje aplicado
- `detalle_pedido.subtotal` = (precio_unitario * cantidad) - descuento
- Campos inmutables despues de estado CONFIRMADO
- El catalogo puede cambiar libremente sin afectar pedidos existentes

**Justificacion**: Requisito contable basico. Precios editables post-venta = riesgo de fraude o error.

---

## DT-007: Auth con roles simples

**Decision**: Supabase Auth + campo `role` en tabla `profiles`

**Contexto**: 3 roles con permisos distintos. RLS granular es complejo para V1.

**Decision final**:
- Usar Supabase Auth para login/logout/session
- Tabla `profiles` con campo `role: 'admin' | 'ventas' | 'inventario'`
- Validacion de permisos en middleware de API Routes (no RLS)
- RLS basico: solo usuarios autenticados pueden leer/escribir

**Justificacion**: Middleware es mas facil de debuggear y testear que RLS policies. RLS granular por rol queda para V1.1.

---

## Resumen de decisiones

| ID | Decision | Impacto |
|----|----------|---------|
| DT-001 | Next.js + Supabase como DB | Stack completo |
| DT-002 | RPCs plpgsql para inventario | Consistencia de datos |
| DT-003 | Maquina de estados en DB | Integridad de pedidos |
| DT-004 | Costeo promedio ponderado | Margenes y merma |
| DT-005 | Folio PF-NNNN con secuencia | Requisito fiscal |
| DT-006 | Precios inmutables post-venta | Integridad financiera |
| DT-007 | Auth con roles en middleware | Simplicidad en V1 |
