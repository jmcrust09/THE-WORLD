#!/bin/bash
# Script para reemplazar USER_ID_PLACEHOLDER en tasks_full.sql y pets_full.sql

if [ -z "$1" ]; then
  echo "Uso: ./replace_user_id.sh <USER_ID>"
  echo "Ejemplo: ./replace_user_id.sh 1"
  exit 1
fi

USER_ID=$1

echo "Reemplazando USER_ID_PLACEHOLDER con $USER_ID..."

# Reemplazar en tasks_full.sql
sed -i "s/USER_ID_PLACEHOLDER/$USER_ID/g" tasks_full.sql
echo "✅ tasks_full.sql actualizado"

# Reemplazar en pets_full.sql
sed -i "s/USER_ID_PLACEHOLDER/$USER_ID/g" pets_full.sql
echo "✅ pets_full.sql actualizado"

echo "Listo! Ahora puedes ejecutar los archivos SQL en pgAdmin."
