# UTM Dev Labs — Instrucciones para Agentes de IA

Este archivo es leído por Codex CLI y otros agentes autónomos. Seguir estas reglas al operar en este repositorio.

## Proyecto
UTM Dev Labs — repositorio central del equipo UTM. Stack: TypeScript/Node.js, Supabase (PostgreSQL), Docker.

## Comandos
```bash
npm install          # instalar dependencias
npm run dev          # servidor de desarrollo
npm run build        # build de producción
npm run test         # ejecutar tests
npm run lint         # linter
npm run lint:fix     # corregir lint automáticamente
npm run db:migrate   # migraciones pendientes
```

## Reglas de código

### Idioma
- Código (variables, funciones, tipos): inglés
- Documentación, commits, PRs: español

### Naming
- Variables/funciones: camelCase
- Componentes/tipos: PascalCase
- Constantes: UPPER_SNAKE_CASE
- Archivos: kebab-case (ej: user-profile.tsx)

### Estilo
- Arrow functions preferidas
- `interface` sobre `type`
- Named exports, no default exports
- Imports con `@/` desde src/
- Tipar todo — prohibido `any`

## Estructura
```
src/app/             → rutas y páginas
src/components/      → componentes reutilizables
src/lib/             → utilidades
src/services/        → lógica de negocio
src/types/           → tipos e interfaces
src/hooks/           → hooks personalizados
src/tests/           → tests
supabase/migrations/ → migraciones SQL
supabase/functions/  → edge functions
```

## Git

### Branching
- main = producción
- staging = pre-producción / QA
- dev = desarrollo activo
- Ramas feature: feat/<nombre>
- Ramas fix: fix/<nombre>
- Flujo: feat/* → dev → staging → main

### Commits
Conventional commits en español:
```
<tipo>(<alcance>): <descripción>
```
Tipos válidos: feat, fix, docs, style, refactor, test, chore, perf, ci, build

Incluir co-author cuando el agente genera el commit.

## Migraciones de BD
- PROHIBIDO modificar migraciones existentes
- Crear nueva migración con timestamp: YYYYMMDDHHMMSS_descripcion.sql
- Incluir UP y DOWN
- Probar en entorno local antes de aplicar a staging/producción
- PEDIR CONFIRMACIÓN antes de ejecutar migraciones

## Testing
- Todo código nuevo DEBE tener tests
- Tests junto al código: archivo.ts → archivo.test.ts
- Coverage objetivo: 80%
- Ejecutar `npm run test` antes de declarar tarea completada

## Seguridad
- PROHIBIDO commitear secretos, tokens, API keys o credenciales
- Variables de entorno en .env (excluido en .gitignore)
- Crear .env.example con variables necesarias (sin valores reales)
- Validar inputs del usuario
- Queries parametrizadas — nunca concatenar SQL

## PRs
- Descripción clara del cambio y motivación
- Link a issue relacionado si aplica
- Tests incluidos para código nuevo
- Lint y build pasando sin errores

## Reglas para agentes autónomos
1. Leer este archivo ANTES de escribir código
2. Seguir convenciones — no inventar nuevas
3. Respetar estructura de archivos existente
4. No agregar dependencias sin justificación
5. Ejecutar lint y tests antes de terminar
6. PEDIR CONFIRMACIÓN antes de:
   - Migraciones de base de datos
   - Cambios de lógica de negocio
   - Operaciones destructivas (borrar archivos, resetear datos)
7. No crear arquitectura nueva sin aprobación
8. Commits pequeños y atómicos — un cambio lógico por commit
