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
  const [showSuccess, setShowSuccess] = useState(false); // success animation state

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
      // Obtener la planta para calcular dificultad
      const plant = garden.find(p => p.id === id);
      const growthStage = plant?.growthProgress || 0;
      
      // Dificultad dinámica: más crecimiento = más difícil
      // Zona verde más pequeña y barra más rápida
      const baseZoneSize = 90; // tamaño base de la zona verde
      const zoneSize = Math.max(30, baseZoneSize - (growthStage / 100) * 60); // se reduce de 90 a 30
      const baseSpeed = 2;
      const speed = baseSpeed + (growthStage / 100) * 3; // aumenta de 2 a 5
      
      // Posición aleatoria de la zona verde
      const randomStart = Math.floor(Math.random() * (360 - zoneSize));
      const randomEnd = randomStart + zoneSize;
      
      setSkillCheck({ plantId: id, targetStart: randomStart, targetEnd: randomEnd, currentAngle: 0, speed, direction: 1, action: 'water' });
      console.log('Skill check iniciado para planta:', id);
    } catch (err) {
      console.error('Error watering:', err);
    }
  };

  const harvestPlant = async (id) => {
    try {
      // Cerrar detalles para mostrar el skill check
      setSelectedPlant(null);
      // Obtener la planta para calcular dificultad
      const plant = garden.find(p => p.id === id);
      const growthStage = plant?.growthProgress || 100;
      
      // Dificultad máxima para cosecha
      const zoneSize = 30; // zona verde pequeña
      const speed = 5; // barra rápida
      
      // Posición aleatoria de la zona verde
      const randomStart = Math.floor(Math.random() * (360 - zoneSize));
      const randomEnd = randomStart + zoneSize;
      
      setSkillCheck({ plantId: id, targetStart: randomStart, targetEnd: randomEnd, currentAngle: 0, speed, direction: 1, action: 'harvest' });
      console.log('Skill check de cosecha iniciado para planta:', id);
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

  // Skill check circular con barra minigame logic
  useEffect(() => {
    if (!skillCheck) return;

    const interval = setInterval(() => {
      setSkillCheck(prev => {
        if (!prev) return null;

        let newAngle = prev.currentAngle + (prev.speed * prev.direction);

        // Bounce at 0 and 360
        if (newAngle >= 360) {
          newAngle = 0;
        } else if (newAngle < 0) {
          newAngle = 360;
        }

        return { ...prev, currentAngle: newAngle };
      });
    }, 16);

    return () => clearInterval(interval);
  }, [skillCheck]);

  // Handle spacebar for circular skill check con barra
  useEffect(() => {
    if (!skillCheck) return;

    const handleKeyPress = (e) => {
      if (e.code === 'Space' && skillCheck) {
        e.preventDefault();

        // Check if current angle is within target zone
        const tolerance = 15;
        let inTarget = false;

        // Check if angle is in target range (handle wrap-around)
        if (skillCheck.targetStart < skillCheck.targetEnd) {
          inTarget = skillCheck.currentAngle >= skillCheck.targetStart - tolerance &&
                     skillCheck.currentAngle <= skillCheck.targetEnd + tolerance;
        } else {
          // Handle wrap-around case (e.g., 350 to 10)
          inTarget = skillCheck.currentAngle >= skillCheck.targetStart - tolerance ||
                     skillCheck.currentAngle <= skillCheck.targetEnd + tolerance;
        }

        if (inTarget) {
          // Success - show animation and perform action
          setShowSuccess(true);
          setSkillCheck(null);
          
          setTimeout(() => {
            setShowSuccess(false);
            if (skillCheck.action === 'water') {
              axios.post(`/api/garden/${skillCheck.plantId}/water`).then(() => {
                fetchGarden();
              });
            } else if (skillCheck.action === 'harvest') {
              axios.post(`/api/garden/${skillCheck.plantId}/harvest`).then(() => {
                fetchGarden();
              });
            }
          }, 1000);
        } else {
          // Failed - reset skill check
          setSkillCheck(prev => prev ? { ...prev, currentAngle: 0 } : null);
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

      {/* TILE - SKILL CHECK MINIGAME CIRCULAR CON BARRA */}
      {skillCheck && (
        <div className="tile wide">
          <div className="tile-header">
            <div className="tile-dots">
              <span className="tile-dot"></span>
              <span className="tile-dot"></span>
              <span className="tile-dot"></span>
            </div>
            <div className="tile-title">
              <i className="fas fa-bullseye"></i> skill check {skillCheck.action === 'harvest' ? 'de cosecha' : ''}
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
                {/* Outer circle */}
                <div style={{
                  position: 'absolute',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  border: '4px solid var(--border-color)',
                  background: 'var(--tile-dark)'
                }}></div>

                {/* Target zone (green arc) */}
                <svg style={{
                  position: 'absolute',
                  width: '200px',
                  height: '200px',
                  transform: 'rotate(-90deg)'
                }}>
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="#4CAF50"
                    strokeWidth="12"
                    strokeDasharray={`${(skillCheck.targetEnd - skillCheck.targetStart) / 360 * 2 * Math.PI * 90} ${2 * Math.PI * 90}`}
                    strokeDashoffset={`-${skillCheck.targetStart / 360 * 2 * Math.PI * 90}`}
                    opacity="0.6"
                  />
                </svg>

                {/* Moving indicator (bar around circle) */}
                <svg style={{
                  position: 'absolute',
                  width: '200px',
                  height: '200px',
                  transform: 'rotate(-90deg)'
                }}>
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="8"
                    strokeDasharray="20 530"
                    strokeDashoffset={`-${skillCheck.currentAngle / 360 * 2 * Math.PI * 90}`}
                    style={{
                      filter: 'drop-shadow(0 0 8px var(--accent))'
                    }}
                  />
                </svg>

                {/* Center dot */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  boxShadow: '0 0 15px var(--accent)'
                }}></div>
              </div>

              <div style={{ fontSize: '14px', marginBottom: '15px' }}>
                <i className="fas fa-info-circle"></i> Presiona ESPACIO cuando la barra pase por la zona verde
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

      {/* SUCCESS ANIMATION */}
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2000,
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '80px',
            color: '#4CAF50',
            animation: 'successPulse 0.5s ease-in-out',
            textShadow: '0 0 20px #4CAF50'
          }}>
            <i className="fas fa-check-circle"></i>
          </div>
          <div style={{
            fontSize: '24px',
            color: '#4CAF50',
            fontWeight: 'bold',
            marginTop: '10px'
          }}>
            ¡Conseguido!
          </div>
        </div>
      )}

      {/* TILE - PLANTAS - GRID DE POTS */}
      <div className="tile wide">
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
