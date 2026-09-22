# UTM Dev Labs — Instrucciones para IA

## Proyecto

UTM Dev Labs es el repositorio central de desarrollo del equipo UTM. Contiene aplicaciones, servicios y herramientas construidas por el equipo.

## Stack técnico

- **Lenguaje principal**: TypeScript / JavaScript (Node.js)
- **Base de datos**: Supabase (PostgreSQL)
- **Infraestructura**: Docker, Vercel/Netlify
- **Testing**: Vitest / Jest
- **Linter**: ESLint + Prettier

## Comandos principales

```bash
npm install          # instalar dependencias
npm run dev          # servidor de desarrollo
npm run build        # build de producción
npm run test         # ejecutar tests
npm run lint         # ejecutar linter
npm run lint:fix     # corregir errores de lint automáticamente
npm run db:migrate   # ejecutar migraciones pendientes
```

## Estructura del proyecto

```
src/
├── app/           # rutas y páginas
├── components/    # componentes reutilizables
├── lib/           # utilidades y helpers
├── services/      # lógica de negocio
├── types/         # definiciones de tipos
├── hooks/         # hooks personalizados
└── tests/         # tests unitarios e integración
supabase/
├── migrations/    # migraciones SQL (timestamps)
└── functions/     # edge functions
```

## Convenciones de código

- **Idioma del código**: inglés (variables, funciones, clases, tipos)
- **Idioma de docs/commits/PRs**: español
- **Naming**: camelCase para variables/funciones, PascalCase para componentes/tipos, UPPER_SNAKE para constantes
- **Archivos**: kebab-case (ej: `user-profile.tsx`, `auth-service.ts`)
- **Imports**: paths absolutos con alias `@/` desde `src/`
- **Tipos**: preferir `interface` sobre `type` cuando sea posible
- **Funciones**: preferir arrow functions, evitar `function` declarations
- **Exports**: named exports, evitar default exports

## Branching

| Rama | Propósito | Despliega a |
|------|-----------|-------------|
| `main` | Producción estable | Producción |
| `dev` | Desarrollo activo | Dev |
| `feat/<nombre>` | Features nuevas | — |
| `fix/<nombre>` | Correcciones | — |
| `hotfix/<nombre>` | Fixes urgentes a prod | — |

**Flujo**: `feat/*` → `dev` → `main`

## Rebase — OBLIGATORIO

- SIEMPRE usar rebase, NUNCA merge commits
- Antes de crear PR: `git fetch origin dev && git rebase origin/dev`
- Si hay conflictos: resolver commit por commit durante el rebase
- Para actualizar rama: `git pull --rebase origin dev`
- PROHIBIDO: `git merge`, `git pull` (sin --rebase)
- El historial debe ser LINEAL — GitHub bloqueará merge commits

## Commits

Conventional commits en español. Formato:

```
<tipo>(<alcance>): <descripción>

[cuerpo opcional]

[Co-Authored-By: <nombre de la IA> <email>]
```

Tipos válidos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`

Ejemplos:
```
feat(auth): agregar login con Google OAuth
fix(api): corregir timeout en endpoint de usuarios
refactor(db): simplificar queries de reportes
```

Cuando una IA genera el commit, incluir co-author:
```
Co-Authored-By: Claude <noreply@anthropic.com>
```

## Migraciones de base de datos

- **NUNCA** modificar una migración existente
- **SIEMPRE** crear una nueva migración para cambios
- Nombrar con timestamp: `YYYYMMDDHHMMSS_descripcion.sql`
- Incluir `-- UP` y `-- DOWN` en cada migración
- Probar en local antes de aplicar a producción

## Testing

- Todo código nuevo DEBE tener tests
- Mínimo: tests unitarios para funciones de negocio
- Ideal: tests de integración para endpoints/APIs
- Archivos de test junto al código: `user-service.ts` → `user-service.test.ts`
- Coverage mínimo objetivo: 80%

## Pull Requests

Toda PR debe incluir:
- [ ] Descripción clara de qué cambia y por qué
- [ ] Link al issue relacionado (si aplica)
- [ ] Tests para código nuevo
- [ ] Sin secretos ni credenciales hardcodeadas
- [ ] Lint pasando sin errores
- [ ] Build exitoso
- [ ] Revisada por al menos 1 persona

## Seguridad

- **NUNCA** commitear secretos, tokens, API keys o credenciales
- Usar archivos `.env` para variables de entorno (ya están en `.gitignore`)
- Crear `.env.example` con las variables necesarias (sin valores reales)
- Validar inputs del usuario siempre
- Usar parametrized queries, nunca concatenar SQL

## Flujo de trabajo con IA

1. Leer este archivo PRIMERO antes de escribir código
2. Seguir las convenciones definidas aquí — no inventar nuevas
3. No crear arquitectura nueva sin discutirlo con el equipo
4. Respetar la estructura de archivos existente
5. Ejecutar lint y tests antes de declarar tarea completada
6. Pedir confirmación antes de migraciones o cambios de lógica de negocio
7. No agregar dependencias sin justificación

## Reglas de ramas y rebase

- La rama local de trabajo SIEMPRE debe partir de `dev`
- NUNCA hacer push directo a `main`
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

- Antes de cada commit, la IA debe revisar que NO haya:
  * Secrets, tokens, API keys hardcodeados
  * Passwords en strings
  * URLs con credenciales
  * Archivos `.env` o similares
- Si la IA detecta un posible secret, DEBE alertar y NO commitear
- Usar variables de entorno para toda configuración sensible

## Reglas de revisión de código (para la IA como reviewer)

- Al revisar código, verificar:
  1. ¿Los tests cubren la lógica de negocio del cambio?
  2. ¿El código sigue las convenciones del proyecto?
  3. ¿Hay edge cases no cubiertos?
  4. ¿Las migraciones tienen UP y DOWN?
  5. ¿Los inputs del usuario están validados?
  6. ¿No hay secrets hardcodeados?
- Si falta algún test para lógica de negocio nueva, la IA DEBE crear el test o pedir que se cree

## Reglas de negocio

- Antes de implementar lógica de negocio, revisar `docs/business-rules/`
- Si no existe documentación de la regla, documentarla PRIMERO en `docs/business-rules/` y luego implementar
- Cambios a reglas de negocio existentes requieren confirmación explícita del usuario

## BMAD — Board de Ideas

- Las ideas del equipo estan en `bmad/`
- Flujo: `brainstorm/` → `maduracion/` → `analisis/` → `desarrollo/`
- Cualquier miembro puede continuar una idea donde otro la dejo
- Al implementar codigo relacionado a una idea BMAD, referenciar el archivo
- Al crear un issue desde una idea BMAD, mover el archivo a `desarrollo/` y agregar el link del issue
- Ideas completadas o rechazadas van a `bmad/archivo/`
