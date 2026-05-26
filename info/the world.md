# el prototipo

---

## ¿qué es? y ¿para qué sirve?

un prototipo es un **objeto de prueba** que permite que una idea se transforme en un proyecto tangible.
su propósito es hacer visible y concreta una propuesta, facilitando la exploración, la comunicación y la detección temprana de errores.

> «es mejor construir lo que pensamos en lugar de pensar lo que construimos.»

una de las características más valiosas del prototipo es que **puedes equivocarte y no ocurrirá nada**: equivocarse en esta etapa es barato, rápido y forma parte natural del proceso de diseño.

---

## tipos de prototipos

- **maqueta**
  representación física a escala o esquemática del producto. permite estudiar volúmenes, formas y distribución espacial.
- **vídeo**
  secuencia audiovisual que simula el funcionamiento, el contexto de uso o la experiencia del usuario sin necesidad de construir el producto real.
- **representación teatral**
  puesta en escena de una situación de uso o de un servicio. ayuda a empatizar con los usuarios y a visualizar interacciones.
- **storyboard**
  conjunto de viñetas o ilustraciones que narran, paso a paso, cómo una persona utilizará el producto o servicio.
  
 ---

## etapas del prototipo

1. **pre‑prototipo (boceto inicial)**
   dibujo rápido, esquema o descripción básica de la idea. sirve para plasmar el concepto antes de invertir tiempo en una construcción más elaborada.
2. **prototipo de baja fidelidad**
   versión simple y de bajo costo (papel, cartón, wireframes digitales). ideal para probar la lógica y la estructura general.
3. **prototipo de alta fidelidad**
   representación más detallada y cercana al producto final (modelo funcional, simulación interactiva). se utiliza para validar aspectos concretos con usuarios reales.

---

## instrucciones de la actividad

1. **trabajo en binas**
   cada bina desarrollará la propuesta: el **borrador de un proyecto**.
2. **selección en equipo**
   el grupo completo elegirá la **mejor propuesta** entre todas las presentadas.
3. **desarrollo final y entrega**
   el equipo desarrollará con mayor detalle la propuesta seleccionada y la presentará en un **documento de texto en formato pdf**.
   el documento debe contener obligatoriamente los siguientes apartados:
   
   - **portada**
   - **borrador trabajado con tu bina**
   - **borrador de la propuesta seleccionada**
   - **maquetado desarrollado** (representación gráfica o física del prototipo)

---

## propuesta

# THE WORLD: Gamified Productivity & Virtual Pets Platform

> *"Convierte tu productividad en un ecosistema vivo. Cada tarea completada te acerca a tu próxima mascota legendaria."*

![The World Banner](https://img.shields.io/badge/THE-WORLD-8A2BE2?style=for-the-badge&logo=react&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Status](https://img.shields.io/badge/status-concept-brightgreen)

---

## Tabla de Contenidos

- [Visión General](#-visión-general)
- [Características Principales](#-características-principales)
- [Interfaz "Caído" (Cozy UI)](#️-interfaz-caído-cozy-ui)
- [Sistema de Actividades](#-sistema-de-actividades)
- [Sistema de Puntos](#-sistema-de-puntos)
- [Sistema de Huevos](#-sistema-de-huevos)
- [Mascotas & Crecimiento](#-mascotas--crecimiento)
- [Rarezas & Probabilidades](#-rarezas--probabilidades)
- [Flujo de Usuario](#-flujo-de-usuario)
- [Arquitectura en React](#-arquitectura-en-react)
- [Paleta de Diseño](#-paleta-de-diseño)
- [Roadmap](#-roadmap)

---

## Visión General

**THE WORLD** es una plataforma web donde tu productividad diaria se transforma en una experiencia de colección y crianza de mascotas virtuales. Similar a *Adopt Me!* de Roblox combinado con la interactividad de *Talking Tom*, pero enfocado en gamificar tus hábitos reales.

| Elemento | Inspiración |
|----------|-------------|
| Colección de mascotas | 🐾 Adopt Me! |
| Interacción con mascota | 😺 Talking Tom |
| Gamificación de tareas | ✅ Habitica |
| Estilo visual | 🍂 Cozy Games (Stardew Valley, Animal Crossing) |

---

## Características Principales

- **Registro de actividades diarias**: Ejercicio, estudio, trabajo, lectura, etc.
- **Compra de huevos con puntos**: Diferentes tipos de huevo con distintas probabilidades de rareza.
- **Eclosión y crecimiento**: La mascota evoluciona conforme acumulas más puntos.
- **Sistema de rarezas**: Común, Poco Común, Raro, Épico, Legendario, Mítico.
- **Incentivo por rareza**: Mascotas más raras otorgan multiplicadores de puntos.
- **Tu propio mundo**: Un espacio personal donde ver tus mascotas interactuando.
- **Sincronización en la nube**: Tu progreso se guarda en tu cuenta.

---

## Interfaz "Caído" (Cozy UI)

El diseño sigue la filosofía **"caído"** (cozy/casual): una experiencia relajada, sin presión, con animaciones suaves y transiciones orgánicas.

### Principios de diseño:

┌─────────────────────────────────────────┐
│ 🌿 Colores tierra, pasteles suaves │
│ 🍂 Animaciones de caída y flotación │
│ 🧸 Iconografía redondeada y amigable │
│ 🎐 Sonidos ambientales suaves │
│ ☁️ Transiciones tipo "parallax lento" │
│ 🫧 Microinteracciones satisfactorias │
└─────────────────────────────────────────┘

### Mockup conceptual de la pantalla principal:

╔══════════════════════════════════════════════════╗
║ ☁️ ☁️ 🏔️ THE WORLD ☁️ ☁️ ║
║ ║
║ ┌─────────────────────────┐ ┌──────────────┐ ║
║ │ │ │ 💎 2,450 pts │ ║
║ │ 🦊 Tu mascota │ │ Nivel: 12 │ ║
║ │ "Foxy" │ │ ⭐⭐⭐⭐ │ ║
║ │ Rareza: Épico │ │ │ ║
║ │ Crecimiento: 78% │ │ 🥚 Comprar │ ║
║ │ ████████░░ │ │ huevo │ ║
║ └─────────────────────────┘ └──────────────┘ ║
║ ║
║ ┌──────────────────────────────────────────┐ ║
║ │ 🏃 Ejercicio matutino +150 pts ⭐ │ ║
║ │ 📚 Leer 30 min +100 pts │ ║
║ │ 💻 Completar proyecto +500 pts 🔥 │ ║
║ │ 🧘 Meditación +75 pts │ ║
║ │ ＋ Añadir actividad │ ║
║ └──────────────────────────────────────────┘ ║
║ ║
║ [🏠 Home] [📝 Tareas] [🥚 Huevos] [🐾 Mascotas] [👤 Perfil] ║
╚══════════════════════════════════════════════════╝

---

## Sistema de Actividades

Cada actividad completada otorga puntos base según su categoría y dificultad.

### Categorías de actividades:

| Categoría | Ejemplos | Puntos Base |
|-----------|----------|-------------|
| 🏃 **Deporte** | Correr, gimnasio, yoga | 100 - 300 |
| 📚 **Aprendizaje** | Leer, cursos, idiomas | 80 - 250 |
| 💼 **Trabajo** | Completar tareas laborales | 120 - 400 |
| 🧘 **Bienestar** | Meditar, dormir 8h, hidratarse | 50 - 150 |
| 🎨 **Creatividad** | Dibujar, escribir, música | 100 - 200 |
| 🏠 **Hogar** | Limpiar, cocinar, organizar | 60 - 180 |

### Multiplicadores por racha ASCII (streak):

Día 1: x1.0 ░░░░░
Día 3: x1.2 ██░░░
Día 7: x1.5 ███░░
Día 14: x2.0 ████░
Día 30: x3.0 █████ 

### Registro de actividad (formato JSON):

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

## Sistema de Puntos

Los puntos son la moneda principal de **THE WORLD**.

#### Cómo se obtienen:

|  Fuente  |  Cantidad  |
|----------|------------|
|  Actividades completadas   |  50 - 400 pts |
|  Rachas diarias   |  Multiplicador x1.2 - x3.0   |
|  Mascotas raras (bonus pasivo)   |  +10% - +100%   |
|  Eventos especiales  |  2x puntos   |
|  Mascota favorita interactuando  |  +5% extra   |

#### Umbrales importantes:

     0 pts  → 🥚 Sin huevo (estado inicial)
   500 pts  → 🥚 Puedes comprar Huevo Básico
 1,500 pts  → 🥚🥚 Puedes comprar Huevo Premium
 5,000 pts  → 🥚🥚🥚 Puedes comprar Huevo Épico
15,000 pts → 🥚🥚🥚🥚 Puedes comprar Huevo Legendario

---

## Sistema de Huevos

Los huevos son el método para obtener nuevas mascotas. Cada huevo tiene un costo en puntos y un conjunto de probabilidades de rareza.

### Tipos de huevo:
┌─────────────────────────────────────────────────────────────────┐
│                      TIPOS DE HUEVO                             │
├──────────────┬──────────┬──────────────────────────────────────┤
│  🥚 Básico   │  500 pts │ Alta prob. de común, baja de raro    │
│  🥚 Premium  │ 1,500 pts│ Balanceado, mayor chance de épico    │
│  🥚 Épico    │ 5,000 pts│ Garantiza Poco Común o mejor         │
│  🥚 Legend.  │ 15,000 pt│ Garantiza Raro o mejor               │
│  🥚 Mítico   │ 50,000 pt│ Garantiza Épico o mejor              │
│  🥚 Evento   │ Variable │ Mascotas exclusivas por tiempo       │
└──────────────┴──────────┴──────────────────────────────────────┘

### Animación de eclosión
   🥚
  /   \
 │     │  Fase 1: El huevo aparece
 │ 🥚  │
  \___/
  
   🥚
  /   \    Fase 2: Se agrieta (sacudidas)
 │ 💥  │   Animación: shake + partículas
  \___/
  
   🐣      Fase 3: Eclosión
  / ❤️ \   Animación: confeti + sonido
 │ 🐾  │   Revelación de rareza
  \___/

## Mascotas & Crecimiento

Cada mascota pasa por etapas de crecimiento vinculadas a los puntos acumulados desde su eclosión.

### Etapas de crecimiento:

|  Etapa   |  Puntos necesarios |  Descripción visual |
|----------|--------------------|---------------------|
|  🥚 Huevo   |  0 - 200  |  Solo se ve el huevo   |
|  🐣 Bebé |  200 - 800   |  Versión diminuta, animaciones tiernas   |
|  🐥 Joven   |  800 - 2,500 |  Tamaño mediano, empieza a interactuar   |
|  🦊 Adulto  |  2,500 - 8,000  |  Tamaño completo, todas las interacciones   |
|  🦅 Evolucionado  |  8,000 - 25,000 |  Apariencia mejorada, brillo/aura  |
|  🌟 Ascendido  |  25,000+  |  Efectos especiales, animación única  |

### Ejemplo: Zorro Común

Puntos:   0 ────── 200 ────── 800 ────── 2500 ────── 8000 ────── 25000+
           │        │         │         │          │           │
         🥚      🐣        🐥       🦊         🦊✨        🦊🌟
        Huevo   Bebé     Joven    Adulto    Evoluc.    Ascendido
                                         (aura azul) (aura dorada)

---

## Rarezas & Probabilidades

### Escala de rarezas:

Común        ████████░░░░░░░░░░  ~50%  | Multiplicador x0.0
Poco Común   ██████░░░░░░░░░░░░  ~25%  | Multiplicador x0.1
Raro         ████░░░░░░░░░░░░░░  ~14%  | Multiplicador x0.3
Épico        ██░░░░░░░░░░░░░░░░  ~7%   | Multiplicador x0.5
Legendario   █░░░░░░░░░░░░░░░░░  ~3%   | Multiplicador x0.8
Mítico       ░░░░░░░░░░░░░░░░░░  ~1%   | Multiplicador x1.5

### Probabilidades por tipo de huevo:

|  Rareza  |  🥚 Básico   |  🥚 Premium  |  🥚 Épico  |  🥚 Legendario  |  🥚 Mítico |
|  -----   |   ---------   |  ----------  |  ---------  |   -----------   |   -------   |
|  Común   |  55%   |  35%   |  0% |  0% |  0%  |
|  Poco Común |  28%   |  30%   |  40%	|  10%   |	0% |
|  Raro |  12%   |  22%   |  35%   |  50%   |	15%   |
|  Épico   |	4% |	10%   |	20%   |	30%   |	45%   |
|  Legendario |	1% |	2.5%  |	4% |	8% |	30%   |
|  Mítico  |  0% |  0.5%  |  1% |  2% |  10% |

### Incentivo por rareza:
> Cada mascota rara que posees otorga un multiplicador permanente de puntos.Cada mascota rara que posees otorga un multiplicador permanente de puntos.
Bonus total = Σ (multiplicador de cada mascota)

Ejemplo:
  - 3 mascotas Comunes      → 3 × 0.0 = 0.0
  - 1 mascota Épica         → 1 × 0.5 = 0.5
  - 1 mascota Legendaria    → 1 × 0.8 = 0.8
  ─────────────────────────────────────
  Bonus total:               +1.3x puntos extra en todas las actividades

---

## Flujo de Usuario

```graph
graph TD
    A[Usuario completa actividad] --> B[Registra en THE WORLD]
    B --> C[Recibe puntos]
    C --> D{¿Tiene suficientes puntos?}
    D -->|Sí| E[Compra un huevo]
    D -->|No| A
    E --> F[El huevo eclosiona]
    F --> G[Revela mascota y rareza]
    G --> H[Mascota aparece en tu mundo]
    H --> I[Los puntos posteriores alimentan su crecimiento]
    I --> J[Mascota crece y evoluciona]
    J --> K[Mascota otorga bonus de puntos]
    K --> A
```

### Onboarding paso a paso:

1. Registro — Creas tu cuenta con email o redes sociales.
2. Primera actividad — El sistema te regala un Huevo Básico.
3. Eclosión tutorial — Obtienes tu primera mascota (siempre Común o Poco Común).
4. Descubrimiento — Aprendes a registrar actividades y acumular puntos.
5. Primera compra — Con 500 pts compras tu segundo huevo.
6. Engagement loop — El ciclo se repite: tareas → puntos → huevos → mascotas → bonus → más puntos.

---

## 🧩 Arquitectura en React

### Stack tecnológico:

```json
{
  "frontend": {
    "framework": "React 18",
    "build": "Vite",
    "styling": "TailwindCSS + Framer Motion",
    "state": "Zustand + React Query",
    "routing": "React Router v6",
    "3d/animation": "Three.js / React Three Fiber",
    "sound": "Howler.js"
  },
  "backend": {
    "runtime": "Node.js + Express",
    "database": "PostgreSQL + Redis",
    "auth": "JWT + OAuth2",
    "realtime": "Socket.io"
  }
}
```

### Estructura del proyecto:

```
the-world/
├── src/
│   ├── components/
│   │   ├── ui/                  # Componentes cozy UI
│   │   │   ├── FloatingParticle.jsx
│   │   │   ├── SoftButton.jsx
│   │   │   ├── EggDisplay.jsx
│   │   │   └── ProgressBar.jsx
│   │   ├── pets/                # Componentes de mascotas
│   │   │   ├── PetModel.jsx     # Modelo 3D/2D de mascota
│   │   │   ├── PetAnimation.jsx # Animaciones por etapa
│   │   │   ├── EggHatching.jsx  # Secuencia de eclosión
│   │   │   └── RarityReveal.jsx # Revelación de rareza
│   │   ├── activities/          # Registro de actividades
│   │   │   ├── ActivityForm.jsx
│   │   │   ├── ActivityList.jsx
│   │   │   └── StreakTracker.jsx
│   │   └── world/               # El mundo principal
│   │       ├── WorldCanvas.jsx
│   │       ├── PetCollection.jsx
│   │       └── EggShop.jsx
│   ├── hooks/
│   │   ├── usePoints.js
│   │   ├── usePets.js
│   │   ├── useEggs.js
│   │   └── useStreak.js
│   ├── store/
│   │   ├── userStore.js         # Zustand store
│   │   └── worldStore.js
│   ├── utils/
│   │   ├── rarityCalculator.js
│   │   ├── growthCalculator.js
│   │   └── eggProbabilities.js
│   └── pages/
│       ├── Home.jsx
│       ├── Activities.jsx
│       ├── EggShop.jsx
│       ├── PetCollection.jsx
│       └── Profile.jsx
└── public/
    ├── assets/
    │   ├── pets/                # Sprites/modelos de mascotas
    │   ├── eggs/                # Imágenes de huevos
    │   └── sounds/              # Efectos de sonido
    └── locales/                 # i18n
```

### Componente clave: `EggHatching.jsx`
```jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRarityCalculator } from '../hooks/useRarityCalculator';

const EGG_STATES = ['IDLE', 'SHAKING', 'CRACKING', 'REVEALING', 'DONE'];

export function EggHatching({ eggType, onHatch }) {
  const [stage, setStage] = useState('IDLE');
  const [pet, setPet] = useState(null);
  const { calculatePet } = useRarityCalculator();

  const startHatching = async () => {
    setStage('SHAKING');
    await delay(1500);
    setStage('CRACKING');
    await delay(1000);
    
    const newPet = calculatePet(eggType);
    setPet(newPet);
    setStage('REVEALING');
    
    await delay(2000);
    setStage('DONE');
    onHatch(newPet);
  };

  return (
    <motion.div 
      className="egg-container"
      animate={stage === 'SHAKING' ? { rotate: [0, 10, -10, 5, -5, 0] } : {}}
      transition={{ repeat: stage === 'SHAKING' ? Infinity : 0, duration: 0.3 }}
    >
      {/* Contenido del huevo y animaciones */}
      <AnimatePresence>
        {stage === 'REVEALING' && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`rarity-${pet.rarity.toLowerCase()}`}
          >
            <img src={pet.sprite} alt={pet.name} />
            <RarityBadge rarity={pet.rarity} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
```

### Componente: `PetModel.jsx` (Crecimiento progresivo)
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
    const currentStageIndex = stages.findIndex(s => s > points) - 1;
    const stageStart = stages[Math.max(0, currentStageIndex)];
    const stageEnd = stages[Math.min(stages.length - 1, currentStageIndex + 1)];
    return ((points - stageStart) / (stageEnd - stageStart)) * 100;
  }, [points]);

  return (
    <div className="pet-display">
      <img 
        src={`/assets/pets/${pet.species}/${growthStage}.webp`} 
        alt={`${pet.name} - ${growthStage}`}
        className={`pet-sprite rarity-glow-${pet.rarity.toLowerCase()}`}
      />
      <div className="growth-bar">
        <div 
          className="growth-fill" 
          style={{ width: `${growthPercentage}%` }}
        />
      </div>
      <span className="stage-label">{growthStage}</span>
    </div>
  );
}
```

---

## Paleta de Diseño

### Colores Cozy:
```
┌──────────────────────────────────────────┐
│  🎨 TEMA CLARO (CAÍDO)                  │
├──────────────────────────────────────────┤
│  Fondo principal:    #FDF6E3  (Crema)   │
│  Fondo secundario:   #F5EDD6  (Arena)   │
│  Texto principal:    #4A3728  (Café)    │
│  Acento verde:       #7C9A6E  (Musgo)   │
│  Acento naranja:     #E8A87C  (Melón)   │
│  Acento rosa:        #D4A5A5  (Rosado)  │
│  Sombras:            rgba(74,55,40,0.1) │
│  Bordes:             #D4C5B2            │
└──────────────────────────────────────────┘
```

### Colores por rareza:

|  Rareza   |	Color |	Gradiente CSS  |
|-----------|--------|-----------------|
|  Común | #9E9E9E   |  linear-gradient(135deg, #bdbdbd, #757575) |
|  Poco Común  |	#4CAF50  |  linear-gradient(135deg, #66BB6A, #388E3C) |
|  Raro  |	#2196F3  |  linear-gradient(135deg, #42A5F5, #1976D2) |
|  Épico |	#9C27B0  |  linear-gradient(135deg, #AB47BC, #7B1FA2) |
|  Legendario  |	#FF9800  |  linear-gradient(135deg, #FFA726, #F57C00) |
|  Mítico   |	#F44336  |  linear-gradient(135deg, #EF5350, #C62828) + brillo |

---

## Roadmap

```
FASE 1 — MVP
├── ✅ Registro de usuarios
├── ✅ CRUD de actividades
├── ✅ Sistema de puntos básico
├── ✅ Compra de huevo básico
├── ✅ Eclosión simple
├── ✅ 10 mascotas base
└── ✅ Rarezas Común, Raro, Épico

FASE 2 — Crecimiento
├── 🔄 Sistema de crecimiento por etapas
├── 🔄 3 tipos de huevo
├── 🔄 Rareza Legendario
├── 🔄 Rachas diarias
├── 🔄 Multiplicadores por mascota
└── 🔄 Interacción básica con mascota

FASE 3 — Social
├── 📋 Intercambio de mascotas entre usuarios
├── 📋 Mascotas de evento por tiempo limitado
├── 📋 Huevo Mítico
├── 📋 Visitar mundos de amigos
└── 📋 Tabla de clasificación semanal

FASE 4 — Inmersivo
├── 🎮 Modelos 3D con Three.js
├── 🎮 Personalización de hábitat
├── 🎮 Minijuegos con tu mascota
├── 🎮 Realidad Aumentada (AR)
└── 🎮 App móvil con React Native
```

---

## Modelo de Datos

```sql
-- Tabla simplificada del esquema

USUARIOS
  id UUID PK
  username VARCHAR
  email VARCHAR
  total_puntos INT DEFAULT 0
  racha_actual INT DEFAULT 0
  mejor_racha INT DEFAULT 0
  bonus_mult DECIMAL DEFAULT 1.0
  created_at TIMESTAMP

MASCOTAS
  id UUID PK
  usuario_id UUID FK
  especie VARCHAR
  nombre VARCHAR
  rareza ENUM('comun','poco_comun','raro','epico','legendario','mitico')
  etapa ENUM('huevo','bebe','joven','adulto','evolucionado','ascendido')
  puntos_acumulados INT DEFAULT 0
  huevo_origen ENUM('basico','premium','epico','legendario','mitico','evento')
  es_favorita BOOLEAN DEFAULT false
  created_at TIMESTAMP

ACTIVIDADES
  id UUID PK
  usuario_id UUID FK
  categoria VARCHAR
  descripcion TEXT
  puntos_obtenidos INT
  timestamp TIMESTAMP

TRANSACCIONES_HUEVOS
  id UUID PK
  usuario_id UUID FK
  tipo_huevo VARCHAR
  costo_puntos INT
  mascota_resultante_id UUID FK
  timestamp TIMESTAMP
```

---

## Cálculo de rareza (Algoritmo)

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
    if (roll <= cumulative) {
      return rarity;
    }
  }
  
  return 'comun'; // fallback
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

## Sistema de Autenticación
```
Métodos de inicio de sesión:
├── 📧 Email + contraseña (JWT)
├── 🔐 Nombre de cuenta + contraseña
└── 👻 Modo invitado (progreso limitado, no guarda en nube)
```

---

## Responsive Design
```
┌──────────────┐  ┌──────────────────┐  ┌─────────────────────────┐
│   MÓVIL      │  │   TABLET         │  │   DESKTOP               │
│   < 640px    │  │   640px - 1024px │  │   > 1024px              │
├──────────────┤  ├──────────────────┤  ├─────────────────────────┤
│ Vista simple │  │ 2 columnas       │  │ Vista completa del      │
│ de mascota   │  │ Mascota + tareas │  │ mundo con parallax      │
│ Lista de     │  │ Huevos en grid   │  │ y todas las mascotas    │
│ tareas       │  │ de 2             │  │ visibles interactuando  │
│ Stack vertical│ │ Navegación tabs  │  │ Sidebar + canvas 3D     │
└──────────────┘  └──────────────────┘  └─────────────────────────┘
```

---

## Diferenciadores clave

|  Característica |  THE WORLD   |  Adopt Me!   |  Talking Tom |
|  Basado en productividad real  |  ✅ |  ❌ |  ❌ |
|  Mascotas que crecen con tus hábitos |  ✅ |  ✅ |  Parcial  |
|  Rarezas con incentivo funcional  |  ✅ |  ✅ (solo colección)	❌ |
|  Web accesible (no app nativa) |  ✅ |  ❌ (Roblox) |  App móvil   |
|  Sistema de huevos comprables con puntos   |  ✅ |  ✅ (Robux)  |  ❌ |
|  Interacción tipo cozy game |  ✅ |  ❌ |  ✅ |

---

## Instalación rápida (Dev)

```bash
# Clonar el repositorio
git clone https://github.com/tu-org/the-world.git
cd the-world

# Instalar dependencias
npm install

# Variables de entorno
cp .env.example .env.local
# Configurar API keys en .env.local

# Iniciar desarrollo
npm run dev

# Visitar
# http://localhost:5173
```

---

## Créditos & Licencia
```
THE WORLD © 2026
Creado por WM💚
Inspirado en Adopt Me!, Talking Tom, Habitica y Stardew Valley

Licencia: Uso libre
```

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

> 🌍 THE WORLD — Cada tarea cuenta. Cada mascota importa. Construye tu mundo, un hábito a la vez.