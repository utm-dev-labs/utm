#!/bin/bash
# chmod +x scripts/check-md-allowed.sh
# Valida que archivos .md staged estén en ubicaciones permitidas

# Archivos .md permitidos en la raíz
PERMITIDOS_RAIZ="README.md CONTRIBUTING.md CLAUDE.md AGENTS.md codex.md CHANGELOG.md"

BLOQUEADOS=0
REPORTE=""

for ARCHIVO in "$@"; do
  # Permitir cualquier .md dentro de docs/
  if echo "$ARCHIVO" | grep -qE "^docs/"; then
    continue
  fi

  # Verificar si está en la lista de permitidos en raíz
  NOMBRE=$(basename "$ARCHIVO")
  PERMITIDO=false

  for P in $PERMITIDOS_RAIZ; do
    if [ "$NOMBRE" = "$P" ]; then
      PERMITIDO=true
      break
    fi
  done

  # Si el archivo está en la raíz y es permitido, OK
  if [ "$PERMITIDO" = true ] && [ "$(dirname "$ARCHIVO")" = "." ]; then
    continue
  fi

  # Si el archivo está en la raíz y NO es permitido, bloquear
  if [ "$PERMITIDO" = false ]; then
    BLOQUEADOS=$((BLOQUEADOS + 1))
    REPORTE="$REPORTE\n   - $ARCHIVO"
  fi
done

if [ "$BLOQUEADOS" -gt 0 ]; then
  echo ""
  echo "❌ ERROR: Archivos .md no permitidos detectados:"
  echo -e "$REPORTE"
  echo ""
  echo "   Archivos .md solo se permiten en:"
  echo "     - docs/          → Documentación del proyecto"
  echo "     - README.md      → Raíz del proyecto"
  echo "     - CONTRIBUTING.md"
  echo "     - CLAUDE.md"
  echo "     - AGENTS.md"
  echo "     - codex.md"
  echo "     - CHANGELOG.md"
  echo ""
  echo "   Si tu archivo es documentación, muévelo a docs/"
  echo "   Si es temporal, agrégalo a .gitignore"
  echo ""
  exit 1
fi
