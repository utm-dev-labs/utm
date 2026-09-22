# BMAD — Board de Management, Analisis y Desarrollo

Sistema para que el equipo rebote ideas, las refine colaborativamente y las convierta en tareas concretas. Todo vive en el repo para que cualquier persona o herramienta de IA pueda continuar donde otro se quedo.

## Que significa BMAD

| Etapa | Carpeta | Descripcion |
|-------|---------|-------------|
| **B**rainstorm | `brainstorm/` | Ideas crudas, sin filtro. Lo que se te ocurra, tiralo aqui. |
| **M**aduracion | `maduracion/` | Ideas que alguien empezo a refinar. Tienen mas contexto, posibles soluciones, preguntas. |
| **A**nalisis | `analisis/` | Ideas analizadas con viabilidad, impacto y esfuerzo estimado. |
| **D**esarrollo | `desarrollo/` | Ideas aprobadas y listas para implementar. Tienen issue de GitHub y responsable. |

## Flujo

```
brainstorm/ → maduracion/ → analisis/ → desarrollo/ → (implementacion) → archivo/
```

1. **Alguien tiene una idea** → crea un archivo en `brainstorm/` usando el template
2. **Alguien la refina** → mueve el archivo a `maduracion/`, agrega contexto
3. **Se analiza** → mueve a `analisis/`, se evalua viabilidad/impacto/esfuerzo
4. **Se aprueba** → mueve a `desarrollo/`, se crea issue en GitHub, se asigna
5. **Se completa o rechaza** → mueve a `archivo/` para historial

## Reglas

### Participacion
- **Cualquiera puede agregar ideas** a `brainstorm/`. No hay ideas malas.
- **Cualquiera puede continuar/refinar la idea de otro**. Ese es el punto del sistema.
- Si alguien se queda atorado, otro puede agarrar la idea y seguirle.

### Formato de archivos
- Cada idea es **un archivo markdown**
- Nombre del archivo: `YYYY-MM-DD_nombre-corto.md` (ej: `2026-09-21_sistema-notificaciones.md`)
- Usar el **TEMPLATE.md** de cada carpeta como base

### Al mover una idea de carpeta
- Mueve el archivo a la nueva carpeta
- Agrega tu entrada en la seccion **Contribuciones** al final
- No borres el contenido anterior — el historial de la idea es valioso
- Completa las secciones nuevas que pida el template de la carpeta destino

### Ideas rechazadas o completadas
- Van a `archivo/` para que quede el historial
- No se borran — siempre puede servir revisarlas despues

## Para herramientas de IA

Si eres una IA trabajando en este repo:
- Puedes leer las ideas en cualquier carpeta para entender el contexto del equipo
- Al implementar codigo relacionado a una idea BMAD, referencia el archivo
- Al crear un issue desde una idea, mueve el archivo a `desarrollo/` y agrega el link del issue
- Puedes sugerir refinamientos a ideas existentes agregando una entrada en Contribuciones
