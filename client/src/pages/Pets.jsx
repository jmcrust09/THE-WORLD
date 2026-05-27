import React, { useEffect, useState } from 'react';

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
  const [hatching, setHatching] = useState(false);
  const [petName, setPetName] = useState('');
  const [eggs, setEggs] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/pets'),
      fetch('/api/eggs')
    ])
      .then(([petsRes, eggsRes]) => Promise.all([petsRes.json(), eggsRes.json()]))
      .then(([petsData, eggsData]) => {
        setPets(Array.isArray(petsData) ? petsData : []);
        setEggs(Array.isArray(eggsData) ? eggsData : []);
      })
      .catch(() => {
        setPets([]);
        setEggs([]);
      })
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

  const hatchEgg = async (eggId) => {
    try {
      const res = await fetch('/api/pets/hatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eggId, name: petName })
      });
      const data = await res.json();
      setPets([data.pet, ...pets]);
      setPetName('');
      setHatching(false);
    } catch (err) {
      console.error('Error hatching egg:', err);
    }
  };

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

      {/* TILE - ECLOSIONAR HUEVO */}
      <div className="tile">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-egg"></i> eclosionar
          </div>
        </div>
        <div className="tile-content">
          {!hatching ? (
            <button
              onClick={() => setHatching(true)}
              className="btn-primary"
              style={{ width: '100%' }}
            >
              <i className="fas fa-plus"></i> Comprar huevo
            </button>
          ) : (
            <div style={{ display: 'grid', gap: '8px' }}>
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Nombre de la mascota (opcional)"
                className="form-input"
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {eggs.map((egg) => (
                  <button
                    key={egg.id}
                    onClick={() => hatchEgg(egg.id)}
                    className="btn-secondary"
                    style={{ fontSize: '11px' }}
                  >
                    {egg.name} ({egg.cost})
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  setHatching(false);
                  setPetName('');
                }}
                className="btn-secondary"
                style={{ width: '100%', fontSize: '11px' }}
              >
                Cancelar
              </button>
            </div>
          )}
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
          key={pet._id}
          className="tile"
          onClick={() => setSelectedPet(pet)}
          style={{ cursor: 'pointer', opacity: selectedPet?._id === pet._id ? 1 : 0.85 }}
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
              <span>{rarityEmoji[pet.rarity]} {rarityLabels[pet.rarity]}</span>
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
                ❤️ mascota favorita
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
              <span>{rarityEmoji[selectedPet.rarity]} {rarityLabels[selectedPet.rarity]}</span>
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
