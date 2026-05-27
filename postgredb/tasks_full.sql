-- INSERT completo para Tasks (del activities.json)
-- NOTA: Necesitas reemplazar USER_ID_PLACEHOLDER con el ID real del usuario
-- Puedes obtener el ID ejecutando: SELECT id FROM "Users" WHERE username = 'Jugador_Maestro';

-- Task 1 - Correr 5km
INSERT INTO "Tasks" ("userId", "day", "schedule", "task", "category", "priority", "completed", "pointsEarned", "createdAt", "updatedAt")
VALUES (
  USER_ID_PLACEHOLDER,
  'lunes',
  'mañana',
  'Correr 5km',
  'deporte',
  'Indispensable',
  true,
  250,
  '2026-05-25 08:30:00',
  '2026-05-25 08:30:00'
);

-- Task 2 - Aprender React y Node.js
INSERT INTO "Tasks" ("userId", "day", "schedule", "task", "category", "priority", "completed", "pointsEarned", "createdAt", "updatedAt")
VALUES (
  USER_ID_PLACEHOLDER,
  'lunes',
  'tarde',
  'Aprender React y Node.js',
  'aprendizaje',
  'Indispensable',
  true,
  200,
  '2026-05-25 16:00:00',
  '2026-05-25 16:00:00'
);

-- Task 3 - Meditar 15 minutos
INSERT INTO "Tasks" ("userId", "day", "schedule", "task", "category", "priority", "completed", "pointsEarned", "createdAt", "updatedAt")
VALUES (
  USER_ID_PLACEHOLDER,
  'martes',
  'mañana',
  'Meditar 15 minutos',
  'bienestar',
  'Deseable',
  false,
  0,
  '2026-05-26 07:00:00',
  '2026-05-26 07:00:00'
);

-- Task 4 - Completar reporte del trabajo
INSERT INTO "Tasks" ("userId", "day", "schedule", "task", "category", "priority", "completed", "pointsEarned", "createdAt", "updatedAt")
VALUES (
  USER_ID_PLACEHOLDER,
  'martes',
  'tarde',
  'Completar reporte del trabajo',
  'trabajo',
  'Indispensable',
  true,
  300,
  '2026-05-26 14:30:00',
  '2026-05-26 14:30:00'
);

-- Task 5 - Leer 30 páginas de un libro
INSERT INTO "Tasks" ("userId", "day", "schedule", "task", "category", "priority", "completed", "pointsEarned", "createdAt", "updatedAt")
VALUES (
  USER_ID_PLACEHOLDER,
  'miercoles',
  'noche',
  'Leer 30 páginas de un libro',
  'lectura',
  'Necesaria',
  true,
  150,
  '2026-05-27 21:00:00',
  '2026-05-27 21:00:00'
);

-- Task 6 - Sesión de gimnasio (pesas)
INSERT INTO "Tasks" ("userId", "day", "schedule", "task", "category", "priority", "completed", "pointsEarned", "createdAt", "updatedAt")
VALUES (
  USER_ID_PLACEHOLDER,
  'jueves',
  'tarde',
  'Sesión de gimnasio (pesas)',
  'deporte',
  'Indispensable',
  true,
  280,
  '2026-05-28 18:00:00',
  '2026-05-28 18:00:00'
);

-- Task 7 - Jugar videojuegos / Tiempo de ocio
INSERT INTO "Tasks" ("userId", "day", "schedule", "task", "category", "priority", "completed", "pointsEarned", "createdAt", "updatedAt")
VALUES (
  USER_ID_PLACEHOLDER,
  'viernes',
  'noche',
  'Jugar videojuegos / Tiempo de ocio',
  'ocio',
  'Deseable',
  true,
  80,
  '2026-05-29 20:00:00',
  '2026-05-29 20:00:00'
);

-- Task 8 - Limpiar la casa completa
INSERT INTO "Tasks" ("userId", "day", "schedule", "task", "category", "priority", "completed", "pointsEarned", "createdAt", "updatedAt")
VALUES (
  USER_ID_PLACEHOLDER,
  'sabado',
  'mañana',
  'Limpiar la casa completa',
  'hogar',
  'Necesaria',
  true,
  180,
  '2026-05-30 10:00:00',
  '2026-05-30 10:00:00'
);

-- Task 9 - Dibujar o tocar un instrumento
INSERT INTO "Tasks" ("userId", "day", "schedule", "task", "category", "priority", "completed", "pointsEarned", "createdAt", "updatedAt")
VALUES (
  USER_ID_PLACEHOLDER,
  'domingo',
  'tarde',
  'Dibujar o tocar un instrumento',
  'creatividad',
  'Deseable',
  false,
  0,
  '2026-05-31 17:00:00',
  '2026-05-31 17:00:00'
);
