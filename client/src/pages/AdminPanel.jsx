import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function AdminPanel() {
  const { user } = useContext(AuthContext);
  const [eggs, setEggs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEgg, setEditingEgg] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    cost: '',
    description: '',
    icon: 'fa-egg',
    cssClass: 'bg-bg',
    probabilities: '',
    isEvent: false,
    isActive: true,
    availableFrom: '',
    availableUntil: ''
  });

  useEffect(() => {
    if (!user?.isAdmin) return;
    fetchEggs();
  }, [user]);

  const fetchEggs = async () => {
    try {
      const res = await axios.get('/api/admin/eggs');
      setEggs(res.data);
    } catch (err) {
      console.error('Error fetching eggs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/eggs', {
        ...formData,
        cost: parseInt(formData.cost),
        probabilities: formData.probabilities ? JSON.parse(formData.probabilities) : {},
        availableFrom: formData.availableFrom || null,
        availableUntil: formData.availableUntil || null
      });
      setFormData({
        name: '',
        cost: '',
        description: '',
        icon: 'fa-egg',
        cssClass: 'bg-bg',
        probabilities: '',
        isEvent: false,
        isActive: true,
        availableFrom: '',
        availableUntil: ''
      });
      fetchEggs();
    } catch (err) {
      console.error('Error creating egg:', err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingEgg) return;
    try {
      await axios.put(`/api/admin/eggs/${editingEgg.id}`, {
        ...formData,
        cost: parseInt(formData.cost),
        probabilities: formData.probabilities ? JSON.parse(formData.probabilities) : {},
        availableFrom: formData.availableFrom || null,
        availableUntil: formData.availableUntil || null
      });
      setEditingEgg(null);
      setFormData({
        name: '',
        cost: '',
        description: '',
        icon: 'fa-egg',
        cssClass: 'bg-bg',
        probabilities: '',
        isEvent: false,
        isActive: true,
        availableFrom: '',
        availableUntil: ''
      });
      fetchEggs();
    } catch (err) {
      console.error('Error updating egg:', err);
    }
  };

  const handleToggle = async (id) => {
    try {
      await axios.patch(`/api/admin/eggs/${id}/toggle`);
      fetchEggs();
    } catch (err) {
      console.error('Error toggling egg:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este huevo?')) return;
    try {
      await axios.delete(`/api/admin/eggs/${id}`);
      fetchEggs();
    } catch (err) {
      console.error('Error deleting egg:', err);
    }
  };

  const handleEdit = (egg) => {
    setEditingEgg(egg);
    setFormData({
      name: egg.name,
      cost: egg.cost,
      description: egg.description,
      icon: egg.icon,
      cssClass: egg.cssClass,
      probabilities: JSON.stringify(egg.probabilities, null, 2),
      isEvent: egg.isEvent,
      isActive: egg.isActive,
      availableFrom: egg.availableFrom ? new Date(egg.availableFrom).toISOString().slice(0, 16) : '',
      availableUntil: egg.availableUntil ? new Date(egg.availableUntil).toISOString().slice(0, 16) : ''
    });
  };

  if (!user?.isAdmin) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Acceso denegado</div>;
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Cargando...</div>;
  }

  return (
    <div className="tiles-grid">
      {/* TILE - FORMULARIO DE HUEVO */}
      <div className="tile" style={{ gridColumn: '1 / -1' }}>
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-egg"></i> {editingEgg ? 'Editar Huevo' : 'Crear Huevo'}
          </div>
        </div>
        <div className="tile-content">
          <form onSubmit={editingEgg ? handleUpdate : handleCreate} style={{ display: 'grid', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <input
                type="text"
                placeholder="Nombre"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
                required
              />
              <input
                type="number"
                placeholder="Costo"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <textarea
              placeholder="Descripción"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="form-input"
              rows={2}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <input
                type="text"
                placeholder="Icono (fa-egg)"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="form-input"
              />
              <input
                type="text"
                placeholder="CSS Class"
                value={formData.cssClass}
                onChange={(e) => setFormData({ ...formData, cssClass: e.target.value })}
                className="form-input"
              />
            </div>
            <textarea
              placeholder='Probabilidades (JSON): {"comun": 20, "raro": 10}'
              value={formData.probabilities}
              onChange={(e) => setFormData({ ...formData, probabilities: e.target.value })}
              className="form-input"
              rows={3}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={formData.isEvent}
                  onChange={(e) => setFormData({ ...formData, isEvent: e.target.checked })}
                />
                Es evento
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
                Activo
              </label>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', marginBottom: '4px', display: 'block' }}>Disponible desde:</label>
                <input
                  type="datetime-local"
                  value={formData.availableFrom}
                  onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
                  className="form-input"
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', marginBottom: '4px', display: 'block' }}>Disponible hasta:</label>
                <input
                  type="datetime-local"
                  value={formData.availableUntil}
                  onChange={(e) => setFormData({ ...formData, availableUntil: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn-primary">
                {editingEgg ? 'Actualizar' : 'Crear'}
              </button>
              {editingEgg && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingEgg(null);
                    setFormData({
                      name: '',
                      cost: '',
                      description: '',
                      icon: 'fa-egg',
                      cssClass: 'bg-bg',
                      probabilities: '',
                      isEvent: false,
                      isActive: true,
                      availableFrom: '',
                      availableUntil: ''
                    });
                  }}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* TILES - LISTA DE HUEVOS */}
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
              {!egg.isActive && <span className="badge" style={{ marginLeft: '8px', background: '#666', color: 'var(--tile-bg)' }}>INACTIVO</span>}
            </div>
          </div>
          <div className="tile-content">
            <div style={{ marginBottom: '8px', fontSize: '13px' }}>{egg.description}</div>
            <div className="info-row">
              <span className="info-label"><i className="fas fa-coins"></i> costo</span>
              <span><strong>{egg.cost} pts</strong></span>
            </div>
            {egg.availableFrom && (
              <div className="info-row">
                <span className="info-label"><i className="fas fa-play"></i> desde</span>
                <span>{new Date(egg.availableFrom).toLocaleString()}</span>
              </div>
            )}
            {egg.availableUntil && (
              <div className="info-row">
                <span className="info-label"><i className="fas fa-stop"></i> hasta</span>
                <span>{new Date(egg.availableUntil).toLocaleString()}</span>
              </div>
            )}
            <div style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
              <button onClick={() => handleEdit(egg)} className="btn-secondary" style={{ flex: 1, fontSize: '11px' }}>
                Editar
              </button>
              <button onClick={() => handleToggle(egg.id)} className="btn-secondary" style={{ flex: 1, fontSize: '11px' }}>
                {egg.isActive ? 'Desactivar' : 'Activar'}
              </button>
              <button onClick={() => handleDelete(egg.id)} className="btn-secondary" style={{ flex: 1, fontSize: '11px', background: '#dc3545', color: 'white', border: 'none' }}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
