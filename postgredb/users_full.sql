-- INSERT completo para Users (del users.json)
-- NOTA: El passwordHash es falso. Debes crear los usuarios desde la interfaz de registro
-- o generar un hash real con bcrypt. Si ejecutas esto directamente, los usuarios no podrán
-- hacer login con contraseña. Recomiendo usar la interfaz de registro para crear usuarios.

-- Borrar contenido existente de la tabla
TRUNCATE TABLE "Users" RESTART IDENTITY CASCADE;

-- Jugador_Maestro (ADMIN)
INSERT INTO "Users" ("username", "email", "passwordHash", "totalPoints", "currentStreak", "bestStreak", "bonusMultiplier", "isAdmin", "isGuest", "lastTaskDate", "createdAt", "updatedAt")
VALUES (
  'Jugador_Maestro',
  'maestro@theworld.com',
  'hash_falso_para_insertar_a_mano',
  125000,
  14,
  30,
  2.3,
  true,
  false,
  NULL,
  '2026-05-25 00:00:00',
  '2026-05-25 00:00:00'
);

-- Novato_Productivo (USER)
INSERT INTO "Users" ("username", "email", "passwordHash", "totalPoints", "currentStreak", "bestStreak", "bonusMultiplier", "isAdmin", "isGuest", "lastTaskDate", "createdAt", "updatedAt")
VALUES (
  'Novato_Productivo',
  'novato@theworld.com',
  'hash_falso_para_insertar_a_mano',
  850,
  2,
  2,
  1,
  false,
  false,
  NULL,
  '2026-05-25 00:00:00',
  '2026-05-25 00:00:00'
);
