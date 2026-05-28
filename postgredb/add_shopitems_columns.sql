-- Agregar columnas faltantes a la tabla ShopItems
-- Ejecuta esto en pgAdmin Query Tool antes de insertar los datos

-- Verificar que las columnas se agregaron correctamente
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'ShopItems' 
ORDER BY ordinal_position;
