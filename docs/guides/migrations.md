# Guia de Migraciones de Base de Datos

Reglas y proceso para gestionar migraciones de base de datos en UTM Dev Labs.

## Reglas fundamentales

### 1. NUNCA modificar migraciones ya aplicadas

Una migracion que ya se ejecuto en cualquier ambiente (dev o produccion) es **inmutable**. Si necesitas corregir algo, crea una nueva migracion.

Modificar una migracion aplicada causa:
- Inconsistencia entre ambientes
- Perdida de datos potencial
- Imposibilidad de rastrear cambios

### 2. Naming convention

Las migraciones usan timestamps para garantizar orden:

```
YYYYMMDDHHMMSS_descripcion_breve.sql

Ejemplos:
20260921143000_crear_tabla_usuarios.sql
20260921150000_agregar_columna_email_verificado.sql
20260922090000_crear_indice_usuarios_email.sql
```

- Usar snake_case
- Descripcion clara de lo que hace (no "fix", no "update")
- Un cambio logico por migracion

### 3. Estructura de una migracion

```sql
-- Migracion: 20260921143000_crear_tabla_usuarios.sql
-- Autor: nombre
-- Descripcion: Crea la tabla principal de usuarios

-- UP
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- DOWN (rollback)
DROP TABLE IF EXISTS usuarios;
```

Toda migracion debe tener su seccion DOWN para rollback.

## Proceso de review

1. **Crear la migracion** en la carpeta correspondiente
2. **Probar localmente** en una base de datos limpia
3. **Incluir en el PR** junto con el codigo que la requiere
4. **Review obligatorio** por al menos un miembro del equipo
5. **Verificar rollback** ejecutando la seccion DOWN

### Checklist de review

- [ ] No modifica migraciones existentes
- [ ] Tiene seccion DOWN funcional
- [ ] Nombre sigue la convencion de timestamps
- [ ] No tiene cambios destructivos sin justificacion
- [ ] Fue probada en ambiente local

## Rollback strategy

### En desarrollo
Ejecutar la seccion DOWN de la migracion y eliminar el archivo si es necesario.

### En produccion
1. **Requiere aprobacion** del lider tecnico
2. Crear backup antes de ejecutar
3. Ejecutar en ventana de mantenimiento
4. Verificar integridad de datos
5. Monitorear la aplicacion post-rollback
6. Documentar el incidente

## Ambientes

### Desarrollo (dev)
- Libertad para crear y probar migraciones
- Base de datos local o de desarrollo compartida
- Se pueden resetear datos sin restriccion

### Produccion
- **Solo migraciones mergeadas a main**
- **Backup obligatorio** antes de cada migracion
- **Ventana de mantenimiento** para cambios destructivos (DROP, ALTER con perdida de datos)
- Monitoreo post-migracion por al menos 1 hora
- Plan de rollback verificado antes de ejecutar

## Herramientas

La herramienta de migraciones se definira segun el stack:
- Node.js: Knex, Prisma, TypeORM
- Python: Alembic, Django migrations
- Generica: Flyway, Liquibase

## Resumen

| Regla | Importancia |
|-------|-------------|
| No modificar migraciones aplicadas | Critica |
| Usar timestamps en nombres | Alta |
| Incluir seccion DOWN | Alta |
| Review antes de aplicar | Alta |
| Backup antes de produccion | Critica |
