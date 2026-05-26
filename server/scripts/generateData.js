const fs = require('fs');

// --- GENERATE SHOP ITEMS ---
const shopItems = [];
const eggTypes = [
  { name: "Huevo de Barro", cost: 100, desc: "Lo más bajo. Solo comunes." },
  { name: "Huevo Básico", cost: 500, desc: "Alta probabilidad de Común." },
  { name: "Huevo de Cobre", cost: 800, desc: "Ligeramente mejor que el básico." },
  { name: "Huevo Premium", cost: 1500, desc: "Balanceado." },
  { name: "Huevo de Plata", cost: 2500, desc: "Más oportunidades de raros." },
  { name: "Huevo Épico", cost: 5000, desc: "Garantiza Poco Común." },
  { name: "Huevo de Oro", cost: 8000, desc: "Garantiza Raro." },
  { name: "Huevo Legendario", cost: 15000, desc: "Garantiza Raro alto." },
  { name: "Huevo de Platino", cost: 25000, desc: "Alto chance de Épico." },
  { name: "Huevo Mítico", cost: 50000, desc: "Poder absoluto." },
  { name: "Huevo Estelar", cost: 100000, desc: "Solo leyendas y mitos." },
  { name: "Huevo Cyberpunk", cost: 8000, desc: "Evento especial." },
  { name: "Huevo Fantasma", cost: 12000, desc: "Evento de Halloween." },
  { name: "Huevo de Cristal", cost: 30000, desc: "Evento cristalino." }
];

eggTypes.forEach(e => {
  shopItems.push({
    name: e.name, type: "egg", cost: e.cost, description: e.desc, icon: "🥚", cssClass: "bg-bg",
    probabilities: { comun: 20, poco_comun: 20, raro: 20, epico: 20, legendario: 10, mitico: 10 }
  });
});

const foods = [
  { name: "Semilla Pequeña", cost: 50, exp: 10, icon: "🌱" },
  { name: "Manzana Brillante", cost: 150, exp: 50, icon: "🍎" },
  { name: "Zanahoria Mágica", cost: 300, exp: 120, icon: "🥕" },
  { name: "Pescado Dorado", cost: 600, exp: 250, icon: "🐟" },
  { name: "Carne Premium", cost: 1000, exp: 500, icon: "🥩" },
  { name: "Galleta Cósmica", cost: 2500, exp: 1500, icon: "🍪" },
  { name: "Fruta del Edén", cost: 5000, exp: 3500, icon: "🍑" },
  { name: "Néctar Divino", cost: 12000, exp: 10000, icon: "🍯" },
  { name: "Estrella Fugaz", cost: 25000, exp: 25000, icon: "⭐" },
  { name: "Esencia de Agujero Negro", cost: 100000, exp: 150000, icon: "🌌" }
];

foods.forEach(f => shopItems.push({
  name: f.name, type: "food", cost: f.cost, description: `Da +${f.exp} EXP.`, icon: f.icon, cssClass: "bg-green-100 border-green-500"
}));

const potions = [
  { name: "Poción Menor de Suerte", cost: 500, desc: "+5% Suerte" },
  { name: "Poción Mayor de Suerte", cost: 2000, desc: "+15% Suerte" },
  { name: "Elixir de Dioses", cost: 15000, desc: "+50% Suerte" },
  { name: "Poción de Crecimiento Rápido", cost: 1000, desc: "Crecimiento instantáneo +1 etapa" },
  { name: "Poción de Evolución Máxima", cost: 15000, desc: "Alcanza la etapa Evolucionado directo" },
  { name: "Poción de Ascensión", cost: 50000, desc: "Fuerza la etapa Ascendido (Solo nivel max)" },
  { name: "Poción Shiny", cost: 100000, desc: "Vuelve tu mascota Brillante (Variante visual)" },
  { name: "Poción de Mutación", cost: 75000, desc: "Cambia la especie manteniendo la rareza." },
  { name: "Elixir de Renacimiento", cost: 250000, desc: "Resetea la mascota, +1 al multiplicador de stats." }
];

potions.forEach(p => shopItems.push({
  name: p.name, type: "potion", cost: p.cost, description: p.desc, icon: "🧪", cssClass: "bg-blue-100 border-blue-500"
}));

const cosmetics = [
  { name: "Aura de Fuego", cost: 5000 },
  { name: "Aura de Hielo", cost: 5000 },
  { name: "Aura Galáctica", cost: 20000 },
  { name: "Sombrero de Copa", cost: 1500 },
  { name: "Gafas de Sol", cost: 1000 },
  { name: "Corona de Rey", cost: 50000 },
  { name: "Fondo: Bosque", cost: 2000 },
  { name: "Fondo: Volcán", cost: 4000 },
  { name: "Fondo: Cyberpunk", cost: 10000 },
  { name: "Fondo: Reino Celestial", cost: 35000 }
];

cosmetics.forEach(c => shopItems.push({
  name: c.name, type: "cosmetic", cost: c.cost, description: "Objeto cosmético para personalizar.", icon: "✨", cssClass: "bg-purple-100 border-purple-500"
}));

// --- GENERATE PETS ---
const pets = [];
const speciesList = {
  "comun": ["Gato", "Perro", "Conejo", "Hámster", "Pez", "Paloma", "Tortuga", "Ratón", "Pollo", "Rana", "Lagartija", "Pato", "Cabra", "Vaca", "Oveja", "Cerdo"],
  "poco_comun": ["Zorro", "Búho", "Erizo", "Pingüino", "Ardilla", "Mapache", "Camaleón", "Loro", "Castor", "Armadillo", "Zorrillo", "Llama", "Alpaca", "Canguro"],
  "raro": ["Lobo", "Ciervo", "Águila", "Delfín", "Pantera", "Oso Polar", "Mantarraya", "Tiburón", "Tigre", "León", "Gorila", "Cocodrilo", "Serpiente", "Murciélago", "Halcón", "Toro"],
  "epico": ["Dragón de Agua", "Grifo", "Fénix Joven", "Unicornio", "Kitsune", "Basilisco", "Wyvern", "Golem", "Ent", "Kraken Bebé", "Manticora", "Pegaso de Viento", "Gárgola", "Minotauro"],
  "legendario": ["Dragón de Fuego", "Pegaso", "Quimera", "Leviatán", "Cerbero", "Kraken Mayor", "Hidra", "Dragón de Hielo", "Dragón de Tormenta", "Odin's Lobo", "Esfinge", "Yeti", "Wendigo", "Fénix Maduro", "Dragón de Tierra"],
  "mitico": ["Dragón Celestial", "Fénix Ancestral", "Deidad Menor", "Titán", "Behemoth", "Leviatán Cósmico", "Serpiente del Mundo", "Dragón del Vacío", "Dios Lobo", "Kitsune Divino", "Unicornio Estelar", "Grifo de Luz", "Guardián del Tiempo", "Anomalía Cuántica", "Dragón del Caos"]
};
const stages = ["huevo", "bebe", "joven", "adulto", "evolucionado", "ascendido"];

let nameCounter = 1;

for (const [rarity, speciesArr] of Object.entries(speciesList)) {
  speciesArr.forEach(sp => {
    // Generate 3 pets of each species
    for(let i=0; i<3; i++) {
      pets.push({
        species: sp,
        name: `${sp} ${nameCounter++}`,
        rarity: rarity,
        stage: stages[Math.floor(Math.random() * stages.length)],
        pointsAccumulated: Math.floor(Math.random() * 50000),
        eggOrigin: "random",
        isFavorite: Math.random() > 0.95,
        createdAt: new Date().toISOString()
      });
    }
  });
}

fs.writeFileSync('1_shopitems_masivo.json', JSON.stringify(shopItems, null, 2));
fs.writeFileSync('3_pets_masivo.json', JSON.stringify(pets, null, 2));

console.log("¡Archivos masivos generados con éxito!");
console.log(`Tienda: ${shopItems.length} ítems.`);
console.log(`Mascotas: ${pets.length} mascotas.`);
