# Plan de Sprints — PuntoFlor MVP

**Fecha**: 2026-10-07
**Duracion total**: 8 semanas (4 sprints x 2 semanas)
**Equipo**: 5 personas

---

## Sprint 1: Cimientos (Semanas 1-2)

**Objetivo**: Autenticacion funcional, catalogos base poblados, estructura de datos creada.

### Items
| # | ID | Elemento | Responsable |
|---|-----|----------|-------------|
| 1 | PB-001 | Login con Supabase Auth | Por asignar |
| 2 | PB-002 | Roles (admin, ventas, inventario) | Por asignar |
| 3 | PB-004 | Registro de clientes | Por asignar |
| 4 | PB-007 | Registro de proveedores | Por asignar |
| 5 | PB-010 | Catalogo de productos (flores, follajes, insumos) | Por asignar |

### Entregables
- [ ] Login funcional con 3 usuarios de prueba (1 por rol)
- [ ] CRUD basico de clientes, proveedores y productos
- [ ] Middleware de permisos por rol funcionando
- [ ] Migracion SQL con tablas: profiles, clients, suppliers, products
- [ ] Seeds de datos de prueba

### Decisiones tecnicas requeridas
- Configurar proyecto Next.js + Supabase
- Definir estructura de carpetas en `src/`
- Crear migracion inicial con todas las tablas del MVP
- Configurar Supabase Auth con email/password

---

## Sprint 2: Inventario (Semanas 3-4)

**Objetivo**: Entrada de flores, stock visible, merma registrada, reserva atomica funcionando.

### Items
| # | ID | Elemento | Responsable |
|---|-----|----------|-------------|
| 6 | PB-017 | Recetas de productos | Por asignar |
| 7 | PB-011 | Registro de lotes con costo | Por asignar |
| 8 | PB-012 | Existencia real (semaforo) | Por asignar |
| 9 | PB-014 | Merma valorizada | Por asignar |
| 10 | PB-030 | Reserva de inventario (RPC) | Por asignar |
| 11 | PB-031 | Consumo de reserva (RPC) | Por asignar |

### Entregables
- [ ] Registrar lote: cantidad, costo, proveedor, fecha
- [ ] Costo promedio ponderado recalculado automaticamente
- [ ] Vista de stock con semaforo (verde >50%, amarillo 20-50%, rojo <20%)
- [ ] Registrar merma con valorización
- [ ] RPC `reservar_inventario()` funcionando
- [ ] RPC `consumir_reserva()` funcionando
- [ ] RPC `liberar_reserva()` funcionando
- [ ] Test: reservar + consumir = stock correcto

### Decisiones tecnicas requeridas
- Crear funciones plpgsql de inventario
- Definir trigger de recalculo de costo promedio
- Definir umbrales del semaforo de stock

---

## Sprint 3: Venta (Semanas 5-6)

**Objetivo**: Flujo completo de venta funcionando. Desde crear pedido hasta entregarlo y ver el resumen del dia.

### Items
| # | ID | Elemento | Responsable |
|---|-----|----------|-------------|
| 12 | PB-021 | Crear pedido completo | Por asignar |
| 13 | NUEVO-01 | Venta rapida de mostrador | Por asignar |
| 14 | PB-032/33/34 | Maquina de estados de pedido | Por asignar |
| 15 | PB-037 | Consultar historial de pedidos | Por asignar |
| 16 | PB-026 | Registrar pago | Por asignar |
| 17 | NUEVO-02 | Resumen de ventas del dia | Por asignar |

### Entregables
- [ ] Crear pedido: seleccionar cliente, productos, cantidades
- [ ] Folio consecutivo PF-NNNN generado automaticamente
- [ ] Venta rapida: producto -> cobro -> listo (sin cliente obligatorio)
- [ ] Transiciones de estado validadas por DB (trigger)
- [ ] Reserva automatica al confirmar, consumo al preparar
- [ ] Registro de pago (efectivo, transferencia, tarjeta)
- [ ] Descuento manual con tope por rol (15% ventas, 50% admin)
- [ ] Resumen del dia: total, desglose por metodo de pago
- [ ] Busqueda de pedidos por cliente, fecha, estado

### Decisiones tecnicas requeridas
- Crear tabla order_transitions con transiciones validas
- Crear trigger de validacion de transiciones
- Definir secuencia de folios
- UI de venta rapida (modal o pagina dedicada)

---

## Sprint 4: Estabilizacion (Semanas 7-8)

**Objetivo**: 0 features nuevas. Pulir, probar y deployar.

### Actividades
| Actividad | Descripcion |
|-----------|-------------|
| Bugs criticos | Resolver todos los bugs encontrados en S1-S3 |
| Test e2e | Flujo completo: lote -> pedido -> pago -> verificar stock |
| Test consistencia | 20 pedidos simulados, verificar 0 discrepancias en stock |
| Test usabilidad | Venta rapida <60s, pedido completo <3min |
| Test permisos | Ventas no ve costos, Inventario no modifica pedidos |
| Performance | Optimizar queries lentas, agregar indices |
| Deploy | Staging en Vercel + Supabase Cloud |
| Documentacion | Actualizar README con instrucciones de uso |

### Criterio de salida (DONE)
- [ ] Venta rapida completada en <60 segundos
- [ ] Pedido completo en <3 minutos
- [ ] Stock cuadra tras 20 pedidos simulados (0 discrepancias)
- [ ] Corte de caja = suma de pagos del dia
- [ ] Cobertura minima 80% en logica de inventario y pagos
- [ ] 1 test e2e del flujo completo pasando
- [ ] Deploy funcional en staging
- [ ] Demo preparada

---

## Calendario resumen

```
Semana 1-2:  [Sprint 1: Cimientos]     Auth + Catalogos
Semana 3-4:  [Sprint 2: Inventario]    Lotes + Stock + Merma + RPCs
Semana 5-6:  [Sprint 3: Venta]         Pedidos + Pagos + Estados
Semana 7-8:  [Sprint 4: Estabilizar]   Tests + Bugs + Deploy
```

## Riesgos por sprint

| Sprint | Riesgo principal | Mitigacion |
|--------|-----------------|------------|
| S1 | Curva de aprendizaje Next.js + Supabase | Pair programming, tutoriales en semana 0 |
| S2 | RPCs de inventario complejas | Desarrollar primero sin UI, probar con SQL directo |
| S3 | Maquina de estados con bugs | Implementar trigger + tests antes de UI |
| S4 | Tentacion de agregar features | Regla estricta: 0 features, solo bugs y tests |
