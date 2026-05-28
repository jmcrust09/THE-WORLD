-- Agregar columnas faltantes a la tabla Tasks
-- Ejecuta esto en pgAdmin Query Tool antes de insertar los datos

-- Columna task (renombrada de title en el modelo)
ALTER TABLE "Tasks" 
ADD COLUMN IF NOT EXISTS "task" VARCHAR(255);

-- Columna timestamp (ya existe en el modelo pero puede faltar en la DB)
ALTER TABLE "Tasks" 
ADD COLUMN IF NOT EXISTS "timestamp" TIMESTAMP;

-- Verificar que las columnas se agregaron correctamente
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'Tasks' 
ORDER BY ordinal_position;
