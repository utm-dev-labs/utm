# Reglas de Protección de Ramas — UTM Dev Labs

Configurar manualmente en GitHub: Settings → Branches → Branch protection rules.

---

## `main` (producción)

| Regla | Valor |
|---|---|
| Require a pull request before merging | Si |
| Required approving reviews | 1 mínimo |
| Dismiss stale pull request approvals | Si |
| Require status checks to pass (CI) | Si |
| Require branches to be up to date | Si |
| Require conversation resolution | Si |
| Require linear history | Si |
| Do not allow force pushes | Si |
| Do not allow deletions | Si |
| Restrict who can push (solo via PR) | Si |

---

## `dev` (desarrollo)

| Regla | Valor |
|---|---|
| Require status checks to pass (CI) | Si |
| Require branches to be up to date | Si |
| Require linear history | Si |
| Do not allow force pushes | Si |
| Do not allow deletions | Si |

---

## Flujo de ramas

```
feature/* → dev → main
hotfix/*  → main (con PR y aprobación)
```

## Status checks requeridos

El check `CI` (definido en `.github/workflows/ci.yml`) debe pasar antes de mergear en cualquier rama protegida.
