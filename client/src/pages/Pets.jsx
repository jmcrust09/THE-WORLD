import React, { useEffect, useState } from 'react';

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

const rarityEmoji = {
  mitico: 'fa-dragon',
  legendario: 'fa-crown',
  epico: 'fa-star',
  raro: 'fa-gem',
  poco_comun: 'fa-sparkles',
  comun: 'fa-star-half-stroke'
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
    return <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>cargando colección...</div>;
  }

  return (
    <div className="tiles-grid">
      {/* TILE - COLECCIÓN VIVA */}
      <div className="tile">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-paw"></i> colección viva
          </div>
        </div>
        <div className="tile-content">
          <div><span className="badge">75+ especies</span> <span className="badge">desbloqueadas: {pets.length}</span></div>
          <div className="info-row">
            <span className="info-label">rareza</span>
            <span>común(+0%) · poco común(+10%) · raro(+30%) · épico(+50%) · legendario(+80%) · mítico(+150%)</span>
          </div>
          <div className="stat-group">
            <div className="stat-card-sm"><i className="fas fa-dragon"></i> mítico: 1</div>
            <div className="stat-card-sm"><i className="fas fa-crown"></i> legendario: 1</div>
            <div className="stat-card-sm"><i className="fas fa-star"></i> épico: 1</div>
          </div>
        </div>
      </div>

      {/* TILE - ETAPAS DE CRECIMIENTO */}
      <div className="tile">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-chart-line"></i> etapas crecimiento
          </div>
        </div>
        <div className="tile-content">
          <div>huevo → bebé → joven → adulto → evolucionado → ascendido</div>
          <div className="progress-bg">
            <div className="progress-fill" style={{ width: '68%' }}></div>
          </div>
          <div className="badge"><i className="fas fa-egg"></i> 0-200</div>
          <div className="badge"><i className="fas fa-baby"></i> 200-800</div>
          <div className="badge"><i className="fas fa-child"></i> 800-2500</div>
          <div className="badge"><i className="fas fa-user"></i> 2500-8000</div>
          <div className="badge"><i className="fas fa-star"></i> 8k-25k</div>
          <div className="badge"><i className="fas fa-sun"></i> 25k+</div>
        </div>
      </div>

      {/* TILE - DISTRIBUCIÓN RAREZA */}
      <div className="tile">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-chart-pie"></i> distribución rareza
          </div>
        </div>
        <div className="tile-content">
          <div className="info-row">
            común 36%
            <div className="progress-bg"><div className="progress-fill" style={{ width: '36%', background: '#bdbdbd' }}></div></div>
          </div>
          <div className="info-row">
            poco común 28%
            <div className="progress-bg"><div className="progress-fill" style={{ width: '28%', background: '#66BB6A' }}></div></div>
          </div>
          <div className="info-row">
            raro 18%
            <div className="progress-bg"><div className="progress-fill" style={{ width: '18%', background: '#42A5F5' }}></div></div>
          </div>
          <div className="info-row">
            épico 11%
            <div className="progress-bg"><div className="progress-fill" style={{ width: '11%', background: '#AB47BC' }}></div></div>
          </div>
        </div>
      </div>

      {/* TILES - CADA MASCOTA */}
      {filtered.map((pet) => (
        <div
          key={pet.id}
          className="tile"
          onClick={() => setSelectedPet(pet)}
          style={{ cursor: 'pointer', opacity: selectedPet?.id === pet.id ? 1 : 0.85 }}
        >
          <div className="tile-header">
            <div className="tile-dots">
              <span className="tile-dot"></span>
              <span className="tile-dot"></span>
              <span className="tile-dot"></span>
            </div>
            <div className="tile-title">
              <i className="fas fa-paw"></i> {pet.name}
            </div>
          </div>
          <div className="tile-content">
            <div className="info-row">
              <span className="info-label"><i className="fas fa-crown"></i> rareza</span>
              <span><i className={`fas ${rarityEmoji[pet.rarity]}`}></i> {rarityLabels[pet.rarity]}</span>
            </div>
            <div className="info-row">
              <span className="info-label"><i className="fas fa-egg"></i> especie</span>
              <span>{pet.species}</span>
            </div>
            <div className="info-row">
              <span className="info-label"><i className="fas fa-ruler"></i> etapa</span>
              <span>{pet.stage}</span>
            </div>
            {pet.isFavorite && (
              <div className="badge" style={{ background: 'rgba(212, 163, 115, 0.2)', borderColor: 'var(--accent)' }}>
                <i className="fas fa-heart"></i> mascota favorita
              </div>
            )}
          </div>
        </div>
      ))}

      {/* TILE - DETALLES SELECCIONADO */}
      {selectedPet && (
        <div className="tile">
          <div className="tile-header">
            <div className="tile-dots">
              <span className="tile-dot"></span>
              <span className="tile-dot"></span>
              <span className="tile-dot"></span>
            </div>
            <div className="tile-title">
              <i className="fas fa-info-circle"></i> detalles de {selectedPet.name}
            </div>
          </div>
          <div className="tile-content">
            <div className="info-row">
              <span className="info-label"><i className="fas fa-paw"></i> nombre</span>
              <span><strong>{selectedPet.name}</strong></span>
            </div>
            <div className="info-row">
              <span className="info-label"><i className="fas fa-dna"></i> especie</span>
              <span>{selectedPet.species}</span>
            </div>
            <div className="info-row">
              <span className="info-label"><i className="fas fa-crown"></i> rareza</span>
              <span><i className={`fas ${rarityEmoji[selectedPet.rarity]}`}></i> {rarityLabels[selectedPet.rarity]}</span>
            </div>
            <div className="info-row">
              <span className="info-label"><i className="fas fa-chart-line"></i> etapa</span>
              <span>{selectedPet.stage}</span>
            </div>
            <button
              onClick={() => setSelectedPet(null)}
              style={{
                width: '100%',
                marginTop: '12px'
              }}
              className="btn-secondary"
            >
              Cerrar detalles
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
