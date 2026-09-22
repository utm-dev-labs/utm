# Reglas de Negocio

Documentacion de las reglas de negocio del dominio de UTM Dev Labs.

## Proposito

Este directorio documenta las reglas de negocio que rigen el comportamiento del sistema. Toda logica de negocio implementada en codigo debe tener su respaldo aqui.

## Formato

Cada regla de negocio se documenta asi:

```
## RN-NNN: Nombre de la regla

**Dominio:** Area funcional (ej: Usuarios, Pagos, Inscripciones)
**Estado:** Vigente | Deprecada | En revision
**Fecha:** YYYY-MM-DD
**Responsable:** Nombre

### Descripcion
Explicacion clara de la regla en lenguaje natural.

### Condiciones
- Cuando [condicion], entonces [accion/resultado]
- Si [caso especial], entonces [comportamiento alterno]

### Excepciones
- Casos donde la regla no aplica

### Implementacion
- Archivo(s): `ruta/al/archivo.ext`
- Funcion(es): `nombreFuncion()`

### Ejemplos
- Entrada: X -> Resultado esperado: Y
```

## Indice de reglas

| ID | Nombre | Dominio | Estado |
|----|--------|---------|--------|
| -- | Por definir | -- | -- |

## Lineamientos

1. **Toda regla de negocio debe estar documentada** antes o al momento de implementarla.
2. **Cambios en reglas requieren aprobacion** del responsable del dominio.
3. **No eliminar reglas**, marcarlas como deprecadas con fecha y razon.
4. **Vincular con codigo**: cada regla debe referenciar donde esta implementada.
5. **Revisar periodicamente** para detectar reglas obsoletas o contradictorias.
