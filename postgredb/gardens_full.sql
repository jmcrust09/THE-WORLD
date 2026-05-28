-- INSERT completo para Garden (datos de ejemplo para admin)
-- NOTA: Las plantas se asignan al usuario con ID 1 (admin)
-- position indica el número de pot (1-9)

-- Borrar contenido existente de la tabla
TRUNCATE TABLE "Garden" RESTART IDENTITY CASCADE;

-- Pot 1 - Semilla de Tomate (seed)
INSERT INTO "Garden" ("userId", "plantType", "stage", "plantedAt", "lastWateredAt", "harvestAt", "growthProgress", "yield", "position", "createdAt", "updatedAt")
VALUES (
  1,
  'Tomate',
  'seed',
  '2026-05-26 08:00:00',
  '2026-05-26 08:00:00',
  NULL,
  0,
  0,
  1,
  '2026-05-26 08:00:00',
  '2026-05-26 08:00:00'
);

-- Pot 2 - Semilla de Lechuga (sprout)
INSERT INTO "Garden" ("userId", "plantType", "stage", "plantedAt", "lastWateredAt", "harvestAt", "growthProgress", "yield", "position", "createdAt", "updatedAt")
VALUES (
  1,
  'Lechuga',
  'sprout',
  '2026-05-25 10:00:00',
  '2026-05-26 08:00:00',
  NULL,
  25,
  0,
  2,
  '2026-05-25 10:00:00',
  '2026-05-26 08:00:00'
);

-- Pot 3 - Semilla de Zanahoria (growing)
INSERT INTO "Garden" ("userId", "plantType", "stage", "plantedAt", "lastWateredAt", "harvestAt", "growthProgress", "yield", "position", "createdAt", "updatedAt")
VALUES (
  1,
  'Zanahoria',
  'growing',
  '2026-05-24 12:00:00',
  '2026-05-26 08:00:00',
  NULL,
  60,
  0,
  3,
  '2026-05-24 12:00:00',
  '2026-05-26 08:00:00'
);

-- Pot 4 - Semilla de Fresa (mature)
INSERT INTO "Garden" ("userId", "plantType", "stage", "plantedAt", "lastWateredAt", "harvestAt", "growthProgress", "yield", "position", "createdAt", "updatedAt")
VALUES (
  1,
  'Fresa',
  'mature',
  '2026-05-23 09:00:00',
  '2026-05-26 08:00:00',
  NULL,
  100,
  0,
  4,
  '2026-05-23 09:00:00',
  '2026-05-26 08:00:00'
);

-- Pot 5 - Vacío
-- (no se inserta nada, el pot está vacío)

-- Pot 6 - Semilla de Pepino (seed)
INSERT INTO "Garden" ("userId", "plantType", "stage", "plantedAt", "lastWateredAt", "harvestAt", "growthProgress", "yield", "position", "createdAt", "updatedAt")
VALUES (
  1,
  'Pepino',
  'seed',
  '2026-05-26 07:00:00',
  '2026-05-26 07:00:00',
  NULL,
  0,
  0,
  6,
  '2026-05-26 07:00:00',
  '2026-05-26 07:00:00'
);

-- Pot 7 - Semilla de Calabaza (sprout)
INSERT INTO "Garden" ("userId", "plantType", "stage", "plantedAt", "lastWateredAt", "harvestAt", "growthProgress", "yield", "position", "createdAt", "updatedAt")
VALUES (
  1,
  'Calabaza',
  'sprout',
  '2026-05-25 14:00:00',
  '2026-05-26 08:00:00',
  NULL,
  30,
  0,
  7,
  '2026-05-25 14:00:00',
  '2026-05-26 08:00:00'
);

-- Pot 8 - Vacío
-- (no se inserta nada, el pot está vacío)

-- Pot 9 - Semilla de Maíz (seed)
INSERT INTO "Garden" ("userId", "plantType", "stage", "plantedAt", "lastWateredAt", "harvestAt", "growthProgress", "yield", "position", "createdAt", "updatedAt")
VALUES (
  1,
  'Maíz',
  'seed',
  '2026-05-26 06:00:00',
  '2026-05-26 06:00:00',
  NULL,
  0,
  0,
  9,
  '2026-05-26 06:00:00',
  '2026-05-26 06:00:00'
);
