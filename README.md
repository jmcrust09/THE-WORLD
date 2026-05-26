# THE WORLD

<font color=#4c6346>**THE WORLD**</font> es una plataforma web que transforma tu productividad diaria en una aventura de colección y crianza de mascotas virtuales. Cada vez que completas una actividad (estudiar, hacer ejercicio, trabajar, meditar, etc.) obtienes puntos. Con esos puntos compras huevos, que eclosionan en criaturas de distintas rarezas. A medida que sigues sumando puntos, tus mascotas crecen y te otorgan bonificaciones permanentes, creando un círculo virtuoso de motivación.

Todo el sistema se presenta en una interfaz que combina la calidez de los juegos *cozy* (como *Animal Crossing* o *Stardew Valley*) con detalles que evocan la nostalgia de las terminales UNIX y el comando `neofetch`: tipografía monoespaciada, arte ASCII, bordes redondeados y una paleta de colores terrosa y de bajo contraste. Los iconos se implementan con **Font Awesome** (Awesome Font) en lugar de emojis, manteniendo una estética limpia y consistente.

---

## Tabla de contenidos

- [Visión general](#visión-general)
- [Características principales](#características-principales)
- [Interfaz “caído” (cozy + retro)](#interfaz-caído-cozy--retro)
- [Sistema de actividades](#sistema-de-actividades)
- [Sistema de puntos](#sistema-de-puntos)
- [Sistema de huevos](#sistema-de-huevos)
- [Mascotas y crecimiento](#mascotas-y-crecimiento)
- [Rarezas y probabilidades](#rarezas-y-probabilidades)
- [Flujo de usuario y onboarding](#flujo-de-usuario-y-onboarding)
- [Arquitectura y stack tecnológico](#arquitectura-y-stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Modelo de datos (MongoDB)](#modelo-de-datos-mongodb)
- [Algoritmo de rareza (cálculo de eclosión)](#algoritmo-de-rareza-cálculo-de-eclosión)
- [Componentes clave del frontend](#componentes-clave-del-frontend)
- [Autenticación](#autenticación)
- [Diseño responsive](#diseño-responsive)
- [Diferenciadores clave](#diferenciadores-clave)
- [Instalación y despliegue](#instalación-y-despliegue)
- [Roadmap](#roadmap)
- [Créditos y licencia](#créditos-y-licencia)

---

## Visión general

**THE WORLD** nace de la fusión de dos ideas exitosas en el mundo de los videojuegos y la productividad:

- La mecánica de colección y evolución de mascotas de *Adopt Me!* (Roblox).
- La interacción directa con la mascota al estilo *Talking Tom*.
- La gamificación de tareas diarias de *Habitica*.
- La estética relajada y envolvente de los *cozy games*.

El resultado es una web donde tus hábitos reales alimentan un ecosistema virtual único. Cada vez que marcas una tarea como completada, ganas puntos, tu mascota favorita se alegra, acumulas experiencia para que crezca y desbloqueas la posibilidad de conseguir nuevas criaturas. Las mascotas más raras no solo son un trofeo, sino que aumentan permanentemente la cantidad de puntos que recibes por cada actividad, incentivando la constancia y la mejora continua.

> “Convierte tu productividad en un ecosistema vivo. Cada tarea completada te acerca a tu próxima mascota legendaria.”

---

## Características principales

- **Registro de actividades diarias** con seis categorías predefinidas (deporte, aprendizaje, trabajo, bienestar, creatividad, hogar) y puntuación base ajustable.
- **Tabla de bitácora interactiva**: puedes añadir, editar, marcar/desmarcar tareas. Los cambios recalculan instantáneamente tus puntos, rachas, nivel de las mascotas y bonificaciones.
- **Sistema de puntos** con multiplicadores por racha diaria (días consecutivos completando al menos una tarea) y por rareza de tus mascotas.
- **Compra de huevos** usando puntos: cinco tipos de huevo (Básico, Premium, Épico, Legendario, Mítico) más huevos de evento temporal. Cada uno tiene costes y probabilidades de rareza diferentes.
- **Eclosión animada**: el huevo se agita, se agrieta y revela la criatura con un efecto visual y sonoro (confeti, partículas).
- **Mascotas con 6 etapas de crecimiento**: huevo → bebé → joven → adulto → evolucionado → ascendido. La etapa depende de los puntos acumulados desde la eclosión.
- **Sistema de rarezas** (6 niveles): Común, Poco Común, Raro, Épico, Legendario, Mítico. Cada rareza tiene un color asociado, un multiplicador de puntos pasivo y una apariencia visual especial (brillo, aura).
- **Bonus pasivo por mascota rara**: cada mascota aporta un multiplicador que se suma al total (ejemplo: una mascota Épica da +0.5x, una Legendaria +0.8x, una Mítica +1.5x). El bonus total se aplica a todas las futuras actividades.
- **Tu propio mundo**: una galería donde puedes ver todas tus mascotas, seleccionar una favorita e interactuar con ella (recibe pequeñas reacciones y un bonus extra del 5% en las actividades).
- **Sincronización en la nube**: tu progreso se guarda en MongoDB asociado a tu cuenta. Puedes acceder desde cualquier dispositivo.
- **Consejos automáticos por algoritmos** (sin IA externa): el sistema analiza tu bitácora y calcula tu hábito estrella (el que más repites), el hábito a mejorar (el que más fallas), el día de máximo rendimiento y una “playlist de rescate” con las tareas fallidas ordenadas por prioridad. Estos consejos se muestran en un panel específico y se actualizan en tiempo real.

---

## Interfaz “caído” (cozy + retro)

La interfaz de **THE WORLD** sigue una filosofía híbrida: por un lado, la suavidad y calidez de los *cozy games*; por otro, la claridad y nostalgia de las terminales clásicas.

### Principios de diseño

- Colores tierra y pasteles suaves (ver paleta más abajo).
- Animaciones de caída, flotación y rebote suaves.
- Iconografía redondeada y amigable (Font Awesome).
- Sonidos ambientales opcionales (completar tarea, comprar huevo, eclosión).
- Transiciones tipo “parallax lento” en el fondo.
- Microinteracciones satisfactorias (hover con escala, botones que “respiran”).
- Tipografía monoespaciada (`Courier New`) para textos informativos, combinada con fuentes sans-serif para los títulos.
- Arte ASCII del mundo en la zona lateral izquierda (similar a la salida de `neofetch`), que actúa como logotipo del proyecto.

### Mockup conceptual de la pantalla principal

```
╔══════════════════════════════════════════════════╗
║ ☁️ ☁️ 🏔️ THE WORLD ☁️ ☁️                           ║
║                                                    ║
║ ┌─────────────────────────┐ ┌──────────────┐      ║
║ │                         │ │ 💎 2,450 pts │      ║
║ │  🦊 Tu mascota          │ │ Nivel: 12    │      ║
║ │  "Foxy"                 │ │ ⭐⭐⭐⭐       │      ║
║ │  Rareza: Épico          │ │              │      ║
║ │  Crecimiento: 78%       │ │ 🥚 Comprar   │      ║
║ │  ████████░░             │ │   huevo      │      ║
║ └─────────────────────────┘ └──────────────┘      ║
║                                                    ║
║ ┌──────────────────────────────────────────┐      ║
║ │ 🏃 Ejercicio matutino      +150 pts  ⭐   │      ║
║ │ 📚 Leer 30 min             +100 pts      │      ║
║ │ 💻 Completar proyecto      +500 pts  🔥  │      ║
║ │ 🧘 Meditación              +75 pts       │      ║
║ │ ＋ Añadir actividad                      │      ║
║ └──────────────────────────────────────────┘      ║
║                                                    ║
║ [🏠 Home] [📝 Tareas] [🥚 Huevos] [🐾 Mascotas] [👤 Perfil] ║
╚══════════════════════════════════════════════════╝
```

### Paleta de colores (tema claro “caído”)

| Rol                  | Color      | Código HEX   |
|----------------------|------------|--------------|
| Fondo principal      | Crema      | `#FDF6E3`    |
| Fondo secundario     | Arena      | `#F5EDD6`    |
| Texto principal      | Café       | `#4A3728`    |
| Acento verde         | Musgo      | `#7C9A6E`    |
| Acento naranja       | Melón      | `#E8A87C`    |
| Acento rosa          | Rosado     | `#D4A5A5`    |
| Sombras              | Café       | `rgba(74,55,40,0.1)` |
| Bordes               | Beige      | `#D4C5B2`    |

### Elementos visuales distintivos

- **Ventana principal**: bordes redondeados de 28 px, sombra exterior difusa, sombra interior blanca que simula un bisel elevado, barra superior con tres puntos de colores (verde pálido, amarillo, rojo teja) y un título encerrado en una pastilla.
- **Arte ASCII**: mapa del mundo dibujado con caracteres `+`, `#`, `*`, `%`, enmarcado por un borde punteado y fondo semitransparente. Se adapta responsive (en móviles se reduce el tamaño de la fuente del ASCII).
- **Panel de información**: estilo `neofetch`, con etiquetas alineadas (`proyecto:`, `stack:`, `mascotas:`, etc.) usando el símbolo `⤷` y texto en minúsculas.
- **Tarjetas de mascotas**: borde sutil, fondo ligeramente más claro, y un glow según la rareza (color del gradiente correspondiente).
- **Botones**: bordes redondeados, transición suave, y al hacer hover aumentan ligeramente de tamaño y cambian la sombra.
- **Pie de página**: firma `✦ made by wm ✦` dentro de una etiqueta con borde y mucho padding horizontal.

Todos los iconos (puntos, huevo, mascota, añadir, etc.) se renderizan con **Font Awesome** (`@fortawesome/react-fontawesome`), lo que garantiza escalado perfecto y coherencia visual en cualquier resolución.

---

## Sistema de actividades

Cada actividad representa una tarea de la vida real que el usuario desea convertir en hábito. El sistema proporciona una tabla (bitácora) con los siguientes campos:

- **Día** (lunes, martes, …)
- **Horario** (mañana, tarde, noche)
- **Actividad** (descripción libre)
- **Prioridad** (Indispensable, Necesaria, Deseable)
- **Completado** (checkbox)

### Categorías y puntos base

Aunque la prioridad influye en la puntuación, también se define una categoría para cada actividad. Las categorías predefinidas son:

| Categoría    | Ejemplos                        | Rango de puntos base |
|--------------|----------------------------------|----------------------|
| Deporte      | Correr, gimnasio, yoga           | 100 – 300            |
| Aprendizaje  | Leer, cursos, idiomas            | 80 – 250             |
| Trabajo      | Completar tareas laborales       | 120 – 400            |
| Bienestar    | Meditar, dormir 8h, hidratarse   | 50 – 150             |
| Creatividad  | Dibujar, escribir, música        | 100 – 200            |
| Hogar        | Limpiar, cocinar, organizar      | 60 – 180             |

El usuario puede elegir la categoría al crear la actividad, y el sistema asigna los puntos base según la dificultad que él mismo seleccione (baja, media, alta).

### Multiplicadores por racha (streak)

La racha cuenta los días consecutivos en los que el usuario ha completado al menos una actividad. Los multiplicadores se aplican a los puntos base de cada nueva actividad:

| Días de racha | Multiplicador | Representación ASCII |
|---------------|---------------|----------------------|
| 1             | x1.0          | ░░░░░                |
| 3             | x1.2          | ██░░░                |
| 7             | x1.5          | ███░░                |
| 14            | x2.0          | ████░                |
| 30+           | x3.0          | █████                |

### Fórmula de puntos totales por actividad

```
puntos_totales = puntos_base × multiplicador_racha × (1 + bonus_total_mascotas)
```

Donde `bonus_total_mascotas` es la suma de los multiplicadores de todas las mascotas que posee el usuario (ej: 0.5 por una Épica, 0.8 por una Legendaria, etc.). Si el usuario tiene mascota favorita, se añade un +0.05 extra.

### Ejemplo de registro de actividad (formato JSON)

```json
{
  "id": "act_001",
  "userId": "user_abc123",
  "categoria": "deporte",
  "descripcion": "Correr 5km",
  "puntosBase": 200,
  "multiplicadorRacha": 1.5,
  "multiplicadorMascota": 1.2,
  "puntosTotales": 360,
  "timestamp": "2026-05-18T08:30:00Z"
}
```

---

## Sistema de puntos

Los puntos son la moneda principal del juego. Se acumulan principalmente completando actividades, pero también hay bonificaciones especiales.

### Fuentes de puntos

| Fuente                                  | Cantidad / multiplicador            |
|-----------------------------------------|--------------------------------------|
| Actividad completada                    | 50 – 400 (según categoría/dificultad)|
| Rachas diarias                          | x1.2 a x3.0                          |
| Mascotas raras (bonus pasivo)           | +10% a +100% acumulable              |
| Eventos especiales (2x puntos)          | temporal                             |
| Interacción con mascota favorita        | +5% extra en la siguiente actividad  |

### Umbrales para compra de huevos

| Puntos acumulados | Huevos disponibles     |
|-------------------|------------------------|
| 0                 | Ninguno (solo tutorial)|
| 500               | Básico                 |
| 1,500             | Premium                |
| 5,000             | Épico                  |
| 15,000            | Legendario             |
| 50,000            | Mítico                 |

---

## Sistema de huevos

Los huevos son el único medio para obtener nuevas mascotas. Se compran en la tienda con puntos. Cada tipo de huevo tiene un coste y una tabla de probabilidades de rareza diferente.

### Tipos de huevo

| Huevo       | Coste     | Característica                                  |
|-------------|-----------|-------------------------------------------------|
| Básico      | 500 pts   | Alta probabilidad de Común, baja de Raro        |
| Premium     | 1,500 pts | Balanceado, mayor chance de Épico               |
| Épico       | 5,000 pts | Garantiza Poco Común o mejor                    |
| Legendario  | 15,000 pts| Garantiza Raro o mejor                          |
| Mítico      | 50,000 pts| Garantiza Épico o mejor                         |
| Evento      | Variable  | Mascotas exclusivas por tiempo limitado         |

### Probabilidades de rareza por tipo de huevo (en %)

| Rareza       | Básico | Premium | Épico | Legendario | Mítico |
|--------------|--------|---------|-------|------------|--------|
| Común        | 55     | 35      | 0     | 0          | 0      |
| Poco Común   | 28     | 30      | 40    | 10         | 0      |
| Raro         | 12     | 22      | 35    | 50         | 15     |
| Épico        | 4      | 10      | 20    | 30         | 45     |
| Legendario   | 1      | 2.5     | 4     | 8          | 30     |
| Mítico       | 0      | 0.5     | 1     | 2          | 10     |

### Animación de eclosión

La eclosión es una secuencia de tres fases con duración total de unos 4.5 segundos:

1. **Aparece el huevo** (estático, 0.5 s)
2. **Sacudidas y grietas** (1.5 s): animación de rotación, partículas simuladas.
3. **Eclosión y revelación** (2 s): confeti, sonido, muestra la mascota con su rareza y nombre.

Todo se implementa con `framer-motion` y transiciones CSS.

---

## Mascotas y crecimiento

Cada mascota tiene una especie (ej: Zorro, Dragón de Agua, Fénix) y una rareza. A medida que el usuario acumula puntos *después de la eclosión*, la mascota avanza por seis etapas de crecimiento.

### Etapas y puntos necesarios

| Etapa        | Puntos acumulados | Descripción visual                              |
|--------------|-------------------|-------------------------------------------------|
| Huevo        | 0 – 200           | Solo se ve el huevo (recién comprado)           |
| Bebé         | 200 – 800         | Versión diminuta, animaciones tiernas           |
| Joven        | 800 – 2,500       | Tamaño mediano, empieza a interactuar           |
| Adulto       | 2,500 – 8,000     | Tamaño completo, todas las interacciones        |
| Evolucionado | 8,000 – 25,000    | Apariencia mejorada, brillo/aura                |
| Ascendido    | 25,000+           | Efectos especiales, aura dorada/arcoíris        |

### Ejemplo de crecimiento (Zorro Común)

```
Puntos:   0 ── 200 ── 800 ── 2500 ── 8000 ── 25000+
           │      │       │        │         │
         🥚     🐣      🐥       🦊       🦊✨      🦊🌟
        Huevo  Bebé   Joven    Adulto   Evoluc.  Ascendido
```

El cambio de etapa no solo es visual: en las etapas superiores, la mascota puede tener animaciones adicionales (movimiento, parpadeo, reacción al clic).

---

## Rarezas y probabilidades

Existen seis niveles de rareza. Cada uno tiene un color asociado, un multiplicador de puntos pasivo y una probabilidad base de aparición (sin considerar el tipo de huevo).

| Rareza       | % base | Multiplicador | Color (gradiente CSS)                                    |
|--------------|--------|---------------|----------------------------------------------------------|
| Común        | ~50%   | x0.0          | `linear-gradient(135deg, #bdbdbd, #757575)`              |
| Poco Común   | ~25%   | x0.1          | `linear-gradient(135deg, #66BB6A, #388E3C)`              |
| Raro         | ~14%   | x0.3          | `linear-gradient(135deg, #42A5F5, #1976D2)`              |
| Épico        | ~7%    | x0.5          | `linear-gradient(135deg, #AB47BC, #7B1FA2)`              |
| Legendario   | ~3%    | x0.8          | `linear-gradient(135deg, #FFA726, #F57C00)`              |
| Mítico       | ~1%    | x1.5          | `linear-gradient(135deg, #EF5350, #C62828) + brillo`     |

El **bonus total** del usuario es la suma de los multiplicadores de todas sus mascotas. Por ejemplo:

- 3 mascotas Comunes → 3 × 0.0 = 0.0
- 1 mascota Épica → 1 × 0.5 = 0.5
- 1 mascota Legendaria → 1 × 0.8 = 0.8
- **Bonus total = +1.3x** (es decir, todos los puntos ganados se multiplican por 2.3).

---

## Flujo de usuario y onboarding

El ciclo principal de juego está diseñado para ser intuitivo y adictivo en el buen sentido:

1. **Registro** – El usuario crea una cuenta con email o red social.
2. **Primera actividad** – El sistema regala un Huevo Básico y una actividad de ejemplo.
3. **Eclosión tutorial** – El huevo eclosiona en una mascota Común o Poco Común (la primera siempre es una de estas dos).
4. **Descubrimiento** – El usuario aprende a registrar actividades y ve cómo sus puntos crecen.
5. **Primera compra** – Al alcanzar 500 puntos, puede comprar su segundo huevo.
6. **Engagement loop** – El ciclo se repite: tareas → puntos → huevos → mascotas → bonus → más puntos.

```
[Usuario completa actividad] → [Registra en THE WORLD] → [Recibe puntos]
                                                              ↓
                            [Mascota otorga bonus] ← [Crece y evoluciona]
                                    ↑                            ↓
                            [Mascota aparece] ← [Eclosión] ← [Compra huevo]
```

---

## Arquitectura y stack tecnológico

El proyecto se divide en frontend (React) y backend (Node.js + Express), con PostgreSQL como base de datos y Socket.io para actualizaciones en tiempo real.

```json
{
  "frontend": {
    "framework": "React 18",
    "build": "Vite",
    "styling": "TailwindCSS + Framer Motion",
    "state": "Zustand + React Query",
    "routing": "React Router v6",
    "3d/animation": "Three.js / React Three Fiber (opcional)",
    "sound": "Howler.js",
    "icons": "Font Awesome"
  },
  "backend": {
    "runtime": "Node.js + Express",
    "database": "PostgreSQL + Sequelize",
    "auth": "JWT + OAuth2 (Google, GitHub)",
    "realtime": "Socket.io"
  },
  "deployment": {
    "platform": "Render",
    "database": "Managed PostgreSQL"
  }
}
```

---

## Estructura del proyecto

```
the-world/
├── client/                      # Frontend React (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/              # Botones, tarjetas, ASCII art, barra de progreso
│   │   │   ├── pets/            # PetModel, EggHatching, RarityReveal
│   │   │   ├── activities/      # ActivityForm, ActivityList, StreakTracker
│   │   │   └── world/           # WorldCanvas, PetCollection, EggShop
│   │   ├── hooks/               # usePoints, usePets, useEggs, useStreak
│   │   ├── store/               # Zustand stores (user, world)
│   │   ├── utils/               # rarityCalculator, growthCalculator, eggProbabilities
│   │   ├── pages/               # Home, Activities, EggShop, PetCollection, Profile
│   │   └── styles/              # Tailwind + CSS personalizado (estilo neofetch)
│   └── public/
│       ├── assets/              # sprites de mascotas, huevos, sonidos
│       └── ascii/               # arte ASCII del mundo
├── server/                      # Backend Node.js
│   ├── models/                  # Usuario, Mascota, Actividad, Huevo, Transaccion
│   ├── routes/                  # API endpoints (actividades, compras, mascotas)
│   ├── controllers/             # Lógica de negocio
│   ├── algorithms/              # Cálculo de consejos (hábito estrella, etc.)
│   ├── middleware/              # Autenticación JWT, manejo de errores
│   └── socket/                  # Eventos en tiempo real
├── .env.example
├── package.json
└── README.md
```

---

## Modelo de datos (MongoDB)

Base de datos: `the_world`

### Colección `usuarios`

```javascript
{
  _id: ObjectId,
  username: String, unique,
  email: String, unique,
  passwordHash: String,
  totalPoints: { type: Number, default: 0 },
  currentStreak: { type: Number, default: 0 },
  bestStreak: { type: Number, default: 0 },
  bonusMultiplier: { type: Number, default: 1.0 },  // 1 + suma de multiplicadores de mascotas
  favoritePetId: ObjectId,  // referencia a la mascota favorita
  createdAt: Date,
  updatedAt: Date
}
```

### Colección `actividades`

```javascript
{
  _id: ObjectId,
  userId: ObjectId, ref: 'Usuario',
  day: String,        // 'lunes', 'martes', ...
  schedule: String,   // 'mañana', 'tarde', 'noche'
  task: String,
  category: String,   // 'deporte', 'aprendizaje', etc.
  priority: String,   // 'Indispensable', 'Necesaria', 'Deseable'
  completed: Boolean,
  pointsEarned: Number,
  timestamp: Date
}
```

### Colección `mascotas`

```javascript
{
  _id: ObjectId,
  userId: ObjectId, ref: 'Usuario',
  species: String,      // 'Zorro', 'Dragón de Fuego', etc.
  name: String,
  rarity: String,       // 'comun','poco_comun','raro','epico','legendario','mitico'
  stage: String,        // 'huevo','bebe','joven','adulto','evolucionado','ascendido'
  pointsAccumulated: { type: Number, default: 0 },
  eggOrigin: String,    // 'basico','premium','epico','legendario','mitico','evento'
  isFavorite: Boolean,
  hatchedAt: Date,
  lastInteraction: Date
}
```

### Colección `huevos_comprados`

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  eggType: String,
  cost: Number,
  petResultId: ObjectId,  // ref: 'Mascota', null si aún no eclosionó
  status: String,         // 'waiting', 'hatching', 'hatched'
  purchasedAt: Date,
  hatchedAt: Date
}
```

### Colección `transacciones`

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  amount: Number,        // positivo = ganado, negativo = gastado
  reason: String,        // 'actividad', 'compra_huevo', 'bonus_racha', 'evento'
  referenceId: ObjectId, // id de la actividad o del huevo
  timestamp: Date
}
```

---

## Algoritmo de rareza (cálculo de eclosión)

El servidor ejecuta este algoritmo cuando un usuario hace clic en “Eclosionar” sobre un huevo comprado.

```javascript
// utils/rarityCalculator.js

const RARITY_TABLE = {
  basico: {
    comun: 55, poco_comun: 28, raro: 12,
    epico: 4, legendario: 1, mitico: 0
  },
  premium: {
    comun: 35, poco_comun: 30, raro: 22,
    epico: 10, legendario: 2.5, mitico: 0.5
  },
  epico: {
    comun: 0, poco_comun: 40, raro: 35,
    epico: 20, legendario: 4, mitico: 1
  },
  legendario: {
    comun: 0, poco_comun: 10, raro: 50,
    epico: 30, legendario: 8, mitico: 2
  },
  mitico: {
    comun: 0, poco_comun: 0, raro: 15,
    epico: 45, legendario: 30, mitico: 10
  }
};

export function rollRarity(eggType) {
  const table = RARITY_TABLE[eggType];
  const roll = Math.random() * 100;
  let cumulative = 0;
  for (const [rarity, chance] of Object.entries(table)) {
    cumulative += chance;
    if (roll <= cumulative) return rarity;
  }
  return 'comun'; // fallback seguro
}

export function selectPetSpecies(rarity) {
  const petsByRarity = {
    comun: ['Gato Doméstico', 'Perro Labrador', 'Conejo', 'Hámster', 'Pez'],
    poco_comun: ['Zorro', 'Búho', 'Erizo', 'Pingüino', 'Ardilla'],
    raro: ['Lobo', 'Ciervo', 'Águila', 'Delfín', 'Pantera'],
    epico: ['Dragón de Agua', 'Grifo', 'Fénix Joven', 'Unicornio', 'Kitsune'],
    legendario: ['Dragón de Fuego', 'Pegaso', 'Quimera', 'Leviatán'],
    mitico: ['Dragón Celestial', 'Fénix Ancestral', 'Deidad Menor', 'Titán']
  };
  const pool = petsByRarity[rarity];
  return pool[Math.floor(Math.random() * pool.length)];
}
```

---

## Componentes clave del frontend

### `EggHatching.jsx`

Gestiona la animación de eclosión. Usa estados y `framer-motion` para las sacudidas, grietas y revelación final.

```jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { rollRarity, selectPetSpecies } from '../utils/rarityCalculator';

export function EggHatching({ eggType, onHatch }) {
  const [stage, setStage] = useState('IDLE');
  const [pet, setPet] = useState(null);

  const startHatching = async () => {
    setStage('SHAKING');
    await delay(1500);
    setStage('CRACKING');
    await delay(1000);
    const rarity = rollRarity(eggType);
    const species = selectPetSpecies(rarity);
    const newPet = { species, rarity, stage: 'huevo', pointsAccumulated: 0 };
    setPet(newPet);
    setStage('REVEALING');
    await delay(2000);
    setStage('DONE');
    onHatch(newPet);
  };

  return (
    <motion.div animate={stage === 'SHAKING' ? { rotate: [0, 10, -10, 5, -5, 0] } : {}}>
      <AnimatePresence>
        {stage === 'REVEALING' && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className={`rarity-${pet.rarity}`}>
            <img src={`/assets/pets/${pet.species}/egg.png`} alt={pet.species} />
            <span>{pet.rarity.toUpperCase()}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
```

### `PetModel.jsx`

Calcula la etapa de crecimiento y el porcentaje de progreso hacia la siguiente etapa.

```jsx
export function PetModel({ pet, points }) {
  const growthStage = useMemo(() => {
    if (points < 200) return 'egg';
    if (points < 800) return 'baby';
    if (points < 2500) return 'young';
    if (points < 8000) return 'adult';
    if (points < 25000) return 'evolved';
    return 'ascended';
  }, [points]);

  const growthPercentage = useMemo(() => {
    const stages = [0, 200, 800, 2500, 8000, 25000];
    const idx = stages.findIndex(s => s > points) - 1;
    const start = stages[Math.max(0, idx)];
    const end = stages[Math.min(stages.length-1, idx+1)];
    return ((points - start) / (end - start)) * 100;
  }, [points]);

  return (
    <div className="pet-card">
      <img src={`/assets/pets/${pet.species}/${growthStage}.webp`} alt={pet.name} />
      <div className="growth-bar"><div style={{ width: `${growthPercentage}%` }} /></div>
      <span>{growthStage}</span>
    </div>
  );
}
```

---

## Autenticación

El sistema soporta tres métodos de inicio de sesión:

- **Email + contraseña**: usando JWT (JSON Web Token). El backend compara hash con bcrypt.
- **Nombre de cuenta + contraseña**: alternativa para quienes prefieren no dar email.
- **Modo invitado**: permite probar el juego sin registro, pero el progreso no se guarda en la nube (se almacena en `localStorage` y se pierde al limpiar caché).

Las rutas protegidas verifican el token en cada petición. Socket.io también autentica mediante el token enviado en el handshake.

---

## Diseño responsive

La interfaz se adapta a tres rangos de pantalla:

| Dispositivo | Ancho         | Comportamiento |
|-------------|---------------|----------------|
| Móvil       | < 640px       | Vista simple: mascota principal en vertical, lista de tareas debajo. Navegación con pestañas en la parte inferior. |
| Tablet      | 640px – 1024px| Dos columnas: izquierda el mundo/colección, derecha la bitácora. Grid de huevos de 2 columnas. |
| Escritorio  | > 1024px      | Tres columnas: arte ASCII + panel de bienvenida, lista de actividades, tienda/colección. Efectos parallax y canvas 3D opcional. |

El arte ASCII se redimensiona automáticamente (fuente de 13px en escritorio, 10px en tablet, 8px en móvil) manteniendo la proporción.

---

## Diferenciadores clave

| Característica                               | THE WORLD | Adopt Me! | Talking Tom | Habitica |
|----------------------------------------------|-----------|-----------|-------------|----------|
| Basado en productividad real                 | ✅        | ❌        | ❌          | ✅       |
| Mascotas que crecen con tus hábitos          | ✅        | ✅        | Parcial     | ❌       |
| Rarezas con incentivo funcional (multiplicador) | ✅     | Solo colección | ❌      | ❌       |
| Web accesible (no requiere app nativa)       | ✅        | ❌ (Roblox) | App móvil  | ✅       |
| Huevos comprables con puntos, no con dinero real | ✅   | ❌ (Robux) | ❌         | ❌       |
| Interacción tipo cozy game + estética terminal | ✅     | ❌        | ✅          | ❌       |

---

## Instalación y despliegue

### Requisitos previos

- Node.js 18+ y npm
- MongoDB Atlas (o local) – una instancia gratuita es suficiente
- Cuenta en Render (para despliegue)

### Instalación local

```bash
git clone https://github.com/tu-usuario/the-world.git
cd the-world

# Instalar dependencias del backend y frontend
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..

# Configurar variables de entorno (copiar .env.example a .env)
cp server/.env.example server/.env
# Editar server/.env con DATABASE_URL, JWT_SECRET, PORT

# Ejecutar en desarrollo (concurrente)
npm run dev
```

El frontend estará en `http://localhost:5173` y el backend en `http://localhost:5000`.

### Despliegue en Render

1. Sube el código a un repositorio de GitHub.
2. En Render, crea un **Web Service** y conecta el repositorio.
3. Configura:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - Variables de entorno: las mismas del `.env` (`DATABASE_URL`, `JWT_SECRET`, `PORT`).
4. Asegúrate de que el servicio PostgreSQL de Render esté conectado y la URL esté disponible en `DATABASE_URL`.
5. Render generará una URL como `https://the-world.onrender.com`.

> Para el enrutamiento con React Router, añade un archivo `_redirects` en la carpeta `dist` con el contenido:  
> `/* /index.html 200`

---

## Roadmap

El desarrollo está planificado en cuatro fases:

### Fase 1 – MVP (completada)
- Registro y autenticación (email + invitado)
- CRUD de actividades
- Sistema de puntos básico
- Compra de huevo básico y eclosión simple
- 10 mascotas base
- Rarezas Común, Raro, Épico

### Fase 2 – Crecimiento (en desarrollo)
- Sistema de 6 etapas de crecimiento
- Tres tipos de huevo adicionales (Premium, Épico, Legendario)
- Rareza Legendario
- Rachas diarias y multiplicadores
- Multiplicadores pasivos por mascota rara
- Interacción básica con la mascota (clic, caricias)

### Fase 3 – Social (planificada)
- Intercambio de mascotas entre usuarios
- Mascotas de evento por tiempo limitado
- Huevo Mítico
- Visitar mundos de amigos (ver sus colecciones)
- Tabla de clasificación semanal por puntos y racha

### Fase 4 – Inmersivo (futuro)
- Modelos 3D con Three.js (mascotas en 3D)
- Personalización del hábitat (fondo, decoraciones)
- Minijuegos con tu mascota (carreras, memory)
- Realidad aumentada (AR) para móviles
- App nativa con React Native

---

## Créditos y licencia

**THE WORLD** © 2026  
Creado por WM  
Inspirado en *Adopt Me!*, *Talking Tom*, *Tamagotchi* y *Stardew Valley*.

Licencia: Uso libre.

---

```
                  +===+=====++++                  
             %+#=++++++%%%%*+=++++=+*             
          ==##**+%++%%+++%%%%+++=+**=+++          
        -=+##+**++*++*++=%%==+++++#+%**+++        
      -==**##+++=+#+**+=========+=*#+%+*+*=%      
     -=+%%%##***+**#*#**+========--==++#=*++%     
    -=+%#%%#**++++***@*+**+========-+*%%==+===    
   -==#%%%#*++****+++==--==--=====---=+*=%@+@*+   
  -==*%%%*++++*+===---------=====---===*%#**#**+  
 -===**%+=@*===+=---=----=-======---==+**#+*%%%#* 
 -====*%+====#*+==--------====------==%++***##*+% 
--===-*%+=@@=@+@=---------===-------==%+*****##***
-=======+#+=--==-*----=--====-----=======**+*+#+*#
==========+#*=======++=---===---------=%***++++##*
============*==++**+%#===--=-==-------===++##==#*#
===========+===#*+=**+=*%==============-==---==+*#
 =============+#*+++%+**++@========-==-======-=+% 
 ============+#++++====+++*==++===----=======--=% 
  ===========+#+++++==++++++++*+=-----=====---=%  
   ===========+#***+++****+*##*+==----=====---+   
    =============#%+++*+#*#%#%+===----====--==    
     ===========-=%%+*+=**#%%+====----=====-=     
      ============+##++=*#%+=====---======--      
        ===========##++=+*================        
          ========+#*++%+==--=-=========          
             ==-===+#+++=----==-====-             
                  =-========+===                  
```

> **THE WORLD** – Cada tarea cuenta. Cada mascota importa. Construye tu mundo, un hábito a la vez.