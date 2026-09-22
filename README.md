# UTM Dev Labs

<!-- Badges -->
![Build Status](https://img.shields.io/badge/build-pending-lightgrey)
![License](https://img.shields.io/badge/license-MIT-blue)
![Contributors](https://img.shields.io/badge/contributors-welcome-orange)

> Proyecto de desarrollo de software de la Universidad Tecnologica Metropolitana (UTM).

---

## Descripcion

UTM Dev Labs es el laboratorio de desarrollo de la Universidad Tecnologica Metropolitana. Este repositorio contiene el codigo fuente, documentacion y configuracion del proyecto principal.

Este proyecto utiliza **inteligencia artificial como herramienta de desarrollo** (Claude, GitHub Copilot, etc.) para acelerar el ciclo de desarrollo, mejorar la calidad del codigo y documentar decisiones tecnicas.

## Requisitos

- Git 2.30+
- Editor de codigo (VS Code recomendado)
- Stack especifico por definir (ver `docs/architecture/`)

## Instalacion

```bash
# Clonar el repositorio
git clone https://github.com/utm-dev-labs/utm.git
cd utm

# Seguir la guia de onboarding
# Ver docs/guides/onboarding.md
```

## Desarrollo

1. Crear una rama desde `main`: `git checkout -b feature/mi-feature`
2. Desarrollar y hacer commits descriptivos
3. Abrir un Pull Request hacia `main`
4. Esperar review y aprobacion

Para mas detalle, ver la [guia de onboarding](docs/guides/onboarding.md).

## Testing

```bash
# Instrucciones de testing por definir segun el stack elegido
```

## Deploy

El proceso de deploy sera documentado en `docs/guides/` una vez definida la infraestructura.

## Estructura del proyecto

```
utm/
├── docs/
│   ├── architecture/    # Decisiones y diagramas de arquitectura
│   ├── api/             # Documentacion de API
│   ├── guides/          # Guias de desarrollo
│   └── business-rules/  # Reglas de negocio del dominio
├── .gitignore
└── README.md
```

## Contribuir

1. Revisar la [guia de onboarding](docs/guides/onboarding.md)
2. Buscar o crear un issue
3. Crear una rama y trabajar en ella
4. Abrir un PR con descripcion clara
5. Responder al feedback del review

## Licencia

Por definir.
