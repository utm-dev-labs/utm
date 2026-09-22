# Guia de Onboarding

Bienvenido al equipo de UTM Dev Labs. Esta guia te ayudara a configurar tu entorno y empezar a contribuir.

## 1. Requisitos previos

- [ ] Cuenta de GitHub con acceso al repositorio
- [ ] Git instalado y configurado (`git config --global user.name` y `user.email`)
- [ ] Editor de codigo (VS Code recomendado)
- [ ] Herramientas del stack (por definir)

## 2. Configuracion inicial

```bash
# Clonar el repositorio
git clone https://github.com/utm-dev-labs/utm.git
cd utm

# Instalar dependencias (segun el stack)
# npm install / pip install -r requirements.txt / etc.
```

## 3. Flujo de trabajo

1. Sincronizar con `dev`: `git pull --rebase origin dev`
2. Crear rama: `git checkout -b tipo/descripcion` (ej: `feat/login`, `fix/validacion-email`)
3. Hacer commits pequenos y descriptivos
4. Rebase antes de push: `git fetch origin dev && git rebase origin/dev`
5. Push y abrir Pull Request hacia `dev`
6. Esperar review antes de mergear

### Convenciones de commits

```
tipo: descripcion breve

Tipos: feat, fix, docs, refactor, test, chore
Ejemplo: feat: agregar autenticacion con JWT
```

## 4. Herramientas de IA

Este proyecto usa inteligencia artificial como herramienta de desarrollo. Las herramientas aprobadas son:

### Claude Code (CLI)
- Asistente de desarrollo en terminal
- Util para: generar codigo, refactorizar, escribir tests, revisar PRs
- Regla: **siempre revisar el output** antes de aceptarlo
- Configuracion: ver `.claude/` en la raiz del proyecto

### GitHub Copilot
- Autocompletado inteligente en el editor
- Util para: completar funciones, generar boilerplate

### Reglas para usar IA

1. **La IA es una herramienta, no un reemplazo.** Tu eres responsable del codigo.
2. **Revisar siempre.** No aceptes codigo generado sin entenderlo.
3. **No compartir secretos.** Nunca pegar tokens, passwords o datos sensibles en prompts.
4. **Documentar decisiones.** Si la IA sugiere una arquitectura, documentar el razonamiento en un ADR.
5. **Tests obligatorios.** El codigo generado por IA necesita tests igual que cualquier otro codigo.

## 5. Estructura del proyecto

```
utm/
├── docs/           # Toda la documentacion
├── .gitignore      # Archivos ignorados por git
└── README.md       # Punto de entrada
```

La estructura se expandira conforme se defina el stack tecnologico.

## 6. Contacto

- Reportar problemas: abrir un issue en GitHub
- Dudas generales: contactar al lider del equipo
