-- INSERT completo para ShopItems (comidas y pociones del shopitems.json)

-- Semilla Pequeña
INSERT INTO "ShopItems" ("name", "type", "cost", "description", "icon", "cssClass", "expValue", "effect", "createdAt", "updatedAt")
VALUES (
  'Semilla Pequeña',
  'food',
  50,
  'Da +10 EXP.',
  'fa-seedling',
  'bg-green-100 border-green-500',
  10,
  NULL,
  NOW(),
  NOW()
);

-- Manzana Brillante
INSERT INTO "ShopItems" ("name", "type", "cost", "description", "icon", "cssClass", "expValue", "effect", "createdAt", "updatedAt")
VALUES (
  'Manzana Brillante',
  'food',
  150,
  'Da +50 EXP.',
  'fa-apple-whole',
  'bg-green-100 border-green-500',
  50,
  NULL,
  NOW(),
  NOW()
);

-- Zanahoria Mágica
INSERT INTO "ShopItems" ("name", "type", "cost", "description", "icon", "cssClass", "expValue", "effect", "createdAt", "updatedAt")
VALUES (
  'Zanahoria Mágica',
  'food',
  300,
  'Da +120 EXP.',
  'fa-carrot',
  'bg-green-100 border-green-500',
  120,
  NULL,
  NOW(),
  NOW()
);

-- Pescado Dorado
INSERT INTO "ShopItems" ("name", "type", "cost", "description", "icon", "cssClass", "expValue", "effect", "createdAt", "updatedAt")
VALUES (
  'Pescado Dorado',
  'food',
  600,
  'Da +250 EXP.',
  'fa-fish',
  'bg-green-100 border-green-500',
  250,
  NULL,
  NOW(),
  NOW()
);

-- Carne Premium
INSERT INTO "ShopItems" ("name", "type", "cost", "description", "icon", "cssClass", "expValue", "effect", "createdAt", "updatedAt")
VALUES (
  'Carne Premium',
  'food',
  1000,
  'Da +500 EXP.',
  'fa-drumstick-bite',
  'bg-green-100 border-green-500',
  500,
  NULL,
  NOW(),
  NOW()
);

-- Galleta Cósmica
INSERT INTO "ShopItems" ("name", "type", "cost", "description", "icon", "cssClass", "expValue", "effect", "createdAt", "updatedAt")
VALUES (
  'Galleta Cósmica',
  'food',
  2500,
  'Da +1500 EXP.',
  'fa-cookie',
  'bg-green-100 border-green-500',
  1500,
  NULL,
  NOW(),
  NOW()
);

-- Fruta del Edén
INSERT INTO "ShopItems" ("name", "type", "cost", "description", "icon", "cssClass", "expValue", "effect", "createdAt", "updatedAt")
VALUES (
  'Fruta del Edén',
  'food',
  5000,
  'Da +3500 EXP.',
  'fa-lemon',
  'bg-green-100 border-green-500',
  3500,
  NULL,
  NOW(),
  NOW()
);

-- Néctar Divino
INSERT INTO "ShopItems" ("name", "type", "cost", "description", "icon", "cssClass", "expValue", "effect", "createdAt", "updatedAt")
VALUES (
  'Néctar Divino',
  'food',
  12000,
  'Da +10000 EXP.',
  'fa-droplet',
  'bg-green-100 border-green-500',
  10000,
  NULL,
  NOW(),
  NOW()
);

-- Estrella Fugaz
INSERT INTO "ShopItems" ("name", "type", "cost", "description", "icon", "cssClass", "expValue", "effect", "createdAt", "updatedAt")
VALUES (
  'Estrella Fugaz',
  'food',
  25000,
  'Da +25000 EXP.',
  'fa-star',
  'bg-green-100 border-green-500',
  25000,
  NULL,
  NOW(),
  NOW()
);

-- Esencia de Agujero Negro
INSERT INTO "ShopItems" ("name", "type", "cost", "description", "icon", "cssClass", "expValue", "effect", "createdAt", "updatedAt")
VALUES (
  'Esencia de Agujero Negro',
  'food',
  100000,
  'Da +150000 EXP.',
  'fa-circle-notch',
  'bg-green-100 border-green-500',
  150000,
  NULL,
  NOW(),
  NOW()
);

-- Poción Menor de Suerte
INSERT INTO "ShopItems" ("name", "type", "cost", "description", "icon", "cssClass", "expValue", "effect", "createdAt", "updatedAt")
VALUES (
  'Poción Menor de Suerte',
  'potion',
  500,
  '+5% Suerte',
  'fa-flask',
  'bg-blue-100 border-blue-500',
  0,
  '+5% Suerte',
  NOW(),
  NOW()
);
