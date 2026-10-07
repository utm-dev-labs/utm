# PuntoFlor MVP — 14 Pantallas

**Fecha**: 2026-10-07
**Stack**: Next.js 14 + Tailwind CSS + shadcn/ui + PWA
**Design System**: ver `puntoflor-design-system.md`

---

## Pantalla 1: Login (`/login`)

**Roles**: Todos (no autenticados)
**Proposito**: Autenticar al usuario y redirigir segun su rol.
**Layout**: Centrado vertical y horizontal. Logo PuntoFlor arriba, card de login al centro con email + password + boton. Footer con version de la app.
**Componentes**: `Card`, `Input`, `Button`, `Label`, `Form` (react-hook-form + zod).
**Acciones**: Escribir email y password, click "Iniciar sesion". Si credenciales validas: redirect a `/` con permisos segun rol. Si invalidas: toast de error.
**Estados**: Default (formulario vacio), Cargando (spinner en boton, inputs deshabilitados), Error (toast rojo "Credenciales incorrectas"), Exito (redirect).
**Datos**: email (string, requerido, formato email), password (string, requerido, min 6 chars).
**Conexion**: Redirige a Dashboard (`/`).
**Responsive**: Identico en tablet y desktop. Card max-w-sm centrada.

---

## Pantalla 2: Dashboard (`/`)

**Roles**: Todos (autenticados)
**Proposito**: Vista resumen del dia adaptada al rol.
**Layout**: Header con nombre de usuario + rol + boton logout. Grid de stat cards arriba. Tabla o lista de items relevantes abajo.
**Componentes**: `Card` (stat cards), `Badge`, `Table`, `Button`, `Skeleton`.
**Acciones**: Click en stat card navega a la seccion. Click en pedido abre detalle.
**Estados**: Cargando (skeletons en cards y tabla), Con datos (stats + lista), Vacio ("No hay actividad hoy"), Error (alert con retry).
**Datos por rol**:
- **Ventas**: Pedidos del dia (cantidad, total $), pedidos pendientes de entrega (tabla: folio, cliente, estado, hora entrega). Boton prominente "Venta rapida".
- **Inventario**: Productos con stock bajo (tabla: producto, stock actual, minimo, semaforo). Merma del dia. Lotes por vencer.
- **Admin**: Todo lo anterior unificado + total ventas del dia + comparativa vs ayer.
**Conexion**: A `/pedidos`, `/venta-rapida`, `/inventario`, `/pedidos/:id`.
**Responsive**: Desktop 3 columnas de stats, tablet 2 columnas. Tabla con scroll horizontal en tablet.

---

## Pantalla 3: Clientes (`/clientes`)

**Roles**: Admin, Ventas
**Proposito**: Gestionar cartera de clientes.
**Layout**: Header con titulo + boton "Nuevo cliente". Barra de busqueda. Tabla paginada.
**Componentes**: `Table`, `Input` (busqueda con debounce 300ms), `Button`, `Dialog` (modal crear/editar), `Form`, `Pagination`, `Badge`, `DropdownMenu` (acciones por fila).
**Acciones**: Buscar por nombre/telefono (filtro en tiempo real). Click "Nuevo" abre modal con form. Click fila abre modal edicion. Menu contextual: editar, ver pedidos.
**Estados**: Cargando (skeleton table), Vacio ("Sin clientes. Crea el primero."), Con datos (tabla paginada), Error (alert).
**Datos (columnas)**: Nombre, Telefono, Email (opcional), Direccion (opcional), Notas, Fecha registro.
**Modal**: mismos campos como inputs.
**Conexion**: Desde modal se puede ver historial de pedidos del cliente (link a `/pedidos?cliente=:id`).
**Responsive**: Desktop tabla completa. Tablet oculta columnas email y fecha, accesibles en fila expandible.

---

## Pantalla 4: Proveedores (`/proveedores`)

**Roles**: Admin, Inventario
**Proposito**: Gestionar proveedores de flores, follajes e insumos.
**Layout**: Identico a Clientes: header + busqueda + tabla + modal.
**Componentes**: `Table`, `Input`, `Button`, `Dialog`, `Form`, `Pagination`, `DropdownMenu`.
**Acciones**: Buscar por nombre. Crear/editar proveedor via modal. Ver lotes asociados.
**Estados**: Mismos que Clientes.
**Datos (columnas)**: Nombre, Contacto (persona), Telefono, Productos que surte (badges), Ultima compra.
**Modal**: nombre, contacto, telefono, email, notas.
**Conexion**: Link a lotes filtrados por proveedor (`/inventario?proveedor=:id`).
**Responsive**: Igual que Clientes.

---

## Pantalla 5: Catalogo (`/productos`)

**Roles**: Todos
**Proposito**: CRUD de productos con precios y categorias.
**Layout**: Header + filtro por categoria (tabs: Todos/Flores/Follajes/Insumos/Arreglos). Barra busqueda. Tabla. Modal crear/editar.
**Componentes**: `Tabs`, `Table`, `Input`, `Button`, `Dialog`, `Form`, `Select` (categoria), `Badge`.
**Acciones**: Filtrar por tab de categoria. Buscar por nombre. Crear/editar producto. Click en producto tipo "arreglo" muestra link a receta.
**Estados**: Cargando, Vacio por categoria ("Sin flores registradas"), Con datos, Error.
**Datos (columnas)**: Nombre, Categoria (badge color), Unidad (pieza/tallo/manojo), Precio venta, Costo unitario*, Stock actual, Estado (activo/inactivo).
> *Costo oculto para rol Ventas — columna no renderizada.
**Conexion**: A `/productos/:id/receta` (solo arreglos). A `/inventario` por producto.
**Responsive**: Desktop tabla completa. Tablet oculta costo y stock, visibles al expandir fila.

---

## Pantalla 6: Receta (`/productos/:id/receta`)

**Roles**: Admin, Inventario
**Proposito**: Definir ingredientes y cantidades de un arreglo.
**Layout**: Header con nombre del producto + precio venta. Card con tabla editable de ingredientes. Footer con costo total calculado + margen.
**Componentes**: `Card`, `Table` (editable), `Button`, `Select` (producto ingrediente), `Input` (cantidad), `Badge`.
**Acciones**: Agregar ingrediente (select producto + input cantidad). Editar cantidad inline. Eliminar ingrediente (icono trash con confirm). Guardar cambios.
**Estados**: Sin ingredientes ("Agrega el primer ingrediente"), Con ingredientes (tabla + costo total), Guardando (spinner en boton).
**Datos**: Tabla: Ingrediente (nombre), Categoria, Cantidad, Unidad, Costo unitario, Subtotal. Footer: Costo total, Precio venta, Margen (% y $).
**Conexion**: Regresa a `/productos`. Select de ingrediente filtra del catalogo.
**Responsive**: Identico. Tabla con scroll horizontal en tablet.

---

## Pantalla 7: Inventario/Stock (`/inventario`)

**Roles**: Todos
**Proposito**: Ver stock actual con semaforo de niveles.
**Layout**: Header + filtros (categoria, estado semaforo, proveedor). Tabla con indicador visual de nivel.
**Componentes**: `Table`, `Select` (filtros), `Badge` (semaforo: verde >50%, amarillo <=50%, rojo <=10%), `Button`, `Input`.
**Acciones**: Filtrar por categoria/semaforo/proveedor. Click producto expande detalle de lotes. Boton "Nuevo lote" (solo Inventario/Admin). Boton "Registrar merma" (solo Inventario/Admin).
**Estados**: Cargando, Sin productos, Con datos (semaforos visibles), Error.
**Datos (columnas)**: Producto, Categoria, Stock actual, Stock minimo, Semaforo (circulo color), Ultimo ingreso, Proveedor principal.
**Expandido**: lotes activos (fecha ingreso, cantidad restante, costo, fecha vencimiento).
**Datos por rol**: Ventas ve solo nombre, stock, semaforo (sin costos ni lotes). Inventario/Admin ven todo.
**Conexion**: A `/inventario/lotes/nuevo`, `/inventario/merma`, `/productos/:id`.
**Responsive**: Desktop tabla completa. Tablet card-list con semaforo prominente.

---

## Pantalla 8: Nuevo lote (`/inventario/lotes/nuevo`)

**Roles**: Admin, Inventario
**Proposito**: Registrar ingreso de mercancia.
**Layout**: Form vertical en card centrada (max-w-lg).
**Componentes**: `Card`, `Form`, `Select` (producto, proveedor), `Input` (cantidad, costo unitario), `DatePicker` (fecha vencimiento, opcional), `Button`, `Textarea` (notas).
**Acciones**: Seleccionar producto (combobox con busqueda). Seleccionar proveedor. Ingresar cantidad y costo unitario. Costo total se calcula automatico. Opcional: fecha vencimiento y notas. Guardar.
**Estados**: Default (form vacio), Validando (errores inline), Guardando (spinner), Exito (toast + redirect a inventario).
**Datos**: producto_id, proveedor_id, cantidad (number >0), costo_unitario (number >0), costo_total (calculado), fecha_vencimiento (date, opcional), notas (text, opcional).
**Conexion**: Redirect a `/inventario` al guardar. Links a crear producto/proveedor si no existen.
**Responsive**: Identico.

---

## Pantalla 9: Merma (`/inventario/merma`)

**Roles**: Admin, Inventario
**Proposito**: Registrar producto perdido/danado y ver historial.
**Layout**: Dos secciones: Form de registro (card arriba) + historial (tabla abajo).
**Componentes**: `Card`, `Form`, `Select` (producto), `Input` (cantidad), `Select` (motivo: marchitado/danado/exceso/otro), `Textarea` (notas), `Table`, `DatePicker` (filtro historial).
**Acciones**: Seleccionar producto, cantidad a dar de baja, motivo, notas. Guardar descuenta del stock automaticamente. Filtrar historial por fecha.
**Estados**: Form default, Guardando, Exito (toast + form se limpia + historial actualizado). Historial vacio/con datos.
**Datos historial (columnas)**: Fecha, Producto, Cantidad, Motivo (badge), Registrado por, Costo perdido ($).
**Conexion**: A `/inventario`.
**Responsive**: Desktop form e historial lado a lado. Tablet apilados verticalmente.

---

## Pantalla 10: Nuevo pedido (`/pedidos/nuevo`)

**Roles**: Admin, Ventas
**Proposito**: Crear pedido completo en wizard de 3 pasos (<3 min).
**Layout**: Stepper horizontal arriba (1.Cliente 2.Productos 3.Resumen). Contenido del paso al centro. Botones Atras/Siguiente abajo.
**Componentes**: `Stepper` (custom), `Combobox` (cliente), `Button`, `Table`, `Input`, `Select`, `Card`, `DatePicker`, `Textarea`.
**Acciones**:
- **Paso 1 — Cliente**: Buscar cliente existente (combobox) o crear nuevo (inline). Seleccionar fecha/hora de entrega. Tipo: recoger/enviar. Si envio: direccion.
- **Paso 2 — Productos**: Agregar productos del catalogo (combobox + cantidad). Lista editable. Subtotal por linea. Descuento opcional (% o $).
- **Paso 3 — Resumen**: Ver todo. Registrar pago (metodo: efectivo/tarjeta/transferencia). Notas. Confirmar.
**Estados**: Cada paso con validacion antes de avanzar. Guardando al confirmar. Exito: redirect a detalle del pedido con estado CONFIRMADO.
**Datos**: cliente_id, items [{producto_id, cantidad, precio_unitario, subtotal}], descuento, total, tipo_entrega, direccion_entrega, fecha_entrega, metodo_pago, monto_pagado, notas.
**Conexion**: A `/pedidos/:id` al confirmar. A `/clientes` para crear cliente.
**Responsive**: Desktop stepper horizontal. Tablet stepper vertical, contenido full-width.

---

## Pantalla 11: Venta rapida (`/venta-rapida`)

**Roles**: Admin, Ventas
**Proposito**: Cobrar en <60 segundos sin wizard.
**Layout**: Todo en una pantalla. Izquierda: selector de productos (grid de cards o lista con busqueda). Derecha: carrito (items + total + pago).
**Componentes**: `Input` (busqueda), `Card` (productos como botones), `Badge` (cantidad), `Button`, `Select` (metodo pago), `Dialog` (confirmacion).
**Acciones**: Buscar o click en producto para agregar al carrito (cantidad default 1, editable). Ajustar cantidades +/-. Eliminar item. Seleccionar metodo de pago. Click "Cobrar". Modal de confirmacion con total. Cliente opcional (combobox rapido).
**Estados**: Carrito vacio ("Agrega productos"), Con items (lista + total), Procesando (spinner en "Cobrar"), Exito (modal con "Venta registrada" + opcion imprimir ticket).
**Datos**: items [{producto_id, cantidad, precio}], total, metodo_pago, cliente_id (opcional). Se crea pedido con estado ENTREGADO directamente.
**Conexion**: Modal exito ofrece "Nueva venta" (limpia) o "Ver detalle" (`/pedidos/:id`).
**Responsive**: Desktop dos columnas. Tablet carrito se colapsa a panel inferior fijo con total y boton cobrar; productos ocupan pantalla completa.

---

## Pantalla 12: Detalle pedido (`/pedidos/:id`)

**Roles**: Admin, Ventas
**Proposito**: Ver informacion completa y avanzar estado del pedido.
**Layout**: Header con folio + estado (badge grande) + acciones. Dos columnas: izquierda info del pedido, derecha timeline de estados.
**Componentes**: `Card`, `Badge`, `Table`, `Button`, `Timeline` (custom), `Dialog` (confirmar cambio estado), `Separator`.
**Acciones**: Avanzar estado segun flujo (CONFIRMADO→EN_PREPARACION→LISTO→ENTREGADO). Cancelar pedido (con motivo). Registrar pago adicional. Imprimir/compartir.
**Estados**: Cargando, Con datos, Error. Botones de accion cambian segun estado actual.
**Datos**: Folio, Estado (badge color), Cliente (nombre, telefono), Fecha creacion, Fecha entrega, Tipo entrega, Direccion. Items (tabla: producto, cantidad, precio, subtotal). Descuento, Total, Pagos registrados (tabla: fecha, monto, metodo), Saldo pendiente. Timeline: historial de cambios de estado con timestamp y usuario.
**Conexion**: A `/clientes` (click nombre cliente). A `/pedidos` (breadcrumb).
**Responsive**: Desktop dos columnas. Tablet una columna, timeline debajo.

---

## Pantalla 13: Historial pedidos (`/pedidos`)

**Roles**: Admin, Ventas
**Proposito**: Consultar y filtrar todos los pedidos.
**Layout**: Header + fila de filtros + tabla paginada.
**Componentes**: `Table`, `Input` (busqueda por folio), `Select` (estado, metodo pago), `DatePicker` (rango fechas), `Badge` (estado), `Pagination`, `Button`.
**Acciones**: Buscar por folio o nombre cliente. Filtrar por estado, rango de fechas, metodo de pago. Click en fila abre detalle. Limpiar filtros.
**Estados**: Cargando, Sin resultados ("No hay pedidos con esos filtros"), Con datos, Error.
**Datos (columnas)**: Folio, Cliente, Fecha, Productos (conteo), Total, Estado (badge color: borrador=gris, confirmado=azul, preparacion=amarillo, listo=verde, entregado=verde oscuro, cancelado=rojo), Pago (completo/parcial/pendiente badge).
**Conexion**: A `/pedidos/:id`. A `/pedidos/nuevo`.
**Responsive**: Desktop tabla completa. Tablet oculta fecha y productos, filtros en sheet lateral.

---

## Pantalla 14: Corte de caja (`/reportes/ventas-dia`)

**Roles**: Admin, Ventas
**Proposito**: Resumen financiero del dia para cierre de caja.
**Layout**: Header con fecha (DatePicker para cambiar dia). Stat cards arriba (total ventas, num transacciones, ticket promedio). Desglose por metodo de pago al centro. Tabla de transacciones abajo.
**Componentes**: `Card` (stats), `DatePicker`, `Table`, `Badge`, `Separator`.
**Acciones**: Cambiar fecha para ver otro dia. Ver desglose. Opcional: imprimir reporte.
**Estados**: Cargando, Sin ventas ("No hay ventas este dia"), Con datos, Error.
**Datos**: Fecha. Stats: Total ventas ($), Numero de transacciones, Ticket promedio. Desglose: Efectivo ($, count), Tarjeta ($, count), Transferencia ($, count). Tabla: Folio, Hora, Cliente, Items, Total, Metodo pago, Estado.
**Conexion**: Click en folio abre `/pedidos/:id`.
**Responsive**: Desktop grid 3 stats + tabla. Tablet stats apilados, tabla con scroll.

---

## Mapa de navegacion

```
/login
  └→ / (Dashboard)
       ├→ /venta-rapida
       ├→ /pedidos/nuevo
       ├→ /pedidos
       │    └→ /pedidos/:id
       ├→ /clientes
       ├→ /productos
       │    └→ /productos/:id/receta
       ├→ /proveedores
       ├→ /inventario
       │    ├→ /inventario/lotes/nuevo
       │    └→ /inventario/merma
       └→ /reportes/ventas-dia
```
