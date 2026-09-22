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
