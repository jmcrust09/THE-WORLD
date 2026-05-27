import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Inventory() {
  const { user } = useContext(AuthContext);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get('/api/inventory');
      setInventory(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching inventory:', err);
      setInventory([]);
    } finally {
      setLoading(false);
    }
  };

  const useItem = async (id) => {
    try {
      await axios.post(`/api/inventory/${id}/use`);
      fetchInventory();
    } catch (err) {
      console.error('Error using item:', err);
    }
  };

  const equipItem = async (id) => {
    try {
      await axios.put(`/api/inventory/${id}/equip`);
      fetchInventory();
    } catch (err) {
      console.error('Error equipping item:', err);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`/api/inventory/${id}`);
      fetchInventory();
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>cargando inventario...</div>;
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
            <i className="fas fa-box"></i> inventario
          </div>
        </div>
        <div className="tile-content">
          <div className="stat-group">
            <div className="stat-card-sm">
              <i className="fas fa-cubes"></i> total items<br />
              <strong>{inventory.reduce((sum, i) => sum + i.quantity, 0)}</strong>
            </div>
            <div className="stat-card-sm">
              <i className="fas fa-check-circle"></i> equipados<br />
              <strong>{inventory.filter(i => i.isEquipped).length}</strong>
            </div>
          </div>
          <div style={{ marginTop: '15px' }}>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="btn-secondary"
              style={{ width: '100%' }}
            >
              <i className={`fas ${viewMode === 'grid' ? 'fa-list' : 'fa-th'}`}></i>
              {viewMode === 'grid' ? ' vista lista' : ' vista grid'}
            </button>
          </div>
        </div>
      </div>

      {/* TILE - ITEMS */}
      <div className="tile full-width">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-boxes"></i> tus objetos
          </div>
        </div>
        <div className="tile-content">
          {inventory.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>
              <i className="fas fa-box-open" style={{ fontSize: '48px', marginBottom: '20px' }}></i>
              <br />
              No tienes objetos en el inventario
            </div>
          ) : viewMode === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 150px)', gap: '12px' }}>
              {inventory.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: item.isEquipped ? 'rgba(212, 163, 115, 0.2)' : 'var(--tile-dark)',
                    border: `1px solid ${item.isEquipped ? 'var(--accent)' : 'var(--border-color)'}`,
                    padding: '12px',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                    <i className={`fas ${item.item?.icon || 'fa-box'}`}></i>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                    {item.item?.name || 'Item'}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    x{item.quantity}
                  </div>
                  <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                    <button
                      onClick={() => useItem(item.id)}
                      disabled={item.quantity <= 0}
                      style={{
                        background: 'var(--accent)',
                        border: 'none',
                        color: 'var(--tile-bg)',
                        padding: '4px 8px',
                        fontSize: '10px',
                        cursor: item.quantity > 0 ? 'pointer' : 'not-allowed'
                      }}
                    >
                      <i className="fas fa-play"></i>
                    </button>
                    <button
                      onClick={() => equipItem(item.id)}
                      style={{
                        background: item.isEquipped ? 'var(--accent)' : 'var(--tile-header)',
                        border: '1px solid var(--border-color)',
                        color: item.isEquipped ? 'var(--tile-bg)' : 'var(--text-muted)',
                        padding: '4px 8px',
                        fontSize: '10px',
                        cursor: 'pointer'
                      }}
                    >
                      <i className="fas fa-check"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Item</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Cantidad</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Estado</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--separator)' }}>
                      <td style={{ padding: '8px' }}>
                        <i className={`fas ${item.item?.icon || 'fa-box'}`}></i> {item.item?.name || 'Item'}
                      </td>
                      <td style={{ padding: '8px' }}>{item.quantity}</td>
                      <td style={{ padding: '8px' }}>
                        {item.isEquipped ? (
                          <span style={{ color: 'var(--accent)' }}><i className="fas fa-check"></i> Equipado</span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>Guardado</span>
                        )}
                      </td>
                      <td style={{ padding: '8px' }}>
                        <button
                          onClick={() => useItem(item.id)}
                          style={{
                            background: 'var(--accent)',
                            border: 'none',
                            color: 'var(--tile-bg)',
                            padding: '4px 8px',
                            fontSize: '11px',
                            cursor: 'pointer',
                            marginRight: '4px'
                          }}
                        >
                          Usar
                        </button>
                        <button
                          onClick={() => equipItem(item.id)}
                          style={{
                            background: 'var(--tile-header)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-muted)',
                            padding: '4px 8px',
                            fontSize: '11px',
                            cursor: 'pointer'
                          }}
                        >
                          Equipar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
