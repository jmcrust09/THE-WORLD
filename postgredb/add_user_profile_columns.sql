-- Agregar columnas faltantes a la tabla Users
-- Ejecuta esto en pgAdmin Query Tool antes de insertar los datos

-- Columna profilePictureUrl
ALTER TABLE "Users" 
ADD COLUMN IF NOT EXISTS "profilePictureUrl" VARCHAR(500);

-- Columna isBanned
ALTER TABLE "Users" 
ADD COLUMN IF NOT EXISTS "isBanned" BOOLEAN DEFAULT false;

-- Columna banReason
ALTER TABLE "Users" 
ADD COLUMN IF NOT EXISTS "banReason" VARCHAR(500);

-- Columna bannedAt
ALTER TABLE "Users" 
ADD COLUMN IF NOT EXISTS "bannedAt" TIMESTAMP;

-- Verificar que las columnas se agregaron correctamente
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'Users' 
ORDER BY ordinal_position;
