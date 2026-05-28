-- INSERT completo para Pets (del pets.json)
-- NOTA: Las mascotas se asignan al usuario con ID 1 (admin)

-- Borrar contenido existente de la tabla
TRUNCATE TABLE "Pets" RESTART IDENTITY CASCADE;

-- Pet 1 - Gato 1
INSERT INTO "Pets" ("userId", "species", "name", "rarity", "stage", "pointsAccumulated", "eggOrigin", "isFavorite", "hatchedAt", "createdAt", "updatedAt")
VALUES (
  1,
  'Gato',
  'Gato 1',
  'comun',
  'joven',
  29074,
  'random',
  false,
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09'
);

-- Pet 2 - Gato 2
INSERT INTO "Pets" ("userId", "species", "name", "rarity", "stage", "pointsAccumulated", "eggOrigin", "isFavorite", "hatchedAt", "createdAt", "updatedAt")
VALUES (
  1,
  'Gato',
  'Gato 2',
  'comun',
  'ascendido',
  10327,
  'random',
  false,
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09'
);

-- Pet 3 - Gato 3
INSERT INTO "Pets" ("userId", "species", "name", "rarity", "stage", "pointsAccumulated", "eggOrigin", "isFavorite", "hatchedAt", "createdAt", "updatedAt")
VALUES (
  1,
  'Gato',
  'Gato 3',
  'comun',
  'evolucionado',
  37671,
  'random',
  false,
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09'
);

-- Pet 4 - Perro 4
INSERT INTO "Pets" ("userId", "species", "name", "rarity", "stage", "pointsAccumulated", "eggOrigin", "isFavorite", "hatchedAt", "createdAt", "updatedAt")
VALUES (
  1,
  'Perro',
  'Perro 4',
  'comun',
  'ascendido',
  14512,
  'random',
  false,
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09'
);

-- Pet 5 - Perro 5
INSERT INTO "Pets" ("userId", "species", "name", "rarity", "stage", "pointsAccumulated", "eggOrigin", "isFavorite", "hatchedAt", "createdAt", "updatedAt")
VALUES (
  1,
  'Perro',
  'Perro 5',
  'comun',
  'ascendido',
  9006,
  'random',
  false,
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09'
);

-- Pet 6 - Perro 6
INSERT INTO "Pets" ("userId", "species", "name", "rarity", "stage", "pointsAccumulated", "eggOrigin", "isFavorite", "hatchedAt", "createdAt", "updatedAt")
VALUES (
  1,
  'Perro',
  'Perro 6',
  'comun',
  'bebe',
  49838,
  'random',
  false,
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09'
);

-- Pet 7 - Conejo 7
INSERT INTO "Pets" ("userId", "species", "name", "rarity", "stage", "pointsAccumulated", "eggOrigin", "isFavorite", "hatchedAt", "createdAt", "updatedAt")
VALUES (
  1,
  'Conejo',
  'Conejo 7',
  'comun',
  'adulto',
  19902,
  'random',
  false,
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09'
);

-- Pet 8 - Conejo 8
INSERT INTO "Pets" ("userId", "species", "name", "rarity", "stage", "pointsAccumulated", "eggOrigin", "isFavorite", "hatchedAt", "createdAt", "updatedAt")
VALUES (
  1,
  'Conejo',
  'Conejo 8',
  'comun',
  'huevo',
  17864,
  'random',
  false,
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09'
);

-- Pet 9 - Conejo 9
INSERT INTO "Pets" ("userId", "species", "name", "rarity", "stage", "pointsAccumulated", "eggOrigin", "isFavorite", "hatchedAt", "createdAt", "updatedAt")
VALUES (
  1,
  'Conejo',
  'Conejo 9',
  'comun',
  'adulto',
  19350,
  'random',
  false,
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09'
);

-- Pet 10 - Hámster 10
INSERT INTO "Pets" ("userId", "species", "name", "rarity", "stage", "pointsAccumulated", "eggOrigin", "isFavorite", "hatchedAt", "createdAt", "updatedAt")
VALUES (
  1,
  'Hámster',
  'Hámster 10',
  'comun',
  'bebe',
  18531,
  'random',
  false,
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09'
);

-- Pet 11 - Hámster 11
INSERT INTO "Pets" ("userId", "species", "name", "rarity", "stage", "pointsAccumulated", "eggOrigin", "isFavorite", "hatchedAt", "createdAt", "updatedAt")
VALUES (
  1,
  'Hámster',
  'Hámster 11',
  'comun',
  'joven',
  10584,
  'random',
  false,
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09'
);

-- Pet 12 - Hámster 12
INSERT INTO "Pets" ("userId", "species", "name", "rarity", "stage", "pointsAccumulated", "eggOrigin", "isFavorite", "hatchedAt", "createdAt", "updatedAt")
VALUES (
  1,
  'Hámster',
  'Hámster 12',
  'comun',
  'adulto',
  29913,
  'random',
  false,
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09'
);

-- Pet 13 - Pez 13
INSERT INTO "Pets" ("userId", "species", "name", "rarity", "stage", "pointsAccumulated", "eggOrigin", "isFavorite", "hatchedAt", "createdAt", "updatedAt")
VALUES (
  1,
  'Pez',
  'Pez 13',
  'comun',
  'huevo',
  21920,
  'random',
  false,
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09'
);

-- Pet 14 - Pez 14
INSERT INTO "Pets" ("userId", "species", "name", "rarity", "stage", "pointsAccumulated", "eggOrigin", "isFavorite", "hatchedAt", "createdAt", "updatedAt")
VALUES (
  1,
  'Pez',
  'Pez 14',
  'comun',
  'ascendido',
  40872,
  'random',
  false,
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09'
);

-- Pet 15 - Pez 15
INSERT INTO "Pets" ("userId", "species", "name", "rarity", "stage", "pointsAccumulated", "eggOrigin", "isFavorite", "hatchedAt", "createdAt", "updatedAt")
VALUES (
  1,
  'Pez',
  'Pez 15',
  'comun',
  'joven',
  26798,
  'random',
  false,
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09'
);

-- Pet 16 - Paloma 16
INSERT INTO "Pets" ("userId", "species", "name", "rarity", "stage", "pointsAccumulated", "eggOrigin", "isFavorite", "hatchedAt", "createdAt", "updatedAt")
VALUES (
  1,
  'Paloma',
  'Paloma 16',
  'comun',
  'ascendido',
  22259,
  'random',
  false,
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09',
  '2026-05-26 06:24:09'
);
