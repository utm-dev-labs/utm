# Documentacion de API

Referencia de la API del proyecto UTM Dev Labs.

## Contenido

Esta carpeta contendra:

- **Endpoints:** Listado y descripcion de endpoints disponibles.
- **Autenticacion:** Como autenticarse contra la API.
- **Modelos:** Esquemas de request/response.
- **Ejemplos:** Llamadas de ejemplo con curl o similar.
- **Errores:** Catalogo de codigos de error y su significado.

## Formato

Cada endpoint se documenta asi:

```
## [METODO] /ruta

**Descripcion:** Que hace este endpoint.

**Autenticacion:** Requerida / Publica

**Request:**
- Headers: ...
- Body: { ... }

**Response:**
- 200: { ... }
- 400: { error: "..." }
```

## Herramientas

Considerar usar OpenAPI/Swagger para generar documentacion automatica.

## Pendiente

- [ ] Definir estructura base de la API
- [ ] Configurar generacion automatica de docs
