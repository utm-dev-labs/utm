#!/bin/bash
# chmod +x scripts/check-branch.sh
# Verifica que la rama local esté actualizada con dev

RAMA_ACTUAL=$(git branch --show-current)

# ─── Bloquear si estamos en main ───
if [ "$RAMA_ACTUAL" = "main" ]; then
  echo ""
  echo "❌ ERROR: Estás en la rama '$RAMA_ACTUAL'."
  echo ""
  echo "   No debes trabajar directamente en esta rama."
  echo "   Crea una rama desde 'dev':"
  echo "     git checkout dev"
  echo "     git checkout -b feat/mi-feature"
  echo ""
  exit 1
fi

# ─── Actualizar referencia remota de dev ───
echo "📡 Actualizando referencia remota de dev..."
git fetch origin dev 2>/dev/null

if [ $? -ne 0 ]; then
  echo ""
  echo "⚠️  ADVERTENCIA: No se pudo hacer fetch de origin/dev."
  echo "   Verifica tu conexión o que el remoto esté configurado."
  echo ""
  exit 1
fi

# ─── Comparar con origin/dev ───
COMMITS_DETRAS=$(git rev-list --count "$RAMA_ACTUAL"..origin/dev 2>/dev/null)

if [ -z "$COMMITS_DETRAS" ]; then
  echo ""
  echo "⚠️  ADVERTENCIA: No se pudo comparar con origin/dev."
  echo "   Asegúrate de que la rama 'dev' exista en el remoto."
  echo ""
  exit 1
fi

if [ "$COMMITS_DETRAS" -gt 0 ]; then
  echo ""
  echo "⚠️  Tu rama '$RAMA_ACTUAL' está $COMMITS_DETRAS commit(s) detrás de 'dev'."
  echo ""
  echo "   Debes actualizar tu rama antes de continuar:"
  echo "     git fetch origin dev"
  echo "     git rebase origin/dev"
  echo ""
  echo "   Si tienes conflictos, resuélvelos uno por uno:"
  echo "     1. Edita los archivos con conflictos"
  echo "     2. git add <archivo>"
  echo "     3. git rebase --continue"
  echo ""
  exit 1
fi

echo "✅ Tu rama '$RAMA_ACTUAL' está actualizada con dev."
