import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function User() {
  const { user, refreshUserData } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    profilePictureUrl: user?.profilePictureUrl || ''
  });
  const [message, setMessage] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/users/me', formData);
      setMessage('Perfil actualizado correctamente');
      setEditing(false);
      refreshUserData();
    } catch (error) {
      setMessage('Error al actualizar perfil');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setMessage('El archivo es demasiado grande (máximo 5MB)');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('profilePicture', file);

      const res = await axios.post('/api/users/upload-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setFormData(prev => ({ ...prev, profilePictureUrl: res.data.profilePictureUrl }));
      setMessage('Foto subida correctamente');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      setMessage('Error al subir la foto');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="tiles-grid">
      {/* TILE - PERFIL */}
      <div className="tile">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-user"></i> perfil
          </div>
        </div>
        <div className="tile-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div className="profile-avatar" style={{ width: '80px', height: '80px', fontSize: '32px' }}>
              {user?.profilePictureUrl ? (
                <img src={user.profilePictureUrl} alt="Profile" />
              ) : (
                <span>{user?.username?.[0]?.toUpperCase() || 'G'}</span>
              )}
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-light)', marginBottom: '4px' }}>
                {user?.username || 'guest'}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                {user?.email || 'Sin email'}
              </div>
              {user?.isAdmin && (
                <div className="badge" style={{ marginTop: '8px', background: 'var(--accent)', color: 'var(--tile-bg)' }}>
                  <i className="fas fa-crown"></i> admin
                </div>
              )}
            </div>
          </div>

          <div className="profile-stats" style={{ marginBottom: '20px' }}>
            <div className="stat">
              <div className="stat-value">{user?.totalPoints || 0}</div>
              <div className="stat-label">puntos</div>
            </div>
            <div className="stat">
              <div className="stat-value">{user?.pets?.length || 0}</div>
              <div className="stat-label">mascotas</div>
            </div>
            <div className="stat">
              <div className="stat-value">{user?.currentStreak || 0}</div>
              <div className="stat-label">racha</div>
            </div>
          </div>

          <button
            onClick={() => setEditing(!editing)}
            className="btn-secondary"
            style={{ width: '100%' }}
          >
            <i className="fas fa-edit"></i> {editing ? 'cancelar' : 'editar perfil'}
          </button>
        </div>
      </div>

      {/* TILE - EDITAR PERFIL */}
      {editing && (
        <div className="tile">
          <div className="tile-header">
            <div className="tile-dots">
              <span className="tile-dot"></span>
              <span className="tile-dot"></span>
              <span className="tile-dot"></span>
            </div>
            <div className="tile-title">
              <i className="fas fa-edit"></i> editar perfil
            </div>
          </div>
          <div className="tile-content">
            {message && (
              <div className="badge" style={{ width: '100%', marginBottom: '14px', background: message.includes('Error') ? '#5a2a2a' : 'var(--accent)', color: message.includes('Error') ? '#8a4a4a' : 'var(--tile-bg)' }}>
                {message}
              </div>
            )}
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">nombre de usuario</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">subir foto de perfil</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="form-input"
                  disabled={uploading}
                />
                {uploading && <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Subiendo...</div>}
              </div>
              <div className="form-group">
                <label className="form-label">o url de foto de perfil</label>
                <input
                  type="url"
                  name="profilePictureUrl"
                  value={formData.profilePictureUrl}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="https://ejemplo.com/foto.jpg"
                />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                <i className="fas fa-save"></i> guardar cambios
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TILE - ESTADÍSTICAS */}
      <div className="tile">
        <div className="tile-header">
          <div className="tile-dots">
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
            <span className="tile-dot"></span>
          </div>
          <div className="tile-title">
            <i className="fas fa-chart-bar"></i> estadísticas
          </div>
        </div>
        <div className="tile-content">
          <div className="info-row">
            <span className="info-label"><i className="fas fa-trophy"></i> mejor racha</span>
            <span>{user?.bestStreak || 0} días</span>
          </div>
          <div className="info-row">
            <span className="info-label"><i className="fas fa-star"></i> multiplicador</span>
            <span>x{user?.bonusMultiplier || 1.0}</span>
          </div>
          <div className="info-row">
            <span className="info-label"><i className="fas fa-heart"></i> mascota favorita</span>
            <span>{user?.favoritePetId ? 'ID: ' + user.favoritePetId : 'Ninguna'}</span>
          </div>
          <div className="info-row">
            <span className="info-label"><i className="fas fa-calendar"></i> última tarea</span>
            <span>{user?.lastTaskDate ? new Date(user.lastTaskDate).toLocaleDateString() : 'Nunca'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
