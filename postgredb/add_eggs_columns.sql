-- Agregar columnas faltantes a la tabla Eggs
-- Ejecuta esto en pgAdmin Query Tool antes de insertar los datos

-- Columna isActive
ALTER TABLE "Eggs" 
ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN DEFAULT true;

-- Columna availableFrom
ALTER TABLE "Eggs" 
ADD COLUMN IF NOT EXISTS "availableFrom" TIMESTAMP;

-- Columna availableUntil
ALTER TABLE "Eggs" 
ADD COLUMN IF NOT EXISTS "availableUntil" TIMESTAMP;

-- Verificar que las columnas se agregaron correctamente
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'Eggs' 
ORDER BY ordinal_position;
