# UTM Dev Labs — Instrucciones para GitHub Copilot

## Contexto
Este es el repositorio UTM Dev Labs. Stack: TypeScript/Node.js, Supabase (PostgreSQL), Docker.

## Idioma
- Código: inglés (variables, funciones, tipos, clases)
- Documentación, commits, PRs: español

## Convenciones de naming
- Variables y funciones: `camelCase`
- Componentes y tipos: `PascalCase`
- Constantes: `UPPER_SNAKE_CASE`
- Archivos: `kebab-case` (ej: `user-profile.tsx`)

## Estilo de código
- Preferir arrow functions sobre function declarations
- Preferir `interface` sobre `type` cuando sea posible
- Usar named exports, evitar default exports
- Imports absolutos con alias `@/` desde `src/`
- Tipar parámetros y retornos — nunca usar `any`
- Queries SQL parametrizadas — nunca concatenar strings

## Estructura del proyecto
```
src/app/           → rutas y páginas
src/components/    → componentes reutilizables
src/lib/           → utilidades y helpers
src/services/      → lógica de negocio
src/types/         → tipos e interfaces
src/hooks/         → hooks personalizados
src/tests/         → tests
supabase/migrations/ → migraciones SQL
supabase/functions/  → edge functions
```

## Testing
- Todo código nuevo debe tener tests
- Tests junto al código fuente: `archivo.ts` → `archivo.test.ts`
- Coverage objetivo: 80%

## Seguridad
- NUNCA sugerir código con secretos, tokens o API keys hardcodeados
- Usar variables de entorno via `process.env`
- Validar inputs del usuario siempre

## Git
- Commits: conventional commits en español (`feat(auth): agregar login OAuth`)
- Ramas: `feat/*`, `fix/*`, `hotfix/*`
- Flujo: feat → dev → staging → main

## Migraciones
- NUNCA modificar migraciones existentes
- Nuevas migraciones con timestamp: `YYYYMMDDHHMMSS_descripcion.sql`

## Al generar código
- Seguir las convenciones de este archivo
- Respetar la estructura de archivos existente
- No agregar dependencias sin justificación
- Incluir manejo de errores apropiado
- Preferir soluciones simples y legibles

## Reglas de ramas y rebase

- La rama local de trabajo SIEMPRE debe partir de `dev`
- NUNCA hacer push directo a `main` o `staging`
- NUNCA hacer merge commits — siempre usar rebase
- Antes de crear un PR, hacer `git fetch origin dev && git rebase origin/dev`
- Si hay conflictos en rebase, resolverlos manualmente commit por commit
- Comando de rebase: `git pull --rebase origin dev` antes de pushear
- Flow estricto: crear rama desde dev → trabajar → rebase sobre dev → PR a dev

## Reglas de archivos .md

- NO crear archivos `.md` en la raíz del proyecto sin autorización
- Los `.md` permitidos en raíz son: `README.md`, `CONTRIBUTING.md`, `CLAUDE.md`, `AGENTS.md`, `codex.md`
- Documentación nueva va SIEMPRE en `docs/`
- Si necesitas documentar algo, usa la carpeta apropiada en `docs/`

## Reglas de seguridad reforzadas

- Antes de cada commit, verificar que NO haya:
  * Secrets, tokens, API keys hardcodeados
  * Passwords en strings
  * URLs con credenciales
  * Archivos `.env` o similares
- Si se detecta un posible secret, alertar y NO commitear
- Usar variables de entorno para toda configuración sensible

## Reglas de revisión de código (IA como reviewer)

- Al revisar código, verificar:
  1. ¿Los tests cubren la lógica de negocio del cambio?
  2. ¿El código sigue las convenciones del proyecto?
  3. ¿Hay edge cases no cubiertos?
  4. ¿Las migraciones tienen UP y DOWN?
  5. ¿Los inputs del usuario están validados?
  6. ¿No hay secrets hardcodeados?
- Si falta algún test para lógica de negocio nueva, DEBE crearse o pedirse que se cree

## Reglas de negocio

- Antes de implementar lógica de negocio, revisar `docs/business-rules/`
- Si no existe documentación de la regla, documentarla PRIMERO en `docs/business-rules/` y luego implementar
- Cambios a reglas de negocio existentes requieren confirmación explícita del usuario
