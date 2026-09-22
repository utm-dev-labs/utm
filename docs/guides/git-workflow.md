# Flujo de Git — UTM Dev Labs

## Diagrama del flujo

```
  feature/login ─┐
                 │
  feature/api ───┤
                 ▼
  fix/bug-123 ──► dev ──────► staging ──────► main
                  │            │               │
                  │            │               │
              Desarrollo    Pruebas QA     Produccion
              (trabajo       (se prueba     (version
               diario)       todo junto)    estable)
```

### Que es cada rama?

| Rama        | Para que sirve                                         | Quien puede mergear      |
|-------------|--------------------------------------------------------|--------------------------|
| `main`      | Codigo en produccion. Siempre estable.                 | Solo el lead del equipo  |
| `staging`   | Pruebas antes de produccion. Aqui se detectan errores. | Lead o reviewer asignado |
| `dev`       | Rama de desarrollo. Aqui se integra todo.              | Cualquiera con PR aprobado |
| `feature/*` | Tu rama de trabajo para una funcionalidad.             | Tu (solo para pushear)   |
| `fix/*`     | Tu rama para corregir un bug.                          | Tu (solo para pushear)   |
| `docs/*`    | Tu rama para documentacion.                            | Tu (solo para pushear)   |

---

## Flujo paso a paso

### 1. Empezar una tarea

```bash
# Actualizar dev
git checkout dev
git pull origin dev

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

### 3. Subir y crear PR → dev

```bash
git push origin feature/mi-tarea
```

Ve a GitHub y crea un PR apuntando a `dev`. Espera aprobacion.

### 4. De dev a staging

Cuando el equipo decide que `dev` tiene suficientes cambios listos para probar:

```bash
git checkout staging
git pull origin staging
git merge dev
git push origin staging
```

Esto lo hace el lead del equipo o la persona asignada.

### 5. De staging a main

Despues de que todo se prueba en staging y funciona:

```bash
git checkout main
git pull origin main
git merge staging
git push origin main
```

Esto **solo** lo hace el lead del equipo.

---

## Resolver conflictos

Los conflictos pasan cuando dos personas modifican el mismo archivo. No te asustes, es normal.

### Como se ve un conflicto

Cuando intentas mergear y hay conflicto, Git marca el archivo asi:

```
<<<<<<< HEAD
// Tu codigo
const nombre = "version A";
=======
// Codigo de la otra persona
const nombre = "version B";
>>>>>>> feature/otra-rama
```

### Como resolverlo

1. **Abre el archivo** con conflicto.
2. **Decide** cual version es correcta (o combina ambas).
3. **Elimina** las marcas de conflicto (`<<<<<<<`, `=======`, `>>>>>>>`).
4. **Guarda** el archivo.
5. **Marca como resuelto** y commitea:

```bash
git add archivo-con-conflicto.ts
git commit -m "fix: resolver conflicto en archivo-con-conflicto.ts"
```

### Tips para evitar conflictos

- **Actualiza tu rama seguido**: Haz `git pull origin dev` en tu rama antes de subir cambios.
- **Trabaja en archivos distintos**: Coordinense para no editar el mismo archivo al mismo tiempo.
- **Ramas cortas**: Mientras mas tiempo pases en una rama sin mergear, mas probable es tener conflictos.

### Como actualizar tu rama con los cambios de dev

```bash
# Estando en tu rama
git checkout feature/mi-tarea
git pull origin dev
# Resuelve conflictos si los hay
```

---

## Reglas de proteccion de ramas

### main

- **Nadie** puede hacer push directo.
- Solo se puede actualizar desde `staging` via merge.
- Requiere aprobacion del lead.

### staging

- **Nadie** puede hacer push directo.
- Solo se puede actualizar desde `dev`.
- Requiere al menos 1 aprobacion.

### dev

- **Nadie** puede hacer push directo.
- Solo se puede actualizar via PR desde ramas `feature/*`, `fix/*`, `docs/*`.
- Requiere al menos 1 aprobacion en el PR.
- Los tests deben pasar antes de mergear.

### Ramas personales (feature/*, fix/*, docs/*)

- Tu puedes hacer push libremente.
- Nadie mas deberia pushear a tu rama sin avisarte.
- Elimina tu rama despues de mergear.

---

## Resumen visual

```
Tu trabajas aqui          El equipo revisa          Lead del equipo
       │                        │                        │
       ▼                        ▼                        ▼
  feature/xxx ──PR──► dev ──merge──► staging ──merge──► main
       │               │              │                  │
   Tu codigo      Integracion      Pruebas          Produccion
   y commits      del equipo       finales           estable
```

### Regla de oro

**Nunca hagas push directo a `dev`, `staging` o `main`.** Siempre usa ramas y PRs.
