# UTM Dev Labs — Instrucciones para Codex / ChatGPT

## Proyecto
UTM Dev Labs es el repositorio central de desarrollo del equipo UTM. Stack principal: TypeScript/Node.js, Supabase (PostgreSQL), Docker.

## Reglas de código

### Idioma
- Código (variables, funciones, tipos, clases): **inglés**
- Documentación, commits, PRs: **español**

### Naming
- Variables/funciones: `camelCase`
- Componentes/tipos: `PascalCase`
- Constantes: `UPPER_SNAKE_CASE`
- Archivos: `kebab-case` (ej: `user-profile.tsx`)

### Estilo
- Arrow functions preferidas
- `interface` sobre `type` cuando sea posible
- Named exports, evitar default exports
- Imports absolutos con `@/` desde `src/`
- Tipar todo — nunca usar `any`

## Estructura de archivos
```
src/app/           → rutas y páginas
src/components/    → componentes reutilizables
src/lib/           → utilidades y helpers
src/services/      → lógica de negocio
src/types/         → tipos e interfaces
src/hooks/         → hooks personalizados
src/tests/         → tests
supabase/migrations/ → migraciones SQL (timestamp)
supabase/functions/  → edge functions
```

## Branching y Git
- **main**: producción
- **staging**: pre-producción / QA
- **dev**: desarrollo activo
- Features: `feat/<nombre>`, fixes: `fix/<nombre>`
- Flujo: `feat/*` → `dev` → `staging` → `main`

## Commits
Conventional commits en español:
```
<tipo>(<alcance>): <descripción>
```
Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`

## Migraciones de BD
- **NUNCA** modificar una migración existente
- Crear nueva migración: `YYYYMMDDHHMMSS_descripcion.sql`
- Incluir secciones UP y DOWN
- Probar localmente antes de aplicar

## Testing
- Todo código nuevo requiere tests
- Archivo de test junto al código: `archivo.ts` → `archivo.test.ts`
- Coverage objetivo: 80%

## Seguridad
- **NUNCA** incluir secretos, tokens o API keys en código
- Variables de entorno en `.env` (excluido en `.gitignore`)
- Siempre validar inputs del usuario
- Queries parametrizadas — nunca concatenar SQL

## Pull Requests
- Descripción clara del cambio y por qué
- Link a issue relacionado
- Tests incluidos
- Lint y build pasando

## Instrucciones generales
1. Seguir estas convenciones — no inventar nuevas
2. Respetar la estructura existente
3. No agregar dependencias innecesarias
4. Pedir confirmación antes de migraciones o cambios de lógica de negocio
5. Verificar que el código compila y los tests pasan

## Reglas de ramas y rebase

- La rama local de trabajo SIEMPRE debe partir de `dev`
- NUNCA hacer push directo a `main` o `staging`
- NUNCA hacer merge commits — siempre usar rebase
- Antes de crear un PR: `git fetch origin dev && git rebase origin/dev`
- Conflictos en rebase: resolver manualmente commit por commit
- Antes de pushear: `git pull --rebase origin dev`
- Flow estricto: crear rama desde dev → trabajar → rebase sobre dev → PR a dev

## Reglas de archivos .md

- NO crear archivos `.md` en la raíz del proyecto sin autorización
- `.md` permitidos en raíz: `README.md`, `CONTRIBUTING.md`, `CLAUDE.md`, `AGENTS.md`, `codex.md`
- Documentación nueva va SIEMPRE en `docs/`
- Si necesitas documentar algo, usa la carpeta apropiada en `docs/`

## Reglas de seguridad reforzadas

- Antes de cada commit, verificar que NO haya:
  * Secrets, tokens, API keys hardcodeados
  * Passwords en strings
  * URLs con credenciales
  * Archivos `.env` o similares
- Si se detecta un posible secret, ALERTAR y NO commitear
- Usar variables de entorno para toda configuración sensible

## Reglas de revisión de código (IA como reviewer)

- Al revisar código, verificar:
  1. ¿Los tests cubren la lógica de negocio del cambio?
  2. ¿El código sigue las convenciones del proyecto?
  3. ¿Hay edge cases no cubiertos?
  4. ¿Las migraciones tienen UP y DOWN?
  5. ¿Los inputs del usuario están validados?
  6. ¿No hay secrets hardcodeados?
- Si falta test para lógica de negocio nueva, DEBE crearse o pedirse que se cree

## Reglas de negocio

- Antes de implementar lógica de negocio, revisar `docs/business-rules/`
- Si no existe documentación de la regla, documentarla PRIMERO en `docs/business-rules/` y luego implementar
- Cambios a reglas de negocio existentes requieren confirmación explícita del usuario
