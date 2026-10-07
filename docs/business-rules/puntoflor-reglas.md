# Reglas de Negocio — PuntoFlor

**Fecha**: 2026-10-07
**Estado**: Vigente
**Origen**: Debate VIMAD + PuntoFlor_Backlog_V1_Equipo5.pdf

---

## RN-001: Costeo por promedio ponderado

**Dominio:** Inventario
**Estado:** Vigente
**Fecha:** 2026-10-07

### Descripcion
El costo de las flores se calcula por promedio ponderado. Cada vez que entra un lote nuevo, el costo promedio se recalcula considerando el stock existente y el nuevo ingreso.

### Condiciones
- Cuando se registra un lote nuevo, se recalcula: `costo_promedio = (stock_actual * costo_actual + cantidad_nueva * costo_nuevo) / (stock_actual + cantidad_nueva)`
- Si el stock actual es 0, el costo promedio es el costo del nuevo lote
- El costo promedio se usa para valorizar merma y calcular margenes

### Excepciones
- No aplica a insumos no florales (se registran a costo fijo por unidad)

---

## RN-002: Reserva vs consumo de inventario

**Dominio:** Inventario / Pedidos
**Estado:** Vigente
**Fecha:** 2026-10-07

### Descripcion
Reservar flores NO es lo mismo que consumirlas. La reserva aparta stock para un pedido confirmado. El consumo ocurre cuando el taller realmente usa las flores para preparar el producto.

### Condiciones
- Cuando un pedido pasa a CONFIRMADO, se reservan las flores segun la receta (stock disponible disminuye, stock reservado aumenta)
- Cuando un pedido pasa a EN_PREPARACION, la reserva se convierte en consumo (stock reservado disminuye, stock consumido aumenta)
- Cuando un pedido se CANCELA, las reservas se liberan (stock disponible aumenta)
- Ambas operaciones deben ser atomicas (transaccion en plpgsql)

### Excepciones
- La venta rapida de mostrador no reserva: va directo a consumo (el producto ya esta preparado)

---

## RN-003: Maquina de estados de pedido

**Dominio:** Pedidos
**Estado:** Vigente
**Fecha:** 2026-10-07

### Descripcion
Todo pedido sigue un flujo de estados con transiciones validas. No se permite saltar estados ni transiciones invalidas.

### Condiciones
| Estado actual | Transiciones validas |
|---------------|---------------------|
| BORRADOR | CONFIRMADO, CANCELADO |
| CONFIRMADO | EN_PREPARACION, CANCELADO |
| EN_PREPARACION | LISTO, CANCELADO |
| LISTO | ENTREGADO |
| ENTREGADO | (estado final) |
| CANCELADO | (estado final) |

- Al pasar a CONFIRMADO: se ejecuta reserva de inventario
- Al pasar a EN_PREPARACION: se convierte reserva en consumo
- Al pasar a CANCELADO: se liberan reservas (si las hay)
- Solo Admin puede cancelar pedidos en EN_PREPARACION o LISTO

### Excepciones
- La venta rapida crea el pedido directamente en estado ENTREGADO (pago inmediato, producto de vitrina)

---

## RN-004: Precios inmutables en pedidos

**Dominio:** Pedidos
**Estado:** Vigente
**Fecha:** 2026-10-07

### Descripcion
Al agregar un producto a un pedido, el precio se copia al detalle del pedido. Los cambios posteriores en el catalogo NO afectan pedidos existentes.

### Condiciones
- Cuando se agrega un producto al pedido, `detalle_pedido.precio_unitario = producto.precio` en ese momento
- El campo `detalle_pedido.precio_unitario` es inmutable despues de que el pedido pasa a CONFIRMADO
- Los descuentos se registran como campo separado, no modifican el precio unitario

### Excepciones
- En estado BORRADOR, los precios pueden actualizarse si el catalogo cambia

---

## RN-005: Merma valorizada

**Dominio:** Inventario
**Estado:** Vigente
**Fecha:** 2026-10-07

### Descripcion
Toda merma debe registrarse con su valor economico calculado a partir del costo promedio ponderado del producto al momento del registro.

### Condiciones
- Cuando se registra merma: `valor_merma = cantidad * costo_promedio_actual`
- Se debe registrar el motivo de la merma (marchitamiento, rotura, exceso de compra, otro)
- La merma disminuye el stock disponible inmediatamente

### Excepciones
- Ninguna. Toda merma debe valorizarse.

---

## RN-006: Folio consecutivo de pedidos

**Dominio:** Pedidos
**Estado:** Vigente
**Fecha:** 2026-10-07

### Descripcion
Cada pedido recibe un folio unico consecutivo sin huecos, generado por una secuencia de PostgreSQL.

### Condiciones
- Formato: `PF-NNNN` (ejemplo: PF-0001, PF-0002)
- Se genera al crear el pedido (estado BORRADOR)
- No se reutilizan folios de pedidos cancelados
- La secuencia es gestionada por PostgreSQL (`CREATE SEQUENCE`)

### Excepciones
- Ninguna. Todo pedido tiene folio, incluyendo ventas rapidas.

---

## RN-007: Descuentos con tope

**Dominio:** Pedidos
**Estado:** Vigente
**Fecha:** 2026-10-07

### Descripcion
Los descuentos se aplican manualmente por el vendedor, con un tope maximo por rol.

### Condiciones
- Rol Ventas: descuento maximo 15% del total
- Rol Admin: descuento maximo 50% del total
- El descuento se registra como monto fijo o porcentaje en el pedido
- No se aplican descuentos automaticos en V1

### Excepciones
- Admin puede override el tope con justificacion (campo de texto obligatorio)

---

## RN-008: Venta rapida de mostrador

**Dominio:** Pedidos
**Estado:** Vigente
**Fecha:** 2026-10-07

### Descripcion
La venta rapida es un flujo simplificado para ventas de mostrador donde el cliente paga y se lleva el producto inmediatamente.

### Condiciones
- No requiere registrar cliente (cliente = "Publico general" por defecto)
- El pedido se crea directamente en estado ENTREGADO
- Descuenta inventario como consumo directo (sin pasar por reserva)
- Requiere solo: producto, cantidad, metodo de pago
- Objetivo: completar en <60 segundos

### Excepciones
- Si el cliente quiere factura o requiere entrega posterior, se usa el flujo de pedido completo

---

## RN-009: Catalogo con insumos no florales

**Dominio:** Inventario
**Estado:** Vigente
**Fecha:** 2026-10-07

### Descripcion
El catalogo de productos incluye flores, follajes e insumos no florales (celotan, oasis, bases, monos, listones). Todos se manejan con el mismo modelo de datos.

### Condiciones
- Campo `categoria` con valores: `flor`, `follaje`, `insumo`
- Los insumos tienen costo fijo (no promedio ponderado)
- Los insumos pueden incluirse en recetas de productos
- Los insumos tienen merma (se registra igual que flores)

### Excepciones
- Los insumos no tienen vida util ni caducidad (no aplican alertas de vencimiento)

---

## Indice de reglas

| ID | Nombre | Dominio | Estado |
|----|--------|---------|--------|
| RN-001 | Costeo por promedio ponderado | Inventario | Vigente |
| RN-002 | Reserva vs consumo de inventario | Inventario/Pedidos | Vigente |
| RN-003 | Maquina de estados de pedido | Pedidos | Vigente |
| RN-004 | Precios inmutables en pedidos | Pedidos | Vigente |
| RN-005 | Merma valorizada | Inventario | Vigente |
| RN-006 | Folio consecutivo de pedidos | Pedidos | Vigente |
| RN-007 | Descuentos con tope | Pedidos | Vigente |
| RN-008 | Venta rapida de mostrador | Pedidos | Vigente |
| RN-009 | Catalogo con insumos no florales | Inventario | Vigente |
