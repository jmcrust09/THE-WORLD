# Sistema Interactivo de Gestión de Tienda

## Archivos SQL Disponibles

### Datos Completos (de los archivos JSON)
- `eggs_full.sql` - 14 huevos (del shopitems.json)
- `shopitems_full.sql` - 11 items (comidas y pociones del shopitems.json)
- `users_full.sql` - 2 usuarios (del users.json)
- `tasks_full.sql` - 9 tareas (del activities.json)
- `pets_full.sql` - 16 mascotas (del pets.json)

### Datos de Ejemplo
- `eggs_sample.sql` - Ejemplos básicos de huevos
- `shopitems_sample.sql` - Ejemplos básicos de items

## Estructura de Tablas

### Eggs (Huevos)
- `id`: ID único
- `name`: Nombre del huevo
- `type`: Siempre 'egg'
- `cost`: Costo en puntos
- `description`: Descripción
- `icon`: Icono de Font Awesome
- `cssClass`: Clases CSS
- `probabilities`: JSON con probabilidades de rareza
- `isEvent`: Boolean (true si es de evento)
- `isActive`: Boolean (true si aparece en tienda)
- `availableFrom`: Fecha inicio (opcional)
- `availableUntil`: Fecha fin (opcional)

### ShopItems (Comidas, Pociones, Temas)
- `id`: ID único
- `name`: Nombre del item
- `type`: 'food', 'potion', o 'theme'
- `cost`: Costo en puntos
- `description`: Descripción
- `icon`: Icono de Font Awesome
- `cssClass`: Clases CSS
- `expValue`: Valor de EXP (para comidas)
- `effect`: Efecto (para pociones/temas)

### Users
- `id`: ID único
- `username`: Nombre de usuario
- `email`: Email
- `passwordHash`: Hash de contraseña (bcrypt)
- `totalPoints`: Puntos totales
- `currentStreak`: Racha actual
- `bestStreak`: Mejor racha
- `bonusMultiplier`: Multiplicador de bonus
- `isAdmin`: Boolean (true si es admin)
- `isGuest`: Boolean (true si es invitado)
- `lastTaskDate`: Fecha de última tarea
- `createdAt`: Fecha creación
- `updatedAt`: Fecha actualización

### Tasks
- `id`: ID único
- `userId`: ID del usuario (FOREIGN KEY)
- `day`: Día de la semana
- `schedule`: Horario (mañana, tarde, noche)
- `task`: Descripción de la tarea
- `category`: Categoría
- `priority`: Prioridad
- `completed`: Boolean (completada)
- `pointsEarned`: Puntos ganados
- `createdAt`: Fecha creación
- `updatedAt`: Fecha actualización

### Pets
- `id`: ID único
- `userId`: ID del usuario (FOREIGN KEY)
- `species`: Especie
- `name`: Nombre
- `rarity`: Rareza
- `stage`: Etapa (huevo, bebe, joven, adulto, ascendido, evolucionado)
- `pointsAccumulated`: Puntos acumulados
- `eggOrigin`: Origen del huevo
- `isFavorite`: Boolean (favorita)
- `hatchedAt`: Fecha de eclosión
- `createdAt`: Fecha creación
- `updatedAt`: Fecha actualización

## Cómo Usar

### Paso 1: Insertar Usuarios
```sql
-- Ejecuta users_full.sql en pgAdmin
-- NOTA: Los passwordHash son falsos. Recomiendo crear usuarios desde la interfaz de registro.
```

### Paso 2: Obtener ID de Usuario
```sql
-- Ejecuta esto para obtener el ID del usuario que usarás para tasks y pets
SELECT id FROM "Users" WHERE username = 'Jugador_Maestro';
-- Copia el ID resultante
```

### Paso 3: Reemplazar Placeholder en Tasks y Pets

**Opción A - Manual:**
```bash
# Abre tasks_full.sql y pets_full.sql
# Reemplaza USER_ID_PLACEHOLDER con el ID real del usuario
# Por ejemplo: USER_ID_PLACEHOLDER -> 1
```

**Opción B - Automático (Windows):**
```bash
# Ejecuta el script batch
replace_user_id.bat 1
```

**Opción C - Automático (Linux/Mac):**
```bash
# Ejecuta el script bash
chmod +x replace_user_id.sh
./replace_user_id.sh 1
```

### Paso 4: Insertar Datos
```sql
-- Ejecuta en orden:
-- 1. eggs_full.sql (huevos)
-- 2. shopitems_full.sql (comidas/pociones)
-- 3. users_full.sql (usuarios)
-- 4. tasks_full.sql (tareas - después de reemplazar placeholder)
-- 5. pets_full.sql (mascotas - después de reemplazar placeholder)
```

### Opción: Panel Admin (Interfaz Web)
1. Inicia sesión como admin
2. Ve a `/admin-panel` (botón "huevos")
3. Crea, edita, activa/desactiva huevos
4. Establece fechas de disponibilidad

### Opción: API REST
```bash
# Crear huevo
POST /api/admin/eggs
{
  "name": "Huevo Nuevo",
  "cost": 1000,
  "description": "Descripción",
  "icon": "fa-egg",
  "cssClass": "bg-bg",
  "probabilities": {"comun": 50, "raro": 50},
  "isEvent": false,
  "isActive": true,
  "availableFrom": "2026-05-01T00:00:00",
  "availableUntil": "2026-06-30T23:59:59"
}

# Actualizar huevo
PUT /api/admin/eggs/:id
{ ...mismo formato... }

# Activar/Desactivar
PATCH /api/admin/eggs/:id/toggle

# Eliminar
DELETE /api/admin/eggs/:id
```

## Filtrado Automático

Los usuarios solo ven huevos que cumplan:
- `isActive = true`
- `availableFrom` es NULL o <= fecha actual
- `availableUntil` es NULL o >= fecha actual

## Notas Importantes

1. **Passwords**: Los hashes en users_full.sql son falsos. Usa la interfaz de registro para crear usuarios con passwords reales.
2. **User IDs**: Tasks y Pets requieren un userId válido. Reemplaza el placeholder antes de ejecutar.
3. **Fechas**: Las fechas en los JSON están en formato ISO. Se convierten a formato PostgreSQL en los SQL.
4. **JSON**: El campo probabilities en Eggs es JSON. PostgreSQL maneja esto automáticamente.

## Ejemplo de Flujo Completo

1. **Crear usuario desde interfaz** (para password real)
2. **Obtener ID del usuario** desde pgAdmin
3. **Reemplazar placeholder** en tasks_full.sql y pets_full.sql
4. **Ejecutar eggs_full.sql** y **shopitems_full.sql**
5. **Ejecutar tasks_full.sql** y **pets_full.sql**
6. **Verificar datos** en pgAdmin
