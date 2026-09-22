# Guia de Contribucion — UTM Dev Labs

## Primeros pasos

### 1. Clonar el repositorio

```bash
git clone https://github.com/UTM-Dev-Labs/proyecto.git
cd proyecto
```

### 2. Configurar tu entorno

```bash
# Cambiarte a la rama de desarrollo
git checkout dev

# Instalar dependencias (ajustar segun el proyecto)
npm install
```

---

## Flujo de trabajo

### Crear una rama

**Siempre** crea tu rama desde `dev`, nunca desde `main`.

```bash
# Asegurate de estar en dev y actualizado
git checkout dev
git pull origin dev

# Crear tu rama
git checkout -b feature/mi-nueva-funcionalidad
```

### Nombres de ramas

Usa este formato: `tipo/descripcion-corta`

| Tipo        | Cuando usarlo                        | Ejemplo                        |
|-------------|--------------------------------------|--------------------------------|
| `feature/`  | Nueva funcionalidad                  | `feature/login-google`         |
| `fix/`      | Corregir un bug                      | `fix/error-formulario`         |
| `docs/`     | Documentacion o guias                | `docs/agregar-readme`          |
| `refactor/` | Mejorar codigo sin cambiar funcion   | `refactor/limpiar-utils`       |
| `test/`     | Agregar o mejorar tests              | `test/cobertura-auth`          |

---

## Commits

Usamos **Conventional Commits**. Cada mensaje de commit sigue este formato:

```
tipo(alcance): descripcion breve
```

### Tipos de commit

| Tipo       | Uso                                  |
|------------|--------------------------------------|
| `feat`     | Nueva funcionalidad                  |
| `fix`      | Correccion de bug                    |
| `docs`     | Cambios en documentacion             |
| `style`    | Formato (espacios, comas, etc.)      |
| `refactor` | Reestructurar codigo sin cambiar funcion |
| `test`     | Agregar o corregir tests             |
| `chore`    | Tareas de mantenimiento              |

### Ejemplos

```bash
git commit -m "feat(auth): agregar login con Google"
git commit -m "fix(api): corregir error 500 en endpoint de usuarios"
git commit -m "docs(readme): actualizar instrucciones de instalacion"
```

### Reglas

- Escribe en **minusculas** y en **imperativo** ("agregar", no "agregado" ni "agrega").
- Maximo 72 caracteres en la primera linea.
- Si necesitas explicar mas, deja una linea en blanco y escribe el cuerpo:

```
feat(api): agregar paginacion a listado de productos

Se agrega soporte para paginacion con limit y offset.
El valor por defecto es 20 elementos por pagina.
```

---

## Pull Requests (PR)

### Como crear un PR

1. **Sube tu rama** al repositorio remoto:

```bash
git push origin feature/mi-nueva-funcionalidad
```

2. **Ve a GitHub** y haz clic en "Compare & pull request".

3. **Llena la informacion**:
   - **Titulo**: Breve y descriptivo (ej: "Agregar login con Google").
   - **Descripcion**: Explica que hiciste y por que. Incluye:
     - Que problema resuelve
     - Como lo probaste
     - Capturas de pantalla si aplica
   - **Base branch**: Siempre apunta a `dev` (no a `main`).

4. **Asigna reviewers**: Al menos 1 companero del equipo.

### Plantilla de PR

```markdown
## Que cambia este PR?
- Breve descripcion de los cambios

## Por que?
- Contexto o issue relacionado

## Como probarlo?
1. Paso 1
2. Paso 2

## Checklist
- [ ] Mi codigo sigue las convenciones del proyecto
- [ ] Agregue tests para los cambios
- [ ] Todos los tests pasan
- [ ] Actualice la documentacion si fue necesario
```

---

## Code Review

### Como funciona

1. Creas tu PR apuntando a `dev`.
2. Asignas al menos **1 reviewer**.
3. El reviewer revisa el codigo y deja comentarios.
4. Tu respondes a los comentarios y haces los cambios necesarios.
5. Cuando el reviewer aprueba, puedes mergear.

### Que se revisa

- El codigo funciona y resuelve el problema.
- No hay bugs obvios.
- El codigo es legible y sigue las convenciones.
- Los tests pasan.
- No se suben archivos innecesarios (`.env`, `node_modules`, etc.).

Ver la guia completa en [`docs/guides/code-review.md`](docs/guides/code-review.md).

---

## Mergear

### Reglas

- **Solo mergea a `dev`** despues de al menos 1 aprobacion.
- Usa **Squash and Merge** para mantener el historial limpio.
- **Elimina la rama** despues de mergear (GitHub lo ofrece automaticamente).
- **Nunca** hagas push directo a `main` o `dev`.

### Pasos

1. Verifica que tu PR tiene al menos 1 aprobacion.
2. Verifica que no hay conflictos. Si los hay, resuelvelos primero.
3. Haz clic en **"Squash and merge"**.
4. Elimina la rama remota.
5. En tu maquina local:

```bash
git checkout dev
git pull origin dev
git branch -d feature/mi-nueva-funcionalidad
```

---

## Resumen rapido

```
1. git checkout dev && git pull
2. git checkout -b feature/mi-cosa
3. Trabajar, commitear con conventional commits
4. git push origin feature/mi-cosa
5. Crear PR en GitHub → apuntar a dev
6. Esperar review y aprobacion
7. Squash and merge
8. Eliminar rama
```
