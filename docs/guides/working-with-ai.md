# Trabajar con IA — Guia para el equipo

Esta guia explica como usar herramientas de IA para programar de forma segura y productiva. No necesitas experiencia previa con IA.

---

## Herramientas disponibles

### Claude Code (Terminal / CLI)

- **Que es**: Asistente de IA que trabaja directo en tu terminal. Lee tu codigo, ejecuta comandos y edita archivos.
- **Instalar**:
  ```bash
  npm install -g @anthropic-ai/claude-code
  ```
- **Usar**: Abre tu terminal en la carpeta del proyecto y escribe `claude`.
- **Importante**: Claude Code lee automaticamente los archivos de reglas del proyecto (`CLAUDE.md`, `AGENTS.md`) para entender como trabajamos.

### GitHub Copilot (VS Code)

- **Que es**: Extension de VS Code que sugiere codigo mientras escribes.
- **Instalar**: Busca "GitHub Copilot" en las extensiones de VS Code e instalala. Necesitas cuenta de GitHub con acceso a Copilot.
- **Usar**: Simplemente escribe codigo y Copilot sugiere completaciones. Presiona `Tab` para aceptar.

### Cursor (Editor)

- **Que es**: Un editor de codigo (basado en VS Code) con IA integrada.
- **Instalar**: Descarga desde [cursor.com](https://cursor.com).
- **Usar**: Abre tu proyecto y usa `Cmd+K` (Mac) o `Ctrl+K` (Windows/Linux) para pedirle cosas a la IA.

### Codex (CLI de OpenAI)

- **Que es**: Asistente de IA en terminal, similar a Claude Code pero de OpenAI.
- **Instalar**:
  ```bash
  npm install -g @openai/codex
  ```
- **Usar**: Ejecuta `codex` en tu terminal dentro del proyecto.

### Antigravity (CLI)

- **Que es**: Herramienta de IA para automatizar tareas de desarrollo.
- **Instalar**: Consulta la documentacion oficial del proyecto para instrucciones actualizadas.
- **Usar**: Ejecuta en tu terminal dentro del proyecto.

---

## Reglas de oro

Estas reglas son **obligatorias**. No importa que herramienta de IA uses.

### 1. SIEMPRE revisa el codigo antes de commitear

La IA genera codigo que **parece** correcto pero puede tener errores. Antes de hacer `git add` y `git commit`:

- Lee cada linea que la IA genero o modifico.
- Asegurate de que entiendes lo que hace.
- Si no entiendes algo, preguntale a la IA que te explique.

**Si no puedes explicar que hace el codigo, no lo commitees.**

### 2. La IA lee los archivos de reglas

El proyecto tiene archivos como `CLAUDE.md`, `AGENTS.md` y otros que le dicen a la IA como trabajar en este proyecto. Esos archivos existen porque:

- Definen convenciones de codigo.
- Establecen reglas de arquitectura.
- Evitan que la IA haga cosas que no queremos.

**No los borres ni modifiques sin consultar al equipo.**

### 3. No confies ciegamente

La IA es una herramienta, **no un reemplazo** de tu criterio. Puede:

- Inventar funciones que no existen.
- Generar codigo inseguro.
- Ignorar el contexto del proyecto.
- Dar respuestas que suenan convincentes pero son incorrectas.

**Tu eres responsable del codigo que commiteas, no la IA.**

### 4. Siempre corre tests antes de pushear

```bash
# Antes de hacer push, SIEMPRE:
npm test          # o el comando de tests del proyecto
npm run lint      # verificar formato y estilo
```

Si los tests fallan, arregla el problema antes de subir tu codigo. La IA puede ayudarte a depurar, pero verifica que la solucion sea correcta.

---

## Flujo de trabajo recomendado

Sigue estos pasos cada vez que trabajes con IA en una tarea:

### Paso 1: Crear tu rama

```bash
git checkout dev
git pull origin dev
git checkout -b feature/mi-tarea
```

### Paso 2: Describir la tarea a la IA

Se claro y especifico. Mal ejemplo vs buen ejemplo:

```
# Mal - muy vago
"Haz el login"

# Bien - especifico y con contexto
"Necesito crear un endpoint POST /api/auth/login que reciba email y
password, valide contra la base de datos, y devuelva un JWT.
Usa bcrypt para verificar la contrasena. Sigue la estructura
de los otros endpoints en src/routes/."
```

**Tips para mejores resultados:**
- Describe que quieres lograr, no solo que quieres que haga.
- Menciona archivos o carpetas relevantes.
- Especifica tecnologias o librerias que debe usar.
- Si hay restricciones, mencionaolas (ej: "sin dependencias nuevas").

### Paso 3: Revisar el codigo generado

Antes de aceptar cualquier cambio:

- Lee el codigo linea por linea.
- Verifica que sigue las convenciones del proyecto.
- Busca problemas comunes:
  - Datos sensibles hardcodeados (contrasenas, API keys).
  - Imports de librerias que no usamos.
  - Logica que no tiene sentido en nuestro contexto.
  - Codigo duplicado que ya existe en el proyecto.

### Paso 4: Correr tests

```bash
npm test
npm run lint
```

Si algo falla:
1. Lee el error con calma.
2. Puedes pedirle a la IA que lo arregle, pero revisa la solucion.
3. Vuelve a correr los tests.

### Paso 5: Commitear y crear PR

```bash
git add archivo1.ts archivo2.ts    # agrega SOLO los archivos relevantes
git commit -m "feat(auth): agregar endpoint de login con JWT"
git push origin feature/mi-tarea
```

Luego crea un PR en GitHub apuntando a `dev`.

---

## Errores comunes y como evitarlos

### "Acepte todo sin leer"

**Problema**: La IA genero mucho codigo y lo aceptaste sin revisar. Ahora hay bugs y no sabes donde.

**Solucion**: Trabaja en pasos pequenos. Pide a la IA que haga una cosa a la vez. Revisa cada paso antes de continuar.

### "La IA invento una libreria"

**Problema**: El codigo usa una funcion o libreria que no existe o que no esta instalada en el proyecto.

**Solucion**: Verifica que los imports existan. Si la IA sugiere instalar algo nuevo, consulta con el equipo primero.

### "Funciona en mi maquina pero no pasa los tests"

**Problema**: El codigo funciona manualmente pero los tests automatizados fallan.

**Solucion**: Corre los tests ANTES de hacer push. Si los tests existentes fallan por tus cambios, arregla la compatibilidad.

### "Pushe archivos sensibles"

**Problema**: La IA creo un archivo `.env` con datos reales o modifico archivos de configuracion con secrets.

**Solucion**: Revisa `git status` antes de commitear. Nunca agregues `.env`, credenciales o API keys. Usa `git add archivo1 archivo2` en vez de `git add .`.

### "No entiendo el codigo que genero"

**Problema**: La IA genero algo complejo y no sabes como funciona.

**Solucion**: Pidele que te lo explique paso a paso. Si aun no entiendes, pide una version mas simple. No commitees codigo que no entiendas.

### "La IA modifico archivos que no debia"

**Problema**: Pediste un cambio en un archivo y la IA modifico otros archivos tambien.

**Solucion**: Siempre revisa `git diff` antes de commitear. Descarta cambios no deseados con `git checkout -- archivo-no-deseado`.

---

## Preguntas frecuentes (FAQ)

### Es obligatorio usar IA?

No. La IA es una herramienta opcional. Si prefieres escribir todo a mano, esta perfecto.

### Que pasa si la IA me da codigo malo?

Nada, siempre y cuando no lo commitees. La IA se equivoca seguido. Por eso la regla numero 1 es revisar antes de commitear.

### Puedo usar la IA para hacer todo el proyecto?

Puedes usarla para ayudarte, pero debes entender cada linea que subes. En el code review te van a preguntar sobre tu codigo y debes poder explicarlo.

### Tengo que pagar por estas herramientas?

- **Claude Code**: Requiere suscripcion a Claude o API key.
- **Copilot**: Gratis para estudiantes con GitHub Student Developer Pack.
- **Cursor**: Tiene plan gratuito con limite de uso.
- **Codex**: Requiere API key de OpenAI.

### La IA puede ver mi codigo privado?

Depende de la herramienta. En general, las herramientas que corren localmente (Claude Code, Cursor) procesan tu codigo para darte respuestas. Revisa las politicas de privacidad de cada herramienta.

### Puedo usar ChatGPT o Claude en el navegador?

Si, pero es menos eficiente que las herramientas integradas al editor. Tendrias que copiar y pegar codigo manualmente. Las herramientas de esta guia se integran directo con tu proyecto.

### Como se si la IA esta siguiendo las reglas del proyecto?

Los archivos de reglas (`CLAUDE.md`, etc.) se cargan automaticamente en herramientas como Claude Code. Si usas otra herramienta, puede que necesites darle contexto manualmente (copiar las reglas relevantes).
