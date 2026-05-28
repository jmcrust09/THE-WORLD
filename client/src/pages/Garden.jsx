import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Garden() {
  const { user } = useContext(AuthContext);
  const [garden, setGarden] = useState([]);
  const [plantTypes, setPlantTypes] = useState({});
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showPlanting, setShowPlanting] = useState(false);
  const [skillCheck, setSkillCheck] = useState(null); // skill check minigame state

  useEffect(() => {
    fetchGarden();
    fetchPlantTypes();
  }, []);

  const fetchGarden = async () => {
    try {
      const res = await axios.get('/api/garden');
      setGarden(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching garden:', err);
      setGarden([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlantTypes = async () => {
    try {
      const res = await axios.get('/api/garden/types');
      setPlantTypes(res.data);
    } catch (err) {
      console.error('Error fetching plant types:', err);
    }
  };

  const plantSeed = async (plantType, position) => {
    try {
      await axios.post('/api/garden/plant', { plantType, position });
      setShowPlanting(false);
      fetchGarden();
    } catch (err) {
      console.error('Error planting:', err);
    }
  };

  const waterPlant = async (id) => {
    try {
      // Cerrar detalles para mostrar el skill check
      setSelectedPlant(null);
      // Iniciar skill check circular
      setSkillCheck({ plantId: id, targetRadius: 30, currentRadius: 100, speed: 1.5 });
      console.log('Skill check iniciado para planta:', id);
    } catch (err) {
      console.error('Error watering:', err);
    }
  };

  const harvestPlant = async (id) => {
    try {
      console.log('Cosechando planta:', id);
      await axios.post(`/api/garden/${id}/harvest`);
      fetchGarden();
      setSelectedPlant(null);
    } catch (err) {
      console.error('Error harvesting:', err);
    }
  };

  const removePlant = async (id) => {
    try {
      await axios.delete(`/api/garden/${id}`);
      fetchGarden();
    } catch (err) {
      console.error('Error removing:', err);
    }
  };

  // Skill check circular minigame logic
  useEffect(() => {
    if (!skillCheck) return;

    const interval = setInterval(() => {
      setSkillCheck(prev => {
        if (!prev) return null;

        let newRadius = prev.currentRadius - prev.speed;

        // Reset if radius gets too small
        if (newRadius <= 0) {
          // Failed - reset
          return { ...prev, currentRadius: 100 };
        }

        return { ...prev, currentRadius: newRadius };
      });
    }, 16);

    return () => clearInterval(interval);
  }, [skillCheck]);

  // Handle spacebar for circular skill check
  useEffect(() => {
    if (!skillCheck) return;

    const handleKeyPress = (e) => {
      if (e.code === 'Space' && skillCheck) {
        e.preventDefault();

        // Check if current radius is within target zone
        const tolerance = 10;
        if (skillCheck.currentRadius >= skillCheck.targetRadius - tolerance &&
            skillCheck.currentRadius <= skillCheck.targetRadius + tolerance) {
          // Success - water the plant
          axios.post(`/api/garden/${skillCheck.plantId}/water`).then(() => {
            fetchGarden();
            setSkillCheck(null);
          });
        } else {
          // Failed - reset skill check
          setSkillCheck(prev => prev ? { ...prev, currentRadius: 100 } : null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [skillCheck]);

  if (loading) {
    return <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>cargando jardín...</div>;
  }

  return (
    <div className="tiles-grid">
      {/* TILE - ESTADÍSTICAS */}
      <div className="tile">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-seedling"></i> jardín
          </div>
        </div>
        <div className="tile-content">
          <div className="stat-group">
            <div className="stat-card-sm">
              <i className="fas fa-leaf"></i> plantas<br />
              <strong>{garden.length}</strong>
            </div>
            <div className="stat-card-sm">
              <i className="fas fa-check"></i> maduras<br />
              <strong>{garden.filter(p => p.stage === 'mature').length}</strong>
            </div>
          </div>
          <div style={{ marginTop: '15px' }}>
            <button
              onClick={() => setShowPlanting(!showPlanting)}
              className="btn-primary"
              style={{ width: '100%' }}
            >
              <i className="fa fa-plus"></i> {showPlanting ? 'Cancelar' : 'Plantar'}
            </button>
          </div>
          <div style={{ marginTop: '10px' }}>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="btn-secondary"
              style={{ width: '100%' }}
            >
              <i className="fa fa-th"></i>{viewMode === 'grid' ? ' vista lista' : ' vista grid'}
            </button>
          </div>
        </div>
      </div>

      {/* TILE - PLANTAR SEMILLA */}
      {showPlanting && (
        <div className="tile">
          <div className="tile-header">
            <div className="tile-dots">
              <span className="tile-dot"></span>
              <span className="tile-dot"></span>
              <span className="tile-dot"></span>
            </div>
            <div className="tile-title">
              <i className="fas fa-seedling"></i> plantar
            </div>
          </div>
          <div className="tile-content">
            <div style={{ display: 'grid', gap: '8px' }}>
              {Object.entries(plantTypes).map(([type, info]) => (
                <button
                  key={type}
                  onClick={() => {
                    const emptySlot = garden.length < 9 ? garden.length + 1 : null;
                    if (emptySlot) plantSeed(type, emptySlot);
                  }}
                  disabled={garden.length >= 9}
                  className="btn-secondary"
                  style={{ textAlign: 'left', padding: '8px' }}
                >
                  <i className="fas fa-leaf"></i> {info.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TILE - SKILL CHECK MINIGAME CIRCULAR */}
      {skillCheck && (
        <div className="tile" style={{ gridColumn: '1 / -1' }}>
          <div className="tile-header">
            <div className="tile-dots">
              <span className="tile-dot"></span>
              <span className="tile-dot"></span>
              <span className="tile-dot"></span>
            </div>
            <div className="tile-title">
              <i className="fas fa-bullseye"></i> skill check circular
            </div>
          </div>
          <div className="tile-content">
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{
                position: 'relative',
                width: '200px',
                height: '200px',
                margin: '0 auto 20px'
              }}>
                {/* Outer circle (target zone) */}
                <div style={{
                  position: 'absolute',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  border: '4px solid var(--border-color)',
                  background: 'var(--tile-dark)'
                }}></div>

                {/* Target zone ring */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: `${skillCheck.targetRadius * 2}%`,
                  height: `${skillCheck.targetRadius * 2}%`,
                  borderRadius: '50%',
                  border: '3px solid #4CAF50',
                  background: 'rgba(76, 175, 80, 0.2)'
                }}></div>

                {/* Inner contracting circle */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: `${skillCheck.currentRadius * 2}%`,
                  height: `${skillCheck.currentRadius * 2}%`,
                  borderRadius: '50%',
                  border: '3px solid var(--accent)',
                  background: 'rgba(212, 163, 115, 0.3)',
                  boxShadow: '0 0 15px var(--accent)'
                }}></div>

                {/* Center dot */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'var(--accent)'
                }}></div>
              </div>

              <div style={{ fontSize: '14px', marginBottom: '15px' }}>
                <i className="fas fa-info-circle"></i> Presiona ESPACIO cuando el círculo esté en la zona verde
              </div>

              <button
                onClick={() => setSkillCheck(null)}
                className="btn-secondary"
                style={{ width: '100%' }}
              >
                <i className="fas fa-times"></i> Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TILE - PLANTAS - GRID DE POTS */}
      <div className="tile full-width">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-tree"></i> jardín (9 pots)
          </div>
        </div>
        <div className="tile-content">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', padding: '10px' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((potNum) => {
              const plant = garden.find(p => p.position === potNum);
              const stageIcons = {
                seed: 'fa-seedling',
                sprout: 'fa-spa',
                growing: 'fa-leaf',
                mature: 'fa-apple-whole',
                harvested: 'fa-check-circle'
              };
              const stageColors = {
                seed: '#8B4513',
                sprout: '#90EE90',
                growing: '#32CD32',
                mature: '#FFD700',
                harvested: '#808080'
              };
              
              return (
                <div
                  key={potNum}
                  onClick={() => plant && setSelectedPlant(plant)}
                  style={{
                    background: 'var(--tile-dark)',
                    border: `2px solid ${plant ? stageColors[plant.stage] || 'var(--border-color)' : 'var(--border-color)'}`,
                    padding: '16px',
                    textAlign: 'center',
                    cursor: plant ? 'pointer' : 'default',
                    minHeight: '120px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    Pot {potNum}
                  </div>
                  {plant ? (
                    <>
                      <div style={{ fontSize: '36px', marginBottom: '8px' }}>
                        <i className={`fas ${stageIcons[plant.stage] || 'fa-leaf'}`}></i>
                      </div>
                      <div style={{ fontSize: '11px', fontWeight: 600, marginBottom: '4px' }}>
                        {plant.plantType}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                        {plant.stage}
                      </div>
                      <div style={{ fontSize: '10px', marginTop: '4px' }}>
                        {plant.growthProgress}%
                      </div>
                    </>
                  ) : (
                    <div style={{ fontSize: '36px', color: 'var(--text-muted)' }}>
                      <i className="fas fa-plus"></i>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* TILE - DETALLES DE PLANTA */}
      {selectedPlant && (
        <div className="tile">
          <div className="tile-header">
            <div className="tile-dots">
              <span className="tile-dot"></span>
              <span className="tile-dot"></span>
              <span className="tile-dot"></span>
            </div>
            <div className="tile-title">
              <i className="fas fa-info-circle"></i> detalles
            </div>
          </div>
          <div className="tile-content">
            <div className="info-row">
              <span className="info-label"><i className="fas fa-leaf"></i> tipo</span>
              <span>{plantTypes[selectedPlant.plantType]?.name || selectedPlant.plantType}</span>
            </div>
            <div className="info-row">
              <span className="info-label"><i className="fas fa-chart-line"></i> etapa</span>
              <span>{selectedPlant.stage}</span>
            </div>
            <div className="info-row">
              <span className="info-label"><i className="fas fa-percentage"></i> progreso</span>
              <span>{selectedPlant.growthProgress}%</span>
            </div>
            <div className="info-row">
              <span className="info-label"><i className="fas fa-calendar"></i> plantada</span>
              <span>{new Date(selectedPlant.plantedAt).toLocaleDateString()}</span>
            </div>
            {selectedPlant.stage === 'mature' && (
              <button
                onClick={() => harvestPlant(selectedPlant.id)}
                className="btn-primary"
                style={{ width: '100%', marginTop: '12px' }}
              >
                <i className="fas fa-hand-holding-seedling"></i> Cosechar
              </button>
            )}
            {selectedPlant.stage !== 'harvested' && selectedPlant.stage !== 'mature' && (
              <button
                onClick={() => waterPlant(selectedPlant.id)}
                className="btn-primary"
                style={{ width: '100%', marginTop: '12px', background: '#2196F3', borderColor: '#2196F3' }}
              >
                <i className="fas fa-tint"></i> Regar
              </button>
            )}
            <button
              onClick={() => setSelectedPlant(null)}
              className="btn-secondary"
              style={{ width: '100%', marginTop: '8px' }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
