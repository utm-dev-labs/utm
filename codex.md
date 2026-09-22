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
