@echo off
REM Script para reemplazar USER_ID_PLACEHOLDER en tasks_full.sql y pets_full.sql

if "%1"=="" (
  echo Uso: replace_user_id.bat USER_ID
  echo Ejemplo: replace_user_id.bat 1
  exit /b 1
)

set USER_ID=%1

echo Reemplazando USER_ID_PLACEHOLDER con %USER_ID%...

REM Reemplazar en tasks_full.sql
powershell -Command "(Get-Content tasks_full.sql) -replace 'USER_ID_PLACEHOLDER', '%USER_ID%' | Set-Content tasks_full.sql"
echo tasks_full.sql actualizado

REM Reemplazar en pets_full.sql
powershell -Command "(Get-Content pets_full.sql) -replace 'USER_ID_PLACEHOLDER', '%USER_ID%' | Set-Content pets_full.sql"
echo pets_full.sql actualizado

echo Listo! Ahora puedes ejecutar los archivos SQL en pgAdmin.
