# Flujo de Git — UTM Dev Labs

## Diagrama del flujo

```
  feature/login ─┐
                 │
  feature/api ───┤
                 ▼
  fix/bug-123 ──► dev ──────► main
                  │            │
                  │            │
              Desarrollo    Produccion
              (trabajo       (version
               diario)       estable)
```

### Que es cada rama?

| Rama        | Para que sirve                                         | Quien puede mergear      |
|-------------|--------------------------------------------------------|--------------------------|
| `main`      | Codigo en produccion. Siempre estable.                 | Solo el admin del equipo |
| `dev`       | Rama de desarrollo. Aqui se integra todo.              | Cualquiera con PR aprobado |
| `feature/*` | Tu rama de trabajo para una funcionalidad.             | Tu (solo para pushear)   |
| `fix/*`     | Tu rama para corregir un bug.                          | Tu (solo para pushear)   |
| `docs/*`    | Tu rama para documentacion.                            | Tu (solo para pushear)   |

---

## Rebase — OBLIGATORIO

- SIEMPRE usar rebase, NUNCA merge commits
- Antes de crear PR: `git fetch origin dev && git rebase origin/dev`
- Si hay conflictos: resolver commit por commit durante el rebase
- Para actualizar rama: `git pull --rebase origin dev`
- PROHIBIDO: `git merge`, `git pull` (sin --rebase)
- El historial debe ser LINEAL — GitHub bloqueara merge commits

---

## Flujo paso a paso

### 1. Empezar una tarea

```bash
# Actualizar dev
git checkout dev
git pull --rebase origin dev

# Crear tu rama
git checkout -b feature/mi-tarea
```

### 2. Trabajar en tu rama

```bash
# Hacer cambios, commitear
git add archivo.ts
git commit -m "feat(modulo): descripcion del cambio"

# Puedes hacer varios commits
git add otro-archivo.ts
git commit -m "feat(modulo): agregar validaciones"
```

### 3. Rebase y subir, crear PR → dev

```bash
# Rebase sobre dev antes de push
git fetch origin dev && git rebase origin/dev

# Push
git push -u origin feature/mi-tarea
```

Ve a GitHub y crea un PR apuntando a `dev`. Espera aprobacion.

### 4. De dev a main (solo admin)

Cuando dev esta estable, el admin crea un PR de `dev` hacia `main`.

---

## Resolver conflictos durante rebase

Los conflictos pasan cuando dos personas modifican el mismo archivo. No te asustes, es normal.

### Como resolverlo

1. Git pausara el rebase en el commit con conflicto.
2. **Abre el archivo** con conflicto.
3. **Decide** cual version es correcta (o combina ambas).
4. **Elimina** las marcas de conflicto (`<<<<<<<`, `=======`, `>>>>>>>`).
5. **Guarda** el archivo.
6. **Marca como resuelto** y continua:

```bash
git add archivo-con-conflicto.ts
git rebase --continue
```

7. Repite para cada commit con conflicto.

### Tips para evitar conflictos

- **Actualiza tu rama seguido**: Haz `git pull --rebase origin dev` en tu rama.
- **Trabaja en archivos distintos**: Coordinense para no editar el mismo archivo al mismo tiempo.
- **Ramas cortas**: Mientras mas tiempo pases en una rama sin mergear, mas probable es tener conflictos.

### Como actualizar tu rama con los cambios de dev

```bash
# Estando en tu rama
git checkout feature/mi-tarea
git fetch origin dev && git rebase origin/dev
# Resuelve conflictos si los hay, commit por commit
```

---

## Reglas de proteccion de ramas

### main

- **Nadie** puede hacer push directo.
- Solo se puede actualizar desde `dev` via PR.
- Requiere aprobacion del admin.
- Historial lineal obligatorio (no merge commits).

### dev

- Se puede actualizar via PR desde ramas `feature/*`, `fix/*`, `docs/*`, `chore/*`.
- Los tests deben pasar antes de mergear.
- Historial lineal obligatorio (no merge commits).

### Ramas personales (feature/*, fix/*, docs/*)

- Tu puedes hacer push libremente.
- Nadie mas deberia pushear a tu rama sin avisarte.
- Elimina tu rama despues de mergear.

---

## Resumen visual

```
Tu trabajas aqui          El equipo revisa          Admin
       │                        │                     │
       ▼                        ▼                     ▼
  feature/xxx ──PR──► dev ──────PR──────────────► main
       │               │                           │
   Tu codigo      Integracion                  Produccion
   y commits      del equipo                    estable
```

### Regla de oro

**Nunca hagas push directo a `main`.** Siempre usa ramas y PRs. Siempre rebase, nunca merge.
