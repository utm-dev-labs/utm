#!/bin/bash
# chmod +x scripts/check-secrets.sh
# Escanea archivos staged buscando secretos hardcodeados

# Obtener archivos staged (solo los que tienen contenido nuevo)
ARCHIVOS_STAGED=$(git diff --cached --name-only --diff-filter=ACM 2>/dev/null)

if [ -z "$ARCHIVOS_STAGED" ]; then
  exit 0
fi

# Patrones de secretos comunes
PATRONES=(
  'sk-[a-zA-Z0-9]{20,}'                    # OpenAI API keys
  'sk_live_[a-zA-Z0-9]+'                   # Stripe live keys
  'sk_test_[a-zA-Z0-9]+'                   # Stripe test keys
  'pk_live_[a-zA-Z0-9]+'                   # Stripe publishable live
  'pk_test_[a-zA-Z0-9]+'                   # Stripe publishable test
  'AKIA[0-9A-Z]{16}'                       # AWS Access Key ID
  'ghp_[a-zA-Z0-9]{36}'                    # GitHub personal token
  'gho_[a-zA-Z0-9]{36}'                    # GitHub OAuth token
  'github_pat_[a-zA-Z0-9_]+'              # GitHub fine-grained token
  'xoxb-[0-9]+-[0-9]+-[a-zA-Z0-9]+'      # Slack bot token
  'xoxp-[0-9]+-[0-9]+-[a-zA-Z0-9]+'      # Slack user token
  'eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}'  # JWT tokens
  'password\s*=\s*["\x27][^"\x27]+'         # password = "..."
  'PASSWORD\s*=\s*["\x27][^"\x27]+'         # PASSWORD = "..."
  'api[_-]?key\s*=\s*["\x27][^"\x27]+'     # api_key = "..."
  'API[_-]?KEY\s*=\s*["\x27][^"\x27]+'     # API_KEY = "..."
  'secret\s*=\s*["\x27][^"\x27]+'           # secret = "..."
  'SECRET\s*=\s*["\x27][^"\x27]+'           # SECRET = "..."
  'token\s*=\s*["\x27][^"\x27]{10,}'       # token = "..." (min 10 chars)
  'supabase_service_role_key'               # Supabase service role
  'sb[a-z]_[a-zA-Z0-9]{20,}'               # Supabase keys
)

ENCONTRADOS=0
REPORTE=""

for ARCHIVO in $ARCHIVOS_STAGED; do
  # Saltar archivos binarios, de lock, y el propio script
  if echo "$ARCHIVO" | grep -qE '\.(lock|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$'; then
    continue
  fi
  if [ "$ARCHIVO" = "scripts/check-secrets.sh" ]; then
    continue
  fi

  # Obtener contenido staged del archivo
  CONTENIDO=$(git diff --cached -p "$ARCHIVO" 2>/dev/null | grep '^+' | grep -v '^+++')

  for PATRON in "${PATRONES[@]}"; do
    COINCIDENCIAS=$(echo "$CONTENIDO" | grep -nE "$PATRON" 2>/dev/null || true)
    if [ -n "$COINCIDENCIAS" ]; then
      ENCONTRADOS=$((ENCONTRADOS + 1))
      REPORTE="$REPORTE\n   📄 $ARCHIVO"
      REPORTE="$REPORTE\n      Patrón: $PATRON"
      REPORTE="$REPORTE\n"
    fi
  done
done

if [ "$ENCONTRADOS" -gt 0 ]; then
  echo ""
  echo "❌ ERROR: Se detectaron posibles secretos en archivos staged."
  echo ""
  echo "   Archivos con secretos detectados:"
  echo -e "$REPORTE"
  echo ""
  echo "   ¿Qué hacer?"
  echo "     1. Mueve los secretos a variables de entorno (.env)"
  echo "     2. Usa .env.example con valores placeholder"
  echo "     3. Quita el archivo del staging: git reset HEAD <archivo>"
  echo ""
  echo "   Si es un falso positivo (ej: regex en tests), puedes:"
  echo "     git commit --no-verify"
  echo "   ⚠️  Usa --no-verify con precaución y solo si estás seguro."
  echo ""
  exit 1
fi
