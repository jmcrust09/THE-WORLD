-- INSERT completo para Inventory (datos de ejemplo para admin)
-- NOTA: Los items se asignan al usuario con ID 1 (admin)

-- Borrar contenido existente de la tabla
TRUNCATE TABLE "Inventory" RESTART IDENTITY CASCADE;

-- Semilla Pequeña (5 unidades)
INSERT INTO "Inventory" ("userId", "shopItemId", "quantity", "isEquipped", "obtainedAt", "createdAt", "updatedAt")
VALUES (
  1,
  1,
  5,
  false,
  '2026-05-26 10:00:00',
  '2026-05-26 10:00:00',
  '2026-05-26 10:00:00'
);

-- Manzana Brillante (3 unidades)
INSERT INTO "Inventory" ("userId", "shopItemId", "quantity", "isEquipped", "obtainedAt", "createdAt", "updatedAt")
VALUES (
  1,
  2,
  3,
  false,
  '2026-05-26 10:00:00',
  '2026-05-26 10:00:00',
  '2026-05-26 10:00:00'
);

-- Zanahoria Mágica (2 unidades)
INSERT INTO "Inventory" ("userId", "shopItemId", "quantity", "isEquipped", "obtainedAt", "createdAt", "updatedAt")
VALUES (
  1,
  3,
  2,
  false,
  '2026-05-26 10:00:00',
  '2026-05-26 10:00:00',
  '2026-05-26 10:00:00'
);

-- Poción Menor de Suerte (1 unidad, equipada)
INSERT INTO "Inventory" ("userId", "shopItemId", "quantity", "isEquipped", "obtainedAt", "createdAt", "updatedAt")
VALUES (
  1,
  11,
  1,
  true,
  '2026-05-26 10:00:00',
  '2026-05-26 10:00:00',
  '2026-05-26 10:00:00'
);
