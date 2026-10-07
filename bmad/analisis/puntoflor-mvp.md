# PuntoFlor — Definicion de MVP via VIMAD

**Autor original**: Equipo 5
**Fecha de creacion**: 2026-10-07
**Estado**: En analisis

## Idea
PuntoFlor es un sistema interno para florerias que conecta la venta con el inventario real. Su funcion central es trazabilidad: seguir una flor desde que llega del proveedor, entra en un lote, se reserva o consume en un producto, forma parte de un pedido y finalmente se entrega o se pierde por merma.

## Problema que resuelve
- **Perdida de trazabilidad**: se compra flor en volumen, pero se usa por tallo, ramo, arreglo o paquete
- **Merma sin medir**: flores que se marchitan o rompen y cuyo costo no se cuantifica
- **Precios historicos**: las ventas no conservan el precio cobrado cuando el catalogo cambia
- **Seguridad**: empleados acceden a informacion que no les corresponde (costos de compra, proveedores)

## Usuarios afectados
| Actor | Que hace | Que no hace |
|-------|----------|-------------|
| Administrador | Gestion general, usuarios, productos, configuracion | Sin restricciones en V1 |
| Ventas | Clientes, pedidos, pagos, consultas | No ve costos de compra ni modifica inventario |
| Inventario/Taller | Proveedores, lotes, existencias, merma, preparacion | No modifica pedidos ni precios de venta |

## Metodologia de validacion: VIMAD
Se ejecuto un debate VIMAD (Virtual Intelligent Multi-Agent Debate) con 5 personas sinteticas:

| Persona | Rol | Perspectiva |
|---------|-----|-------------|
| Dona Martha | Florista duena (15 anos) | Negocio real, dolor operativo |
| Ing. Ricardo | Arquitecto de software (12 anos) | Viabilidad tecnica, complejidad |
| Valeria | Product Manager (8 anos) | Priorizacion, scope creep |
| CP Manuel | Contador de florerias | Control financiero, costeo |
| Lupita | Vendedora de mostrador (6 anos) | UX diario, velocidad |

### Hallazgos clave del debate:
1. **59 items es irreal** para un equipo universitario — consenso unanime
2. **MVP de 17 items** es el alcance viable
3. **2 items nuevos** que el backlog original no tenia: venta rapida de mostrador y corte de caja
4. **Items provisionales fuera del MVP** — no se codea lo que no se ha decidido
5. **Eventos y funerarios a V2+** — son verticales, no core del sistema

## Posible solucion tecnica
- **Stack**: TypeScript, Next.js (API Routes para logica de negocio), Supabase como DB
- **Auth**: Supabase Auth con roles en tabla de usuarios (no RLS granular en V1)
- **Inventario**: RPCs en plpgsql para operaciones atomicas (reserva, consumo, merma)
- **Estados**: Maquina de estados formal con tabla de transiciones
- **Precios**: Se copian al detalle del pedido al vender (inmutables)
- **Costeo**: Promedio ponderado, recalculado con cada entrada de lote

## Dependencias conocidas
- Cuenta de Supabase configurada
- Definir metodo de costeo (decidido: promedio ponderado)
- Definir maquina de estados de pedido
- Definir formato de folio consecutivo

## Evaluacion

| Criterio | Valor |
|----------|-------|
| **Viabilidad** | Alta (con alcance MVP de 17 items) |
| **Impacto** | Alto (resuelve dolor real de florerias) |
| **Esfuerzo estimado** | L (4 sprints x 2 semanas) |

## Riesgos identificados
- **R1**: Si el sistema es mas lento que la libreta, nadie lo usa. Mitigacion: flujo de venta rapida <60 seg, test de usabilidad.
- **R2**: Inventario inconsistente por falta de transacciones atomicas. Mitigacion: RPCs en plpgsql, nunca operar inventario desde frontend.
- **R3**: Scope creep — agregar features antes de estabilizar MVP. Mitigacion: Sprint 4 exclusivo para estabilizacion, 0 features nuevas.
- **R4**: Costeo incorrecto por no valorizar merma. Mitigacion: merma siempre registrada con costo del lote de origen.
- **R5**: Estados de pedido como spaghetti de ifs. Mitigacion: tabla de transiciones validas en base de datos.

## Decision

**Veredicto**: Aprobada

**Justificacion**: El debate VIMAD valido que el sistema resuelve un problema real. Con alcance reducido a 17 items MVP, es viable para un equipo universitario en 4 sprints. Las 5 perspectivas (negocio, tecnica, producto, financiera, usuario) coinciden en el core: inventario con trazabilidad + venta rapida + corte de caja.

## Notas adicionales
- Backlog original: `PuntoFlor_Backlog_V1_Equipo5.pdf` (59 items)
- Backlog MVP: ver `docs/business-rules/puntoflor-mvp-backlog.md`
- Reglas de negocio: ver `docs/business-rules/puntoflor-reglas.md`
- Decisiones tecnicas: ver `docs/architecture/puntoflor-decisiones.md`

---
## Contribuciones
- **Claude + VIMAD** (2026-10-07): Debate con 5 personas sinteticas para definir alcance MVP
- **Equipo 5** (2026-10-07): Documento base Backlog V1 con 59 items
