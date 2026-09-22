#!/bin/bash
# chmod +x scripts/check-rebase.sh
# Verifica que la rama esté rebaseada sobre dev (sin commits de merge)

RAMA_ACTUAL=$(git branch --show-current)

# Saltar verificación para dev y main
if [ "$RAMA_ACTUAL" = "dev" ] || [ "$RAMA_ACTUAL" = "main" ]; then
  exit 0
fi

# Buscar commits de merge entre dev y la rama actual
MERGE_COMMITS=$(git log dev.."$RAMA_ACTUAL" --merges --oneline 2>/dev/null)

if [ -n "$MERGE_COMMITS" ]; then
  echo ""
  echo "⚠️  ADVERTENCIA: Tu rama '$RAMA_ACTUAL' tiene commits de merge."
  echo ""
  echo "   Commits de merge detectados:"
  echo "$MERGE_COMMITS" | sed 's/^/     /'
  echo ""
  echo "   En este proyecto usamos rebase para mantener un historial limpio."
  echo ""
  echo "   Para limpiar tu rama:"
  echo "     git rebase dev"
  echo ""
  echo "   Si ya hiciste push de los merges:"
  echo "     git rebase dev"
  echo "     git push --force-with-lease"
  echo ""
  echo "   ¿Por qué rebase en vez de merge?"
  echo "     - El historial queda lineal y fácil de leer"
  echo "     - Los code reviews son más claros"
  echo "     - Es más fácil encontrar bugs con git bisect"
  echo ""
  exit 1
fi

echo "✅ Rama '$RAMA_ACTUAL' tiene historial limpio (sin merges)."
