# Guia de Code Review — UTM Dev Labs

El code review es cuando un companero revisa tu codigo antes de mergearlo. Sirve para encontrar errores, mejorar la calidad y aprender entre todos.

---

## Como funciona

1. Tu creas un PR en GitHub.
2. Asignas al menos **1 reviewer** (companero del equipo).
3. El reviewer revisa tu codigo y deja comentarios.
4. Tu respondes y haces los cambios necesarios.
5. El reviewer aprueba.
6. Mergeas a `dev`.

---

## Para el reviewer: que revisar

### Funcionalidad

- El codigo hace lo que dice el PR?
- Maneja casos limite (datos vacios, errores, valores inesperados)?
- No rompe funcionalidad existente?

### Legibilidad

- Los nombres de variables y funciones son claros?
- Se entiende la logica sin necesidad de explicacion adicional?
- Hay comentarios donde son necesarios (logica compleja)?

### Seguridad

- No hay contrasenas, API keys o secrets en el codigo?
- Los inputs del usuario se validan y sanitizan?
- No hay vulnerabilidades obvias (inyeccion SQL, XSS, etc.)?

### Calidad

- Sigue las convenciones del proyecto?
- No hay codigo duplicado que podria reutilizarse?
- No hay codigo comentado que deberia eliminarse?
- Los imports son correctos y necesarios?

### Tests

- Se agregaron tests para la nueva funcionalidad?
- Los tests existentes siguen pasando?
- Los tests cubren casos importantes (exito, error, limite)?

### Si se uso IA

- El autor del PR entiende el codigo que subio?
- No hay librerias o funciones inventadas por la IA?
- No se subieron archivos innecesarios generados por la IA?

---

## Checklist del reviewer

Copia esta lista y marcala mentalmente mientras revisas:

```
- [ ] El PR tiene descripcion clara de que cambia y por que
- [ ] El codigo compila/funciona sin errores
- [ ] Los tests pasan
- [ ] No hay secrets ni datos sensibles
- [ ] Los nombres son descriptivos y consistentes
- [ ] No hay codigo muerto o comentado sin razon
- [ ] Los cambios estan dentro del alcance del PR (no hay cambios extra)
- [ ] La logica es correcta y maneja errores
- [ ] Sigue las convenciones del proyecto
```

---

## Como dar feedback constructivo

### Reglas basicas

1. **Comenta sobre el codigo, no sobre la persona.**
2. **Se especifico.** Di exactamente que cambiar y por que.
3. **Sugiere, no ordenes** (a menos que sea un error real).
4. **Reconoce lo bueno** cuando lo veas.

### Ejemplos

**Mal feedback:**
```
"Esto esta mal."
"No me gusta como lo hiciste."
"???"
```

**Buen feedback:**
```
"Este nombre de variable no es descriptivo. Sugiero cambiarlo de
`d` a `fechaCreacion` para que sea mas claro."

"Esta consulta a la BD podria ser lenta con muchos registros.
Podriamos agregar un indice o usar paginacion."

"Buen trabajo separando la logica en funciones pequenas."
```

### Tipos de comentarios

Usa prefijos para que quede claro que tan importante es tu comentario:

| Prefijo       | Significado                                      |
|---------------|--------------------------------------------------|
| `blocker:`    | Debe corregirse antes de mergear.                |
| `suggestion:` | Mejora opcional, no bloquea el merge.            |
| `question:`   | Tengo una duda, explicame.                       |
| `nit:`        | Detalle menor (typo, formato). No bloquea nada.  |

**Ejemplo:**
```
blocker: Esta funcion no maneja el caso cuando el usuario no existe.
Va a lanzar un error en produccion.

suggestion: Podrias extraer esta logica en una funcion helper para
reutilizarla en otros endpoints.

nit: Falta un punto y coma en la linea 42.
```

---

## Aprobaciones necesarias

| Destino     | Aprobaciones minimas | Quien puede aprobar         |
|-------------|----------------------|-----------------------------|
| → `dev`     | 1                    | Cualquier miembro del equipo |
| → `staging` | 1                    | Lead o reviewer senior       |
| → `main`    | 2                    | Lead + al menos 1 mas        |

---

## Para el autor del PR

### Antes de pedir review

- Corre los tests y verifica que pasen.
- Revisa tu propio codigo primero (`git diff`).
- Asegurate de que el PR tiene titulo y descripcion claros.
- Elimina codigo de debug (`console.log`, `print`, etc.).
- Verifica que no subiste archivos innecesarios.

### Cuando recibes feedback

- **No lo tomes personal.** El review es sobre el codigo, no sobre ti.
- **Responde a cada comentario.** Aunque sea "Corregido" o "De acuerdo".
- **Si no estas de acuerdo**, explica tu razonamiento. El dialogo es sano.
- **Haz los cambios** y pushea a la misma rama. El PR se actualiza solo.

```bash
# Despues de hacer los cambios solicitados
git add archivos-modificados.ts
git commit -m "fix(auth): aplicar cambios del code review"
git push origin feature/mi-tarea
```

---

## Tiempos esperados

- **Pedir review**: Hazlo en cuanto tu PR este listo. No esperes.
- **Hacer review**: Intenta revisar los PRs de tus companeros en **menos de 24 horas**.
- **Aplicar cambios**: Despues de recibir feedback, aplica los cambios lo antes posible.

Un PR abierto mucho tiempo acumula conflictos. Mientras mas rapido se revisa y mergea, mejor.
