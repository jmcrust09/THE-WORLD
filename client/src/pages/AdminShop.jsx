import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;
axios.defaults.baseURL = API_BASE;

export default function AdminShop() {
  const [items, setItems] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'item',
    cost: 0,
    description: '',
    icon: '',
    cssClass: '',
    expValue: 0,
    effect: ''
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/admin/shop-items', {
        headers: { 'x-auth-token': token }
      });
      setItems(res.data);
    } catch (error) {
      console.error('Error fetching shop items:', error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/admin/shop-items', formData, {
        headers: { 'x-auth-token': token }
      });
      setShowCreateModal(false);
      setFormData({
        name: '',
        type: 'item',
        cost: 0,
        description: '',
        icon: '',
        cssClass: '',
        expValue: 0,
        effect: ''
      });
      fetchItems();
    } catch (error) {
      console.error('Error creating item:', error);
      alert('Error al crear item');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/admin/shop-items/${editingItem.id}`, formData, {
        headers: { 'x-auth-token': token }
      });
      setEditingItem(null);
      setFormData({
        name: '',
        type: 'item',
        cost: 0,
        description: '',
        icon: '',
        cssClass: '',
        expValue: 0,
        effect: ''
      });
      fetchItems();
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Error al actualizar item');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este item?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/admin/shop-items/${id}`, {
        headers: { 'x-auth-token': token }
      });
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error al eliminar item');
    }
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      type: item.type,
      cost: item.cost,
      description: item.description,
      icon: item.icon,
      cssClass: item.cssClass,
      expValue: item.expValue,
      effect: item.effect
    });
  };

  return (
    <div className="tiles-grid">
      {/* TILE - CREAR NUEVO ITEM */}
      <div className="tile">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-plus"></i> crear nuevo item
          </div>
        </div>
        <div className="tile-content">
          <button
            onClick={() => setShowCreateModal(true)}
            style={{
              width: '100%',
              padding: '10px',
              background: 'var(--accent-color)',
              border: 'none',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Crear Item
          </button>
        </div>
      </div>

      {/* TILE - LISTA DE ITEMS */}
      <div className="tile full-width">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-shopping-bag"></i> items de tienda ({items.length})
          </div>
        </div>
        <div className="tile-content">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
            {items.map(item => (
              <div
                key={item.id}
                style={{
                  background: 'var(--tile-dark)',
                  padding: '15px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  {item.icon && <span style={{ marginRight: '10px', fontSize: '24px' }}>{item.icon}</span>}
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {item.type} · {item.cost} pts
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>
                  {item.description}
                </div>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button
                    onClick={() => openEditModal(item)}
                    style={{
                      flex: 1,
                      padding: '5px',
                      background: '#2196F3',
                      border: 'none',
                      color: 'white',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      flex: 1,
                      padding: '5px',
                      background: '#f44336',
                      border: 'none',
                      color: 'white',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL DE CREAR/EDITAR */}
      {(showCreateModal || editingItem) && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'var(--tile-dark)',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '90%'
          }}>
            <h3>{editingItem ? 'Editar Item' : 'Crear Nuevo Item'}</h3>
            <form onSubmit={editingItem ? handleUpdate : handleCreate}>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: 'var(--tile-dark)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-color)',
                    borderRadius: '4px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Tipo</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: 'var(--tile-dark)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-color)',
                    borderRadius: '4px'
                  }}
                >
                  <option value="item">Item</option>
                  <option value="theme">Theme</option>
                  <option value="pet">Pet</option>
                </select>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Costo (puntos)</label>
                <input
                  type="number"
                  value={formData.cost}
                  onChange={(e) => setFormData({ ...formData, cost: parseInt(e.target.value) })}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: 'var(--tile-dark)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-color)',
                    borderRadius: '4px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Icono (Font Awesome ID)</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="fa-star"
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: 'var(--tile-dark)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-color)',
                    borderRadius: '4px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: 'var(--tile-dark)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-color)',
                    borderRadius: '4px',
                    minHeight: '60px'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '10px',
                    background: 'var(--accent-color)',
                    border: 'none',
                    color: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {editingItem ? 'Actualizar' : 'Crear'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingItem(null);
                    setFormData({
                      name: '',
                      type: 'item',
                      cost: 0,
                      description: '',
                      icon: '',
                      cssClass: '',
                      expValue: 0,
                      effect: ''
                    });
                  }}
                  style={{
                    flex: 1,
                    padding: '10px',
                    background: '#f44336',
                    border: 'none',
                    color: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
