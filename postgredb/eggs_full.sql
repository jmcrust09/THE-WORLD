-- INSERT completo para Eggs (del shopitems.json)
-- Los huevos de evento tienen isEvent = true

-- Huevo de Barro
INSERT INTO "Eggs" ("name", "type", "cost", "description", "icon", "cssClass", "probabilities", "isEvent", "isActive", "availableFrom", "availableUntil", "createdAt", "updatedAt")
VALUES (
  'Huevo de Barro',
  'egg',
  100,
  'Lo más bajo. Solo comunes.',
  'fa-egg',
  'bg-bg',
  '{"comun": 20, "poco_comun": 20, "raro": 20, "epico": 20, "legendario": 10, "mitico": 10}',
  false,
  true,
  NULL,
  NULL,
  NOW(),
  NOW()
);

-- Huevo Básico
INSERT INTO "Eggs" ("name", "type", "cost", "description", "icon", "cssClass", "probabilities", "isEvent", "isActive", "availableFrom", "availableUntil", "createdAt", "updatedAt")
VALUES (
  'Huevo Básico',
  'egg',
  500,
  'Alta probabilidad de Común.',
  'fa-egg',
  'bg-bg',
  '{"comun": 20, "poco_comun": 20, "raro": 20, "epico": 20, "legendario": 10, "mitico": 10}',
  false,
  true,
  NULL,
  NULL,
  NOW(),
  NOW()
);

-- Huevo de Cobre
INSERT INTO "Eggs" ("name", "type", "cost", "description", "icon", "cssClass", "probabilities", "isEvent", "isActive", "availableFrom", "availableUntil", "createdAt", "updatedAt")
VALUES (
  'Huevo de Cobre',
  'egg',
  800,
  'Ligeramente mejor que el básico.',
  'fa-egg',
  'bg-bg',
  '{"comun": 20, "poco_comun": 20, "raro": 20, "epico": 20, "legendario": 10, "mitico": 10}',
  false,
  true,
  NULL,
  NULL,
  NOW(),
  NOW()
);

-- Huevo Premium
INSERT INTO "Eggs" ("name", "type", "cost", "description", "icon", "cssClass", "probabilities", "isEvent", "isActive", "availableFrom", "availableUntil", "createdAt", "updatedAt")
VALUES (
  'Huevo Premium',
  'egg',
  1500,
  'Balanceado.',
  'fa-egg',
  'bg-bg',
  '{"comun": 20, "poco_comun": 20, "raro": 20, "epico": 20, "legendario": 10, "mitico": 10}',
  false,
  true,
  NULL,
  NULL,
  NOW(),
  NOW()
);

-- Huevo de Plata
INSERT INTO "Eggs" ("name", "type", "cost", "description", "icon", "cssClass", "probabilities", "isEvent", "isActive", "availableFrom", "availableUntil", "createdAt", "updatedAt")
VALUES (
  'Huevo de Plata',
  'egg',
  2500,
  'Más oportunidades de raros.',
  'fa-egg',
  'bg-bg',
  '{"comun": 20, "poco_comun": 20, "raro": 20, "epico": 20, "legendario": 10, "mitico": 10}',
  false,
  true,
  NULL,
  NULL,
  NOW(),
  NOW()
);

-- Huevo Épico
INSERT INTO "Eggs" ("name", "type", "cost", "description", "icon", "cssClass", "probabilities", "isEvent", "isActive", "availableFrom", "availableUntil", "createdAt", "updatedAt")
VALUES (
  'Huevo Épico',
  'egg',
  5000,
  'Garantiza Poco Común.',
  'fa-egg',
  'bg-bg',
  '{"comun": 20, "poco_comun": 20, "raro": 20, "epico": 20, "legendario": 10, "mitico": 10}',
  false,
  true,
  NULL,
  NULL,
  NOW(),
  NOW()
);

-- Huevo de Oro
INSERT INTO "Eggs" ("name", "type", "cost", "description", "icon", "cssClass", "probabilities", "isEvent", "isActive", "availableFrom", "availableUntil", "createdAt", "updatedAt")
VALUES (
  'Huevo de Oro',
  'egg',
  8000,
  'Garantiza Raro.',
  'fa-egg',
  'bg-bg',
  '{"comun": 20, "poco_comun": 20, "raro": 20, "epico": 20, "legendario": 10, "mitico": 10}',
  false,
  true,
  NULL,
  NULL,
  NOW(),
  NOW()
);

-- Huevo Legendario
INSERT INTO "Eggs" ("name", "type", "cost", "description", "icon", "cssClass", "probabilities", "isEvent", "isActive", "availableFrom", "availableUntil", "createdAt", "updatedAt")
VALUES (
  'Huevo Legendario',
  'egg',
  15000,
  'Garantiza Raro alto.',
  'fa-egg',
  'bg-bg',
  '{"comun": 20, "poco_comun": 20, "raro": 20, "epico": 20, "legendario": 10, "mitico": 10}',
  false,
  true,
  NULL,
  NULL,
  NOW(),
  NOW()
);

-- Huevo de Platino
INSERT INTO "Eggs" ("name", "type", "cost", "description", "icon", "cssClass", "probabilities", "isEvent", "isActive", "availableFrom", "availableUntil", "createdAt", "updatedAt")
VALUES (
  'Huevo de Platino',
  'egg',
  25000,
  'Alto chance de Épico.',
  'fa-egg',
  'bg-bg',
  '{"comun": 20, "poco_comun": 20, "raro": 20, "epico": 20, "legendario": 10, "mitico": 10}',
  false,
  true,
  NULL,
  NULL,
  NOW(),
  NOW()
);

-- Huevo Mítico
INSERT INTO "Eggs" ("name", "type", "cost", "description", "icon", "cssClass", "probabilities", "isEvent", "isActive", "availableFrom", "availableUntil", "createdAt", "updatedAt")
VALUES (
  'Huevo Mítico',
  'egg',
  40000,
  'Poder absoluto.',
  'fa-egg',
  'bg-bg',
  '{"comun": 20, "poco_comun": 20, "raro": 20, "epico": 20, "legendario": 10, "mitico": 10}',
  false,
  true,
  NULL,
  NULL,
  NOW(),
  NOW()
);

-- Huevo Estelar
INSERT INTO "Eggs" ("name", "type", "cost", "description", "icon", "cssClass", "probabilities", "isEvent", "isActive", "availableFrom", "availableUntil", "createdAt", "updatedAt")
VALUES (
  'Huevo Estelar',
  'egg',
  100000,
  'Solo leyendas y mitos.',
  'fa-star',
  'bg-bg',
  '{"comun": 20, "poco_comun": 20, "raro": 20, "epico": 20, "legendario": 10, "mitico": 10}',
  false,
  true,
  NULL,
  NULL,
  NOW(),
  NOW()
);

-- Huevo Cyberpunk (EVENTO)
INSERT INTO "Eggs" ("name", "type", "cost", "description", "icon", "cssClass", "probabilities", "isEvent", "isActive", "availableFrom", "availableUntil", "createdAt", "updatedAt")
VALUES (
  'Huevo Cyberpunk',
  'egg',
  8000,
  'Evento especial.',
  'fa-robot',
  'bg-bg',
  '{"comun": 20, "poco_comun": 20, "raro": 20, "epico": 20, "legendario": 10, "mitico": 10}',
  true,
  true,
  NULL,
  NULL,
  NOW(),
  NOW()
);

-- Huevo Fantasma (EVENTO)
INSERT INTO "Eggs" ("name", "type", "cost", "description", "icon", "cssClass", "probabilities", "isEvent", "isActive", "availableFrom", "availableUntil", "createdAt", "updatedAt")
VALUES (
  'Huevo Fantasma',
  'egg',
  12000,
  'Evento de Halloween.',
  'fa-ghost',
  'bg-bg',
  '{"comun": 20, "poco_comun": 20, "raro": 20, "epico": 20, "legendario": 10, "mitico": 10}',
  true,
  true,
  NULL,
  NULL,
  NOW(),
  NOW()
);

-- Huevo de Cristal (EVENTO)
INSERT INTO "Eggs" ("name", "type", "cost", "description", "icon", "cssClass", "probabilities", "isEvent", "isActive", "availableFrom", "availableUntil", "createdAt", "updatedAt")
VALUES (
  'Huevo de Cristal',
  'egg',
  30000,
  'Evento cristalino.',
  'fa-gem',
  'bg-bg',
  '{"comun": 20, "poco_comun": 20, "raro": 20, "epico": 20, "legendario": 10, "mitico": 10}',
  true,
  true,
  NULL,
  NULL,
  NOW(),
  NOW()
);
