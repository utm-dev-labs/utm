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

## Reglas de ramas y rebase

- La rama local de trabajo SIEMPRE debe partir de `dev`
- NUNCA hacer push directo a main o staging
- NUNCA hacer merge commits — siempre usar rebase
- Antes de crear un PR: `git fetch origin dev && git rebase origin/dev`
- Conflictos en rebase: resolver manualmente commit por commit
- Antes de pushear: `git pull --rebase origin dev`
- Flow estricto: crear rama desde dev → trabajar → rebase sobre dev → PR a dev

## Reglas de archivos .md

- NO crear archivos .md en la raíz del proyecto sin autorización
- .md permitidos en raíz: README.md, CONTRIBUTING.md, CLAUDE.md, AGENTS.md, codex.md
- Documentación nueva va SIEMPRE en docs/
- Si necesitas documentar algo, usa la carpeta apropiada en docs/

## Reglas de seguridad reforzadas

- Antes de cada commit, el agente debe revisar que NO haya:
  * Secrets, tokens, API keys hardcodeados
  * Passwords en strings
  * URLs con credenciales
  * Archivos .env o similares
- Si se detecta un posible secret, ALERTAR y NO commitear
- Usar variables de entorno para toda configuración sensible

## Reglas de revisión de código (agente como reviewer)

- Al revisar código, verificar:
  1. ¿Los tests cubren la lógica de negocio del cambio?
  2. ¿El código sigue las convenciones del proyecto?
  3. ¿Hay edge cases no cubiertos?
  4. ¿Las migraciones tienen UP y DOWN?
  5. ¿Los inputs del usuario están validados?
  6. ¿No hay secrets hardcodeados?
- Si falta test para lógica de negocio nueva, el agente DEBE crear el test o pedir que se cree

## Reglas de negocio

- Antes de implementar lógica de negocio, revisar docs/business-rules/
- Si no existe documentación de la regla, documentarla PRIMERO en docs/business-rules/ y luego implementar
- Cambios a reglas de negocio existentes requieren confirmación explícita del usuario
