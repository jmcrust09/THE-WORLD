import React, { useEffect, useState } from 'react';
import PetAsciiDisplay from '../components/pets/PetAsciiDisplay';

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('http://localhost:5000/api/pets')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setPets(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback demo pets if backend not running
        setPets([
          { _id: '1', species: 'Dragón de Fuego',   name: 'Ignis',    rarity: 'legendario', stage: 'adulto',       isFavorite: false },
          { _id: '2', species: 'Zorro',              name: 'Kurama',   rarity: 'poco_comun', stage: 'evolucionado', isFavorite: false },
          { _id: '3', species: 'Dragón Celestial',   name: 'Aurelion', rarity: 'mitico',     stage: 'ascendido',    isFavorite: true  },
          { _id: '4', species: 'Gato',               name: 'Misu',     rarity: 'comun',      stage: 'joven',        isFavorite: false },
          { _id: '5', species: 'Unicornio',          name: 'Estrella', rarity: 'epico',      stage: 'adulto',       isFavorite: false },
          { _id: '6', species: 'Lobo',               name: 'Fantasma', rarity: 'raro',       stage: 'evolucionado', isFavorite: false },
          { _id: '7', species: 'Fénix Ancestral',    name: 'Renacer',  rarity: 'mitico',     stage: 'evolucionado', isFavorite: false },
          { _id: '8', species: 'Kitsune',            name: 'Nueve',    rarity: 'epico',      stage: 'joven',        isFavorite: false },
          { _id: '9', species: 'Conejo',             name: 'Saltos',   rarity: 'comun',      stage: 'bebe',         isFavorite: false },
        ]);
        setLoading(false);
      });
  }, []);

  const rarityOrder = { mitico: 0, legendario: 1, epico: 2, raro: 3, poco_comun: 4, comun: 5 };
  const filtered = filter === 'all'
    ? [...pets].sort((a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity])
    : pets.filter(p => p.rarity === filter);

  const rarityFilters = ['all', 'mitico', 'legendario', 'epico', 'raro', 'poco_comun', 'comun'];
  const filterLabels  = { all: 'todas', mitico: 'mitico', legendario: 'legendario', epico: 'epico', raro: 'raro', poco_comun: 'poco comun', comun: 'comun' };

  if (loading) {
    return (
      <div className="p-4 text-center text-grey font-mono animate-pulse">
        cargando coleccion...
      </div>
    );
  }

  return (
    <div className="font-mono">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-beige">
        <div>
          <div className="text-dark font-medium text-sm">coleccion de mascotas</div>
          <div className="text-grey text-xs mt-0.5">
            <span className="text-blue">⤷</span> total: {pets.length} criatura{pets.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Rarity filter chips */}
        <div className="flex flex-wrap gap-1.5">
          {rarityFilters.map(r => (
            <button
              key={r}
              onClick={() => setFilter(r)}
              className={`px-3 py-0.5 text-[11px] rounded-full border transition-all duration-150 ${
                filter === r
                  ? 'bg-beige2 border-dark text-dark font-medium'
                  : 'bg-[rgba(227,221,212,0.3)] border-beige text-grey hover:bg-beige'
              }`}
            >
              {filterLabels[r]}
            </button>
          ))}
        </div>
      </div>

      {/* Selected pet spotlight */}
      {selectedPet && (
        <div className="mb-6 p-5 bg-[rgba(248,244,239,0.7)] border border-beige2 rounded-2xl flex flex-col md:flex-row gap-6 items-start">
          <PetAsciiDisplay
            pet={selectedPet}
            accessory={selectedPet.isFavorite ? 'corona' : 'none'}
          />
          <div className="flex-1 text-sm space-y-1.5 pt-1">
            <div className="text-base font-semibold text-dark mb-2">{selectedPet.name}</div>
            <div className="flex gap-2"><span className="text-blue min-w-[90px]">⤷ especie</span><span className="text-grey">{selectedPet.species}</span></div>
            <div className="flex gap-2"><span className="text-blue min-w-[90px]">⤷ rareza</span><span className="text-grey">{selectedPet.rarity.replace('_', ' ')}</span></div>
            <div className="flex gap-2"><span className="text-blue min-w-[90px]">⤷ etapa</span><span className="text-grey">{selectedPet.stage}</span></div>
            <div className="flex gap-2"><span className="text-blue min-w-[90px]">⤷ origen</span><span className="text-grey">{selectedPet.eggOrigin || 'desconocido'}</span></div>
            {selectedPet.isFavorite && (
              <div className="mt-2 text-xs text-[#F57C00]">mascota favorita · +5% en proxima actividad</div>
            )}
            <button
              onClick={() => setSelectedPet(null)}
              className="mt-3 text-xs text-grey border border-beige px-3 py-1 rounded-full hover:bg-beige transition-colors"
            >
              cerrar
            </button>
          </div>
        </div>
      )}

      {/* Pet grid */}
      {filtered.length === 0 ? (
        <div className="text-center text-grey text-sm py-10">no hay mascotas de esta rareza.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(pet => (
            <button
              key={pet._id}
              onClick={() => setSelectedPet(pet)}
              className={`p-3 bg-bg border border-beige rounded-2xl text-center shadow-sm hover:shadow-md hover:scale-[1.03] transition-all duration-150 flex flex-col items-center gap-2 ${
                selectedPet?._id === pet._id ? 'ring-1 ring-dark' : ''
              }`}
            >
              <PetAsciiDisplay
                pet={pet}
                accessory={pet.isFavorite ? 'corona' : 'none'}
                compact={true}
              />
              <div className="text-[10px] text-grey mt-1 truncate w-full text-center">
                {pet.name}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
