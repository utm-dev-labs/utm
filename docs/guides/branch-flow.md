# Flujo de Ramas — UTM Dev Labs

## Resumen

El proyecto usa un flujo de ramas con dos ambientes: **dev** (desarrollo) y **main** (produccion).
Solo el admin (`canulcua123-source`) puede aprobar merges a `main`.

---

## Diagrama del flujo

```
  feat/mi-feature ──┐
  fix/bug-login ────┤
  docs/readme ──────┼──> dev ──────> main
  chore/deps ───────┘     ^           ^
                          |           |
                     CI pasa     Solo admin
                     merge libre aprueba y mergea

  hotfix/urgente ─────────────────────┘
                    (directo a main, solo urgencias)
```

---

## Rebase — OBLIGATORIO

- SIEMPRE usar rebase, NUNCA merge commits
- Antes de crear PR: `git fetch origin dev && git rebase origin/dev`
- Si hay conflictos: resolver commit por commit durante el rebase
- Para actualizar rama: `git pull --rebase origin dev`
- PROHIBIDO: `git merge`, `git pull` (sin --rebase)
- El historial debe ser LINEAL — GitHub bloqueara merge commits

---

## Paso a paso para el equipo

### 1. Crear tu rama desde dev

```bash
git checkout dev
git pull --rebase
git checkout -b feat/mi-feature
```

### 2. Trabajar y commitear

```bash
git add .
git commit -m "feat: descripcion del cambio"
```

### 3. Rebase antes de push

```bash
git fetch origin dev && git rebase origin/dev
```

### 4. Push y crear PR hacia dev

```bash
git push -u origin feat/mi-feature
```

Luego crear el Pull Request en GitHub apuntando a `dev`.

### 5. CI pasa, se mergea a dev

El CI (lint, tests, build) debe pasar. Una vez verde, se mergea.

### 6. Promocion a main (solo admin)

Cuando dev esta estable, el admin crea un PR de `dev` hacia `main`.
Este es el unico camino a produccion (excepto hotfixes).

---

## Hotfixes (correcciones urgentes)

Para bugs criticos en produccion:

```bash
git checkout main
git pull --rebase
git checkout -b hotfix/descripcion-del-bug
# ... fix ...
git push -u origin hotfix/descripcion-del-bug
```

Crear PR directo a `main`. Solo para emergencias.

---

## Quien puede hacer que

| Accion                          | Devs del equipo | Admin (canulcua123-source) |
|---------------------------------|:---------------:|:--------------------------:|
| Crear ramas feat/fix/docs/chore | Si              | Si                         |
| PR hacia dev                    | Si              | Si                         |
| Aprobar/mergear PR en dev       | Si              | Si                         |
| PR de dev hacia main            | No              | Si                         |
| Aprobar/mergear PR en main      | No              | Si                         |
| Crear hotfix/* hacia main       | Si (crear PR)   | Si (aprobar y mergear)     |
| Force push                      | No (bloqueado)  | No (bloqueado)             |
| Eliminar ramas protegidas       | No (bloqueado)  | No (bloqueado)             |

---

## Prefijos de ramas permitidos

| Prefijo    | Uso                        | Destino |
|------------|----------------------------|---------|
| `feat/`    | Nueva funcionalidad        | dev     |
| `fix/`     | Correccion de bug          | dev     |
| `docs/`    | Cambios en documentacion   | dev     |
| `chore/`   | Mantenimiento, deps, CI    | dev     |
| `hotfix/`  | Correccion urgente en prod | main    |

---

## Reglas de proteccion de ramas

| Rama    | CI requerido | PR requerido | Aprobaciones | Linear history | Restriccion de push |
|---------|:------------:|:------------:|:------------:|:--------------:|---------------------|
| main    | Si           | Si           | 1            | Si             | Solo admin          |
| dev     | Si           | No           | 0            | Si             | Abierto             |
