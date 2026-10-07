# Producto Esperado — PuntoFlor MVP

**Fecha**: 2026-10-07

---

## Vision del producto

PuntoFlor MVP es un sistema web que permite a una floreria:
1. **Registrar inventario** de flores con trazabilidad por lote y proveedor
2. **Vender** con flujo rapido de mostrador y pedidos programados
3. **Controlar merma** con valorización economica
4. **Cerrar el dia** con resumen de ventas por metodo de pago

Al terminar el Sprint 4, el equipo debe poder hacer una **demo en vivo** donde un usuario recorre el flujo completo: registrar flores → vender → ver que el stock baja → cerrar el dia.

---

## Requerimientos Funcionales

### RF-01: Autenticacion
- El sistema permite iniciar sesion con email y contraseña
- Al iniciar sesion, el usuario es redirigido al dashboard de su rol
- El sistema cierra sesion y limpia la sesion del navegador
- Las rutas protegidas redirigen a /login si no hay sesion

### RF-02: Control de acceso por rol
- El sistema tiene 3 roles: Admin, Ventas, Inventario
- Admin accede a todo
- Ventas accede a: clientes, catalogo (sin costos), pedidos, pagos, reporte de ventas
- Inventario accede a: proveedores, lotes, stock, merma, recetas
- Intentar acceder a una ruta sin permiso muestra error 403

### RF-03: Gestion de clientes
- El sistema permite crear clientes con nombre (obligatorio), telefono y notas
- El sistema permite buscar clientes por nombre o telefono
- Existe un cliente "Publico general" para ventas rapidas
- El sistema permite editar datos de clientes existentes

### RF-04: Gestion de proveedores
- El sistema permite crear proveedores con nombre y datos de contacto
- Solo Inventario y Admin pueden gestionar proveedores
- Los proveedores se asocian a los lotes de flores

### RF-05: Catalogo de productos
- El sistema maneja 3 categorias: flor, follaje, insumo
- Cada producto tiene nombre, categoria, precio de venta y unidad
- Ventas ve el catalogo sin costos de compra
- Los productos se pueden filtrar por categoria y buscar por nombre

### RF-06: Recetas de productos
- Cada producto puede tener una receta: lista de ingredientes con cantidades
- Las recetas se usan para calcular la reserva de inventario al confirmar pedido
- Solo Inventario y Admin pueden editar recetas

### RF-07: Registro de lotes
- El sistema registra la entrada de flores con: producto, proveedor, cantidad, costo unitario y fecha
- Al registrar un lote, el stock del producto aumenta
- El costo promedio ponderado se recalcula automaticamente
- Solo Inventario y Admin pueden registrar lotes

### RF-08: Consulta de stock
- El sistema muestra el stock actual de cada producto
- Un semaforo visual indica nivel de stock: verde (>50%), amarillo (20-50%), rojo (<20%)
- La vista se diferencia por rol (Ventas sin costos, Inventario con todo)

### RF-09: Registro de merma
- El sistema permite registrar merma con motivo (marchitamiento, rotura, exceso, otro)
- La merma se valoriza automaticamente: cantidad x costo promedio
- El stock se reduce inmediatamente
- Solo Inventario y Admin pueden registrar merma

### RF-10: Crear pedido completo
- El sistema genera folio consecutivo (PF-0001, PF-0002...)
- El usuario selecciona cliente, agrega productos del catalogo con cantidades
- El precio se copia del catalogo al detalle (inmutable post-confirmacion)
- Se calcula subtotal y total automaticamente
- Se puede aplicar descuento manual (tope 15% para Ventas, 50% para Admin)
- El pedido inicia en estado BORRADOR

### RF-11: Venta rapida de mostrador
- Flujo simplificado: producto, cantidad, pago, listo
- No requiere registrar cliente (usa "Publico general")
- El pedido se crea en estado ENTREGADO directamente
- El stock se descuenta como consumo directo (sin reserva)
- Objetivo: completar en menos de 60 segundos

### RF-12: Maquina de estados de pedido
- Estados: BORRADOR → CONFIRMADO → EN_PREPARACION → LISTO → ENTREGADO
- Tambien: CANCELADO (desde BORRADOR, CONFIRMADO o EN_PREPARACION)
- Al confirmar: se reserva inventario
- Al preparar: se consume la reserva
- Al cancelar: se liberan reservas
- Solo Admin cancela pedidos en EN_PREPARACION o LISTO
- Transiciones invalidas son rechazadas por la base de datos

### RF-13: Registro de pago
- El sistema registra pagos con monto, metodo (efectivo/transferencia/tarjeta) y referencia
- El monto no puede exceder el saldo pendiente del pedido
- Los pagos son inmutables despues de guardar

### RF-14: Historial de pedidos
- El sistema lista pedidos con folio, cliente, fecha, estado y total
- Se puede buscar por folio o nombre de cliente
- Se puede filtrar por estado y rango de fechas
- Ventas ve sus pedidos; Admin ve todos

### RF-15: Resumen de ventas del dia
- El sistema muestra total vendido y numero de pedidos del dia
- Desglose por metodo de pago (efectivo, transferencia, tarjeta)
- Se puede consultar dias anteriores
- Los totales deben coincidir con la suma de pagos registrados

---

## Pantallas del MVP

| # | Pantalla | Ruta | Roles | Componentes principales |
|---|----------|------|-------|------------------------|
| 1 | Login | /login | Todos | Form email/password, mensajes de error |
| 2 | Dashboard | / | Todos | Resumen rapido segun rol |
| 3 | Clientes | /clientes | Ventas, Admin | Tabla + busqueda + form crear/editar |
| 4 | Proveedores | /proveedores | Inventario, Admin | Tabla + busqueda + form crear/editar |
| 5 | Catalogo | /productos | Todos | Tabla con filtros + form CRUD |
| 6 | Receta | /productos/:id/receta | Inventario, Admin | Editor de ingredientes |
| 7 | Inventario | /inventario | Inventario, Admin (lectura Ventas) | Stock con semaforo + filtros |
| 8 | Nuevo lote | /inventario/lotes/nuevo | Inventario, Admin | Form de registro de lote |
| 9 | Merma | /inventario/merma | Inventario, Admin | Form + historial de merma |
| 10 | Nuevo pedido | /pedidos/nuevo | Ventas, Admin | Wizard: cliente → productos → resumen |
| 11 | Venta rapida | /venta-rapida | Ventas, Admin | 1 pantalla: producto + pago |
| 12 | Detalle pedido | /pedidos/:id | Ventas, Admin | Info + items + estados + pagos |
| 13 | Historial | /pedidos | Ventas, Admin | Tabla + filtros + busqueda |
| 14 | Corte de caja | /reportes/ventas-dia | Ventas, Admin | Resumen + desglose |

---

## Entregables por Sprint

### Sprint 1: Cimientos
- [ ] Proyecto Next.js inicializado con TypeScript, Tailwind, shadcn/ui
- [ ] Supabase configurado (proyecto, tablas base, auth)
- [ ] Login funcional con redirect por rol
- [ ] Middleware de permisos
- [ ] CRUD de clientes, proveedores y productos
- [ ] 5 endpoints REST funcionando
- [ ] Seeds de datos de prueba
- [ ] Migracion SQL inicial (responsable: Jesus)

### Sprint 2: Inventario
- [ ] Editor de recetas funcional
- [ ] Registro de lotes con recalculo de costo promedio
- [ ] Vista de stock con semaforo
- [ ] Registro de merma valorizada
- [ ] RPCs de reserva y consumo en plpgsql
- [ ] 6 endpoints REST funcionando
- [ ] Tests de RPCs de inventario
- [ ] Migraciones SQL de inventario (responsable: Jesus)

### Sprint 3: Venta
- [ ] Crear pedido completo con folio y descuentos
- [ ] Venta rapida de mostrador (<60 seg)
- [ ] Maquina de estados con trigger en DB
- [ ] Historial de pedidos con filtros
- [ ] Registro de pagos
- [ ] Resumen de ventas del dia
- [ ] 8+ endpoints REST funcionando
- [ ] Migraciones SQL de pedidos y estados (responsable: Jesus)

### Sprint 4: Estabilizacion
- [ ] Test e2e del flujo completo
- [ ] 20 pedidos simulados con stock consistente
- [ ] Venta rapida <60 seg, pedido <3 min
- [ ] Cobertura 80% en inventario y pagos
- [ ] Deploy en Vercel + Supabase Cloud
- [ ] Demo preparada

---

## Criterios de exito del MVP

El MVP se considera exitoso si:

1. **Un vendedor puede** registrar una venta rapida en menos de 60 segundos
2. **Un vendedor puede** crear un pedido completo en menos de 3 minutos
3. **El inventario cuadra** despues de 20 operaciones (0 discrepancias)
4. **El corte de caja** coincide con los pagos registrados
5. **Los roles funcionan**: Ventas no ve costos, Inventario no modifica pedidos
6. **La demo en vivo** recorre el flujo sin errores ni workarounds
