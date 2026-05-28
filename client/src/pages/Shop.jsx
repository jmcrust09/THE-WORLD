import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Shop() {
  const { user } = useContext(AuthContext);
  const [eggs, setEggs] = useState([]);
  const [shopItems, setShopItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(user?.totalPoints || 0);

  useEffect(() => {
    Promise.all([
      axios.get('/api/shop'),
      axios.get('/api/eggs')
    ])
      .then(([shopRes, eggsRes]) => {
        setShopItems(Array.isArray(shopRes.data) ? shopRes.data : []);
        setEggs(Array.isArray(eggsRes.data) ? eggsRes.data : []);
      })
      .catch((err) => {
        console.error('Error fetching shop data', err);
        setShopItems([]);
        setEggs([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (user?.totalPoints !== undefined) setBalance(user.totalPoints);
  }, [user]);

  const handlePurchase = (item) => {
    if (balance < item.cost) return;
    setBalance((current) => current - item.cost);
    setItems((prev) => prev.map((entry) => (entry.id === item.id ? { ...entry, purchased: true } : entry)));
  };

  if (loading) {
    return <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>cargando tienda...</div>;
  }

  return (
    <div className="tiles-grid">
      {/* TILE - CATÁLOGO DE HUEVOS */}
      <div className="tile">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-store"></i> catálogo de huevos
          </div>
        </div>
        <div className="tile-content">
          <div className="info-row">
            <span className="info-label">básico</span>
            <span>500 pts</span>
          </div>
          <div className="info-row">
            <span className="info-label">premium</span>
            <span>1.500 pts · + chance épico</span>
          </div>
          <div className="info-row">
            <span className="info-label">épico</span>
            <span>5.000 pts</span>
          </div>
          <div className="info-row">
            <span className="info-label">legendario</span>
            <span>15.000 pts</span>
          </div>
          <div className="info-row">
            <span className="info-label">mítico</span>
            <span>50.000 pts</span>
          </div>
          <hr />
          <div><i className="fas fa-coins"></i> tus puntos: <strong>{balance.toLocaleString()} pts</strong></div>
        </div>
      </div>

      {/* TILE - OFERTAS */}
      <div className="tile">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-calendar-alt"></i> ofertas actuales
          </div>
        </div>
        <div className="tile-content">
          <div className="badge"><i className="fas fa-leaf"></i> huevo otoño dorado: +20% rareza legendaria</div>
          <div className="badge"><i className="fas fa-gift"></i> descuento premium -10% (1.350 pts)</div>
          <div className="badge"><i className="fas fa-dragon"></i> mascota exclusiva: fénix de cobre</div>
        </div>
      </div>

      {/* TILE - MULTIPLICADORES */}
      <div className="tile">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-chart-line"></i> multiplicadores
          </div>
        </div>
        <div className="tile-content">
          <div><i className="fas fa-star"></i> racha: x1.5 (9 días)</div>
          <div><i className="fas fa-star"></i> bonus rarezas: <strong>+1.85x</strong></div>
          <div><i className="fas fa-star"></i> favorita: +5% extra</div>
          <div className="progress-bg">
            <div className="progress-fill" style={{ width: '74%' }}></div>
          </div>
        </div>
      </div>

      {/* TILES - HUEVOS */}
      {eggs.map((egg) => (
        <div key={egg.id} className="tile">
          <div className="tile-header">
            <div className="tile-dots">
              <span className="tile-dot"></span>
              <span className="tile-dot"></span>
              <span className="tile-dot"></span>
            </div>
            <div className="tile-title">
              <i className={`fas ${egg.icon || 'fa-egg'}`}></i> {egg.name}
              {egg.isEvent && <span className="badge" style={{ marginLeft: '8px', background: 'var(--accent)', color: 'var(--tile-bg)' }}>EVENTO</span>}
            </div>
          </div>
          <div className="tile-content">
            <div style={{ marginBottom: '12px' }}>
              {egg.description}
            </div>
            <div className="info-row">
              <span className="info-label"><i className="fas fa-coins"></i> costo</span>
              <span><strong>{egg.cost} pts</strong></span>
            </div>
            <button
              onClick={() => handlePurchase(egg)}
              disabled={egg.purchased || egg.cost > balance}
              style={{
                width: '100%',
                background: egg.purchased || egg.cost > balance ? 'var(--tile-header)' : 'var(--accent)',
                color: egg.purchased || egg.cost > balance ? 'var(--text-muted)' : 'var(--tile-bg)',
                border: `1px solid ${egg.purchased || egg.cost > balance ? 'var(--border-color)' : 'var(--accent)'}`,
                padding: '8px',
                marginTop: '10px',
                cursor: egg.purchased || egg.cost > balance ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                fontSize: '13px'
              }}
              className="btn-primary"
            >
              {egg.purchased ? '✓ Comprado' : egg.cost > balance ? 'Falta saldo' : 'Comprar'}
            </button>
          </div>
        </div>
      ))}

      {/* TILES - COMIDAS Y POCIONES */}
      {shopItems.map((item) => (
        <div key={item.id} className="tile">
          <div className="tile-header">
            <div className="tile-dots">
              <span className="tile-dot"></span>
              <span className="tile-dot"></span>
              <span className="tile-dot"></span>
            </div>
            <div className="tile-title">
              <i className={`fas ${item.icon || 'fa-utensils'}`}></i> {item.name}
              <span className="badge" style={{ marginLeft: '8px', background: item.type === 'potion' ? 'var(--accent)' : item.type === 'theme' ? '#9C27B0' : '#4CAF50', color: 'var(--tile-bg)' }}>
                {item.type === 'potion' ? 'POCIÓN' : item.type === 'theme' ? 'TEMA' : 'COMIDA'}
              </span>
            </div>
          </div>
          <div className="tile-content">
            <div style={{ marginBottom: '12px' }}>
              {item.description}
            </div>
            {item.expValue && (
              <div className="info-row">
                <span className="info-label"><i className="fas fa-star"></i> EXP</span>
                <span><strong>+{item.expValue}</strong></span>
              </div>
            )}
            {item.effect && (
              <div className="info-row">
                <span className="info-label"><i className="fas fa-magic"></i> efecto</span>
                <span><strong>{item.effect}</strong></span>
              </div>
            )}
            <div className="info-row">
              <span className="info-label"><i className="fas fa-coins"></i> costo</span>
              <span><strong>{item.cost} pts</strong></span>
            </div>
            <button
              onClick={() => handlePurchase(item)}
              disabled={item.purchased || item.cost > balance}
              style={{
                width: '100%',
                background: item.purchased || item.cost > balance ? 'var(--tile-header)' : 'var(--accent)',
                color: item.purchased || item.cost > balance ? 'var(--text-muted)' : 'var(--tile-bg)',
                border: `1px solid ${item.purchased || item.cost > balance ? 'var(--border-color)' : 'var(--accent)'}`,
                padding: '8px',
                marginTop: '10px',
                cursor: item.purchased || item.cost > balance ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                fontSize: '13px'
              }}
              className="btn-primary"
            >
              {item.purchased ? '✓ Comprado' : item.cost > balance ? 'Falta saldo' : 'Comprar'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
