import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Admin() {
  const { user } = useContext(AuthContext);
  const [shopItems, setShopItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('shop');
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // Form state
  const [newItem, setNewItem] = useState({
    name: '',
    type: 'egg',
    cost: '',
    description: '',
    icon: 'fa-box',
    cssClass: 'bg-bg',
    probabilities: {}
  });

  useEffect(() => {
    if (user?.isAdmin) {
      fetchShopItems();
      fetchUsers();
      fetchEvents();
    }
  }, [user]);

  const fetchShopItems = async () => {
    try {
      const res = await axios.get('/api/shop');
      setShopItems(res.data);
    } catch (err) {
      console.error('Error fetching shop items:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get('/api/admin/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const createItem = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/shop-items', newItem);
      setShowCreateForm(false);
      setNewItem({
        name: '',
        type: 'egg',
        cost: '',
        description: '',
        icon: 'fa-box',
        cssClass: 'bg-bg',
        probabilities: {}
      });
      fetchShopItems();
    } catch (err) {
      console.error('Error creating item:', err);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`/api/admin/shop-items/${id}`);
      fetchShopItems();
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const updateUserPoints = async (userId, points) => {
    try {
      await axios.put(`/api/admin/users/${userId}/points`, { points });
      fetchUsers();
    } catch (err) {
      console.error('Error updating points:', err);
    }
  };

  if (!user?.isAdmin) {
    return (
      <div className="tiles-grid">
        <div className="tile">
          <div className="tile-header">
            <div className="tile-dots">
              <span className="tile-dot"></span>
              <span className="tile-dot"></span>
              <span className="tile-dot"></span>
            </div>
            <div className="tile-title">
              <i className="fas fa-lock"></i> acceso denegado
            </div>
          </div>
          <div className="tile-content">
            <p style={{ textAlign: 'center', padding: '20px' }}>
              <i className="fas fa-exclamation-triangle" style={{ fontSize: '48px', marginBottom: '20px' }}></i>
              <br />
              No tienes permisos de administrador.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tiles-grid">
      {/* TILE - TABS */}
      <div className="tile" style={{ gridColumn: '1 / -1' }}>
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-cog"></i> panel de administración
          </div>
        </div>
        <div className="tile-content">
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button
              onClick={() => setActiveTab('shop')}
              className={`btn-primary ${activeTab === 'shop' ? '' : 'btn-secondary'}`}
              style={{ flex: 1 }}
            >
              <i className="fas fa-store"></i> tienda
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`btn-primary ${activeTab === 'users' ? '' : 'btn-secondary'}`}
              style={{ flex: 1 }}
            >
              <i className="fas fa-users"></i> usuarios
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`btn-primary ${activeTab === 'events' ? '' : 'btn-secondary'}`}
              style={{ flex: 1 }}
            >
              <i className="fas fa-calendar-star"></i> eventos
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'shop' && (
        <>
          {/* TILE - CREATE ITEM */}
          <div className="tile">
            <div className="tile-header">
              <div className="tile-dots">
                <span className="tile-dot"></span>
                <span className="tile-dot"></span>
                <span className="tile-dot"></span>
              </div>
              <div className="tile-title">
                <i className="fas fa-plus"></i> crear objeto
              </div>
            </div>
            <div className="tile-content">
              <button onClick={() => setShowCreateForm(!showCreateForm)} className="btn-primary" style={{ width: '100%' }}>
                {showCreateForm ? 'Cancelar' : 'Nuevo objeto'}
              </button>
              
              {showCreateForm && (
                <form onSubmit={createItem} style={{ marginTop: '15px', display: 'grid', gap: '10px' }}>
                  <div>
                    <label className="form-label">nombre</label>
                    <input
                      type="text"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">tipo</label>
                    <select
                      value={newItem.type}
                      onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                      className="form-select"
                    >
                      <option value="egg">Huevo</option>
                      <option value="food">Comida</option>
                      <option value="potion">Poción</option>
                      <option value="seed">Semilla</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">costo</label>
                    <input
                      type="number"
                      value={newItem.cost}
                      onChange={(e) => setNewItem({ ...newItem, cost: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">descripción</label>
                    <input
                      type="text"
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">icono (Font Awesome)</label>
                    <input
                      type="text"
                      value={newItem.icon}
                      onChange={(e) => setNewItem({ ...newItem, icon: e.target.value })}
                      className="form-input"
                      placeholder="fa-box"
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                    Crear
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* TILE - SHOP ITEMS */}
          <div className="tile" style={{ gridColumn: 'span 2' }}>
            <div className="tile-header">
              <div className="tile-dots">
                <span className="tile-dot"></span>
                <span className="tile-dot"></span>
                <span className="tile-dot"></span>
              </div>
              <div className="tile-title">
                <i className="fas fa-list"></i> objetos en tienda
              </div>
            </div>
            <div className="tile-content">
              <div style={{ maxHeight: '400px', overflowY: 'auto', display: 'grid', gap: '8px' }}>
                {shopItems.map((item) => (
                  <div key={item.id} style={{
                    background: 'var(--tile-dark)',
                    border: '1px solid var(--border-color)',
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>
                        <i className={`fas ${item.icon}`}></i> {item.name}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {item.type} · {item.cost} pts
                      </div>
                    </div>
                    <button
                      onClick={() => deleteItem(item.id)}
                      style={{
                        background: 'var(--accent)',
                        border: 'none',
                        color: 'var(--tile-bg)',
                        padding: '4px 8px',
                        cursor: 'pointer'
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'users' && (
        <div className="tile" style={{ gridColumn: '1 / -1' }}>
          <div className="tile-header">
            <div className="tile-dots">
              <span className="tile-dot"></span>
              <span className="tile-dot"></span>
              <span className="tile-dot"></span>
            </div>
            <div className="tile-title">
              <i className="fas fa-users"></i> usuarios
            </div>
          </div>
          <div className="tile-content">
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Usuario</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Puntos</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Racha</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Admin</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} style={{ borderBottom: '1px solid var(--separator)' }}>
                      <td style={{ padding: '10px' }}>{u.username}</td>
                      <td style={{ padding: '10px' }}>{u.email}</td>
                      <td style={{ padding: '10px' }}>
                        <input
                          type="number"
                          value={u.totalPoints}
                          onChange={(e) => updateUserPoints(u.id, parseInt(e.target.value))}
                          style={{ width: '80px', padding: '4px' }}
                        />
                      </td>
                      <td style={{ padding: '10px' }}>{u.currentStreak}</td>
                      <td style={{ padding: '10px' }}>{u.isAdmin ? 'Sí' : 'No'}</td>
                      <td style={{ padding: '10px' }}>-</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="tile" style={{ gridColumn: '1 / -1' }}>
          <div className="tile-header">
            <div className="tile-dots">
              <span className="tile-dot"></span>
              <span className="tile-dot"></span>
              <span className="tile-dot"></span>
            </div>
            <div className="tile-title">
              <i className="fas fa-calendar-star"></i> eventos
            </div>
          </div>
          <div className="tile-content">
            <p style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>
              Próximamente: Sistema de eventos
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
