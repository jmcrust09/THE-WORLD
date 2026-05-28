-- Crear tabla Animals (especies de mascotas con rareza y descripción)
-- Esta tabla define las especies disponibles y sus características

CREATE TABLE IF NOT EXISTS "Animals" (
  id SERIAL PRIMARY KEY,
  species VARCHAR(100) NOT NULL UNIQUE,
  rarity VARCHAR(50) NOT NULL,
  description TEXT,
  icon VARCHAR(100) DEFAULT 'fa-paw',
  cssClass VARCHAR(100) DEFAULT 'bg-bg',
  baseMultiplier DECIMAL(3,2) DEFAULT 1.0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar especies de mascotas con sus rarezas y descripciones

-- Comunes
INSERT INTO "Animals" (species, rarity, description, icon, baseMultiplier) VALUES
('Gato', 'comun', 'Un gato común y cariñoso.', 'fa-cat', 1.0),
('Perro', 'comun', 'Un perro leal y juguetón.', 'fa-dog', 1.0),
('Conejo', 'comun', 'Un conejo tierno y saltarín.', 'fa-carrot', 1.0),
('Hámster', 'comun', 'Un hámster pequeño y activo.', 'fa-circle', 1.0),
('Pez', 'comun', 'Un pez tranquilo y colorido.', 'fa-fish', 1.0),
('Paloma', 'comun', 'Una paloma mensajera.', 'fa-dove', 1.0),
('Ratón', 'comun', 'Un ratón curioso.', 'fa-ghost', 1.0),
('Pato', 'comun', 'Un pato amigable.', 'fa-feather', 1.0);

-- Poco Comunes
INSERT INTO "Animals" (species, rarity, description, icon, baseMultiplier) VALUES
('Zorro', 'poco_comun', 'Un zorro astuto y ágil.', 'fa-fire', 1.1),
('Búho', 'poco_comun', 'Un búho sabio y nocturno.', 'fa-eye', 1.1),
('Lobo', 'poco_comun', 'Un lobo fuerte y leal.', 'fa-wolf-pack-battalion', 1.1),
('Mariposa', 'poco_comun', 'Una mariposa colorida.', 'fa-bug', 1.1),
('Tortuga', 'poco_comun', 'Una tortuga sabia y lenta.', 'fa-shield', 1.1);

-- Raros
INSERT INTO "Animals" (species, rarity, description, icon, baseMultiplier) VALUES
('Dragón', 'raro', 'Un dragón joven y poderoso.', 'fa-dragon', 1.3),
('Fénix', 'raro', 'Un fénix inmortal y brillante.', 'fa-fire-flame-curved', 1.3),
('Unicornio', 'raro', 'Un unicornio mágico.', 'fa-star', 1.3),
('Grifo', 'raro', 'Un grifo majestuoso.', 'fa-feather-pointed', 1.3),
('Serpiente', 'raro', 'Una serpiente mística.', 'fa-staff-snake', 1.3);

-- Épicos
INSERT INTO "Animals" (species, rarity, description, icon, baseMultiplier) VALUES
('Leviatán', 'epico', 'El rey de los mares.', 'fa-water', 1.5),
('Quimera', 'epico', 'Una bestia legendaria.', 'fa-paw', 1.5),
('Hipogrifo', 'epico', 'Una criatura mítica.', 'fa-horse', 1.5),
('Basilisco', 'epico', 'Una serpiente mortal.', 'fa-skull', 1.5),
('Sirena', 'epico', 'Una criatura del mar.', 'fa-water', 1.5);

-- Legendarios
INSERT INTO "Animals" (species, rarity, description, icon, baseMultiplier) VALUES
('Kraken', 'legendario', 'El terror de los océanos.', 'fa-tentacles', 1.8),
('Pegaso', 'legendario', 'El caballo alado de los dioses.', 'fa-horse-head', 1.8),
('Cerbero', 'legendario', 'El perro de tres cabezas del inframundo.', 'fa-dog', 1.8),
('Minotauro', 'legendario', 'Una bestia poderosa.', 'fa-bullseye', 1.8),
('Esfinge', 'legendario', 'La guardiana de secretos.', 'fa-question', 1.8);

-- Míticos
INSERT INTO "Animals" (species, rarity, description, icon, baseMultiplier) VALUES
('Tiamat', 'mitico', 'La madre de todos los dragones.', 'fa-dragon', 2.5),
('Behemoth', 'mitico', 'La bestia más grande.', 'fa-mountain', 2.5),
('Ziz', 'mitico', 'El rey de las aves.', 'fa-crow', 2.5),
('Leviatán Primordial', 'mitico', 'El ser más antiguo.', 'fa-water', 2.5),
('Fénix Eterno', 'mitico', 'El fénix que nunca muere.', 'fa-fire', 2.5);

-- Verificar datos insertados
SELECT species, rarity, description, baseMultiplier 
FROM "Animals" 
ORDER BY 
  CASE rarity
    WHEN 'comun' THEN 1
    WHEN 'poco_comun' THEN 2
    WHEN 'raro' THEN 3
    WHEN 'epico' THEN 4
    WHEN 'legendario' THEN 5
    WHEN 'mitico' THEN 6
  END,
  species;
