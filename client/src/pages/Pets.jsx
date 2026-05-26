import React, { useEffect, useState } from 'react';
import PetAsciiDisplay from '../components/pets/PetAsciiDisplay';
import WindowPanel from '../components/WindowPanel';

const defaultPets = [
  { _id: '1', species: 'Dragón de Fuego', name: 'Ignis', rarity: 'legendario', stage: 'adulto', isFavorite: false },
  { _id: '2', species: 'Zorro', name: 'Kurama', rarity: 'poco_comun', stage: 'evolucionado', isFavorite: false },
  { _id: '3', species: 'Dragón Celestial', name: 'Aurelion', rarity: 'mitico', stage: 'ascendido', isFavorite: true },
  { _id: '4', species: 'Gato', name: 'Misu', rarity: 'comun', stage: 'joven', isFavorite: false },
  { _id: '5', species: 'Unicornio', name: 'Estrella', rarity: 'epico', stage: 'adulto', isFavorite: false }
];

const rarityLabels = {
  mitico: 'Mítico',
  legendario: 'Legendario',
  epico: 'Épico',
  raro: 'Raro',
  poco_comun: 'Poco común',
  comun: 'Común'
};

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/pets')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setPets(data);
        } else {
          setPets(defaultPets);
        }
      })
      .catch(() => setPets(defaultPets))
      .finally(() => setLoading(false));
  }, []);

  const rarityOrder = { mitico: 0, legendario: 1, epico: 2, raro: 3, poco_comun: 4, comun: 5 };
  const filtered = filter === 'all' ? [...pets].sort((a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity]) : pets.filter((p) => p.rarity === filter);

  const totalBonus = pets.reduce((sum, pet) => {
    const bonus = {
      comun: 0,
      poco_comun: 0.1,
      raro: 0.3,
      epico: 0.5,
      legendario: 0.8,
      mitico: 1.5
    };
    return sum + (bonus[pet.rarity] || 0);
  }, 0);

  const rarityFilters = ['all', 'mitico', 'legendario', 'epico', 'raro', 'poco_comun', 'comun'];

  if (loading) {
    return <div className="p-4 text-center text-grey font-mono animate-pulse">cargando colección...</div>;
  }

  return (
    <div className="grid gap-6">
      <WindowPanel title="mascotas" subtitle="colección" icon="🐾" extra={`bonus +${totalBonus.toFixed(1)}x`}>
        <div className="section-grid cols-3">
          <div className="tile-card">
            <div className="panel-label">total</div>
            <div className="panel-value">{pets.length}</div>
            <div className="panel-note">Mascotas registradas en tu mundo.</div>
          </div>
          <div className="tile-card">
            <div className="panel-label">favorita</div>
            <div className="panel-value">{pets.find((pet) => pet.isFavorite)?.name || 'ninguna'}</div>
            <div className="panel-note">La mascota favorita obtiene un bonus extra.</div>
          </div>
          <div className="tile-card">
            <div className="panel-label">etapas</div>
            <div className="panel-value">6</div>
            <div className="panel-note">Desde huevo hasta ascendido con crecimiento.</div>
          </div>
        </div>
      </WindowPanel>

      <WindowPanel title="explorar" subtitle="filtrar rarezas" icon="🔎">
        <div className="flex flex-wrap gap-2">
          {rarityFilters.map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`action-button ${filter === key ? 'bg-beige2 border-dark text-dark' : ''}`}
            >
              {key === 'all' ? 'todas' : rarityLabels[key]}
            </button>
          ))}
        </div>
      </WindowPanel>

      <WindowPanel title="colección" subtitle="tarjetas de mascotas" icon="📚">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((pet) => (
            <button
              key={pet._id}
              onClick={() => setSelectedPet(pet)}
              className={`p-4 rounded-3xl border border-beige bg-[rgba(248,244,239,0.85)] hover:shadow-lg transition-all text-left ${selectedPet?._id === pet._id ? 'ring-1 ring-dark' : ''}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm text-grey uppercase tracking-[.2em]">{rarityLabels[pet.rarity]}</div>
                  <div className="text-base font-semibold text-dark">{pet.name}</div>
                </div>
                <div className="text-[12px] text-grey">{pet.stage}</div>
              </div>
              <PetAsciiDisplay pet={pet} compact={true} />
            </button>
          ))}
        </div>
      </WindowPanel>

      {selectedPet && (
        <WindowPanel title="detalle" subtitle="mascota seleccionada" icon="✨">
          <div className="grid gap-5 lg:grid-cols-[0.95fr_0.75fr]">
            <div className="tile-card">
              <PetAsciiDisplay pet={selectedPet} accessory={selectedPet.isFavorite ? 'corona' : 'none'} />
            </div>
            <div className="grid gap-3">
              <div className="tile-card">
                <div className="panel-label">especie</div>
                <div className="panel-value">{selectedPet.species}</div>
              </div>
              <div className="tile-card">
                <div className="panel-label">rareza</div>
                <div className="panel-value">{rarityLabels[selectedPet.rarity]}</div>
              </div>
              <div className="tile-card">
                <div className="panel-label">etapa</div>
                <div className="panel-value">{selectedPet.stage}</div>
              </div>
              <button onClick={() => setSelectedPet(null)} className="action-button">Cerrar detalle</button>
            </div>
          </div>
        </WindowPanel>
      )}
    </div>
  );
}
