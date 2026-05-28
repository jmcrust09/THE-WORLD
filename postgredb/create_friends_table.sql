-- Crear tabla Friends para sistema de amistad y rachas
-- Ejecuta esto en pgAdmin Query Tool

-- Tabla FriendRequests (solicitudes de amistad pendientes)
CREATE TABLE IF NOT EXISTS "FriendRequests" (
  id SERIAL PRIMARY KEY,
  requesterId INTEGER NOT NULL,
  recipientId INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (requesterId) REFERENCES "Users"(id) ON DELETE CASCADE,
  FOREIGN KEY (recipientId) REFERENCES "Users"(id) ON DELETE CASCADE,
  UNIQUE(requesterId, recipientId)
);

-- Tabla Friends (amistades confirmadas)
CREATE TABLE IF NOT EXISTS "Friends" (
  id SERIAL PRIMARY KEY,
  userId INTEGER NOT NULL,
  friendId INTEGER NOT NULL,
  friendshipStreak INTEGER DEFAULT 0,
  lastInteractionDate TIMESTAMP,
  streakStartDate TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES "Users"(id) ON DELETE CASCADE,
  FOREIGN KEY (friendId) REFERENCES "Users"(id) ON DELETE CASCADE,
  UNIQUE(userId, friendId)
);

-- Índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_friendrequests_requester ON "FriendRequests"(requesterId);
CREATE INDEX IF NOT EXISTS idx_friendrequests_recipient ON "FriendRequests"(recipientId);
CREATE INDEX IF NOT EXISTS idx_friends_user ON "Friends"(userId);
CREATE INDEX IF NOT EXISTS idx_friends_friend ON "Friends"(friendId);

-- Verificar que las tablas se crearon correctamente
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('FriendRequests', 'Friends');
