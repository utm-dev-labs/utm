# PuntoFlor — MVP Backlog (validado por VIMAD)

**Fecha**: 2026-10-07
**Origen**: Debate VIMAD sobre PuntoFlor_Backlog_V1_Equipo5.pdf
**Items originales**: 59 | **Items MVP**: 17 | **Items nuevos**: 2

---

## MVP — 17 Items (4 sprints)

### Sprint 1: Cimientos

| # | ID | Elemento | Prioridad | Descripcion |
|---|-----|----------|-----------|-------------|
| 1 | PB-001 | Iniciar sesion en PuntoFlor | Alta | Login con Supabase Auth. Identifica al usuario y aplica su rol. |
| 2 | PB-002 | Aplicar permisos segun rol | Alta | Admin, Ventas, Inventario/Taller. Ventas no ve costos de compra. |
| 3 | PB-004 | Registrar cliente | Alta | Nombre, telefono, notas. Sin campos obligatorios innecesarios. |
| 4 | PB-007 | Registrar proveedor | Alta | Nombre, contacto, notas. Origen de la trazabilidad. |
| 5 | PB-010 | Catalogo de productos | Alta | Flores, follajes e insumos no florales. Campo "categoria" para distinguir tipo. |

### Sprint 2: Inventario

| # | ID | Elemento | Prioridad | Descripcion |
|---|-----|----------|-----------|-------------|
| 6 | PB-017 | Definir receta de un producto | Alta | Composicion: que flores y cantidades necesita cada producto. |
| 7 | PB-011 | Registrar entrada de lote de flores | Alta | Cantidad, costo unitario, proveedor, fecha. Base para costeo promedio ponderado. |
| 8 | PB-012 | Consultar existencia real por lote | Alta | Muestra disponible considerando movimientos y merma. Semaforo verde/amarillo/rojo. |
| 9 | PB-014 | Registrar merma de flores | Alta | Cantidad, motivo, lote de origen. DEBE valorizarse contra costo promedio del lote. |
| 10 | PB-030 | Reservar flores para pedido confirmado | Alta | RPC atomico en plpgsql. Aparta stock sin consumir. |
| 11 | PB-031 | Convertir reserva en consumo al preparar | Alta | Descuenta stock definitivamente. Dentro de la misma transaccion atomica. |

### Sprint 3: Venta

| # | ID | Elemento | Prioridad | Descripcion |
|---|-----|----------|-----------|-------------|
| 12 | PB-021 | Crear nuevo pedido | Alta | Cliente, productos, cantidades, fecha entrega, canal de origen, direccion, notas. |
| 13 | NUEVO-01 | Venta rapida de mostrador | Alta | Flujo simplificado: producto, cantidad, cobro. Sin obligar cliente. <60 segundos. |
| 14 | PB-032/33/34 | Estados de pedido | Alta | Maquina de estados: BORRADOR -> CONFIRMADO -> EN_PREPARACION -> LISTO -> ENTREGADO. Tambien CANCELADO. Tabla de transiciones validas. |
| 15 | PB-037 | Consultar historial de pedidos | Media | Busqueda por cliente, fecha, estado. Folio consecutivo (PF-0001). |
| 16 | PB-026 | Registrar metodo de pago | Alta | Efectivo, transferencia, tarjeta. Precio inmutable post-venta. Descuento manual con tope fijo. |
| 17 | NUEVO-02 | Resumen de ventas del dia | Alta | Total vendido, desglose por metodo de pago. Corte de caja simplificado. |

### Sprint 4: Estabilizacion

**0 features nuevas.** Solo:
- Bugs criticos
- Tests end-to-end del flujo completo
- Test de consistencia de inventario (20 pedidos simulados)
- QA de usabilidad (venta rapida <60s, pedido completo <3min)
- Deploy a staging

---

## V1.1 — Segunda iteracion

| ID | Elemento | Justificacion |
|----|----------|---------------|
| PB-027 | Registrar anticipo de pedido | Requiere definir regla: anticipo vs abono |
| PB-028 | Calcular saldo pendiente | Depende de anticipos |
| PB-005 | Consultar y buscar clientes | Busqueda avanzada, no critico para MVP |
| PB-006 | Editar informacion de cliente | CRUD completo |
| PB-008 | Consultar y editar proveedores | CRUD completo |
| PB-013 | Consultar vida util y caducidad | Alertas automaticas de stock |
| PB-015 | Registrar ajustes de inventario | Correcciones sin perder trazabilidad |
| PB-025 | Registrar descuento y costo de envio | Reglas de descuento por rol |
| NUEVO | Fotos de referencia en pedidos | Cliente pide "uno igual al anterior" |
| NUEVO | Agenda de entregas del dia | Vista calendario para logistica |
| PB-047 | Reporte de costo de merma por periodo | Valorizado contra lotes |
| PB-048 | Reporte de ventas por periodo | Tendencias comerciales |

## V2+ — Futuro

| Modulo | Items | Justificacion de exclusion |
|--------|-------|---------------------------|
| Eventos | PB-038 a PB-042 | Vertical completo, no core |
| Funerarios | PB-043 a PB-046 | Vertical completo, no core |
| Paquetes | PB-019 | Complejidad de pricing innecesaria en V1 |
| Arreglos personalizados | PB-018 | Requiere UX sofisticada de composicion |
| Dashboard | PB-051 | Graficas sin datos historicos no aportan |
| Penalizaciones | PB-036 | Reglas de negocio no definidas |
| WhatsApp | NUEVO | Integracion externa (API Meta) |
| CFDI/Facturacion | NUEVO | Requiere PAC y reglas fiscales |
| Logistica/rutas | NUEVO | Requiere geolocalizacion |
| App movil | NUEVO | Primero validar en web |

## Criterio de DONE del MVP

- [ ] Venta rapida completada en <60 segundos
- [ ] Pedido completo en <3 minutos
- [ ] Stock cuadra tras 20 pedidos simulados (0 discrepancias)
- [ ] Corte de caja = suma de pagos del dia por metodo
- [ ] Cobertura 80% en logica de inventario y pagos
- [ ] 1 test e2e del flujo: crear lote -> crear pedido -> pagar -> verificar stock
- [ ] Deploy en staging accesible por el equipo
